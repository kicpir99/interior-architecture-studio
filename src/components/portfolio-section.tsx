'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X } from 'lucide-react';
import { Drawer } from 'vaul';
import { useLanguage } from '@/context/language-context';
import { PROJECTS, type ProjectCaseStudy, type ProjectCategory } from '@/data/projects';
import { formatPLN } from '@/lib/calculator';

type FilterCategory = 'all' | ProjectCategory;

interface PortfolioSectionProps {
  onSelectProjectArea: (areaM2: number) => void;
}

export function PortfolioSection({ onSelectProjectArea }: PortfolioSectionProps) {
  const { lang, t } = useLanguage();
  const [filter, setFilter] = useState<FilterCategory>('all');
  const [previewProject, setPreviewProject] = useState<ProjectCaseStudy | null>(null);

  const filtered =
    filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  const filterButtons: { id: FilterCategory; label: string }[] = [
    { id: 'all', label: t.portfolio.filters.all },
    { id: 'apartments', label: t.portfolio.filters.apartments },
    { id: 'houses', label: t.portfolio.filters.houses },
    { id: 'offices', label: t.portfolio.filters.offices },
  ];

  const formatBudget = (pln: number) =>
    lang === 'pl' ? formatPLN(pln) : `${pln.toLocaleString('en-US')} PLN`;

  return (
    <section id="realizacje" className="scroll-mt-24">
      <div className="flex flex-wrap justify-between items-baseline gap-3 border-b border-[var(--border-hairline)] pb-3 mb-5">
        <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-[-0.02em]">
          {t.portfolio.sectionTitle}
        </h2>
        <span className="font-mono-tech text-xs text-[var(--text-muted)]">
          {t.portfolio.sectionMeta}
        </span>
      </div>
      <div className="flex flex-wrap gap-2 mb-5">
        {filterButtons.map((btn) => {
          const active = filter === btn.id;
          return (
            <button
              key={btn.id}
              type="button"
              onClick={() => setFilter(btn.id)}
              className={`px-4 py-2 font-mono-tech text-xs rounded-[2px] border transition-colors cursor-pointer ${
                active
                  ? 'bg-[var(--surface-inverted)] text-white border-[var(--surface-inverted)]'
                  : 'bg-[var(--surface-primary)] text-[var(--text-muted)] border-[var(--border-hairline)] hover:text-[var(--text-primary)]'
              }`}
            >
              {btn.label}
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[10px]">
        {filtered.map((project) => (
          <article
            key={project.slug}
            className="bg-[var(--surface-primary)] rounded-[2px] overflow-hidden flex flex-col justify-between"
          >
            <div>
              <Link href={`/realizacje/${project.slug}`} className="block overflow-hidden bg-[#181917]">
                <Image
                  src={project.image}
                  alt={project.title[lang]}
                  width={800}
                  height={520}
                  className="w-full h-52 object-cover hover:scale-[1.02] transition-transform duration-300"
                />
              </Link>

              <div className="p-6">
                <div className="flex justify-between items-center font-mono-tech text-[11px] text-[var(--text-muted)] mb-2">
                  <span>{project.code}</span>
                  <span>
                    {project.city[lang]} · {project.year}
                  </span>
                </div>

                <h3 className="font-display text-lg font-semibold tracking-[-0.02em] mb-2">
                  <Link
                    href={`/realizacje/${project.slug}`}
                    className="hover:text-[var(--accent-primary)] transition-colors"
                  >
                    {project.title[lang]}
                  </Link>
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {project.subtitle[lang]}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6">
              <div className="grid grid-cols-3 gap-2 py-3 mb-4 border-y border-[var(--border-hairline)] font-mono-tech text-xs">
                <div>
                  <span className="block text-[10px] text-[var(--text-muted)]">
                    {t.portfolio.areaLabel}
                  </span>
                  <strong>{project.areaM2} m²</strong>
                </div>
                <div>
                  <span className="block text-[10px] text-[var(--text-muted)]">
                    {t.portfolio.budgetLabel}
                  </span>
                  <strong>{formatBudget(project.budgetPLN)}</strong>
                </div>
                <div>
                  <span className="block text-[10px] text-[var(--text-muted)]">
                    {t.portfolio.durationLabel}
                  </span>
                  <strong>
                    {project.durationWeeks} {t.calculator.weeksUnit}
                  </strong>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewProject(project)}
                  className="px-3.5 py-2 bg-[var(--surface-secondary)] hover:border-[var(--text-muted)] border border-[var(--border-hairline)] text-xs font-medium rounded-[2px] cursor-pointer transition-colors"
                >
                  {t.portfolio.quickPreview}
                </button>
                <Link
                  href={`/realizacje/${project.slug}`}
                  className="font-mono-tech text-xs font-medium text-[var(--accent-primary)] hover:underline underline-offset-4"
                >
                  {t.portfolio.fullCaseStudy}
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
      <Drawer.Root
        open={previewProject !== null}
        onOpenChange={(open) => {
          if (!open) setPreviewProject(null);
        }}
      >
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/65 z-50" />
          <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 max-h-[88vh] overflow-y-auto bg-[var(--surface-primary)] text-[var(--text-primary)] rounded-t-[4px] border-t border-[var(--border-hairline)] p-6 sm:p-8 outline-none">
            {previewProject && (
              <div className="max-w-3xl mx-auto">
                <div className="mx-auto w-12 h-1 bg-[var(--border-hairline)] mb-5" />
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div>
                    <div className="font-mono-tech text-xs text-[var(--accent-primary)] mb-1">
                      {previewProject.code} · {previewProject.city[lang]} · {previewProject.areaM2} m²
                    </div>
                    <Drawer.Title className="font-display text-2xl font-semibold tracking-[-0.02em]">
                      {previewProject.title[lang]}
                    </Drawer.Title>
                  </div>
                  <button
                    type="button"
                    aria-label={t.portfolio.closeDrawer}
                    onClick={() => setPreviewProject(null)}
                    className="p-2 border border-[var(--border-hairline)] rounded-[2px] cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                  {previewProject.summary[lang]}
                </p>

                <div className="bg-[var(--bg-primary)] p-4 rounded-[2px] mb-6">
                  <div className="font-mono-tech text-xs uppercase text-[var(--text-muted)] mb-3">
                    {t.portfolio.materialsLabel}
                  </div>
                  <div className="space-y-2 text-sm">
                    {previewProject.materials.map((mat) => (
                      <div
                        key={mat.name.pl}
                        className="flex flex-col sm:flex-row sm:justify-between gap-1 border-b border-[var(--border-hairline)] pb-2 last:border-b-0 last:pb-0"
                      >
                        <span className="font-medium">{mat.name[lang]}</span>
                        <span className="font-mono-tech text-xs text-[var(--text-muted)]">
                          {mat.spec[lang]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      const area = previewProject.areaM2;
                      setPreviewProject(null);
                      onSelectProjectArea(area);
                    }}
                    className="px-5 py-3 bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-white text-sm font-semibold rounded-[2px] cursor-pointer"
                  >
                    {t.portfolio.calculateSimilar}
                  </button>
                  <Link
                    href={`/realizacje/${previewProject.slug}`}
                    onClick={() => setPreviewProject(null)}
                    className="px-5 py-3 bg-[var(--surface-secondary)] border border-[var(--border-hairline)] text-sm font-medium rounded-[2px]"
                  >
                    {t.portfolio.fullCaseStudy}
                  </Link>
                </div>
              </div>
            )}
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </section>
  );
}
