'use client';

import React from 'react';
import { useLanguage } from '@/context/language-context';
import {
  formatEUR,
  formatPLN,
  type CalculatorBreakdown,
  type CalculatorState,
} from '@/lib/calculator';
import { buildInvestmentSchedule } from '@/lib/schedule';

interface EstimatePrintSheetProps {
  state: CalculatorState;
  breakdown: CalculatorBreakdown;
}

function getTypologyLabel(areaM2: number, lang: 'pl' | 'en'): string {
  if (areaM2 < 45) return lang === 'pl' ? 'Apartament / Studio' : 'Studio Apartment';
  if (areaM2 < 62) return lang === 'pl' ? 'Mieszkanie 2-pokojowe' : '2-Room Apartment';
  if (areaM2 < 80) return lang === 'pl' ? 'Apartament z tarasem' : 'Apartment with Terrace';
  if (areaM2 < 100) return lang === 'pl' ? 'Dom jednorodzinny (trzon)' : 'Single-Family House (Core)';
  if (areaM2 < 123) return lang === 'pl' ? 'Dom ze skrzydłem prywatnym' : 'House + Private Wing';
  if (areaM2 < 150) return lang === 'pl' ? 'Rezydencja z tarasem' : 'Full Residence + Deck';
  if (areaM2 < 180) return lang === 'pl' ? 'Biuro kompaktowe B2B' : 'Compact B2B Office';
  if (areaM2 < 215) return lang === 'pl' ? 'Biuro + sala konferencyjna' : 'Office + Conference Hall';
  return lang === 'pl' ? 'Piętro korporacyjne B2B' : 'Full Corporate Floor';
}

const TIER_SCOPE: Record<CalculatorState['tier'], { pl: string[]; en: string[] }> = {
  design_only: {
    pl: [
      'Inwentaryzacja i koncepcja funkcjonalna 2D/3D',
      'Pełna dokumentacja wykonawcza (MEP, elektryka, wod-kan)',
      'Zestawienia materiałowe i harmonogram zamówień',
      'Nadzór autorski na budowie do odbioru końcowego',
    ],
    en: [
      'Technical survey & 2D/3D functional layout',
      'Full execution drawings (MEP, electrical, plumbing)',
      'Material schedules & procurement specification',
      'Author site supervision through final handover',
    ],
  },
  turnkey_standard: {
    pl: [
      'Kompletna dokumentacja wykonawcza i koordynacja MEP',
      'Prace budowlano-wykończeniowe przez stałe brygady',
      'Dostawa i montaż materiałów zgodnie z harmonogramem',
      'Dedykowany kierownik projektu + 36 mies. rękojmi',
    ],
    en: [
      'Full execution drawings & MEP coordination',
      'Construction & finishing by in-house crews',
      'Scheduled material procurement & site logistics',
      'Dedicated project manager + 36-month warranty',
    ],
  },
  turnkey_collector: {
    pl: [
      'Projekt autorski z selekcją spieków, kamienia i fornirów',
      'Stolarka i ślusarka w standardzie rzemieślniczym',
      'Integracja oświetlenia architektonicznego i systemów DALI',
      'Opieka concierge i nadzór głównych architektów',
    ],
    en: [
      'Bespoke design with curated stone, veneers & sintered slabs',
      'Craftsman-grade custom millwork & metalwork',
      'Architectural lighting & DALI system integration',
      'Dedicated concierge & senior architect supervision',
    ],
  },
};

export function EstimatePrintSheet({ state, breakdown }: EstimatePrintSheetProps) {
  const { lang, t } = useLanguage();
  const schedule = buildInvestmentSchedule(state, breakdown);
  const typologyLabel = getTypologyLabel(state.areaM2, lang);
  const tierScopeItems = TIER_SCOPE[state.tier][lang];

  const formatMoney = (pln: number) =>
    lang === 'pl' ? formatPLN(pln) : `${pln.toLocaleString('en-US')} PLN`;

  const selectedCondition =
    state.condition === 'developer'
      ? t.calculator.conditionDeveloper
      : t.calculator.conditionSecondary;
  const selectedTier = t.calculator.tiers[state.tier];
  const refCode = `KP-${state.areaM2}-${state.condition === 'secondary' ? 'WT' : 'DW'}`;
  const generatedDate = new Date().toLocaleDateString(lang === 'pl' ? 'pl-PL' : 'en-GB');

  return (
    <div className="hidden print:block text-[#141513] bg-white space-y-4">
      {/* Studio Letterhead */}
      <div className="flex items-end justify-between border-b-2 border-[#141513] pb-3">
        <div>
          <div className="font-display text-xl font-bold tracking-tight">
            {t.nav.brand}
          </div>
          <div className="font-mono-tech text-[10px] tracking-widest uppercase text-[#575853] mt-0.5">
            {t.nav.brandSub}
          </div>
        </div>
        <div className="text-right font-mono-tech text-[10px] text-[#575853] space-y-0.5">
          <div className="text-[#C83E2B] font-semibold uppercase tracking-wider">
            {lang === 'pl' ? 'KOSZTORYS I HARMONOGRAM WSTĘPNY' : 'PRELIMINARY ESTIMATE & SCHEDULE'}
          </div>
          <div suppressHydrationWarning>
            {lang === 'pl'
              ? `NR REF: ${refCode} · DATA: ${generatedDate} · WAŻNOŚĆ: 14 DNI`
              : `REF: ${refCode} · DATE: ${generatedDate} · VALID: 14 DAYS`}
          </div>
        </div>
      </div>

      {/* Selected Configuration Summary (only chosen parameters) */}
      <div className="grid grid-cols-4 gap-3 bg-[#F7F6F2] border border-[#CFCBC2] p-3 rounded-[2px]">
        <div>
          <div className="font-mono-tech text-[9px] uppercase tracking-wider text-[#575853]">
            {lang === 'pl' ? 'TYP I METRAŻ' : 'TYPOLOGY & AREA'}
          </div>
          <div className="text-xs font-semibold mt-0.5">
            {typologyLabel} · {state.areaM2} m²
          </div>
        </div>
        <div>
          <div className="font-mono-tech text-[9px] uppercase tracking-wider text-[#575853]">
            {lang === 'pl' ? 'STAN LOKALU' : 'PROPERTY STATE'}
          </div>
          <div className="text-xs font-semibold mt-0.5">{selectedCondition}</div>
        </div>
        <div>
          <div className="font-mono-tech text-[9px] uppercase tracking-wider text-[#575853]">
            {lang === 'pl' ? 'WYBRANY PAKIET' : 'SELECTED TIER'}
          </div>
          <div className="text-xs font-semibold mt-0.5">{selectedTier.title}</div>
        </div>
        <div>
          <div className="font-mono-tech text-[9px] uppercase tracking-wider text-[#575853]">
            {lang === 'pl' ? 'SZACOWANY CZAS' : 'ESTIMATED TIME'}
          </div>
          <div className="text-xs font-semibold mt-0.5">
            {schedule.totalWeeks} {t.calculator.weeksUnit}
          </div>
        </div>
      </div>

      {/* Full-width Itemized Bill of Quantities */}
      <div className="border border-[#CFCBC2] rounded-[2px] p-4 space-y-3">
        <div className="flex justify-between items-baseline border-b border-[#CFCBC2] pb-2 font-mono-tech text-[10px] text-[#575853]">
          <span className="font-semibold text-[#141513]">{t.calculator.receiptTitle}</span>
          <span>{t.calculator.receiptVat}</span>
        </div>

        <div className="divide-y divide-[#E5E2DA] text-xs">
          <div className="py-1.5 flex justify-between gap-3">
            <span>{t.calculator.rowBase}</span>
            <span className="font-mono-tech font-medium">
              {formatMoney(breakdown.baseWorkAndMaterialsPLN)}
            </span>
          </div>

          {breakdown.demolitionAndInstallationsPLN > 0 && (
            <div className="py-1.5 flex justify-between gap-3">
              <span>{t.calculator.rowDemolition}</span>
              <span className="font-mono-tech font-medium">
                {formatMoney(breakdown.demolitionAndInstallationsPLN)}
              </span>
            </div>
          )}

          {breakdown.carpentryPLN > 0 && (
            <div className="py-1.5 flex justify-between gap-3">
              <span>{t.calculator.rowCarpentry}</span>
              <span className="font-mono-tech font-medium">
                {formatMoney(breakdown.carpentryPLN)}
              </span>
            </div>
          )}

          {breakdown.acAndSmartPLN > 0 && (
            <div className="py-1.5 flex justify-between gap-3">
              <span>{t.calculator.rowAcSmart}</span>
              <span className="font-mono-tech font-medium">
                {formatMoney(breakdown.acAndSmartPLN)}
              </span>
            </div>
          )}

          {breakdown.priceFreezeReservePLN > 0 && (
            <div className="py-1.5 flex justify-between gap-3">
              <span>{t.calculator.rowFreeze}</span>
              <span className="font-mono-tech font-medium">
                {formatMoney(breakdown.priceFreezeReservePLN)}
              </span>
            </div>
          )}

          <div className="py-1.5 flex justify-between gap-3">
            <span>{t.calculator.rowSupervision}</span>
            <span className="font-mono-tech text-[#1E6B4B] font-medium">
              {t.calculator.includedLabel}
            </span>
          </div>
        </div>

        {/* Selected Add-ons pills */}
        <div className="pt-1">
          <div className="font-mono-tech text-[9px] uppercase tracking-wider text-[#575853] mb-1">
            {lang === 'pl' ? 'WYBRANE OPCJE DODATKOWE:' : 'SELECTED ADD-ONS:'}
          </div>
          {state.addons.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {state.addons.map((addonId) => (
                <span
                  key={addonId}
                  className="px-2 py-0.5 text-[10px] font-mono-tech bg-[#F7F6F2] border border-[#CFCBC2] rounded-[2px]"
                >
                  {t.calculator.addons[addonId].title}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-[11px] text-[#575853]">
              {lang === 'pl' ? 'Brak dodatków (pakiet bazowy)' : 'None (base package)'}
            </span>
          )}
        </div>

        {/* Total */}
        <div className="pt-2.5 border-t-2 border-[#C83E2B] flex items-baseline justify-between">
          <span className="font-mono-tech text-[11px] uppercase text-[#575853]">
            {t.calculator.totalLabel}
          </span>
          <div className="text-right">
            <div className="font-mono-tech text-xl font-bold text-[#141513]">
              {formatMoney(breakdown.totalPLN)}
            </div>
            {lang === 'en' && (
              <div className="font-mono-tech text-[10px] text-[#575853]">
                {t.calculator.approxEurPrefix} {formatEUR(breakdown.totalEUR)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Selected Tier Scope */}
      <div className="border border-[#CFCBC2] bg-[#F7F6F2] rounded-[2px] p-3">
        <div className="font-mono-tech text-[9.5px] uppercase tracking-wider font-semibold mb-2">
          {lang === 'pl'
            ? `ZAKRES WYBRANEGO PAKIETU (${selectedTier.title})`
            : `SELECTED TIER SCOPE (${selectedTier.title})`}
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-[10.5px]">
          {tierScopeItems.map((item) => (
            <div key={item} className="flex items-start gap-1.5">
              <span className="font-mono-tech text-[#C83E2B] font-bold">·</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Execution Schedule & Payment Tranches Tables */}
      <div className="grid grid-cols-[1.25fr_0.75fr] gap-5">
        <div className="border border-[#CFCBC2] rounded-[2px] p-3">
          <div className="font-mono-tech text-[10px] uppercase tracking-wider font-semibold mb-2">
            {lang === 'pl' ? 'HARMONOGRAM ETAPÓW REALIZACJI' : 'EXECUTION SCHEDULE'}
          </div>
          <table className="w-full text-left text-[10.5px] border-collapse">
            <thead>
              <tr className="border-b border-[#CFCBC2] font-mono-tech text-[9px] text-[#575853]">
                <th className="py-1 pr-2">#</th>
                <th className="py-1 pr-2">{lang === 'pl' ? 'Etap prac' : 'Stage'}</th>
                <th className="py-1 pr-2">{lang === 'pl' ? 'Okres' : 'Weeks'}</th>
                <th className="py-1 text-right">{lang === 'pl' ? 'Tryb' : 'Track'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E2DA]">
              {schedule.phases.map((phase) => (
                <tr key={phase.id}>
                  <td className="py-1.5 pr-2 font-mono-tech text-[#575853]">{phase.index}</td>
                  <td className="py-1.5 pr-2 font-medium">
                    {lang === 'pl' ? phase.titlePl : phase.titleEn}
                  </td>
                  <td className="py-1.5 pr-2 font-mono-tech whitespace-nowrap">
                    {lang === 'pl' ? 'Tydz.' : 'Wk'} {phase.startWeek}
                    {phase.durationWeeks > 1 ? `–${phase.endWeek}` : ''} ({phase.durationWeeks}t)
                  </td>
                  <td className="py-1.5 text-right font-mono-tech text-[9.5px]">
                    {phase.isParallel
                      ? lang === 'pl'
                        ? 'Równolegle'
                        : 'Parallel'
                      : lang === 'pl'
                        ? 'Sekwencyjnie'
                        : 'Sequential'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border border-[#CFCBC2] rounded-[2px] p-3">
          <div className="font-mono-tech text-[10px] uppercase tracking-wider font-semibold mb-2">
            {lang === 'pl' ? 'TRANSZE PŁATNOŚCI' : 'PAYMENT TRANCHES'}
          </div>
          <table className="w-full text-left text-[10.5px] border-collapse">
            <thead>
              <tr className="border-b border-[#CFCBC2] font-mono-tech text-[9px] text-[#575853]">
                <th className="py-1 pr-2">{lang === 'pl' ? 'Etap' : 'Tranche'}</th>
                <th className="py-1 pr-2">{lang === 'pl' ? 'Termin' : 'Due'}</th>
                <th className="py-1 text-right">{lang === 'pl' ? 'Kwota' : 'Amount'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E2DA]">
              {schedule.tranches.map((tranche) => (
                <tr key={tranche.id}>
                  <td className="py-1.5 pr-2 font-medium">
                    {tranche.step} ({tranche.percentage}%)
                  </td>
                  <td className="py-1.5 pr-2 font-mono-tech text-[#575853] whitespace-nowrap">
                    {lang === 'pl' ? `ok. ${tranche.triggerWeek}. tydz.` : `wk ${tranche.triggerWeek}`}
                  </td>
                  <td className="py-1.5 text-right font-mono-tech font-semibold whitespace-nowrap">
                    {formatMoney(tranche.amountPLN)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Next Steps */}
      <div className="border border-[#CFCBC2] bg-[#F7F6F2] rounded-[2px] p-3">
        <div className="font-mono-tech text-[9.5px] uppercase tracking-wider font-semibold mb-2">
          {lang === 'pl' ? 'NASTĘPNE KROKI' : 'NEXT STEPS'}
        </div>
        <div className="grid grid-cols-3 gap-4 text-[10px]">
          <div>
            <span className="font-mono-tech font-semibold text-[#C83E2B]">01 · </span>
            <span className="font-semibold">
              {lang === 'pl' ? 'Konsultacja i rzut' : 'Consultation & Plan'}
            </span>
            <p className="text-[#575853] mt-0.5">
              {lang === 'pl'
                ? 'Weryfikacja układu funkcjonalnego i założeń budżetowych.'
                : 'Review of functional layout and budget assumptions.'}
            </p>
          </div>
          <div>
            <span className="font-mono-tech font-semibold text-[#C83E2B]">02 · </span>
            <span className="font-semibold">
              {lang === 'pl' ? 'Inwentaryzacja na miejscu' : 'On-site Survey'}
            </span>
            <p className="text-[#575853] mt-0.5">
              {lang === 'pl'
                ? 'Pomiary laserowe oraz ocena instalacji i ścian nośnych.'
                : 'Laser measurements and MEP / structural inspection.'}
            </p>
          </div>
          <div>
            <span className="font-mono-tech font-semibold text-[#C83E2B]">03 · </span>
            <span className="font-semibold">
              {lang === 'pl' ? 'Kosztorys wiążący' : 'Binding Offer'}
            </span>
            <p className="text-[#575853] mt-0.5">
              {lang === 'pl'
                ? 'Finalny harmonogram prac i podpisanie umowy realizacyjnej.'
                : 'Final execution schedule and contract signing.'}
            </p>
          </div>
        </div>
      </div>

      {/* Print Footer */}
      <div className="pt-2 border-t border-[#CFCBC2] flex justify-between text-[9.5px] font-mono-tech text-[#575853]">
        <span>KRAWCZYK & PARTNERZY · biuro@krawczykpartnerzy.pl · Warszawa / Kraków</span>
        <span>
          {lang === 'pl'
            ? 'Wycena ma charakter szacunkowy i wymaga inwentaryzacji na miejscu.'
            : 'Indicative estimate subject to on-site technical survey.'}
        </span>
      </div>
    </div>
  );
}
