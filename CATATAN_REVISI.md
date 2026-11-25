# Catatan Revisi Isian Website Merseyside Jakarta

Hanya file teks/data yang diubah. Timpa file di folder `src/` project Anda dengan file di zip ini (struktur folder sama).

## Sudah diisi dengan data asli (sumber: press rilis MERAH 2026 + riset web)
- Formasi 2026: Eno (vokal), Angga (gitar), Wahyu (gitar lead), Jojo (bass), Panhoo (keyboard), Ganung (drum), Fadli (trumpet), Abaya (trombone). Tampil di bagian Story.
- Single MERAH: rilis 22 November 2026, Bara/Api Recs. Kredit produksi (Studio K, Mas Yuda, Bara/Api Studio, Letsong, Hamscha) tampil di bagian Rilisan Terbaru.
- Tahun "Kami Cinta Persija" 2020 -> 2025 (rilis 16 Juni 2025) dan "Tim Kebanggaan Jakarta" 2024 -> 2025.
- Link YouTube diganti ke channel asli (@themerseyside). Link Apple Music MERAH diarahkan ke halaman artis.
- Teks bio, manifesto, timeline, metadata SEO, footer ditulis ulang berdasarkan fakta yang terverifikasi.

## Dihapus karena dummy / dikarang
- Semua lirik lagu (isinya dikarang). Sekarang kosong dan modal lirik menampilkan "Lirik resmi belum tersedia".
- Semua jadwal gigs (event, venue, dan tanggal dikarang). Sekarang kosong dan tampil pesan "Jadwal manggung belum diumumkan".
- Klaim "Britpop / Alternative Rock / Indie Rock" diganti "2 Tone Ska" (lihat poin keputusan di bawah).
- Tagline "Tentang Perjalanan, Pengorbanan, dan Janji Setia" adalah subjudul single MERAH, bukan tagline band. Sekarang hanya dipakai di bagian MERAH.
- Durasi palsu "3:45" di player diganti "--:--".

## PERLU KONFIRMASI / DIISI BAND (ditandai TODO(band) di bandData.ts)
1. Genre: PRD menyebut pivot ke "Alternative Rock / Britpop", tetapi semua sumber publik menyebut Merseyside 2 Tone ska. Saya pakai "2 Tone Ska". Ubah di satu tempat: `BAND_INFO.genre`.
2. Nomor WhatsApp, email booking, Instagram, TikTok: masih dummy / generik.
3. Audio preview semua lagu masih file placeholder (ui.webmakers.studio/audio/ncs.mp3): memutar musik yang bukan Merseyside.
4. Link streaming MERAH (Spotify, Apple Music, YouTube, dll.) harus diganti link langsung setelah rilis 22 Nov.
5. Merch: produk, harga, ukuran, stok, deskripsi belum terverifikasi. Foto syal masih placeholder Unsplash.
6. Tahun rilis Urban (2017), Field of GBK (2017), Ode Untuk Bepe (2022), Si Agung (2019), Jaya Raya (2017) belum pasti. Apple Music menampilkan Urban 2012 dan Field of GBK 2013 (versi remaster 2017), sedangkan Ode Untuk Bepe dan Si Agung 2026.
7. Lagu di Apple Music yang belum ada di website: Hujan, Urban 2, Riko's on Fire, Andri and Rohit Song, Lord, I'm in Love (perlu cover, audio, link Spotify).
8. Nama lengkap personel, penulis lagu MERAH, EP 2015 (nama dan isi), tanggal dan lokasi debut 2010.
9. Peran Fadli (trumpet) dan Abaya (trombone) dibaca dari tata letak press rilis, mohon dicek.
10. Positioning "Era Universal / lepas dari suporter" di draft lama dihapus karena bertentangan dengan tema MERAH dan sumber (band tetap bagian The Jakmania). Kalau memang ingin tetap, beri tahu saya.
