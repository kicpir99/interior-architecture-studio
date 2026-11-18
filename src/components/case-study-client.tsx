'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/language-context';
import type { ProjectCaseStudy } from '@/data/projects';
import { formatPLN } from '@/lib/calculator';
import { Navbar } from './navbar';
import { Footer } from './footer';
import { BeforeAfterSlider } from './before-after-slider';

interface CaseStudyClientProps {
  project: ProjectCaseStudy;
}

export function CaseStudyClient({ project }: CaseStudyClientProps) {
  const { lang, t } = useLanguage();

  const formatBudget = (pln: number) =>
    lang === 'pl' ? formatPLN(pln) : `${pln.toLocaleString('en-US')} PLN`;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-[1320px] w-full mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12 space-y-10">
        <div>
          <Link
            href="/#realizacje"
            className="font-mono-tech text-xs text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors"
          >
            {t.caseStudy.backToPortfolio}
          </Link>
        </div>
        <section className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-[10px]">
          <div className="bg-[var(--surface-primary)] p-7 sm:p-10 rounded-[2px] flex flex-col justify-between gap-6">
            <div>
              <div className="font-mono-tech text-xs text-[var(--accent-primary)] mb-3">
                {project.code} · {project.city[lang]} · {project.year}
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-[-0.03em] leading-[1.06] mb-4">
                {project.title[lang]}
              </h1>
              <p className="text-base text-[var(--text-muted)] leading-relaxed">
                {project.summary[lang]}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-5 border-t border-[var(--border-hairline)] font-mono-tech text-xs">
              <div>
                <span className="block text-[10px] text-[var(--text-muted)]">
                  {t.portfolio.areaLabel}
                </span>
                <strong className="text-base">{project.areaM2} m²</strong>
              </div>
              <div>
                <span className="block text-[10px] text-[var(--text-muted)]">
                  {t.portfolio.budgetLabel}
                </span>
                <strong className="text-base">{formatBudget(project.budgetPLN)}</strong>
              </div>
              <div>
                <span className="block text-[10px] text-[var(--text-muted)]">
                  {t.portfolio.durationLabel}
                </span>
                <strong className="text-base">
                  {project.durationWeeks} {t.calculator.weeksUnit}
                </strong>
              </div>
            </div>
          </div>

          <div className="bg-[var(--surface-inverted)] rounded-[2px] overflow-hidden">
            <Image
              src={project.image}
              alt={project.title[lang]}
              width={800}
              height={520}
              className="w-full h-full object-cover min-h-[280px]"
            />
          </div>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
          <div className="bg-[var(--surface-primary)] p-7 rounded-[2px]">
            <h2 className="font-display text-xl font-semibold mb-3">
              {t.caseStudy.challengeTitle}
            </h2>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              {project.challenge[lang]}
            </p>
          </div>
          <div className="bg-[var(--surface-primary)] p-7 rounded-[2px]">
            <h2 className="font-display text-xl font-semibold mb-3">
              {t.caseStudy.solutionTitle}
            </h2>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              {project.solution[lang]}
            </p>
          </div>
        </section>
        <section className="bg-[var(--surface-primary)] p-7 sm:p-9 rounded-[2px]">
          <h2 className="font-display text-xl font-semibold mb-5">
            {t.caseStudy.materialsTitle}
          </h2>
          <div className="divide-y divide-[var(--border-hairline)]">
            {project.materials.map((mat) => (
              <div
                key={mat.name.pl}
                className="py-3.5 flex flex-col sm:flex-row sm:justify-between gap-1 text-sm"
              >
                <span className="font-medium">{mat.name[lang]}</span>
                <span className="font-mono-tech text-xs text-[var(--text-muted)]">
                  {mat.spec[lang]}
                </span>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold mb-4">
            {t.caseStudy.beforeAfterTitle}
          </h2>
          <BeforeAfterSlider scenes={[project.scene]} hideSceneSelector tall />
        </section>
        <section className="bg-[var(--surface-inverted)] text-[var(--text-on-dark)] p-7 sm:p-10 rounded-[2px] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <h2 className="font-display text-2xl font-semibold mb-2">
              {t.caseStudy.ctaTitle}
            </h2>
            <p className="text-sm text-[var(--text-on-dark-muted)] max-w-xl">
              {t.caseStudy.ctaDesc}
            </p>
          </div>
          <Link
            href={`/?area=${project.areaM2}#kalkulator`}
            className="px-6 py-3.5 bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-white font-semibold text-sm rounded-[2px] whitespace-nowrap transition-colors"
          >
            {t.caseStudy.ctaBtn}
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
