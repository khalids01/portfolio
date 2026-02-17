const toCamelCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Split camelCase words (e.g., SvelteKit -> Svelte Kit)
    .replace(/[^a-zA-Z0-9 ]/g, " ") // Replace non-alphanumeric with space
    .split(" ")
    .filter(Boolean)
    .map((word, index) => {
      const lowered = word.toLowerCase();
      if (index === 0) return lowered;
      return lowered.charAt(0).toUpperCase() + lowered.slice(1);
    })
    .join("");
};

export const SKILL_ICONS: Record<string, string> = {
  // Languages
  typeScript: "/icons/typescript.svg",
  javaScript: "/icons/javascript.svg",
  php: "/icons/php.svg",
  elixir: "/icons/elixir.svg",
  python: "/icons/python.svg",
  go: "/icons/go.svg",
  rust: "/icons/rust.svg",

  // Frontend
  react: "/icons/react.svg",
  reactNative: "/icons/react-native.svg",
  nextJs: "/icons/nextdotjs.svg",
  svelteKit: "/icons/svelte.svg",
  tailwindCss: "/icons/tailwindcss.svg",
  vueJs: "/icons/vuedotjs.svg",
  angular: "/icons/angular.svg",
  vite: "/icons/vite.svg",
  zustand: "/icons/zustand.svg",
  redux: "/icons/redux.svg",
  tanstackQuery: "/icons/tanstackquery.svg",
  zod: "/icons/zod.svg",
  trpc: "/icons/trpc.svg",

  // Backend
  nodeJs: "/icons/nodedotjs.svg",
  bun: "/icons/bun.svg",
  elysiaJs: "/icons/elysia.svg",
  fastify: "/icons/fastify.svg",
  nestJs: "/icons/nestjs.svg",
  expressJs: "/icons/express.svg",
  phoenix: "/icons/phoenixframework.svg",
  graphQl: "/icons/graphql.svg",
  apollo: "/icons/apollographql.svg",

  // Database & ORM
  prisma: "/icons/prisma.svg",
  drizzle: "/icons/drizzle.svg",
  typeOrm: "/icons/typeorm.svg",
  mongoose: "/icons/mongoose.svg",
  postgresql: "/icons/postgresql.svg",
  postgreSql: "/icons/postgresql.svg",
  mySql: "/icons/mysql.svg",
  mariaDb: "/icons/mariadb.svg",
  mongoDb: "/icons/mongodb.svg",
  redis: "/icons/redis.svg",
  supabase: "/icons/supabase.svg",
  firebase: "/icons/firebase.svg",

  // DevOps & Cloud
  awsRdsElastiCacheS3Ec2: "/icons/amazonaws.svg",
  aws: "/icons/amazonaws.svg",
  dockerDockerCompose: "/icons/docker.svg",
  docker: "/icons/docker.svg",
  dockerCompose: "/icons/docker.svg",
  kubernetes: "/icons/kubernetes.svg",
  linuxServerOps: "/icons/linux.svg",
  linux: "/icons/linux.svg",
  grafana: "/icons/grafana.svg",
  ciCd: "/icons/githubactions.svg",
  githubActions: "/icons/githubactions.svg",
  vercel: "/icons/vercel.svg",
  netlify: "/icons/netlify.svg",

  // FinTech / Blockchain
  web3Js: "/icons/web3dotjs.svg",
  solanaRpcAnchor: "/icons/solana.svg",
  solana: "/icons/solana.svg",
  anchor: "/icons/anchor.svg",
  jupiterDexAggregator: "/icons/jupiter.svg",
  jupiter: "/icons/jupiter.svg",
  binanceApi: "/icons/binance.svg",
  binance: "/icons/binance.svg",
  kuCoinApi: "/icons/kucoin.svg",
  kuCoin: "/icons/kucoin.svg",
  coinbaseApi: "/icons/coinbase.svg",
  coinbase: "/icons/coinbase.svg",

  // Other Concepts (Generated Icons)
  systemDesign: "/icons/system-design.svg",
  cleanArchitecture: "/icons/clean-architecture.svg",
  performanceOptimization: "/icons/performance-optimization.svg",
  apiSecurity: "/icons/api-security.svg",
};

export const SKILL_COLORS: Record<string, string> = {
  typeScript: "#3178C6",
  javaScript: "#F7DF1E",
  php: "#777BB4",
  elixir: "#A90533",
  python: "#3776AB",
  go: "#00ADD8",
  rust: "#000000",
  react: "#61DAFB",
  reactNative: "#61DAFB",
  nextJs: "#FFFFFF",
  svelteKit: "#FF3E00",
  tailwindCss: "#06B6D4",
  vueJs: "#4FC08D",
  angular: "#DD0031",
  vite: "#646CFF",
  zustand: "#443E38",
  redux: "#764ABC",
  tanstackQuery: "#FF4154",
  zod: "#3068B7",
  trpc: "#398CCB",
  nodeJs: "#339933",
  bun: "#FBF0DF",
  elysiaJs: "#000000",
  fastify: "#000000",
  nestJs: "#E0234E",
  expressJs: "#000000",
  phoenix: "#FD4F00",
  graphQl: "#E10098",
  apollo: "#311C87",
  prisma: "#2D3748",
  drizzle: "#C5F74F",
  typeOrm: "#FE0803",
  mongoose: "#B00700",
  postgresql: "#4169E1",
  postgreSql: "#4169E1",
  mysql: "#4479A1",
  mySql: "#4479A1",
  mariaDb: "#00A3D3",
  mongoDb: "#47A248",
  redis: "#DC382D",
  supabase: "#3ECF8E",
  firebase: "#FFCA28",
  aws: "#FF9900",
  awsRdsElastiCacheS3Ec2: "#FF9900",
  docker: "#2496ED",
  dockerDockerCompose: "#2496ED",
  dockerCompose: "#2496ED",
  kubernetes: "#326CE5",
  linux: "#FCC624",
  linuxServerOps: "#FCC624",
  grafana: "#F46800",
  ciCd: "#2088FF",
  githubActions: "#2088FF",
  vercel: "#000000",
  netlify: "#00C7B7",
  solana: "#14F195",
  solanaRpcAnchor: "#14F195",
  jupiter: "#24CC85",
  jupiterDexAggregator: "#24CC85",
  binance: "#F3BA2F",
  binanceApi: "#F3BA2F",
  kuCoin: "#24AE8F",
  kuCoinApi: "#24AE8F",
  coinbase: "#0052FF",
  coinbaseApi: "#0052FF",
  web3Js: "#F16822",
  systemDesign: "#3B82F6",
  cleanArchitecture: "#10B981",
  performanceOptimization: "#F59E0B",
  apiSecurity: "#EF4444",
};

export const getSkillIcon = (skillName: string): string | null => {
  const key = toCamelCase(skillName);
  return SKILL_ICONS[key] || null;
};

export const getSkillColor = (skillName: string): string => {
  const key = toCamelCase(skillName);
  return SKILL_COLORS[key] || "#64748b"; // default slate-500
};
