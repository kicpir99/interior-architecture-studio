'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/language-context';
import type { AddonId, PropertyCondition } from '@/lib/calculator';

interface AxonometricPreviewProps {
  areaM2: number;
  condition: PropertyCondition;
  addons: AddonId[];
}

type TypologyId = 'apartment' | 'house' | 'office';
type StageLevel = 1 | 2 | 3;

interface StageConfig {
  id: string;
  typology: TypologyId;
  level: StageLevel;
  src: string;
  minArea: number;
  maxArea: number;
  pillPl: string;
  pillEn: string;
  titlePl: string;
  titleEn: string;
  zonesPl: string[];
  zonesEn: string[];
}

interface WingLayerSpec {
  src: string;
  clipPath: string;
  tx: string;
  ty: string;
  wipeTop: string;
  wipeRight: string;
  wipeBottom: string;
  wipeLeft: string;
  scanTx: string;
  scanTy: string;
  seamPath: string;
}

interface TypologyMediaSpec {
  id: TypologyId;
  baseSrc: string;
  altPl: string;
  altEn: string;
  wing2: WingLayerSpec;
  wing3: WingLayerSpec;
}

const TYPOLOGY_MEDIA: TypologyMediaSpec[] = [
  {
    id: 'apartment',
    baseSrc: '/images/calculator/apt-s1.jpg',
    altPl: 'Apartament — bryła główna',
    altEn: 'Apartment — core studio',
    wing2: {
      src: '/images/calculator/apt-s2.jpg',
      clipPath:
        'polygon(30.2% 68.6%, 53.8% 49.6%, 76.0% 67.5%, 76.0% 71.5%, 51.25% 94.6%, 30.2% 77.0%)',
      tx: '24px',
      ty: '14px',
      wipeTop: '28%',
      wipeRight: '0%',
      wipeBottom: '0%',
      wipeLeft: '24%',
      scanTx: '68px',
      scanTy: '40px',
      seamPath: 'M 362 615 L 646 444 L 912 605',
    },
    wing3: {
      src: '/images/calculator/apt-s3.jpg',
      clipPath:
        'polygon(1.8% 63.0%, 10.0% 56.0%, 32.5% 74.5%, 32.5% 85.5%, 20.5% 86.5%, 1.8% 71.0%)',
      tx: '-22px',
      ty: '13px',
      wipeTop: '18%',
      wipeRight: '26%',
      wipeBottom: '0%',
      wipeLeft: '0%',
      scanTx: '-58px',
      scanTy: '34px',
      seamPath: 'M 118 537 L 360 686',
    },
  },
  {
    id: 'house',
    baseSrc: '/images/calculator/house-s1.jpg',
    altPl: 'Dom jednorodzinny — bryła główna',
    altEn: 'Single-family house — core volume',
    wing2: {
      src: '/images/calculator/house-s2.jpg',
      clipPath:
        'polygon(40.4% 71.0%, 82.9% 32.1%, 96.3% 42.5%, 96.3% 58.0%, 54.6% 95.4%, 40.4% 82.0%)',
      tx: '26px',
      ty: '15px',
      wipeTop: '24%',
      wipeRight: '0%',
      wipeBottom: '0%',
      wipeLeft: '28%',
      scanTx: '82px',
      scanTy: '48px',
      seamPath: 'M 485 636 L 995 288',
    },
    wing3: {
      src: '/images/calculator/house-s3.jpg',
      clipPath:
        'polygon(0% 49.0%, 13.0% 55.0%, 36.5% 73.5%, 41.0% 78.0%, 41.0% 92.0%, 0% 92.0%)',
      tx: '-24px',
      ty: '14px',
      wipeTop: '18%',
      wipeRight: '28%',
      wipeBottom: '0%',
      wipeLeft: '0%',
      scanTx: '-64px',
      scanTy: '38px',
      seamPath: 'M 156 502 L 425 668',
    },
  },
  {
    id: 'office',
    baseSrc: '/images/calculator/office-s1.jpg',
    altPl: 'Biuro B2B — moduł bazowy',
    altEn: 'B2B office — base studio',
    wing2: {
      src: '/images/calculator/office-s2.jpg',
      clipPath:
        'polygon(32.5% 61.0%, 44.2% 51.4%, 62.0% 65.2%, 62.0% 77.5%, 50.0% 90.8%, 32.5% 77.8%)',
      tx: '-22px',
      ty: '13px',
      wipeTop: '22%',
      wipeRight: '22%',
      wipeBottom: '0%',
      wipeLeft: '0%',
      scanTx: '-60px',
      scanTy: '36px',
      seamPath: 'M 394 548 L 530 462 L 738 587',
    },
    wing3: {
      src: '/images/calculator/office-s3.jpg',
      clipPath:
        'polygon(61.8% 80.2%, 61.8% 65.5%, 49.6% 55.6%, 76.3% 33.0%, 76.3% 25.2%, 95.8% 40.5%, 95.8% 57.5%)',
      tx: '26px',
      ty: '15px',
      wipeTop: '20%',
      wipeRight: '0%',
      wipeBottom: '0%',
      wipeLeft: '28%',
      scanTx: '78px',
      scanTy: '45px',
      seamPath: 'M 740 710 L 740 587 L 595 498 L 916 296 L 916 232',
    },
  },
];

const STAGES: StageConfig[] = [
  {
    id: 'apt-1',
    typology: 'apartment',
    level: 1,
    src: '/images/calculator/apt-s1.jpg',
    minArea: 25,
    maxArea: 44,
    pillPl: '25–44 m² · Studio',
    pillEn: '25–44 m² · Studio',
    titlePl: 'STADIUM 01 · APARTAMENT STUDIO',
    titleEn: 'STAGE 01 · STUDIO APARTMENT',
    zonesPl: ['Salon dzienny', 'Kuchnia z wyspą', 'Łazienka'],
    zonesEn: ['Living room', 'Kitchen + island', 'Bathroom'],
  },
  {
    id: 'apt-2',
    typology: 'apartment',
    level: 2,
    src: '/images/calculator/apt-s2.jpg',
    minArea: 45,
    maxArea: 61,
    pillPl: '45–61 m² · +Sypialnia',
    pillEn: '45–61 m² · +Bedroom',
    titlePl: 'STADIUM 02 · MIESZKANIE 2-POKOJOWE',
    titleEn: 'STAGE 02 · 2-ROOM APARTMENT',
    zonesPl: ['Salon dzienny', 'Kuchnia z wyspą', 'Łazienka', '+ Sypialnia z szafą'],
    zonesEn: ['Living room', 'Kitchen + island', 'Bathroom', '+ Bedroom + wardrobe'],
  },
  {
    id: 'apt-3',
    typology: 'apartment',
    level: 3,
    src: '/images/calculator/apt-s3.jpg',
    minArea: 62,
    maxArea: 79,
    pillPl: '62–79 m² · +Taras',
    pillEn: '62–79 m² · +Terrace',
    titlePl: 'STADIUM 03 · APARTAMENT Z TARASEM',
    titleEn: 'STAGE 03 · APARTMENT WITH TERRACE',
    zonesPl: ['Salon dzienny', 'Kuchnia', 'Łazienka', 'Sypialnia', '+ Taras drewniany'],
    zonesEn: ['Living room', 'Kitchen', 'Bathroom', 'Bedroom', '+ Timber terrace'],
  },
  {
    id: 'house-1',
    typology: 'house',
    level: 1,
    src: '/images/calculator/house-s1.jpg',
    minArea: 80,
    maxArea: 99,
    pillPl: '80–99 m² · Bryła główna',
    pillEn: '80–99 m² · Core volume',
    titlePl: 'STADIUM 01 · DOM PARTEROWY / TRZON',
    titleEn: 'STAGE 01 · HOUSE CORE VOLUME',
    zonesPl: ['Strefa dzienna', 'Kuchnia z wyspą', 'Hol ze schodami', 'Sypialnia Master'],
    zonesEn: ['Living hall', 'Island kitchen', 'Staircase core', 'Master suite'],
  },
  {
    id: 'house-2',
    typology: 'house',
    level: 2,
    src: '/images/calculator/house-s2.jpg',
    minArea: 100,
    maxArea: 122,
    pillPl: '100–122 m² · +Skrzydło prywatne',
    pillEn: '100–122 m² · +Bedroom wing',
    titlePl: 'STADIUM 02 · DOM ZE SKRZYDŁEM SYPIALNYM',
    titleEn: 'STAGE 02 · HOUSE + PRIVATE WING',
    zonesPl: ['Strefa dzienna', 'Sypialnia Master', '+ 2 sypialnie prywatne', '+ Pokój kąpielowy'],
    zonesEn: ['Living hall', 'Master suite', '+ 2 private bedrooms', '+ Main bathroom'],
  },
  {
    id: 'house-3',
    typology: 'house',
    level: 3,
    src: '/images/calculator/house-s3.jpg',
    minArea: 123,
    maxArea: 149,
    pillPl: '123–149 m² · +Taras ogrodowy',
    pillEn: '123–149 m² · +Garden deck',
    titlePl: 'STADIUM 03 · REZYDENCJA Z TARASEM',
    titleEn: 'STAGE 03 · FULL RESIDENCE + DECK',
    zonesPl: ['Strefa dzienna', '3 sypialnie', '2 łazienki', '+ Taras wypoczynkowy'],
    zonesEn: ['Living hall', '3 bedrooms', '2 bathrooms', '+ Timber garden deck'],
  },
  {
    id: 'office-1',
    typology: 'office',
    level: 1,
    src: '/images/calculator/office-s1.jpg',
    minArea: 150,
    maxArea: 179,
    pillPl: '150–179 m² · Moduł bazowy',
    pillEn: '150–179 m² · Base studio',
    titlePl: 'STADIUM 01 · BIURO KOMPAKTOWE B2B',
    titleEn: 'STAGE 01 · COMPACT B2B OFFICE',
    zonesPl: ['Recepcja', 'Sala zarządu', 'Kuchnia socjalna', 'Gabinet Partnerski'],
    zonesEn: ['Reception', 'Boardroom', 'Social kitchen', 'Partner Suite'],
  },
  {
    id: 'office-2',
    typology: 'office',
    level: 2,
    src: '/images/calculator/office-s2.jpg',
    minArea: 180,
    maxArea: 214,
    pillPl: '180–214 m² · +Sala konferencyjna',
    pillEn: '180–214 m² · +Glass conf. room',
    titlePl: 'STADIUM 02 · BIURO + SALA KONFERENCYJNA',
    titleEn: 'STAGE 02 · OFFICE + GLASS CONF. ROOM',
    zonesPl: ['Recepcja', 'Sala zarządu', 'Gabinet I', '+ Sala konferencyjna'],
    zonesEn: ['Reception', 'Boardroom', 'Suite I', '+ Glass conference hall'],
  },
  {
    id: 'office-3',
    typology: 'office',
    level: 3,
    src: '/images/calculator/office-s3.jpg',
    minArea: 215,
    maxArea: 250,
    pillPl: '215–250 m² · +Open-Space & Gabinet II',
    pillEn: '215–250 m² · +Open-Space & Suite II',
    titlePl: 'STADIUM 03 · PEŁNE PIĘTRO KORPORACYJNE',
    titleEn: 'STAGE 03 · FULL CORPORATE FLOOR',
    zonesPl: ['Recepcja', '2 sale spotkań', '+ Skrzydło Open-Space', '+ Gabinet Partnerski II'],
    zonesEn: ['Reception', '2 meeting halls', '+ Open-Space wing', '+ Partner Suite II'],
  },
];

interface LineDef {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  minLevel?: StageLevel;
}

interface OverlayPolygon {
  points: string;
  seamLines?: LineDef[];
  minLevel?: StageLevel;
}

interface GlowPool {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  minLevel?: StageLevel;
}

interface LightCone {
  points: string;
  minLevel?: StageLevel;
}

interface FcuBoxSpec {
  top: string;
  left: string;
  right: string;
  cx: number;
  cy: number;
}

interface CalloutBadgeSpec {
  boxX: number;
  boxY: number;
  targetX: number;
  targetY: number;
  level1Target?: { x: number; y: number };
  textPl: string;
  textEn: string;
}

interface TypologyOverlaySpec {
  carpentry: OverlayPolygon[];
  carpentryCallout: CalloutBadgeSpec;
  fcuUnit: FcuBoxSpec;
  acGrilles: LineDef[];
  acDucts: { d: string; minLevel?: StageLevel }[];
  acFlows: LineDef[];
  acCallout: CalloutBadgeSpec;
  daliTracks: LineDef[];
  daliNodes: { cx: number; cy: number; minLevel?: StageLevel }[];
  daliCones: LightCone[];
  daliGlows: GlowPool[];
  daliCallout: CalloutBadgeSpec;
  demolitionWalls: OverlayPolygon[];
  wetZones: OverlayPolygon[];
  demolitionCallout: CalloutBadgeSpec;
}

const OVERLAY_SPECS: Record<TypologyId, TypologyOverlaySpec> = {
  apartment: {
    carpentry: [
      {
        points: '568,94 652,144 652,272 568,222',
        seamLines: [{ x1: 610, y1: 119, x2: 610, y2: 247 }],
      },
      {
        points: '652,144 768,214 768,284 652,214',
        seamLines: [
          { x1: 690, y1: 167, x2: 690, y2: 237 },
          { x1: 730, y1: 191, x2: 730, y2: 261 },
        ],
      },
      {
        points: '638,248 765,324 765,358 638,282',
        seamLines: [{ x1: 682, y1: 274, x2: 682, y2: 308 }],
      },
      { points: '768,214 824,248 824,344 768,310' },
      { points: '578,314 618,290 730,358 688,384' },
      {
        points: '578,314 688,384 688,436 578,368',
        seamLines: [
          { x1: 615, y1: 337, x2: 615, y2: 391 },
          { x1: 652, y1: 361, x2: 652, y2: 414 },
        ],
      },
      { points: '688,384 730,358 730,410 688,436' },
      {
        points: '668,466 822,560 822,632 668,538',
        minLevel: 2,
        seamLines: [
          { x1: 706, y1: 489, x2: 706, y2: 561, minLevel: 2 },
          { x1: 745, y1: 513, x2: 745, y2: 585, minLevel: 2 },
          { x1: 784, y1: 537, x2: 784, y2: 609, minLevel: 2 },
        ],
      },
    ],
    carpentryCallout: {
      boxX: 28,
      boxY: 82,
      targetX: 602,
      targetY: 205,
      textPl: 'KUCHNIA + WYSPA (FORNIR DĄB)',
      textEn: 'KITCHEN + ISLAND (SMOKED OAK)',
    },
    fcuUnit: {
      top: '772,324 830,290 888,324 830,358',
      left: '772,324 830,358 830,382 772,348',
      right: '830,358 888,324 888,348 830,382',
      cx: 830,
      cy: 334,
    },
    acGrilles: [
      { x1: 215, y1: 316, x2: 345, y2: 238 },
      { x1: 395, y1: 208, x2: 515, y2: 136 },
      { x1: 475, y1: 558, x2: 585, y2: 492, minLevel: 2 },
    ],
    acDucts: [
      { d: 'M 815 322 L 645 220 L 285 272' },
      { d: 'M 645 220 L 455 172' },
      { d: 'M 815 322 L 646 444 L 530 524', minLevel: 2 },
    ],
    acFlows: [
      { x1: 262, y1: 300, x2: 298, y2: 350 },
      { x1: 440, y1: 194, x2: 472, y2: 244 },
      { x1: 516, y1: 548, x2: 548, y2: 598, minLevel: 2 },
    ],
    acCallout: {
      boxX: 790,
      boxY: 28,
      targetX: 830,
      targetY: 324,
      textPl: 'CENTRALA FCU + NAWIEWY LINIOWE',
      textEn: 'CONCEALED FCU + SLOT DIFFUSERS',
    },
    daliTracks: [
      { x1: 255, y1: 372, x2: 545, y2: 202 },
      { x1: 595, y1: 285, x2: 705, y2: 350 },
      { x1: 912, y1: 312, x2: 992, y2: 360 },
      { x1: 555, y1: 560, x2: 695, y2: 642, minLevel: 2 },
    ],
    daliNodes: [
      { cx: 285, cy: 354 },
      { cx: 395, cy: 290 },
      { cx: 498, cy: 230 },
      { cx: 618, cy: 299 },
      { cx: 680, cy: 335 },
      { cx: 932, cy: 324 },
      { cx: 972, cy: 348 },
      { cx: 582, cy: 576, minLevel: 2 },
      { cx: 668, cy: 626, minLevel: 2 },
    ],
    daliCones: [
      { points: '255,372 475,244 495,382 238,478' },
      { points: '595,285 705,350 718,412 580,368' },
      { points: '912,312 992,360 996,422 902,380' },
      { points: '555,560 695,642 706,690 524,634', minLevel: 2 },
    ],
    daliGlows: [
      { cx: 305, cy: 465, rx: 148, ry: 94 },
      { cx: 642, cy: 365, rx: 120, ry: 78 },
      { cx: 942, cy: 382, rx: 95, ry: 65 },
      { cx: 618, cy: 632, rx: 120, ry: 78, minLevel: 2 },
    ],
    daliCallout: {
      boxX: 28,
      boxY: 28,
      targetX: 395,
      targetY: 290,
      textPl: 'SZYNOPRZEWÓD DALI 2700K',
      textEn: 'DALI MAGNETIC TRACK 2700K',
    },
    demolitionWalls: [
      {
        points: '762,430 928,528 928,588 762,490',
        seamLines: [
          { x1: 762, y1: 430, x2: 928, y2: 588 },
          { x1: 928, y1: 528, x2: 762, y2: 490 },
        ],
      },
      {
        points: '412,598 646,456 646,535 412,676',
        minLevel: 2,
        seamLines: [
          { x1: 412, y1: 598, x2: 646, y2: 535, minLevel: 2 },
          { x1: 646, y1: 456, x2: 412, y2: 676, minLevel: 2 },
        ],
      },
    ],
    wetZones: [{ points: '805,345 918,275 1055,358 942,428' }],
    demolitionCallout: {
      boxX: 28,
      boxY: 136,
      targetX: 845,
      targetY: 508,
      textPl: 'WYBURZENIA + PIONY WOD-KAN',
      textEn: 'DEMOLITION + NEW MEP RISERS',
    },
  },
  house: {
    carpentry: [
      { points: '468,256 594,334 564,354 440,276' },
      {
        points: '440,276 564,354 564,394 440,314',
        seamLines: [
          { x1: 482, y1: 302, x2: 482, y2: 342 },
          { x1: 524, y1: 328, x2: 524, y2: 368 },
        ],
      },
      { points: '594,294 632,270 670,294 632,318' },
      { points: '594,294 632,318 632,356 594,332' },
      { points: '402,336 444,310 554,386 512,416' },
      {
        points: '402,336 512,416 512,458 402,378',
        seamLines: [
          { x1: 438, y1: 362, x2: 438, y2: 404 },
          { x1: 475, y1: 389, x2: 475, y2: 431 },
        ],
      },
      { points: '512,416 554,386 554,426 512,458' },
      { points: '708,604 726,592 786,630 768,642', minLevel: 2 },
      {
        points: '708,604 768,642 768,690 708,652',
        minLevel: 2,
        seamLines: [{ x1: 738, y1: 623, x2: 738, y2: 671, minLevel: 2 }],
      },
      { points: '768,642 786,630 786,676 768,690', minLevel: 2 },
      { points: '544,650 606,606 618,614 556,658', minLevel: 2 },
      {
        points: '556,658 618,614 618,638 556,682',
        minLevel: 2,
        seamLines: [{ x1: 587, y1: 636, x2: 587, y2: 660, minLevel: 2 }],
      },
    ],
    carpentryCallout: {
      boxX: 28,
      boxY: 82,
      targetX: 465,
      targetY: 360,
      textPl: 'KUCHNIA + ZABUDOWY NA WYMIAR',
      textEn: 'BESPOKE KITCHEN + JOINERY',
    },
    fcuUnit: {
      top: '648,290 708,252 768,288 708,326',
      left: '648,290 708,326 708,350 648,314',
      right: '708,326 768,288 768,312 708,350',
      cx: 708,
      cy: 300,
    },
    acGrilles: [
      { x1: 210, y1: 395, x2: 345, y2: 310 },
      { x1: 718, y1: 108, x2: 815, y2: 168 },
      { x1: 945, y1: 365, x2: 1030, y2: 418, minLevel: 2 },
      { x1: 825, y1: 562, x2: 925, y2: 498, minLevel: 2 },
    ],
    acDucts: [
      { d: 'M 695 288 L 505 192 L 285 346' },
      { d: 'M 695 288 L 768 140' },
      { d: 'M 695 288 L 875 418 L 988 392', minLevel: 2 },
      { d: 'M 875 418 L 875 530', minLevel: 2 },
    ],
    acFlows: [
      { x1: 262, y1: 378, x2: 298, y2: 425 },
      { x1: 755, y1: 145, x2: 728, y2: 192 },
      { x1: 975, y1: 398, x2: 948, y2: 445, minLevel: 2 },
    ],
    acCallout: {
      boxX: 790,
      boxY: 28,
      targetX: 708,
      targetY: 290,
      textPl: 'CENTRALA FCU + REKUPERACJA',
      textEn: 'CENTRAL FCU + HRV DUCTWORK',
    },
    daliTracks: [
      { x1: 242, y1: 438, x2: 425, y2: 325 },
      { x1: 395, y1: 325, x2: 518, y2: 402 },
      { x1: 655, y1: 168, x2: 765, y2: 232 },
      { x1: 816, y1: 274, x2: 896, y2: 324 },
      { x1: 596, y1: 642, x2: 686, y2: 698, minLevel: 2 },
      { x1: 742, y1: 484, x2: 832, y2: 538, minLevel: 2 },
      { x1: 915, y1: 380, x2: 1010, y2: 438, minLevel: 2 },
    ],
    daliNodes: [
      { cx: 282, cy: 413 },
      { cx: 365, cy: 362 },
      { cx: 432, cy: 348 },
      { cx: 488, cy: 383 },
      { cx: 708, cy: 199 },
      { cx: 836, cy: 286 },
      { cx: 876, cy: 311 },
      { cx: 618, cy: 655, minLevel: 2 },
      { cx: 664, cy: 684, minLevel: 2 },
      { cx: 764, cy: 497, minLevel: 2 },
      { cx: 810, cy: 525, minLevel: 2 },
      { cx: 942, cy: 396, minLevel: 2 },
      { cx: 984, cy: 422, minLevel: 2 },
    ],
    daliCones: [
      { points: '242,438 425,325 438,485 268,518' },
      { points: '395,325 518,402 522,462 378,402' },
      { points: '655,168 765,232 762,272 645,235' },
      { points: '816,274 896,324 898,376 806,334' },
      { points: '596,642 686,698 694,744 586,698', minLevel: 2 },
      { points: '742,484 832,538 836,592 732,548', minLevel: 2 },
      { points: '915,380 1010,438 1005,478 898,422', minLevel: 2 },
    ],
    daliGlows: [
      { cx: 345, cy: 472, rx: 145, ry: 92 },
      { cx: 452, cy: 388, rx: 118, ry: 74 },
      { cx: 695, cy: 215, rx: 115, ry: 72 },
      { cx: 856, cy: 332, rx: 90, ry: 60 },
      { cx: 642, cy: 682, rx: 110, ry: 70, minLevel: 2 },
      { cx: 785, cy: 545, rx: 95, ry: 64, minLevel: 2 },
      { cx: 958, cy: 422, rx: 110, ry: 70, minLevel: 2 },
    ],
    daliCallout: {
      boxX: 28,
      boxY: 28,
      targetX: 334,
      targetY: 381,
      textPl: 'DALI 2700K + SCENY ŚWIETLNE',
      textEn: 'DALI 2700K + ARCHITECTURAL SCENES',
    },
    demolitionWalls: [
      {
        points: '578,258 664,202 664,294 578,350',
        seamLines: [
          { x1: 578, y1: 258, x2: 664, y2: 294 },
          { x1: 664, y1: 202, x2: 578, y2: 350 },
        ],
      },
      {
        points: '702,488 805,420 805,502 702,570',
        minLevel: 2,
        seamLines: [
          { x1: 702, y1: 488, x2: 805, y2: 502, minLevel: 2 },
          { x1: 805, y1: 420, x2: 702, y2: 570, minLevel: 2 },
        ],
      },
    ],
    wetZones: [{ points: '805,260 895,202 965,248 875,305' }],
    demolitionCallout: {
      boxX: 28,
      boxY: 136,
      targetX: 755,
      targetY: 495,
      level1Target: { x: 621, y: 276 },
      textPl: 'PRZEBUDOWA ŚCIAN + PIONY',
      textEn: 'WALL REBUILD + NEW PLUMBING',
    },
  },
  office: {
    carpentry: [
      {
        points: '82,412 198,336 198,408 82,484',
        seamLines: [
          { x1: 111, y1: 393, x2: 111, y2: 465 },
          { x1: 140, y1: 374, x2: 140, y2: 446 },
          { x1: 169, y1: 355, x2: 169, y2: 427 },
        ],
      },
      { points: '195,456 214,470 214,502 195,488' },
      { points: '214,470 274,434 274,466 214,502' },
      { points: '205,463 264,428 274,434 214,470' },
      {
        points: '648,86 758,152 758,192 648,126',
        seamLines: [{ x1: 703, y1: 119, x2: 703, y2: 159 }],
      },
      { points: '648,150 740,206 718,220 628,164' },
      {
        points: '628,164 718,220 718,244 628,188',
        seamLines: [{ x1: 673, y1: 192, x2: 673, y2: 216 }],
      },
      { points: '624,194 694,236 676,248 606,206' },
      { points: '606,206 676,248 676,274 606,232' },
      { points: '728,258 794,218 806,226 740,266' },
      {
        points: '740,266 806,226 806,256 740,296',
        seamLines: [{ x1: 773, y1: 246, x2: 773, y2: 276 }],
      },
      { points: '822,238 894,282 882,290 810,246' },
      {
        points: '810,246 882,290 882,320 810,276',
        seamLines: [{ x1: 846, y1: 268, x2: 846, y2: 298 }],
      },
      { points: '784,274 854,316 836,328 766,286' },
      { points: '766,286 836,328 836,356 766,314' },
      { points: '900,368 960,330 970,336 910,374', minLevel: 3 },
      {
        points: '910,374 970,336 970,366 910,404',
        minLevel: 3,
        seamLines: [{ x1: 940, y1: 355, x2: 940, y2: 385, minLevel: 3 }],
      },
      { points: '990,334 1080,388 1068,396 978,342', minLevel: 3 },
      {
        points: '978,342 1068,396 1068,426 978,372',
        minLevel: 3,
        seamLines: [{ x1: 1023, y1: 369, x2: 1023, y2: 399, minLevel: 3 }],
      },
      { points: '964,370 1042,416 1020,432 942,386', minLevel: 3 },
      { points: '942,386 1020,432 1020,460 942,414', minLevel: 3 },
    ],
    carpentryCallout: {
      boxX: 28,
      boxY: 82,
      targetX: 235,
      targetY: 465,
      textPl: 'RECEPCJA + ZABUDOWY B2B',
      textEn: 'RECEPTION + EXECUTIVE JOINERY',
    },
    fcuUnit: {
      top: '505,172 565,134 625,172 565,210',
      left: '505,172 565,210 565,232 505,194',
      right: '565,210 625,172 625,194 565,232',
      cx: 565,
      cy: 180,
    },
    acGrilles: [
      { x1: 272, y1: 322, x2: 425, y2: 228 },
      { x1: 825, y1: 220, x2: 920, y2: 280 },
      { x1: 445, y1: 515, x2: 575, y2: 595, minLevel: 2 },
      { x1: 985, y1: 320, x2: 1082, y2: 382, minLevel: 3 },
    ],
    acDucts: [
      { d: 'M 565 170 L 350 274' },
      { d: 'M 565 170 L 872 250' },
      { d: 'M 595 452 L 512 555', minLevel: 2 },
      { d: 'M 725 445 L 1032 352', minLevel: 3 },
    ],
    acFlows: [
      { x1: 332, y1: 300, x2: 368, y2: 348 },
      { x1: 865, y1: 256, x2: 835, y2: 304 },
      { x1: 495, y1: 560, x2: 528, y2: 608, minLevel: 2 },
      { x1: 1022, y1: 356, x2: 990, y2: 404, minLevel: 3 },
    ],
    acCallout: {
      boxX: 790,
      boxY: 28,
      targetX: 565,
      targetY: 174,
      textPl: 'SYSTEM VRF + NAWIEWY B2B',
      textEn: 'COMMERCIAL VRF + SLOT DIFFUSERS',
    },
    daliTracks: [
      { x1: 184, y1: 456, x2: 256, y2: 412 },
      { x1: 315, y1: 378, x2: 468, y2: 284 },
      { x1: 555, y1: 422, x2: 655, y2: 482 },
      { x1: 784, y1: 236, x2: 864, y2: 286 },
      { x1: 510, y1: 584, x2: 626, y2: 654, minLevel: 2 },
      { x1: 780, y1: 446, x2: 880, y2: 508, minLevel: 3 },
      { x1: 712, y1: 498, x2: 812, y2: 560, minLevel: 3 },
      { x1: 968, y1: 348, x2: 1048, y2: 398, minLevel: 3 },
    ],
    daliNodes: [
      { cx: 220, cy: 434 },
      { cx: 348, cy: 358 },
      { cx: 435, cy: 304 },
      { cx: 580, cy: 437 },
      { cx: 630, cy: 467 },
      { cx: 824, cy: 261 },
      { cx: 568, cy: 619, minLevel: 2 },
      { cx: 805, cy: 462, minLevel: 3 },
      { cx: 855, cy: 493, minLevel: 3 },
      { cx: 737, cy: 514, minLevel: 3 },
      { cx: 787, cy: 545, minLevel: 3 },
      { cx: 1008, cy: 373, minLevel: 3 },
    ],
    daliCones: [
      { points: '184,456 256,412 258,480 175,512' },
      { points: '315,378 468,284 465,420 325,440' },
      { points: '555,422 655,482 648,540 542,480' },
      { points: '784,236 864,286 858,348 768,308' },
      { points: '510,584 626,654 615,725 495,665', minLevel: 2 },
      { points: '780,446 880,508 874,566 766,504', minLevel: 3 },
      { points: '712,498 812,560 806,618 698,556', minLevel: 3 },
      { points: '968,348 1048,398 1042,458 954,418', minLevel: 3 },
    ],
    daliGlows: [
      { cx: 215, cy: 495, rx: 115, ry: 74 },
      { cx: 386, cy: 392, rx: 145, ry: 92 },
      { cx: 598, cy: 482, rx: 118, ry: 74 },
      { cx: 815, cy: 315, rx: 120, ry: 76 },
      { cx: 565, cy: 675, rx: 135, ry: 85, minLevel: 2 },
      { cx: 822, cy: 510, rx: 118, ry: 74, minLevel: 3 },
      { cx: 754, cy: 562, rx: 118, ry: 74, minLevel: 3 },
      { cx: 1002, cy: 422, rx: 115, ry: 74, minLevel: 3 },
    ],
    daliCallout: {
      boxX: 28,
      boxY: 28,
      targetX: 392,
      targetY: 332,
      textPl: 'OPRAWY LINIOWE DALI B2B',
      textEn: 'LINEAR DALI LIGHTING SYSTEM',
    },
    demolitionWalls: [
      {
        points: '396,206 545,302 545,392 396,296',
        seamLines: [
          { x1: 396, y1: 206, x2: 545, y2: 392 },
          { x1: 545, y1: 302, x2: 396, y2: 296 },
        ],
      },
      {
        points: '695,252 828,334 828,408 695,326',
        seamLines: [
          { x1: 695, y1: 252, x2: 828, y2: 408 },
          { x1: 828, y1: 334, x2: 695, y2: 326 },
        ],
      },
    ],
    wetZones: [{ points: '475,150 565,92 622,128 532,186' }],
    demolitionCallout: {
      boxX: 28,
      boxY: 136,
      targetX: 472,
      targetY: 298,
      textPl: 'REARANŻACJA + FLOORBOXY MEP',
      textEn: 'FIT-OUT + FLOORBOX REWIRING',
    },
  },
};

function getActiveStage(areaM2: number): StageConfig {
  return (
    STAGES.find((stage) => areaM2 >= stage.minArea && areaM2 <= stage.maxArea) ??
    STAGES[1]
  );
}

interface WingImageLayerProps {
  wing: WingLayerSpec;
  alt: string;
  isVisible: boolean;
  wasVisited: boolean;
  zClass: string;
}

function WingImageLayer({ wing, alt, isVisible, wasVisited, zClass }: WingImageLayerProps) {
  let stateClass = 'opacity-0 pointer-events-none';
  if (isVisible) {
    stateClass = 'axon-wing-enter';
  } else if (wasVisited) {
    stateClass = 'axon-wing-exit pointer-events-none';
  }

  return (
    <div
      className={`absolute inset-0 ${zClass} ${stateClass}`}
      style={
        {
          clipPath: wing.clipPath,
          '--wing-tx': wing.tx,
          '--wing-ty': wing.ty,
        } as React.CSSProperties
      }
      aria-hidden={!isVisible}
    >
      <div
        className="relative w-full h-full axon-wing-wipe"
        style={
          {
            '--wipe-top': wing.wipeTop,
            '--wipe-right': wing.wipeRight,
            '--wipe-bottom': wing.wipeBottom,
            '--wipe-left': wing.wipeLeft,
          } as React.CSSProperties
        }
      >
        <Image
          src={wing.src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          loading="eager"
          className="object-cover"
        />
      </div>
    </div>
  );
}

interface WingSeamLaserProps {
  wing: WingLayerSpec;
  isVisible: boolean;
  wasVisited: boolean;
}

function WingSeamLaser({ wing, isVisible, wasVisited }: WingSeamLaserProps) {
  if (!isVisible && !wasVisited) {
    return null;
  }

  const groupClass = isVisible ? 'axon-seam-group-enter' : 'axon-seam-group-exit';

  return (
    <g className={groupClass}>
      <path
        d={wing.seamPath}
        fill="none"
        stroke="#C83E2B"
        strokeWidth="2.8"
        strokeLinecap="square"
        className="axon-cad-laser-sweep"
        style={
          {
            '--scan-tx': wing.scanTx,
            '--scan-ty': wing.scanTy,
          } as React.CSSProperties
        }
      />
      <path
        d={wing.seamPath}
        pathLength={100}
        fill="none"
        stroke="#C83E2B"
        strokeOpacity="0.48"
        strokeWidth="5.5"
        strokeLinecap="square"
        className="axon-seam-pulse"
      />
      <path
        d={wing.seamPath}
        pathLength={100}
        fill="none"
        stroke="#F6D5A9"
        strokeWidth="2"
        strokeLinecap="square"
        className="axon-seam-pulse"
      />
    </g>
  );
}

interface SvgCalloutBadgeProps {
  callout: CalloutBadgeSpec;
  lang: 'pl' | 'en';
  level?: StageLevel;
  accent: string;
  textColor: string;
}

function SvgCalloutBadge({
  callout,
  lang,
  level,
  accent,
  textColor,
}: SvgCalloutBadgeProps) {
  const label = lang === 'pl' ? callout.textPl : callout.textEn;
  const width = Math.round(Math.max(255, label.length * 11.4 + 28));
  const boxX = Math.min(callout.boxX, 1172 - width);
  const resolvedTarget =
    level === 1 && callout.level1Target
      ? callout.level1Target
      : { x: callout.targetX, y: callout.targetY };
  const anchorX = Math.min(Math.max(resolvedTarget.x, boxX), boxX + width);
  const anchorY = resolvedTarget.y >= callout.boxY + 19 ? callout.boxY + 38 : callout.boxY;

  return (
    <g>
      <line
        x1={anchorX}
        y1={anchorY}
        x2={resolvedTarget.x}
        y2={resolvedTarget.y}
        stroke={accent}
        strokeWidth="1.8"
        strokeDasharray="5 4"
        strokeOpacity="0.88"
      />
      <circle
        cx={resolvedTarget.x}
        cy={resolvedTarget.y}
        r="5.5"
        fill={accent}
        stroke="#10110F"
        strokeWidth="2"
      />
      <rect
        x={boxX}
        y={callout.boxY}
        width={width}
        height={38}
        rx="2"
        fill="#161715"
        fillOpacity="0.94"
        stroke={accent}
        strokeWidth="1.6"
      />
      <text
        x={boxX + 14}
        y={callout.boxY + 25}
        fill={textColor}
        fontSize="18.5"
        fontWeight="600"
        fontFamily="monospace"
        letterSpacing="0.8"
      >
        {label}
      </text>
    </g>
  );
}

export function AxonometricPreview({
  areaM2,
  condition,
  addons,
}: AxonometricPreviewProps) {
  const { lang } = useLanguage();
  const activeStage = getActiveStage(areaM2);
  const typologyStages = STAGES.filter((s) => s.typology === activeStage.typology);
  const spec = OVERLAY_SPECS[activeStage.typology];
  const level = activeStage.level;

  const [visitedTypologies, setVisitedTypologies] = useState<TypologyId[]>(() => [
    activeStage.typology,
  ]);
  const [visitedWings, setVisitedWings] = useState<string[]>(() => {
    const initial: string[] = [];
    if (activeStage.level >= 2) initial.push(`${activeStage.typology}-2`);
    if (activeStage.level >= 3) initial.push(`${activeStage.typology}-3`);
    return initial;
  });
  const [seamWings, setSeamWings] = useState<string[]>(() => {
    const initial: string[] = [];
    if (activeStage.level >= 2) initial.push(`${activeStage.typology}-2`);
    if (activeStage.level >= 3) initial.push(`${activeStage.typology}-3`);
    return initial;
  });

  useEffect(() => {
    const prefix = `${activeStage.typology}-`;
    const activeKeys: string[] = [];
    if (activeStage.level >= 2) activeKeys.push(`${prefix}2`);
    if (activeStage.level >= 3) activeKeys.push(`${prefix}3`);

    const frameId = requestAnimationFrame(() => {
      setVisitedTypologies((prev) =>
        prev.includes(activeStage.typology) ? prev : [...prev, activeStage.typology]
      );
      setVisitedWings((prev) => {
        const next = [...prev];
        for (const k of activeKeys) {
          if (!next.includes(k)) next.push(k);
        }
        return next.length === prev.length ? prev : next;
      });
      setSeamWings((prev) => {
        const next = prev.filter((w) => w.startsWith(prefix));
        for (const k of activeKeys) {
          if (!next.includes(k)) next.push(k);
        }
        return next.length === prev.length && next.every((v, i) => v === prev[i])
          ? prev
          : next;
      });
    });

    const cleanupTimer = setTimeout(() => {
      setSeamWings((prev) =>
        prev.length === activeKeys.length &&
        activeKeys.every((v, i) => v === prev[i])
          ? prev
          : activeKeys
      );
      setVisitedWings((prev) =>
        prev.length === activeKeys.length &&
        activeKeys.every((v, i) => v === prev[i])
          ? prev
          : activeKeys
      );
    }, 480);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(cleanupTimer);
    };
  }, [activeStage.typology, activeStage.level]);

  const hasCarpentry = addons.includes('custom_carpentry');
  const hasDuctedAc = addons.includes('ducted_ac');
  const hasSmartDali = addons.includes('smart_dali');
  const isSecondary = condition === 'secondary';

  const visibleByLevel = <T extends { minLevel?: StageLevel }>(items: T[]) =>
    items.filter((item) => !item.minLevel || level >= item.minLevel);

  const zones = lang === 'pl' ? activeStage.zonesPl : activeStage.zonesEn;

  return (
    <div className="mb-4 bg-[#10110F] border border-[var(--border-dark)] rounded-[2px] overflow-hidden">
      <div className="px-4 py-2.5 border-b border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono tracking-wider text-white/70">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#C83E2B]" />
          <span className="text-white font-medium uppercase">
            {lang === 'pl' ? activeStage.titlePl : activeStage.titleEn}
          </span>
        </div>
        <span className="text-white/60">{areaM2} m²</span>
      </div>
      <div className="relative w-full aspect-[1200/896] bg-[#10110F] overflow-hidden select-none isolate">
        {TYPOLOGY_MEDIA.map((media) => {
          const isActiveTypology = media.id === activeStage.typology;
          const wasTypologyVisited = visitedTypologies.includes(media.id);
          const typologyAnimClass = isActiveTypology
            ? 'axon-typology-enter z-20'
            : wasTypologyVisited
              ? 'axon-typology-exit pointer-events-none z-10'
              : 'opacity-0 pointer-events-none z-0';

          return (
            <div
              key={media.id}
              className={`absolute inset-0 ${typologyAnimClass}`}
              aria-hidden={!isActiveTypology}
            >
              <div
                className={`relative w-full h-full ${
                  isActiveTypology ? `axon-recoil-${level}` : ''
                }`}
              >
                <div className="absolute inset-0 z-10">
                  <Image
                    src={media.baseSrc}
                    alt={lang === 'pl' ? media.altPl : media.altEn}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    loading="eager"
                    className="object-cover"
                  />
                </div>
                <WingImageLayer
                  wing={media.wing2}
                  alt={lang === 'pl' ? media.altPl : media.altEn}
                  isVisible={isActiveTypology && level >= 2}
                  wasVisited={visitedWings.includes(`${media.id}-2`)}
                  zClass="z-20"
                />
                <WingImageLayer
                  wing={media.wing3}
                  alt={lang === 'pl' ? media.altPl : media.altEn}
                  isVisible={isActiveTypology && level >= 3}
                  wasVisited={visitedWings.includes(`${media.id}-3`)}
                  zClass="z-30"
                />
                {isActiveTypology && (
                  <svg
                    viewBox="0 0 1200 896"
                    className="absolute inset-0 w-full h-full pointer-events-none z-40"
                    aria-hidden="true"
                  >
                    <defs>
                      <radialGradient id="dali-warm-glow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#FFE5B8" stopOpacity="0.52" />
                        <stop offset="52%" stopColor="#F5B461" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#F5B461" stopOpacity="0" />
                      </radialGradient>
                      <linearGradient id="dali-cone-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#FFE8BE" stopOpacity="0.34" />
                        <stop offset="100%" stopColor="#F5B461" stopOpacity="0.02" />
                      </linearGradient>
                      <linearGradient id="oak-veneer-fill" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#9A5B2A" stopOpacity="0.54" />
                        <stop offset="100%" stopColor="#5C3114" stopOpacity="0.64" />
                      </linearGradient>
                      <pattern
                        id="demolition-hatch"
                        width="14"
                        height="14"
                        patternTransform="rotate(45)"
                        patternUnits="userSpaceOnUse"
                      >
                        <rect width="14" height="14" fill="#C83E2B" fillOpacity="0.24" />
                        <line
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="14"
                          stroke="#E85A46"
                          strokeWidth="2.4"
                          strokeOpacity="0.72"
                        />
                      </pattern>
                      <pattern
                        id="wet-grid-hatch"
                        width="18"
                        height="18"
                        patternUnits="userSpaceOnUse"
                      >
                        <rect width="18" height="18" fill="#C83E2B" fillOpacity="0.14" />
                        <path
                          d="M 18 0 L 0 0 0 18"
                          fill="none"
                          stroke="#F08A7B"
                          strokeWidth="1"
                          strokeOpacity="0.45"
                        />
                      </pattern>
                      <marker
                        id="ac-arrow"
                        markerWidth="6"
                        markerHeight="6"
                        refX="3"
                        refY="3"
                        orient="auto"
                      >
                        <path d="M0,1 L5,3 L0,5 Z" fill="#9EE0F7" fillOpacity="0.92" />
                      </marker>
                    </defs>
                    <WingSeamLaser
                      wing={media.wing2}
                      isVisible={isActiveTypology && level >= 2}
                      wasVisited={seamWings.includes(`${media.id}-2`)}
                    />
                    <WingSeamLaser
                      wing={media.wing3}
                      isVisible={isActiveTypology && level >= 3}
                      wasVisited={seamWings.includes(`${media.id}-3`)}
                    />
                    <g
                      className={`transition-opacity duration-300 ${
                        isSecondary ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      {visibleByLevel(spec.wetZones).map((zone, idx) => (
                        <polygon
                          key={`wet-${idx}`}
                          points={zone.points}
                          fill="url(#wet-grid-hatch)"
                          stroke="#F08A7B"
                          strokeWidth="1.6"
                          strokeDasharray="6 4"
                        />
                      ))}
                      {visibleByLevel(spec.demolitionWalls).map((wall, idx) => (
                        <g key={`demo-${idx}`}>
                          <polygon
                            points={wall.points}
                            fill="url(#demolition-hatch)"
                            stroke="#E85A46"
                            strokeWidth="2.4"
                          />
                          {visibleByLevel(wall.seamLines ?? []).map((s, sIdx) => (
                            <line
                              key={`demo-x-${sIdx}`}
                              x1={s.x1}
                              y1={s.y1}
                              x2={s.x2}
                              y2={s.y2}
                              stroke="#F28C7E"
                              strokeWidth="1.6"
                              strokeDasharray="6 4"
                              strokeOpacity="0.85"
                            />
                          ))}
                        </g>
                      ))}
                      <SvgCalloutBadge
                        callout={spec.demolitionCallout}
                        lang={lang}
                        level={level}
                        accent="#E85A46"
                        textColor="#F8C2BA"
                      />
                    </g>
                    <g
                      className={`transition-opacity duration-300 ${
                        hasCarpentry ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      {visibleByLevel(spec.carpentry).map((poly, idx) => (
                        <g key={`carp-${idx}`}>
                          <polygon
                            points={poly.points}
                            fill="url(#oak-veneer-fill)"
                            stroke="#E5B076"
                            strokeWidth="1.8"
                            strokeOpacity="0.92"
                          />
                          {visibleByLevel(poly.seamLines ?? []).map((seam, sIdx) => (
                            <line
                              key={`carp-seam-${sIdx}`}
                              x1={seam.x1}
                              y1={seam.y1}
                              x2={seam.x2}
                              y2={seam.y2}
                              stroke="#F6D5A9"
                              strokeOpacity="0.72"
                              strokeWidth="1.4"
                            />
                          ))}
                        </g>
                      ))}
                      <SvgCalloutBadge
                        callout={spec.carpentryCallout}
                        lang={lang}
                        accent="#E5B076"
                        textColor="#FAE3C2"
                      />
                    </g>
                    <g
                      className={`transition-opacity duration-300 ${
                        hasDuctedAc ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      {visibleByLevel(spec.acDucts).map((duct, idx) => (
                        <g key={`duct-${idx}`}>
                          <path
                            d={duct.d}
                            fill="none"
                            stroke="#14262E"
                            strokeOpacity="0.82"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d={duct.d}
                            fill="none"
                            stroke="#8CD6F0"
                            strokeOpacity="0.85"
                            strokeWidth="2.8"
                            strokeDasharray="10 6"
                            strokeLinecap="round"
                          />
                        </g>
                      ))}
                      {/* 3D isometric FCU central fan-coil unit box */}
                      <g>
                        <polygon
                          points={spec.fcuUnit.left}
                          fill="#1B3540"
                          stroke="#8CD6F0"
                          strokeWidth="1.6"
                        />
                        <polygon
                          points={spec.fcuUnit.right}
                          fill="#12242C"
                          stroke="#8CD6F0"
                          strokeWidth="1.6"
                        />
                        <polygon
                          points={spec.fcuUnit.top}
                          fill="#2B4F5E"
                          stroke="#B4EBFC"
                          strokeWidth="1.8"
                        />
                        <text
                          x={spec.fcuUnit.cx}
                          y={spec.fcuUnit.cy + 5}
                          textAnchor="middle"
                          fill="#E6F8FF"
                          fontSize="13"
                          fontWeight="700"
                          fontFamily="monospace"
                        >
                          FCU
                        </text>
                      </g>
                      {visibleByLevel(spec.acGrilles).map((grille, idx) => (
                        <g key={`grille-${idx}`}>
                          <line
                            x1={grille.x1}
                            y1={grille.y1}
                            x2={grille.x2}
                            y2={grille.y2}
                            stroke="#161D20"
                            strokeWidth="11"
                            strokeLinecap="square"
                          />
                          <line
                            x1={grille.x1}
                            y1={grille.y1}
                            x2={grille.x2}
                            y2={grille.y2}
                            stroke="#9EE0F7"
                            strokeOpacity="0.95"
                            strokeWidth="3"
                          />
                        </g>
                      ))}
                      {visibleByLevel(spec.acFlows).map((flow, idx) => (
                        <line
                          key={`flow-${idx}`}
                          x1={flow.x1}
                          y1={flow.y1}
                          x2={flow.x2}
                          y2={flow.y2}
                          stroke="#9EE0F7"
                          strokeOpacity="0.9"
                          strokeWidth="2.4"
                          markerEnd="url(#ac-arrow)"
                        />
                      ))}
                      <SvgCalloutBadge
                        callout={spec.acCallout}
                        lang={lang}
                        accent="#8CD6F0"
                        textColor="#DCF4FD"
                      />
                    </g>
                    <g
                      className={`transition-opacity duration-300 ${
                        hasSmartDali ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      {visibleByLevel(spec.daliCones).map((cone, idx) => (
                        <polygon
                          key={`cone-${idx}`}
                          points={cone.points}
                          fill="url(#dali-cone-grad)"
                          style={{ mixBlendMode: 'screen' }}
                        />
                      ))}
                      {visibleByLevel(spec.daliGlows).map((glow, idx) => (
                        <ellipse
                          key={`glow-${idx}`}
                          cx={glow.cx}
                          cy={glow.cy}
                          rx={glow.rx}
                          ry={glow.ry}
                          fill="url(#dali-warm-glow)"
                          style={{ mixBlendMode: 'screen' }}
                        />
                      ))}
                      {visibleByLevel(spec.daliTracks).map((track, idx) => (
                        <g key={`track-${idx}`}>
                          <line
                            x1={track.x1}
                            y1={track.y1}
                            x2={track.x2}
                            y2={track.y2}
                            stroke="#161715"
                            strokeWidth="7"
                          />
                          <line
                            x1={track.x1}
                            y1={track.y1}
                            x2={track.x2}
                            y2={track.y2}
                            stroke="#FFE6BA"
                            strokeWidth="2.6"
                          />
                        </g>
                      ))}
                      {visibleByLevel(spec.daliNodes).map((node, idx) => (
                        <circle
                          key={`node-${idx}`}
                          cx={node.cx}
                          cy={node.cy}
                          r="4.5"
                          fill="#FFF5DC"
                          stroke="#F5B461"
                          strokeWidth="1.5"
                        />
                      ))}
                      <SvgCalloutBadge
                        callout={spec.daliCallout}
                        lang={lang}
                        accent="#FFE5B8"
                        textColor="#FFF2D6"
                      />
                    </g>
                  </svg>
                )}
              </div>
            </div>
          );
        })}
        {(isSecondary || hasCarpentry || hasDuctedAc || hasSmartDali) && (
          <div className="absolute bottom-3 left-3 right-3 z-30 flex flex-wrap gap-1.5 pointer-events-none">
            {isSecondary && (
              <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-[#10110F]/90 border border-[#C83E2B] text-[#F28C7E] rounded-[2px]">
                {lang === 'pl' ? 'Stan wtórny' : 'Renovation'}
              </span>
            )}
            {hasCarpentry && (
              <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-[#10110F]/90 border border-[#E5B076]/70 text-[#F6D5A9] rounded-[2px]">
                {lang === 'pl' ? 'Fornir dąb wędzony' : 'Smoked oak joinery'}
              </span>
            )}
            {hasDuctedAc && (
              <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-[#10110F]/90 border border-[#8CD6F0]/70 text-[#B4EBFC] rounded-[2px]">
                {lang === 'pl' ? 'Nawiewniki szczelinowe' : 'Concealed HVAC'}
              </span>
            )}
            {hasSmartDali && (
              <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-[#10110F]/90 border border-[#FFE5B8]/70 text-[#FFE5B8] rounded-[2px]">
                DALI 2700K
              </span>
            )}
          </div>
        )}
      </div>
      <div className="px-4 py-3 border-t border-white/10 space-y-2.5">
        <div className="grid grid-cols-3 gap-1.5">
          {typologyStages.map((stage) => {
            const current = stage.id === activeStage.id;
            return (
              <div
                key={stage.id}
                className={`px-2 py-1 text-[10px] font-mono tracking-wide border rounded-[2px] truncate text-center transition-colors ${
                  current
                    ? 'border-[#C83E2B] bg-[#C83E2B]/15 text-white'
                    : 'border-white/10 bg-white/[0.02] text-white/45'
                }`}
              >
                {lang === 'pl' ? stage.pillPl : stage.pillEn}
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-mono text-white/65">
          <span className="uppercase text-white/40">
            {lang === 'pl' ? 'Strefy:' : 'Zones:'}
          </span>
          {zones.map((zone) => {
            const isAdded = zone.startsWith('+');
            return (
              <span
                key={zone}
                className={isAdded ? 'text-[#E5B076] font-medium' : 'text-white/75'}
              >
                {zone}
              </span>
            );
          })}
        </div>

        <div className="pt-2.5 border-t border-white/10">
          <p className="border-l-2 border-[#C83E2B]/75 pl-2.5 text-[11px] leading-relaxed font-mono text-white/65">
            <span className="inline-block mr-2 px-1.5 py-0.5 text-[9.5px] tracking-wider uppercase bg-[#C83E2B]/20 text-[#F6D5A9] border border-[#C83E2B]/40 rounded-[2px]">
              {lang === 'pl' ? 'Model poglądowy' : 'Illustrative model'}
            </span>
            {lang === 'pl'
              ? 'Układ stref (np. dodatkowy pokój, skrzydło sypialne, taras czy sala spotkań) prezentuje przykładowy przyrost skali dla wybranego metrażu — finalna funkcja i podział pomieszczeń zależą od indywidualnego projektu lokalu.'
              : 'The zones shown (e.g., extra bedroom, private wing, terrace, or conference hall) demonstrate sample spatial scale for the selected area — final room layout and function are tailored individually.'}
          </p>
        </div>
      </div>
    </div>
  );
}
