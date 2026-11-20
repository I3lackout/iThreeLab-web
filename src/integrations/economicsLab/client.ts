import type {
  ForecastInput,
  ForecastResult,
  LabHealthResult,
  PricingSimulationInput,
  PricingSimulationResult,
  ResourceAnalysisResult,
  ResourceBalances,
  SyntheticPreviewResult,
} from './types';

export interface EconomicsLabConfig {
  enabled: boolean;
  baseUrl: string;
}

const DEFAULT_PROXY_BASE = '/api/economics-lab';

export function isAllowedLabBaseUrl(rawUrl: string): boolean {
  const trimmed = rawUrl.trim();
  if (!trimmed) {
    return false;
  }
  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) {
    return !/[\\?#]/.test(trimmed);
  }
  try {
    const parsed = new URL(trimmed);
    const isLoopback =
      parsed.hostname === '127.0.0.1' ||
      parsed.hostname === 'localhost' ||
      parsed.hostname === '[::1]';
    return !parsed.username && !parsed.password && !parsed.search && !parsed.hash && (parsed.protocol === 'http:' || parsed.protocol === 'https:') && isLoopback;
  } catch {
    return false;
  }
}

export function readEconomicsLabConfig(
  env: Record<string, string | undefined> = import.meta.env,
): EconomicsLabConfig {
  const enabled = String(env.VITE_ECONOMICS_LAB_ENABLED ?? '').toLowerCase() === 'true';
  const candidate = env.VITE_ECONOMICS_LAB_BASE_URL?.trim() || DEFAULT_PROXY_BASE;
  const baseUrl = isAllowedLabBaseUrl(candidate) ? candidate.replace(/\/+$/, '') : DEFAULT_PROXY_BASE;
  return { enabled, baseUrl };
}

async function requestLabJson<T>(
  path: string,
  options: RequestInit = {},
  config: EconomicsLabConfig = readEconomicsLabConfig(),
): Promise<T> {
  if (!config.enabled) {
    throw new Error('Server-Berechnung ist nicht aktiviert.');
  }
  if (!isAllowedLabBaseUrl(config.baseUrl)) {
    throw new Error('Ungültige Economics-Lab-Basis-URL.');
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 4500);

  try {
    const response = await fetch(`${config.baseUrl}${path}`, {
      ...options,
      credentials: 'omit',
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...options.headers,
      },
    });

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      const detail = typeof body?.detail === 'string' ? ` ${body.detail.slice(0, 300)}` : '';
      throw new Error(`Economics Lab antwortete mit HTTP ${response.status}.${detail}`);
    }

    if (!response.headers.get('content-type')?.includes('application/json')) {
      throw new Error('Economics API ist nicht eingerichtet (keine JSON-Antwort).');
    }
    return (await response.json()) as T;
  } finally {
    clearTimeout(timer);
  }
}

export async function checkLabHealth(
  config: EconomicsLabConfig = readEconomicsLabConfig(),
): Promise<LabHealthResult> {
  return requestLabJson<LabHealthResult>('/health', { method: 'GET' }, config);
}

export async function fetchSyntheticPreview(
  token: string,
  config: EconomicsLabConfig = readEconomicsLabConfig(),
): Promise<SyntheticPreviewResult> {
  const trimmed = token.trim();
  if (trimmed.length < 32) {
    throw new Error('Für /synthetic-preview ist ein Token mit mindestens 32 Zeichen erforderlich.');
  }
  const preview = await requestLabJson<SyntheticPreviewResult>(
    '/api/v1/integration/economics/synthetic-preview',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${trimmed}`,
      },
    },
    config,
  );

  if (
    preview.evaluation_type !== 'read_only_synthetic_snapshot' ||
    preview.financial_write_access !== false ||
    preview.transaction_executed !== false
  ) {
    throw new Error('Antwort hat die Read-Only-Prüfung nicht bestanden.');
  }

  return preview;
}

export async function analyzeResourcesRemote(
  balances: ResourceBalances,
  fallback: ResourceAnalysisResult,
  config: EconomicsLabConfig = readEconomicsLabConfig(),
): Promise<ResourceAnalysisResult> {
  const raw = await requestLabJson<Record<string, unknown>>(
    '/api/v1/economics/resources/analyze',
    {
      method: 'POST',
      body: JSON.stringify({
        balances: {
          McCC: String(balances.MCCC),
          FUEL: String(balances.FUEL),
          GAS: String(balances.GAS),
        },
      }),
    },
    config,
  );
  const resources = raw.resources as Record<string, { balance: unknown }> | undefined;
  if (!resources) throw new Error('Ungültige Ressourcen-Antwort.');
  const shares = fallback.shares.map((share) => ({
    ...share,
    amount: responseNumber(resources[share.resource === 'MCCC' ? 'McCC' : share.resource]?.balance),
  }));
  const totalUnits = shares.reduce((total, share) => total + share.amount, 0);
  const dominant = shares.reduce<(typeof shares)[number] | null>(
    (best, share) => !best || share.amount > best.amount ? share : best, null,
  );
  return {
    source: 'local-lab', totalUnits,
    dominantResource: dominant && dominant.amount > 0 ? dominant.resource : 'NONE',
    shares: shares.map((share) => ({ ...share, sharePct: totalUnits > 0 ? Math.round(share.amount / totalUnits * 10000) / 100 : 0 })),
    raw,
  };
}

export async function simulatePricingRemote(
  input: PricingSimulationInput,
  fallback: PricingSimulationResult,
  config: EconomicsLabConfig = readEconomicsLabConfig(),
): Promise<PricingSimulationResult> {
  const raw = await requestLabJson<Record<string, unknown>>(
    '/api/v1/economics/pricing/simulate',
    {
      method: 'POST',
      body: JSON.stringify({
        base_price: String(input.basePrice),
        resource: input.resource === 'MCCC' ? 'McCC' : input.resource,
        membership_level: input.membershipLevel,
        membership_discount_rate: String(input.membershipDiscountRate),
        participation_score: String(Number((input.participationScore * 100).toFixed(8))),
        participation_discount_max: String(input.participationDiscountMax),
        maximum_total_discount: String(input.maximumTotalDiscount),
      }),
    },
    config,
  );

  const finalPrice = responseNumber(raw.final_price);
  const effectiveDiscountRate = responseNumber(raw.total_discount_rate);

  return {
    ...fallback,
    source: 'local-lab',
    finalPrice,
    discountAmount: responseNumber(raw.discount_amount),
    capped: false,
    effectiveDiscountRate,
    raw,
  };
}

export async function forecastResourceRemote(
  input: ForecastInput,
  fallback: ForecastResult,
  config: EconomicsLabConfig = readEconomicsLabConfig(),
): Promise<ForecastResult> {
  const raw = await requestLabJson<Record<string, unknown>>(
    '/api/v1/economics/forecast',
    {
      method: 'POST',
      body: JSON.stringify({
        resource: input.resource === 'MCCC' ? 'McCC' : input.resource,
        current_balance: String(input.currentBalance),
        daily_inflow: String(input.dailyInflow),
        daily_outflow: String(input.dailyOutflow),
        horizon_days: input.horizonDays,
        inflow_multiplier: String(input.inflowMultiplier),
        outflow_multiplier: String(input.outflowMultiplier),
        reserve_threshold: String(input.reserveThreshold),
      }),
    },
    config,
  );

  const projectedBalance = responseNumber(raw.projected_balance);
  const netDailyFlow = responseNumber(raw.daily_net_flow);

  return {
    ...fallback,
    source: 'local-lab',
    projectedBalance,
    netDailyFlow,
    netChange: projectedBalance - input.currentBalance,
    reserveBreached: projectedBalance < input.reserveThreshold,
    raw,
  };
}

function responseNumber(value: unknown): number {
  if ((typeof value !== 'number' && typeof value !== 'string') || value === '' || !Number.isFinite(Number(value))) {
    throw new Error('Ungültiger Zahlenwert in der Economics-Antwort.');
  }
  return Number(value);
}
