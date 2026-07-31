# 002 — Define missing keyframe animations and utility classes

- **Status**: TODO
- **Commit**: 2bdb204
- **Severity**: HIGH
- **Category**: Performance & Interruptibility / Keyframes
- **Estimated scope**: 1 file (`src/app/globals.css`)

## Problem

Multiple keyframe animation classes (`animate-fade-in-up`, `animate-shimmer`, `animate-fadeIn`, `animate-blob`, `animate-float-slow`, `animate-glow-pulse`) are referenced in component render code but missing from `globals.css` or Tailwind theme definitions:

- `src/components/CourseCard.tsx:45`: `animate-fade-in-up`
- `src/components/CourseCard.tsx:111`: `animate-shimmer`
- `src/components/QuizComponent.tsx:124`: `animate-fadeIn`
- `src/components/CourseSidebar.tsx:61`: `animate-shimmer`
- `src/app/auth/signin/page.tsx:54,139,144,150`: `animate-fade-in-up`, `animate-blob`, `animate-float-slow`
- `src/app/auth/signup/page.tsx:64,69,74`: `animate-blob`, `animate-float-slow`, `animate-fade-in-up`
- `src/app/subscribe/page.tsx:68,75,94,147`: `animate-blob`, `animate-fade-in-up`, `animate-glow-pulse`

Because these keyframe rules are missing in CSS, elements fail to animate on mount and progress shimmers appear static.

```css
/* src/app/globals.css:43-61 — current */
/* ── Animations ─────────────────────────────────────────── */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-8px); }
}

@keyframes pulse-subtle {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.02); opacity: 0.95; }
}

.animate-float {
  animation: float 4s ease-in-out infinite;
}

.animate-pulse-subtle {
  animation: pulse-subtle 3s ease-in-out infinite;
}
```

## Target

Define explicit hardware-accelerated `@keyframes` and utility classes under `/* ── Animations ── */` in `src/app/globals.css`:

```css
/* target additions in src/app/globals.css */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@keyframes blob {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(20px, -30px) scale(1.08); }
  66% { transform: translate(-15px, 15px) scale(0.95); }
}

@keyframes floatSlow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

@keyframes glowPulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 0.9; transform: scale(1.02); }
}

.animate-fade-in-up {
  animation: fadeInUp var(--duration-slow) var(--ease-out) forwards;
}

.animate-fadeIn {
  animation: fadeIn var(--duration-normal) var(--ease-out) forwards;
}

.animate-shimmer {
  background: linear-gradient(90deg, #FA4949 0%, #FFB703 50%, #FA4949 100%);
  background-size: 200% 100%;
  animation: shimmer 2.5s infinite linear;
}

.animate-blob {
  animation: blob 10s infinite var(--ease-in-out);
}

.animate-float-slow {
  animation: floatSlow 6s ease-in-out infinite;
}

.animate-glow-pulse {
  animation: glowPulse 4s ease-in-out infinite;
}
```

## Repo conventions to follow

- Keyframe animations and `.animate-*` utility classes are defined under the `/* ── Animations ── */` section in `src/app/globals.css`.
- Utility classes consume motion tokens (`var(--ease-out)`, `var(--duration-slow)`, etc.).

## Steps

1. Open `src/app/globals.css`.
2. Locate line 43 (`/* ── Animations ── */`).
3. Add the `@keyframes` definitions (`fadeInUp`, `fadeIn`, `shimmer`, `blob`, `floatSlow`, `glowPulse`).
4. Add the corresponding `.animate-fade-in-up`, `.animate-fadeIn`, `.animate-shimmer`, `.animate-blob`, `.animate-float-slow`, and `.animate-glow-pulse` utility classes.

## Boundaries

- Do NOT alter JSX/TSX class names in component files.
- Do NOT animate non-GPU properties like `margin-top` or `top` in keyframes — use `transform: translateY(...)`.

## Verification

- **Mechanical**: Run `npm run dev` and open the home page, course page, sign-in, and quiz pages.
- **Feel check**:
  - `CourseCard` items stagger and smoothly slide up into place (`animate-fade-in-up`).
  - Progress bars display an active shimmering gradient (`animate-shimmer`).
  - Background decorative glow shapes float smoothly without frame drops (`animate-blob`, `animate-float-slow`).
- **Done when**: All components referencing `animate-fade-in-up`, `animate-shimmer`, `animate-fadeIn`, `animate-blob`, `animate-float-slow`, and `animate-glow-pulse` animate smoothly on page load.
