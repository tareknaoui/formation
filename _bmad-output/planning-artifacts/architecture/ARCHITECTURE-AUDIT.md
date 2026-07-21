# Rapport d'Audit Architectural BMad - Formation Mandarin

**Projet :** Formation Mandarin  
**Date :** 21 Juillet 2026  
**Statut :** Correctifs Critiques Appliqués & Vérifiés (0 Erreur TypeCheck)  
**Rapport HTML généré :** [architecture-audit-report.html](file:///c:/Users/naoui/Desktop/Projets/formation%20mandarin/_bmad-output/planning-artifacts/architecture/architecture-audit-report.html)

---

## 1. Correctifs Appliqués avec Succès (21 Juillet 2026)

- [x] **Optimisation du Callback JWT NextAuth dans [auth.ts](file:///c:/Users/naoui/Desktop/Projets/formation%20mandarin/src/lib/auth.ts#L54-L68) :**
  - **Changement :** Suppression des requêtes SQL systématiques `db.subscription.findFirst` et `db.user.findUnique` sur chaque requête HTTP.
  - **Résultat :** Élimination du goulot d'étranglement BDD et accélération massive du middleware et du rendu côté serveur.

- [x] **Sécurisation du Pool PostgreSQL dans [db.ts](file:///c:/Users/naoui/Desktop/Projets/formation%20mandarin/src/lib/db.ts#L15-L21) :**
  - **Changement :** Ajout de la configuration `max: process.env.NODE_ENV === "production" ? 10 : 5`, `idleTimeoutMillis: 30000`, et `connectionTimeoutMillis: 10000`.
  - **Résultat :** Protection contre la saturation du nombre de clients PostgreSQL en environnement serverless.

---

## 2. Recommandations Restantes (Évolution Futur)

1. **Intégration Stripe / Passerelle de Paiement dans [schema.prisma](file:///c:/Users/naoui/Desktop/Projets/formation%20mandarin/prisma/schema.prisma#L85-L94) :**
   - Ajouter `stripeCustomerId`, `stripeSubscriptionId`, `stripePriceId`, et `currentPeriodEnd` au modèle `Subscription`.
   - Mettre en place un webhook API pour mettre à jour la session JWT lors d'un abonnement actif.

2. **Stratégie Média / Streaming Vidéo (`videoUrl`) :**
   - Remplacer les URLs brutes par un identifiant de vidéo hébergée sur un service dédié (Cloudflare Stream, Bunny.net, Mux).

---
