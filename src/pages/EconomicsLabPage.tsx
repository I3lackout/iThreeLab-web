import { useMemo, useState } from 'react';
import {
  Activity,
  ArrowLeft,
  Calculator,
  Cpu,
  LineChart,
  RefreshCw,
  ShieldCheck,
  Sliders,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { DomainBadge } from '../components/ui/DomainBadge';
import { SectionHeader } from '../components/ui/SectionHeader';
import { useLanguage } from '../i18n/LanguageContext';
import {
  analyzeResourcesRemote,
  checkLabHealth,
  fetchSyntheticPreview,
  forecastResourceRemote,
  readEconomicsLabConfig,
  simulatePricingRemote,
} from '../integrations/economicsLab/client';
import {
  simulateForecastLocally,
  simulatePricingLocally,
  simulateResourceAnalysis,
} from '../integrations/economicsLab/simulator';
import type {
  ForecastInput,
  ForecastResult,
  PricingSimulationResult,
  ResourceAnalysisResult,
  LabHealthResult,
  PricingSimulationInput,
  ResourceBalances,
  ResourceKey,
  SyntheticPreviewResult,
} from '../integrations/economicsLab/types';

type LabTab = 'resources' | 'pricing' | 'forecast';

const RESOURCE_OPTIONS: ResourceKey[] = ['MCCC', 'FUEL', 'GAS'];

const DEFAULT_BALANCES: ResourceBalances = {
  MCCC: 1200,
  FUEL: 450,
  GAS: 280,
};

const DEFAULT_PRICING: PricingSimulationInput = {
  basePrice: 100,
  resource: 'MCCC',
  membershipLevel: 'Gold',
  membershipDiscountRate: 0.1,
  participationScore: 0.8,
  participationDiscountMax: 0.15,
  maximumTotalDiscount: 0.25,
};

const DEFAULT_FORECAST: ForecastInput = {
  resource: 'FUEL',
  currentBalance: 450,
  dailyInflow: 32,
  dailyOutflow: 18,
  horizonDays: 30,
  inflowMultiplier: 1,
  outflowMultiplier: 1,
  reserveThreshold: 200,
};

export function EconomicsLabPage() {
  const { t } = useLanguage();
  const labConfig = useMemo(() => readEconomicsLabConfig(), []);
  const [activeTab, setActiveTab] = useState<LabTab>('resources');

  const [balances, setBalances] = useState<ResourceBalances>(DEFAULT_BALANCES);
  const [pricing, setPricing] = useState<PricingSimulationInput>(DEFAULT_PRICING);
  const [forecast, setForecast] = useState<ForecastInput>(DEFAULT_FORECAST);

  const [health, setHealth] = useState<LabHealthResult | null>(null);
  const [bridgeStatus, setBridgeStatus] = useState<string | null>(null);
  const effectiveBridgeStatus =
    bridgeStatus ??
    (labConfig.enabled ? t.economicsLab.status.serverAvailable : t.economicsLab.status.offlineActive);
  const [bridgeBusy, setBridgeBusy] = useState(false);
  const [remoteResults, setRemoteResults] = useState<{
    resources?: ResourceAnalysisResult;
    pricing?: PricingSimulationResult;
    forecast?: ForecastResult;
  }>({});
  const livePayload = remoteResults[activeTab]?.raw;
  function clearRemoteResults() { setRemoteResults({}); }

  const [previewToken, setPreviewToken] = useState('');
  const [previewResult, setPreviewResult] = useState<SyntheticPreviewResult | null>(null);

  const localResourceResult = useMemo(() => simulateResourceAnalysis(balances), [balances]);
  const localPricingResult = useMemo(() => simulatePricingLocally(pricing), [pricing]);
  const localForecastResult = useMemo(() => simulateForecastLocally(forecast), [forecast]);

  const resourceResult = remoteResults.resources ?? localResourceResult;
  const pricingResult = remoteResults.pricing ?? localPricingResult;
  const forecastResult = remoteResults.forecast ?? localForecastResult;
  const pricingError = pricing.basePrice <= 0
    ? t.economicsLab.errors.basePricePositive
    : [pricing.membershipDiscountRate, pricing.participationScore, pricing.participationDiscountMax, pricing.maximumTotalDiscount].some((rate) => rate < 0 || rate > 1)
      ? t.economicsLab.errors.ratesRange
      : pricing.membershipDiscountRate + pricing.participationDiscountMax > pricing.maximumTotalDiscount
        ? t.economicsLab.errors.capExceeded
        : null;

  async function handleCheckHealth() {
    setBridgeBusy(true);
    try {
      const result = await checkLabHealth(labConfig);
      if (result.service !== 'i3-economics-intelligence' || result.status !== 'healthy') {
        throw new Error(t.economicsLab.status.unexpectedHealth);
      }
      setHealth(result);
      setBridgeStatus(`${t.economicsLab.status.connectedPrefix} ${result.service} (${result.status}).`);
    } catch (err) {
      setHealth(null);
      setBridgeStatus(
        err instanceof Error
          ? `${t.economicsLab.status.unreachableWithReasonPrefix}${err.message}${t.economicsLab.status.unreachableWithReasonSuffix}`
          : t.economicsLab.status.unreachableFallback,
      );
    } finally {
      setBridgeBusy(false);
    }
  }

  async function handleRunRemoteSimulation() {
    if (activeTab === 'pricing' && pricingError) { setBridgeStatus(pricingError); return; }
    clearRemoteResults();
    setBridgeBusy(true);
    try {
      if (activeTab === 'resources') {
        const res = await analyzeResourcesRemote(balances, localResourceResult, labConfig);
        setRemoteResults({ resources: res });
      } else if (activeTab === 'pricing') {
        const res = await simulatePricingRemote(pricing, localPricingResult, labConfig);
        setRemoteResults({ pricing: res });
      } else {
        const res = await forecastResourceRemote(forecast, localForecastResult, labConfig);
        setRemoteResults({ forecast: res });
      }
      setBridgeStatus(t.economicsLab.status.computedRemote);
    } catch (err) {
      clearRemoteResults();
      setBridgeStatus(
        err instanceof Error
          ? `${t.economicsLab.status.remoteFailedPrefix}${err.message}).`
          : t.economicsLab.status.remoteFailedFallback,
      );
    } finally {
      setBridgeBusy(false);
    }
  }

  async function handleFetchPreview() {
    setBridgeBusy(true);
    try {
      const preview = await fetchSyntheticPreview(previewToken, labConfig);
      setPreviewResult(preview);
      setBridgeStatus(t.economicsLab.status.previewVerified);
    } catch (err) {
      setPreviewResult(null);
      setBridgeStatus(
        err instanceof Error ? err.message : t.economicsLab.status.previewFailed,
      );
    } finally {
      setBridgeBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <Link
        to="/labs"
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-[#00E5FF] hover:underline"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        <span>{t.economicsLab.backToLabs}</span>
      </Link>

      <div className="mt-6">
        <SectionHeader
          as="h1"
          eyebrow={t.economicsLab.eyebrow}
          title={t.economicsLab.title}
          description={t.economicsLab.description}
          accent="labs"
        />
      </div>

      <div className="mt-8 rounded-2xl border border-[#00E5FF]/35 bg-[#151520] p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <DomainBadge
                label={health ? t.economicsLab.status.apiConnectedBadge : t.economicsLab.status.offlineBadge}
                tone="labs"
              />
              <span className="font-mono text-xs text-[#B4B4CC]">
                {labConfig.enabled ? t.economicsLab.status.intelligenceLabel : t.economicsLab.status.browserLabel}
              </span>
            </div>
            <p className="text-sm text-[#B4B4CC]" role="status" aria-live="polite" data-testid="economics-bridge-status">
              {effectiveBridgeStatus}
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={handleCheckHealth}
              disabled={bridgeBusy || !labConfig.enabled}
              className="inline-flex items-center gap-2 rounded-xl border border-[#00E5FF]/55 bg-[#08090D] px-4 py-2 text-xs font-semibold text-[#F5F5FA] transition hover:border-[#00E5FF] disabled:opacity-60"
            >
              <Activity className="h-4 w-4 text-[#00E5FF]" aria-hidden="true" />
              <span>{t.economicsLab.buttons.checkHealth}</span>
            </button>
            <button
              type="button"
              onClick={handleRunRemoteSimulation}
              disabled={bridgeBusy || !labConfig.enabled || (activeTab === 'pricing' && !!pricingError)}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-[#08090D] px-4 py-2 text-xs font-semibold text-[#B4B4CC] transition hover:border-[#00E5FF]/60 hover:text-[#F5F5FA] disabled:opacity-60"
            >
              <RefreshCw className="h-4 w-4 text-[#00E5FF]" aria-hidden="true" />
              <span>{t.economicsLab.buttons.runRemote}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label={t.economicsLab.tabsAriaLabel}>
        {[
          { id: 'resources' as const, label: t.economicsLab.tabs.resources, icon: Cpu },
          { id: 'pricing' as const, label: t.economicsLab.tabs.pricing, icon: Calculator },
          { id: 'forecast' as const, label: t.economicsLab.tabs.forecast, icon: LineChart },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              disabled={bridgeBusy}
              onClick={() => {
                setActiveTab(tab.id);
                clearRemoteResults();
              }}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
                active
                  ? 'border-[#00E5FF] bg-[#00E5FF]/15 text-[#00E5FF]'
                  : 'border-white/12 bg-[#151520] text-[#B4B4CC] hover:border-white/30 hover:text-[#F5F5FA]'
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        <fieldset disabled={bridgeBusy} onChange={clearRemoteResults} className="i3-card i3-card-labs min-w-0 rounded-2xl p-6 lg:col-span-6">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[#00E5FF]">
            <Sliders className="h-4 w-4" aria-hidden="true" />
            <span>{t.economicsLab.inputsHeading}</span>
          </div>

          {activeTab === 'resources' ? (
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {RESOURCE_OPTIONS.map((key) => (
                <label key={key} className="block text-xs">
                  <span className="font-mono uppercase tracking-wider text-[#B4B4CC]">
                    {key} {t.economicsLab.inputs.balanceSuffix}
                  </span>
                  <input
                    type="number"
                    min={0}
                    step="1"
                    value={balances[key]}
                    onChange={(e) =>
                      setBalances((prev) => ({
                        ...prev,
                        [key]: Number(e.target.value) || 0,
                      }))
                    }
                    className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#08090D] px-3 py-2 font-mono text-sm text-[#F5F5FA] focus:border-[#00E5FF] focus:outline-none"
                  />
                </label>
              ))}
            </div>
          ) : null}

          {activeTab === 'pricing' ? (
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="block text-xs">
                <span className="font-mono uppercase tracking-wider text-[#B4B4CC]">
                  Base Price
                </span>
                <input
                  type="number"
                  min={0}
                  step="1"
                  value={pricing.basePrice}
                  onChange={(e) =>
                    setPricing((prev) => ({ ...prev, basePrice: Number(e.target.value) || 0 }))
                  }
                  className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#08090D] px-3 py-2 font-mono text-sm text-[#F5F5FA] focus:border-[#00E5FF] focus:outline-none"
                />
              </label>

              <label className="block text-xs">
                <span className="font-mono uppercase tracking-wider text-[#B4B4CC]">Resource</span>
                <select
                  value={pricing.resource}
                  onChange={(e) =>
                    setPricing((prev) => ({ ...prev, resource: e.target.value as ResourceKey }))
                  }
                  className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#08090D] px-3 py-2 font-mono text-sm text-[#F5F5FA] focus:border-[#00E5FF] focus:outline-none"
                >
                  {RESOURCE_OPTIONS.map((key) => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-xs">
                <span className="font-mono uppercase tracking-wider text-[#B4B4CC]">
                  Membership Discount (0–1)
                </span>
                <input
                  type="number"
                  min={0}
                  max={1}
                  step="0.01"
                  value={pricing.membershipDiscountRate}
                  onChange={(e) =>
                    setPricing((prev) => ({
                      ...prev,
                      membershipDiscountRate: Number(e.target.value) || 0,
                    }))
                  }
                  className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#08090D] px-3 py-2 font-mono text-sm text-[#F5F5FA] focus:border-[#00E5FF] focus:outline-none"
                />
              </label>

              <label className="block text-xs">
                <span className="font-mono uppercase tracking-wider text-[#B4B4CC]">
                  Participation Score (0–1)
                </span>
                <input
                  type="number"
                  min={0}
                  max={1}
                  step="0.05"
                  value={pricing.participationScore}
                  onChange={(e) =>
                    setPricing((prev) => ({
                      ...prev,
                      participationScore: Number(e.target.value) || 0,
                    }))
                  }
                  className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#08090D] px-3 py-2 font-mono text-sm text-[#F5F5FA] focus:border-[#00E5FF] focus:outline-none"
                />
              </label>

              {pricingError ? <p role="alert" className="text-sm text-amber-300 sm:col-span-2">{pricingError}</p> : null}
              <label className="block text-xs sm:col-span-2">
                <span className="font-mono uppercase tracking-wider text-[#B4B4CC]">
                  Max Total Discount Cap (0–1)
                </span>
                <input
                  type="number"
                  min={0}
                  max={1}
                  step="0.01"
                  value={pricing.maximumTotalDiscount}
                  onChange={(e) =>
                    setPricing((prev) => ({
                      ...prev,
                      maximumTotalDiscount: Number(e.target.value) || 0,
                    }))
                  }
                  className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#08090D] px-3 py-2 font-mono text-sm text-[#F5F5FA] focus:border-[#00E5FF] focus:outline-none"
                />
              </label>
            </div>
          ) : null}

          {activeTab === 'forecast' ? (
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="block text-xs">
                <span className="font-mono uppercase tracking-wider text-[#B4B4CC]">
                  Current Balance
                </span>
                <input
                  type="number"
                  min={0}
                  step="1"
                  value={forecast.currentBalance}
                  onChange={(e) =>
                    setForecast((prev) => ({
                      ...prev,
                      currentBalance: Number(e.target.value) || 0,
                    }))
                  }
                  className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#08090D] px-3 py-2 font-mono text-sm text-[#F5F5FA] focus:border-[#00E5FF] focus:outline-none"
                />
              </label>

              <label className="block text-xs">
                <span className="font-mono uppercase tracking-wider text-[#B4B4CC]">
                  Horizon (Days, 1–365)
                </span>
                <input
                  type="number"
                  min={1}
                  max={365}
                  step="1"
                  value={forecast.horizonDays}
                  onChange={(e) =>
                    setForecast((prev) => ({
                      ...prev,
                      horizonDays: Number(e.target.value) || 1,
                    }))
                  }
                  className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#08090D] px-3 py-2 font-mono text-sm text-[#F5F5FA] focus:border-[#00E5FF] focus:outline-none"
                />
              </label>

              <label className="block text-xs">
                <span className="font-mono uppercase tracking-wider text-[#B4B4CC]">
                  Daily Inflow
                </span>
                <input
                  type="number"
                  min={0}
                  step="1"
                  value={forecast.dailyInflow}
                  onChange={(e) =>
                    setForecast((prev) => ({
                      ...prev,
                      dailyInflow: Number(e.target.value) || 0,
                    }))
                  }
                  className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#08090D] px-3 py-2 font-mono text-sm text-[#F5F5FA] focus:border-[#00E5FF] focus:outline-none"
                />
              </label>

              <label className="block text-xs">
                <span className="font-mono uppercase tracking-wider text-[#B4B4CC]">
                  Daily Outflow
                </span>
                <input
                  type="number"
                  min={0}
                  step="1"
                  value={forecast.dailyOutflow}
                  onChange={(e) =>
                    setForecast((prev) => ({
                      ...prev,
                      dailyOutflow: Number(e.target.value) || 0,
                    }))
                  }
                  className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#08090D] px-3 py-2 font-mono text-sm text-[#F5F5FA] focus:border-[#00E5FF] focus:outline-none"
                />
              </label>

              <label className="block text-xs sm:col-span-2">
                <span className="font-mono uppercase tracking-wider text-[#B4B4CC]">
                  Reserve Threshold
                </span>
                <input
                  type="number"
                  min={0}
                  step="1"
                  value={forecast.reserveThreshold}
                  onChange={(e) =>
                    setForecast((prev) => ({
                      ...prev,
                      reserveThreshold: Number(e.target.value) || 0,
                    }))
                  }
                  className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#08090D] px-3 py-2 font-mono text-sm text-[#F5F5FA] focus:border-[#00E5FF] focus:outline-none"
                />
              </label>
            </div>
          ) : null}
        </fieldset>

        <section className="i3-card i3-card-labs rounded-2xl p-6 lg:col-span-6">
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#00E5FF]">
              {livePayload ? t.economicsLab.results.serverHeading : t.economicsLab.results.browserHeading}
            </span>
            <DomainBadge
              label={livePayload ? t.economicsLab.results.apiBadge : t.economicsLab.results.browserBadge}
              tone="labs"
            />
          </div>

          {activeTab === 'resources' ? (
            <div className="mt-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-[#08090D] p-3.5">
                  <p className="font-mono text-[11px] uppercase text-[#B4B4CC]">{t.economicsLab.results.totalUnits}</p>
                  <p className="mt-1 font-mono text-2xl font-bold text-[#F5F5FA]">
                    {resourceResult.totalUnits}
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-[#08090D] p-3.5">
                  <p className="font-mono text-[11px] uppercase text-[#B4B4CC]">{t.economicsLab.results.dominant}</p>
                  <p className="mt-1 font-mono text-2xl font-bold text-[#00E5FF]">
                    {resourceResult.dominantResource}
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                {resourceResult.shares.map((share) => (
                  <div key={share.resource} className="space-y-1">
                    <div className="flex justify-between font-mono text-xs text-[#B4B4CC]">
                      <span>{share.resource}</span>
                      <span>
                        {share.amount} ({share.sharePct}%)
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-[#08090D]">
                      <div
                        className="h-full rounded-full bg-[#00E5FF]"
                        style={{ width: `${Math.min(100, share.sharePct)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {activeTab === 'pricing' ? (
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/10 bg-[#08090D] p-3.5">
                <p className="font-mono text-[11px] uppercase text-[#B4B4CC]">{t.economicsLab.results.finalPrice}</p>
                <p className="mt-1 font-mono text-2xl font-bold text-[#00E5FF]">
                  {pricingResult.finalPrice} {pricing.resource}
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#08090D] p-3.5">
                <p className="font-mono text-[11px] uppercase text-[#B4B4CC]">{t.economicsLab.results.effectiveDiscount}</p>
                <p className="mt-1 font-mono text-2xl font-bold text-[#F5F5FA]">
                  {(pricingResult.effectiveDiscountRate * 100).toFixed(2)}%
                </p>
              </div>
              <div className="col-span-2 rounded-xl border border-white/10 bg-[#08090D] p-3.5 text-xs text-[#B4B4CC]">
                {t.economicsLab.results.discountAmount}: <strong className="text-[#F5F5FA]">{pricingResult.discountAmount}</strong>{' '}
                · {t.economicsLab.results.capActive}: <strong className="text-[#F5F5FA]">{pricingResult.capped ? t.economicsLab.results.yes : t.economicsLab.results.no}</strong>
              </div>
            </div>
          ) : null}

          {activeTab === 'forecast' ? (
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/10 bg-[#08090D] p-3.5">
                <p className="font-mono text-[11px] uppercase text-[#B4B4CC]">{t.economicsLab.results.projectedBalance}</p>
                <p className="mt-1 font-mono text-2xl font-bold text-[#00E5FF]">
                  {forecastResult.projectedBalance} {forecast.resource}
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#08090D] p-3.5">
                <p className="font-mono text-[11px] uppercase text-[#B4B4CC]">{t.economicsLab.results.netDailyFlow}</p>
                <p className="mt-1 font-mono text-2xl font-bold text-[#F5F5FA]">
                  {forecastResult.netDailyFlow >= 0 ? '+' : ''}
                  {forecastResult.netDailyFlow}/d
                </p>
              </div>
              <div className="col-span-2 rounded-xl border border-white/10 bg-[#08090D] p-3.5 text-xs text-[#B4B4CC]">
                {t.economicsLab.results.netChange} ({forecast.horizonDays}d):{' '}
                <strong className="text-[#F5F5FA]">
                  {forecastResult.netChange >= 0 ? '+' : ''}
                  {forecastResult.netChange}
                </strong>{' '}
                · {t.economicsLab.results.reserveBreached}:{' '}
                <strong className="text-[#F5F5FA]">
                  {forecastResult.reserveBreached ? t.economicsLab.results.yes : t.economicsLab.results.no}
                </strong>
              </div>
            </div>
          ) : null}

          {livePayload && import.meta.env.DEV ? (
            <pre className="mt-4 max-h-48 overflow-auto rounded-xl border border-[#00E5FF]/25 bg-[#08090D] p-3 font-mono text-xs text-[#67E8F9]">
              {JSON.stringify(livePayload, null, 2)}
            </pre>
          ) : null}
        </section>
      </div>

      {import.meta.env.DEV ? <section className="mt-8 rounded-2xl border border-white/12 bg-[#151520] p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#00E5FF]">
              {t.economicsLab.devPreview.eyebrow}
            </p>
            <h2 className="mt-1.5 text-lg font-bold text-[#F5F5FA]">
              {t.economicsLab.devPreview.title}
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-[#B4B4CC]">
              {t.economicsLab.devPreview.descriptionBefore}
              <code className="font-mono text-[#F5F5FA]">i3-economics-intelligence</code>
              {t.economicsLab.devPreview.descriptionAfter}
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              type="password"
              value={previewToken}
              onChange={(e) => setPreviewToken(e.target.value)}
              placeholder={t.economicsLab.devPreview.placeholder}
              aria-label={t.economicsLab.devPreview.ariaLabel}
              className="w-full rounded-xl border border-white/15 bg-[#08090D] px-3 py-2 font-mono text-xs text-[#F5F5FA] focus:border-[#00E5FF] focus:outline-none sm:w-72"
            />
            <button
              type="button"
              onClick={handleFetchPreview}
              disabled={bridgeBusy}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-[#00E5FF]/55 bg-[#00E5FF]/15 px-4 py-2 text-xs font-semibold text-[#F5F5FA] hover:border-[#00E5FF] disabled:opacity-60"
            >
              <span>{t.economicsLab.devPreview.button}</span>
            </button>
          </div>
        </div>

        {previewResult ? (
          <pre className="mt-4 max-h-56 overflow-auto rounded-xl border border-[#00E5FF]/25 bg-[#08090D] p-3 font-mono text-xs text-[#67E8F9]">
            {JSON.stringify(previewResult, null, 2)}
          </pre>
        ) : null}

        <div className="mt-4 flex items-start gap-2 border-t border-white/10 pt-4 text-xs text-[#B4B4CC]">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#00E5FF]" aria-hidden="true" />
          <span>
            {t.economicsLab.devPreview.boundary}
          </span>
        </div>
      </section> : null}
    </div>
  );
}
