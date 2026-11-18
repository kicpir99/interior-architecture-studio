export type PropertyCondition = 'developer' | 'secondary';
export type PackageTier = 'design_only' | 'turnkey_standard' | 'turnkey_collector';
export type AddonId = 'custom_carpentry' | 'ducted_ac' | 'smart_dali' | 'price_freeze';

export interface CalculatorState {
  areaM2: number;
  condition: PropertyCondition;
  tier: PackageTier;
  addons: AddonId[];
}

export interface CalculatorBreakdown {
  baseWorkAndMaterialsPLN: number;
  demolitionAndInstallationsPLN: number;
  carpentryPLN: number;
  acAndSmartPLN: number;
  priceFreezeReservePLN: number;
  totalPLN: number;
  totalEUR: number;
  estimatedWeeks: number;
}

export const MIN_AREA_M2 = 25;
export const MAX_AREA_M2 = 250;
export const DEFAULT_AREA_M2 = 75;
export const EUR_EXCHANGE_RATE = 4.3;

export const TIER_RATES_PLN: Record<PackageTier, number> = {
  design_only: 2800,
  turnkey_standard: 3900,
  turnkey_collector: 5400,
};

export const SECONDARY_SURCHARGE_PER_M2 = 650;

export const ADDON_PRICES_PLN = {
  custom_carpentry: 38000,
  ducted_ac: 18000,
  smart_dali: 14000,
} as const;

export function clampArea(area: number | undefined | null): number {
  if (typeof area !== 'number' || Number.isNaN(area) || !Number.isFinite(area)) {
    return DEFAULT_AREA_M2;
  }
  const rounded = Math.round(area);
  if (rounded < MIN_AREA_M2) return MIN_AREA_M2;
  if (rounded > MAX_AREA_M2) return MAX_AREA_M2;
  return rounded;
}

export function calculateEstimate(state: CalculatorState): CalculatorBreakdown {
  const area = clampArea(state.areaM2);
  const rate = TIER_RATES_PLN[state.tier];
  const baseWorkAndMaterialsPLN = area * rate;
  const demolitionAndInstallationsPLN =
    state.condition === 'secondary' ? area * SECONDARY_SURCHARGE_PER_M2 : 0;

  const addonsSet = new Set<AddonId>(state.addons);
  const carpentryPLN = addonsSet.has('custom_carpentry') ? ADDON_PRICES_PLN.custom_carpentry : 0;
  const acAndSmartPLN =
    (addonsSet.has('ducted_ac') ? ADDON_PRICES_PLN.ducted_ac : 0) +
    (addonsSet.has('smart_dali') ? ADDON_PRICES_PLN.smart_dali : 0);

  const subtotal =
    baseWorkAndMaterialsPLN + demolitionAndInstallationsPLN + carpentryPLN + acAndSmartPLN;

  const priceFreezeReservePLN = addonsSet.has('price_freeze')
    ? Math.round(subtotal * 0.05)
    : 0;

  const totalPLN = subtotal + priceFreezeReservePLN;
  const totalEUR = Math.round(totalPLN / EUR_EXCHANGE_RATE);

  const estimatedWeeks =
    state.tier === 'design_only'
      ? 6 + Math.ceil(area / 40)
      : 8 + Math.ceil(area / 30) + (state.condition === 'secondary' ? 2 : 0);

  return {
    baseWorkAndMaterialsPLN,
    demolitionAndInstallationsPLN,
    carpentryPLN,
    acAndSmartPLN,
    priceFreezeReservePLN,
    totalPLN,
    totalEUR,
    estimatedWeeks,
  };
}

export function formatPLN(amount: number): string {
  return `${Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} zł`;
}

export function formatEUR(amount: number): string {
  return `${Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} EUR`;
}
