import { BrandText } from '../components/ui/BrandText';
import { useState } from 'react';
import { Server } from 'lucide-react';
import { DomainBadge } from '../components/ui/DomainBadge';
import { SectionHeader } from '../components/ui/SectionHeader';
import {
  TECH_LAYER_KEYS,
  filterTechnologyStack,
  getTechnologyStack,
  type TechLayerKey,
} from '../data/technology';
import { useLanguage } from '../i18n/LanguageContext';

export function TechnologyPage() {
  const { locale, t } = useLanguage();
  const [selectedLayerKey, setSelectedLayerKey] = useState<TechLayerKey>('all');
  const stack = getTechnologyStack(locale);
  const activeLayer =
    TECH_LAYER_KEYS.find((item) => item.key === selectedLayerKey) ?? TECH_LAYER_KEYS[0];
  const visibleItems = filterTechnologyStack(stack, activeLayer[locale]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeader
        as="h1"
        eyebrow={t.technology.eyebrow}
        title={t.technology.title}
        description={t.technology.description}
        accent="labs"
      />

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#B4B4CC]">
          {t.technology.filterPrompt}
        </p>
        <div className="flex flex-wrap gap-2" role="group" aria-label={t.technology.filterAriaLabel}>
          {TECH_LAYER_KEYS.map((item) => {
            const active = selectedLayerKey === item.key;
            return (
              <button
                key={item.key}
                type="button"
                aria-pressed={active}
                onClick={() => setSelectedLayerKey(item.key)}
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
        {visibleItems.map((item) => (
          <article key={item.id} className="i3-card i3-card-labs rounded-2xl p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <DomainBadge label={item.layer} tone="labs" />
              <DomainBadge
                label={item.stage}
                tone={item.stage === 'Evaluation / Plan-Only' ? 'studio' : 'universe'}
              />
            </div>

            <h2 className="mt-4 text-2xl font-bold text-[#F5F5FA]">{item.name}</h2>
            <p className="mt-1 font-mono text-xs text-[#67E8F9]"><BrandText>{item.ecosystemUsage}</BrandText></p>
            <p className="mt-3 text-sm leading-relaxed text-[#B4B4CC]">{item.description}</p>

            <ul className="mt-4 space-y-2 border-t border-white/10 pt-4 text-xs leading-relaxed text-[#B4B4CC]">
              {item.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00E5FF]" aria-hidden="true" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <section
        aria-labelledby="caddy-delivery-heading"
        className="i3-card mt-12 rounded-2xl p-6 sm:p-8"
      >
        <div className="flex flex-wrap items-center gap-3">
          <Server className="h-5 w-5 text-[#8B5CF6]" aria-hidden="true" />
          <h2 id="caddy-delivery-heading" className="text-xl font-bold text-[#F5F5FA]">
            {t.technology.caddyHeading}
          </h2>
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#B4B4CC]">
          {t.technology.caddyBodyBefore}
          <code className="font-mono ithreelab-text">iThreeLab</code>
          {t.technology.caddyBodyMiddle}
          <code className="font-mono text-[#F5F5FA]">dist/</code>
          {t.technology.caddyBodyAfter}
        </p>
      </section>
    </div>
  );
}
