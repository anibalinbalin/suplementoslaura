# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 14 application for personalized supplement recommendations in the Uruguay market. The app is built with TypeScript, React 18, and uses Spanish as the primary language.

## Development Commands

```bash
# Install dependencies (uses pnpm)
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

## Architecture Overview

### Core Application Flow

1. **Landing Page** (`/app/page.tsx`) → User enters the recommendation flow
2. **Multi-step Form** (`/app/pasos/*`):
   - Gender selection → Age input → Health goals → Dietary restrictions → Medications
3. **Recommendation Generation** (`/lib/recommendation-service.ts`):
   - Processes user data and generates personalized supplement recommendations
   - Considers medication interactions and synergistic effects
4. **Results Display** (`/app/resultados/page.tsx`):
   - Shows recommended supplements with dosing and timing

### Key Services and Data

- **Recommendation Service** (`/lib/recommendation-service.ts`): Core algorithm that generates personalized recommendations based on user profile
- **Supplement Data** (`/lib/examine-data-es.ts`): Comprehensive Spanish-language supplement information from Examine.com
- **User Context** (`/context/UserContext.tsx`): Manages user data throughout the multi-step form

### UI Component System

The project uses shadcn/ui components built on Radix UI primitives. Components are located in `/components/ui/` and can be customized via:
- `tailwind.config.ts` for theme colors (teal/green)
- Component variants using class-variance-authority (cva)

### Important Considerations

1. **Spanish Language**: All user-facing content should be in Spanish (es)
2. **No Testing Framework**: Currently no tests exist; consider Jest + React Testing Library for future testing
3. **Build Configuration**: ESLint and TypeScript errors are ignored during builds (see `next.config.mjs`)
4. **Form Validation**: Uses react-hook-form with Zod for schema validation
5. **State Management**: React Context API for user data; no external state management library

### Common Development Tasks

To add a new supplement to the database:
1. Edit `/lib/examine-data-es.ts`
2. Follow the existing `SupplementES` interface structure
3. Include Spanish translations for all fields

To modify the recommendation algorithm:
1. Edit `/lib/recommendation-service.ts`
2. Update the `generateRecommendations` function
3. Consider medication interactions in the `recommendationLogic` object

To add new form steps:
1. Create a new page in `/app/pasos/[step-name]/page.tsx`
2. Update navigation logic in existing step pages
3. Add the new data field to `UserContext`