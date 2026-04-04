"use client";

import { useState } from "react";

export default function Navbar() {
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

          <a href="/">Beranda</a>

          <div className="relative">
            <button onClick={() => setProfilOpen(!profilOpen)}>
              Profil ▾
            </button>

            {profilOpen && (
              <div className="absolute top-full mt-2 bg-white shadow rounded">
                <a href="/profil/sejarah" className="block px-4 py-2">
                  Sejarah
                </a>
                <a href="/profil/struktur" className="block px-4 py-2">
                  Struktur
                </a>
              </div>
            )}
          </div>

          <a href="/artikel">Artikel</a>
          <a href="/dokumentasi">Dokumentasi</a>
        </div>

        {/* MOBILE */}
        <button
          className="md:hidden text-xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden px-6 pb-4 space-y-2">
          <a href="/">Beranda</a>
          <a href="/profil/sejarah">Sejarah</a>
          <a href="/profil/struktur">Struktur</a>
          <a href="/artikel">Artikel</a>
          <a href="/dokumentasi">Dokumentasi</a>
        </div>
      )}
    </nav>
  );
}