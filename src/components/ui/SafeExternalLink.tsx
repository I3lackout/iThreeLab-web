import { BrandText } from './BrandText';
import type { ReactNode } from 'react';
import { AlertTriangle, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { resolveSafeExternalLink } from '../../utils/links';

export interface SafeExternalLinkProps {
  url: string | null | undefined;
  label: string;
  className?: string;
  fallbackLabel?: string;
  children?: ReactNode;
  onClick?: () => void;
}

export function SafeExternalLink({
  url,
  label,
  className = '',
  fallbackLabel,
  children,
  onClick,
}: SafeExternalLinkProps) {
  const { t } = useLanguage();
  const resolvedFallback = fallbackLabel ?? t.safeExternalLink.defaultFallback;
  const { href, isValid } = resolveSafeExternalLink(url);

  if (!isValid || !href) {
    return (
      <span
        role="status"
        aria-label={`${label}: ${resolvedFallback}`}
        className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#151520] px-3 py-2 text-xs font-medium text-[#B4B4CC]"
      >
        <AlertTriangle className="h-3.5 w-3.5 text-[#F59E0B]" aria-hidden="true" />
        <span>{resolvedFallback}</span>
      </span>
    );
  }

  const isI3lackout = /^(www\.)?i3lackout\.com$/.test(new URL(href).hostname);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={`inline-flex items-center gap-2 ${className} ${isI3lackout ? `i3lackout-link ${className.includes('border ') ? 'i3lackout-button' : ''}` : ''}`}
    >
      {children ?? <span><BrandText>{label}</BrandText></span>}
      <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
    </a>
  );
}
