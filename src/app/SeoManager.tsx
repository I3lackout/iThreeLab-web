import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import type { Locale } from '../i18n/translations';

const BASE_URL = 'https://ithreelab.com';

interface RouteSeoEntry {
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  robots?: string;
}

const ROUTE_SEO: Record<string, RouteSeoEntry> = {
  '/': {
    title: {
      de: 'iThreeLab · iThreeLab.com — Music × Technology × Intelligence',
      en: 'iThreeLab · iThreeLab.com — Music × Technology × Intelligence',
    },
    description: {
      de: 'iThreeLab.com — Dachmarke und Technologie-Labor für I3LACKOUT, musicchaini3, i3-economics-intelligence und iThree Studio.',
      en: 'iThreeLab.com — Umbrella brand and technology laboratory for I3LACKOUT, musicchaini3, i3-economics-intelligence, and iThree Studio.',
    },
  },
  '/ecosystem': {
    title: {
      de: 'Connected Ecosystem | iThreeLab',
      en: 'Connected Ecosystem | iThreeLab',
    },
    description: {
      de: 'Überblick über das vernetzte Ökosystem aus I3LACKOUT, musicchaini3 und iThree Labs — Rollen, Domains und Projektstatus.',
      en: 'Overview of the connected ecosystem spanning I3LACKOUT, musicchaini3, and iThree Labs — roles, domains, and project status.',
    },
  },
  '/labs': {
    title: {
      de: 'iThree Labs — Research & Engineering | iThreeLab',
      en: 'iThree Labs — Research & Engineering | iThreeLab',
    },
    description: {
      de: 'Forschungs- und Entwicklungslabor von iThreeLab für angewandte KI, Audio-Intelligence, ökonomische Simulationen und Cloud-Systeme.',
      en: 'Research and engineering lab of iThreeLab for applied AI, audio intelligence, economic simulations, and cloud systems.',
    },
  },
  '/labs/intelligence': {
    title: {
      de: 'I3 Intelligence Core | iThree Labs',
      en: 'I3 Intelligence Core | iThree Labs',
    },
    description: {
      de: 'Der modulare I3 Intelligence Core: Architektur, Wissens-Layer und Schnittstellen für Audio, Economics und Creator-Workflows.',
      en: 'The modular I3 Intelligence Core: architecture, knowledge layers, and interfaces for audio, economics, and creator workflows.',
    },
  },
  '/labs/economics': {
    title: {
      de: 'Economics Lab — Synthetic Simulator & API | iThree Labs',
      en: 'Economics Lab — Synthetic Simulator & API | iThree Labs',
    },
    description: {
      de: 'Interaktiver Economics-Simulator für Ressourcenanalyse, Pricing-Szenarien und Forecasts mit I3-Economics-Intelligence.',
      en: 'Interactive economics simulator for resource analysis, pricing scenarios, and forecasts powered by I3 Economics Intelligence.',
    },
  },
  '/studio': {
    title: {
      de: 'iThree Studio — Audio & Production Systems | iThreeLab',
      en: 'iThree Studio — Audio & Production Systems | iThreeLab',
    },
    description: {
      de: 'iThree Studio verbindet elektronische Musikproduktion, Sound Design und eigene Audio-Tools mit moderner Software-Architektur.',
      en: 'iThree Studio bridges electronic music production, sound design, and custom audio tools with modern software architecture.',
    },
  },
  '/technology': {
    title: {
      de: 'Technology & Architecture | iThreeLab',
      en: 'Technology & Architecture | iThreeLab',
    },
    description: {
      de: 'Technischer Stack von iThreeLab: Python/Flask, React/TypeScript, Realtime WebSockets, Mobile und Cloud-Infrastruktur.',
      en: 'Technical stack of iThreeLab: Python/Flask, React/TypeScript, realtime WebSockets, mobile, and cloud infrastructure.',
    },
  },
  '/about': {
    title: {
      de: 'Vision & About — Developer Bridge | iThreeLab',
      en: 'Vision & About — Developer Bridge | iThreeLab',
    },
    description: {
      de: 'Warum iThreeLab existiert: Unabhängige Musik, nachvollziehbare Plattform-Architektur und angewandte Forschung unter einem Dach.',
      en: 'Why iThreeLab exists: independent music, transparent platform architecture, and applied research under one roof.',
    },
  },
  '/impressum': {
    title: {
      de: 'Impressum | iThreeLab',
      en: 'Imprint | iThreeLab',
    },
    description: {
      de: 'Rechtliche Angaben und Impressum für iThreeLab.com.',
      en: 'Legal notice and imprint for iThreeLab.com.',
    },
  },
  '/datenschutz': {
    title: {
      de: 'Datenschutz | iThreeLab',
      en: 'Privacy Policy | iThreeLab',
    },
    description: {
      de: 'Datenschutzhinweise und Informationen zur Datenverarbeitung auf iThreeLab.com.',
      en: 'Privacy policy and data protection information for iThreeLab.com.',
    },
  },
};

const NOT_FOUND_SEO: RouteSeoEntry = {
  title: {
    de: 'Seite nicht gefunden (404) | iThreeLab',
    en: 'Page Not Found (404) | iThreeLab',
  },
  description: {
    de: 'Die angeforderte Seite existiert auf iThreeLab.com nicht.',
    en: 'The requested page does not exist on iThreeLab.com.',
  },
  robots: 'noindex, follow',
};

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function normalizePathname(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

/**
 * Synchronizes document title, meta description, canonical URL, robots directive,
 * and Open Graph / Twitter tags with the active route and UI locale.
 */
export function SeoManager() {
  const { pathname } = useLocation();
  const { locale } = useLanguage();

  useEffect(() => {
    const normalizedPath = normalizePathname(pathname);
    const entry = ROUTE_SEO[normalizedPath] ?? NOT_FOUND_SEO;
    const isKnownRoute = normalizedPath in ROUTE_SEO;
    const title = entry.title[locale];
    const description = entry.description[locale];
    const canonicalUrl = isKnownRoute
      ? `${BASE_URL}${normalizedPath === '/' ? '/' : normalizedPath}`
      : `${BASE_URL}/`;
    const robots = entry.robots ?? 'index, follow';

    document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', robots);
    upsertCanonical(canonicalUrl);

    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:locale', locale === 'de' ? 'de_DE' : 'en_US');

    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
  }, [pathname, locale]);

  return null;
}
