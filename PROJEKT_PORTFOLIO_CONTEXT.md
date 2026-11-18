# KONTEKST PROJEKTU PORTFOLIO: STUDIO ARCHITEKTURY WNĘTRZ I REALIZACJI „POD KLUCZ”

## 1. Cel Biznesowy (Dlaczego powstaje ten projekt?)
Zbudowanie **jednego flagowego projektu pokazowego do portfolio freelancera**, który uzupełni istniejący sklep e-commerce (`pasiekausza.pl/nowy/`) oraz aplikację desktopową w Pythonie (`Bot Vinted`).

Projekt ma być na tyle uniwersalny, profesjonalny i dopracowany wizualnie oraz technicznie, aby móc go wysyłać w odpowiedzi na **5–6 z każdych 10 zleceń na Useme / Oferii**, w tym:
- **Strony firmowe i B2B** (architektura informacji, sekcja Zespół, proces współpracy, szybkość/SEO/dostępność),
- **Branża remontowo-budowlana i nieruchomości** (galeria realizacji, metraż/lokalizacja, interaktywny suwak „Przed i Po”),
- **Agencje designowe i branża beauty/premium** (minimalizm, dopracowana typografia, subtelne mikroanimacje, perfekcyjny mobile-first),
- **Zlecenia z „jednym niestandardowym rozwiązaniem” / landingi leadowe** (interaktywny kalkulator wstępnej wyceny + formularz z możliwością załączenia pliku/zdjęcia wnętrza).

---

## 2. Ustalenia Techniczne i Kosztowe (Zatwierdzone w burzy mózgów)
- **Budżet własny na infrastrukturę:** **0 zł** (brak własnej domeny i płatnego hostingu – projekt ma działać bezpłatnie na darmowym planie **Vercel** lub **Cloudflare Pages** pod darmowym adresem HTTPS).
- **Stack technologiczny:** **Next.js (React) + TypeScript + Tailwind CSS**.
- **Jakość i unikanie „AI Look”:**
  - Wykorzystanie sprawdzonych bibliotek z **`pick-ui-library`**:
    - `shadcn/ui` (z własnym promieniem zaokrąglenia, fontami i paletą barw – przełamanie domyślnego szablonu),
    - `NumberFlow` (płynnie animowana zmiana ceny w kalkulatorze wyceny),
    - `Sonner` (estetyczne powiadomienia po wysłaniu formularza),
    - `Vaul` (płynna szuflada mobilna na telefonach, np. do menu lub szybkiego podglądu realizacji/wyceny),
    - `cmdk` (opcjonalnie szybkie wyszukiwanie/skrót nawigacji).
  - Rygorystyczne dopracowanie wizualne (typografia, kontrasty, responsywność, zasada maksymalnie jednego mocnego efektu na stronę).
  - Wysoka wydajność i dostępność (cel: wynik **95–100** w Google Lighthouse, poprawne nagłówki, alty, obsługa klawiaturą).

---

## 3. Wstępne Sekcje i Funkcje Strony (Do doprecyzowania w `spec`)
1. **Hero (Sekcja powitalna):** Minimalistyczny, elegancki układ z mocnym hasłem i wyraźnym przyciskiem CTA (np. *Oblicz wycenę* / *Umów konsultację*).
2. **Oferta / Usługi:** Przejrzysty podział na 4–5 obszarów (np. Projekt koncepcyjny, Projekt wykonawczy, Realizacja „pod klucz”, Nadzór autorski).
3. **Realizacje + Interaktywny suwak „Przed i Po”:** Prezentacja wykonanych wnętrz (zdjęcia przed remontem vs po wykończeniu z suwakiem porównawczym), filtry kategorii (np. Mieszkania, Domy, Biura) oraz detale (metraż, lokalizacja).
4. **Zespół (3–4 osoby):** Karty ze zdjęciami, specjalizacjami i krótkimi biogramami.
5. **Proces współpracy (Krok po kroku):** Jasne wyjaśnienie, jak przebiega zlecenie (np. 4 etapy).
6. **Niestandardowe rozwiązanie – Interaktywny Kalkulator Wstępnej Wyceny:**
   - Suwak metrażu ($m^2$),
   - Wybór pakietu / standardu (np. Projekt / Standard / Premium),
   - Opcjonalne dodatki (np. projekt mebli na wymiar, nadzór na budowie),
   - Płynnie animowana szacunkowa kwota (`NumberFlow`) + przycisk przenoszący wybrane parametry prosto do formularza kontaktowego.
7. **Kontakt i Formularz z załącznikiem:** Pola (imię, e-mail, opcjonalny telefon, opis + **możliwość dodania zdjęcia/rzutu wnętrza**), klikalne dane kontaktowe i stopka z podstroną/modalem polityki prywatności.

---

## 4. Planowana Kolejność Użycia Skilli w Nowym Czacie
1. **`design-consultation`** – ustalenie kompletnej palety barw, doboru fontów (typografii), nastroju i kierunku wizualnego przed pisaniem kodu.
2. **`spec`** – zamiana powyższych założeń w twardą, kompletną specyfikację gotową do wdrożenia.
3. **`writing-plans`** – rozpisanie planu budowy krok po kroku.
4. **`impeccable`** + **`pick-ui-library`** – zakodowanie interfejsu bez „wyglądu AI”.
5. **`design-review`** + **`qa`** – audyt wizualny, testy responsywności i poprawki przed wrzuceniem na darmowy hosting.
