import { BrandText } from './BrandText';
import type { DomainAccent } from '../../data/universe';

export type BadgeTone = DomainAccent | 'neutral';

const TONE_CLASSES: Record<BadgeTone, string> = {
  i3lackout: 'border-[#FF2020]/45 bg-[#FF2020]/12 text-[#FF2020]',
  universe: 'border-[#8B5CF6]/45 bg-[#8B5CF6]/12 text-[#C4B5FD]',
  labs: 'border-[#00E5FF]/45 bg-[#00E5FF]/10 text-[#67E8F9]',
  studio: 'border-[#F59E0B]/45 bg-[#F59E0B]/12 text-[#FCD34D]',
  neutral: 'border-white/15 bg-white/5 text-[#B4B4CC]',
};

const DOT_CLASSES: Record<BadgeTone, string> = {
  i3lackout: 'bg-[#FF2020]',
  universe: 'bg-[#8B5CF6]',
  labs: 'bg-[#00E5FF]',
  studio: 'bg-[#F59E0B]',
  neutral: 'bg-[#B4B4CC]',
};

export interface DomainBadgeProps {
  label: string;
  tone?: BadgeTone;
  withDot?: boolean;
  className?: string;
}

export function DomainBadge({
  label,
  tone = 'neutral',
  withDot = true,
  className = '',
}: DomainBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.14em] ${TONE_CLASSES[tone]} ${className}`}
    >
      {withDot ? (
        <span className={`h-1.5 w-1.5 rounded-full ${DOT_CLASSES[tone]}`} aria-hidden="true" />
      ) : null}
      <span><BrandText>{label}</BrandText></span>
    </span>
  );
}
