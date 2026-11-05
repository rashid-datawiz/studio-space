"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Heart,
  Star,
  MapPin,
  ArrowRight,
  Sparkles,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Studio, fetchStudios, getDiverseFallbackImage } from "@/lib/api";
import { StudioCardSkeleton } from "@/components/ui/studio-skeleton";

export default function WishlistPage() {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const all = await fetchStudios();
        if (!ignore) {
          // Display top rated spaces as default curated wishlist demo
          setStudios(all.slice(0, 3));
        }
      } catch {
        // fallback
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="pt-24 pb-28 min-h-screen">
      <div className="section-container">
        {/* Header */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/[0.06] pb-8">
          <div>
            <p className="mb-2 text-xs font-semibold tracking-widest text-[#c9a87c] uppercase">
              Curated Spaces
            </p>
            <h1 className="heading-section text-white flex items-center gap-3">
              <span>Saved Wishlist</span>
              <Heart className="h-6 w-6 text-rose-500 fill-rose-500/20" />
            </h1>
            <p className="mt-2 text-sm text-white/50">
              Your favorite production spaces, cyc walls, sound stages, and podcast rooms.
            </p>
          </div>

          <Button
            render={<Link href="/studios" />}
            className="rounded-xl bg-gradient-to-r from-[#c9a87c] to-[#b87333] px-5 font-semibold text-black shadow-lg shadow-[#b87333]/20 hover:opacity-90 active:scale-95 transition-all"
          >
            <Building2 className="h-4 w-4 mr-1.5" />
            Explore More Studios
          </Button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <StudioCardSkeleton />
            <StudioCardSkeleton />
            <StudioCardSkeleton />
          </div>
        ) : studios.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/10 p-16 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.03] text-rose-400">
              <Heart className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-white">Your Wishlist is Empty</h3>
            <p className="mt-2 text-sm text-white/50 max-w-md mx-auto">
              Save workspaces while exploring the catalog to quickly access and compare shoot locations.
            </p>
            <Link
              href="/studios"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#c9a87c] to-[#b87333] px-5 py-2.5 text-xs font-semibold text-black"
            >
              Discover Spaces
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {studios.map((studio) => {
              const studioId = studio.id || studio._id;
              return (
                <div
                  key={studioId}
                  className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] transition-all hover:border-white/20"
                >
                  <Link href={`/studios/${studioId}`} className="block">
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
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="rounded-full bg-black/60 border border-white/10 px-3 py-1 text-xs text-white backdrop-blur-md">
                          {studio.category}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/60 border border-white/10 px-2.5 py-1 text-xs text-white backdrop-blur-md">
                        <Star className="h-3 w-3 fill-[#c9a87c] text-[#c9a87c]" />
                        {studio.rating || 5.0}
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="heading-card text-white group-hover:text-[#c9a87c] transition-colors">
                        {studio.title}
                      </h3>
                      <div className="mt-2 flex items-center gap-1 text-xs text-white/40">
                        <MapPin className="h-3.5 w-3.5" />
                        {studio.location}
                      </div>
                      <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-4">
                        <span className="text-lg font-semibold text-[#c9a87c]">
                          ${studio.hourlyRate}{" "}
                          <span className="text-xs text-white/40 font-normal">/ hr</span>
                        </span>
                        <span className="text-xs text-emerald-400 flex items-center gap-1">
                          <Sparkles className="h-3 w-3" /> Saved Space
                        </span>
                      </div>
                    </div>
                  </Link>

                  <div className="px-5 pb-5 pt-0">
                    <Link
                      href={`/studios/${studioId}`}
                      className="flex items-center justify-center gap-2 w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 text-xs font-medium text-white/80 transition-all hover:bg-white/[0.08] hover:text-white"
                    >
                      View Studio Details
                      <ArrowRight className="h-3.5 w-3.5 text-[#c9a87c]" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
