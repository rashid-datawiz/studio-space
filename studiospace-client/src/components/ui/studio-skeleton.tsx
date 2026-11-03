import React from "react";

export function StudioCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] animate-pulse">
      <div className="aspect-[4/3] w-full bg-white/[0.04]" />
      <div className="p-5 space-y-3">
        <div className="h-5 w-3/4 rounded-md bg-white/[0.06]" />
        <div className="h-4 w-1/2 rounded-md bg-white/[0.04]" />
        <div className="pt-3 border-t border-white/[0.06] flex justify-between items-center">
          <div className="h-5 w-20 rounded-md bg-white/[0.06]" />
          <div className="h-4 w-16 rounded-md bg-white/[0.04]" />
        </div>
      </div>
    </div>
  );
}

export function StudioGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <StudioCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function StudioDetailSkeleton() {
  return (
    <div className="section-container pt-24 pb-20 animate-pulse space-y-8">
      <div className="h-6 w-48 rounded-md bg-white/[0.06]" />
      <div className="space-y-3">
        <div className="h-10 w-2/3 rounded-lg bg-white/[0.08]" />
        <div className="h-5 w-1/3 rounded-md bg-white/[0.04]" />
      </div>
      <div className="aspect-[21/9] w-full rounded-3xl bg-white/[0.04]" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-32 rounded-2xl bg-white/[0.03]" />
          <div className="h-48 rounded-2xl bg-white/[0.03]" />
        </div>
        <div className="h-72 rounded-3xl bg-white/[0.04]" />
      </div>
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-white/[0.06] animate-pulse">
      <div className="h-14 w-20 rounded-xl bg-white/[0.05]" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-1/3 rounded-md bg-white/[0.06]" />
        <div className="h-3 w-1/4 rounded-md bg-white/[0.04]" />
      </div>
      <div className="h-8 w-24 rounded-lg bg-white/[0.05]" />
    </div>
  );
}
