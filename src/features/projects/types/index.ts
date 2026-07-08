export type Project = {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  coverImage?: string | null;
  images: string[];
  url?: string | null;
  repoUrl?: string | null;
  startDate?: string | Date | null;
  endDate?: string | Date | null;
  categoryId?: string | null;
  category?: { id: string; name: string; slug: string } | null;
  tags: { id: string; name: string }[];
  skills: { id: string; name: string }[];
  statusBadges: string[];
  featuredRank?: number | null;
  role?: string | null;
  impact?: string | null;
  caseStudy?: {
    problem?: string;
    role?: string;
    architecture?: string[];
    features?: string[];
    challenges?: string[];
    result?: string;
  } | null;
};
