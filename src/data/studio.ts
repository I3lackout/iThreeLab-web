import type { Locale } from '../i18n/translations';

export type StudioModuleStage =
  | 'Foundation / Geplant'
  | 'Foundation / Planned'
  | 'Geplant'
  | 'Planned'
  | 'Architektur-Blueprint'
  | 'Architecture Blueprint'
  | 'MusicChain · Audio-MVP'
  | 'MusicChain · Rendering-MVP'
  | 'MusicChain · Design-MVP'
  | 'Teilweise in MusicChain'
  | 'Partly in MusicChain'
  | 'Online in MusicChain';

export interface StudioCapability {
  id: 'audio-processing' | 'automatic-clipping' | 'ai-visuals-cover-art' | 'creator-workflows';
  title: string;
  eyebrow: string;
  stage: StudioModuleStage;
  summary: string;
  foundationScope: string[];
  coreDependency: string;
}

export interface WorkflowBlueprintStep {
  phase: string;
  label: string;
  detail: string;
}

export interface StudioWorkflowBlueprint {
  id: StudioCapability['id'];
  title: string;
  stageLabel: string;
  objective: string;
  steps: WorkflowBlueprintStep[];
  technicalNote: string;
}

export const STUDIO_CAPABILITIES: StudioCapability[] = [
  {
    id: 'audio-processing',
    title: 'Audio Processing',
    eyebrow: '01 // SIGNAL PIPELINE',
    stage: 'MusicChain · Audio-MVP',
    summary:
      'Online in MusicChain: BPM-, Energie- und Mood-Analyse sowie metadatenbasierte Set-Kuration. Struktur, Cue-Punkte und DJ-Automatisierung bleiben Ausbau.',
    foundationScope: [
      'Online: BPM aus Onset-Analyse, RMS-Energie und heuristische Mood-Klassifikation',
      'Online: Set-Kuration nach Genre, Mood, BPM und Energie',
      'Im Ausbau: Cue-Punkte, Übergangszonen und ein vollständiges Beat-Grid',
    ],
    coreDependency: 'Online in MusicChain über I3 Audio & DJ',
  },
  {
    id: 'automatic-clipping',
    title: 'Automatic Clipping',
    eyebrow: '02 // SHORT-FORM',
    stage: 'MusicChain · Rendering-MVP',
    summary:
      'Online in MusicChain: Highlight-Clips und vertikale Visualizer-Videos im Studio Vault. Beatgenauer Schnitt von Rohvideo bleibt Ausbau.',
    foundationScope: [
      'Online: Highlight über das energiereichste Zeitfenster, mit Fades',
      'Online: 9:16-Videos in Spectrum-, Wave- und Scope-Looks',
      'Veröffentlichung bleibt eine manuelle Creator-Entscheidung',
    ],
    coreDependency: 'Online in MusicChain über I3 Motion & Clipping',
  },
  {
    id: 'ai-visuals-cover-art',
    title: 'AI Visuals & Cover Art',
    eyebrow: '03 // VISUAL IDENTITY',
    stage: 'MusicChain · Design-MVP',
    summary:
      'Online in MusicChain: deterministische Cover-, Brand- und Story-Grafiken. Ein generatives Bildmodell ist nicht angebunden.',
    foundationScope: [
      'Online: Cover, Brand Plate und Story aus Titel, Artist, Mood, Genre, BPM und Energie',
      'Online: Vault-Ausgabe und Übernahme als Cover oder Hintergrund',
      'Später: Generatives Bildmodell als optionale Stufe',
    ],
    coreDependency: 'Online in MusicChain über I3 Canvas',
  },
  {
    id: 'creator-workflows',
    title: 'Creator Workflows',
    eyebrow: '04 // ORCHESTRATION',
    stage: 'Online in MusicChain',
    summary:
      'Die Promo-Pipeline verbindet Analyse, Canvas, Clip und Full-Length-Video in MusicChain über eine persistente Datenbank-Queue mit Neustart-Recovery. Das fertige Release-Paket bleibt Ausbau.',
    foundationScope: [
      'Online: Track → Analyse → Canvas → Clip → Full-Length-Video über persistente Job-Queue',
      'Online: automatisches Recovery unterbrochener Jobs, Backoff-Retries und Guardian-Schutz',
      'Freigabe bleibt beim Creator; diese Seite startet keine Jobs',
    ],
    coreDependency: 'Verknüpft mit I3 Audio, Canvas, Motion und I3 Guardian',
  },
];

export const STUDIO_WORKFLOW_BLUEPRINTS: StudioWorkflowBlueprint[] = [
  {
    id: 'audio-processing',
    title: 'Audio Processing Blueprint',
    stageLabel: 'MusicChain · Audio-MVP',
    objective: 'BPM-, Energie- und Mood-Analyse gespeicherter Tracks in MusicChain.',
    steps: [
      {
        phase: '01 · Input',
        label: 'Track-Audio im MusicChain Studio',
        detail: 'Die Analyse läuft an der gespeicherten Audiodatei, standardmäßig auf einem Ausschnitt.',
      },
      {
        phase: '02 · Analyse',
        label: 'BPM, Energie und Mood',
        detail: 'Onset-Tempo, RMS-Energie, spektrale Helligkeit und heuristische Mood-Klassifikation.',
      },
      {
        phase: '03 · Output',
        label: 'Metadaten für die Set-Kuration',
        detail: 'Cue-Punkte, Tonart und automatische DJ-Mischung sind noch nicht belegt.',
      },
    ],
    technicalNote:
      'Hinweis: Diese Seite lädt keine Dateien hoch und startet keine Analyse. Das Audio-MVP läuft im MusicChain Studio.',
  },
  {
    id: 'automatic-clipping',
    title: 'Automatic Clipping Blueprint',
    stageLabel: 'MusicChain · Rendering-MVP',
    objective: 'Highlight-Clips und vertikale Visualizer-Videos aus Track-Audio.',
    steps: [
      {
        phase: '01 · Input',
        label: 'Track-Audio und Visualizer-Look',
        detail: 'Spectrum, Wave oder Scope; Cliplängen 15, 30 und 60 Sekunden.',
      },
      {
        phase: '02 · Auswahl',
        label: 'Highlight über das energiereichste Zeitfenster',
        detail: 'RMS-Peaks sind noch keine musikalische Drop- oder Beat-Erkennung.',
      },
      {
        phase: '03 · Output',
        label: 'Audio-Clip und vertikales H.264-Video',
        detail: 'Ausgabe im Studio Vault. Beatgenauer Schnitt beliebigen Rohvideos ist im Ausbau.',
      },
    ],
    technicalNote:
      'Hinweis: Diese Seite rendert nichts. Die Render-Engine läuft in MusicChain, die Veröffentlichung bleibt manuell.',
  },
  {
    id: 'ai-visuals-cover-art',
    title: 'AI Visuals & Cover Art Blueprint',
    stageLabel: 'MusicChain · Design-MVP',
    objective: 'Deterministische Cover-, Brand- und Story-Grafiken zur Track-Analyse.',
    steps: [
      {
        phase: '01 · Input',
        label: 'Release-Metadaten und Track-Analyse',
        detail: 'Titel, Artist, Mood, Genre, BPM und Energie.',
      },
      {
        phase: '02 · Rendering',
        label: 'Template-Grafiken über I3 Canvas',
        detail: 'Cover 1400×1400, Brand Plate 1600×900, Story 1080×1920.',
      },
      {
        phase: '03 · Output',
        label: 'Vault-Grafiken zur manuellen Übernahme',
        detail: 'Als Cover oder Hintergrund setzbar. Kein generatives Bildmodell.',
      },
    ],
    technicalNote:
      'Hinweis: Diese Seite erzeugt keine Bilder. Die Template-Engine läuft in MusicChain; generative Bildfunktionen sind eine spätere Stufe.',
  },
  {
    id: 'creator-workflows',
    title: 'Creator Workflows Blueprint',
    stageLabel: 'Online in MusicChain',
    objective: 'Persistente Promo-Pipeline vom Track bis zu Clip, Grafik und Full-Length-Video.',
    steps: [
      {
        phase: '01 · Input',
        label: 'Track im MusicChain Studio',
        detail: 'Die Seite iThreeLab startet diesen Ablauf nicht.',
      },
      {
        phase: '02 · Pipeline',
        label: 'Analyse, Canvas, Clip und Full-Length-Video',
        detail: 'Die Schritte laufen über eine persistente Datenbank-Queue mit automatischem Recovery nach Neustarts.',
      },
      {
        phase: '03 · Freigabe',
        label: 'Manuelle Creator-Entscheidung & Guardian',
        detail: 'I3 Guardian ist fail-closed über Studio-, Interaktions-, Reward-, Live-, Upload- und Trading-Endpunkte integriert.',
      },
    ],
    technicalNote:
      'Hinweis: Die Prozesskette inklusive persistenter Queue und Guardian-Guards ist in MusicChain online. Ein fertiges Release-Paket ist der nächste Ausbau.',
  },
];

const STUDIO_CAPABILITIES_EN: StudioCapability[] = [
  {
    id: 'audio-processing',
    title: 'Audio Processing',
    eyebrow: '01 // SIGNAL PIPELINE',
    stage: 'MusicChain · Audio-MVP',
    summary:
      'Online in MusicChain: BPM, energy, and mood analysis plus metadata-based set curation. Structure, cue points, and DJ automation remain in development.',
    foundationScope: [
      'Online: BPM from onset analysis, RMS energy, and heuristic mood classification',
      'Online: set curation by genre, mood, BPM, and energy',
      'In development: cue points, transition zones, and a full beat grid',
    ],
    coreDependency: 'Online in MusicChain via I3 Audio & DJ',
  },
  {
    id: 'automatic-clipping',
    title: 'Automatic Clipping',
    eyebrow: '02 // SHORT-FORM',
    stage: 'MusicChain · Rendering-MVP',
    summary:
      'Online in MusicChain: highlight clips and vertical visualizer videos in the Studio Vault. Beat-accurate raw-video cutting remains in development.',
    foundationScope: [
      'Online: highlight from the highest-energy window, with fades',
      'Online: 9:16 videos in Spectrum, Wave, and Scope looks',
      'Publishing stays a manual creator decision',
    ],
    coreDependency: 'Online in MusicChain via I3 Motion & Clipping',
  },
  {
    id: 'ai-visuals-cover-art',
    title: 'AI Visuals & Cover Art',
    eyebrow: '03 // VISUAL IDENTITY',
    stage: 'MusicChain · Design-MVP',
    summary:
      'Online in MusicChain: deterministic cover, brand, and story graphics. No generative image model is connected.',
    foundationScope: [
      'Online: cover, brand plate, and story from title, artist, mood, genre, BPM, and energy',
      'Online: Vault output that can be applied as cover or background',
      'Later: a generative image model as an optional stage',
    ],
    coreDependency: 'Online in MusicChain via I3 Canvas',
  },
  {
    id: 'creator-workflows',
    title: 'Creator Workflows',
    eyebrow: '04 // ORCHESTRATION',
    stage: 'Online in MusicChain',
    summary:
      'The promo pipeline connects analysis, canvas, clip, and full-length video in MusicChain via a persistent database queue with restart recovery. The finished release package remains in development.',
    foundationScope: [
      'Online: track → analysis → canvas → clip → full-length video via persistent job queue',
      'Online: automatic recovery of interrupted jobs, backoff retries, and Guardian protection',
      'Approval stays with the creator; this page does not start jobs',
    ],
    coreDependency: 'Connected with I3 Audio, Canvas, Motion, and I3 Guardian',
  },
];

const STUDIO_WORKFLOW_BLUEPRINTS_EN: StudioWorkflowBlueprint[] = [
  {
    id: 'audio-processing',
    title: 'Audio Processing Blueprint',
    stageLabel: 'MusicChain · Audio-MVP',
    objective: 'BPM, energy, and mood analysis of stored tracks in MusicChain.',
    steps: [
      {
        phase: '01 · Input',
        label: 'Track audio in the MusicChain Studio',
        detail: 'Analysis runs on the stored audio file, by default on a short excerpt.',
      },
      {
        phase: '02 · Analysis',
        label: 'BPM, energy, and mood',
        detail: 'Onset tempo, RMS energy, spectral brightness, and heuristic mood classification.',
      },
      {
        phase: '03 · Output',
        label: 'Metadata for set curation',
        detail: 'Cue points, key, and automatic DJ mixing are not yet demonstrated.',
      },
    ],
    technicalNote:
      'Note: This page does not upload files or start analysis. The audio MVP runs in the MusicChain Studio.',
  },
  {
    id: 'automatic-clipping',
    title: 'Automatic Clipping Blueprint',
    stageLabel: 'MusicChain · Rendering-MVP',
    objective: 'Highlight clips and vertical visualizer videos from track audio.',
    steps: [
      {
        phase: '01 · Input',
        label: 'Track audio and visualizer look',
        detail: 'Spectrum, Wave, or Scope; clip lengths of 15, 30, and 60 seconds.',
      },
      {
        phase: '02 · Selection',
        label: 'Highlight from the highest-energy window',
        detail: 'RMS peaks are not yet musical drop or beat detection.',
      },
      {
        phase: '03 · Output',
        label: 'Audio clip and vertical H.264 video',
        detail: 'Output in the Studio Vault. Beat-accurate cutting of arbitrary raw video is in development.',
      },
    ],
    technicalNote:
      'Note: This page renders nothing. The render engine runs in MusicChain, and publishing stays manual.',
  },
  {
    id: 'ai-visuals-cover-art',
    title: 'AI Visuals & Cover Art Blueprint',
    stageLabel: 'MusicChain · Design-MVP',
    objective: 'Deterministic cover, brand, and story graphics from the track analysis.',
    steps: [
      {
        phase: '01 · Input',
        label: 'Release metadata and track analysis',
        detail: 'Title, artist, mood, genre, BPM, and energy.',
      },
      {
        phase: '02 · Rendering',
        label: 'Template graphics via I3 Canvas',
        detail: 'Cover 1400×1400, brand plate 1600×900, story 1080×1920.',
      },
      {
        phase: '03 · Output',
        label: 'Vault graphics for manual apply',
        detail: 'Can be set as cover or background. No generative image model.',
      },
    ],
    technicalNote:
      'Note: This page creates no images. The template engine runs in MusicChain; generative image features are a later stage.',
  },
  {
    id: 'creator-workflows',
    title: 'Creator Workflows Blueprint',
    stageLabel: 'Online in MusicChain',
    objective: 'Persistent promo pipeline from track to clip, graphic, and full-length video.',
    steps: [
      {
        phase: '01 · Input',
        label: 'Track in the MusicChain Studio',
        detail: 'The iThreeLab page does not start this flow.',
      },
      {
        phase: '02 · Pipeline',
        label: 'Analysis, canvas, clip, and full-length video',
        detail: 'These steps run via a persistent database queue with automatic recovery after restarts.',
      },
      {
        phase: '03 · Approval',
        label: 'Manual creator decision & Guardian',
        detail: 'I3 Guardian is integrated fail-closed across Studio, interaction, reward, live, upload, and trading endpoints.',
      },
    ],
    technicalNote:
      'Note: The process chain including the persistent queue and Guardian guards is online in MusicChain. A finished release package is the next step.',
  },
];

export function getStudioCapabilities(locale: Locale): StudioCapability[] {
  return locale === 'en' ? STUDIO_CAPABILITIES_EN : STUDIO_CAPABILITIES;
}

export function getStudioWorkflowBlueprints(locale: Locale): StudioWorkflowBlueprint[] {
  return locale === 'en' ? STUDIO_WORKFLOW_BLUEPRINTS_EN : STUDIO_WORKFLOW_BLUEPRINTS;
}
