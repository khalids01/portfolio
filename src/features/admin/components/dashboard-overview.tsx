import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge, FolderKanban, Mail, Users } from "lucide-react";

export function AdminDashboardOverview() {
  return (
    <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Users className="size-4" /> Visitors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-semibold">1,248</div>
          <p className="text-xs text-muted-foreground">+12% from last week</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <FolderKanban className="size-4" /> Projects
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-semibold">12</div>
          <p className="text-xs text-muted-foreground">2 in draft</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Badge className="size-4" /> Skills
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-semibold">28</div>
          <p className="text-xs text-muted-foreground">3 recently updated</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Mail className="size-4" /> Messages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-semibold">5</div>
          <p className="text-xs text-muted-foreground">1 unread</p>
        </CardContent>
      </Card>
    </div>
  );
}
