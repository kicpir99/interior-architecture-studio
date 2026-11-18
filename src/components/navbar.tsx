'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { Drawer } from 'vaul';
import { useLanguage } from '@/context/language-context';
import { useTheme } from '@/context/theme-context';
import { scrollToSection } from '@/lib/scroll';

export function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navItems = [
    { id: 'oferta', href: '/#oferta', label: t.nav.services },
    { id: 'realizacje', href: '/#realizacje', label: t.nav.portfolio },
    { id: 'zespol', href: '/#zespol', label: t.nav.team },
    { id: 'proces', href: '/#proces', label: t.nav.process },
    { id: 'kalkulator', href: '/#kalkulator', label: t.nav.calculator },
    { id: 'kontakt', href: '/#kontakt', label: t.nav.contact },
  ];

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
    closeDrawer = false
  ) => {
    if (pathname === '/') {
      e.preventDefault();
      if (closeDrawer) {
        setDrawerOpen(false);
        setTimeout(() => scrollToSection(sectionId), 120);
      } else {
        scrollToSection(sectionId);
      }
    } else if (closeDrawer) {
      setDrawerOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[var(--surface-primary)]/95 backdrop-blur-xs border-b border-[var(--border-hairline)]">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex flex-col leading-none group">
          <span className="font-display font-bold text-base tracking-[-0.03em] text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
            {t.nav.brand}
          </span>
          <span className="font-mono-tech text-[10px] tracking-[0.06em] text-[var(--text-muted)] mt-1">
            {t.nav.brandSub}
          </span>
        </Link>
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => handleAnchorClick(e, item.id)}
              className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div
            role="group"
            aria-label="Language switcher"
            className="flex border border-[var(--border-hairline)] rounded-[2px] overflow-hidden bg-[var(--bg-primary)]"
          >
            <button
              type="button"
              onClick={() => setLang('pl')}
              className={`px-2.5 py-1.5 font-mono-tech text-xs cursor-pointer transition-colors ${
                lang === 'pl'
                  ? 'bg-[var(--surface-inverted)] text-white'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              PL
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-2.5 py-1.5 font-mono-tech text-xs cursor-pointer transition-colors ${
                lang === 'en'
                  ? 'bg-[var(--surface-inverted)] text-white'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              EN
            </button>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={t.nav.themeToggle}
            className="p-2 border border-[var(--border-hairline)] bg-[var(--bg-primary)] rounded-[2px] text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition-colors cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <Link
            href="/#kalkulator"
            onClick={(e) => handleAnchorClick(e, 'kalkulator')}
            className="hidden sm:inline-flex items-center px-4 py-2 bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-white text-xs font-semibold tracking-wide rounded-[2px] transition-colors"
          >
            {t.nav.cta}
          </Link>
          <div className="lg:hidden">
            <Drawer.Root open={drawerOpen} onOpenChange={setDrawerOpen}>
              <Drawer.Trigger asChild>
                <button
                  type="button"
                  aria-label={t.nav.menuOpen}
                  className="p-2 border border-[var(--border-hairline)] bg-[var(--bg-primary)] rounded-[2px] text-[var(--text-primary)] cursor-pointer"
                >
                  <Menu className="w-5 h-5" />
                </button>
              </Drawer.Trigger>
              <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/60 z-50" />
                <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--surface-primary)] text-[var(--text-primary)] rounded-t-[4px] border-t border-[var(--border-hairline)] p-6 outline-none">
                  <div className="mx-auto w-10 h-1 bg-[var(--border-hairline)] mb-5" />
                  <div className="flex justify-between items-center mb-6">
                    <Drawer.Title className="font-display font-bold text-lg">
                      {t.nav.brand}
                    </Drawer.Title>
                    <button
                      type="button"
                      onClick={() => setDrawerOpen(false)}
                      className="p-1.5 border border-[var(--border-hairline)] rounded-[2px]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <nav className="flex flex-col gap-3">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={(e) => handleAnchorClick(e, item.id, true)}
                        className="py-2.5 px-3 bg-[var(--bg-primary)] rounded-[2px] font-medium text-base"
                      >
                        {item.label}
                      </Link>
                    ))}
                    <Link
                      href="/#kalkulator"
                      onClick={(e) => handleAnchorClick(e, 'kalkulator', true)}
                      className="mt-2 py-3 px-4 bg-[var(--accent-primary)] text-white text-center font-semibold rounded-[2px]"
                    >
                      {t.nav.cta}
                    </Link>
                  </nav>
                </Drawer.Content>
              </Drawer.Portal>
            </Drawer.Root>
          </div>
        </div>
      </div>
    </header>
  );
}
