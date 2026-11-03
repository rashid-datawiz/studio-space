"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Clock,
  MapPin,
  XCircle,
  ExternalLink,
  Search,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Clock3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Booking, fetchMyBookings, cancelBooking } from "@/lib/api";
import { ConfirmModal } from "@/components/shared/ConfirmModal";
import { TableRowSkeleton } from "@/components/ui/studio-skeleton";
import { toast } from "@/components/ui/apple-toast";

type FilterStatus = "All" | "Pending" | "Confirmed" | "Completed" | "Cancelled";

export default function MyBookingsPage() {
  const userEmail = "alex@creatorstudio.io";

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<FilterStatus>("All");

  // Cancel modal state
  const [cancelTarget, setCancelTarget] = useState<Booking | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const data = await fetchMyBookings(userEmail);
        if (!ignore) {
          setBookings(data);
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

  const handleCancelConfirm = async () => {
    if (!cancelTarget) return;
    setIsCancelling(true);

    try {
      await cancelBooking(cancelTarget.id);
      setBookings((prev) =>
        prev.map((b) =>
          b.id === cancelTarget.id ? { ...b, status: "Cancelled" } : b
        )
      );
      toast.success(
        "Booking Cancelled",
        `Reservation for ${cancelTarget.studioTitle} was successfully cancelled.`
      );
      setCancelTarget(null);
    } catch {
      toast.error(
        "Cancellation Failed",
        "Could not cancel booking. Please try again."
      );
    } finally {
      setIsCancelling(false);
    }
  };

  // Filter bookings by tab
  const filteredBookings = bookings.filter((b) => {
    if (activeTab === "All") return true;
    return b.status.toLowerCase() === activeTab.toLowerCase();
  });

  const getStatusBadge = (status: Booking["status"]) => {
    switch (status) {
      case "Pending":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c9a87c]/30 bg-[#c9a87c]/10 px-3 py-1 text-xs font-semibold text-[#c9a87c]">
            <Clock3 className="h-3.5 w-3.5" />
            Pending Host Review
          </span>
        );
      case "Confirmed":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Confirmed Slot
          </span>
        );
      case "Completed":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/70">
            <Sparkles className="h-3.5 w-3.5" />
            Session Completed
          </span>
        );
      case "Cancelled":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-400">
            <XCircle className="h-3.5 w-3.5" />
            Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="pt-24 pb-28">
      <div className="section-container">
        {/* Header */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/[0.06] pb-8">
          <div>
            <p className="mb-2 text-xs font-semibold tracking-widest text-[#c9a87c] uppercase">
              Creator Reservations
            </p>
            <h1 className="heading-section text-white">My Studio Bookings</h1>
            <p className="mt-2 text-sm text-white/50">
              Track your upcoming shoot dates, confirmed stages, and reservation
              status.
            </p>
          </div>

          <Button
            render={<Link href="/studios" />}
            className="rounded-xl bg-gradient-to-r from-[#c9a87c] to-[#b87333] px-5 font-semibold text-black shadow-lg shadow-[#b87333]/20 hover:opacity-90 active:scale-95 transition-all"
          >
            <Search className="h-4 w-4 mr-1.5" />
            Explore More Studios
          </Button>
        </div>

        {/* Status Filter Tabs */}
        <div className="mb-8 flex flex-wrap items-center gap-2 border-b border-white/[0.06] pb-4">
          {(
            ["All", "Pending", "Confirmed", "Completed", "Cancelled"] as FilterStatus[]
          ).map((tab) => {
            const count =
              tab === "All"
                ? bookings.length
                : bookings.filter(
                    (b) => b.status.toLowerCase() === tab.toLowerCase()
                  ).length;

            const isActive = activeTab === tab;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? "border-[#c9a87c]/40 bg-[#c9a87c]/15 text-[#c9a87c] shadow-sm shadow-[#c9a87c]/20"
                    : "border-white/[0.08] bg-white/[0.02] text-white/60 hover:border-white/20 hover:text-white"
                }`}
              >
                <span>{tab}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                    isActive
                      ? "bg-[#c9a87c]/30 text-white"
                      : "bg-white/10 text-white/50"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bookings Content */}
        {loading ? (
          <div className="space-y-4">
            <TableRowSkeleton />
            <TableRowSkeleton />
            <TableRowSkeleton />
          </div>
        ) : filteredBookings.length > 0 ? (
          <div className="space-y-5">
            {filteredBookings.map((booking) => {
              const isPending = booking.status === "Pending";

              return (
                <div
                  key={booking.id}
                  className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-7 backdrop-blur-xl transition-all hover:border-white/15"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    {/* Left: Studio Thumbnail & Info */}
                    <div className="flex items-start gap-4">
                      <div className="h-20 w-24 sm:h-24 sm:w-32 shrink-0 overflow-hidden rounded-2xl bg-neutral-900 border border-white/10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={booking.studioImage}
                          alt={booking.studioTitle}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          {getStatusBadge(booking.status)}
                          <span className="text-[11px] text-white/30">
                            ID: {booking.id}
                          </span>
                        </div>

                        <Link
                          href={`/studios/${booking.studioId}`}
                          className="group/title inline-flex items-center gap-1.5 text-lg font-semibold text-white hover:text-[#c9a87c] transition-colors"
                        >
                          {booking.studioTitle}
                          <ExternalLink className="h-3.5 w-3.5 opacity-40 group-hover/title:opacity-100 transition-opacity" />
                        </Link>

                        <div className="flex items-center gap-1 text-xs text-white/40">
                          <MapPin className="h-3.5 w-3.5" />
                          {booking.studioLocation}
                        </div>
                      </div>
                    </div>

                    {/* Middle: Schedule Information */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-y lg:border-y-0 lg:border-x border-white/[0.06] py-4 lg:py-0 lg:px-8 text-xs">
                      <div>
                        <span className="text-white/40 block mb-1">
                          Shoot Date
                        </span>
                        <span className="text-white font-medium flex items-center gap-1.5">
                          <CalendarDays className="h-3.5 w-3.5 text-[#c9a87c]" />
                          {booking.bookingDate}
                        </span>
                      </div>

                      <div>
                        <span className="text-white/40 block mb-1">
                          Time & Duration
                        </span>
                        <span className="text-white font-medium flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-[#c9a87c]" />
                          {booking.startTime} ({booking.durationHours} hrs)
                        </span>
                      </div>

                      <div>
                        <span className="text-white/40 block mb-1">
                          Total Reserved
                        </span>
                        <span className="text-base font-semibold text-[#c9a87c]">
                          ${booking.totalPrice}
                        </span>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center justify-end gap-3">
                      <Button
                        variant="outline"
                        render={<Link href={`/studios/${booking.studioId}`} />}
                        className="rounded-xl border-white/10 text-xs text-white/80 hover:bg-white/[0.06] hover:text-white"
                      >
                        Studio Details
                      </Button>

                      {isPending && (
                        <Button
                          variant="ghost"
                          onClick={() => setCancelTarget(booking)}
                          className="rounded-xl border border-rose-500/30 bg-rose-500/10 text-xs font-medium text-rose-400 hover:bg-rose-500/20 hover:text-rose-300"
                        >
                          <XCircle className="h-3.5 w-3.5 mr-1.5" />
                          Cancel Booking
                        </Button>
                      )}
                    </div>
                  </div>

                  {booking.specialNotes && (
                    <div className="mt-4 pt-4 border-t border-white/[0.06] text-xs text-white/50 flex items-start gap-2">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0 text-white/30 mt-0.5" />
                      <span>
                        <strong className="text-white/70">Notes:</strong>{" "}
                        {booking.specialNotes}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center rounded-3xl border border-white/[0.06] bg-white/[0.01]">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.03]">
              <CalendarDays className="h-7 w-7 text-white/20" />
            </div>
            <h3 className="text-lg font-semibold text-white">
              No {activeTab !== "All" ? activeTab : ""} Bookings Found
            </h3>
            <p className="mt-2 max-w-sm text-sm text-white/40">
              You don&apos;t have any creative session reservations under this
              filter.
            </p>
            <div className="mt-6">
              <Button
                render={<Link href="/studios" />}
                className="rounded-xl bg-gradient-to-r from-[#c9a87c] to-[#b87333] font-semibold text-black px-6"
              >
                Browse & Book Studios
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Cancel Confirmation Modal */}
      <ConfirmModal
        isOpen={!!cancelTarget}
        title="Cancel Studio Reservation?"
        description={`Are you sure you want to cancel your slot for "${cancelTarget?.studioTitle}" on ${cancelTarget?.bookingDate}? The pending slot will be released back to other creators.`}
        confirmText="Yes, Cancel Booking"
        cancelText="Keep Booking"
        isDestructive={true}
        isLoading={isCancelling}
        onConfirm={handleCancelConfirm}
        onClose={() => setCancelTarget(null)}
      />
    </div>
  );
}
