import { describe, expect, it } from 'vitest';
import { calculateEstimate, type CalculatorState } from '../calculator';
import { buildInvestmentSchedule } from '../schedule';

describe('buildInvestmentSchedule', () => {
  it('excludes demolition phase on developer state and includes parallel carpentry', () => {
    const state: CalculatorState = {
      areaM2: 75,
      condition: 'developer',
      tier: 'turnkey_standard',
      addons: ['custom_carpentry'],
    };
    const breakdown = calculateEstimate(state);
    const schedule = buildInvestmentSchedule(state, breakdown);

    expect(schedule.totalWeeks).toBe(breakdown.estimatedWeeks);
    expect(schedule.phases.some((p) => p.id === 'demolition')).toBe(false);
    expect(schedule.phases.some((p) => p.id === 'carpentry_prod' && p.isParallel)).toBe(true);
    expect(schedule.parallelWeeksSaved).toBeGreaterThan(0);

    const maxEnd = Math.max(...schedule.phases.map((p) => p.endWeek));
    expect(maxEnd).toBe(schedule.totalWeeks);
  });

  it('includes demolition phase on secondary market property', () => {
    const state: CalculatorState = {
      areaM2: 120,
      condition: 'secondary',
      tier: 'turnkey_collector',
      addons: ['ducted_ac', 'smart_dali'],
    };
    const breakdown = calculateEstimate(state);
    const schedule = buildInvestmentSchedule(state, breakdown);

    const demo = schedule.phases.find((p) => p.id === 'demolition');
    expect(demo).toBeDefined();
    expect(demo?.durationWeeks).toBe(2);
    expect(schedule.phases.some((p) => p.id === 'carpentry_prod')).toBe(true);
  });

  it('allocates exact 100% of totalPLN across tranches for all tiers', () => {
    const cases: CalculatorState[] = [
      { areaM2: 45, condition: 'developer', tier: 'design_only', addons: [] },
      { areaM2: 95, condition: 'secondary', tier: 'turnkey_standard', addons: ['custom_carpentry', 'price_freeze'] },
      { areaM2: 210, condition: 'secondary', tier: 'turnkey_collector', addons: ['custom_carpentry', 'ducted_ac', 'smart_dali'] },
    ];

    for (const state of cases) {
      const breakdown = calculateEstimate(state);
      const schedule = buildInvestmentSchedule(state, breakdown);

      const pctSum = schedule.tranches.reduce((acc, t) => acc + t.percentage, 0);
      const plnSum = schedule.tranches.reduce((acc, t) => acc + t.amountPLN, 0);

      expect(pctSum).toBe(100);
      expect(plnSum).toBe(breakdown.totalPLN);
      for (const tranche of schedule.tranches) {
        expect(tranche.triggerWeek).toBeGreaterThanOrEqual(1);
        expect(tranche.triggerWeek).toBeLessThanOrEqual(schedule.totalWeeks);
      }
    }
  });
});
