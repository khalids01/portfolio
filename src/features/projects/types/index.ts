export type Project = {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  coverImage?: string | null;
  url?: string | null;
  repoUrl?: string | null;
  startDate?: string | Date | null;
  endDate?: string | Date | null;
  categoryId?: string | null;
  category?: { id: string; name: string; slug: string } | null;
  tags: { id: string; name: string }[];
  skills: { id: string; name: string }[];
};
