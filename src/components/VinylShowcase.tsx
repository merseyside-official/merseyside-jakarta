"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Heart,
  Shuffle,
  Repeat,
} from "lucide-react";
import { SONGS_DATA, BAND_INFO } from "@/data/bandData";
import { formatAudioTime } from "@/lib/format";
import { notifyAudioPlay, subscribeOtherAudioPlay } from "@/lib/audioBus";
import { Reveal, EqualizerBars } from "@/components/ui/motion";
import {
  SpotifyIcon,
  AppleMusicTileIcon,
  YouTubeIcon,
  DeezerIcon,
  TidalIcon,
  JooxIcon,
  AmazonMusicIcon,
  RessoIcon,
  TikTokMusicIcon,
} from "@/components/icons/StreamingIcons";

const PLAYER_ID = "vinyl-showcase";

const STREAMING_PLATFORMS = [
  { key: "spotify", label: "Spotify", name: "Spotify", Icon: SpotifyIcon, labelClass: "font-bold tracking-tight" },
  { key: "appleMusic", label: "Music", name: "Apple Music", Icon: AppleMusicTileIcon, labelClass: "font-semibold tracking-tight" },
  { key: "youtube", label: "YouTube", name: "YouTube", Icon: YouTubeIcon, labelClass: "font-bold tracking-tight" },
  { key: "deezer", label: "deezer", name: "Deezer", Icon: DeezerIcon, labelClass: "font-bold tracking-tight" },
  { key: "tidal", label: "TIDAL", name: "TIDAL", Icon: TidalIcon, labelClass: "font-bold tracking-[0.12em]" },
  { key: "joox", label: "JOOX", name: "JOOX", Icon: JooxIcon, labelClass: "font-black tracking-wider" },
  { key: "amazonMusic", label: "amazon", name: "Amazon Music", Icon: AmazonMusicIcon, labelClass: "font-bold tracking-tight" },
  { key: "resso", label: "resso", name: "Resso", Icon: RessoIcon, labelClass: "font-semibold tracking-tight" },
  { key: "tiktokMusic", label: "TikTok Music", name: "TikTok Music", Icon: TikTokMusicIcon, labelClass: "font-bold tracking-tight leading-tight" },
] as const;

export default function VinylShowcase() {
  const song = SONGS_DATA[0]; // "MERAH"
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(true);
  const [isRepeated, setIsRepeated] = useState(false);

  useEffect(() => {
    return subscribeOtherAudioPlay(PLAYER_ID, () => {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
    });
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      notifyAudioPlay(PLAYER_ID);
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const current = audioRef.current.currentTime;
    const total = audioRef.current.duration;
    const hasDuration = isFinite(total) && total > 0;
    setCurrentTime(current);
    setDuration(hasDuration ? total : 0);
    if (hasDuration) {
      setProgress((current / total) * 100);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    audioRef.current.currentTime = percentage * duration;
    setProgress(percentage * 100);
  };

  const handleSeekKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(duration, audioRef.current.currentTime + 5);
      audioRef.current.currentTime = next;
      setProgress((next / duration) * 100);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(0, audioRef.current.currentTime - 5);
      audioRef.current.currentTime = next;
      setProgress((next / duration) * 100);
    }
  };

  const handleToggleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      togglePlay();
    }
  };

  const handlePrev = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
  };

  const handleNext = () => {
    if (!audioRef.current || !duration) return;
    audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 10, duration);
  };

  const links = song.streamingLinks || {
    spotify: song.spotifyUrl,
    appleMusic: "https://music.apple.com",
    youtube: "https://youtube.com",
    joox: "https://www.joox.com",
    deezer: "https://www.deezer.com",
    tidal: "https://listen.tidal.com",
    amazonMusic: "https://music.amazon.com",
    resso: "https://www.resso.com",
    tiktokMusic: "https://music.tiktok.com",
  };

  return (
    <section
      id="new-release"
      className="relative w-full py-16 sm:py-24 bg-black text-white overflow-hidden"
    >
      {/* Lightweight GPU-composited Creased Paper Ambient Texture (Zero Per-Pixel SVG Filters) */}
      <div
        className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 100px, black calc(100% - 100px), transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 100px, black calc(100% - 100px), transparent 100%)",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_25%,rgba(255,255,255,0.06),transparent_60%),radial-gradient(ellipse_at_75%_70%,rgba(255,255,255,0.04),transparent_55%)]" />

        {/* Static Faceted Origami Fold Hairlines (No expensive feTurbulence / feDiffuseLighting) */}
        <svg
          className="absolute inset-0 w-full h-full opacity-20 mix-blend-screen"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M-50 180 L480 380 L1490 120" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" fill="none" />
          <path d="M180 -50 L480 380 L280 950" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" fill="none" />
          <path d="M1250 -50 L950 460 L1180 950" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" fill="none" />
          <path d="M480 380 L950 460" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" />
          <path d="M80 620 L380 560 L680 750" stroke="rgba(255,255,255,0.22)" strokeWidth="0.8" fill="none" />
          <path d="M820 180 L1080 310 L1320 220" stroke="rgba(255,255,255,0.22)" strokeWidth="0.8" fill="none" />
          <path d="M680 750 L950 460 L1300 680" stroke="rgba(255,255,255,0.22)" strokeWidth="0.8" fill="none" />
        </svg>

        <div className="absolute inset-0 bg-radial from-transparent via-black/25 to-black/80 pointer-events-none" />
      </div>

      {/* Global Top Edge Seamless Dissolve into pure black */}
      <div className="absolute top-0 inset-x-0 h-20 sm:h-28 bg-gradient-to-b from-black via-black/90 to-transparent pointer-events-none z-0" />
      {/* Global Bottom Edge Seamless Dissolve into pure black */}
      <div className="absolute bottom-0 inset-x-0 h-20 sm:h-28 bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none z-0" />

      <audio
        ref={audioRef}
        src={song.audioSrc}
        loop={isRepeated}
        onLoadedMetadata={handleTimeUpdate}
        onDurationChange={handleTimeUpdate}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        preload="metadata"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal className="flex flex-col items-center text-center mb-10 sm:mb-16">
          <h2 className="font-display text-6xl sm:text-8xl md:text-9xl font-bold tracking-tight uppercase text-white leading-[0.85]">
            SINGLE <span className="text-[#FF2222]">MERAH</span>
          </h2>
        </Reveal>

        {/* 2-Column Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
          {/* ========================================================= */}
          {/* 1. KIRI: VINYL RECORD + MUSIC PLAYER TEMPLATE DI BAWAHNYA  */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center w-full">
            {/* Spinning Vinyl Record & Cardboard Sleeve (Mobile Vertical Peek / Desktop Horizontal Peek) */}
            <div className="relative w-full max-w-[320px] sm:max-w-[420px] aspect-square sm:aspect-[1.3/1] mt-20 sm:mt-0 flex items-center justify-center sm:justify-start select-none">
              {/* Responsive Translation Wrapper: vertical LP unboxing on mobile, horizontal peek on sm+ */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 z-10 w-[82%] sm:w-[78%] aspect-square transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
                  isPlaying
                    ? "-translate-y-[38%] sm:translate-y-0 sm:translate-x-[44%]"
                    : "-translate-y-[18%] sm:translate-y-0 sm:translate-x-[25%]"
                }`}
              >
                {/* GPU-accelerated Vinyl Record (freezes gracefully at current angle on pause) */}
                <div
                  role="button"
                  tabIndex={0}
                  aria-pressed={isPlaying}
                  aria-label={isPlaying ? "Pause single MERAH" : "Putar single MERAH"}
                  onKeyDown={handleToggleKeyDown}
                  onClick={togglePlay}
                  title={isPlaying ? "Klik untuk Pause" : "Klik untuk Putar Vinyl"}
                  className="animate-vinyl-spin relative w-full h-full rounded-full cursor-pointer shadow-[0_25px_60px_rgba(0,0,0,0.95)] flex items-center justify-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  style={{
                    animationPlayState: isPlaying ? "running" : "paused",
                    background:
                      "radial-gradient(circle at center, #070707 0%, #151515 18%, #050505 22%, #191919 35%, #040404 48%, #1c1c1c 60%, #060606 72%, #181818 86%, #020202 100%)",
                  }}
                >
                  {/* Grooves & Specular Sheen */}
                  <div
                    className="absolute inset-0 rounded-full opacity-35 pointer-events-none"
                    style={{
                      background:
                        "conic-gradient(from 45deg, transparent 0deg, rgba(255,255,255,0.2) 40deg, transparent 80deg, transparent 180deg, rgba(255,255,255,0.2) 220deg, transparent 260deg)",
                    }}
                  />

                  <div className="absolute inset-3 rounded-full border border-white/[0.04] pointer-events-none" />
                  <div className="absolute inset-7 rounded-full border border-white/[0.04] pointer-events-none" />
                  <div className="absolute inset-11 rounded-full border border-white/[0.04] pointer-events-none" />
                  <div className="absolute inset-15 rounded-full border border-white/[0.04] pointer-events-none" />

                  {/* Center Label */}
                  <div className="relative w-[34%] aspect-square rounded-full overflow-hidden shadow-inner flex items-center justify-center bg-black">
                    <Image
                      src="/merah1.png"
                      alt="Center Label MERAH"
                      fill
                      sizes="(max-width: 640px) 105px, 145px"
                      className="object-cover"
                    />
                    <div className="relative z-10 w-3.5 h-3.5 rounded-full bg-black shadow-inner" />
                  </div>
                </div>
              </div>

              {/* Cardboard Sleeve */}
              <motion.div
                role="button"
                tabIndex={0}
                aria-pressed={isPlaying}
                aria-label={isPlaying ? "Pause single MERAH" : "Putar single MERAH dari cover"}
                onKeyDown={handleToggleKeyDown}
                onClick={togglePlay}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="relative z-20 w-[82%] sm:w-[78%] aspect-square rounded-2xl overflow-hidden bg-zinc-950 shadow-[0_25px_50px_rgba(0,0,0,0.98)] cursor-pointer group select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Image
                  src="/merah1.png"
                  alt="MERAH - Album Cover"
                  fill
                  priority
                  sizes="(max-width: 640px) 265px, 330px"
                  className="object-cover"
                />

                <div className="absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-black/80 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.08] via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-3 bg-gradient-to-l from-black/80 to-transparent pointer-events-none" />
              </motion.div>
            </div>

            {/* MUSIC PLAYER TEMPLATE */}
            <div className="w-full max-w-[340px] sm:max-w-[380px] mt-7 sm:mt-8 flex flex-col select-none px-1">
              {/* Row 1: Song Name + Equalizer + Artist Name (Left) & Heart (Right) */}
              <div className="flex items-center justify-between mb-4">
                <div className="min-w-0 pr-4">
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-xl sm:text-2xl font-black tracking-tight text-[#FF2222] font-sans uppercase leading-none truncate">
                      MERAH
                    </h3>
                    <EqualizerBars active={isPlaying} barClassName="bg-[#FF2222]" />
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 font-medium tracking-wide mt-1 truncate">
                    {BAND_INFO.name}
                  </p>
                </div>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsLiked(!isLiked)}
                  aria-pressed={isLiked}
                  aria-label={isLiked ? "Hapus dari Favorit" : "Tambah ke Favorit"}
                  className="min-w-[44px] min-h-[44px] rounded-full inline-flex items-center justify-center text-white cursor-pointer flex-shrink-0"
                  title={isLiked ? "Hapus dari Favorit" : "Tambah ke Favorit"}
                >
                  <Heart
                    className={`w-6 h-6 transition-colors ${isLiked ? "fill-white text-white" : "text-zinc-400 hover:text-white"
                      }`}
                  />
                </motion.button>
              </div>

              {/* Row 2: Scrubber Timeline Bar + Knob */}
              <div className="w-full mb-1">
                <div
                  role="slider"
                  tabIndex={0}
                  aria-label="Progress audio single MERAH"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(progress)}
                  onKeyDown={handleSeekKeyDown}
                  onClick={handleSeek}
                  className="group relative w-full py-2 cursor-pointer flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-full"
                >
                  <div className="relative w-full h-1 bg-zinc-700 rounded-full flex items-center">
                    <div
                      className="h-full bg-white rounded-full transition-[width] duration-75"
                      style={{ width: `${progress}%` }}
                    />
                    {/* Knob */}
                    <div
                      className="absolute w-3.5 h-3.5 rounded-full bg-white shadow-md -translate-x-1/2 cursor-pointer group-hover:scale-125 transition-transform"
                      style={{ left: `${progress}%` }}
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center mt-1 text-xs tabular-nums text-zinc-400">
                  <span>{formatAudioTime(currentTime)}</span>
                  <span>{duration ? formatAudioTime(duration) : "--:--"}</span>
                </div>
              </div>

              {/* Row 3: Transport Controls */}
              <div className="flex items-center justify-between mt-3 px-1">
                {/* Shuffle (non-applicable for single track; explicitly disabled to avoid fake control) */}
                <button
                  type="button"
                  disabled
                  aria-label="Acak hanya tersedia pada mode playlist"
                  className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-zinc-600 opacity-40 cursor-not-allowed"
                  title="Mode single (acak tersedia di bagian Karya Musik)"
                >
                  <Shuffle className="w-5 h-5" />
                </button>

                {/* Previous (<<) */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePrev}
                  aria-label="Ulang ke awal lagu"
                  className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-white hover:text-zinc-300 transition-colors cursor-pointer"
                  title="Kembali ke awal"
                >
                  <SkipBack className="w-7 h-7 fill-white" />
                </motion.button>

                {/* Big Circular Play / Pause Button */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={togglePlay}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white text-black flex items-center justify-center shadow-[0_10px_25px_rgba(255,255,255,0.15)] transition-colors cursor-pointer"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 sm:w-7 sm:h-7 fill-black text-black" />
                  ) : (
                    <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-black text-black ml-1" />
                  )}
                </motion.button>

                {/* Next (>>) */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleNext}
                  aria-label="Maju 10 detik"
                  className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-white hover:text-zinc-300 transition-colors cursor-pointer"
                  title="Maju 10 detik"
                >
                  <SkipForward className="w-7 h-7 fill-white" />
                </motion.button>

                {/* Repeat */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsRepeated((prev) => !prev)}
                  aria-pressed={isRepeated}
                  aria-label="Ulangi lagu terus-menerus"
                  className={`min-w-[44px] min-h-[44px] inline-flex items-center justify-center transition-colors cursor-pointer relative ${isRepeated ? "text-white" : "text-zinc-400 hover:text-white"
                    }`}
                  title={isRepeated ? "Matikan pengulangan" : "Ulangi lagu"}
                >
                  <Repeat className="w-5 h-5" />
                  {isRepeated && <span className="absolute bottom-1.5 w-1.5 h-1.5 rounded-full bg-[#FF2222]" />}
                </motion.button>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 2. KANAN: REDAKSI SINGLE & AVAILABLE ON STREAMING          */}
          {/* ========================================================= */}
          <Reveal delay={0.1} className="lg:col-span-5 flex flex-col items-center justify-center w-full">
            <div className="w-full max-w-[460px] flex flex-col items-center">
              {/* Redaksi / Editorial Single MERAH */}
              <div className="relative mb-7 sm:mb-8 text-center px-3 sm:px-4">
                <p className="text-[13px] sm:text-[15px] font-sans italic text-zinc-300 leading-relaxed font-light tracking-wide">
                  &ldquo;Sebab pada akhirnya, merah bukan hanya tentang warna. Ia adalah simbol dari sebuah keberanian untuk berjanji, bertahan, dan tetap setia, bahkan ketika perjalanan mengharuskan kita membayar lebih mahal dari yang pernah dibayangkan.&rdquo;
                </p>
                <div className="mt-4 flex items-center justify-center gap-3">
                  <div className="w-8 h-[1px] bg-zinc-800" />
                  <span className="text-xs uppercase tracking-[0.25em] text-[#FF2222] font-bold">
                    MERAH
                  </span>
                  <div className="w-8 h-[1px] bg-zinc-800" />
                </div>
              </div>

              {/* Info rilis & liner notes */}
              <div className="w-full mb-8 sm:mb-9">
                <div className="text-center mb-5">
                  <p className="text-xs sm:text-sm uppercase tracking-wider text-zinc-300 font-semibold">
                    Tentang Perjalanan, Pengorbanan, dan Janji Setia
                  </p>
                  {(song.releaseDate || song.label) && (
                    <div className="mt-2.5 flex items-center justify-center gap-2 text-xs tabular-nums text-zinc-400">
                      <span>Rilis {song.releaseDate}</span>
                      <span className="text-white/25" aria-hidden="true">|</span>
                      <span className="text-zinc-200 font-semibold">{song.label}</span>
                    </div>
                  )}
                </div>

                {/* Production Liner Notes Matrix */}
                {song.credits && song.credits.length > 0 && (
                  <div className="max-w-md mx-auto rounded-2xl bg-[#111114] p-4 sm:p-5 text-left">
                    <div className="flex items-center justify-between pb-2.5 mb-3">
                      <span className="text-xs uppercase tracking-wider text-zinc-300 font-semibold">
                        Kredit Produksi
                      </span>
                      <span className="text-xs text-zinc-400">
                        {song.label}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
                      {song.credits
                        .filter((c) => !["Vokal", "Gitar", "Gitar Lead", "Bass", "Keyboard", "Drum", "Trumpet", "Trombone"].includes(c.role))
                        .map((c) => (
                          <div key={c.role} className="flex flex-col gap-0.5">
                            <span className="uppercase tracking-wide text-zinc-400">{c.role}</span>
                            <span className="text-zinc-100 font-medium">{c.name}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Header: —— AVAILABLE ON —— */}
              <div className="flex items-center gap-3 w-full mb-7 sm:mb-8">
                <div className="h-[1px] bg-white/20 flex-1" />
                <span className="text-xs tracking-[0.2em] text-zinc-300 uppercase whitespace-nowrap font-semibold">
                  Tersedia di Platform
                </span>
                <div className="h-[1px] bg-white/20 flex-1" />
              </div>

              {/* Deretan Logo Platform Streaming Bebas Tanpa Badge (3x3 mobile / 5+4 centered desktop) */}
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-5 sm:gap-x-3 sm:gap-y-6 w-full">
                {STREAMING_PLATFORMS.map(({ key, label, name, Icon, labelClass }) => (
                  <a
                    key={key}
                    href={links[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Dengarkan MERAH di ${name}`}
                    className="group w-[calc(33.333%-0.5rem)] sm:w-[calc(20%-0.75rem)] min-h-[56px] py-1 flex flex-col items-center justify-center gap-2 text-zinc-200 hover:text-white transition-all duration-150 hover:-translate-y-1 active:scale-95 motion-reduce:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-xl"
                  >
                    <Icon className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 transition-transform duration-150 group-hover:scale-110" />
                    <span className={`text-xs font-sans text-zinc-400 group-hover:text-white text-center leading-tight ${labelClass}`}>
                      {label}
                    </span>
                  </a>
                ))}
              </div>

              {/* Shortcut link to Official Music Video section below */}
              <div className="mt-7 w-full flex justify-center">
                <a
                  href="#music-video"
                  className="min-h-[44px] rounded-full inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.10] hover:bg-white active:scale-[0.98] text-xs font-bold uppercase tracking-wider text-zinc-100 hover:text-black transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Tonton Video Klip MERAH</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
