# Source de ces skills

Copie vendorisée de [`brianrobertpro-arch/sigolink-skills`](https://github.com/brianrobertpro-arch/sigolink-skills),
épinglée au commit `34bd8fc` (branche `main` : *« Init sigolink-skills : 8 skills (SKILL.md), 2 scripts, references, README »*).

**Source canonique = le repo `sigolink-skills`, pas ce dossier.** Toute
modification d'un skill se fait d'abord dans `sigolink-skills`, puis se
recopie ici. Ne pas éditer un skill directement dans ce repo sans reporter le
changement en amont — sinon les deux copies divergent silencieusement.

## Pourquoi une copie et pas un submodule

`sigolink-skills` est conçu pour être monté en submodule Git (voir son
README). Ce repo l'a abandonné : le proxy d'authentification des sessions
Claude Code cloud empêche `git submodule update --init` d'aboutir. Les 8
dossiers sont donc copiés ici en fichiers ordinaires.

## Mettre à jour cette copie

```bash
# depuis une session avec accès aux deux repos
cp -a <clone-sigolink-skills>/<dossier-skill> .claude/skills/<dossier-skill>
```

Vérifier après copie que les bits d'exécution des scripts (`scripts/*.sh`)
sont toujours posés (`ls -l`) — une copie via certains outils ou via
l'interface web GitHub peut les perdre.
