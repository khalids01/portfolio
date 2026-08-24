"use client";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

export function Snowfall() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    let animationFrame = 0;
    let lastFrame = 0;
    const frameInterval = 1000 / 30;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const flakeCount = window.innerWidth < 768 ? 60 : 90;
    const flakes = Array.from({ length: flakeCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.4,
      s: Math.random() * 0.6 + 0.2,
    }));

    const draw = (timestamp: number) => {
      animationFrame = requestAnimationFrame(draw);
      if (timestamp - lastFrame < frameInterval) return;
      lastFrame = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = theme === "dark" ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)";
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
    };

    const handleVisibilityChange = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = 0;

      if (!document.hidden) {
        lastFrame = performance.now();
        animationFrame = requestAnimationFrame(draw);
      }
    };

    if (!document.hidden) {
      animationFrame = requestAnimationFrame(draw);
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10 opacity-50 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]"
      aria-hidden
    />
  );
}
