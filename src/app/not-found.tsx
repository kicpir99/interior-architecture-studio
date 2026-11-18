'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function NotFoundPage() {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-[920px] w-full mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-24">
        <div className="bg-[var(--surface-primary)] p-8 sm:p-12 rounded-[2px]">
          <div className="font-mono-tech text-xs text-[var(--accent-primary)] mb-3">
            404 · {lang === 'pl' ? 'BRAK STRONY' : 'PAGE NOT FOUND'}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-[-0.03em] mb-4">
            {lang === 'pl'
              ? 'Nie znaleziono wskazanej realizacji ani strony.'
              : 'The requested project or page could not be found.'}
          </h1>
          <p className="text-sm text-[var(--text-muted)] max-w-lg mb-8">
            {lang === 'pl'
              ? 'Sprawdź adres URL lub wróć na stronę główną, aby zobaczyć aktualne realizacje i kalkulator wyceny.'
              : 'Check the URL or return to the home page to view completed projects and the cost estimator.'}
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-white text-sm font-semibold rounded-[2px] transition-colors"
          >
            {lang === 'pl' ? 'Wróć na stronę główną →' : 'Back to home page →'}
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
