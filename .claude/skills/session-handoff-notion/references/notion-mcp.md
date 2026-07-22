# Patterns MCP Notion

Notes pratiques pour écrire un rapport dans la base « 📨 Rapports Claude Code »
sans se faire piéger par le MCP Notion.

## Recherche : large plutôt que précise
La recherche Notion fonctionne mieux avec des **requêtes larges** (un ou deux
mots-clés) qu'avec des phrases précises. Chercher `Rapports Claude Code`, pas
« la base des rapports de session de Claude Code ». Filtrer ensuite les
résultats côté client.

## Contenu de page : markdown inline
Le contenu d'une page se crée via **create-pages** en passant du **markdown
inline** dans le corps. Titres, listes, gras, code : le markdown standard est
converti en blocs Notion. Pas besoin de composer les blocs à la main.

## Entrées de base : fetch du schéma d'abord
Une entrée de base de données n'est pas une page libre : ses **propriétés
doivent être conformes au schéma** de la base. Un champ `select` ou
`multi_select` n'accepte que ses valeurs déclarées.

**Toujours fetch la base d'abord** pour lire les valeurs exactes des champs
select (casse, accents, emoji compris) avant d'écrire. Écrire `En cours` quand
le schéma dit `🔄 En cours` échoue ou crée une valeur parasite.

## Connexion de l'intégration = échec silencieux sinon
Le token d'intégration doit être **explicitement connecté à chaque page
cible** (base des rapports + toute page à mettre à jour). Sans ça, l'appel
échoue **silencieusement** : pas d'erreur bloquante, juste rien qui s'écrit.
En cas de « ça n'apparaît pas dans Notion », vérifier la connexion de
l'intégration à la page **avant** de suspecter le code.

## Ordre recommandé
1. Fetch la base « 📨 Rapports Claude Code » → relever le schéma (noms + valeurs select).
2. Composer les propriétés conformes + le corps en markdown inline.
3. create-pages avec la base comme parent.
4. Vérifier que la page est bien créée et récupérer son URL pour la restitution.
