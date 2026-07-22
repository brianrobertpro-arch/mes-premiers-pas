# Mes Premiers Pas — repère de session

## 1. Nature du repo — piège principal

Site Webflow aspiré (crèche « Mes Premiers Pas »), converti en override
statique. **Les pages `.html` sont à la racine** (`index.html`, `about.html`,
`journee-type.html`, `nos-creche-vers-foret.html`, `nos-creche-vers-ocean.html`,
`404.html`) — pas dans un sous-dossier. Les assets Webflow aspirés vivent dans
`assets/`. Les overrides maison (CSS/JS écrits pour ce projet, pas générés par
Webflow) vivent dans `mpp/` : `hero.{css,js}`, `overrides.{css,js}`,
`carousel.{css,js}`, `cta.{css,js}`, `planning.{css,js}`, `trail.{css,js}`,
`smooth.js`, `lenis.min.js`, `data.json`, `img/`.

**Il n'existe pas de dossier `site-mpp/` dans ce repo.** Plusieurs fiches
antérieures l'ont affirmé à tort — vérifié par recherche exhaustive sur la
branche courante : absent. Ne pas le recréer, ne pas s'y référer.

Un **template Astro séparé** existe ailleurs dans l'écosystème du projet
(`data.mpp.json`, `npm run dev:mpp`, port 4323) : **aucune trace dans ce
repo** (aucun `astro.config.*`, aucun `package.json`, aucun `data.mpp.json`
trouvé ici). C'est un autre chantier — ne pas y toucher depuis cette session,
ne pas tenter de le faire apparaître ici.

Le repo `ayano-template` est un projet distinct, sans rapport avec celui-ci.

## 2. Le skill `astro-frontend` ne s'applique pas ici

Ce repo est du HTML/CSS statique aspiré, sans Astro ni pipeline Tailwind. Le
skill vendorisé le dit lui-même dans sa `description` et son garde-fou
(« NE PAS utiliser sur le site MPP » / « Absent → arrêter et le dire »). S'il
se déclenche malgré tout sur ce repo, l'ignorer et le signaler à l'utilisateur.

## 3. Branches — état réel relevé le 2026-07-22

Aucune branche `recovery` n'existe sur ce repo (vérifié : `git branch -a` +
`git ls-remote`). Voici les branches qui portent du travail, avec leur
commit de tête et ce qu'elles contiennent — à consulter avant de
réimplémenter quoi que ce soit :

| Branche | Tête | Contenu propre (commits uniques depuis la base commune `a4f2b3b`) |
|---|---|---|
| `master` | `2cec3a0` | Base : site aspiré tel quel, badge Webflow retiré, assets localisés. Racine de l'historique. |
| `navbar-menu-badge` | `a4f2b3b` (= base commune) | Badge MENU + navbar rétractable 3 états, hero recomposé (parallaxe), CTA flèche animée, carrousel crèches aligné, seuil desktop 820px, `.gitignore` renforcé. **Aucun commit propre au-delà de la base commune** — c'est le point de départ de toutes les branches ci-dessous, y compris celle-ci. |
| `claude/vendorize-skills-claude-md-m0xc47` *(courante)* | idem `a4f2b3b` + ce commit | Vendorisation des skills + ce `CLAUDE.md`. Aucun autre contenu au moment de l'écriture. |
| `claude/mpp-aquarelle-icons-sa2cfp` | `29c56a5` | Icônes aquarelle (section Valeurs pilotée par `data.json`, footer passé à 4 totems, chemins relatifs GitHub Pages), totems footer détourés/z-index — **implémentation indépendante**, SHA propres à cette branche. |
| `claude/totems-footer-css-mojvcd` | `0fb07dc` | Totems footer (opacité réglable, z-index, détourés), fix chemins `mpp/*` GitHub Pages, icônes aquarelle sans cadre CSS. Partage ses commits avec les deux branches ci-dessous (lignée commune plus récente que `mpp-aquarelle-icons-sa2cfp`). |
| `claude/verify-mes-premiers-pas-r27z0g` | `9639ccc` | **Refonte footer la plus complète** : téléphone iPhone stylisé en SVG, écran Insta/FB alternant avec dérive Ken Burns, boutons FB/Insta synchronisés + hover-lock, cascade CONTACT, totems autour du téléphone, + bouton retour-en-haut (Lenis), fix rayons du diagramme Journée type. Diverge de `totems-footer-css-mojvcd` avant `0fb07dc` pour partir sur cette base SVG. |
| `claude/footer-webflow-inventory-3jfhek` *(branche de base désignée pour cette session)* | `b5fd995` | Continue `totems-footer-css-mojvcd` : ajoute la cascade de révélation du bloc CONTACT + `RAPPORT-footer-cascade-contact.md` (inventaire footer, 5 points). **Implémentation de la cascade CONTACT différente de celle de `verify-mes-premiers-pas-r27z0g`** — même objectif, code distinct, aucune des deux mergée. |
| `claude/da-mpp-extraction-5bkv2y` | `47b8938` | Ajoute `da-mpp.md` (fiche DA synthèse), extrait depuis le code réel de cette branche (commit `a4f2b3b`). Note elle-même que la refonte footer « cascade CONTACT / hover-lock » décrite dans une consigne était introuvable à cet endroit de l'historique. |
| `claude/mpp-brand-design-system-av7si3` | `c056d71` | Ajoute `DA-EXTRACTION.md` (détail sourcé ligne par ligne) + `da-mpp.md`. Fiche DA la plus complète et la plus récente des deux branches DA. |

**Constat vérifié** : `mpp-aquarelle-icons-sa2cfp`, `totems-footer-css-mojvcd`,
`verify-mes-premiers-pas-r27z0g` et `footer-webflow-inventory-3jfhek`
réimplémentent chacune, au moins en partie, le même sujet (totems du footer /
icônes aquarelle), avec des SHA de commits différents pour un travail
équivalent — ou en divergeant d'un point commun pour aller dans deux
directions différentes sur la cascade CONTACT. Aucune de ces branches n'est
mergée dans `master`. C'est le phénomène décrit dans la consigne de cette
session : une branche non mergée est invisible pour la session suivante, qui
réimplémente en parallèle.

**Point de départ recommandé pour la prochaine session travaillant sur le
footer** : `claude/footer-webflow-inventory-3jfhek` (la plus récente sur ce
sujet, avec son propre rapport d'inventaire) ou `claude/verify-mes-premiers-pas-r27z0g`
(la plus complète fonctionnellement, mais plus ancienne et divergente) —
**choix à faire par un humain**, pas par la session suivante seule, tant que
ni l'une ni l'autre n'est mergée. Ne pas repartir de `master` ou de
`navbar-menu-badge` pour ce sujet sans consulter ces deux branches d'abord.

## 4. Direction artistique — non négociable

Fiches de référence : `da-mpp.md` (synthèse, branche
`claude/da-mpp-extraction-5bkv2y`) et `DA-EXTRACTION.md` (détail sourcé ligne
par ligne, branche `claude/mpp-brand-design-system-av7si3` @ `c056d71`).
**Ni l'une ni l'autre n'est présente sur la branche courante** — aller les
chercher sur ces branches avant toute décision de DA.

- **Easing signature** : `cubic-bezier(0.22, 1, 0.36, 1)` — réutilisé partout
  (navbar, hero, transitions de fond). Vérifié dans les deux fiches.
- **Cascade de référence** : la DA déclare `130ms` entre éléments
  (`--hero-cascade: 130ms` dans `mpp/hero.css:122`, retards `0/130/260/390/
  520/650/780ms` posés par élément via la variable `--retard`).
  **Écart connu et vérifié** : le hero natif (script `playEntryAnimation()`,
  inline dans `index.html:1090`, `var timing` à `index.html:3045`) échelonne
  en réalité `navbar:0 / line1:300 / line2:550 / line3:800 / line4:1050 /
  reseaux:1400 / footer:1700` — soit un pas d'environ **250ms**, pas 130ms.
  Deux mécanismes de cascade coexistent (`mpp/hero.css` en CSS pur, et le
  script Webflow d'origine en JS) et ne sont pas synchronisés. Ne pas
  trancher seul cet écart : le signaler avant toute retouche du timing hero.
- **Palette** : lime `#d9dd7e` (accent dominant), vanille `#eeefa2` (titre
  Contact du footer), orange `#e8a248`, encre `#1b1b1b`, beige `#e1dccc`,
  crème `#ebe6d4`. Ces six teintes sont utilisées comme fonds de hero
  interchangeables dans `mpp/hero.js` (tableau `FONDS`). Les limes
  `#d9f86a` et `#f2fcc0` sont **réservées au badge MENU** — ne pas les
  réutiliser ailleurs.
- **Typographies** : Fuzzy Bubbles (titres), Nunito (corps), Raleway (nav et
  sous-titres).
- **Verre teinté** : `rgba(245,245,242,0.4)` + `blur(18px) saturate(1.15)` +
  ombre `0 6px 28px rgba(27,27,27,0.1)`.
- **`prefers-reduced-motion` est respecté partout dans ce projet.** Vérifié :
  `mpp/hero.js` teste `window.matchMedia('(prefers-reduced-motion: reduce)')`
  avant d'activer le parallaxe des cadres. **Toute nouvelle animation doit
  faire de même et rétablir l'état final visible** (pas de figeage à
  mi-animation). Non optionnel.
- **SVG inline** : IDs uniques préfixés pour éviter les collisions de masques
  et de dégradés entre plusieurs SVG sur une même page.

## 5. Hiérarchie d'autorité

> Les skills de ce repo décrivent des conventions par défaut. Ils ne priment
> jamais sur la fiche DA du projet ni sur une référence visuelle fournie. En
> cas de contradiction, appliquer la DA et signaler l'écart. Un skill comble
> ce que la DA ne dit pas ; il ne la corrige pas.

## 6. Règles non négociables

- Plan en 5 lignes avant de coder.
- Push à chaque étape validée.
- Chercher la cause racine de tout blocage — pas de contournement silencieux.
- Un rapport de session ne se commite jamais dans ce repo.
- En session cloud, la branche de travail est **imposée par la session** :
  la relever, la consigner, ne pas la choisir.

## 7. Zones fragiles du code — ne pas toucher sans consigne explicite

Les deux points suivants sont vérifiés dans `index.html` (branche courante,
section footer) :

- **Deux moteurs Matter.js indépendants** ciblent les mêmes stickers du
  footer (`.footer-section` / `[class*="Image-bg-footer-"]`) :
  - une IIFE (`index.html:2581`, `Engine.create()` en `2607`) déclenchée par
    un `IntersectionObserver` sur `.footer-section` ;
  - la classe `FooterPhysicsAnimation` (`index.html:3177`, `Engine.create()`
    en `3217`), instanciée en `index.html:3496` sur le même sélecteur
    `.footer-section`.

  Redondance connue, non résolue — ne pas en ajouter un troisième, ne pas
  fusionner les deux sans consigne explicite.

- **Deux blocs `<style>` visent les stickers du footer.** Celui du `<head>`
  (autour de `index.html:643`, sélecteurs `.Image-bg-footer-1` à `-5`, un
  seul chiffre) est **mort** : le HTML rend en réalité des classes à deux
  chiffres (`.Image-bg-footer-01` à `-09`, cf. `index.html:2570-2576` et le
  second bloc `<style>` autour de `index.html:2515-2566`, qui lui est actif
  et porte les vraies règles de taille, y compris les media queries
  responsive). Le premier bloc ne matche donc jamais rien en production.

## Interdits pour cette session et les suivantes

- Modifier le site (`.html`, CSS, JS de `mpp/` ou d'`assets/`).
- Toucher au template Astro externe.
- Inscrire dans ce fichier un fait non vérifié dans le repo — mettre à jour
  cette section « Branches » et cette section « Zones fragiles » dès qu'un
  fait ici cesse d'être exact.
