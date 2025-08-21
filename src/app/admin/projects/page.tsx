import { ProjectsList } from "@/features/projects/components/projects-list";

export default function AdminProjectsPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold tracking-tight">Projects</h2>
      <ProjectsList />
    </div>
  );
}
