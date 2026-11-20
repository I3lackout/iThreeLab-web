import { useEffect, useState } from 'react';
import { Menu, Sparkles, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import type { DomainAccent } from '../../data/universe';
import { useLanguage } from '../../i18n/LanguageContext';
import { ACCENT_STYLES } from '../../utils/accents';

interface NavItem {
  label: string;
  to: string;
  accent: DomainAccent;
  matchPrefix?: boolean;
}

function isNavItemActive(pathname: string, item: NavItem): boolean {
  if (item.matchPrefix) {
    return pathname === item.to || pathname.startsWith(`${item.to}/`);
  }
  return pathname === item.to;
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { locale, setLocale, t } = useLanguage();

  const primaryNavItems: NavItem[] = [
    { label: t.nav.items.portal, to: '/', accent: 'universe' },
    { label: t.nav.items.ecosystem, to: '/ecosystem', accent: 'universe' },
    { label: t.nav.items.labs, to: '/labs', accent: 'labs', matchPrefix: true },
    { label: t.nav.items.studio, to: '/studio', accent: 'studio' },
    { label: t.nav.items.technology, to: '/technology', accent: 'labs' },
    { label: t.nav.items.about, to: '/about', accent: 'universe' },
  ];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const languageToggle = (
    <div
      role="group"
      aria-label={t.nav.languageLabel}
      className="inline-flex items-center rounded-lg border border-white/15 bg-[#151520] p-0.5 font-mono text-[11px]"
    >
      {(['de', 'en'] as const).map((lang) => {
        const active = locale === lang;
        return (
          <button
            key={lang}
            type="button"
            aria-pressed={active}
            onClick={() => setLocale(lang)}
            className={`rounded-md px-2 py-1 uppercase transition ${
              active
                ? 'bg-[#00E5FF]/15 text-[#00E5FF]'
                : 'text-[#B4B4CC] hover:text-[#F5F5FA]'
            }`}
          >
            {lang}
          </button>
        );
      })}
    </div>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#08090D]/92 backdrop-blur-md">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-[#151520] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#00E5FF]"
      >
        {t.nav.skipToMain}
      </a>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <Link
          to="/"
          className="group inline-flex shrink-0 items-center gap-3 text-base font-bold tracking-[0.2em] text-[#F5F5FA]"
        >
          <span className="relative inline-flex h-5 w-5 items-center justify-center" aria-hidden="true">
            <span className="absolute h-2 w-2 -translate-y-1.5 rounded-full bg-[#8B5CF6] transition-transform duration-200 group-hover:scale-110" />
            <span className="absolute h-2 w-2 translate-x-1.5 translate-y-1.5 rounded-full bg-[#00E5FF] transition-transform duration-200 group-hover:scale-110" />
            <span className="absolute h-2 w-2 -translate-x-1.5 translate-y-1.5 rounded-full bg-[#F59E0B] transition-transform duration-200 group-hover:scale-110" />
          </span>
          <span className="ithreelab-text">iThreeLab</span>
          <span className="hidden rounded border border-white/10 bg-[#151520] px-2 py-0.5 font-mono text-[10px] tracking-[0.12em] text-[#8B5CF6] sm:inline-block">
            iThreeLab.com
          </span>
        </Link>

        <nav aria-label={t.nav.mainNavLabel} className="hidden items-center gap-5 lg:flex">
          {primaryNavItems.map((item) => {
            const active = isNavItemActive(location.pathname, item);
            const style = ACCENT_STYLES[item.accent];
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-current={active ? 'page' : undefined}
                className={`text-sm font-medium transition-colors ${
                  active ? style.text : 'text-[#B4B4CC] hover:text-[#F5F5FA]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <span className="h-4 w-px bg-white/15" aria-hidden="true" />

          {languageToggle}

          <Link
            to="/labs/intelligence"
            aria-current={location.pathname === '/labs/intelligence' ? 'page' : undefined}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider transition ${
              location.pathname === '/labs/intelligence'
                ? 'border-[#00E5FF] bg-[#00E5FF]/15 text-[#00E5FF]'
                : 'border-[#00E5FF]/40 bg-[#151520] text-[#F5F5FA] hover:border-[#00E5FF] hover:text-[#00E5FF]'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-[#00E5FF]" aria-hidden="true" />
            <span>{t.nav.intelligenceCore}</span>
          </Link>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          {languageToggle}
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? t.nav.closeNav : t.nav.openNav}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-[#151520] p-2 text-[#F5F5FA] hover:border-[#00E5FF]/60"
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav
          id="mobile-navigation"
          aria-label={t.nav.mobileNavLabel}
          className="border-t border-white/10 bg-[#08090D] px-4 py-4 lg:hidden"
        >
          <p className="px-2 pb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#8B5CF6]">
            iThreeLab
          </p>
          <ul className="flex flex-col gap-1.5">
            {primaryNavItems.map((item) => {
              const active = isNavItemActive(location.pathname, item);
              const style = ACCENT_STYLES[item.accent];
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center justify-between rounded-md px-2.5 py-2 text-base font-medium hover:bg-[#151520] ${
                      active ? style.text : 'text-[#F5F5FA]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className={`h-2 w-2 rounded-full ${style.dot}`} aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
            <li className="pt-2">
              <Link
                to="/labs/intelligence"
                aria-current={location.pathname === '/labs/intelligence' ? 'page' : undefined}
                onClick={() => setMenuOpen(false)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#00E5FF]/50 bg-[#151520] px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-[#00E5FF] hover:border-[#00E5FF]"
              >
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                <span>{t.nav.mobileIntelligenceCore}</span>
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
