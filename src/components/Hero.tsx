"use client";

import React from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown, Play } from "lucide-react";
import MerseysideLogo from "@/components/MerseysideLogo";
import { EDITORIAL_EASE } from "@/components/ui/motion";

export default function Hero() {
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 110,
    damping: 26,
    mass: 0.35,
  });
  const contentOpacity = useTransform(smoothScrollY, [0, 480], [1, 0]);
  const contentY = useTransform(smoothScrollY, [0, 480], [0, 56]);
  const videoScale = useTransform(smoothScrollY, [0, 600], [1.03, 1.11]);

  return (
    <section className="relative w-full h-svh min-h-[640px] lg:h-screen lg:min-h-[680px] flex flex-col justify-end overflow-hidden bg-black">
      {/* 1. Background Video / Cinematic Footage Container with Silky Spring Parallax */}
      <motion.div
        style={{ scale: videoScale }}
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none will-change-transform transform-gpu"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover grayscale contrast-110 brightness-105"
          poster="/videos/hero-poster.webp"
        >
          <source src="/videos/hero.webm" type="video/webm" />
          <source src="/videos/hero.mp4" type="video/mp4" />
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-crowd-at-a-rock-concert-41559-large.mp4"
            type="video/mp4"
          />
        </video>

        {/* Balanced dark tint & subtle edge vignette preserving video clarity */}
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/45" />
      </motion.div>

      {/* 2. Poster Wordmark & Release Card */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-30 max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 w-full pb-20 sm:pb-24 lg:pb-20 will-change-transform"
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 lg:gap-10">
          {/* Left / Center Poster Wordmark */}
          <div className="flex-1 min-w-0">
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EDITORIAL_EASE }}
              className="w-full max-w-[92%] sm:max-w-2xl"
            >
              <span className="sr-only">MERSEYSIDE JAKARTA</span>
              <MerseysideLogo
                alt="MERSEYSIDE"
                priority
                sizes="(max-width: 640px) 90vw, 680px"
                className="w-full h-auto text-white drop-shadow-[0_18px_40px_rgba(0,0,0,0.95)]"
              />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.14, ease: EDITORIAL_EASE }}
              className="mt-2 sm:mt-3 text-xs sm:text-lg font-bold tracking-[0.28em] text-zinc-200 uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
            >
              JAKARTA
            </motion.p>
          </div>

          {/* Right Corner Floating Paper Promo Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.75, delay: 0.24, ease: EDITORIAL_EASE }}
            className="bg-[#f5f4f0] text-black p-3.5 sm:p-5 rounded-2xl w-full sm:w-[390px] shrink-0 shadow-[0_25px_60px_rgba(0,0,0,0.85)]"
          >
            <div className="flex items-center gap-3.5 sm:gap-4">
              <a
                href="#new-release"
                className="relative w-14 h-14 sm:w-20 sm:h-20 rounded-xl bg-zinc-900 shrink-0 overflow-hidden block group"
              >
                <Image
                  src="/merah1.png"
                  alt="Cover Single MERAH"
                  fill
                  sizes="80px"
                  className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
              </a>

              <div className="min-w-0 flex-1">
                <span className="block text-[11px] sm:text-xs text-zinc-600 font-medium">
                  Single Baru Tersedia
                </span>
                <h2 className="mt-0.5 font-display text-xl sm:text-3xl font-bold uppercase tracking-tight leading-none text-black truncate">
                  <span className="text-[#FF2222]">MERAH</span> — MERSEYSIDE
                </h2>
                <div className="mt-2 sm:mt-2.5 flex flex-wrap items-center gap-3 sm:gap-4">
                  <a
                    href="#new-release"
                    className="sm:hidden inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black text-white text-[11px] font-bold uppercase tracking-wider active:scale-95 transition-transform"
                  >
                    <Play className="w-2.5 h-2.5 fill-white" />
                    <span>Putar</span>
                  </a>
                  <a
                    href="#new-release"
                    className="hidden sm:inline-block text-xs font-bold uppercase tracking-wider text-black underline underline-offset-4 hover:text-zinc-600 transition-colors"
                  >
                    Putar Single
                  </a>
                  <a
                    href="#gigs"
                    className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-black underline underline-offset-4 hover:text-zinc-600 transition-colors"
                  >
                    Jadwal Gigs
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Subtle Animated Scroll Cue (Lenis Anchor Smooth Scroll) */}
      <div className="absolute bottom-3.5 sm:bottom-4 left-1/2 -translate-x-1/2 z-30">
        <a
          href="#new-release"
          className="min-w-[44px] min-h-[44px] px-4 rounded-full inline-flex items-center gap-1.5 cursor-pointer group text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-colors"
          aria-label="Scroll ke Rilisan Terbaru"
        >
          <span className="text-xs font-medium tracking-wider uppercase">
            Scroll
          </span>
          <motion.span
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex"
          >
            <ArrowDown className="w-4 h-4 text-white" />
          </motion.span>
        </a>
      </div>
    </section>
  );
}
