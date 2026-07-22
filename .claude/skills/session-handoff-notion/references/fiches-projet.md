# Fiches .md d'état — Projet Sigolink

Fiches de référence qui portent l'état du projet entre les sessions. Chaque
fiche a un mainteneur, un budget de tokens indicatif (pour rester lisible et ne
pas exploser le contexte des sessions suivantes) et un moment de mise à jour.

## Règle d'or (non négociable)
**Rien n'entre dans une fiche tant que le commit annoncé n'est pas vérifié sur
GitHub et atteignable depuis la branche de base de la session suivante.**
Une fiche qui décrit un commit non poussé, ou poussé sur une branche jamais
mergée, est un mensonge qui fait repartir la session suivante sur une base
fausse. Vérifier le commit AVANT d'écrire, jamais l'inverse.

## Liste des fiches

| Fiche | Rôle | Mainteneur | Budget tokens | Se met à jour quand |
|---|---|---|---|---|
| `sigolink-architecture.md` | Vue d'ensemble : repos, stack, flux entre briques, décisions structurantes. | IA manager | ~4k | Ajout/suppression d'un repo, changement de stack, décision d'archi. |
| `regles-agents.md` | Règles du pipeline 4 agents backend (rôles, contrats d'E/S, champs protégés). | IA manager | ~3k | Modification d'un agent, d'un schéma d'E/S ou d'un champ protégé. |
| `mpp-etat.md` | État du site MPP (mes-premiers-pas) : pages faites, en cours, TODO. | Session courante MPP | ~2k | Fin de bloc validé touchant MPP. |
| `veralto-etat.md` | État du site VERALTO : pages faites, en cours, TODO. | Session courante VERALTO | ~2k | Fin de bloc validé touchant VERALTO. |
| `da-mpp.md` | Direction artistique MPP — synthèse actionnable (couleurs, typo, espacements). | IA manager + repro-visuelle | ~2k | Nouvelle valeur DA validée, ou correction d'une valeur erronée. |
| `DA-EXTRACTION.md` | DA MPP — détail sourcé ligne par ligne (chaque valeur avec sa provenance). | repro-visuelle | ~5k | Extraction d'une nouvelle référence visuelle. |

## Discipline de budget
Dépasser le budget d'une fiche est un signal : soit elle contient de
l'historique à archiver, soit elle mélange plusieurs sujets à scinder. Ne pas
laisser une fiche enfler indéfiniment — une fiche illisible n'est plus lue.

## Ordre de mise à jour en fin de session
1. Vérifier les commits sur GitHub (règle d'or).
2. Mettre à jour la/les fiche(s) d'état concernée(s) (`mpp-etat.md`, `veralto-etat.md`).
3. Si l'archi ou les règles agents ont bougé : `sigolink-architecture.md`, `regles-agents.md`.
4. Si une valeur DA a été relevée : `da-mpp.md` puis `DA-EXTRACTION.md`.
