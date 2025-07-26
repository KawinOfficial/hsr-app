import type { Metadata } from "next";
import AppProviders from "@/app/AppProviders";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/layout/navigation";
import { Toaster } from "@/components/ui/toaster";
import { Geist, Geist_Mono } from "next/font/google";
import "@/assets/globals.css";
import { ProfileProvider } from "@/features/profile/components/profile-provider";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HSR - High Speed Railways",
  description: "High Speed Railways",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProviders>
          <SpeedInsights />
          <TooltipProvider>
            <ProfileProvider>
              <Toaster />
              <Navigation>{children}</Navigation>
            </ProfileProvider>
          </TooltipProvider>
        </AppProviders>
      </body>
    </html>
  );
}
