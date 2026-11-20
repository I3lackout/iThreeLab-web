import type {
  ForecastInput,
  ForecastResult,
  PricingSimulationInput,
  PricingSimulationResult,
  ResourceAnalysisResult,
  ResourceBalances,
  ResourceKey,
} from './types';

const RESOURCE_KEYS: ResourceKey[] = ['MCCC', 'FUEL', 'GAS'];

function nonNegative(value: number): number {
  if (!Number.isFinite(value) || value < 0) {
    return 0;
  }
  return value;
}

function clampRate(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }
  return Math.min(1, Math.max(0, value));
}

function round4(value: number): number {
  return Math.round(value * 10000) / 10000;
}

export function simulateResourceAnalysis(balances: ResourceBalances): ResourceAnalysisResult {
  const sanitized: ResourceBalances = {
    MCCC: nonNegative(balances.MCCC),
    FUEL: nonNegative(balances.FUEL),
    GAS: nonNegative(balances.GAS),
  };

  const totalUnits = RESOURCE_KEYS.reduce((sum, key) => sum + sanitized[key], 0);
  let dominantResource: ResourceKey | 'NONE' = 'NONE';
  let maxAmount = 0;

  const shares = RESOURCE_KEYS.map((resource) => {
    const amount = round4(sanitized[resource]);
    if (amount > maxAmount) {
      maxAmount = amount;
      dominantResource = resource;
    }
    const sharePct = totalUnits > 0 ? Math.round((amount / totalUnits) * 10000) / 100 : 0;
    return { resource, amount, sharePct };
  });

  return {
    source: 'offline-synthetic',
    totalUnits: round4(totalUnits),
    dominantResource,
    shares,
  };
}

export function simulatePricingLocally(input: PricingSimulationInput): PricingSimulationResult {
  const basePrice = nonNegative(input.basePrice);
  const membershipRate = clampRate(input.membershipDiscountRate);
  const participationScore = clampRate(input.participationScore);
  const participationMax = clampRate(input.participationDiscountMax);
  const maxTotal = clampRate(input.maximumTotalDiscount);

  const participationDiscount = participationScore * participationMax;
  const uncapped = membershipRate + participationDiscount;
  const effectiveDiscountRate = round4(Math.min(maxTotal, uncapped));
  const discountAmount = round4(basePrice * effectiveDiscountRate);
  const finalPrice = round4(Math.max(0, basePrice - discountAmount));

  return {
    source: 'offline-synthetic',
    basePrice: round4(basePrice),
    effectiveDiscountRate,
    finalPrice,
    discountAmount,
    capped: uncapped > maxTotal,
  };
}

export function simulateForecastLocally(input: ForecastInput): ForecastResult {
  const currentBalance = nonNegative(input.currentBalance);
  const dailyInflow = nonNegative(input.dailyInflow) * nonNegative(input.inflowMultiplier);
  const dailyOutflow = nonNegative(input.dailyOutflow) * nonNegative(input.outflowMultiplier);
  const horizonDays = Math.min(365, Math.max(1, Math.round(input.horizonDays || 1)));
  const reserveThreshold = nonNegative(input.reserveThreshold);

  const netDailyFlow = round4(dailyInflow - dailyOutflow);
  const netChange = round4(netDailyFlow * horizonDays);
  const projectedBalance = round4(currentBalance + netChange);

  return {
    source: 'offline-synthetic',
    netDailyFlow,
    projectedBalance,
    netChange,
    reserveBreached: projectedBalance < reserveThreshold,
  };
}
