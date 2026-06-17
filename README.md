# Modula CMS registry

`modula-cms-registry` est le registre central Cloudflare de l’écosystème Modula CMS.

Il travaille avec :

- CMS source : [IdoSoIam/modula-cms](https://github.com/IdoSoIam/modula-cms)
- instance Node de référence : [IdoSoIam/modula-cms-presentation](https://github.com/IdoSoIam/modula-cms-presentation)

## Rôle du dépôt

Le registre central sert à gérer :

- les templates versionnés
- les assets de templates
- les previews de templates
- les releases applicatives
- l’enregistrement d’instances
- les jobs et logs de déploiement
- l’introspection des capacités d’un token

## Authentification

Le modèle d’auth est volontairement simple :

- lecture publique pour les templates, previews, releases et artefacts
- `OWNER_API_KEY` pour muter le système
- `CUSTOM_API_KEY` pour muter le custom

En pratique :

- sans clé, une instance peut lire et appliquer les modèles système
- avec `OWNER_API_KEY`, vous pouvez créer, mettre à jour et publier le système
- avec `CUSTOM_API_KEY`, vous pouvez gérer uniquement le custom

## Stack

- `Cloudflare Workers`
- `D1`
- `R2`
- `Wrangler`
- `TypeScript`

## Démarrage

1. Créer la base D1 et le bucket R2.
2. Remplacer les bindings dans [wrangler.jsonc](D:/Works/modula-cms-registry/wrangler.jsonc).
3. Définir les clés du registre :
   - `OWNER_API_KEY` pour les mutations système
   - `CUSTOM_API_KEY` pour les mutations custom si vous l’utilisez
4. Appliquer les migrations :

```bash
npm run db:migrate:local
```

5. Lancer :

```bash
npm run dev
```

## Scripts

- `npm run dev`
- `npm run dev:remote`
- `npm run deploy`
- `npm run db:migrate:local`
- `npm run db:migrate:remote`

## Règle produit

Le registre distingue en pratique :

- un espace système, utilisé pour les modèles et releases partagés
- des usages custom, utilisés par les instances qui gèrent leur propre registre

Le CMS consomme ensuite ce registre pour :

- lister les templates système
- fusionner les templates custom si une URL custom est configurée
- publier et lire les releases
- interroger les droits réels d’un token avant d’autoriser les mutations

## Contribution

Les contributions doivent préserver le rôle de control plane léger du registre.

### Principes

- garder le registre stateless côté Worker autant que possible
- conserver `D1` pour les métadonnées et `R2` pour les artefacts
- ne pas déplacer ici de logique métier CMS qui appartient à `modula-cms`
- préserver les contrats API utilisés par les instances
- garder un modèle d’auth lisible : lecture publique, mutation par clé simple

### Workflow recommandé

1. modifier l’API ou le modèle D1 de manière explicite
2. ajouter la migration D1 correspondante si nécessaire
3. tester en `dev` local
4. vérifier la compatibilité avec `modula-cms`
5. déployer avec `npm run deploy`

## Licence

Ce projet est distribué sous licence `GNU GPL v3.0`.

Concrètement :

- vous pouvez utiliser, modifier et redistribuer le registre
- une redistribution modifiée doit rester sous GPL
- le code source correspondant doit rester accessible aux destinataires

Le texte complet est fourni dans [LICENSE](D:/Works/modula-cms-registry/LICENSE).
