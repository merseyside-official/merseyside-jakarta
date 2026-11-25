"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BAND_INFO } from "@/data/bandData";
import MerseysideLogo from "@/components/MerseysideLogo";
import { AppleMusicIcon, SpotifyIcon, YouTubeIcon } from "@/components/icons/StreamingIcons";
import { EDITORIAL_EASE, ScrollProgressBar } from "@/components/ui/motion";

const NAV_ITEMS = [
  { label: "Musik", href: "#music" },
  { label: "Jadwal", href: "#gigs" },
  { label: "Merch", href: "#merch" },
  { label: "Kisah", href: "#story" },
  { label: "Video", href: "#music-video" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <ScrollProgressBar />
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? "bg-black/90 backdrop-blur-xl py-2.5 shadow-2xl"
            : "bg-gradient-to-b from-black/80 via-black/35 to-transparent py-4"
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 grid grid-cols-3 items-center">
          {/* Left: Compact Navigation / Mobile Menu Trigger */}
          <div className="flex items-center justify-start">
            <nav className="hidden lg:flex items-center gap-5" aria-label="Navigasi utama">
              {NAV_ITEMS.slice(0, 4).map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-xs uppercase tracking-[0.16em] font-semibold text-zinc-300 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="lg:hidden min-w-[44px] min-h-[44px] -ml-2 rounded-full inline-flex items-center justify-center text-white hover:bg-white/[0.08] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition-all cursor-pointer"
              aria-label={isMobileMenuOpen ? "Tutup Navigasi" : "Buka Navigasi"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Center: Official Brand Wordmark */}
          <div className="flex items-center justify-center">
            <Link href="/" className="group inline-flex items-center min-h-[44px]" aria-label="Merseyside Jakarta — Beranda">
              <MerseysideLogo
                sizes="180px"
                priority
                className="h-5 sm:h-6 w-auto text-white group-hover:opacity-80 transition-opacity"
              />
            </Link>
          </div>

          {/* Right: Minimal Streaming Icons + Action CTA */}
          <div className="flex items-center justify-end gap-3 sm:gap-4">
            <div className="hidden md:flex items-center gap-2">
              <a
                href={BAND_INFO.spotifyArtistUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Spotify Merseyside"
                title="Spotify"
                className="min-w-[40px] min-h-[40px] rounded-full inline-flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <SpotifyIcon className="w-4 h-4" />
              </a>
              <a
                href={BAND_INFO.appleMusicArtistUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Apple Music Merseyside"
                title="Apple Music"
                className="min-w-[40px] min-h-[40px] rounded-full inline-flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <AppleMusicIcon className="w-4 h-4" />
              </a>
              <a
                href={BAND_INFO.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube Merseyside"
                title="YouTube"
                className="min-w-[40px] min-h-[40px] rounded-full inline-flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <YouTubeIcon className="w-4 h-4" />
              </a>
            </div>

            <Button
              asChild
              size="sm"
              className="hidden sm:inline-flex uppercase tracking-wider text-xs px-4"
            >
              <a href="#music-video">Video Klip</a>
            </Button>
          </div>
        </div>

        {/* Mobile Editorial Menu Sheet */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.24, ease: EDITORIAL_EASE }}
              className="lg:hidden absolute inset-x-0 top-full bg-black/95 backdrop-blur-2xl py-6 px-5 flex flex-col gap-5 shadow-2xl border-b border-white/[0.08]"
            >
              <nav className="flex flex-col gap-1" aria-label="Navigasi mobile">
                {NAV_ITEMS.map((item, idx) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.22, delay: idx * 0.04, ease: EDITORIAL_EASE }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="min-h-[48px] px-3 rounded-xl flex items-baseline justify-between text-zinc-200 hover:text-white hover:bg-white/[0.06] active:scale-[0.99] transition-all"
                    >
                      <span className="text-2xl font-display font-bold tracking-tight uppercase">
                        {item.label}
                      </span>
                      <span className="text-xs font-medium tabular-nums text-zinc-500">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="pt-3 border-t border-white/[0.08] flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                  <Button asChild size="sm" className="flex-1 uppercase font-bold text-xs tracking-wider">
                    <a
                      href={BAND_INFO.spotifyArtistUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Spotify
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="flex-1 uppercase font-bold text-xs tracking-wider">
                    <a href="#music-video" onClick={() => setIsMobileMenuOpen(false)}>
                      Video Klip
                    </a>
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-3 pt-1">
                  <a
                    href={BAND_INFO.spotifyArtistUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Spotify Merseyside"
                    className="min-w-[44px] min-h-[44px] rounded-full inline-flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <SpotifyIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={BAND_INFO.appleMusicArtistUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Apple Music Merseyside"
                    className="min-w-[44px] min-h-[44px] rounded-full inline-flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <AppleMusicIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={BAND_INFO.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube Merseyside"
                    className="min-w-[44px] min-h-[44px] rounded-full inline-flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <YouTubeIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
