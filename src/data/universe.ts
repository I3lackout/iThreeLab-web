import type { Locale } from '../i18n/translations';

export type DomainAccent = 'universe' | 'labs' | 'studio' | 'i3lackout';

export type WorldStatus =
  | 'Aktiv'
  | 'Active'
  | 'Aktive Entwicklung'
  | 'Active Development'
  | 'Forschung & Prototypen'
  | 'Research & Prototypes'
  | 'Foundation V1';

export interface UniverseWorld {
  id: 'i3lackout' | 'musicchaini3' | 'ithree-labs';
  name: string;
  tagline: string;
  accent: DomainAccent;
  status: WorldStatus;
  domainLabel: string;
  summary: string;
  responsibilities: string[];
  internalRoute: string;
  internalLabel: string;
  externalUrl: string | null;
  externalLabel: string | null;
  secondaryExternalUrl?: string | null;
  secondaryExternalLabel?: string | null;
}

export interface VisionPillar {
  id: string;
  eyebrow: string;
  title: string;
  accent: DomainAccent;
  description: string;
}

export interface EcosystemProjectCard {
  id: string;
  name: string;
  brand: string;
  accent: DomainAccent;
  stage: string;
  stageNote: string;
  summary: string;
  deliverables: string[];
  internalRoute: string | null;
  internalLabel: string | null;
  externalUrl: string | null;
  externalLabel: string | null;
}

export const DEVELOPER_UNIVERSE_URL = 'https://i3lackout.com/developer';

export const UNIVERSE_WORLDS: UniverseWorld[] = [
  {
    id: 'i3lackout',
    name: 'I3LACKOUT',
    tagline: 'Artist · Creator · Developer Universe',
    accent: 'i3lackout',
    status: 'Aktiv',
    domainLabel: 'i3lackout.com',
    summary:
      'Künstlerische Identität, elektronische Musikproduktion, Live-Sessions und das eigenständige Developer Universe als kreativer Ursprung des Ökosystems.',
    responsibilities: [
      'Künstlerische Handschrift, Sound Design & Releases',
      'Live-Sets, Performance-Identität & Community-Anbindung',
      'Developer Universe als technische Schnittstelle zwischen Musik und Code',
    ],
    internalRoute: '/about',
    internalLabel: 'Developer Bridge',
    externalUrl: 'https://i3lackout.com',
    externalLabel: 'i3lackout.com öffnen',
    secondaryExternalUrl: DEVELOPER_UNIVERSE_URL,
    secondaryExternalLabel: 'Developer Universe',
  },
  {
    id: 'musicchaini3',
    name: 'musicchaini3',
    tagline: 'Music & Creator Platform Architecture',
    accent: 'studio',
    status: 'Aktive Entwicklung',
    domainLabel: 'musicchaini3.com',
    summary:
      'Eigenständig entwickelte Musik- und Creator-Plattform für Releases, Interaktionen, Live-Sessions, Creator-Workflows und plattformübergreifende Nutzung.',
    responsibilities: [
      'Serverseitige Plattform-Logik, Creator-Profile & Track-Streaming',
      'Interaktions- und Beteiligungsmodelle innerhalb der Plattform',
      'Mobile-App-Begleitung und Echtzeit-Session-Infrastruktur',
    ],
    internalRoute: '/ecosystem',
    internalLabel: 'Plattform-Rolle ansehen',
    externalUrl: 'https://musicchaini3.com',
    externalLabel: 'musicchaini3.com besuchen',
  },
  {
    id: 'ithree-labs',
    name: 'iThree Labs',
    tagline: 'Research · Intelligence Core · Engineering',
    accent: 'labs',
    status: 'Forschung & Prototypen',
    domainLabel: 'iThreeLab.com',
    summary:
      'Forschungs- und Entwicklungslabor für intelligente Audio-Systeme, ökonomische Szenario-Simulationen, Cloud-Architektur und den modularen I3 Intelligence Core.',
    responsibilities: [
      'Architektur und Forschung rund um den I3 Intelligence Core',
      'Lokale Simulations- und Analyseprototypen (Economics Intelligence)',
      'Cloud-Staging-Konzepte, KI-Audio-Experimente und technische Evaluation',
    ],
    internalRoute: '/labs',
    internalLabel: 'iThree Labs erkunden',
    externalUrl: null,
    externalLabel: null,
  },
];

export const VISION_PILLARS: VisionPillar[] = [
  {
    id: 'music',
    eyebrow: '01 // MUSIC',
    title: 'Kreativer Ausgangspunkt',
    accent: 'universe',
    description:
      'Musik ist kein Beiwerk, sondern der Ursprung aller Systementscheidungen — von Track-Präsentation über Live-Kultur bis zur Creator-Perspektive.',
  },
  {
    id: 'technology',
    eyebrow: '02 // TECHNOLOGY',
    title: 'Eigenständige Infrastruktur',
    accent: 'labs',
    description:
      'Statt isolierter Einzellösungen verbindet iThreeLab getrennte Web-Frontends, Plattform-Backends und statische Auslieferung in einer klaren Architektur.',
  },
  {
    id: 'intelligence',
    eyebrow: '03 // INTELLIGENCE',
    title: 'Modular & Realistisch',
    accent: 'studio',
    description:
      'KI- und Analyse-Werkzeuge entstehen Schritt für Schritt aus realen Creator-Bedürfnissen — mit sauberer Trennung zwischen aktiver Praxis, Experiment und Planung.',
  },
];

export const ECOSYSTEM_PROJECTS: EcosystemProjectCard[] = [
  {
    id: 'proj-ithreelab',
    name: 'iThreeLab.com (iThreeLab)',
    brand: 'iThreeLab',
    accent: 'universe',
    stage: 'Foundation V1',
    stageNote:
      'Eigenständige Dachmarken-Webanwendung für iThreeLab, Ecosystem, Labs & Studio (Ziel-Domain: iThreeLab.com)',
    summary:
      'Zentrales Einstiegsportal im I3-Hybrid-Designsystem, das Markenwelten, Forschungsbereiche und Produkt-Foundations unter einem Dach ordnet.',
    deliverables: [
      'React 19, TypeScript & Vite ohne Laufzeitabhängigkeit zu anderen Repos',
      'Statische Auslieferung über Caddy ohne laufende Node.js-Prozesse',
      'Klare Farbcodierung für iThreeLab (#8B5CF6), Labs (#00E5FF) und Studio (#F59E0B)',
    ],
    internalRoute: '/technology',
    internalLabel: 'Architektur ansehen',
    externalUrl: null,
    externalLabel: null,
  },
  {
    id: 'proj-i3lackout-web',
    name: 'i3lackout-web',
    brand: 'I3LACKOUT',
    accent: 'i3lackout',
    stage: 'Aktive Entwicklung',
    stageNote: 'Eigenständiges Artist- & Developer-Frontend für i3lackout.com',
    summary:
      'Offizielle Web-Präsenz für Musik-Releases, Live-Präsenz, Press Kit sowie Developer-Profil, Projektgalerie und Tech Stack.',
    deliverables: [
      'Dual-Mode zwischen Music Universe und Developer Universe',
      'Resilienter Fallback-Client ohne harte API-Laufzeitabhängigkeit',
      'Validierte externe Links und vorbereitete Rechtsseiten',
    ],
    internalRoute: '/about',
    internalLabel: 'Verbindung zu iThreeLab',
    externalUrl: 'https://i3lackout.com',
    externalLabel: 'i3lackout.com',
  },
  {
    id: 'proj-musicchaini3',
    name: 'musicchaini3',
    brand: 'musicchaini3',
    accent: 'studio',
    stage: 'Aktive Entwicklung',
    stageNote: 'Unabhängig betriebene Musik- & Creator-Plattform',
    summary:
      'Backend- und Web-Plattform für Musik-Streaming, Creator-Interaktionen, Live-Sessions und begleitende Mobile-Builds.',
    deliverables: [
      'Python / Flask Web-Architektur mit MariaDB & SQLAlchemy',
      'REST-Schnittstellen, WebRTC-Ansätze und automatisierte Testabdeckung',
      'Plan-Only Cloud-Konzepte und mobile App-Integration',
    ],
    internalRoute: '/technology',
    internalLabel: 'Technik-Stack',
    externalUrl: 'https://musicchaini3.com',
    externalLabel: 'musicchaini3.com',
  },
  {
    id: 'proj-intelligence-labs',
    name: 'iThree Labs & Studio Foundation',
    brand: 'iThree Labs / Studio',
    accent: 'labs',
    stage: 'MusicChain-MVP & Synthetic Lab',
    stageNote: 'Audio, Motion und Canvas in MusicChain; Economics öffentlich synthetisch',
    summary:
      'I3 Intelligence Core mit MusicChain-MVPs für Audio, Motion und Canvas, öffentlichem Economics Synthetic Lab und fail-closed integriertem Guardian.',
    deliverables: [
      'Audio-, Rendering- und Design-MVP in MusicChain, mit gekennzeichnetem Ausbau',
      'Öffentliches Synthetic Lab für Ressourcen, Preise und Forecasting',
      'I3 Guardian fail-closed über Account, Upload, Studio, Interaktionen, Rewards, Live und Trading integriert',
    ],
    internalRoute: '/labs/intelligence',
    internalLabel: 'Intelligence Core',
    externalUrl: null,
    externalLabel: null,
  },
];

const UNIVERSE_WORLDS_EN: UniverseWorld[] = [
  {
    id: 'i3lackout',
    name: 'I3LACKOUT',
    tagline: 'Artist · Creator · Developer Universe',
    accent: 'i3lackout',
    status: 'Active',
    domainLabel: 'i3lackout.com',
    summary:
      'Artistic identity, electronic music production, live sessions, and the standalone Developer Universe as the creative origin of the ecosystem.',
    responsibilities: [
      'Artistic signature, sound design & releases',
      'Live sets, performance identity & community connection',
      'Developer Universe as the technical bridge between music and code',
    ],
    internalRoute: '/about',
    internalLabel: 'Developer Bridge',
    externalUrl: 'https://i3lackout.com',
    externalLabel: 'Open i3lackout.com',
    secondaryExternalUrl: DEVELOPER_UNIVERSE_URL,
    secondaryExternalLabel: 'Developer Universe',
  },
  {
    id: 'musicchaini3',
    name: 'musicchaini3',
    tagline: 'Music & Creator Platform Architecture',
    accent: 'studio',
    status: 'Active Development',
    domainLabel: 'musicchaini3.com',
    summary:
      'Independently engineered music and creator platform for releases, interactions, live sessions, creator workflows, and cross-platform usage.',
    responsibilities: [
      'Server-side platform logic, creator profiles & track streaming',
      'Interaction and participation models within the platform',
      'Mobile app companion and real-time session infrastructure',
    ],
    internalRoute: '/ecosystem',
    internalLabel: 'View platform role',
    externalUrl: 'https://musicchaini3.com',
    externalLabel: 'Visit musicchaini3.com',
  },
  {
    id: 'ithree-labs',
    name: 'iThree Labs',
    tagline: 'Research · Intelligence Core · Engineering',
    accent: 'labs',
    status: 'Research & Prototypes',
    domainLabel: 'iThreeLab.com',
    summary:
      'Research and engineering lab for intelligent audio systems, economic scenario simulations, cloud architecture, and the modular I3 Intelligence Core.',
    responsibilities: [
      'Architecture and research around the I3 Intelligence Core',
      'Local simulation and analysis prototypes (Economics Intelligence)',
      'Cloud staging concepts, AI audio experiments, and technical evaluation',
    ],
    internalRoute: '/labs',
    internalLabel: 'Explore iThree Labs',
    externalUrl: null,
    externalLabel: null,
  },
];

const VISION_PILLARS_EN: VisionPillar[] = [
  {
    id: 'music',
    eyebrow: '01 // MUSIC',
    title: 'Creative Starting Point',
    accent: 'universe',
    description:
      'Music is not an afterthought, but the origin of all system decisions — from track presentation and live culture to the creator perspective.',
  },
  {
    id: 'technology',
    eyebrow: '02 // TECHNOLOGY',
    title: 'Independent Infrastructure',
    accent: 'labs',
    description:
      'Instead of isolated one-off solutions, iThreeLab connects separate web frontends, platform backends, and static delivery into one clear architecture.',
  },
  {
    id: 'intelligence',
    eyebrow: '03 // INTELLIGENCE',
    title: 'Modular & Realistic',
    accent: 'studio',
    description:
      'AI and analytics tools emerge step by step from real creator needs — with a clean separation between active practice, experiment, and planning.',
  },
];

const ECOSYSTEM_PROJECTS_EN: EcosystemProjectCard[] = [
  {
    id: 'proj-ithreelab',
    name: 'iThreeLab.com (iThreeLab)',
    brand: 'iThreeLab',
    accent: 'universe',
    stage: 'Foundation V1',
    stageNote:
      'Standalone umbrella web application for iThreeLab, Ecosystem, Labs & Studio (target domain: iThreeLab.com)',
    summary:
      'Central entry portal in the I3 hybrid design system, organizing brand worlds, research areas, and product foundations under one roof.',
    deliverables: [
      'React 19, TypeScript & Vite with zero runtime dependency on other repos',
      'Static delivery via Caddy without running Node.js processes',
      'Clear color coding for iThreeLab (#8B5CF6), Labs (#00E5FF), and Studio (#F59E0B)',
    ],
    internalRoute: '/technology',
    internalLabel: 'View architecture',
    externalUrl: null,
    externalLabel: null,
  },
  {
    id: 'proj-i3lackout-web',
    name: 'i3lackout-web',
    brand: 'I3LACKOUT',
    accent: 'i3lackout',
    stage: 'Active Development',
    stageNote: 'Standalone artist & developer frontend for i3lackout.com',
    summary:
      'Official web presence for music releases, live presence, press kit, as well as developer profile, project gallery, and tech stack.',
    deliverables: [
      'Dual-mode between Music Universe and Developer Universe',
      'Resilient fallback client without hard API runtime dependency',
      'Validated external links and prepared legal pages',
    ],
    internalRoute: '/about',
    internalLabel: 'Connection to iThreeLab',
    externalUrl: 'https://i3lackout.com',
    externalLabel: 'i3lackout.com',
  },
  {
    id: 'proj-musicchaini3',
    name: 'musicchaini3',
    brand: 'musicchaini3',
    accent: 'studio',
    stage: 'Active Development',
    stageNote: 'Independently operated music & creator platform',
    summary:
      'Backend and web platform for music streaming, creator interactions, live sessions, and companion mobile builds.',
    deliverables: [
      'Python / Flask web architecture with MariaDB & SQLAlchemy',
      'REST interfaces, WebRTC workflows, and automated test coverage',
      'Plan-only cloud concepts and mobile app integration',
    ],
    internalRoute: '/technology',
    internalLabel: 'Tech Stack',
    externalUrl: 'https://musicchaini3.com',
    externalLabel: 'musicchaini3.com',
  },
  {
    id: 'proj-intelligence-labs',
    name: 'iThree Labs & Studio Foundation',
    brand: 'iThree Labs / Studio',
    accent: 'labs',
    stage: 'MusicChain MVP & Synthetic Lab',
    stageNote: 'Audio, Motion, and Canvas in MusicChain; Economics publicly synthetic',
    summary:
      'I3 Intelligence Core with MusicChain MVPs for Audio, Motion, and Canvas, public Economics Synthetic Lab, and fail-closed integrated Guardian.',
    deliverables: [
      'Audio, rendering, and design MVPs in MusicChain, with clearly labeled roadmap items',
      'Public Synthetic Lab for resources, pricing, and forecasting',
      'I3 Guardian integrated fail-closed across account, upload, studio, interactions, rewards, live, and trading',
    ],
    internalRoute: '/labs/intelligence',
    internalLabel: 'Intelligence Core',
    externalUrl: null,
    externalLabel: null,
  },
];

export function getUniverseWorlds(locale: Locale): UniverseWorld[] {
  return locale === 'en' ? UNIVERSE_WORLDS_EN : UNIVERSE_WORLDS;
}

export function getVisionPillars(locale: Locale): VisionPillar[] {
  return locale === 'en' ? VISION_PILLARS_EN : VISION_PILLARS;
}

export function getEcosystemProjects(locale: Locale): EcosystemProjectCard[] {
  return locale === 'en' ? ECOSYSTEM_PROJECTS_EN : ECOSYSTEM_PROJECTS;
}
