"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, Lock, Mail, MessageSquare } from "lucide-react";
import { BAND_INFO } from "@/data/bandData";
import MerseysideLogo from "@/components/MerseysideLogo";
import { triggerSmoothScrollTop } from "@/components/ui/smooth-scroll";

export default function Footer() {
  const scrollToTop = () => {
    triggerSmoothScrollTop();
  };

  return (
    <footer className="relative bg-[#050507] text-white pt-14 pb-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link href="/" className="group inline-block mb-3">
              <MerseysideLogo
                sizes="190px"
                className="h-7 w-auto text-white group-hover:opacity-80 transition-opacity"
              />
            </Link>
            <span className="text-xs font-medium uppercase tracking-wider text-zinc-300 mb-2">
              {BAND_INFO.genre}
            </span>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xs font-light">
              {BAND_INFO.tagline}
            </p>
            <div className="mt-4 flex items-center text-xs tabular-nums text-zinc-400">
              <span>{BAND_INFO.established} • {BAND_INFO.origin}</span>
            </div>
          </div>

          {/* Mobile 2-Column Compact Link Row / Desktop Individual Grid Columns */}
          <div className="grid grid-cols-2 md:contents gap-8">
            {/* Col 2: Navigation Links */}
            <div className="lg:col-span-3 flex flex-col">
              <span className="text-xs uppercase tracking-wider text-zinc-300 font-bold mb-4">
                Navigasi
              </span>
              <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-400 font-sans">
                <li>
                  <a href="#new-release" className="hover:text-white transition-colors">
                    Rilisan Terbaru (MERAH)
                  </a>
                </li>
                <li>
                  <a href="#gigs" className="hover:text-white transition-colors">
                    Jadwal Panggung
                  </a>
                </li>
                <li>
                  <a href="#music" className="hover:text-white transition-colors">
                    Karya Musik
                  </a>
                </li>
                <li>
                  <a href="#merch" className="hover:text-white transition-colors">
                    Rilisan &amp; Merch
                  </a>
                </li>
                <li>
                  <a href="#overview" className="hover:text-white transition-colors">
                    Manifesto Band
                  </a>
                </li>
                <li>
                  <a href="#story" className="hover:text-white transition-colors">
                    Kisah &amp; Formasi
                  </a>
                </li>
                <li>
                  <a href="#music-video" className="hover:text-white transition-colors">
                    Video Klip (MERAH)
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Streaming & Socials */}
            <div className="lg:col-span-2 flex flex-col">
              <span className="text-xs uppercase tracking-wider text-zinc-300 font-bold mb-4">
                Platform
              </span>
              <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-400 font-sans">
                <li>
                  <a
                    href={BAND_INFO.spotifyArtistUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Spotify
                  </a>
                </li>
                <li>
                  <a
                    href={BAND_INFO.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    YouTube
                  </a>
                </li>
                <li>
                  <a
                    href={BAND_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href={BAND_INFO.tiktokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    TikTok
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Col 4: Booking & Management Contact */}
          <div className="lg:col-span-3 flex flex-col items-start">
            <span className="text-xs uppercase tracking-wider text-zinc-300 font-bold mb-4">
              Booking &amp; Kontak
            </span>
            <p className="text-xs text-zinc-400 leading-relaxed mb-3">
              Untuk booking panggung, kolaborasi, dan wawancara media:
            </p>
            <div className="space-y-1 w-full">
              <a
                href={`mailto:${BAND_INFO.bookingEmail}`}
                className="min-h-[44px] flex items-center gap-2 text-xs text-zinc-300 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span className="truncate">{BAND_INFO.bookingEmail}</span>
              </a>
              <a
                href={`https://wa.me/${BAND_INFO.managerWhatsApp}?text=Halo%20Manajemen%20Merseyside%20Jakarta,%20kami%20ingin%20mengundang%20manggung`}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] flex items-center gap-2 text-xs text-zinc-300 hover:text-white transition-colors tabular-nums"
              >
                <MessageSquare className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span>{BAND_INFO.managerWhatsAppDisplay}</span>
              </a>
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={scrollToTop}
                className="min-h-[44px] rounded-full flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-200 hover:text-black px-5 py-2 bg-white/[0.08] hover:bg-white transition-colors cursor-pointer"
              >
                <span>Kembali ke Atas</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs tabular-nums text-zinc-400">
          <p>© 2026 MERSEYSIDE JAKARTA. ALL RIGHTS RESERVED.</p>

          <div className="flex items-center gap-2">
            <span>{BAND_INFO.genre} · Jakarta</span>
            <Link
              href="/admin"
              className="min-w-[44px] min-h-[44px] rounded-full inline-flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Admin Portal"
              aria-label="Admin Portal"
            >
              <Lock className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Subtle Giant Bottom Wordmark Watermark (Van Morrison Signature Touch) */}
        <div className="mt-8 pt-4 opacity-[0.04] pointer-events-none select-none" aria-hidden="true">
          <MerseysideLogo alt="" sizes="1152px" className="w-full h-auto text-white" />
        </div>
      </div>
    </footer>
  );
}
