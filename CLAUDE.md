# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Pocket Heist is a Next.js application for managing "heists" - tiny office missions/pranks. The app uses Next.js 16 with the App Router, React 19, TypeScript, Tailwind CSS v4, and Vitest for testing.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm build

# Start production server
npm start

# Run linter
npm run lint

# Run all tests in watch mode
npm test

# Run tests once
npm run test -- --run

# Run specific test file
npm test -- path/to/test.test.tsx
```

## Architecture

### Route Structure

The app uses Next.js App Router with route groups for layout organization:

- **`(public)/`** - Unauthenticated pages (login, signup, preview)
  - Layout: Simple wrapper with `.public` class
  - Routes: `/login`, `/signup`, `/preview`

- **`(dashboard)/`** - Authenticated pages with navbar
  - Layout: Includes `<Navbar />` component
  - Routes:
    - `/heists` - Main heists list page
    - `/heists/create` - Create new heist form
    - `/heists/[id]` - Individual heist detail page

Both route groups share the root layout at `app/layout.tsx` which applies global metadata and styles.

### Component Organization

Components are organized in feature-based folders under `/components/`:

```
components/
  Navbar/
    Navbar.tsx
    Navbar.module.css
    index.ts
```

Each component folder contains:
- Component implementation (`.tsx`)
- CSS Module for scoped styles (`.module.css`)
- Barrel export (`index.ts`)

### Import Aliases

The project uses `@/*` path alias (configured in `tsconfig.json`) that maps to the project root:

```typescript
import Navbar from "@/components/Navbar"
import "@/app/globals.css"
```

### Testing

- Framework: Vitest with React Testing Library
- Test files location: `tests/` directory mirroring component structure
- Environment: jsdom
- Setup: Global test utilities configured in `vitest.setup.ts`
- Globals enabled: `describe`, `it`, `expect` available without imports

Example test path: `tests/components/Navbar.test.tsx`

### Styling

- Tailwind CSS v4 with PostCSS
- CSS Modules for component-specific styles
- Global styles in `app/globals.css`
- Module naming: `ComponentName.module.css`

### TypeScript Configuration

- Target: ES2017
- JSX runtime: `react-jsx` (no React imports needed)
- Strict mode enabled
- Vitest globals types included

### Additional coding preferences
 - Do NOT use semicolomn for JavaScript or TypeScript code.
 - Do NOT apply tailwind classes directly in component templates unless essential or just 1 at most. If an element needs more than a single tailwind class, combine them into a custom class using the '@apply' directive.
- Use minimal prject dependencies where possible.
- Use `git switch -c` command to switch to new branches, not `git checkout`.
