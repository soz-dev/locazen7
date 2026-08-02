#!/usr/bin/env node

/**
 * Script de vérification de la configuration Locazen
 * Vérifie que tout est correctement configuré pour le développement
 */

import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const API_URL = "https://locazen12-api.motastic.workers.dev";

console.log("\n🔍 Vérification de la configuration Locazen\n");
console.log("=".repeat(50));

let hasErrors = false;

// 1. Vérifier l'existence du fichier .env
console.log("\n1️⃣ Vérification du fichier .env");
if (!existsSync(join(__dirname, '.env'))) {
  console.log("❌ Fichier .env manquant");
  console.log("   Solution : cp .env.example .env");
  hasErrors = true;
} else {
  console.log("✅ Fichier .env trouvé");
  
  // 2. Vérifier le contenu du .env
  console.log("\n2️⃣ Vérification du token API");
  const envContent = readFileSync(join(__dirname, '.env'), 'utf-8');
  
  if (!envContent.includes('VITE_API_TOKEN=')) {
    console.log("❌ VITE_API_TOKEN non défini dans .env");
    hasErrors = true;
  } else {
    const match = envContent.match(/VITE_API_TOKEN=(.+)/);
    const token = match ? match[1].trim() : '';
    
    if (!token || token === 'your_api_token_here' || token === 'VOTRE_TOKEN_ICI_A_REMPLACER') {
      console.log("❌ Token API non configuré (placeholder détecté)");
      console.log("   Éditez le fichier .env et remplacez le token");
      hasErrors = true;
    } else {
      console.log("✅ Token API configuré");
    }
  }
}

// 3. Vérifier la connectivité au backend
console.log("\n3️⃣ Vérification du backend");
console.log(`   URL : ${API_URL}`);

try {
  const response = await fetch(`${API_URL}/rentals`);
  if (response.ok) {
    const data = await response.json();
    console.log(`✅ Backend accessible (${data.length} locations trouvées)`);
  } else {
    console.log(`⚠️  Backend répond avec le status ${response.status}`);
    hasErrors = true;
  }
} catch (error) {
  console.log("❌ Impossible de contacter le backend");
  console.log(`   Erreur : ${error.message}`);
  hasErrors = true;
}

// 4. Vérifier les dépendances
console.log("\n4️⃣ Vérification des dépendances");
if (!existsSync(join(__dirname, 'node_modules'))) {
  console.log("❌ node_modules manquant");
  console.log("   Solution : npm install");
  hasErrors = true;
} else {
  console.log("✅ Dépendances installées");
}

// Résultat final
console.log("\n" + "=".repeat(50));
if (hasErrors) {
  console.log("\n❌ Configuration incomplète ou erreurs détectées");
  console.log("\n📖 Consultez CONFIGURATION.md pour plus d'aide\n");
  process.exit(1);
} else {
  console.log("\n✅ Configuration OK ! Vous pouvez lancer : npm run dev\n");
  process.exit(0);
}
