import { AdminProfileForm } from "@/features/admin/profile/components/profile-form";

export default function AdminProfilePage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">Profile</h2>
      <p className="text-muted-foreground">Create or update your public profile information.</p>
      <AdminProfileForm />
    </div>
  );
}
