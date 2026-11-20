import { useState } from 'react';
import { ArrowRight, FlaskConical, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DomainBadge } from '../components/ui/DomainBadge';
import { SectionHeader } from '../components/ui/SectionHeader';
import {
  LABS_STAGE_FILTERS,
  filterExperimentalProjects,
  getExperimentalProjects,
  getLabsResearchAreas,
  type LabsStageKey,
} from '../data/labs';
import { useLanguage } from '../i18n/LanguageContext';

export function LabsPage() {
  const { locale, t } = useLanguage();
  const [selectedStageKey, setSelectedStageKey] = useState<LabsStageKey>('all');
  const researchAreas = getLabsResearchAreas(locale);
  const experimentalProjects = getExperimentalProjects(locale);
  const activeStageFilter =
    LABS_STAGE_FILTERS.find((item) => item.key === selectedStageKey) ?? LABS_STAGE_FILTERS[0];
  const visibleProjects = filterExperimentalProjects(
    experimentalProjects,
    activeStageFilter[locale],
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <SectionHeader
          as="h1"
          eyebrow={t.labs.eyebrow}
          title={t.labs.title}
          description={t.labs.description}
          accent="labs"
        />
      </div>

      <div className="mt-8 rounded-2xl border border-[#00E5FF]/35 bg-[#151520] p-6 sm:p-7">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <DomainBadge label={t.labs.spotlight.badge} tone="labs" />
            <h2 className="mt-3 text-xl font-bold text-[#F5F5FA] sm:text-2xl">
              {t.labs.spotlight.title}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#B4B4CC]">
              {t.labs.spotlight.description}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2.5">
            <Link
              to="/labs/intelligence"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-[#00E5FF]/60 bg-[#00E5FF]/12 px-4 py-2.5 text-sm font-semibold text-[#F5F5FA] transition hover:border-[#00E5FF] hover:bg-[#00E5FF]/22"
            >
              <Sparkles className="h-4 w-4 text-[#00E5FF]" aria-hidden="true" />
              <span>{t.labs.spotlight.ctaCore}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to="/labs/economics"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-[#00E5FF]/40 bg-[#08090D] px-4 py-2.5 text-sm font-semibold text-[#00E5FF] transition hover:border-[#00E5FF]"
            >
              <span>{t.labs.spotlight.ctaEconomics}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      <section aria-labelledby="research-areas-heading" className="mt-14">
        <h2
          id="research-areas-heading"
          className="font-mono text-xs uppercase tracking-[0.2em] text-[#00E5FF]"
        >
          {t.labs.researchAreasHeading}
        </h2>

        <div className="mt-5 grid gap-6 md:grid-cols-2">
          {researchAreas.map((area) => (
            <article key={area.id} className="i3-card i3-card-labs rounded-2xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#00E5FF]">
                  {area.eyebrow}
                </p>
                <DomainBadge label={area.stage} tone="labs" />
              </div>

              <h3 className="mt-3 text-2xl font-bold text-[#F5F5FA]">{area.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#B4B4CC]">{area.summary}</p>

              <ul className="mt-4 space-y-2 border-t border-white/10 pt-4 text-xs leading-relaxed text-[#B4B4CC]">
                {area.focusPoints.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00E5FF]" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {area.routeTo && area.routeLabel ? (
                <div className="mt-5">
                  <Link
                    to={area.routeTo}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#00E5FF] hover:underline"
                  >
                    <span>{area.routeLabel}</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="experimental-projects-heading" className="mt-16">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2
              id="experimental-projects-heading"
              className="font-mono text-xs uppercase tracking-[0.2em] text-[#00E5FF]"
            >
              {t.labs.experimentalHeading}
            </h2>
            <p className="mt-2 text-sm text-[#B4B4CC]">
              {t.labs.experimentalDescription}
            </p>
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label={t.labs.filterAriaLabel}>
            {LABS_STAGE_FILTERS.map((item) => {
              const active = selectedStageKey === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelectedStageKey(item.key)}
                  className={`rounded-lg border px-3 py-1.5 font-mono text-xs transition ${
                    active
                      ? 'border-[#00E5FF] bg-[#00E5FF]/15 text-[#00E5FF]'
                      : 'border-white/12 bg-[#151520] text-[#B4B4CC] hover:border-white/30 hover:text-[#F5F5FA]'
                  }`}
                >
                  {item[locale]}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {visibleProjects.map((project) => (
            <article key={project.id} className="i3-card i3-card-labs rounded-2xl p-6">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[#B4B4CC]">
                  <FlaskConical className="h-3.5 w-3.5 text-[#00E5FF]" aria-hidden="true" />
                  <span>{project.area}</span>
                </span>
                <DomainBadge label={project.stage} tone="labs" />
              </div>

              <h3 className="mt-3 text-lg font-bold text-[#F5F5FA]">{project.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#B4B4CC]">{project.description}</p>
              <p className="mt-4 rounded-lg border border-white/10 bg-[#08090D]/80 px-3 py-2 font-mono text-xs text-[#67E8F9]">
                {project.note}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
