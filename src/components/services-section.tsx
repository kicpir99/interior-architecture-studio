'use client';

import React from 'react';
import { useLanguage } from '@/context/language-context';

export function ServicesSection() {
  const { t } = useLanguage();

  return (
    <section id="oferta" className="scroll-mt-24">
      <div className="flex flex-wrap justify-between items-baseline gap-3 border-b border-[var(--border-hairline)] pb-3 mb-6">
        <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-[-0.02em]">
          {t.services.sectionTitle}
        </h2>
        <span className="font-mono-tech text-xs text-[var(--text-muted)]">
          {t.services.sectionMeta}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
        {t.services.items.map((service) => (
          <article
            key={service.code}
            className="bg-[var(--surface-primary)] p-7 sm:p-8 rounded-[2px] flex flex-col justify-between gap-6"
          >
            <div>
              <div className="flex justify-between items-baseline gap-3 font-mono-tech text-xs text-[var(--text-muted)] mb-4">
                <span className="text-[var(--accent-primary)] font-medium">{service.code}</span>
                <span>{service.duration}</span>
              </div>
              <h3 className="font-display text-xl font-semibold tracking-[-0.02em] mb-3">
                {service.title}
              </h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                {service.description}
              </p>
            </div>

            <div className="pt-4 border-t border-[var(--border-hairline)]">
              <div className="font-mono-tech text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-2.5">
                {t.services.deliverablesLabel}
              </div>
              <ul className="space-y-1.5 text-sm">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="font-mono-tech text-[var(--accent-primary)]">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
