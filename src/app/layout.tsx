import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/core/theme-provider";
import { QueryProvider } from "@/components/core/query-provider";
import { VisitorTracker } from "@/features/analytics/components/visitor-tracker";
import { SkyCanvasProvider } from "@skycanvasstudio/sso/react";
import { skycanvas } from "@/lib/skycanvas";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export {metadata} from "@/lib/meta-data"  

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const bootstrap = await skycanvas.getBootstrap();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <VisitorTracker />
        <ThemeProvider>
          <QueryProvider>
            <SkyCanvasProvider bootstrap={bootstrap}>{children}</SkyCanvasProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
