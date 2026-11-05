"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import {
  Star,
  MapPin,
  Users,
  Shield,
  ShieldCheck,
  Check,
  ArrowLeft,
  Calendar,
  Sparkles,
  Share2,
  Heart,
  Layers,
  Clock,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Studio, fetchStudioById, getDiverseFallbackImage } from "@/lib/api";
import { BookingModal } from "@/components/studios/BookingModal";
import { StudioDetailSkeleton } from "@/components/ui/studio-skeleton";
import { toast } from "@/components/ui/apple-toast";
import { useSession } from "@/lib/auth-client";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function StudioDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const studioId = resolvedParams.id;
  const router = useRouter();

  // Better Auth Session
  const { data: session } = useSession();
  const currentUser = session?.user;

  const [studio, setStudio] = useState<Studio | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleBookNow = () => {
    if (!currentUser) {
      toast.info(
        "Sign In Required",
        "Please log in or create an account to book this workspace."
      );
      router.push(`/login?callbackUrl=/studios/${studioId}`);
      return;
    }
    setIsBookingOpen(true);
  };

  useEffect(() => {
    let isMounted = true;
    async function load() {
      setLoading(true);
      try {
        const data = await fetchStudioById(studioId);
        if (isMounted) {
          setStudio(data);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, [studioId]);

  if (loading) {
    return <StudioDetailSkeleton />;
  }

  if (!studio) {
    notFound();
  }

  const heroImage = studio.image || studio.imageUrl || getDiverseFallbackImage(studio.category);
  const galleryImages =
    studio.gallery && studio.gallery.length > 0
      ? studio.gallery
      : [heroImage];

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link Copied!", "Studio URL copied to clipboard.");
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast.info(
      isSaved ? "Removed from Favorites" : "Saved to Favorites",
      `${studio.title} updated in your creator collection.`
    );
  };

  return (
    <div className="pt-24 pb-28">
      <div className="section-container">
        {/* Navigation Breadcrumb & Actions */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/studios"
            className="inline-flex items-center gap-2 text-xs font-medium text-white/50 transition-colors hover:text-[#c9a87c]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Explore Studios
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-white/60 hover:border-white/20 hover:text-white transition-colors"
              title="Share Studio"
            >
              <Share2 className="h-4 w-4" />
            </button>
            <button
              onClick={handleSave}
              className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-colors ${
                isSaved
                  ? "border-rose-500/40 bg-rose-500/10 text-rose-400"
                  : "border-white/10 bg-white/[0.02] text-white/60 hover:border-white/20 hover:text-white"
              }`}
              title="Save Studio"
            >
              <Heart className={`h-4 w-4 ${isSaved ? "fill-rose-400" : ""}`} />
            </button>
          </div>
        </div>

        {/* Title & Metadata Strip */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="rounded-full bg-[#c9a87c]/15 border border-[#c9a87c]/30 px-3 py-0.5 text-xs font-semibold text-[#c9a87c]">
              {studio.category}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-white/60">
              <MapPin className="h-3.5 w-3.5 text-white/40" />
              {studio.location}
            </span>
            <span className="text-white/20">•</span>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-white/80">
              <Star className="h-3.5 w-3.5 fill-[#c9a87c] text-[#c9a87c]" />
              {studio.rating || 4.9} ({studio.reviewsCount || 84} creator reviews)
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white">
            {studio.title}
          </h1>
        </div>

        {/* Gallery Showcase */}
        <div className="mb-12 space-y-4">
          {/* Main Hero Image */}
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-3xl border border-white/[0.08] bg-neutral-900 shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={galleryImages[activeImageIndex] || studio.image}
              alt={studio.title}
              className="h-full w-full object-cover transition-all duration-700"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <div className="absolute bottom-4 right-4">
              <span className="rounded-full bg-black/70 border border-white/10 px-3 py-1 text-xs text-white/70 backdrop-blur-md">
                {activeImageIndex + 1} / {galleryImages.length} Photos
              </span>
            </div>
          </div>

          {/* Thumbnail Track */}
          {galleryImages.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative h-20 w-32 shrink-0 overflow-hidden rounded-2xl border transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? "border-[#c9a87c] ring-2 ring-[#c9a87c]/30 scale-[1.02]"
                      : "border-white/10 opacity-60 hover:opacity-100"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 2-Column Details & Booking Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Left Column (2 Cols): Specs, Overview, Amenities, Host, Reviews */}
          <div className="lg:col-span-2 space-y-12">
            {/* Specs Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-3xl border border-white/[0.08] bg-white/[0.02] p-5 backdrop-blur-xl">
              <div className="p-2">
                <span className="block text-[11px] font-medium uppercase tracking-wider text-white/40">
                  Hourly Rate
                </span>
                <span className="mt-1 block text-xl font-semibold text-[#c9a87c]">
                  ${studio.hourlyRate}
                  <span className="text-xs text-white/40 font-normal"> / hr</span>
                </span>
              </div>

              <div className="p-2 border-l border-white/[0.06]">
                <span className="block text-[11px] font-medium uppercase tracking-wider text-white/40">
                  Security Deposit
                </span>
                <span className="mt-1 block text-xl font-semibold text-white">
                  ${studio.securityDeposit || 100}
                </span>
              </div>

              <div className="p-2 border-l border-white/[0.06]">
                <span className="block text-[11px] font-medium uppercase tracking-wider text-white/40">
                  Max Capacity
                </span>
                <span className="mt-1 flex items-center gap-1.5 text-xl font-semibold text-white">
                  <Users className="h-4 w-4 text-[#c9a87c]" />
                  {studio.maxCapacity || 15}
                </span>
              </div>

              <div className="p-2 border-l border-white/[0.06]">
                <span className="block text-[11px] font-medium uppercase tracking-wider text-white/40">
                  Dimensions
                </span>
                <span className="mt-1 flex items-center gap-1.5 text-xl font-semibold text-white">
                  <Layers className="h-4 w-4 text-[#c9a87c]" />
                  {studio.squareFeet || 1500}{" "}
                  <span className="text-xs text-white/40 font-normal">sq ft</span>
                </span>
              </div>
            </div>

            {/* Overview Section */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4 tracking-tight">
                About This Workspace
              </h2>
              <div className="text-sm md:text-base leading-relaxed text-white/70 space-y-4">
                <p>{studio.overview}</p>
              </div>
            </div>

            {/* Amenities Grid */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-5 tracking-tight flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#c9a87c]" />
                Included Amenities & Gear
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {studio.amenities && studio.amenities.length > 0 ? (
                  studio.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3.5"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-[#c9a87c]/10 text-[#c9a87c]">
                        <Check className="h-4 w-4" />
                      </div>
                      <span className="text-xs font-medium text-white/80">
                        {amenity}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-white/40">
                    Standard studio gear and amenities included.
                  </p>
                )}
              </div>
            </div>

            {/* Host Profile Card */}
            <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8 backdrop-blur-xl">
              <h2 className="text-lg font-semibold text-white mb-4">
                Hosted by {studio.ownerName}
              </h2>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-[#c9a87c]/40 ring-2 ring-[#c9a87c]/20">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={studio.ownerAvatar || "/images/avatar-alex.jpg"}
                      alt={studio.ownerName}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">
                        {studio.ownerName}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                        <Shield className="h-2.5 w-2.5" />
                        Verified
                      </span>
                    </div>
                    <p className="text-xs text-white/40">{studio.ownerEmail}</p>
                    <p className="mt-1 text-[11px] text-white/50 flex items-center gap-2">
                      <Clock className="h-3 w-3 text-[#c9a87c]" />
                      Response time: under 1 hour
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={() =>
                    toast.info(
                      "Message Host",
                      `Direct messaging with ${studio.ownerName} will be available upon booking confirmation.`
                    )
                  }
                  className="rounded-xl border-white/10 text-xs text-white/80 hover:bg-white/[0.06] hover:text-white"
                >
                  <MessageCircle className="h-3.5 w-3.5 mr-2" />
                  Contact Host
                </Button>
              </div>
            </div>

            {/* Verified Creator Reviews */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-white tracking-tight">
                    Creator Reviews
                  </h2>
                  <p className="text-xs text-white/40 mt-1">
                    Rated {studio.rating || 4.9} out of 5 based on verified
                    production sessions.
                  </p>
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold text-white">
                  <Star className="h-4 w-4 fill-[#c9a87c] text-[#c9a87c]" />
                  {studio.rating || 4.9} / 5.0
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">
                      Julian K. — Commercial Director
                    </span>
                    <span className="text-[11px] text-white/40">2 weeks ago</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-3 w-3 fill-[#c9a87c] text-[#c9a87c]"
                      />
                    ))}
                  </div>
                  <p className="text-xs leading-relaxed text-white/60">
                    &quot;Exceptional stage setup. The cyclorama wall was freshly
                    painted and clean. Audio isolation was rock solid with zero street
                    bleed. Booking was completely seamless.&quot;
                  </p>
                </div>

                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">
                      Maya Lin — Fashion Photographer
                    </span>
                    <span className="text-[11px] text-white/40">1 month ago</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-3 w-3 fill-[#c9a87c] text-[#c9a87c]"
                      />
                    ))}
                  </div>
                  <p className="text-xs leading-relaxed text-white/60">
                    &quot;The daylight quality in this space is unreal. Host Alex was
                    super communicative and the equipment was organized and ready
                    to roll when our team arrived.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (1 Col): Sticky Booking Card */}
          <div className="sticky top-24 rounded-3xl border border-white/[0.08] bg-[#121212]/95 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl space-y-6">
            <div className="flex items-baseline justify-between border-b border-white/[0.08] pb-5">
              <div>
                <span className="text-3xl font-semibold text-[#c9a87c]">
                  ${studio.hourlyRate}
                </span>
                <span className="text-sm text-white/40"> / hour</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-white/60">
                <Star className="h-3.5 w-3.5 fill-[#c9a87c] text-[#c9a87c]" />
                {studio.rating || 4.9}
              </div>
            </div>

            {/* Quick Summary Highlights */}
            <div className="space-y-3 text-xs text-white/60">
              <div className="flex justify-between">
                <span>Security Deposit</span>
                <span className="text-white">${studio.securityDeposit || 100}</span>
              </div>
              <div className="flex justify-between">
                <span>Cancellation</span>
                <span className="text-emerald-400">Free up to 24h</span>
              </div>
              <div className="flex justify-between">
                <span>Instant Confirmation</span>
                <span className="text-[#c9a87c]">Guaranteed</span>
              </div>
            </div>

            {/* Primary Action Button */}
            <Button
              size="lg"
              onClick={handleBookNow}
              className="w-full h-12 rounded-2xl bg-gradient-to-r from-[#c9a87c] to-[#b87333] font-semibold text-black shadow-xl shadow-[#b87333]/25 hover:opacity-90 active:scale-95 transition-all cursor-pointer"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Book Workspace Now
            </Button>

            {!currentUser ? (
              <p className="text-[11px] text-[#c9a87c]/90 text-center font-medium">
                Log in or register to reserve this workspace
              </p>
            ) : (
              <div className="flex items-center justify-center gap-2 text-[11px] text-white/40 text-center">
                <ShieldCheck className="h-3.5 w-3.5 text-[#c9a87c]" />
                <span>You won&apos;t be charged until confirmed</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        studio={studio}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
}
