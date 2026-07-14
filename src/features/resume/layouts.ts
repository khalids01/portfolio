export const RESUME_LAYOUTS = [
  { id: "classic", label: "Classic" },
  { id: "europass-pro", label: "Europass Pro" },
  { id: "modern-sidebar", label: "Modern Sidebar" },
  { id: "ats-plain", label: "ATS Plain" },
] as const;

export type ResumeLayoutId = (typeof RESUME_LAYOUTS)[number]["id"];

const RESUME_LAYOUT_IDS = new Set<string>(
  RESUME_LAYOUTS.map((layout) => layout.id),
);

export function isResumeLayoutId(value: string | null | undefined): value is ResumeLayoutId {
  return Boolean(value && RESUME_LAYOUT_IDS.has(value));
}

export function normalizeResumeLayoutId(
  value: string | null | undefined,
  fallback: ResumeLayoutId = "classic",
): ResumeLayoutId {
  return isResumeLayoutId(value) ? value : fallback;
}
