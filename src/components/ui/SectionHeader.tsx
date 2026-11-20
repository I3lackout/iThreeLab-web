import { BrandText } from './BrandText';
import type { DomainAccent } from '../../data/universe';

const EYEBROW_COLORS: Record<DomainAccent, string> = {
  i3lackout: 'text-[#FF2020]',
  universe: 'text-[#C4B5FD]',
  labs: 'text-[#00E5FF]',
  studio: 'text-[#F59E0B]',
};

export interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  accent?: DomainAccent;
  as?: 'h1' | 'h2';
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  accent = 'universe',
  as = 'h2',
}: SectionHeaderProps) {
  const HeadingTag = as;

  return (
    <div className="max-w-3xl">
      <p className={`font-mono text-xs uppercase tracking-[0.22em] ${EYEBROW_COLORS[accent]}`}>
        <BrandText>{eyebrow}</BrandText>
      </p>
      <HeadingTag className="mt-3 text-3xl font-bold tracking-tight text-[#F5F5FA] sm:text-4xl">
        <BrandText>{title}</BrandText>
      </HeadingTag>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-[#B4B4CC] sm:text-lg"><BrandText>{description}</BrandText></p>
      ) : null}
    </div>
  );
}
