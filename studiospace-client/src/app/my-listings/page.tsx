"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Building2,
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  MapPin,
  Star,
  Sparkles,
  LayoutGrid,
  Table as TableIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Studio, fetchMyListings, deleteStudio } from "@/lib/api";
import { ConfirmModal } from "@/components/shared/ConfirmModal";
import { TableRowSkeleton } from "@/components/ui/studio-skeleton";
import { toast } from "@/components/ui/apple-toast";

export default function MyListingsPage() {
  const userEmail = "alex@creatorstudio.io";

  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"card" | "table">("card");

  // Deletion modal state
  const [deleteTarget, setDeleteTarget] = useState<Studio | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const data = await fetchMyListings(userEmail);
        if (!ignore) {
          setStudios(data);
        }
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
  }, [userEmail]);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);

    try {
      await deleteStudio(deleteTarget.id);
      setStudios((prev) => prev.filter((s) => s.id !== deleteTarget.id));
      toast.success(
        "Studio Deleted",
        `"${deleteTarget.title}" was permanently removed from listings.`
      );
      setDeleteTarget(null);
    } catch {
      toast.error(
        "Delete Failed",
        "Unable to remove studio listing. Please try again."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  // Stats calculation
  const totalListings = studios.length;
  const avgHourly =
    totalListings > 0
      ? Math.round(
          studios.reduce((acc, curr) => acc + curr.hourlyRate, 0) / totalListings
        )
      : 0;

  return (
    <div className="pt-24 pb-28">
      <div className="section-container">
        {/* Header Strip */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/[0.06] pb-8">
          <div>
            <p className="mb-2 text-xs font-semibold tracking-widest text-[#c9a87c] uppercase">
              Creator Dashboard
            </p>
            <h1 className="heading-section text-white">My Studio Listings</h1>
            <p className="mt-2 text-sm text-white/50">
              Manage your listed workspaces, rates, availability, and bookings.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* View Switcher */}
            <div className="flex items-center rounded-xl border border-white/10 bg-white/[0.02] p-1">
              <button
                onClick={() => setViewMode("card")}
                className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                  viewMode === "card"
                    ? "bg-white/10 text-white"
                    : "text-white/40 hover:text-white"
                }`}
                title="Grid View"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                  viewMode === "table"
                    ? "bg-white/10 text-white"
                    : "text-white/40 hover:text-white"
                }`}
                title="Table View"
              >
                <TableIcon className="h-4 w-4" />
              </button>
            </div>

            <Button
              className="rounded-xl bg-gradient-to-r from-[#c9a87c] to-[#b87333] px-4 font-semibold text-black shadow-lg shadow-[#b87333]/20 hover:opacity-90 active:scale-95 transition-all"
              render={<Link href="/add-studio" />}
            >
              <Plus className="h-4 w-4 mr-1.5" />
              Add New Studio
            </Button>
          </div>
        </div>

        {/* Analytics Summary Cards */}
        <div className="mb-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 backdrop-blur-xl">
            <span className="block text-xs font-medium uppercase tracking-wider text-white/40">
              Active Listed Spaces
            </span>
            <span className="mt-2 block text-3xl font-semibold text-white">
              {totalListings}
            </span>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 backdrop-blur-xl">
            <span className="block text-xs font-medium uppercase tracking-wider text-white/40">
              Average Hourly Rate
            </span>
            <span className="mt-2 block text-3xl font-semibold text-[#c9a87c]">
              ${avgHourly}
              <span className="text-sm font-normal text-white/40"> / hr</span>
            </span>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 backdrop-blur-xl">
            <span className="block text-xs font-medium uppercase tracking-wider text-white/40">
              Host Verification
            </span>
            <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-400">
              <Sparkles className="h-3.5 w-3.5" />
              Verified Superhost
            </span>
          </div>
        </div>

        {/* Listings Content */}
        {loading ? (
          <div className="space-y-4">
            <TableRowSkeleton />
            <TableRowSkeleton />
            <TableRowSkeleton />
          </div>
        ) : studios.length > 0 ? (
          viewMode === "card" ? (
            /* Card Grid View */
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {studios.map((studio) => (
                <div
                  key={studio.id}
                  className="group overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] transition-all hover:border-white/15"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={studio.image}
                      alt={studio.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    <div className="absolute top-3 left-3">
                      <span className="rounded-full bg-black/60 border border-white/15 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-md">
                        {studio.category}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/60 border border-white/15 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md">
                      <Star className="h-3 w-3 fill-[#c9a87c] text-[#c9a87c]" />
                      {studio.rating || 5.0}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <h3 className="text-base font-semibold text-white tracking-tight">
                      {studio.title}
                    </h3>
                    <div className="mt-1.5 flex items-center gap-1 text-xs text-white/40">
                      <MapPin className="h-3.5 w-3.5" />
                      {studio.location}
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-4">
                      <div>
                        <span className="text-lg font-semibold text-[#c9a87c]">
                          ${studio.hourlyRate}
                        </span>
                        <span className="text-xs text-white/40"> / hr</span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/studios/${studio.id}`}
                          className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/60 hover:border-white/20 hover:text-white transition-colors"
                          title="View Live Listing"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>

                        <Link
                          href={`/studios/edit/${studio.id}`}
                          className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#c9a87c]/30 bg-[#c9a87c]/10 text-[#c9a87c] hover:bg-[#c9a87c]/20 transition-colors"
                          title="Edit Studio Details"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Link>

                        <button
                          onClick={() => setDeleteTarget(studio)}
                          className="flex h-8 w-8 items-center justify-center rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
                          title="Delete Studio"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Table View */
            <div className="overflow-x-auto rounded-3xl border border-white/[0.08] bg-white/[0.02]">
              <table className="w-full text-left text-sm text-white/70">
                <thead className="border-b border-white/[0.08] bg-white/[0.01] text-xs font-semibold uppercase tracking-wider text-white/40">
                  <tr>
                    <th className="py-4 px-6">Studio Space</th>
                    <th className="py-4 px-6">Category</th>
                    <th className="py-4 px-6">Rate</th>
                    <th className="py-4 px-6">Location</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {studios.map((studio) => (
                    <tr
                      key={studio.id}
                      className="transition-colors hover:bg-white/[0.02]"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-16 shrink-0 overflow-hidden rounded-xl bg-neutral-900 border border-white/10">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={studio.image}
                              alt={studio.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <span className="font-semibold text-white block">
                              {studio.title}
                            </span>
                            <span className="text-xs text-white/40">
                              Capacity: {studio.maxCapacity || 10} people
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <span className="rounded-full bg-white/[0.04] border border-white/10 px-2.5 py-1 text-xs text-white/80">
                          {studio.category}
                        </span>
                      </td>

                      <td className="py-4 px-6 font-semibold text-[#c9a87c]">
                        ${studio.hourlyRate} / hr
                      </td>

                      <td className="py-4 px-6 text-white/50 text-xs">
                        {studio.location}
                      </td>

                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/studios/${studio.id}`}
                            className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/60 hover:text-white"
                            title="View"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Link>
                          <Link
                            href={`/studios/edit/${studio.id}`}
                            className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#c9a87c]/30 bg-[#c9a87c]/10 text-[#c9a87c] hover:bg-[#c9a87c]/20"
                            title="Edit"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Link>
                          <button
                            onClick={() => setDeleteTarget(studio)}
                            className="flex h-8 w-8 items-center justify-center rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                            title="Delete"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center rounded-3xl border border-white/[0.06] bg-white/[0.01]">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.03]">
              <Building2 className="h-7 w-7 text-white/20" />
            </div>
            <h3 className="text-lg font-semibold text-white">
              No Studio Listings Yet
            </h3>
            <p className="mt-2 max-w-sm text-sm text-white/40">
              You haven&apos;t listed any creative studios on StudioSpace yet.
              Start earning by hosting fellow creators.
            </p>
            <div className="mt-6">
              <Button
                render={<Link href="/add-studio" />}
                className="rounded-xl bg-gradient-to-r from-[#c9a87c] to-[#b87333] font-semibold text-black px-6"
              >
                <Plus className="h-4 w-4 mr-2" />
                List Your First Studio
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Studio Listing?"
        description={`Are you sure you want to delete "${deleteTarget?.title}"? This will remove the listing and cancel any future calendar holds. This action cannot be undone.`}
        confirmText="Yes, Delete Listing"
        cancelText="Cancel"
        isDestructive={true}
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirm}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
}
