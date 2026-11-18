'use client';

import React, { useState } from 'react';
import { Navbar } from './navbar';
import { HeroSection } from './hero-section';
import { ServicesSection } from './services-section';
import { PortfolioSection } from './portfolio-section';
import { TeamSection } from './team-section';
import { ProcessSection } from './process-section';
import { CostCalculator, type AttachedEstimate } from './cost-calculator';
import { ContactForm } from './contact-form';
import { Footer } from './footer';

interface HomeClientProps {
  initialArea?: number;
}

export function HomeClient({ initialArea }: HomeClientProps) {
  const [calculatorArea, setCalculatorArea] = useState<number | undefined>(initialArea);
  const [attachedEstimate, setAttachedEstimate] = useState<AttachedEstimate | null>(null);

  const handleTransferToContact = (estimate: AttachedEstimate) => {
    setAttachedEstimate(estimate);
    const el = document.getElementById('kontakt');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectProjectArea = (areaM2: number) => {
    setCalculatorArea(areaM2);
    const el = document.getElementById('kalkulator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-[1320px] w-full mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-10 space-y-16 sm:space-y-20">
        <div className="print:hidden space-y-16 sm:space-y-20">
          <HeroSection />
          <ServicesSection />
          <PortfolioSection onSelectProjectArea={handleSelectProjectArea} />
          <TeamSection />
          <ProcessSection />
        </div>
        <CostCalculator
          key={calculatorArea ?? 'default'}
          initialArea={calculatorArea}
          onTransferToContact={handleTransferToContact}
        />
        <div className="print:hidden">
          <ContactForm
            attachedEstimate={attachedEstimate}
            onClearEstimate={() => setAttachedEstimate(null)}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
