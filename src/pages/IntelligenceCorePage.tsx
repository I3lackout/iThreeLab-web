import { useState } from 'react';
import { ArrowLeft, Info, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DomainBadge } from '../components/ui/DomainBadge';
import { SectionHeader } from '../components/ui/SectionHeader';
import {
  CORE_STAGE_FILTERS,
  filterIntelligenceModules,
  getIntelligenceModules,
  type CoreStageKey,
} from '../data/labs';
import { useLanguage } from '../i18n/LanguageContext';

export function IntelligenceCorePage() {
  const { locale, t } = useLanguage();
  const [stageKey, setStageKey] = useState<CoreStageKey>('all');
  const allModules = getIntelligenceModules(locale);
  const activeFilter =
    CORE_STAGE_FILTERS.find((item) => item.key === stageKey) ?? CORE_STAGE_FILTERS[0];
  const modules = filterIntelligenceModules(allModules, activeFilter[locale]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <Link
        to="/labs"
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-[#00E5FF] hover:underline"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        <span>{t.intelligenceCore.backToLabs}</span>
      </Link>

      <div className="mt-6">
        <SectionHeader
          as="h1"
          eyebrow={t.intelligenceCore.eyebrow}
          title={t.intelligenceCore.title}
          description={t.intelligenceCore.description}
          accent="labs"
        />
      </div>

      <div className="mt-8 flex items-start gap-3 rounded-2xl border border-[#00E5FF]/30 bg-[#151520] p-5 text-sm text-[#B4B4CC]">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#00E5FF]" aria-hidden="true" />
        <p className="leading-relaxed">
          {t.intelligenceCore.transparencyNote}
        </p>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#B4B4CC]">
          {t.intelligenceCore.filterPrompt}
        </p>
        <div className="flex flex-wrap gap-2" role="group" aria-label={t.intelligenceCore.filterAriaLabel}>
          {CORE_STAGE_FILTERS.map((item) => {
            const active = stageKey === item.key;
            return (
              <button
                key={item.key}
                type="button"
                aria-pressed={active}
                onClick={() => setStageKey(item.key)}
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

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {modules.map((mod) => (
          <article key={mod.id} className="i3-card i3-card-labs flex flex-col justify-between rounded-2xl p-6">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#00E5FF]">
                  {mod.code}
                </span>
                <DomainBadge label={mod.stage} tone="labs" />
              </div>

              <h2 className="mt-3 text-2xl font-bold text-[#F5F5FA]">{mod.name}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#B4B4CC]">{mod.documentedState}</p>

              <div className="mt-5 grid gap-3 rounded-xl border border-white/10 bg-[#08090D]/80 p-4 text-xs">
                <div>
                  <span className="font-mono uppercase tracking-wider text-[#67E8F9]">{t.intelligenceCore.inputLabel}</span>
                  <span className="text-[#B4B4CC]">{mod.inputs}</span>
                </div>
                <div>
                  <span className="font-mono uppercase tracking-wider text-[#67E8F9]">{t.intelligenceCore.outputLabel}</span>
                  <span className="text-[#B4B4CC]">{mod.outputs}</span>
                </div>
              </div>

              <ul className="mt-5 space-y-2 text-xs leading-relaxed text-[#B4B4CC]">
                {mod.plannedCapabilities.map((cap) => (
                  <li key={cap} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00E5FF]" aria-hidden="true" />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 space-y-3 border-t border-white/10 pt-4 text-xs text-[#B4B4CC]">
              <div className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#00E5FF]" aria-hidden="true" />
                <span>{mod.disclaimer}</span>
              </div>
              {mod.routeTo && mod.routeLabel ? (
                <div>
                  <Link
                    to={mod.routeTo}
                    className="inline-flex items-center gap-1.5 font-semibold text-[#00E5FF] hover:underline"
                  >
                    <span>{mod.routeLabel}</span>
                  </Link>
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
