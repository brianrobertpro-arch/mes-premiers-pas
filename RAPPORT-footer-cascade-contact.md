# Rapport — Footer MPP : inventaire + cascade CONTACT

> Session Claude Code. Rapport également consigné dans Notion
> « 📨 Rapports Claude Code » (base SIGOLINK).

## Paramétrage relevé
- **Repo** : `brianrobertpro-arch/mes-premiers-pas` (la session avait démarré par erreur
  dans `sigolink-backend` — corrigé : repo ajouté + cloné avant tout code).
- **Branche de base** : `claude/totems-footer-css-mojvcd` @ `0fb07dc`
- **Branche de travail** : `claude/footer-webflow-inventory-3jfhek`
- **SHA livré** : `8651ecf` (poussé)
- Pages `.html` à la racine (pas de `site-mpp/`), overrides maison dans `mpp/`. Template Astro non touché.

---

## Phase 1 — Inventaire des 5 points

| # | Point | État |
|---|-------|------|
| 1 | Téléphone iPhone en SVG | **ABSENT** — à créer intégralement |
| 2 | Alternance Insta/FB synchro + hover-lock | **ABSENT** — dépend de l'item 1 |
| 3 | Frame CONTACT en cascade timée | **ABSENT à la base → développé cette session** |
| 4 | Totems | **FAITS** — non retouchés |
| 5 | Structure footer | cartographiée (cf. ci-dessous) |

### 1. iPhone SVG — ABSENT
Aucun SVG inline de téléphone dans `index.html`, rien dans `mpp/img/`
(juste `hero-*.jpg`, `reseau-facebook.svg`, `reseau-instagram.svg`), aucune règle
`.phone`/`.iphone`/`.mockup`/`.screen`. Le seul hit « iPhone » du repo est la
détection user-agent de `lenis.min.js` — sans rapport.

### 2. Alternance Insta/FB + hover-lock — ABSENT
Le bloc social (`.infos-reseaux > .div-res`) = deux liens **statiques**
(`.reseaux.insta` + `.reseaux`), chacun une `<img>` SVG figée. Aucun verrou au survol,
aucune alternance temporisée, aucune synchro bouton↔écran.

### 3. Frame CONTACT en cascade timée — ABSENT à la base
À la base, `.contact` = HTML statique (titre `.heading-6`, e-mail `.block-quote`,
deux tél `.paragraph`/`.paragraph-2`). Zéro delay échelonné dans le bloc contact.

### 4. Totems — FAITS
- HTML : `.footer-section > .footer-section-wrapper > .photo-deco` → 7
  `<img class="Image-bg-footer-01..07">`.
- `mpp/data.json` (clé `icones`) cible chaque sticker par un fragment unique d'URL,
  remplace 4 stickers par des aquarelles R2 (`totem-foret/savane/ocean/montagne.png`,
  classe `mpp-totem`) et masque 3 anciens (pingouin, goutte, note).
- `mpp/icones.js` : précharge (filet anti-image-cassée), injecte `#mpp-icones-style`
  → `:root{--mpp-totem-opacity:0.55}`, `.mpp-totem{opacity:var(...);transform:scale(1.45);
  z-index:0;pointer-events:none}`, force `.content-footer,.informations-complementaire
  {position:relative;z-index:2}`. Ré-application via interval + MutationObserver.

### 5. Structure du footer
**Deux blocs `<style>` visent les stickers :**
1. `<head>` (~l.590-681) : `.Image-bg-footer-1..5` (un chiffre) → **MORT** (le HTML rend
   en deux chiffres `-01..-07`).
2. Embed footer (~l.2486-2567) : `.Image-bg-footer-01..10` + responsive + `opacity:0.3`
   → **VIVANT**. `.mpp-totem` surcharge ensuite l'opacité à 0.55 `!important` (4 totems).

**Deux moteurs Matter.js** sur les MÊMES stickers : IIFE (l.2580-2766, gravité 0,
IntersectionObserver) **et** classe `FooterPhysicsAnimation` (l.3168-3499, gravité 0.5
+ souris, `DOMContentLoaded+100ms`) → redondance/conflit. Zone fragile laissée intacte.

**HTML rendu (l.2766)** : `.content-footer` = `.infos-reseaux` + `.separateur` +
`.contact` ; puis `.informations-complementaire`.

---

## Phase 2 — Plan de reprise
1. **Cascade CONTACT** ← commencé par là (indépendant, risque minimal, DA précise).
2. **iPhone SVG** (substrat de l'item 2, le plus risqué).
3. **Alternance Insta/FB + hover-lock** (nécessite l'écran de l'iPhone).

---

## Phase 3 — Développé : cascade CONTACT
Uniquement dans `mpp/` (aucun fichier ajouté) :
- **`mpp/overrides.css`** : `.contact` se révèle ligne par ligne
  (titre → e-mail → tél « Vers » → siège). `opacity:0` + `translateY(16px)` → visible ;
  **fondu 480 ms**, **easing `cubic-bezier(0.22,1,0.36,1)`**, delays **0/130/260/390 ms**.
  `@media (prefers-reduced-motion: reduce)` → état final visible, sans mouvement.
- **`mpp/overrides.js`** : IIFE autonome, pose `.is-revealed` via IntersectionObserver
  (seuil 0.35), repli immédiat si reduced-motion / pas d'IO.

**Vérif Playwright (Chromium)** :
- Normal : caché avant scroll (opacity 0) → révélé à l'entrée, 4 lignes opacity 1,
  delays 0/0.13/0.26/0.39 s, 0 erreur console.
- Reduced-motion : révélé d'emblée, sans mouvement, 0 erreur.
- Non-régression : 7 stickers/totems intacts dans les deux cas.

**Conformité DA** : easing signature ✓ · fondu 480 ms ✓ · cascade 130 ms ✓ ·
reduced-motion ✓ · titre Contact vanille inchangé ✓.

---

## Ce qui reste
- **iPhone SVG** (item 1) — IDs préfixés `svg-footer-<noeud>`, cadre photo 16px,
  à intégrer sans casser `overflow:hidden` ni les deux moteurs physiques.
- **Alternance Insta/FB + hover-lock** (item 2) — après l'iPhone.
- **Dette technique (hors périmètre)** : bloc `<style>` mort à un chiffre +
  double moteur Matter.js sur les mêmes stickers.
- **Écart DA à trancher** : la DA annonce une cascade hero de **130 ms**, le code live
  échelonne à **~250 ms** (`timing={line1:300,line2:550,line3:800,line4:1050…}`).
  La cascade CONTACT suit la valeur DA explicite (130 ms).
