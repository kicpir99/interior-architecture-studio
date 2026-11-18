export interface TeamMember {
  id: string;
  name: string;
  initials: string;
  image: string;
  role: { pl: string; en: string };
  credentials: { pl: string; en: string };
  bio: { pl: string; en: string };
  projectsCount: number;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'marek-krawczyk',
    name: 'arch. Marek Krawczyk',
    initials: 'MK',
    image: '/images/team/marek-krawczyk.jpg',
    role: {
      pl: 'Architekt Prowadzący / Partner Zarządzający',
      en: 'Lead Architect / Managing Partner',
    },
    credentials: {
      pl: 'Uprawnienia architektoniczne nr MA-1482 · 14 lat praktyki',
      en: 'Licensed Architect MA-1482 · 14 yrs experience',
    },
    bio: {
      pl: 'Odpowiada za koncepcję przestrzenną, ergonomię układów oraz dobór materiałów naturalnych. Prowadził ponad 90 realizacji apartamentowych i biurowych.',
      en: 'Leads spatial concepts, layout ergonomics, and natural material curation across more than 90 residential and commercial commissions.',
    },
    projectsCount: 94,
  },
  {
    id: 'karolina-zielinska',
    name: 'inż. Karolina Zielińska',
    initials: 'KZ',
    image: '/images/team/karolina-zielinska.jpg',
    role: {
      pl: 'Kierownik Realizacji Pod Klucz',
      en: 'Head of Turnkey Execution',
    },
    credentials: {
      pl: 'Uprawnienia budowlane konstrukcyjno-budowlane · PMP',
      en: 'Licensed Site Engineer · PMP Certified',
    },
    bio: {
      pl: 'Spina harmonogramy ekip, logistykę dostaw oraz odbiory zanikowe. Pilnuje dyscypliny budżetowej i terminów przekazania kluczy.',
      en: 'Manages trade schedules, material logistics, and concealed-work inspections, keeping every project on budget and on schedule.',
    },
    projectsCount: 78,
  },
  {
    id: 'tomasz-nowicki',
    name: 'mgr inż. Tomasz Nowicki',
    initials: 'TN',
    image: '/images/team/tomasz-nowicki.jpg',
    role: {
      pl: 'Projektant Instalacji i Automatyki DALI',
      en: 'MEP & DALI Automation Engineer',
    },
    credentials: {
      pl: 'Specjalista HVAC, DALI & Smart Home KNX',
      en: 'HVAC, DALI Lighting & KNX Specialist',
    },
    bio: {
      pl: 'Projektuje niewidoczne systemy klimatyzacji kanałowej, rekuperacji, akustyki sufitowej oraz programuje sceny świetlne.',
      en: 'Engineers concealed ducted AC, ventilation, acoustic ceilings, and architectural DALI lighting scenes.',
    },
    projectsCount: 65,
  },
  {
    id: 'piotr-adamski',
    name: 'Piotr Adamski',
    initials: 'PA',
    image: '/images/team/piotr-adamski.jpg',
    role: {
      pl: 'Szef Stolarni i Zabudów Na Wymiar',
      en: 'Master Joiner & Millwork Lead',
    },
    credentials: {
      pl: '18 lat doświadczenia w fornirach i spiekach kwarcowych',
      en: '18 yrs in architectural veneer & sintered stone',
    },
    bio: {
      pl: 'Nadzoruje pomiary laserowe pod zabudowy kuchenne, drzwi ukryte oraz precyzyjne łączenia kamienia i stali szczotkowanej.',
      en: 'Oversees laser templating for kitchens, concealed doors, and precision stone-and-metal joinery.',
    },
    projectsCount: 112,
  },
];
