'use client';

import React from 'react';
import { useLanguage } from '@/context/language-context';

export function ProcessSection() {
  const { t } = useLanguage();

  return (
    <section id="proces" className="scroll-mt-24">
      <div className="flex flex-wrap justify-between items-baseline gap-3 border-b border-[var(--border-hairline)] pb-3 mb-6">
        <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-[-0.02em]">
          {t.process.sectionTitle}
        </h2>
        <span className="font-mono-tech text-xs text-[var(--text-muted)]">
          {t.process.sectionMeta}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-[10px]">
        {t.process.steps.map((item) => (
          <article
            key={item.step}
            className="bg-[var(--surface-primary)] p-5 rounded-[2px] flex flex-col justify-between gap-5"
          >
            <div>
              <div className="flex justify-between items-center font-mono-tech text-[11px] mb-3">
                <span className="text-[var(--accent-primary)] font-semibold">{item.step}</span>
                <span className="text-[var(--text-muted)]">{item.duration}</span>
              </div>
              <h3 className="font-display text-base font-semibold tracking-[-0.01em] mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="pt-3 border-t border-[var(--border-hairline)]">
              <span className="block font-mono-tech text-[10px] uppercase text-[var(--text-muted)]">
                {t.process.deliverableLabel}
              </span>
              <span className="block text-xs font-medium mt-1">{item.output}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
