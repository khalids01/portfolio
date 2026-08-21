import type { CSSProperties } from "react";

export const RESUME_DENSITIES = {
  compact: {
    label: "Compact",
    bodyFontSize: "9.5pt",
    smallFontSize: "8.75pt",
    lineHeight: 1.3,
    pagePadding: "10mm",
    sectionGap: "3.5mm",
  },
  standard: {
    label: "Standard",
    bodyFontSize: "10.5pt",
    smallFontSize: "9.5pt",
    lineHeight: 1.38,
    pagePadding: "13mm",
    sectionGap: "5mm",
  },
  comfortable: {
    label: "Comfortable",
    bodyFontSize: "11pt",
    smallFontSize: "10pt",
    lineHeight: 1.45,
    pagePadding: "16mm",
    sectionGap: "6mm",
  },
} as const;

export type ResumeDensity = keyof typeof RESUME_DENSITIES;

export const RESUME_PAGE_SIZES = {
  a4: { label: "A4", width: "210mm", minHeight: "297mm", pdfFormat: "A4" },
  letter: { label: "Letter", width: "8.5in", minHeight: "11in", pdfFormat: "Letter" },
} as const;

export type ResumePageSize = keyof typeof RESUME_PAGE_SIZES;
export type ResumePreviewZoom = 75 | 90 | 100;

const RESUME_DENSITY_IDS = new Set<string>(Object.keys(RESUME_DENSITIES));
const RESUME_PAGE_SIZE_IDS = new Set<string>(Object.keys(RESUME_PAGE_SIZES));

export function normalizeResumeDensity(
  value: string | null | undefined,
  fallback: ResumeDensity = "standard",
): ResumeDensity {
  return value && RESUME_DENSITY_IDS.has(value) ? (value as ResumeDensity) : fallback;
}

export function normalizeResumePageSize(
  value: string | null | undefined,
  fallback: ResumePageSize = "a4",
): ResumePageSize {
  return value && RESUME_PAGE_SIZE_IDS.has(value) ? (value as ResumePageSize) : fallback;
}

export function resumeSheetStyle(
  density: ResumeDensity,
  pageSize: ResumePageSize,
): CSSProperties {
  const densityConfig = RESUME_DENSITIES[density];
  const pageConfig = RESUME_PAGE_SIZES[pageSize];

  return {
    "--resume-body-size": densityConfig.bodyFontSize,
    "--resume-small-size": densityConfig.smallFontSize,
    "--resume-line-height": densityConfig.lineHeight,
    "--resume-page-padding": densityConfig.pagePadding,
    "--resume-section-gap": densityConfig.sectionGap,
    "--resume-page-width": pageConfig.width,
    "--resume-page-height": pageConfig.minHeight,
  } as CSSProperties;
}

export type ResumeLayoutProps = {
  data: import("./schema").ResumeData;
  density: ResumeDensity;
  pageSize: ResumePageSize;
};
