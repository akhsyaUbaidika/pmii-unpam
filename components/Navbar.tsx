"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profilOpen, setProfilOpen] = useState(false);

  return (
    <nav className="bg-white shadow fixed w-full z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="font-bold text-blue-700">
          PMII UNPAM
        </h1>

        {/* DESKTOP */}
        <div className="hidden md:flex gap-6 items-center">

          <Link href="/">Beranda</Link>

          {/* DROPDOWN PROFIL */}
          <div
            className="relative group"
            onMouseEnter={() => setProfilOpen(true)}
            onMouseLeave={() => setProfilOpen(false)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setProfilOpen(!profilOpen);
              }}
              className="hover:text-blue-600"
            >
              Profil ▾
            </button>

            <div
              className={`
                absolute bg-white shadow rounded mt-2 w-40
                ${profilOpen ? "block" : "hidden"}
              `}
            >
              <Link href="/profil/sejarah" className="block px-4 py-2 hover:bg-gray-100">
                Sejarah
              </Link>
              <Link href="/profil/struktur" className="block px-4 py-2 hover:bg-gray-100">
                Struktur
              </Link>
            </div>
          </div>

          <Link href="/artikel">Artikel</Link>
          <Link href="/dokumentasi">Dokumentasi</Link>

          {/* MENU BARU */}
          <Link href="/pengajuan-sk">
            Pengajuan SK Rayon
          </Link>
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
        <div className="md:hidden bg-white px-6 pb-6 space-y-3 shadow">

          <Link href="/" className="block">
            Beranda
          </Link>

          {/* PROFIL DROPDOWN MOBILE */}
          <div>
            <button
              onClick={() => setProfilOpen(!profilOpen)}
              className="w-full text-left"
            >
              Profil ▾
            </button>

            {profilOpen && (
              <div className="ml-4 mt-2 space-y-2">
                <Link href="/profil/sejarah" className="block">
                  Sejarah
                </Link>
                <Link href="/profil/struktur" className="block">
                  Struktur
                </Link>
              </div>
            )}
          </div>

          <Link href="/artikel" className="block">
            Artikel
          </Link>

          <Link href="/dokumentasi" className="block">
            Dokumentasi
          </Link>

          <Link href="/pengajuan-sk" className="block">
            Pengajuan SK Rayon
          </Link>

        </div>
      )}
    </nav>
  );
}