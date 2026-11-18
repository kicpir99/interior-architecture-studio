import { describe, it, expect } from 'vitest';
import { calculateEstimate, clampArea, formatPLN, formatEUR } from '../calculator';

describe('calculateEstimate & clampArea', () => {
  it('calculates default configuration (75 m2, developer, turnkey_standard, custom_carpentry)', () => {
    const res = calculateEstimate({
      areaM2: 75,
      condition: 'developer',
      tier: 'turnkey_standard',
      addons: ['custom_carpentry'],
    });

    expect(res.baseWorkAndMaterialsPLN).toBe(292500);
    expect(res.demolitionAndInstallationsPLN).toBe(0);
    expect(res.carpentryPLN).toBe(38000);
    expect(res.acAndSmartPLN).toBe(0);
    expect(res.priceFreezeReservePLN).toBe(0);
    expect(res.totalPLN).toBe(330500);
    expect(res.totalEUR).toBe(Math.round(330500 / 4.3));
    expect(res.estimatedWeeks).toBe(11);
  });

  it('adds +650 PLN/m2 and +2 weeks for secondary market condition', () => {
    const res = calculateEstimate({
      areaM2: 60,
      condition: 'secondary',
      tier: 'turnkey_standard',
      addons: [],
    });

    expect(res.baseWorkAndMaterialsPLN).toBe(234000);
    expect(res.demolitionAndInstallationsPLN).toBe(39000);
    expect(res.totalPLN).toBe(273000);
    expect(res.estimatedWeeks).toBe(12);
  });

  it('supports design_only (2800 PLN/m2) and turnkey_collector (5400 PLN/m2) tiers', () => {
    const design = calculateEstimate({
      areaM2: 80,
      condition: 'developer',
      tier: 'design_only',
      addons: [],
    });
    expect(design.totalPLN).toBe(224000);
    expect(design.estimatedWeeks).toBe(8);

    const collector = calculateEstimate({
      areaM2: 100,
      condition: 'developer',
      tier: 'turnkey_collector',
      addons: [],
    });
    expect(collector.totalPLN).toBe(540000);
    expect(collector.estimatedWeeks).toBe(12);
  });

  it('calculates all addons and rounds +5% price freeze reserve correctly', () => {
    const res = calculateEstimate({
      areaM2: 50,
      condition: 'developer',
      tier: 'turnkey_standard',
      addons: ['custom_carpentry', 'ducted_ac', 'smart_dali', 'price_freeze'],
    });

    // subtotal = 50*3900 (195000) + 38000 + 18000 + 14000 = 265000
    // 5% = 13250
    expect(res.carpentryPLN).toBe(38000);
    expect(res.acAndSmartPLN).toBe(32000);
    expect(res.priceFreezeReservePLN).toBe(13250);
    expect(res.totalPLN).toBe(278250);
  });

  it('clamps area to [25, 250] and falls back to 75 on NaN', () => {
    expect(clampArea(10)).toBe(25);
    expect(clampArea(25)).toBe(25);
    expect(clampArea(400)).toBe(250);
    expect(clampArea(250)).toBe(250);
    expect(clampArea(Number.NaN)).toBe(75);
    expect(clampArea(undefined)).toBe(75);
  });

  it('formats PLN and EUR cleanly', () => {
    expect(formatPLN(330500)).toContain('330');
    expect(formatPLN(330500)).toContain('500');
    expect(formatEUR(76860)).toContain('76');
    expect(formatEUR(76860)).toContain('EUR');
  });
});
