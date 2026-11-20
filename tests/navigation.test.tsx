import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { App } from '../src/app/App';

function renderAtRoute(initialEntry: string) {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <App />
    </MemoryRouter>,
  );
}

describe('Routing und Responsive Navigation', () => {
  it('rendert alle definierten Routen mit passendem Haupttitel', () => {
    const routes: Array<{ path: string; heading: RegExp }> = [
      { path: '/', heading: /iThreeLab — Music × Technology × Intelligence/i },
      { path: '/ecosystem', heading: /Connected Ecosystem/i },
      { path: '/labs', heading: /iThree Labs/i },
      { path: '/labs/intelligence', heading: /I3 Intelligence Core/i },
      { path: '/labs/economics', heading: /Economics Lab — Synthetic Simulator & Intelligence API/i },
      { path: '/studio', heading: /iThree Studio/i },
      { path: '/technology', heading: /Technology & Architecture/i },
      { path: '/about', heading: /iThreeLab als vernetztes Ökosystem/i },
      { path: '/impressum', heading: /^Impressum$/i },
      { path: '/datenschutz', heading: /^Datenschutz$/i },
    ];

    for (const entry of routes) {
      const { unmount } = renderAtRoute(entry.path);
      expect(screen.getByRole('heading', { level: 1, name: entry.heading })).toBeInTheDocument();
      unmount();
    }
  });

  it('markiert den aktiven Desktop-Navigationspunkt mit aria-current="page"', () => {
    renderAtRoute('/labs/intelligence');
    const desktopNav = screen.getByRole('navigation', { name: 'Hauptnavigation' });
    const labsLink = within(desktopNav).getByRole('link', { name: 'Labs' });
    const coreLink = within(desktopNav).getByRole('link', { name: 'Intelligence Core' });

    expect(labsLink).toHaveAttribute('aria-current', 'page');
    expect(coreLink).toHaveAttribute('aria-current', 'page');
  });

  it('öffnet und schließt die mobile Navigation per Button, Link-Klick und Escape', async () => {
    const user = userEvent.setup();
    renderAtRoute('/');

    const toggleButton = screen.getByRole('button', { name: 'Navigation öffnen' });
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('navigation', { name: 'Mobile Navigation' })).not.toBeInTheDocument();

    await user.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    const mobileNav = screen.getByRole('navigation', { name: 'Mobile Navigation' });
    expect(mobileNav).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('navigation', { name: 'Mobile Navigation' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Navigation öffnen' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );

    await user.click(screen.getByRole('button', { name: 'Navigation öffnen' }));
    const mobileStudioLink = within(
      screen.getByRole('navigation', { name: 'Mobile Navigation' }),
    ).getByRole('link', { name: /Studio/i });
    await user.click(mobileStudioLink);

    expect(screen.queryByRole('navigation', { name: 'Mobile Navigation' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: /iThree Studio/i })).toBeInTheDocument();
  });
});
