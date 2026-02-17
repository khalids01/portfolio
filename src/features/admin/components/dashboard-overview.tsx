import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge, FolderKanban, Mail, Users } from "lucide-react";
import { prisma } from "@/lib/prisma";

export async function AdminDashboardOverview() {
  const [
    visitorCount,
    projectCount,
    skillCount,
    messageCount,
    visitorsLastWeek,
    visitorsPrevWeek
  ] = await Promise.all([
    prisma.visitor.count(),
    prisma.project.count(),
    prisma.skill.count(),
    prisma.contactMessage.count(),
    prisma.visitor.count({
      where: { createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } }
    }),
    prisma.visitor.count({
      where: { 
        createdAt: { 
          gte: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
          lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        } 
      }
    })
  ]);

  const visitorGrowth = visitorsPrevWeek === 0 
    ? visitorsLastWeek > 0 ? 100 : 0
    : Math.round(((visitorsLastWeek - visitorsPrevWeek) / visitorsPrevWeek) * 100);

  const unreadMessages = await prisma.contactMessage.count({
    where: { read: false }
  });

  const draftProjects = 0; // Assuming no draft logic yet or check boolean if added

  return (
    <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{visitorCount}</div>
          <p className="text-xs text-muted-foreground">
            {visitorGrowth > 0 ? "+" : ""}{visitorGrowth}% from last week
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Projects</CardTitle>
          <FolderKanban className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{projectCount}</div>
          <p className="text-xs text-muted-foreground">
             Portfolio projects
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Skills</CardTitle>
          <Badge className="h-4 w-4 text-muted-foreground bg-transparent p-0" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{skillCount}</div>
          <p className="text-xs text-muted-foreground">
            Documented skills
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Messages</CardTitle>
          <Mail className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{messageCount}</div>
          <p className="text-xs text-muted-foreground">
            {unreadMessages} unread
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
