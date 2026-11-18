# KRAWCZYK & PARTNERZY — Interior Architecture & Turnkey Execution Portfolio

Full-stack static-first portfolio application for an interior architecture and turnkey fit-out studio, built with **Next.js 16 (App Router + Turbopack)**, **React 19**, **TypeScript**, and **Tailwind CSS 4** with zero paid external runtime dependencies.

## Key Engineering Highlights (EN)

- **9-Stage Isometric 3D Configurator (`src/components/axonometric-preview.tsx`)**
  - Progressive room/wing attachment (`apt-s1..s3`, `house-s1..s3`, `office-s1..s3`) across `25–250 m²` using CSS `clip-path` wing docking along `±30°` isometric axes, section-plane wipes, and bidirectional CAD laser seam indicators.
  - Pixel-locked `<svg viewBox="0 0 1200 896">` engineering layers synchronized with calculator options: secondary-market demolition hatching & wet-zone grids, smoked-oak joinery panels, concealed FCU/VRF HVAC ductwork & linear diffusers, and DALI 2700K magnetic tracks with volumetric light cones.

- **Reactive Cost, Schedule & Tailored PDF Export (`src/lib/calculator.ts`, `src/lib/schedule.ts`, `src/components/estimate-print-sheet.tsx`)**
  - Deterministic Bill of Quantities (BOQ) calculation with `NumberFlow` animated totals in `PLN` and `EUR`.
  - Live critical-path Gantt simulator (`src/components/investment-timeline.tsx`) with conditional parallel off-site carpentry tracks, phase deliverable inspection, and 100%-reconciled milestone payment tranches.
  - Dedicated `@media print` A4 estimate sheet (`EstimatePrintSheet`) that strips interactive web controls and outputs a clean, client-ready bilingual (`PL / EN`) document with reference number, validity period, itemized BOQ, selected tier scope, schedule, tranches, and next steps.

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

---

# KRAWCZYK & PARTNERZY — Portfolio Pracowni Architektury Wnętrz i Realizacji Pod Klucz (PL)

Aplikacja portfolio dla pracowni architektury wnętrz i generalnego wykonawstwa pod klucz, zbudowana w **Next.js 16 (App Router + Turbopack)**, **React 19**, **TypeScript** oraz **Tailwind CSS 4** — bez zewnętrznych płatnych zależności uruchomieniowych.

## Główne rozwiązania inżynieryjne

- **9-etapowy konfigurator izometryczny 3D (`src/components/axonometric-preview.tsx`)**
  - Stopniowe dokowanie brył i skrzydeł (`apt-s1..s3`, `house-s1..s3`, `office-s1..s3`) w zakresie `25–250 m²` z wykorzystaniem `clip-path` w osiach izometrycznych `±30°`, przejść przekrojowych oraz dwukierunkowych wskaźników spoin CAD.
  - Warstwy inżynieryjne `<svg viewBox="0 0 1200 896">` zsynchronizowane z opcjami kalkulatora: szrafowanie wyburzeń i stref mokrych dla rynku wtórnego, zabudowy z forniru dębu wędzonego, kanałowa klimatyzacja FCU/VRF z nawiewnikami szczelinowymi oraz szynoprzewody DALI 2700K ze stożkami światła.

- **Reaktywny kalkulator kosztów, harmonogram i dedykowany wydruk PDF (`src/lib/calculator.ts`, `src/lib/schedule.ts`, `src/components/estimate-print-sheet.tsx`)**
  - Deterministyczne wyliczanie kosztorysu (BOQ) z animowanymi sumami `NumberFlow` w `PLN` i `EUR`.
  - Symulator ścieżki krytycznej Gantta (`src/components/investment-timeline.tsx`) z warunkowym torem równoległym stolarni, podglądem kamieni milowych i transzami płatności sumującymi się do 100%.
  - Dedykowany arkusz wydruku A4 (`EstimatePrintSheet`) pod `@media print`, który ukrywa kontrolki formularza i generuje zwarty, dwujęzyczny (`PL / EN`) dokument z numerem referencyjnym, terminem ważności, kosztorysem, zakresem pakietu, harmonogramem, transzami oraz kolejnymi krokami.

- **Porównywarka Przed/Po oraz statyczne Case Studies (SSG)**
  - Komponent `BeforeAfterSlider` (`src/components/before-after-slider.tsx`) oparty o `pointer-capture` do porównywania stanu surowego/wtórnego z gotową realizacją.
  - 6 statycznie generowanych podstron `/realizacje/[slug]` (`generateStaticParams`), pełny przełącznik językowy `PL | EN` oraz tryb jasny i ciemny.

## Skrypty

```bash
npm run dev    # Uruchomienie serwera deweloperskiego Next.js 16 (Turbopack)
npm run build  # Budowanie produkcyjne ze statycznym generowaniem stron
npm test       # Testy jednostkowe Vitest (kalkulator, harmonogram, walidacja)
npm run lint   # Analiza kodu za pomocą ESLint
```
