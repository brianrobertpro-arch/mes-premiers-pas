---
name: repro-visuelle
description: Reproduction à l'identique d'une référence visuelle fournie (capture d'écran, maquette, site existant, extrait vidéo) sur le projet Sigolink. À utiliser dès qu'une image ou un lien de référence est fourni avec une demande d'intégration, ou dès que l'utilisateur dit « comme ça », « pareil que », « reproduis », « fidèle à », « même rendu ». Interdit toute interprétation libre ou amélioration spontanée de la référence.
---

# Reproduction à l'identique

## Principe
La référence fait autorité. Aucune interprétation, aucune amélioration non demandée,
aucune substitution de police ou de couleur « équivalente ».

## Hiérarchie d'autorité
Référence visuelle fournie > fiche DA du projet > skill métier générique > CLAUDE.md du repo.
Un skill générique ne corrige jamais la DA ; il comble ce qu'elle ne dit pas.

## Extraction avant code
Relever explicitement, et annoncer les valeurs relevées avant d'écrire la moindre ligne :
- couleurs (hex exacts, y compris opacités)
- typographie : famille, graisse, taille, interlignage, letter-spacing
- espacements et rayons de bordure
- ratios et cadrages d'images, traitement (filtres, overlays)
- animations : durée, courbe d'easing, délai, déclencheur

## Fiches DA du projet
`da-mpp.md` (synthèse) et `DA-EXTRACTION.md` (détail sourcé ligne par ligne).
Consulter la seconde dès qu'une valeur manque dans la première.

## Si une valeur n'est pas lisible sur la référence
Ne pas inventer. Lister les valeurs manquantes et demander à Brian.
Une valeur devinée qui passe inaperçue coûte plus cher qu'une question.

## Vérification
Comparer le rendu au 1:1 contre la référence avant de déclarer terminé.
Signaler tout écart résiduel et sa cause.
