import type { CalculatorBreakdown, CalculatorState } from './calculator';

export type SchedulePhaseId =
  | 'concept'
  | 'demolition'
  | 'mep'
  | 'carpentry_prod'
  | 'finishing'
  | 'handover'
  | 'technical_docs'
  | 'boq_tender';

export interface SchedulePhase {
  id: SchedulePhaseId;
  index: string;
  titlePl: string;
  titleEn: string;
  detailPl: string;
  detailEn: string;
  startWeek: number;
  durationWeeks: number;
  endWeek: number;
  isCritical: boolean;
  isParallel: boolean;
}

export interface PaymentTranche {
  id: string;
  step: string;
  titlePl: string;
  titleEn: string;
  triggerWeek: number;
  percentage: number;
  amountPLN: number;
  milestonePl: string;
  milestoneEn: string;
}

export interface InvestmentSchedule {
  totalWeeks: number;
  parallelWeeksSaved: number;
  phases: SchedulePhase[];
  tranches: PaymentTranche[];
}

function allocateTranches(
  totalPLN: number,
  defs: Omit<PaymentTranche, 'amountPLN'>[]
): PaymentTranche[] {
  let allocated = 0;
  return defs.map((def, idx) => {
    const isLast = idx === defs.length - 1;
    const amountPLN = isLast
      ? Math.max(0, totalPLN - allocated)
      : Math.round((totalPLN * def.percentage) / 100);
    allocated += amountPLN;
    return { ...def, amountPLN };
  });
}

export function buildInvestmentSchedule(
  state: CalculatorState,
  breakdown: CalculatorBreakdown
): InvestmentSchedule {
  const totalWeeks = breakdown.estimatedWeeks;
  const isSecondary = state.condition === 'secondary';
  const hasCarpentry = state.addons.includes('custom_carpentry');
  const hasDuctedAc = state.addons.includes('ducted_ac');
  const hasSmartDali = state.addons.includes('smart_dali');

  if (state.tier === 'design_only') {
    const conceptWeeks = Math.max(2, Math.round(totalWeeks * 0.35));
    const techWeeks = Math.max(2, Math.round(totalWeeks * 0.4));
    const boqWeeks = Math.max(1, totalWeeks - conceptWeeks - techWeeks);

    const phases: SchedulePhase[] = [
      {
        id: 'concept',
        index: '01',
        titlePl: 'Pomiary i układ funkcjonalny',
        titleEn: 'Site scan & layout concept',
        detailPl: 'Mierzymy lokal laserem, układamy podział pomieszczeń 2D i przygotowujemy wizualizacje 3D.',
        detailEn: 'We laser-scan the space, lock the 2D room layout, and prepare 3D renders.',
        startWeek: 1,
        durationWeeks: conceptWeeks,
        endWeek: conceptWeeks,
        isCritical: true,
        isParallel: false,
      },
      {
        id: 'technical_docs',
        index: '02',
        titlePl: 'Rysunki dla ekip i stolarza',
        titleEn: 'Technical & MEP drawings',
        detailPl: `Rozrysowujemy gniazdka, oświetlenie${hasSmartDali ? ' DALI' : ''}, przyłącza${hasDuctedAc ? ' i kanały klimatyzacji' : ''} oraz wymiary mebli.`,
        detailEn: `Detailed plans for wiring${hasSmartDali ? ' (DALI)' : ''}, plumbing${hasDuctedAc ? ', HVAC ducts' : ''}, and built-in furniture.`,
        startWeek: conceptWeeks + 1,
        durationWeeks: techWeeks,
        endWeek: conceptWeeks + techWeeks,
        isCritical: true,
        isParallel: false,
      },
      {
        id: 'boq_tender',
        index: '03',
        titlePl: 'Lista zakupów i kosztorys',
        titleEn: 'Shopping list & final budget',
        detailPl: 'Dostajesz tabelę materiałów z konkretnymi modelami, cenami oraz kompletem rysunków dla wykonawców.',
        detailEn: 'You get an itemized material spreadsheet with exact SKUs and contractor-ready blueprints.',
        startWeek: conceptWeeks + techWeeks + 1,
        durationWeeks: boqWeeks,
        endWeek: totalWeeks,
        isCritical: true,
        isParallel: false,
      },
    ];

    const tranches = allocateTranches(breakdown.totalPLN, [
      {
        id: 't1',
        step: 'I',
        titlePl: 'Na start projektu',
        titleEn: 'Project kick-off',
        triggerWeek: 1,
        percentage: 40,
        milestonePl: 'Po podpisaniu umowy i pomiarach',
        milestoneEn: 'At contract & laser survey',
      },
      {
        id: 't2',
        step: 'II',
        titlePl: 'Po akceptacji rzutów',
        titleEn: 'After drawing sign-off',
        triggerWeek: conceptWeeks + 1,
        percentage: 40,
        milestonePl: 'Gdy zatwierdzisz układ i instalacje',
        milestoneEn: 'Once layout & MEP plans are approved',
      },
      {
        id: 't3',
        step: 'III',
        titlePl: 'Przy oddaniu dokumentacji',
        titleEn: 'On final delivery',
        triggerWeek: totalWeeks,
        percentage: 20,
        milestonePl: 'Przekazanie kosztorysu i rysunków',
        milestoneEn: 'Final blueprints & BOQ handover',
      },
    ]);

    return { totalWeeks, parallelWeeksSaved: 0, phases, tranches };
  }

  const conceptWeeks = state.areaM2 >= 150 ? 3 : 2;
  const demolitionWeeks = isSecondary ? 2 : 0;
  const handoverWeeks = 1;
  const remainingWeeks = Math.max(
    4,
    totalWeeks - conceptWeeks - demolitionWeeks - handoverWeeks
  );
  const mepWeeks = Math.max(2, Math.floor(remainingWeeks * 0.42));
  const finishingWeeks = Math.max(2, remainingWeeks - mepWeeks);

  const phases: SchedulePhase[] = [];
  let cursor = 1;

  phases.push({
    id: 'concept',
    index: '01',
    titlePl: 'Projekt wykonawczy i zamówienia',
    titleEn: 'Blueprints & material orders',
    detailPl: 'Dopięcie rysunków technicznych oraz zamówienie płytek, kamienia i armatury z dłuższym czasem dostawy.',
    detailEn: 'Finalizing contractor drawings and ordering long-lead stone, tiles, and fixtures.',
    startWeek: cursor,
    durationWeeks: conceptWeeks,
    endWeek: cursor + conceptWeeks - 1,
    isCritical: true,
    isParallel: false,
  });
  cursor += conceptWeeks;

  if (isSecondary) {
    phases.push({
      id: 'demolition',
      index: '02',
      titlePl: 'Wyburzenia i skucie starych warstw',
      titleEn: 'Demolition & strip-out',
      detailPl: 'Rozbiórka zbędnych ścian, skucie starej glazury w łazienkach i wyrównanie podłoża.',
      detailEn: 'Removing old partitions, stripping bathroom tiles, and leveling subfloors.',
      startWeek: cursor,
      durationWeeks: demolitionWeeks,
      endWeek: cursor + demolitionWeeks - 1,
      isCritical: true,
      isParallel: false,
    });
    cursor += demolitionWeeks;
  }

  const mepStart = cursor;
  const mepNotes: string[] = [];
  if (hasDuctedAc) mepNotes.push('HVAC');
  if (hasSmartDali) mepNotes.push('DALI');
  const mepSuffix = mepNotes.length > 0 ? ` (${mepNotes.join(' + ')})` : '';

  phases.push({
    id: 'mep',
    index: isSecondary ? '03' : '02',
    titlePl: `Instalacje i sufity G-K${mepSuffix}`,
    titleEn: `Wiring, plumbing & drywall${mepSuffix}`,
    detailPl: 'Nowe przewody, hydraulika, kanały klimatyzacji, zabudowy G-K i gładzie pod malowanie.',
    detailEn: 'New wiring, plumbing, AC ducting, suspended ceilings, and wall prep.',
    startWeek: mepStart,
    durationWeeks: mepWeeks,
    endWeek: mepStart + mepWeeks - 1,
    isCritical: true,
    isParallel: false,
  });
  cursor += mepWeeks;

  let parallelWeeksSaved = 0;
  if (hasCarpentry || state.tier === 'turnkey_collector') {
    const carpDuration = Math.min(mepWeeks + finishingWeeks - 1, Math.max(3, mepWeeks + 1));
    parallelWeeksSaved = Math.max(2, carpDuration - 1);
    phases.push({
      id: 'carpentry_prod',
      index: isSecondary ? '04' : '03',
      titlePl: 'Produkcja zabudów w stolarni',
      titleEn: 'Off-site joinery workshop',
      detailPl: 'Stolarz tnie i forniruje kuchnię oraz szafy na warsztacie, kiedy na budowie schną ściany i trwają instalacje.',
      detailEn: 'Kitchens and wardrobes are built off-site while wiring and plastering run on site.',
      startWeek: mepStart + 1,
      durationWeeks: carpDuration,
      endWeek: mepStart + carpDuration,
      isCritical: false,
      isParallel: true,
    });
  }

  const finishingIndex = String(phases.length + 1).padStart(2, '0');
  phases.push({
    id: 'finishing',
    index: finishingIndex,
    titlePl: 'Podłogi, łazienki i montaż mebli',
    titleEn: 'Flooring, baths & joinery fit',
    detailPl: 'Układanie deski i kamienia, malowanie, montaż gotowych mebli ze stolarni oraz armatury.',
    detailEn: 'Laying timber and stone, painting, fitting bespoke cabinets, and installing fixtures.',
    startWeek: cursor,
    durationWeeks: finishingWeeks,
    endWeek: cursor + finishingWeeks - 1,
    isCritical: true,
    isParallel: false,
  });
  cursor += finishingWeeks;

  phases.push({
    id: 'handover',
    index: String(phases.length + 1).padStart(2, '0'),
    titlePl: 'Rozruch, sprzątanie i klucze',
    titleEn: 'Testing, cleaning & keys',
    detailPl: 'Ustawienie scen świetlnych, próby instalacji, sprzątanie poremontowe i przekazanie kluczy.',
    detailEn: 'Testing lighting and plumbing, deep cleaning, and handing over the keys.',
    startWeek: cursor,
    durationWeeks: handoverWeeks,
    endWeek: totalWeeks,
    isCritical: true,
    isParallel: false,
  });

  const tranches = allocateTranches(breakdown.totalPLN, [
    {
      id: 't1',
      step: 'I',
      titlePl: 'Rezerwacja terminu',
      titleEn: 'Booking & design',
      triggerWeek: 1,
      percentage: 15,
      milestonePl: 'Start prac nad projektem',
      milestoneEn: 'When drawings begin',
    },
    {
      id: 't2',
      step: 'II',
      titlePl: 'Wejście ekip na lokal',
      titleEn: 'Site work starts',
      triggerWeek: mepStart,
      percentage: 35,
      milestonePl: 'Start instalacji i materiałów',
      milestoneEn: 'Before MEP & materials',
    },
    {
      id: 't3',
      step: 'III',
      titlePl: 'Wykończenie i stolarka',
      titleEn: 'Finishing & cabinets',
      triggerWeek: cursor - finishingWeeks,
      percentage: 35,
      milestonePl: 'Dostawa mebli i okładzin',
      milestoneEn: 'Before joinery & flooring',
    },
    {
      id: 't4',
      step: 'IV',
      titlePl: 'Odbiór gotowego lokalu',
      titleEn: 'Final handover',
      triggerWeek: totalWeeks,
      percentage: 15,
      milestonePl: 'Po odbiorze bez poprawek',
      milestoneEn: 'Once keys are handed over',
    },
  ]);

  return {
    totalWeeks,
    parallelWeeksSaved,
    phases,
    tranches,
  };
}
