"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Calendar, MapPin, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GIGS_DATA, BAND_INFO } from "@/data/bandData";
import { Reveal } from "@/components/ui/motion";

export default function GigsSection() {
  const [showArchive, setShowArchive] = useState(false);

  const upcomingGigs = GIGS_DATA.filter((g) => !g.isPast);
  const pastGigs = GIGS_DATA.filter((g) => g.isPast);

  const displayedGigs = showArchive ? pastGigs : upcomingGigs;

  return (
    <section id="gigs" className="relative py-14 sm:py-24 bg-[#0a0a0c] text-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Display Header */}
        <Reveal className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <h2 className="font-display text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white uppercase leading-[0.88]">
              Jadwal Panggung
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-zinc-400 max-w-md leading-relaxed">
              Agenda pertunjukan resmi, showcase rilis single MERAH, dan informasi undangan panggung.
            </p>
          </div>

          {pastGigs.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowArchive(!showArchive)}
              className="text-xs uppercase tracking-wider font-bold"
            >
              {showArchive ? "Tampilkan Mendatang Saja" : "Lihat Arsip Gigs"}
            </Button>
          )}
        </Reveal>

        {/* Empty state: Physical 2-Tone Concert Ticket (Mobile Vertical Boarding Pass / Desktop Horizontal Stub) */}
        {displayedGigs.length === 0 && (
          <Reveal delay={0.08}>
            <div className="grid grid-cols-1 md:grid-cols-12 rounded-2xl bg-black overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.85)]">
              {/* Stage Monochrome Visual */}
              <div className="md:col-span-5 relative aspect-[16/9] md:aspect-auto md:min-h-[280px] bg-zinc-900 overflow-hidden">
                <Image
                  src="/videos/hero-poster.webp"
                  alt="Merseyside Jakarta Live Stage"
                  fill
                  sizes="(max-width: 768px) 100vw, 42vw"
                  className="object-cover grayscale contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs uppercase tracking-widest text-zinc-200 font-bold">
                  <span>Showcase 2026</span>
                  <span className="tabular-nums text-[#FF2222]">Era MERAH</span>
                </div>
              </div>

              {/* Ticket Main Body */}
              <div className="md:col-span-6 p-5 sm:p-8 flex flex-col justify-between bg-[#111114]">
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                    Buletin Tur Resmi
                  </span>
                  <h3 className="mt-2 font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight leading-none text-white">
                    Jadwal Panggung Dalam Persiapan
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-md">
                    Merseyside tengah menyiapkan agenda panggung langsung menyambut rilis single &ldquo;MERAH&rdquo;. Terbuka untuk undangan gigs, festival, dan acara komunitas.
                  </p>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4">
                  <a
                    href={`https://wa.me/${BAND_INFO.managerWhatsApp}?text=Halo%20Manajemen%20Merseyside%20Jakarta,%20kami%20ingin%20mengundang%20manggung`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-full bg-white text-black hover:bg-zinc-200 active:scale-[0.98] transition-all text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-3"
                  >
                    <span>Hubungi Booking Agent</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <span className="text-xs text-zinc-400 uppercase tracking-wider font-medium text-center sm:text-right">
                    In Rehearsal · Jakarta
                  </span>
                </div>
              </div>

              {/* Mobile Horizontal Perforated Boarding-Pass Stub */}
              <div className="relative flex md:hidden items-center justify-between bg-[#17171b] border-t-2 border-dashed border-black px-5 py-3.5 select-none">
                <div className="absolute -left-2.5 -top-2.5 w-5 h-5 rounded-full bg-[#0a0a0c]" aria-hidden="true" />
                <div className="absolute -right-2.5 -top-2.5 w-5 h-5 rounded-full bg-[#0a0a0c]" aria-hidden="true" />
                <div>
                  <span className="block text-[11px] uppercase tracking-[0.18em] text-zinc-400 font-semibold">
                    Pass Panggung • JKT
                  </span>
                  <span className="block text-xs font-bold text-white uppercase tracking-wider tabular-nums mt-0.5">
                    07 • MERSEYSIDE • 26
                  </span>
                </div>
                <svg
                  className="w-28 h-6 text-zinc-400 fill-current opacity-70"
                  viewBox="0 0 112 24"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="3" height="20" />
                  <rect x="8" y="2" width="1" height="20" />
                  <rect x="12" y="2" width="4" height="20" />
                  <rect x="19" y="2" width="2" height="20" />
                  <rect x="24" y="2" width="5" height="20" />
                  <rect x="32" y="2" width="1" height="20" />
                  <rect x="36" y="2" width="4" height="20" />
                  <rect x="43" y="2" width="2" height="20" />
                  <rect x="48" y="2" width="6" height="20" />
                  <rect x="57" y="2" width="2" height="20" />
                  <rect x="62" y="2" width="3" height="20" />
                  <rect x="68" y="2" width="5" height="20" />
                  <rect x="76" y="2" width="1" height="20" />
                  <rect x="80" y="2" width="4" height="20" />
                  <rect x="87" y="2" width="2" height="20" />
                  <rect x="92" y="2" width="6" height="20" />
                  <rect x="101" y="2" width="2" height="20" />
                  <rect x="106" y="2" width="4" height="20" />
                </svg>
              </div>

              {/* Desktop Vertical Ticket Stub Tear + Barcode */}
              <div className="hidden md:flex md:col-span-1 bg-[#17171b] border-l-2 border-dashed border-black flex-col items-center justify-center p-3 select-none">
                <svg
                  className="w-7 h-36 text-zinc-400 fill-current opacity-70"
                  viewBox="0 0 28 140"
                  aria-hidden="true"
                >
                  <rect x="2" y="4" width="24" height="3" />
                  <rect x="2" y="10" width="24" height="1" />
                  <rect x="2" y="15" width="24" height="5" />
                  <rect x="2" y="24" width="24" height="2" />
                  <rect x="2" y="29" width="24" height="4" />
                  <rect x="2" y="37" width="24" height="1" />
                  <rect x="2" y="42" width="24" height="6" />
                  <rect x="2" y="52" width="24" height="2" />
                  <rect x="2" y="58" width="24" height="3" />
                  <rect x="2" y="65" width="24" height="5" />
                  <rect x="2" y="74" width="24" height="2" />
                  <rect x="2" y="80" width="24" height="4" />
                  <rect x="2" y="88" width="24" height="1" />
                  <rect x="2" y="93" width="24" height="6" />
                  <rect x="2" y="103" width="24" height="2" />
                  <rect x="2" y="109" width="24" height="4" />
                  <rect x="2" y="117" width="24" height="2" />
                  <rect x="2" y="123" width="24" height="5" />
                  <rect x="2" y="132" width="24" height="3" />
                </svg>
              </div>
            </div>
          </Reveal>
        )}

        {/* Active Gigs Rows */}
        <div className="flex flex-col gap-2.5 empty:hidden">
          {displayedGigs.map((gig, idx) => (
            <Reveal key={gig.id} delay={idx * 0.05}>
              <div className="py-5 sm:py-6 px-5 sm:px-6 rounded-2xl bg-[#111114] hover:bg-[#17171b] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group transition-colors">
                <div className="w-full md:w-56 flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-zinc-400 shrink-0" />
                  <div>
                    <span className="block text-base sm:text-lg font-black tabular-nums text-white tracking-tight">
                      {gig.date}
                    </span>
                    <span className="text-xs tabular-nums text-zinc-400">{gig.time}</span>
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-zinc-200 transition-colors uppercase tracking-wide">
                    {gig.event}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-zinc-400">
                    <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    <span>
                      {gig.venue} — <strong className="text-zinc-300">{gig.city}</strong>
                    </span>
                  </div>
                </div>

                <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-3 mt-1 md:mt-0">
                  {gig.status === "Tersedia" && gig.ticketUrl ? (
                    <Button
                      asChild
                      size="sm"
                      className="w-full md:w-auto px-5 text-xs font-bold uppercase tracking-wider"
                    >
                      <a
                        href={gig.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Ticket className="w-3.5 h-3.5 mr-1.5" />
                        Beli Tiket
                      </a>
                    </Button>
                  ) : gig.status === "Sold Out" ? (
                    <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-zinc-900 text-zinc-400">
                      Sold Out
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-white">
                      {gig.status}
                    </span>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
