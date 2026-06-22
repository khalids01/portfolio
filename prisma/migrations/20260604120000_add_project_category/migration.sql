-- CreateEnum
CREATE TYPE "ProjectCategory" AS ENUM ('OPENSOURCE', 'HEALTH_TECH', 'ECOMMERCE', 'OTHERS');

-- AlterTable
ALTER TABLE "Project" ADD COLUMN "category" "ProjectCategory" NOT NULL DEFAULT 'OTHERS';
