import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { ToastProvider } from "@/components/ui/apple-toast";

export const metadata: Metadata = {
  title: "StudioSpace — Book Creative Studios Instantly",
  description:
    "Discover and book professional creative spaces. Photography studios, sound stages, podcast rooms, music suites, and art workshops — all in one marketplace.",
  keywords: [
    "studio booking",
    "creative space",
    "photography studio",
    "sound stage",
    "podcast room",
    "music studio",
    "art workshop",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className="h-full antialiased dark"
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-white font-sans selection:bg-[#c9a87c] selection:text-[#0a0a0a]">
        <ToastProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
