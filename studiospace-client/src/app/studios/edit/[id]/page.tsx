"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Building2,
  UploadCloud,
  Check,
  Plus,
  Sparkles,
  ArrowLeft,
  DollarSign,
  Users,
  MapPin,
  Layers,
  FileText,
  User,
  Shield,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchStudioById, updateStudio, uploadImageToImgBB } from "@/lib/api";
import { toast } from "@/components/ui/apple-toast";

const STUDIO_CATEGORIES = [
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Workshop",
  "Creative Loft",
  "Art Gallery",
  "Dance Studio",
];

const PRESET_AMENITIES = [
  "High-Speed Wi-Fi",
  "White Cyc Wall",
  "Sound Isolated STC 60",
  "Lighting Grid 20ft",
  "Central Air Conditioning",
  "Green Room / Lounge",
  "Hair & Makeup Station",
  "Freight Elevator Access",
  "Kitchenette & Espresso Bar",
  "24/7 Secure Keycard Access",
  "Dedicated Loading Dock & Parking",
  "Blackout Blinds",
  "Profoto Strobes Available",
  "4K Video Podcast Rig",
];

interface EditProps {
  params: Promise<{ id: string }>;
}

export default function EditStudioPage({ params }: EditProps) {
  const resolvedParams = use(params);
  const studioId = resolvedParams.id;

  const router = useRouter();

  // Loading existing studio data
  const [loading, setLoading] = useState(true);

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(STUDIO_CATEGORIES[0]);
  const [hourlyRate, setHourlyRate] = useState<number | "">("");
  const [securityDeposit, setSecurityDeposit] = useState<number | "">(100);
  const [maxCapacity, setMaxCapacity] = useState<number | "">(10);
  const [squareFeet, setSquareFeet] = useState<number | "">(1200);
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [customAmenity, setCustomAmenity] = useState("");
  const [overview, setOverview] = useState("");
  const [hostName, setHostName] = useState("Alex Rivera");
  const [hostEmail, setHostEmail] = useState("alex@creatorstudio.io");

  // UI States
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setLoading(true);
      try {
        const data = await fetchStudioById(studioId);
        if (data && isMounted) {
          setTitle(data.title);
          setCategory(data.category);
          setHourlyRate(data.hourlyRate);
          setSecurityDeposit(data.securityDeposit || 100);
          setMaxCapacity(data.maxCapacity || 10);
          setSquareFeet(data.squareFeet || 1200);
          setLocation(data.location);
          setImageUrl(data.image);
          setSelectedAmenities(data.amenities || []);
          setOverview(data.overview || "");
          if (data.ownerName) setHostName(data.ownerName);
          if (data.ownerEmail) setHostEmail(data.ownerEmail);
        }
      } catch {
        toast.error("Error", "Could not load studio information.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, [studioId]);

  const toggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const addCustomAmenity = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      customAmenity.trim() &&
      !selectedAmenities.includes(customAmenity.trim())
    ) {
      setSelectedAmenities([...selectedAmenities, customAmenity.trim()]);
      setCustomAmenity("");
    }
  };

  const handleImageFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadImageToImgBB(file);
      setImageUrl(url);
      toast.success("Image Updated", "New studio image is ready.");
    } catch {
      toast.error(
        "Upload Notice",
        "Could not upload image. Please provide a direct image URL."
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !hourlyRate || !location.trim() || !imageUrl.trim()) {
      toast.error(
        "Required Fields",
        "Please provide title, hourly rate, location, and studio image."
      );
      return;
    }

    setIsSubmitting(true);
    try {
      await updateStudio(studioId, {
        title: title.trim(),
        category,
        hourlyRate: Number(hourlyRate),
        securityDeposit: Number(securityDeposit) || 100,
        maxCapacity: Number(maxCapacity) || 10,
        squareFeet: Number(squareFeet) || 1200,
        location: location.trim(),
        image: imageUrl.trim(),
        gallery: [imageUrl.trim()],
        amenities: selectedAmenities,
        overview: overview.trim(),
      });

      toast.success(
        "Studio Updated!",
        `Changes to "${title}" have been saved.`
      );
      router.push("/my-listings");
    } catch {
      toast.error(
        "Update Failed",
        "Unable to save studio changes. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="section-container max-w-4xl pt-28 pb-20 space-y-6 animate-pulse">
        <div className="h-4 w-36 rounded-md bg-white/10" />
        <div className="h-10 w-64 rounded-xl bg-white/10" />
        <div className="h-96 rounded-3xl bg-white/[0.03]" />
      </div>
    );
  }

  return (
    <div className="pt-24 pb-28">
      <div className="section-container max-w-4xl">
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/my-listings"
            className="inline-flex items-center gap-2 text-xs font-medium text-white/50 transition-colors hover:text-[#c9a87c]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to My Studio Listings
          </Link>
        </div>

        {/* Page Title */}
        <div className="mb-10">
          <p className="mb-2 text-xs font-semibold tracking-widest text-[#c9a87c] uppercase">
            Workspace Configuration
          </p>
          <h1 className="heading-section text-white">Update Studio Space</h1>
          <p className="mt-2 text-sm text-white/50">
            Edit specifications, hourly rates, amenities, and photos for this
            workspace.
          </p>
        </div>

        {/* Update Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Card 1: Core Details */}
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8 backdrop-blur-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-white/[0.06] pb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#c9a87c]/10 text-[#c9a87c]">
                <Building2 className="h-4.5 w-4.5" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-white">
                  Space Specifications
                </h2>
                <p className="text-xs text-white/40">
                  Update title, category, pricing, and guest capacity.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Title */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium uppercase tracking-wider text-white/70 mb-2">
                  Studio Title <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#c9a87c]/40 transition-colors"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-white/70 mb-2">
                  Category <span className="text-rose-400">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#161616] px-4 py-3 text-sm text-white outline-none focus:border-[#c9a87c]/40 transition-colors cursor-pointer"
                >
                  {STUDIO_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-white/70 mb-2">
                  Location / City <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-white/30" />
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#c9a87c]/40 transition-colors"
                  />
                </div>
              </div>

              {/* Hourly Rate */}
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-white/70 mb-2">
                  Hourly Rate ($ / hr) <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <DollarSign className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-white/30" />
                  <input
                    type="number"
                    min="1"
                    required
                    value={hourlyRate}
                    onChange={(e) =>
                      setHourlyRate(
                        e.target.value === "" ? "" : Number(e.target.value)
                      )
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#c9a87c]/40 transition-colors"
                  />
                </div>
              </div>

              {/* Security Deposit */}
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-white/70 mb-2">
                  Refundable Security Deposit ($)
                </label>
                <div className="relative">
                  <DollarSign className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-white/30" />
                  <input
                    type="number"
                    min="0"
                    value={securityDeposit}
                    onChange={(e) =>
                      setSecurityDeposit(
                        e.target.value === "" ? "" : Number(e.target.value)
                      )
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#c9a87c]/40 transition-colors"
                  />
                </div>
              </div>

              {/* Max Capacity */}
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-white/70 mb-2">
                  Max Capacity (Guests)
                </label>
                <div className="relative">
                  <Users className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-white/30" />
                  <input
                    type="number"
                    min="1"
                    value={maxCapacity}
                    onChange={(e) =>
                      setMaxCapacity(
                        e.target.value === "" ? "" : Number(e.target.value)
                      )
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#c9a87c]/40 transition-colors"
                  />
                </div>
              </div>

              {/* Dimensions */}
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-white/70 mb-2">
                  Studio Size (Sq. Ft.)
                </label>
                <div className="relative">
                  <Layers className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-white/30" />
                  <input
                    type="number"
                    min="50"
                    value={squareFeet}
                    onChange={(e) =>
                      setSquareFeet(
                        e.target.value === "" ? "" : Number(e.target.value)
                      )
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#c9a87c]/40 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Image System */}
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8 backdrop-blur-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-white/[0.06] pb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#c9a87c]/10 text-[#c9a87c]">
                <UploadCloud className="h-4.5 w-4.5" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-white">
                  Studio Imagery
                </h2>
                <p className="text-xs text-white/40">
                  Update cover photo or replace with a new image.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div>
                <label className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.02] p-6 text-center hover:border-[#c9a87c]/40 transition-colors cursor-pointer group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="sr-only"
                    disabled={isUploading}
                  />
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] text-[#c9a87c] group-hover:bg-[#c9a87c]/10 transition-colors mb-3">
                    {isUploading ? (
                      <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                      <UploadCloud className="h-6 w-6" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-white">
                    {isUploading ? "Uploading Image..." : "Upload New Image"}
                  </span>
                  <span className="mt-1 text-xs text-white/40">
                    PNG, JPG, or WEBP up to 10MB
                  </span>
                </label>

                <div className="mt-4">
                  <span className="block text-[11px] font-medium uppercase tracking-wider text-white/50 mb-1.5">
                    Or Edit Direct Image URL:
                  </span>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs text-white placeholder:text-white/20 outline-none focus:border-[#c9a87c]/40"
                  />
                </div>
              </div>

              <div>
                <span className="block text-xs font-medium uppercase tracking-wider text-white/60 mb-2">
                  Image Preview
                </span>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-neutral-900">
                  {imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imageUrl}
                      alt="Studio preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center text-center p-6 text-white/30">
                      <Building2 className="h-10 w-10 mb-2 stroke-[1.5]" />
                      <p className="text-xs">No image provided</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Amenities */}
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8 backdrop-blur-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-white/[0.06] pb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#c9a87c]/10 text-[#c9a87c]">
                <Sparkles className="h-4.5 w-4.5" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-white">
                  Studio Amenities & Equipment
                </h2>
                <p className="text-xs text-white/40">
                  Add or remove equipment and amenities.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {PRESET_AMENITIES.map((amenity) => {
                const isSelected = selectedAmenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => toggleAmenity(amenity)}
                    className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-medium transition-all cursor-pointer ${
                      isSelected
                        ? "border-[#c9a87c]/50 bg-[#c9a87c]/15 text-[#c9a87c]"
                        : "border-white/10 bg-white/[0.02] text-white/60 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {isSelected ? (
                      <Check className="h-3.5 w-3.5 text-[#c9a87c]" />
                    ) : (
                      <Plus className="h-3.5 w-3.5 text-white/40" />
                    )}
                    {amenity}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                placeholder="Add custom amenity..."
                value={customAmenity}
                onChange={(e) => setCustomAmenity(e.target.value)}
                className="w-full max-w-xs rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs text-white placeholder:text-white/20 outline-none focus:border-[#c9a87c]/40"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addCustomAmenity}
                className="rounded-xl border-white/10 text-white/70 hover:bg-white/[0.06] hover:text-white"
              >
                Add Tag
              </Button>
            </div>
          </div>

          {/* Card 4: Overview Description */}
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8 backdrop-blur-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-white/[0.06] pb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#c9a87c]/10 text-[#c9a87c]">
                <FileText className="h-4.5 w-4.5" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-white">
                  Detailed Overview
                </h2>
                <p className="text-xs text-white/40">
                  Update your studio description.
                </p>
              </div>
            </div>

            <textarea
              rows={5}
              required
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#c9a87c]/40 leading-relaxed transition-colors"
            />
          </div>

          {/* Card 5: Read-only Host Identity */}
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#c9a87c]/10 text-[#c9a87c]">
                  <User className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-white">
                    Host Profile (Read-Only)
                  </h2>
                  <p className="text-xs text-white/40">
                    Host ownership credentials cannot be altered.
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-[11px] font-medium text-emerald-400">
                <Shield className="h-3 w-3" />
                Verified Host
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-[11px] font-medium uppercase tracking-wider text-white/40 mb-1">
                  Host Name
                </label>
                <input
                  type="text"
                  disabled
                  value={hostName}
                  className="w-full rounded-xl border border-white/[0.06] bg-white/[0.01] px-4 py-2.5 text-xs text-white/60 cursor-not-allowed select-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium uppercase tracking-wider text-white/40 mb-1">
                  Host Email
                </label>
                <input
                  type="email"
                  disabled
                  value={hostEmail}
                  className="w-full rounded-xl border border-white/[0.06] bg-white/[0.01] px-4 py-2.5 text-xs text-white/60 cursor-not-allowed select-none"
                />
              </div>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="ghost"
              render={<Link href="/my-listings" />}
              className="rounded-xl border border-white/10 px-6 text-sm text-white/70 hover:bg-white/[0.06] hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-gradient-to-r from-[#c9a87c] to-[#b87333] px-8 py-3 text-sm font-semibold text-black shadow-xl shadow-[#b87333]/20 hover:opacity-90 active:scale-95 transition-all"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-black" />
                  Saving Changes...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Save Studio Updates
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
