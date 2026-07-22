# Fiche de Direction Artistique — Mes Premiers Pas (`site-mpp`)

> **Extraction du code réel** — micro-crèches Mes Premiers Pas.
> Cette fiche est **auto-portante** : elle est lisible sans avoir vu le code.
> Chaque valeur est traçable à un fichier et une ligne (colonne « Source »).
>
> **Branche relevée** : `claude/da-mpp-extraction-5bkv2y`
> **Commit de base** : `a4f2b3b`
> **Généré le** : 2026-07-22 · lecture seule, aucune modification du site.

---

## 0. Comment lire cette fiche — l'architecture des styles

Le site est un export Webflow « aspiré » (statique), posé à la **racine du repo**
(il n'y a pas de dossier `site-mpp/` : les pages `.html` et le dossier `mpp/` sont
à la racine). Le style vient de **trois couches**, chargées dans cet ordre :

| Couche | Fichier(s) | Statut | Rôle |
|---|---|---|---|
| 1. CSS Webflow exporté | `assets/cdn.prod.website-files.com/6976e155d54ea0f654b007b1/css/mes-premier-pas.webflow.shared.1a07ee41e.css` (4 619 lignes) — noté **`webflow.shared.css`** ci-dessous | Héritage : **beaucoup de classes mortes** | Base du site : palette-tokens, typographies, footer, sections d'origine |
| 2. Overrides maison | `mpp/overrides.css`, `mpp/hero.css`, `mpp/trail.css`, `mpp/cta.css`, `mpp/carousel.css`, `mpp/planning.css` (≈ 1 000 lignes) | **Vivant, écrit à la main** — le vrai travail de DA | Refonte navbar + badge MENU, hero recomposé, chemin d'empreintes, CTA animé, flèches de carrousel, décalage du diagramme |
| 3. Styles inline | 10 blocs `<style>` + attributs `style="…"` dans chaque `.html` | **Vivant** (rendu) | Embeds : carrousel 3D, diagramme « journée type », cartes valeurs, footer « physics » |

**Méthode de tri utilisé / mort :**
- Les couches **2 et 3 sont traitées comme vivantes** : elles sont écrites à la main et effectivement rendues.
- Pour la **couche 1 (Webflow)**, une valeur n'est consignée **que si la classe/le sélecteur apparaît réellement dans le HTML rendu**. Exemple typique de **valeur morte écartée** : les classes `.h1-hero-main._01/._02/._03/._04` (`webflow.shared.css:2672-2704`) définissent l'ancien titre du hero — elles ne sont **plus dans `index.html`**, remplacées par le hero maison `.mpp-hero-*`. Elles ne sont donc **pas** de la DA actuelle de l'accueil (elles restent utilisées sur d'autres pages, voir §Incohérences).
- **Comptage** : une valeur relevée « 40× » est une règle ; « 1× » est une exception, signalée comme telle.
- Le **widget dev** (`mpp/hero.css:396-462`, barre flottante de choix du fond) est **injecté uniquement en local** (`localhost`) : hors périmètre production, **exclu** de la DA.

---

## 1. Positionnement

Chaleur, confiance parentale, douceur — **sans infantilisme**. Un **premium accessible**.
Ce positionnement se lit dans le code :

- **Palette pastel chaude** (beige/crème/vanille) posée en fond, relevée d'accents vifs mais doux (lime, orange, bleu, violet, rose).
- **Typographie manuscrite** (Fuzzy Bubbles) réservée aux titres et au badge « MENU » → registre affectif, enfantin **maîtrisé** ; corps en Nunito (humaniste, ronde, lisible) → sérieux et confort de lecture.
- **Verre teinté translucide** partagé navbar + pilule réseaux (`--verre-*`) → matière contemporaine, « premium ».
- **Micro-animations lentes et douces** (easing `cubic-bezier(0.22, 1, 0.36, 1)`, cycles 2,4 s) → jamais agité, rassurant.
- **Accessibilité prise au sérieux** : paires fond→texte du hero **mesurées en WCAG** (`mpp/hero.css:11-39`), et respect systématique de `prefers-reduced-motion`.

---

## 2. Palette

### 2.1 Palette de marque (source de vérité)

Définie deux fois, **à l'identique** : une fois comme tokens Webflow (`webflow.shared.css:2217-2234`),
une fois comme tokens maison (`mpp/overrides.css:11-16`). C'est la palette officielle.

| Rôle | Hex | Token Webflow | Token maison | Occurrences* | Usage constaté |
|---|---|---|---|---|---|
| Fond principal (beige) | `#e1dccc` | `--_couleurs---c-bg-1` | `--mpp-bg-1` | ~5× HTML + 4× mpp | Fond de sections, fond hero par défaut |
| Fond carte (crème) | `#ebe6d4` | `--_couleurs---c-bg-card` | `--mpp-cream` | 2–3× | Fond de cartes, séparateur footer |
| Lime | `#d9dd7e` | `--_couleurs---c-lime` | `--mpp-lime` | **51× HTML** | Accent dominant : titres footer, boutons CTA, textes footer, diagramme |
| Vanille | `#eeefa2` | `--_couleurs---c-vanille` | `--mpp-vanille` | 2–3× | Titre « Contact » du footer, fond hero option |
| Bleu | `#8195c2` | `--_couleurs---c-bleu` | `--mpp-bleu` | ~8× | Titres `.heading-2`/`.heading-number`, focus-visible, CTA navbar |
| Violet | `#8985d5` | `--_couleurs---c-violet` | `--mpp-violet` | ~6× | Accent (spirales, fond hero option) |
| Orange | `#e8a248` | `--_couleurs---c-orange` | `--mpp-orange` | **33× HTML** | Accent chaud : cartes valeurs, diagramme, hero `.h1-hero-main` |
| Rose | `#c14c7c` | `--_couleurs---c-rose` | `--mpp-rose` | ~6× | Accent fort (seul fond hero exigeant du texte blanc) |
| Encre (texte fort) | `#1b1b1b` | `--_couleurs---c-ink` | `--mpp-ink` | ~4× mpp | Texte navbar, titres hero, contours de lettres |
| Texte courant | `#4a4a4a` | `--_couleurs---c-text-main` / `c-text-nav` | `--mpp-text` | 3× mpp | Texte gris du site d'origine, chevrons de carrousel |
| Blanc | `#ffffff` / `#fff` | `--_couleurs---white` | `--mpp-white` | nombreux | Texte sur fonds soutenus, survols navbar |

*Occurrences = décomptes bruts de la chaîne hex dans les fichiers vivants (`mpp/*.css` + `*.html`). Un même token peut aussi être appelé par `var()`, non compté ici.

**Dérivés d'opacité de la marque** (mêmes teintes, alpha Webflow en notation `#RRGGBBAA`) :

| Hex | Base | Où | Source |
|---|---|---|---|
| `#d9dd7e99` | lime ~60 % | Fond des boutons `.button.type1` | `webflow.shared.css:2228,2504` |
| `#d9dd7ecc` | lime ~80 % | Bouton `.type1:hover` | `webflow.shared.css:2514` |
| `#e8a2488a` | orange ~54 % | Couleur de `.h1-hero-main` (autres pages) | `webflow.shared.css:2663` |
| `#8195c2d6` | bleu ~84 % | Fond `.button` de base | `webflow.shared.css:2493` |
| `#4a4a4abf` | texte ~75 % | `--_couleurs---c-button` | `webflow.shared.css:2233` |
| `#e1dccc33` / `#e1dccc80` | beige 20 %/50 % | Fond box-réseaux d'origine / `.reseaux:hover` | `webflow.shared.css:2707,3381` |

### 2.2 Couleurs propres au logo (menu badge)

Deux limes **plus vifs** que le lime de marque, échantillonnés dans le logo, **réservés au badge « MENU »** :

| Hex | Token | Rôle | Occ. | Source |
|---|---|---|---|---|
| `#d9f86a` | `--mpp-logo-lime` | Fond du cercle badge MENU | 1× | `mpp/overrides.css:18` |
| `#f2fcc0` | `--mpp-logo-halo` | Halo autour du badge | 1× | `mpp/overrides.css:19` |

> ⚠ **Trois limes coexistent** : `#d9dd7e` (marque), `#d9f86a` (logo), `#f2fcc0` (halo). Ici c'est **intentionnel** (le badge doit reproduire la couleur exacte du logo), mais à documenter pour ne pas croire à une erreur. Voir §Incohérences.

### 2.3 Couleurs locales aux embeds (vivantes mais hors palette de marque)

Chaque embed apporte sa **micro-palette** locale, non tirée des tokens de marque :

| Hex | Occ. | Embed / localisation | Source |
|---|---|---|---|
| `#2a3444` | 15× | Texte des cartes **carrousel crèches** | `index.html:1214-1432` |
| `#6b7fd7` | 9× | Texte/labels du **diagramme journée type** | `index.html:2270-2335` |
| `#c47a30` | 7× | Traits du soleil (yeux, sourire) du diagramme | `index.html:2302-2306` |
| `#d37e42` | 3× | Fond de la carte « VALEUR N.3 » | `index.html:1995-2007` |
| `#333` | 25× | Gris de texte générique (embeds) | plusieurs `.html` |
| `#555` | 13× | Gris de texte secondaire (embeds) | plusieurs `.html` |
| `#666` / `#999` / `#444` / `#111` / `#bbb` | 1–5× | Gris utilitaires d'embeds | plusieurs `.html` |
| `#e5e0d8` | 1–2× | Beige clair (embed) | `about.html`, `index.html` |
| `#e8a849`, `#8e9ec2`, `#3a3a50`, `#ddd8c4` | 2–4× | Micro-palette des **pages crèches** | `nos-creche-vers-foret.html`, `nos-creche-vers-ocean.html` |

---

## 3. Typographies

### 3.1 Familles chargées

Trois familles de marque, **doublement chargées** (self-host Webflow `@font-face` **et** Google Fonts CDN) :

| Famille | Rôle DA | Chargée par |
|---|---|---|
| **Fuzzy Bubbles** (`Fuzzybubbles`) | **Titres** + badge MENU (manuscrit) | `@font-face` `webflow.shared.css` + `<link>` Google Fonts |
| **Nunito** | **Corps de texte** (`--_style-globaux---font-pg`) | idem |
| **Raleway** | **Sous-titres / navigation** (`--_style-globaux---font-hx`) | idem |

Poids **déclarés** en `@font-face` : très nombreux (Nunito 200→900, Raleway 100→900, Fuzzybubbles 400/700).
**La plupart sont morts.** Poids **effectivement appelés** par les classes rendues :

| Famille | Poids réellement utilisés | Preuve |
|---|---|---|
| Fuzzy Bubbles | **400** (titres footer, badge) et **700** (`h1`, `.button`) | `webflow.shared.css:2247,2498,3401,3415` · `mpp/overrides.css:266` |
| Nunito | **400** (`.heading`), **500** (`.main-text`,`.heading-3/4`), **600** (`.ff-footer`) | `webflow.shared.css:2758,3059,3182,3255,3369` |
| Raleway | **400** (`.subtitle`), **600** (`.link` nav) | `webflow.shared.css:3052,2447` |

> Reste chargé mais **non utilisé** : famille **Caveat** (Google Fonts, une page seulement) et les poids Nunito/Raleway 100/200/300/900. → §Incohérences.

### 3.2 Échelle par niveau (valeurs réellement rendues)

| Niveau | Famille | Taille | Graisse | Interlignage | Couleur | Source |
|---|---|---|---|---|---|---|
| **H1 hero (accueil)** `.mpp-hero-titre` / `.mpp-hero-l` | Fuzzy Bubbles (hérité de `h1`) | `clamp(3rem, 6.6vw, 6.5rem)` | 700 | `1.02` | `var(--hero-text)` (selon fond) | `mpp/hero.css:94,161-167` |
| **H1 générique** `h1` | Fuzzy Bubbles | `4rem` | 700 | `44px` | — | `webflow.shared.css:2244-2251` |
| **`.h1-hero-main`** (hero des autres pages) | Fuzzy Bubbles | `5rem` (`._01`=`4.5rem`) | 700 | — | `#e8a2488a` + contour encre 1px | `webflow.shared.css:2662-2670` |
| **H2** `.heading-2` | Nunito | `3rem` | 300 | — | bleu `#8195c2`, centré | `webflow.shared.css:3171-3176` |
| **H3** `.heading-3` | Nunito | (défaut `h3`) | 500 | — | centré | `webflow.shared.css:3179-3183` |
| **H3 footer** `.heading-5` (« Rejoignez-nous ! ») | Fuzzy Bubbles | `2.5rem` | 400 | `1.2` | lime `#d9dd7e` | `webflow.shared.css:3398-3405` |
| **H3 footer** `.heading-6` (« Contact ») | Fuzzy Bubbles | `2.5rem` | 400 | — | vanille `#eeefa2` | `webflow.shared.css:3413-3418` |
| **H4 sous-titre** `.subtitle` (« Qui somme nous ? ») | Raleway | (défaut) | 400 | — | — | `webflow.shared.css:3050-3053` |
| **Chiffre diagramme** `.heading-number` | Nunito | `2.2rem` | 300 | — | bleu `#8195c2` | `webflow.shared.css:3228-3233` |
| **Légende diagramme** `.heading-4` | Nunito | `1.1rem` | 500 | — | centré | `webflow.shared.css:3251-3255` |
| **Corps principal** `.main-text` | Nunito | `1.8rem` / lh `2.4rem` | 500 | `2.4rem` | — (max-width `40vw`) | `webflow.shared.css:3055-3061` |
| **Corps footer** `.rich-text-block` | Nunito | `1.1rem` | (défaut) | — | lime `#d9dd7e` | `webflow.shared.css:3420-3429` |
| **Coordonnées footer** `.ff-footer` | Nunito | (défaut) | 600 | — | lime `#d9dd7e` | `webflow.shared.css:3366-3369` |
| **Lien navbar** `.link` (rendu maison) | Raleway (héritée) | `clamp(13px, 1.2vw, 15px)` | — | `1.5` | encre `#1b1b1b` → blanc au survol | `mpp/overrides.css:25,179-206` |
| **Téléphone navbar** `.link-2` | Nunito | `clamp(13px,1.2vw,15px)` | — | — | encre | `webflow.shared.css:2482-2483` + `mpp/overrides.css:207` |
| **Badge « MENU »** | Fuzzy Bubbles | `13px` (mobile `11px`) | 700 | `1` | encre | `mpp/overrides.css:264-270,302` |
| **Corps par défaut** `body` | **Arial/Helvetica** | `14px` | — | `20px` | `#333` | `webflow.shared.css:2237-2242` |

### 3.3 Letter-spacing relevés

| Valeur | Où | Source |
|---|---|---|
| `2px` | `.nav-link-2` (héritage) | `webflow.shared.css:2256` |
| `0.08em` | Badge MENU (label) | `mpp/overrides.css:267` |
| `0.06em` | Barre dev (exclue) | `mpp/hero.css:426` |
| `0.02em` / `0.01em` | Embeds / liens navbar | `index.html`, `mpp/overrides.css:184` |

> Pas de système d'interlettrage unifié : valeurs ponctuelles, mélange `px` / `em`.

---

## 4. Espacements

### 4.1 Constat d'ensemble : deux régimes

- **Webflow d'origine** : padding/margin en **unités de fenêtre** — `vh` **26×**, `vw` **15×**, `rem` 14×, `px` 53× (`webflow.shared.css`). L'usage massif de `vh`/`vw` pour des espacements **rend la mise en page fragile** (redimensionner la fenêtre en hauteur change des marges horizontales).
- **Overrides maison (`mpp/*.css`)** : régime assaini — **`rem` 11× + `px` 10×**, avec des `clamp()` fluides bornés. C'est là qu'existe **une vraie échelle**.

### 4.2 Échelle maison (navbar & hero — tokens explicites)

| Token | Valeur | Rôle | Source |
|---|---|---|---|
| `--nav-text-size` | `clamp(13px, 1.2vw, 15px)` | Taille unique de la nav | `mpp/overrides.css:25` |
| `--nav-gap` | `clamp(0.4rem, 0.95vw, 1.4rem)` | Écart entre items nav | `mpp/overrides.css:26` |
| `--nav-pad-y` / `--nav-pad-x` | `0.55rem` / `clamp(0.75rem, 1.5vw, 1.6rem)` | Padding pilule nav | `mpp/overrides.css:27-28` |
| `--nav-top` | `24px` | Air au-dessus de la pilule | `mpp/overrides.css:35` |
| `--nav-pill-h` | `64px` | Hauteur pilule | `mpp/overrides.css:36` |
| `--nav-height` | `calc(24px + 64px)` = 88px | **Source de vérité** de hauteur nav | `mpp/overrides.css:37` |
| `--hero-rythme` | `clamp(3rem, 7vh, 6.5rem)` | Écart régulier entre rangées du hero | `mpp/hero.css:96` |
| `--hero-gouttiere` | `clamp(0.75rem, 1.6vw, 1.75rem)` | Gouttière de grille hero | `mpp/hero.css:98` |
| `--reseaux-pad` | `clamp(14px, 1.4vw, 19px)` | Padding pilule réseaux | `mpp/hero.css:100` |
| `--hero-marge-x` | `15vh` | Marge latérale hero (**repris tel quel** du site) | `mpp/hero.css:114` |

> ⚠ `--hero-marge-x: 15vh` : espacement **horizontal exprimé en `vh`** — hérité de `.section.qui-somme-nous` (padding-left/right `15vh`), conservé à la demande de Brian pour l'alignement. Fragile mais assumé (`mpp/hero.css:110-114`).

### 4.3 Valeurs de `gap` récurrentes (fichiers vivants)

`16px` (8×) · `12px` (6×) · `8px` (5×) · `6px` (4×) · `20px` (4×+3×) · `10px` (3×) · `24px` (2×) · `4px` (2×).

→ Une **échelle en multiples de 4** émerge dans le code maison/embeds (4-6-8-12-16-20-24), mais elle **n'est pas nommée en tokens** ni appliquée partout. Cohérente en tendance, arbitraire dans le détail.

### 4.4 Décalages composés (dépendances de tokens)

| Valeur | Calcul | Source |
|---|---|---|
| Décalage diagramme « journée type » | `calc(--badge-top + --badge-size + 18px)` | `mpp/planning.css:9-14` |
| Panneau dropdown navbar | `top: calc(--nav-height + 12px)` | `mpp/overrides.css:228` |
| Padding haut du hero | `calc(--nav-height + 8px + --hero-sous-navbar)` | `mpp/hero.css:146` |

> Bon point : les espacements maison **s'accrochent à des tokens** (`--nav-height`, `--badge-*`) au lieu de nombres magiques → un seul réglage se propage.

---

## 5. Rayons de bordure

| Valeur | Occ. | Usage constaté | Source(s) |
|---|---|---|---|
| `50%` | 19× | Cercles : badge MENU, boutons flèches carrousel, pastilles | `mpp/overrides.css:249`, `mpp/carousel.css:16` |
| `999px` | 5× | Pilules : navbar, CTA navbar, CTA mobile | `mpp/overrides.css:89,216,326` |
| `16px` | 8× | **Cadre photo du hero** | `mpp/hero.css:192` |
| `14px` | 2× | Pilule réseaux du hero | `mpp/hero.css:320` |
| `18px` | 1× | Panneau dropdown navbar | `mpp/overrides.css:234` |
| `12px` | 5× | Masque image « qui sommes-nous », focus CTA | `index.html:294`, `mpp/cta.css:24` |
| `0 0 12px 12px` | 11× | Coins bas des cartes carrousel | embeds `index.html` |
| `50px` | 7× | Pilules d'embeds (boutons cartes) | embeds `index.html` |
| `25px` / `30px` / `20px` / `10px` / `8px` / `6px` / `3px` / `2px` | 1–5× chacun | Divers embeds / Webflow | multiples |
| `10vh` (`.button.type1`) | — | Rayon **en `vh`** (Webflow) | `webflow.shared.css:2505` |
| `1vh` / `3vh` (box-réseaux, cartes) | — | Rayon **en `vh`** (Webflow) | `webflow.shared.css:2708` |

> **Deux systèmes de rayons** : le maison en `px`/`999px` (net, prévisible) ; l'origine Webflow en `vh` (`10vh`, `1vh`, `3vh`) qui **change avec la hauteur de fenêtre**. Pas de token de rayon unifié. Voir §Incohérences.

---

## 6. Animations existantes

### 6.1 Tokens de timing maison (courbe signature)

**Easing signature du site** : `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out doux), réutilisé partout (navbar, hero, transitions de fond).

| Bloc | Durées | Easing | Délais / cascade | Déclencheur | Source |
|---|---|---|---|---|---|
| **Navbar** (slide + fade) | slide `380ms`, fade `260ms` | `cubic-bezier(0.22,1,0.36,1)` | — | `html[data-nav=open/closed]` | `mpp/overrides.css:62-64,72-73` |
| **Badge MENU** | fade `260ms` / slide `380ms` | idem | **retour retardé `400ms`** (réapparaît après fermeture) ; disparaît immédiatement à l'ouverture | même attribut | `mpp/overrides.css:54,256-283` |
| **Roulement des liens nav** | `0.34s` | `cubic-bezier(0.77,0,0.175,1)` | — | `:hover` (le libellé roule, révèle une copie blanche) | `mpp/overrides.css:198` |
| **Hero — arrivée** | glisse `620ms`, fondu `480ms` | `cubic-bezier(0.22,1,0.36,1)` | cascade `130ms` ; retards **0 / 130 / 260 / 390 / 520 / 650 / 780 ms** | `html[data-hero-anim=on]` (posé au chargement par `hero.js`) | `mpp/hero.css:119-122,232-238` |
| **Hero — changement de fond** | `320ms` | `cubic-bezier(0.22,1,0.36,1)` | — | changement de `data-hero-bg` | `mpp/hero.css:49,56,64` |
| **Hero — parallaxe photo** | — (piloté image par image) | — | — | scroll (`hero.js`) | `mpp/hero.css:207-218` |
| **CTA flèche (« Nos crèches »)** | cycle `2.4s`, boucle infinie ; amplitude `10px` | `cubic-bezier(0.45,0,0.55,1)` | — | permanent ; **pause au `:hover`** (plonge +4px) | `mpp/cta.css:8-10,47-61` |
| **Flèches carrousel** | `0.3s` (`transition: 0.3s`) | (défaut) | — | `:hover` → `scale(1.08)` (translateY(-50%) préservé) | `mpp/carousel.css:26,46-49` |
| **Chemin d'empreintes** | `opacity/transform 90ms linear` (lissage) ; pilotage réel **image par image** | linéaire | — | scroll (`trail.js`) : les empreintes « marchent » et s'effacent | `mpp/trail.css:44,31-46` |

### 6.2 Animations d'embeds (inline)

| Bloc | Animation | Source |
|---|---|---|
| **Split-text (caractères)** | `opacity 0.3s ease-out` + `translateY(12px)` par caractère | `index.html:248-258` |
| **Cascade « Qui sommes-nous »** | `0.7s cubic-bezier(0.16,1,0.3,1)` + `translateY(30px)` ; **délais 0 / 0,1 / 0,2 / 0,3 s** (sous-titre → cœur → image → spirale) | `index.html:263-279` |
| **Diagramme « journée type »** (SVG) | keyframes `sunRise 1s ease-out`, `draw 0.7s` (délais 0,6→1,3 s), `fadeUp 0.5s` (délais 1,0→1,7 s), `smileDraw 0.8s @1.3s`, `smileGlow`, `smilePulse 2s @2.5s ∞`, `blink 4s @1.5s ∞`, `labelFade 0.5s @2s` | `index.html:2080-2135` |
| **Footer « physics »** | Simulation **Matter.js** : stickers en chute/rebond physique (classe `FooterPhysicsAnimation`) + révélation JS temporisée des blocs (`elements.reseaux`, etc.) | `index.html:3170-3496`, JS `~3061` |

### 6.3 `prefers-reduced-motion`

**Systématiquement respecté** : chaque module maison neutralise ses transitions et rétablit l'état final visible (`mpp/overrides.css:334-340`, `mpp/hero.css:67-80`, `mpp/cta.css:64-70`, `mpp/carousel.css:51-54`, `mpp/trail.css:55-57`). Bon réflexe d'accessibilité.

---

## 7. Traitement photo

### 7.1 Hero (composition maison)

| Aspect | Valeur | Source |
|---|---|---|
| Cadre : rayon | `16px` | `mpp/hero.css:192` |
| Cadre : ombre | `0 14px 40px -18px rgba(27,27,27,0.5)` (portée, basse, diffuse) | `mpp/hero.css:193` |
| Ratios | maquillage & cuisine `4/3` ; chemin `3/4` (portrait) | `mpp/hero.css:203-205` |
| Recadrage | `object-fit: cover` | `mpp/hero.css:215` |
| Effet | **Parallaxe** : la photo est plus haute que son cadre (`height: calc(100% + 2×34px)`), elle coulisse verticalement au scroll ; le cadre, lui, ne bouge jamais (`overflow: hidden`) | `mpp/hero.css:184-218` |
| Fond hero | Photo distante **remplacée par une couleur pleine** (`--hero-bg`), 8 fonds possibles | `mpp/hero.css:46-50,19-26` |

### 7.2 Section « Qui sommes-nous »

| Aspect | Valeur | Source |
|---|---|---|
| Masque image | `border-radius: 12px`, `overflow: hidden` | `index.html:292-297` |
| Image | `height: 120%`, `object-fit: cover` (réserve pour parallaxe) | `index.html:299-304` |
| Décor | Cœur (`70px`) et spirale (`110px`) SVG en débord, en `position: absolute` autour du masque | `index.html:309-336` |

### 7.3 Cartes crèches / équipe (carrousels)

| Aspect | Valeur | Source |
|---|---|---|
| Ratios de cartes | `4/3`, `4/3.2`, `4/3.5`, `4/4.2` (progressifs) | embeds `index.html` |
| Rayon bas de carte | `0 0 12px 12px` (11×) | embeds `index.html` |
| Flèches de nav | fond `rgba(255,255,255,0.95)`, `border-radius: 50%`, ombre `0 4px 15px rgba(0,0,0,0.1)` | `mpp/carousel.css:14-16` |

### 7.4 Overlays « verre teinté » (matière signature)

| Token | Valeur | Où | Source |
|---|---|---|---|
| `--verre-bg` | `rgba(245, 245, 242, 0.4)` | Navbar + pilule réseaux hero | `mpp/overrides.css:57` |
| `--verre-blur` | `blur(18px) saturate(1.15)` | idem | `mpp/overrides.css:58` |
| `--verre-ombre` | `0 6px 28px rgba(27, 27, 27, 0.1)` | idem | `mpp/overrides.css:59` |

Autres flous relevés (embeds) : `backdrop-filter: blur(16px)` (10×), `blur(20px)` (5×), `blur(10px)`, `blur(14px)`, `blur(4px)` — **non unifiés** hors du token `--verre-blur`.

### 7.5 Filtres photo

Aucun filtre chromatique global (pas de `grayscale`, `sepia`, teinte). Seul effet ponctuel : `drop-shadow` de brillance au survol des stickers du footer (`index.html:637-639`, bloc partiellement écrasé par le bloc footer suivant — voir §Incohérences).

---

## 8. Incohérences relevées (arbitrage de Brian)

1. **Deux jeux de tokens de couleur en parallèle.** La palette existe en double — tokens Webflow `--_couleurs---c-*` (`webflow.shared.css:2217-2234`) **et** tokens maison `--mpp-*` (`mpp/overrides.css:11-16`), avec les **mêmes valeurs**. Risque de divergence si l'un est modifié sans l'autre. → *Choisir une source de vérité unique.*

2. **Trois limes proches.** `#d9dd7e` (marque), `#d9f86a` (logo badge), `#f2fcc0` (halo). Documenté comme **intentionnel** (le badge copie le logo), mais visuellement ambigu. → *Confirmer que les trois doivent rester distincts.*

3. **Quasi-doublons de couleur (probables scories d'export/embed)** :
   - Orange : `#e8a248` (marque) vs **`#e8a849`** (2×, pages crèches) — écart d'1 chiffre, très probablement une **scorie**.
   - Bleu : `#8195c2` (marque) vs **`#8e9ec2`** (2×, pages crèches) — quasi-doublon.
   - Orange sombre : `#c47a30`, `#d37e42`, `#d4912e`, `#c4811e` — 4 variantes chaudes proches, dispersées dans les embeds (diagramme, cartes valeurs) sans logique commune.
   - Bleu sombre : `#2a3444`, `#1a1a2e`, `#2a2a3a`, `#3a3a50`, `#6b7fd7`, `#9aacbf`, `#b5c0d4` — famille bleue d'embeds non rationalisée.
   → *Trancher : sont-ce des teintes voulues ou à réaligner sur les tokens de marque ?*

4. **Gris non tokenisés.** `#333`, `#555`, `#666`, `#999`, `#444`, `#111`, `#bbb`, `#3d3d3d`, `#6b6b6b` apparaissent dans les embeds sans correspondance avec `--mpp-ink`/`--mpp-text`. → *Rattacher aux tokens ou assumer comme palette d'embed.*

5. **Corps de page en Arial.** `body` reste en `Arial/Helvetica 14px/#333` (`webflow.shared.css:2237-2242`) alors que la police de corps de marque est **Nunito**. Le texte n'est en Nunito que **via des classes** ; tout texte non classé retombe en Arial. → *Poser Nunito sur `body`.*

6. **Polices sur-chargées et redondantes.** Familles et poids chargés **deux fois** (self-host `@font-face` **+** Google Fonts CDN). Poids déclarés 200→900 alors que **seuls 400/500/600/700 servent**. Famille **Caveat** chargée (une page) mais **jamais utilisée**. Jeux de poids Google Fonts **incohérents d'une page à l'autre** (`Raleway:600;700` ici, `600;700;800` là, `ital,0,400;1,400` ailleurs). → *Nettoyer : une seule source, poids réellement utilisés.*

7. **Espacements et rayons en `vh`/`vw`.** Le CSS Webflow d'origine dimensionne des espacements **horizontaux et des rayons** en unités de hauteur : `padding: 2vh 2vw`, `border-radius: 10vh / 1vh / 3vh`, `--hero-marge-x: 15vh`. La mise en page bouge avec la fenêtre. Le code maison a assaini (px/rem/clamp) mais **cohabite** avec l'ancien régime. → *Migrer l'origine vers px/rem, ou l'assumer.*

8. **Pas d'échelle d'espacement nommée.** Une tendance en multiples de 4 (4-6-8-12-16-20-24) existe dans les `gap`, mais **aucun token d'espacement** (`--space-1…n`). Chaque valeur est posée à la main. → *Formaliser une échelle si souhaité.*

9. **Deux blocs `<style>` footer « physics » qui se contredisent.** Bloc 1 (`index.html:590-681`) : stickers `width: 80px`, brillance au survol. Bloc 2 (`index.html:2486-2567`) : stickers `160px`, `opacity: 0.3`, 10 stickers responsives. Le second (plus bas) l'emporte ; le premier est **en partie mort**. → *Supprimer le bloc obsolète.*

10. **Le « footer refondu » décrit dans la commande n'existe pas dans cette branche.** La consigne mentionnait une refonte footer avec *cascade CONTACT* et *hover-lock Insta/FB*. **Introuvable dans le code de `claude/da-mpp-extraction-5bkv2y`** (commit `a4f2b3b`) : aucune classe/keyframe de ce type. Le footer présent est le **footer Webflow d'origine** (titres `.heading-5`/`.heading-6`, `.reseaux:hover { scale(1.1) }` — simple survol, pas de « lock ») **+ une animation physique Matter.js** de stickers. → *Voir §Points non déterminés. À confirmer : refonte sur une autre branche, ou pas encore faite ?*

---

## Points non déterminés / limites

- **Refonte footer « cascade CONTACT / hover-lock Insta/FB »** : non trouvée dans cette branche (voir Incohérence 10). Elle est peut-être sur une autre branche (`navbar-menu-badge` existe en local/remote) — non explorée ici (périmètre = branche de session). À vérifier avec Brian.
- **Rendu visuel réel non observé** : extraction **statique** du code (aucun navigateur lancé). Les valeurs en `var()`/`clamp()` sont rapportées telles qu'écrites, pas leur valeur calculée à une largeur donnée.
- **Pages crèches/about non détaillées classe par classe** : seules les couleurs y ont été comptées. Leur typographie propre (si elle diffère de l'accueil) n'a pas été extraite exhaustivement — l'accueil `index.html` a été pris comme référence.
- **CSS Webflow mort non inventorié** : les 4 619 lignes de `webflow.shared.css` contiennent de nombreuses classes non rendues (ex. `.h1-hero-main._0x`, variantes `.button.type1.*`) — écartées par principe, non listées une à une.
