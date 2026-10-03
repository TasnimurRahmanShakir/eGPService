# eGP Solution — Turborepo Monorepo

Next-generation Electronic Government & Enterprise Procurement Platform built with **Next.js 15**, **pnpm workspaces**, and **Turborepo** with a single hoisted shared `node_modules` structure.

---

## 🏗 Architecture Overview

```
egp-solution/
├── .npmrc                 # Hoisted node-linker configuration (single shared node_modules)
├── pnpm-workspace.yaml    # Workspace definition (apps/*)
├── turbo.json             # Turborepo task pipeline (build, dev, lint, start)
├── package.json           # Root package scripts and Turbo orchestrator
├── node_modules/          # Single shared node_modules for the entire repository
└── apps/
    └── web/               # Next.js 15 procurement platform website (no separate node_modules needed)
        ├── app/
        │   ├── layout.tsx
        │   ├── page.tsx   # Interactive Sandbox, Tender Matrix & ROI calculator
        │   └── globals.css# Glassmorphic dark design system
        ├── next.config.mjs
        ├── tsconfig.json
        └── package.json
```

### Key Architectural Characteristics
- **One Shared `node_modules`**: Configured via `.npmrc` with `node-linker=hoisted` and `shamefully-hoist=true`. All dependencies are centralized at the repository root, avoiding nested duplication.
- **No Other Modules**: Zero extraneous package folders or redundant boilerplate libraries—only the Next.js application workspace.
- **Turborepo Acceleration**: Atomic task pipelines with intelligent caching (`turbo run build`, `turbo run dev`).

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Start the Development Server
```bash
pnpm run dev
```
The application will launch at [http://localhost:3000](http://localhost:3000).

### 3. Build for Production
```bash
pnpm run build
```

### 4. Run Production Build
```bash
pnpm run start
```

---

## ⚡ Features Included
- **Live Tender Board**: Real-time solicitation tracker with category filters and countdown status.
- **Dynamic Bid Evaluation Simulator**: Interactive weighting slider between Technical & Financial criteria with real-time composite score re-ranking.
- **Cryptographic Audit Trail**: Immutable Merkle block hash validation simulator.
- **Interactive ROI Calculator**: Annual savings, procurement cycle reduction, and staff productivity modeling.
- **Enterprise Security Section**: OCDS, ISO 27001, SOC 2 Type II, and eIDAS compliance credentials.
- **Platform Briefing Modal**: Interactive request dialog for agency presentations.
