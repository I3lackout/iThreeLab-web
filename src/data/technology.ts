import type { Locale } from '../i18n/translations';

export type TechLayer =
  | 'Alle'
  | 'All'
  | 'Backend & Daten'
  | 'Backend & Data'
  | 'Frontend & Realtime'
  | 'Cloud & Qualität'
  | 'Cloud & Quality';

export type TechLayerKey = 'all' | 'backend' | 'frontend' | 'cloud';

export interface TechnologyItem {
  id: string;
  name: string;
  layer: Exclude<TechLayer, 'Alle' | 'All'>;
  stage: 'Praxis' | 'In Practice' | 'Evaluation / Plan-Only' | 'Qualitätssicherung' | 'Quality Assurance';
  ecosystemUsage: string;
  description: string;
  highlights: string[];
}

export const TECH_LAYERS: TechLayer[] = [
  'Alle',
  'Backend & Daten',
  'Frontend & Realtime',
  'Cloud & Qualität',
];

export const TECHNOLOGY_STACK: TechnologyItem[] = [
  {
    id: 'python-flask',
    name: 'Python / Flask',
    layer: 'Backend & Daten',
    stage: 'Praxis',
    ecosystemUsage: 'musicchaini3 & iThree Labs',
    description:
      'Modulare serverseitige Anwendungslogik, Blueprint-Strukturen, Geschäftsprozesse und automatisierte Skript-Workflows.',
    highlights: [
      'Saubere Trennung in Routen, Domain-Module und Helper',
      'Grundlage für Backend-Prozesse und lokale Labor-Services',
    ],
  },
  {
    id: 'react-typescript',
    name: 'React / TypeScript',
    layer: 'Frontend & Realtime',
    stage: 'Praxis',
    ecosystemUsage: 'iThreeLab, i3lackout-web & Mobile-Umfeld',
    description:
      'Strikt typisierte, komponentenbasierte Benutzeroberflächen mit Vite, React Router und wiederverwendbaren UI-Bausteinen.',
    highlights: [
      'TypeScript Strict Mode ohne Laufzeit-Abhängigkeit zu Backend-Templates',
      'Barrierearme Navigation und prefers-reduced-motion-Unterstützung',
    ],
  },
  {
    id: 'mariadb-sqlalchemy',
    name: 'MariaDB / SQLAlchemy',
    layer: 'Backend & Daten',
    stage: 'Praxis',
    ecosystemUsage: 'musicchaini3',
    description:
      'Relationale Datenmodellierung, transaktionale Integrität und strukturierte Schema-Verwaltung für Plattform-Daten.',
    highlights: [
      'Klare Trennung von Tabellenmodellen, Abfragen und Validierungen',
      'Keine direkten Datenbankzugriffe aus rein statischen Web-Frontends',
    ],
  },
  {
    id: 'webrtc',
    name: 'WebRTC',
    layer: 'Frontend & Realtime',
    stage: 'Praxis',
    ecosystemUsage: 'musicchaini3 Live-Workflows',
    description:
      'Echtzeit-Audio- und Streaming-Mechanismen im Browser für interaktive Live-Sessions und direkte Creator-Kommunikation.',
    highlights: [
      'Geringe Latenz bei Live-Übertragungen im Plattform-Kontext',
      'Ergänzt klassische HTTP-Endpunkte um direkte Peer-/Session-Verbindungen',
    ],
  },
  {
    id: 'google-cloud',
    name: 'Google Cloud',
    layer: 'Cloud & Qualität',
    stage: 'Evaluation / Plan-Only',
    ecosystemUsage: 'iThree Labs & Staging-Planung',
    description:
      'Konzeptionelle Cloud-Workflows mit Plan-Only-Absicherung, klaren IAM-Grenzen und bewusster Kostenkontrolle.',
    highlights: [
      'Keine ungeprüfte oder automatische Bereitstellung kostenpflichtiger Ressourcen',
      'Fokus auf saubere Staging-Trennung und reproduzierbare Konfigurationen',
    ],
  },
  {
    id: 'rest-apis',
    name: 'REST APIs',
    layer: 'Backend & Daten',
    stage: 'Praxis',
    ecosystemUsage: 'Ökosystem-Schnittstellen',
    description:
      'Klar definierte HTTP-Schnittstellen mit strikter Input-/URL-Validierung und sauberer Trennung öffentlicher und geschützter Routen.',
    highlights: [
      'Statische Portale wie iThreeLab bleiben unabhängig von privaten Endpunkten',
      'Fokus auf nachvollziehbare Verträge und sichere Fehlerbehandlung',
    ],
  },
  {
    id: 'testing-ci',
    name: 'Testing & CI',
    layer: 'Cloud & Qualität',
    stage: 'Qualitätssicherung',
    ecosystemUsage: 'Gesamtes Ökosystem',
    description:
      'Automatisierte Prüfketten mit Vitest, React Testing Library, TypeScript-Checks, ESLint sowie Backend-Test-Suites.',
    highlights: [
      'Verifikation von Routing, UI-Zuständen, URL-Sicherheit und Fehlerfällen',
      'Statische Caddy-Auslieferung der gebauten Vite-Artefakte ohne Node.js-Prozess',
    ],
  },
];

export function filterTechnologyStack(
  items: TechnologyItem[],
  layer: TechLayer,
): TechnologyItem[] {
  if (layer === 'Alle' || layer === 'All') {
    return items;
  }
  return items.filter((item) => item.layer === layer);
}

const TECH_LAYERS_EN: TechLayer[] = [
  'All',
  'Backend & Data',
  'Frontend & Realtime',
  'Cloud & Quality',
];

const TECHNOLOGY_STACK_EN: TechnologyItem[] = [
  {
    id: 'python-flask',
    name: 'Python / Flask',
    layer: 'Backend & Data',
    stage: 'In Practice',
    ecosystemUsage: 'musicchaini3 & iThree Labs',
    description:
      'Modular server-side application logic, blueprint structures, business workflows, and automated script pipelines.',
    highlights: [
      'Clean separation into routes, domain modules, and helpers',
      'Foundation for backend processes and local lab services',
    ],
  },
  {
    id: 'react-typescript',
    name: 'React / TypeScript',
    layer: 'Frontend & Realtime',
    stage: 'In Practice',
    ecosystemUsage: 'iThreeLab, i3lackout-web & Mobile Context',
    description:
      'Strictly typed, component-based user interfaces with Vite, React Router, and reusable UI building blocks.',
    highlights: [
      'TypeScript Strict Mode without runtime dependency on backend templates',
      'Accessible navigation and prefers-reduced-motion support',
    ],
  },
  {
    id: 'mariadb-sqlalchemy',
    name: 'MariaDB / SQLAlchemy',
    layer: 'Backend & Data',
    stage: 'In Practice',
    ecosystemUsage: 'musicchaini3',
    description:
      'Relational data modeling, transactional integrity, and structured schema management for platform data.',
    highlights: [
      'Clear separation of table models, queries, and validations',
      'No direct database access from purely static web frontends',
    ],
  },
  {
    id: 'webrtc',
    name: 'WebRTC',
    layer: 'Frontend & Realtime',
    stage: 'In Practice',
    ecosystemUsage: 'musicchaini3 Live Workflows',
    description:
      'Real-time audio and streaming mechanisms in the browser for interactive live sessions and direct creator communication.',
    highlights: [
      'Low latency for live broadcasts in the platform context',
      'Complements classic HTTP endpoints with direct peer/session connections',
    ],
  },
  {
    id: 'google-cloud',
    name: 'Google Cloud',
    layer: 'Cloud & Quality',
    stage: 'Evaluation / Plan-Only',
    ecosystemUsage: 'iThree Labs & Staging Planning',
    description:
      'Conceptual cloud workflows with plan-only safeguards, clear IAM boundaries, and deliberate cost control.',
    highlights: [
      'No unreviewed or automatic provisioning of billable resources',
      'Focus on clean staging separation and reproducible configurations',
    ],
  },
  {
    id: 'rest-apis',
    name: 'REST APIs',
    layer: 'Backend & Data',
    stage: 'In Practice',
    ecosystemUsage: 'Ecosystem Interfaces',
    description:
      'Clearly defined HTTP interfaces with strict input/URL validation and clean separation of public and protected routes.',
    highlights: [
      'Static portals like iThreeLab remain independent of private endpoints',
      'Focus on transparent contracts and safe error handling',
    ],
  },
  {
    id: 'testing-ci',
    name: 'Testing & CI',
    layer: 'Cloud & Quality',
    stage: 'Quality Assurance',
    ecosystemUsage: 'Entire Ecosystem',
    description:
      'Automated verification chains with Vitest, React Testing Library, TypeScript checks, ESLint, and backend test suites.',
    highlights: [
      'Verification of routing, UI states, URL safety, and error cases',
      'Static Caddy delivery of built Vite artifacts without a Node.js process',
    ],
  },
];

export const TECH_LAYER_KEYS: Array<{ key: TechLayerKey; de: TechLayer; en: TechLayer }> = [
  { key: 'all', de: 'Alle', en: 'All' },
  { key: 'backend', de: 'Backend & Daten', en: 'Backend & Data' },
  { key: 'frontend', de: 'Frontend & Realtime', en: 'Frontend & Realtime' },
  { key: 'cloud', de: 'Cloud & Qualität', en: 'Cloud & Quality' },
];

export function getTechLayers(locale: Locale): TechLayer[] {
  return locale === 'en' ? TECH_LAYERS_EN : TECH_LAYERS;
}

export function getTechnologyStack(locale: Locale): TechnologyItem[] {
  return locale === 'en' ? TECHNOLOGY_STACK_EN : TECHNOLOGY_STACK;
}
