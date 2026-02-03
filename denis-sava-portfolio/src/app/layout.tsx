import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import PrismBackground from "@/components/PrismBackground";

const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const fontDisplay = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Denis Sava — Design Portfolio",
    template: "%s · Denis Sava",
  },
  description:
    "Ultra-minimal design portfolio featuring Graphic, Web, and UI/UX work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontDisplay.variable}`}
      suppressHydrationWarning
    >
      <body
        className="min-h-dvh bg-background text-foreground antialiased"
        suppressHydrationWarning
      >
        <div className="fixed inset-0 -z-10">
          <PrismBackground
            className="opacity-[0.12]"
            animationType="3drotate"
            noise={0.25}
            glow={1}
            bloom={1}
            timeScale={0.35}
            suspendWhenOffscreen
          />
        </div>
        <Nav />
        <main className="min-h-dvh">{children}</main>
      </body>
    </html>
  );
}
