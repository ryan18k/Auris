# Auris

**Auris OBD** — Page web qui enregistre, pendant un trajet, les 212 mesures disponibles sur une Toyota Auris hybride (2015) via un adaptateur OBDLink CX en Bluetooth basse consommation, puis exporte le tout en CSV pour l'analyse.

## Utilisation

1. Sur iPhone, installer **Bluefy** (Safari ne permet pas le Bluetooth aux pages web) et y ouvrir l'adresse de la page.
2. Brancher l'OBDLink CX, mettre la voiture en READY, saisir le kilométrage (facultatif) et appuyer sur **Connecter l'OBDLink**. La première association doit se faire dans les 5 minutes qui suivent la mise sous tension de l'adaptateur.
3. Après la lecture de test, appuyer sur **Démarrer l'enregistrement**, rouler 15 à 30 minutes, puis **Arrêter** et **Exporter le CSV**.

Garder l'écran allumé et Bluefy au premier plan pendant tout le trajet : iOS suspend les pages en arrière-plan. Une sauvegarde de secours est faite toutes les 5 lignes ; si la page se recharge, l'enregistrement est proposé à l'export au démarrage.

## Fonctionnement

- Connexion au service BLE `FFF0` de l'OBDLink CX (notifications `FFF1`, écriture `FFF2`, morceaux de 20 octets).
- Initialisation ELM327 : `ATZ ATE0 ATL0 ATS0 ATH0 ATCAF1 ATAT1 ATSP6`, puis test `0100` sur le calculateur moteur.
- Boucle sur 45 requêtes Toyota (mode 21) adressées à 5 calculateurs : 7E0 moteur, 7E2 hybride, 7B0 freinage, 7C0 combiné, 7C4 climatisation. Les valeurs qui bougent peu sont relues toutes les 15 boucles ; les codes défaut (modes 03 et 07 sur 7E0 et 7E2) toutes les 100 boucles et à l'arrêt.
- Une ligne de CSV par boucle (environ une toutes les 2 à 3 secondes), avec horodatage, tension à la prise OBD et les 212 valeurs converties.

Les formules viennent de `data/Auris_2017_Pids_metric.csv` (liste Torque publiée sur [zansprojects.blogspot.com](https://zansprojects.blogspot.com/2018/12/torque-pids-for-toyota-auris-hybrid.html)). Pour régénérer `pids.js` : `python3 tools/build_pids.py`.

Le **journal technique** exporte les réponses brutes de l'adaptateur et l'état de chaque requête, utile si certaines mesures restent vides.

`?demo` dans l'adresse simule l'adaptateur pour tester la page sans voiture.
