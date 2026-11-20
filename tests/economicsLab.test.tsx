import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { App } from '../src/app/App';
import {
  isAllowedLabBaseUrl,
  readEconomicsLabConfig,
} from '../src/integrations/economicsLab/client';
import {
  simulateForecastLocally,
  simulatePricingLocally,
  simulateResourceAnalysis,
} from '../src/integrations/economicsLab/simulator';

describe('Economics Lab Integration & Simulator', () => {
  afterEach(() => { vi.unstubAllEnvs(); vi.restoreAllMocks(); });
  it('berechnet Resource Analysis, Pricing und Forecast deterministisch offline', () => {
    const resources = simulateResourceAnalysis({ MCCC: 600, FUEL: 300, GAS: 100 });
    expect(resources.totalUnits).toBe(1000);
    expect(resources.dominantResource).toBe('MCCC');
    expect(resources.shares[0].sharePct).toBe(60);

    const pricing = simulatePricingLocally({
      basePrice: 100,
      resource: 'MCCC',
      membershipLevel: 'Gold',
      membershipDiscountRate: 0.15,
      participationScore: 1,
      participationDiscountMax: 0.2,
      maximumTotalDiscount: 0.25,
    });
    expect(pricing.capped).toBe(true);
    expect(pricing.effectiveDiscountRate).toBe(0.25);
    expect(pricing.finalPrice).toBe(75);

    const forecast = simulateForecastLocally({
      resource: 'FUEL',
      currentBalance: 100,
      dailyInflow: 10,
      dailyOutflow: 15,
      horizonDays: 10,
      inflowMultiplier: 1,
      outflowMultiplier: 1,
      reserveThreshold: 60,
    });
    expect(forecast.netDailyFlow).toBe(-5);
    expect(forecast.projectedBalance).toBe(50);
    expect(forecast.reserveBreached).toBe(true);
  });

  it('erlaubt ausschließlich relative Proxy-Pfade oder Loopback-URLs', () => {
    expect(isAllowedLabBaseUrl('/api/economics-lab')).toBe(true);
    expect(isAllowedLabBaseUrl('http://127.0.0.1:8765')).toBe(true);
    expect(isAllowedLabBaseUrl('http://localhost:8765')).toBe(true);
    expect(isAllowedLabBaseUrl('https://evil.example.com')).toBe(false);
    expect(isAllowedLabBaseUrl('//evil.example.com')).toBe(false);

    const cfg = readEconomicsLabConfig({
      VITE_ECONOMICS_LAB_ENABLED: 'true',
      VITE_ECONOMICS_LAB_BASE_URL: 'https://evil.example.com',
    });
    expect(cfg.enabled).toBe(true);
    expect(cfg.baseUrl).toBe('/api/economics-lab');
  });

  it('rendert /labs/economics mit Simulator-Tabs und zeigt I3 Economics unter /labs/intelligence', async () => {
    const user = userEvent.setup();
    const { unmount } = render(
      <MemoryRouter initialEntries={['/labs/economics']}>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', { level: 1, name: /Economics Lab — Synthetic Simulator/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('1930')).toBeInTheDocument();

    await user.click(screen.getByRole('tab', { name: /Pricing-Simulator/i }));
    expect(screen.getByText('Final Price')).toBeInTheDocument();

    await user.click(screen.getByRole('tab', { name: /Resource-Forecast/i }));
    expect(screen.getByText('Projected Balance')).toBeInTheDocument();

    unmount();

    render(
      <MemoryRouter initialEntries={['/labs/intelligence']}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { level: 2, name: /I3 Economics Intelligence/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Economics Lab Simulator öffnen/i })).toHaveAttribute(
      'href',
      '/labs/economics',
    );
  });

  it('führt optionalen Health-Check gegen /api/economics-lab/health aus', async () => {
    vi.stubEnv('VITE_ECONOMICS_LAB_ENABLED', 'true');
    const user = userEvent.setup();
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          status: 'healthy',
          service: 'i3-economics-intelligence',
          timestamp: '2026-11-20T00:00:00Z',
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      ),
    );

    render(
      <MemoryRouter initialEntries={['/labs/economics']}>
        <App />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button', { name: /API-Verbindung prüfen/i }));
    expect(await screen.findByText(/Verbunden mit i3-economics-intelligence/i)).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/economics-lab/health',
      expect.objectContaining({ credentials: 'omit', method: 'GET' }),
    );

    fetchMock.mockRestore();
  });
});
