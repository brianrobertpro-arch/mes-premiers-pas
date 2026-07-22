---
name: seo-technique
description: SEO technique des sites de commerces locaux Sigolink — JSON-LD Schema.org, hiérarchie sémantique HTML, balises head, OpenGraph. À utiliser dès qu'il est question de référencement, de balises meta, de partage social, de structure de titres, de données structurées, ou avant toute mise en ligne d'un site. Utiliser aussi de soi-même lors de la création d'une nouvelle page, avant de la considérer terminée.
---

# SEO technique

## Données structurées
Un bloc `<script type="application/ld+json">` par page.
Type selon le métier : `Restaurant` (VERALTO), `ChildCare` (MPP), `Plumber`,
sinon `LocalBusiness`.
Champs minimum : `name`, `image`, `address` (streetAddress, postalCode,
addressLocality), `telephone`, `openingHoursSpecification`, `priceRange` si pertinent.

**Interdit** : générer un JSON-LD à partir de coordonnées placeholder. Si l'adresse
ou le téléphone sont fictifs, ne pas émettre le bloc et le signaler.

## Sémantique
- Un seul `<h1>` par document.
- Aucun saut de niveau de titre.
- `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` au lieu de `<div>`.
- `alt` descriptif sur chaque image porteuse de sens ;
  `alt=""` + `aria-hidden="true"` sur le purement décoratif.

## Head
`<title>`, `<meta name="description">`, `<link rel="canonical">`.
OpenGraph : `og:title`, `og:description`, `og:image`, `og:url`, `og:type`,
`og:locale="fr_FR"`. Twitter : `summary_large_image`.

## Vérification finale
Lister les pages sans JSON-LD, sans canonical ou sans og:image avant de déclarer terminé.
