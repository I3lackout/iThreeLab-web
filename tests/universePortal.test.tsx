import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { App } from '../src/app/App';
import { mockMatchMedia } from './setup';

describe('Universe Portal (/)', () => {
  it('zeigt Hero, drei zentrale Welten, Vision & Mission sowie Studio/Labs-Einstiege', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'iThreeLab — Music × Technology × Intelligence',
      }),
    ).toBeInTheDocument();

    expect(screen.getAllByRole('heading', { level: 3, name: 'I3LACKOUT' }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole('heading', { level: 3, name: 'musicchaini3' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'iThree Labs' })).toBeInTheDocument();

    expect(screen.getByText(/03 \/\/ VISION & MISSION/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Zu iThree Labs/i })).toHaveAttribute('href', '/labs');
    expect(screen.getByRole('link', { name: /Zu iThree Studio/i })).toHaveAttribute(
      'href',
      '/studio',
    );
  });

  it('schaltet die interaktive Ecosystem-Navigation sauber zwischen den drei Welten um', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    const tablist = screen.getByRole('tablist', { name: 'Ecosystem Welten auswählen' });
    const musicchainTab = within(tablist).getByRole('tab', { name: 'musicchaini3' });
    const labsTab = within(tablist).getByRole('tab', { name: 'iThree Labs' });

    await user.click(musicchainTab);
    expect(musicchainTab).toHaveAttribute('aria-selected', 'true');
    const musicchainPanel = screen.getByRole('tabpanel');
    expect(within(musicchainPanel).getByText('musicchaini3.com')).toBeInTheDocument();

    await user.click(labsTab);
    expect(labsTab).toHaveAttribute('aria-selected', 'true');
    const labsPanel = screen.getByRole('tabpanel');
    expect(within(labsPanel).getByText('iThreeLab.com')).toBeInTheDocument();
    expect(within(labsPanel).getByRole('link', { name: /iThree Labs erkunden/i })).toHaveAttribute(
      'href',
      '/labs',
    );
  });

  it('rendert sauber bei aktivierter prefers-reduced-motion-Einstellung', () => {
    mockMatchMedia(true);
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'iThreeLab — Music × Technology × Intelligence',
      }),
    ).toBeInTheDocument();
  });
});
