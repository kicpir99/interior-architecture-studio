import type { Metadata } from 'next';
import { Schibsted_Grotesk, DM_Sans, IBM_Plex_Mono } from 'next/font/google';
import { Toaster } from 'sonner';
import { LanguageProvider } from '@/context/language-context';
import { ThemeProvider } from '@/context/theme-context';
import './globals.css';

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ['latin', 'latin-ext'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'KRAWCZYK & PARTNERZY — Architektura Wnętrz i Realizacje Pod Klucz',
  description:
    'Kompleksowe projektowanie wnętrz i generalne wykonawstwo pod klucz w Warszawie, Krakowie i Wrocławiu. Stały kosztorys, jedna umowa, 36 miesięcy rękojmi.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${schibstedGrotesk.variable} ${dmSans.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <LanguageProvider>
            {children}
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: '#161715',
                  color: '#F4F3EF',
                  border: '1px solid #2C2E2A',
                  borderRadius: '2px',
                  fontFamily: 'var(--font-body), sans-serif',
                },
              }}
            />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
