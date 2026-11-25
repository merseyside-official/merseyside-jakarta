export interface Song {
  id: string;
  title: string;
  year: string;
  type: "Single" | "EP" | "Album";
  cover: string;
  audioSrc: string;
  spotifyUrl: string;
  streamingLinks?: {
    spotify: string;
    appleMusic: string;
    youtube: string;
    joox: string;
    deezer: string;
    tidal: string;
    amazonMusic: string;
    resso: string;
    tiktokMusic: string;
  };
  lyrics: string;
  featured?: boolean;
  /** Tanggal rilis lengkap (opsional), contoh: "22 November 2026" */
  releaseDate?: string;
  /** Label / rekaman (opsional) */
  label?: string;
  /** Kredit produksi (opsional), ditampilkan di bagian Rilisan Terbaru */
  credits?: { role: string; name: string }[];
}

export interface Member {
  channel: string;
  name: string;
  role: string;
  section: "FRONT & VOCAL" | "STRINGS" | "RHYTHM & KEYS" | "BRASS SECTION";
  instrumentNote: string;
  isBrass?: boolean;
}

export interface Gig {
  id: string;
  date: string;
  time: string;
  event: string;
  venue: string;
  city: string;
  status: "Tersedia" | "Sold Out" | "Free Entry";
  ticketUrl?: string;
  isPast?: boolean;
}

export interface MerchItem {
  id: string;
  name: string;
  category: "Rilisan Fisik" | "Apparel" | "Aksesoris";
  price: number;
  image: string;
  description: string;
  sizes?: string[];
  inStock: boolean;
  featured?: boolean;
}

export interface MusicVideoConfig {
  eyebrow: string;
  highlightTitle: string;
  title: string;
  description: string;
  /**
   * Isi dengan tautan Google Drive saat tahap preview pembangunan web,
   * lalu ganti langsung dengan URL YouTube (youtube.com/watch?v=... / youtu.be/...)
   * atau ID YouTube 11-karakter saat video klip resmi tayang.
   */
  videoUrl: string;
}

export const MUSIC_VIDEO: MusicVideoConfig = {
  eyebrow: "Video Klip Resmi",
  highlightTitle: "MERAH",
  title: "MERAH (Official Music Video)",
  description: "Tentang perjalanan, pengorbanan, dan janji setia — visual resmi single MERAH.",
  videoUrl: "https://drive.google.com/file/d/1RS4m4tKu7ofcg6KQQ-7NTxGSg0Kf6zIW/view?usp=sharing",
};

export const BAND_INFO = {
  name: "MERSEYSIDE JAKARTA",
  // Label genre dipakai di footer & deskripsi. Ubah di sini kalau positioning band berubah.
  genre: "2 Tone Ska",
  tagline: "Single baru “MERAH” — sudah rilis.",
  established: 2007,
  stageDebut: 2010,
  origin: "Jakarta, Indonesia",
  bioShort:
    "Merseyside Jakarta adalah band 2 Tone ska dari Jakarta. Berawal dari pertemuan para personelnya pada 2007 dan naik panggung pertama kali pada 2010, band ini menulis lagu dan chant tentang Persija dan The Jakmania, dengan Liverpool FC sebagai kecintaan kedua yang tak pernah hilang.",
  spotifyArtistUrl: "https://open.spotify.com/artist/3OlLgj9W40yLqxlCHoXMR4",
  appleMusicArtistUrl: "https://music.apple.com/id/artist/merseyside/1792671273",
  instagramUrl: "https://www.instagram.com/merseyside.ska/",
  youtubeUrl: "https://www.youtube.com/channel/UCo_BfSbVYYYRLlMABoRfIlw",
  tiktokUrl: "https://www.tiktok.com/@merseysideska",
  managerWhatsApp: "6281288088807",
  managerWhatsAppDisplay: "+62 812-8808-8807",
  bookingEmail: "merseysideofficial@gmail.com",
};

// Formasi terbaru sesuai press rilis "MERAH" (2026). Nama lengkap menyusul dari band.
export const MEMBERS: Member[] = [
  {
    channel: "CH // 01",
    name: "ENO",
    role: "VOKAL",
    section: "FRONT & VOCAL",
    instrumentNote: "Frontman & Lead Vocals",
  },
  {
    channel: "CH // 02",
    name: "ANGGA",
    role: "GITAR",
    section: "STRINGS",
    instrumentNote: "Rhythm Guitar & Backing",
  },
  {
    channel: "CH // 03",
    name: "WAHYU",
    role: "GITAR LEAD",
    section: "STRINGS",
    instrumentNote: "Lead Guitar & Melodic Solos",
  },
  {
    channel: "CH // 04",
    name: "JOJO",
    role: "BASS",
    section: "STRINGS",
    instrumentNote: "Bassline & Walking Grooves",
  },
  {
    channel: "CH // 05",
    name: "PANHOO",
    role: "KEYBOARD",
    section: "RHYTHM & KEYS",
    instrumentNote: "Organ & Off-beat Ska Chops",
  },
  {
    channel: "CH // 06",
    name: "GANUNG",
    role: "DRUM",
    section: "RHYTHM & KEYS",
    instrumentNote: "Drums & One-Drop Tempo",
  },
  {
    channel: "CH // 07",
    name: "FADLI",
    role: "TRUMPET",
    section: "BRASS SECTION",
    instrumentNote: "Trumpet & Ska Horn Attack",
    isBrass: true,
  },
  {
    channel: "CH // 08",
    name: "ABAYA",
    role: "TROMBONE",
    section: "BRASS SECTION",
    instrumentNote: "Trombone & Low Brass Stabs",
    isBrass: true,
  },
];

export const SONGS_DATA: Song[] = [
  {
    id: "merah",
    title: "MERAH",
    year: "2026",
    type: "Single",
    cover: "/merah1.png",
    audioSrc: "/audio/merah-preview.mp3",
    spotifyUrl: "https://open.spotify.com/track/49Ffr0V04MydYZmdRgx3el",
    streamingLinks: {
      spotify: "https://open.spotify.com/track/49Ffr0V04MydYZmdRgx3el",
      // TODO(band): ganti link Apple Music, YouTube, dll. ke link langsung single MERAH.
      appleMusic: "https://music.apple.com/id/artist/merseyside/1792671273",
      youtube: "https://www.youtube.com/channel/UCo_BfSbVYYYRLlMABoRfIlw",
      joox: "https://www.joox.com/id/search/Merseyside%20Jakarta",
      deezer: "https://www.deezer.com/search/Merseyside%20Jakarta",
      tidal: "https://listen.tidal.com/search?q=Merseyside%20Jakarta",
      amazonMusic: "https://music.amazon.com/search/Merseyside+Jakarta",
      resso: "https://www.resso.com",
      tiktokMusic: "https://music.tiktok.com",
    },
    featured: true,
    releaseDate: "22 November 2026",
    label: "Bara/Api Recs",
    credits: [
      { role: "Vokal", name: "Eno" },
      { role: "Gitar", name: "Angga" },
      { role: "Gitar Lead", name: "Wahyu" },
      { role: "Bass", name: "Jojo" },
      { role: "Keyboard", name: "Panhoo" },
      { role: "Drum", name: "Ganung" },
      { role: "Trumpet", name: "Fadli" },
      { role: "Trombone", name: "Abaya" },
      { role: "Rekaman", name: "Studio K (operator Mas Yuda)" },
      { role: "Gitar lead direkam di", name: "Bara/Api Studio" },
      { role: "Mixing & Mastering", name: "Letsong" },
      { role: "Artwork", name: "Hamscha" },
    ],
    // Lirik resmi belum tersedia. Isi di sini atau lewat Admin setelah dari band.
    lyrics: "",
  },
  {
    id: "tim-kebanggaan-jakarta",
    title: "Tim Kebanggaan Jakarta",
    year: "2025",
    type: "Single",
    cover: "/covers/tim-kebanggaan-jakarta.jpg",
    audioSrc: "/audio/tim-kebanggaan-jakarta-preview.mp3",
    spotifyUrl: "https://open.spotify.com/track/00jDOXDLRIsN4DRYhTwjIN",
    featured: false,
    lyrics: "",
  },
  {
    id: "urban",
    title: "Urban",
    year: "2017",
    type: "Single",
    cover: "/covers/urban.jpg",
    audioSrc: "/audio/urban-preview.mp3",
    spotifyUrl: "https://open.spotify.com/track/2Oz6IyagjuRcGxn1mvfFRH",
    featured: false,
    lyrics: "",
  },
  {
    id: "ode-untuk-bepe",
    title: "Ode Untuk Bepe",
    year: "2022",
    type: "Single",
    cover: "/covers/ode-untuk-bepe.jpg",
    audioSrc: "/audio/ode-untuk-bepe-preview.mp3",
    spotifyUrl: "https://open.spotify.com/track/0RJtOHry61AxnU3GIPypkX",
    featured: false,
    lyrics: "",
  },
  {
    id: "field-of-gbk",
    title: "Field of GBK",
    year: "2017",
    type: "Single",
    cover: "/covers/field-of-gbk.jpg",
    audioSrc: "/audio/field-of-gbk-preview.mp3",
    spotifyUrl: "https://open.spotify.com/track/26eZMjxzyP9pVgHfFHnRAu",
    featured: false,
    lyrics: "",
  },
  {
    id: "jaya-raya",
    title: "Jaya Raya",
    year: "2017",
    type: "Single",
    cover: "/covers/jaya-raya.jpg",
    audioSrc: "/audio/jaya-raya-preview.mp3",
    spotifyUrl: "https://open.spotify.com/track/3w6az4VqshZdDEMpyihOTA",
    featured: false,
    lyrics: "",
  },
  {
    id: "kami-cinta-persija",
    title: "Kami Cinta Persija",
    year: "2025",
    type: "Single",
    cover: "/covers/kami-cinta-persija.jpg",
    audioSrc: "/audio/kami-cinta-persija-preview.mp3",
    spotifyUrl: "https://open.spotify.com/track/5LISVOENQYgksFgmyKlkuq",
    featured: false,
    releaseDate: "16 Juni 2025",
    label: "The Merseyside",
    lyrics: "",
  },
  {
    id: "si-agung",
    title: "Si Agung",
    year: "2019",
    type: "Single",
    cover: "/covers/si-agung.jpg",
    audioSrc: "/audio/si-agung-preview.mp3",
    spotifyUrl: "https://open.spotify.com/album/3Xo48jhJVHrysrR5hYcGri",
    featured: false,
    lyrics: "",
  },
];

// Belum ada jadwal manggung resmi yang terverifikasi. Semua data gig lama adalah dummy dan dihapus.
// Tambahkan lewat Admin atau isi di sini, contoh:
// { id: "gig-1", date: "12 DEC 2026", time: "20:00 WIB", event: "Nama Acara", venue: "Nama Venue",
//   city: "Jakarta", status: "Tersedia", ticketUrl: "https://...", isPast: false }
export const GIGS_DATA: Gig[] = [];

// TODO(band): produk, harga, ukuran, dan stok di bawah ini belum diverifikasi dengan band
// (tidak tercantum di press rilis).
export const MERCH_DATA: MerchItem[] = [
  {
    id: "merch-tshirt-merah",
    name: "T-Shirt 'MERAH' Vintage Washed Black",
    category: "Apparel",
    price: 185000,
    image: "/merch/tshirt-merah.jpg",
    description: "Heavyweight vintage washed black cotton streetwear tee dengan sablon artwork resmi single 'MERAH' & elang Merseyside Jakarta.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    featured: true,
  },
  {
    id: "merch-vinyl-cassette-merah",
    name: "Vinyl LP 12\" & Kaset Pita 'MERAH' Deluxe Bundle",
    category: "Rilisan Fisik",
    price: 295000,
    image: "/merch/vinyl-cassette-merah.jpg",
    description: "Paket fisik kolektor piringan hitam 12 inch vinyl gatefold jacket sleeve + kaset pita audio analog mika bening artwork 'MERAH'.",
    inStock: true,
    featured: true,
  },
  {
    id: "merch-scarf",
    name: "Jacquard Knit Scarf 'Merseyside Jakarta'",
    category: "Apparel",
    price: 165000,
    image: "/merch/scarf-merseyside.jpg",
    description: "Syal rajut jacquard premium monokrom 14 get hitam-putih khas kultur panggung dan tribun.",
    inStock: true,
    featured: false,
  },
];

export function generateWhatsAppOrderUrl(
  productName: string,
  price: number,
  size?: string,
  buyerName: string = "",
  city: string = ""
): string {
  const phone = BAND_INFO.managerWhatsApp;
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);

  const message = `Halo Admin Merseyside Jakarta Store, saya mau order:
- Produk: ${productName}
- Harga: ${formattedPrice}${size ? `\n- Size: ${size}` : ""}
- Qty: 1 pcs
- Nama: ${buyerName || "[Isi Nama Lengkap]"}
- Alamat/Kecamatan: ${city || "[Isi Kota / Kecamatan]"}

Mohon info total biaya + ongkir serta nomor rekeningnya. Terima kasih!`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
