import React from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { BAND_INFO, MUSIC_VIDEO } from "@/data/bandData";
import { parseVideoEmbed } from "@/lib/videoEmbed";
import { Reveal } from "@/components/ui/motion";

export default function MusicVideoSection() {
  const embed = parseVideoEmbed(MUSIC_VIDEO.videoUrl);
  const isYouTube = embed?.provider === "youtube";
  const ctaHref = isYouTube ? embed.externalUrl : BAND_INFO.youtubeUrl;
  const ctaLabel = isYouTube ? "Tonton di YouTube" : "Channel YouTube Resmi";

  return (
    <section
      id="music-video"
      className="relative py-14 sm:py-24 bg-black text-white"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Editorial Poster Display Header */}
        <Reveal className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white uppercase leading-[0.88]">
            Video Klip{" "}
            <span className="text-[#FF2222]">{MUSIC_VIDEO.highlightTitle}</span>
          </h2>

          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto text-xs font-bold uppercase tracking-wider text-white bg-white/[0.10] hover:bg-white hover:text-black active:scale-[0.98] px-5 py-3 rounded-full transition-all inline-flex items-center justify-center gap-2 shrink-0 min-h-[44px]"
          >
            <span>{ctaLabel}</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </Reveal>

        {/* 16:9 Rounded Cinema Frame */}
        <Reveal delay={0.08}>
          <div className="rounded-2xl overflow-hidden bg-[#111114] shadow-[0_25px_70px_rgba(0,0,0,0.9)]">
            <div className="relative aspect-video w-full bg-black">
              {embed ? (
                <iframe
                  src={embed.embedUrl}
                  title={`${BAND_INFO.name} — ${MUSIC_VIDEO.title} Official Music Video`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="absolute inset-0 w-full h-full border-0"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#111114]">
                  <Play className="w-10 h-10 text-zinc-400 mb-3" />
                  <p className="text-sm text-zinc-300 font-medium">
                    Video klip belum tersedia atau tautan belum valid.
                  </p>
                </div>
              )}
            </div>

            {/* Caption Strip */}
            <div className="px-5 py-4 sm:px-6 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm sm:text-base font-bold text-white tracking-tight truncate">
                  {BAND_INFO.name} — {MUSIC_VIDEO.title}
                </p>
                <p className="text-xs sm:text-sm text-zinc-400 mt-0.5 leading-relaxed">
                  {MUSIC_VIDEO.description}
                </p>
              </div>

              {embed?.provider === "gdrive" && (
                <a
                  href={embed.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold uppercase tracking-wider text-zinc-200 hover:text-white underline underline-offset-4 inline-flex items-center gap-1 shrink-0 min-h-[44px]"
                >
                  <span>Buka Preview Penuh</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
