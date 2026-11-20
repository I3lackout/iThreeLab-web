import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { App } from '../src/app/App';

function renderRoute(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe('Ecosystem Links, Projektstatus sowie Labs-, Studio-, Technology- & About-Darstellung', () => {
  it('zeigt auf /ecosystem alle drei Marken, Projektkarten und sichere externe Links', () => {
    renderRoute('/ecosystem');

    const brandsSection = screen.getByRole('region', { name: 'Marken & Zuständigkeiten' });
    expect(within(brandsSection).getByRole('heading', { level: 3, name: 'I3LACKOUT' })).toBeInTheDocument();
    expect(within(brandsSection).getByRole('heading', { level: 3, name: 'musicchaini3' })).toBeInTheDocument();
    expect(within(brandsSection).getByRole('heading', { level: 3, name: 'iThree Labs' })).toBeInTheDocument();

    const externalLinks = screen.getAllByRole('link', { name: /i3lackout\.com|musicchaini3\.com/i });
    expect(externalLinks.length).toBeGreaterThanOrEqual(2);
    for (const link of externalLinks) {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  it('zeigt auf /labs alle Forschungsbereiche und filtert experimentelle Projekte nach Status', async () => {
    const user = userEvent.setup();
    renderRoute('/labs');

    expect(screen.getByRole('heading', { level: 3, name: 'I3 Intelligence Core' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Economics Intelligence' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Cloud Engineering' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'AI Audio Processing' })).toBeInTheDocument();

    const prototypeFilter = screen.getByRole('button', { name: 'Lokaler Prototyp' });
    await user.click(prototypeFilter);

    expect(
      screen.getByRole('heading', { level: 3, name: /i3-economics-intelligence \(Local RC\)/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { level: 3, name: /Plan-Only Staging Blueprints/i }),
    ).not.toBeInTheDocument();
  });

  it('zeigt auf /labs/intelligence alle fünf Core-Module mit belegtem Betriebsstand', async () => {
    const user = userEvent.setup();
    renderRoute('/labs/intelligence');

    expect(screen.getByRole('heading', { level: 2, name: 'I3 Audio & DJ' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'I3 Motion & Clipping' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'I3 Canvas' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'I3 Guardian' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'I3 Economics Intelligence' })).toBeInTheDocument();
    expect(screen.getByText(/MusicChain als MVP/i)).toBeInTheDocument();
    expect(screen.getByText(/Highlight-Clips und vertikale Visualizer-Videos/i)).toBeInTheDocument();
    expect(screen.getAllByText(/öffentliches Synthetic Lab/i).length).toBeGreaterThan(0);

    await user.click(screen.getByRole('button', { name: 'MusicChain · Rendering-MVP' }));
    expect(screen.getByRole('heading', { level: 2, name: 'I3 Motion & Clipping' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 2, name: 'I3 Canvas' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 2, name: 'I3 Audio & DJ' })).not.toBeInTheDocument();
  });

  it('präsentiert auf /studio die MusicChain-MVPs ohne Upload auf dieser Seite', async () => {
    const user = userEvent.setup();
    renderRoute('/studio');

    expect(screen.getByText(/Audio, Clipping und Cover sind in MusicChain online/i)).toBeInTheDocument();
    expect(screen.getByText(/Diese Seite lädt keine Dateien hoch/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Audio Processing' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Automatic Clipping' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'AI Visuals & Cover Art' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Creator Workflows' })).toBeInTheDocument();

    const clippingTab = screen.getByRole('tab', { name: /Automatic Clipping/i });
    await user.click(clippingTab);
    expect(clippingTab).toHaveAttribute('aria-selected', 'true');
    expect(
      screen.getByRole('heading', { level: 3, name: 'Automatic Clipping Blueprint' }),
    ).toBeInTheDocument();
  });

  it('zeigt auf /technology alle Architektur-Bausteine und auf /about den Developer-Universe-Link', async () => {
    const user = userEvent.setup();
    const { unmount } = renderRoute('/technology');

    expect(screen.getByRole('heading', { level: 2, name: 'Python / Flask' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'React / TypeScript' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'MariaDB / SQLAlchemy' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'WebRTC' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Google Cloud' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'REST APIs' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Testing & CI' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Frontend & Realtime' }));
    expect(screen.getByRole('heading', { level: 2, name: 'WebRTC' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 2, name: 'MariaDB / SQLAlchemy' })).not.toBeInTheDocument();
    unmount();

    renderRoute('/about');
    const devLink = screen.getByRole('link', { name: /I3LACKOUT Developer Universe öffnen/i });
    expect(devLink).toHaveAttribute('href', 'https://i3lackout.com/developer');
    expect(devLink).toHaveAttribute('target', '_blank');
    expect(devLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
