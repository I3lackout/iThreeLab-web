import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import { App } from '../src/app/App';

describe('DE ↔ EN internationalization', () => {
  afterEach(() => {
    window.localStorage.removeItem('ithreelab_locale');
    document.documentElement.lang = 'de';
  });

  it('defaults to DE and toggles cleanly between DE and EN across layout and pages', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    expect(document.documentElement.lang).toBe('de');
    expect(screen.getByText('Drei eigenständige Welten, ein verbundenes System')).toBeInTheDocument();
    expect(screen.getByText('Dokumentierte Zuständigkeiten')).toBeInTheDocument();

    const enButtons = screen.getAllByRole('button', { name: 'en' });
    await user.click(enButtons[0]);

    expect(document.documentElement.lang).toBe('en');
    expect(screen.getByText('Three independent worlds, one connected system')).toBeInTheDocument();
    expect(screen.getByText('Documented Responsibilities')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Imprint' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toBeInTheDocument();

    const deButtons = screen.getAllByRole('button', { name: 'de' });
    await user.click(deButtons[0]);

    expect(document.documentElement.lang).toBe('de');
    expect(screen.getByText('Drei eigenständige Welten, ein verbundenes System')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Impressum' })).toBeInTheDocument();
  });

  it('preserves active filters when switching between DE and EN on /technology and /labs', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/technology']}>
        <App />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button', { name: 'Cloud & Qualität' }));
    expect(screen.getByText('Google Cloud')).toBeInTheDocument();
    expect(screen.queryByText('Python / Flask')).not.toBeInTheDocument();

    const enButtons = screen.getAllByRole('button', { name: 'en' });
    await user.click(enButtons[0]);

    expect(screen.getByRole('button', { name: 'Cloud & Quality' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByText('Google Cloud')).toBeInTheDocument();
    expect(screen.queryByText('Python / Flask')).not.toBeInTheDocument();
  });

  it('renders English routes when initialLocale="en"', () => {
    render(
      <MemoryRouter initialEntries={['/labs/economics']}>
        <App initialLocale="en" />
      </MemoryRouter>,
    );

    expect(document.documentElement.lang).toBe('en');
    expect(
      screen.getByRole('heading', {
        name: /Economics Lab — Synthetic Simulator & Intelligence API/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Resource Analysis' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Pricing Simulator' })).toBeInTheDocument();
  });
});
