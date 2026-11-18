export type ProjectCategory = 'apartments' | 'houses' | 'offices';

export interface BeforeAfterScene {
  id: string;
  label: { pl: string; en: string };
  projectRef: string;
  areaM2: number;
  budgetPLN: number;
  weeks: number;
  beforeImage: string;
  afterImage: string;
  beforeHighlights: { pl: string[]; en: string[] };
  afterHighlights: { pl: string[]; en: string[] };
  beforePalette: { bg: string; accent: string };
  afterPalette: { bg: string; wall: string; wood: string; light: string };
}

export interface ProjectCaseStudy {
  slug: string;
  code: string;
  category: ProjectCategory;
  title: { pl: string; en: string };
  subtitle: { pl: string; en: string };
  city: { pl: string; en: string };
  areaM2: number;
  budgetPLN: number;
  durationWeeks: number;
  year: number;
  image: string;
  summary: { pl: string; en: string };
  challenge: { pl: string; en: string };
  solution: { pl: string; en: string };
  materials: { name: { pl: string; en: string }; spec: { pl: string; en: string } }[];
  scene: BeforeAfterScene;
}

export const BEFORE_AFTER_SCENES: BeforeAfterScene[] = [
  {
    id: 'powisle-living',
    label: { pl: '01 / Salon z aneksem', en: '01 / Living & Kitchen' },
    projectRef: 'REALIZACJA #14 · POWIŚLE',
    areaM2: 94.5,
    budgetPLN: 368000,
    weeks: 11,
    beforeImage: '/images/before-after/powisle-before.jpg',
    afterImage: '/images/before-after/powisle-after.jpg',
    beforeHighlights: {
      pl: [
        '+ Przesunięcie pionów wod-kan pod wyspę',
        '+ Wyciszenie sufitu matą akustyczną 35 dB',
        '+ Rozdzielnica elektryczna 48 mod. + DALI',
      ],
      en: [
        '+ Rerouted plumbing stacks to kitchen island',
        '+ Ceiling acoustic decoupling 35 dB',
        '+ 48-module distribution board + DALI bus',
      ],
    },
    afterHighlights: {
      pl: [
        '+ Fornir dąb wędzony (drzwi ukryte 260 cm)',
        '+ Spiek kwarcowy Taj Mahal 12 mm',
        '+ Oświetlenie szynowe DALI 2700K CRI>95',
      ],
      en: [
        '+ Smoked oak veneer (260 cm flush doors)',
        '+ Taj Mahal 12 mm sintered stone island',
        '+ DALI 2700K CRI>95 recessed track lighting',
      ],
    },
    beforePalette: { bg: '#20221F', accent: '#9E9F99' },
    afterPalette: { bg: '#5A4837', wall: '#8B7259', wood: '#382B20', light: '#F2E0C2' },
  },
  {
    id: 'mokotow-bath',
    label: { pl: '02 / Łazienka główna', en: '02 / Primary Bath' },
    projectRef: 'REALIZACJA #09 · MOKOTÓW',
    areaM2: 14.2,
    budgetPLN: 74000,
    weeks: 6,
    beforeImage: '/images/before-after/mokotow-before.jpg',
    afterImage: '/images/before-after/mokotow-after.jpg',
    beforeHighlights: {
      pl: [
        '+ Hydroizolacja dwuskładnikowa strefy mokrej',
        '+ Zabudowa podtynkowa stelaży i armatury',
        '+ Ogrzewanie podłogowe wodne + mata pod lustrem',
      ],
      en: [
        '+ Two-component liquid waterproofing membrane',
        '+ Concealed cisterns & thermostatic rough-ins',
        '+ Hydronic floor heating + mirror defogger',
      ],
    },
    afterHighlights: {
      pl: [
        '+ Wielkoformatowy trawertyn cięty na 45°',
        '+ Armatura podtynkowa stal szczotkowana',
        '+ Odpływ liniowy szczelinowy w posadzce',
      ],
      en: [
        '+ Large-format mitered travertine slabs (45°)',
        '+ Brushed stainless concealed brassware',
        '+ Flush wall-integrated linear slot drain',
      ],
    },
    beforePalette: { bg: '#1D2022', accent: '#8F969C' },
    afterPalette: { bg: '#4E473E', wall: '#9A8E7D', wood: '#2B2722', light: '#EFE5D6' },
  },
  {
    id: 'krakow-office',
    label: { pl: '03 / Biuro & Sala Zarządu', en: '03 / Executive Office' },
    projectRef: 'REALIZACJA #21 · ZABŁOCIE',
    areaM2: 138,
    budgetPLN: 492000,
    weeks: 12,
    beforeImage: '/images/before-after/zablocie-before.jpg',
    afterImage: '/images/before-after/zablocie-after.jpg',
    beforeHighlights: {
      pl: [
        '+ Trasa kablowa podpodłogowa dla 18 stanowisk',
        '+ Klimatyzacja kanałowa z cichymi nawiewnikami',
        '+ Ściany działowe podwójnie gipsowane (Rw 52 dB)',
      ],
      en: [
        '+ Raised floor power/data trunking (18 desks)',
        '+ Concealed ducted HVAC with linear diffusers',
        '+ Double-board acoustic partitions (Rw 52 dB)',
      ],
    },
    afterHighlights: {
      pl: [
        '+ Przeszklenia akustyczne w czarnych szprosach',
        '+ Zabudowa biblioteczna z orzecha amerykańskiego',
        '+ Czujniki obecności i światła dziennego DALI',
      ],
      en: [
        '+ Acoustic steel-framed glass partitions',
        '+ American walnut floor-to-ceiling shelving',
        '+ Daylight-harvesting DALI presence sensors',
      ],
    },
    beforePalette: { bg: '#1B1C1A', accent: '#888A84' },
    afterPalette: { bg: '#3B342E', wall: '#665B51', wood: '#231D19', light: '#E6D8C3' },
  },
];

export const PROJECTS: ProjectCaseStudy[] = [
  {
    slug: 'apartament-powisle-94',
    code: 'PRJ-014',
    category: 'apartments',
    title: {
      pl: 'Apartament na Powiślu (pod klucz)',
      en: 'Powiśle Turnkey Residence',
    },
    subtitle: {
      pl: 'Stan deweloperski przekształcony w przestrzeń z ukrytymi drzwiami i wyspą ze spieku',
      en: 'Developer shell transformed with flush doors and a monolithic sintered stone island',
    },
    city: { pl: 'Warszawa', en: 'Warsaw' },
    areaM2: 94,
    budgetPLN: 368000,
    durationWeeks: 11,
    year: 2026,
    image: '/images/projects/powisle.jpg',
    summary: {
      pl: 'Kompleksowe przejęcie lokalu od dewelopera: zmiana układu ścian działowych, klimatyzacja kanałowa w suficie podwieszanym i pełna stolarka fornirowana.',
      en: 'Full handover from developer shell: partition reconfiguration, concealed ducted AC in suspended ceilings, and custom oak veneer millwork.',
    },
    challenge: {
      pl: 'Nisko poprowadzone podciągi żelbetowe i brak podejścia wod-kan na środku strefy dziennej uniemożliwiały montaż wyspy bez podnoszenia posadzki.',
      en: 'Low reinforced-concrete beams and missing central plumbing rough-ins initially blocked the kitchen island layout.',
    },
    solution: {
      pl: 'Zaprojektowaliśmy bruzdę technologiczną w wylewce oraz kompaktową strefę obniżenia sufitu wyłącznie nad ciągiem komunikacyjnym, zachowując 282 cm wysokości w salonie.',
      en: 'We routed a recessed floor chase for plumbing and confined the HVAC soffit strictly to the hallway, preserving a 282 cm ceiling height in the living area.',
    },
    materials: [
      {
        name: { pl: 'Stolarka kuchenna i drzwi', en: 'Kitchen & flush doors' },
        spec: { pl: 'Fornir dąb wędzony lakier mat + zawiasy Tectus', en: 'Matte smoked oak veneer + Tectus concealed hinges' },
      },
      {
        name: { pl: 'Blaty i okładzina wyspy', en: 'Countertops & island cladding' },
        spec: { pl: 'Spiek kwarcowy 12 mm cięty pod kątem 45°', en: '12 mm sintered stone with 45° mitered edges' },
      },
      {
        name: { pl: 'System oświetlenia', en: 'Lighting system' },
        spec: { pl: 'Szynoprzewody podtynkowe 48V DALI, 2700K', en: 'Recessed 48V DALI magnetic tracks, 2700K' },
      },
    ],
    scene: BEFORE_AFTER_SCENES[0],
  },
  {
    slug: 'mieszkanie-stary-mokotow-68',
    code: 'PRJ-009',
    category: 'apartments',
    title: {
      pl: 'Kamienica na Starym Mokotowie (generalny remont)',
      en: 'Old Mokotów Tenement Retrofit',
    },
    subtitle: {
      pl: 'Rynek wtórny z 1954 r.: wymiana wszystkich instalacji i renowacja dębowej jodełki',
      en: '1954 secondary market flat: full MEP replacement and original oak herringbone restoration',
    },
    city: { pl: 'Warszawa', en: 'Warsaw' },
    areaM2: 68,
    budgetPLN: 298000,
    durationWeeks: 13,
    year: 2025,
    image: '/images/projects/mokotow.jpg',
    summary: {
      pl: 'Gruntowna przebudowa mieszkania w przedwojennej technologii: skucie starych tynków, nowa instalacja trójfazowa oraz wygłuszenie ściany sąsiedzkiej.',
      en: 'Complete retrofit of a historic brick flat: stripped old plaster, new 3-phase electrical wiring, and acoustic party-wall insulation.',
    },
    challenge: {
      pl: 'Nierówne stropy o odchyleniu do 4,5 cm oraz przestarzała instalacja aluminiowa bez uziemienia.',
      en: 'Slab level deviations up to 4.5 cm and outdated ungrounded aluminum electrical wiring.',
    },
    solution: {
      pl: 'Wypoziomowanie podłoża suchym jastrychem bez obciążania stropu oraz pełne rozprowadzenie nowej elektryki i pionów miedzianych.',
      en: 'Installed lightweight dry screed leveling boards and full copper MEP distribution with zero structural overload.',
    },
    materials: [
      {
        name: { pl: 'Posadzka główna', en: 'Main flooring' },
        spec: { pl: 'Ocalony parkiet dębowy po cyklinowaniu i olejowaniu', en: 'Restored original oak herringbone, matte hardwax oil' },
      },
      {
        name: { pl: 'Łazienka i strefa mokra', en: 'Bathroom slabs' },
        spec: { pl: 'Trawertyn rzymski szlifowany + armatura podtynkowa', en: 'Honed Roman travertine + concealed stainless mixers' },
      },
      {
        name: { pl: 'Izolacja akustyczna', en: 'Acoustic barrier' },
        spec: { pl: 'System przedścianek na wibroizolatorach (54 dB)', en: 'Decoupled acoustic wall lining (54 dB)' },
      },
    ],
    scene: BEFORE_AFTER_SCENES[1],
  },
  {
    slug: 'rezydencja-wola-justowska-215',
    code: 'PRJ-018',
    category: 'houses',
    title: {
      pl: 'Dom na Woli Justowskiej (architektura i wykonawstwo)',
      en: 'Wola Justowska Turnkey Villa',
    },
    subtitle: {
      pl: 'Dwukondygnacyjny dom 215 m² ze schodami wspornikowymi i automatyką KNX',
      en: '215 m² two-story residence with cantilevered oak stairs and KNX automation',
    },
    city: { pl: 'Kraków', en: 'Kraków' },
    areaM2: 215,
    budgetPLN: 890000,
    durationWeeks: 16,
    year: 2026,
    image: '/images/projects/wola-justowska.jpg',
    summary: {
      pl: 'Kompleksowe wykończenie domu jednorodzinnego od stanu surowego zamkniętego wraz z projektem mebli wolnostojących i oświetlenia ogrodowego.',
      en: 'Full interior execution from closed shell stage, including bespoke staircases, custom millwork, and lighting control.',
    },
    challenge: {
      pl: 'Koordynacja 7 niezależnych branż w napiętym 16-tygodniowym oknie przed wprowadzeniem się rodziny.',
      en: 'Coordinating 7 engineering trades within a strict 16-week deadline prior to family move-in.',
    },
    solution: {
      pl: 'Wprowadzenie tygodniowych kamieni milowych i równoległa produkcja stolarki w naszym zakładzie na podstawie skanu 3D już w 3. tygodniu budowy.',
      en: 'Used a week-3 3D laser scan to pre-fabricate all millwork off-site while wet trades were still underway.',
    },
    materials: [
      {
        name: { pl: 'Schody wspornikowe', en: 'Cantilevered stairs' },
        spec: { pl: 'Konstrukcja stalowa ukryta w ścianie + trepy dębowe', en: 'Concealed steel stringers + solid white oak treads' },
      },
      {
        name: { pl: 'Tynki dekoracyjne', en: 'Wall finishes' },
        spec: { pl: 'Mineralny mikrocement wapienny (klasa zmywalności 1)', en: 'Mineral lime microcement (scrub class 1)' },
      },
      {
        name: { pl: 'Automatyka domu', en: 'Home automation' },
        spec: { pl: 'System KNX + integracja rekuperacji i rolet', en: 'KNX bus integrating HVAC, shading, and DALI scenes' },
      },
    ],
    scene: BEFORE_AFTER_SCENES[0],
  },
  {
    slug: 'blizniak-biskupin-156',
    code: 'PRJ-012',
    category: 'houses',
    title: {
      pl: 'Dom na Biskupinie (wapień jurajski i jesion)',
      en: 'Biskupin House in Stone and Ash',
    },
    subtitle: {
      pl: 'Minimalistyczny dom rodzinny wykończony jesionem termowanym i szczotkowanym wapieniem',
      en: 'Minimalist family house finished in thermo-ash millwork and brushed limestone',
    },
    city: { pl: 'Wrocław', en: 'Wrocław' },
    areaM2: 156,
    budgetPLN: 612000,
    durationWeeks: 14,
    year: 2025,
    image: '/images/projects/biskupin.jpg',
    summary: {
      pl: 'Projekt wykonawczy i realizacja pod klucz domu o powierzchni 156 m² z wyeksponowanym sufitem żelbetowym i ukrytą spiżarnią.',
      en: 'Technical design and turnkey delivery of a 156 m² home featuring exposed architectural concrete and a concealed pantry.',
    },
    challenge: {
      pl: 'Wysokie przeszklenia tarasowe generowały pogłos w otwartej strefie dziennej o kubaturze ponad 240 m³.',
      en: 'Floor-to-ceiling terrace glazing caused severe acoustic reverberation in the 240 m³ open living space.',
    },
    solution: {
      pl: 'Zastosowanie perforowanych paneli akustycznych z forniru jesionowego na tylnej ścianie kuchni oraz ciężkich zasłon na szynach podtynkowych.',
      en: 'Integrated micro-perforated thermo-ash acoustic paneling and recessed curtain tracks.',
    },
    materials: [
      {
        name: { pl: 'Zabudowa dzienna', en: 'Living millwork' },
        spec: { pl: 'Fornir jesion termowany + okucia Blum Legrabox', en: 'Thermo-ash veneer + Blum Legrabox hardware' },
      },
      {
        name: { pl: 'Posadzki parteru', en: 'Ground floor' },
        spec: { pl: 'Wylewka żywiczna poliuretanowa matowa bezfugowa', en: 'Jointless matte polyurethane resin flooring' },
      },
      {
        name: { pl: 'Kominek i strefa TV', en: 'Fireplace wall' },
        spec: { pl: 'Wapień jurajski szczotkowany grubości 20 mm', en: '20 mm brushed Jura limestone slabs' },
      },
    ],
    scene: BEFORE_AFTER_SCENES[1],
  },
  {
    slug: 'biuro-kancelarii-zablocie-138',
    code: 'PRJ-021',
    category: 'offices',
    title: {
      pl: 'Siedziba Kancelarii Prawnej na Zabłociu (B2B)',
      en: 'Law Firm Headquarters at Zabłocie (B2B)',
    },
    subtitle: {
      pl: 'Przestrzeń biurowa klasy A: przeszklenia akustyczne 47 dB i sala konferencyjna',
      en: 'Class-A corporate interior with 47 dB acoustic glass partitions and boardroom',
    },
    city: { pl: 'Kraków', en: 'Kraków' },
    areaM2: 138,
    budgetPLN: 492000,
    durationWeeks: 12,
    year: 2026,
    image: '/images/projects/zablocie.jpg',
    summary: {
      pl: 'Kompleksowa adaptacja lokalu komercyjnego na 4 gabinety partnerskie, strefę open-space dla 12 prawników oraz wyciszoną salę zarządu.',
      en: 'Turnkey fit-out of a commercial floor into 4 partner offices, a 12-desk workspace, and a soundproof boardroom.',
    },
    challenge: {
      pl: 'Rygorystyczne wymogi poufności rozmów w gabinetach przy jednoczesnym zachowaniu dostępu światła dziennego w głębi traktu.',
      en: 'Strict speech-privacy requirements while maintaining natural daylight penetration across the deep floorplate.',
    },
    solution: {
      pl: 'Podwójnie szklone ściany systemowe z folią akustyczną PVB oraz uszczelkami opadającymi w drzwiach.',
      en: 'Double-glazed acoustic system partitions with PVB acoustic interlayers and drop-down door seals.',
    },
    materials: [
      {
        name: { pl: 'Ściany przeszklone', en: 'Glazed partitions' },
        spec: { pl: 'Profile aluminiowe antracyt + szkło 47 dB Rw', en: 'Anthracite aluminum frames + 47 dB Rw glass' },
      },
      {
        name: { pl: 'Strefa wejścia i biblioteka', en: 'Reception & library' },
        spec: { pl: 'Orzech amerykański + stal walcowana na gorąco', en: 'American walnut + hot-rolled blackened steel' },
      },
      {
        name: { pl: 'Wykładzina obiektowa', en: 'Commercial flooring' },
        spec: { pl: 'Płytki dywanowe o pochłanianiu dźwięku 31 dB', en: 'Acoustic modular carpet tiles (31 dB impact rating)' },
      },
    ],
    scene: BEFORE_AFTER_SCENES[2],
  },
  {
    slug: 'showroom-medyczny-centrum-110',
    code: 'PRJ-019',
    category: 'offices',
    title: {
      pl: 'Klinika Medycyny Estetycznej w Centrum',
      en: 'Aesthetic Medicine Clinic Fit-Out',
    },
    subtitle: {
      pl: 'Lokal usługowy 110 m² zgodny z wymogami Sanepid i o wysokim standardzie wykończenia',
      en: '110 m² clinical fit-out meeting strict sanitary regulations with architectural finish',
    },
    city: { pl: 'Warszawa', en: 'Warsaw' },
    areaM2: 110,
    budgetPLN: 445000,
    durationWeeks: 11,
    year: 2025,
    image: '/images/projects/klinika.jpg',
    summary: {
      pl: 'Projekt technologiczny oraz realizacja pod klucz 4 gabinetów zabiegowych, recepcji z monolitu kompozytowego i zaplecza sterylizacji.',
      en: 'Technical planning and turnkey build of 4 treatment suites, a monolithic solid-surface reception, and sterilization room.',
    },
    challenge: {
      pl: 'Spełnienie rygorystycznych norm wentylacji mechanicznej, zmywalności powierzchni i odbioru Sanepid w krótkim terminie.',
      en: 'Satisfying strict medical HVAC air-exchange and hygienic surface regulations on a tight commercial lease schedule.',
    },
    solution: {
      pl: 'Bezspoinowe okładziny mineralne i kompozytowe w gabinetach połączone z ciepłym oświetleniem w strefie poczekalni.',
      en: 'Jointless solid-surface wall cladding in clinical suites paired with warm 2700K indirect lighting in patient lounges.',
    },
    materials: [
      {
        name: { pl: 'Recepcja i blaty', en: 'Reception & clinical tops' },
        spec: { pl: 'Kompozyt mineralny termoformowany bezspoinowo', en: 'Jointless thermoformed mineral solid surface' },
      },
      {
        name: { pl: 'Wentylacja i klimatyzacja', en: 'Clinical HVAC' },
        spec: { pl: 'Centrala z filtracją HEPA i odzyskiem ciepła', en: 'HEPA-filtered heat-recovery ventilation unit' },
      },
      {
        name: { pl: 'Posadzki gabinetowe', en: 'Clinical flooring' },
        spec: { pl: 'Spiek wielkoformatowy antypoślizgowy R10', en: 'Anti-slip R10 large-format porcelain slabs' },
      },
    ],
    scene: BEFORE_AFTER_SCENES[2],
  },
];
