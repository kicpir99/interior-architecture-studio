# Studio Architektury Wnętrz i Realizacji „Pod Klucz” — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Zbudowanie dwujęzycznej (`PL | EN`) aplikacji portfolio pracowni **KRAWCZYK & PARTNERZY** w Next.js App Router, łączącej system designu z `DESIGN.md` z interaktywnym suwakiem „Przed i Po”, kalkulatorem kosztorysowym `NumberFlow`, szufladą `Vaul`, formularzem z walidacją załącznika i statycznymi podstronami `/realizacje/[slug]`.

**Architecture:** Hybrydowy App Router: strona główna `/` prezentuje pełny 7-sekcyjny układ redakcyjno-narzędziowy, podczas gdy `/realizacje/[slug]` (6 ścieżek generowanych przez `generateStaticParams`) i `/polityka-prywatnosci` działają jako statyczne podstrony SSG. Cała treść i słowniki `PL | EN` żyją w silnie otypowanych modułach `src/data/` (zero zewnętrznego CMS, koszt hostingu 0 zł).

**Tech Stack:** Next.js (App Router), React, TypeScript, Tailwind CSS, `@number-flow/react`, `vaul`, `sonner`, `lucide-react`, `vitest`.

**Spec:** [SPEC.md](../../../SPEC.md) oraz [DESIGN.md](../../../DESIGN.md)

## Global Constraints

- **Design Tokens (`DESIGN.md`):** Tło `#ECEAE4`, powierzchnia `#F7F6F2`, wtórna `#DFDDD6`, płyta narzędziowa `#161715`, akcent `#C83E2B`, tekst `#141513` / `#575853`. Fonty: `Schibsted Grotesk` (display, bez kursyw), `DM Sans` (body/UI), `IBM Plex Mono` (`tabular-nums` dla liczb i kwot). Promień narożników `2px–4px` (zakaz `9999px` na przyciskach/filtrach), fuga między blokami `10px`.
- **Budżet 0 zł:** Brak płatnych API, baz danych i zewnętrznych zależności wymagających kluczy produkcyjnych.
- **Zasada przeglądarki (User Global Rule):** Nie używać przeglądarki Chrome podczas generowania kodu ani weryfikacji błędów. Weryfikacja przez `vitest`, `tsc --noEmit`, `npm run lint`, `npm run build`.
- **Dwujęzyczność (`PL | EN`):** Domyślny język `pl`, przełączanie po stronie klienta (`localStorage: studio_lang`) obejmujące wszystkie sekcje, podstrony i walidację formularza.

## Review Focus

1. **Metraż spoza zakresu w URL (`/?area=999` lub `/?area=abc`):** `clampArea` musi bezpiecznie sprowadzić wartość do `[25, 250]` lub przy `NaN` wrócić do domyślnego `75 m²`.
2. **Pusty plik załącznika (`0 B`) lub graniczny (`10 MB + 1 B`):** `validateAttachment` musi odrzucić pusty plik `0 B` oraz plik przekraczający `10 * 1024 * 1024` bajtów, przepuszczając plik o dokładnym rozmiarze `10 * 1024 * 1024` bajtów.
3. **Obsługa klawiatury w suwaku „Przed i Po”:** Strzałki `ArrowLeft` / `ArrowRight` muszą przesuwać podział o krok (np. `5%`) w granicach `5%..95%` z poprawnymi atrybutami `role="slider"` i `aria-valuenow`.
4. **Brak skoku układu w `NumberFlow`:** Kontener kwoty w kalkulatorze musi wymuszać `IBM Plex Mono` z `font-variant-numeric: tabular-nums`.
5. **Nieznany slug w `/realizacje/[slug]`:** Wywołanie nieistniejącego sluga musi zwrócić `notFound()` (Next.js 404).

---

## File Structure

- `package.json`, `tsconfig.json`, `vitest.config.ts`, `next.config.ts` — konfiguracja Next.js, TypeScript, Tailwind CSS i Vitest.
- `src/app/globals.css`, `src/app/layout.tsx` — tokeny CSS z `DESIGN.md`, ładowanie fontów (`latin-ext`), `LanguageProvider`, `ThemeProvider`, `Toaster` (`Sonner`).
- `src/lib/calculator.ts` — logika kosztorysu BOQ i formatowania walut (`PLN` / `EUR`).
- `src/lib/validation.ts` — walidacja formularza kontaktowego oraz załącznika (`<= 10 MB`, `pdf/jpg/png/webp`).
- `src/context/language-context.tsx`, `src/context/theme-context.tsx` — stan języka (`PL | EN`) i motywu (`light | dark`).
- `src/data/translations.ts`, `src/data/projects.ts`, `src/data/team.ts` — pełne treści `PL` i `EN`, 6 realizacji, 3 przekroje „Przed i Po”, 4 osoby w zespole.
- `src/components/navbar.tsx`, `src/components/footer.tsx` — nawigacja z przełącznikami i szufladą mobilną `Vaul`, stopka.
- `src/components/before-after-slider.tsx` — interaktywny przekrój z wiązką lasera `#C83E2B`.
- `src/components/cost-calculator.tsx` — kalkulator BOQ na płycie `#161715` z `@number-flow/react`.
- `src/components/portfolio-section.tsx`, `src/components/hero-section.tsx`, `src/components/services-section.tsx`, `src/components/team-section.tsx`, `src/components/process-section.tsx`, `src/components/contact-form.tsx` — sekcje strony głównej.
- `src/app/page.tsx`, `src/app/realizacje/[slug]/page.tsx`, `src/app/polityka-prywatnosci/page.tsx` — strony App Router.

---

### Task 1: Inicjalizacja Next.js, Zależności i Tokeny `DESIGN.md`

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `vitest.config.ts`, `postcss.config.mjs`, `src/app/globals.css`, `src/app/layout.tsx`

**Interfaces:**
- Produces: Skonfigurowane środowisko Next.js App Router + Tailwind CSS + Vitest oraz zmienne CSS (`--bg-primary`, `--surface-primary`, `--surface-inverted`, `--accent-primary`, `--font-display`, `--font-body`, `--font-mono`).

- [ ] **Step 1: Zainicjuj projekt Next.js i zainstaluj pakiety**
  Uruchom `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes` (zachowując istniejące pliki `.md` i `.html`), a następnie doinstaluj:
  `npm install @number-flow/react vaul sonner lucide-react clsx tailwind-merge`
  `npm install -D vitest @vitejs/plugin-react`
- [ ] **Step 2: Skonfiguruj `vitest.config.ts` i `next.config.ts`**
  Dodaj `vitest.config.ts` z aliasem `@ -> ./src` oraz `next.config.ts` z `images: { unoptimized: true }`. Dodaj skrypt `"test": "vitest run"` w `package.json`.
- [ ] **Step 3: Zdefiniuj zmienne z `DESIGN.md` w `src/app/globals.css`**
  Ustaw paletę `Kamień + Cynober` dla trybu jasnego i `[data-theme="dark"]`, klasy pomocnicze `.tabular-nums`, mikro-fazę `2px` i style bazowe dla suwaka.
- [ ] **Step 4: Skonfiguruj fonty Google i providery w `src/app/layout.tsx`**
  Załaduj `Schibsted_Grotesk`, `DM_Sans`, `IBM_Plex_Mono` przez `next/font/google` (`subsets: ['latin', 'latin-ext']`), przypisz zmienne `--font-display`, `--font-body`, `--font-mono` do `<html>`, podepnij `Toaster` z `sonner`.
- [ ] **Step 5: Zweryfikuj konfigurację**
  Run: `npx tsc --noEmit && npm run lint`
  Expected: Exit code `0`, brak błędów TypeScript i ESLint.

---

### Task 2: Logika Kalkulatora Wyceny BOQ (TDD)

**Files:**
- Create: `src/lib/calculator.ts`
- Test: `src/lib/__tests__/calculator.test.ts`

**Interfaces:**
- Produces: `PropertyCondition`, `PackageTier`, `AddonId`, `CalculatorState`, `CalculatorBreakdown`, `clampArea(area: number): number`, `calculateEstimate(state: CalculatorState): CalculatorBreakdown`, `formatPLN(amount: number): string`, `formatEUR(amount: number): string`.

- [ ] **Step 1: Napisz testy jednostkowe w `src/lib/__tests__/calculator.test.ts`**
  Przetestuj:
  1. Domyślna konfiguracja (`75 m²`, `developer`, `turnkey_standard`, `['custom_carpentry']`) -> `base = 292500`, `carpentry = 38000`, `totalPLN = 330500`, `estimatedWeeks = 11`.
  2. Rynek wtórny (`secondary`) dolicza dokładnie `650 zł/m²`.
  3. Pakiet `design_only` (`2800 zł/m²`) i `turnkey_collector` (`5400 zł/m²`).
  4. Wszystkie dodatki (`custom_carpentry` + `ducted_ac` + `smart_dali` + `price_freeze` `+5%` zaokrąglane przez `Math.round`).
  5. `clampArea`: wartości `< 25` zwracają `25`, `> 250` zwracają `250`, `NaN` / `undefined` zwraca `75`.
  6. Przelicznik `totalEUR = Math.round(totalPLN / 4.3)`.
- [ ] **Step 2: Uruchom testy, aby potwierdzić że nie przechodzą**
  Run: `npx vitest run src/lib/__tests__/calculator.test.ts`
  Expected: FAIL (brak modułu `src/lib/calculator`).
- [ ] **Step 3: Zaimplementuj `src/lib/calculator.ts`**
  Zaimplementuj czyste funkcje `clampArea`, `calculateEstimate`, `formatPLN`, `formatEUR` dokładnie według wzorów ze `SPEC.md`.
- [ ] **Step 4: Uruchom testy i potwierdź przejście**
  Run: `npx vitest run src/lib/__tests__/calculator.test.ts`
  Expected: PASS (wszystkie 6+ testów zielone).

---

### Task 3: Walidacja Formularza Kontaktowego i Załącznika Rzutu (TDD)

**Files:**
- Create: `src/lib/validation.ts`
- Test: `src/lib/__tests__/validation.test.ts`

**Interfaces:**
- Produces: `MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024`, `ALLOWED_ATTACHMENT_TYPES`, `ContactFormInput`, `ValidationResult`, `validateAttachment(file: { name: string; size: number; type: string } | null): { valid: boolean; errorKey?: string }`, `validateContactForm(input: ContactFormInput): ValidationResult`.

- [ ] **Step 1: Napisz testy jednostkowe w `src/lib/__tests__/validation.test.ts`**
  Przetestuj:
  1. Poprawny formularz bez załącznika przechodzi walidację.
  2. Plik `.pdf` o rozmiarze dokładnie `10 * 1024 * 1024` bajtów przechodzi walidację.
  3. Plik o rozmiarze `10 * 1024 * 1024 + 1` bajtów jest odrzucany (`errorKey: 'file_too_large'`).
  4. Pusty plik (`size: 0`) jest odrzucany (`errorKey: 'file_empty'`).
  5. Niedozwolony typ MIME (np. `application/zip`, `application/x-msdownload`) jest odrzucany (`errorKey: 'file_invalid_type'`).
  6. Brak zgody RODO, niepoprawny e-mail lub za krótkie imię (`< 2` znaki) zwracają błędy odpowiednich pól; poprawny numer telefonu z myślnikami/spacjami przechodzi, a `123` (za krótki) jest odrzucany.
- [ ] **Step 2: Uruchom testy, aby potwierdzić że nie przechodzą**
  Run: `npx vitest run src/lib/__tests__/validation.test.ts`
  Expected: FAIL.
- [ ] **Step 3: Zaimplementuj `src/lib/validation.ts`**
  Napisz bezstanowe funkcje walidujące, zwracające klucze błędów gotowe do przetłumaczenia w słownikach `PL | EN`.
- [ ] **Step 4: Uruchom testy i potwierdź przejście**
  Run: `npx vitest run src/lib/__tests__/validation.test.ts`
  Expected: PASS (wszystkie testy zielone).

---

### Task 4: Warstwa Danych `PL | EN`, Konteksty i Lokalne Grafiki Architektoniczne

**Files:**
- Create: `src/context/language-context.tsx`, `src/context/theme-context.tsx`, `src/data/translations.ts`, `src/data/projects.ts`, `src/data/team.ts`, `public/images/projects/*`

**Interfaces:**
- Consumes: `PackageTier`, `AddonId`, `PropertyCondition` z `src/lib/calculator.ts`.
- Produces: `useLanguage()` (`lang: 'pl' | 'en'`, `setLang`, `t`), `useTheme()` (`theme: 'light' | 'dark'`, `toggleTheme`), `PROJECTS` (6 obiektów `ProjectCaseStudy`), `BEFORE_AFTER_SCENES` (3 sceny do Hero), `TEAM_MEMBERS` (4 osoby).

- [ ] **Step 1: Utwórz `LanguageContext` i `ThemeContext`**
  Zadbaj o bezpieczny zapis w `localStorage` (`studio_lang`, `studio_theme`) bez błędów hydratacji SSR.
- [ ] **Step 2: Przygotuj pełny słownik `src/data/translations.ts` (`pl` i `en`)**
  Wszystkie etykiety nawigacji, Hero, 4 usługi Oferty, 5 etapów Procesu, etykiety Kalkulatora BOQ, komunikaty walidacji Formularza i Polityka Prywatności.
- [ ] **Step 3: Przygotuj dane w `src/data/projects.ts` i `src/data/team.ts` oraz wizualizacje w `public/images/`**
  Utwórz 6 kompletnych projektów (2 Mieszkania, 2 Domy, 2 Biura/B2B) ze zdjęciami/rzutami SVG wysokiej rozdzielczości w `public/images/projects/` (gwarancja 100% dostępności offline i Lighthouse 100), zestawieniem materiałów oraz 3 scenami „Przed i Po”.
- [ ] **Step 4: Zweryfikuj typy TypeScript**
  Run: `npx tsc --noEmit`
  Expected: Exit code `0`.

---

### Task 5: Komponenty Narzędziowe (`BeforeAfterSlider`, `CostCalculator`, `ContactForm`)

**Files:**
- Create: `src/components/before-after-slider.tsx`, `src/components/cost-calculator.tsx`, `src/components/contact-form.tsx`

**Interfaces:**
- Consumes: `calculateEstimate`, `clampArea`, `formatPLN`, `formatEUR` (`src/lib/calculator.ts`), `validateContactForm`, `validateAttachment` (`src/lib/validation.ts`), `useLanguage`.
- Produces: `<BeforeAfterSlider scenes={...} />`, `<CostCalculator initialArea={...} onTransferToContact={...} />`, `<ContactForm attachedEstimate={...} onClearEstimate={...} />`.

- [ ] **Step 1: Zbuduj `BeforeAfterSlider` (`src/components/before-after-slider.tsx`)**
  Przełącznik 3 scen (Salon, Łazienka, Gabinet), wiązka lasera `#C83E2B`, uchwyt `◄ PRZECIĄGNIJ ►`, obsługa `input[type=range]` + strzałki klawiatury `ArrowLeft` / `ArrowRight`, adnotacje techniczne po stronie PRZED i PO.
- [ ] **Step 2: Zbuduj `CostCalculator` (`src/components/cost-calculator.tsx`)**
  Płyta bazaltowa `#161715`, suwak `25–250 m²`, przełącznik stanu lokalu (*Deweloperski* / *Rynek wtórny*), 3 kafelki pakietów, 4 checkboxy dodatków, prawy panel „Arkusz Kosztorysowy Wstępny” z `<NumberFlow />` w `IBM Plex Mono` (`tabular-nums`) i przyciskiem przekazującym dane do formularza.
- [ ] **Step 3: Zbuduj `ContactForm` (`src/components/contact-form.tsx`)**
  Widoczny blok podpiętego kosztorysu z kalkulatora (z możliwością odpięcia), strefa Drag & Drop pliku rzutu/zdjęcia (`.pdf`, `.jpg`, `.png`, `.webp`, max `10 MB`) z podglądem nazwy i rozmiaru, walidacja przy wysyłce, stan ładowania `600 ms` i toast `Sonner`.
- [ ] **Step 4: Zweryfikuj typy TypeScript**
  Run: `npx tsc --noEmit`
  Expected: Exit code `0`.

---

### Task 6: Nawigacja, Sekcje Redakcyjne i Szuflada `Vaul`

**Files:**
- Create: `src/components/navbar.tsx`, `src/components/hero-section.tsx`, `src/components/services-section.tsx`, `src/components/portfolio-section.tsx`, `src/components/team-section.tsx`, `src/components/process-section.tsx`, `src/components/footer.tsx`

**Interfaces:**
- Consumes: `PROJECTS`, `TEAM_MEMBERS`, `BEFORE_AFTER_SCENES`, `useLanguage`, `useTheme`, `BeforeAfterSlider`.
- Produces: Kompletny zestaw sekcji zgodny z `DESIGN.md` (szuflada mobilna `Vaul` w `Navbar` oraz szybki podgląd projektu `Vaul` w `PortfolioSection`).

- [ ] **Step 1: Zbuduj `Navbar` i `Footer`**
  Sticky header z przełącznikiem `PL | EN`, przełącznikiem motywu, CTA oraz szufladą `Vaul` na urządzeniach mobilnych.
- [ ] **Step 2: Zbuduj `HeroSection`, `ServicesSection`, `TeamSection`, `ProcessSection`**
  Układ *Tonal Slab Joinery* z `10px` fugą, mikro-fazą `2px`, bez kółek z ikonami i bez kursyw w nagłówkach.
- [ ] **Step 3: Zbuduj `PortfolioSection`**
  Filtry kategorii (*Wszystkie*, *Mieszkania*, *Domy*, *Biura / B2B*), karty realizacji z metrażem, miastem, budżetem, przyciskiem **„Szybki podgląd”** (otwierającym szufladę `Vaul`) oraz linkiem `<Link href="/realizacje/[slug]">`.
- [ ] **Step 4: Zweryfikuj typy TypeScript**
  Run: `npx tsc --noEmit`
  Expected: Exit code `0`.

---

### Task 7: Strony App Router (`/`, `/realizacje/[slug]`, `/polityka-prywatnosci`) i Weryfikacja Produkcyjna

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/components/home-client.tsx`, `src/components/case-study-client.tsx`, `src/app/realizacje/[slug]/page.tsx`, `src/app/polityka-prywatnosci/page.tsx`

**Interfaces:**
- Consumes: Wszystkie sekcje z Task 5 i 6 oraz dane z Task 4.
- Produces: Kompletna aplikacja gotowa do wdrożenia na Vercel / Cloudflare Pages.

- [ ] **Step 1: Złóż stronę główną w `src/app/page.tsx` + `src/components/home-client.tsx`**
  Spina wszystkie 7 sekcji, odczytuje opcjonalny query param `?area=` (przez `clampArea`), przekazuje wyliczony kosztorys z `CostCalculator` do `ContactForm`.
- [ ] **Step 2: Zbuduj podstrony SSG `/realizacje/[slug]/page.tsx`**
  Zaimplementuj `generateStaticParams()` zwracające 6 slugów, `generateMetadata()`, obsługę `notFound()` dla nieznanych slugów, pełny widok Case Study (metryczka, wyzwanie/rozwiązanie, tabela materiałów, suwak Przed/Po, link `/?area=[X]#kalkulator`).
- [ ] **Step 3: Zbuduj podstronę `/polityka-prywatnosci/page.tsx`**
  Dwujęzyczna (`PL | EN`) informacja o przetwarzaniu danych RODO i plikach.
- [ ] **Step 4: Uruchom pełny zestaw testów, lintera i build produkcyjny**
  Run: `npx tsc --noEmit && npx vitest run && npm run lint && npm run build`
  Expected: Wszystkie 4 komendy kończą się z kodem wyjścia `0`, a `next build` raportuje statyczną generację `/`, `/polityka-prywatnosci` oraz 6 ścieżek `/realizacje/[slug]`.
