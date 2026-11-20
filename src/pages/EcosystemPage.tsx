import { BrandText } from '../components/ui/BrandText';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DomainBadge } from '../components/ui/DomainBadge';
import { SafeExternalLink } from '../components/ui/SafeExternalLink';
import { SectionHeader } from '../components/ui/SectionHeader';
import { getEcosystemProjects, getUniverseWorlds } from '../data/universe';
import { useLanguage } from '../i18n/LanguageContext';
import { ACCENT_STYLES } from '../utils/accents';

export function EcosystemPage() {
  const { locale, t } = useLanguage();
  const worlds = getUniverseWorlds(locale);
  const projects = getEcosystemProjects(locale);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeader
        as="h1"
        eyebrow={t.ecosystem.eyebrow}
        title={t.ecosystem.title}
        description={t.ecosystem.description}
        accent="universe"
      />

      <section aria-labelledby="brands-heading" className="mt-12">
        <h2 id="brands-heading" className="font-mono text-xs uppercase tracking-[0.2em] text-[#B4B4CC]">
          {t.ecosystem.brandsHeading}
        </h2>

        <div className="mt-5 grid gap-6 lg:grid-cols-3">
          {worlds.map((world) => {
            const style = ACCENT_STYLES[world.accent];
            return (
              <article
                key={world.id}
                className={`i3-card flex flex-col justify-between rounded-2xl p-6 ${style.cardHover}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <DomainBadge label={world.status} tone={world.accent} />
                    <span className="font-mono text-xs text-[#B4B4CC]"><BrandText>{world.domainLabel}</BrandText></span>
                  </div>

                  <h3 className="mt-4 text-2xl font-bold text-[#F5F5FA]"><BrandText>{world.name}</BrandText></h3>
                  <p className={`mt-1 font-mono text-xs uppercase tracking-wider ${style.text}`}>
                    {world.tagline}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#B4B4CC]">{world.summary}</p>

                  <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-4 text-sm text-[#B4B4CC]">
                    {world.responsibilities.map((resp) => (
                      <li key={resp} className="flex items-start gap-2">
                        <CheckCircle2
                          className={`mt-0.5 h-4 w-4 shrink-0 ${style.text}`}
                          aria-hidden="true"
                        />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex flex-wrap gap-2.5 border-t border-white/10 pt-4">
                  <Link
                    to={world.internalRoute}
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold ${style.button}`}
                  >
                    <span>{world.internalLabel}</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>

                  {world.externalUrl && world.externalLabel ? (
                    <SafeExternalLink
                      url={world.externalUrl}
                      label={world.externalLabel}
                      className="rounded-lg border border-white/15 px-3 py-2 text-xs font-medium text-[#F5F5FA] hover:border-white/35"
                    />
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="projects-heading" className="mt-16">
        <h2 id="projects-heading" className="font-mono text-xs uppercase tracking-[0.2em] text-[#00E5FF]">
          {t.ecosystem.projectsHeading}
        </h2>

        <div className="mt-5 grid gap-6 md:grid-cols-2">
          {projects.map((project) => {
            const style = ACCENT_STYLES[project.accent];
            return (
              <article
                key={project.id}
                className={`i3-card flex flex-col justify-between rounded-2xl p-6 ${style.cardHover}`}
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <DomainBadge label={`${project.brand} · ${project.stage}`} tone={project.accent} />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-[#F5F5FA]"><BrandText>{project.name}</BrandText></h3>
                  <p className="mt-1 text-xs font-medium text-[#B4B4CC]"><BrandText>{project.stageNote}</BrandText></p>
                  <p className="mt-3 text-sm leading-relaxed text-[#B4B4CC]">{project.summary}</p>

                  <ul className="mt-4 space-y-2 text-xs leading-relaxed text-[#B4B4CC]">
                    {project.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span
                          className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${style.dot}`}
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/10 pt-4">
                  {project.internalRoute && project.internalLabel ? (
                    <Link
                      to={project.internalRoute}
                      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold ${style.button}`}
                    >
                      <span>{project.internalLabel}</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  ) : null}

                  {project.externalUrl && project.externalLabel ? (
                    <SafeExternalLink
                      url={project.externalUrl}
                      label={project.externalLabel}
                      className="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-medium text-[#F5F5FA] hover:border-white/35"
                    />
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
