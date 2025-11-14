# Configuration CORS - Marketplace

## ✅ CORS configuré pour le Marketplace

### Configuration effectuée :

1. **Middleware CORS créé** (`app/Http/Middleware/CorsMiddleware.php`)
   - Support multi-origines (localhost:5173, 127.0.0.1:5173, etc.)
   - Headers CORS complets
   - Support des requêtes preflight (OPTIONS)

2. **Bootstrap Laravel 11 configuré** (`bootstrap/app.php`)
   - Routes API activées
   - Middleware CORS appliqué globalement

3. **Service API Frontend créé** (`frontend/src/services/api.ts`)
   - Configuration pour `http://127.0.0.1:4000/api`
   - Support des credentials (sessions)
   - Types TypeScript

## 🚀 Démarrage

### Backend (Marketplace)
```bash
cd backend
php artisan serve --port=4000
```

### Frontend
```bash
cd frontend  
npm run dev
```

### Test de l'API
```bash
cd backend
php test-api.php
```

## 🔗 URLs

- **Frontend**: http://localhost:5173
- **API Marketplace**: http://localhost:4000/api
- **API Agency**: http://localhost:8000/api (si configuré)

## 📝 Endpoints disponibles

- `GET /api/test` - Test de connexion
- `POST /api/auth/register` - Inscription client
- `POST /api/auth/login` - Connexion
- `POST /api/auth/logout` - Déconnexion
- `GET /api/auth/profile` - Profil utilisateur

## ⚠️ Important

Le frontend est configuré pour utiliser le port **4000** pour l'API marketplace selon le fichier `.env` :
```
VITE_API_URL=http://127.0.0.1:4000/api
```

Assure-toi de démarrer Laravel sur le bon port !
