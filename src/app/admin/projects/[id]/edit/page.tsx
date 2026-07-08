import { EditProjectPage } from "@/features/admin/projects/components/edit-project-page";

export default async function ProjectEditRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <EditProjectPage projectId={id} />;
}
