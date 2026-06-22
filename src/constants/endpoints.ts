export const endpoints = {
  auth: "/api/auth",
  profile: "/api/profile",
  skills: "/api/skills",
  admin: {
    profile: "/api/admin/profile",
    skills: "/api/admin/skills",
    features: "/api/admin/features",
    images: "/api/admin/images",
    imagesUpload: "/api/admin/images/upload",
    projects: "/api/admin/projects",
    categories: "/api/admin/categories",
    categoriesReorder: "/api/admin/categories/reorder",
    messages: "/api/admin/messages",
  },
} as const;
