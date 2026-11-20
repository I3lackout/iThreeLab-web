import { BrandText } from '../components/ui/BrandText';
import { useState } from 'react';
import { ArrowRight, Info, Layers, Wand2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DomainBadge } from '../components/ui/DomainBadge';
import { SectionHeader } from '../components/ui/SectionHeader';
import { getStudioCapabilities, getStudioWorkflowBlueprints } from '../data/studio';
import { useLanguage } from '../i18n/LanguageContext';

export function StudioPage() {
  const { locale, t } = useLanguage();
  const capabilities = getStudioCapabilities(locale);
  const blueprints = getStudioWorkflowBlueprints(locale);
  const [selectedBlueprintId, setSelectedBlueprintId] = useState(capabilities[0].id);
  const activeBlueprint =
    blueprints.find((bp) => bp.id === selectedBlueprintId) ??
    blueprints[0];

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeader
        as="h1"
        eyebrow={t.studio.eyebrow}
        title={t.studio.title}
        description={t.studio.description}
        accent="studio"
      />

      <div className="mt-8 flex items-start gap-3 rounded-2xl border border-[#F59E0B]/40 bg-[#151520] p-5 text-sm text-[#B4B4CC]">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#F59E0B]" aria-hidden="true" />
        <p className="leading-relaxed">
          {t.studio.statusNotice}
        </p>
      </div>

      <section aria-labelledby="studio-capabilities-heading" className="mt-12">
        <h2
          id="studio-capabilities-heading"
          className="font-mono text-xs uppercase tracking-[0.2em] text-[#F59E0B]"
        >
          {t.studio.capabilitiesHeading}
        </h2>

        <div className="mt-5 grid gap-6 md:grid-cols-2">
          {capabilities.map((capability) => (
            <article key={capability.id} className="i3-card i3-card-studio rounded-2xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#F59E0B]">
                  {capability.eyebrow}
                </p>
                <DomainBadge label={capability.stage} tone="studio" />
              </div>

              <h3 className="mt-3 text-2xl font-bold text-[#F5F5FA]">{capability.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#B4B4CC]">{capability.summary}</p>

              <ul className="mt-4 space-y-2 border-t border-white/10 pt-4 text-xs leading-relaxed text-[#B4B4CC]">
                {capability.foundationScope.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F59E0B]"
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-4 font-mono text-xs text-[#FCD34D]">{capability.coreDependency}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="workflow-blueprint-heading" className="mt-16">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2
              id="workflow-blueprint-heading"
              className="font-mono text-xs uppercase tracking-[0.2em] text-[#F59E0B]"
            >
              {t.studio.blueprintsHeading}
            </h2>
            <p className="mt-2 text-sm text-[#B4B4CC]">
              {t.studio.blueprintsSubtitle}
            </p>
          </div>
        </div>

        <div
          className="mt-6 flex flex-wrap gap-2.5"
          role="tablist"
          aria-label={t.studio.blueprintsTablistAria}
        >
          {blueprints.map((bp) => {
            const selected = bp.id === activeBlueprint.id;
            return (
              <button
                key={bp.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`blueprint-panel-${bp.id}`}
                id={`blueprint-tab-${bp.id}`}
                onClick={() => setSelectedBlueprintId(bp.id)}
                className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                  selected
                    ? 'border-[#F59E0B] bg-[#F59E0B]/18 text-[#F5F5FA]'
                    : 'border-white/12 bg-[#151520] text-[#B4B4CC] hover:border-white/30 hover:text-[#F5F5FA]'
                }`}
              >
                <Wand2 className="h-3.5 w-3.5 text-[#F59E0B]" aria-hidden="true" />
                <span>{bp.title.replace(t.studio.blueprintWord, '')}</span>
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`blueprint-panel-${activeBlueprint.id}`}
          aria-labelledby={`blueprint-tab-${activeBlueprint.id}`}
          className="i3-card mt-6 rounded-2xl p-6 sm:p-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <DomainBadge label={activeBlueprint.stageLabel} tone="studio" />
              <h3 className="mt-3 text-2xl font-bold text-[#F5F5FA]">{activeBlueprint.title}</h3>
              <p className="mt-2 text-sm text-[#B4B4CC]">{activeBlueprint.objective}</p>
            </div>
            <Link
              to="/labs/intelligence"
              className="inline-flex items-center gap-2 rounded-lg border border-[#00E5FF]/50 bg-[#08090D] px-4 py-2 text-xs font-semibold text-[#67E8F9] hover:border-[#00E5FF]"
            >
              <Layers className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t.studio.inspectCore}</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {activeBlueprint.steps.map((step) => (
              <div
                key={step.phase}
                className="rounded-xl border border-white/10 bg-[#08090D]/85 p-4"
              >
                <p className="font-mono text-xs uppercase tracking-wider text-[#F59E0B]">
                  {step.phase}
                </p>
                <h4 className="mt-2 text-base font-semibold text-[#F5F5FA]">{step.label}</h4>
                <p className="mt-2 text-xs leading-relaxed text-[#B4B4CC]"><BrandText>{step.detail}</BrandText></p>
              </div>
            ))}
          </div>

          <p className="mt-5 rounded-lg border border-[#F59E0B]/25 bg-[#08090D]/80 px-4 py-3 text-xs text-[#FCD34D]">
            {activeBlueprint.technicalNote}
          </p>
        </div>
      </section>
    </div>
  );
}
