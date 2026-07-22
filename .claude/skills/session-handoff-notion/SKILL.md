---
name: session-handoff-notion
description: Clôture de session Claude Code sur le projet Sigolink — rédige le rapport dans la base Notion « 📨 Rapports Claude Code » et met à jour les fiches .md d'état du projet. À utiliser systématiquement dès que l'utilisateur dit « fin de session », « on s'arrête », « fais le rapport », « handoff », « bilan », ou dès qu'un gros bloc de travail est validé — même si l'utilisateur ne mentionne ni Notion ni rapport. Le rapport est le SEUL mécanisme de passation entre sessions : ne jamais terminer un bloc validé sans lui.
---

# Handoff de fin de session

## Quand
Fin de session, ou fin d'un gros bloc validé par Brian. En cas de doute : le faire.

## Étapes
1. **Inventaire** : lister ce qui a été fait, ce qui est en cours, ce qui bloque. Un blocage se rapporte toujours avec son POURQUOI (cause racine), jamais comme un simple constat d'échec.
2. **Push** : vérifier que tout le travail validé est poussé sur GitHub avant d'écrire le rapport. Un rapport qui décrit du code non poussé est un rapport faux.
3. **Rapport Notion** : créer une entrée dans la base « 📨 Rapports Claude Code ». Lire `references/notion-mcp.md` avant le premier appel MCP.
4. **Fiches .md** : mettre à jour les fiches d'état concernées. Voir `references/fiches-projet.md` pour la liste, les mainteneurs et les budgets de tokens.
5. **Restituer** : donner à Brian le lien du rapport + la liste des fiches modifiées.

## Format du rapport
- **Contexte** : repo, branche de base, branche de travail relevée, environnement (cloud/local), modèle.
- **Fait ✅** : liste factuelle, une ligne par item, avec le commit ou la branche.
- **En cours 🔄** : état exact + prochaine action immédiate.
- **Bloqué ⛔** : symptôme → cause → piste de résolution.
- **Reprise** : ce que la session suivante doit lire en premier, et **depuis quelle branche partir**.

Le rapport doit être **auto-portant** : lisible par une session qui n'a aucun contexte.
Il n'est PAS soumis au style télégraphique — il est écrit en phrases complètes.

## Piège connu
Le rapport ne se commite jamais dans le repo. Il va dans Notion. Un rapport committé
n'est pas vu par l'IA manager et le handoff est perdu.
