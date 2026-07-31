# 001 — Standardize design system motion tokens in CSS

- **Status**: DONE
- **Commit**: 2bdb204
- **Severity**: MEDIUM
- **Category**: Cohesion & tokens / Easing & duration
- **Estimated scope**: 1 file (`src/app/globals.css`)

## Problem

`src/app/globals.css:4-25` defines brand color tokens and shadows, but lacks centralized CSS timing and easing custom properties. Components and button utility classes currently rely on default browser `ease` or ad-hoc durations (`0.2s ease`, `0.25s cubic-bezier(...)`). UI entrances lack crisp cubic-bezier timing.

```css
/* src/app/globals.css:4-25 — current */
:root {
  --background: #F8FAFC;
  --foreground: #0A083B;

  /* LevelUP Brand Palette */
  --brand-red: #FA4949;
  --brand-red-hover: #D93838;
  --brand-navy: #0A083B;
  --brand-gold: #FFB703;
  --brand-gold-hover: #E5A400;
  --surface-light: #FFFFFF;
  --surface-subtle: #F1F5F9;
  --surface-border: #E2E8F0;
  --text-muted: #64748B;
  --accent-green: #059669;

  /* Elevated shadows */
  --shadow-sm: 0 1px 3px rgba(10, 8, 59, 0.05);
  --shadow-card: 0 6px 24px -4px rgba(10, 8, 59, 0.06), 0 2px 8px -2px rgba(10, 8, 59, 0.04);
  --shadow-card-hover: 0 16px 36px -6px rgba(250, 73, 73, 0.14), 0 6px 16px -2px rgba(10, 8, 59, 0.06);
  --shadow-red-pill: 0 6px 20px rgba(250, 73, 73, 0.28);
}
```

## Target

Add standardized motion tokens to `:root` in `src/app/globals.css`:

```css
/* target additions in :root inside src/app/globals.css */
  /* Motion & Easing Tokens */
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 400ms;
```

## Repo conventions to follow

- Color tokens and shadow tokens live directly in `:root` inside `src/app/globals.css`.
- New motion tokens must follow `--ease-*` and `--duration-*` naming conventions.

## Steps

1. Open `src/app/globals.css`.
2. Inside `:root` (around line 25), append the motion tokens listed in Target above.

## Boundaries

- Do NOT touch existing color or shadow token values in `:root`.
- Do NOT add external animation dependencies or Framer Motion libraries.

## Verification

- **Mechanical**: Run `npm run build` or `npx tsc --noEmit` to ensure CSS imports remain valid.
- **Feel check**: Inspect DevTools computed variables on `:root` to confirm `--ease-out` evaluates to `cubic-bezier(0.23, 1, 0.32, 1)`.
- **Done when**: Motion variables are declared in `:root` and accessible globally across all CSS stylesheets.
