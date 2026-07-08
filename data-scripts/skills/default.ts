import type { SeedScript } from "../types";
import { getOwnerProfile } from "../utils";

const skills = [
  { name: "TypeScript", category: "Languages" },
  { name: "JavaScript", category: "Languages" },
  { name: "PHP", category: "Languages" },
  { name: "Elixir", category: "Languages" },
  { name: "React", category: "Frontend" },
  { name: "React Native", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "SvelteKit", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Bun", category: "Backend" },
  { name: "Elysia.js", category: "Backend" },
  { name: "Fastify", category: "Backend" },
  { name: "NestJS", category: "Backend" },
  { name: "Express.js", category: "Backend" },
  { name: "Phoenix", category: "Backend" },
  { name: "Prisma", category: "Database & ORM" },
  { name: "Drizzle", category: "Database & ORM" },
  { name: "TypeORM", category: "Database & ORM" },
  { name: "Mongoose", category: "Database & ORM" },
  { name: "PostgreSQL", category: "Database & ORM" },
  { name: "MySQL", category: "Database & ORM" },
  { name: "MariaDB", category: "Database & ORM" },
  { name: "MongoDB", category: "Database & ORM" },
  { name: "Redis", category: "Database & ORM" },
  { name: "AWS (RDS, ElastiCache, S3, EC2)", category: "DevOps & Cloud" },
  { name: "Docker & Docker Compose", category: "DevOps & Cloud" },
  { name: "Linux Server Ops", category: "DevOps & Cloud" },
  { name: "Grafana", category: "DevOps & Cloud" },
  { name: "CI/CD", category: "DevOps & Cloud" },
  { name: "Web3.js", category: "FinTech / Blockchain" },
  { name: "Solana RPC / Anchor", category: "FinTech / Blockchain" },
  { name: "Jupiter DEX Aggregator", category: "FinTech / Blockchain" },
  { name: "Binance API", category: "FinTech / Blockchain" },
  { name: "KuCoin API", category: "FinTech / Blockchain" },
  { name: "Coinbase API", category: "FinTech / Blockchain" },
  { name: "System Design", category: "Other" },
  { name: "Clean Architecture", category: "Other" },
  { name: "Performance Optimization", category: "Other" },
  { name: "API Security", category: "Other" },
];

export const skillsSeed: SeedScript = {
  id: "skills/default",
  label: "Skills: current portfolio stack",
  group: "skills",
  order: 10,
  dependsOn: ["profile/default"],
  async run({ prisma }) {
    const profile = await getOwnerProfile(prisma);
    await prisma.skill.deleteMany({ where: { profileId: profile.id } });
    await prisma.skill.createMany({
      data: skills.map((skill, order) => ({
        profileId: profile.id,
        ...skill,
        order,
      })),
    });
    console.log(`  synced skills: ${skills.length}`);
  },
};
