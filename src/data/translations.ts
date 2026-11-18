export type Language = 'pl' | 'en';

export interface ServiceItem {
  code: string;
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
}

export interface ProcessStep {
  step: string;
  title: string;
  duration: string;
  description: string;
  output: string;
}

export interface TranslationDictionary {
  nav: {
    brand: string;
    brandSub: string;
    services: string;
    portfolio: string;
    beforeAfter: string;
    team: string;
    process: string;
    calculator: string;
    contact: string;
    cta: string;
    menuOpen: string;
    themeToggle: string;
  };
  hero: {
    cities: string;
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
    metrics: {
      warrantyLabel: string;
      warrantyValue: string;
      durationLabel: string;
      durationValue: string;
      supervisionLabel: string;
      supervisionValue: string;
    };
  };
  beforeAfter: {
    sectionTitle: string;
    sectionMeta: string;
    beforeTag: string;
    afterTag: string;
    dragHint: string;
    sliderAriaLabel: string;
    realizationLabel: string;
  };
  services: {
    sectionTitle: string;
    sectionMeta: string;
    deliverablesLabel: string;
    items: ServiceItem[];
  };
  portfolio: {
    sectionTitle: string;
    sectionMeta: string;
    filters: {
      all: string;
      apartments: string;
      houses: string;
      offices: string;
    };
    quickPreview: string;
    fullCaseStudy: string;
    areaLabel: string;
    budgetLabel: string;
    durationLabel: string;
    locationLabel: string;
    materialsLabel: string;
    calculateSimilar: string;
    closeDrawer: string;
  };
  team: {
    sectionTitle: string;
    sectionMeta: string;
    credentialsLabel: string;
  };
  process: {
    sectionTitle: string;
    sectionMeta: string;
    deliverableLabel: string;
    steps: ProcessStep[];
  };
  calculator: {
    sectionTitle: string;
    sectionMeta: string;
    areaLabel: string;
    conditionLabel: string;
    conditionDeveloper: string;
    conditionDeveloperSub: string;
    conditionSecondary: string;
    conditionSecondarySub: string;
    tierLabel: string;
    tiers: {
      design_only: { title: string; price: string; note: string };
      turnkey_standard: { title: string; price: string; note: string };
      turnkey_collector: { title: string; price: string; note: string };
    };
    addonsLabel: string;
    addons: {
      custom_carpentry: { title: string; price: string };
      ducted_ac: { title: string; price: string };
      smart_dali: { title: string; price: string };
      price_freeze: { title: string; price: string };
    };
    receiptTitle: string;
    receiptVat: string;
    rowBase: string;
    rowDemolition: string;
    rowCarpentry: string;
    rowAcSmart: string;
    rowFreeze: string;
    rowSupervision: string;
    includedLabel: string;
    totalLabel: string;
    estimatedDurationLabel: string;
    weeksUnit: string;
    transferBtn: string;
    approxEurPrefix: string;
  };
  contact: {
    sectionTitle: string;
    sectionMeta: string;
    studioLabel: string;
    offices: string;
    phoneLabel: string;
    emailLabel: string;
    hoursLabel: string;
    hoursValue: string;
    attachedEstimateTitle: string;
    detachEstimate: string;
    fields: {
      fullName: string;
      fullNamePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      city: string;
      cityPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      attachmentLabel: string;
      attachmentHint: string;
      attachmentRemove: string;
      rodoLabel: string;
      rodoLink: string;
      submitBtn: string;
      submittingBtn: string;
    };
    errors: Record<string, string>;
    successToastTitle: string;
    successToastDesc: string;
    errorToastTitle: string;
  };
  caseStudy: {
    backToPortfolio: string;
    challengeTitle: string;
    solutionTitle: string;
    materialsTitle: string;
    beforeAfterTitle: string;
    ctaTitle: string;
    ctaDesc: string;
    ctaBtn: string;
  };
  privacy: {
    title: string;
    updated: string;
    backHome: string;
    sections: { heading: string; body: string }[];
  };
  footer: {
    tagline: string;
    privacyLink: string;
    rights: string;
    portfolioNote: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  pl: {
    nav: {
      brand: 'KRAWCZYK & PARTNERZY',
      brandSub: 'ARCHITEKTURA & POD KLUCZ',
      services: 'Oferta',
      portfolio: 'Realizacje',
      beforeAfter: 'Przed i Po',
      team: 'Zespół',
      process: 'Proces',
      calculator: 'Kalkulator',
      contact: 'Kontakt',
      cta: 'Oblicz kosztorys',
      menuOpen: 'Menu nawigacji',
      themeToggle: 'Przełącz motyw',
    },
    hero: {
      cities: 'WARSZAWA · KRAKÓW · WROCŁAW',
      headline: 'Od surowego żelbetu po odbiór kluczy. Jedna umowa, stały kosztorys.',
      subheadline:
        'Projektujemy architekturę wnętrz i bierzemy pełną odpowiedzialność inżynieryjną za realizację pod klucz. Zamiast kilkunastu ekip otrzymujesz harmonogram co do dnia i zamknięty budżet.',
      ctaPrimary: 'Oblicz wstępny kosztorys',
      ctaSecondary: 'Zobacz 6 realizacji z metrażem',
      metrics: {
        warrantyLabel: 'GWARANCJA RĘKOJMI',
        warrantyValue: '36 MIESIĘCY',
        durationLabel: 'ŚREDNI CZAS REALIZACJI',
        durationValue: '10–12 TYGODNI',
        supervisionLabel: 'NADZÓR BUDOWLANY',
        supervisionValue: 'INŻYNIERSKI 1:1',
      },
    },
    beforeAfter: {
      sectionTitle: 'Przekrój wykonawczy: Przed i Po',
      sectionMeta: 'Przesuń wiązkę laserową w lewo lub w prawo (obsługuje również strzałki klawiatury)',
      beforeTag: 'STAN SUROWY / DEWELOPERSKI',
      afterTag: 'GOTOWE POD KLUCZ',
      dragHint: '◄ PRZECIĄGNIJ ►',
      sliderAriaLabel: 'Suwak porównania stanu przed remontem i po wykończeniu',
      realizationLabel: 'PRZESTRZEŃ',
    },
    services: {
      sectionTitle: 'Zakres usług i odpowiedzialność',
      sectionMeta: '4 etapy spięte w jeden harmonogram wykonawczy',
      deliverablesLabel: 'Co otrzymujesz w dokumentacji:',
      items: [
        {
          code: '01 / KONCEPCJA',
          title: 'Projekt koncepcyjny i układ funkcjonalny',
          duration: '2–3 tygodnie',
          description:
            'Inwentaryzacja laserowa lokalu z dokładnością do 2 mm, analiza nośności ścian i 3 warianty układu ścian działowych zoptymalizowane pod ergonomię.',
          deliverables: [
            'Inwentaryzacja chmurą punktów / dalmierzem',
            'Rzuty aranżacji 2D i przekroje pionowe',
            'Zestawienie materiałowe z próbkami fizycznymi',
          ],
        },
        {
          code: '02 / WYKONAWSTWO',
          title: 'Wielobranżowy projekt wykonawczy',
          duration: '3–4 tygodnie',
          description:
            'Twarda dokumentacja techniczna dla ekip budowlanych, elektryków, hydraulików i stolarzy. Ekipy dostają gotowe wymiary i nie muszą zgadywać na budowie.',
          deliverables: [
            'Schematy elektryki, DALI i teletechniki',
            'Rysunki wod-kan, wentylacji i klimatyzacji',
            'Szczegółowe rozkroje mebli na wymiar (BOQ)',
          ],
        },
        {
          code: '03 / REALIZACJA',
          title: 'Wykończenie pod klucz ze stałą ceną',
          duration: '8–14 tygodni',
          description:
            'Przejmujemy lokal w stanie deweloperskim lub wtórnym. Koordynujemy własne brygady budowlane, logistykę dostaw i montaż stolarki.',
          deliverables: [
            'Jedna umowa ryczałtowa i zamknięty kosztorys',
            'Logistyka i ubezpieczenie materiałów na budowie',
            'Cotygodniowe raporty fotograficzne z postępu prac',
          ],
        },
        {
          code: '04 / NADZÓR',
          title: 'Nadzór autorski i odbiór techniczny',
          duration: 'Do przekazania kluczy',
          description:
            'Kierownik robót oraz architekt prowadzący kontrolują każdy etap ukryty pod tynkiem przed zakryciem instalacji.',
          deliverables: [
            'Odbiory zanikowe instalacji i hydroizolacji',
            'Pomiary kamerą termowizyjną i próby ciśnieniowe',
            'Protokół końcowy i 36-miesięczna karta gwarancyjna',
          ],
        },
      ],
    },
    portfolio: {
      sectionTitle: 'Wybrane realizacje i kosztorysy',
      sectionMeta: 'Filtruj po typie obiektu lub otwórz pełną dokumentację Case Study',
      filters: {
        all: 'Wszystkie (6)',
        apartments: 'Mieszkania',
        houses: 'Domy',
        offices: 'Biura / B2B',
      },
      quickPreview: 'Szybki podgląd',
      fullCaseStudy: 'Pełne Case Study →',
      areaLabel: 'METRAŻ',
      budgetLabel: 'BUDŻET',
      durationLabel: 'CZAS',
      locationLabel: 'LOKALIZACJA',
      materialsLabel: 'Kluczowe materiały i systemy',
      calculateSimilar: 'Wyceniam podobny metraż →',
      closeDrawer: 'Zamknij podgląd',
    },
    team: {
      sectionTitle: 'Zespół architektoniczno-inżynieryjny',
      sectionMeta: 'Bezpośredni kontakt z osobami prowadzącymi budowę',
      credentialsLabel: 'UPRAWNIENIA / SPECJALIZACJA',
    },
    process: {
      sectionTitle: 'Proces współpracy krok po kroku',
      sectionMeta: 'Przejrzysta ścieżka od pierwszego rzutu do odbioru kluczy',
      deliverableLabel: 'Efekt etapu:',
      steps: [
        {
          step: 'ETAP 01',
          title: 'Audyt rzutu i wstępny budżet',
          duration: '1–2 dni',
          description:
            'Analizujemy rzut od dewelopera lub stan istniejący. Weryfikujemy założenia kosztowe i określamy realne widełki przed podpisaniem umowy.',
          output: 'Wstępna karta BOQ i harmonogram ramowy',
        },
        {
          step: 'ETAP 02',
          title: 'Inwentaryzacja i projekt koncepcyjny',
          duration: '2–3 tygodnie',
          description:
            'Wykonujemy pomiary laserowe na miejscu, projektujemy układ ścian oraz dobieramy fizyczne próbki kamienia, forniru i armatury.',
          output: 'Zatwierdzony układ funkcjonalny i moodboard',
        },
        {
          step: 'ETAP 03',
          title: 'Dokumentacja wykonawcza i stała umowa',
          duration: '3 tygodnie',
          description:
            'Tworzymy rysunki techniczne dla każdej branży oraz finalny, niezmienny kosztorys realizacyjny wraz z karami umownymi za opóźnienia.',
          output: 'Umowa pod klucz z gwarancją budżetu',
        },
        {
          step: 'ETAP 04',
          title: 'Prace budowlane, instalacje i stolarka',
          duration: '6–10 tygodni',
          description:
            'Brygady wykonawcze realizują wyburzenia, gładzie, elektrykę, posadzki i zabudowy stolarskie pod stałym nadzorem inżyniera budowy.',
          output: 'Cotygodniowe protokoły z placu budowy',
        },
        {
          step: 'ETAP 05',
          title: 'Sprzątanie pobudowlane i odbiór kluczy',
          duration: '2–3 dni',
          description:
            'Przeprowadzamy testy instalacji, regulację okuć stolarskich, serwis sprzątający oraz przekazanie dokumentacji powykonawczej.',
          output: 'Klucze do gotowego lokalu + 36 mies. rękojmi',
        },
      ],
    },
    calculator: {
      sectionTitle: 'Kalkulator wstępnej wyceny (Bill of Quantities)',
      sectionMeta: 'Wszystkie kwoty są szacunkiem brutto (VAT 8% dla lokali mieszkalnych)',
      areaLabel: '1. POWIERZCHNIA LOKALU (M²)',
      conditionLabel: '2. STAN TECHNICZNY LOKALU',
      conditionDeveloper: 'Stan deweloperski',
      conditionDeveloperSub: 'Nowe budownictwo (+0 zł/m²)',
      conditionSecondary: 'Rynek wtórny',
      conditionSecondarySub: 'Demontaż i nowe instalacje (+650 zł/m²)',
      tierLabel: '3. STANDARD WYKOŃCZENIA POD KLUCZ',
      tiers: {
        design_only: {
          title: 'Projekt + Nadzór',
          price: '2 800 zł / m²',
          note: 'Dokumentacja wykonawcza i nadzór autorski',
        },
        turnkey_standard: {
          title: 'Standard Pod Klucz',
          price: '3 900 zł / m²',
          note: 'Kompletna realizacja, materiały i ekipy',
        },
        turnkey_collector: {
          title: 'Kolekcjonerski',
          price: '5 400 zł / m²',
          note: 'Spieki, fornir, systemy DALI i concierge',
        },
      },
      addonsLabel: '4. OPCJE DODATKOWE',
      addons: {
        custom_carpentry: {
          title: 'Zabudowy stolarskie na wymiar (kuchnia + szafy)',
          price: '+ 38 000 zł',
        },
        ducted_ac: {
          title: 'Klimatyzacja kanałowa z maskowaniem nawiewów',
          price: '+ 18 000 zł',
        },
        smart_dali: {
          title: 'Automatyka oświetlenia DALI / Smart Home',
          price: '+ 14 000 zł',
        },
        price_freeze: {
          title: 'Gwarancja stałej ceny materiałów (zamrożenie na 6 mies.)',
          price: '+ 5%',
        },
      },
      receiptTitle: 'ARKUSZ KOSZTORYSOWY WSTĘPNY',
      receiptVat: 'VAT 8% (MIESZKANIOWY)',
      rowBase: 'Prace budowlano-wykończeniowe i materiały',
      rowDemolition: 'Demontaż i wymiana instalacji (rynek wtórny)',
      rowCarpentry: 'Stolarka meblowa na wymiar',
      rowAcSmart: 'Klimatyzacja kanałowa i automatyka DALI',
      rowFreeze: 'Rezerwa gwarancji stałej ceny materiałów (+5%)',
      rowSupervision: 'Projekt wykonawczy + nadzór inżynierski',
      includedLabel: 'W CENIE PAKIETU',
      totalLabel: 'SZACOWANY BUDŻET CAŁKOWITY',
      estimatedDurationLabel: 'SZACOWANY CZAS REALIZACJI',
      weeksUnit: 'tyg.',
      transferBtn: 'Przenieś kosztorys do formularza i załącz rzut →',
      approxEurPrefix: 'Ok.',
    },
    contact: {
      sectionTitle: 'Zapytanie o wycenę i załączenie rzutu',
      sectionMeta: 'Odpowiadamy z analizą techniczną w ciągu 24 godzin roboczych',
      studioLabel: 'PRACOWNIA ARCHITEKTONICZNO-WYKONAWCZA',
      offices: 'Warszawa (ul. Mokotowska 49) · Kraków (ul. Zabłocie 23) · Wrocław (ul. Włodkowica 14)',
      phoneLabel: 'TELEFON BEZPOŚREDNI',
      emailLabel: 'E-MAIL PROJEKTOWY',
      hoursLabel: 'GODZINY KONSULTACJI',
      hoursValue: 'Pon–Pt: 08:30 – 18:00 (spotkania również zdalne)',
      attachedEstimateTitle: 'PODPIĘTA KONFIGURACJA Z KALKULATORA',
      detachEstimate: 'Usuń',
      fields: {
        fullName: 'Imię i nazwisko *',
        fullNamePlaceholder: 'np. Anna Nowak',
        email: 'Adres e-mail *',
        emailPlaceholder: 'anna@firma.pl',
        phone: 'Telefon kontaktowy (opcjonalnie)',
        phonePlaceholder: '+48 600 000 000',
        city: 'Miasto inwestycji (opcjonalnie)',
        cityPlaceholder: 'np. Warszawa, Mokotów',
        message: 'Dodatkowe informacje (termin odbioru kluczy, oczekiwania)',
        messagePlaceholder: 'Opisz krótko stan lokalu i planowany termin rozpoczęcia prac...',
        attachmentLabel: 'Załącz rzut lokalu lub zdjęcie wnętrza (opcjonalnie)',
        attachmentHint: 'Przeciągnij plik tutaj lub kliknij, aby wybrać · PDF, JPG, PNG, WEBP · maks. 10 MB',
        attachmentRemove: 'Usuń plik',
        rodoLabel: 'Akceptuję przetwarzanie danych w celu przygotowania wyceny zgodnie z',
        rodoLink: 'Polityką Prywatności',
        submitBtn: 'Wyślij zapytanie i specyfikację',
        submittingBtn: 'Weryfikacja i wysyłanie...',
      },
      errors: {
        name_too_short: 'Podaj imię i nazwisko (minimum 2 znaki).',
        email_invalid: 'Podaj poprawny adres e-mail.',
        phone_invalid: 'Numer telefonu musi zawierać co najmniej 7 cyfr.',
        rodo_required: 'Wymagana jest akceptacja Polityki Prywatności.',
        file_empty: 'Wybrany plik jest pusty (0 B).',
        file_too_large: 'Plik przekracza maksymalny rozmiar 10 MB.',
        file_invalid_type: 'Dozwolone formaty załącznika to: PDF, JPG, PNG, WEBP.',
      },
      successToastTitle: 'Specyfikacja została przyjęta (tryb demonstracyjny)',
      successToastDesc: 'Dziękujemy. Wszystkie dane oraz załącznik przeszły walidację techniczną.',
      errorToastTitle: 'Popraw zaznaczone pola w formularzu',
    },
    caseStudy: {
      backToPortfolio: '← Powrót do wszystkich realizacji',
      challengeTitle: 'Wyzwanie inżynieryjne i układ przed pracami',
      solutionTitle: 'Zastosowane rozwiązanie i prace podtynkowe',
      materialsTitle: 'Specyfikacja użytych materiałów (BOQ)',
      beforeAfterTitle: 'Porównanie wykonania: Przed i Po',
      ctaTitle: 'Planujesz podobny zakres prac?',
      ctaDesc: 'Przenieś metraż tej realizacji bezpośrednio do kalkulatora kosztorysowego i sprawdź aktualny budżet.',
      ctaBtn: 'Oblicz kosztorys dla tego metrażu →',
    },
    privacy: {
      title: 'Polityka Prywatności i RODO',
      updated: 'Ostatnia aktualizacja: 17 listopada 2026',
      backHome: '← Powrót na stronę główną',
      sections: [
        {
          heading: '1. Charakter pokazowy projektu (Portfolio)',
          body: 'Niniejsza aplikacja jest flagowym projektem pokazowym portfolio deweloperskiego prezentującym architekturę Next.js, TypeScript, Tailwind CSS oraz interaktywne narzędzia wyceny. Dane wpisywane w formularzu kontaktowym nie są trwale gromadzone ani sprzedawane podmiotom trzecim.',
        },
        {
          heading: '2. Przetwarzanie załączników (rzutów i zdjęć)',
          body: 'Pliki dodawane w polu załącznika (PDF, JPG, PNG, WEBP do 10 MB) podlegają lokalnej walidacji typu MIME oraz rozmiaru w przeglądarce użytkownika w celu weryfikacji poprawności formularza.',
        },
        {
          heading: '3. Pamięć lokalna przeglądarki (localStorage)',
          body: 'Aplikacja zapisuje wyłącznie preferencję wybranego języka (studio_lang: pl/en) oraz motywu kolorystycznego (studio_theme: light/dark) w pamięci localStorage przeglądarki. Nie używamy ciasteczek śledzących ani reklamowych.',
        },
      ],
    },
    footer: {
      tagline: 'Architektura wnętrz i pełne wykonawstwo pod klucz w Warszawie, Krakowie i Wrocławiu.',
      privacyLink: 'Polityka prywatności / RODO',
      rights: '© 2026 KRAWCZYK & PARTNERZY. Wszelkie prawa zastrzeżone.',
      portfolioNote: 'Projekt pokazowy portfolio · Next.js + TypeScript + Tailwind CSS',
    },
  },
  en: {
    nav: {
      brand: 'KRAWCZYK & PARTNERS',
      brandSub: 'ARCHITECTURE & TURNKEY',
      services: 'Services',
      portfolio: 'Projects',
      beforeAfter: 'Before & After',
      team: 'Team',
      process: 'Process',
      calculator: 'Estimator',
      contact: 'Contact',
      cta: 'Estimate budget',
      menuOpen: 'Navigation menu',
      themeToggle: 'Toggle theme',
    },
    hero: {
      cities: 'WARSAW · KRAKÓW · WROCŁAW',
      headline: 'From raw concrete to handover keys. Single contract, fixed budget.',
      subheadline:
        'We design interior architecture and take full engineering responsibility for turnkey execution. Instead of coordinating twelve separate crews, you get a day-by-day schedule and a locked bill of quantities.',
      ctaPrimary: 'Calculate estimate',
      ctaSecondary: 'Explore 6 completed projects',
      metrics: {
        warrantyLabel: 'WORKMANSHIP WARRANTY',
        warrantyValue: '36 MONTHS',
        durationLabel: 'AVG. DELIVERY TIME',
        durationValue: '10–12 WEEKS',
        supervisionLabel: 'SITE SUPERVISION',
        supervisionValue: '1:1 ENGINEERING',
      },
    },
    beforeAfter: {
      sectionTitle: 'Technical section: Before & After',
      sectionMeta: 'Drag the laser beam left or right (supports keyboard Left/Right arrows)',
      beforeTag: 'RAW SHELL / DEVELOPER STATE',
      afterTag: 'TURNKEY HANDOVER',
      dragHint: '◄ DRAG ►',
      sliderAriaLabel: 'Slider comparing raw shell condition with completed turnkey interior',
      realizationLabel: 'SPACE',
    },
    services: {
      sectionTitle: 'Scope of services & accountability',
      sectionMeta: '4 disciplines unified into a single execution schedule',
      deliverablesLabel: 'Included deliverables:',
      items: [
        {
          code: '01 / CONCEPT',
          title: 'Concept design & spatial layout',
          duration: '2–3 weeks',
          description:
            'Laser measurement with 2 mm accuracy, structural wall analysis, and 3 partition layout options tailored to daily ergonomics.',
          deliverables: [
            'Point-cloud / laser site survey',
            '2D spatial plans & vertical sections',
            'Physical stone, veneer & fixture samples',
          ],
        },
        {
          code: '02 / ENGINEERING',
          title: 'Multi-trade technical drawings',
          duration: '3–4 weeks',
          description:
            'Unambiguous construction blueprints for builders, electricians, plumbers, and bespoke joiners. Crews get exact dimensions so nothing is left to guesswork on site.',
          deliverables: [
            'Electrical, DALI lighting & low-voltage plans',
            'Plumbing, HVAC & acoustic insulation schematics',
            'Detailed joinery shop drawings & BOQ',
          ],
        },
        {
          code: '03 / TURNKEY BUILD',
          title: 'Fixed-price turnkey execution',
          duration: '8–14 weeks',
          description:
            'We take over the property in raw or secondary condition, managing our in-house crews, material logistics, and custom millwork.',
          deliverables: [
            'Single lump-sum contract & locked BOQ',
            'Site material procurement & insurance',
            'Weekly photo progress reports',
          ],
        },
        {
          code: '04 / SUPERVISION',
          title: 'Site engineering & handover',
          duration: 'Until key handover',
          description:
            'Our lead site engineer and architect inspect every concealed utility run prior to plastering and tiling.',
          deliverables: [
            'Concealed plumbing & waterproofing sign-offs',
            'Thermal imaging & pressure testing',
            'Final snag-free handover + 36-month warranty',
          ],
        },
      ],
    },
    portfolio: {
      sectionTitle: 'Selected projects & budgets',
      sectionMeta: 'Filter by building typology or open the full engineering case study',
      filters: {
        all: 'All (6)',
        apartments: 'Apartments',
        houses: 'Houses',
        offices: 'Offices / B2B',
      },
      quickPreview: 'Quick preview',
      fullCaseStudy: 'Full Case Study →',
      areaLabel: 'AREA',
      budgetLabel: 'BUDGET',
      durationLabel: 'TIMELINE',
      locationLabel: 'LOCATION',
      materialsLabel: 'Key materials & systems',
      calculateSimilar: 'Estimate similar area →',
      closeDrawer: 'Close preview',
    },
    team: {
      sectionTitle: 'Architecture & site engineering team',
      sectionMeta: 'Direct communication with the people running your site',
      credentialsLabel: 'CREDENTIALS / FOCUS',
    },
    process: {
      sectionTitle: 'Step-by-step collaboration process',
      sectionMeta: 'Clear milestones from initial floorplan audit to key handover',
      deliverableLabel: 'Stage output:',
      steps: [
        {
          step: 'STAGE 01',
          title: 'Floorplan audit & target budget',
          duration: '1–2 days',
          description:
            'We review the developer floorplan or existing property, validate cost assumptions, and establish realistic ranges before signing.',
          output: 'Initial BOQ sheet & milestone timeline',
        },
        {
          step: 'STAGE 02',
          title: 'Laser survey & concept design',
          duration: '2–3 weeks',
          description:
            'On-site laser measurement, spatial layout finalization, and physical material selection (stone, oak veneer, fixtures).',
          output: 'Approved 2D layout & material board',
        },
        {
          step: 'STAGE 03',
          title: 'Technical drawings & turnkey contract',
          duration: '3 weeks',
          description:
            'Full multi-trade documentation and a fixed-price execution contract backed by clear schedule guarantees.',
          output: 'Fixed-budget turnkey contract',
        },
        {
          step: 'STAGE 04',
          title: 'Construction, MEP & bespoke joinery',
          duration: '6–10 weeks',
          description:
            'Demolition, MEP rough-ins, screeds, tiling, and custom cabinetry executed under continuous engineering supervision.',
          output: 'Weekly site inspection logs',
        },
        {
          step: 'STAGE 05',
          title: 'Post-build cleaning & key handover',
          duration: '2–3 days',
          description:
            'System commissioning, joinery hardware adjustment, deep cleaning, and delivery of as-built documentation.',
          output: 'Ready-to-move-in keys + 36-month warranty',
        },
      ],
    },
    calculator: {
      sectionTitle: 'Preliminary Cost Estimator (Bill of Quantities)',
      sectionMeta: 'All figures are gross estimates (8% residential VAT in Poland)',
      areaLabel: '1. FLOOR AREA (M²)',
      conditionLabel: '2. PROPERTY CONDITION',
      conditionDeveloper: 'Developer shell',
      conditionDeveloperSub: 'New build (+0 PLN/m²)',
      conditionSecondary: 'Secondary market',
      conditionSecondarySub: 'Demolition & new MEP (+650 PLN/m²)',
      tierLabel: '3. TURNKEY FINISH STANDARD',
      tiers: {
        design_only: {
          title: 'Design + Supervision',
          price: '2,800 PLN / m²',
          note: 'Technical drawings & site supervision',
        },
        turnkey_standard: {
          title: 'Turnkey Standard',
          price: '3,900 PLN / m²',
          note: 'Full execution, materials & crews',
        },
        turnkey_collector: {
          title: 'Collector Grade',
          price: '5,400 PLN / m²',
          note: 'Sintered stone, veneer, DALI & concierge',
        },
      },
      addonsLabel: '4. OPTIONAL SCOPE',
      addons: {
        custom_carpentry: {
          title: 'Bespoke architectural millwork (kitchen + wardrobes)',
          price: '+ 38,000 PLN',
        },
        ducted_ac: {
          title: 'Concealed ducted air conditioning',
          price: '+ 18,000 PLN',
        },
        smart_dali: {
          title: 'DALI lighting automation / Smart Home',
          price: '+ 14,000 PLN',
        },
        price_freeze: {
          title: '6-month fixed material price guarantee',
          price: '+ 5%',
        },
      },
      receiptTitle: 'PRELIMINARY BILL OF QUANTITIES',
      receiptVat: '8% VAT INCLUDED',
      rowBase: 'Construction works & finishing materials',
      rowDemolition: 'Demolition & MEP replacement (secondary)',
      rowCarpentry: 'Bespoke architectural millwork',
      rowAcSmart: 'Ducted AC & DALI lighting automation',
      rowFreeze: 'Material price-lock reserve (+5%)',
      rowSupervision: 'Technical drawings + site engineering',
      includedLabel: 'INCLUDED',
      totalLabel: 'ESTIMATED TOTAL BUDGET',
      estimatedDurationLabel: 'ESTIMATED TIMELINE',
      weeksUnit: 'wks',
      transferBtn: 'Attach this estimate to inquiry & upload floorplan →',
      approxEurPrefix: 'Approx.',
    },
    contact: {
      sectionTitle: 'Project inquiry & floorplan upload',
      sectionMeta: 'We respond with a technical review within 24 business hours',
      studioLabel: 'ARCHITECTURE & TURNKEY STUDIO',
      offices: 'Warsaw (Mokotowska 49) · Kraków (Zabłocie 23) · Wrocław (Włodkowica 14)',
      phoneLabel: 'DIRECT PHONE',
      emailLabel: 'PROJECT E-MAIL',
      hoursLabel: 'CONSULTATION HOURS',
      hoursValue: 'Mon–Fri: 08:30 – 18:00 CET (remote sessions available)',
      attachedEstimateTitle: 'ATTACHED ESTIMATOR CONFIGURATION',
      detachEstimate: 'Remove',
      fields: {
        fullName: 'Full name *',
        fullNamePlaceholder: 'e.g. Anna Nowak',
        email: 'E-mail address *',
        emailPlaceholder: 'anna@company.com',
        phone: 'Phone number (optional)',
        phonePlaceholder: '+48 600 000 000',
        city: 'Project city (optional)',
        cityPlaceholder: 'e.g. Warsaw, Mokotów',
        message: 'Additional details (key handover date, scope notes)',
        messagePlaceholder: 'Briefly describe the property condition and target start date...',
        attachmentLabel: 'Attach floorplan or interior photo (optional)',
        attachmentHint: 'Drag and drop file here or click to browse · PDF, JPG, PNG, WEBP · max 10 MB',
        attachmentRemove: 'Remove file',
        rodoLabel: 'I consent to data processing for quote preparation per the',
        rodoLink: 'Privacy Policy',
        submitBtn: 'Send inquiry & specification',
        submittingBtn: 'Validating & sending...',
      },
      errors: {
        name_too_short: 'Please enter your full name (at least 2 characters).',
        email_invalid: 'Please enter a valid e-mail address.',
        phone_invalid: 'Phone number must contain at least 7 digits.',
        rodo_required: 'You must accept the Privacy Policy.',
        file_empty: 'The selected file is empty (0 B).',
        file_too_large: 'The file exceeds the maximum allowed size of 10 MB.',
        file_invalid_type: 'Allowed attachment formats: PDF, JPG, PNG, WEBP.',
      },
      successToastTitle: 'Specification received (demo mode)',
      successToastDesc: 'Thank you. All form fields and the attachment passed technical validation.',
      errorToastTitle: 'Please fix the highlighted fields',
    },
    caseStudy: {
      backToPortfolio: '← Back to all projects',
      challengeTitle: 'Engineering challenge & initial condition',
      solutionTitle: 'Executed solution & concealed works',
      materialsTitle: 'Material & system specification (BOQ)',
      beforeAfterTitle: 'Execution comparison: Before & After',
      ctaTitle: 'Planning a similar project?',
      ctaDesc: 'Transfer this project’s floor area directly into the cost estimator to calculate your current budget.',
      ctaBtn: 'Calculate budget for this area →',
    },
    privacy: {
      title: 'Privacy Policy & GDPR',
      updated: 'Last updated: November 17, 2026',
      backHome: '← Back to home page',
      sections: [
        {
          heading: '1. Portfolio Demonstration Scope',
          body: 'This web application is a flagship developer portfolio piece showcasing Next.js App Router, TypeScript, Tailwind CSS, and interactive estimation tools. Contact form submissions are validated in demo mode and are not permanently stored or sold to third parties.',
        },
        {
          heading: '2. Attachment Handling (Floorplans & Photos)',
          body: 'Files selected in the attachment field (PDF, JPG, PNG, WEBP up to 10 MB) are validated locally in the browser for MIME type and file size.',
        },
        {
          heading: '3. Local Browser Storage',
          body: 'Only your selected language (studio_lang) and color theme (studio_theme) preferences are stored in localStorage. No tracking or advertising cookies are used.',
        },
      ],
    },
    footer: {
      tagline: 'Interior architecture and fixed-price turnkey execution in Warsaw, Kraków, and Wrocław.',
      privacyLink: 'Privacy Policy / GDPR',
      rights: '© 2026 KRAWCZYK & PARTNERS. All rights reserved.',
      portfolioNote: 'Portfolio Showcase · Next.js + TypeScript + Tailwind CSS',
    },
  },
};
