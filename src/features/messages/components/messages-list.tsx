"use client";

import { format } from "date-fns";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, MailOpen, Mail } from "lucide-react";
import { ContactMessage } from "../../../../prisma/generated/client";
import { deleteMessage, toggleReadStatus } from "../actions";
import { toast } from "sonner";
import { useTransition } from "react";

interface MessagesListProps {
  messages: ContactMessage[];
}

export function MessagesList({ messages }: MessagesListProps) {
  const [, startTransition] = useTransition();

  const handleStatusToggle = (message: ContactMessage) => {
    startTransition(async () => {
      const result = await toggleReadStatus(message.id, message.read);
      if (result.success) {
        toast.success(`Marked as ${!message.read ? "read" : "unread"}`);
      } else {
        toast.error("Failed to update status");
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    
    startTransition(async () => {
      const result = await deleteMessage(id);
      if (result.success) {
        toast.success("Message deleted");
      } else {
        toast.error("Failed to delete message");
      }
    });
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>From</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No messages found.
              </TableCell>
            </TableRow>
          ) : (
            messages.map((message) => (
              <TableRow key={message.id} className={message.read ? "bg-muted/50 opacity-60" : ""}>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => handleStatusToggle(message)}
                    title={message.read ? "Mark as unread" : "Mark as read"}
                  >
                    {message.read ? (
                      <MailOpen className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Mail className="h-4 w-4 text-primary fill-current" />
                    )}
                  </Button>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{message.name}</span>
                    <span className="text-xs text-muted-foreground">{message.email}</span>
                  </div>
                </TableCell>
                <TableCell className="max-w-[300px]">
                  <div className="flex flex-col gap-1">
                    <p className="font-medium truncate">{message.subject || "(No Subject)"}</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">{message.message}</p>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {format(new Date(message.createdAt), "PP p")}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleStatusToggle(message)}>
                         {message.read ? "Mark as Unread" : "Mark as Read"}
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDelete(message.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
