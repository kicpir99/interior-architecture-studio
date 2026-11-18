# KRAWCZYK & PARTNERZY — Interior Architecture & Turnkey Execution Portfolio

Full-stack static-first portfolio application for an interior architecture and turnkey fit-out studio, built with **Next.js 16 (App Router + Turbopack)**, **React 19**, **TypeScript**, and **Tailwind CSS 4** with zero paid external runtime dependencies.

## Key Engineering Highlights

- **9-Stage Isometric 3D Configurator (`src/components/axonometric-preview.tsx`)**
  - Progressive room/wing attachment (`apt-s1..s3`, `house-s1..s3`, `office-s1..s3`) across `25–250 m²` using CSS `clip-path` wing docking along `±30°` isometric axes, section-plane wipes, and bidirectional CAD laser seam indicators.
  - Pixel-locked `<svg viewBox="0 0 1200 896">` engineering layers synchronized with calculator options: secondary-market demolition hatching & wet-zone grids, smoked-oak joinery panels, concealed FCU/VRF HVAC ductwork & linear diffusers, and DALI 2700K magnetic tracks with volumetric light cones.

- **Reactive Cost & Critical-Path Schedule Engine (`src/lib/calculator.ts`, `src/lib/schedule.ts`)**
  - Deterministic Bill of Quantities (BOQ) calculation with `NumberFlow` animated totals in `PLN` and `EUR`.
  - Live critical-path Gantt simulator (`src/components/investment-timeline.tsx`) with conditional parallel off-site carpentry tracks, phase deliverable inspection, and 100%-reconciled milestone payment tranches.
  - Clean `@media print` stylesheet turning the calculator, 3D preview, BOQ receipt, and Gantt timeline into a printable A4 PDF summary (`window.print()`).

- **Interactive Before/After Comparator & SSG Case Studies**
  - Pointer-capture `BeforeAfterSlider` (`src/components/before-after-slider.tsx`) comparing raw developer/secondary shells against finished turnkey interiors.
  - 6 statically generated `/realizacje/[slug]` case study pages (`generateStaticParams`), `PL | EN` bilingual switcher, and light/dark theme support.

## Scripts

```bash
npm run dev    # Start Next.js 16 development server (Turbopack)
npm run build  # Production build with static generation
npm test       # Run Vitest unit tests (calculator, schedule, validation)
npm run lint   # Run ESLint across the repository
```
