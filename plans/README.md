# Animation & Motion Improvement Roadmap

This folder contains high-leverage, self-contained execution plans for upgrading the motion and animation craft of LevelUP Mandarin DZ, distilled from senior design engineering standards.

## Execution Matrix

| Plan | Title | Severity | Category | Status | Dependencies |
|---|---|---|---|---|---|
| [001-motion-tokens.md](001-motion-tokens.md) | Standardize design system motion tokens in CSS | MEDIUM | Cohesion & Tokens | DONE | None |
| [002-fix-keyframe-animations.md](002-fix-keyframe-animations.md) | Define missing keyframe animations & utility classes | HIGH | Performance / Keyframes | TODO | 001 |
| [003-eliminate-transition-all.md](003-eliminate-transition-all.md) | Eliminate `transition: all` and hardware-accelerate UI state changes | HIGH | Performance | TODO | 001 |

## Recommended Execution Order

1. **Plan 001 (`001-motion-tokens.md`)**: Foundation step. Defines `--ease-out`, `--ease-in-out`, `--duration-fast`, `--duration-normal`, `--duration-slow` tokens in `src/app/globals.css`.
2. **Plan 002 (`002-fix-keyframe-animations.md`)**: High leverage. Resolves missing keyframes (`animate-fade-in-up`, `animate-shimmer`, `animate-fadeIn`, `animate-blob`, etc.) referenced across components.
3. **Plan 003 (`003-eliminate-transition-all.md`)**: High leverage. Replaces un-accelerated `transition: all` rules on cards, buttons, and headers with GPU-accelerated property transitions.

## How to Execute

To execute any plan, invoke an agent or subagent with:
```bash
improve-animations execute plans/NNN-slug.md
```
Or execute the steps described in each plan sequentially.
