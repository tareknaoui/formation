# Design System

<!-- impeccable:design-schema 1 -->

## Direction
Luminous dark-mode glassmorphic brand showcase for "Le Chinois Vite & Bien" (Formation Mandarin DZ 🇩🇿), engineered for high conversion, educational transparency, and seamless WhatsApp enrollment.

## Color Palette
- Ground: Deep Midnight Navy (`#0B0F19` & `#0F172A`)
- Primary Brand Accent: Crimson Mandarin Red (`#EF4444` & `#DC2626`)
- Trust & Success Accent: Emerald Green (`#10B981` & `#059669`)
- Highlight / Hanzi Accent: Warm Amber Gold (`#F59E0B`)
- Glassmorphic Card Ground: `rgba(15, 23, 42, 0.7)` with `backdrop-filter: blur(16px)`
- Borders: Subtle Slate borders (`rgba(255, 255, 255, 0.08)`) with glowing red hover highlights (`rgba(239, 68, 68, 0.3)`)

## Typography & Characters
- Display Headings: System sans-serif with extra bold weight (`font-black text-white tracking-tight`).
- Hanzi Display (Sinogrammes): Serif typeface with warm amber contrast (`text-amber-400 font-serif text-5xl`).
- Pinyin Labels: Monospace formatting (`font-mono text-slate-400 text-xs`).

## Component Specifications
1. **Navbar (`Navbar.tsx`)**: Sticky glassmorphic bar (`bg-[#0B0F19]/85 backdrop-blur-xl border-slate-800`), brand badge in gradient red with Chinese Hanzi logo, mobile drawer.
2. **Hero Section (`HeroSection.tsx`)**: Dual animated ambient glow radial orbs, pill status badge, video demo modal trigger, 4 500 DA pricing pill, dual CTAs ("S'inscrire à 4 500 DA" & "Voir la vidéo démo").
3. **Video Preview Modal (`VideoModal.tsx`)**: Modal overlay with simulated 1080p sample lesson preview, audio indicators, and deliverable highlights.
4. **HSK Syllabus Section (`SyllabusSection.tsx`)**: Interactive tabs for HSK 1 (Fondations), HSK 2 (Commerce & Voyage), and HSK 3 (Fluidité Professionnelle), listing modules, video counts, Hanzi writing sheets, and grammar rules.
5. **Coach Credentials (`CoachSection.tsx`)**: Teacher introduction for Coach Reda (@le_chinois_vite_et_bien_dz), credentials badge, and 1-on-1 WhatsApp inquiry button.
6. **4 Pillars of Méthode Solo (`MethodSection.tsx`)**: Glassmorphic cards highlighting practical learning, French/Darija explanations, negotiation module, and direct WhatsApp support.
7. **Enrollment & Payment Section (`EnrollmentSection.tsx`)**: High-converting registration card with pre-formatted WhatsApp order trigger, 1-click BaridiMob RIP copy button, and CCP account instructions.
8. **Footer (`Footer.tsx`)**: Dark footer with navigation, program details, WhatsApp contact, Instagram handle, and copyright.
