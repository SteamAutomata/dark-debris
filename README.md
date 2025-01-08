# Astro Starter Kit: Minimal

## Infos

Le fichier `.env` doit contenir:

```ini
ASTRO_HUGGING_CHAT_TOKEN=token # Si on ne veut pas d'oauth
ASTRO_HUGGING_FACE_CLIENT_ID=clientid # Pour l'oauth
```

## Introduction

J'ai commencé par créer un projet Astro minimal.

Je vais utiliser ces outils dans mon stack, la majorité de ces outils sont inconnus à mes yeux (à part Typescript):

- Astro
  - Nouveau Framework web qui supporte le SSR, SSG et CSR
  - Successeur spirituel de Gatsby
- SQLite géré par Astro DB
- Typescript (forcément)
- ~~Netlify~~ Vercel
  - Je voulais déployer mon site sur internet avec Netlify mais son architecture n'est pas adaptée à mes besoins de SSR.
  - Vercel est un peu mieux et a une meilleur gestion du SSR.
- Hugging Face (abregé en HF)
  - Offre un API qui permet de connecter un utilisateur à mon application et bénéficier de l'API d'Inference LLM en tant qu'utilisateur, sans dépasser ma propre limite d'usage.

L'idée initiale est de créer un site web perso de blog. Mais les consignes ont changées et on va utiliser un LLM pour générer des histoires.

Donc le site:

- Sera site web fourre-tout
- Contiendra une page avec le LLM
  - Un formulaire pour demander au LLM de générer l'histoire (Seulement si l'utilisateur est connecté avec HF)
  - Une liste des générations précédentes
  - Détails des générations précédentes en cliquant sur un élement de la liste
- Sera deployé vers ~~Netlify~~ Vercel à chaque commit avec Github Actions

Pour commencer, je crée mon projet Astro minimal.

```sh
npm create astro@latest -- --template minimal
```

### Les pages

J'ajoute un Layout dans `pages/layouts/MainLayout.astro` pour le style générale du site sur toutes les pages. Je crée également une page d'index principale et une page 404.

Enfin, j'ajoute le dossier contenant la page d'index pour mon générateur d'histoire `pages/scp/index.astro` ainsi que les pages de détails de l'histoire `pages/scp/[...id].astro`. Si l'utilisateur se rend à `/scp`, il trouvera la page d'index, si il va à `/scp/1`, il trouvera le premier SCP.

### Côté React

Le dossier `components` contient les composants côté client en `.tsx` et on peut utiliser l'API du navigateur. Il faut ajouter l'attribut `client:load` dans la balise HTML.

Les composants côté serveurs dans `components/server` sont rendus par le serveur et ne bénéficient pas de l'API du navigateur du client, il faut privilégier le rendu côté serveur pour garder les performances au client au maximum.

### API

Astro utilise des fichiers `.ts` pour gérer le back-end à un plus bas niveau et créer des API en json par exemple.

J'ajoute un API pour soumettre le formulaire dans `pages/api/submit-scp.ts`, Astro supporte les fichiers javascript pour faire des API qui retournent du json par exemple.

Et pour plus tard, un callback pour l'Oauth dans `pages/auth/callback.ts` mais j'ignore à quoi ça sert pour l'instant.

### Fonctionnalités

Pour le SISR vs SLAM, on va créer un composant React dans `components/SlamOrSisr.tsx` et on va l'ajouter à notre `MainLayout`

## ~~Netlify~~ Vercel

Je crée une branche de développement pour Vercel
