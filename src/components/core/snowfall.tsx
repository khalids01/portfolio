"use client";
import * as React from "react";

export function Snowfall() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame = 0;
    let rafRunning = true;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const flakes = Array.from({ length: prefersReducedMotion ? 40 : 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.4,
      s: Math.random() * 0.6 + 0.2,
    }));

    const draw = () => {
      if (!rafRunning) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(255,255,255,0.8)";
      for (const f of flakes) {
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
        f.y += f.s;
        f.x += Math.sin((f.y + f.x) * 0.002) * 0.3;
        if (f.y > canvas.height + 5) {
          f.y = -5;
          f.x = Math.random() * canvas.width;
        }
      }
      animationFrame = requestAnimationFrame(draw);
    };

    if (!prefersReducedMotion) {
      animationFrame = requestAnimationFrame(draw);
    }

    return () => {
      rafRunning = false;
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10 opacity-50 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]"
      aria-hidden
    />
  );
}
