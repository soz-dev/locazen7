# Configuration du Projet Locazen

## Problème Backend - Token API Manquant

### Symptômes
- La page admin affiche une erreur au chargement
- Les données des locations ne s'affichent pas
- Message d'erreur "Unauthorized" dans les requêtes API

### Cause
Le fichier `.env` est manquant et le token `VITE_API_TOKEN` n'est pas défini. Ce token est nécessaire pour s'authentifier auprès du backend Cloudflare Worker.

### Solution

1. **Créer le fichier `.env` à la racine du projet** :
   ```bash
   cp .env.example .env
   ```

2. **Ajouter le token API** dans le fichier `.env` :
   ```
   VITE_API_TOKEN=votre_token_api_ici
   ```

3. **Trouver le token API** :
   - Le token doit correspondre à celui configuré dans les secrets du Cloudflare Worker
   - Connectez-vous à votre dashboard Cloudflare
   - Allez dans Workers & Pages
   - Sélectionnez le worker `locazen12-api`
   - Allez dans Settings > Variables and Secrets
   - Récupérez la valeur de `API_TOKEN`

4. **Redémarrer le serveur de développement** :
   ```bash
   npm run dev
   ```

## Configuration du Backend (Cloudflare Worker)

Le backend est hébergé sur Cloudflare Workers à l'adresse :
```
https://locazen12-api.motastic.workers.dev
```

### Base de données
- Type : Cloudflare D1 (SQLite)
- Nom : `locazen12-db`
- Database ID : `1937e64f-f6b5-4076-92a4-6cf5f336e964`

### Tables
1. **rentals** : Contient les locations
2. **reviews** : Contient les avis des clients
3. **settings** : Contient les paramètres de configuration

## Déploiement du Worker

Pour déployer les modifications du worker :

```bash
cd worker
npx wrangler deploy
```

## Variables d'Environnement Requises

### Frontend (.env)
- `VITE_API_TOKEN` : Token d'authentification pour l'API

### Worker (Cloudflare Secrets)
- `API_TOKEN` : Token d'authentification (doit correspondre à VITE_API_TOKEN)

## Structure de l'API

### Endpoints Publics
- `GET /rentals` : Liste toutes les locations
- `GET /reviews` : Liste les avis visibles
- `GET /settings` : Récupère les paramètres publics

### Endpoints Protégés (nécessitent le token)
- `POST /rentals` : Créer une location
- `PUT /rentals/:id` : Modifier une location
- `DELETE /rentals/:id` : Supprimer une location
- `PUT /settings/:key` : Modifier un paramètre
- `GET /reviews/all` : Liste tous les avis (y compris masqués)
- `POST /reviews` : Créer un avis (admin)
- `PUT /reviews/:id` : Modifier la visibilité d'un avis
- `DELETE /reviews/:id` : Supprimer un avis

## Origines CORS Autorisées

Le backend autorise les requêtes depuis :
- `https://soz-dev.github.io` (production)
- `http://localhost:5173` (développement)
- `http://localhost:4173` (preview)
