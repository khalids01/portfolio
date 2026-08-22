"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Clipboard, Download } from "lucide-react";

export function AgentTextView({
  markdown,
  json,
  text,
}: {
  markdown: string;
  json: string;
  text: string;
}) {
  const [format, setFormat] = useState<"md" | "json" | "txt">("md");
  const [copied, setCopied] = useState(false);
  const content = format === "md" ? markdown : format === "json" ? json : text;
  const extension = format === "md" ? "md" : format;
  async function copy() {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }
  function download() {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `abdullah-khalid-agent-profile.${extension}`;
    link.click();
    URL.revokeObjectURL(url);
  }
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        {(["md", "json", "txt"] as const).map((item) => (
          <Button
            key={item}
            variant={format === item ? "default" : "outline"}
            onClick={() => setFormat(item)}
          >
            {item.toUpperCase()}
          </Button>
        ))}
        <span className="flex-1" />
        <Button variant="outline" onClick={copy}>
          {copied ? (
            <Check className="mr-2 h-4 w-4" />
          ) : (
            <Clipboard className="mr-2 h-4 w-4" />
          )}
          {copied ? "Copied" : "Copy"}
        </Button>
        <Button onClick={download}>
          <Download className="mr-2 h-4 w-4" />
          Download .{extension}
        </Button>
      </div>
      <pre className="max-h-[70vh] overflow-auto rounded-xl border bg-muted/40 p-4 text-xs leading-6 whitespace-pre-wrap">
        {content}
      </pre>
    </div>
  );
}
