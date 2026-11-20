import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { App } from '../src/app/App';
import { ErrorBoundary } from '../src/components/ui/ErrorBoundary';
import { SafeExternalLink } from '../src/components/ui/SafeExternalLink';

function ThrowingWidget({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error('Test render failure');
  }
  return <p>Erfolgreich wiederhergestellt</p>;
}

describe('Fehlerzustände (404, unsichere Links, ErrorBoundary)', () => {
  it('zeigt eine 404-Fehlerseite bei unbekannten Routen mit Rückkehr-Navigation', () => {
    render(
      <MemoryRouter initialEntries={['/unbekannter-sektor']}>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Dieser Sektor im iThreeLab-Ökosystem existiert nicht/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText('/unbekannter-sektor')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Zum iThreeLab Portal/i })).toHaveAttribute('href', '/');
  });

  it('rendert bei ungültigen oder fehlenden externen URLs einen sicheren Fallback ohne <a>-Tag', () => {
    render(
      <div>
        <SafeExternalLink url="javascript:alert(1)" label="Unsicherer Link" />
        <SafeExternalLink url={null} label="Fehlender Link" fallbackLabel="Keine Ziel-URL" />
      </div>,
    );

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.getByText('Externer Link nicht verfügbar')).toBeInTheDocument();
    expect(screen.getByText('Keine Ziel-URL')).toBeInTheDocument();
  });

  it('fängt unerwartete Render-Fehler über die ErrorBoundary ab und erlaubt Reset', async () => {
    const user = userEvent.setup();
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    function BoundaryHarness() {
      const [shouldThrow, setShouldThrow] = useState(true);
      return (
        <ErrorBoundary onReset={() => setShouldThrow(false)}>
          <ThrowingWidget shouldThrow={shouldThrow} />
        </ErrorBoundary>
      );
    }

    render(<BoundaryHarness />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: /Ansicht konnte nicht geladen werden/i }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Ansicht neu laden/i }));

    expect(screen.getByText('Erfolgreich wiederhergestellt')).toBeInTheDocument();
    consoleErrorSpy.mockRestore();
  });
});
