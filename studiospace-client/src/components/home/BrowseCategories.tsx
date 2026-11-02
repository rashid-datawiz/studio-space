"use client";

import Link from "next/link";
import { Camera, Film, Mic, Music, Palette, ArrowUpRight } from "lucide-react";

const categories = [
  {
    name: "Photo Studios",
    slug: "photo-studios",
    icon: Camera,
    description: "Cyc walls, lighting rigs & seamless backdrops",
    count: 24,
  },
  {
    name: "Sound Stages",
    slug: "sound-stages",
    icon: Film,
    description: "Cinema-grade sets for film & video production",
    count: 18,
  },
  {
    name: "Podcast Rooms",
    slug: "podcast-rooms",
    icon: Mic,
    description: "Acoustically treated spaces for crystal-clear audio",
    count: 31,
  },
  {
    name: "Music Suites",
    slug: "music-suites",
    icon: Music,
    description: "Recording, mixing & mastering rooms",
    count: 22,
  },
  {
    name: "Art Workshops",
    slug: "art-workshops",
    icon: Palette,
    description: "Open studios for painting, sculpture & crafts",
    count: 15,
  },
];

export function BrowseCategories() {
  return (
    <section className="section-spacing border-t border-white/[0.04]">
      <div className="section-container">
        {/* Section Header */}
        <div className="mb-14 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-[#c9a87c]">
            Find Your Space
          </p>
          <h2 className="heading-section text-white">Browse by Category</h2>
          <p className="mx-auto mt-3 max-w-lg text-base text-white/50">
            Every creative discipline has a home. Find the perfect space tailored to your craft.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/studios?category=${category.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:border-[#c9a87c]/20 hover:bg-white/[0.04]"
            >
              {/* Icon */}
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#c9a87c]/10 text-[#c9a87c] transition-colors group-hover:bg-[#c9a87c]/20">
                <category.icon className="h-5 w-5" />
              </div>

              {/* Content */}
              <h3 className="text-sm font-semibold text-white">
                {category.name}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-white/40">
                {category.description}
              </p>

              {/* Count & Arrow */}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-white/30">
                  {category.count} spaces
                </span>
                <ArrowUpRight className="h-4 w-4 text-white/20 transition-all group-hover:text-[#c9a87c] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
