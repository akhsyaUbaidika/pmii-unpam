import type { Metadata } from "next";
import StrukturClient from "./StrukturClient";

export const metadata: Metadata = {
  title: "Struktur Pengurus PMII UNPAM 2026",
  description: "Struktur Kepengurusan PMII UNPAM 2026",
  openGraph: {
    title: "Struktur Pengurus PMII UNPAM 2026",
    description: "Struktur Kepengurusan PMII UNPAM 2026",
    url: "https://pmiiunpam.com/profil/struktur",
    images: [
      {
        url: "https://mpwjmwrybukmjvbpqufm.supabase.co/storage/v1/object/public/uploads/1776794780855.webp",
      },
    ],
  },
};

export default function Page() {
  return <StrukturClient />;
}