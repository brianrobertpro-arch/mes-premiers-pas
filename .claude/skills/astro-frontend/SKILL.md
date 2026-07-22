---
name: astro-frontend
description: Conventions de composants Astro + Tailwind pour les sites Sigolink — typage des props, classes statiques, mobile-first, animations GPU, zéro CLS. À utiliser dès qu'un fichier .astro est créé ou modifié, dès qu'il est question de composant, de layout, de Tailwind, d'animation SVG ou de performance de chargement. NE PAS utiliser sur le site MPP (repo mes-premiers-pas), qui est un override statique aspiré sans Astro ni pipeline Tailwind — vérifier la stack réelle du repo avant d'appliquer.
---

# Conventions frontend Astro

## Garde-fou de périmètre
Vérifier la présence d'`astro.config.*` avant d'appliquer. Absent → arrêter et le dire.
Le repo `mes-premiers-pas` est du HTML/CSS statique : ces règles ne s'y appliquent pas.

## Composants
- Interface `Props` exportée dans le frontmatter. `any` interdit.
- Pas de classe Tailwind construite par concaténation (`bg-${c}-500` ne compile pas).
  Utiliser un objet de mapping vers des classes littérales complètes.
- Mobile-first : styles de base sans breakpoint, puis `sm:` `md:` `lg:`.

## Couleurs et typographie
Passer par les variables de thème du projet. Une valeur hex en dur exige une
validation DA explicite — voir la fiche DA du projet avant d'en introduire une.

## Animations
- CSS scoped (`<style scoped>`) dès qu'on dépasse Tailwind.
- Animer uniquement `transform` et `opacity`. Jamais `top`, `left`, `margin`, `width`.
- `will-change: transform` sur les éléments réellement animés, pas partout.
- SVG inline : IDs uniques préfixés (`svg-<composant>-<noeud>`) — sinon collision
  de masques et de dégradés entre composants.
- `prefers-reduced-motion` : neutraliser les transitions et rétablir l'état final visible.
  Non optionnel.

## Zéro CLS
- `width` + `height` (ou `aspect-ratio`) sur tout `<img>`, `<video>`, `<svg>`.
- Hero au-dessus de la ligne de flottaison : `loading="eager"` + `fetchpriority="high"`.
- Tout le reste : `loading="lazy"` + `decoding="async"`.
- Polices personnalisées : `font-display: swap`.
