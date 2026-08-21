"use client";

import type { ResumeData } from "../schema";
import type { ResumeMeta } from "../data";
import {
  RESUME_LAYOUTS,
  normalizeResumeLayoutId,
  type ResumeLayoutId,
} from "../layouts";
import { AtsStandardLayout } from "./layouts/ats-standard";
import { EngineeringProLayout } from "./layouts/engineering-pro";
import { EuProfessionalLayout } from "./layouts/eu-professional";
import { ModernSplitLayout } from "./layouts/modern-split";
import { SeniorCompactLayout } from "./layouts/senior-compact";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const LAYOUT_COMPONENTS = {
  "ats-standard": AtsStandardLayout,
  "engineering-pro": EngineeringProLayout,
  "senior-compact": SeniorCompactLayout,
  "eu-professional": EuProfessionalLayout,
  "modern-split": ModernSplitLayout,
} satisfies Record<ResumeLayoutId, React.ComponentType<{ data: ResumeData }>>;

export function ResumeView({
  data,
  resumeSlug,
  activeLayout,
  variants,
}: {
  data: ResumeData;
  resumeSlug: string;
  activeLayout: ResumeLayoutId;
  variants: ResumeMeta[];
}) {
  const layout = normalizeResumeLayoutId(activeLayout);
  const SelectedLayout = LAYOUT_COMPONENTS[layout];
  return (
    <>
      <ResumeToolbar resumeSlug={resumeSlug} activeLayout={layout} />
      <ResumeVariantSelector
        activeSlug={resumeSlug}
        activeLayout={layout}
        variants={variants}
      />
      <ResumeLayoutTabs activeLayout={layout} />
      <SelectedLayout data={data} />
    </>
  );
}

function ResumeVariantSelector({
  activeSlug,
  activeLayout,
  variants,
}: {
  activeSlug: string;
  activeLayout: ResumeLayoutId;
  variants: ResumeMeta[];
}) {
  const router = useRouter();
  function updateVariant(slug: string) {
    const params = new URLSearchParams({ layout: activeLayout });
    router.push(
      slug === "default" ? `/resume?${params}` : `/resume/${slug}?${params}`,
    );
  }
  return (
    <div className="no-print mx-auto mb-4 flex w-full max-w-[210mm] items-center gap-3">
      <label
        htmlFor="resume-variant"
        className="shrink-0 text-sm font-medium text-slate-400"
      >
        Resume variant
      </label>
      <Select value={activeSlug} onValueChange={updateVariant}>
        <SelectTrigger
          id="resume-variant"
          className="w-full max-w-md bg-background/80"
        >
          <SelectValue placeholder="Select a resume variant" />
        </SelectTrigger>
        <SelectContent>
          {variants.map((variant) => (
            <SelectItem key={variant.slug} value={variant.slug}>
              {variant.title}
              {variant.isDefault ? " (default)" : ""}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
function ResumeToolbar({
  resumeSlug,
  activeLayout,
}: {
  resumeSlug: string;
  activeLayout: ResumeLayoutId;
}) {
  const pdfHref = `/resume.pdf?variant=${encodeURIComponent(resumeSlug)}&layout=${activeLayout}`;
  return (
    <div className="no-print mx-auto mb-6 flex w-full max-w-[210mm] flex-wrap items-center justify-between gap-3">
      <Button
        variant="ghost"
        size="sm"
        asChild
        className="text-slate-500 hover:text-primary transition-colors"
      >
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>
      <Button
        size="lg"
        className="rounded-full text-white! bg-slate-900! shadow-lg hover:shadow-xl transition-all"
        asChild
      >
        <a href={pdfHref}>
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </a>
      </Button>
    </div>
  );
}
function ResumeLayoutTabs({ activeLayout }: { activeLayout: ResumeLayoutId }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  function updateLayout(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("layout", normalizeResumeLayoutId(value));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  return (
    <div className="no-print mx-auto mb-6 w-full max-w-[210mm]">
      <Tabs value={activeLayout} onValueChange={updateLayout}>
        <TabsList className="grid h-auto w-full grid-cols-2 rounded-md border bg-background/80 p-1 backdrop-blur sm:grid-cols-3 lg:grid-cols-5">
          {RESUME_LAYOUTS.map((layout) => (
            <TabsTrigger
              key={layout.id}
              value={layout.id}
              className="rounded-sm text-xs md:text-sm"
            >
              {layout.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
