import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import TopLoader from "@/components/TopLoader";

export const metadata: Metadata = {
  title: "PMII Komisariat Universitas Pamulang",
  description: "Website resmi PMII Komisariat Universitas Pamulang",
  openGraph: {
    type: "website",
    url: "https://pmiiunpam.com/",
    title: "PMII UNPAM",
    description: "Website resmi PMII Komisariat Universitas Pamulang",
    images: [
      {
        url: "https://mpwjmwrybukmjvbpqufm.supabase.co/storage/v1/object/public/uploads/1776794780855.webp",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="https://mpwjmwrybukmjvbpqufm.supabase.co/storage/v1/object/public/uploads/title.ico" />
      </head>
      <body className="bg-gray-50 text-gray-900">

        <TopLoader />

        <Navbar />

        <div className="pt-24">
          {children}
        </div>

        <footer className="bg-gray-900 text-gray-200 py-12 mt-20">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">

            <div>
              <h4 className="text-xl font-bold">PMII UNPAM</h4>
              <p className="mt-3 text-sm text-gray-400">
                Komisariat Universitas Pamulang — Rumah kader pergerakan.
              </p>
            </div>

            <div>
              <h5 className="font-semibold mb-3">Menu</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/">Beranda</a></li>
                <li><a href="/profil/sejarah">Sejarah</a></li>
                <li><a href="/profil/struktur">Struktur</a></li>
                <li><a href="/artikel">Artikel</a></li>
                <li><a href="/dokumentasi">Dokumentasi</a></li>
                <li><a href="/pengajuan-sk">Pengajuan SK Rayon</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-3">Kontak</h5>
              <p className="text-sm text-gray-400">
                Email: pmiiunpam@gmail.com <br />
                WhatsApp: +62 xxxx xxxx
              </p>
            </div>

          </div>

          <p className="text-center text-gray-500 text-sm mt-10">
            © 2026 PMII Komisariat Universitas Pamulang
          </p>
        </footer>

      </body>
    </html>
  );
}