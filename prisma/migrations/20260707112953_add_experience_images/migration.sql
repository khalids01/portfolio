ALTER TABLE "Experience" ADD COLUMN "coverImage" TEXT;
ALTER TABLE "Experience" ADD COLUMN "images" JSONB NOT NULL DEFAULT '[]';
