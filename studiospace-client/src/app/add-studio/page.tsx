"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Building2,
  UploadCloud,
  Check,
  Plus,
  X,
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
  AlertCircle,
  Radio,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { createStudio, uploadImageToImgBB, checkBackendHealth } from "@/lib/api";
import { toast } from "@/components/ui/apple-toast";
import { useSession } from "@/lib/auth-client";

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

export default function AddStudioPage() {
  const router = useRouter();
  const { data: session, isPending: isSessionPending } = useSession();
  const currentUser = session?.user;

  // Protect route
  useEffect(() => {
    if (!isSessionPending && !currentUser) {
      toast.info(
        "Authentication Required",
        "Please log in or register to publish a studio listing."
      );
      router.push("/login?callbackUrl=/add-studio");
    }
  }, [isSessionPending, currentUser, router]);

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(STUDIO_CATEGORIES[0]);
  const [hourlyRate, setHourlyRate] = useState<number | "">("");
  const [securityDeposit, setSecurityDeposit] = useState<number | "">(150);
  const [maxCapacity, setMaxCapacity] = useState<number | "">("");
  const [squareFeet, setSquareFeet] = useState<number | "">("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    "High-Speed Wi-Fi",
    "Central Air Conditioning",
  ]);
  const [customAmenity, setCustomAmenity] = useState("");
  const [overview, setOverview] = useState("");

  // Host Info (Read-only, dynamically bound to authenticated user)
  const hostName = currentUser?.name || "Alex Rivera";
  const hostEmail = currentUser?.email || "alex@creatorstudio.io";
  const hostAvatar = currentUser?.image || "/images/avatar-alex.jpg";

  // UI States
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [backendOnline, setBackendOnline] = useState<boolean | null>(null);

  useEffect(() => {
    checkBackendHealth().then((status) => setBackendOnline(status));
  }, []);

  // Toggle amenity selection
  const toggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const addCustomAmenity = (e: React.FormEvent) => {
    e.preventDefault();
    if (customAmenity.trim() && !selectedAmenities.includes(customAmenity.trim())) {
      setSelectedAmenities([...selectedAmenities, customAmenity.trim()]);
      setCustomAmenity("");
    }
  };

  // Handle Image Upload via ImgBB
  const handleImageFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadImageToImgBB(file);
      setImageUrl(url);
      toast.success("Image Uploaded", "Studio cover image is ready.");
    } catch {
      toast.error(
        "Upload Notice",
        "Could not upload to cloud, please provide an image URL directly."
      );
    } finally {
      setIsUploading(false);
    }
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !hourlyRate || !location.trim() || !imageUrl.trim()) {
      toast.error(
        "Missing Required Fields",
        "Please provide title, hourly rate, location, and an image."
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await createStudio({
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
        overview:
          overview.trim() ||
          "A meticulously designed creative environment outfitted for professional productions.",
        ownerName: hostName,
        ownerEmail: hostEmail,
        ownerAvatar: hostAvatar,
      });

      if (response.insertedId) {
        toast.success(
          "Studio Added to Database!",
          `"${title}" saved to MongoDB (ID: ${response.insertedId.slice(-6)}).`
        );
      } else {
        toast.success(
          "Studio Published Successfully!",
          `"${title}" has been saved to your studio listings.`
        );
      }
      router.push("/my-listings");
    } catch (err) {
      console.error("Studio creation error:", err);
      toast.error(
        "Submission Error",
        "Unable to create listing. Please check backend connection."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
            Host Management
          </p>
          <h1 className="heading-section text-white">Add New Studio Space</h1>
          <p className="mt-2 text-sm text-white/50">
            List your creative studio for fellow filmmakers, photographers,
            podcasters, and artists.
          </p>
        </div>

        {/* Backend Connectivity Status Alert */}
        {backendOnline === false && (
          <div className="mb-8 flex items-start gap-3.5 rounded-2xl border border-amber-500/25 bg-amber-500/10 p-4.5 text-xs text-amber-200 backdrop-blur-xl">
            <AlertCircle className="h-5 w-5 shrink-0 text-amber-400 mt-0.5" />
            <div className="flex-1 space-y-1">
              <p className="font-semibold text-amber-300 text-sm">
                Backend Server is Offline (Port 5001)
              </p>
              <p className="text-amber-200/80 leading-relaxed">
                Could not connect to <code className="rounded bg-black/40 px-1.5 py-0.5 font-mono text-[11px] text-amber-300">http://localhost:5001</code>.
                To save listings directly to MongoDB, open your terminal in the backend directory and run:
              </p>
              <div className="mt-2 rounded-xl bg-black/60 p-2.5 font-mono text-[11px] text-white/90 border border-white/10 select-all">
                cd &quot;../studiospace-server&quot; &amp;&amp; npm start
              </div>
            </div>
          </div>
        )}

        {backendOnline === true && (
          <div className="mb-8 flex items-center justify-between rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2.5 text-xs text-emerald-300 backdrop-blur-xl">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="font-medium text-emerald-200">
                Connected to MongoDB Server (<code className="font-mono text-[11px]">http://localhost:5001</code>)
              </span>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
              <Radio className="h-3 w-3 animate-pulse" /> Live
            </span>
          </div>
        )}

        {/* Main Form */}
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
                  Basic details and classification for your creative space.
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
                  placeholder="e.g. Sunset Cyc Sound Stage, Prism Daylight Loft..."
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
                    placeholder="e.g. Brooklyn, NY or 140 Hope St"
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
                    placeholder="85"
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
                    placeholder="150"
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
                    placeholder="20"
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

              {/* Dimensions / Square Feet */}
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-white/70 mb-2">
                  Studio Size (Sq. Ft.)
                </label>
                <div className="relative">
                  <Layers className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-white/30" />
                  <input
                    type="number"
                    min="50"
                    placeholder="1800"
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

          {/* Card 2: Image Upload System */}
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
                  Upload an image via ImgBB / PostImage, select a local asset, or
                  paste a high-res URL.
                </p>
              </div>
            </div>

            {/* Drag & Drop Upload Container */}
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
                    {isUploading ? "Uploading to ImgBB..." : "Click or Drag Image to Upload"}
                  </span>
                  <span className="mt-1 text-xs text-white/40">
                    PNG, JPG, or WEBP up to 10MB
                  </span>
                </label>

                {/* Direct URL input alternative */}
                <div className="mt-4">
                  <span className="block text-[11px] font-medium uppercase tracking-wider text-white/50 mb-1.5">
                    Or Paste Direct Image URL:
                  </span>
                  <input
                    type="url"
                    placeholder="https://... or /images/hero-1.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs text-white placeholder:text-white/20 outline-none focus:border-[#c9a87c]/40"
                  />
                </div>
              </div>

              {/* Live Preview */}
              <div>
                <span className="block text-xs font-medium uppercase tracking-wider text-white/60 mb-2">
                  Live Preview
                </span>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-neutral-900">
                  {imageUrl ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imageUrl}
                        alt="Studio preview"
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setImageUrl("")}
                        className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white/70 hover:text-white"
                        title="Remove Image"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </>
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center text-center p-6 text-white/30">
                      <Building2 className="h-10 w-10 mb-2 stroke-[1.5]" />
                      <p className="text-xs">No image provided yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Amenities Selection */}
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
                  Select available features that will display as verified tags on
                  your listing.
                </p>
              </div>
            </div>

            {/* Checkbox / Tag Pills */}
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
                        ? "border-[#c9a87c]/50 bg-[#c9a87c]/15 text-[#c9a87c] shadow-sm shadow-[#c9a87c]/20"
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

            {/* Custom Amenity Adder */}
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
                  Describe what makes your space extraordinary, equipment included,
                  and rules.
                </p>
              </div>
            </div>

            <textarea
              rows={5}
              required
              placeholder="Provide a comprehensive summary: natural lighting, sound isolation ratings, equipment list, ceiling height, house rules, and shooting perks..."
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
                    Host Account Information
                  </h2>
                  <p className="text-xs text-white/40">
                    Automatically assigned from your verified StudioSpace profile.
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
                  Host Name (Read-Only)
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
                  Host Email (Read-Only)
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
                  Publishing Space...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Publish Studio Space
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
