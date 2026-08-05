import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/core/theme-provider";
import { QueryProvider } from "@/components/core/query-provider";
import { VisitorTracker } from "@/features/analytics/components/visitor-tracker";
import { SsoProvider } from "@/lib/auth-client"
import { getInitialAuthSession } from "@/lib/auth-session.server"
import type { ReactNode } from "react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Khalid",
  description: "Khalid's Portfolio",
  icons: {
    icon: "/icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const bootstrap = await getInitialAuthSession()
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <VisitorTracker />
        <ThemeProvider>
          <QueryProvider>
            <SsoProvider bootstrap={bootstrap}>{children}</SsoProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
