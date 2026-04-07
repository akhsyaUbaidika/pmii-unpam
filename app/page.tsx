import { headers } from "next/headers";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import DocumentationCarousel from "@/components/DocumentationCarousel";
import "swiper/css";

export const dynamic = "force-dynamic";

type Article = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  slug: string;
};

type Doc = {
  id: number;
  coverImage: string;
  slug: string;
};

async function getArticles(): Promise<Article[]> {
  const host = (await headers()).get("host");

  try {
    const res = await fetch(`https://${host}/api/articles`, {
      cache: "no-store",
    });

    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

async function getDocs(): Promise<Doc[]> {
  const host = (await headers()).get("host");

  try {
    const res = await fetch(`https://${host}/api/documentations`, {
      cache: "no-store",
    });

    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const articles = await getArticles();
  const docs = await getDocs();

  return (
    <main className="bg-gray-50 text-gray-900">

      {/* ================= HERO ================= */}
      <section className="bg-blue-700 text-white pt-32 pb-28 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

          <div>
            <p className="font-semibold text-yellow-300">
              Halo 👋 Selamat datang di laman resmi
            </p>

            <h1 className="text-4xl md:text-5xl font-extrabold mt-4 leading-tight">
              PMII Komisariat Universitas Pamulang
            </h1>

            <p className="mt-4 text-blue-100">
              Berdiri sejak 1960 — Rumah kaderisasi mahasiswa Islam progresif.
            </p>

            <Link href="#">
              <button className="mt-6 px-6 py-3 rounded-xl bg-yellow-400 text-black font-semibold hover:scale-105 transition">
                Gabung Sekarang
              </button>
            </Link>
          </div>

          <div className="flex justify-center">
            <img
              src="https://mpwjmwrybukmjvbpqufm.supabase.co/storage/v1/object/public/uploads/1775463579888.png"
              className="w-80 drop-shadow-2xl"
              alt="PMII"
            />
          </div>

        </div>

        {/* wave */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-white rounded-t-[100%]" />
      </section>

      {/* ================= INTRO ================= */}
      <section className="py-20 text-center bg-white">
        <div className="max-w-3xl mx-auto px-6">

          <h2 className="text-2xl md:text-3xl font-semibold">
            Rekonstruksi Pemikiran &{" "}
            <span className="text-blue-600 font-bold">
              Ekosistem Arus Baru
            </span>
          </h2>

          <p className="mt-6 text-gray-600 leading-relaxed">
            Gerakan ini bertujuan membangun kesadaran kolektif kader agar
            progresif, kolaboratif, dan adaptif terhadap tantangan zaman.
          </p>

        </div>
      </section>

      {/* ================= FILOSOFI ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

          <div>
            <h3 className="text-2xl font-bold border-l-4 border-red-500 pl-4">
              Dzikir, Fikir, Amal Saleh
            </h3>

            <p className="mt-4 text-gray-600">
              Setiap kader PMII harus senantiasa mengingat Allah, berpikir
              kritis, dan melakukan perbuatan baik yang bermanfaat.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-8">
            <h4 className="text-lg font-semibold text-red-500">
              Mau jadi bagian dari PMII?
            </h4>

            <p className="mt-3 text-gray-600 text-sm">
              Gabung sekarang dan jadilah agen perubahan yang berdampak.
            </p>

            <button className="mt-5 px-5 py-3 bg-red-500 text-white rounded-lg hover:scale-105 transition">
              Gabung sekarang!
            </button>
          </div>

        </div>
      </section>

      {/* ================= ARTIKEL ================= */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">

          <h3 className="text-3xl font-bold text-center">
            Artikel
          </h3>

          <p className="text-center text-gray-500 mt-2">
            Baca sekarang!
          </p>

          <div className="mt-10 grid md:grid-cols-3 gap-6">

            {articles.length === 0 && (
              <p className="col-span-3 text-center text-gray-500">
                Belum ada artikel
              </p>
            )}

            {articles.slice(0, 3).map((item) => (
              <Link key={item.id} href={`/artikel/${item.slug}`}>
                <div className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden">

                  <div className="relative">
                    <img
                      src={
                        item.image?.startsWith("http")
                          ? item.image
                          : "/placeholder.jpg"
                      }
                      className="h-44 w-full object-cover"
                      alt={item.title}
                    />

                    <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                      Opini
                    </div>
                  </div>

                  <div className="p-5">
                    <h4 className="font-bold">{item.title}</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      {item.excerpt}
                    </p>
                  </div>

                </div>
              </Link>
            ))}

          </div>

        </div>
      </section>

      {/* ================= DOKUMENTASI FULL HERO ================= */}
      <DocumentationCarousel docs={docs} />

    </main>
  );
}