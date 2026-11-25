"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Package,
  Calendar,
  Music,
  Settings,
  Plus,
  Check,
  ArrowLeft,
  ToggleLeft,
  ToggleRight,
  Save,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  MERCH_DATA as initialMerch,
  GIGS_DATA as initialGigs,
  SONGS_DATA as initialSongs,
  BAND_INFO as initialInfo,
  MUSIC_VIDEO as initialVideo,
  MerchItem,
  Gig,
  Song,
} from "@/data/bandData";
import { formatRupiah } from "@/lib/format";
import { parseVideoEmbed } from "@/lib/videoEmbed";
import {
  AdminField,
  AdminPanel,
  adminInputClass,
  adminSelectClass,
  adminTextareaClass,
} from "@/components/admin/AdminPrimitives";

let localSeq = 0;

function createLocalId(prefix: string): string {
  localSeq += 1;
  return `${prefix}-${localSeq}`;
}

function isSafeHttpUrl(url: string): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

function isConfiguredImageHost(src: string): boolean {
  return src.startsWith("/") || src.includes("images.unsplash.com");
}

type AdminTab = "merch" | "gigs" | "music" | "settings";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("merch");
  const [merchFilter, setMerchFilter] = useState<"all" | "ready" | "soldout">("all");

  const [merchList, setMerchList] = useState<MerchItem[]>(initialMerch);
  const [gigsList, setGigsList] = useState<Gig[]>(initialGigs);
  const [songsList, setSongsList] = useState<Song[]>(initialSongs);
  const [bandSettings, setBandSettings] = useState(initialInfo);
  const [musicVideoUrl, setMusicVideoUrl] = useState(initialVideo.videoUrl);
  const [notification, setNotification] = useState<string | null>(null);
  const notifyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [newMerch, setNewMerch] = useState({
    name: "",
    category: "Apparel" as MerchItem["category"],
    price: 150000,
    image: "",
    description: "",
    sizes: "S, M, L, XL",
    inStock: true,
  });

  const [newGig, setNewGig] = useState({
    date: "",
    time: "20:00 WIB",
    event: "",
    venue: "",
    city: "Jakarta",
    status: "Tersedia" as Gig["status"],
    ticketUrl: "",
  });

  const [newSong, setNewSong] = useState({
    title: "",
    year: "2026",
    type: "Single" as Song["type"],
    cover: "",
    audioSrc: "/audio/merah-preview.mp3",
    spotifyUrl: "",
    lyrics: "",
  });

  useEffect(() => {
    return () => {
      if (notifyTimerRef.current) clearTimeout(notifyTimerRef.current);
    };
  }, []);

  const showNotification = (msg: string) => {
    if (notifyTimerRef.current) clearTimeout(notifyTimerRef.current);
    setNotification(msg);
    notifyTimerRef.current = setTimeout(() => setNotification(null), 3000);
  };

  const toggleStock = (id: string) => {
    setMerchList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, inStock: !item.inStock } : item))
    );
    showNotification("Status stok diperbarui (mode preview).");
  };

  const removeMerch = (id: string) => {
    setMerchList((prev) => prev.filter((item) => item.id !== id));
    showNotification("Item merch dihapus dari preview lokal.");
  };

  const handleAddMerch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = newMerch.name.trim();
    if (!trimmedName) return;

    const parsedSizes = newMerch.sizes
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const item: MerchItem = {
      id: createLocalId("merch"),
      name: trimmedName,
      category: newMerch.category,
      price: Math.max(0, Number(newMerch.price) || 0),
      image: isSafeHttpUrl(newMerch.image) ? newMerch.image : "/merch/tshirt-merah.jpg",
      description: newMerch.description.trim(),
      sizes: parsedSizes.length > 0 ? parsedSizes : undefined,
      inStock: newMerch.inStock,
    };
    setMerchList((prev) => [item, ...prev]);
    setNewMerch({
      name: "",
      category: "Apparel",
      price: 150000,
      image: "",
      description: "",
      sizes: "S, M, L, XL",
      inStock: true,
    });
    showNotification("Produk ditambahkan ke daftar preview.");
  };

  const toggleGigStatus = (id: string) => {
    setGigsList((prev) =>
      prev.map((g) => {
        if (g.id !== id) return g;
        const nextStatus: Gig["status"] =
          g.status === "Tersedia" ? "Sold Out" : g.status === "Sold Out" ? "Free Entry" : "Tersedia";
        return { ...g, status: nextStatus };
      })
    );
    showNotification("Status tiket gig diperbarui (mode preview).");
  };

  const removeGig = (id: string) => {
    setGigsList((prev) => prev.filter((g) => g.id !== id));
    showNotification("Jadwal gig dihapus dari preview lokal.");
  };

  const handleAddGig = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEvent = newGig.event.trim();
    if (!trimmedEvent) return;
    const gig: Gig = {
      id: createLocalId("gig"),
      date: newGig.date.trim() || "TBA",
      time: newGig.time.trim(),
      event: trimmedEvent,
      venue: newGig.venue.trim(),
      city: newGig.city.trim(),
      status: newGig.status,
      ticketUrl: isSafeHttpUrl(newGig.ticketUrl) ? newGig.ticketUrl : undefined,
      isPast: false,
    };
    setGigsList((prev) => [gig, ...prev]);
    setNewGig({
      date: "",
      time: "20:00 WIB",
      event: "",
      venue: "",
      city: "Jakarta",
      status: "Tersedia",
      ticketUrl: "",
    });
    showNotification("Jadwal manggung ditambahkan ke daftar preview.");
  };

  const handleAddSong = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = newSong.title.trim();
    if (!trimmedTitle) return;
    const song: Song = {
      id: createLocalId("song"),
      title: trimmedTitle,
      year: newSong.year.trim(),
      type: newSong.type,
      cover: isSafeHttpUrl(newSong.cover) ? newSong.cover : "/merah1.png",
      audioSrc: isSafeHttpUrl(newSong.audioSrc) ? newSong.audioSrc : "/audio/merah-preview.mp3",
      spotifyUrl: isSafeHttpUrl(newSong.spotifyUrl)
        ? newSong.spotifyUrl
        : `https://open.spotify.com/search/${encodeURIComponent(trimmedTitle)}`,
      lyrics: newSong.lyrics.trim(),
    };
    setSongsList((prev) => [song, ...prev]);
    setNewSong({
      title: "",
      year: "2026",
      type: "Single",
      cover: "",
      audioSrc: "/audio/merah-preview.mp3",
      spotifyUrl: "",
      lyrics: "",
    });
    showNotification("Lagu ditambahkan ke daftar preview.");
  };

  const removeSong = (id: string) => {
    setSongsList((prev) => prev.filter((s) => s.id !== id));
    showNotification("Lagu dihapus dari preview lokal.");
  };

  const filteredMerch = merchList.filter((item) => {
    if (merchFilter === "ready") return item.inStock;
    if (merchFilter === "soldout") return !item.inStock;
    return true;
  });

  const parsedVideoPreview = parseVideoEmbed(musicVideoUrl);

  const tabs: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
    { id: "merch", label: `Stok & Merch (${merchList.length})`, icon: <Package className="w-4 h-4" /> },
    { id: "gigs", label: `Jadwal Gigs (${gigsList.length})`, icon: <Calendar className="w-4 h-4" /> },
    { id: "music", label: `Karya Musik (${songsList.length})`, icon: <Music className="w-4 h-4" /> },
    { id: "settings", label: "Kontak & Video Klip", icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-black text-white py-8 px-5 sm:px-6 lg:px-8 font-sans">
      {/* Sticky Toast Feedback */}
      {notification && (
        <div
          role="status"
          className="fixed bottom-5 right-5 z-50 rounded-full bg-[#f5f4f0] text-black font-bold text-xs uppercase px-5 py-3 flex items-center gap-2 shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
        >
          <Check className="w-4 h-4 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between pb-6 gap-4">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-zinc-400 hover:text-white mb-2 min-h-[44px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Kembali ke Website Utama
          </Link>
          <div className="flex items-center gap-3.5">
            <Image
              src="/app-icon.svg"
              alt="Ikon Aplikasi Merseyside Jakarta"
              width={56}
              height={56}
              className="w-12 h-12 sm:w-14 sm:h-14 shrink-0"
            />
            <h1 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight leading-none">
              Admin Panel — Merseyside Jakarta
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            Mode Preview Lokal — perubahan bersifat sementara untuk simulasi UI sebelum dihubungkan ke database.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 rounded-2xl bg-[#121215] p-3 text-center tabular-nums shrink-0">
          <div className="px-3">
            <span className="block text-lg font-black text-white">{merchList.length}</span>
            <span className="text-xs text-zinc-400 uppercase">Merch</span>
          </div>
          <div className="px-3">
            <span className="block text-lg font-black text-white">{gigsList.length}</span>
            <span className="text-xs text-zinc-400 uppercase">Gigs</span>
          </div>
          <div className="px-3">
            <span className="block text-lg font-black text-white">{songsList.length}</span>
            <span className="text-xs text-zinc-400 uppercase">Lagu</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-6xl mx-auto flex items-center gap-2 mt-2 overflow-x-auto pb-3 no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`min-h-[44px] rounded-full flex items-center gap-2 px-4 py-2 text-xs tabular-nums uppercase tracking-wider font-bold transition-all active:scale-95 cursor-pointer whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-white text-black"
                : "bg-[#121215] text-zinc-300 hover:bg-[#1a1a1f] hover:text-white"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: MERCH & STOCK */}
      {activeTab === "merch" && (
        <div className="max-w-6xl mx-auto mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-bold uppercase tracking-wide">
                Daftar Barang &amp; Kontrol Stok
              </h2>
              <div className="flex items-center gap-1.5">
                {(
                  [
                    { id: "all", label: "Semua" },
                    { id: "ready", label: "Ready" },
                    { id: "soldout", label: "Sold Out" },
                  ] as const
                ).map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setMerchFilter(f.id)}
                    className={`min-h-[36px] px-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      merchFilter === f.id
                        ? "bg-white text-black"
                        : "bg-[#121215] text-zinc-400 hover:text-white"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2.5">
              {filteredMerch.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-[#121215] flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 sm:gap-4"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-zinc-900 shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="48px"
                        unoptimized={!isConfiguredImageHost(item.image)}
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-white tracking-tight truncate">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-zinc-400 tabular-nums mt-0.5">
                        <span>{formatRupiah(item.price)}</span>
                        <span aria-hidden="true">•</span>
                        <span className="uppercase">{item.category}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => toggleStock(item.id)}
                      className={`min-h-[44px] rounded-full flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold tracking-wider transition-colors cursor-pointer ${
                        item.inStock
                          ? "bg-white text-black hover:bg-zinc-200"
                          : "bg-white/[0.08] text-zinc-300 hover:bg-white/[0.14]"
                      }`}
                    >
                      {item.inStock ? (
                        <>
                          <ToggleRight className="w-4 h-4" />
                          READY
                        </>
                      ) : (
                        <>
                          <ToggleLeft className="w-4 h-4" />
                          SOLD OUT
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => removeMerch(item.id)}
                      aria-label={`Hapus ${item.name}`}
                      title="Hapus dari daftar preview"
                      className="min-w-[44px] min-h-[44px] rounded-full inline-flex items-center justify-center bg-white/[0.06] text-zinc-400 hover:bg-white/[0.14] hover:text-white transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {filteredMerch.length === 0 && (
                <div className="p-6 rounded-2xl bg-[#121215] text-xs sm:text-sm text-zinc-400">
                  Tidak ada item pada filter ini.
                </div>
              )}
            </div>
          </div>

          <AdminPanel
            title="Tambah Produk Baru"
            icon={<Plus className="w-4 h-4" />}
            className="lg:col-span-4"
          >
            <form onSubmit={handleAddMerch} className="space-y-3 text-xs">
              <AdminField id="admin-merch-name" label="Nama Barang:">
                <input
                  id="admin-merch-name"
                  type="text"
                  required
                  placeholder="Contoh: Kaos Tour Monokrom"
                  value={newMerch.name}
                  onChange={(e) => setNewMerch({ ...newMerch, name: e.target.value })}
                  className={adminInputClass}
                />
              </AdminField>

              <AdminField id="admin-merch-category" label="Kategori:">
                <select
                  id="admin-merch-category"
                  value={newMerch.category}
                  onChange={(e) =>
                    setNewMerch({ ...newMerch, category: e.target.value as MerchItem["category"] })
                  }
                  className={adminSelectClass}
                >
                  <option value="Apparel">Apparel (Kaos/Jaket/Syal)</option>
                  <option value="Rilisan Fisik">Rilisan Fisik (Vinyl/Kaset)</option>
                  <option value="Aksesoris">Aksesoris (Stiker/Pin)</option>
                </select>
              </AdminField>

              <AdminField id="admin-merch-price" label="Harga (Rupiah):">
                <input
                  id="admin-merch-price"
                  type="number"
                  min={0}
                  required
                  value={newMerch.price}
                  onChange={(e) =>
                    setNewMerch({ ...newMerch, price: Math.max(0, Number(e.target.value)) })
                  }
                  className={`${adminInputClass} tabular-nums`}
                />
              </AdminField>

              <AdminField id="admin-merch-sizes" label="Pilihan Ukuran (Pisahkan Koma):">
                <input
                  id="admin-merch-sizes"
                  type="text"
                  value={newMerch.sizes}
                  onChange={(e) => setNewMerch({ ...newMerch, sizes: e.target.value })}
                  placeholder="S, M, L, XL, XXL"
                  className={adminInputClass}
                />
              </AdminField>

              <AdminField id="admin-merch-desc" label="Deskripsi Ringkas:">
                <textarea
                  id="admin-merch-desc"
                  rows={2}
                  value={newMerch.description}
                  onChange={(e) => setNewMerch({ ...newMerch, description: e.target.value })}
                  placeholder="Bahan, sablon, edisi terbatas..."
                  className={adminTextareaClass}
                />
              </AdminField>

              <Button type="submit" className="w-full text-xs uppercase font-bold tracking-wider mt-2">
                Tambah ke Preview
              </Button>
            </form>
          </AdminPanel>
        </div>
      )}

      {/* Tab 2: GIGS */}
      {activeTab === "gigs" && (
        <div className="max-w-6xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 flex flex-col gap-4">
            <h2 className="text-lg font-bold uppercase tracking-wide">
              Kelola Jadwal &amp; Status Tiket
            </h2>
            {gigsList.length === 0 ? (
              <div className="p-6 rounded-2xl bg-[#121215] text-xs sm:text-sm text-zinc-400">
                Belum ada jadwal manggung terverifikasi. Tambahkan lewat form di samping untuk preview.
              </div>
            ) : (
              <div className="space-y-2.5">
                {gigsList.map((gig) => (
                  <div
                    key={gig.id}
                    className="p-4 rounded-2xl bg-[#121215] flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 sm:gap-4"
                  >
                    <div className="min-w-0">
                      <span className="text-xs tabular-nums font-bold text-zinc-400 block">
                        {gig.date} • {gig.time}
                      </span>
                      <h3 className="text-base font-bold text-white tracking-tight mt-0.5 truncate">
                        {gig.event}
                      </h3>
                      <p className="text-xs text-zinc-400 truncate">
                        {gig.venue}, {gig.city}
                      </p>
                    </div>

                    <div className="flex items-center justify-end gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => toggleGigStatus(gig.id)}
                        className="min-h-[44px] rounded-full px-4 py-1.5 text-xs font-bold tracking-wider bg-white/[0.09] hover:bg-white/[0.16] cursor-pointer transition-colors"
                        title="Klik untuk ganti status: Tersedia -> Sold Out -> Free Entry"
                      >
                        Status: <span className="text-white">{gig.status}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => removeGig(gig.id)}
                        aria-label={`Hapus ${gig.event}`}
                        className="min-w-[44px] min-h-[44px] rounded-full inline-flex items-center justify-center bg-white/[0.06] text-zinc-400 hover:bg-white/[0.14] hover:text-white transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <AdminPanel
            title="Tambah Jadwal Manggung"
            icon={<Plus className="w-4 h-4" />}
            className="lg:col-span-4"
          >
            <form onSubmit={handleAddGig} className="space-y-3 text-xs">
              <AdminField id="admin-gig-event" label="Nama Acara / Festival:">
                <input
                  id="admin-gig-event"
                  type="text"
                  required
                  placeholder="Contoh: Jakarta Ska Festival"
                  value={newGig.event}
                  onChange={(e) => setNewGig({ ...newGig, event: e.target.value })}
                  className={adminInputClass}
                />
              </AdminField>

              <AdminField id="admin-gig-date" label="Tanggal:">
                <input
                  id="admin-gig-date"
                  type="text"
                  required
                  placeholder="Contoh: 28 JAN 2027"
                  value={newGig.date}
                  onChange={(e) => setNewGig({ ...newGig, date: e.target.value })}
                  className={`${adminInputClass} tabular-nums`}
                />
              </AdminField>

              <AdminField id="admin-gig-venue" label="Kota & Venue:">
                <input
                  id="admin-gig-venue"
                  type="text"
                  required
                  placeholder="M Bloc, Jakarta Selatan"
                  value={newGig.venue}
                  onChange={(e) => setNewGig({ ...newGig, venue: e.target.value })}
                  className={adminInputClass}
                />
              </AdminField>

              <AdminField id="admin-gig-status" label="Status Tiket:">
                <select
                  id="admin-gig-status"
                  value={newGig.status}
                  onChange={(e) =>
                    setNewGig({ ...newGig, status: e.target.value as Gig["status"] })
                  }
                  className={adminSelectClass}
                >
                  <option value="Tersedia">Tersedia (Ada Link Tiket)</option>
                  <option value="Sold Out">Sold Out</option>
                  <option value="Free Entry">Free Entry (Gratis/OTS)</option>
                </select>
              </AdminField>

              <Button type="submit" className="w-full text-xs uppercase font-bold tracking-wider mt-2">
                Tambah ke Preview
              </Button>
            </form>
          </AdminPanel>
        </div>
      )}

      {/* Tab 3: MUSIC & LYRICS */}
      {activeTab === "music" && (
        <div className="max-w-6xl mx-auto mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <h2 className="text-lg font-bold uppercase tracking-wide">
              Katalog Lagu &amp; Lirik Aktif
            </h2>
            <div className="space-y-2.5">
              {songsList.map((song) => (
                <div
                  key={song.id}
                  className="p-4 rounded-2xl bg-[#121215] flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 sm:gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-zinc-900 shrink-0">
                      <Image
                        src={song.cover}
                        alt={song.title}
                        fill
                        sizes="48px"
                        unoptimized={!isConfiguredImageHost(song.cover)}
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-white tracking-tight truncate">
                        {song.title}
                      </h3>
                      <p className="text-xs text-zinc-400 tabular-nums">
                        {song.year} • {song.type}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 shrink-0">
                    <span className="text-xs font-medium uppercase rounded-full bg-white/[0.07] px-3 py-1 text-zinc-300">
                      Aktif
                    </span>
                    <button
                      type="button"
                      onClick={() => removeSong(song.id)}
                      aria-label={`Hapus ${song.title}`}
                      className="min-w-[44px] min-h-[44px] rounded-full inline-flex items-center justify-center bg-white/[0.06] text-zinc-400 hover:bg-white/[0.14] hover:text-white transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <AdminPanel
            title="Tambah Lagu Baru"
            icon={<Plus className="w-4 h-4" />}
            className="lg:col-span-5"
          >
            <form onSubmit={handleAddSong} className="space-y-3 text-xs">
              <AdminField id="admin-song-title" label="Judul Lagu:">
                <input
                  id="admin-song-title"
                  type="text"
                  required
                  placeholder="Contoh: Anthem of the City"
                  value={newSong.title}
                  onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
                  className={adminInputClass}
                />
              </AdminField>

              <AdminField id="admin-song-year" label="Tahun Rilis:">
                <input
                  id="admin-song-year"
                  type="text"
                  value={newSong.year}
                  onChange={(e) => setNewSong({ ...newSong, year: e.target.value })}
                  className={`${adminInputClass} tabular-nums`}
                />
              </AdminField>

              <AdminField id="admin-song-spotify" label="Tautan Spotify:">
                <input
                  id="admin-song-spotify"
                  type="url"
                  placeholder="https://open.spotify.com/track/..."
                  value={newSong.spotifyUrl}
                  onChange={(e) => setNewSong({ ...newSong, spotifyUrl: e.target.value })}
                  className={adminInputClass}
                />
              </AdminField>

              <AdminField id="admin-song-lyrics" label="Teks Lirik Lengkap:">
                <textarea
                  id="admin-song-lyrics"
                  rows={4}
                  placeholder="Tulis atau paste lirik lagu di sini..."
                  value={newSong.lyrics}
                  onChange={(e) => setNewSong({ ...newSong, lyrics: e.target.value })}
                  className={`${adminTextareaClass} leading-relaxed`}
                />
              </AdminField>

              <Button type="submit" className="w-full text-xs uppercase font-bold tracking-wider mt-2">
                Tambah ke Preview
              </Button>
            </form>
          </AdminPanel>
        </div>
      )}

      {/* Tab 4: SETTINGS & VIDEO KLIP */}
      {activeTab === "settings" && (
        <div className="max-w-2xl mx-auto mt-8 space-y-6">
          <AdminPanel title="Pengaturan Kontak & Tautan Resmi">
            <div className="space-y-4 text-xs">
              <AdminField
                id="admin-wa-input"
                label="Nomor WhatsApp Admin (Tujuan Merch & Booking):"
                hint="Gunakan format awalan 62 tanpa spasi/tanda hubung (contoh: 6281288088807)."
              >
                <input
                  id="admin-wa-input"
                  type="text"
                  value={bandSettings.managerWhatsApp}
                  onChange={(e) =>
                    setBandSettings({ ...bandSettings, managerWhatsApp: e.target.value })
                  }
                  placeholder="628xxxxxxxxxx"
                  className={`${adminInputClass} tabular-nums`}
                />
              </AdminField>

              <AdminField id="admin-spotify-input" label="Tautan Profil Spotify Band:">
                <input
                  id="admin-spotify-input"
                  type="url"
                  value={bandSettings.spotifyArtistUrl}
                  onChange={(e) =>
                    setBandSettings({ ...bandSettings, spotifyArtistUrl: e.target.value })
                  }
                  className={adminInputClass}
                />
              </AdminField>

              <AdminField id="admin-email-input" label="Email Resmi Booking / Manajemen:">
                <input
                  id="admin-email-input"
                  type="email"
                  value={bandSettings.bookingEmail}
                  onChange={(e) =>
                    setBandSettings({ ...bandSettings, bookingEmail: e.target.value })
                  }
                  className={adminInputClass}
                />
              </AdminField>

              <AdminField
                id="admin-mv-input"
                label="Tautan Video Klip Resmi (Google Drive / YouTube):"
                hint={
                  parsedVideoPreview
                    ? `Terdeteksi sebagai: ${
                        parsedVideoPreview.provider === "youtube"
                          ? "YouTube Official Embed"
                          : "Google Drive Preview"
                      } (ID: ${parsedVideoPreview.videoId})`
                    : "Masukkan link Google Drive atau YouTube resmi untuk melihat deteksi player otomatis."
                }
              >
                <input
                  id="admin-mv-input"
                  type="url"
                  value={musicVideoUrl}
                  onChange={(e) => setMusicVideoUrl(e.target.value)}
                  className={adminInputClass}
                />
              </AdminField>

              <Button
                onClick={() => showNotification("Pengaturan preview diperbarui (lokal).")}
                className="w-full text-xs uppercase font-bold tracking-wider mt-2 gap-2"
              >
                <Save className="w-4 h-4" />
                Simpan Preview Lokal
              </Button>
            </div>
          </AdminPanel>
        </div>
      )}
    </div>
  );
}
