export type Locale = 'de' | 'en';

export interface TranslationDictionary {
  nav: {
    skipToMain: string;
    mainNavLabel: string;
    mobileNavLabel: string;
    openNav: string;
    closeNav: string;
    languageLabel: string;
    intelligenceCore: string;
    mobileIntelligenceCore: string;
    items: {
      portal: string;
      ecosystem: string;
      labs: string;
      studio: string;
      technology: string;
      about: string;
    };
  };
  footer: {
    descriptionPrefix: string;
    descriptionAfterI3lackout: string;
    descriptionAfterMusicchain: string;
    descriptionAfterEconomics: string;
    descriptionBeforeDomain: string;
    descriptionSuffix: string;
    navigationHeading: string;
    portalSuffix: string;
    ecosystem: string;
    technology: string;
    visionAbout: string;
    labsStudioHeading: string;
    labs: string;
    intelligenceCore: string;
    economicsLab: string;
    studio: string;
    ecosystemLegalHeading: string;
    impressum: string;
    privacy: string;
  };
  errorBoundary: {
    eyebrow: string;
    title: string;
    description: string;
    reload: string;
    backPrefix: string;
    backSuffix: string;
  };
  safeExternalLink: {
    defaultFallback: string;
  };
  legal: {
    badge: string;
    backTo: string;
    impressum: {
      eyebrow: string;
      title: string;
      intro: string;
    };
    privacy: {
      eyebrow: string;
      title: string;
      intro: string;
    };
  };
  notFound: {
    eyebrow: string;
    title: string;
    descriptionBefore: string;
    descriptionMiddle: string;
    descriptionAfter: string;
    backToPrefix: string;
    backToSuffix: string;
    ecosystem: string;
  };
  home: {
    hero: {
      subtitle: string;
      heroDescriptionBefore: string;
      heroDescriptionAnd: string;
      heroDescriptionAfter: string;
      ctaEcosystem: string;
      ctaLabs: string;
      ctaStudio: string;
    };
    worlds: {
      eyebrow: string;
      title: string;
      description: string;
    };
    navigator: {
      eyebrow: string;
      title: string;
      description: string;
      tablistAria: string;
      responsibilitiesHeading: string;
    };
    vision: {
      eyebrow: string;
      title: string;
      description: string;
    };
    labsCard: {
      badge: string;
      title: string;
      description: string;
      ctaLabs: string;
      ctaCore: string;
    };
    studioCard: {
      badge: string;
      title: string;
      description: string;
      ctaStudio: string;
    };
  };
  ecosystem: {
    eyebrow: string;
    title: string;
    description: string;
    brandsHeading: string;
    projectsHeading: string;
  };
  labs: {
    eyebrow: string;
    title: string;
    description: string;
    spotlight: {
      badge: string;
      title: string;
      description: string;
      ctaCore: string;
      ctaEconomics: string;
    };
    researchAreasHeading: string;
    experimentalHeading: string;
    experimentalDescription: string;
    filterAriaLabel: string;
  };
  intelligenceCore: {
    backToLabs: string;
    eyebrow: string;
    title: string;
    description: string;
    transparencyNote: string;
    filterPrompt: string;
    filterAriaLabel: string;
    inputLabel: string;
    outputLabel: string;
  };
  studio: {
    eyebrow: string;
    title: string;
    description: string;
    statusNotice: string;
    capabilitiesHeading: string;
    blueprintsHeading: string;
    blueprintsSubtitle: string;
    blueprintsTablistAria: string;
    inspectCore: string;
    blueprintWord: string;
  };
  technology: {
    eyebrow: string;
    title: string;
    description: string;
    filterPrompt: string;
    filterAriaLabel: string;
    caddyHeading: string;
    caddyBodyBefore: string;
    caddyBodyMiddle: string;
    caddyBodyAfter: string;
  };
  about: {
    eyebrow: string;
    title: string;
    description: string;
    connections: Array<{
      id: string;
      title: string;
      tone: 'universe' | 'labs' | 'studio';
      text: string;
    }>;
    bridge: {
      badge: string;
      title: string;
      descriptionBefore: string;
      descriptionMiddle: string;
      descriptionAfter: string;
      ctaDeveloper: string;
      ctaEcosystem: string;
    };
  };
  economicsLab: {
    backToLabs: string;
    eyebrow: string;
    title: string;
    description: string;
    status: {
      serverAvailable: string;
      offlineActive: string;
      apiConnectedBadge: string;
      offlineBadge: string;
      intelligenceLabel: string;
      browserLabel: string;
      unexpectedHealth: string;
      connectedPrefix: string;
      unreachableWithReasonPrefix: string;
      unreachableWithReasonSuffix: string;
      unreachableFallback: string;
      computedRemote: string;
      remoteFailedPrefix: string;
      remoteFailedFallback: string;
      previewVerified: string;
      previewFailed: string;
    };
    buttons: {
      checkHealth: string;
      runRemote: string;
    };
    tabsAriaLabel: string;
    tabs: {
      resources: string;
      pricing: string;
      forecast: string;
    };
    inputsHeading: string;
    inputs: {
      balanceSuffix: string;
      basePrice: string;
      resource: string;
      membershipDiscount: string;
      participationScore: string;
      maxDiscountCap: string;
      currentBalance: string;
      horizonDays: string;
      dailyInflow: string;
      dailyOutflow: string;
      reserveThreshold: string;
    };
    errors: {
      basePricePositive: string;
      ratesRange: string;
      capExceeded: string;
    };
    results: {
      serverHeading: string;
      browserHeading: string;
      apiBadge: string;
      browserBadge: string;
      totalUnits: string;
      dominant: string;
      finalPrice: string;
      effectiveDiscount: string;
      discountAmount: string;
      capActive: string;
      yes: string;
      no: string;
      projectedBalance: string;
      netDailyFlow: string;
      netChange: string;
      reserveBreached: string;
    };
    devPreview: {
      eyebrow: string;
      title: string;
      descriptionBefore: string;
      descriptionAfter: string;
      placeholder: string;
      ariaLabel: string;
      button: string;
      boundary: string;
    };
  };
}

export const TRANSLATIONS: Record<Locale, TranslationDictionary> = {
  de: {
    nav: {
      skipToMain: 'Zum Hauptinhalt springen',
      mainNavLabel: 'Hauptnavigation',
      mobileNavLabel: 'Mobile Navigation',
      openNav: 'Navigation öffnen',
      closeNav: 'Navigation schließen',
      languageLabel: 'Sprache wählen',
      intelligenceCore: 'Intelligence Core',
      mobileIntelligenceCore: 'I3 Intelligence Core',
      items: {
        portal: 'Portal',
        ecosystem: 'Ecosystem',
        labs: 'Labs',
        studio: 'Studio',
        technology: 'Technology',
        about: 'About',
      },
    },
    footer: {
      descriptionPrefix: 'Dachmarke & Technologie-Labor für ',
      descriptionAfterI3lackout: ', ',
      descriptionAfterMusicchain: ', ',
      descriptionAfterEconomics: ' und ',
      descriptionBeforeDomain: '. Statische Web-Foundation V1 für ',
      descriptionSuffix: ' — ohne Tracking-Cookies oder versteckte Endpunkte.',
      navigationHeading: 'Navigation',
      portalSuffix: ' Portal',
      ecosystem: 'Connected Ecosystem',
      technology: 'Technology',
      visionAbout: 'Vision & About',
      labsStudioHeading: 'Labs & Studio',
      labs: 'iThree Labs',
      intelligenceCore: 'Intelligence Core',
      economicsLab: 'Economics Lab',
      studio: 'iThree Studio',
      ecosystemLegalHeading: 'Ökosystem & Rechtliches',
      impressum: 'Impressum',
      privacy: 'Datenschutz',
    },
    errorBoundary: {
      eyebrow: 'SYSTEM // FALLBACK',
      title: 'Ansicht konnte nicht geladen werden',
      description:
        'In diesem Bereich ist ein unerwarteter Darstellungsfehler aufgetreten. Du kannst die Ansicht zurücksetzen oder zur Startseite zurückkehren.',
      reload: 'Ansicht neu laden',
      backPrefix: 'Zum ',
      backSuffix: ' Portal',
    },
    safeExternalLink: {
      defaultFallback: 'Externer Link nicht verfügbar',
    },
    legal: {
      badge: 'ÖFFENTLICH // STATISCH',
      backTo: 'Zurück zu ',
      impressum: {
        eyebrow: 'LEGAL // § 5 DDG',
        title: 'Impressum',
        intro:
          'Anbieterkennzeichnung für die öffentliche Website iThreeLab.com, die Dachmarke für I3LACKOUT, musicchaini3, i3-economics-intelligence und iThree Studio.',
      },
      privacy: {
        eyebrow: 'PRIVACY // ART. 13 DSGVO',
        title: 'Datenschutz',
        intro:
          'Informationen zur Verarbeitung beim Besuch von iThreeLab.com. Die Website ist statisch, ohne Tracking-Cookies und ohne Mitgliederkonten.',
      },
    },
    notFound: {
      eyebrow: '404 // ROUTE NICHT GEFUNDEN',
      title: 'Dieser Sektor im iThreeLab-Ökosystem existiert nicht',
      descriptionBefore: 'Für den Pfad ',
      descriptionMiddle: ' ist keine Seite hinterlegt. Kehre zum ',
      descriptionAfter: ' Portal zurück oder wechsle direkt in das Connected Ecosystem.',
      backToPrefix: 'Zum ',
      backToSuffix: ' Portal',
      ecosystem: 'Connected Ecosystem',
    },
    home: {
      hero: {
        subtitle: 'Music × Technology × Intelligence',
        heroDescriptionBefore: 'Die übergeordnete Dachmarke für das vernetzte Ökosystem aus ',
        heroDescriptionAnd: ' und ',
        heroDescriptionAfter:
          ' — gebaut für eigenständige Musik, saubere Web-Architektur und modulare Creator-Intelligenz.',
        ctaEcosystem: 'Connected Ecosystem',
        ctaLabs: 'iThree Labs',
        ctaStudio: 'iThree Studio',
      },
      worlds: {
        eyebrow: '01 // THREE CENTRAL WORLDS',
        title: 'Drei eigenständige Welten, ein verbundenes System',
        description:
          'Jede Marke im iThreeLab-Ökosystem übernimmt eine klar abgegrenzte Rolle — ohne Vermischung von Zuständigkeiten.',
      },
      navigator: {
        eyebrow: '02 // INTERACTIVE ECOSYSTEM NAVIGATION',
        title: 'Interaktiver Ökosystem-Navigator',
        description:
          'Wähle eine der drei Markenwelten aus, um Zuständigkeiten, Zielseiten und validierte Einstiegspunkte direkt zu inspizieren.',
        tablistAria: 'Ecosystem Welten auswählen',
        responsibilitiesHeading: 'Dokumentierte Zuständigkeiten',
      },
      vision: {
        eyebrow: '03 // VISION & MISSION',
        title: 'Warum iThreeLab existiert',
        description:
          'iThreeLab verbindet künstlerische Arbeit, Software-Entwicklung und schrittweise Intelligenz-Module zu einer konsistenten Produktfamilie.',
      },
      labsCard: {
        badge: 'iThree Labs // Research',
        title: 'Research, Core Modules & Prototyping',
        description:
          'Einstieg in I3 Intelligence Core, das öffentliche Economics Synthetic Lab, Cloud Engineering und die Audio-Forschung. Audio, Motion und Canvas laufen als MusicChain-MVP.',
        ctaLabs: 'Zu iThree Labs',
        ctaCore: 'Intelligence Core',
      },
      studioCard: {
        badge: 'iThree Studio // Foundation',
        title: 'Creative AI Tools & Creator Workflows',
        description:
          'Produktpräsentation und technische Foundation für Audio Processing, Automatic Clipping, AI Visuals & Cover Art sowie orchestrierte Creator Workflows.',
        ctaStudio: 'Zu iThree Studio',
      },
    },
    ecosystem: {
      eyebrow: 'ECOSYSTEM // CONNECTED ARCHITECTURE',
      title: 'Connected Ecosystem — Drei Marken, klare Zuständigkeiten',
      description:
        'Überblick über I3LACKOUT, musicchaini3 und iThree Labs sowie alle verbundenen Web- und Plattform-Bausteine. Alle Statusangaben spiegeln den realen Projektstand ohne erfundene Kennzahlen wider.',
      brandsHeading: 'Marken & Zuständigkeiten',
      projectsHeading: 'Projektkarten & Systembausteine',
    },
    labs: {
      eyebrow: 'iTHREE LABS // RESEARCH & ENGINEERING',
      title: 'iThree Labs — Forschung, Prototypen & Intelligence Architecture',
      description:
        'Der Forschungs- und Engineering-Bereich von iThreeLab. Hier stehen der I3 Intelligence Core, das öffentliche Economics Synthetic Lab, Cloud-Blueprints und die Audio-Forschung.',
      spotlight: {
        badge: 'Spotlight // I3 Intelligence Core',
        title: 'Fünf Core-Module mit belegtem Betriebsstand',
        description:
          'Audio, Motion, Canvas und Guardian laufen in MusicChain. Economics ist das öffentliche Synthetic Lab; offene Ausbaustufen bleiben gekennzeichnet.',
        ctaCore: 'Zu /labs/intelligence',
        ctaEconomics: 'Economics Lab',
      },
      researchAreasHeading: 'Forschungs- & Engineering-Bereiche',
      experimentalHeading: 'Experimentelle Projekte & Prototypen',
      experimentalDescription:
        'Filtere nach dokumentiertem Entwicklungsstand — ohne versteckte Live-Versprechen.',
      filterAriaLabel: 'Projektstatus filtern',
    },
    intelligenceCore: {
      backToLabs: 'Zurück zu iThree Labs',
      eyebrow: 'LABS // I3 INTELLIGENCE CORE',
      title: 'I3 Intelligence Core — Modulare Systemarchitektur',
      description:
        'Fünf Core-Module mit belegtem Betriebsstand. Audio, Motion, Canvas und Guardian laufen in MusicChain, Economics als öffentliches Synthetic Lab. Noch nicht belegte Funktionen bleiben gekennzeichnet.',
      transparencyNote:
        'Transparenz-Hinweis: Audio, Motion und Canvas laufen in MusicChain als MVP. Economics ist auf iThreeLab als Synthetic Lab online und schreibt keine Ledger. I3 Guardian läuft fail-closed über Account, Upload, Studio, Interaktionen, Rewards, Live und Trading.',
      filterPrompt: 'Module nach Status filtern',
      filterAriaLabel: 'Core Module filtern',
      inputLabel: 'Input: ',
      outputLabel: 'Output: ',
    },
    studio: {
      eyebrow: 'iTHREE STUDIO // CREATIVE AI FOUNDATION',
      title: 'iThree Studio — MusicChain-MVPs und offener Ausbau',
      description:
        'Audio Processing, Automatic Clipping und Cover-Grafiken laufen in MusicChain. Diese Seite zeigt den Betriebsstand und verarbeitet selbst keine Dateien.',
      statusNotice:
        'Produktstatus: Audio, Clipping und Cover sind in MusicChain online. Cue-Punkte, beatgenauer Rohvideo-Schnitt, generative Bilder und ein dauerhaftes Release-Paket bleiben Ausbau. Hier findet kein Upload und keine simulierte Verarbeitung statt.',
      capabilitiesHeading: 'Creative AI Tools & Studio-Bereiche',
      blueprintsHeading: 'Creator Workflows // Betriebsstand',
      blueprintsSubtitle:
        'Wähle einen Workflow, um zu sehen, was in MusicChain bereits läuft und was Ausbau bleibt.',
      blueprintsTablistAria: 'Studio Workflow Blueprints',
      inspectCore: 'Intelligence Core prüfen',
      blueprintWord: ' Blueprint',
    },
    technology: {
      eyebrow: 'TECHNOLOGY // ARCHITECTURE & STACK',
      title: 'Technology & Architecture — Vom Backend bis zur statischen Auslieferung',
      description:
        'Technisches Fundament über das gesamte iThreeLab-Ökosystem: Python/Flask, React/TypeScript, MariaDB/SQLAlchemy, WebRTC, Google Cloud, REST APIs und automatisiertes Testing.',
      filterPrompt: 'Architektur-Schicht filtern',
      filterAriaLabel: 'Technologie-Schichten',
      caddyHeading: 'Statische Produktionsauslieferung über Caddy',
      caddyBodyBefore: 'Das Web-Portal ',
      caddyBodyMiddle: ' wird als statisches Vite-Bundle (',
      caddyBodyAfter:
        ') vorbereitet und über Caddy ausgeliefert. Im Produktivbetrieb sind keine zusätzlichen Node.js-Prozesse und keine direkten Datenbank- oder Backend-Abhängigkeiten erforderlich.',
    },
    about: {
      eyebrow: 'VISION // ABOUT iThreeLab',
      title: 'iThreeLab als vernetztes Ökosystem aus Musik, Code und intelligenter Technologie',
      description:
        'Statt getrennter Einzelprojekte bündelt iThreeLab kreative Identität, eigene Plattform-Infrastruktur und langfristige Forschung in einer gemeinsamen Struktur.',
      connections: [
        {
          id: 'conn-music',
          title: 'Musik als Ursprung',
          tone: 'universe',
          text: 'I3LACKOUT bildet die künstlerische Basis — elektronische Releases, Sound Design und Live-Energie bestimmen, wofür Technologien im Ökosystem gebaut werden.',
        },
        {
          id: 'conn-dev',
          title: 'Software-Entwicklung & Plattformen',
          tone: 'labs',
          text: 'Vom Backend in Python/Flask über relationale Datenhaltung bis zu modernen React-TypeScript-Frontends entstehen alle zentralen Bausteine eigenständig.',
        },
        {
          id: 'conn-intel',
          title: 'Intelligente Systeme mit Augenmaß',
          tone: 'studio',
          text: 'iThree Labs und iThree Studio zeigen den Betriebsstand: Audio, Clipping und Cover laufen in MusicChain als MVP. Offene Funktionen bleiben gekennzeichnet.',
        },
      ],
      bridge: {
        badge: 'BRIDGE // I3LACKOUT DEVELOPER UNIVERSE',
        title: 'Direkte Verbindung zum I3LACKOUT Developer Universe',
        descriptionBefore:
          'Das persönliche Entwickler-Profil, dokumentierte Meilensteine und die Projektgalerie von ',
        descriptionMiddle: ' sind im eigenständigen Frontend unter ',
        descriptionAfter: ' verankert.',
        ctaDeveloper: 'I3LACKOUT Developer Universe öffnen',
        ctaEcosystem: 'Zum Ecosystem',
      },
    },
    economicsLab: {
      backToLabs: 'Zurück zu iThree Labs',
      eyebrow: 'LABS // I3 ECONOMICS INTELLIGENCE',
      title: 'Economics Lab — Synthetic Simulator & Intelligence API',
      description:
        'Analysiere McCC, FUEL und GAS, simuliere Preise und prognostiziere Ressourcen. Synthetische Szenarien werden im Browser oder mit I3 Economics Intelligence berechnet. ITC wird separat bilanziert und ist kein Ressourcen-Äquivalent.',
      status: {
        serverAvailable: 'Server-Berechnung verfügbar. Prüfe die Verbindung oder berechne ein Szenario.',
        offlineActive: 'Offline Synthetic Simulator aktiv (statischer Modus ohne Backend-Abhängigkeit).',
        apiConnectedBadge: 'Economics API verbunden',
        offlineBadge: 'Offline Synthetic Mode',
        intelligenceLabel: 'I3 Economics Intelligence',
        browserLabel: 'Browser-Simulation',
        unexpectedHealth: 'Unerwartete Health-Antwort.',
        connectedPrefix: 'Verbunden mit',
        unreachableWithReasonPrefix: 'Economics API nicht erreichbar (',
        unreachableWithReasonSuffix: ') — Offline Synthetic Simulator bleibt aktiv.',
        unreachableFallback: 'Economics API nicht erreichbar — Offline Synthetic Simulator bleibt aktiv.',
        computedRemote: 'Szenario mit i3 Economics Intelligence berechnet.',
        remoteFailedPrefix: 'Remote-Call fehlgeschlagen (',
        remoteFailedFallback: 'Remote-Call fehlgeschlagen.',
        previewVerified: 'Read-Only Synthetic Preview erfolgreich vom lokalen Lab verifiziert.',
        previewFailed: 'Synthetic Preview konnte nicht geladen werden.',
      },
      buttons: {
        checkHealth: 'API-Verbindung prüfen',
        runRemote: 'Mit Intelligence berechnen',
      },
      tabsAriaLabel: 'Economics Simulator Modi',
      tabs: {
        resources: 'Ressourcen-Analyse',
        pricing: 'Pricing-Simulator',
        forecast: 'Resource-Forecast',
      },
      inputsHeading: 'Synthetische Eingabeparameter',
      inputs: {
        balanceSuffix: 'Balance',
        basePrice: 'Base Price',
        resource: 'Resource',
        membershipDiscount: 'Membership Discount (0–1)',
        participationScore: 'Participation Score (0–1)',
        maxDiscountCap: 'Max Total Discount Cap (0–1)',
        currentBalance: 'Current Balance',
        horizonDays: 'Horizon (Days, 1–365)',
        dailyInflow: 'Daily Inflow',
        dailyOutflow: 'Daily Outflow',
        reserveThreshold: 'Reserve Threshold',
      },
      errors: {
        basePricePositive: 'Der Basispreis muss größer als 0 sein.',
        ratesRange: 'Rabatte und Participation Score müssen zwischen 0 und 1 liegen.',
        capExceeded: 'Die maximal möglichen Rabatte dürfen zusammen den Policy-Cap nicht überschreiten.',
      },
      results: {
        serverHeading: 'Server-Ergebnis · Synthetisch',
        browserHeading: 'Browser-Ergebnis · Synthetisch',
        apiBadge: 'Intelligence API',
        browserBadge: 'In-Browser',
        totalUnits: 'Total Units',
        dominant: 'Dominant',
        finalPrice: 'Final Price',
        effectiveDiscount: 'Effective Discount',
        discountAmount: 'Discount Amount',
        capActive: 'Cap aktiv',
        yes: 'Ja',
        no: 'Nein',
        projectedBalance: 'Projected Balance',
        netDailyFlow: 'Net Daily Flow',
        netChange: 'Net Change',
        reserveBreached: 'Reserve unterschritten',
      },
      devPreview: {
        eyebrow: 'Optional // Authenticated Synthetic Preview',
        title: 'Loopback-Test mit I3_ECONOMICS_LOCAL_TOKEN',
        descriptionBefore: 'Für lokale Entwicklung mit laufendem ',
        descriptionAfter:
          ' Server auf Port 8765. Der Token bleibt ausschließlich im flüchtigen React-State und wird nicht gespeichert.',
        placeholder: 'I3_ECONOMICS_LOCAL_TOKEN (min. 32 Zeichen)',
        ariaLabel: 'I3 Economics Local Token',
        button: 'Synthetic Preview laden',
        boundary:
          'Boundary: Keine produktiven Nutzer-Balances, keine Ledger-Schreibzugriffe, keine Zahlungsdaten.',
      },
    },
  },
  en: {
    nav: {
      skipToMain: 'Skip to main content',
      mainNavLabel: 'Main navigation',
      mobileNavLabel: 'Mobile navigation',
      openNav: 'Open navigation',
      closeNav: 'Close navigation',
      languageLabel: 'Select language',
      intelligenceCore: 'Intelligence Core',
      mobileIntelligenceCore: 'I3 Intelligence Core',
      items: {
        portal: 'Portal',
        ecosystem: 'Ecosystem',
        labs: 'Labs',
        studio: 'Studio',
        technology: 'Technology',
        about: 'About',
      },
    },
    footer: {
      descriptionPrefix: 'Umbrella brand & technology lab for ',
      descriptionAfterI3lackout: ', ',
      descriptionAfterMusicchain: ', ',
      descriptionAfterEconomics: ', and ',
      descriptionBeforeDomain: '. Static Web Foundation V1 for ',
      descriptionSuffix: ' — without tracking cookies or hidden endpoints.',
      navigationHeading: 'Navigation',
      portalSuffix: ' Portal',
      ecosystem: 'Connected Ecosystem',
      technology: 'Technology',
      visionAbout: 'Vision & About',
      labsStudioHeading: 'Labs & Studio',
      labs: 'iThree Labs',
      intelligenceCore: 'Intelligence Core',
      economicsLab: 'Economics Lab',
      studio: 'iThree Studio',
      ecosystemLegalHeading: 'Ecosystem & Legal',
      impressum: 'Imprint',
      privacy: 'Privacy Policy',
    },
    errorBoundary: {
      eyebrow: 'SYSTEM // FALLBACK',
      title: 'View could not be loaded',
      description:
        'An unexpected rendering error occurred in this section. You can reset the view or return to the home page.',
      reload: 'Reload view',
      backPrefix: 'Back to ',
      backSuffix: ' Portal',
    },
    safeExternalLink: {
      defaultFallback: 'External link unavailable',
    },
    legal: {
      badge: 'PUBLIC // STATIC',
      backTo: 'Back to ',
      impressum: {
        eyebrow: 'LEGAL // § 5 DDG',
        title: 'Imprint',
        intro:
          'Provider notice for the public website iThreeLab.com, the umbrella brand for I3LACKOUT, musicchaini3, i3-economics-intelligence, and iThree Studio.',
      },
      privacy: {
        eyebrow: 'PRIVACY // ART. 13 GDPR',
        title: 'Privacy',
        intro:
          'Information about processing when you visit iThreeLab.com. The website is static, without tracking cookies and without member accounts.',
      },
    },
    notFound: {
      eyebrow: '404 // ROUTE NOT FOUND',
      title: 'This sector in the iThreeLab ecosystem does not exist',
      descriptionBefore: 'No page is registered for the path ',
      descriptionMiddle: '. Return to the ',
      descriptionAfter: ' Portal or switch directly to the Connected Ecosystem.',
      backToPrefix: 'To ',
      backToSuffix: ' Portal',
      ecosystem: 'Connected Ecosystem',
    },
    home: {
      hero: {
        subtitle: 'Music × Technology × Intelligence',
        heroDescriptionBefore: 'The umbrella brand for the connected ecosystem of ',
        heroDescriptionAnd: ', and ',
        heroDescriptionAfter:
          ' — built for independent music, clean web architecture, and modular creator intelligence.',
        ctaEcosystem: 'Connected Ecosystem',
        ctaLabs: 'iThree Labs',
        ctaStudio: 'iThree Studio',
      },
      worlds: {
        eyebrow: '01 // THREE CENTRAL WORLDS',
        title: 'Three independent worlds, one connected system',
        description:
          'Each brand in the iThreeLab ecosystem takes on a clearly defined role — without overlapping responsibilities.',
      },
      navigator: {
        eyebrow: '02 // INTERACTIVE ECOSYSTEM NAVIGATION',
        title: 'Interactive Ecosystem Navigator',
        description:
          'Select one of the three brand worlds to inspect its responsibilities, target pages, and validated entry points directly.',
        tablistAria: 'Select ecosystem worlds',
        responsibilitiesHeading: 'Documented Responsibilities',
      },
      vision: {
        eyebrow: '03 // VISION & MISSION',
        title: 'Why iThreeLab exists',
        description:
          'iThreeLab connects artistic work, software engineering, and incremental intelligence modules into a consistent product family.',
      },
      labsCard: {
        badge: 'iThree Labs // Research',
        title: 'Research, Core Modules & Prototyping',
        description:
          'Entry point to the I3 Intelligence Core, the public Economics Synthetic Lab, Cloud Engineering, and Audio Research. Audio, Motion, and Canvas run as MusicChain MVPs.',
        ctaLabs: 'Explore iThree Labs',
        ctaCore: 'Intelligence Core',
      },
      studioCard: {
        badge: 'iThree Studio // Foundation',
        title: 'Creative AI Tools & Creator Workflows',
        description:
          'Product presentation and technical foundation for Audio Processing, Automatic Clipping, AI Visuals & Cover Art, and orchestrated Creator Workflows.',
        ctaStudio: 'Explore iThree Studio',
      },
    },
    ecosystem: {
      eyebrow: 'ECOSYSTEM // CONNECTED ARCHITECTURE',
      title: 'Connected Ecosystem — Three brands, clear responsibilities',
      description:
        'Overview of I3LACKOUT, musicchaini3, and iThree Labs along with all connected web and platform building blocks. All status labels reflect actual project state without invented metrics.',
      brandsHeading: 'Brands & Responsibilities',
      projectsHeading: 'Project Cards & System Building Blocks',
    },
    labs: {
      eyebrow: 'iTHREE LABS // RESEARCH & ENGINEERING',
      title: 'iThree Labs — Research, Prototypes & Intelligence Architecture',
      description:
        'The research and engineering division of iThreeLab. Home to the I3 Intelligence Core, the public Economics Synthetic Lab, cloud blueprints, and audio research.',
      spotlight: {
        badge: 'Spotlight // I3 Intelligence Core',
        title: 'Five core modules with documented operational status',
        description:
          'Audio, Motion, Canvas, and Guardian run in MusicChain. Economics is the public Synthetic Lab; open roadmap items remain clearly labeled.',
        ctaCore: 'Open /labs/intelligence',
        ctaEconomics: 'Economics Lab',
      },
      researchAreasHeading: 'Research & Engineering Areas',
      experimentalHeading: 'Experimental Projects & Prototypes',
      experimentalDescription:
        'Filter by documented development stage — without hidden live claims.',
      filterAriaLabel: 'Filter project status',
    },
    intelligenceCore: {
      backToLabs: 'Back to iThree Labs',
      eyebrow: 'LABS // I3 INTELLIGENCE CORE',
      title: 'I3 Intelligence Core — Modular System Architecture',
      description:
        'Five core modules with documented operational status. Audio, Motion, Canvas, and Guardian run in MusicChain, Economics as a public Synthetic Lab. Unverified capabilities remain labeled.',
      transparencyNote:
        'Transparency note: Audio, Motion, and Canvas run in MusicChain as MVPs. Economics is online on iThreeLab as a Synthetic Lab and does not write to ledgers. I3 Guardian runs fail-closed across account, upload, studio, interactions, rewards, live, and trading.',
      filterPrompt: 'Filter modules by status',
      filterAriaLabel: 'Filter core modules',
      inputLabel: 'Input: ',
      outputLabel: 'Output: ',
    },
    studio: {
      eyebrow: 'iTHREE STUDIO // CREATIVE AI FOUNDATION',
      title: 'iThree Studio — MusicChain MVPs and open development',
      description:
        'Audio Processing, Automatic Clipping, and cover graphics run in MusicChain. This page shows the operational status and does not process files itself.',
      statusNotice:
        'Product status: audio, clipping, and covers are online in MusicChain. Cue points, beat-accurate raw-video cuts, generative images, and a durable release package remain in development. This page has no upload and no simulated processing.',
      capabilitiesHeading: 'Creative AI Tools & Studio Areas',
      blueprintsHeading: 'Creator Workflows // Operational status',
      blueprintsSubtitle:
        'Select a workflow to see what already runs in MusicChain and what remains in development.',
      blueprintsTablistAria: 'Studio Workflow Blueprints',
      inspectCore: 'Inspect Intelligence Core',
      blueprintWord: ' Blueprint',
    },
    technology: {
      eyebrow: 'TECHNOLOGY // ARCHITECTURE & STACK',
      title: 'Technology & Architecture — From backend to static delivery',
      description:
        'Technical foundation across the entire iThreeLab ecosystem: Python/Flask, React/TypeScript, MariaDB/SQLAlchemy, WebRTC, Google Cloud, REST APIs, and automated testing.',
      filterPrompt: 'Filter architecture layer',
      filterAriaLabel: 'Technology layers',
      caddyHeading: 'Static Production Delivery via Caddy',
      caddyBodyBefore: 'The ',
      caddyBodyMiddle: ' web portal is built as a static Vite bundle (',
      caddyBodyAfter:
        ') and served via Caddy. In production, no additional Node.js processes and no direct database or backend dependencies are required.',
    },
    about: {
      eyebrow: 'VISION // ABOUT iThreeLab',
      title: 'iThreeLab as a connected ecosystem of music, code, and intelligent technology',
      description:
        'Instead of isolated single projects, iThreeLab unites creative identity, custom platform infrastructure, and long-term research in one shared structure.',
      connections: [
        {
          id: 'conn-music',
          title: 'Music as the Origin',
          tone: 'universe',
          text: 'I3LACKOUT forms the artistic foundation — electronic releases, sound design, and live energy define what technologies are built for in the ecosystem.',
        },
        {
          id: 'conn-dev',
          title: 'Software Engineering & Platforms',
          tone: 'labs',
          text: 'From Python/Flask backends and relational data modeling to modern React TypeScript frontends, all core building blocks are engineered independently.',
        },
        {
          id: 'conn-intel',
          title: 'Measured Intelligent Systems',
          tone: 'studio',
          text: 'iThree Labs and iThree Studio show the operational status: audio, clipping, and covers run in MusicChain as MVPs. Open capabilities stay labeled.',
        },
      ],
      bridge: {
        badge: 'BRIDGE // I3LACKOUT DEVELOPER UNIVERSE',
        title: 'Direct Connection to the I3LACKOUT Developer Universe',
        descriptionBefore:
          'The personal developer profile, documented milestones, and project gallery of ',
        descriptionMiddle: ' are anchored in the standalone frontend at ',
        descriptionAfter: '.',
        ctaDeveloper: 'Open I3LACKOUT Developer Universe',
        ctaEcosystem: 'Go to Ecosystem',
      },
    },
    economicsLab: {
      backToLabs: 'Back to iThree Labs',
      eyebrow: 'LABS // I3 ECONOMICS INTELLIGENCE',
      title: 'Economics Lab — Synthetic Simulator & Intelligence API',
      description:
        'Analyze McCC, FUEL, and GAS, simulate pricing, and forecast resources. Synthetic scenarios are computed in the browser or with I3 Economics Intelligence. ITC is accounted separately and is not a resource equivalent.',
      status: {
        serverAvailable: 'Server computation available. Check connection or run a scenario.',
        offlineActive: 'Offline Synthetic Simulator active (static mode without backend dependency).',
        apiConnectedBadge: 'Economics API connected',
        offlineBadge: 'Offline Synthetic Mode',
        intelligenceLabel: 'I3 Economics Intelligence',
        browserLabel: 'Browser Simulation',
        unexpectedHealth: 'Unexpected health response.',
        connectedPrefix: 'Connected to',
        unreachableWithReasonPrefix: 'Economics API unreachable (',
        unreachableWithReasonSuffix: ') — Offline Synthetic Simulator remains active.',
        unreachableFallback: 'Economics API unreachable — Offline Synthetic Simulator remains active.',
        computedRemote: 'Scenario computed with i3 Economics Intelligence.',
        remoteFailedPrefix: 'Remote call failed (',
        remoteFailedFallback: 'Remote call failed.',
        previewVerified: 'Read-Only Synthetic Preview verified from local lab.',
        previewFailed: 'Synthetic Preview could not be loaded.',
      },
      buttons: {
        checkHealth: 'Check API connection',
        runRemote: 'Compute with Intelligence',
      },
      tabsAriaLabel: 'Economics Simulator Modes',
      tabs: {
        resources: 'Resource Analysis',
        pricing: 'Pricing Simulator',
        forecast: 'Resource Forecast',
      },
      inputsHeading: 'Synthetic Input Parameters',
      inputs: {
        balanceSuffix: 'Balance',
        basePrice: 'Base Price',
        resource: 'Resource',
        membershipDiscount: 'Membership Discount (0–1)',
        participationScore: 'Participation Score (0–1)',
        maxDiscountCap: 'Max Total Discount Cap (0–1)',
        currentBalance: 'Current Balance',
        horizonDays: 'Horizon (Days, 1–365)',
        dailyInflow: 'Daily Inflow',
        dailyOutflow: 'Daily Outflow',
        reserveThreshold: 'Reserve Threshold',
      },
      errors: {
        basePricePositive: 'Base price must be greater than 0.',
        ratesRange: 'Discounts and Participation Score must be between 0 and 1.',
        capExceeded: 'Combined maximum discounts must not exceed the policy cap.',
      },
      results: {
        serverHeading: 'Server Result · Synthetic',
        browserHeading: 'Browser Result · Synthetic',
        apiBadge: 'Intelligence API',
        browserBadge: 'In-Browser',
        totalUnits: 'Total Units',
        dominant: 'Dominant',
        finalPrice: 'Final Price',
        effectiveDiscount: 'Effective Discount',
        discountAmount: 'Discount Amount',
        capActive: 'Cap active',
        yes: 'Yes',
        no: 'No',
        projectedBalance: 'Projected Balance',
        netDailyFlow: 'Net Daily Flow',
        netChange: 'Net Change',
        reserveBreached: 'Reserve breached',
      },
      devPreview: {
        eyebrow: 'Optional // Authenticated Synthetic Preview',
        title: 'Loopback test with I3_ECONOMICS_LOCAL_TOKEN',
        descriptionBefore: 'For local development with a running ',
        descriptionAfter:
          ' server on port 8765. The token stays exclusively in volatile React state and is never persisted.',
        placeholder: 'I3_ECONOMICS_LOCAL_TOKEN (min. 32 chars)',
        ariaLabel: 'I3 Economics Local Token',
        button: 'Load Synthetic Preview',
        boundary:
          'Boundary: No production user balances, no ledger writes, no payment data.',
      },
    },
  },
};
