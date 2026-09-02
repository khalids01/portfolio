import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getAgentTextData,
  agentTextToMarkdown,
} from "@/features/agent-text/data";
import { AgentTextView } from "@/features/agent-text/components/agent-text-view";

export const metadata: Metadata = {
  title: "Agent Text",
  description: "Machine-readable profile and career data.",
  alternates: { canonical: "/agent-text" },
  robots: { index: false, follow: true },
};
export const dynamic = "force-dynamic";

export default async function AgentTextPage() {
  const data = await getAgentTextData();
  const markdown = agentTextToMarkdown(data);
  const json = JSON.stringify(
    data,
    (_key, value) => (value instanceof Date ? value.toISOString() : value),
    2,
  );
  return (
    <main className="min-h-screen bg-background px-4 py-8 md:py-12">
      <div className="mx-auto max-w-5xl space-y-8">
        <Button variant="ghost" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agent Text</h1>
          <p className="mt-2 text-muted-foreground">
            A machine-readable profile generated from the same portfolio and
            resume data used by this site.
          </p>
        </div>
        <AgentTextView
          markdown={markdown}
          json={json}
          text={markdown.replace(/^#+\s?/gm, "")}
        />
      </div>
    </main>
  );
}
