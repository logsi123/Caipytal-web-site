# Caipytal Backend - Documentation Technique

## Vue d'ensemble

Le backend de Caipytal est construit avec **Supabase** comme infrastructure principale, utilisant :
- **Supabase Auth** pour l'authentification JWT
- **Edge Functions** pour les API serverless
- **OpenAI GPT-4** pour l'intelligence artificielle

## Architecture

### Technologies
- **Runtime**: Deno (Edge Functions)
- **Base de données**: PostgreSQL (Supabase)
- **Authentification**: Supabase Auth (JWT)
- **IA**: OpenAI API (GPT-4o-mini)
- **Frontend**: React 18 + Vite

## Modules Backend Déployés

### 1. Authentication (Supabase Auth)

#### Inscription
```javascript
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123',
  options: {
    data: {
      full_name: 'John Doe'
    }
  }
});
```

#### Connexion
```javascript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
});
```

#### Déconnexion
```javascript
const { error } = await supabase.auth.signOut();
```

#### Réinitialisation de mot de passe
```javascript
const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
  redirectTo: `${window.location.origin}/reset-password`
});
```

### 2. Edge Function: AI Recommendations

**Endpoint**: `/functions/v1/ai-recommendations`

**Description**: Génère des recommandations d'investissement personnalisées basées sur le profil utilisateur et le plan d'abonnement.

#### Requête
```javascript
POST /functions/v1/ai-recommendations
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "subscriptionPlan": "BASIC" | "MEDIUM" | "PREMIUM",
  "userProfile": {
    "riskTolerance": "LOW" | "MEDIUM" | "HIGH",
    "investmentGoals": "growth" | "income" | "preservation",
    "currentBalance": 10000
  }
}
```

#### Réponse
```json
{
  "success": true,
  "subscriptionPlan": "MEDIUM",
  "recommendations": [
    {
      "id": "1",
      "title": "S&P 500 Index Fund",
      "description": "Diversified exposure to 500 leading US companies",
      "expectedReturn": "8-10%",
      "riskLevel": "MEDIUM",
      "category": "ETF",
      "reasoning": "Long-term stable growth with broad market exposure"
    }
  ],
  "generatedAt": "2025-10-08T10:00:00Z",
  "validUntil": "2025-10-09T10:00:00Z"
}
```

#### Nombre de recommandations par plan
- **BASIC**: 2 recommandations
- **MEDIUM**: 3 recommandations
- **PREMIUM**: 5 recommandations

#### Utilisation depuis le frontend
```javascript
import { getAIRecommendations } from './services/aiService';

const recommendations = await getAIRecommendations('MEDIUM', {
  riskTolerance: 'MEDIUM',
  investmentGoals: 'growth',
  currentBalance: 10000
});
```

### 3. Edge Function: Technical Assistant

**Endpoint**: `/functions/v1/technical-assistant`

**Description**: Chatbot intelligent pour le support technique de la plateforme Caipytal.

#### Requête
```javascript
POST /functions/v1/technical-assistant
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "message": "Comment effectuer un virement bancaire ?",
  "conversationHistory": [
    {
      "role": "user",
      "content": "Bonjour"
    },
    {
      "role": "assistant",
      "content": "Bonjour ! Comment puis-je vous aider ?"
    }
  ]
}
```

#### Réponse
```json
{
  "success": true,
  "response": "Pour effectuer un virement bancaire sur Caipytal, suivez ces étapes : 1. Cliquez sur...",
  "timestamp": "2025-10-08T10:00:00Z"
}
```

#### Contexte du chatbot
L'assistant possède une connaissance complète de :
- Fonctionnalités de la plateforme
- Plans d'abonnement (BASIC, MEDIUM, PREMIUM)
- Processus de virement bancaire
- Gestion de portefeuille
- Recommandations IA
- Sécurité et conformité

#### Utilisation depuis le frontend
```javascript
import { sendTechnicalAssistantMessage } from './services/aiService';

const response = await sendTechnicalAssistantMessage(
  "Comment personnaliser mes recommandations ?",
  conversationHistory
);
```

## Configuration Frontend

### 1. Client Supabase

**Fichier**: `src/lib/supabase.js`

```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### 2. Hook d'authentification

**Fichier**: `src/hooks/useAuth.js`

```javascript
import { useAuth } from './hooks/useAuth';

function MyComponent() {
  const { user, loading, signIn, signOut } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {user ? (
        <button onClick={signOut}>Déconnexion</button>
      ) : (
        <button onClick={() => signIn(email, password)}>Connexion</button>
      )}
    </div>
  );
}
```

### 3. Services IA

**Fichier**: `src/services/aiService.js`

Deux fonctions principales :
- `getAIRecommendations(plan, profile)` - Obtenir des recommandations
- `sendTechnicalAssistantMessage(message, history)` - Chat support

## Variables d'environnement

### Frontend (.env)
```env
VITE_SUPABASE_URL=https://piutscpovxcersjjwoqb.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_OPENAI_API_KEY=sk-...
```

### Edge Functions (auto-configurées)
Les Edge Functions ont automatiquement accès à :
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY` (à configurer via variables d'environnement Supabase)

## Sécurité

### JWT Authentication
- Tous les endpoints sont protégés par JWT
- Token valide 7 jours par défaut
- Refresh automatique avec Supabase Auth

### CORS
Tous les Edge Functions incluent les headers CORS :
```javascript
{
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey"
}
```

### Rate Limiting
Géré automatiquement par Supabase Edge Functions

## Gestion des erreurs

### Format standard
```json
{
  "error": "Description de l'erreur",
  "message": "Détails supplémentaires"
}
```

### Codes HTTP
- `200` - Succès
- `400` - Requête invalide
- `401` - Non authentifié
- `500` - Erreur serveur

## Déploiement

### Edge Functions
Les fonctions sont déjà déployées sur Supabase :
- `ai-recommendations`
- `technical-assistant`

### Mise à jour d'une fonction
```bash
# Via l'interface Supabase Dashboard
# Ou en utilisant les outils MCP fournis
```

## Tests

### Test des recommandations IA
```javascript
// Test avec différents plans
const basicRecs = await getAIRecommendations('BASIC');
console.log(basicRecs.recommendations.length); // 2

const premiumRecs = await getAIRecommendations('PREMIUM');
console.log(premiumRecs.recommendations.length); // 5
```

### Test du chatbot
```javascript
const response = await sendTechnicalAssistantMessage(
  "Comment fonctionne le portefeuille ?"
);
console.log(response.response);
```

## Routes Frontend

### Publiques
- `/` - Page d'accueil
- `/login` - Connexion
- `/signup` - Inscription

### Protégées (authentification requise)
- `/dashboard` - Tableau de bord principal
- `/portfolio-management` - Gestion du portefeuille
- `/ai-recommendations-chat` - Chat recommandations IA
- `/technical-assistant-chat` - Assistant technique
- `/wire-transfer-modal` - Virements bancaires

## Prochaines étapes

### Base de données (à implémenter)
Lorsque vous activerez la persistance des données, créez :

1. **Table users** (extension de auth.users)
```sql
- id (uuid)
- subscription_plan (enum: BASIC, MEDIUM, PREMIUM)
- created_at
- updated_at
```

2. **Table portfolios**
```sql
- id (uuid)
- user_id (uuid FK)
- balance (numeric)
- total_invested (numeric)
- total_returns (numeric)
- return_percentage (numeric)
```

3. **Table transactions**
```sql
- id (uuid)
- user_id (uuid FK)
- type (enum: DEPOSIT, WITHDRAWAL, RETURN)
- amount (numeric)
- status (enum: PENDING, COMPLETED, FAILED)
- created_at
```

4. **Table ai_recommendations** (cache 24h)
```sql
- id (uuid)
- user_id (uuid FK)
- recommendations (jsonb)
- created_at
- expires_at
```

## Support

Pour toute question technique :
- Consultez la documentation Supabase : https://supabase.com/docs
- Documentation OpenAI : https://platform.openai.com/docs

## Commandes utiles

```bash
# Démarrer le serveur de développement
npm start

# Build de production
npm run build

# Prévisualiser le build
npm run serve
```

---

**Version**: 1.0.0
**Dernière mise à jour**: 2025-10-08
