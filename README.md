# Locazen - Application de Gestion de Locations

## 🚀 Démarrage Rapide

### Prérequis
- Node.js (v16 ou supérieur)
- npm ou yarn

### Installation

1. **Cloner le projet**
   ```bash
   git clone [votre-repo]
   cd [nom-du-projet]
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **⚠️ IMPORTANT : Configurer le fichier .env**
   ```bash
   cp .env.example .env
   ```
   
   Puis éditez le fichier `.env` et ajoutez votre token API :
   ```
   VITE_API_TOKEN=votre_token_api_ici
   ```
   
   > **Sans ce token, la page admin ne fonctionnera pas !**
   > Consultez [CONFIGURATION.md](./CONFIGURATION.md) pour plus de détails.

4. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

5. **Accéder à l'application**
   - Frontend : http://localhost:5173
   - Page Admin : http://localhost:5173/admin

## 📖 Documentation

- [Guide de Configuration Complet](./CONFIGURATION.md) - Tout sur la configuration du backend et du token API
- [Structure de l'API](#api) - Documentation des endpoints

## 🔧 Commandes Disponibles

- `npm run dev` - Démarrer en mode développement
- `npm run build` - Construire pour la production
- `npm run preview` - Prévisualiser la build de production
- `npm run lint` - Vérifier le code avec ESLint
- `npm run deploy` - Déployer sur GitHub Pages

## 🐛 Problèmes Courants

### "Erreur de chargement" sur la page admin
**Cause** : Le fichier `.env` est manquant ou le token API est invalide.

**Solution** :
1. Créez le fichier `.env` depuis `.env.example`
2. Ajoutez le bon token API
3. Redémarrez le serveur de développement

Consultez [CONFIGURATION.md](./CONFIGURATION.md) pour plus de détails.

### Les locations ne s'affichent pas
Vérifiez que le backend est accessible :
```bash
curl https://locazen12-api.motastic.workers.dev/rentals
```

## 📁 Structure du Projet

```
├── src/
│   ├── components/     # Composants React
│   ├── pages/          # Pages de l'application
│   ├── lib/            # Utilitaires et API
│   └── hooks/          # Hooks personnalisés
├── worker/             # Backend Cloudflare Worker
│   └── src/
│       └── index.js    # API Worker
└── public/             # Fichiers statiques
```

## 🚢 Déploiement

### Frontend (GitHub Pages)
```bash
npm run deploy
```

### Backend (Cloudflare Worker)
```bash
cd worker
npx wrangler deploy
```

## 📝 License

MIT
