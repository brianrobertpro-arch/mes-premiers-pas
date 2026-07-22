#!/usr/bin/env bash
#
# zip-jalon.sh — archive horodatée d'un jalon, en complément du push GitHub.
#
# Usage : scripts/zip-jalon.sh <label>
# Sortie : ../jalons/<repo>_<label>_<AAAAMMJJ-HHMM>.zip
#
# Refuse de tourner si le repo a des modifications non commitées : un ZIP
# d'un état sale n'est pas un jalon fiable. Committer/pousser d'abord.

set -euo pipefail

usage() {
  cat >&2 <<'EOF'
Usage : zip-jalon.sh <label>

  <label>   étiquette courte du jalon (ex. avant-refonte-footer)

Crée ../jalons/<repo>_<label>_<AAAAMMJJ-HHMM>.zip à partir de l'état
committé du repo courant. Exclut node_modules/ .git/ dist/ .astro/
.next/ et les fichiers .env*.
EOF
}

# 1. Argument obligatoire.
if [ "$#" -ne 1 ] || [ -z "${1:-}" ]; then
  usage
  exit 1
fi
label="$1"

# 2. On doit être dans un repo git.
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Erreur : pas dans un dépôt git." >&2
  exit 1
fi

# 3. Refuser un repo sale.
if [ -n "$(git status --porcelain)" ]; then
  echo "Erreur : modifications non commitées détectées." >&2
  echo "Un ZIP de jalon doit refléter un état poussé. Committer et pousser d'abord :" >&2
  echo >&2
  git status --short >&2
  exit 1
fi

# 4. Chemin de sortie.
repo_root="$(git rev-parse --show-toplevel)"
repo_name="$(basename "$repo_root")"
stamp="$(date +%Y%m%d-%H%M)"
out_dir="$(dirname "$repo_root")/jalons"
out_file="${out_dir}/${repo_name}_${label}_${stamp}.zip"

mkdir -p "$out_dir"

# 5. Créer le ZIP depuis la racine du repo, avec les exclusions.
(
  cd "$repo_root"
  zip -r -q "$out_file" . \
    -x '*/node_modules/*' 'node_modules/*' \
    -x '*/.git/*' '.git/*' \
    -x '*/dist/*' 'dist/*' \
    -x '*/.astro/*' '.astro/*' \
    -x '*/.next/*' '.next/*' \
    -x '*.env' '*.env.*' '.env' '.env.*'
)

# 6. Restituer chemin du ZIP + SHA du HEAD.
head_sha="$(git rev-parse HEAD)"
echo "ZIP  : $out_file"
echo "HEAD : $head_sha"
