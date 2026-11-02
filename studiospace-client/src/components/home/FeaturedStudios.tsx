import Link from "next/link";
import { Star, MapPin, ArrowRight } from "lucide-react";

const featuredStudios = [
  {
    id: "1",
    title: "Aurora Photo Lab",
    category: "Photo Studio",
    image: "/images/studio-photo-1.jpg",
    location: "Brooklyn, NY",
    rating: 4.9,
    reviews: 128,
    price: 85,
  },
  {
    id: "2",
    title: "Echo Sound Stage",
    category: "Sound Stage",
    image: "/images/studio-sound-1.jpg",
    location: "Los Angeles, CA",
    rating: 4.8,
    reviews: 96,
    price: 150,
  },
  {
    id: "3",
    title: "The Podcast Loft",
    category: "Podcast Room",
    image: "/images/studio-podcast-1.jpg",
    location: "Austin, TX",
    rating: 4.9,
    reviews: 74,
    price: 45,
  },
  {
    id: "4",
    title: "Velvet Recording Suite",
    category: "Music Suite",
    image: "/images/studio-music-1.jpg",
    location: "Nashville, TN",
    rating: 5.0,
    reviews: 112,
    price: 120,
  },
  {
    id: "5",
    title: "Canvas Art Workshop",
    category: "Art Workshop",
    image: "/images/studio-art-1.jpg",
    location: "Portland, OR",
    rating: 4.7,
    reviews: 53,
    price: 55,
  },
  {
    id: "6",
    title: "Lumière Film Stage",
    category: "Sound Stage",
    image: "/images/studio-sound-2.jpg",
    location: "Chicago, IL",
    rating: 4.8,
    reviews: 87,
    price: 200,
  },
];

export function FeaturedStudios() {
  return (
    <section className="section-spacing">
      <div className="section-container">
        {/* Section Header */}
        <div className="mb-14 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-xs font-semibold tracking-widest text-[#c9a87c] uppercase">
              Curated for You
            </p>
            <h2 className="heading-section text-white">Featured Studios</h2>
            <p className="mt-3 max-w-md text-base text-white/50">
              Handpicked spaces loved by creators worldwide
            </p>
          </div>
          <Link
            href="/studios"
            className="group flex items-center gap-2 text-sm font-medium text-[#c9a87c] transition-colors hover:text-[#b87333]"
          >
            View all studios
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Studio Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredStudios.map((studio) => (
            <Link
              key={studio.id}
              href={`/studios/${studio.id}`}
              className="group"
            >
              <div className="hover-lift overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={studio.image}
                    alt={studio.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center rounded-full border border-white/10 bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                      {studio.category}
                    </span>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md">
                      <Star className="h-3 w-3 fill-[#c9a87c] text-[#c9a87c]" />
                      {studio.rating}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="heading-card text-white transition-colors group-hover:text-[#c9a87c]">
                    {studio.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-1 text-sm text-white/40">
                    <MapPin className="h-3.5 w-3.5" />
                    {studio.location}
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-4">
                    <div>
                      <span className="text-lg font-semibold text-[#c9a87c]">
                        ${studio.price}
                      </span>
                      <span className="text-sm text-white/30"> / hr</span>
                    </div>
                    <span className="text-xs text-white/30">
                      {studio.reviews} reviews
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
