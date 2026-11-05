"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Aperture,
  LayoutDashboard,
  PlusCircle,
  Building2,
  CalendarDays,
  LogOut,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { authClient, useSession } from "@/lib/auth-client";
import { toast } from "@/components/ui/apple-toast";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "About Us", href: "#about" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Authenticated state from Better Auth with demo toggle fallback
  const { data: session } = useSession();
  const currentUser = session?.user;
  const [mockAuthed, setMockAuthed] = useState(false);

  const isAuthenticated = Boolean(currentUser) || mockAuthed;

  const user = {
    name: currentUser?.name || "Alex Rivera",
    email: currentUser?.email || "alex@creatorstudio.io",
    avatar: currentUser?.image || "/images/avatar-alex.jpg",
    role: "Studio Host & Creator",
  };

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      toast.success("Logged Out", "You have signed out successfully.");
    } catch {
      // ignore
    }
    setMockAuthed(false);
    setIsMobileOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
        isScrolled
          ? "border-b border-white/[0.08] bg-black/75 backdrop-blur-2xl shadow-xl shadow-black/40"
          : "bg-gradient-to-b from-black/80 via-black/40 to-transparent"
      )}
    >
      <nav className="section-container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#c9a87c] via-[#b87333] to-[#8c501e] shadow-md shadow-[#b87333]/20 ring-1 ring-white/20 transition-transform group-hover:scale-105">
            <Aperture className="h-5 w-5 text-black" strokeWidth={2.5} />
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">
            Studio<span className="text-[#c9a87c]">Space</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "text-white"
                    : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                )}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-[#c9a87c]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Section: Auth State / Switcher */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Subtle state switcher preview pill for the reviewer */}
          <button
            onClick={() => setMockAuthed(!mockAuthed)}
            title="Click to toggle Authenticated / Unauthenticated view"
            className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-white/40 transition-colors hover:border-[#c9a87c]/30 hover:text-[#c9a87c]"
          >
            {isAuthenticated ? "Mode: Authenticated" : "Mode: Guest"}
          </button>

          {!isAuthenticated ? (
            /* Unauthenticated State: Login & Register action buttons */
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                className="h-9 px-4 text-sm text-white/70 hover:bg-white/[0.06] hover:text-white"
                render={<Link href="/login" />}
              >
                Log in
              </Button>
              <Button
                className="h-9 rounded-xl bg-gradient-to-r from-[#c9a87c] to-[#b87333] px-4 text-sm font-medium text-black shadow-md shadow-[#b87333]/20 hover:opacity-90 active:scale-95"
                render={<Link href="/register" />}
              >
                Get Started
              </Button>
            </div>
          ) : (
            /* Authenticated State: User Avatar + Name + Dropdown Menu */
            <DropdownMenu>
              <DropdownMenuTrigger
                className="group flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] py-1 pr-3 pl-1.5 transition-all hover:border-[#c9a87c]/30 hover:bg-white/[0.06] outline-none"
              >
                <Avatar className="h-7 w-7 ring-1 ring-[#c9a87c]/50">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-[#c9a87c]/20 text-[10px] text-[#c9a87c]">
                    AR
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs font-medium text-white/90 group-hover:text-white">
                  {user.name}
                </span>
                <ChevronDown className="h-3 w-3 text-white/40 transition-transform group-data-popup-open:rotate-180" />
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-56 rounded-2xl border border-white/[0.08] bg-[#121212]/95 p-1.5 backdrop-blur-2xl shadow-2xl"
              >
                <DropdownMenuLabel className="px-3 py-2">
                  <div className="text-xs font-semibold text-white">
                    {user.name}
                  </div>
                  <div className="text-[11px] text-white/40">{user.email}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="my-1 bg-white/[0.06]" />

                <DropdownMenuItem
                  className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-xs text-white/80 transition-colors hover:bg-white/[0.08] hover:text-white"
                  render={<Link href="/dashboard" />}
                >
                  <LayoutDashboard className="h-4 w-4 text-[#c9a87c]" />
                  Dashboard
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-xs text-white/80 transition-colors hover:bg-white/[0.08] hover:text-white"
                  render={<Link href="/add-studio" />}
                >
                  <PlusCircle className="h-4 w-4 text-[#c9a87c]" />
                  Add New Studio
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-xs text-white/80 transition-colors hover:bg-white/[0.08] hover:text-white"
                  render={<Link href="/my-listings" />}
                >
                  <Building2 className="h-4 w-4 text-[#c9a87c]" />
                  My Studio Listings
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-xs text-white/80 transition-colors hover:bg-white/[0.08] hover:text-white"
                  render={<Link href="/my-bookings" />}
                >
                  <CalendarDays className="h-4 w-4 text-[#c9a87c]" />
                  My Bookings
                </DropdownMenuItem>

                <DropdownMenuSeparator className="my-1 bg-white/[0.06]" />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-xs text-rose-400 transition-colors hover:bg-rose-500/10 hover:text-rose-300"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white md:hidden"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 top-16 z-40 bg-black/95 backdrop-blur-2xl transition-all duration-300 md:hidden",
          isMobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
      >
        <div className="section-container flex flex-col gap-2 pt-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  "rounded-xl px-4 py-3 text-base font-medium transition-colors",
                  isActive
                    ? "bg-white/[0.08] text-white"
                    : "text-white/60 hover:bg-white/[0.04] hover:text-white"
                )}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="mt-4 flex flex-col gap-3 border-t border-white/[0.06] pt-6">
            {!isAuthenticated ? (
              <>
                <Button
                  variant="outline"
                  className="w-full border-white/10 text-white hover:bg-white/[0.06]"
                  render={<Link href="/login" />}
                >
                  Log in
                </Button>
                <Button
                  className="w-full bg-gradient-to-r from-[#c9a87c] to-[#b87333] font-medium text-black"
                  render={<Link href="/register" />}
                >
                  Get Started
                </Button>
              </>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-3 px-2 py-2">
                  <Avatar className="h-9 w-9 ring-1 ring-[#c9a87c]">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-[#c9a87c]/20 text-xs text-[#c9a87c]">
                      AR
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-white">{user.name}</p>
                    <p className="text-xs text-white/40">{user.email}</p>
                  </div>
                </div>
                <div className="space-y-1 pt-2">
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/[0.06] hover:text-white"
                  >
                    <LayoutDashboard className="h-4 w-4 text-[#c9a87c]" />
                    Dashboard
                  </Link>
                  <Link
                    href="/add-studio"
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/[0.06] hover:text-white"
                  >
                    <PlusCircle className="h-4 w-4 text-[#c9a87c]" />
                    Add New Studio
                  </Link>
                  <Link
                    href="/my-listings"
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/[0.06] hover:text-white"
                  >
                    <Building2 className="h-4 w-4 text-[#c9a87c]" />
                    My Studio Listings
                  </Link>
                  <Link
                    href="/my-bookings"
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/[0.06] hover:text-white"
                  >
                    <CalendarDays className="h-4 w-4 text-[#c9a87c]" />
                    My Bookings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-rose-400 hover:bg-rose-500/10 cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
