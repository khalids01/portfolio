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
// Each skill has a stable slug used as the database identity (unique per
// profile). The display name may change without breaking relationships.
// `icon` is a public browser path under /icons, or null when no dedicated
// icon file exists yet (do not substitute unrelated icons).
export type PortfolioSkillDefinition = {
  slug: string;
  name: string;
  category: SkillCategory;
  icon: string | null;
};

export const SKILL = {
  // Languages
  TYPESCRIPT: {
    slug: "typescript",
    name: "TypeScript",
    category: SKILL_CATEGORY.LANGUAGES,
    icon: "/icons/typescript.svg",
  },
  JAVASCRIPT: {
    slug: "javascript",
    name: "JavaScript",
    category: SKILL_CATEGORY.LANGUAGES,
    icon: "/icons/javascript.svg",
  },
  PHP: {
    slug: "php",
    name: "PHP",
    category: SKILL_CATEGORY.LANGUAGES,
    icon: "/icons/php.svg",
  },
  ELIXIR: {
    slug: "elixir",
    name: "Elixir",
    category: SKILL_CATEGORY.LANGUAGES,
    icon: "/icons/elixir.svg",
  },

  // Frontend
  REACT: {
    slug: "react",
    name: "React",
    category: SKILL_CATEGORY.FRONTEND,
    icon: "/icons/react.svg",
  },
  NEXTJS: {
    slug: "nextjs",
    name: "Next.js",
    category: SKILL_CATEGORY.FRONTEND,
    icon: "/icons/nextdotjs.svg",
  },
  REACT_NATIVE: {
    slug: "react-native",
    name: "React Native",
    category: SKILL_CATEGORY.FRONTEND,
    icon: "/icons/react-native.svg",
  },
  SVELTEKIT: {
    slug: "sveltekit",
    name: "SvelteKit",
    category: SKILL_CATEGORY.FRONTEND,
    icon: "/icons/svelte.svg",
  },
  TANSTACK_QUERY: {
    slug: "tanstackquery",
    name: "TanStack Query",
    category: SKILL_CATEGORY.FRONTEND,
    icon: "/icons/tanstackquery.svg",
  },
  TANSTACK_ROUTER: {
    slug: "tanstack-router",
    name: "TanStack Router",
    category: SKILL_CATEGORY.FRONTEND,
    icon: null,
  },
  TAILWIND_CSS: {
    slug: "tailwindcss",
    name: "Tailwind CSS",
    category: SKILL_CATEGORY.FRONTEND,
    icon: "/icons/tailwindcss.svg",
  },

  // Backend
  NODEJS: {
    slug: "nodejs",
    name: "Node.js",
    category: SKILL_CATEGORY.BACKEND,
    icon: "/icons/nodedotjs.svg",
  },
  BUN: {
    slug: "bun",
    name: "Bun",
    category: SKILL_CATEGORY.BACKEND,
    icon: "/icons/bun.svg",
  },
  ELYSIA: {
    slug: "elysia",
    name: "Elysia.js",
    category: SKILL_CATEGORY.BACKEND,
    icon: "/icons/elysia.svg",
  },
  FASTIFY: {
    slug: "fastify",
    name: "Fastify",
    category: SKILL_CATEGORY.BACKEND,
    icon: "/icons/fastify.svg",
  },
  NESTJS: {
    slug: "nestjs",
    name: "NestJS",
    category: SKILL_CATEGORY.BACKEND,
    icon: "/icons/nestjs.svg",
  },
  EXPRESS: {
    slug: "express",
    name: "Express.js",
    category: SKILL_CATEGORY.BACKEND,
    icon: "/icons/express.svg",
  },
  PHOENIX: {
    slug: "phoenix",
    name: "Phoenix",
    category: SKILL_CATEGORY.BACKEND,
    icon: "/icons/phoenixframework.svg",
  },
  REST_APIS: {
    slug: "rest-apis",
    name: "REST APIs",
    category: SKILL_CATEGORY.BACKEND,
    icon: null,
  },
  WEBSOCKETS: {
    slug: "websockets",
    name: "WebSockets",
    category: SKILL_CATEGORY.BACKEND,
    icon: null,
  },

  // Database & Data
  POSTGRESQL: {
    slug: "postgresql",
    name: "PostgreSQL",
    category: SKILL_CATEGORY.DATABASE_DATA,
    icon: "/icons/postgresql.svg",
  },
  MYSQL: {
    slug: "mysql",
    name: "MySQL",
    category: SKILL_CATEGORY.DATABASE_DATA,
    icon: "/icons/mysql.svg",
  },
  MARIADB: {
    slug: "mariadb",
    name: "MariaDB",
    category: SKILL_CATEGORY.DATABASE_DATA,
    icon: "/icons/mariadb.svg",
  },
  SQLITE: {
    slug: "sqlite",
    name: "SQLite",
    category: SKILL_CATEGORY.DATABASE_DATA,
    icon: null,
  },
  MONGODB: {
    slug: "mongodb",
    name: "MongoDB",
    category: SKILL_CATEGORY.DATABASE_DATA,
    icon: "/icons/mongodb.svg",
  },
  REDIS: {
    slug: "redis",
    name: "Redis",
    category: SKILL_CATEGORY.DATABASE_DATA,
    icon: "/icons/redis.svg",
  },
  PRISMA: {
    slug: "prisma",
    name: "Prisma",
    category: SKILL_CATEGORY.DATABASE_DATA,
    icon: "/icons/prisma.svg",
  },
  DRIZZLE: {
    slug: "drizzle",
    name: "Drizzle",
    category: SKILL_CATEGORY.DATABASE_DATA,
    icon: "/icons/drizzle.svg",
  },
  TYPEORM: {
    slug: "typeorm",
    name: "TypeORM",
    category: SKILL_CATEGORY.DATABASE_DATA,
    icon: "/icons/typeorm.svg",
  },
  MONGOOSE: {
    slug: "mongoose",
    name: "Mongoose",
    category: SKILL_CATEGORY.DATABASE_DATA,
    icon: "/icons/mongoose.svg",
  },

  // DevOps & Cloud
  AWS: {
    slug: "aws",
    name: "AWS (RDS, ElastiCache, S3, EC2)",
    category: SKILL_CATEGORY.DEVOPS_CLOUD,
    icon: "/icons/amazonaws.svg",
  },
  DOCKER: {
    slug: "docker",
    name: "Docker & Docker Compose",
    category: SKILL_CATEGORY.DEVOPS_CLOUD,
    icon: "/icons/docker.svg",
  },
  LINUX_SERVER_OPS: {
    slug: "linux-server-ops",
    name: "Linux Server Operations",
    category: SKILL_CATEGORY.DEVOPS_CLOUD,
    icon: "/icons/linux.svg",
  },
  CI_CD: {
    slug: "ci-cd",
    name: "CI/CD",
    category: SKILL_CATEGORY.DEVOPS_CLOUD,
    icon: "/icons/githubactions.svg",
  },
  GRAFANA: {
    slug: "grafana",
    name: "Grafana",
    category: SKILL_CATEGORY.DEVOPS_CLOUD,
    icon: "/icons/grafana.svg",
  },
  VERCEL: {
    slug: "vercel",
    name: "Vercel",
    category: SKILL_CATEGORY.DEVOPS_CLOUD,
    icon: "/icons/vercel.svg",
  },
  DOKPLOY: {
    slug: "dokploy",
    name: "Dokploy",
    category: SKILL_CATEGORY.DEVOPS_CLOUD,
    icon: null,
  },

  // FinTech / Blockchain
  SOLANA: {
    slug: "solana",
    name: "Solana Web3.js / RPC",
    category: SKILL_CATEGORY.FINTECH_BLOCKCHAIN,
    icon: "/icons/solana.svg",
  },
  JUPITER: {
    slug: "jupiter",
    name: "Jupiter DEX",
    category: SKILL_CATEGORY.FINTECH_BLOCKCHAIN,
    icon: "/icons/jupiter.svg",
  },
  BINANCE: {
    slug: "binance",
    name: "Binance API",
    category: SKILL_CATEGORY.FINTECH_BLOCKCHAIN,
    icon: "/icons/binance.svg",
  },
  KUCOIN: {
    slug: "kucoin",
    name: "KuCoin API",
    category: SKILL_CATEGORY.FINTECH_BLOCKCHAIN,
    icon: "/icons/kucoin.svg",
  },
  COINBASE: {
    slug: "coinbase",
    name: "Coinbase API",
    category: SKILL_CATEGORY.FINTECH_BLOCKCHAIN,
    icon: "/icons/coinbase.svg",
  },
  DYDX: {
    slug: "dydx",
    name: "dYdX",
    category: SKILL_CATEGORY.FINTECH_BLOCKCHAIN,
    icon: null,
  },
  CIRCLE: {
    slug: "circle",
    name: "Circle USDC / Arc",
    category: SKILL_CATEGORY.FINTECH_BLOCKCHAIN,
    icon: null,
  },
  ETHEREUM: {
    slug: "ethereum",
    name: "Ethereum / EVM",
    category: SKILL_CATEGORY.FINTECH_BLOCKCHAIN,
    icon: null,
  },
  SOLIDITY: {
    slug: "solidity",
    name: "Solidity",
    category: SKILL_CATEGORY.FINTECH_BLOCKCHAIN,
    icon: null,
  },
  FOUNDRY: {
    slug: "foundry",
    name: "Foundry / Anvil",
    category: SKILL_CATEGORY.FINTECH_BLOCKCHAIN,
    icon: null,
  },

  // Engineering
  SYSTEM_DESIGN: {
    slug: "system-design",
    name: "System Design",
    category: SKILL_CATEGORY.ENGINEERING,
    icon: "/icons/system-design.svg",
  },
  CLEAN_ARCHITECTURE: {
    slug: "clean-architecture",
    name: "Clean Architecture",
    category: SKILL_CATEGORY.ENGINEERING,
    icon: "/icons/clean-architecture.svg",
  },
  REAL_TIME_SYSTEMS: {
    slug: "real-time-systems",
    name: "Real-Time Systems",
    category: SKILL_CATEGORY.ENGINEERING,
    icon: null,
  },
  EVENT_DRIVEN_ARCHITECTURE: {
    slug: "event-driven-architecture",
    name: "Event-Driven Architecture",
    category: SKILL_CATEGORY.ENGINEERING,
    icon: null,
  },
  PERFORMANCE_OPTIMIZATION: {
    slug: "performance-optimization",
    name: "Performance Optimization",
    category: SKILL_CATEGORY.ENGINEERING,
    icon: "/icons/performance-optimization.svg",
  },
  API_SECURITY: {
    slug: "api-security",
    name: "API Security",
    category: SKILL_CATEGORY.ENGINEERING,
    icon: "/icons/api-security.svg",
  },
} satisfies Record<string, PortfolioSkillDefinition>;

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
// Genuinely reused project tags (2+ projects). See portfolio-constants for the
// rule: only values repeated across many project files are constantized.
// ---------------------------------------------------------------------------
export const PROJECT_TAG = {
  FINTECH: "FinTech",
  PAYMENTS: "Payments",
  HEALTHTECH: "HealthTech",
  ENTERPRISE_SAAS: "Enterprise SaaS",
  JOBTECH: "JobTech",
  ECOMMERCE: "Ecommerce",
  OPEN_SOURCE: "Open Source",
  PRODUCTION: "Production",
  FULL_STACK: "Full Stack",
  ALGORITHMIC_TRADING: "Algorithmic Trading",
  MARKET_INTELLIGENCE: "Market Intelligence",
  STABLECOINS: "Stablecoins",
  TREASURY: "Treasury",
  RECONCILIATION: "Reconciliation",
} as const;

// ---------------------------------------------------------------------------
// Shared status badges (reused across 2+ projects).
// One-off, project-specific badges stay inline in the project seed.
// ---------------------------------------------------------------------------
export const PROJECT_STATUS = {
  ACTIVE_RND: "Active R&D",
  PRODUCTION_USED: "Production Used",
} as const;
