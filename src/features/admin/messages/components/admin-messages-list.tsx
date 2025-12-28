"use client";

import { useAdminMessages } from "../useAdminMessages";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Trash2, CheckCircle, MailOpen } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export function AdminMessagesList() {
  const { list, markRead, remove } = useAdminMessages();

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        {list.isLoading && <div>Loading messages...</div>}
        {list.data?.data.map((msg) => (
          <Card key={msg.id} className={msg.read ? "opacity-60" : ""}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle className="text-base font-medium">
                  {msg.subject || "No Subject"}
                </CardTitle>
                <CardDescription>
                  {msg.name} ({msg.email})
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                {!msg.read && (
                  <Badge variant="default">New</Badge>
                )}
                <div className="text-sm text-muted-foreground">
                  {format(new Date(msg.createdAt), "PP p")}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm whitespace-pre-wrap mb-4">
                {msg.message}
              </div>
              <div className="flex justify-end gap-2">
                {!msg.read && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => markRead.mutate({ id: msg.id, read: true })}
                    disabled={markRead.isPending}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark Read
                  </Button>
                )}
                {msg.read && (
                   <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => markRead.mutate({ id: msg.id, read: false })}
                    disabled={markRead.isPending}
                  >
                    <MailOpen className="mr-2 h-4 w-4" />
                    Mark Unread
                  </Button>
                )}
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    if (confirm("Delete message?")) remove.mutate(msg.id);
                  }}
                  disabled={remove.isPending}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {!list.isLoading && list.data?.data.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            No messages yet.
          </div>
        )}
      </div>
    </div>
  );
}
