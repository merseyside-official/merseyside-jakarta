import type { Metadata } from "next";
import { Geist, Antonio } from "next/font/google";
import "./globals.css";
import { MotionShell } from "@/components/ui/motion";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const antonioDisplay = Antonio({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "MERSEYSIDE JAKARTA — Official Website",
  description:
    "Situs resmi Merseyside Jakarta. Dengarkan single terbaru MERAH, lihat diskografi, jadwal panggung, dan merchandise resmi.",
  keywords: [
    "Merseyside Jakarta",
    "Merseyside band",
    "Band ska Jakarta",
    "2 Tone ska Indonesia",
    "Persija",
    "The Jakmania",
    "MERAH",
    "Tim Kebanggaan Jakarta",
  ],
  openGraph: {
    title: "MERSEYSIDE JAKARTA — Official Website",
    description:
      "Situs resmi Merseyside Jakarta. Dengarkan single terbaru MERAH, lihat diskografi, jadwal panggung, dan merchandise resmi.",
    type: "website",
    locale: "id_ID",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${antonioDisplay.variable} bg-black text-white antialiased`}
    >
      <body className="min-h-screen bg-black text-white font-sans overflow-x-clip">
        <MotionShell>{children}</MotionShell>
      </body>
    </html>
  );
}
