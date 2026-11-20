# iThreeLab · iThreeLab.com

**Foundation · Ecosystem · Labs · Studio — Music × Technology × Intelligence**

Offizielle Webanwendung für **iThreeLab** ([ithreelab.com](https://ithreelab.com)), die übergeordnete Dachmarke und das Technologie-Labor für **I3LACKOUT**, **musicchaini3**, **i3-economics-intelligence** und **iThree Studio**.

[![Live Website](https://img.shields.io/badge/Live-ithreelab.com-8B5CF6?style=flat-square)](https://ithreelab.com)
[![Artist](https://img.shields.io/badge/Artist-i3lackout.com-FF2020?style=flat-square)](https://i3lackout.com)
[![Platform](https://img.shields.io/badge/Platform-musicchaini3.com-00E5FF?style=flat-square)](https://musicchaini3.com)
[![Stack](https://img.shields.io/badge/React_19-TypeScript_·_Vite_·_Tailwind_v4-151520?style=flat-square)](#tech-stack)

---

## Ökosystem im Überblick

| Bereich | Rolle | Link |
| :--- | :--- | :--- |
| **iThreeLab** | Dachmarke, Architektur & Intelligence-Core | [ithreelab.com](https://ithreelab.com) |
| **I3LACKOUT** | Independent Artist & Developer Universe | [i3lackout.com](https://i3lackout.com) |
| **musicchaini3** | Streaming-, Creator-Reward- & Trust-Ökosystem | [musicchaini3.com](https://musicchaini3.com) |
| **iThree Studio** | Creative AI Workflows, Audio & Visual Foundation | `/studio` |

## Designsystem — I3 Hybrid

| Token | Farbe | Verwendung |
| :--- | :--- | :--- |
| Background | `#08090D` | Primärer Dark-Mode-Hintergrund |
| Surface | `#151520` | Karten, Panels und modulare Container |
| Text | `#F5F5FA` | Primäre Typografie (`#B4B4CC` sekundär) |
| Universe | `#8B5CF6` | Dachmarke, I3LACKOUT & Ecosystem-Navigation |
| Labs | `#00E5FF` | iThree Labs, I3 Intelligence Core & Architecture |
| Studio | `#F59E0B` | iThree Studio, Creative AI Foundation & Workflows |

## Routen

- `/` — **iThreeLab Portal** (Hero, drei zentrale Welten, interaktive Ecosystem-Navigation, Vision & Mission)
- `/ecosystem` — **Connected Ecosystem** (Markenüberblick, Zuständigkeiten, Projektkarten, validierte externe Links)
- `/labs` — **iThree Labs** (Research & Engineering, Intelligence Core, Economics Intelligence, Cloud Engineering, AI Audio Processing)
- `/labs/intelligence` — **Intelligence Core** (`I3 Audio & DJ`, `I3 Motion & Clipping`, `I3 Canvas`, `I3 Guardian`, `I3 Economics Intelligence`)
- `/labs/economics` — **Economics Lab** (Offline Synthetic Simulator & optionale Loopback-Bridge zu `i3-economics-intelligence`)
- `/studio` — **iThree Studio** (Creative AI Tools, Audio Processing, Automatic Clipping, AI Visuals & Cover Art, Creator Workflows)
- `/technology` — **Technology & Architecture** (`Python / Flask`, `React / TypeScript`, `MariaDB / SQLAlchemy`, `WebRTC`, `Google Cloud`, `REST APIs`, `Testing & CI`)
- `/about` — **About** (Vision & Verbindung zum I3LACKOUT Developer Universe)
- `/impressum` & `/datenschutz` — Vorbereitete Rechtstext-Seiten

## Tech Stack

- **Frontend:** React 19 + TypeScript (Strict Mode) + Vite
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Motion & Icons:** Motion (`motion/react`) + Lucide React
- **Routing:** React Router (`react-router-dom`)
- **Qualität & Tests:** Vitest, React Testing Library, ESLint

## Lokale Entwicklung & Qualitätssicherung

```bash
npm ci
npm run dev
```

Prüfbefehle:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## Statische Produktionsauslieferung (Caddy)

Der Build erzeugt ausschließlich statische Dateien im Verzeichnis `dist/`. Im Produktivbetrieb sind **keine** zusätzlichen Node.js-Prozesse erforderlich. Eine vorbereitete Beispielkonfiguration liegt in `Caddyfile.example` und `deploy/` bereit.

## Economics Intelligence Public Integration

Production builds enable `/api/economics-lab` with `.env.production`. The browser simulator remains available when the service is unavailable. The client maps MCCC to the engine's `McCC`, converts the normalized participation score to `0–100`, and renders server results in the metric panels. ITC is excluded from resource equivalence calculations.

`deploy/Caddyfile.economics-handlers` must run before the SPA fallback; wrap `try_files` and `file_server` in a separate `handle` block. Only health and three simulation routes are public. Developer preview tokens are not included in the production interface.

The dedicated `app.public:app` entry point uses bounded synthetic inputs and no database, account credentials, or financial mutations. Install the CPython 3.11 hash-locked bundle in its own virtual environment and use `deploy/i3-economics-intelligence.service`. The service binds `127.0.0.1:8765`, uses a dynamic user, and limits memory and concurrency. The original local lab remains available separately through `app.main:app`.
