"use client";

import "./globals.css";
import type { Metadata } from "next";
import { useState } from "react";

export const metadata: Metadata = {
  title: "PMII Komisariat Universitas Pamulang",
  description: "Website resmi PMII Komisariat Universitas Pamulang",
};

function Navbar() {
  const [open, setOpen] = useState(false);
  const [profilOpen, setProfilOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">

        <h1 className="font-bold text-lg text-blue-700">
          PMII UNPAM
        </h1>

        {/* DESKTOP */}
        <div className="hidden md:flex gap-6 items-center text-sm font-medium">

          <a href="/" className="hover:text-blue-600">Beranda</a>

          <div className="relative">
            <button
              onClick={() => setProfilOpen(!profilOpen)}
              className="hover:text-blue-600"
            >
              Profil ▾
            </button>

            {profilOpen && (
              <div className="absolute top-full mt-2 bg-white shadow-lg rounded-xl w-52 overflow-hidden">
                <a href="/profil/sejarah" className="block px-4 py-3 hover:bg-gray-100">
                  Sejarah PMII UNPAM
                </a>
                <a href="/profil/struktur" className="block px-4 py-3 hover:bg-gray-100">
                  Struktur PK PMII
                </a>
              </div>
            )}
          </div>

          <a href="/artikel" className="hover:text-blue-600">Artikel</a>
          <a href="/dokumentasi" className="hover:text-blue-600">Dokumentasi</a>
          <a href="/kontak" className="hover:text-blue-600">Kontak</a>
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden px-6 pb-4 space-y-3 text-sm font-medium">
          <a href="/" className="block">Beranda</a>
          <a href="/profil/sejarah" className="block">Sejarah</a>
          <a href="/profil/struktur" className="block">Struktur</a>
          <a href="/artikel" className="block">Artikel</a>
          <a href="/dokumentasi" className="block">Dokumentasi</a>
          <a href="/kontak" className="block">Kontak</a>
        </div>
      )}
    </nav>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-gray-50 text-gray-900">

        <Navbar />

        <div className="pt-24">
          {children}
        </div>

        {/* FOOTER */}
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
              <h5 className="font-semibold mb-3">Menu</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/">Beranda</a></li>
                <li><a href="/profil/sejarah">Sejarah</a></li>
                <li><a href="/profil/struktur">Struktur</a></li>
                <li><a href="/artikel">Artikel</a></li>
                <li><a href="/dokumentasi">Dokumentasi</a></li>
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