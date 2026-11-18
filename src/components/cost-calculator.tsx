'use client';

import React, { useState } from 'react';
import NumberFlow from '@number-flow/react';
import { Printer } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { AxonometricPreview } from './axonometric-preview';
import { EstimatePrintSheet } from './estimate-print-sheet';
import { InvestmentTimeline } from './investment-timeline';
import {
  calculateEstimate,
  clampArea,
  formatEUR,
  formatPLN,
  MAX_AREA_M2,
  MIN_AREA_M2,
  type AddonId,
  type CalculatorBreakdown,
  type CalculatorState,
  type PackageTier,
  type PropertyCondition,
} from '@/lib/calculator';

export interface AttachedEstimate {
  state: CalculatorState;
  breakdown: CalculatorBreakdown;
}

interface CostCalculatorProps {
  initialArea?: number;
  onTransferToContact: (estimate: AttachedEstimate) => void;
}

const TIER_ORDER: PackageTier[] = ['design_only', 'turnkey_standard', 'turnkey_collector'];
const ADDON_ORDER: AddonId[] = ['custom_carpentry', 'ducted_ac', 'smart_dali', 'price_freeze'];

export function CostCalculator({ initialArea, onTransferToContact }: CostCalculatorProps) {
  const { lang, t } = useLanguage();
  const [areaM2, setAreaM2] = useState<number>(() => clampArea(initialArea));
  const [condition, setCondition] = useState<PropertyCondition>('developer');
  const [tier, setTier] = useState<PackageTier>('turnkey_standard');
  const [addons, setAddons] = useState<AddonId[]>(['custom_carpentry']);

  const currentState: CalculatorState = { areaM2, condition, tier, addons };
  const breakdown = calculateEstimate(currentState);

  const toggleAddon = (id: AddonId) => {
    setAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const formatMoney = (pln: number) =>
    lang === 'pl' ? formatPLN(pln) : `${pln.toLocaleString('en-US')} PLN`;

  return (
    <section id="kalkulator" className="scroll-mt-24">
      <div className="print:hidden">
        <div className="flex flex-wrap justify-between items-baseline gap-3 border-b border-[var(--border-hairline)] pb-3 mb-6">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-[-0.02em]">
            {t.calculator.sectionTitle}
          </h2>
          <span className="font-mono-tech text-xs text-[var(--text-muted)]">
            {t.calculator.sectionMeta}
          </span>
        </div>

        <div className="bg-[var(--surface-inverted)] text-[var(--text-on-dark)] p-6 sm:p-9 rounded-[2px] grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-8">
        <div className="flex flex-col gap-6">
          <div>
            <div className="flex justify-between items-baseline mb-2.5">
              <label
                htmlFor="calc-area-range"
                className="font-mono-tech text-xs uppercase tracking-wider text-[var(--text-on-dark-muted)]"
              >
                {t.calculator.areaLabel}
              </label>
              <span className="font-mono-tech text-lg font-semibold text-white">
                {areaM2} m²
              </span>
            </div>
            <input
              id="calc-area-range"
              type="range"
              min={MIN_AREA_M2}
              max={MAX_AREA_M2}
              step={1}
              value={areaM2}
              onChange={(e) => setAreaM2(clampArea(Number(e.target.value)))}
              className="arch-range"
            />
            <div className="flex justify-between font-mono-tech text-[11px] text-[#7D8078] mt-1.5">
              <span>25 m²</span>
              <span>80 m²</span>
              <span>135 m²</span>
              <span>190 m²</span>
              <span>250 m²</span>
            </div>
          </div>
          <div>
            <div className="font-mono-tech text-xs uppercase tracking-wider text-[var(--text-on-dark-muted)] mb-2.5">
              {t.calculator.conditionLabel}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(
                [
                  {
                    id: 'developer' as const,
                    title: t.calculator.conditionDeveloper,
                    sub: t.calculator.conditionDeveloperSub,
                  },
                  {
                    id: 'secondary' as const,
                    title: t.calculator.conditionSecondary,
                    sub: t.calculator.conditionSecondarySub,
                  },
                ] as const
              ).map((item) => {
                const active = condition === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCondition(item.id)}
                    className={`p-3.5 text-left rounded-[2px] border transition-colors cursor-pointer ${
                      active
                        ? 'border-[var(--accent-primary)] bg-[var(--accent-primary-tint)]'
                        : 'border-[#343731] bg-[var(--surface-inverted-elevated)] hover:border-[#5D6059]'
                    }`}
                  >
                    <span className="block font-semibold text-sm text-white">{item.title}</span>
                    <span className="block font-mono-tech text-xs text-[var(--text-on-dark-muted)] mt-0.5">
                      {item.sub}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <div className="font-mono-tech text-xs uppercase tracking-wider text-[var(--text-on-dark-muted)] mb-2.5">
              {t.calculator.tierLabel}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {TIER_ORDER.map((tierId) => {
                const active = tier === tierId;
                const copy = t.calculator.tiers[tierId];
                return (
                  <button
                    key={tierId}
                    type="button"
                    onClick={() => setTier(tierId)}
                    className={`p-3.5 text-left rounded-[2px] border transition-colors cursor-pointer ${
                      active
                        ? 'border-[var(--accent-primary)] bg-[var(--accent-primary-tint)]'
                        : 'border-[#343731] bg-[var(--surface-inverted-elevated)] hover:border-[#5D6059]'
                    }`}
                  >
                    <span className="block font-semibold text-sm text-white">{copy.title}</span>
                    <span className="block font-mono-tech text-xs text-[var(--text-on-dark-muted)] mt-1">
                      {copy.price}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <div className="font-mono-tech text-xs uppercase tracking-wider text-[var(--text-on-dark-muted)] mb-2.5">
              {t.calculator.addonsLabel}
            </div>
            <div className="flex flex-col gap-2">
              {ADDON_ORDER.map((addonId) => {
                const checked = addons.includes(addonId);
                const copy = t.calculator.addons[addonId];
                return (
                  <label
                    key={addonId}
                    className={`flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-[2px] border cursor-pointer transition-colors ${
                      checked
                        ? 'border-[var(--accent-primary)] bg-[var(--accent-primary-tint)]'
                        : 'border-[#2E302B] bg-[var(--surface-inverted-elevated)] hover:border-[#4A4D45]'
                    }`}
                  >
                    <span className="flex items-center gap-2.5 text-sm text-[#F4F3EF]">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleAddon(addonId)}
                        className="accent-[var(--accent-primary)] w-4 h-4 rounded-[2px]"
                      />
                      {copy.title}
                    </span>
                    <span className="font-mono-tech text-xs text-[var(--text-on-dark-muted)] whitespace-nowrap">
                      {copy.price}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <AxonometricPreview areaM2={areaM2} condition={condition} addons={addons} />
          <div className="bg-[var(--surface-receipt)] border border-[var(--border-dark)] p-6 rounded-[2px] flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-baseline border-b border-[var(--border-dark)] pb-3 mb-4 font-mono-tech text-xs text-[var(--text-on-dark-muted)]">
              <span>{t.calculator.receiptTitle}</span>
              <span>{t.calculator.receiptVat}</span>
            </div>

            <div className="divide-y divide-[#222420] text-sm">
              <div className="py-2.5 flex justify-between gap-4">
                <span className="text-[#D5D4CE]">{t.calculator.rowBase}</span>
                <span className="font-mono-tech text-white whitespace-nowrap">
                  {formatMoney(breakdown.baseWorkAndMaterialsPLN)}
                </span>
              </div>

              {breakdown.demolitionAndInstallationsPLN > 0 && (
                <div className="py-2.5 flex justify-between gap-4">
                  <span className="text-[#D5D4CE]">{t.calculator.rowDemolition}</span>
                  <span className="font-mono-tech text-white whitespace-nowrap">
                    {formatMoney(breakdown.demolitionAndInstallationsPLN)}
                  </span>
                </div>
              )}

              <div className="py-2.5 flex justify-between gap-4">
                <span className="text-[#D5D4CE]">{t.calculator.rowCarpentry}</span>
                <span className="font-mono-tech text-white whitespace-nowrap">
                  {formatMoney(breakdown.carpentryPLN)}
                </span>
              </div>

              <div className="py-2.5 flex justify-between gap-4">
                <span className="text-[#D5D4CE]">{t.calculator.rowAcSmart}</span>
                <span className="font-mono-tech text-white whitespace-nowrap">
                  {formatMoney(breakdown.acAndSmartPLN)}
                </span>
              </div>

              {breakdown.priceFreezeReservePLN > 0 && (
                <div className="py-2.5 flex justify-between gap-4">
                  <span className="text-[#D5D4CE]">{t.calculator.rowFreeze}</span>
                  <span className="font-mono-tech text-white whitespace-nowrap">
                    {formatMoney(breakdown.priceFreezeReservePLN)}
                  </span>
                </div>
              )}

              <div className="py-2.5 flex justify-between gap-4">
                <span className="text-[#D5D4CE]">{t.calculator.rowSupervision}</span>
                <span className="font-mono-tech text-[#6EE7B7] whitespace-nowrap">
                  {t.calculator.includedLabel}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="pt-4 border-t-2 border-[var(--accent-primary)] flex flex-wrap justify-between items-baseline gap-3">
              <div>
                <div className="font-mono-tech text-xs text-[var(--text-on-dark-muted)]">
                  {t.calculator.totalLabel}
                </div>
                <div className="font-mono-tech text-xs text-[var(--text-on-dark-muted)] mt-1">
                  {t.calculator.estimatedDurationLabel}:{' '}
                  <strong className="text-white">
                    {breakdown.estimatedWeeks} {t.calculator.weeksUnit}
                  </strong>
                </div>
              </div>

              <div className="text-right">
                <div className="font-mono-tech text-3xl sm:text-4xl font-semibold text-white tracking-tight">
                  <NumberFlow
                    value={breakdown.totalPLN}
                    locales={lang === 'pl' ? 'pl-PL' : 'en-US'}
                    format={{ maximumFractionDigits: 0 }}
                  />
                  <span className="text-xl ml-1.5">{lang === 'pl' ? 'zł' : 'PLN'}</span>
                </div>
                {lang === 'en' && (
                  <div className="font-mono-tech text-xs text-[var(--text-on-dark-muted)] mt-0.5">
                    {t.calculator.approxEurPrefix} {formatEUR(breakdown.totalEUR)}
                  </div>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => onTransferToContact({ state: currentState, breakdown })}
              className="print:hidden w-full mt-5 py-3.5 px-5 bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-white font-semibold text-sm rounded-[2px] transition-colors cursor-pointer"
            >
              {t.calculator.transferBtn}
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="print:hidden w-full mt-2.5 py-2.5 px-4 bg-transparent hover:bg-white/[0.04] border border-[var(--border-dark)] text-[var(--text-on-dark-muted)] hover:text-white font-mono-tech text-xs rounded-[2px] transition-colors cursor-pointer inline-flex items-center justify-center gap-2"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{lang === 'pl' ? 'Zapisz wycenę jako PDF' : 'Save estimate as PDF'}</span>
            </button>
          </div>
          </div>
        </div>
      </div>

      <InvestmentTimeline state={currentState} breakdown={breakdown} />
      </div>

      <EstimatePrintSheet state={currentState} breakdown={breakdown} />
    </section>
  );
}
