export const queryKeys = {
  profile: {
    public: ["profile", "public"] as const,
    admin: ["profile", "admin"] as const,
  },
  skills: {
    public: ["skills", "public"] as const,
    admin: ["skills", "admin"] as const,
  },
  features: {
    admin: ["features", "admin"] as const,
  },
  images: {
    admin: (params?: unknown) => ["images", "admin", params ?? "all"] as const,
    detail: (id: string) => ["images", "admin", id] as const,
  },
  projects: {
    public: ["projects", "public"] as const,
    admin: ["projects", "admin"] as const,
    detail: (id: string) => ["projects", "admin", id] as const,
  },
  experiences: {
    admin: ["experiences", "admin"] as const,
  },
  categories: {
    admin: (categoryType?: string) =>
      ["categories", "admin", categoryType ?? "all"] as const,
  },
  messages: {
    admin: ["messages", "admin"] as const,
  },
} as const;
