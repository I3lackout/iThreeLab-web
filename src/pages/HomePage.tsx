import { BrandText } from '../components/ui/BrandText';
import { useState } from 'react';
import { ArrowRight, Cpu, FlaskConical, Layers, Sparkles, Wand2 } from 'lucide-react';
import { m } from 'motion/react';
import { Link } from 'react-router-dom';
import { DomainBadge } from '../components/ui/DomainBadge';
import { GeometricBackdrop } from '../components/ui/GeometricBackdrop';
import { SafeExternalLink } from '../components/ui/SafeExternalLink';
import { SectionHeader } from '../components/ui/SectionHeader';
import { getUniverseWorlds, getVisionPillars } from '../data/universe';
import { useLanguage } from '../i18n/LanguageContext';
import { ACCENT_STYLES } from '../utils/accents';

export function HomePage() {
  const { locale, t } = useLanguage();
  const worlds = getUniverseWorlds(locale);
  const visionPillars = getVisionPillars(locale);
  const [selectedWorldId, setSelectedWorldId] = useState(worlds[0].id);
  const activeWorld =
    worlds.find((world) => world.id === selectedWorldId) ?? worlds[0];
  const activeAccent = ACCENT_STYLES[activeWorld.accent];

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10 py-20 sm:py-28">
        <GeometricBackdrop />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <m.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="max-w-4xl"
          >
            <div className="flex flex-wrap items-center gap-2.5">
              <DomainBadge label="iThreeLab V1" tone="universe" />
              <DomainBadge label="iThreeLab.com" tone="universe" />
              <DomainBadge label="Foundation · Labs · Studio" tone="studio" />
            </div>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-[#F5F5FA] sm:text-6xl">
              <span className="ithreelab-text">iThreeLab</span> — {t.home.hero.subtitle}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#B4B4CC] sm:text-xl">
              {t.home.hero.heroDescriptionBefore}
              <span className="font-semibold text-[#FF2020]">I3LACKOUT</span>,{' '}
              <span className="font-semibold text-[#FCD34D]">musicchaini3</span>
              {t.home.hero.heroDescriptionAnd}
              <span className="font-semibold text-[#67E8F9]">iThree Labs</span>
              {t.home.hero.heroDescriptionAfter}
            </p>

            <div className="mt-9 flex flex-wrap gap-3.5">
              <Link
                to="/ecosystem"
                className="inline-flex items-center gap-2 rounded-xl border border-[#8B5CF6]/70 bg-[#8B5CF6]/20 px-5 py-3 text-sm font-semibold text-[#F5F5FA] transition hover:border-[#8B5CF6] hover:bg-[#8B5CF6]/30"
              >
                <Layers className="h-4 w-4 text-[#C4B5FD]" aria-hidden="true" />
                <span>{t.home.hero.ctaEcosystem}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>

              <Link
                to="/labs"
                className="inline-flex items-center gap-2 rounded-xl border border-[#00E5FF]/55 bg-[#151520] px-5 py-3 text-sm font-semibold text-[#F5F5FA] transition hover:border-[#00E5FF] hover:text-[#00E5FF]"
              >
                <FlaskConical className="h-4 w-4 text-[#00E5FF]" aria-hidden="true" />
                <span>{t.home.hero.ctaLabs}</span>
              </Link>

              <Link
                to="/studio"
                className="inline-flex items-center gap-2 rounded-xl border border-[#F59E0B]/55 bg-[#151520] px-5 py-3 text-sm font-semibold text-[#F5F5FA] transition hover:border-[#F59E0B] hover:text-[#F59E0B]"
              >
                <Wand2 className="h-4 w-4 text-[#F59E0B]" aria-hidden="true" />
                <span>{t.home.hero.ctaStudio}</span>
              </Link>
            </div>
          </m.div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeader
          eyebrow={t.home.worlds.eyebrow}
          title={t.home.worlds.title}
          description={t.home.worlds.description}
          accent="universe"
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {worlds.map((world) => {
            const style = ACCENT_STYLES[world.accent];
            return (
              <article
                key={world.id}
                className={`i3-card flex flex-col justify-between rounded-2xl p-6 ${style.cardHover}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <DomainBadge label={world.status} tone={world.accent} />
                    <span className="font-mono text-xs text-[#B4B4CC]"><BrandText>{world.domainLabel}</BrandText></span>
                  </div>

                  <h3 className="mt-5 text-2xl font-bold text-[#F5F5FA]"><BrandText>{world.name}</BrandText></h3>
                  <p className={`mt-1 font-mono text-xs uppercase tracking-wider ${style.text}`}>
                    {world.tagline}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-[#B4B4CC]">{world.summary}</p>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/10 pt-5">
                  <Link
                    to={world.internalRoute}
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-xs font-semibold transition ${style.button}`}
                  >
                    <span>{world.internalLabel}</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>

                  {world.externalUrl && world.externalLabel ? (
                    <SafeExternalLink
                      url={world.externalUrl}
                      label={world.externalLabel}
                      className="rounded-lg border border-white/15 px-3 py-2 text-xs font-medium text-[#B4B4CC] hover:border-white/35 hover:text-[#F5F5FA]"
                    />
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section
        aria-labelledby="ecosystem-navigator-heading"
        className="border-y border-white/10 bg-[#151520]/45 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader
            eyebrow={t.home.navigator.eyebrow}
            title={t.home.navigator.title}
            description={t.home.navigator.description}
            accent="labs"
          />

          <div
            role="tablist"
            aria-label={t.home.navigator.tablistAria}
            className="mt-8 flex flex-wrap gap-3"
          >
            {worlds.map((world) => {
              const isSelected = world.id === activeWorld.id;
              const style = ACCENT_STYLES[world.accent];
              return (
                <button
                  key={world.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`world-panel-${world.id}`}
                  id={`world-tab-${world.id}`}
                  onClick={() => setSelectedWorldId(world.id)}
                  className={`inline-flex items-center gap-2.5 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
                    isSelected
                      ? style.button
                      : 'border-white/12 bg-[#08090D] text-[#B4B4CC] hover:border-white/30 hover:text-[#F5F5FA]'
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${style.dot}`} aria-hidden="true" />
                  <span><BrandText>{world.name}</BrandText></span>
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id={`world-panel-${activeWorld.id}`}
            aria-labelledby={`world-tab-${activeWorld.id}`}
            className="i3-card mt-6 rounded-2xl p-6 sm:p-8"
          >
            <div className="grid gap-8 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <div className="flex flex-wrap items-center gap-3">
                  <DomainBadge label={activeWorld.status} tone={activeWorld.accent} />
                  <span className="font-mono text-xs text-[#B4B4CC]">
                    <BrandText>{activeWorld.domainLabel}</BrandText>
                  </span>
                </div>
                <h3
                  id="ecosystem-navigator-heading"
                  className="mt-4 text-2xl font-bold text-[#F5F5FA] sm:text-3xl"
                >
                  <BrandText>{activeWorld.name}</BrandText>
                </h3>
                <p className={`mt-1 font-mono text-xs uppercase tracking-wider ${activeAccent.text}`}>
                  {activeWorld.tagline}
                </p>
                <p className="mt-4 text-base leading-relaxed text-[#B4B4CC]">
                  {activeWorld.summary}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to={activeWorld.internalRoute}
                    className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition ${activeAccent.button}`}
                  >
                    <span>{activeWorld.internalLabel}</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>

                  {activeWorld.externalUrl && activeWorld.externalLabel ? (
                    <SafeExternalLink
                      url={activeWorld.externalUrl}
                      label={activeWorld.externalLabel}
                      className="rounded-lg border border-white/15 bg-[#08090D] px-4 py-2 text-sm font-medium text-[#F5F5FA] hover:border-white/35"
                    />
                  ) : null}

                  {activeWorld.secondaryExternalUrl && activeWorld.secondaryExternalLabel ? (
                    <SafeExternalLink
                      url={activeWorld.secondaryExternalUrl}
                      label={activeWorld.secondaryExternalLabel}
                      className="rounded-lg border border-[#00E5FF]/40 bg-[#08090D] px-4 py-2 text-sm font-medium text-[#67E8F9] hover:border-[#00E5FF]"
                    />
                  ) : null}
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#08090D]/80 p-5 lg:col-span-2">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#B4B4CC]">
                  {t.home.navigator.responsibilitiesHeading}
                </p>
                <ul className="mt-4 space-y-3 text-sm text-[#F5F5FA]">
                  {activeWorld.responsibilities.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span
                        className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${activeAccent.dot}`}
                        aria-hidden="true"
                      />
                      <span className="leading-relaxed text-[#B4B4CC]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeader
          eyebrow={t.home.vision.eyebrow}
          title={t.home.vision.title}
          description={t.home.vision.description}
          accent="universe"
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {visionPillars.map((pillar) => {
            const style = ACCENT_STYLES[pillar.accent];
            return (
              <article
                key={pillar.id}
                className={`i3-card rounded-2xl p-6 ${style.cardHover}`}
              >
                <p className={`font-mono text-xs uppercase tracking-[0.2em] ${style.text}`}>
                  {pillar.eyebrow}
                </p>
                <h3 className="mt-3 text-xl font-bold text-[#F5F5FA]">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#B4B4CC]">{pillar.description}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <article className="i3-card i3-card-labs rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between gap-3">
              <DomainBadge label={t.home.labsCard.badge} tone="labs" />
              <Cpu className="h-5 w-5 text-[#00E5FF]" aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-2xl font-bold text-[#F5F5FA]">
              {t.home.labsCard.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#B4B4CC]">
              {t.home.labsCard.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/labs"
                className="inline-flex items-center gap-2 rounded-lg border border-[#00E5FF]/55 bg-[#00E5FF]/12 px-4 py-2 text-sm font-semibold text-[#F5F5FA] hover:border-[#00E5FF]"
              >
                <span>{t.home.labsCard.ctaLabs}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/labs/intelligence"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-[#B4B4CC] hover:border-[#00E5FF]/50 hover:text-[#F5F5FA]"
              >
                <Sparkles className="h-4 w-4 text-[#00E5FF]" aria-hidden="true" />
                <span>{t.home.labsCard.ctaCore}</span>
              </Link>
            </div>
          </article>

          <article className="i3-card i3-card-studio rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between gap-3">
              <DomainBadge label={t.home.studioCard.badge} tone="studio" />
              <Wand2 className="h-5 w-5 text-[#F59E0B]" aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-2xl font-bold text-[#F5F5FA]">
              {t.home.studioCard.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#B4B4CC]">
              {t.home.studioCard.description}
            </p>
            <div className="mt-6">
              <Link
                to="/studio"
                className="inline-flex items-center gap-2 rounded-lg border border-[#F59E0B]/55 bg-[#F59E0B]/15 px-4 py-2 text-sm font-semibold text-[#F5F5FA] hover:border-[#F59E0B]"
              >
                <span>{t.home.studioCard.ctaStudio}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
