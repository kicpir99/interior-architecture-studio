# SPEC: Studio Architektury Wnętrz i Realizacji „Pod Klucz” (`KRAWCZYK & PARTNERZY`)

**Status:** Zatwierdzona (2026-11-17)  
**Design System:** [DESIGN.md](./DESIGN.md) (`Schibsted Grotesk` + `DM Sans` + `IBM Plex Mono`, paleta `Kamień #ECEAE4` + `Bazalt #161715` + `Cynober #C83E2B`)

---

## 1. Context

Flagowy projekt pokazowy do portfolio freelancera (uzupełniający sklep e-commerce `pasiekausza.pl/nowy/` oraz aplikację desktopową w Pythonie `Bot Vinted`). Aplikacja reprezentuje pracownię architektoniczno-wykonawczą **KRAWCZYK & PARTNERZY** i łączy estetykę drukowanego albumu architektonicznego (*Monografia Warsztatowa & Rysunek Wykonawczy*) z narzędziami konwersji: interaktywnym przekrojem „Przed i Po”, kalkulatorem kosztorysowym „Pod Klucz” z animacją `NumberFlow` oraz formularzem zapytania z walidacją załącznika rzutu wnętrza.

Projekt jest w pełni dwujęzyczny (**PL / EN**) i wykorzystuje hybrydową architekturę **Next.js App Router** (kompletny Landing Page + statycznie generowane podstrony case studies `/realizacje/[slug]` oraz `/polityka-prywatnosci`), działając przy budżecie infrastrukturalnym **0 zł** (darmowy plan Vercel / Cloudflare Pages).

## 2. Current State

- Katalog `c:\Users\kacpe\Desktop\studio-wnetrz-portfolio` jest projektem typu *greenfield* (brak `package.json`, `tsconfig.json`, `src/`).
- Istniejące pliki: `PROJEKT_PORTFOLIO_CONTEXT.md`, `DESIGN.md`, `CLAUDE.md`, `design-consultation-preview.html`.

### Pokrycie segmentów zleceń (Useme / Oferia)

| Segment klienta | Wymagany dowód kompetencji | Moduł w specyfikacji |
|---|---|---|
| **Strony firmowe B2B i eksportowe** | Architektura informacji, Zespół, Proces, SEO, wersja `PL \| EN` | Sekcje Oferta, Zespół, Proces + podstrony SSG `/realizacje/[slug]` + przełącznik `PL \| EN` |
| **Budownictwo, remonty, deweloperzy** | Galeria z filtrami, metraż/lokalizacja, porównanie stanu surowego i gotowego | Interaktywny suwak „Przed i Po” z adnotacjami technicznymi + 6 case studies (Mieszkania, Domy, Biura) |
| **Agencje designowe, beauty, premium** | Unikanie „AI Look”, dyscyplina typograficzna, mikro-interakcje, mobile-first | System `DESIGN.md` (`Schibsted Grotesk`, fugi tonalne `10px`, faza `2px`, szuflada mobilna `Vaul`) |
| **Landingi leadowe / custom widget** | Niestandardowy kalkulator wyceny + formularz z przesyłaniem plików | Kalkulator „Bill of Quantities” (`NumberFlow`) sprzężony z formularzem i walidacją rzutu PDF/JPG/PNG |

---

## 3. Architecture & Routing (Next.js App Router)

1. **`/` (Strona główna — 7-sekcyjny układ redakcyjno-narzędziowy):**
   - **Sticky Header:** Logo `KRAWCZYK & PARTNERZY`, linki kotwicowe (`Oferta`, `Realizacje`, `Przed i Po`, `Zespół`, `Proces`, `Kalkulator`, `Kontakt`), przełącznik języka `PL | EN`, przełącznik motywu `Jasny | Ciemny`, CTA *„Oblicz kosztorys”*. Na mobile: płynna szuflada `Vaul`.
   - **Sekcja 1 — Hero + Interaktywny Suwak „Przed i Po”:** Lewy łam z propozycją wartości, dwoma przyciskami CTA i 3 parametrami kontraktowymi (*36 mies. rękojmi*, *10–12 tyg. realizacji*, *Nadzór inżynierski 1:1*). Prawy łam z interaktywnym suwakiem „Przed i Po” (wiązka lasera `#C83E2B`, znaczniki prac podtynkowych po stronie PRZED i detali materiałowych po stronie PO) oraz przełącznikiem 3 przestrzeni (*Salon z aneksem*, *Łazienka główna*, *Strefa wejściowa / Gabinet*).
   - **Sekcja 2 — Oferta / Usługi (4 obszary):** Układ *Tonal Slab Joinery* (`10px` szczelina): (1) *Projekt koncepcyjny i funkcjonalny*, (2) *Wielobranżowy projekt wykonawczy*, (3) *Kompleksowa realizacja „Pod Klucz”*, (4) *Nadzór autorski i odbiory techniczne*.
   - **Sekcja 3 — Realizacje (6 projektów + filtry kategorii):** Filtry: *Wszystkie (6)*, *Mieszkania (2)*, *Domy (2)*, *Biura / B2B (2)*. Karty z fotografią, tytułem, miastem, metrażem (`m²`), budżetem, czasem realizacji, przyciskiem **„Szybki podgląd”** (szuflada `Vaul`) oraz linkiem **„Pełne Case Study →”** do `/realizacje/[slug]`.
   - **Sekcja 4 — Zespół (4 osoby):** Karty ze zdjęciami, rolą inżynieryjno-projektową, uprawnieniami/doświadczeniem i zakresem odpowiedzialności.
   - **Sekcja 5 — Proces współpracy (5 etapów):** Od inwentaryzacji laserowej po odbiór kluczy, z opisem dostarczanych dokumentów i czasem trwania każdego etapu.
   - **Sekcja 6 — Interaktywny Kalkulator Wstępnej Wyceny („Bill of Quantities” na płycie `#161715`):** Przeliczanie na żywo z animacją `@number-flow/react` (`PLN` dla `PL`, opcjonalne `EUR` dla `EN`) + przycisk **„Przenieś kosztorys do formularza i załącz rzut →”**.
   - **Sekcja 7 — Kontakt i Formularz z załącznikiem + Stopka:** Dane pracowni (Warszawa / Kraków / Wrocław), pola formularza, podpięta konfiguracja z kalkulatora, strefa Drag & Drop załącznika (`.pdf`, `.jpg`, `.png`, `.webp`, do `10 MB`) oraz powiadomienia `Sonner`.
2. **`/realizacje/[slug]` (Statycznie generowane podstrony Case Study — 6 adresów URL):**
   - Generowane przez `generateStaticParams()` i `generateMetadata()`.
   - Zawiera metryczkę techniczną, opis wyzwania i rozwiązania, tabelę materiałów, porównanie „Przed i Po”, galerię oraz przycisk **„Oblicz kosztorys dla metrażu [X] m²”** przekierowujący do `/?area=X#kalkulator`.
3. **`/polityka-prywatnosci` (Podstrona RODO / Polityka Prywatności w PL i EN).**

---

## 4. Data Models & Business Logic

### A. Kalkulator Wyceny (`src/lib/calculator.ts`)

```typescript
export type PropertyCondition = 'developer' | 'secondary';
export type PackageTier = 'design_only' | 'turnkey_standard' | 'turnkey_collector';
export type AddonId = 'custom_carpentry' | 'ducted_ac' | 'smart_dali' | 'price_freeze';

export interface CalculatorState {
  areaM2: number; // zakres: 25..250, domyślnie: 75
  condition: PropertyCondition; // domyślnie: 'developer'
  tier: PackageTier; // domyślnie: 'turnkey_standard'
  addons: AddonId[]; // domyślnie: ['custom_carpentry']
}

export interface CalculatorBreakdown {
  baseWorkAndMaterialsPLN: number;
  demolitionAndInstallationsPLN: number;
  carpentryPLN: number;
  acAndSmartPLN: number;
  priceFreezeReservePLN: number;
  totalPLN: number;
  totalEUR: number; // przelicznik stały 1 EUR = 4.30 PLN
  estimatedWeeks: number;
}
```

- **Stawki:** `design_only` = `2 800 zł/m²`, `turnkey_standard` = `3 900 zł/m²`, `turnkey_collector` = `5 400 zł/m²`.
- **Rynek wtórny (`secondary`):** `+650 zł/m²`.
- **Dodatki:** `custom_carpentry` = `+38 000 zł`, `ducted_ac` = `+18 000 zł`, `smart_dali` = `+14 000 zł`, `price_freeze` = `+5%` od sumy częściowej (`Math.round(subtotal * 0.05)`).
- **Czas realizacji:** `design_only`: `6 + Math.ceil(areaM2 / 40)` tyg.; pakiety pod klucz: `8 + Math.ceil(areaM2 / 30) + (condition === 'secondary' ? 2 : 0)` tyg.

### B. Walidacja Formularza i Załącznika (`src/lib/validation.ts`)

- Wymagane: `fullName` (`2..80` znaków), `email` (poprawny e-mail), `rodoConsent` (`true`).
- Opcjonalne: `phone` (min. `7` cyfr jeśli podany), `city` (`<= 60`), `message` (`<= 2000`), `calculatorSummary`.
- Załącznik: typy MIME `application/pdf`, `image/jpeg`, `image/png`, `image/webp`; max `10 MB` (`10 * 1024 * 1024` bajtów).
- Wysyłka: Smart Demo Mode (walidacja + symulacja `600 ms` + toast `Sonner` z podsumowaniem; opcjonalne wsparcie Web3Forms/Resend przez zmienne środowiskowe).

### C. Dwujęzyczność (`PL | EN`)

- Domyślny język: `pl`, zapis wyboru w `localStorage` (`studio_lang`), przełączanie po stronie klienta (`0 ms`, bez przeładowania i z zachowaniem SSR dla `pl`).

---

## 5. Acceptance Criteria & Testing Plan

1. **Zgodność z `DESIGN.md`:** Fonty `Schibsted Grotesk`, `DM Sans`, `IBM Plex Mono` (`tabular-nums`), kolory `#ECEAE4`, `#F7F6F2`, `#161715`, `#C83E2B`, promień `2px–4px` (brak pigułek `9999px`).
2. **Dwujęzyczność (`PL | EN`):** Pełne tłumaczenie wszystkich 7 sekcji, kalkulatora, formularza i podstron `/realizacje/[slug]`.
3. **Suwak „Przed i Po”:** Obsługa myszy, dotyku i klawiatury (`ArrowLeft` / `ArrowRight`), przełącznik 3 przestrzeni, adnotacje techniczne.
4. **Kalkulator + `NumberFlow`:** Przeliczanie na żywo i przeniesienie parametrów do formularza.
5. **Walidacja załącznika:** Akceptacja `<= 10 MB` (`pdf/jpg/png/webp`), blokada plików `> 10 MB` i niedozwolonych formatów.
6. **Podstrony SSG (`/realizacje/[slug]`):** 6 statycznie wygenerowanych tras przy `npm run build` z przekierowaniem metrażu do `/?area=X#kalkulator`.
7. **Testy i Build:** `npm test` (Vitest: min. 12 testów unit dla `calculator.ts` i `validation.ts`), `npm run lint`, `npm run build` — wszystkie z kodem wyjścia `0`.

## 6. Out of Scope

- Zewnętrzny CMS / baza danych SQL.
- Konta użytkowników, logowanie i płatności online.
- Języki inne niż `PL` i `EN`.
