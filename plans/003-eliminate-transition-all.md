# 003 — Eliminate transition: all and hardware-accelerate UI transitions

- **Status**: TODO
- **Commit**: 2bdb204
- **Severity**: HIGH
- **Category**: Performance
- **Estimated scope**: 2 files (`src/app/globals.css`, `src/components/Navbar.tsx`)

## Problem

In `src/app/globals.css` and `src/components/Navbar.tsx`, interactive card, button, and header classes rely on `transition: all` or generic `transition: all 0.2s ease`:

```css
/* src/app/globals.css:68 — current */
.card-light {
  background: var(--surface-light);
  border: 1px solid var(--surface-border);
  box-shadow: var(--shadow-card);
  border-radius: 1.25rem;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

/* src/app/globals.css:90 — current */
.btn-primary {
  background-color: var(--brand-red);
  color: #FFFFFF;
  font-weight: 700;
  border-radius: 9999px;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-red-pill);
}

/* src/app/globals.css:105 — current */
.btn-gold {
  background-color: var(--brand-gold);
  color: var(--brand-navy);
  font-weight: 700;
  border-radius: 9999px;
  transition: all 0.2s ease;
  box-shadow: 0 4px 14px rgba(255, 183, 3, 0.35);
}

/* src/app/globals.css:121 — current */
.btn-secondary {
  background-color: var(--surface-light);
  color: var(--brand-navy);
  border: 1px solid var(--surface-border);
  font-weight: 600;
  border-radius: 9999px;
  transition: all 0.2s ease;
}
```

And in `src/components/Navbar.tsx:15`:
```tsx
// src/components/Navbar.tsx:15 — current
<header className="sticky top-0 z-50 glass-nav transition-all duration-300">
```

`transition: all` forces layout and style recalculations on un-accelerated CSS properties (`width`, `padding`, `margin`, etc.) during state changes.

## Target

Replace `transition: all` with targeted GPU-accelerated transition properties:

```css
/* target in src/app/globals.css */
.card-light {
  background: var(--surface-light);
  border: 1px solid var(--surface-border);
  box-shadow: var(--shadow-card);
  border-radius: 1.25rem;
  transition: transform var(--duration-normal) var(--ease-out),
              box-shadow var(--duration-normal) var(--ease-out),
              border-color var(--duration-normal) var(--ease-out);
}

.btn-primary {
  background-color: var(--brand-red);
  color: #FFFFFF;
  font-weight: 700;
  border-radius: 9999px;
  transition: transform var(--duration-fast) var(--ease-out),
              background-color var(--duration-fast) var(--ease-out),
              box-shadow var(--duration-fast) var(--ease-out);
  box-shadow: var(--shadow-red-pill);
}

.btn-gold {
  background-color: var(--brand-gold);
  color: var(--brand-navy);
  font-weight: 700;
  border-radius: 9999px;
  transition: transform var(--duration-fast) var(--ease-out),
              background-color var(--duration-fast) var(--ease-out),
              box-shadow var(--duration-fast) var(--ease-out);
  box-shadow: 0 4px 14px rgba(255, 183, 3, 0.35);
}

.btn-secondary {
  background-color: var(--surface-light);
  color: var(--brand-navy);
  border: 1px solid var(--surface-border);
  font-weight: 600;
  border-radius: 9999px;
  transition: transform var(--duration-fast) var(--ease-out),
              background-color var(--duration-fast) var(--ease-out),
              border-color var(--duration-fast) var(--ease-out),
              color var(--duration-fast) var(--ease-out);
}
```

In `src/components/Navbar.tsx:15`:
```tsx
<header className="sticky top-0 z-50 glass-nav transition-colors duration-300">
```

## Repo conventions to follow

- Utility button and card classes in `src/app/globals.css` explicitly list property transitions separated by commas.
- Component header in `src/components/Navbar.tsx` uses specific Tailwind transition utility (`transition-colors`).

## Steps

1. Open `src/app/globals.css`.
2. Update `.card-light`, `.btn-primary`, `.btn-gold`, `.btn-secondary` to replace `transition: all ...` with explicit property lists consuming `var(--ease-out)` and `var(--duration-*)`.
3. Open `src/components/Navbar.tsx`.
4. On line 15, replace `transition-all` with `transition-colors`.

## Boundaries

- Do NOT change button/card border radii, padding, or colors.
- Do NOT remove hover shadows or transform translates (`translateY(-1px)`).

## Verification

- **Mechanical**: Run `npm run build` to verify clean compilation.
- **Feel check**:
  - Hovering over buttons and cards provides immediate, crisp feedback without micro-stutters or main-thread frame drops.
  - In DevTools Performance panel, record hovering over 5 cards in rapid succession; confirm zero Layout / Recalculate Style thrashing during transitions.
- **Done when**: `transition: all` is completely eliminated from global card/button tokens and Navbar header.
