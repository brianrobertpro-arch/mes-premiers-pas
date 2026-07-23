# DA — Extraction complète · Mes Premiers Pas

> **Rôle du document** : référence de vérité de la direction artistique (DA), **extraite du code réel** du repo `mes-premiers-pas`, pas d'une maquette ni d'un souvenir.
> Le résumé condensé (≤600 tokens) vit dans [`da-mpp.md`](./da-mpp.md) ; **ce fichier-ci est le détail complet** qu'il référence.
> Màj : 2026-07-22.

## 0. Comment lire ce document

Chaque valeur ci-dessous est **sourcée** : `fichier:sélecteur` ou `fichier:token`. Deux systèmes coexistent dans le code et ce document les distingue toujours :

| Système | Où | Nature |
|---|---|---|
| **Webflow d'origine** | `assets/…/mes-premier-pas.webflow.shared.*.css` + blocs `<style>` de `index.html` | Tokens `--_couleurs---c-*`, unités `vh`/`vw`, `body` en Arial 14px. Fragile mais fait foi pour le contenu existant. |
| **Code maison (MPP)** | `mpp/*.css`, `mpp/*.js` | Tokens `--mpp-*`, `--nav-*`, `--hero-*`… ; unités `rem`/`px`/`clamp()`. Ajouté par-dessus Webflow, chargé **après** lui. |

Ordre de chargement CSS : Webflow d'abord → `mpp/overrides.css` (définit `--mpp-*`, `--nav-*`, le verre teinté) → `mpp/hero.css` → composants. Les `!important` du code maison servent à reprendre la main sur Webflow, ils sont donc attendus.

---

## 1. Couleurs

### 1.1 Palette de marque — définie **en double**, mêmes valeurs

Source Webflow : `…webflow.shared.*.css` (`--_couleurs---c-*`).
Source maison : `mpp/overrides.css:11-19` (`--mpp-*`).

| Rôle | Hex | Token Webflow | Token maison | Usage principal |
|---|---|---|---|---|
| Fond beige | `#e1dccc` | (fond de sections) | `--mpp-bg-1` | Fond de sections, hero par défaut |
| Crème | `#ebe6d4` | `--_couleurs---c-bg-card` | `--mpp-cream` | Cartes, séparateur footer |
| **Lime** | `#d9dd7e` | `--_couleurs---c-lime` | `--mpp-lime` | **Accent dominant** : titres footer (`.heading-5`, `.ff-footer`), CTA, diagramme |
| Vanille | `#eeefa2` | `--_couleurs---c-vanille` | `--mpp-vanille` | Titre « Contact » footer (`.heading-6`) |
| Bleu | `#8195c2` | `--_couleurs---c-bleu` | `--mpp-bleu` | `.heading-2`, `focus-visible`, CTA navbar |
| Violet | `#8985d5` | `--_couleurs---c-violet` | `--mpp-violet` | Spirales, fond hero optionnel |
| **Orange** | `#e8a248` | `--_couleurs---c-orange` | `--mpp-orange` | **Accent chaud** : cartes valeurs, diagramme |
| Rose | `#c14c7c` | `--_couleurs---c-rose` | `--mpp-rose` | Accent fort — seul fond qui exige du texte blanc |
| Encre | `#1b1b1b` | `--_couleurs---c-ink` | `--mpp-ink` | Titres, textes forts |
| Texte | `#4a4a4a` | `--_couleurs---c-text-main` / `-text-nav` | `--mpp-text` | Corps de texte |
| Bouton (semi-transp.) | `#4a4a4abf` | `--_couleurs---c-button` | — | Boutons Webflow d'origine |
| Blanc | `#ffffff` | — | `--mpp-white` | Texte sur fond rose, survols de nav |

### 1.2 Limes du logo — réservés au badge MENU

Échantillonnés dans le logo (`mpp/overrides.css:17-19`), **volontairement distincts** du lime de marque :

| Rôle | Hex | Token | Usage exclusif |
|---|---|---|---|
| Fond badge | `#d9f86a` | `--mpp-logo-lime` | Cercle du badge MENU (`.mpp-menu-badge`) |
| Halo badge | `#f2fcc0` | `--mpp-logo-halo` | Anneau `box-shadow` du badge |

> ⚠️ Ne **pas** confondre `--mpp-logo-lime #d9f86a` (badge, plus saturé) avec `--mpp-lime #d9dd7e` (marque). La distinction est intentionnelle.

### 1.3 Contraste hero — paires fond → texte (mesurées WCAG 2.1)

Source : `mpp/hero.css:19-26`. Ratios **mesurés** (luminance relative), pas estimés. Seuil AA texte normal = **4.5**.
Le texte `#4a4a4a` d'origine est écarté du hero : il tombe à 2.96 sur bleu, 2.69 sur violet, 1.94 sur rose → illisible.

| `data-hero-bg` | Fond | Texte auto | Ratio |
|---|---|---|---|
| beige | `#e1dccc` | encre `#1b1b1b` | 12.56 |
| creme | `#ebe6d4` | encre | 13.78 |
| lime | `#d9dd7e` | encre | 11.97 |
| vanille | `#eeefa2` | encre | 14.36 |
| bleu | `#8195c2` | encre | 5.75 |
| violet | `#8985d5` | encre | 5.23 |
| orange | `#e8a248` | encre | 7.95 |
| **rose** | `#c14c7c` | **blanc `#ffffff`** | 4.57 — *seul fond où l'encre échoue (3.77)* |

> Le CTA « Nos différentes crèches » est forcé en **blanc** sur demande (`mpp/hero.css:62-65`). Signalé illisible sur les 4 fonds clairs (beige 1.37 · crème 1.25 · lime 1.44 · vanille 1.20) ; ne passe que sur rose. Laissé blanc volontairement.

### 1.4 Quasi-doublons détectés (arbitrage en attente)

Dans le code actuel, seuls `#8195c2` et `#e8a248` subsistent (5× chacun dans le CSS Webflow). Les variantes historiques `#8e9ec2` (bleu) et `#e8a849` (orange) sont citées comme risque de dérive — à vérifier à chaque ajout de couleur pour ne pas réintroduire un doublon. Voir §12.

---

## 2. Typographies

### 2.1 Familles

| Police | Rôle | Poids servis |
|---|---|---|
| **Fuzzy Bubbles** | Titres décoratifs + badge MENU | 400 (titres footer, badge par défaut) · 700 (h1 hero, boutons, label badge) |
| **Nunito** | Corps de texte | 400 / 500 / 600 |
| **Raleway** | Sous-titres, navigation | 400 / 600 |

> Dans le CSS Webflow la famille est nommée `Fuzzybubbles` (self-host, `font-family: Fuzzybubbles, Arial, sans-serif`) ; dans les blocs `<style>` HTML on trouve `'Fuzzy Bubbles'` (Google Fonts) **et une coquille `'Fuzyybubbles'`** — même police, trois orthographes. À unifier.

### 2.2 Spécimens (valeurs réelles)

| Élément | Source | Spéc |
|---|---|---|
| **H1 hero** | `mpp/hero.css:94,164-165` | Fuzzy Bubbles 700 · `clamp(3rem, 6.6vw, 6.5rem)` · `line-height: 1.02` (avant : `clamp(2.4rem, 5.2vw, 5rem)`) |
| **H2 `.heading-2`** | `…shared.css` | Nunito **300** · `3rem` · bleu `#8195c2` · `text-align: center` |
| **Titre footer `.heading-5`** (« Rejoignez-nous ! ») | `…shared.css` | Fuzzybubbles 400 · `2.5rem` · `line-height: 1.2` · **lime** |
| **Titre footer `.heading-6`** (« Contact ») | `…shared.css` | Fuzzybubbles 400 · `2.5rem` · **vanille** |
| **Corps `.main-text.split-text`** | `…shared.css` | Nunito **500** · `1.8rem` / `line-height: 2.4rem` · `max-width: 40vw` |
| **Mentions footer `.ff-footer`** | `…shared.css` | Nunito 600 · lime |
| **Label badge MENU** | `mpp/overrides.css:264-270` | Fuzzybubbles 700 · `13px` (mobile 11px) · `letter-spacing: 0.08em` · encre |
| **Liens nav** | `mpp/overrides.css:26,179-187` | `--nav-text-size: clamp(13px, 1.2vw, 15px)` · `line-height: 1.5` · `letter-spacing: 0.01em` · encre |
| **Bouton « Fermer »** | `mpp/overrides.css:165-170` | Fuzzybubbles · `--nav-close-size: 12px` |

### 2.3 ⚠️ `body` en Arial 14px

`…shared.css` (bloc `body {…}`, ~ligne 222) : `font-family: Arial, sans-serif; font-size: 14px; line-height: 20px; color: #333`.
**Tout texte non classé retombe donc en Arial**, pas en Nunito. Voir §12.

### 2.4 ⚠️ Polices chargées deux fois

- **Self-host** (`@font-face` du CSS Webflow) : Nunito et Raleway en poids **100 → 900** (10 graisses chacune) + Fuzzybubbles + `webflow-icons`.
- **Google Fonts** (3 balises `<link>` distinctes dans `index.html`) :
  - `Nunito:wght@400;600&Raleway:wght@600;700`
  - `Fuzzy+Bubbles&Nunito:wght@400;600&Raleway:ital,wght@0,400;1,400`
  - `Fuzzy+Bubbles:wght@400;700&Nunito:wght@400;500;600`

Double chargement + ~20 graisses téléchargées alors que **4 seulement servent** par famille. Poste d'optimisation évident. Voir §12.

---

## 3. Espacements & layout

Deux régimes cohabitent :

- **Webflow d'origine** : `vh`/`vw` — y compris pour de l'espacement **horizontal** (`--hero-marge-x: 15vh`, `mpp/hero.css:114` repris de `.section.qui-sommes-nous`). Fragile : redimensionner la fenêtre en hauteur change les marges latérales. Conservé tel quel sur demande, pour aligner le hero sur le reste du site.
- **Code maison** : `rem`/`px`/`clamp()`, accroché à des tokens.

### 3.1 Tokens de navigation (`mpp/overrides.css:21-64`)

| Token | Valeur | Note |
|---|---|---|
| `--nav-text-size` | `clamp(13px, 1.2vw, 15px)` | Taille **unique** de toute la nav (avant : 3 tailles 12.8/14/14.08px) |
| `--nav-gap` | `clamp(0.4rem, 0.95vw, 1.4rem)` | |
| `--nav-pad-y` | `0.55rem` | |
| `--nav-pad-x` | `clamp(0.75rem, 1.5vw, 1.6rem)` | |
| `--nav-top` | `24px` | Air au-dessus de la pilule (avant : `1.6vh`) |
| `--nav-pill-h` | `64px` | Hauteur de la pilule (inchangée) |
| **`--nav-height`** | `calc(--nav-top + --nav-pill-h)` = **88px** | **Source de vérité** unique. Absente du site d'origine, introduite ici : les sections s'y accrochent (`calc(100svh - var(--nav-height))`). |
| `--nav-logo-h` | `clamp(72px, 6.25vw, 80px)` | Logo qui déborde la pilule (avant : 46px) |
| `--nav-logo-flow` | `46px` | Hauteur du logo **dans le flux** → la pilule ne grandit pas |
| `--badge-size` | `76px` (mobile 70px) | Avant : 96px |
| `--badge-top` | `26px` (mobile 18px) | |
| `--badge-delay` | `400ms` | Retour du badge après fermeture (> `--nav-slide`) |

### 3.2 Tokens du hero (`mpp/hero.css:92-123`)

| Token | Valeur | Rôle |
|---|---|---|
| `--hero-h` | `132vh` (mobile `auto`) | La section **déborde** la fenêtre |
| `--hero-titre` | `clamp(3rem, 6.6vw, 6.5rem)` | |
| `--hero-rythme` | `clamp(3rem, 7vh, 6.5rem)` | Écart **unique** entre rangées (photo → texte → photo) |
| `--hero-gouttiere` | `clamp(0.75rem, 1.6vw, 1.75rem)` | Gouttière serrée de la grille 12 colonnes |
| `--hero-sous-navbar` | `clamp(2.5rem, 6vh, 4.5rem)` | Air sous la navbar ouverte |
| `--hero-place-cta` | `clamp(6rem, 14vh, 10rem)` | Réserve pour le CTA à cheval |
| `--hero-respire-bienveillance` | `clamp(1.5rem, 4vh, 3.5rem)` | |
| `--hero-marge-x` | `15vh` | ⚠️ `vh` pour du **horizontal** — hérité de Webflow |
| `--reseaux-icone` | `clamp(30px, 2.8vw, 38px)` | |
| `--reseaux-pad` | `clamp(14px, 1.4vw, 19px)` | Padding **symétrique** (avant : `18px 28.8px`) |

**Grille hero** (`mpp/hero.css:138-157`) : `grid-template-columns: repeat(12, 1fr)`, `align-items: center`, `row-gap: var(--hero-rythme)`, `column-gap: var(--hero-gouttiere)`, `max-width: 1440px`, texte 8 colonnes / photo 4 colonnes, rangées alternées.

### 3.3 Tendance d'espacement (non formalisée)

Les `gap` du code maison suivent des **multiples de 4** : 4-6-8-12-16-20-24. Tendance observée, **pas** encore un jeu de tokens. Candidat à formaliser.

---

## 4. Rayons

| Valeur | Usage | Source |
|---|---|---|
| `50%` | Cercles : badge MENU, flèches carrousel, pastilles dev | `overrides.css:249`, `carousel.css:16` |
| `999px` | Pilules : navbar, CTA pré-inscription, barre dev, CTA mobile | `overrides.css:89,216`, `hero.css:416` |
| `18px` | Panneau dropdown | `overrides.css:234` |
| `16px` | Cadre photo hero | `hero.css:192` |
| `14px` | Pilule réseaux du hero | `hero.css:320` |
| `12px` | Focus CTA / masques image | `cta.css:24` |
| `6px` | Focus flèche « Fermer » | `overrides.css:173` |

> **Origine Webflow** : rayons en `vh` (`10vh`, `1vh`, `3vh`) — non alignés sur l'échelle ci-dessus. À harmoniser côté contenu existant.

---

## 5. Animations

### 5.1 Easing signature

**`cubic-bezier(0.22, 1, 0.36, 1)`** — easing par défaut de toute nouvelle animation. Exposé en token `--nav-ease` / `--hero-ease`. C'est l'easing le plus fréquent du code maison.

Autres courbes présentes (à ne pas généraliser) :
- `cubic-bezier(0.77, 0, 0.175, 1)` — roulement des liens nav (0.34s)
- `cubic-bezier(0.45, 0, 0.55, 1)` — `--cta-ease`, va-et-vient de la flèche CTA
- `cubic-bezier(0.4, 0, 0.2, 1)`, `cubic-bezier(0.34, 1.56, 0.64, 1)`, `cubic-bezier(0.16, 1, 0.3, 1)` — hérités de Webflow / composants tiers

### 5.2 Timings

| Élément | Durées | Source |
|---|---|---|
| Navbar | slide `--nav-slide: 380ms` · fade `--nav-fade: 260ms` | `overrides.css:62-63` |
| Badge MENU | retour retardé `--badge-delay: 400ms` après fermeture | `overrides.css:53` |
| Hero à l'arrivée | glisse `--hero-glisse: 620ms` · fondu `--hero-fondu: 480ms` · **cascade `--hero-cascade: 130ms`** (retards 0/130/260/390/520/650/780ms) | `hero.css:119-122,232-238` |
| Changement de fond hero | `320ms` (background, couleur texte) | `hero.css:49,56,64` |
| CTA flèche | cycle `--cta-cycle: 2.4s` infini · amplitude `--cta-bond: 10px` · pause au survol (`animation-play-state: paused`) | `cta.css:8-9,51-61` |
| Liens nav (roulement) | `0.34s cubic-bezier(0.77,0,0.175,1)` | `overrides.css:198` |
| Flèches carrousel | `0.3s` · survol `scale(1.08)` (en conservant `translateY(-50%)`) | `carousel.css:26,46-49` |
| Empreintes (trail) | `opacity/transform 90ms linear` — pilotage réel image par image en JS | `trail.css:44` |

### 5.3 `prefers-reduced-motion`

**Respecté partout** : `hero.css:67-80`, `overrides.css:334-340`, `cta.css:64-70`, `carousel.css:51-54`, `trail.css:55-57`.
Règle : bascule instantanée, états finaux forcés (`opacity:1`, `transform:none`), aucune parallaxe ni cascade.
**Toute nouvelle animation DOIT implémenter ce bloc** — sans lui, un `opacity:0` de départ laisserait le hero vide quand le mouvement est neutralisé.

---

## 6. Matière signature — verre teinté

Tokens partagés par la **navbar** et la **pilule réseaux du hero** (`mpp/overrides.css:57-59`) :

```css
--verre-bg:    rgba(245, 245, 242, 0.4);
--verre-blur:  blur(18px) saturate(1.15);
--verre-ombre: 0 6px 28px rgba(27, 27, 27, 0.1);
```

Appliqué avec `backdrop-filter` (+ préfixe `-webkit-`). Pas de bordure blanche : l'ombre douce suffit. Le panneau dropdown réutilise les mêmes tokens (`overrides.css:224-235`).

Variante **barre dev** (locale seulement) : fond `rgba(27,27,27,0.82)`, `blur(14px)`, ombre `0 8px 30px rgba(0,0,0,0.35)` — plus sombre, distincte du verre clair public.

---

## 7. Traitement photo

- **Cadre hero** (`hero.css:189-218`) : `border-radius: 16px`, `box-shadow: 0 14px 40px -18px rgba(27,27,27,0.5)`, `overflow: hidden`. La photo est `object-fit: cover` et **plus haute que son cadre** (`height: calc(100% + 2 * var(--par-course, 34px))`) → parallaxe verticale au scroll : le cadre est fixe, la photo coulisse derrière.
- **Ratios** : `4/3` (maquillage, cuisine), `3/4` (chemin) — `hero.css:203-205`. Cartes crèches : `4/3 → 4/4.2`.
- **Aucun filtre chromatique global** sur les images.
- Signalé : le fond hero d'origine était une **photo servie par le CDN Webflow distant** (`cdn.prod.website-files.com`), seule référence distante restante. La tâche a remplacé le fond par une couleur, mais le lien distant subsiste dans le HTML d'origine.

---

## 8. Composants (repères)

| Composant | Fichiers | Points de DA |
|---|---|---|
| **Navbar 3 états** | `overrides.css`, `overrides.js` | `data-nav="closed"` (badge seul) / `"open"` (navbar) ; pilule verre teinté ; logo débordant à hauteur de flux figée ; liens à roulement ; CTA pré-inscription en bleu `rgba(129,149,194,0.85)` |
| **Badge MENU** | `overrides.css:242-284` | Cercle `--mpp-logo-lime` + halo `--mpp-logo-halo` + vraies empreintes ; `fixed` centré haut ; hover `scale(1.06)`, active `scale(0.97)` |
| **CTA « crèches »** | `cta.css`, `cta.js` | À cheval sur la frontière hero/section suivante (`translateY(50%)`) ; flèche en boucle douce ; titre `translateY(-2px)` au survol |
| **Flèches carrousel** | `carousel.css`, `carousel.js` | Alignées sur celles de l'équipe : `rgba(255,255,255,0.95)`, `border-radius:50%`, ombre `rgba(0,0,0,0.1) 0 4px 15px`, chevron SVG 26px |
| **Chemin d'empreintes** | `trail.css`, `trail.js` | Une couche par bloc en `z-index:-1` ; masque `mpp/empreinte.svg` ; contexte d'empilement via `isolation: isolate` (jamais `position/z-index`) |
| **Diagramme journée type** | `planning.css`, `planning.js` | Décalé sous le badge MENU : `--planning-decalage = --badge-top + --badge-size + 18px`, hauteur compensée |

Focus visible standard partout : `outline: 3px solid var(--mpp-bleu)` avec `outline-offset` 3–6px.

---

## 9. Fichiers — carte de la source de vérité

```
index.html                     ← contenu + blocs <style> Webflow (dont 2 blocs footer contradictoires)
assets/…/mes-premier-pas.webflow.shared.*.css   ← DA Webflow d'origine (tokens --_couleurs---c-*, body Arial)
mpp/
├── overrides.css / .js  ← navbar 3 états, badge MENU, tokens --nav-*, verre teinté, palette --mpp-*
├── hero.css / .js       ← composition hero, contraste WCAG, parallaxe, widget dev local
├── cta.css / .js        ← CTA « crèches » animé
├── carousel.css / .js   ← flèches carrousel
├── trail.css / .js      ← chemin d'empreintes  (+ empreinte.svg, empreintes.png)
├── planning.css / .js   ← diagramme journée type
├── smooth.js, lenis.min.js  ← scroll lissé
├── data.json            ← config (fond hero, etc.)
└── logo-trim.png        ← logo détouré (ratio 964/752)
```

---

## 10. Règles pour toute nouvelle contribution

1. **Couleur** → réutiliser un token existant (`--mpp-*`). Ne jamais introduire un hex proche d'un existant (cf. quasi-doublons §1.4).
2. **Texte sur fond coloré** → vérifier le ratio WCAG (seuil AA 4.5). Sur rose, passer au blanc.
3. **Animation** → easing `cubic-bezier(0.22, 1, 0.36, 1)` par défaut **et** bloc `prefers-reduced-motion` obligatoire.
4. **Espacement vertical lié à la nav** → s'accrocher à `--nav-height` (88px), pas de valeur en dur.
5. **Verre teinté** → tokens `--verre-*`, ne pas recréer une valeur `rgba` locale.
6. **Contexte d'empilement** → `isolation: isolate`, pas `position:relative + z-index` (déforme les sections Webflow).
7. **Rayons / typo** → piocher dans les échelles §2 et §4, ne pas réintroduire les `vh` d'origine.

---

## 11. ⚠️ Arbitrages en attente (Brian)

1. **Palette en double** (`--_couleurs---c-*` Webflow **et** `--mpp-*` maison, mêmes valeurs) — choisir une source unique.
2. **Quasi-doublons probables** : `#e8a849` vs `#e8a248`, `#8e9ec2` vs `#8195c2` — vérifier avant tout ajout.
3. **`body` en Arial 14px**, pas en Nunito — tout texte non classé retombe en Arial. Décider d'un défaut Nunito.
4. **Polices chargées deux fois** (self-host + Google Fonts), poids 200→900 alors que 4 servent par famille — élaguer.
5. **Deux blocs `<style>` footer contradictoires** dans `index.html` — le second écrase le premier (code mort partiel) : nettoyer.
6. **Orthographes de Fuzzy Bubbles** : `Fuzzybubbles` / `Fuzzy Bubbles` / `Fuzyybubbles` (coquille) — unifier.

---

*Ce document est régénérable à partir du code : chaque valeur est sourcée `fichier:sélecteur`. En cas de divergence, **le code fait foi** — mettre ce document à jour, pas l'inverse.*
