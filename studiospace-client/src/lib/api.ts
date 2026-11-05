export interface Studio {
  _id?: string;
  id: string;
  title: string;
  category: string;
  slug?: string;
  hourlyRate: number;
  securityDeposit: number;
  maxCapacity: number;
  squareFeet?: number;
  location: string;
  image: string;
  imageUrl?: string;
  gallery?: string[];
  amenities: string[];
  overview: string;
  ownerName: string;
  ownerEmail: string;
  ownerAvatar?: string;
  rating?: number;
  reviewsCount?: number;
  createdAt?: string;
}

export interface Booking {
  _id?: string;
  id: string;
  studioId: string;
  studioTitle: string;
  studioImage: string;
  studioLocation: string;
  hourlyRate: number;
  userEmail: string;
  userName: string;
  bookingDate: string;
  startTime: string;
  durationHours: number;
  totalPrice: number;
  securityDeposit: number;
  specialNotes?: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  createdAt: string;
}

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

// Pre-seeded studios matching the Apple design language
const initialStudios: Studio[] = [
  {
    id: "1",
    title: "Aurora Photo Lab",
    category: "Photo Studio",
    hourlyRate: 85,
    securityDeposit: 150,
    maxCapacity: 15,
    squareFeet: 1800,
    location: "Brooklyn, NY",
    image: "/images/hero-1.jpg",
    gallery: [
      "/images/hero-1.jpg",
      "/images/studio-photo-2.jpg",
      "/images/hero-2.jpg",
    ],
    amenities: [
      "White Cyc Wall",
      "Profoto Lighting Rig",
      "Hair & Makeup Station",
      "High-Speed Wi-Fi",
      "Freight Elevator",
      "Central AC",
    ],
    overview:
      "A sunlit, industrial daylight loft located in the heart of DUMBO. Features a 24ft curved seamless cyclorama wall, 14ft exposed timber ceilings, south-facing factory windows with blackout capability, and professional Profoto lighting packages available upon request.",
    ownerName: "Alex Rivera",
    ownerEmail: "alex@creatorstudio.io",
    ownerAvatar: "/images/avatar-alex.jpg",
    rating: 4.9,
    reviewsCount: 128,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Echo Sound Stage",
    category: "Film Stage",
    hourlyRate: 150,
    securityDeposit: 300,
    maxCapacity: 30,
    squareFeet: 3200,
    location: "Los Angeles, CA",
    image: "/images/studio-sound-1.jpg",
    gallery: [
      "/images/studio-sound-1.jpg",
      "/images/hero-3.jpg",
      "/images/studio-sound-2.jpg",
    ],
    amenities: [
      "Sound Isolated STC 60",
      "Lighting Grid 20ft",
      "Green Screen Wall",
      "Drive-In Bay Door",
      "Client Lounge",
      "Production Offices",
    ],
    overview:
      "Cinema-grade sound stage engineered for high-end commercials, music videos, and film productions. Fully sound-isolated with a silent HVAC system, overhead motor trusses, and a full green screen corner cyc.",
    ownerName: "Alex Rivera",
    ownerEmail: "alex@creatorstudio.io",
    ownerAvatar: "/images/avatar-alex.jpg",
    rating: 4.8,
    reviewsCount: 96,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "The Podcast Loft",
    category: "Podcast Lounge",
    hourlyRate: 45,
    securityDeposit: 50,
    maxCapacity: 6,
    squareFeet: 650,
    location: "Austin, TX",
    image: "/images/studio-podcast-1.jpg",
    gallery: [
      "/images/studio-podcast-1.jpg",
      "/images/studio-podcast-2.jpg",
      "/images/hero-2.jpg",
    ],
    amenities: [
      "4x Shure SM7B Mics",
      "Rodecaster Pro II",
      "Sony FX3 4K Cameras",
      "Acoustic Wood Paneling",
      "Ultra-Fast Fiber 1Gbps",
      "Video Switching System",
    ],
    overview:
      "Turnkey broadcast podcast studio with plug-and-play video podcast capability. Acoustically treated with custom fluted oak diffusers and warm ambient mood lighting. Bring your SD card or laptop and record pristine multi-track audio and 4K footage instantly.",
    ownerName: "Sarah Chen",
    ownerEmail: "sarah.chen@austincreative.com",
    ownerAvatar: "/images/avatar-alex.jpg",
    rating: 4.9,
    reviewsCount: 74,
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Velvet Recording Suite",
    category: "Music Suite",
    hourlyRate: 120,
    securityDeposit: 200,
    maxCapacity: 10,
    squareFeet: 1200,
    location: "Nashville, TN",
    image: "/images/studio-music-1.jpg",
    gallery: [
      "/images/studio-music-1.jpg",
      "/images/hero-2.jpg",
      "/images/studio-music-2.jpg",
    ],
    amenities: [
      "Neve Genesys Console",
      "Genelec 8351B Monitors",
      "Vintage Mic Locker",
      "Live Tracking Room",
      "Lounge & Bar",
      "24/7 Keycard Access",
    ],
    overview:
      "Acoustically tuned control room and isolation booth designed by top acousticians. Outfitted with analog outboard gear, modern digital DAWs, and a comfortable artist lounge for long songwriting and mixing sessions.",
    ownerName: "Marcus Vance",
    ownerEmail: "marcus@velvetrecorders.com",
    ownerAvatar: "/images/avatar-alex.jpg",
    rating: 5.0,
    reviewsCount: 112,
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    title: "Canvas Art Workshop",
    category: "Workshop",
    hourlyRate: 55,
    securityDeposit: 100,
    maxCapacity: 25,
    squareFeet: 2100,
    location: "Portland, OR",
    image: "/images/studio-art-1.jpg",
    gallery: [
      "/images/studio-art-1.jpg",
      "/images/hero-1.jpg",
    ],
    amenities: [
      "Natural Skylights",
      "Heavy-Duty Easels",
      "Ceramic Kiln & Wheels",
      "Slop Sinks & Cleanup",
      "Communal Workbenches",
      "Storage Lockers",
    ],
    overview:
      "Spacious open-plan artisan atelier with abundant north-facing natural skylight illumination. Ideal for fine art workshops, sculpture classes, exhibitions, and creative team offsites.",
    ownerName: "Elena Rostova",
    ownerEmail: "elena@canvaspdx.org",
    ownerAvatar: "/images/avatar-alex.jpg",
    rating: 4.7,
    reviewsCount: 53,
    createdAt: new Date().toISOString(),
  },
  {
    id: "6",
    title: "Lumière Film Stage",
    category: "Film Stage",
    hourlyRate: 200,
    securityDeposit: 400,
    maxCapacity: 40,
    squareFeet: 4500,
    location: "Chicago, IL",
    image: "/images/studio-sound-2.jpg",
    gallery: [
      "/images/studio-sound-2.jpg",
      "/images/studio-sound-1.jpg",
      "/images/hero-3.jpg",
    ],
    amenities: [
      "2-Wall Infinite Cyc",
      "Heavy Load Lighting Truss",
      "Silent Air Conditioning",
      "Dedicated Grip Room",
      "Hair & Makeup Suite",
      "Craft Services Kitchen",
    ],
    overview:
      "Massive column-free production sound stage designed for large-scale video shoots, commercial sets, and editorial productions. Includes dual rolling drive-in doors, dedicated 600A 3-phase power distribution, and full hair & makeup suites.",
    ownerName: "Alex Rivera",
    ownerEmail: "alex@creatorstudio.io",
    ownerAvatar: "/images/avatar-alex.jpg",
    rating: 4.8,
    reviewsCount: 87,
    createdAt: new Date().toISOString(),
  },
];

// Seed initial bookings for the current user
const initialBookings: Booking[] = [
  {
    id: "b-1",
    studioId: "1",
    studioTitle: "Aurora Photo Lab",
    studioImage: "/images/hero-1.jpg",
    studioLocation: "Brooklyn, NY",
    hourlyRate: 85,
    userEmail: "alex@creatorstudio.io",
    userName: "Alex Rivera",
    bookingDate: "2026-11-15",
    startTime: "10:00 AM",
    durationHours: 4,
    totalPrice: 340,
    securityDeposit: 150,
    specialNotes: "Fashion lookbook photoshoot with 4 models and lighting crew.",
    status: "Pending",
    createdAt: "2026-11-01T10:30:00Z",
  },
  {
    id: "b-2",
    studioId: "3",
    studioTitle: "The Podcast Loft",
    studioImage: "/images/studio-podcast-1.jpg",
    studioLocation: "Austin, TX",
    hourlyRate: 45,
    userEmail: "alex@creatorstudio.io",
    userName: "Alex Rivera",
    bookingDate: "2026-11-20",
    startTime: "02:00 PM",
    durationHours: 2,
    totalPrice: 90,
    securityDeposit: 50,
    specialNotes: "Tech founder podcast interview with multi-camera recording.",
    status: "Confirmed",
    createdAt: "2026-10-28T14:15:00Z",
  },
  {
    id: "b-3",
    studioId: "4",
    studioTitle: "Velvet Recording Suite",
    studioImage: "/images/studio-music-1.jpg",
    studioLocation: "Nashville, TN",
    hourlyRate: 120,
    userEmail: "alex@creatorstudio.io",
    userName: "Alex Rivera",
    bookingDate: "2026-10-10",
    startTime: "01:00 PM",
    durationHours: 6,
    totalPrice: 720,
    securityDeposit: 200,
    specialNotes: "Vocal and acoustic guitar tracking session.",
    status: "Completed",
    createdAt: "2026-10-01T09:00:00Z",
  },
];

/* ── Studio Normalizer & Image Resolver ───────────────────────────── */
const DIVERSE_FALLBACK_IMAGES = [
  "/images/hero-1.jpg",
  "/images/studio-sound-1.jpg",
  "/images/studio-podcast-1.jpg",
  "/images/studio-photo-2.jpg",
  "/images/studio-sound-2.jpg",
  "/images/studio-music-1.jpg",
  "/images/studio-music-2.jpg",
  "/images/studio-art-1.jpg",
  "/images/hero-2.jpg",
  "/images/hero-3.jpg",
];

export function getDiverseFallbackImage(category = "", index = 0): string {
  const cat = (category || "").toLowerCase();
  if (cat.includes("photo")) {
    return index % 2 === 0 ? "/images/hero-1.jpg" : "/images/studio-photo-2.jpg";
  }
  if (cat.includes("film") || cat.includes("stage")) {
    return index % 2 === 0 ? "/images/studio-sound-1.jpg" : "/images/hero-3.jpg";
  }
  if (cat.includes("podcast")) {
    return index % 2 === 0 ? "/images/studio-podcast-1.jpg" : "/images/hero-2.jpg";
  }
  if (cat.includes("music") || cat.includes("sound")) {
    return index % 2 === 0 ? "/images/studio-music-1.jpg" : "/images/studio-music-2.jpg";
  }
  if (cat.includes("art") || cat.includes("workshop") || cat.includes("gallery")) {
    return index % 2 === 0 ? "/images/studio-art-1.jpg" : "/images/hero-1.jpg";
  }
  return DIVERSE_FALLBACK_IMAGES[index % DIVERSE_FALLBACK_IMAGES.length];
}

// Normalizes any raw document from MongoDB into a uniform Studio object
export function normalizeStudio(raw: unknown, index = 0): Studio {
  if (!raw || typeof raw !== "object") {
    return initialStudios[index % initialStudios.length];
  }

  const r = raw as Record<string, unknown>;

  // 1. Resolve ID
  const rawId = r._id || r.id;
  const id = rawId ? String(rawId) : `studio-${Date.now()}-${index}`;
  const _id = r._id ? String(r._id) : undefined;

  // 2. Resolve image - check all possible MongoDB property names
  let resolvedImage = "";

  const candidateFields = [
    r.image,
    r.imageUrl,
    r.image_url,
    r.img,
    r.imgUrl,
    r.img_url,
    r.photo,
    r.photoUrl,
    r.photoURL,
    r.photo_url,
    r.picture,
    r.coverImage,
    r.cover_image,
    r.cover,
    r.thumbnail,
    r.studioImage,
  ];

  for (const c of candidateFields) {
    if (typeof c === "string" && c.trim().length > 0) {
      resolvedImage = c.trim();
      break;
    }
    if (c && typeof c === "object") {
      const obj = c as Record<string, unknown>;
      const nested = obj.url || obj.display_url || obj.secure_url || obj.src;
      if (typeof nested === "string" && nested.trim().length > 0) {
        resolvedImage = nested.trim();
        break;
      }
    }
  }

  // Check gallery or images arrays if image still not found
  if (!resolvedImage && Array.isArray(r.gallery) && r.gallery.length > 0) {
    const first = r.gallery[0];
    if (typeof first === "string" && first.trim().length > 0) {
      resolvedImage = first.trim();
    } else if (first && typeof first === "object") {
      const u = (first as Record<string, unknown>).url;
      if (typeof u === "string" && u.trim().length > 0) resolvedImage = u.trim();
    }
  }

  if (!resolvedImage && Array.isArray(r.images) && r.images.length > 0) {
    const first = r.images[0];
    if (typeof first === "string" && first.trim().length > 0) {
      resolvedImage = first.trim();
    } else if (first && typeof first === "object") {
      const u = (first as Record<string, unknown>).url;
      if (typeof u === "string" && u.trim().length > 0) resolvedImage = u.trim();
    }
  }

  const category = String(r.category || r.type || "Photo Studio");

  // Fallback to distinct, category-appropriate image if no image found or if pointing to legacy image
  if (!resolvedImage || resolvedImage === "/images/studio-photo-1.jpg") {
    resolvedImage = getDiverseFallbackImage(category, index);
  }

  // Build normalized gallery array
  const gallery: string[] = [];
  if (Array.isArray(r.gallery)) {
    for (const g of r.gallery) {
      if (typeof g === "string" && g.trim()) gallery.push(g.trim());
      else if (g && typeof g === "object") {
        const u = (g as Record<string, unknown>).url;
        if (typeof u === "string" && u.trim()) gallery.push(u.trim());
      }
    }
  }
  if (Array.isArray(r.images)) {
    for (const g of r.images) {
      if (typeof g === "string" && g.trim()) gallery.push(g.trim());
      else if (g && typeof g === "object") {
        const u = (g as Record<string, unknown>).url;
        if (typeof u === "string" && u.trim()) gallery.push(u.trim());
      }
    }
  }
  if (gallery.length === 0 && resolvedImage) {
    gallery.push(resolvedImage);
  }

  return {
    _id,
    id,
    title: String(r.title || r.name || "Creative Studio"),
    category,
    location: String(r.location || r.city || "New York, NY"),
    hourlyRate: Number(r.hourlyRate || r.price || r.rate || 0),
    securityDeposit: Number(r.securityDeposit || r.deposit || 100),
    maxCapacity: Number(r.maxCapacity || r.capacity || 10),
    squareFeet: Number(r.squareFeet || r.size || 1200),
    rating: Number(r.rating || 5.0),
    reviewsCount: Number(r.reviewsCount || 0),
    image: resolvedImage,
    imageUrl: resolvedImage,
    gallery,
    amenities: Array.isArray(r.amenities)
      ? r.amenities.map(String)
      : typeof r.amenities === "string"
      ? (r.amenities as string).split(",").map((a) => a.trim()).filter(Boolean)
      : ["High-Speed Wi-Fi", "Central AC"],
    overview: String(r.overview || r.description || "A professional creative workspace."),
    ownerName: String(r.ownerName || r.hostName || "Alex Rivera"),
    ownerEmail: String(r.ownerEmail || r.hostEmail || "alex@creatorstudio.io"),
    ownerAvatar: String(r.ownerAvatar || r.hostAvatar || "/images/avatar-alex.jpg"),
    createdAt: String(r.createdAt || new Date().toISOString()),
  };
}

/* ── Local Storage Helper ────────────────────────────────────────── */
const STORAGE_KEYS = {
  STUDIOS: "studiospace_studios_v2",
  BOOKINGS: "studiospace_bookings_v2",
};

function getLocalStudios(): Studio[] {
  if (typeof window === "undefined") return initialStudios;
  try {
    // Purge old corrupted v1 cache if found
    if (localStorage.getItem("studiospace_studios_v1")) {
      localStorage.removeItem("studiospace_studios_v1");
    }
    const raw = localStorage.getItem(STORAGE_KEYS.STUDIOS);
    if (!raw) {
      localStorage.setItem(
        STORAGE_KEYS.STUDIOS,
        JSON.stringify(initialStudios)
      );
      return initialStudios;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map((item, idx) => normalizeStudio(item, idx));
    }
    return initialStudios;
  } catch {
    return initialStudios;
  }
}

function saveLocalStudios(studios: Studio[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.STUDIOS, JSON.stringify(studios));
  } catch (e) {
    console.warn("Storage quota warning, sanitizing studio cache...", e);
    try {
      // Strip oversized base64 images from cached items to prevent QuotaExceededError
      const sanitized = studios.slice(0, 25).map((s, idx) => ({
        ...s,
        image:
          s.image && s.image.startsWith("data:") && s.image.length > 100000
            ? getDiverseFallbackImage(s.category, idx)
            : s.image,
        gallery: (s.gallery || []).slice(0, 3).map((g) =>
          g && g.startsWith("data:") && g.length > 100000
            ? getDiverseFallbackImage(s.category, idx)
            : g
        ),
      }));
      localStorage.setItem(STORAGE_KEYS.STUDIOS, JSON.stringify(sanitized));
    } catch (retryErr) {
      console.error("Failed to save to localStorage after sanitizing:", retryErr);
    }
  }
}

function getLocalBookings(): Booking[] {
  if (typeof window === "undefined") return initialBookings;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    if (!raw) {
      localStorage.setItem(
        STORAGE_KEYS.BOOKINGS,
        JSON.stringify(initialBookings)
      );
      return initialBookings;
    }
    return JSON.parse(raw);
  } catch {
    return initialBookings;
  }
}

function saveLocalBookings(bookings: Booking[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  } catch (e) {
    console.error("Failed to save to localStorage", e);
  }
}

/* ── Studios API Service ─────────────────────────────────────────── */

export async function fetchStudios(filters?: {
  search?: string;
  category?: string;
  sort?: string;
}): Promise<Studio[]> {
  // 1. Try requesting from backend server
  try {
    const params = new URLSearchParams();
    if (filters?.search) params.set("search", filters.search);
    if (filters?.category) params.set("category", filters.category);
    if (filters?.sort) params.set("sort", filters.sort);

    const queryStr = params.toString() ? `?${params.toString()}` : "";
    const endpoints = [
      `${API_BASE_URL}/studios${queryStr}`,
      `${API_BASE_URL}/all-studios${queryStr}`,
      `${API_BASE_URL}/api/studios${queryStr}`,
    ];

    for (const url of endpoints) {
      try {
        const res = await fetch(url, {
          cache: "no-store",
          signal: AbortSignal.timeout(12000),
        });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            return data.map((item, idx) => normalizeStudio(item, idx));
          }
        }
      } catch {
        // try next endpoint
      }
    }
  } catch {
    // Backend offline / not reachable, fallback gracefully to client store
  }

  // 2. Fallback to localStorage / seed data
  let list = getLocalStudios();

  if (filters?.category && filters.category !== "All") {
    const cat = filters.category.toLowerCase().replace(/[^a-z0-9]/g, "");
    list = list.filter((s) => {
      const sCat = s.category.toLowerCase().replace(/[^a-z0-9]/g, "");
      return sCat.includes(cat) || cat.includes(sCat);
    });
  }

  if (filters?.search) {
    const q = filters.search.toLowerCase();
    list = list.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
    );
  }

  if (filters?.sort === "price-low") {
    list.sort((a, b) => a.hourlyRate - b.hourlyRate);
  } else if (filters?.sort === "price-high") {
    list.sort((a, b) => b.hourlyRate - a.hourlyRate);
  } else if (filters?.sort === "rating") {
    list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  return list;
}

export async function fetchFeaturedStudios(limit = 6): Promise<Studio[]> {
  // 1. Try requesting from backend server
  try {
    const endpoints = [
      `${API_BASE_URL}/featured-studios`,
      `${API_BASE_URL}/studios?limit=${limit}`,
      `${API_BASE_URL}/studios`,
      `${API_BASE_URL}/all-studios`,
      `${API_BASE_URL}/api/studios?limit=${limit}`,
      `${API_BASE_URL}/api/studios`,
    ];

    for (const url of endpoints) {
      try {
        const res = await fetch(url, {
          cache: "no-store",
          signal: AbortSignal.timeout(12000),
        });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            return data.slice(0, limit).map((item, idx) => normalizeStudio(item, idx));
          }
        }
      } catch {
        // try next endpoint
      }
    }
  } catch (err) {
    console.warn("Could not fetch featured studios from backend:", err);
  }

  // 2. Fallback to localStorage / seed data
  const list = getLocalStudios();
  return list.slice(0, limit);
}

export async function fetchStudioById(id: string): Promise<Studio | null> {
  // 1. Try server
  try {
    const endpoints = [
      `${API_BASE_URL}/studios/${id}`,
      `${API_BASE_URL}/studio/${id}`,
      `${API_BASE_URL}/api/studios/${id}`,
    ];

    for (const url of endpoints) {
      try {
        const res = await fetch(url, {
          cache: "no-store",
          signal: AbortSignal.timeout(12000),
        });
        if (res.ok) {
          const data = await res.json();
          if (data && (data._id || data.id)) {
            return normalizeStudio(data);
          }
        }
      } catch {
        // try next
      }
    }
  } catch {
    // Fallback
  }

  // 2. Fallback
  const list = getLocalStudios();
  return list.find((s) => s.id === id || s._id === id) || null;
}

export interface MongoInsertResponse {
  acknowledged?: boolean;
  insertedId?: string;
  _id?: string;
  [key: string]: unknown;
}

export async function createStudio(
  data: Omit<Studio, "id" | "createdAt">
): Promise<{ studio: Studio; insertedId?: string; acknowledged?: boolean }> {
  const resolvedImg = data.image || data.imageUrl || "";
  const newStudio: Studio = {
    ...data,
    image: resolvedImg,
    imageUrl: resolvedImg,
    gallery:
      Array.isArray(data.gallery) && data.gallery.length > 0
        ? data.gallery
        : [resolvedImg],
    id: `studio-${Date.now()}`,
    rating: 5.0,
    reviewsCount: 1,
    createdAt: new Date().toISOString(),
  };

  // 1. Send to backend POST http://localhost:5001/add-studio
  try {
    const res = await fetch(`${API_BASE_URL}/add-studio`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStudio),
    });

    if (res.ok) {
      const result: MongoInsertResponse = await res.json();
      console.log("MongoDB Insert Result from backend:", result);

      const insertedId = result.insertedId || result._id;
      const studioObj: Studio = {
        ...newStudio,
        _id: insertedId,
        id: insertedId || newStudio.id,
      };

      // Also update local cache so other views reflect the newly created studio immediately
      const list = getLocalStudios();
      saveLocalStudios([studioObj, ...list]);

      return {
        studio: studioObj,
        insertedId,
        acknowledged: result.acknowledged ?? true,
      };
    } else {
      const errText = await res.text();
      console.error(
        `Backend /add-studio failed (HTTP ${res.status}):`,
        errText
      );
    }
  } catch (err) {
    console.warn("Could not reach backend /add-studio, saving locally:", err);
  }

  // 2. Fallback to local state if backend is offline
  const list = getLocalStudios();
  const updated = [newStudio, ...list.filter((s) => s.id !== newStudio.id)];
  saveLocalStudios(updated);
  return { studio: newStudio };
}

export async function updateStudio(
  id: string,
  data: Partial<Studio>
): Promise<Studio> {
  // 1. Try backend
  try {
    const endpoints = [
      `${API_BASE_URL}/studios/${id}`,
      `${API_BASE_URL}/api/studios/${id}`,
    ];

    for (const url of endpoints) {
      try {
        const res = await fetch(url, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          signal: AbortSignal.timeout(4000),
        });
        if (res.ok) {
          const result = await res.json().catch(() => ({}));
          console.log("MongoDB updateOne result:", result);
          const studioObj: Studio = {
            ...(result.title ? result : data),
            id: result._id || result.id || id,
            _id: result._id || id,
          } as Studio;

          const list = getLocalStudios();
          saveLocalStudios(
            list.map((s) => (s.id === id || s._id === id ? { ...s, ...studioObj } : s))
          );
          return studioObj;
        }
      } catch {
        // try next endpoint
      }
    }
  } catch (err) {
    console.warn("Could not update studio on backend, updating locally:", err);
  }

  // 2. Fallback
  const list = getLocalStudios();
  let updatedStudio: Studio | null = null;
  const updatedList = list.map((s) => {
    if (s.id === id || s._id === id) {
      updatedStudio = { ...s, ...data };
      return updatedStudio;
    }
    return s;
  });

  if (updatedStudio) {
    saveLocalStudios(updatedList);
    return updatedStudio;
  }
  throw new Error("Studio not found");
}

export async function deleteStudio(id: string): Promise<boolean> {
  // 1. Try backend
  try {
    const endpoints = [
      `${API_BASE_URL}/studios/${id}`,
      `${API_BASE_URL}/delete-studio/${id}`,
      `${API_BASE_URL}/api/studios/${id}`,
    ];

    for (const url of endpoints) {
      try {
        const res = await fetch(url, {
          method: "DELETE",
          signal: AbortSignal.timeout(4000),
        });
        if (res.ok) {
          const result = await res.json().catch(() => ({}));
          console.log("MongoDB deleteOne result:", result);
          const list = getLocalStudios();
          saveLocalStudios(list.filter((s) => s.id !== id && s._id !== id));
          return true;
        }
      } catch {
        // try next endpoint
      }
    }
  } catch (err) {
    console.warn("Could not delete studio from backend, removing locally:", err);
  }

  // 2. Fallback
  const list = getLocalStudios();
  saveLocalStudios(list.filter((s) => s.id !== id && s._id !== id));
  return true;
}

export async function fetchMyListings(ownerEmail: string): Promise<Studio[]> {
  // 1. Try server
  try {
    const encoded = encodeURIComponent(ownerEmail);
    const endpoints = [
      `${API_BASE_URL}/my-listings/${encoded}`,
      `${API_BASE_URL}/studios/user/${encoded}`,
      `${API_BASE_URL}/my-studios/${encoded}`,
      `${API_BASE_URL}/studios?ownerEmail=${encoded}`,
      `${API_BASE_URL}/api/studios/user/${encoded}`,
    ];

    for (const url of endpoints) {
      try {
        const res = await fetch(url, {
          cache: "no-store",
          signal: AbortSignal.timeout(12000),
        });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            return data.map((item, idx) => normalizeStudio(item, idx));
          }
        }
      } catch {
        // try next endpoint
      }
    }
  } catch (err) {
    console.warn("Could not fetch user listings from backend:", err);
  }

  // 2. Fallback
  const list = getLocalStudios();
  return list.filter(
    (s) => (s.ownerEmail || "").toLowerCase() === ownerEmail.toLowerCase()
  );
}

/* ── Bookings API Service ────────────────────────────────────────── */

export async function createBooking(
  data: Omit<Booking, "id" | "status" | "createdAt">
): Promise<Booking> {
  const newBooking: Booking = {
    ...data,
    id: `book-${Date.now()}`,
    status: "Pending",
    createdAt: new Date().toISOString(),
  };

  // 1. Try backend
  try {
    const res = await fetch(`${API_BASE_URL}/api/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBooking),
      signal: AbortSignal.timeout(4000),
    });
    if (res.ok) {
      const created = await res.json();
      const bookingObj = {
        ...created,
        id: created._id || created.id || newBooking.id,
      };
      const list = getLocalBookings();
      saveLocalBookings([bookingObj, ...list]);
      return bookingObj;
    }
  } catch {
    // Fallback
  }

  // 2. Save locally
  const list = getLocalBookings();
  saveLocalBookings([newBooking, ...list]);
  return newBooking;
}

export async function fetchMyBookings(userEmail: string): Promise<Booking[]> {
  // 1. Try server
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/bookings/user/${encodeURIComponent(userEmail)}`,
      { cache: "no-store", signal: AbortSignal.timeout(3000) }
    );
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        return data.map((item: Booking & { _id?: string }) => ({
          ...item,
          id: item._id || item.id,
        }));
      }
    }
  } catch {
    // Fallback
  }

  // 2. Fallback
  const list = getLocalBookings();
  return list.filter(
    (b) => b.userEmail.toLowerCase() === userEmail.toLowerCase()
  );
}

export async function cancelBooking(bookingId: string): Promise<boolean> {
  // 1. Try server
  try {
    const res = await fetch(`${API_BASE_URL}/api/bookings/${bookingId}/cancel`, {
      method: "PATCH",
      signal: AbortSignal.timeout(4000),
    });
    if (res.ok) {
      const list = getLocalBookings();
      saveLocalBookings(
        list.map((b) =>
          b.id === bookingId || b._id === bookingId
            ? { ...b, status: "Cancelled" }
            : b
        )
      );
      return true;
    }
  } catch {
    // Fallback
  }

  // 2. Fallback
  const list = getLocalBookings();
  saveLocalBookings(
    list.map((b) =>
      b.id === bookingId || b._id === bookingId
        ? { ...b, status: "Cancelled" }
        : b
    )
  );
  return true;
}

/* ── ImgBB Image Upload Service & Client-Side Compression ─────────── */

export async function compressImageFile(
  file: File,
  maxWidth = 1200,
  quality = 0.8
): Promise<string> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(getDiverseFallbackImage("photo", 0));
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve((event.target?.result as string) || getDiverseFallbackImage("photo", 0));
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL("image/jpeg", quality);
          resolve(compressed);
        } catch {
          resolve((event.target?.result as string) || getDiverseFallbackImage("photo", 0));
        }
      };
      img.onerror = () => {
        resolve((event.target?.result as string) || getDiverseFallbackImage("photo", 0));
      };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => {
      resolve(getDiverseFallbackImage("photo", 0));
    };
    reader.readAsDataURL(file);
  });
}

export async function uploadImageToImgBB(
  file: File,
  apiKey?: string
): Promise<string> {
  const key =
    apiKey ||
    process.env.NEXT_PUBLIC_IMGBB_API_KEY ||
    "2d02c896937e0da16a81b2da96a2fa59";

  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const json = await res.json();
      if (json.data && json.data.url) {
        return json.data.display_url || json.data.url;
      }
    }
  } catch (err) {
    console.warn("ImgBB upload failed, falling back to client-side compressed preview:", err);
  }

  // Fallback: compress image so it never exceeds localStorage quota (~80KB vs 5MB)
  return compressImageFile(file, 1200, 0.8);
}

export async function checkBackendHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/`, {
      method: "GET",
      cache: "no-store",
      signal: AbortSignal.timeout(2500),
    });
    return res.ok;
  } catch {
    return false;
  }
}
