"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MERCH_DATA, MerchItem, generateWhatsAppOrderUrl } from "@/data/bandData";
import { formatRupiah } from "@/lib/format";
import { Reveal, EDITORIAL_EASE } from "@/components/ui/motion";

export default function MerchSection() {
  const [selectedProduct, setSelectedProduct] = useState<MerchItem | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("L");
  const [buyerName, setBuyerName] = useState<string>("");
  const [buyerCity, setBuyerCity] = useState<string>("");

  useEffect(() => {
    if (!selectedProduct) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProduct(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedProduct]);

  const handleOpenOrder = (product: MerchItem) => {
    setSelectedProduct(product);
    if (product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    } else {
      setSelectedSize("");
    }
  };

  const handleSendWhatsApp = () => {
    if (!selectedProduct) return;
    const url = generateWhatsAppOrderUrl(
      selectedProduct.name,
      selectedProduct.price,
      selectedSize,
      buyerName.trim(),
      buyerCity.trim()
    );
    window.open(url, "_blank", "noopener,noreferrer");
    setSelectedProduct(null);
  };

  return (
    <section id="merch" className="relative py-14 sm:py-24 bg-[#f5f4f0] text-zinc-950">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* High-Contrast Print Display Header */}
        <Reveal className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-black uppercase leading-[0.88]">
            Rilisan &amp; Merch
          </h2>

          <p className="text-xs sm:text-sm text-zinc-600 max-w-sm leading-relaxed">
            Piringan hitam, kaset pita, dan rilisan resmi band. Pemesanan langsung diarahkan ke WhatsApp official store.
          </p>
        </Reveal>

        {/* Balanced Gallery Grid: Featured 1+2 Showcase on Mobile / 3-Col Gallery Row on Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3.5 gap-y-7 sm:gap-x-7 sm:gap-y-10">
          {MERCH_DATA.map((item, idx) => (
            <Reveal
              key={item.id}
              delay={idx * 0.05}
              className={`group flex flex-col justify-between ${
                idx === 0 && MERCH_DATA.length % 2 === 1 ? "col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div>
                {/* Crisp Rounded Product Photograph */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-zinc-900">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes={
                      idx === 0 && MERCH_DATA.length % 2 === 1
                        ? "(max-width: 1024px) 92vw, 360px"
                        : "(max-width: 1024px) 46vw, 360px"
                    }
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/75 flex items-center justify-center">
                      <span className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white text-black text-[11px] sm:text-xs uppercase font-bold tracking-wider">
                        Sold Out
                      </span>
                    </div>
                  )}
                </div>

                {/* Editorial Details Without Bounding Cards */}
                <div className="mt-3 sm:mt-4">
                  <span className="block text-[11px] sm:text-xs font-semibold uppercase tracking-[0.12em] sm:tracking-[0.15em] text-zinc-500 truncate">
                    {item.category}
                  </span>
                  <h3 className="mt-0.5 sm:mt-1 text-sm sm:text-base font-bold text-black tracking-tight line-clamp-2 leading-snug">
                    {item.name}
                  </h3>
                  <p className="hidden sm:line-clamp-2 text-xs text-zinc-600 mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="mt-3 sm:mt-4 pt-1 sm:pt-2 flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm sm:text-base font-black tabular-nums text-black tracking-tight">
                  {formatRupiah(item.price)}
                </span>

                {item.inStock ? (
                  <Button
                    variant="dark"
                    size="sm"
                    onClick={() => handleOpenOrder(item)}
                    className="h-9 sm:h-11 px-3 sm:px-4 text-[11px] sm:text-xs uppercase font-bold tracking-wider gap-1 active:scale-95 transition-transform"
                  >
                    <span>Pesan</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Button>
                ) : (
                  <span className="text-xs font-semibold text-zinc-500 uppercase">
                    Habis
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Responsive Dialog: Mobile Bottom Sheet / Desktop Centered Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div
            onClick={() => setSelectedProduct(null)}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/80 backdrop-blur-md cursor-pointer"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="merch-modal-title"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 48 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 48 }}
              transition={{ duration: 0.28, ease: EDITORIAL_EASE }}
              className="rounded-t-3xl sm:rounded-2xl bg-[#141417] px-5 pt-4 pb-7 sm:p-8 max-w-md w-full text-white shadow-[0_25px_70px_rgba(0,0,0,0.95)] relative cursor-default"
            >
              {/* Mobile Bottom-Sheet Grab Handle */}
              <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mb-4 sm:hidden" aria-hidden="true" />

              <div className="flex items-center justify-between pb-3 mb-4">
                <div className="min-w-0 pr-2">
                  <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                    Form Pemesanan WhatsApp
                  </span>
                  <h3 id="merch-modal-title" className="text-lg font-bold text-white tracking-tight truncate max-w-[280px] mt-0.5">
                    {selectedProduct.name}
                  </h3>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedProduct(null)}
                  aria-label="Tutup form pemesanan"
                  className="text-zinc-400 hover:text-white shrink-0"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="mb-4">
                <span className="text-xs text-zinc-400">Harga:</span>
                <span className="ml-2 font-bold tabular-nums text-lg text-white">
                  {formatRupiah(selectedProduct.price)}
                </span>
              </div>

              {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                <div className="mb-4">
                  <span className="block text-xs font-medium uppercase tracking-wider text-zinc-400 mb-2">
                    Pilih Ukuran (Size):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        aria-pressed={selectedSize === s}
                        className={`min-w-[44px] min-h-[44px] px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                          selectedSize === s
                            ? "bg-white text-black"
                            : "bg-white/[0.08] text-zinc-200 hover:bg-white/[0.16]"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-3 mb-6">
                <div>
                  <label htmlFor="buyer-name-input" className="block text-xs font-medium uppercase tracking-wider text-zinc-400 mb-1.5">
                    Nama Pemesan:
                  </label>
                  <input
                    id="buyer-name-input"
                    type="text"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="Contoh: Ilham"
                    className="w-full min-h-[44px] rounded-xl bg-white/[0.07] px-3.5 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/30 font-sans"
                  />
                </div>
                <div>
                  <label htmlFor="buyer-city-input" className="block text-xs font-medium uppercase tracking-wider text-zinc-400 mb-1.5">
                    Kota / Kecamatan Pengiriman:
                  </label>
                  <input
                    id="buyer-city-input"
                    type="text"
                    value={buyerCity}
                    onChange={(e) => setBuyerCity(e.target.value)}
                    placeholder="Contoh: Jakarta Selatan"
                    className="w-full min-h-[44px] rounded-xl bg-white/[0.07] px-3.5 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/30 font-sans"
                  />
                </div>
              </div>

              <Button
                onClick={handleSendWhatsApp}
                className="w-full text-xs uppercase font-bold tracking-wider gap-2"
              >
                <MessageSquare className="w-4 h-4 fill-black" />
                Lanjutkan ke WhatsApp Admin
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
