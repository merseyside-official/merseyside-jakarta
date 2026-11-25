"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, X, ArrowUpRight } from "lucide-react";
import AudioPlayer from "@/components/ui/audio-player";
import { Button } from "@/components/ui/button";
import { SONGS_DATA, BAND_INFO, Song } from "@/data/bandData";
import { Reveal, EqualizerBars, EDITORIAL_EASE } from "@/components/ui/motion";

const DECK_POSITIONS = [
  { songIndex: 4, rotate: "-rotate-12", offset: "translate-y-3 -translate-x-2 sm:translate-y-4 sm:-translate-x-4", z: "z-10", size: "w-20 h-20 sm:w-36 sm:h-36 md:w-44 md:h-44" },
  { songIndex: 1, rotate: "-rotate-6", offset: "translate-y-1.5 -translate-x-1 sm:translate-y-2 sm:-translate-x-2", z: "z-20", size: "w-24 h-24 sm:w-40 sm:h-40 md:w-52 md:h-52" },
  { songIndex: 0, rotate: "rotate-0", offset: "translate-y-0", z: "z-30", size: "w-28 h-28 sm:w-52 sm:h-52 md:w-64 md:h-64" },
  { songIndex: 2, rotate: "rotate-6", offset: "translate-y-1.5 translate-x-1 sm:translate-y-2 sm:translate-x-2", z: "z-20", size: "w-24 h-24 sm:w-40 sm:h-40 md:w-52 md:h-52" },
  { songIndex: 3, rotate: "rotate-12", offset: "translate-y-3 translate-x-2 sm:translate-y-4 sm:translate-x-4", z: "z-10", size: "w-20 h-20 sm:w-36 sm:h-36 md:w-44 md:h-44" },
];

export default function MusicSection() {
  const [selectedSong, setSelectedSong] = useState<Song>(SONGS_DATA[0]);
  const [activeLyrics, setActiveLyrics] = useState<Song | null>(null);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [shouldAutoPlay, setShouldAutoPlay] = useState(false);

  useEffect(() => {
    if (!activeLyrics) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveLyrics(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeLyrics]);

  const selectTrack = (song: Song, autoPlay = true) => {
    setShouldAutoPlay(autoPlay);
    if (song.id !== selectedSong.id) {
      setIsAudioPlaying(false);
    }
    setSelectedSong(song);
  };

  const handleSelectRelativeTrack = (direction: 1 | -1) => {
    if (SONGS_DATA.length <= 1) return;
    const currentIndex = SONGS_DATA.findIndex((s) => s.id === selectedSong.id);
    if (isShuffle) {
      const candidates = SONGS_DATA.filter((s) => s.id !== selectedSong.id);
      const randomSong = candidates[Math.floor(Math.random() * candidates.length)];
      if (randomSong) selectTrack(randomSong);
      return;
    }
    const nextIndex = (currentIndex + direction + SONGS_DATA.length) % SONGS_DATA.length;
    selectTrack(SONGS_DATA[nextIndex]);
  };

  return (
    <section id="music" className="relative py-14 sm:py-24 bg-black text-white overflow-x-clip">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Giant Condensed Display + Unified Fanned Album Cover Gallery */}
        <Reveal className="text-center mb-10 sm:mb-16">
          <h2 className="font-display text-6xl sm:text-8xl md:text-[7.5rem] font-bold tracking-tight text-white uppercase leading-[0.82] select-none">
            Karya Musik
          </h2>

          {/* Fanned Stacked Album Covers across Mobile & Desktop */}
          <div className="relative -mt-3 sm:-mt-8 md:-mt-10 flex items-center justify-center py-4 overflow-visible">
            <div className="flex items-center justify-center -space-x-10 sm:-space-x-14 md:-space-x-16">
              {DECK_POSITIONS.map((card) => {
                const song = SONGS_DATA[card.songIndex];
                if (!song) return null;
                const isSelected = selectedSong.id === song.id;

                return (
                  <div
                    key={song.id}
                    className={`relative shrink-0 ${card.rotate} ${card.offset} ${
                      isSelected ? "z-40" : card.z
                    } hover:z-40 transition-[z-index] duration-150`}
                  >
                    <motion.button
                      type="button"
                      animate={{
                        scale: isSelected ? 1.05 : 1,
                        y: isSelected ? -5 : 0,
                      }}
                      whileHover={{ scale: 1.08, y: -9 }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ type: "spring", stiffness: 260, damping: 22 }}
                      onClick={() => selectTrack(song)}
                      aria-label={`Pilih lagu ${song.title}`}
                      title={`${song.title} (${song.year})`}
                      className={`relative block aspect-square ${card.size} rounded-2xl overflow-hidden bg-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer will-change-transform ${
                        isSelected ? "ring-2 ring-white" : ""
                      }`}
                    >
                      <Image
                        src={song.cover}
                        alt={song.title}
                        fill
                        sizes="(max-width: 640px) 112px, 260px"
                        className="object-cover"
                      />
                    </motion.button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4">
            <a
              href={BAND_INFO.spotifyArtistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-white/[0.10] hover:bg-white hover:text-black active:scale-95 text-white px-5 py-3 rounded-full transition-all min-h-[44px]"
            >
              <span>Jelajahi Diskografi Spotify</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </Reveal>

        {/* Responsive Player + Catalog (Mobile Compact Top Player + Tracklist / Desktop 2-Col Sticky Side Player) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">
          {/* Player Column (Sticky on desktop / Compact horizontal dock on mobile via AudioPlayer) */}
          <Reveal className="lg:col-span-5 lg:sticky lg:top-24 flex flex-col items-center w-full">
            <div className="w-full lg:max-w-[340px]">
              <AudioPlayer
                key={selectedSong.id}
                src={selectedSong.audioSrc}
                title={selectedSong.title}
                artist={BAND_INFO.name}
                cover={selectedSong.cover}
                spotifyUrl={selectedSong.spotifyUrl}
                autoPlayOnMount={shouldAutoPlay}
                onPrevTrack={() => handleSelectRelativeTrack(-1)}
                onNextTrack={() => handleSelectRelativeTrack(1)}
                isShuffle={isShuffle}
                onToggleShuffle={() => setIsShuffle((prev) => !prev)}
                onPlayStateChange={setIsAudioPlaying}
              />
            </div>
          </Reveal>

          {/* Right Column: Dense Editorial Track Index */}
          <Reveal delay={0.1} className="lg:col-span-7 flex flex-col rounded-2xl bg-[#111114] overflow-hidden">
            <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 bg-white/[0.04]">
              <span className="text-xs uppercase tracking-wider text-zinc-300 font-bold">
                Katalog Lagu Resmi
              </span>
              <span className="text-xs tabular-nums text-zinc-400">
                {SONGS_DATA.length} Rilisan
              </span>
            </div>

            <div className="flex flex-col p-2 gap-1">
              {SONGS_DATA.map((song, idx) => {
                const isSelected = selectedSong.id === song.id;
                const isMerah = song.title.toUpperCase().includes("MERAH");
                const trackNumber = String(idx + 1).padStart(2, "0");

                return (
                  <div
                    key={song.id}
                    className={`py-2 px-2.5 sm:py-2.5 sm:px-4 rounded-xl transition-colors flex items-center justify-between gap-2 sm:gap-4 select-none ${
                      isSelected
                        ? "bg-white/[0.10] text-white"
                        : "hover:bg-white/[0.05] text-zinc-300"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => selectTrack(song)}
                      aria-pressed={isSelected}
                      className="flex items-center gap-3 min-w-0 flex-1 text-left cursor-pointer min-h-[44px] py-1 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                    >
                      <span className={`tabular-nums text-xs w-5 sm:w-6 text-right flex-shrink-0 flex justify-end ${
                        isSelected ? "text-white font-bold" : "text-zinc-400"
                      }`}>
                        {isSelected ? (
                          <EqualizerBars
                            active={isAudioPlaying}
                            barClassName={isMerah ? "bg-[#FF2222]" : "bg-white"}
                          />
                        ) : (
                          trackNumber
                        )}
                      </span>

                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-zinc-900 flex-shrink-0 relative overflow-hidden">
                        <Image
                          src={song.cover}
                          alt={song.title}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>

                      <div className="min-w-0 pr-1">
                        <h3
                          className={`text-sm sm:text-base font-bold tracking-tight truncate ${
                            isMerah ? "text-[#FF2222]" : isSelected ? "text-white" : "text-zinc-200"
                          }`}
                        >
                          {song.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs tabular-nums text-zinc-400 mt-0.5">
                          <span>{song.year}</span>
                          <span aria-hidden="true">/</span>
                          <span className="uppercase">{song.type}</span>
                        </div>
                      </div>
                    </button>

                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => setActiveLyrics(song)}
                        className="min-h-[44px] text-xs uppercase font-medium tracking-wider text-zinc-200 hover:text-white bg-white/[0.06] hover:bg-white/[0.14] px-3 sm:px-3.5 rounded-full transition-colors cursor-pointer inline-flex items-center gap-1.5"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Lirik</span>
                      </button>

                      <a
                        href={song.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-w-[44px] min-h-[44px] rounded-full inline-flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
                        title={`Dengarkan ${song.title} di Spotify`}
                        aria-label={`Dengarkan ${song.title} di Spotify`}
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Responsive Dialog: Mobile Bottom Sheet / Desktop Centered Modal */}
      <AnimatePresence>
        {activeLyrics && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EDITORIAL_EASE }}
            onClick={() => setActiveLyrics(null)}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/85 backdrop-blur-md cursor-pointer"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="lyrics-modal-title"
              data-lenis-prevent
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 32, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 30, mass: 0.85 }}
              className="rounded-t-3xl sm:rounded-2xl bg-[#151518] px-5 pt-4 pb-7 sm:p-8 max-w-lg w-full max-h-[85svh] overflow-y-auto text-white shadow-[0_25px_70px_rgba(0,0,0,0.95)] relative cursor-default will-change-transform"
            >
              {/* Mobile Sheet Grab Indicator */}
              <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mb-4 sm:hidden" aria-hidden="true" />

              <div className="flex items-center justify-between pb-3 mb-5">
                <div>
                  <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                    Lirik Lagu
                  </span>
                  <h3 id="lyrics-modal-title" className="font-display text-3xl font-bold text-white tracking-tight uppercase mt-0.5">
                    {activeLyrics.title}
                  </h3>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setActiveLyrics(null)}
                  className="text-zinc-400 hover:text-white"
                  aria-label="Tutup Lirik"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <pre className="whitespace-pre-wrap font-sans text-sm sm:text-[15px] text-zinc-300 leading-relaxed tracking-wide font-light">
                {activeLyrics.lyrics || "Lirik resmi belum tersedia. Dengarkan lagunya lewat tautan di bawah."}
              </pre>

              <div className="mt-8 pt-2">
                <Button asChild className="w-full text-xs uppercase font-bold tracking-wider">
                  <a
                    href={activeLyrics.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Dengarkan Lagu Penuh di Spotify
                  </a>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
