import {
  existsSync,
  mkdirSync,
  readdirSync,
  statSync,
  unlinkSync,
} from "fs";
import { join } from "path";

export const RESUME_PDF_CACHE_VERSION = "v2";
export const RESUME_PDF_CACHE_DIR = join(process.cwd(), "tmp", "resume-cache");

function normalizeCachePart(value = "default") {
  return value.replace(/[^a-z0-9-]/gi, "-").toLowerCase() || "default";
}

export function getResumePdfCacheFile(variant = "default", layout = "classic") {
  return join(
    RESUME_PDF_CACHE_DIR,
    `resume-${normalizeCachePart(variant)}-${normalizeCachePart(layout)}-${RESUME_PDF_CACHE_VERSION}.pdf`,
  );
}

export function ensureResumePdfCacheDir() {
  if (!existsSync(RESUME_PDF_CACHE_DIR)) {
    mkdirSync(RESUME_PDF_CACHE_DIR, { recursive: true });
  }
}

export function isResumePdfCacheFresh(updatedAt: Date, variant = "default", layout = "classic") {
  const file = getResumePdfCacheFile(variant, layout);
  if (!existsSync(file)) return false;

  const stats = statSync(file);
  return stats.mtime >= updatedAt;
}

export function clearResumePdfCache() {
  if (!existsSync(RESUME_PDF_CACHE_DIR)) return 0;

  let cleared = 0;

  for (const file of readdirSync(RESUME_PDF_CACHE_DIR)) {
    const isResumePdf =
      file === "resume.pdf" || (file.startsWith("resume-") && file.endsWith(".pdf"));

    if (!isResumePdf) continue;

    unlinkSync(join(RESUME_PDF_CACHE_DIR, file));
    cleared += 1;
  }

  return cleared;
}
