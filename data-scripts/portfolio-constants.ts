// Centralized, type-safe portfolio vocabulary.
//
// Single source of truth for category name/slug pairs, skill definitions, and
// commonly reused project tags/status badges. Seed scripts consume these so
// that editing one canonical value propagates everywhere relevant, while the
// underlying database-facing values are left unchanged.

// ---------------------------------------------------------------------------
// Project categories
// ---------------------------------------------------------------------------
export const PROJECT_CATEGORY = {
  PRODUCTION_APPS: {
    name: "Production Apps",
    slug: "production-apps",
  },
  ENTERPRISE_HEALTHTECH: {
    name: "Enterprise HealthTech",
    slug: "enterprise-healthtech",
  },
  FINTECH_BLOCKCHAIN: {
    name: "FinTech / Blockchain",
    slug: "fintech-blockchain",
  },
  SAAS_INTERNAL_TOOLS: {
    name: "SaaS / Internal Tools",
    slug: "saas-internal-tools",
  },
  ECOMMERCE: {
    name: "Ecommerce",
    slug: "ecommerce",
  },
  OPEN_SOURCE: {
    name: "Open Source",
    slug: "open-source",
  },
} as const;

export type ProjectCategory = (typeof PROJECT_CATEGORY)[keyof typeof PROJECT_CATEGORY];

// ---------------------------------------------------------------------------
// Experience categories
// ---------------------------------------------------------------------------
export const EXPERIENCE_CATEGORY = {
  FULL_TIME: {
    name: "Full-Time",
    slug: "full-time",
  },
  FREELANCE_CONTRACT: {
    name: "Freelance / Contract",
    slug: "freelance-contract",
  },
} as const;

export type ExperienceCategory =
  (typeof EXPERIENCE_CATEGORY)[keyof typeof EXPERIENCE_CATEGORY];

// ---------------------------------------------------------------------------
// Skill categories
// ---------------------------------------------------------------------------
export const SKILL_CATEGORY = {
  LANGUAGES: "Languages",
  FRONTEND: "Frontend",
  BACKEND: "Backend",
  DATABASE_DATA: "Database & Data",
  DEVOPS_CLOUD: "DevOps & Cloud",
  FINTECH_BLOCKCHAIN: "FinTech / Blockchain",
  ENGINEERING: "Engineering",
} as const;

export type SkillCategory = (typeof SKILL_CATEGORY)[keyof typeof SKILL_CATEGORY];

// ---------------------------------------------------------------------------
// Canonical skills (order = portfolio display order)
// ---------------------------------------------------------------------------
export const SKILL = {
  // Languages
  TYPESCRIPT: {
    name: "TypeScript",
    category: SKILL_CATEGORY.LANGUAGES,
  },
  JAVASCRIPT: {
    name: "JavaScript",
    category: SKILL_CATEGORY.LANGUAGES,
  },
  PHP: {
    name: "PHP",
    category: SKILL_CATEGORY.LANGUAGES,
  },
  ELIXIR: {
    name: "Elixir",
    category: SKILL_CATEGORY.LANGUAGES,
  },

  // Frontend
  REACT: {
    name: "React",
    category: SKILL_CATEGORY.FRONTEND,
  },
  NEXTJS: {
    name: "Next.js",
    category: SKILL_CATEGORY.FRONTEND,
  },
  REACT_NATIVE: {
    name: "React Native",
    category: SKILL_CATEGORY.FRONTEND,
  },
  SVELTEKIT: {
    name: "SvelteKit",
    category: SKILL_CATEGORY.FRONTEND,
  },
  TANSTACK_QUERY: {
    name: "TanStack Query",
    category: SKILL_CATEGORY.FRONTEND,
  },
  TANSTACK_ROUTER: {
    name: "TanStack Router",
    category: SKILL_CATEGORY.FRONTEND,
  },
  TAILWIND_CSS: {
    name: "Tailwind CSS",
    category: SKILL_CATEGORY.FRONTEND,
  },

  // Backend
  NODEJS: {
    name: "Node.js",
    category: SKILL_CATEGORY.BACKEND,
  },
  BUN: {
    name: "Bun",
    category: SKILL_CATEGORY.BACKEND,
  },
  ELYSIA: {
    name: "Elysia.js",
    category: SKILL_CATEGORY.BACKEND,
  },
  FASTIFY: {
    name: "Fastify",
    category: SKILL_CATEGORY.BACKEND,
  },
  NESTJS: {
    name: "NestJS",
    category: SKILL_CATEGORY.BACKEND,
  },
  EXPRESS: {
    name: "Express.js",
    category: SKILL_CATEGORY.BACKEND,
  },
  PHOENIX: {
    name: "Phoenix",
    category: SKILL_CATEGORY.BACKEND,
  },
  REST_APIS: {
    name: "REST APIs",
    category: SKILL_CATEGORY.BACKEND,
  },
  WEBSOCKETS: {
    name: "WebSockets",
    category: SKILL_CATEGORY.BACKEND,
  },

  // Database & Data
  POSTGRESQL: {
    name: "PostgreSQL",
    category: SKILL_CATEGORY.DATABASE_DATA,
  },
  MYSQL: {
    name: "MySQL",
    category: SKILL_CATEGORY.DATABASE_DATA,
  },
  MARIADB: {
    name: "MariaDB",
    category: SKILL_CATEGORY.DATABASE_DATA,
  },
  SQLITE: {
    name: "SQLite",
    category: SKILL_CATEGORY.DATABASE_DATA,
  },
  MONGODB: {
    name: "MongoDB",
    category: SKILL_CATEGORY.DATABASE_DATA,
  },
  REDIS: {
    name: "Redis",
    category: SKILL_CATEGORY.DATABASE_DATA,
  },
  PRISMA: {
    name: "Prisma",
    category: SKILL_CATEGORY.DATABASE_DATA,
  },
  DRIZZLE: {
    name: "Drizzle",
    category: SKILL_CATEGORY.DATABASE_DATA,
  },
  TYPEORM: {
    name: "TypeORM",
    category: SKILL_CATEGORY.DATABASE_DATA,
  },
  MONGOOSE: {
    name: "Mongoose",
    category: SKILL_CATEGORY.DATABASE_DATA,
  },

  // DevOps & Cloud
  AWS: {
    name: "AWS (RDS, ElastiCache, S3, EC2)",
    category: SKILL_CATEGORY.DEVOPS_CLOUD,
  },
  DOCKER: {
    name: "Docker & Docker Compose",
    category: SKILL_CATEGORY.DEVOPS_CLOUD,
  },
  LINUX_SERVER_OPS: {
    name: "Linux Server Operations",
    category: SKILL_CATEGORY.DEVOPS_CLOUD,
  },
  CI_CD: {
    name: "CI/CD",
    category: SKILL_CATEGORY.DEVOPS_CLOUD,
  },
  GRAFANA: {
    name: "Grafana",
    category: SKILL_CATEGORY.DEVOPS_CLOUD,
  },
  VERCEL: {
    name: "Vercel",
    category: SKILL_CATEGORY.DEVOPS_CLOUD,
  },
  DOKPLOY: {
    name: "Dokploy",
    category: SKILL_CATEGORY.DEVOPS_CLOUD,
  },

  // FinTech / Blockchain
  SOLANA: {
    name: "Solana Web3.js / RPC",
    category: SKILL_CATEGORY.FINTECH_BLOCKCHAIN,
  },
  JUPITER: {
    name: "Jupiter DEX",
    category: SKILL_CATEGORY.FINTECH_BLOCKCHAIN,
  },
  BINANCE: {
    name: "Binance API",
    category: SKILL_CATEGORY.FINTECH_BLOCKCHAIN,
  },
  KUCOIN: {
    name: "KuCoin API",
    category: SKILL_CATEGORY.FINTECH_BLOCKCHAIN,
  },
  COINBASE: {
    name: "Coinbase API",
    category: SKILL_CATEGORY.FINTECH_BLOCKCHAIN,
  },
  DYDX: {
    name: "dYdX",
    category: SKILL_CATEGORY.FINTECH_BLOCKCHAIN,
  },
  CIRCLE: {
    name: "Circle USDC / Arc",
    category: SKILL_CATEGORY.FINTECH_BLOCKCHAIN,
  },
  ETHEREUM: {
    name: "Ethereum / EVM",
    category: SKILL_CATEGORY.FINTECH_BLOCKCHAIN,
  },
  SOLIDITY: {
    name: "Solidity",
    category: SKILL_CATEGORY.FINTECH_BLOCKCHAIN,
  },
  FOUNDRY: {
    name: "Foundry / Anvil",
    category: SKILL_CATEGORY.FINTECH_BLOCKCHAIN,
  },

  // Engineering
  SYSTEM_DESIGN: {
    name: "System Design",
    category: SKILL_CATEGORY.ENGINEERING,
  },
  CLEAN_ARCHITECTURE: {
    name: "Clean Architecture",
    category: SKILL_CATEGORY.ENGINEERING,
  },
  REAL_TIME_SYSTEMS: {
    name: "Real-Time Systems",
    category: SKILL_CATEGORY.ENGINEERING,
  },
  EVENT_DRIVEN_ARCHITECTURE: {
    name: "Event-Driven Architecture",
    category: SKILL_CATEGORY.ENGINEERING,
  },
  PERFORMANCE_OPTIMIZATION: {
    name: "Performance Optimization",
    category: SKILL_CATEGORY.ENGINEERING,
  },
  API_SECURITY: {
    name: "API Security",
    category: SKILL_CATEGORY.ENGINEERING,
  },
} as const;

// Explicit, ordered list of portfolio skills for deterministic seeding/display.
export const SKILLS = [
  SKILL.TYPESCRIPT,
  SKILL.JAVASCRIPT,
  SKILL.PHP,
  SKILL.ELIXIR,
  SKILL.REACT,
  SKILL.NEXTJS,
  SKILL.REACT_NATIVE,
  SKILL.SVELTEKIT,
  SKILL.TANSTACK_QUERY,
  SKILL.TANSTACK_ROUTER,
  SKILL.TAILWIND_CSS,
  SKILL.NODEJS,
  SKILL.BUN,
  SKILL.ELYSIA,
  SKILL.FASTIFY,
  SKILL.NESTJS,
  SKILL.EXPRESS,
  SKILL.PHOENIX,
  SKILL.REST_APIS,
  SKILL.WEBSOCKETS,
  SKILL.POSTGRESQL,
  SKILL.MYSQL,
  SKILL.MARIADB,
  SKILL.SQLITE,
  SKILL.MONGODB,
  SKILL.REDIS,
  SKILL.PRISMA,
  SKILL.DRIZZLE,
  SKILL.TYPEORM,
  SKILL.MONGOOSE,
  SKILL.AWS,
  SKILL.DOCKER,
  SKILL.LINUX_SERVER_OPS,
  SKILL.CI_CD,
  SKILL.GRAFANA,
  SKILL.VERCEL,
  SKILL.DOKPLOY,
  SKILL.SOLANA,
  SKILL.JUPITER,
  SKILL.BINANCE,
  SKILL.KUCOIN,
  SKILL.COINBASE,
  SKILL.DYDX,
  SKILL.CIRCLE,
  SKILL.ETHEREUM,
  SKILL.SOLIDITY,
  SKILL.FOUNDRY,
  SKILL.SYSTEM_DESIGN,
  SKILL.CLEAN_ARCHITECTURE,
  SKILL.REAL_TIME_SYSTEMS,
  SKILL.EVENT_DRIVEN_ARCHITECTURE,
  SKILL.PERFORMANCE_OPTIMIZATION,
  SKILL.API_SECURITY,
] as const;

// ---------------------------------------------------------------------------
// Genuinely reused project tags (2+ projects). See taxonomy for the rule:
// only values repeated across many project files are constantized.
// ---------------------------------------------------------------------------
export const PROJECT_TAG = {
  FINTECH: "FinTech",
  PAYMENTS: "Payments",
} as const;

// ---------------------------------------------------------------------------
// Shared status badges (reused across 2+ projects).
// One-off, project-specific badges stay inline in the project seed.
// ---------------------------------------------------------------------------
export const PROJECT_STATUS = {
  ACTIVE_RND: "Active R&D",
  PRODUCTION_USED: "Production Used",
} as const;
