# 🚀 Guide Rapide - Résoudre l'erreur backend

## Le problème
Vous voyez une erreur sur la page admin ? C'est parce que **le token API est manquant**.

## La solution en 3 étapes

### Étape 1️⃣ : Copier le template
```bash
cp .env.example .env
```

### Étape 2️⃣ : Récupérer votre token API

1. Allez sur **Cloudflare Dashboard** : https://dash.cloudflare.com
2. Cliquez sur **Workers & Pages**
3. Sélectionnez **locazen12-api**
4. Allez dans **Settings** > **Variables and Secrets**
5. Copiez la valeur de **API_TOKEN**

### Étape 3️⃣ : Configurer le token

Éditez le fichier `.env` et remplacez :
```bash
VITE_API_TOKEN=VOTRE_TOKEN_ICI_A_REMPLACER
```

Par votre vrai token :
```bash
VITE_API_TOKEN=le_token_copie_depuis_cloudflare
```

## Vérifier que tout fonctionne

```bash
npm run check-config
```

Si vous voyez ✅ partout, c'est bon !

## Lancer l'application

```bash
npm install  # Si pas encore fait
npm run dev
```

## Toujours des problèmes ?

Consultez [CONFIGURATION.md](./CONFIGURATION.md) pour le guide complet.

---

**Note** : Le fichier `.env` ne sera jamais commité dans git (il est dans `.gitignore`). C'est normal et voulu pour des raisons de sécurité.
