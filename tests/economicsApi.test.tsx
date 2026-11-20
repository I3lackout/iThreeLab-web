import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { App } from '../src/app/App';
import { analyzeResourcesRemote, simulatePricingRemote, forecastResourceRemote, checkLabHealth } from '../src/integrations/economicsLab/client';
import { simulateResourceAnalysis, simulatePricingLocally, simulateForecastLocally } from '../src/integrations/economicsLab/simulator';

const config = { enabled: true, baseUrl: '/api/economics-lab' };
const balances = { MCCC: 1200, FUEL: 450, GAS: 280 };
const pricing = { basePrice: 100, resource: 'MCCC' as const, membershipLevel: 'Gold', membershipDiscountRate: 0.1, participationScore: 0.8, participationDiscountMax: 0.15, maximumTotalDiscount: 0.25 };
const forecast = { resource: 'FUEL' as const, currentBalance: 450, dailyInflow: 32, dailyOutflow: 18, horizonDays: 30, inflowMultiplier: 1, outflowMultiplier: 1, reserveThreshold: 200 };
function respond(body: unknown) {
  return vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify(body), { headers: { 'Content-Type': 'application/json' } }));
}
afterEach(() => { vi.restoreAllMocks(); vi.unstubAllEnvs(); });

describe('Economics service contract', () => {
  it('maps resource casing and excludes ITC from nominal resource analysis', async () => {
    const fetch = respond({ resources: { McCC: { balance: '100' }, FUEL: { balance: '50' }, GAS: { balance: '50' } }, financial_write_access: false });
    const result = await analyzeResourcesRemote(balances, simulateResourceAnalysis(balances), config);
    expect(JSON.parse(fetch.mock.calls[0][1]!.body as string)).toEqual({ balances: { McCC: '1200', FUEL: '450', GAS: '280' } });
    expect(result.totalUnits).toBe(200);
    expect(result.shares[0].sharePct).toBe(50);
  });
  it('converts the normalized score to the backend 0–100 scale and maps discounts', async () => {
    const fetch = respond({ final_price: '78', total_discount_rate: '0.22', discount_amount: '22' });
    const result = await simulatePricingRemote(pricing, simulatePricingLocally(pricing), config);
    expect(JSON.parse(fetch.mock.calls[0][1]!.body as string)).toMatchObject({ resource: 'McCC', participation_score: '80' });
    expect(result).toMatchObject({ finalPrice: 78, effectiveDiscountRate: 0.22, discountAmount: 22, capped: false });
  });
  it('uses daily_net_flow and recomputes the reserve and net change from the server forecast', async () => {
    respond({ projected_balance: '150', daily_net_flow: '-10' });
    const result = await forecastResourceRemote(forecast, simulateForecastLocally(forecast), config);
    expect(result).toMatchObject({ projectedBalance: 150, netDailyFlow: -10, netChange: -300, reserveBreached: true });
  });
  it('rejects an SPA HTML fallback and malformed numeric responses', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('<html></html>', { headers: { 'Content-Type': 'text/html' } }));
    await expect(checkLabHealth(config)).rejects.toThrow('keine JSON-Antwort');
    vi.restoreAllMocks();
    respond({ final_price: null, total_discount_rate: '0.2', discount_amount: '20' });
    await expect(simulatePricingRemote(pricing, simulatePricingLocally(pricing), config)).rejects.toThrow('Ungültiger Zahlenwert');
  });
  it('does not call the network when the integration is disabled', async () => {
    const fetch = vi.spyOn(globalThis, 'fetch');
    await expect(checkLabHealth({ ...config, enabled: false })).rejects.toThrow('nicht aktiviert');
    expect(fetch).not.toHaveBeenCalled();
  });
  it('displays server metrics and clears them when the user edits inputs', async () => {
    vi.stubEnv('VITE_ECONOMICS_LAB_ENABLED', 'true');
    respond({ resources: { McCC: { balance: '100' }, FUEL: { balance: '50' }, GAS: { balance: '50' } } });
    const user = userEvent.setup();
    render(<MemoryRouter initialEntries={['/labs/economics']}><App /></MemoryRouter>);
    await user.click(screen.getByRole('button', { name: /Mit Intelligence berechnen/i }));
    expect(await screen.findByText('200')).toBeInTheDocument();
    expect(screen.getByText('Server-Ergebnis · Synthetisch')).toBeInTheDocument();
    await user.clear(screen.getByRole('spinbutton', { name: 'MCCC Balance' }));
    expect(screen.getByText('Browser-Ergebnis · Synthetisch')).toBeInTheDocument();
    expect(screen.queryByText('Server-Ergebnis · Synthetisch')).not.toBeInTheDocument();
  });
});
