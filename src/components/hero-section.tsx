'use client';

import React from 'react';
import { useLanguage } from '@/context/language-context';
import { BEFORE_AFTER_SCENES } from '@/data/projects';
import { scrollToSection } from '@/lib/scroll';
import { BeforeAfterSlider } from './before-after-slider';

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section id="przed-po" className="scroll-mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-[1.12fr_0.88fr] gap-[10px]">
        <div className="bg-[var(--surface-primary)] p-7 sm:p-10 lg:p-12 rounded-[2px] flex flex-col justify-between min-h-[470px]">
          <div className="flex flex-wrap justify-between items-center gap-2 font-mono-tech text-xs text-[var(--text-muted)] mb-10">
            <span>{t.hero.cities}</span>
            <span>MONOGRAFIA · BOQ</span>
          </div>

          <div>
            <h1 className="font-display font-semibold text-4xl sm:text-5xl lg:text-[3.35rem] leading-[1.04] tracking-[-0.03em] text-[var(--text-primary)] mb-6">
              {t.hero.headline}
            </h1>
            <p className="text-base sm:text-lg text-[var(--text-muted)] max-w-[54ch] mb-8 leading-relaxed">
              {t.hero.subheadline}
            </p>
            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => scrollToSection('kalkulator')}
                className="px-6 py-3.5 bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-white font-semibold text-sm rounded-[2px] transition-colors cursor-pointer"
              >
                {t.hero.ctaPrimary} →
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('realizacje')}
                className="px-5 py-3.5 bg-[var(--surface-secondary)] hover:border-[var(--text-muted)] border border-[var(--border-hairline)] text-[var(--text-primary)] font-medium text-sm rounded-[2px] transition-colors cursor-pointer"
              >
                {t.hero.ctaSecondary}
              </button>
            </div>
          </div>

          <div className="mt-10 pt-5 border-t border-[var(--border-hairline)] grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono-tech text-xs">
            <div>
              <span className="block text-[var(--text-muted)] text-[11px]">
                {t.hero.metrics.warrantyLabel}
              </span>
              <strong className="text-sm text-[var(--text-primary)]">
                {t.hero.metrics.warrantyValue}
              </strong>
            </div>
            <div>
              <span className="block text-[var(--text-muted)] text-[11px]">
                {t.hero.metrics.durationLabel}
              </span>
              <strong className="text-sm text-[var(--text-primary)]">
                {t.hero.metrics.durationValue}
              </strong>
            </div>
            <div>
              <span className="block text-[var(--text-muted)] text-[11px]">
                {t.hero.metrics.supervisionLabel}
              </span>
              <strong className="text-sm text-[var(--text-primary)]">
                {t.hero.metrics.supervisionValue}
              </strong>
            </div>
          </div>
        </div>
        <BeforeAfterSlider scenes={BEFORE_AFTER_SCENES} />
      </div>
    </section>
  );
}
