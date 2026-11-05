"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Star, MapPin, ArrowRight, Sparkles } from "lucide-react";
import { Studio, fetchFeaturedStudios, getDiverseFallbackImage } from "@/lib/api";
import { StudioGridSkeleton } from "@/components/ui/studio-skeleton";

export function FeaturedStudios() {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const data = await fetchFeaturedStudios(6);
        if (!ignore) {
          setStudios(data);
        }
      } catch (err) {
        console.error("Failed to load featured studios:", err);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section className="section-spacing">
      <div className="section-container">
        {/* Section Header */}
        <div className="mb-14 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-xs font-semibold tracking-widest text-[#c9a87c] uppercase">
              Curated for You
            </p>
            <h2 className="heading-section text-white">Featured Studios</h2>
            <p className="mt-3 max-w-md text-base text-white/50">
              Discover top-rated and newly published creative workspaces
            </p>
          </div>
          <Link
            href="/studios"
            className="group flex items-center gap-2 text-sm font-medium text-[#c9a87c] transition-colors hover:text-[#b87333]"
          >
            View all studios
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <StudioGridSkeleton count={6} />
        ) : studios.length === 0 ? (
          /* Empty State */
          <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center">
            <Sparkles className="mx-auto h-8 w-8 text-[#c9a87c] mb-3" />
            <h3 className="text-lg font-medium text-white">No Studios Listed Yet</h3>
            <p className="mt-1 text-sm text-white/40">
              Be the first host to list a creative space on StudioSpace.
            </p>
            <Link
              href="/add-studio"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#c9a87c] to-[#b87333] px-5 py-2.5 text-xs font-semibold text-black transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              List Your Space
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ) : (
          /* Studio Grid */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {studios.map((studio) => {
              const studioId = studio.id || studio._id;
              return (
                <div
                  key={studioId}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.03] hover-lift"
                >
                  <Link href={`/studios/${studioId}`} className="block">
                    {/* Image */}
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
                        loading="lazy"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Category Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                          {studio.category}
                        </span>
                      </div>

                      {/* Rating Badge */}
                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md">
                          <Star className="h-3 w-3 fill-[#c9a87c] text-[#c9a87c]" />
                          {(studio.rating ?? 5.0).toFixed(1)}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="heading-card text-white transition-colors group-hover:text-[#c9a87c] line-clamp-1">
                        {studio.title}
                      </h3>
                      <div className="mt-2 flex items-center gap-1.5 text-sm text-white/40">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-[#c9a87c]/70" />
                        <span className="truncate">{studio.location}</span>
                      </div>
                      <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-4">
                        <div>
                          <span className="text-lg font-semibold text-[#c9a87c]">
                            ${studio.hourlyRate}
                          </span>
                          <span className="text-sm text-white/30"> / hr</span>
                        </div>
                        <span className="text-xs text-white/30">
                          {studio.reviewsCount ?? 0} reviews
                        </span>
                      </div>
                    </div>
                  </Link>

                  {/* View Details CTA Button */}
                  <div className="px-5 pb-5 pt-0">
                    <Link
                      href={`/studios/${studioId}`}
                      className="flex items-center justify-center gap-2 w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 text-xs font-medium text-white/80 transition-all hover:bg-white/[0.08] hover:text-white hover:border-white/20 active:scale-[0.98]"
                    >
                      View Details
                      <ArrowRight className="h-3.5 w-3.5 text-[#c9a87c] transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
