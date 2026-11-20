import type { Locale } from '../i18n/translations';

export type ResearchStage =
  | 'Lokaler Prototyp'
  | 'Local Prototype'
  | 'Experimentell'
  | 'Experimental'
  | 'Evaluation / Plan-Only'
  | 'Geplant'
  | 'Planned'
  | 'Konzeptionell'
  | 'Conceptual'
  | 'MusicChain · Audio-MVP'
  | 'MusicChain · Rendering-MVP'
  | 'MusicChain · Design-MVP'
  | 'Teilweise integriert'
  | 'Partially Integrated'
  | 'Online · MusicChain'
  | 'Online · MusicChain & Lab'
  | 'Online · Synthetic Lab';

export interface LabsResearchArea {
  id: string;
  eyebrow: string;
  title: string;
  stage: ResearchStage;
  summary: string;
  focusPoints: string[];
  routeTo?: string;
  routeLabel?: string;
}

export interface ExperimentalProject {
  id: string;
  name: string;
  area: string;
  stage: ResearchStage;
  description: string;
  note: string;
}

export interface IntelligenceModule {
  id: 'i3-audio-dj' | 'i3-motion-clipping' | 'i3-canvas' | 'i3-guardian' | 'i3-economics';
  name: string;
  code: string;
  stage: ResearchStage;
  documentedState: string;
  plannedCapabilities: string[];
  inputs: string;
  outputs: string;
  disclaimer: string;
  routeTo?: string;
  routeLabel?: string;
}

export const LABS_RESEARCH_AREAS: LabsResearchArea[] = [
  {
    id: 'intelligence-core',
    eyebrow: '01 // CORE ARCHITECTURE',
    title: 'I3 Intelligence Core',
    stage: 'Online · MusicChain & Lab',
    summary:
      'Fünf Core-Module mit belegtem Betriebsstand: Audio, Motion, Canvas und Guardian laufen in MusicChain, Economics als öffentliches Synthetic Lab.',
    focusPoints: [
      'Audio, Motion und Canvas sind in MusicChain angebunden',
      'Cue-Punkte, beatgenauer Rohvideo-Schnitt und generative Bildmodelle bleiben Ausbau',
      'I3 Guardian ist fail-closed über Account, Upload, Studio, Interaktionen, Rewards, Live und Trading integriert',
    ],
    routeTo: '/labs/intelligence',
    routeLabel: 'Intelligence Core öffnen',
  },
  {
    id: 'economics-intelligence',
    eyebrow: '02 // SIMULATION & POLICY',
    title: 'Economics Intelligence',
    stage: 'Online · Synthetic Lab',
    summary:
      'Öffentliches Synthetic Lab für Ressourcen-Analyse, Preis-Simulation und Forecasting. Kein Schreibzugriff auf Mitgliederkonten oder produktive Ledger.',
    focusPoints: [
      'Öffentliche Simulation unter /labs/economics mit synthetischen Eingaben',
      'Same-Origin-API unter /api/economics-lab, Browser-Simulator als Fallback',
      'Scoring, Reconciliation und tokenbasiertes Preview bleiben im Labor',
    ],
    routeTo: '/labs/economics',
    routeLabel: 'Economics Lab öffnen',
  },
  {
    id: 'cloud-engineering',
    eyebrow: '03 // INFRASTRUCTURE',
    title: 'Cloud Engineering',
    stage: 'Evaluation / Plan-Only',
    summary:
      'Strukturierte Staging-Planung, IAM-Minimalprinzipien, Kostenlimits und statische Auslieferungsstrategien für künftige Erweiterungen.',
    focusPoints: [
      'Plan-Only Workflows vor jeder kostenpflichtigen Cloud-Ressource',
      'Saubere Trennung zwischen lokalem Build, Caddy-Static-Hosting und Backend-Services',
      'Vermeidung unnötiger Laufzeit-Komplexität im Produktivbetrieb',
    ],
  },
  {
    id: 'ai-audio-processing',
    eyebrow: '04 // SIGNAL & AUDIO',
    title: 'AI Audio Processing',
    stage: 'Experimentell',
    summary:
      'Forschung zu automatisierter Audio-Segmentierung, Tempo-/Struktur-Erkennung und vorbereitenden Signal-Pipelines für elektronische Musik.',
    focusPoints: [
      'Fokus auf DJ-freundliche Übergänge, Energieverläufe und Beat-Strukturen',
      'Evaluierung offline-fähiger und ressourcenkontrollierter Verarbeitungsschritte',
      'BPM-, Energie- und Mood-Analyse läuft in MusicChain; Struktur- und Cue-Erkennung sind im Ausbau',
    ],
  },
];

export const EXPERIMENTAL_PROJECTS: ExperimentalProject[] = [
  {
    id: 'exp-econ-rc',
    name: 'i3-economics-intelligence (Local RC)',
    area: 'Economics Intelligence',
    stage: 'Lokaler Prototyp',
    description:
      'Abgegrenzte lokale Testumgebung zur Modellierung synthetischer Ökonomie-, Preis- und Partizipationsszenarien.',
    note: 'Öffentlicher Synthetic-Simulator unter /labs/economics. Kein Schreibzugriff auf produktive Ledger.',
  },
  {
    id: 'exp-audio-markers',
    name: 'Beat- & Drop-Marker-Analyse',
    area: 'AI Audio Processing',
    stage: 'Experimentell',
    description:
      'Konzeptionelle Pipeline zur Erkennung struktureller Track-Abschnitte (Intro, Build-up, Drop, Outro) als Basis für Clipping-Vorschläge.',
    note: 'Experimentelle Forschung ohne produktive Inference-API.',
  },
  {
    id: 'exp-gcp-plan',
    name: 'Plan-Only Staging Blueprints',
    area: 'Cloud Engineering',
    stage: 'Evaluation / Plan-Only',
    description:
      'Dokumentierte Cloud-Konzepte mit strikten Kostenobergrenzen, getrennten Service-Konten und reproduzierbaren Checks.',
    note: 'Keine automatische Provisionierung aktiv.',
  },
  {
    id: 'exp-studio-bridge',
    name: 'Core-to-Studio Blueprint Contract',
    area: 'I3 Intelligence Core',
    stage: 'Geplant',
    description:
      'Geplante Schnittstellenbeschreibung zwischen den Intelligence-Modulen und den Creator-Oberflächen in iThree Studio.',
    note: 'Architekturentwurf in Ausarbeitung.',
  },
];

export const INTELLIGENCE_MODULES: IntelligenceModule[] = [
  {
    id: 'i3-audio-dj',
    name: 'I3 Audio & DJ',
    code: 'CORE-01 // AUDIO',
    stage: 'MusicChain · Audio-MVP',
    documentedState:
      'Online in MusicChain: BPM-, Energie- und Mood-Analyse sowie metadatenbasierte Set-Kuration. Cue-Erkennung und weitergehende DJ-Automatisierung werden ausgebaut.',
    plannedCapabilities: [
      'Online in MusicChain: BPM aus Onset-Analyse, RMS-Energie und heuristische Mood-Klassifikation',
      'Online in MusicChain: Set-Kuration nach Genre, Mood, BPM und Energie',
      'Im Ausbau: Cue-Punkte, Übergangszonen und ein vollständiges Beat-Grid',
    ],
    inputs: 'Audio-Datei im MusicChain-Studio (Analyseausschnitt)',
    outputs: 'BPM, Energie, Mood-Tag und Set-Sortierung (MusicChain-MVP)',
    disclaimer:
      'Die Analyse betrachtet standardmäßig einen Ausschnitt. Cue-Erkennung, Tonart und automatische DJ-Mischung sind noch nicht belegt.',
  },
  {
    id: 'i3-motion-clipping',
    name: 'I3 Motion & Clipping',
    code: 'CORE-02 // MOTION',
    stage: 'MusicChain · Rendering-MVP',
    documentedState:
      'Online in MusicChain: Highlight-Clips und vertikale Visualizer-Videos im Studio Vault. Beatgenaue Schnittplanung ist im Ausbau.',
    plannedCapabilities: [
      'Online in MusicChain: Highlight-Clips über das energiereichste Zeitfenster, mit Fades',
      'Online in MusicChain: Vertikale 9:16-Videos in Spectrum-, Wave- und Scope-Looks',
      'Im Ausbau: Beatgenaue Schnittgrenzen für hochgeladenes Rohvideo',
    ],
    inputs: 'Track-Audio und gewählter Visualizer-Look (MusicChain Studio)',
    outputs: 'Audio-Clips und vertikale H.264-Videos im Studio Vault',
    disclaimer:
      'RMS-Highlights sind noch keine musikalische Drop-Erkennung. Beatgenauer Schnitt beliebigen Rohvideos ist im Ausbau.',
  },
  {
    id: 'i3-canvas',
    name: 'I3 Canvas',
    code: 'CORE-03 // VISUALS',
    stage: 'MusicChain · Design-MVP',
    documentedState:
      'Online in MusicChain: deterministische Cover-, Brand- und Story-Grafiken mit Studio-Vault. Generative Bildfunktionen sind eine spätere Stufe.',
    plannedCapabilities: [
      'Online in MusicChain: Cover, Brand Plate und Story aus Titel, Artist, Mood, Genre, BPM und Energie',
      'Online in MusicChain: Vault-Ausgabe und Übernahme als Cover oder Hintergrund',
      'Später: Generatives Bildmodell als optionale Stufe',
    ],
    inputs: 'Release-Metadaten und Track-Analyse (MusicChain Studio)',
    outputs: 'Cover 1400×1400, Brand Plate 1600×900, Story 1080×1920',
    disclaimer:
      'Deterministische Template-Engine. Kein generatives Bildmodell angebunden.',
  },
  {
    id: 'i3-guardian',
    name: 'I3 Guardian',
    code: 'CORE-04 // SAFETY',
    stage: 'Online · MusicChain',
    documentedState:
      'I3 Guardian ist in MusicChain aktiv und fail-closed über Account, Upload, Studio, Interaktionen, Rewards, Live und Trading integriert.',
    plannedCapabilities: [
      'Online: zeitlich begrenzte, bereichsspezifische Sanktionen, Einsprüche und Audit-Einträge',
      'Online: fail-closed Enforcement über Account, Upload, Studio, Interaktionen, Rewards, Live, Trading und Escrow',
      'Weiterhin getrennt: regelbasierte Moderation bleibt von generativer KI-Sicherheit getrennt',
    ],
    inputs: 'Plattform-Regeln und Moderationsentscheidungen in MusicChain',
    outputs: 'Sanktionen, Einsprüche, Audit-Einträge und Fail-Closed-Guards (online)',
    disclaimer:
      'Regelbasierte Moderation ist keine allgemeine KI-Sicherheitsgarantie.',
  },
  {
    id: 'i3-economics',
    name: 'I3 Economics Intelligence',
    code: 'CORE-05 // ECONOMICS',
    stage: 'Online · Synthetic Lab',
    documentedState:
      'Online auf iThreeLab: öffentliches Synthetic Lab für Ressourcen-Analyse, Preis-Simulation und Forecasting. Erweiterte Analysen bleiben im Labor.',
    plannedCapabilities: [
      'Online: Ressourcen-Analyse für McCC, FUEL und GAS',
      'Online: begrenzte Preis-Simulation und deterministisches Forecasting',
      'Im Labor: Scoring, Reconciliation und tokenbasiertes Preview',
    ],
    inputs: 'Synthetische Ressourcen-Balances (McCC, FUEL, GAS), Raten und Zeitfenster',
    outputs: 'Read-only-Projektionen auf synthetischen Daten',
    disclaimer:
      'Strikt read-only. Keine Mitgliederkonten, Balances oder produktiven Ledger.',
    routeTo: '/labs/economics',
    routeLabel: 'Economics Lab Simulator öffnen',
  },
];

export function filterExperimentalProjects(
  projects: ExperimentalProject[],
  stage: 'Alle' | 'All' | ResearchStage,
): ExperimentalProject[] {
  if (stage === 'Alle' || stage === 'All') {
    return projects;
  }
  return projects.filter((project) => project.stage === stage);
}

export function filterIntelligenceModules(
  modules: IntelligenceModule[],
  stage: 'Alle' | 'All' | ResearchStage,
): IntelligenceModule[] {
  if (stage === 'Alle' || stage === 'All') {
    return modules;
  }
  return modules.filter((module) => module.stage === stage);
}

const LABS_RESEARCH_AREAS_EN: LabsResearchArea[] = [
  {
    id: 'intelligence-core',
    eyebrow: '01 // CORE ARCHITECTURE',
    title: 'I3 Intelligence Core',
    stage: 'Online · MusicChain & Lab',
    summary:
      'Five core modules with documented operational status: Audio, Motion, Canvas, and Guardian run in MusicChain, Economics as a public Synthetic Lab.',
    focusPoints: [
      'Audio, Motion, and Canvas are integrated in MusicChain',
      'Cue points, beat-accurate raw video cutting, and generative image models remain on the roadmap',
      'I3 Guardian is integrated fail-closed across account, upload, studio, interactions, rewards, live, and trading',
    ],
    routeTo: '/labs/intelligence',
    routeLabel: 'Open Intelligence Core',
  },
  {
    id: 'economics-intelligence',
    eyebrow: '02 // SIMULATION & POLICY',
    title: 'Economics Intelligence',
    stage: 'Online · Synthetic Lab',
    summary:
      'Public Synthetic Lab for resource analysis, price simulation, and forecasting. No write access to member accounts or production ledgers.',
    focusPoints: [
      'Public simulation at /labs/economics with synthetic inputs',
      'Same-origin API at /api/economics-lab, browser simulator as fallback',
      'Scoring, reconciliation, and token-based preview remain in the lab',
    ],
    routeTo: '/labs/economics',
    routeLabel: 'Open Economics Lab',
  },
  {
    id: 'cloud-engineering',
    eyebrow: '03 // INFRASTRUCTURE',
    title: 'Cloud Engineering',
    stage: 'Evaluation / Plan-Only',
    summary:
      'Structured staging planning, least-privilege IAM principles, cost limits, and static delivery strategies for future expansions.',
    focusPoints: [
      'Plan-only workflows prior to any billable cloud resource',
      'Clean separation between local build, Caddy static hosting, and backend services',
      'Avoiding unnecessary runtime complexity in production',
    ],
  },
  {
    id: 'ai-audio-processing',
    eyebrow: '04 // SIGNAL & AUDIO',
    title: 'AI Audio Processing',
    stage: 'Experimental',
    summary:
      'Research on automated audio segmentation, tempo/structure detection, and preparatory signal pipelines for electronic music.',
    focusPoints: [
      'Focus on DJ-friendly transitions, energy curves, and beat structures',
      'Evaluation of offline-capable and resource-controlled processing steps',
      'BPM, energy, and mood analysis runs in MusicChain; structure and cue detection are expanding',
    ],
  },
];

const EXPERIMENTAL_PROJECTS_EN: ExperimentalProject[] = [
  {
    id: 'exp-econ-rc',
    name: 'i3-economics-intelligence (Local RC)',
    area: 'Economics Intelligence',
    stage: 'Local Prototype',
    description:
      'Isolated local test environment for modeling synthetic economy, pricing, and participation scenarios.',
    note: 'Public synthetic simulator at /labs/economics. No write access to production ledgers.',
  },
  {
    id: 'exp-audio-markers',
    name: 'Beat & Drop Marker Analysis',
    area: 'AI Audio Processing',
    stage: 'Experimental',
    description:
      'Conceptual pipeline for detecting structural track sections (intro, build-up, drop, outro) as a basis for clipping suggestions.',
    note: 'Experimental research without a production inference API.',
  },
  {
    id: 'exp-gcp-plan',
    name: 'Plan-Only Staging Blueprints',
    area: 'Cloud Engineering',
    stage: 'Evaluation / Plan-Only',
    description:
      'Documented cloud concepts with strict cost ceilings, separated service accounts, and reproducible checks.',
    note: 'No automatic provisioning active.',
  },
  {
    id: 'exp-studio-bridge',
    name: 'Core-to-Studio Blueprint Contract',
    area: 'I3 Intelligence Core',
    stage: 'Planned',
    description:
      'Planned interface specification between the Intelligence modules and creator interfaces in iThree Studio.',
    note: 'Architecture draft in progress.',
  },
];

const INTELLIGENCE_MODULES_EN: IntelligenceModule[] = [
  {
    id: 'i3-audio-dj',
    name: 'I3 Audio & DJ',
    code: 'CORE-01 // AUDIO',
    stage: 'MusicChain · Audio-MVP',
    documentedState:
      'Online in MusicChain: BPM, energy, and mood analysis plus metadata-based set curation. Cue detection and advanced DJ automation are being expanded.',
    plannedCapabilities: [
      'Online in MusicChain: BPM from onset analysis, RMS energy, and heuristic mood classification',
      'Online in MusicChain: Set curation by genre, mood, BPM, and energy',
      'Expanding: Cue points, transition zones, and a full beat grid',
    ],
    inputs: 'Audio file in MusicChain Studio (analysis excerpt)',
    outputs: 'BPM, energy, mood tag, and set sorting (MusicChain MVP)',
    disclaimer:
      'Analysis inspects an excerpt by default. Cue detection, musical key, and automated DJ mixing are not yet verified.',
  },
  {
    id: 'i3-motion-clipping',
    name: 'I3 Motion & Clipping',
    code: 'CORE-02 // MOTION',
    stage: 'MusicChain · Rendering-MVP',
    documentedState:
      'Online in MusicChain: Highlight clips and vertical visualizer videos in Studio Vault. Beat-accurate cut planning is being expanded.',
    plannedCapabilities: [
      'Online in MusicChain: Highlight clips over the highest-energy window, with fades',
      'Online in MusicChain: Vertical 9:16 videos in Spectrum, Wave, and Scope looks',
      'Expanding: Beat-accurate cut boundaries for uploaded raw video',
    ],
    inputs: 'Track audio and selected visualizer look (MusicChain Studio)',
    outputs: 'Audio clips and vertical H.264 videos in Studio Vault',
    disclaimer:
      'RMS highlights are not yet musical drop detection. Beat-accurate cutting of arbitrary raw video is under expansion.',
  },
  {
    id: 'i3-canvas',
    name: 'I3 Canvas',
    code: 'CORE-03 // VISUALS',
    stage: 'MusicChain · Design-MVP',
    documentedState:
      'Online in MusicChain: deterministic cover, brand, and story graphics with Studio Vault. Generative image features are a later stage.',
    plannedCapabilities: [
      'Online in MusicChain: Cover, Brand Plate, and Story from title, artist, mood, genre, BPM, and energy',
      'Online in MusicChain: Vault output and adoption as cover or background',
      'Later: Generative image model as an optional stage',
    ],
    inputs: 'Release metadata and track analysis (MusicChain Studio)',
    outputs: 'Cover 1400×1400, Brand Plate 1600×900, Story 1080×1920',
    disclaimer:
      'Deterministic template engine. No generative image model connected.',
  },
  {
    id: 'i3-guardian',
    name: 'I3 Guardian',
    code: 'CORE-04 // SAFETY',
    stage: 'Online · MusicChain',
    documentedState:
      'I3 Guardian is active in MusicChain and integrated fail-closed across account, upload, studio, interactions, rewards, live, and trading.',
    plannedCapabilities: [
      'Online: time-limited, scope-specific sanctions, appeals, and audit entries',
      'Online: fail-closed enforcement across account, upload, studio, interactions, rewards, live, trading, and escrow',
      'Kept separate: rule-based moderation remains distinct from general AI safety guarantees',
    ],
    inputs: 'Platform rules and moderation decisions in MusicChain',
    outputs: 'Sanctions, appeals, audit entries, and fail-closed guards (online)',
    disclaimer:
      'Rule-based moderation is not a general AI safety guarantee.',
  },
  {
    id: 'i3-economics',
    name: 'I3 Economics Intelligence',
    code: 'CORE-05 // ECONOMICS',
    stage: 'Online · Synthetic Lab',
    documentedState:
      'Online on iThreeLab: public Synthetic Lab for resource analysis, price simulation, and forecasting. Advanced analyses remain in the lab.',
    plannedCapabilities: [
      'Online: Resource analysis for McCC, FUEL, and GAS',
      'Online: bounded price simulation and deterministic forecasting',
      'In the lab: scoring, reconciliation, and token-based preview',
    ],
    inputs: 'Synthetic resource balances (McCC, FUEL, GAS), rates, and time windows',
    outputs: 'Read-only projections on synthetic data',
    disclaimer:
      'Strictly read-only. No member accounts, balances, or production ledgers.',
    routeTo: '/labs/economics',
    routeLabel: 'Open Economics Lab Simulator',
  },
];

export type LabsStageKey = 'all' | 'local-prototype' | 'experimental' | 'evaluation' | 'planned';
export type CoreStageKey =
  | 'all'
  | 'audio-mvp'
  | 'rendering-mvp'
  | 'design-mvp'
  | 'partial'
  | 'synthetic-lab';

export const LABS_STAGE_FILTERS: Array<{
  key: LabsStageKey;
  de: 'Alle' | ResearchStage;
  en: 'All' | ResearchStage;
}> = [
  { key: 'all', de: 'Alle', en: 'All' },
  { key: 'local-prototype', de: 'Lokaler Prototyp', en: 'Local Prototype' },
  { key: 'experimental', de: 'Experimentell', en: 'Experimental' },
  { key: 'evaluation', de: 'Evaluation / Plan-Only', en: 'Evaluation / Plan-Only' },
  { key: 'planned', de: 'Geplant', en: 'Planned' },
];

export const CORE_STAGE_FILTERS: Array<{
  key: CoreStageKey;
  de: 'Alle' | ResearchStage;
  en: 'All' | ResearchStage;
}> = [
  { key: 'all', de: 'Alle', en: 'All' },
  { key: 'audio-mvp', de: 'MusicChain · Audio-MVP', en: 'MusicChain · Audio-MVP' },
  { key: 'rendering-mvp', de: 'MusicChain · Rendering-MVP', en: 'MusicChain · Rendering-MVP' },
  { key: 'design-mvp', de: 'MusicChain · Design-MVP', en: 'MusicChain · Design-MVP' },
  { key: 'partial', de: 'Teilweise integriert', en: 'Partially Integrated' },
  { key: 'synthetic-lab', de: 'Online · Synthetic Lab', en: 'Online · Synthetic Lab' },
];

export function getLabsResearchAreas(locale: Locale): LabsResearchArea[] {
  return locale === 'en' ? LABS_RESEARCH_AREAS_EN : LABS_RESEARCH_AREAS;
}

export function getExperimentalProjects(locale: Locale): ExperimentalProject[] {
  return locale === 'en' ? EXPERIMENTAL_PROJECTS_EN : EXPERIMENTAL_PROJECTS;
}

export function getIntelligenceModules(locale: Locale): IntelligenceModule[] {
  return locale === 'en' ? INTELLIGENCE_MODULES_EN : INTELLIGENCE_MODULES;
}
