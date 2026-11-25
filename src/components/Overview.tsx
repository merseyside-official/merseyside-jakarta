import React from "react";
import MerseysideLogo from "@/components/MerseysideLogo";
import { BAND_INFO, MEMBERS, SONGS_DATA } from "@/data/bandData";
import { Reveal } from "@/components/ui/motion";

const FACT_HIGHLIGHTS = [
  {
    value: String(BAND_INFO.established),
    label: "Terbentuk di Jakarta",
    desc: "Berawal dari kecintaan yang sama pada 2 Tone ska, Persija, dan Liverpool FC.",
  },
  {
    value: String(MEMBERS.length),
    label: "Formasi Aktif 2026",
    desc: "Vokal, seksi gitar & bass, ritme organ off-beat, hingga seksi tiup trompet dan trombon.",
  },
  {
    value: SONGS_DATA[0]?.title || "MERAH",
    label: "Single Terbaru",
    desc: "Rekaman terbaru bersama Bara/Api Recs tentang perjalanan, pengorbanan, dan janji setia.",
    accent: true,
  },
];

export default function Overview() {
  return (
    <section id="overview" className="relative py-14 sm:py-24 bg-black text-white overflow-hidden">
      {/* Subtle Faint Watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03]"
        aria-hidden="true"
      >
        <MerseysideLogo
          alt=""
          sizes="1024px"
          className="w-[120%] max-w-5xl h-auto text-white -rotate-6"
        />
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-start">
        {/* Left: Tight Editorial Manifesto */}
        <Reveal className="lg:col-span-6">
          <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight leading-[0.92] uppercase text-white">
            Ska dari Jakarta untuk mereka yang setia
          </h2>

          <p className="mt-4 sm:mt-5 text-sm sm:text-base text-zinc-300 leading-relaxed max-w-xl">
            {BAND_INFO.bioShort}
          </p>
        </Reveal>

        {/* Right: Dense High-Contrast Ledger (Mobile Compact Rail / Desktop Wide Ledger) */}
        <Reveal delay={0.1} className="lg:col-span-6 flex flex-col divide-y divide-white/[0.10]">
          {FACT_HIGHLIGHTS.map((item) => (
            <div key={item.label} className="py-4 sm:py-5 first:pt-0 last:pb-0 flex items-baseline gap-4 sm:gap-8">
              <span
                className={`text-2xl sm:text-4xl font-black tabular-nums tracking-tight shrink-0 w-20 sm:w-32 ${
                  item.accent ? "text-[#FF2222]" : "text-white"
                }`}
              >
                {item.value}
              </span>
              <div className="min-w-0">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  {item.label}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
