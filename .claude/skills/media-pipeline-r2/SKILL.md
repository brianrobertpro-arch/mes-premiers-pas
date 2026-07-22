---
name: media-pipeline-r2
description: Traitement de vidéos et d'images pour les sites Sigolink et leur mise en ligne sur Cloudflare R2 — cut, crop d'UI, compression web, upload. À utiliser dès qu'il est question de vidéo de scroll, capture d'écran mobile, montage ffmpeg, compression d'asset lourd, ou upload R2. Ce skill est LOCAL : si la session tourne en cloud, l'annoncer immédiatement et arrêter — ffmpeg et l'accès R2 ne sont disponibles que sur le PC.
---

# Pipeline média → R2

## Garde-fou
Vérifier `ffmpeg -version` en premier. Absent → session cloud → stop, prévenir Brian.

## Étapes
1. **Source** : fichier téléchargé depuis Drive vers le PC.
2. **Cut** début/fin sur les timecodes donnés.
3. **Crop** de l'UI (barre d'état, barre de navigation) — relever les dimensions réelles avant de croper, ne pas supposer.
4. **Compression web** : H.264, CRF 26-28, `-movflags +faststart`, pas de piste audio si muet.
5. **Contrôle** : poids final, durée, dimensions. Annoncer les 3.
6. **Upload R2**, restituer l'URL publique.

`scripts/ffmpeg-scroll.sh` couvre 2→4 en une passe.

## Cible actuelle
Vidéos de scroll Insta + FB destinées à l'écran du téléphone SVG du footer MPP.
Format cible = celui de l'écran SVG, à relever dans le code avant compression.
