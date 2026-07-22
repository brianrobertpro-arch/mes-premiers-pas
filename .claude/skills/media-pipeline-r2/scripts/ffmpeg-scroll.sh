#!/usr/bin/env bash
#
# ffmpeg-scroll.sh — cut + crop + compression web d'une vidéo de scroll (2→4).
#
# Skill LOCAL : ffmpeg n'existe que sur le PC. En session cloud, ce script
# sort proprement dès le premier contrôle.
#
# Tous les paramètres sont passés en arguments — jamais de valeur en dur.

set -euo pipefail

usage() {
  cat >&2 <<'EOF'
Usage : ffmpeg-scroll.sh -i <entree> -o <sortie> -w <W> -h <H> -x <X> -y <Y> \
                         [-s <debut>] [-e <fin>] [-c <crf>]

  -i  fichier vidéo source
  -o  fichier vidéo de sortie (.mp4)
  -w  largeur du crop (px)
  -h  hauteur du crop (px)
  -x  offset X du crop (px, coin haut-gauche)
  -y  offset Y du crop (px, coin haut-gauche)
  -s  timecode de début du cut (ex. 00:00:03.5) — optionnel
  -e  timecode de fin du cut (ex. 00:00:12) — optionnel
  -c  CRF de compression H.264 (défaut 27)

Compression : H.264, -movflags +faststart, -an (piste audio retirée).
Relever les dimensions réelles de l'UI avant de croper — ne pas supposer.
EOF
}

# 0. Garde-fou : ffmpeg présent ?
if ! ffmpeg -version >/dev/null 2>&1; then
  echo "Erreur : ffmpeg introuvable — session cloud probable." >&2
  echo "Ce skill est LOCAL. Lancer sur le PC. Stop." >&2
  exit 1
fi

# Valeurs.
input="" ; output="" ; cw="" ; ch="" ; cx="" ; cy=""
start="" ; end="" ; crf="27"

while getopts ":i:o:w:h:x:y:s:e:c:" opt; do
  case "$opt" in
    i) input="$OPTARG" ;;
    o) output="$OPTARG" ;;
    w) cw="$OPTARG" ;;
    h) ch="$OPTARG" ;;
    x) cx="$OPTARG" ;;
    y) cy="$OPTARG" ;;
    s) start="$OPTARG" ;;
    e) end="$OPTARG" ;;
    c) crf="$OPTARG" ;;
    :) echo "Erreur : option -$OPTARG requiert une valeur." >&2 ; usage ; exit 1 ;;
    \?) echo "Erreur : option inconnue -$OPTARG." >&2 ; usage ; exit 1 ;;
  esac
done

# Arguments obligatoires.
if [ -z "$input" ] || [ -z "$output" ] || [ -z "$cw" ] || [ -z "$ch" ] || [ -z "$cx" ] || [ -z "$cy" ]; then
  usage
  exit 1
fi

if [ ! -f "$input" ]; then
  echo "Erreur : fichier source introuvable : $input" >&2
  exit 1
fi

# Construction de la commande.
cmd=(ffmpeg -hide_banner -y)
[ -n "$start" ] && cmd+=(-ss "$start")
[ -n "$end" ] && cmd+=(-to "$end")
cmd+=(-i "$input")
cmd+=(-vf "crop=${cw}:${ch}:${cx}:${cy}")
cmd+=(-c:v libx264 -crf "$crf" -preset slow -movflags +faststart -an)
cmd+=("$output")

echo "→ ${cmd[*]}"
"${cmd[@]}"

# Contrôle final : poids, durée, dimensions.
if command -v ffprobe >/dev/null 2>&1; then
  dur="$(ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 "$output")"
  dims="$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 "$output")"
else
  dur="(ffprobe absent)" ; dims="(ffprobe absent)"
fi
size="$(du -h "$output" | cut -f1)"

echo "Sortie     : $output"
echo "Poids      : $size"
echo "Durée      : ${dur}s"
echo "Dimensions : $dims"
