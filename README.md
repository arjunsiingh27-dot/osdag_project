# 🏗️ GirderFlow Dynamics — Osdag Project

> A modern web frontend for steel structure design, built as part of the [Osdag](https://osdag.fossee.in/) ecosystem.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Firebase-orange?style=for-the-badge&logo=firebase)](https://girderflow-dynamics-f0e63.web.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-98%25-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg?style=for-the-badge)](https://www.gnu.org/licenses/lgpl-3.0)

---

## 🌐 Live Site

**[https://girderflow-dynamics-f0e63.web.app](https://girderflow-dynamics-f0e63.web.app)**

Deployed on **Firebase Hosting** — available on all modern browsers, no installation required.

---

## 📋 Table of Contents

- [About](#-about)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Scripts](#-scripts)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📖 About

**GirderFlow Dynamics** is the web-based frontend of the Osdag project — a cross-platform, free/libre, open-source platform for the design and detailing of steel structures following the Indian Standard **IS 800:2007**.

This application provides:
- A clean, responsive UI for configuring steel connection parameters
- Interactive data visualisation via charts
- Form-driven design input with full schema validation
- Accessible, component-driven interface built on Radix UI primitives

The project was scaffolded using [Lovable](https://lovable.dev), an AI-powered React app builder, and extended with a full TypeScript + Vite stack.

---

## 🛠️ Tech Stack

### Core

| Technology | Version | Purpose |
|---|---|---|
| React | 18.3.1 | UI framework |
| TypeScript | 5.8.3 | Type safety |
| Vite | 5.4.19 | Build tool & dev server |
| React Router DOM | 6.30.1 | Client-side routing |
| TanStack React Query | 5.83.0 | Server state & data fetching |

### UI & Styling

| Technology | Version | Purpose |
|---|---|---|
| Tailwind CSS | 3.4.17 | Utility-first styling |
| shadcn/ui | — | Component library (built on Radix UI) |
| Radix UI | various | Accessible headless UI primitives |
| Lucide React | 0.462.0 | Icon set |
| next-themes | 0.3.0 | Dark/light theme switching |
| Recharts | 2.15.4 | Data visualisation / charts |
| Embla Carousel | 8.6.0 | Carousel / slider component |
| react-zoom-pan-pinch | 4.0.3 | Zoomable/pannable content |
| Vaul | 0.9.9 | Drawer component |
| Sonner | 1.7.4 | Toast notifications |

### Forms & Validation

| Technology | Version | Purpose |
|---|---|---|
| React Hook Form | 7.61.1 | Form state management |
| @hookform/resolvers | 3.10.0 | Validation resolver bridge |
| Zod | 3.25.76 | Schema-based validation |

### Testing & Tooling

| Technology | Version | Purpose |
|---|---|---|
| Vitest | 3.2.4 | Unit & component testing |
| Playwright | 1.57.0 | End-to-end browser testing |
| @testing-library/react | 16.0.0 | Component test utilities |
| ESLint | 9.32.0 | Code linting |
| Bun | latest | Runtime & package manager |

### Deployment

| Service | Purpose |
|---|---|
| Firebase Hosting | Static site hosting / global CDN |

---

## 🏛️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         User's Browser                          │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                  GirderFlow SPA (React 18)                 │  │
│  │                                                           │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │              Routing Layer (React Router v6)         │  │  │
│  │  │         /  •  /design  •  /results  •  /about        │  │  │
│  │  └──────────────────────┬──────────────────────────────┘  │  │
│  │                         │                                  │  │
│  │  ┌──────────────────────▼──────────────────────────────┐  │  │
│  │  │                  Page Components                     │  │  │
│  │  │           (TypeScript • React functional)            │  │  │
│  │  └───────┬──────────────────────────┬──────────────────┘  │  │
│  │          │                          │                      │  │
│  │  ┌───────▼───────┐        ┌─────────▼──────────────────┐  │  │
│  │  │  UI Layer     │        │   Data / Logic Layer        │  │  │
│  │  │               │        │                             │  │  │
│  │  │ shadcn/ui     │        │  React Hook Form + Zod      │  │  │
│  │  │ Radix UI      │        │  (form state & validation)  │  │  │
│  │  │ Tailwind CSS  │        │                             │  │  │
│  │  │ Lucide Icons  │        │  TanStack React Query       │  │  │
│  │  │ Recharts      │        │  (server state & caching)   │  │  │
│  │  │ Sonner Toasts │        │                             │  │  │
│  │  │ next-themes   │        │  Custom Hooks               │  │  │
│  │  └───────────────┘        │  (design params, calcs)     │  │  │
│  │                           └─────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────┬───────────────────────────────────┘
                              │ Served via HTTPS
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│             Firebase Hosting (Global CDN)                       │
│         index.html  •  /assets/*.js  •  /assets/*.css          │
│      girderflow-dynamics-f0e63.web.app                          │
└─────────────────────────────────────────────────────────────────┘
                              │ (future backend integration)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│            Osdag Design Engine (Python Backend)                 │
│     IS 800:2007  •  Steel Calculations  •  Connection Design    │
└─────────────────────────────────────────────────────────────────┘
```

### Layer Breakdown

**Routing Layer — React Router v6**
URL-based navigation across pages. All routes are client-side; Firebase Hosting redirects all paths to `index.html` for SPA behaviour.

**Page Components**
Top-level views rendered per route. Written as TypeScript functional components. Each page composes smaller UI and logic blocks.

**UI Component Layer — shadcn/ui + Radix UI**
Fully accessible, unstyled Radix UI primitives are wrapped in shadcn/ui components and styled with Tailwind CSS. This includes dialogs, dropdowns, tabs, sliders, toasts, and more. `components.json` controls shadcn/ui configuration.

**Data & Logic Layer**
- **React Hook Form + Zod** — form state management with schema-driven validation. All design inputs are validated before computation.
- **TanStack React Query** — handles async data fetching, caching, and background refetching.
- **Custom Hooks** — abstract reusable logic such as parameter management, design calculations, and UI state.

**Build & Tooling**
Vite with the `@vitejs/plugin-react-swc` SWC compiler provides fast HMR in development and optimised, tree-shaken bundles for production. TypeScript is enforced end-to-end via three tsconfig layers (`tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`).

**Deployment — Firebase Hosting**
The production build (`dist/`) is deployed to Firebase Hosting, served over a global CDN with automatic HTTPS.

---

## 📁 Project Structure

```
osdag_project/
├── public/                    # Static public assets (favicon, images)
├── src/                       # Application source code (TypeScript)
│   ├── components/            # Reusable UI components
│   │   └── ui/                # shadcn/ui generated components
│   ├── pages/                 # Route-level page components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility functions (cn, formatters, etc.)
│   └── main.tsx               # React app entry point
├── index.html                 # HTML shell (Vite entry point)
├── components.json            # shadcn/ui configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── postcss.config.js          # PostCSS configuration
├── vite.config.ts             # Vite build configuration
├── vitest.config.ts           # Vitest unit test configuration
├── playwright.config.ts       # Playwright E2E configuration
├── playwright-fixture.ts      # Shared Playwright test fixtures
├── eslint.config.js           # ESLint rules
├── tsconfig.json              # Root TypeScript config
├── tsconfig.app.json          # App TypeScript config
├── tsconfig.node.json         # Node/tooling TypeScript config
├── package.json               # Dependencies & npm scripts
├── bun.lock / bun.lockb       # Bun lockfiles
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+ **or** [Bun](https://bun.sh/) v1+ (recommended)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/arjunsiingh27-dot/osdag_project.git
cd osdag_project

# Install dependencies using Bun (recommended — faster)
bun install

# Or using npm
npm install
```

### Development Server

```bash
bun run dev
# or
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. The dev server supports Hot Module Replacement (HMR).

### Production Build

```bash
bun run build
# or
npm run build
```

The optimised, minified output is written to the `dist/` directory.

### Preview Production Build Locally

```bash
bun run preview
# or
npm run preview
```

---

## 📜 Scripts

| Command | Description |
|---|---|
| `bun run dev` | Start Vite dev server with HMR |
| `bun run build` | Production build → `dist/` |
| `bun run build:dev` | Development mode build |
| `bun run preview` | Serve the production build locally |
| `bun run lint` | Run ESLint across all TypeScript files |
| `bun run test` | Run Vitest unit tests once |
| `bun run test:watch` | Run Vitest in watch mode |

---

## 🧪 Testing

### Unit & Component Tests (Vitest)

```bash
# Run all unit tests once
bun run test

# Watch mode — re-runs on file change
bun run test:watch
```

Tests use `@testing-library/react` and `@testing-library/jest-dom` for DOM assertions within a `jsdom` environment.

### End-to-End Tests (Playwright)

```bash
# Install Playwright browsers (first time only)
npx playwright install

# Run all E2E tests
npx playwright test

# Run with interactive UI mode
npx playwright test --ui
```

Shared fixtures and setup live in `playwright-fixture.ts`. Configuration is in `playwright.config.ts`.

---

## 🚢 Deployment

The app is deployed to **Firebase Hosting**.

```bash
# Install Firebase CLI (if not already installed)
npm install -g firebase-tools

# Login to Firebase
firebase login

# Build and deploy
bun run build
firebase deploy
```

**Live URL:** [https://girderflow-dynamics-f0e63.web.app](https://girderflow-dynamics-f0e63.web.app)

---


## 🔗 References

- 🌐 **Live App:** [girderflow-dynamics-f0e63.web.app](https://girderflow-dynamics-f0e63.web.app)
- 💻 **Repository:** [github.com/arjunsiingh27-dot/osdag_project](https://github.com/arjunsiingh27-dot/osdag_project)
- 🏗️ **Osdag Official:** [osdag.fossee.in](https://osdag.fossee.in/)
- 📐 **IS 800:2007 Standard:** [bis.gov.in](https://www.bis.gov.in/)
- 🧩 **shadcn/ui Docs:** [ui.shadcn.com](https://ui.shadcn.com/)
- ⚡ **Vite Docs:** [vitejs.dev](https://vitejs.dev/)
