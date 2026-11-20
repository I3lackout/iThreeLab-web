import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import { App } from '../src/app/App';

function getMetaContent(attr: 'name' | 'property', key: string): string | null {
  return document.head.querySelector(`meta[${attr}="${key}"]`)?.getAttribute('content') ?? null;
}

describe('SEO & Meta-Tag-Verwaltung', () => {
  afterEach(() => {
    window.localStorage.removeItem('ithreelab_locale');
    document.documentElement.lang = 'de';
  });

  it('setzt Titel, Description, Canonical und Open Graph je Route', () => {
    render(
      <MemoryRouter initialEntries={['/labs/intelligence']}>
        <App />
      </MemoryRouter>,
    );

    expect(document.title).toBe('I3 Intelligence Core | iThree Labs');
    expect(getMetaContent('name', 'description')).toMatch(/I3 Intelligence Core/i);
    expect(getMetaContent('name', 'robots')).toBe('index, follow');
    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://ithreelab.com/labs/intelligence',
    );
    expect(getMetaContent('property', 'og:url')).toBe('https://ithreelab.com/labs/intelligence');
    expect(getMetaContent('property', 'og:locale')).toBe('de_DE');
  });

  it('aktualisiert Meta-Tags bei Sprachwechsel DE ↔ EN', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/ecosystem']}>
        <App />
      </MemoryRouter>,
    );

    expect(getMetaContent('property', 'og:locale')).toBe('de_DE');
    expect(getMetaContent('name', 'description')).toMatch(/vernetzte Ökosystem/i);

    const enButtons = screen.getAllByRole('button', { name: 'en' });
    await user.click(enButtons[0]);

    expect(getMetaContent('property', 'og:locale')).toBe('en_US');
    expect(getMetaContent('name', 'description')).toMatch(/connected ecosystem/i);
  });

  it('setzt noindex, follow für unbekannte 404-Routen', () => {
    render(
      <MemoryRouter initialEntries={['/does-not-exist']}>
        <App />
      </MemoryRouter>,
    );

    expect(document.title).toMatch(/404/);
    expect(getMetaContent('name', 'robots')).toBe('noindex, follow');
  });
});
