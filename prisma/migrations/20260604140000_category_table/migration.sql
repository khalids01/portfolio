-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "categoryType" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- Seed project categories per profile from legacy enum values
INSERT INTO "Category" ("id", "profileId", "name", "slug", "categoryType", "order", "createdAt", "updatedAt")
SELECT
    'cat_' || p."id" || '_' || v.slug,
    p."id",
    v.name,
    v.slug,
    'project',
    v."order",
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
FROM "Profile" p
CROSS JOIN (
    VALUES
        ('Opensource', 'opensource', 0),
        ('Health tech', 'health-tech', 1),
        ('Ecommerce', 'ecommerce', 2),
        ('Others', 'others', 3)
) AS v(name, slug, "order");

-- Add categoryId to Project
ALTER TABLE "Project" ADD COLUMN "categoryId" TEXT;

-- Backfill categoryId from legacy enum column
UPDATE "Project" pr
SET "categoryId" = c."id"
FROM "Category" c
WHERE c."profileId" = pr."profileId"
  AND c."categoryType" = 'project'
  AND c."slug" = CASE pr."category"::text
    WHEN 'OPENSOURCE' THEN 'opensource'
    WHEN 'HEALTH_TECH' THEN 'health-tech'
    WHEN 'ECOMMERCE' THEN 'ecommerce'
    ELSE 'others'
  END;

-- Drop legacy enum column
ALTER TABLE "Project" DROP COLUMN "category";

-- DropEnum
DROP TYPE "ProjectCategory";

-- CreateIndex
CREATE INDEX "Category_profileId_idx" ON "Category"("profileId");
CREATE INDEX "Category_profileId_categoryType_idx" ON "Category"("profileId", "categoryType");
CREATE INDEX "Category_profileId_categoryType_order_idx" ON "Category"("profileId", "categoryType", "order");
CREATE UNIQUE INDEX "Category_profileId_categoryType_slug_key" ON "Category"("profileId", "categoryType", "slug");
CREATE INDEX "Project_categoryId_idx" ON "Project"("categoryId");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Project" ADD CONSTRAINT "Project_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
