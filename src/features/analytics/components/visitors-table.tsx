import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";

export async function VisitorsTable() {
  const visitors = await prisma.visitor.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Visitors</CardTitle>
        <CardDescription>A list of the latest 100 visits to your portfolio.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b text-muted-foreground whitespace-nowrap">
                <th className="py-3 px-4 font-medium">Time</th>
                <th className="py-3 px-4 font-medium">IP Address</th>
                <th className="py-3 px-4 font-medium">Location</th>
                <th className="py-3 px-4 font-medium">Path</th>
                <th className="py-3 px-4 font-medium">Device/Browser</th>
              </tr>
            </thead>
            <tbody>
              {visitors.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-muted-foreground">
                    No visitors yet.
                  </td>
                </tr>
              )}
              {visitors.map((v) => (
                <tr key={v.id} className="border-b last:border-0 hover:bg-muted/50 whitespace-nowrap">
                  <td className="py-3 px-4">
                    {format(new Date(v.createdAt), "MMM d, yyyy h:mm a")}
                  </td>
                  <td className="py-3 px-4 font-mono text-xs">{v.ip}</td>
                  <td className="py-3 px-4">
                    {v.city !== "unknown" && v.city ? `${v.city}, ` : ""}
                    {v.country !== "unknown" ? v.country : "Unknown"}
                  </td>
                  <td className="py-3 px-4">{v.path}</td>
                  <td className="py-3 px-4">
                    {v.device !== "unknown" ? `${v.device} - ` : ""}
                    {v.browser !== "unknown" ? v.browser : "Unknown"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
