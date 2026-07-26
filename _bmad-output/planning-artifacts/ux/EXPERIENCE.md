---
name: formation-mandarin-experience-spec
version: 1.0.0
status: final
updated: 2026-07-26
---

# User Experience & Information Architecture Specification

## Foundation

- **Platform / Form-Factor**: Responsive Web Application (Desktop & Mobile optimized for Algerian mobile users).
- **Core Goal**: Provide an ultra-fast, engaging funnel for students and professionals in Algeria to learn Mandarin quickly, view training programs (HSK & Business), and book private coaching sessions directly.
- **Design Tokens Reference**: Refer to `DESIGN.md` for colors (`{colors.primary}`, `{colors.secondary}`, etc.), typography, and spacing tokens.

---

## Information Architecture (IA)

### Navigation Bar
- **Logo**: *Le Chinois Vite et Bien DZ* (Icon with Chinese character & Algerian flag sub-accent)
- **Nav Links**:
  - Accueil (Home)
  - Formations (Courses: HSK 1-4, Business Mandarin)
  - Méthode (Methodology)
  - Avis & Résultats (Social Proof)
  - Réservation (Booking Widget)
- **Primary CTA Button**: "Réserver mon Coaching" (`{colors.primary}`)

### Page Surfaces & Layout Structure

1. **Hero Banner Section**
   - Headline: *"Apprenez le Mandarin Vite et Bien en Algérie 🇩🇿🇨🇳"*
   - Subtitle: *"Méthode accélérée pour étudiants, commerçants et professionnels. Maîtrisez les bases et le vocabulaire des affaires sans vous perdre."*
   - CTAs: "Réserver une session de coaching" (`{colors.secondary}`) + "Voir nos formations" (`{colors.primary}`)
   - Value Badges: "100% Pratique", "Professeur Bilingue DZ/Chinois", "Accompagnement HSK"

- **Currency & Pricing Rule**: All prices must be explicitly displayed in **DA (Dinar Algérien)** (e.g. `DA` or `DZD`), with clear local payment indications (BaridiMob / CCP / Espèces).

2. **Program Catalog Section (Formations)**
   - **Card 1: Débutant Express (HSK 1 - HSK 2)**: Prononciation Pinyin, conversations quotidiennes, bases essentielles. *Prix : 6 500 DA / niveau*.
   - **Card 2: Mandarin Business & Import/Export**: Vocabulaire commercial, négociation avec les fournisseurs chinois, démarches et voyages d'affaires. *Prix : 12 000 DA / session intensive*.
   - **Card 3: Préparation HSK 3 & 4**: Caractères avancés, grammaire structurée, simulation d'examens officiels. *Prix : 9 500 DA / niveau*.
   - **Card 4: Coaching VIP 1-on-1**: Programme personnalisé sur-mesure avec suivi quotidien WhatsApp/Zoom. *Prix : 2 500 DA / séance*.

3. **Interactive Booking Module (Module de Réservation)**
   - Step 1: Choix de la formule avec tarifs affichés en DA :
     - Session Découverte (30 min) : *Gratuite / Offerte*
     - Coaching Individuel (1h) : *2 500 DA*
     - Pack Formation Complète (Mensuel) : *8 000 DA*
   - Step 2: Sélection de la date et créneau horaire (Affichage temps réel des places disponibles en vert `{colors.accent_green}`).
   - Step 3: Formulaire rapide (Nom, Téléphone / WhatsApp, Email, Objectif principal).
   - Step 4: Redirection automatique et bouton direct *"Contactez le coach sur WhatsApp pour finaliser le paiement"* (Message pré-rempli avec les détails de la réservation).

- **Paiement & Inscription** : Le paiement s'effectue directement en contactant le coach (via WhatsApp / Téléphone après envoi de la réservation).

4. **Méthode & Avantages (Why Us)**
   - Approche directe et simplifiée sans théorie inutile.
   - Explications adaptées en Français/Darja pour une assimilation ultra-rapide.
   - Exercices pratiques et fiches de révision téléchargeables.

5. **Avis & Témoignages (Social Proof / Instagram Feed)**
   - Grille de témoignages clients avec statistiques de réussite.
   - Intégration de badges de confiance Instagram (`@le_chinois_vite_et_bien_dz`).

6. **Footer Section**
   - Liens rapides, coordonnées WhatsApp / Instagram, Copyright.

---

## Voice and Tone

- **Tone**: Encadant, motivant, professionnel et très accessible.
- **Language**: Français adapté avec termes clairs en mandarin (Sinogrammes + Pinyin).
- **Microcopy Examples**:
  - Button CTA: *"Je réserve mon cours d'essai"*
  - Badge: *"Places limitées pour la session de ce mois"*
  - Success message: *"Votre réservation a été enregistrée ! Le coach vous contactera sous 24h sur WhatsApp."*

---

## Component & State Patterns

### Form & Input States
- **Default Input**: Surface `{colors.surface}`, border `{colors.surface_border}`, text `{colors.text_primary}`.
- **Focus State**: Border `{colors.secondary}` with subtle glow.
- **Validation State**: Green indicator `{colors.accent_green}` when phone/email is valid.

### Booking Calendar States
- **Available Slot**: Background `#06D6A015`, border `#06D6A0`, clickable button.
- **Selected Slot**: Background `#FFB703`, text `#0B0F19`, font-weight `bold`.
- **Booked / Unavailable Slot**: Opacity `0.4`, line-through, disabled pointer.

---

## Accessibility Floor

- High contrast text (`#F8FAFC`) on dark slate surfaces (`#0B0F19` & `#161F33`), compliant with WCAG AAA standards.
- Clear visual focus rings on keyboard navigation (`outline: 2px solid #FFB703`).
- Descriptive `aria-label` attributes on all booking controls and buttons.

---

## Key User Journey: Booking a Private Coaching Session

1. **Discovery Beat**: User lands on Hero section, sees high-impact headline "Apprenez le Mandarin Vite et Bien" and clicks "Réserver mon Coaching".
2. **Surface Navigation**: Page smooth-scrolls directly to the **Interactive Booking Module**.
3. **Selection Beat**: User selects "Session Découverte Coaching 1-on-1", picks an available slot on the calendar (highlighted in Jade Green).
4. **Form Completion**: User enters Name, Phone (WhatsApp), and selects objective ("Importation / Business").
5. **Climax & Confirmation**: User clicks "Valider ma réservation". A confirmation modal appears with a direct button *"Discuter avec le coach sur WhatsApp pour valider le paiement"*, opening WhatsApp with a pre-filled message summarizing their reservation request.
