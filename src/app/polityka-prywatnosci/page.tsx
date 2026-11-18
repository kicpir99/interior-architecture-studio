'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function PrivacyPolicyPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-[920px] w-full mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
        <div className="mb-6">
          <Link
            href="/"
            className="font-mono-tech text-xs text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors"
          >
            {t.privacy.backHome}
          </Link>
        </div>

        <article className="bg-[var(--surface-primary)] p-7 sm:p-10 rounded-[2px] space-y-6">
          <header className="border-b border-[var(--border-hairline)] pb-5">
            <h1 className="font-display text-3xl font-semibold tracking-[-0.02em]">
              {t.privacy.title}
            </h1>
            <p className="font-mono-tech text-xs text-[var(--text-muted)] mt-2">
              {t.privacy.updated}
            </p>
          </header>

          <div className="space-y-6">
            {t.privacy.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-lg font-semibold mb-2">
                  {section.heading}
                </h2>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
