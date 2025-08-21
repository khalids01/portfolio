import { MessagesList } from "@/features/messages/components/messages-list";

export default function AdminMessagesPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold tracking-tight">Messages</h2>
      <MessagesList />
    </div>
  );
}
