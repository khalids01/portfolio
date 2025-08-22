# Portfolio Landing Page Plan (Header + Hero)

## Objectives
- Build a clean, maintainable, reusable, and responsive landing page using shadcn/ui + Tailwind.
- Prefer Server Components; use Client components for animations, interactivity, and 3D only.
- Scope: Header and Hero sections only.

## Tech & Libraries
- UI: shadcn/ui components
- Animations: motion (framer-motion v12)
- 3D: react-three-fiber + drei (OrbitControls)
- Icons for skills: lucide-react (placeholder for real logos)
- Data: Prisma via a server function

## Information Architecture
- Route: `/` → `src/app/page.tsx` (Server Component)
- Composition:
  - Header (Server): `src/components/core/site-header.tsx`
    - AnimatedName (Client): `src/components/core/animated-name.tsx`
  - Hero (Server wrapper): `src/features/landing/hero.tsx`
    - Left (Server): greeting, name, title, short bio (fetched via server function)
    - Right (Client): SkillSphere 3D with OrbitControls `src/components/core/skill-sphere.tsx`
  - Snowfall (Client, page-level overlay): `src/components/core/snowfall.tsx`

## Data Model & Fetching
- Server function: `src/features/landing/data.ts` → `getLandingData()`
  - Reads from Prisma:
    - User.profile.fullName (name)
    - Profile.headline (title)
    - Profile.bio (short bio)
    - Skills: `Skill.name` array (optional)
  - Fallbacks if data missing:
    - name: from `User.name || Profile.fullName || "Your Name"`
    - title: "Software Engineer"
    - bio: brief default sentence
    - skills: curated defaults mapped to lucide icons

## Components
- site-header (Server)
  - Layout: sticky top, container, left: AnimatedName, right: minimal nav/actions (optional)
  - Uses shadcn/ui primitives for structure and theme consistency
  - If logged in: show a user dropdown on the right
    - In dropdown: show "Admin Dashboard" link only if user role is ADMIN
- animated-name (Client)
  - Motion-based subtle entrance + shimmering/gradient text animation
  - Accessible: respects `prefers-reduced-motion`
- hero (Server)
  - Layout: responsive 2-column grid
    - Left column: large heading stack with greeting, name, title, and bio
    - Right column: SkillSphere
- skill-sphere (Client)
  - R3F Canvas with a single sphere
  - Place lucide icons as sprites/billboards distributed on sphere surface
  - Rotation animation + drei’s OrbitControls (enabled)
  - Lazy loaded via `next/dynamic` with `ssr: false`
  - Responsive sizing; contains within parent, maintains performance
- snowfall (Client)
  - Lightweight canvas-based falling particles across page background
  - Runs behind content with pointer-events none
  - Respects `prefers-reduced-motion`

## Styling & Layout
- Use Tailwind + shadcn/ui; simple container and spacing
- Responsive breakpoints: sm, md, lg
- Avoid unnecessary wrapper tags; only semantic sections: `header`, `main`, `section`

## Accessibility
- Reduced motion support for AnimatedName, SkillSphere rotation, and Snowfall
- Sufficient contrast, semantic HTML, aria labels on interactive 3D region

## Performance
- Dynamic import for heavy client components: SkillSphere and Snowfall
- Keep 3D draw calls minimal (single sphere + sprites)
- Memoize icon textures

## Files to Create
- `src/app/page.tsx` (Server)
- `src/components/core/site-header.tsx` (Server)
- `src/components/core/animated-name.tsx` (Client)
- `src/components/core/snowfall.tsx` (Client)
- `src/components/core/skill-sphere.tsx` (Client)
- `src/features/landing/hero.tsx` (Server)
- `src/features/landing/data.ts` (Server function)

## Acceptance Criteria
- Header at top with animated name (client component) and clean layout
- Hero shows left text (greeting, name, title, bio) using server-fetched data
- Right shows one rotating sphere with lucide icons and OrbitControls
- Snow-like background effect visible behind content
- Page is responsive (mobile/tablet/desktop)
- Codebase respects Server/Client separation per rules
