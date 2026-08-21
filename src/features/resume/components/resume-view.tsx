"use client";

import type { ResumeData } from "../schema";
import type { ResumeMeta } from "../data";
import {
  RESUME_LAYOUTS,
  normalizeResumeLayoutId,
  type ResumeLayoutId,
} from "../layouts";
import {
  RESUME_DENSITIES,
  RESUME_PAGE_SIZES,
  type ResumeDensity,
  type ResumeLayoutProps,
  type ResumePageSize,
  type ResumePreviewZoom,
} from "../settings";
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
import { Download, ArrowLeft, ZoomIn } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const LAYOUT_COMPONENTS = {
  "ats-standard": AtsStandardLayout,
  "engineering-pro": EngineeringProLayout,
  "senior-compact": SeniorCompactLayout,
  "eu-professional": EuProfessionalLayout,
  "modern-split": ModernSplitLayout,
} satisfies Record<ResumeLayoutId, React.ComponentType<ResumeLayoutProps>>;

export function ResumeView({
  data,
  resumeSlug,
  activeLayout,
  activeDensity,
  activePageSize,
  variants,
}: {
  data: ResumeData;
  resumeSlug: string;
  activeLayout: ResumeLayoutId;
  activeDensity: ResumeDensity;
  activePageSize: ResumePageSize;
  variants: ResumeMeta[];
}) {
  const layout = normalizeResumeLayoutId(activeLayout);
  const SelectedLayout = LAYOUT_COMPONENTS[layout];
  const [zoom, setZoom] = useState<ResumePreviewZoom>(100);
  return (
    <>
      <ResumeToolbar
        resumeSlug={resumeSlug}
        activeLayout={layout}
        activeDensity={activeDensity}
        activePageSize={activePageSize}
      />
      <ResumeVariantSelector
        activeSlug={resumeSlug}
        variants={variants}
      />
      <ResumeDocumentControls
        activeLayout={layout}
        activeDensity={activeDensity}
        activePageSize={activePageSize}
        zoom={zoom}
        onZoomChange={setZoom}
      />
      <div className="resume-preview-origin mx-auto w-full max-w-full origin-top overflow-hidden" style={{ transform: `scale(${zoom / 100})` }}>
        <SelectedLayout data={data} density={activeDensity} pageSize={activePageSize} />
      </div>
    </>
  );
}

function ResumeVariantSelector({
  activeSlug,
  variants,
}: {
  activeSlug: string;
  variants: ResumeMeta[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  function updateVariant(slug: string) {
    const params = new URLSearchParams(searchParams.toString());
    router.push(
      slug === "default" ? `/resume?${params}` : `/resume/${slug}?${params}`,
    );
  }
  return (
    <div className="no-print mx-auto mb-4 flex w-full max-w-[210mm] flex-col items-stretch gap-1.5 sm:flex-row sm:items-center sm:gap-3">
      <label
        htmlFor="resume-variant"
        className="shrink-0 text-sm font-medium text-slate-400"
      >
        Resume variant
      </label>
      <Select value={activeSlug} onValueChange={updateVariant}>
        <SelectTrigger
          id="resume-variant"
          className="h-11 w-full max-w-none bg-background/80 sm:max-w-md"
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
  activeDensity,
  activePageSize,
}: {
  resumeSlug: string;
  activeLayout: ResumeLayoutId;
  activeDensity: ResumeDensity;
  activePageSize: ResumePageSize;
}) {
  const pdfHref = `/resume.pdf?variant=${encodeURIComponent(resumeSlug)}&layout=${activeLayout}&density=${activeDensity}&page=${activePageSize}`;
  return (
    <div className="no-print sticky top-2 z-20 mx-auto mb-5 flex w-full max-w-[210mm] items-center justify-between gap-2 rounded-xl border border-slate-800/80 bg-slate-950/95 px-2 py-2 shadow-lg backdrop-blur sm:static sm:mb-6 sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none">
      <Button
        variant="ghost"
        size="default"
        asChild
        className="h-10 px-2 text-slate-400 hover:text-primary transition-colors sm:h-9"
      >
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>
      <Button
        size="default"
        className="h-10 rounded-lg text-white! bg-slate-800! px-4 shadow-lg hover:bg-slate-700! hover:shadow-xl transition-all sm:h-11 sm:rounded-full"
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
function ResumeDocumentControls({
  activeLayout,
  activeDensity,
  activePageSize,
  zoom,
  onZoomChange,
}: {
  activeLayout: ResumeLayoutId;
  activeDensity: ResumeDensity;
  activePageSize: ResumePageSize;
  zoom: ResumePreviewZoom;
  onZoomChange: (zoom: ResumePreviewZoom) => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  function updateDocumentSetting(key: "layout" | "density" | "page", value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, key === "layout" ? normalizeResumeLayoutId(value) : value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  return (
    <div className="no-print mx-auto mb-6 flex w-full max-w-[210mm] flex-col gap-3">
      <div>
        <p className="mb-1 text-sm font-medium text-slate-400">Layout</p>
        <Tabs value={activeLayout} onValueChange={(value) => updateDocumentSetting("layout", value)}>
        <div className="overflow-x-auto pb-1 [scrollbar-width:thin]">
        <TabsList className="flex h-auto w-max min-w-full gap-1 rounded-md border bg-background/80 p-1 backdrop-blur">
          {RESUME_LAYOUTS.map((layout) => (
            <TabsTrigger
              key={layout.id}
              value={layout.id}
              className="h-10 shrink-0 rounded-sm px-3 text-xs sm:px-4 md:text-sm"
            >
              {layout.label}
            </TabsTrigger>
          ))}
        </TabsList>
        </div>
        </Tabs>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <DocumentSelect
          label="Density"
          value={activeDensity}
          options={Object.entries(RESUME_DENSITIES).map(([value, config]) => ({ value, label: config.label }))}
          onChange={(value) => updateDocumentSetting("density", value)}
        />
        <DocumentSelect
          label="Page"
          value={activePageSize}
          options={Object.entries(RESUME_PAGE_SIZES).map(([value, config]) => ({ value, label: config.label }))}
          onChange={(value) => updateDocumentSetting("page", value)}
        />
        <DocumentSelect
          label="Preview zoom"
          value={String(zoom)}
          options={([75, 90, 100] as const).map((value) => ({ value: String(value), label: `${value}%` }))}
          onChange={(value) => onZoomChange(Number(value) as ResumePreviewZoom)}
          icon={<ZoomIn className="h-3.5 w-3.5" />}
          className="col-span-2 sm:col-span-1"
        />
      </div>
    </div>
  );
}

function DocumentSelect({
  label,
  value,
  options,
  onChange,
  icon,
  className = "",
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`grid gap-1 text-sm font-medium text-slate-400 ${className}`}>
      {label}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-11 w-full bg-background/80">
          {icon}
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}
        </SelectContent>
      </Select>
    </label>
  );
}
