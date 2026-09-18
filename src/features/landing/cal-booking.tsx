"use client";

import { useEffect } from "react";
import { ExternalLink } from "lucide-react";

type CalNamespace = ((...args: unknown[]) => void) & { q?: unknown[][] };
type CalApi = CalNamespace & {
  loaded?: boolean;
  ns?: Record<string, CalNamespace>;
};

declare global {
  interface Window {
    Cal?: CalApi;
  }
}

const CAL_LINK = "khalid-khan-nv79zm/30min";
const CAL_ORIGIN = "https://app.cal.com";
const CAL_NAMESPACE = "portfolio-30min";

function initializeCal() {
  const cal = window.Cal ?? ((...args: unknown[]) => {

      if (!cal.loaded) {
        cal.ns = {};
        cal.q = cal.q || [];
        const script = document.createElement("script");
        script.src = `${CAL_ORIGIN}/embed/embed.js`;
        script.async = true;
        document.head.appendChild(script);
        cal.loaded = true;
      }

      if (args[0] === "init") {
        const namespace = args[1];
        const api = ((...apiArgs: unknown[]) => {
          api.q = api.q || [];
          api.q.push(apiArgs);
        }) as CalNamespace;
        api.q = [];

        if (typeof namespace === "string") {
          cal.ns![namespace] = cal.ns![namespace] || api;
          cal.ns![namespace].q!.push(args);
          cal.q!.push(["initNamespace", namespace]);
        } else {
          cal.q!.push(args);
        }
        return;
      }

      cal.q!.push(args);
    }) as CalApi;
  window.Cal = cal;

  cal("init", CAL_NAMESPACE, { origin: CAL_ORIGIN });
  cal.ns?.[CAL_NAMESPACE]?.("inline", {
    elementOrSelector: "#cal-booking-inline",
    calLink: CAL_LINK,
    config: {
      layout: "month_view",
      useSlotsViewOnSmallScreen: true,
      theme: "auto",
    },
  });
  cal.ns?.[CAL_NAMESPACE]?.("ui", {
    hideEventTypeDetails: false,
    layout: "month_view",
  });
}

export function CalBooking() {
  useEffect(() => {
    initializeCal();
  }, []);

  return (
    <section aria-labelledby="schedule-heading" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl text-center">
        <p className="mb-3 text-xs font-semibold tracking-[0.35em] text-primary">
          — SCHEDULE —
        </p>
        <h2 id="schedule-heading" className="text-3xl font-bold tracking-tight sm:text-5xl">
          Book a <em className="font-serif font-medium text-primary">30-minute</em> call
        </h2>
        <p className="mt-3 text-muted-foreground">Pick a time that works for you.</p>
      </div>

      <div className="mx-auto mt-10 max-w-6xl overflow-hidden rounded-2xl border border-border/80 bg-background/60 p-3 shadow-xl shadow-black/5 backdrop-blur-sm sm:p-5">
        <div id="cal-booking-inline" className="min-h-[540px] w-full" />
      </div>

      <a
        href={`${CAL_ORIGIN}/${CAL_LINK}`}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex w-full items-center justify-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        Open scheduler in a new tab <ExternalLink className="h-4 w-4" />
      </a>
    </section>
  );
}
