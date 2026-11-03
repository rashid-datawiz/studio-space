import Link from "next/link";
import { Aperture, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[85vh] items-center justify-center px-4 py-24">
      <div className="relative text-center max-w-lg">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-[#c9a87c]/10 blur-3xl pointer-events-none" />

        {/* Aperture Spotlight Illustration */}
        <div className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.03] shadow-2xl backdrop-blur-xl">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#c9a87c] via-[#b87333] to-[#8c501e] shadow-lg shadow-[#b87333]/30">
            <Aperture className="h-8 w-8 text-black" strokeWidth={2.5} />
          </div>
          <span className="absolute -top-2 -right-2 rounded-full bg-rose-500/20 border border-rose-500/30 px-2 py-0.5 text-[10px] font-semibold text-rose-300">
            404
          </span>
        </div>

        {/* Content */}
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c9a87c]">
          Stage is Empty
        </p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight text-white">
          Studio Not Found
        </h1>
        <p className="mt-4 text-base leading-relaxed text-white/50">
          The creative space you are looking for has been moved, archived, or is
          currently booked for a private shoot.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            size="lg"
            className="rounded-xl bg-gradient-to-r from-[#c9a87c] to-[#b87333] px-6 text-sm font-semibold text-black shadow-lg shadow-[#b87333]/20 hover:opacity-90 active:scale-95 transition-all"
            render={<Link href="/" />}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Return to Home
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="rounded-xl border border-white/10 px-6 text-sm text-white/70 hover:bg-white/[0.06] hover:text-white"
            render={<Link href="/studios" />}
          >
            <Search className="h-4 w-4 mr-2" />
            Explore Studios
          </Button>
        </div>
      </div>
    </div>
  );
}
