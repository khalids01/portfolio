"use client";

import { useState } from "react";
import { useAdminMessages } from "../useAdminMessages";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2, CheckCircle, MailOpen, Eye, Mail } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import type { ContactMessage } from "@/features/messages/types";

export function AdminMessagesList() {
  const { list, markRead, remove } = useAdminMessages();
  const [selectedMessage, setSelectedMessage] =
    useState<ContactMessage | null>(null);

  const deleteMessage = (id: string) => {
    if (confirm("Delete message?")) {
      remove.mutate(id, {
        onSuccess: () => {
          setSelectedMessage(null);
        },
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        {list.isLoading && <div>Loading messages...</div>}
        {list.data?.data.map((msg) => (
          <Card key={msg.id} className={msg.read ? "opacity-60" : ""}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div className="min-w-0 space-y-1">
                <CardTitle className="text-base font-medium">
                  {msg.subject || "No Subject"}
                </CardTitle>
                <CardDescription className="truncate">
                  {msg.name} ({msg.email})
                </CardDescription>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {!msg.read && (
                  <Badge variant="default">New</Badge>
                )}
                <div className="text-sm text-muted-foreground">
                  {format(new Date(msg.createdAt), "PP p")}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                {msg.message}
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedMessage(msg)}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Button>
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
                  onClick={() => deleteMessage(msg.id)}
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

      <Dialog
        open={!!selectedMessage}
        onOpenChange={(open) => {
          if (!open) setSelectedMessage(null);
        }}
      >
        <DialogContent className="max-h-[90vh] w-[calc(100vw-12px)] max-w-2xl overflow-y-auto rounded-md">
          {selectedMessage ? (
            <>
              <DialogHeader>
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Mail className="size-5" />
                  </div>
                  {!selectedMessage.read ? (
                    <Badge>New</Badge>
                  ) : (
                    <Badge variant="outline">Read</Badge>
                  )}
                </div>
                <DialogTitle className="text-2xl leading-tight">
                  {selectedMessage.subject || "No Subject"}
                </DialogTitle>
                <DialogDescription>
                  Received {format(new Date(selectedMessage.createdAt), "PP p")}
                </DialogDescription>
              </DialogHeader>

              <div className="rounded-md border bg-muted/20 p-4">
                <div className="text-sm font-medium">{selectedMessage.name}</div>
                <div className="text-sm text-muted-foreground">
                  {selectedMessage.email}
                </div>
              </div>

              <div className="whitespace-pre-wrap rounded-md border bg-card p-4 text-sm leading-6">
                {selectedMessage.message}
              </div>

              <div className="flex flex-wrap justify-end gap-2 border-t pt-4">
                {!selectedMessage.read ? (
                  <Button
                    variant="outline"
                    onClick={() =>
                      markRead.mutate(
                        { id: selectedMessage.id, read: true },
                        {
                          onSuccess: () =>
                            setSelectedMessage({
                              ...selectedMessage,
                              read: true,
                            }),
                        },
                      )
                    }
                    disabled={markRead.isPending}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark Read
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() =>
                      markRead.mutate(
                        { id: selectedMessage.id, read: false },
                        {
                          onSuccess: () =>
                            setSelectedMessage({
                              ...selectedMessage,
                              read: false,
                            }),
                        },
                      )
                    }
                    disabled={markRead.isPending}
                  >
                    <MailOpen className="mr-2 h-4 w-4" />
                    Mark Unread
                  </Button>
                )}
                <Button
                  variant="destructive"
                  onClick={() => deleteMessage(selectedMessage.id)}
                  disabled={remove.isPending}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
