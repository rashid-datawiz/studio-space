"use client";

import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
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
  Loader2,
} from "lucide-react";

/* ── Static studio data (will be connected to MongoDB API) ──────── */
const allStudios = [
  {
    id: "1",
    title: "Aurora Photo Lab",
    category: "Photo Studios",
    slug: "photo-studios",
    image: "/images/studio-photo-1.jpg",
    location: "Brooklyn, NY",
    rating: 4.9,
    reviews: 128,
    price: 85,
  },
  {
    id: "2",
    title: "Echo Sound Stage",
    category: "Sound Stages",
    slug: "sound-stages",
    image: "/images/studio-sound-1.jpg",
    location: "Los Angeles, CA",
    rating: 4.8,
    reviews: 96,
    price: 150,
  },
  {
    id: "3",
    title: "The Podcast Loft",
    category: "Podcast Rooms",
    slug: "podcast-rooms",
    image: "/images/studio-podcast-1.jpg",
    location: "Austin, TX",
    rating: 4.9,
    reviews: 74,
    price: 45,
  },
  {
    id: "4",
    title: "Velvet Recording Suite",
    category: "Music Suites",
    slug: "music-suites",
    image: "/images/studio-music-1.jpg",
    location: "Nashville, TN",
    rating: 5.0,
    reviews: 112,
    price: 120,
  },
  {
    id: "5",
    title: "Canvas Art Workshop",
    category: "Art Workshops",
    slug: "art-workshops",
    image: "/images/studio-art-1.jpg",
    location: "Portland, OR",
    rating: 4.7,
    reviews: 53,
    price: 55,
  },
  {
    id: "6",
    title: "Lumière Film Stage",
    category: "Sound Stages",
    slug: "sound-stages",
    image: "/images/studio-sound-2.jpg",
    location: "Chicago, IL",
    rating: 4.8,
    reviews: 87,
    price: 200,
  },
  {
    id: "7",
    title: "Prism Photography Hub",
    category: "Photo Studios",
    slug: "photo-studios",
    image: "/images/studio-photo-2.jpg",
    location: "San Francisco, CA",
    rating: 4.6,
    reviews: 42,
    price: 95,
  },
  {
    id: "8",
    title: "Wavelength Studio",
    category: "Music Suites",
    slug: "music-suites",
    image: "/images/studio-music-2.jpg",
    location: "Miami, FL",
    rating: 4.9,
    reviews: 68,
    price: 110,
  },
  {
    id: "9",
    title: "Voice Box Podcast Suite",
    category: "Podcast Rooms",
    slug: "podcast-rooms",
    image: "/images/studio-podcast-2.jpg",
    location: "Seattle, WA",
    rating: 4.7,
    reviews: 35,
    price: 50,
  },
];

const categories = [
  { name: "All", slug: "", icon: LayoutGrid },
  { name: "Photo Studios", slug: "photo-studios", icon: Camera },
  { name: "Sound Stages", slug: "sound-stages", icon: Film },
  { name: "Podcast Rooms", slug: "podcast-rooms", icon: Mic },
  { name: "Music Suites", slug: "music-suites", icon: Music },
  { name: "Art Workshops", slug: "art-workshops", icon: Palette },
];

function StudiosList() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") ?? "";

  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudios = useMemo(() => {
    return allStudios.filter((studio) => {
      const matchCategory = activeCategory
        ? studio.slug === activeCategory
        : true;
      const matchSearch = searchQuery
        ? studio.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          studio.location.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="pt-24 pb-20">
      <div className="section-container">
        {/* Page Header */}
        <div className="mb-10">
          <p className="mb-2 text-xs font-semibold tracking-widest text-[#c9a87c] uppercase">
            Discovery
          </p>
          <h1 className="heading-section text-white">Explore Studios</h1>
          <p className="mt-2 text-base text-white/50">
            Discover and book verified creative spaces for your next shoot or production
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <div className="relative w-full max-w-md">
            <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              placeholder="Search studios by title or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 w-full rounded-xl border border-white/[0.08] bg-white/[0.03] pl-11 pr-10 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-[#c9a87c]/30"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-white/30 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Results count */}
          <p className="text-sm text-white/40">
            {filteredStudios.length} studio{filteredStudios.length !== 1 ? "s" : ""} available
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.slug}
              onClick={() =>
                setActiveCategory(
                  activeCategory === category.slug ? "" : category.slug
                )
              }
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all cursor-pointer",
                activeCategory === category.slug
                  ? "border-[#c9a87c]/40 bg-[#c9a87c]/10 text-[#c9a87c]"
                  : "border-white/[0.06] text-white/50 hover:border-white/[0.12] hover:text-white/80"
              )}
            >
              <category.icon className="h-3.5 w-3.5" />
              {category.name}
            </button>
          ))}
        </div>

        {/* Studios Grid */}
        {filteredStudios.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredStudios.map((studio) => (
              <Link
                key={studio.id}
                href={`/studios/${studio.id}`}
                className="group"
              >
                <div className="hover-lift overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={studio.image}
                      alt={studio.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center rounded-full border border-white/10 bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                        {studio.category}
                      </span>
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md">
                        <Star className="h-3 w-3 fill-[#c9a87c] text-[#c9a87c]" />
                        {studio.rating}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-medium tracking-tight text-white transition-colors group-hover:text-[#c9a87c]">
                      {studio.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-1 text-sm text-white/40">
                      <MapPin className="h-3.5 w-3.5" />
                      {studio.location}
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-4">
                      <div>
                        <span className="text-lg font-semibold text-[#c9a87c]">
                          ${studio.price}
                        </span>
                        <span className="text-sm text-white/30"> / hr</span>
                      </div>
                      <span className="text-xs text-white/30">
                        {studio.reviews} reviews
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.03]">
              <Search className="h-6 w-6 text-white/20" />
            </div>
            <h3 className="text-lg font-medium text-white">No studios found</h3>
            <p className="mt-2 text-sm text-white/40">
              Try adjusting your search or category filter
            </p>
            <Button
              variant="outline"
              className="mt-6 border-white/10 text-white/60"
              onClick={() => {
                setActiveCategory("");
                setSearchQuery("");
              }}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function StudiosPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#c9a87c]" />
        </div>
      }
    >
      <StudiosList />
    </Suspense>
  );
}
