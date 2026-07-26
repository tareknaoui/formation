---
name: formation-mandarin-design-system
version: 1.0.0
status: final
updated: 2026-07-26
tokens:
  colors:
    primary: "#D62828"
    primary_hover: "#B71C1C"
    secondary: "#FFB703"
    secondary_hover: "#E0A100"
    background: "#0B0F19"
    surface: "#161F33"
    surface_border: "#2A364F"
    text_primary: "#F8FAFC"
    text_secondary: "#94A3B8"
    accent_green: "#06D6A0"
    error: "#EF4444"
  typography:
    font_family_base: "Inter, sans-serif"
    font_family_heading: "Outfit, sans-serif"
    font_family_chinese: "'Noto Sans SC', sans-serif"
  rounded:
    sm: "0.375rem"
    md: "0.75rem"
    lg: "1rem"
    full: "9999px"
  spacing:
    container_max_width: "1280px"
    section_padding_y: "4rem"
---

# Visual Identity Design System: Le Chinois Vite et Bien DZ

## Brand & Style

**Brand Personality**: Vibrant, energetic, direct, and empowering. Designed specifically for Algerian students, traders, and professionals who want fast, practical, and high-impact Mandarin mastery.

- **Visual Style**: Dark mode-first aesthetic with high-contrast Imperial Red and Gold accents inspired by Instagram coach branding (`@le_chinois_vite_et_bien_dz`).
- **Visual Weight**: Bold typography, glassmorphism card surfaces, vibrant badges, and crisp Chinese character typography.

## Colors

| Token Name | Hex Code | Purpose / Usage |
| :--- | :--- | :--- |
| `primary` | `#D62828` | Imperial Red - Primary brand color, Hero call-to-action buttons, key highlights. |
| `primary_hover` | `#B71C1C` | Darker red hover state for primary buttons. |
| `secondary` | `#FFB703` | Gold / Yellow - Badges, rating stars, secondary CTAs, pricing highlights. |
| `background` | `#0B0F19` | Deep Midnight Dark background for optimum readability and premium feel. |
| `surface` | `#161F33` | Dark slate surface for cards, modals, and input fields. |
| `surface_border` | `#2A364F` | Subtle borders for visual separation of cards and inputs. |
| `text_primary` | `#F8FAFC` | Bright off-white for main text and headings. |
| `text_secondary` | `#94A3B8` | Muted silver-gray for subtitles, body text, and secondary meta data. |
| `accent_green` | `#06D6A0` | Jade Green for success states, completed modules, and availability slots. |

## Typography

- **Headings (`Outfit`)**: Bold, modern sans-serif for high-impact titles and section headers.
- **Body (`Inter`)**: Clean, highly legible sans-serif for descriptions, forms, and UI controls.
- **Chinese Characters (`Noto Sans SC`)**: Clean, standardized Simplified Chinese rendering with adjusted line-height for Pinyin annotations.

## Layout & Spacing

- **Container**: Max width `1280px` centered with responsive inline padding (`1.5rem` mobile, `3rem` desktop).
- **Grid Layouts**: Flexible 1-column mobile layout scaling to 2-column or 3-column grids on desktop.

## Elevation & Depth

- **Cards**: Surface `#161F33` with subtle border `#2A364F` and hover box-shadow (`0 10px 25px -5px rgba(214, 40, 40, 0.15)`).
- **Modals & Overlays**: Backdrop blur with semi-transparent dark overlay (`rgba(11, 15, 25, 0.85)`).

## Components

### Buttons
- **Primary Button**: Background `#D62828`, Text `#F8FAFC`, font-weight `600`, border-radius `0.75rem`, subtle glow shadow on hover.
- **Secondary / Booking Button**: Background `#FFB703`, Text `#0B0F19`, font-weight `700`, border-radius `0.75rem`.

### Badges & Tags
- **Level Badge (HSK 1-4, Business)**: Pill shaped (`rounded-full`), background `#2A364F`, text `#FFB703` with gold border.

### Interactive Booking Widget
- Calendar picker card with available time slots in `#06D6A0` (Jade Green) and dark slate inputs.

## Do's and Don'ts

### Do
- Maintain high contrast between `#F8FAFC` text and `#0B0F19` / `#161F33` dark surfaces.
- Always display Pinyin annotations alongside Simplified Chinese characters for beginner levels.
- Use Gold (`#FFB703`) sparingly to draw eye focus to conversion points.

### Don't
- Do not use low-contrast muted colors for Chinese characters.
- Do not overload screens with plain white backgrounds; stick to the dark brand identity.
