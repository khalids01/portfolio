export type AdminStats = {
  visitors: number;
  projects: number;
  skills: number;
  messages: number;
};

export function useAdminStats(): AdminStats {
  // TODO: wire to API later
  return { visitors: 1248, projects: 12, skills: 28, messages: 5 };
}
