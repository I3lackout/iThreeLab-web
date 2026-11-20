export type ResourceKey = 'MCCC' | 'FUEL' | 'GAS';

export type ResourceBalances = Record<ResourceKey, number>;

export interface ResourceShare {
  resource: ResourceKey;
  amount: number;
  sharePct: number;
}

export interface ResourceAnalysisResult {
  source: 'local-lab' | 'offline-synthetic';
  totalUnits: number;
  dominantResource: ResourceKey | 'NONE';
  shares: ResourceShare[];
  raw?: Record<string, unknown>;
}

export interface PricingSimulationInput {
  basePrice: number;
  resource: ResourceKey;
  membershipLevel: string;
  membershipDiscountRate: number;
  participationScore: number;
  participationDiscountMax: number;
  maximumTotalDiscount: number;
}

export interface PricingSimulationResult {
  source: 'local-lab' | 'offline-synthetic';
  basePrice: number;
  effectiveDiscountRate: number;
  finalPrice: number;
  discountAmount: number;
  capped: boolean;
  raw?: Record<string, unknown>;
}

export interface ForecastInput {
  resource: ResourceKey;
  currentBalance: number;
  dailyInflow: number;
  dailyOutflow: number;
  horizonDays: number;
  inflowMultiplier: number;
  outflowMultiplier: number;
  reserveThreshold: number;
}

export interface ForecastResult {
  source: 'local-lab' | 'offline-synthetic';
  netDailyFlow: number;
  projectedBalance: number;
  netChange: number;
  reserveBreached: boolean;
  raw?: Record<string, unknown>;
}

export interface LabHealthResult {
  status: string;
  service: string;
  timestamp: string;
}

export interface SyntheticPreviewResult {
  evaluation_type: string;
  financial_write_access: boolean;
  transaction_executed: boolean;
  [key: string]: unknown;
}
