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
export const RESUME_PDF_CACHE_FILE = join(
  RESUME_PDF_CACHE_DIR,
  `resume-${RESUME_PDF_CACHE_VERSION}.pdf`,
);

export function ensureResumePdfCacheDir() {
  if (!existsSync(RESUME_PDF_CACHE_DIR)) {
    mkdirSync(RESUME_PDF_CACHE_DIR, { recursive: true });
  }
}

export function isResumePdfCacheFresh(updatedAt: Date) {
  if (!existsSync(RESUME_PDF_CACHE_FILE)) return false;

  const stats = statSync(RESUME_PDF_CACHE_FILE);
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
