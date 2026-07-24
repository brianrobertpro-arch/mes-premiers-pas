# DA — Mes Premiers Pas (charte réelle, extraite du code)

> Régénéré le 2026-07-23, session `charte-da` (reconnaissance en lecture seule).
> Branche de travail : `claude/charte-graphique-extraction-rj8t1l` — identique commit pour commit à
> `navbar-menu-badge` @ `2dc2e83` (0 commit d'écart, vérifié `git log HEAD ^origin/navbar-menu-badge`).
> Ce document remplace la version précédente du même nom (présente à la racine du repo, elle aussi
> à jour au 2026-07-22) : il en reprend les constats vérifiés, corrige ceux que le code contredit,
> et comble ce qu'elle ne couvrait pas encore (footer refondu, quasi-doublons réellement présents,
> polices non documentées).
> Chaque affirmation porte sa source : `[CODE]` lue directement par grep/Read, `[RAPPORT]` héritée
> d'un document existant sans re-vérification indépendante, `NON VÉRIFIÉ` sinon (absent de la charte).

---

## 1. Positionnement

`[RAPPORT]` Chaleur, confiance parentale, douceur — sans infantilisme. Premium accessible.
(Repris tel quel de `da-mpp.md`/`DA-EXTRACTION.md` existants — un positionnement ne se vérifie pas par grep, non re-audité.)

---

## 2. Palette

### 2.1 Custom properties (couleurs *intentionnelles* — priment sur les couleurs littérales)

Trois systèmes de tokens coexistent, **mêmes valeurs, noms différents** :

| Rôle | Hex | Token Webflow | Token maison (`overrides.css`) | Token `footer.css` (4ᵉ nommage) | Usages (ordre de grandeur) |
|---|---|---|---|---|---|
| Fond beige | `#e1dccc` | (implicite, `--_couleurs---c-bg-1` non présent sous ce nom précis — voir 2.2) | `--mpp-bg-1` (`overrides.css:13`) | `--hero-bg` (`hero.css:15`) | 11 `[CODE]` |
| Crème | `#ebe6d4` | `--_couleurs---c-bg-card` (`webflow.shared…css:2229`) | `--mpp-cream` (`overrides.css:13`) | `--cream` (`footer.css:16`) | 23 `[CODE]` |
| **Lime** — accent dominant | `#d9dd7e` | `--_couleurs---c-lime` (`:2222`) | `--mpp-lime` (`overrides.css:13`) | `--lime` (`footer.css:17`) | 58 `[CODE]` |
| Vanille | `#eeefa2` | `--_couleurs---c-vanille` (`:2230`) | `--mpp-vanille` (`overrides.css:14`) | absent de `footer.css` | 5 `[CODE]` |
| Bleu | `#8195c2` | `--_couleurs---c-bleu` (`:2226`) | `--mpp-bleu` (`overrides.css:14`) | `--bleu` (`footer.css:20`) | 16 `[CODE]` |
| Violet | `#8985d5` | `--_couleurs---c-violet` (`:2224`) | `--mpp-violet` (`overrides.css:14`) | absent de `footer.css` | 12 `[CODE]` |
| **Orange** — accent chaud | `#e8a248` | `--_couleurs---c-orange` (`:2223`) | `--mpp-orange` (`overrides.css:15`) | `--orange` (`footer.css:18`) | 42 `[CODE]` |
| Rose | `#c14c7c` | `--_couleurs---c-rose` (`:2231`) | `--mpp-rose` (`overrides.css:15`) | `--rose` (`footer.css:19`) | 14 `[CODE]` |
| Encre | `#1b1b1b` | `--_couleurs---c-ink` (`:2227`) | `--mpp-ink` (`overrides.css:15`) | `--ink` (`footer.css:15`) | 71 `[CODE]` |
| Texte | `#4a4a4a` | `--_couleurs---c-text-main` / `-text-nav` (`:2219,2234`) | `--mpp-text` (`overrides.css:16`) | absent | 6 `[CODE]` |
| Bouton semi-transp. | `#4a4a4abf` | `--_couleurs---c-button` (`:2233`) | — | — | Webflow d'origine uniquement `[CODE]` |
| Blanc | `#ffffff` | `--_couleurs---white` (`:2225`, valeur `white`) | `--mpp-white` (`overrides.css:16`) | — | 4 `[CODE]` (+ `#fff` littéral 42×, voir 2.2) |

`[CODE]` **Correction par rapport à la fiche précédente** : celle-ci ne documentait que 2 systèmes de tokens (Webflow + maison). Un **3ᵉ jeu de tokens** existe désormais dans `mpp/footer.css:15-20` (`--ink/--cream/--lime/--orange/--rose/--bleu`), introduit par la refonte du footer (SVG téléphone). Mêmes valeurs, nommage court, sans préfixe `mpp-` — risque de confusion si un futur composant réutilise ces noms courts hors de `.footer-scene`.

Limes du logo — réservés au badge MENU, **volontairement distincts** du lime de marque :

| Rôle | Hex | Token | Usage exclusif |
|---|---|---|---|
| Fond badge | `#d9f86a` | `--mpp-logo-lime` (`overrides.css:18`) | Cercle badge MENU — 1 seule occurrence `[CODE]`, structurant par rôle (pas par fréquence) |
| Halo badge | `#f2fcc0` | `--mpp-logo-halo` (`overrides.css:19`) | Anneau `box-shadow` badge — 1 seule occurrence `[CODE]` |

### 2.2 Couleurs littérales — tableau de fréquence (≥ 2 occurrences), `[CODE]`

Périmètre grepé : `mpp/*.css`, `mpp/*.js`, blocs `<style>`/`<script>` des 6 `.html` racine, CSS Webflow partagé. Comptage par `grep -o`, dédoublonné des faux positifs hex-8-chiffres.

| Hex | Occurrences | Rôle observé | Exemples fichier:ligne |
|---|---|---|---|
| `#1b1b1b` (encre) | 71 | Texte principal, fond, fill/stroke SVG téléphone footer | `mpp/hero.css:12`, `index.html:2769` (SVG téléphone), `webflow.shared…css:2227` |
| `#fff` (blanc court) | 42 | Icônes SVG réseaux, fond input Webflow — **jamais fusionné avec `#ffffff`**, notation distincte | `mpp/footer.css:68,248`, `mpp/footer.js:40` |
| `#d9dd7e` (lime) | 58 | Accent dominant : stroke navbar/burger, hover liens, fill SVG footer (« vert pomme », voir 2.4) | `mpp/overrides.css:13`, `index.html:29` |
| `#e8a248` (orange) | 42 | Accent CTA, soleil diagramme, bouton retour-en-haut | `mpp/overrides.css:15`, `mpp/back-to-top.js:30` |
| `#333` | 30 | Texte gris — menu mobile dupliqué sur les 6 pages + boilerplate Webflow | `index.html:134`, `webflow.shared…css:223` (= déclaration `body`) |
| `#ebe6d4` (crème) | 23 | Fond carte crèche, fond corps téléphone SVG | `mpp/footer.css:16`, `mpp/hero.css:20` |
| `#8195c2` (bleu) | 16 | Fond/texte mixte selon composant, fond footer (`.footer-section`) | `mpp/footer.css:11`, `webflow.shared…css:2226` |
| `rgba(0,0,0,0.1)` | 16 | Ombre standard bouton flèche circulaire (carrousels), dupliquée sur les 6 pages | `mpp/carousel.css:10`, `index.html:25` |
| `#2a3444` | 15 | Texte bleu-nuit section « équipe » (carousel témoignages) — **absent de la palette de marque documentée** | `index.html:1215`, `about.html:658` |
| `#c14c7c` (rose) | 14 | Palette hero/valeurs, gradient logo Instagram | `mpp/footer.css:19,251`, `mpp/hero.css:26` |
| `rgba(255,255,255,0.95)` | 13 | Fond translucide bouton flèche circulaire | `mpp/carousel.css:9`, `index.html:22` |
| `#555` | 13 | Texte gris — libellés diagramme « journée type » | `index.html:2282,2331…` |
| `#8985d5` (violet) | 12 | Palette hero/valeurs | `mpp/footer.css:251`, `mpp/hero.css:24` |
| `#e1dccc` (beige) | 11 | Fond de section (hero, panneau Valeurs) | `mpp/hero.css:15,19`, `index.html:1197` |
| `#6b7fd7` | 9 | Texte des horaires, diagramme « journée type » (SVG desktop + mobile) — hors palette documentée | `index.html:2273,2330…` |
| `#c47a30` | 7 | Yeux/sourire du soleil (diagramme planning) — **3ᵉ orange distinct**, écart net avec `#e8a248` | `index.html:2305,2309…` |
| `#4a4a4a` (gris texte) | 6 | Chevron carrousel, base `--_couleurs---c-text-nav` | `mpp/carousel.css:27`, `webflow.shared…css:2219` |
| `#f4f1e6` | 5 | Texte du bloc Contact **du nouveau footer téléphone** (`.footer-contact__title`, `.fc-line`) | `mpp/footer.css:37,45,59,63,366` |
| `#eeefa2` (vanille) | 5 | Fond/texte hero optionnel (`data-hero-bg='vanille'`) ; couleur du **titre Contact de l'ancien footer** (`.heading-6`, aujourd'hui masqué, voir 2.5) | `mpp/hero.css:22`, `webflow.shared…css:3414` |
| `rgba(255,255,255,0.98)` | 5 | Fond nav « scrolled » (backdrop-filter blur 20px), dupliqué sur les 6 pages | `index/about/…html:120` |
| `rgba(0,0,0,0.27)` | 5 | Fond overlay nav, dupliqué sur les 6 pages | `index/about/…html:71` |
| `rgba(255,255,255,0.85)` | 5 | Couleur texte lien nav | `index/about/…html:84` |
| `#ffffff` (blanc long) | 4 | Texte hero CTA forcé (`!important`), custom property | `mpp/hero.css:13,39` |
| `#3a3a50` | 4 | Texte adresse + fond bouton, widget carte (`.mpn-address-street`) — pages foret/océan uniquement | `nos-creche-vers-foret.html:961,979` |
| `#d37e42` | 3 | Orange du 3ᵉ onglet section Valeurs — **4ᵉ orange distinct** | `index.html:1998,2003,2010` |
| `#b5c0d4` | 3 | Fond `.text-side` section équipe | `index.html:1208,1432,1476` |

### 2.3 Couleurs à occurrence unique ou quasi-unique — `[CODE]`, **non retenues comme couleurs de charte**

- `#d9f86a` / `#f2fcc0` — lime/halo du badge MENU : occurrence unique **par rôle exclusif documenté**, pas par oubli. Conservées dans la charte pour cette seule raison.
- `#f0a848` (`mpp/footer.css:251`, stop médian d'un gradient Instagram), `#7ee081`/`#ff8a8a` (`mpp/hero.css:460,462`, indicateurs d'une barre de debug contraste AA — outil dev, pas de la DA finale), `#d4912e`/`#c4811e` (`about.html:733,745`, paire bouton base/hover cohérente), `#9aacbf`, `#6b6b6b`, `#3d3d3d` : chacune **une seule occurrence** — candidates à l'exclusion, une couleur utilisée une fois n'est pas une couleur de charte.
- Toute couleur `#…` propre au CSS Webflow partagé et absente de `mpp/` (ex. `#3898ec`, `#0082f3`, `#0050bd`, `#ea384c`, `#c8c8c8`) : composants Webflow génériques (focus input, erreur formulaire) sans lien avec l'identité MPP — `NON RETENUES`.

### 2.4 Vert pomme des réseaux sociaux du footer

`[CODE]` **Hex exact : `#d9dd7e`** — c'est le lime de marque, pas une couleur séparée. Confirmé par commentaire explicite dans le code source :
> `mpp/img/reseau-facebook-footer.svg:2` et `mpp/img/reseau-instagram-footer.svg:2` : *« variante FOOTER (vert pomme #d9dd7e) de reseau-facebook.svg. Découplée du hero (orange). »*

Points d'usage `[CODE]` :
- `fill="#d9dd7e" stroke="#d9dd7e"` dans les deux SVG (`reseau-facebook-footer.svg`, `reseau-instagram-footer.svg`), plus une règle interne `.a`/`.cls-1 { stroke:#d9dd7e }`.
- Référencés dans le footer scène téléphone (`.footer-social .fsoc img`, `index.html:2769` et équivalent sur les 6 pages) **et** dans l'ancien bloc `.infos-reseaux > .div-res` — mais ce second bloc est **masqué** (`mpp/footer.css:355`, voir 2.5) : seul le premier rend réellement.
- Variante hero, couplée : `reseau-facebook.svg` / `reseau-instagram.svg`, mêmes SVG mais en **orange `#E8A248`** (fill/stroke), utilisés dans `.box-reseaux` du hero (`index.html:689`, page d'accueil uniquement).

**Candidat solide à l'accent global** : le lime `#d9dd7e` est déjà la couleur la plus fréquente du corpus (58 occurrences) et couvre navbar, hover liens, réseaux sociaux footer, CTA — cohérent avec son statut déjà documenté d'« accent dominant ».

### 2.5 `[CODE]` Découverte — deux blocs « Contact » coexistent dans le DOM, un seul est visible

Le footer contient **deux structures Contact distinctes**, sur les 6 pages :

1. **Nouvelle** (téléphone SVG, propagée par la refonte footer) : `.footer-contact > h2.footer-contact__title`, texte **`#f4f1e6`** (`mpp/footer.css:37,45`), alimentée dynamiquement par `mpp/data.json` → `footer.contact` (lu par `mpp/footer.js:179`). **Visible.**
2. **Ancienne** (Webflow d'origine) : `.content-footer > .contact > h3.heading-6`, texte **vanille `#eeefa2`** (`webflow.shared…css:3413-3418`, confirmé — la règle n'a pas changé). **Masquée** : `mpp/footer.css:355` — `.footer-section .content-footer { display: none !important; }`.

**Conséquence directe** : la couleur du titre « Contact » réellement à l'écran aujourd'hui est **`#f4f1e6`**, pas la vanille `#eeefa2` documentée dans la précédente fiche `da-mpp.md`. Ce n'est pas une couleur oubliée ni un quasi-doublon — c'est un second bloc, plus récent, qui a pris la place visuelle du premier sans que celui-ci soit supprimé du HTML. **Écart à trancher par Brian** : est-ce que `#f4f1e6` doit remplacer `#eeefa2` comme couleur de charte pour ce rôle, ou est-ce une dérive à corriger vers la vanille documentée ?

`mpp/footer.css:356` masque également `.photo-deco` (l'ancien conteneur de stickers du footer) — conséquence pour les totems, voir §6.

### 2.6 Quasi-doublons réellement présents dans le code — `[CODE]`

`[CODE]` **Correction par rapport à la fiche précédente** : `DA-EXTRACTION.md §1.4` affirmait que seuls `#8195c2` et `#e8a248` subsistaient dans le code actuel, et citait `#8e9ec2`/`#e8a849` comme un risque *historique*, sous-entendant qu'ils étaient absents. **C'est inexact** : les deux sont bien présents, une fois chacun, sur les deux pages jumelles :

| Paire | Écart | Où (`fichier:ligne`) | Rôle |
|---|---|---|---|
| `#e8a248` (42×) / `#e8a849` (1× ×2 pages) | G +6, B +1 | `nos-creche-vers-foret.html:251`, `nos-creche-vers-ocean.html:251` | `.button.type1.is-active` (état actif d'un bouton) — orange oublié, distinct de l'orange de marque |
| `#8195c2` (16×) / `#8e9ec2` (1× ×2 pages) | R +11, aucun autre écart notable | `nos-creche-vers-foret.html:968`, `nos-creche-vers-ocean.html:968` | `.mpn-address-city` (texte, widget carte) |
| `#d8d2bf` (2×, `footer.css:271,281`) / `#ddd8c4` (2×, `nos-creche-*.html:730`) | R +5, G +6, B +5 | Deux placeholders (vidéo téléphone footer / image carte crèche) choisis indépendamment | Candidat clair à unifier |
| `#f0a848` (1×) / `#e8a248` (42×) | R +8, G +6, B identique | `mpp/footer.css:251`, stop de gradient Instagram | Écart un peu supérieur au seuil « quasi »-doublon strict, à vérifier si volontaire (dégradé) |

**Famille des oranges** (au-delà des quasi-doublons stricts) : `#e8a248` (accent CTA, 42×), `#c47a30` (soleil planning, 7×), `#d37e42` (onglet Valeurs #3, 3×), `#e8a849` (bouton actif crèches, 1××2) — **4 oranges distincts** dans le même site, écarts de 15 à 36 unités hex. Aucun n'est un doublon accidentel au sens strict, mais leur coexistence n'est documentée nulle part.

### 2.7 Palette retenue

**Fonds** `[CODE]` : beige `#e1dccc`, crème `#ebe6d4`.
**Texte** `[CODE]` : encre `#1b1b1b` (dominant), gris `#4a4a4a`/`#333` (Webflow, corps).
**Accents primaires** `[CODE]` : lime `#d9dd7e` (dominant, 58 occ., accent + réseaux sociaux « vert pomme »), orange `#e8a248` (chaud, 42 occ.).
**Accents secondaires** `[CODE]` : bleu `#8195c2`, violet `#8985d5`, rose `#c14c7c`, vanille `#eeefa2` (rôle contesté depuis §2.5).
**Réservées** `[CODE]` : lime logo `#d9f86a` + halo `#f2fcc0` — badge MENU exclusivement, ne jamais réutiliser ailleurs.
**Hors charte** `[CODE]` : toute couleur à occurrence unique (§2.3), les 4 nuances d'orange concurrentes autres que `#e8a248` (§2.6), le texte `#2a3444`/`#6b7fd7` de sections spécifiques (équipe, planning) non rattachées à un token — présentes dans le code mais jamais formalisées comme choix de marque.

---

## 3. Typographies

`[CODE]` **Quatre familles réellement chargées**, pas trois : Fuzzy Bubbles/Fuzzybubbles, Nunito, Raleway — **et `Caveat`**, non documentée jusqu'ici.

| Famille | Graisses chargées | Graisses utilisées | Origine | Usage | Source |
|---|---|---|---|---|---|
| `Fuzzybubbles` (sans espace) | 400, 700 (self-host, `@font-face`) | 400 (`.heading-5/6`), 700 (`h1` natif, `.button`, `.h1-hero-main`) | Self-host Webflow | Titres `h1` Webflow, boutons, hero, titres de section | `webflow.shared…css:2201-2215` (@font-face), `:2244-2250,2492-2499,3413-3418` |
| `Fuzzy Bubbles` (avec espace) | Google Fonts, `wght@400;700` (variable selon page) | 400 (section Valeurs, `.section-title`), 700 (`.footer-contact__title`) | Google Fonts | Section Valeurs, titre embed, **titre Contact du nouveau footer** | `mpp/footer.css:40`, `index.html:1217,1787` |
| `Fuzyybubbles` (coquille, double-y) | **Aucune** — ni self-host ni Google Fonts | Déclarée (600/700) mais jamais chargée | Bug | `.c3d-card .card-location/.card-title` — cartes du carrousel crèches | `index.html:757,766` — **ne rend jamais**, fallback silencieux `sans-serif` |
| `Nunito` | Self-host 200-900 + Google (jeux de poids variables selon page) | 400 (corps), 600 (`.fc-line`, boutons), 700 (`.fp-view`) | Double (self-host + Google, redondant) | Corps de texte, footer contact, listes | `webflow.shared…css:2121-2199`, `mpp/footer.css:54` |
| `Raleway` | Self-host 100-900 + Google | 400 (nav), 600 (`.nav-link-2`, frise horaire), 700 (boutons) | Double (self-host + Google, redondant) | Nav, sous-titres, frise Journée type | `webflow.shared…css:2049-2119`, `journee-type.html:602` |
| **`Caveat`** — non documentée avant cette session | Google Fonts `wght@400;500;600;700` | 400 implicite (`font-family:'Caveat',cursive` sans poids explicite) | Google Fonts uniquement | Texte manuscrit du widget carte/adresse (`.mpn-address-street`) | `nos-creche-vers-foret.html:885,958`, `nos-creche-vers-ocean.html:885,958` — **ces deux pages uniquement** |
| Système (`Arial`, `Georgia`, `system-ui`) | N/A | `body` par défaut (Arial 14px), textes SVG diagramme, embed carousel | Système | Corps non classé, SVG | `webflow.shared…css:222-228,2237-2241` |

### 3.1 Cas tranché : Fuzzy Bubbles / Fuzzybubbles / Fuzyybubbles

`[CODE]` **Les trois graphies coexistent, deux rendent, une est un bug muet :**

- **`Fuzzybubbles`** (self-host Webflow) — **rend réellement**. Chargée sur 5 pages sur 6 (toutes celles qui chargent `webflow.shared…css`) : `index.html`, `about.html`, `journee-type.html`, `nos-creche-vers-foret.html`, `nos-creche-vers-ocean.html`. **Absente de `404.html`**, qui ne charge pas ce CSS partagé : tout sélecteur `Fuzzybubbles` y retombe sur le fallback `cursive` du navigateur (le badge MENU/`mpp-nav-close__label` de `404.html` n'a donc pas sa police prévue).
- **`Fuzzy Bubbles`** (Google Fonts) — **rend réellement aussi**, périmètre complémentaire : le titre `CONTACT` du nouveau footer (`mpp/footer.css:40`) rend sur les **6 pages** (le lien Google `Fuzzy+Bubbles` est chargé partout, y compris `404.html:14`) ; la section « Nos valeurs » ne rend que sur `index.html`/`about.html`.
- **`Fuzyybubbles`** (coquille à deux « y ») — **ne rend jamais nulle part**. Aucun `@font-face` ni lien Google ne charge cette chaîne exacte. Seul point d'usage : `index.html:757,766` (cartes du carrousel crèches sur la page d'accueil). Le navigateur retombe silencieusement sur `sans-serif`.

### 3.2 Sur-chargement Google Fonts `[CODE]`

Chaque page charge Nunito/Raleway/Fuzzy Bubbles **plusieurs fois** via des `<link>`/`@import` distincts à jeux de poids qui se chevauchent (ex. `nos-creche-vers-foret.html` charge Nunito 3 fois : `227` (400/600), `551` (400/600/700), `885` (300/400/500/600/700)). `journee-type.html` charge même Raleway deux fois avec des jeux de poids différents (`:495` italique, `:500` romain 400/600/700 via `@import`). Sans conflit fonctionnel (Google Fonts fusionne les faces) mais poste d'optimisation réseau évident.

---

## 4. Animations

### 4.1 Easing signature `[RAPPORT + CODE, nuancé]`

**`cubic-bezier(0.22, 1, 0.36, 1)`** — le plus fréquent du code maison (`--nav-ease`, `--hero-ease`, `--e` dans `footer.css:30`). **Nuance vérifiée cette session** : ce n'est pas vrai « partout ». La cascade CONTACT du nouveau footer (`mpp/footer.css:93`) utilise un simple **`ease`**, pas la signature — écart réel entre la règle affichée dans l'ancienne fiche (« réutilisé partout ») et le code.

Autres courbes présentes, à ne pas généraliser `[RAPPORT]` : `cubic-bezier(0.77,0,0.175,1)` (roulement liens nav), `cubic-bezier(0.45,0,0.55,1)` (CTA flèche), `cubic-bezier(0.34,1.56,0.64,1)` (entrée carrousel `index.html:1101`, `playEntryAnimation`).

### 4.2 Durées et délais — valeurs réelles au rendu

| Élément | Déclaré | Réel au rendu | Source |
|---|---|---|---|
| Navbar | slide 380ms, fade 260ms | conforme | `overrides.css:62-63` `[RAPPORT]` |
| Hero — cascade CSS pure | `--hero-cascade: 130ms` (0/130/260/390/520/650/780) | Ce timing existe dans `hero.css:122` mais **n'est pas celui qui pilote la cascade visible du texte hero** — voir ligne suivante | `hero.css:119-122` `[CODE]` |
| **Hero — cascade réellement exécutée** (`h1-hero-main`, réseaux, footer-hero) | — | **`setTimeout` en dur** : `navbar:0, line1:300, line2:550, line3:800, line4:1050, reseaux:1400, footer:1700` (pas ×130, pas de token CSS), départ à `timing.start:400` | `index.html:3050` (`var timing = {...}`), fonction `animateHero()` `index.html:3049-3070` `[CODE]` — vérifié directement, écart d'environ 250ms de pas, pas 130ms |
| **Cette cascade hero ne respecte PAS `prefers-reduced-motion`** | — | Aucun `matchMedia`/`prefers-reduced-motion` dans tout `index.html` (0 occurrence, vérifié par grep) ; le script s'exécute inconditionnellement | `index.html` entier `[CODE]` — **contredit** l'affirmation « respecté partout » de la fiche précédente et du CLAUDE.md |
| Carrousel — entrée (`playEntryAnimation`) | — | `setTimeout(playEntryAnimation, 300)` puis cascade `i * 150ms` par carte, transition `opacity 0.6s ease-out, transform 0.7s cubic-bezier(0.34,1.56,0.64,1)` | `index.html:1091-1105,1174` `[CODE]` — **également sans `prefers-reduced-motion`** |
| Footer CONTACT (nouveau, téléphone SVG) | — | `transition: opacity 0.6s ease var(--d,1.1s), transform 0.6s ease var(--d,1.1s)` ; délais réels **`--d: 1.15s / 1.30s / 1.45s`** sur `.fc-line:nth-child(1/2/3)` | `mpp/footer.css:93,96-98` `[CODE]` — confirme la valeur du prompt de session, **easing `ease` et non la signature** (voir 4.1) |
| Footer CONTACT — reduced-motion | — | Respecté : `opacity:1 !important; transform:none !important; transition:none !important` | `mpp/footer.css:100-107` `[CODE]` |
| Totems flottants (footer) | — | `animation: mpp-totem-flottement var(--dur,7s) ease-in-out var(--delay,0s) infinite` ; durées 7.5/8.5/9/8s, délais négatifs (déphasage) 0/-1.2/-2.4/-0.6s | `mpp/footer.css:139-149` `[CODE]` |
| Totems — reduced-motion | — | Respecté : `animation:none; transform:rotate(var(--rot))` (figé en pose finale tournée, pas à plat) | `mpp/footer.css:155-157` `[CODE]` |
| Changement de fond hero | 320ms | conforme | `hero.css:49,56,64` `[RAPPORT]` |
| CTA flèche | cycle 2.4s infini, amplitude 10px | conforme | `cta.css:8-9` `[RAPPORT]` |

### 4.3 `prefers-reduced-motion` — bilan `[CODE]`, corrige l'affirmation « partout »

Respecté dans : `mpp/footer.css`, `mpp/footer.js`, `mpp/hero.js`, `mpp/overrides.js`, `mpp/trail.css`, `mpp/trail.js`, `mpp/back-to-top.js`, `mpp/overrides.css`, `mpp/smooth.js`, `mpp/hero.css`, `mpp/cta.css`, `mpp/cta.js`, `mpp/carousel.css` (13 fichiers `mpp/`, vérifié par grep).
**Non respecté** dans les scripts inline d'`index.html` : la cascade hero native (`timing`/`animateHero`, `:3050`) et l'entrée du carrousel 3D (`playEntryAnimation`, `:1091`) — **0 occurrence de `matchMedia`/`prefers-reduced-motion` dans tout `index.html`**, vérifié par grep exhaustif. C'est un écart direct avec CLAUDE.md §4 (« respecté partout dans ce projet ») : partout dans `mpp/`, pas dans le HTML natif.

---

## 5. Formes et espacements

### 5.1 Rayons `[CODE]`

Pas un système à 2-3 valeurs strict : trois logiques superposées.

| Valeur | Fréquence | Nature |
|---|---|---|
| `999px` (+ `!important`) | 6 | **Seul vrai token maison** — convention « pilule », `mpp/hero.css:415,457`, `mpp/footer.css:186`, `mpp/overrides.css:89,216,325` |
| `50%` | 23 | Convention « cercle », partagée maison + Webflow, pas un rayon de coin — `mpp/footer.css:245`, `mpp/hero.css:432` |
| `16px` | 8 | Cluster informel « carte » côté maison, sans variable dédiée — `mpp/hero.css:192` |
| `12px` | 5 | Cluster informel « bouton/carte » — `mpp/cta.css:24` |
| `20px` | 8 | Mixte maison/Webflow |
| `10vh`, `100%` | 4 chacun | Signature Webflow d'origine (unités vh/%, jamais en maison) |
| `13% / 6.4%` | 1 | Forme elliptique de l'écran du téléphone SVG footer, unique dans le corpus — `mpp/footer.css:167` |
| Longue traîne (`3px`, `7%`, `14px`…) | 1-2 chacune | Propres à un composant unique (légende diagramme, page 404) |

`[CODE]` **Nuance importante** : plusieurs fréquences élevées (`0 0 12px 12px` ×11, `50px` ×7) sont en réalité **un seul bloc `<style>` dupliqué à l'identique sur les 6 pages HTML** — pas 11 décisions indépendantes. Compter les occurrences brutes surestime le poids réel de ces valeurs.

### 5.2 Ombres `[CODE]`

Un seul vrai token : `var(--verre-ombre)` → résout à `0 6px 28px rgba(27,27,27,0.1)` (`mpp/overrides.css:59`), utilisé 3× (`hero.css:326`, `overrides.css:93,233`) — conforme au « verre teinté » déjà documenté.
Tout le reste est en dur, dispersé, avec des quasi-doublons d'opacité (`0.13`/`0.1`/`0.07`/`0.06`) qui trahissent des réglages au pixel plutôt qu'une échelle voulue. Les blocs `<style>` inline des 6 pages sont massivement dupliqués (mêmes lignes 23-195 partout) — les « fréquences » comptent surtout des copies, pas des choix indépendants.

### 5.3 Espacements `[CODE]` — dispersés, pas d'échelle nette

518 déclarations `padding`/`margin`/`gap` recensées. Sur les valeurs `px` isolées : 14 valeurs sur 34 sont des multiples de 4 (≈60% des occurrences), mais cette proportion est identique dans `mpp/` seul (≈58%) — **la dispersion traverse aussi le code maison**, ce n'est pas propre au Webflow aspiré. Aucune variable CSS d'espacement n'existe dans `mpp/` (contrairement aux ombres, qui ont `--verre-ombre`). Valeurs hors grille récurrentes : `10px` (47 occ.), `18/22/26px` (10-12 occ. chacune), `0.8rem`/`1.9rem`/`2.9rem` en rem. **Verdict : dispersé, pas une échelle de charte — à formaliser si souhaité, pas à présumer existante.**

---

## 6. Totems — contraintes techniques

`[CODE]` **Découverte majeure de cette session : deux systèmes de totems coexistent, un seul est visible.**

### 6.1 Système historique (`data.json` + `icones.js`) — **désormais invisible sur les 6 pages**

- Cible les anciens stickers Webflow (`.Image-bg-footer-01` à `-09`, dans `.photo-deco`) par substitution d'URL, piloté par `mpp/data.json` clé `icones.remplacements` (4 totems + 3 stickers masqués), appliqué par `mpp/icones.js`.
- Style injecté : opacité `--mpp-totem-opacity:0.55`, `transform:scale(1.45)`, `z-index:0`, `pointer-events:none` (`icones.js:76-79`).
- **Mais** : `mpp/footer.css:356` — `.footer-section .photo-deco { display: none !important; }`, règle chargée sur les 6 pages (`footer.css` propagé partout, vérifié par grep). **Ce système ne produit plus aucun rendu visible** : il continue de s'exécuter (interval + MutationObserver, `icones.js:132-137`) sur un conteneur cache.

### 6.2 Système actif (`.footer-scene`, SVG téléphone) — **le seul visible, sur les 6 pages**

Contraintes techniques pour toute nouvelle pose de totem :

| Propriété | Valeur | Source |
|---|---|---|
| URL | `https://pub-b62969cb28c74eaa82f2cc05d4ae9428.r2.dev/mpp/icones/totem-{foret,savane,ocean,montagne}.png` — **codée en dur dans le HTML**, pas via `data.json` | `index.html:2769` (et identique sur les 5 autres pages) |
| Emplacement DOM | `<img class="footer-totem footer-totem--{1..4}">`, enfants directs de `.footer-phone`, avant le SVG du cadre | `index.html:2769` |
| Position | `position:absolute`, chacun avec son propre `top/left/right/bottom` en % : totem-1 `top:-8% left:-28%`, totem-2 `top:-11% right:-19%`, totem-3 `bottom:3% left:-26%`, totem-4 `bottom:-9% left:30%` | `mpp/footer.css:146-149` |
| Taille | `width` individuel 38-42% de `.footer-phone` (42/38/40/39%), `height:auto`, `object-fit:contain` | `mpp/footer.css:146-149` |
| z-index | `0` — derrière le cadre du téléphone (`z-index:1`), devant le fond bleu de la section | `mpp/footer.css:132,138` |
| Opacité | `0.55` fixe (pas de variable réglable comme l'ancien système) | `mpp/footer.css:138` |
| Ombre | `filter: drop-shadow(0 8px 16px rgba(27,27,27,0.15))` | `mpp/footer.css:141` |
| Animation | `mpp-totem-flottement`, translateY ±11px + rotation, durée 7-9s selon le totem, déphasage par délai négatif — jamais synchronisés entre eux | `mpp/footer.css:143,151-153` |
| Reduced-motion | Respecté : animation coupée, pose finale = rotation statique (`--rot`), pas de à-plat | `mpp/footer.css:155-157` |
| Format image | PNG, fond blanc **incrusté dans le fichier** (pas de détourage CSS possible) — tout nouveau visuel doit être détouré **à la source** | `[RAPPORT]` hérité de `icones.js:74-75`, cohérent avec le système historique, **NON RE-VÉRIFIÉ visuellement cette session** (aucun accès rendu navigateur en reconnaissance pure grep) |

`[RAPPORT, NON VÉRIFIÉ dimensions px]` Les dimensions **rendues en pixels** (vs les % relatifs documentés ci-dessus) dépendent de `--footer-phone` (`height: clamp(360px, 62vh, 560px)`, `aspect-ratio:320/660`, `mpp/footer.css:112-116`) — calcul dérivé, non mesuré au rendu réel (pas de navigateur ouvert en reconnaissance).

**Contrainte pour un futur chantier de production de nouvelles poses** : cibler exclusivement `.footer-totem--1` à `--4` (système actif) ; ignorer `data.json > icones > remplacements` pour les totems (système mort, ne produit plus de rendu) — sauf décision explicite de réactiver l'ancien conteneur.

---

## 7. Interdits et règles d'usage

`[RAPPORT, conservé]` :
1. **Couleur** → réutiliser un token existant (`--mpp-*` ou équivalent `footer.css`). Ne pas introduire un hex proche d'un existant sans vérifier §2.6.
2. **Texte sur fond coloré** → vérifier le contraste (la fiche précédente documentait des ratios WCAG mesurés sur le hero — non re-vérifiés cette session, `NON VÉRIFIÉ` faute de re-mesure).
3. **Animation** → easing signature `cubic-bezier(0.22,1,0.36,1)` par défaut **sauf** exception documentée (§4.1) **et** bloc `prefers-reduced-motion` obligatoire — y compris dans le HTML natif (`index.html`), où il manque actuellement (§4.3).
4. **Totems** → cibler `.footer-totem--1..4` (§6.2), pas l'ancien système `data.json`/`icones.js` (mort).
5. **Rayons/ombres/espacements** → aucune échelle stricte n'existe pour les espacements (§5.3) ; ne pas présumer un système à réutiliser, en discuter avec Brian avant d'en inventer un.
6. **Typographie** → ne pas ajouter de 5ᵉ graphie de Fuzzy Bubbles ; corriger `Fuzyybubbles`→`Fuzzy Bubbles`/`Fuzzybubbles` est un candidat de correction mais **hors périmètre de cette session** (lecture seule).

`[CODE]` **Nouveaux arbitrages en attente (Brian), issus de cette session** :
1. Couleur du titre Contact : `#f4f1e6` (visible) vs `#eeefa2` vanille (documentée, masquée) — lequel fait foi ? (§2.5)
2. Le bloc `.content-footer`/`.photo-deco` masqué (`display:none !important`) contient-il du code à supprimer, ou doit-il rester en réserve ? Il porte l'ancien système de totems, l'ancien Contact, et reste la cible des deux moteurs Matter.js documentés dans CLAUDE.md — leur redondance est donc encore plus dead-code qu'avant.
3. 4 oranges concurrents (`#e8a248`, `#c47a30`, `#d37e42`, `#e8a849`) — n'en garder qu'un ou assumer une famille ?
4. Cascade hero native (`index.html:3050`) sans `prefers-reduced-motion` — l'ajouter, ou est-ce un chantier à part ?

`[RAPPORT, hérités, non re-tranchés]` : palette en double/triple (§2.1), poids de polices sur-chargés (§3.2), `body` en Arial 14px, deux blocs `<style>` footer contradictoires (un chiffre mort, CLAUDE.md), deux moteurs Matter.js redondants (CLAUDE.md) — désormais probablement animant un conteneur masqué (voir arbitrage 2 ci-dessus, `NON VÉRIFIÉ` si Matter.js désactive son calcul sur `display:none`).
