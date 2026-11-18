'use client';

import React, { useState } from 'react';
import { CalendarClock, GitBranch, Layers, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { formatPLN, type CalculatorBreakdown, type CalculatorState } from '@/lib/calculator';
import { buildInvestmentSchedule, type SchedulePhaseId } from '@/lib/schedule';

interface InvestmentTimelineProps {
  state: CalculatorState;
  breakdown: CalculatorBreakdown;
}

const TRANCHE_SHADES = [
  'bg-[#3A4A43]',
  'bg-[#566B61]',
  'bg-[#7B8F85]',
  'bg-[#A7B5AE]',
] as const;

export function InvestmentTimeline({ state, breakdown }: InvestmentTimelineProps) {
  const { lang } = useLanguage();
  const schedule = buildInvestmentSchedule(state, breakdown);
  const [selectedPhaseId, setSelectedPhaseId] = useState<SchedulePhaseId>('concept');

  const hasParallelTrack = schedule.phases.some((phase) => phase.isParallel);
  const activePhase =
    schedule.phases.find((phase) => phase.id === selectedPhaseId) ?? schedule.phases[0];

  const formatMoney = (pln: number) =>
    lang === 'pl' ? formatPLN(pln) : `${pln.toLocaleString('en-US')} PLN`;

  const weeksArray = Array.from({ length: schedule.totalWeeks }, (_, i) => i + 1);

  return (
    <div className="mt-6 bg-[var(--surface-inverted)] border border-[var(--border-dark)] text-[var(--text-on-dark)] p-6 sm:p-8 rounded-[2px] space-y-7">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-dark)] pb-4">
        <div>
          <div className="flex items-center gap-2 font-mono-tech text-[11px] uppercase tracking-widest text-[var(--accent-primary)]">
            <CalendarClock className="w-3.5 h-3.5" />
            <span>
              {lang === 'pl' ? 'HARMONOGRAM I PŁATNOŚCI' : 'SCHEDULE & PAYMENTS'}
            </span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-[-0.02em] text-white mt-1">
            {lang === 'pl'
              ? 'Ile potrwa realizacja i kiedy płacisz kolejne transze'
              : 'How long it takes and when each payment is due'}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2 font-mono-tech text-xs">
          <div className="px-3 py-1.5 bg-[#10110F] border border-[var(--border-dark)] rounded-[2px]">
            <span className="text-[var(--text-on-dark-muted)] mr-1.5">
              {lang === 'pl' ? 'ŁĄCZNY CZAS:' : 'TOTAL TIME:'}
            </span>
            <strong className="text-white">
              {schedule.totalWeeks} {lang === 'pl' ? 'tyg.' : 'wks'}
            </strong>
          </div>

          {schedule.parallelWeeksSaved > 0 && (
            <div className="px-3 py-1.5 bg-[#E5B076]/10 border border-[#E5B076]/40 text-[#F6D5A9] rounded-[2px] flex items-center gap-1.5">
              <GitBranch className="w-3.5 h-3.5" />
              <span>
                {lang === 'pl'
                  ? `OSZCZĘDNOŚĆ ~${schedule.parallelWeeksSaved} TYG. (STOLARNIA RÓWNOLEGŁA)`
                  : `SAVES ~${schedule.parallelWeeksSaved} WKS (PARALLEL JOINERY)`}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Gantt Chart */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono-tech text-[var(--text-on-dark-muted)]">
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-2 bg-[#C83E2B] inline-block rounded-[1px]" />
              {lang === 'pl' ? 'Prace po kolei na budowie' : 'Sequential site work'}
            </span>
            {hasParallelTrack && (
              <span className="inline-flex items-center gap-1.5">
                <span className="w-3 h-2 bg-[#E5B076] inline-block rounded-[1px]" />
                {lang === 'pl'
                  ? 'Stolarnia w tym samym czasie (warsztat)'
                  : 'Off-site joinery at the same time'}
              </span>
            )}
          </div>
          <span className="text-white/50">
            {lang === 'pl'
              ? 'Kliknij etap poniżej, aby zobaczyć szczegóły'
              : 'Click any stage below to see what happens'}
          </span>
        </div>
        <div className="bg-[#10110F] border border-[var(--border-dark)] rounded-[2px] p-4 overflow-x-auto">
          <div className="min-w-[600px] space-y-2.5">
            <div className="grid grid-cols-[240px_1fr] items-center gap-4 pb-2 border-b border-white/10">
              <span className="font-mono-tech text-[10px] uppercase tracking-wider text-white/50">
                {lang === 'pl' ? 'ETAP PRAC / TYDZIEŃ:' : 'STAGE / WEEK:'}
              </span>
              <div
                className="grid text-center font-mono-tech text-[10px] text-white/50"
                style={{ gridTemplateColumns: `repeat(${schedule.totalWeeks}, minmax(0, 1fr))` }}
              >
                {weeksArray.map((wk) => (
                  <span key={wk} className="border-l border-white/5 first:border-l-0">
                    {wk}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              {schedule.phases.map((phase) => {
                const isSelected = phase.id === activePhase.id;
                const leftPct = ((phase.startWeek - 1) / schedule.totalWeeks) * 100;
                const widthPct = (phase.durationWeeks / schedule.totalWeeks) * 100;
                const barColor = phase.isParallel
                  ? 'bg-[#E5B076] text-[#161715]'
                  : 'bg-[#C83E2B] text-white';
                const weekPrefix = lang === 'pl' ? 'Tydz.' : 'Wk';

                return (
                  <button
                    key={phase.id}
                    type="button"
                    onClick={() => setSelectedPhaseId(phase.id)}
                    onMouseEnter={() => setSelectedPhaseId(phase.id)}
                    className={`w-full grid grid-cols-[240px_1fr] items-center gap-4 px-2 py-2 rounded-[2px] text-left transition-colors ${
                      isSelected ? 'bg-white/[0.06]' : 'hover:bg-white/[0.03]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 pr-1">
                      <span className="text-xs font-medium text-white truncate">
                        <span className="font-mono-tech text-white/45 mr-1.5">{phase.index}</span>
                        {lang === 'pl' ? phase.titlePl : phase.titleEn}
                      </span>
                      <span className="font-mono-tech text-[10px] text-white/55 shrink-0">
                        {phase.durationWeeks} {lang === 'pl' ? 'tyg.' : 'w'}
                      </span>
                    </div>

                    <div className="relative h-6 bg-white/[0.03] rounded-[1px] overflow-hidden">
                      <div
                        className="absolute inset-0 grid pointer-events-none"
                        style={{
                          gridTemplateColumns: `repeat(${schedule.totalWeeks}, minmax(0, 1fr))`,
                        }}
                      >
                        {weeksArray.map((wk) => (
                          <span key={wk} className="border-l border-white/5 first:border-l-0" />
                        ))}
                      </div>

                      <div
                        className={`absolute top-1 bottom-1 rounded-[1px] px-2 flex items-center justify-between font-mono-tech text-[10px] font-semibold transition-all duration-300 ease-out ${barColor} ${
                          isSelected ? 'ring-1 ring-white/80' : 'opacity-90'
                        }`}
                        style={{
                          left: `${leftPct}%`,
                          width: `${widthPct}%`,
                        }}
                      >
                        <span className="truncate">
                          {weekPrefix} {phase.startWeek}
                          {phase.durationWeeks > 1 ? `–${phase.endWeek}` : ''}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-[#10110F] border-l-2 border-[#C83E2B] rounded-[2px] flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 font-mono-tech text-[11px] text-[#F6D5A9]">
              <Layers className="w-3.5 h-3.5 text-[#C83E2B]" />
              <span>
                {activePhase.index} · {lang === 'pl' ? activePhase.titlePl : activePhase.titleEn}
              </span>
            </div>
            <p className="text-xs text-[#D5D4CE]">
              {lang === 'pl' ? activePhase.detailPl : activePhase.detailEn}
            </p>
          </div>
          <span className="font-mono-tech text-[11px] text-white/65">
            {lang === 'pl' ? 'Tygodnie' : 'Weeks'} {activePhase.startWeek}–{activePhase.endWeek} (
            {activePhase.durationWeeks} {lang === 'pl' ? 'tyg.' : 'wks'})
          </span>
        </div>
      </div>
      <div className="space-y-3 pt-3 border-t border-[var(--border-dark)]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-mono-tech text-xs uppercase tracking-wider text-white/80">
            <ShieldCheck className="w-4 h-4 text-[#6EE7B7]" />
            <span>
              {lang === 'pl'
                ? 'Rozłożenie płatności w czasie'
                : 'Payment schedule by milestone'}
            </span>
          </div>
          <span className="font-mono-tech text-xs text-white/60">
            {lang === 'pl' ? 'Łącznie:' : 'Total:'}{' '}
            <strong className="text-white">{formatMoney(breakdown.totalPLN)}</strong>
          </span>
        </div>
        <div className="h-5 w-full bg-[#10110F] rounded-[2px] overflow-hidden flex gap-0.5">
          {schedule.tranches.map((tranche, idx) => (
            <div
              key={tranche.id}
              className={`${TRANCHE_SHADES[idx % TRANCHE_SHADES.length]} h-full flex items-center justify-center font-mono-tech text-[10px] font-semibold text-white transition-all duration-300`}
              style={{ width: `${tranche.percentage}%` }}
              title={`${tranche.percentage}% — ${formatMoney(tranche.amountPLN)}`}
            >
              {tranche.percentage}%
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {schedule.tranches.map((tranche, idx) => (
            <div
              key={tranche.id}
              className="bg-[#10110F] border border-[var(--border-dark)] p-3.5 rounded-[2px] flex flex-col justify-between gap-2"
            >
              <div className="flex items-center justify-between font-mono-tech text-[11px]">
                <span className="inline-flex items-center gap-1.5 text-white/85">
                  <span
                    className={`w-2 h-2 rounded-[1px] inline-block ${
                      TRANCHE_SHADES[idx % TRANCHE_SHADES.length]
                    }`}
                  />
                  {lang === 'pl' ? `TRANSZA ${tranche.step}` : `TRANCHE ${tranche.step}`} ·{' '}
                  {tranche.percentage}%
                </span>
                <span className="text-white/55">
                  {lang === 'pl' ? `ok. ${tranche.triggerWeek}. tydz.` : `wk ${tranche.triggerWeek}`}
                </span>
              </div>
              <div className="font-mono-tech text-base font-semibold text-white">
                {formatMoney(tranche.amountPLN)}
              </div>
              <div className="text-[11px] text-[var(--text-on-dark-muted)] leading-snug">
                <span className="text-white/90 font-medium block">
                  {lang === 'pl' ? tranche.titlePl : tranche.titleEn}
                </span>
                {lang === 'pl' ? tranche.milestonePl : tranche.milestoneEn}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
