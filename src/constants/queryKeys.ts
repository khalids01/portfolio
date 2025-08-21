export const queryKeys = {
  profile: {
    public: ["profile", "public"] as const,
    admin: ["profile", "admin"] as const,
  },
  skills: {
    public: ["skills", "public"] as const,
    admin: ["skills", "admin"] as const,
  },
} as const;
