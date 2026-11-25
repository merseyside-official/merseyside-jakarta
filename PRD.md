# PRODUCT REQUIREMENT DOCUMENT (PRD)
## Official Web Platform: MERSEYSIDE JAKARTA

**Document Version:** 1.0.0  
**Status:** Approved for Technical Architecture  
**Target Audience:** Merseyside Jakarta Band Members, Management, Fans, Promoters, and Web Developers  
**Design Philosophy:** Dark Monochrome, Cinematic Motion, Zero-Code Admin, Direct-to-Fan  

---

## 1. Executive Summary & Vision

### 1.1 Brand Background & Evolution
* **Band Name:** MERSEYSIDE JAKARTA
* **Timeline:** 
  * 2007: First gathering and formation of personnel.
  * 2010: Official stage debut.
* **Evolutionary Pivot:**
  Transitioning from a grassroots supporter-affiliated band to a **universal Alternative Rock / Britpop band**. The platform strips away territorial football divides and positions Merseyside Jakarta as a serious, mature musical force capable of connecting with global and nationwide music lovers, while retaining raw street attitude and anthemic energy in its DNA.

### 1.2 Core Objective
To develop an ultra-responsive, highly aesthetic, animated digital hub combining:
1. **Cinematic Fan Experience:** 1-Page executive landing flow with smooth transitions and persistent audio.
2. **Dedicated Deep-Dives:** Multi-page architecture for complete discography, gig archives, band manifesto, and merch catalog.
3. **Direct-to-Fan Commerce:** WhatsApp-integrated manual checkout with automatic order formatting (zero payment gateway friction).
4. **Zero-Code Management:** A mobile-friendly Admin Dashboard allowing band management to update tour dates, upload songs/lyrics, and toggle merch stock without writing a single line of code.

---

## 2. Visual Identity & Design System

### 2.1 Color Palette (Strict Monochrome)
* **Obsidian Black (`#050505` / `#0A0A0A`):** Dominant background canvas.
* **Surface Card Dark (`#11111198` with `backdrop-blur`):** Floating modules and audio player.
* **Subtle Borders (`#FFFFFF15`):** Hairline dividing lines and card outlines.
* **Muted Grey (`#A1A1AA`):** Secondary text, timestamps, metadata.
* **Stark White (`#FAFAFA`):** Headings, primary typography, active interactive triggers.

### 2.2 Aesthetic & Motion Standards
* **Typography:** Bold, clean uppercase sans-serifs for headings (*Oswald / Syne / Inter Display*); high-legibility sans-serif for lyrics and body text.
* **Motion Engine:**
  * **Lenis Smooth Scroll:** Inertial, luxury-grade scroll physics.
  * **Framer Motion:** Staggered text entrances, micro-interactions, page route cross-fades, and interactive physics sliders.
* **Photography & Video Style:** High-contrast black & white imagery, analog 35mm grain, live performance stage lighting, atmospheric smoke/flare textures.

---

## 3. Information Architecture & Navigation

### 3.1 Header (Global Navigation Bar)
* **Brand Mark (Left):** `MERSEYSIDE JAKARTA` (Wordmark, links to homepage apex).
* **Navigation Links (Center - Combination 1):**
  * `MUSIC` $\rightarrow$ Anchor to Discography teaser or `/music`
  * `GIGS` $\rightarrow$ Anchor to Tour teaser or `/gigs`
  * `MERCH` $\rightarrow$ Anchor to Store teaser or `/store`
  * `STORY` $\rightarrow$ Anchor to Manifesto teaser or `/story`
* **Right Elements:**
  * **Interactive Mini Equalizer:** Animated 3-4 bar visualizer active when audio plays (clickable to toggle mute or expand player).
  * **CTA Button:** `[ LISTEN NOW ]` or `[ TOUR DATES ]`.
* **Mobile Navigation:**
  * Clean hamburger icon triggering a full-screen dark overlay with bold editorial typography and direct social media links.

---

## 4. Page Architecture & User Experience Flow

### 4.1 Homepage (The 1-Page Executive Summary)
The homepage acts as an atmospheric narrative overview:

1. **Hero Section (The Cinematic Hook):**
   * **Background:** Full-viewport looping monochrome video footage of Merseyside live on stage.
   * **Centered Overlay:** High-contrast `MERSEYSIDE JAKARTA` typographic emblem.
   * **Transition:** Smooth gradient mask dissolving into the dark surface below.
2. **Overview / Manifesto:**
   * Short, punchy statement introducing the band's new era and universal musical trajectory.
3. **Gigs Summary (Next Shows):**
   * Minimalist schedule list showing the next 2-3 upcoming gigs with venue, city, and status badges (`Tersedia`, `Sold Out`, `Free Entry`).
   * Link: `[ Lihat Semua Jadwal / Full Tour Dates ]` $\rightarrow$ `/gigs`.
4. **Floating Audio Player (Sticky / On-Scroll Reveal):**
   * Floating glassmorphic card (`audio-player.tsx` specification):
     * Artwork cover, title, spring slider scrubber, duration timer.
     * Transport controls: Play, Pause, Seek, Shuffle, Repeat.
     * **Spotify Integration:** Dedicated button/icon to seamlessly open the track inside Spotify.
5. **Merchandise & Physical Releases Teaser:**
   * Showcase of 3-4 featured items (Cassette, Vinyl/CD, Signature Apparel).
   * Link: `[ Kunjungi Official Store ]` $\rightarrow$ `/store`.
6. **Footer:**
   * Copyright, social icons (Spotify, Apple Music, YouTube, Instagram), management email, and discreet admin portal link.

---

### 4.2 Dedicated Multi-Page Detail Routes

#### Route A: `/music` & `/music/[slug]` (Discography & Lyrics Hub)
* Full catalog of Singles, EPs, and Studio Albums.
* Dedicated track page with:
  * Full audio streaming links (Spotify, Apple Music, Bandcamp).
  * Complete Song Lyrics & Chants (formatted for mobile sing-alongs).
  * Production credits & liner notes.

#### Route B: `/gigs` (Tour & Archive)
* **Upcoming Gigs:** Comprehensive list with direct ticketing links.
* **Gig Archive (2010 - Present):** Interactive historical ledger documenting past stages, cities, and flyer archives.

#### Route C: `/store` & `/store/[slug]` (Physical Releases & Merch)
* Filterable catalog: *Physical Audio (Cassette/CD)*, *Apparel*, *Accessories*.
* Product detail page:
  * Multi-angle high-resolution image gallery.
  * Size selector: `S`, `M`, `L`, `XL`, `XXL`.
  * Size chart dialog.
  * Stock status indicator (`In Stock` / `Sold Out`).
* **Direct WhatsApp Order Generator:**
  * When a buyer clicks `[ Pesan via WhatsApp ]`, the system formats a pre-filled message sent to the band admin WhatsApp number:
    ```text
    Halo Admin Merseyside Jakarta Store, saya ingin order:
    - Produk: [Nama Produk]
    - Size: [Ukuran yang dipilih]
    - Qty: [Jumlah]
    - Nama: [Nama Pembeli]
    - Kota/Kecamatan: [Alamat Pengiriman]
    Mohon info total biaya + ongkos kirim dan nomor rekening transfer. Terima kasih!
    ```

#### Route D: `/story` (The Manifesto & Journey)
* Chronological storytelling: 2007 member roots, 2010 live debut, and the ideological evolution to universal rock.
* High-contrast member gallery & roles.
* Booking agency contacts, management details, and downloadable Electronic Press Kit (EPK).

---

## 5. Admin Dashboard (100% Zero-Coding CMS)

### 5.1 Access & Security
* Private route (`/admin`) protected by secure authentication (Email + Password).
* Fully responsive UI optimized for smartphones and laptops.

### 5.2 Content Management Capabilities
1. **Stock & Merchandise Control:**
   * List all products with immediate toggle switches: `[ Ready Stock ]` $\leftrightarrow$ `[ Sold Out ]`.
   * Size-specific availability toggles.
   * Simple form to add new products: Title, Price, Description, Upload Photo, Variants.
2. **Music & Lyrics Uploader:**
   * Add new track/album: Title, Release Date, Cover Art Uploader, Audio File/Stream URL.
   * Large rich-text box to paste and format Song Lyrics.
3. **Tour & Gigs Manager:**
   * Add/Edit Gigs: Event Name, Date & Time, City, Venue Name, Ticket Link.
   * Quick status selector dropdown: `Tersedia` | `Sold Out` | `Free Entry`.
4. **Global Band Settings:**
   * Admin WhatsApp receiving number.
   * Official social media links.
   * Top announcement marquee ticker text.

---

## 6. Technical Stack & Implementation Specs

* **Core Framework:** Next.js 14+ (App Router) + TypeScript
* **Styling:** Tailwind CSS + Shadcn UI primitive patterns
* **Animation Suite:** Framer Motion (Page Transitions & UI micro-interactions) + Lenis (Smooth Scrolling)
* **Icons:** Lucide React
* **Audio Engine:** HTML5 Audio + Howler/Custom React State with Global Player persistence
* **Database & Auth (CMS Backend):** Supabase (PostgreSQL, Supabase Auth, Supabase Storage for images/audio)
* **Hosting Target:** Vercel (Optimized for Next.js edge performance)

---

## 7. Development Roadmap

1. **Phase 1: PRD & Architecture Alignment** (Current)
2. **Phase 2: Project Scaffolding & Design System Tokens** (Tailwind monokrom setup, font definitions, Shadcn initialization)
3. **Phase 3: Core Public Layout & Interactive Components** (Header, Video Hero, Smooth Transitions, Floating Audio Player)
4. **Phase 4: Multi-Page Detail Views & WhatsApp Checkout Generator**
5. **Phase 5: Zero-Code Admin CMS Integration & Testing**
6. **Phase 6: Performance Audit, Asset Optimization & Production Deployment**
