import { AdminImagesLibrary } from "@/features/admin/images/components/admin-images-library";
import { requireAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";

export default async function ImagesPage() {
  const admin = await requireAdmin();
  if (!admin.ok) {
    redirect("/");
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Images</h1>
        <p className="text-muted-foreground">
          Upload, browse, and manage project media from Serve.
        </p>
      </div>
      <AdminImagesLibrary />
    </div>
  );
}
