"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar as CalendarIcon,
  Clock,
  ShieldCheck,
  X,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Studio, createBooking } from "@/lib/api";
import { toast } from "@/components/ui/apple-toast";
import { useSession } from "@/lib/auth-client";

interface BookingModalProps {
  studio: Studio;
  isOpen: boolean;
  onClose: () => void;
}

const timeSlots = [
  "08:00 AM",
  "10:00 AM",
  "12:00 PM",
  "02:00 PM",
  "04:00 PM",
  "06:00 PM",
  "08:00 PM",
];

export function BookingModal({ studio, isOpen, onClose }: BookingModalProps) {
  const router = useRouter();
  const { data: session } = useSession();

  // Booking form state
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split("T")[0];

  const [bookingDate, setBookingDate] = useState(defaultDateStr);
  const [startTime, setStartTime] = useState("10:00 AM");
  const [durationHours, setDurationHours] = useState(4);
  const [specialNotes, setSpecialNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // Real-time calculated fees
  const subtotal = studio.hourlyRate * durationHours;
  const deposit = studio.securityDeposit || 100;
  const serviceFee = Math.round(subtotal * 0.1);
  const total = subtotal + serviceFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const userEmail = session?.user?.email || "alex@creatorstudio.io";
      const userName = session?.user?.name || "Alex Rivera";

      await createBooking({
        studioId: studio.id,
        studioTitle: studio.title,
        studioImage: studio.image,
        studioLocation: studio.location,
        hourlyRate: studio.hourlyRate,
        userEmail,
        userName,
        bookingDate,
        startTime,
        durationHours,
        totalPrice: total,
        securityDeposit: deposit,
        specialNotes,
      });

      toast.success(
        "Booking Reserved!",
        `Your reservation for ${studio.title} is now Pending review.`
      );
      onClose();
      router.push("/my-bookings");
    } catch {
      toast.error(
        "Booking Failed",
        "Unable to submit reservation. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity animate-in fade-in"
      />

      {/* Modal */}
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#121212]/95 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl transition-all animate-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 flex h-8 w-8 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 border-b border-white/[0.08] pb-6">
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-neutral-900 border border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={studio.image}
              alt={studio.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#c9a87c]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#c9a87c]">
                {studio.category}
              </span>
              <span className="text-xs text-white/40">{studio.location}</span>
            </div>
            <h3 className="mt-1 text-lg font-semibold text-white tracking-tight">
              {studio.title}
            </h3>
            <p className="text-xs text-white/50">
              <span className="font-semibold text-[#c9a87c]">
                ${studio.hourlyRate}
              </span>{" "}
              / hour
            </p>
          </div>
        </div>

        {/* User Identity Info */}
        {session?.user && (
          <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5 text-xs">
            <span className="text-white/40">Reserving As:</span>
            <span className="font-medium text-white truncate max-w-[240px]">
              {session.user.name || "Creator"} ({session.user.email})
            </span>
          </div>
        )}

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Shoot Date */}
          <div>
            <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-white/60 mb-2">
              <CalendarIcon className="h-3.5 w-3.5 text-[#c9a87c]" />
              Shoot Date
            </label>
            <input
              type="date"
              required
              min={new Date().toISOString().split("T")[0]}
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none focus:border-[#c9a87c]/40 transition-colors [color-scheme:dark]"
            />
          </div>

          {/* Time Slot & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-white/60 mb-2">
                <Clock className="h-3.5 w-3.5 text-[#c9a87c]" />
                Start Time
              </label>
              <select
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#161616] px-4 py-2.5 text-sm text-white outline-none focus:border-[#c9a87c]/40 transition-colors"
              >
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-center justify-between text-xs font-medium uppercase tracking-wider text-white/60 mb-2">
                <span>Duration</span>
                <span className="text-[#c9a87c] font-semibold">
                  {durationHours} {durationHours === 1 ? "Hour" : "Hours"}
                </span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={durationHours}
                  onChange={(e) => setDurationHours(parseInt(e.target.value))}
                  className="w-full accent-[#c9a87c]"
                />
              </div>
            </div>
          </div>

          {/* Special Production Notes */}
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-white/60 mb-2">
              Production Notes & Requirements (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Bringing 3 cameras, catering, smoke machine requirements..."
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#c9a87c]/40 transition-colors"
            />
          </div>

          {/* Transparent Price Summary */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
            <div className="flex justify-between text-xs text-white/50">
              <span>
                ${studio.hourlyRate} × {durationHours} shoot hours
              </span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between text-xs text-white/50">
              <span>Platform Service & Insurance (10%)</span>
              <span>${serviceFee}</span>
            </div>
            <div className="flex justify-between text-xs text-white/50">
              <span>Refundable Security Deposit (Hold)</span>
              <span>${deposit}</span>
            </div>
            <div className="border-t border-white/[0.06] pt-2 flex justify-between text-sm font-semibold text-white">
              <span>Total Estimated</span>
              <span className="text-[#c9a87c] text-base">${total}</span>
            </div>
          </div>

          {/* Guarantee Badge */}
          <div className="flex items-center gap-2 rounded-xl bg-white/[0.03] p-3 text-xs text-white/40">
            <ShieldCheck className="h-4 w-4 text-[#c9a87c]" />
            <span>
              Covered by StudioSpace Creator Protection & $1M Host Liability
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl border border-white/10 text-white/70 hover:bg-white/[0.06] hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-gradient-to-r from-[#c9a87c] to-[#b87333] px-6 text-sm font-semibold text-black shadow-lg shadow-[#b87333]/20 hover:opacity-90 active:scale-95 transition-all"
            >
              {isSubmitting ? (
                "Submitting..."
              ) : (
                <span className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Confirm & Request Slot
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
