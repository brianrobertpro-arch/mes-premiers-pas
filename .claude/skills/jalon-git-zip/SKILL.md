---
name: jalon-git-zip
description: Archivage horodaté d'un jalon sur le projet Sigolink — crée un ZIP daté de l'état du repo en complément du push GitHub. À utiliser dès que l'utilisateur dit « jalon », « point de sauvegarde », « archive », « ZIP », « avant de casser quelque chose », ou juste avant toute opération risquée (refonte structurelle, migration, suppression massive, rebase). Utiliser aussi de soi-même quand un gros bloc vient d'être validé, avant d'entamer le suivant.
---

# Jalon : push + ZIP horodaté

## Règle
Push GitHub = à chaque étape validée. ZIP horodaté = aux gros jalons seulement.
Le ZIP est un filet de sécurité hors-git, pas un substitut au push.

## Étapes
1. `git status` — refuser de créer le jalon si des modifications non commitées existent, et le dire.
2. Commit + push sur la branche courante.
3. `scripts/zip-jalon.sh <label>` → `../jalons/<repo>_<label>_<AAAAMMJJ-HHMM>.zip`
4. Restituer le chemin du ZIP et le SHA du commit correspondant.

## Exclusions du ZIP
`node_modules/`, `.git/`, `dist/`, `.astro/`, `.next/`, fichiers `.env*`.
