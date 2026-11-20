import { AlertCircle, ArrowLeft, Layers } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';

export function NotFoundPage() {
  const location = useLocation();
  const { t } = useLanguage();

  return (
    <section
      role="status"
      aria-labelledby="not-found-heading"
      className="mx-auto max-w-3xl px-4 py-20 sm:px-6"
    >
      <div className="i3-card rounded-2xl border-[#8B5CF6]/35 p-8 sm:p-10">
        <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.2em] text-[#C4B5FD]">
          <AlertCircle className="h-4 w-4 text-[#8B5CF6]" aria-hidden="true" />
          <span>{t.notFound.eyebrow}</span>
        </div>

        <h1 id="not-found-heading" className="mt-4 text-3xl font-bold text-[#F5F5FA] sm:text-4xl">
          {t.notFound.title}
        </h1>

        <p className="mt-4 text-sm leading-relaxed text-[#B4B4CC]">
          {t.notFound.descriptionBefore}
          <code className="font-mono text-[#F5F5FA]">{location.pathname}</code>
          {t.notFound.descriptionMiddle}
          <span className="ithreelab-text">iThreeLab</span>
          {t.notFound.descriptionAfter}
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl border border-[#8B5CF6]/65 bg-[#8B5CF6]/20 px-4 py-2.5 text-sm font-semibold text-[#F5F5FA] hover:border-[#8B5CF6]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>
              {t.notFound.backToPrefix}
              <span className="ithreelab-text">iThreeLab</span>
              {t.notFound.backToSuffix}
            </span>
          </Link>
          <Link
            to="/ecosystem"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-[#08090D] px-4 py-2.5 text-sm font-medium text-[#B4B4CC] hover:border-[#00E5FF]/50 hover:text-[#F5F5FA]"
          >
            <Layers className="h-4 w-4 text-[#00E5FF]" aria-hidden="true" />
            <span>{t.notFound.ecosystem}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
