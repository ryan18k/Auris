"""Génère pids.js à partir de data/Auris_2017_Pids_metric.csv (liste Torque de 212 codes).

Usage : python3 tools/build_pids.py
"""
import csv
import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "data" / "Auris_2017_Pids_metric.csv"
OUT = ROOT / "pids.js"

UNITS = {"C": "°C", "us": "µs"}

# Requêtes lues une seule fois au départ (identification du véhicule)
ONCE = {("7E0", "21C1"), ("7E2", "21C1"), ("7E2", "21C2")}
# Requêtes lentes : relues toutes les N boucles (valeurs qui bougent peu)
SLOW = {
    ("7E2", "21E1"), ("7E0", "2137"), ("7E0", "2106"), ("7E0", "2124"),
    ("7B0", "21A6"), ("7C0", "21A7"), ("7C0", "2141"), ("7C4", "213D"),
    ("7E0", "2154"),  # régime par cylindre : seulement pendant un test actif
    ("7E2", "2121"),  # régulateur de vitesse
}

rows = list(csv.DictReader(SRC.open(encoding="utf-8-sig")))
pids = []
for r in rows:
    name = r["Name"].strip()
    if name.startswith("Auris-"):
        name = name[len("Auris-"):]
    header = r["Header"].strip()
    pid = r["ModeAndPID"].strip()
    key = (header, pid)
    rate = "once" if key in ONCE else "slow" if key in SLOW else "fast"
    if not header:
        rate = "calc"
    pids.append({
        "name": name,
        "unit": UNITS.get(r["Units"].strip(), r["Units"].strip()),
        "header": header,
        "pid": pid,
        "eq": r["Equation"].strip(),
        "rate": rate,
    })

# Ordre des colonnes : par calculateur puis par requête, pour un CSV lisible
order = {"7E2": 0, "7E0": 1, "7B0": 2, "7C0": 3, "7C4": 4, "": 5}
pids.sort(key=lambda p: (order.get(p["header"], 9), p["pid"]))

OUT.write_text(
    "// Généré par tools/build_pids.py — ne pas modifier à la main.\n"
    "// Source : Auris_2017_Pids_metric.csv (zansprojects.blogspot.com), 212 codes.\n"
    "window.AURIS_PIDS = " + json.dumps(pids, ensure_ascii=False, indent=1) + ";\n",
    encoding="utf-8",
)
print(f"{len(pids)} codes écrits dans {OUT.name}")
