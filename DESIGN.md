---
# gstack: design-md-format=spec
name: Studio Architektury Wnętrz i Realizacji „Pod Klucz”
description: Monografia Warsztatowa & Rysunek Wykonawczy — dyscyplina drukowanego albumu architektonicznego połączona z inżynieryjną precyzją kosztorysu wykonawczego.
colors:
  primary: "#C83E2B"
  primary-hover: "#A83121"
  on-primary: "#FFFFFF"
  background: "#ECEAE4"
  surface: "#F7F6F2"
  surface-secondary: "#DFDDD6"
  surface-inverted: "#161715"
  surface-inverted-elevated: "#21231F"
  surface-receipt: "#10110F"
  text: "#141513"
  text-muted: "#575853"
  text-on-dark: "#F4F3EF"
  text-on-dark-muted: "#A2A39D"
  accent: "#C83E2B"
  accent-secondary: "#3E4A42"
  border-hairline: "#CFCBC2"
  border-dark: "#2C2E2A"
  success: "#1E6B4B"
  warning: "#B86B11"
  error: "#B91C1C"
typography:
  display:
    fontFamily: "Schibsted Grotesk"
    fontWeight: 600
    fontSize: "clamp(2.2rem, 3.8vw, 3.5rem)"
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  body:
    fontFamily: "DM Sans"
    fontSize: "1rem"
    lineHeight: 1.6
  label:
    fontFamily: "IBM Plex Mono"
    fontSize: "0.75rem"
    letterSpacing: "0.04em"
  mono:
    fontFamily: "IBM Plex Mono"
    fontFeature: "tnum"
rounded:
  sm: "2px"
  md: "4px"
  lg: "6px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  joint: "10px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "72px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-secondary:
    backgroundColor: "{colors.surface-secondary}"
    textColor: "{colors.text}"
    borderColor: "{colors.border-hairline}"
    rounded: "{rounded.sm}"
  input:
    borderColor: "{colors.border-hairline}"
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.sm}"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.sm}"
  calculator-slab:
    backgroundColor: "{colors.surface-inverted}"
    textColor: "{colors.text-on-dark}"
    rounded: "{rounded.sm}"
  nav-link:
    textColor: "{colors.text}"
---

# Studio Architektury Wnętrz i Realizacji „Pod Klucz” — Design System

## Overview

**Creative North Star:** „Wygląda jak magazyn architektoniczny za 50 tys. zł, a jednocześnie w 15 sekund pozwala wyliczyć budżet i zobaczyć surowy stan przed/po” — połączenie prestiżu wydawniczego (*El Croquis*, *DETAIL*) z twardą użytecznością narzędziową.
**Product context:** Flagowy projekt pokazowy do portfolio freelancera (Next.js + TypeScript + Tailwind CSS + `shadcn/ui` + `NumberFlow` + `Sonner` + `Vaul`), zaprojektowany tak, by konwertować 5–6 z każdych 10 zleceń na Useme / Oferii (strony B2B, budownictwo/nieruchomości, agencje design/beauty, landingi z kalkulatorem wyceny).
**Mode per surface:**
- **Persuade (Hero, Oferta, Realizacje, Zespół, Proces):** Układ redakcyjny oparty na stykających się blokach materiałowych (*Tonal Slab Joinery*) i dużych fotografiach wnętrz.
- **Operate (Kalkulator Wstępnej Wyceny, Suwak „Przed i Po”, Formularz z załącznikiem):** Precyzyjne instrumenty pomiarowe i kosztorysowe osadzone na ciemnej płycie bazaltowej (`#161715`).
**Key characteristics:**
- Chłodna, kamienna baza kolorystyczna (`#ECEAE4` / `#F7F6F2`) bez żółto-kremowych klisz szablonowych.
- Architektoniczna fuga (`10px` odsłoniętego tła bazowego) dzieląca moduły zamiast cienkich ramek i cieni.
- Nordycki, techniczny grotesk `Schibsted Grotesk` w nagłówkach, przełamujący oklepane szeryfy.
- Cynober inżynieryjny (`#C83E2B`) używany z chirurgiczną precyzją jako wiązka lasera pomiarowego w suwaku „Przed i Po”, wskaźnik suwaka metrażu oraz główne CTA.

## Colors

**Strategy:** Restrained + Kontrastowa Strefa Narzędziowa — neutralne, mineralne płaszczyzny oddają pole fotografii wnętrz, podczas gdy kalkulator kosztorysowy i moduł porównawczy „Przed/Po” wykorzystują głęboki, wędzony bazalt (`#161715`) dla natychmiastowego wyróżnienia najważniejszych funkcji interaktywnych.
**Light or dark:** Domyślnie jasny, kamienny interfejs dzienny z trwale ciemną strefą narzędziową (`#161715`) oraz opcjonalnym trybem ciemnym dla całej strony.
- `#ECEAE4` (**Chłodny Wapień**) służy jako tło dokumentu i tworzy widoczne spoiny między kartami `#F7F6F2` (**Arkusz Alabastrowy**).
- `#141513` (**Grafit Żeliwny**) zapewnia kontrast ponad 15:1 (WCAG AAA) na jasnych powierzchniach, a `#575853` (**Kamienny Łupek**) spełnia rygorystyczne WCAG AA dla tekstów pomocniczych.
- `#C83E2B` (**Cynober Inżynieryjny**) sygnalizuje wyłącznie punkty aktywnej interakcji (główne CTA, uchwyt suwaka Przed/Po, aktywny suwak metrażu i podkreślenie sumy kosztorysu).

## Typography

Wszystkie fonty pochodzą z Google Fonts (licencja SIL Open Font License 1.1) i posiadają pełne wsparcie polskich znaków diakrytycznych (`latin-ext`: ą, ć, ę, ł, ń, ó, ś, ź, ż).
- **Display (`Schibsted Grotesk`, wagi 600–700):** Używany wyłącznie w odmianie prostej (bez kursyw na pojedynczych słowach), z ciasnym trackingiem (`-0.03em`) i zwartą interlinią (`1.04`–`1.08`).
- **Body & UI (`DM Sans`, wagi 400–600):** Czysty, humanistyczno-geometryczny bezszeryf do dłuższych opisów oferty, biogramów zespołu i etykiet pól formularza.
- **Mono & Data (`IBM Plex Mono`, wagi 400–600, `font-variant-numeric: tabular-nums`):** Obowiązkowy dla wszystkich kwot (w tym animowanego komponentu `NumberFlow`), metraży (`m²`), czasu realizacji (tygodnie), rzędnych technicznych i tabeli kosztorysowej. Stała szerokość znaków zapobiega drganiu układu podczas zmiany wartości na suwaku.

## Layout

- **Max-width:** `1320px` z responsywnym paddingiem bocznym (`16px` mobile, `24px` tablet, `40px` desktop).
- **Tonal Slab Joinery:** Sekcje i karty w obrębie modułu rozdziela stała szczelina `10px` (`gap: 10px`) na tle `#ECEAE4` zamiast mnożenia obrysów `1px` i cieni `box-shadow`.
- **Asymetryczny Hero (proporcja `1.12fr : 0.88fr` na desktopie):** Lewa kolumna prezentuje propozycję wartości, gwarancje kontraktowe i CTA; prawa kolumna od pierwszej sekundy udostępnia interaktywny przekrój „Przed i Po” z adnotacjami wykonawczymi.

## Elevation & Depth

- Płaszczyzny rozróżniane są skokiem tonalnym (`#ECEAE4` → `#F7F6F2` → `#DFDDD6` → `#161715`), a nie rozmytymi cieniami.
- Jedynym elementem z wyraźnym cieniem (`0 4px 14px rgba(0,0,0,0.45)`) jest fizyczny uchwyt suwaka „Przed i Po”, co podkreśla jego chwytność.
- Całkowity zakaz świecących poświat (`glow`), gradientowych teł i rozmytego szkła (`backdrop-filter`) jako domyślnego kontenera.

## Shapes

- **Mikro-faza architektoniczna:** Wszystkie kontenery, karty, przyciski i pola formularzy używają promienia `2px` (`rounded.sm`) lub maksymalnie `4px` (`rounded.md`) — jak fazowana krawędź spieku kwarcowego lub forniru.
- **Zakaz pigułek (`9999px`)** na przyciskach, odznakach i filtrach kategorii.

## Components

- **Suwak „Przed i Po” (X-Ray Construction Cut):** Pionowa linia podziału `2px` w kolorze `#C83E2B`, uchwyt `◄ PRZECIĄGNIJ ►` w `IBM Plex Mono`, oraz techniczne boksy opisowe po stronie stanu deweloperskiego (instalacje podtynkowe, akustyka) i po stronie gotowego wnętrza (materiały wykończeniowe, oświetlenie).
- **Kalkulator Wyceny (Bill of Quantities Slab):** Osadzony na ciemnym bazalcie (`#161715`). Lewa kolumna zawiera suwak powierzchni (`m²`), 3 kafelki standardu wykończenia oraz listę dodatków; prawa kolumna renderuje żywy „Arkusz Kosztorysowy Wstępny” z rozbiciem na pozycje, sumą animowaną przez `NumberFlow` i przyciskiem przekazującym wybrany zestaw parametrów wprost do formularza kontaktowego.
- **Szuflada mobilna (`Vaul`):** Na ekranach mobilnych zastępuje przeładowane modale — służy do płynnego podglądu szczegółów kosztorysu oraz nawigacji.
- **Powiadomienia (`Sonner`):** Utrzymane w ciemnym bazalcie (`#161715`) z akcentem `#1E6B4B` (sukces) lub `#C83E2B`, z promieniem `2px`.

## Do's and Don'ts

- **Do:** Używaj `font-variant-numeric: tabular-nums` i `IBM Plex Mono` na każdej cenie, metrażu i procencie.
- **Do:** Projektuj puste stany, stany ładowania i komunikaty błędów walidacji formularza (np. za duży plik rzutu, nieobsługiwany format) z taką samą precyzją jak ścieżkę główną.
- **Do:** Zachowuj kontrast minimum WCAG AA (4.5:1) dla wszystkich etykiet technicznych i WCAG AAA dla głównych tekstów.
- **Don't:** Nie używaj oklepanego układu „3 identyczne karty z ikonką w kolorowym kółku”.
- **Don't:** Nie wstawiaj pojedynczych słów pisanych kursywą w nagłówkach ani pigułkowych „kickerów” nad każdym tytułem sekcji.
- **Don't:** Nie używaj gradientowych przycisków ani fioletowo-niebieskich akcentów kojarzonych z generatorami AI.

## Motion

- **Approach:** Intentional — zdyscyplinowany, fizyczny ruch bez sprężynowego odbijania (`overshoot`).
- **Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` dla przejść układu, `ease-out` dla mikro-interakcji.
- **Duration:** micro (`100–150ms` hover/focus), short (`200–250ms` filtry realizacji i szuflada `Vaul`), medium (`350–450ms` przeliczanie `NumberFlow`).
- **The one authored moment:** Płynne przeliczanie arkusza kosztorysowego (`NumberFlow`) połączone z jednoczesnym przesunięciem suwaka metrażu oraz natychmiastowym przeniesieniem wybranej konfiguracji do formularza kontaktowego.

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-11-17 | Wybór kierunku „Monografia Warsztatowa & Rysunek Wykonawczy” | Połączenie prestiżu drukowanego albumu architektonicznego z twardą użytecznością narzędziową pod zlecenia z Useme/Oferii. |
| 2026-11-17 | Zatwierdzenie `Schibsted Grotesk` + palety `Kamień + Cynober (#C83E2B)` | Wybór użytkownika po przetestowaniu interaktywnego podglądu `design-consultation-preview.html`. |
