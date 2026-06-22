export const CATEGORY_TYPES = [
  "project",
  "experience",
  "education",
  "skills",
] as const;

export type CategoryType = (typeof CATEGORY_TYPES)[number];

export type Category = {
  id: string;
  name: string;
  slug: string;
  categoryType: CategoryType;
  order: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

export function isCategoryType(value: string): value is CategoryType {
  return (CATEGORY_TYPES as readonly string[]).includes(value);
}

export function slugifyCategoryName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
