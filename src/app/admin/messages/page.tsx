import { MessagesList } from "@/features/messages/components/messages-list";
import { getMessages } from "@/features/messages/actions";
import { requireAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";


export default async function AdminMessagesPage() {
  const admin = await requireAdmin();
  if (!admin.ok) {
    redirect("/");
  }

  const messages = await getMessages();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
      </div>
      <MessagesList messages={messages} />
    </div>
  );
}
