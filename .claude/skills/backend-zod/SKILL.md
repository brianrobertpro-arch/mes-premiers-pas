---
name: backend-zod
description: Conventions TypeScript et validation Zod du backend Sigolink (Express, Supabase, Drizzle, pipeline 4 agents). À utiliser dès qu'il s'agit d'écrire ou de modifier du code dans sigolink-backend, de définir un schéma, de valider une sortie d'agent IA, ou de corriger une erreur de build ou de typage. Utiliser aussi avant tout push de code backend.
---

# Backend — typage et validation

## Zod
- `schema.safeParse(data)` exclusivement. `parse()` lève et casse le pipeline.
- Types dérivés des schémas via `z.infer<typeof schema>`.
  Ne jamais maintenir en parallèle une interface TS et un schéma Zod.
- Valider à **toutes** les frontières : requêtes HTTP, sorties de modèle, lectures DB.
- Revalider le résultat d'un merge avant persistance, pas seulement l'entrée.

## Sorties d'agents
Le helper `runAgent<TSchema>` valide et retente avec correction. Toute nouvelle
sortie de modèle passe par lui — pas de parsing manuel en marge du helper.

## TypeScript
- `any` interdit. `unknown` autorisé uniquement suivi d'une garde de type.
- `null` / `undefined` traités explicitement (garde ou chaînage optionnel).
- Imports inutilisés supprimés ; tout module importé doit exister dans `package.json`
  — le build Cloudflare casse sinon.

## Champs protégés
Coordonnées, slugs et identifiants de base ne sont jamais réécrits par un agent.
Ce sont des champs déterministes, appliqués après la sortie du modèle via
`finalizeModifierOutput` / `PROTECTED_FIELD_PATHS` (`src/agents/modifier.ts`).
