"use client";

import React from "react";
import { Mail, Phone } from "lucide-react";
import { MEMBERS, BAND_INFO } from "@/data/bandData";
import { Reveal } from "@/components/ui/motion";

const TIMELINE = [
  {
    year: "2007",
    tag: "Awal Terbentuk",
    title: "Akar & Titik Pertemuan",
    desc: "Para personel pertama kali bertemu di Jakarta dan membentuk Merseyside, band 2 Tone ska dengan kecintaan pada Persija dan Liverpool FC yang melekat sejak awal.",
  },
  {
    year: "2010",
    tag: "Panggung Pertama",
    title: "Debut Panggung Pertama",
    desc: "Merseyside naik panggung untuk pertama kalinya, membawakan energi ska berkarakter tribun yang langsung menyatu dengan komunitas pendukung.",
  },
  {
    year: "2016 - 2025",
    tag: "Chant Tribun",
    title: "Chant & Anthem Tribun",
    desc: "Merseyside melahirkan lagu dan chant legendaris seperti 'Field of GBK' dan 'Persijaku', yang tetap menggema di tribun The Jakmania dan terinspirasi kultur suporter sejati.",
  },
  {
    year: "2026",
    tag: "Era Baru",
    title: "Single MERAH & Formasi 8 Personel",
    desc: "Bersama Bara/Api Recs, Merseyside merilis 'MERAH' pada 22 November 2026: sebuah karya tentang perjalanan, pengorbanan, dan janji setia para pendukung.",
    isLatest: true,
  },
];

const SECTIONS_SUMMARY = [
  { label: "Vokal", count: "1 Personel" },
  { label: "Gitar & Bass", count: "3 Personel" },
  { label: "Ritme & Keyboard", count: "2 Personel" },
  { label: "Brass Section", count: "2 Personel" },
];

export default function StorySection() {
  return (
    <section id="story" className="relative py-14 sm:py-24 bg-[#0a0a0c] text-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Section 1: Mobile Vertical Rail Timeline / Desktop Ledger Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 mb-16 sm:mb-24">
          <Reveal className="lg:col-span-4">
            <h2 className="font-display text-5xl sm:text-7xl font-bold tracking-tight text-white uppercase leading-[0.88]">
              Kisah &amp; Perjalanan
            </h2>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Dari pertemuan di Jakarta tahun 2007 hingga debut panggung 2010, Merseyside terus bergerak maju tanpa melupakan akarnya.
            </p>
          </Reveal>

          <div className="lg:col-span-8 relative border-l border-white/15 pl-5 sm:border-l-0 sm:pl-0 flex flex-col gap-6 sm:gap-0 sm:divide-y sm:divide-white/[0.08]">
            {TIMELINE.map((item, idx) => (
              <Reveal key={item.year} delay={idx * 0.05}>
                <div className="relative sm:py-5 sm:first:pt-0 sm:last:pb-0 grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-6 items-baseline">
                  {/* Mobile timeline rail dot */}
                  <span
                    aria-hidden="true"
                    className={`sm:hidden absolute -left-[25.5px] top-1.5 w-2.5 h-2.5 rounded-full ${
                      item.isLatest ? "bg-[#FF2222]" : "bg-white"
                    }`}
                  />

                  <div className="sm:col-span-4">
                    <span className={`block text-base sm:text-lg font-black tabular-nums tracking-tight ${item.isLatest ? "text-[#FF2222]" : "text-white"}`}>
                      {item.year}
                    </span>
                    <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                      {item.tag}
                    </span>
                  </div>
                  <div className="sm:col-span-8">
                    <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Section 2: Mobile Swipe Roster Cards / Desktop 8-Column Grid */}
        <div>
          <Reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-10">
            <div>
              <h3 className="font-display text-5xl sm:text-7xl font-bold tracking-tight text-white uppercase leading-[0.88]">
                Formasi Merseyside
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-zinc-400 max-w-xl leading-relaxed">
                Delapan personel penjaga denyut 2 Tone ska Jakarta, lengkap dengan seksi tiup trompet &amp; trombon, organ off-beat, dan ritme panggung.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-5 gap-y-2 text-xs tabular-nums text-zinc-300">
              {SECTIONS_SUMMARY.map((sec) => (
                <span key={sec.label}>
                  <strong className="text-white">{sec.label}</strong>{" "}
                  <span className="text-zinc-400">({sec.count})</span>
                </span>
              ))}
            </div>
          </Reveal>

          {/* Differentiated Layout: Horizontal Swipe Strip on Mobile / 2x4 Grid on Tablet & Desktop */}
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 -mx-5 px-5 pb-3 no-scrollbar sm:mx-0 sm:px-0 sm:pb-0 sm:overflow-visible sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-2.5">
            {MEMBERS.map((member, idx) => (
              <Reveal key={member.name} delay={idx * 0.03} className="w-[72vw] max-w-[260px] sm:w-auto sm:max-w-none snap-center shrink-0 flex">
                <div
                  className={`w-full p-5 sm:p-6 rounded-2xl flex flex-col justify-between transition-colors ${
                    member.isBrass
                      ? "bg-[#1a1a20] hover:bg-[#222229]"
                      : "bg-[#121215] hover:bg-[#18181c]"
                  }`}
                >
                  <div>
                    <span className="block text-xs font-medium uppercase tracking-wider text-zinc-400 mb-3">
                      {member.isBrass ? "Brass Section" : member.section}
                    </span>
                    <h4 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white leading-none">
                      {member.name}
                    </h4>
                    <span className="mt-1.5 block text-xs uppercase tracking-wider text-zinc-300 font-semibold">
                      {member.role}
                    </span>
                  </div>

                  <p className="mt-6 text-xs text-zinc-400 leading-snug">
                    {member.instrumentNote}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="sm:hidden text-[11px] uppercase tracking-[0.2em] text-zinc-500 mt-1 text-center">
            Geser Formasi 8 Personel ↔
          </p>
        </div>

        {/* High-Contrast Paper Management Bar */}
        <Reveal delay={0.08}>
          <div className="mt-10 sm:mt-12 p-5 sm:p-8 rounded-2xl bg-[#f5f4f0] text-black flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6">
            <div className="max-w-xl">
              <span className="block text-xs font-bold uppercase tracking-[0.18em] text-zinc-500 mb-1.5">
                Kontak Manajemen
              </span>
              <h3 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight leading-none text-black">
                Hubungi Manajemen Merseyside Jakarta
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 mt-2 leading-relaxed">
                Untuk undangan panggung, festival musik, kerja sama rilisan rekaman, wawancara media, atau sponsorship resmi.
              </p>
            </div>

            <div className="flex flex-row items-center gap-3 w-full sm:w-auto">
              <a
                href={`mailto:${BAND_INFO.bookingEmail}`}
                className="flex-1 sm:flex-none min-h-[44px] px-5 rounded-full bg-black/[0.08] hover:bg-black hover:text-white active:scale-[0.98] text-black text-xs uppercase font-bold tracking-wider inline-flex items-center justify-center gap-2 transition-all"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </a>
              <a
                href={`https://wa.me/${BAND_INFO.managerWhatsApp}?text=Halo%20Manajemen%20Merseyside%20Jakarta`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none min-h-[44px] px-5 rounded-full bg-black hover:bg-zinc-800 active:scale-[0.98] text-white text-xs uppercase font-bold tracking-wider inline-flex items-center justify-center gap-2 transition-all"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
