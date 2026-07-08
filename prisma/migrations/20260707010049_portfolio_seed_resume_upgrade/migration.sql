ALTER TABLE "Experience" ADD COLUMN "slug" TEXT;
ALTER TABLE "Experience" ADD COLUMN "categoryId" TEXT;

UPDATE "Experience"
SET "slug" = lower(
  regexp_replace(
    regexp_replace(
      trim(coalesce("company", '') || '-' || coalesce("role", '') || '-' || to_char("startDate", 'YYYY-MM-DD')),
      '[^a-zA-Z0-9]+',
      '-',
      'g'
    ),
    '(^-+|-+$)',
    '',
    'g'
  )
)
WHERE "slug" IS NULL;

UPDATE "Experience"
SET "slug" = "id"
WHERE "slug" IS NULL OR "slug" = '';

ALTER TABLE "Experience" ALTER COLUMN "slug" SET NOT NULL;

ALTER TABLE "Project" ADD COLUMN "statusBadges" JSONB NOT NULL DEFAULT '[]';
ALTER TABLE "Project" ADD COLUMN "featuredRank" INTEGER;
ALTER TABLE "Project" ADD COLUMN "role" TEXT;
ALTER TABLE "Project" ADD COLUMN "impact" TEXT;
ALTER TABLE "Project" ADD COLUMN "caseStudy" JSONB;

ALTER TABLE "Resume" ADD COLUMN "title" TEXT NOT NULL DEFAULT 'Default Resume';
ALTER TABLE "Resume" ADD COLUMN "targetRole" TEXT;
ALTER TABLE "Resume" ADD COLUMN "isDefault" BOOLEAN NOT NULL DEFAULT false;

UPDATE "Resume" SET "isDefault" = true WHERE "slug" = 'default';

CREATE UNIQUE INDEX "Experience_profileId_slug_key" ON "Experience"("profileId", "slug");
CREATE INDEX "Experience_categoryId_idx" ON "Experience"("categoryId");
CREATE INDEX "Resume_isDefault_idx" ON "Resume"("isDefault");

ALTER TABLE "Experience" ADD CONSTRAINT "Experience_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
