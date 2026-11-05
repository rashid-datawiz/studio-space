"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Star,
  MapPin,
  Search,
  Camera,
  Film,
  Mic,
  Music,
  Palette,
  LayoutGrid,
  X,
  SlidersHorizontal,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Studio, fetchStudios, getDiverseFallbackImage } from "@/lib/api";
import { StudioGridSkeleton } from "@/components/ui/studio-skeleton";

const CATEGORY_ITEMS = [
  { name: "All Spaces", slug: "", icon: LayoutGrid },
  { name: "Photo Studios", slug: "photo-studio", icon: Camera },
  { name: "Film Stages", slug: "film-stage", icon: Film },
  { name: "Podcast Lounges", slug: "podcast-lounge", icon: Mic },
  { name: "Music Suites", slug: "music-suite", icon: Music },
  { name: "Art Workshops", slug: "workshop", icon: Palette },
];

function StudiosList() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") ?? "";

  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [prevParam, setPrevParam] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recommended");

  if (categoryParam !== prevParam) {
    setPrevParam(categoryParam);
    setActiveCategory(categoryParam);
  }

  // Load Studios dynamically
  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const data = await fetchStudios();
        if (isMounted) {
          setStudios(data);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter and Sort
  const filteredStudios = useMemo(() => {
    let result = studios.filter((studio) => {
      const matchCat = activeCategory
        ? studio.category
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "")
            .includes(activeCategory.toLowerCase().replace(/[^a-z0-9]/g, ""))
        : true;

      const q = searchQuery.toLowerCase();
      const matchSearch = q
        ? studio.title.toLowerCase().includes(q) ||
          studio.location.toLowerCase().includes(q) ||
          studio.category.toLowerCase().includes(q)
        : true;

      return matchCat && matchSearch;
    });

    if (sortBy === "price-low") {
      result = [...result].sort((a, b) => a.hourlyRate - b.hourlyRate);
    } else if (sortBy === "price-high") {
      result = [...result].sort((a, b) => b.hourlyRate - a.hourlyRate);
    } else if (sortBy === "rating") {
      result = [...result].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [studios, activeCategory, searchQuery, sortBy]);

  return (
    <div className="pt-24 pb-28">
      <div className="section-container">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.06] pb-8">
          <div>
            <p className="mb-2 text-xs font-semibold tracking-widest text-[#c9a87c] uppercase">
              Creative Workspaces
            </p>
            <h1 className="heading-section text-white">Explore Studios</h1>
            <p className="mt-2 text-sm text-white/50 max-w-xl">
              Discover, filter, and reserve cinema-grade sound stages,
              photography cyc lofts, music suites, and podcast booths.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              render={<Link href="/add-studio" />}
              className="h-10 rounded-xl border-white/10 text-xs font-medium text-white/80 hover:bg-white/[0.06] hover:text-white"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#c9a87c] mr-2" />
              List a Studio
            </Button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search Box */}
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              placeholder="Search by studio title, equipment, city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] pl-11 pr-10 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-[#c9a87c]/30"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute top-1/2 right-3.5 -translate-y-1/2 text-white/40 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Sort & Count */}
          <div className="flex items-center justify-between lg:justify-end gap-4">
            <span className="text-xs text-white/40">
              {filteredStudios.length} {filteredStudios.length === 1 ? "space" : "spaces"} found
            </span>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-3.5 w-3.5 text-white/40" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-10 rounded-xl border border-white/10 bg-[#161616] px-3 text-xs text-white outline-none focus:border-[#c9a87c]/40 cursor-pointer"
              >
                <option value="recommended">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mb-10 flex flex-wrap gap-2">
          {CATEGORY_ITEMS.map((cat) => {
            const isActive =
              (cat.slug === "" && activeCategory === "") ||
              (cat.slug !== "" &&
                activeCategory.toLowerCase().includes(cat.slug.toLowerCase()));

            return (
              <button
                key={cat.name}
                onClick={() =>
                  setActiveCategory(
                    activeCategory.toLowerCase().includes(cat.slug.toLowerCase()) &&
                      cat.slug !== ""
                      ? ""
                      : cat.slug
                  )
                }
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? "border-[#c9a87c]/50 bg-[#c9a87c]/15 text-[#c9a87c] shadow-sm shadow-[#c9a87c]/20"
                    : "border-white/[0.08] bg-white/[0.02] text-white/60 hover:border-white/20 hover:text-white"
                }`}
              >
                <cat.icon className="h-3.5 w-3.5" />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Studios Content */}
        {loading ? (
          <StudioGridSkeleton count={6} />
        ) : filteredStudios.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredStudios.map((studio) => (
              <Link
                key={studio.id}
                href={`/studios/${studio.id}`}
                className="group block"
              >
                <div className="hover-lift overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] transition-all">
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={studio.image || studio.imageUrl || getDiverseFallbackImage(studio.category)}
                      alt={studio.title}
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.onerror = null;
                        target.src = getDiverseFallbackImage(studio.category);
                      }}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-3.5 left-3.5">
                      <span className="inline-flex items-center rounded-full border border-white/15 bg-black/60 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-md">
                        {studio.category}
                      </span>
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute top-3.5 right-3.5">
                      <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md">
                        <Star className="h-3 w-3 fill-[#c9a87c] text-[#c9a87c]" />
                        {studio.rating || 5.0}
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-5">
                    <h3 className="heading-card text-white tracking-tight group-hover:text-[#c9a87c] transition-colors">
                      {studio.title}
                    </h3>

                    <div className="mt-2 flex items-center gap-1 text-xs text-white/40">
                      <MapPin className="h-3.5 w-3.5 text-white/30 shrink-0" />
                      <span className="truncate">{studio.location}</span>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-4">
                      <div>
                        <span className="text-lg font-semibold text-[#c9a87c]">
                          ${studio.hourlyRate}
                        </span>
                        <span className="text-xs text-white/40"> / hr</span>
                      </div>

                      <span className="inline-flex items-center gap-1 text-xs font-medium text-white/70 group-hover:text-[#c9a87c] transition-colors">
                        View Details
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center rounded-3xl border border-white/[0.06] bg-white/[0.01]">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.03]">
              <Search className="h-7 w-7 text-white/20" />
            </div>
            <h3 className="text-lg font-semibold text-white">
              No Studio Spaces Found
            </h3>
            <p className="mt-2 max-w-sm text-sm text-white/40">
              We couldn&apos;t find any studios matching your current search or
              category filters.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Button
                variant="outline"
                className="rounded-xl border-white/10 text-white/70 hover:bg-white/[0.06] hover:text-white"
                onClick={() => {
                  setActiveCategory("");
                  setSearchQuery("");
                }}
              >
                Clear Filters
              </Button>
              <Button
                render={<Link href="/add-studio" />}
                className="rounded-xl bg-gradient-to-r from-[#c9a87c] to-[#b87333] font-medium text-black"
              >
                List Your Studio
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function StudiosPage() {
  return (
    <Suspense fallback={<StudioGridSkeleton count={6} />}>
      <StudiosList />
    </Suspense>
  );
}
