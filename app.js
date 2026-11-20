/* Auris OBD — enregistreur de trajet pour Toyota Auris hybride (2015) via OBDLink CX (BLE).
 * Fonctionne dans un navigateur compatible Web Bluetooth (Bluefy sur iPhone, Chrome sur Android/PC).
 * Les formules de conversion viennent de la liste Torque « Auris_2017_Pids_metric.csv » (pids.js).
 */
(() => {
  "use strict";

  // ---------------------------------------------------------------------------
  // Réglages
  // ---------------------------------------------------------------------------
  // UUID au format complet (en minuscules) : Bluefy refuse les formes courtes numériques
  const uuid16 = (n) => `0000${n.toString(16).padStart(4, "0")}-0000-1000-8000-00805f9b34fb`;
  const SVC_OBDLINK = uuid16(0xfff0);
  const BLE_SERVICES = [SVC_OBDLINK, uuid16(0xffe0), "e7810a71-73ae-499d-8c15-faa9aef0c3f2"];
  const BLE_CHUNK = 20;            // l'OBDLink CX refuse les écritures plus longues que le MTU négocié
  const SLOW_EVERY = 15;           // les requêtes « lentes » sont relues toutes les 15 boucles
  const DTC_EVERY = 100;           // codes défaut relus toutes les 100 boucles (≈ 4-5 min)
  const SAVE_EVERY = 5;            // sauvegarde de secours toutes les 5 lignes
  const STORE_KEY = "aurisObdRecording";
  const RAW_LOG_CYCLES = 3;        // nombre de boucles dont les réponses brutes vont dans le journal

  const $ = (s) => document.querySelector(s);
  const params = new URLSearchParams(location.search);
  const DEMO = params.has("demo");

  // ---------------------------------------------------------------------------
  // Journal technique (pour le dépannage)
  // ---------------------------------------------------------------------------
  const journal = [];
  function log(msg, level = "info") {
    const t = new Date();
    const line = `${t.toLocaleTimeString("fr-CH")}.${String(t.getMilliseconds()).padStart(3, "0")} ${msg}`;
    journal.push(line);
    if (journal.length > 5000) journal.splice(0, 1000);
    const el = $("#log");
    if (el) {
      const div = document.createElement("div");
      div.textContent = line;
      if (level !== "info") div.className = level;
      el.prepend(div);
      while (el.childNodes.length > 150) el.removeChild(el.lastChild);
    }
  }

  // ---------------------------------------------------------------------------
  // Formules Torque → fonctions JavaScript
  // ---------------------------------------------------------------------------
  function byteIndex(v) {
    // A..Z = 0..25, AA..AZ = 26..51
    return v.length === 1 ? v.charCodeAt(0) - 65 : 26 + (v.charCodeAt(1) - 65);
  }

  function compileEquation(eq) {
    if (/^[A-Z]{3,}$/.test(eq)) {
      // Champ texte (code modèle, type moteur…) : octets lus comme caractères ASCII
      const idx = [...eq].map(byteIndex);
      return { text: true, fn: (d) => idx.map((i) => (d[i] >= 32 && d[i] < 127 ? String.fromCharCode(d[i]) : "")).join("").trim() };
    }
    const refs = [];
    let js = eq.replace(/VAL\{([^}]+)\}/g, (_, n) => { refs.push(n.replace(/^Auris-/, "")); return `v(${refs.length - 1})`; });
    js = js.replace(/\{([A-Z]{1,2}):(\d)\}/g, (_, v, bit) => `((b(${byteIndex(v)})>>${bit})&1)`);
    js = js.replace(/\b([A-Z]{1,2})\b/g, (_, v) => `b(${byteIndex(v)})`);
    // eslint-disable-next-line no-new-func
    const f = new Function("b", "v", `return (${js});`);
    return { text: false, refs, js, fn: f };
  }

  const PIDS = window.AURIS_PIDS.map((p, i) => ({ ...p, i, ...compileEquation(p.eq) }));
  const PID_BY_NAME = Object.fromEntries(PIDS.map((p) => [p.name, p]));

  // Regroupement en requêtes : une requête = un calculateur + un PID, plusieurs valeurs par réponse
  const REQUESTS = [];
  {
    const map = new Map();
    for (const p of PIDS) {
      if (p.rate === "calc") continue;
      const key = `${p.header}|${p.pid}`;
      if (!map.has(key)) {
        const r = { key, header: p.header, pid: p.pid, rate: p.rate, items: [], ok: 0, fail: 0, lastErr: "" };
        map.set(key, r);
        REQUESTS.push(r);
      }
      map.get(key).items.push(p);
    }
  }
  const CALC = PIDS.filter((p) => p.rate === "calc");

  // Colonnes du CSV
  const META_COLS = ["Horodatage", "Temps [s]", "Durée boucle [ms]", "Tension prise OBD [V]"];
  const DTC_COLS = ["DTC moteur 7E0 mémorisés", "DTC moteur 7E0 en attente", "DTC hybride 7E2 mémorisés", "DTC hybride 7E2 en attente"];
  const PID_COLS = PIDS.map((p) => (p.unit ? `${p.name} [${p.unit}]` : p.name));
  const COLUMNS = [...META_COLS, ...PID_COLS, ...DTC_COLS];
  const OFF_PID = META_COLS.length;
  const OFF_DTC = OFF_PID + PIDS.length;

  // ---------------------------------------------------------------------------
  // Décodage des réponses ELM327
  // ---------------------------------------------------------------------------
  const ERR_RE = /(NO DATA|CAN ERROR|BUS ERROR|BUS INIT|UNABLE TO CONNECT|STOPPED|BUFFER FULL|DATA ERROR|FB ERROR|LV RESET|ACT ALERT|ERR\d+|^\?$)/m;

  function parseHexResponse(text) {
    const lines = text.split(/[\r\n]+/).map((s) => s.trim()).filter((s) => s && !/^SEARCHING/.test(s));
    const err = lines.find((l) => ERR_RE.test(l));
    if (err && !lines.some((l) => /^[0-9A-F]{4,}$/i.test(l.replace(/\s/g, "")) || /^[0-9A-F]:/i.test(l))) return { err };
    let len = null;
    let hex = "";
    for (const l of lines) {
      if (len === null && /^[0-9A-F]{3}$/i.test(l) && lines.length > 1) { len = parseInt(l, 16); continue; }
      const m = /^([0-9A-F]):\s*(.*)$/i.exec(l);
      if (m) { hex += m[2].replace(/\s/g, ""); continue; }
      const c = l.replace(/\s/g, "");
      if (/^[0-9A-F]+$/i.test(c)) hex += c;
    }
    if (!hex || hex.length % 2) return { err: `réponse illisible « ${text.replace(/\s+/g, " ").slice(0, 60)} »` };
    let bytes = [];
    for (let i = 0; i < hex.length; i += 2) bytes.push(parseInt(hex.slice(i, i + 2), 16));
    if (len !== null) bytes = bytes.slice(0, len);
    return { bytes };
  }

  function dtcString(hi, lo) {
    const h = (n) => n.toString(16).toUpperCase();
    return "PCBU"[hi >> 6] + ((hi >> 4) & 3) + h(hi & 15) + h(lo >> 4) + h(lo & 15);
  }

  function round(v) {
    if (typeof v !== "number" || !isFinite(v)) return null;
    return Math.round(v * 1000) / 1000;
  }

  // ---------------------------------------------------------------------------
  // Transport Bluetooth (OBDLink CX : service FFF0, notifications FFF1, écriture FFF2)
  // ---------------------------------------------------------------------------
  class BleTransport {
    constructor() { this.buf = ""; this.waiter = null; this.onDisconnect = null; this.device = null; }

    async connect(acceptAll) {
      const opts = acceptAll
        ? { acceptAllDevices: true, optionalServices: BLE_SERVICES }
        : { filters: [{ namePrefix: "OBDLink" }, { services: [SVC_OBDLINK] }], optionalServices: BLE_SERVICES };
      const dev = this.device && !acceptAll ? this.device : await navigator.bluetooth.requestDevice(opts);
      if (dev !== this.device) {
        dev.addEventListener("gattserverdisconnected", () => { log("Bluetooth déconnecté", "warn"); this.onDisconnect && this.onDisconnect(); });
        this.device = dev;
      }
      log(`Appareil choisi : ${this.device.name || "(sans nom)"}`);
      const server = await this.device.gatt.connect();
      let rx = null, tx = null;
      for (const uuid of BLE_SERVICES) {
        let svc;
        try { svc = await server.getPrimaryService(uuid); } catch (e) { continue; }
        const chars = await svc.getCharacteristics();
        for (const c of chars) {
          if (!rx && (c.properties.notify || c.properties.indicate)) rx = c;
          if (!tx && (c.properties.write || c.properties.writeWithoutResponse)) tx = c;
        }
        if (rx && tx) { log(`Service ${svc.uuid} — lecture ${rx.uuid.slice(4, 8)}, écriture ${tx.uuid.slice(4, 8)}`); break; }
        rx = tx = null;
      }
      if (!rx || !tx) throw new Error("Service série introuvable sur cet appareil (ce n'est peut-être pas l'OBDLink).");
      await this._attach(rx, tx);
    }

    async _attach(rx, tx) {
      if (!this._onData) {
        const dec = new TextDecoder();
        this._onData = (ev) => { this.buf += dec.decode(ev.target.value); this._check(); };
      }
      if (this.rx) this.rx.removeEventListener("characteristicvaluechanged", this._onData);
      this.rx = rx; this.tx = tx;
      rx.addEventListener("characteristicvaluechanged", this._onData);
      await rx.startNotifications();
    }

    async reconnect() {
      if (!this.device) throw new Error("Aucun appareil");
      const server = await this.device.gatt.connect();
      for (const uuid of BLE_SERVICES) {
        try {
          const svc = await server.getPrimaryService(uuid);
          const chars = await svc.getCharacteristics();
          const rx = chars.find((c) => c.properties.notify || c.properties.indicate);
          const tx = chars.find((c) => c.properties.write || c.properties.writeWithoutResponse);
          if (rx && tx) { await this._attach(rx, tx); return; }
        } catch (e) { /* service suivant */ }
      }
      throw new Error("Reconnexion impossible");
    }

    get connected() { return !!(this.device && this.device.gatt && this.device.gatt.connected); }

    _check() {
      const i = this.buf.indexOf(">");
      if (i >= 0 && this.waiter) {
        const text = this.buf.slice(0, i);
        this.buf = this.buf.slice(i + 1);
        const w = this.waiter; this.waiter = null; clearTimeout(w.timer);
        w.resolve(text);
      }
    }

    async _write(str) {
      const data = new TextEncoder().encode(str);
      const withResp = this.tx.properties.write;
      for (let i = 0; i < data.length; i += BLE_CHUNK) {
        const chunk = data.slice(i, i + BLE_CHUNK);
        if (withResp && this.tx.writeValueWithResponse) await this.tx.writeValueWithResponse(chunk);
        else if (!withResp && this.tx.writeValueWithoutResponse) await this.tx.writeValueWithoutResponse(chunk);
        else await this.tx.writeValue(chunk);
      }
    }

    send(cmd, timeout = 2000) {
      return new Promise(async (resolve) => {
        this.buf = "";
        this.waiter = {
          resolve,
          timer: setTimeout(() => {
            const text = this.buf; this.buf = ""; this.waiter = null;
            resolve(text + "\nTIMEOUT");
          }, timeout),
        };
        try { await this._write(cmd + "\r"); }
        catch (e) { clearTimeout(this.waiter && this.waiter.timer); this.waiter = null; resolve("WRITE ERROR " + e.message); }
      });
    }

    disconnect() { try { this.device && this.device.gatt.disconnect(); } catch (e) { /* rien */ } }
  }

  // ---------------------------------------------------------------------------
  // Transport de démonstration (?demo) : simule l'adaptateur pour tester la page sans voiture
  // ---------------------------------------------------------------------------
  class DemoTransport {
    constructor() { this.header = "7DF"; this.onDisconnect = null; this.t0 = Date.now(); this.connectedFlag = false; }
    async connect() { this.connectedFlag = true; log("Mode démo : adaptateur simulé"); }
    async reconnect() { this.connectedFlag = true; }
    get connected() { return this.connectedFlag; }
    disconnect() { this.connectedFlag = false; }
    async send(cmd) {
      await new Promise((r) => setTimeout(r, 12 + Math.random() * 18));
      const c = cmd.toUpperCase().replace(/\s/g, "");
      if (c === "ATZ") return "\r\rELM327 v1.4b\r\r";
      if (c === "STI") return "STN2255 v5.6.19\r\r";
      if (c === "ATRV") return (13.9 + Math.random() * 0.3).toFixed(1) + "V\r\r";
      if (c === "ATDPN") return "6\r\r";
      if (c.startsWith("ATSH")) { this.header = c.slice(4); return "OK\r\r"; }
      if (c.startsWith("AT")) return "OK\r\r";
      if (c === "0100") return "4100BE3EA813\r\r";
      if (c === "03" || c === "07") return (c === "03" ? "43" : "47") + "00\r\r";
      if (this.header === "7C0" && c === "21A7") return "NO DATA\r\r";
      const req = REQUESTS.find((r) => r.header === this.header && r.pid === c);
      if (!req) return "NO DATA\r\r";
      let maxIdx = 0;
      for (const p of req.items) {
        const m = p.eq.match(/\b[A-Z]{1,2}\b/g) || [];
        for (const v of m) maxIdx = Math.max(maxIdx, byteIndex(v));
        if (p.text) maxIdx = Math.max(maxIdx, byteIndex(p.eq[p.eq.length - 1]));
      }
      const t = (Date.now() - this.t0) / 1000;
      const data = Array.from({ length: maxIdx + 1 }, () => Math.floor(Math.random() * 256));
      if (c === "2181") { // 14 blocs ≈ 15.4 V, 12 V ≈ 14 V, VB ≈ 216 V
        for (let k = 0; k < 14; k++) { const raw = Math.round((15.3 + Math.random() * 0.15 + Math.sin(t / 7) * 0.4) * 65535 / 79.99); data[2 * k] = raw >> 8; data[2 * k + 1] = raw & 255; }
        const aux = Math.round((14.0 + 40) * 65535 / 79.9); data[28] = aux >> 8; data[29] = aux & 255;
        data[30] = 2160 >> 8; data[31] = 2160 & 255; data[32] = 12;
      }
      if (c === "015B") data[0] = Math.round((55 + 5 * Math.sin(t / 20)) * 51 / 20);
      const bytes = [parseInt(c.slice(0, 2), 16) + 0x40, parseInt(c.slice(2, 4), 16), ...data];
      const hex = bytes.map((b) => b.toString(16).toUpperCase().padStart(2, "0"));
      if (bytes.length <= 7) return hex.join("") + "\r\r";
      let out = bytes.length.toString(16).toUpperCase().padStart(3, "0") + "\r";
      out += "0:" + hex.slice(0, 6).join("") + "\r";
      for (let i = 6, n = 1; i < hex.length; i += 7, n++) out += (n % 16).toString(16).toUpperCase() + ":" + hex.slice(i, i + 7).join("").padEnd(14, "0") + "\r";
      return out + "\r";
    }
  }

  // ---------------------------------------------------------------------------
  // Dialogue avec le véhicule
  // ---------------------------------------------------------------------------
  let transport = null;
  let currentHeader = null;
  let rawCycles = 0;

  async function cmd(c, timeout) {
    const res = await transport.send(c, timeout);
    if (rawCycles < RAW_LOG_CYCLES || c.startsWith("AT") || c.startsWith("ST")) log(`> ${c}  ⟶  ${res.replace(/[\r\n]+/g, " ⏎ ").trim()}`);
    return res;
  }

  async function setHeader(h) {
    if (currentHeader === h) return;
    await cmd(`ATSH${h}`);
    await cmd(`ATCRA${(parseInt(h, 16) + 8).toString(16).toUpperCase()}`);
    currentHeader = h;
  }

  async function initAdapter() {
    currentHeader = null;
    await cmd("ATZ", 4000);
    for (const c of ["ATE0", "ATL0", "ATS0", "ATH0", "ATCAF1", "ATAT1", "ATSP6"]) await cmd(c);
    await cmd("STI");
    await cmd("ATRV");
    // Test : le moteur répond-il ?
    await setHeader("7E0");
    const r = await cmd("0100", 5000);
    const p = parseHexResponse(r);
    if (p.err || !p.bytes || p.bytes[0] !== 0x41) {
      throw new Error("La voiture ne répond pas. Mets le contact (READY) et réessaie.");
    }
    await cmd("ATDPN");
  }

  async function readRequest(req) {
    await setHeader(req.header);
    const res = await cmd(req.pid);
    const p = parseHexResponse(res);
    const mode = parseInt(req.pid.slice(0, 2), 16);
    const pid = parseInt(req.pid.slice(2, 4), 16);
    if (p.err) { req.fail++; req.lastErr = p.err; return null; }
    const b = p.bytes;
    if (b[0] === 0x7f) { req.fail++; req.lastErr = `refus ${b.map((x) => x.toString(16)).join(" ")}`; return null; }
    if (b[0] !== mode + 0x40 || b[1] !== pid) { req.fail++; req.lastErr = `réponse inattendue ${b.slice(0, 4).map((x) => x.toString(16)).join(" ")}`; return null; }
    req.ok++;
    return b.slice(2);
  }

  function decodeInto(row, req, data) {
    for (const p of req.items) {
      let val = null;
      if (data) {
        try {
          val = p.text ? p.fn(data) : round(p.fn((i) => { if (data[i] === undefined) throw new Error("court"); return data[i]; }));
        } catch (e) { val = null; }
      }
      row[OFF_PID + p.i] = val;
    }
  }

  async function readDtcs() {
    const out = [];
    for (const h of ["7E0", "7E2"]) {
      for (const m of ["03", "07"]) {
        await setHeader(h);
        const res = await cmd(m, 3000);
        const p = parseHexResponse(res);
        if (p.err || !p.bytes || p.bytes[0] !== parseInt(m, 16) + 0x40) { out.push(p.err && /NO DATA/.test(p.err) ? "aucun" : "non lu"); continue; }
        const b = p.bytes;
        const codes = [];
        // CAN : 43 NN puis paires d'octets
        const n = b[1];
        for (let k = 0; k < n && 2 + 2 * k + 1 < b.length; k++) {
          const hi = b[2 + 2 * k], lo = b[3 + 2 * k];
          if (hi || lo) codes.push(dtcString(hi, lo));
        }
        out.push(codes.join(" ") || "aucun");
      }
    }
    log(`Codes défaut — moteur : [${out[0]}] attente [${out[1]}] · hybride : [${out[2]}] attente [${out[3]}]`, out.some((x) => !["aucun", "non lu"].includes(x)) ? "warn" : "info");
    return out;
  }

  async function readVoltage() {
    const r = await cmd("ATRV");
    const m = /(\d+(?:\.\d+)?)\s*V/i.exec(r);
    return m ? parseFloat(m[1]) : null;
  }

  // ---------------------------------------------------------------------------
  // Enregistrement
  // ---------------------------------------------------------------------------
  const state = {
    connected: false,
    recording: false,
    stopRequested: false,
    rows: [],
    t0: null,
    km: "",
    cycle: 0,
    lastRow: new Array(COLUMNS.length).fill(null),
    dtcs: ["non lu", "non lu", "non lu", "non lu"],
    lastCycleMs: 0,
  };

  async function runCycle(full) {
    const t = Date.now();
    const row = state.lastRow.slice();
    row[0] = new Date(t).toISOString();
    row[1] = state.t0 ? round((t - state.t0) / 1000) : 0;
    row[3] = await readVoltage();
    for (const req of REQUESTS) {
      if (req.rate === "once" && !full) continue;
      if (req.rate === "slow" && !full && state.cycle % SLOW_EVERY !== 0) continue;
      const data = await readRequest(req);
      decodeInto(row, req, data);
    }
    for (const p of CALC) {
      try {
        row[OFF_PID + p.i] = round(p.fn(() => { throw new Error(); }, (k) => {
          const v = row[OFF_PID + PID_BY_NAME[p.refs[k]].i];
          if (v === null) throw new Error("manque");
          return v;
        }));
      } catch (e) { row[OFF_PID + p.i] = null; }
    }
    if (state.cycle % DTC_EVERY === 0 || full) state.dtcs = await readDtcs();
    for (let k = 0; k < 4; k++) row[OFF_DTC + k] = state.dtcs[k];
    row[2] = Date.now() - t;
    state.lastCycleMs = row[2];
    state.lastRow = row;
    rawCycles++;
    return row;
  }

  async function recordLoop() {
    while (state.recording && !state.stopRequested) {
      if (!transport.connected) { onLost(); return; }
      let row;
      try { row = await runCycle(state.cycle === 0); }
      catch (e) { log("Erreur pendant la boucle : " + e.message, "err"); if (!transport.connected) { onLost(); return; } continue; }
      state.rows.push(row);
      state.cycle++;
      if (state.rows.length % SAVE_EVERY === 0) saveBackup();
      render();
    }
  }

  // ---------------------------------------------------------------------------
  // Sauvegarde de secours (si la page se recharge en cours de route)
  // ---------------------------------------------------------------------------
  function saveBackup() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({ v: 1, columns: COLUMNS, km: state.km, t0: state.t0, rows: state.rows }));
      $("#backupWarn").hidden = true;
    } catch (e) { $("#backupWarn").hidden = false; }
  }
  function loadBackup() {
    try { const s = localStorage.getItem(STORE_KEY); return s ? JSON.parse(s) : null; } catch (e) { return null; }
  }
  function clearBackup() { try { localStorage.removeItem(STORE_KEY); } catch (e) { /* rien */ } }

  // ---------------------------------------------------------------------------
  // Export
  // ---------------------------------------------------------------------------
  function csvCell(v) {
    if (v === null || v === undefined) return "";
    const s = String(v);
    return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  }
  function buildCsv(columns, rows) {
    return [columns.map(csvCell).join(","), ...rows.map((r) => r.map(csvCell).join(","))].join("\n") + "\n";
  }
  function fileName(t0, km, ext) {
    const d = new Date(t0 || Date.now());
    const p = (n) => String(n).padStart(2, "0");
    const kmPart = km ? `_${String(km).replace(/[^\d]/g, "")}km` : "";
    return `auris_${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}_${p(d.getHours())}h${p(d.getMinutes())}${kmPart}.${ext}`;
  }

  async function shareOrDownload(content, name, mime) {
    const blob = new Blob([content], { type: mime });
    const file = new File([blob], name, { type: mime });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try { await navigator.share({ files: [file], title: name }); log(`Fichier partagé : ${name}`); return; }
      catch (e) { if (e.name === "AbortError") return; log("Partage impossible, téléchargement à la place : " + e.message, "warn"); }
    }
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 5000);
    log(`Fichier téléchargé : ${name}`);
  }

  function exportData() {
    const rows = state.rows.length ? state.rows : (loadBackup() || {}).rows || [];
    if (!rows.length) { toast("Rien à exporter pour l'instant."); return; }
    shareOrDownload(buildCsv(COLUMNS, rows), fileName(state.t0, state.km, "csv"), "text/csv");
  }

  function exportJournal() {
    const lines = [
      `Auris OBD — journal technique`,
      `Page : ${location.href}`,
      `Navigateur : ${navigator.userAgent}`,
      `Kilométrage saisi : ${state.km || "-"}`,
      `Lignes enregistrées : ${state.rows.length}`,
      ``,
      `Requêtes (calculateur PID : réponses ok / échecs / dernière erreur)`,
      ...REQUESTS.map((r) => `${r.header} ${r.pid} [${r.rate}] : ${r.ok} / ${r.fail}${r.lastErr ? " / " + r.lastErr : ""}`),
      ``,
      `Journal`,
      ...journal,
    ];
    shareOrDownload(lines.join("\n") + "\n", fileName(state.t0, state.km, "txt").replace("auris_", "auris_journal_"), "text/plain");
  }

  // ---------------------------------------------------------------------------
  // Écran allumé
  // ---------------------------------------------------------------------------
  let wakeLock = null;
  async function keepAwake(on) {
    try {
      if (on && "wakeLock" in navigator) {
        wakeLock = await navigator.wakeLock.request("screen");
        $("#wakeInfo").textContent = "Écran maintenu allumé.";
      } else if (!on && wakeLock) { await wakeLock.release(); wakeLock = null; }
    } catch (e) { /* non pris en charge */ }
    if (on && !wakeLock) $("#wakeInfo").textContent = "Désactive le verrouillage automatique de l'iPhone pendant le trajet.";
  }
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && state.recording) keepAwake(true);
    if (document.visibilityState === "hidden" && state.recording) log("Page passée en arrière-plan : l'enregistrement peut être suspendu par iOS.", "warn");
  });

  // ---------------------------------------------------------------------------
  // Interface
  // ---------------------------------------------------------------------------
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg; t.hidden = false;
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => { t.hidden = true; }, 4000);
  }

  function setStatus(text, kind) {
    const s = $("#status");
    s.textContent = text;
    s.dataset.kind = kind;
  }

  const TILES = [
    ["Vitesse", "Vehicle Speed_7E2", 0, "km/h"],
    ["Régime moteur", "Engine Speed_7E0", 0, "tr/min"],
    ["Charge batterie", "State of Charge", 1, "%"],
    ["Écart entre blocs", "Difference between maximum & minimum voltage", 3, "V"],
    ["Liquide moteur", "Coolant Temperature_7E0", 0, "°C"],
    ["Pompe onduleur", "Inverter Water Pump Revolution", 0, "tr/min"],
    ["Liquide onduleur", "Inverter Coolant Temp", 0, "°C"],
    ["Batterie 12 V", "Auxiliary Battery Voltage", 2, "V"],
  ];

  function fmtDuration(s) {
    const m = Math.floor(s / 60), r = Math.floor(s % 60);
    return `${m}:${String(r).padStart(2, "0")}`;
  }

  function render() {
    const row = state.lastRow;
    $("#tiles").innerHTML = TILES.map(([label, name, dec, unit]) => {
      const p = PID_BY_NAME[name];
      const v = p ? row[OFF_PID + p.i] : null;
      const txt = v === null || v === undefined ? "—" : Number(v).toFixed(dec);
      return `<div class="tile"><div class="tl">${label}</div><div class="tv">${txt}<span>${unit}</span></div></div>`;
    }).join("");
    const elapsed = state.t0 ? (Date.now() - state.t0) / 1000 : 0;
    $("#rows").textContent = state.rows.length;
    $("#elapsed").textContent = fmtDuration(elapsed);
    $("#cycle").textContent = state.lastCycleMs ? (state.lastCycleMs / 1000).toFixed(1) + " s" : "—";
    const answered = REQUESTS.filter((r) => r.ok > 0).length;
    const tried = REQUESTS.filter((r) => r.ok + r.fail > 0).length;
    $("#answered").textContent = tried ? `${answered}/${tried}` : "—";
    const dtc = state.dtcs.filter((x) => x && !["aucun", "non lu"].includes(x)).join(" ");
    $("#dtc").textContent = dtc || (state.cycle || state.rows.length ? "aucun" : "—");
    $("#dtcBox").dataset.kind = dtc ? "warn" : "ok";

    $("#btnConnect").hidden = state.connected;
    $("#btnConnectAll").hidden = state.connected || DEMO;
    $("#btnStart").hidden = !state.connected || state.recording;
    $("#btnStop").hidden = !state.recording;
    $("#btnExport").disabled = !state.rows.length;
    $("#kmField").hidden = state.recording;
  }

  let lostHandled = false;
  function onLost() {
    if (lostHandled) return;
    lostHandled = true;
    state.connected = false;
    setStatus(state.recording ? "Connexion perdue — données conservées" : "Déconnecté", "err");
    $("#btnReconnect").hidden = !state.recording;
    saveBackup();
    render();
  }

  async function connect(acceptAll) {
    if (!DEMO && !navigator.bluetooth) { toast("Ce navigateur ne gère pas le Bluetooth. Ouvre la page dans Bluefy."); return; }
    try {
      setStatus("Connexion…", "busy");
      transport = transport || (DEMO ? new DemoTransport() : new BleTransport());
      transport.onDisconnect = onLost;
      await transport.connect(acceptAll);
      setStatus("Initialisation de l'adaptateur…", "busy");
      await initAdapter();
      lostHandled = false;
      state.connected = true;
      setStatus("Lecture de test…", "busy");
      rawCycles = 0;
      await runCycle(true);
      const answered = REQUESTS.filter((r) => r.ok > 0).length;
      log(`Lecture de test : ${answered}/${REQUESTS.length} requêtes ont répondu`);
      setStatus(`Prêt — ${answered}/${REQUESTS.length} requêtes répondent`, "ok");
    } catch (e) {
      log(`Échec de connexion : ${e.name} — ${e.message}`, "err");
      if (e.name !== "NotFoundError") toast(`Connexion impossible : ${e.message}`);
      setStatus(e.name === "NotFoundError" ? "Aucun appareil choisi" : e.message, "err");
    }
    render();
  }

  async function reconnect() {
    try {
      setStatus("Reconnexion…", "busy");
      await transport.reconnect();
      await initAdapter();
      lostHandled = false;
      state.connected = true;
      $("#btnReconnect").hidden = true;
      setStatus("Enregistrement en cours (repris)", "rec");
      log("Enregistrement repris après reconnexion");
      state.loop = recordLoop();
    } catch (e) {
      log("Reconnexion impossible : " + e.message, "err");
      setStatus("Reconnexion impossible — réessaie", "err");
    }
    render();
  }

  function start() {
    state.km = $("#km").value.trim();
    state.rows = [];
    state.cycle = 0;
    state.t0 = Date.now();
    state.recording = true;
    state.stopRequested = false;
    rawCycles = Math.min(rawCycles, RAW_LOG_CYCLES - 1);
    for (const r of REQUESTS) { r.ok = 0; r.fail = 0; r.lastErr = ""; }
    log(`Début de l'enregistrement${state.km ? " — " + state.km + " km" : ""}`);
    setStatus("Enregistrement en cours", "rec");
    keepAwake(true);
    clearBackup();
    render();
    state.loop = recordLoop();
    clearInterval(start.timer);
    start.timer = setInterval(() => { if (state.recording) $("#elapsed").textContent = fmtDuration((Date.now() - state.t0) / 1000); }, 1000);
  }

  async function stop() {
    state.stopRequested = true;
    setStatus("Arrêt…", "busy");
    // laisse la boucle en cours se terminer avant d'envoyer d'autres commandes
    try { await state.loop; } catch (e) { /* rien */ }
    state.recording = false;
    clearInterval(start.timer);
    if (state.connected) {
      try { state.dtcs = await readDtcs(); for (const row of state.rows.slice(-1)) for (let k = 0; k < 4; k++) row[OFF_DTC + k] = state.dtcs[k]; }
      catch (e) { /* rien */ }
    }
    saveBackup();
    keepAwake(false);
    log(`Fin de l'enregistrement : ${state.rows.length} lignes en ${fmtDuration((Date.now() - state.t0) / 1000)}`);
    setStatus(`Terminé — ${state.rows.length} lignes. Exporte le fichier.`, "ok");
    render();
  }

  function init() {
    if (DEMO) $("#demoBadge").hidden = false;
    if (!DEMO && !navigator.bluetooth) $("#noBt").hidden = false;
    $("#btnConnect").onclick = () => connect(false);
    $("#btnConnectAll").onclick = () => connect(true);
    $("#btnReconnect").onclick = reconnect;
    $("#btnStart").onclick = start;
    $("#btnStop").onclick = stop;
    $("#btnExport").onclick = exportData;
    $("#btnJournal").onclick = exportJournal;
    $("#pidCount").textContent = `${PIDS.length} mesures · ${REQUESTS.length} requêtes`;

    const b = loadBackup();
    if (b && b.rows && b.rows.length) {
      const box = $("#recover");
      box.hidden = false;
      $("#recoverInfo").textContent = `${b.rows.length} lignes du ${new Date(b.t0).toLocaleString("fr-CH")}${b.km ? " (" + b.km + " km)" : ""}`;
      $("#btnRecover").onclick = () => shareOrDownload(buildCsv(b.columns || COLUMNS, b.rows), fileName(b.t0, b.km, "csv"), "text/csv");
      $("#btnDiscard").onclick = () => { clearBackup(); box.hidden = true; };
    }
    render();
    setStatus(DEMO ? "Mode démo — appuie sur Connecter" : "Non connecté", "idle");
    window.addEventListener("beforeunload", (e) => { if (state.recording) { saveBackup(); e.preventDefault(); e.returnValue = ""; } });
  }

  // Exposé pour les tests
  window.AurisObd = { parseHexResponse, compileEquation, PIDS, REQUESTS, COLUMNS, state, buildCsv };
  document.addEventListener("DOMContentLoaded", init);
})();
