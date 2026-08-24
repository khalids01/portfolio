export const RESUME_LAYOUTS = [
  { id: "ats-standard", label: "ATS Standard" },
  { id: "engineering-pro", label: "Engineering Pro" },
  { id: "senior-compact", label: "Senior Compact" },
  { id: "eu-professional", label: "EU Professional" },
  { id: "modern-split", label: "Modern Split" },
] as const;

export type ResumeLayoutId = (typeof RESUME_LAYOUTS)[number]["id"];

const RESUME_LAYOUT_IDS = new Set<string>(
  RESUME_LAYOUTS.map((layout) => layout.id),
);

const LEGACY_LAYOUT_ALIASES: Record<string, ResumeLayoutId> = {
  classic: "engineering-pro",
  "europass-pro": "eu-professional",
  "modern-sidebar": "modern-split",
  "ats-plain": "ats-standard",
};

export function isResumeLayoutId(value: string | null | undefined): value is ResumeLayoutId {
  return Boolean(value && RESUME_LAYOUT_IDS.has(value));
}

export function normalizeResumeLayoutId(
  value: string | null | undefined,
  fallback: ResumeLayoutId = "ats-standard",
): ResumeLayoutId {
  if (isResumeLayoutId(value)) return value;
  return value ? LEGACY_LAYOUT_ALIASES[value] ?? fallback : fallback;
}
