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
  projects: {
    public: ["projects", "public"] as const,
    admin: ["projects", "admin"] as const,
  },
  messages: {
    admin: ["messages", "admin"] as const,
  },
} as const;
