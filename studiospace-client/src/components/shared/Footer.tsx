import Link from "next/link";
import { Aperture, ArrowRight } from "lucide-react";
import { FaXTwitter, FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa6";

const footerLinks = {
  "Quick Links": [
    { label: "Home", href: "/" },
    { label: "Explore Studios", href: "/studios" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "About Us", href: "#about" },
  ],
  "Studio Categories": [
    { label: "Photo Studios", href: "/studios?category=photo-studios" },
    { label: "Sound Stages", href: "/studios?category=sound-stages" },
    { label: "Podcast Rooms", href: "/studios?category=podcast-rooms" },
    { label: "Music Suites", href: "/studios?category=music-suites" },
    { label: "Art Workshops", href: "/studios?category=art-workshops" },
  ],
  Support: [
    { label: "Help Center", href: "#" },
    { label: "Safety & Trust", href: "#" },
    { label: "Cancellation Policy", href: "#" },
    { label: "Host Resources", href: "#" },
  ],
  Legal: [
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

const socialLinks = [
  { icon: FaXTwitter, href: "#", label: "X" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
  { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#050505]">
      {/* Top Section: Logo + Newsletter */}
      <div className="section-container py-16">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          {/* Brand */}
          <div className="max-w-md">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#c9a87c] to-[#b87333]">
                <Aperture className="h-4.5 w-4.5 text-black" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-semibold tracking-tight text-white">
                Studio<span className="text-[#c9a87c]">Space</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-white/50">
              Empowering creators with seamless access to world-class production
              spaces. From concept to creation, we connect visionaries with the
              perfect environment to bring their art to life.
            </p>
          </div>

          {/* Newsletter */}
          <div className="w-full max-w-sm">
            <h3 className="mb-2 text-sm font-medium text-white">
              Stay in the loop
            </h3>
            <p className="mb-4 text-sm text-white/40">
              Get the latest studios, tips, and creator stories.
            </p>
            <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] p-1.5 pl-4 focus-within:border-[#c9a87c]/30">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 outline-none"
              />
              <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-[#c9a87c] to-[#b87333] transition-opacity hover:opacity-80">
                <ArrowRight className="h-4 w-4 text-black" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="section-container">
        <div className="h-px bg-white/[0.06]" />
      </div>

      {/* Link Columns */}
      <div className="section-container py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/30">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Separator */}
      <div className="section-container">
        <div className="h-px bg-white/[0.06]" />
      </div>

      {/* Bottom Bar */}
      <div className="section-container py-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} StudioSpace. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.06] text-white/40 transition-all hover:border-[#c9a87c]/30 hover:text-white"
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
