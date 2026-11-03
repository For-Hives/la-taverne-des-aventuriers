# 🏰 La Taverne des Aventuriers

> A modern, immersive website for La Taverne des Aventuriers, a medieval-fantasy themed game bar located in Nantes, France.

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.14-38B2AC)](https://tailwindcss.com/)

## 🎯 Overview

La Taverne des Aventuriers is a unique board game bar in Nantes offering an immersive medieval-fantasy experience. This website serves as the digital gateway to the tavern, featuring an interactive menu, event calendar, game library integration, and a playful cocktail battle game.

**Live Site:** [latavernedesaventuriers.fr](https://latavernedesaventuriers.fr)

## ✨ Key Features

### 🎮 Interactive Elements

- **Cocktail Battle**: A fun, engaging game where users vote for their favorite cocktails
- **Animated Navigation**: Smooth scroll navigation with floating dock menu
- **Rive Animations**: High-quality knight animations for enhanced user experience
- **Responsive Design**: Optimized for all devices from mobile to desktop

### 📱 Pages & Sections

- **Landing Page**: Hero section with immersive video background and medieval aesthetics
- **Menu (Carte)**: Complete drinks menu with cocktails, mocktails, beers, wines, and food
- **Events**: Timeline of upcoming events with featured highlights
- **Game Library**: Integration with MyLudo for browsing available board games
- **Contact**: Interactive map and contact information
- **Reservation**: Direct booking integration
- **About Us**: Story and mission of the tavern

### 🎨 Design & UX

- Medieval-fantasy themed UI with custom fonts (Cardinal, Cardo, KC Obra Letra)
- Custom texture backgrounds and decorative elements
- Smooth animations using GSAP and Framer Motion
- SEO optimized with structured data and metadata
- Progressive Web App ready with manifest and favicons

## 🛠️ Tech Stack

### Core Framework

- **[Next.js 15.5.4](https://nextjs.org/)** - React framework with App Router
- **[React 19.2.0](https://reactjs.org/)** - Latest React with concurrent features
- **[TypeScript 5.9.3](https://www.typescriptlang.org/)** - Type-safe development

### Styling & UI

- **[Tailwind CSS 4.1.14](https://tailwindcss.com/)** - Utility-first CSS framework
- **[FontAwesome 7.1.0](https://fontawesome.com/)** - Icon library
- **[Lucide React](https://lucide.dev/)** - Additional icon set
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[GSAP](https://greensock.com/gsap/)** - Advanced animations

### Backend & Data

- **[PocketBase 0.26.2](https://pocketbase.io/)** - Backend as a service
- Server-side data fetching with Next.js Server Actions
- Secure API routes with revalidation strategies

### Animation & Media

- **[Rive](https://rive.app/)** - Advanced interactive animations
- **[Vimeo Player](https://github.com/vimeo/player.js)** - Video integration
- Next.js Image optimization

### Development Tools

- **[Biome](https://biomejs.dev/)** - Fast linter and formatter (ESLint + Prettier replacement)
- **[pnpm](https://pnpm.io/)** - Efficient package manager
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight state management

## 📦 Installation

### Prerequisites

- Node.js `^18.20.2 || >=20.9.0`
- pnpm `^9 || ^10`

### Setup

1. **Clone the repository**

```bash
git clone <repository-url>
cd la-taverne-des-aventuriers
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Environment variables**
Create a `.env.local` file with required variables (contact the team for credentials)

4. **Run development server**

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🚀 Development

### Available Scripts

```bash
# Start development server with Turbopack
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Format code with Biome
pnpm format

# Lint code with Biome
pnpm lint

# Run both format and lint
pnpm check

# Type checking
pnpm tsc
```

### Tests (filet anti-régression)

| Commande | Ce qu'elle vérifie |
| --- | --- |
| `pnpm test:unit` | Unitaires (utilitaires, sitemap, extraction de l'instantané) et intégration des services PocketBase contre un faux PocketBase |
| `pnpm build:ci && pnpm test` | Unitaires + test de fumée HTTP sur données factices |
| `pnpm test:visuel:docker` | e2e (navigation, liens, SEO, robots, sitemap) et **non-régression visuelle au pixel près** de toutes les pages publiques, bureau et téléphone, dans l'image Docker officielle de Playwright (la même qu'en CI) |
| `pnpm test:visuel:maj` | Régénère les captures de référence (`tests/e2e/captures/`) après un changement d'interface voulu |
| `pnpm instantane:extraire` | Recapture l'instantané des données depuis la production (`tests/instantane/`), en lecture seule |

Les tests visuels tournent sur des données figées : `tests/instantane/pocketbase.json` (+ images) est servi par
`scripts/fake-pocketbase.mjs` (`PB_INSTANTANE`), et la date du serveur est figée (`scripts/instantane/figer-date.mjs`).
Seules les captures produites dans Docker font référence : ne pas les régénérer hors de `pnpm test:visuel:maj`.

### Code Quality

This project uses **Biome** for code quality, which provides:

- ⚡ Lightning-fast linting (ESLint replacement)
- 🎨 Automatic code formatting (Prettier replacement)
- 🔒 Type-safe imports and exports
- 📝 Consistent code style across the project

Run checks before committing:

```bash
pnpm check
```

## 📁 Project Structure

```
la-taverne-des-aventuriers/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── actions/              # Server Actions
│   │   │   ├── services/         # Data fetching services
│   │   │   └── AuthService.ts    # Authentication
│   │   ├── fonts/                # Custom font files
│   │   ├── styles/               # Global styles
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Home page
│   │   ├── carte/                # Menu page
│   │   ├── evenements/           # Events page
│   │   ├── bibliotheque-de-jeux/ # Game library
│   │   ├── contact/              # Contact page
│   │   ├── reservation/          # Reservation page
│   │   └── battle/               # Cocktail battle game
│   ├── components/               # React components
│   │   ├── Global/               # Shared components (Navbar, Footer, etc.)
│   │   ├── Landing/              # Landing page components
│   │   ├── Menu/                 # Menu-related components
│   │   ├── Events/               # Event components
│   │   ├── Contact/              # Contact page components
│   │   ├── CocktailBattle/       # Battle game components
│   │   ├── animation/            # Animation components
│   │   └── ui/                   # Reusable UI components
│   ├── lib/                      # Utilities and helpers
│   └── utils/                    # Additional utilities
├── public/                       # Static assets
│   └── assets/
│       ├── images/               # Images and graphics
│       ├── videos/               # Video files
│       ├── icons/                # Favicons and PWA icons
│       └── animation/            # Rive animation files
├── biome.json                    # Biome configuration
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── nixpacks.toml                 # Deployment configuration
```

## 🌐 Deployment

The project is optimized for deployment with **Nixpacks**. Configuration is available in `nixpacks.toml`.

### Production Build

```bash
# Create optimized production build
pnpm build

# Test production build locally
pnpm start
```

### Environment Variables

Ensure all required environment variables are set in your deployment platform:

- PocketBase connection details
- API keys for third-party services
- Analytics tracking IDs

## 🎨 Design System

### Fonts

- **Cardinal**: Medieval-style display font for headings
- **Cardo**: Elegant serif font for body text
- **KC Obra Letra**: Hand-drawn style for decorative text

### Color Palette

- **Brown tones**: Primary text and backgrounds
- **Red accents**: Call-to-action and highlights
- **Cream/White**: Light backgrounds and overlays

### Responsive Breakpoints

Following Tailwind's default breakpoints:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 🔒 Security & Performance

- Server-side data fetching for sensitive operations
- Image optimization with Next.js Image component
- Lazy loading and code splitting
- ISR (Incremental Static Regeneration) with 10-second revalidation
- Secure PocketBase integration (server-side only)
- SEO optimization with metadata and structured data

## 🤝 Contributing

1. Follow the existing code style (enforced by Biome)
2. Write type-safe code (TypeScript strict mode enabled)
3. Test across different devices and browsers
4. Run `pnpm check` before committing
5. Keep components modular and reusable

## 📄 License

All rights reserved - La Taverne des Aventuriers © 2025

## 👥 Team

**Developed & Designed with ❤️ by [Andy Cinquin](https://andy-cinquin.fr/)**

---

For questions or support, visit [La Taverne des Aventuriers](https://latavernedesaventuriers.fr/contact)
