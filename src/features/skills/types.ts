export type Skill = {
  id: string;
  profileId: string;
  name: string;
  label?: string | null;
  icon?: string | null;
  category?: string | null;
  level?: number | null;
  order?: number | null;
  experienceYears?: number | null;
  experienceMonths?: number | null;
  projects: { id: string; title: string; slug: string }[];
};

export type OkRes<T> = { data: T };
