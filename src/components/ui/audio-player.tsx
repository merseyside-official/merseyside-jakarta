"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatAudioTime } from "@/lib/format";
import { notifyAudioPlay, subscribeOtherAudioPlay } from "@/lib/audioBus";
import { SpotifyIcon } from "@/components/icons/StreamingIcons";
import { EqualizerBars } from "@/components/ui/motion";

const PLAYER_ID = "music-section-player";

const CustomSlider = ({
  value,
  onChange,
  className,
}: {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      onChange(Math.min(100, value + 5));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      onChange(Math.max(0, value - 5));
    }
  };

  return (
    <div
      role="slider"
      tabIndex={0}
      aria-label="Posisi pemutaran audio"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value)}
      onKeyDown={handleKeyDown}
      className={cn(
        "relative w-full py-2 cursor-pointer flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-full",
        className
      )}
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = (x / rect.width) * 100;
        onChange(Math.min(Math.max(percentage, 0), 100));
      }}
    >
      <div className="w-full h-1 rounded-full bg-white/15 overflow-hidden">
        <div
          className="h-full bg-white rounded-full transition-[width] duration-75"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};

export interface AudioPlayerProps {
  src: string;
  cover?: string;
  title?: string;
  artist?: string;
  spotifyUrl?: string;
  autoPlayOnMount?: boolean;
  onPrevTrack?: () => void;
  onNextTrack?: () => void;
  isShuffle?: boolean;
  onToggleShuffle?: () => void;
  onPlayStateChange?: (playing: boolean) => void;
}

const AudioPlayer = ({
  src,
  cover,
  title,
  artist = "Merseyside Jakarta",
  spotifyUrl,
  autoPlayOnMount = false,
  onPrevTrack,
  onNextTrack,
  isShuffle: controlledShuffle,
  onToggleShuffle,
  onPlayStateChange,
}: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [internalShuffle, setInternalShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  const isShuffle = controlledShuffle ?? internalShuffle;
  const isMerah = title?.toUpperCase().includes("MERAH");
  const onPlayStateChangeRef = useRef(onPlayStateChange);

  useEffect(() => {
    onPlayStateChangeRef.current = onPlayStateChange;
  }, [onPlayStateChange]);

  useEffect(() => {
    return subscribeOtherAudioPlay(PLAYER_ID, () => {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
      onPlayStateChangeRef.current?.(false);
    });
  }, []);

  useEffect(() => {
    if (!autoPlayOnMount || !src) return;
    const audio = audioRef.current;
    if (!audio) return;
    let cancelled = false;
    notifyAudioPlay(PLAYER_ID);
    audio
      .play()
      .then(() => {
        if (!cancelled) {
          setIsPlaying(true);
          onPlayStateChangeRef.current?.(true);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setIsPlaying(false);
          onPlayStateChangeRef.current?.(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [autoPlayOnMount, src]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      onPlayStateChange?.(false);
    } else {
      setHasError(false);
      notifyAudioPlay(PLAYER_ID);
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          onPlayStateChange?.(true);
        })
        .catch(() => {
          setIsPlaying(false);
          onPlayStateChange?.(false);
        });
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const current = audio.currentTime;
    const total = audio.duration;
    const hasDuration = isFinite(total) && total > 0;
    const currentProgress = hasDuration ? (current / total) * 100 : 0;
    setProgress(isFinite(currentProgress) ? currentProgress : 0);
    setCurrentTime(current);
    setDuration(hasDuration ? total : 0);
  };

  const handleSeek = (value: number) => {
    const audio = audioRef.current;
    if (audio && isFinite(audio.duration) && audio.duration > 0) {
      const time = (value / 100) * audio.duration;
      if (isFinite(time)) {
        audio.currentTime = time;
        setProgress(value);
      }
    }
  };

  const handlePrev = () => {
    const audio = audioRef.current;
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      setProgress(0);
      setCurrentTime(0);
      return;
    }
    if (onPrevTrack) {
      onPrevTrack();
    } else if (audio) {
      audio.currentTime = 0;
    }
  };

  const handleShuffle = () => {
    if (onToggleShuffle) {
      onToggleShuffle();
    } else {
      setInternalShuffle((prev) => !prev);
    }
  };

  const handleRepeat = () => {
    setIsRepeat((prev) => !prev);
  };

  if (!src) return null;

  return (
    <div className="relative flex flex-col mx-auto overflow-hidden rounded-2xl bg-[#121215] p-4 sm:p-5 w-full lg:max-w-[340px] h-auto text-white shadow-[0_15px_40px_rgba(0,0,0,0.9)]">
      <audio
        ref={audioRef}
        loop={isRepeat}
        onLoadedMetadata={handleTimeUpdate}
        onDurationChange={handleTimeUpdate}
        onTimeUpdate={handleTimeUpdate}
        onError={() => {
          setHasError(true);
          setIsPlaying(false);
          onPlayStateChange?.(false);
        }}
        onEnded={() => {
          setIsPlaying(false);
          onPlayStateChange?.(false);
          if (!isRepeat && onNextTrack) {
            onNextTrack();
          }
        }}
        src={src}
        preload="metadata"
        className="hidden"
      />

      <div className="flex flex-col relative">
        {/* Top Block: Compact Horizontal Dock on Mobile/Tablet vs Tall Square Album Artwork on Desktop */}
        <div className="flex items-center gap-3.5 lg:block">
          {cover && (
            <div className="bg-zinc-900 rounded-xl overflow-hidden w-20 h-20 lg:w-full lg:h-auto lg:aspect-square relative shrink-0">
              <Image
                src={cover}
                alt={title || "Album Cover"}
                fill
                sizes="(max-width: 1024px) 80px, 300px"
                className="object-cover"
              />
            </div>
          )}

          {/* Track Identity + Equalizer */}
          <div className="min-w-0 flex-1 lg:mt-4">
            <div className="flex items-center justify-between gap-2">
              {title && (
                <h3
                  className={cn(
                    "font-bold text-base truncate tracking-tight uppercase",
                    isMerah ? "text-[#FF2222]" : "text-white"
                  )}
                >
                  {title}
                </h3>
              )}
              <EqualizerBars
                active={isPlaying}
                barClassName={isMerah ? "bg-[#FF2222]" : "bg-white"}
              />
            </div>
            {artist && (
              <p className="text-xs text-zinc-400 tracking-wider uppercase truncate mt-0.5">
                {artist} · Preview
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col w-full gap-y-2.5 lg:gap-y-3 mt-3 lg:mt-3">
          {/* Slider */}
          <div className="flex flex-col gap-y-0.5">
            <CustomSlider
              value={progress}
              onChange={handleSeek}
              className="w-full"
            />
            <div className="flex items-center justify-between text-xs text-zinc-400 tabular-nums">
              <span>{formatAudioTime(currentTime)}</span>
              {hasError ? (
                <span className="text-[11px] text-red-400 font-medium">Preview gagal dimuat</span>
              ) : (
                <span>{duration ? formatAudioTime(duration) : "--:--"}</span>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between w-full pt-0.5">
            <button
              type="button"
              onClick={handleShuffle}
              aria-pressed={isShuffle}
              aria-label="Acak daftar putar"
              className={cn(
                "min-w-[44px] min-h-[44px] rounded-full inline-flex items-center justify-center text-zinc-400 hover:text-white active:scale-95 transition-all cursor-pointer relative",
                isShuffle && "text-white"
              )}
              title="Acak"
            >
              <Shuffle className="h-4 w-4" />
              {isShuffle && <span className="absolute bottom-2 w-1 h-1 rounded-full bg-white" />}
            </button>

            <button
              type="button"
              onClick={handlePrev}
              aria-label="Lagu sebelumnya"
              className="min-w-[44px] min-h-[44px] rounded-full inline-flex items-center justify-center text-zinc-300 hover:text-white active:scale-95 transition-all cursor-pointer"
              title="Sebelumnya"
            >
              <SkipBack className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={togglePlay}
              className="w-11 h-11 rounded-full bg-white text-black hover:bg-zinc-200 active:scale-95 flex items-center justify-center transition-all cursor-pointer shadow-md"
              aria-label={isPlaying ? "Pause preview" : "Putar preview lagu"}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4 fill-black text-black" />
              ) : (
                <Play className="h-4 w-4 fill-black text-black ml-0.5" />
              )}
            </button>

            <button
              type="button"
              onClick={() => onNextTrack?.()}
              disabled={!onNextTrack}
              aria-label="Lagu berikutnya"
              className="min-w-[44px] min-h-[44px] rounded-full inline-flex items-center justify-center text-zinc-300 hover:text-white disabled:opacity-40 active:scale-95 transition-all cursor-pointer"
              title="Berikutnya"
            >
              <SkipForward className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={handleRepeat}
              aria-pressed={isRepeat}
              aria-label="Ulangi preview lagu"
              className={cn(
                "min-w-[44px] min-h-[44px] rounded-full inline-flex items-center justify-center text-zinc-400 hover:text-white active:scale-95 transition-all cursor-pointer relative",
                isRepeat && "text-white"
              )}
              title="Ulangi"
            >
              <Repeat className="h-4 w-4" />
              {isRepeat && <span className="absolute bottom-2 w-1 h-1 rounded-full bg-white" />}
            </button>
          </div>

          {/* Spotify Deep Link Button */}
          {spotifyUrl && (
            <a
              href={spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] rounded-full flex items-center justify-center gap-2 py-2 px-4 bg-white/[0.10] text-zinc-100 hover:bg-white hover:text-black active:scale-[0.98] transition-all text-xs font-semibold uppercase tracking-wider mt-1 cursor-pointer"
            >
              <SpotifyIcon className="w-3.5 h-3.5" />
              <span>Dengarkan Penuh di Spotify</span>
              <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
