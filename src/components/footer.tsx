'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[var(--surface-inverted)] text-[var(--text-on-dark)] border-t border-[var(--border-dark)] mt-16">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 py-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <div className="font-display font-bold text-base tracking-[-0.02em]">
            {t.nav.brand}
          </div>
          <p className="text-xs text-[var(--text-on-dark-muted)] mt-1.5 max-w-md">
            {t.footer.tagline}
          </p>
        </div>

        <div className="flex flex-col sm:items-end gap-2 font-mono-tech text-xs text-[var(--text-on-dark-muted)]">
          <Link
            href="/polityka-prywatnosci"
            className="text-white hover:text-[var(--accent-primary)] underline underline-offset-4 transition-colors"
          >
            {t.footer.privacyLink}
          </Link>
          <span>{t.footer.rights}</span>
          <span className="text-[11px] opacity-75">{t.footer.portfolioNote}</span>
        </div>
      </div>
    </footer>
  );
}
