import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PMII Komisariat Universitas Pamulang",
  description: "Website resmi PMII Komisariat Universitas Pamulang",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-gray-50 text-gray-900">

        {/* ================= NAVBAR GLOBAL ================= */}
        <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
          <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">

            <h1 className="font-bold text-lg text-blue-700">
              PMII UNPAM
            </h1>

            <div className="flex gap-6 text-sm font-medium items-center">

              <a href="/" className="hover:text-blue-600">Beranda</a>

              {/* DROPDOWN PROFIL */}
              <div className="relative group">

                  {/* TRIGGER */} 
                  <div className="py-4 cursor-pointer hover:text-blue-600">
                    Profil ▾
                  </div>

                  {/* AREA PENYAMBUNG HOVER (INVISIBLE BRIDGE) */}
                  <div className="absolute left-0 top-full h-4 w-full"></div>

                  {/* DROPDOWN */}
                  <div className="
                    absolute left-0 top-full
                    opacity-0 invisible
                    group-hover:opacity-100 group-hover:visible
                    transition duration-200
                  ">
                    <div className="bg-white shadow-lg rounded-xl w-60 overflow-hidden">

                      <a 
                        href="/profil/sejarah" 
                        className="block px-5 py-4 hover:bg-gray-100"
                      >
                        Sejarah PMII UNPAM
                      </a>

                      <a 
                        href="/profil/struktur" 
                        className="block px-5 py-4 hover:bg-gray-100"
                      >
                        Struktur PK PMII UNPAM
                      </a>

                    </div>
                  </div>

                </div>


              <a href="/artikel" className="hover:text-blue-600">Artikel</a>
              <a href="/dokumentasi" className="hover:text-blue-600">Dokumentasi</a>
              <a href="/kontak" className="hover:text-blue-600">Kontak</a>

            </div>


          </div>
        </nav>

        {/* ======== CONTENT SEMUA PAGE MASUK SINI ======== */}
        <div className="pt-24">
          {children}
        </div>

        {/* ================= FOOTER GLOBAL ================= */}
        <footer className="bg-gray-900 text-gray-200 py-12 mt-20">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">

            <div>
              <h4 className="text-xl font-bold">
                PMII UNPAM
              </h4>
              <p className="mt-3 text-sm text-gray-400">
                Komisariat Universitas Pamulang — Rumah kader pergerakan.
              </p>
            </div>

            <div>
              <h5 className="font-semibold mb-3">
                Menu
              </h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/">Beranda</a></li>
                <li><a href="/profil/sejarah">Sejarah PMII UNPAM</a></li>
                <li><a href="/profil/struktur">Struktur Pengurus</a></li>
                <li><a href="/artikel">Artikel</a></li>
                <li><a href="/dokumentasi">Dokumentasi</a></li>
                <li><a href="/kontak">Kontak</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-3">
                Kontak
              </h5>
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
