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
  tags: { id: string; name: string }[];
  skills: { id: string; name: string }[];
};
