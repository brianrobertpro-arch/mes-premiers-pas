# DA — Mes Premiers Pas (résumé)
> Màj : 2026-07-22 · Extraction du code réel · Détail complet : `DA-EXTRACTION.md` à la racine du repo `mes-premiers-pas` · Budget : ≤600 tokens

## Positionnement
Chaleur, confiance parentale, douceur — sans infantilisme. Premium accessible.

## Palette de marque (source de vérité)
Définie en double : tokens Webflow `--_couleurs---c-*` et tokens maison `--mpp-*`, mêmes valeurs.

| Rôle | Hex | Usage |
|---|---|---|
| Fond beige | `#e1dccc` | fond de sections, hero par défaut |
| Crème | `#ebe6d4` | cartes, séparateur footer |
| **Lime** | `#d9dd7e` | **accent dominant** : titres footer, CTA, diagramme |
| Vanille | `#eeefa2` | titre « Contact » footer |
| Bleu | `#8195c2` | `.heading-2`, focus-visible, CTA navbar |
| Violet | `#8985d5` | spirales, fond hero optionnel |
| **Orange** | `#e8a248` | **accent chaud** : cartes valeurs, diagramme |
| Rose | `#c14c7c` | accent fort (seul fond exigeant du texte blanc) |
| Encre | `#1b1b1b` · Texte | `#4a4a4a` | textes |

Limes du logo, réservés au badge MENU : `#d9f86a` (fond), `#f2fcc0` (halo). Distincts du lime de marque **intentionnellement**.

## Typographies
- **Fuzzy Bubbles** — titres + badge MENU. Poids 400 (titres footer) et 700 (h1, boutons).
- **Nunito** — corps. Poids 400 / 500 / 600.
- **Raleway** — sous-titres et navigation. Poids 400 / 600.

H1 hero : `clamp(3rem, 6.6vw, 6.5rem)`, 700, interlignage `1.02`.
H2 `.heading-2` : Nunito 3rem, graisse 300, bleu, centré.
Titres footer : Fuzzy Bubbles 2.5rem, 400.
Corps `.main-text` : Nunito 1.8rem / lh 2.4rem, 500.

## Espacements
Deux régimes qui cohabitent. Webflow d'origine en `vh`/`vw` (fragile). Code maison en `rem`/`px`/`clamp()`, accroché à des tokens (`--nav-height` = 88px, `--hero-rythme`, `--hero-gouttiere`).
Tendance en multiples de 4 dans les `gap` (4-6-8-12-16-20-24), non formalisée en tokens.

## Rayons
`50%` cercles (badge, flèches) · `999px` pilules (navbar, CTA) · `16px` cadre photo hero · `14px` pilule réseaux · `12px` masques image.
L'origine Webflow utilise des rayons en `vh` (`10vh`, `1vh`, `3vh`) — non alignés.

## Animations
**Easing signature : `cubic-bezier(0.22, 1, 0.36, 1)`.** Toute nouvelle animation l'utilise par défaut.

- Navbar : slide 380ms / fade 260ms
- Badge MENU : retour retardé 400ms après fermeture
- Hero à l'arrivée : glisse 620ms, fondu 480ms, **cascade de 130ms** (0/130/260/…/780)
- Changement de fond hero : 320ms
- CTA flèche : cycle 2.4s infini, amplitude 10px, pause au survol
- Liens nav : roulement 0.34s, `cubic-bezier(0.77,0,0.175,1)`

`prefers-reduced-motion` est respecté partout. **Toute nouvelle animation doit l'implémenter.**

## Matière signature — verre teinté
`--verre-bg: rgba(245,245,242,0.4)` · `--verre-blur: blur(18px) saturate(1.15)` · `--verre-ombre: 0 6px 28px rgba(27,27,27,0.1)`
Utilisé sur la navbar et la pilule réseaux du hero.

## Traitement photo
Cadre hero : rayon 16px, ombre `0 14px 40px -18px rgba(27,27,27,0.5)`, `object-fit: cover`, parallaxe verticale au scroll (cadre fixe, photo plus haute).
Ratios : 4/3 (maquillage, cuisine), 3/4 (chemin). Cartes crèches : 4/3 → 4/4.2.
**Aucun filtre chromatique global.**

## ⚠️ Arbitrages en attente (Brian)
1. Palette en double (tokens Webflow + maison) — choisir une source unique.
2. Quasi-doublons probables : `#e8a849` vs `#e8a248`, `#8e9ec2` vs `#8195c2`.
3. `body` est en **Arial 14px**, pas en Nunito — tout texte non classé retombe en Arial.
4. Polices chargées deux fois (self-host + Google Fonts), poids 200→900 alors que 4 servent.
5. Deux blocs `<style>` footer contradictoires dans `index.html` — le second écrase le premier, mort partiel.
