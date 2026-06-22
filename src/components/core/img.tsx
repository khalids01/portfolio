"use client";

import { ImageIcon, Loader2 } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type CoreImgProps = {
  src?: string | null;
  alt: string;
  placeholderSrc?: string | null;
  showPlaceholder?: boolean;
  showLoadingSpinner?: boolean;
  fallback?: ReactNode;
  objectFit?: "cover" | "contain";
  className?: string;
  imgClassName?: string;
};

function deriveWebpUrl(src: string) {
  if (!src.includes("/api/img/")) return src;
  return src.replace(/\.(jpe?g|png)(\?.*)?$/i, ".webp$2");
}

function derivePlaceholderUrl(src: string) {
  if (!src.includes("/api/img/")) return null;
  return src.replace(/(\.[^./?]+)(\?.*)?$/i, "-placeholder$1$2");
}

export function CoreImg({
  src,
  alt,
  placeholderSrc,
  showPlaceholder = true,
  showLoadingSpinner = true,
  fallback,
  objectFit = "cover",
  className,
  imgClassName,
}: CoreImgProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const resolvedSrc = src ? deriveWebpUrl(src) : "";
  const resolvedPlaceholder =
    placeholderSrc ?? (src ? derivePlaceholderUrl(src) : null);

  if (!resolvedSrc || failed) {
    return (
      <div
        className={cn(
          "flex h-full min-h-24 w-full items-center justify-center bg-muted text-muted-foreground",
          className,
        )}
      >
        {fallback ?? <ImageIcon className="h-8 w-8" />}
      </div>
    );
  }

  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-muted", className)}>
      {showPlaceholder && resolvedPlaceholder && !loaded ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={resolvedPlaceholder}
          alt=""
          aria-hidden="true"
          className={cn(
            "absolute inset-0 h-full w-full scale-105 blur-md",
            objectFit === "contain" ? "object-contain" : "object-cover",
          )}
        />
      ) : null}
      {showLoadingSpinner && !loaded ? (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/20">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      ) : null}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={resolvedSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={cn(
          "h-full w-full transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0",
          objectFit === "contain" ? "object-contain" : "object-cover",
          imgClassName,
        )}
      />
    </div>
  );
}
