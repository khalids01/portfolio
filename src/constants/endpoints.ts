export const endpoints = {
  auth: "/api/auth",
  profile: "/api/profile",
  skills: "/api/skills",
  admin: {
    profile: "/api/admin/profile",
    skills: "/api/admin/skills",
  },
} as const;
