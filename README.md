# AI Chatbot

## Ce qui a été implémenté

### Fonctionnalités principales
- Un chatbot permettant de discuter avec des modèles de langage issus de Nvidia NIM et Hugging Face
- Un mode duel permettant de comparer les réponses de deux modèles simultanément
- Un mode histoire utilisant TinyStories pour créer des histoires interactives
- Une bibliothèque de prompts avec système de tags et likes
- Un thème sombre/clair adaptatif

### Modèles d'IA disponibles
- Llama 3
- Mistral 7B
- Nemotron mini 4B
- TinyStories 33M
- Phi-3.5

### Caractéristiques techniques
- Interface utilisateur responsive avec Tailwind CSS
- Gestion des états avec Vue.js
- Support des messages en temps réel
- Système de filtrage par tags
- Export des histoires au format texte
- Intégration avec les API Nvidia NIM et Hugging Face

## Configuration requise

### Variables d'environnement
Créez un fichier `.env` à la racine du projet avec les clés API nécessaires :
```
HUGGING_FACE_API_KEY=votre_clé_api
NVIDIA_NIM_API_KEY=votre_clé_api
```

## Installation

```bash
# Installation des dépendances
npm install
```

## Développement

```bash
# Démarrage du serveur de développement sur http://localhost:3000
npm run dev
```

## Production

```bash
# Construction de l'application
npm run build

# Prévisualisation de la version de production
npm run preview
```

## Technologies utilisées
- Nuxt.js 3
- Vue.js 3
- Tailwind CSS
- TypeScript
- API Nvidia NIM
- API Hugging Face
