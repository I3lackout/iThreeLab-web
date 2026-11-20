import { BrandText } from '../components/ui/BrandText';
import { ArrowRight, Code2, Cpu, Music2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DomainBadge } from '../components/ui/DomainBadge';
import { SafeExternalLink } from '../components/ui/SafeExternalLink';
import { SectionHeader } from '../components/ui/SectionHeader';
import { DEVELOPER_UNIVERSE_URL } from '../data/universe';
import { useLanguage } from '../i18n/LanguageContext';

const CONNECTION_ICONS = {
  'conn-music': Music2,
  'conn-dev': Code2,
  'conn-intel': Cpu,
} as const;

export function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeader
        as="h1"
        eyebrow={t.about.eyebrow}
        title={t.about.title}
        description={t.about.description}
        accent="universe"
      />

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {t.about.connections.map((item) => {
          const Icon = CONNECTION_ICONS[item.id as keyof typeof CONNECTION_ICONS] ?? Cpu;
          return (
            <article key={item.id} className="i3-card rounded-2xl p-6">
              <DomainBadge label={item.title} tone={item.tone} />
              <div className="mt-5 flex items-center gap-3">
                <Icon className="h-5 w-5 text-[#F5F5FA]" aria-hidden="true" />
                <h2 className="text-xl font-bold text-[#F5F5FA]">{item.title}</h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#B4B4CC]"><BrandText>{item.text}</BrandText></p>
            </article>
          );
        })}
      </div>

      <section
        aria-labelledby="developer-universe-bridge"
        className="i3-card mt-12 rounded-2xl p-6 sm:p-8"
      >
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <DomainBadge label={t.about.bridge.badge} tone="i3lackout" />
            <h2
              id="developer-universe-bridge"
              className="mt-4 text-2xl font-bold text-[#F5F5FA] sm:text-3xl"
            >
              <BrandText>{t.about.bridge.title}</BrandText>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#B4B4CC]">
              {t.about.bridge.descriptionBefore}
              <span className="i3lackout-text">I3LACKOUT</span>
              {t.about.bridge.descriptionMiddle}
              <span className="font-mono i3lackout-text">i3lackout.com/developer</span>
              {t.about.bridge.descriptionAfter}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <SafeExternalLink
              url={DEVELOPER_UNIVERSE_URL}
              label={t.about.bridge.ctaDeveloper}
              className="rounded-xl border border-[#00E5FF]/60 bg-[#00E5FF]/12 px-5 py-3 text-sm font-semibold text-[#F5F5FA] hover:border-[#00E5FF] hover:bg-[#00E5FF]/22"
            />
            <Link
              to="/ecosystem"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-[#08090D] px-5 py-3 text-sm font-medium text-[#B4B4CC] hover:border-[#8B5CF6]/55 hover:text-[#F5F5FA]"
            >
              <span>{t.about.bridge.ctaEcosystem}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
