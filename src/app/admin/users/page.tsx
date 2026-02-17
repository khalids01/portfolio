import { getUsers } from "@/features/users/actions/users";
import { UsersTable } from "@/features/users/components/users-table";
import { requireAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";

export default async function UsersPage() {
  const admin = await requireAdmin();
  if (!admin.ok) {
    redirect("/");
  }

  // const users = await getUsers();
  const users = await getUsers();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Users</h3>
        <p className="text-sm text-muted-foreground">
          Manage users and their roles.
        </p>
      </div>
      <UsersTable users={users} currentUserId={admin.session.user.id} />
    </div>
  );
}
