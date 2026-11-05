# StudioSpace 🎬✨

> **The premier creative workspace booking platform.** Discover, book, and host film sound stages, photography lofts, podcast booths, music recording suites, and artisan ateliers.

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?logo=next.js&style=flat-square)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3-blue?logo=react&style=flat-square)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&style=flat-square)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&style=flat-square)](https://tailwindcss.com/)
[![Express.js](https://img.shields.io/badge/Express.js-5.3-grey?logo=express&style=flat-square)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Native_Driver-green?logo=mongodb&style=flat-square)](https://www.mongodb.com/)
[![Better Auth](https://img.shields.io/badge/Auth-Better_Auth-purple?style=flat-square)](https://www.better-auth.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Architecture & Project Structure](#-architecture--project-structure)
- [Getting Started Locally](#-getting-started-locally)
  - [Prerequisites](#prerequisites)
  - [Backend Setup (`studiospace-server`)](#1-backend-setup-studiospace-server)
  - [Frontend Setup (`studiospace-client`)](#2-frontend-setup-studiospace-client)
- [Environment Variables](#-environment-variables)
- [REST API Endpoints](#-rest-api-endpoints)
- [Deployment on Vercel](#-deployment-on-vercel)
  - [Step 1: Deploying the Backend](#step-1-deploying-the-backend)
  - [Step 2: Deploying the Frontend](#step-2-deploying-the-frontend)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**StudioSpace** connects verified production hosts with creative professionals seeking cinema-grade sound stages, daylight photo studios, acoustically-treated control rooms, video podcast setups, and art workshops. 

Engineered with **Next.js 16 (App Router)** and an **Express 5 / MongoDB** backend, StudioSpace delivers an Apple-inspired glassmorphism design language, resilient offline-first data synchronization, instant theme switching, and seamless social authentication.

---

## 🚀 Key Features

### 1. 🔐 Robust Authentication (Better Auth)
- **Email & Password Authentication**: Complete registration and sign-in flow with real-time password strength validation (minimum 6 characters, uppercase, and lowercase enforcement).
- **Social Sign-In**: One-click Google OAuth authentication.
- **Session Management**: Secure session persistence with client hook `useSession()` and protected navigation barriers.
- **Role-Aware Host Profiles**: Authenticated users automatically populate host identities when listing studios or booking spaces.

### 2. 🔍 Dynamic Studio Exploration & Curated Feeds
- **Featured Spaces**: Curated showcase of top-rated and newest listings with real-time MongoDB sorting.
- **Instant Search & Filter**: Real-time filtering by category (*Photo Studios, Film Stages, Podcast Lounges, Music Suites, Art Workshops*) and keyword queries across titles, locations, and amenities.
- **Multi-Parameter Sorting**: Price (Low to High / High to Low) and Customer Rating.

### 3. 📅 Interactive Booking System
- **Real-Time Cost Breakdown**: Instant computation of hourly rates, duration, and refundable security deposits.
- **Date & Slot Scheduling**: Interactive calendar and time selector with special notes for crew and equipment needs.
- **"My Bookings" Dashboard**: Filter by booking status (`Confirmed`, `Pending`, `Completed`, `Cancelled`) with intuitive cancellation management.
- **Protected Access**: Unauthenticated visitors clicking *"Book Workspace Now"* are gracefully redirected to log in before reserving.

### 4. 🏢 Host Workspace Management ("My Listings")
- **Studio Creator Wizard (`/add-studio`)**: Add creative workspaces with category badges, pricing, deposit, capacity, dimensions, amenities, and live cover preview.
- **Direct Cloud & URL Image Support**: Upload local photos or paste direct image CDN URLs with automatic client-side compression.
- **Dual Display Modes**: Toggle seamlessly between responsive grid cards and a data-rich administration table.
- **Edit & Delete Actions**: Update space details or remove listings with safe modal confirmations.

### 5. ❤️ Creator Wishlist & Favorites
- Bookmark workspaces with instant visual feedback and persistent local bookmarking.

### 6. 🎨 Apple-Inspired Visual Design & Theming
- **Dark & Light Mode**: Global theme provider with smooth transitions, custom scrollbars, and accessible contrast.
- **Aesthetic Glassmorphism**: Tailored metallic copper-gold gradients (`#c9a87c` to `#b87333`), frosted backdrop blurs, and animated skeleton loading states.

---

## 🛠 Tech Stack

### Frontend Client (`studiospace-client`)
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Component Primitives**: [Radix UI](https://www.radix-ui.com/) / [Base UI](https://base-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Authentication**: [Better Auth](https://www.better-auth.com/)
- **Carousel & Slider**: [Embla Carousel](https://www.embla-carousel.com/) / [Swiper](https://swiperjs.com/)

### Backend Server (`studiospace-server`)
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js 5](https://expressjs.com/)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas) with Native MongoDB Driver v7
- **Middleware**: `cors`, `dotenv`, JSON body-parser with 50MB payload capacity
- **Serverless Ready**: Pre-configured `vercel.json` for Vercel Serverless Functions

---

## 📁 Architecture & Project Structure

```text
studio-space/
├── studiospace-client/            # Next.js 16 Frontend
│   ├── public/                    # Static assets & sample studio photography
│   │   └── images/
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/            # Sign-in & Registration pages
│   │   │   ├── add-studio/        # Host workspace creation form
│   │   │   ├── my-bookings/       # User reservation manager
│   │   │   ├── my-listings/       # Host listing management
│   │   │   ├── studios/           # Browse & Studio Details [id]
│   │   │   ├── wishlist/          # Saved spaces collection
│   │   │   ├── layout.tsx         # Root layout with ThemeProvider & Navbar
│   │   │   └── page.tsx           # Homepage (Hero, Featured, Categories, Guarantee)
│   │   ├── components/            # Reusable UI & section components
│   │   ├── context/               # ThemeContext (Dark / Light)
│   │   ├── lib/                   # API service, Better Auth, and utilities
│   │   └── hooks/                 # Custom React hooks
│   ├── next.config.ts             # Next.js configuration
│   └── package.json
│
└── studiospace-server/            # Express 5 Backend
    ├── index.js                   # REST API routes & MongoDB connection
    ├── vercel.json                # Vercel serverless deployment routing
    ├── package.json
    └── .env.example
```

---

## 💻 Getting Started Locally

### Prerequisites
- **Node.js**: v18.18 or higher (v20+ recommended)
- **npm** / **yarn** / **pnpm**
- **MongoDB Database**: A free MongoDB Atlas cluster or local MongoDB instance

---

### 1. Backend Setup (`studiospace-server`)

1. Open a terminal and navigate to the server folder:
   ```bash
   cd studiospace-server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```
   Configure your environment variables:
   ```env
   PORT=5001
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/studio-space?retryWrites=true&w=majority
   ```
4. Start the backend:
   ```bash
   npm start
   ```
   The backend will be available at: `http://localhost:5001`

---

### 2. Frontend Setup (`studiospace-client`)

1. Open a separate terminal and navigate to the client folder:
   ```bash
   cd studiospace-client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5001
   BETTER_AUTH_SECRET=your_random_32_character_secret_key
   BETTER_AUTH_URL=http://localhost:3000
   ```
4. Start the Next.js development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Environment Variables

### Backend (`studiospace-server/.env`)
| Variable | Description | Example |
| :--- | :--- | :--- |
| `PORT` | Local Express listening port | `5001` |
| `MONGO_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/studio-space` |

### Frontend (`studiospace-client/.env.local`)
| Variable | Description | Example |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | Base URL of the deployed or local Express backend | `http://localhost:5001` or `https://your-server.vercel.app` |
| `BETTER_AUTH_SECRET` | Secret token used to sign authentication cookies | `generate_random_key_here` |
| `BETTER_AUTH_URL` | Canonical URL of the frontend application | `http://localhost:3000` or `https://your-client.vercel.app` |

---

## 📡 REST API Endpoints

The backend Express application exposes the following endpoints:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Health check and server status |
| `GET` | `/featured-studios` | Returns the 6 newest curated studio listings |
| `GET` | `/studios` | Retrieves all studio listings (supports `?limit=N`) |
| `GET` | `/studios/:id` | Returns single studio details by MongoDB `ObjectId` |
| `POST` | `/add-studio` | Creates a new studio listing |
| `GET` | `/my-listings/:email` | Fetches all listings owned by a specific host email |
| `DELETE` | `/studios/:id` | Deletes a studio listing by `ObjectId` |

---

## 🚀 Deployment on Vercel

StudioSpace can be deployed to Vercel in two straightforward steps:

### Step 1: Deploying the Backend

1. Push your repository to **GitHub**.
2. Go to the [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New" ➔ "Project"**.
3. Import your GitHub repository.
4. In the Project Setup:
   - **Root Directory**: Click `Edit` and select `studiospace-server`.
   - **Framework Preset**: Select `Other`.
5. Under **Environment Variables**, add:
   - `MONGO_URI`: Your MongoDB Atlas connection URI.
6. Click **Deploy**.
7. Once deployed, copy your backend URL (e.g., `https://studiospace-server.vercel.app`).

---

### Step 2: Deploying the Frontend

1. In the Vercel Dashboard, click **"Add New" ➔ "Project"**.
2. Import the same repository.
3. In the Project Setup:
   - **Root Directory**: Click `Edit` and select `studiospace-client`.
   - **Framework Preset**: Vercel will automatically detect `Next.js`.
4. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_API_URL`: Your deployed backend URL from Step 1 (e.g., `https://studiospace-server.vercel.app`).
   - `BETTER_AUTH_SECRET`: A secure random 32-character string.
   - `BETTER_AUTH_URL`: Your frontend production domain (e.g., `https://studiospace.vercel.app`).
5. Click **Deploy**.
6. Your fullstack application is now live in production!

---

## 🤝 Contributing

Contributions, issues, and feature suggestions are welcome!
Feel free to open an issue or submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/CreativeSpaceFeature`)
3. Commit your Changes (`git commit -m 'Add awesome creative space feature'`)
4. Push to the Branch (`git push origin feature/CreativeSpaceFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<p align="center">
  Crafted with ❤️ for creators, producers, and workspace hosts worldwide.
</p>
