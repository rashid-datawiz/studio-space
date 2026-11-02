"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    image: "/images/hero-1.jpg",
    headline: "Where Creative Visions Come to Life",
    subtext:
      "Discover premium studios crafted for photographers, filmmakers, and creators who demand perfection.",
    cta1: { label: "Explore Studios", href: "/studios" },
    cta2: { label: "Host Your Space", href: "/studios" },
  },
  {
    image: "/images/hero-2.jpg",
    headline: "Sound. Perfected.",
    subtext:
      "Acoustically engineered recording spaces built for pristine audio — from podcast booths to mixing suites.",
    cta1: { label: "Find a Studio", href: "/studios" },
    cta2: { label: "Learn More", href: "#how-it-works" },
  },
  {
    image: "/images/hero-3.jpg",
    headline: "Frame Every Story Beautifully",
    subtext:
      "Cinema-grade sound stages and production sets ready for your next masterpiece.",
    cta1: { label: "Browse Stages", href: "/studios" },
    cta2: { label: "Become a Host", href: "/studios" },
  },
];

export function HeroSlider() {
  return (
    <section className="relative">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="hero-swiper h-[100vh]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

              {/* Content */}
              <div className="section-container relative flex h-full items-end pb-28 sm:pb-32 md:items-center md:pb-0">
                <div className="max-w-2xl">
                  <h1 className="heading-display mb-6 text-white text-balance">
                    {slide.headline}
                  </h1>
                  <p className="mb-8 max-w-lg text-base leading-relaxed text-white/70 md:text-lg">
                    {slide.subtext}
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <Button
                      size="lg"
                      className="h-12 gap-2 rounded-xl bg-gradient-to-r from-[#c9a87c] to-[#b87333] px-6 text-sm font-medium text-black hover:opacity-90"
                      render={<Link href={slide.cta1.href} />}
                    >
                      {slide.cta1.label}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                    <Button
                      size="lg"
                      variant="ghost"
                      className="h-12 gap-2 rounded-xl border border-white/10 px-6 text-sm text-white/80 hover:bg-white/[0.06] hover:text-white"
                      render={<Link href={slide.cta2.href} />}
                    >
                      <Play className="h-4 w-4" />
                      {slide.cta2.label}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">
            Scroll
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}
