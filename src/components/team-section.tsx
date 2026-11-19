'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/language-context';
import { TEAM_MEMBERS } from '@/data/team';

export function TeamSection() {
  const { lang, t } = useLanguage();
  const [visibleIds, setVisibleIds] = useState<Record<string, boolean>>({});
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia('(hover: none)').matches) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleIds((prev) => {
          let changed = false;
          const next = { ...prev };
          for (const entry of entries) {
            const id = (entry.target as HTMLElement).dataset.memberId;
            if (!id) continue;
            const isFullInView = entry.isIntersecting && entry.intersectionRatio >= 0.85;
            if (Boolean(next[id]) !== isFullInView) {
              next[id] = isFullInView;
              changed = true;
            }
          }
          return changed ? next : prev;
        });
      },
      { threshold: [0, 0.5, 0.85, 1] }
    );

    for (const el of Object.values(cardRefs.current)) {
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="zespol" className="scroll-mt-24">
      <div className="flex flex-wrap justify-between items-baseline gap-3 border-b border-[var(--border-hairline)] pb-3 mb-6">
        <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-[-0.02em]">
          {t.team.sectionTitle}
        </h2>
        <span className="font-mono-tech text-xs text-[var(--text-muted)]">
          {t.team.sectionMeta}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[10px]">
        {TEAM_MEMBERS.map((member) => {
          const isInViewColor = Boolean(visibleIds[member.id]);
          return (
            <article
              key={member.id}
              className="bg-[var(--surface-primary)] rounded-[2px] overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div
                  ref={(el) => {
                    cardRefs.current[member.id] = el;
                  }}
                  data-member-id={member.id}
                  className="relative aspect-[4/5] bg-[var(--surface-secondary)] overflow-hidden group"
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className={`object-cover object-top transition-all duration-500 contrast-[1.06] group-hover:grayscale-0 group-hover:brightness-100 ${
                      isInViewColor ? 'grayscale-0 brightness-100' : 'grayscale brightness-95'
                    }`}
                  />
                  <span className="absolute top-3 right-3 px-2 py-1 bg-[#161715]/85 text-white font-mono-tech text-[11px] rounded-[2px]">
                    {member.projectsCount} PRJ
                  </span>
                </div>

              <div className="p-6">
                <h3 className="font-display text-lg font-semibold tracking-[-0.02em]">
                  {member.name}
                </h3>
                <div className="text-xs font-medium text-[var(--accent-primary)] mt-1 mb-3">
                  {member.role[lang]}
                </div>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {member.bio[lang]}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6">
              <div className="pt-3 border-t border-[var(--border-hairline)]">
                <div className="font-mono-tech text-[10px] text-[var(--text-muted)] uppercase">
                  {t.team.credentialsLabel}
                </div>
                <div className="font-mono-tech text-xs mt-1 text-[var(--text-primary)]">
                  {member.credentials[lang]}
                </div>
              </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
