export type Experience = {
  id: string;
  slug: string;
  company: string;
  role: string;
  location?: string | null;
  startDate: string | Date;
  endDate?: string | Date | null;
  current: boolean;
  description?: string | null;
  categoryId?: string | null;
  category?: { id: string; name: string; slug: string } | null;
  highlights: { id: string; text: string }[];
};
