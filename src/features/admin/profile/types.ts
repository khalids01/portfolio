export type ProfileDTO = {
  id?: string;
  userId?: string;
  fullName: string;
  headline: string;
  bio?: string | null;
  avatarUrl?: string | null;
  location?: string | null;
  phone?: string | null;
  emailPublic?: string | null;
  resumeUrl?: string | null;
  linkedinUrl?: string | null;
  githubUrl?: string | null;
  websiteUrl?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type OkRes<T> = { data: T };
export type ListRes<T> = { data: T[] };
