"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow fixed w-full z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="font-bold text-blue-700">
          PMII UNPAM
        </h1>

        {/* DESKTOP */}
        <div className="hidden md:flex gap-6">
          <Link href="/">Beranda</Link>
          <Link href="/profil/sejarah">Sejarah</Link>
          <Link href="/profil/struktur">Struktur</Link>
          <Link href="/artikel">Artikel</Link>
          <Link href="/dokumentasi">Dokumentasi</Link>
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden px-6 pb-4 space-y-3">
          <Link href="/">Beranda</Link>
          <Link href="/profil/sejarah">Sejarah</Link>
          <Link href="/profil/struktur">Struktur</Link>
          <Link href="/artikel">Artikel</Link>
          <Link href="/dokumentasi">Dokumentasi</Link>
        </div>
      )}
    </nav>
  );
}