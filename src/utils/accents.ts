import type { DomainAccent } from '../data/universe';

export interface AccentStyleSet {
  text: string;
  border: string;
  cardHover: string;
  button: string;
  dot: string;
}

export const ACCENT_STYLES: Record<DomainAccent, AccentStyleSet> = {
  i3lackout: {
    text: 'text-[#FF2020]',
    border: 'border-[#FF2020]/45',
    cardHover: 'i3-card-i3lackout',
    button: 'border-[#FF2020]/60 bg-[#FF2020]/12 text-[#FF2020] hover:border-[#FF2020] hover:bg-[#FF2020]/20',
    dot: 'bg-[#FF2020]',
  },
  universe: {
    text: 'text-[#C4B5FD]',
    border: 'border-[#8B5CF6]/45',
    cardHover: 'hover:border-[#8B5CF6]/55',
    button:
      'border-[#8B5CF6]/60 bg-[#8B5CF6]/15 text-[#F5F5FA] hover:border-[#8B5CF6] hover:bg-[#8B5CF6]/25',
    dot: 'bg-[#8B5CF6]',
  },
  labs: {
    text: 'text-[#00E5FF]',
    border: 'border-[#00E5FF]/45',
    cardHover: 'i3-card-labs',
    button:
      'border-[#00E5FF]/60 bg-[#00E5FF]/12 text-[#F5F5FA] hover:border-[#00E5FF] hover:bg-[#00E5FF]/22',
    dot: 'bg-[#00E5FF]',
  },
  studio: {
    text: 'text-[#F59E0B]',
    border: 'border-[#F59E0B]/45',
    cardHover: 'i3-card-studio',
    button:
      'border-[#F59E0B]/60 bg-[#F59E0B]/15 text-[#F5F5FA] hover:border-[#F59E0B] hover:bg-[#F59E0B]/25',
    dot: 'bg-[#F59E0B]',
  },
};
