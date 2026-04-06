import { headers } from "next/headers";
import Link from "next/link";

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

      {/* HERO */}
      <section className="bg-blue-700 text-white pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

          <div className="text-center md:text-left">
            <p className="font-semibold">
              Halo 👋 Selamat datang di laman resmi
            </p>

            <h2 className="text-4xl md:text-5xl font-extrabold mt-4 leading-tight">
              PMII Komisariat <br />
              Universitas Pamulang
            </h2>

            <p className="mt-4 text-blue-100">
              Rumah kaderisasi dan gerakan mahasiswa Islam.
            </p>

            <Link href="#">
              <button className="mt-6 px-6 py-3 rounded-xl bg-yellow-400 text-black font-semibold">
                Daftar Oprec
              </button>
            </Link>
          </div>

          <div className="flex justify-center">
            <img
              src="https://mpwjmwrybukmjvbpqufm.supabase.co/storage/v1/object/public/uploads/1775463579888.png"
              className="w-72"
              alt="PMII"
            />
          </div>

        </div>
      </section>

      {/* ARTIKEL */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">

          <h3 className="text-3xl font-bold text-center">
            Artikel Terbaru
          </h3>

          <div className="mt-10 grid md:grid-cols-3 gap-6">

            {articles.length === 0 && (
              <p className="col-span-3 text-center text-gray-500">
                Belum ada artikel
              </p>
            )}

            {articles.slice(0, 3).map((item) => (
              <Link key={item.id} href={`/artikel/${item.slug}`}>
                <div className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden">

                  <img
                    src={
                      item.image && item.image.startsWith("http")
                        ? item.image
                        : "/placeholder.jpg"
                    }
                    className="h-44 w-full object-cover"
                    alt={item.title}
                  />

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

      {/* DOKUMENTASI */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6">

          <h3 className="text-3xl font-bold text-center">
            Dokumentasi
          </h3>

          <div className="mt-10 grid md:grid-cols-3 gap-6">

            {docs.length === 0 && (
              <p className="text-center text-gray-500 col-span-3">
                Belum ada dokumentasi
              </p>
            )}

            {docs.slice(0, 3).map((doc) => (
              <Link key={doc.id} href={`/dokumentasi/${doc.slug}`}>
                <img
                  src={
                    doc.coverImage?.startsWith("http")
                      ? doc.coverImage
                      : "/placeholder.jpg"
                  }
                  className="w-full h-48 object-cover rounded-xl"
                />
              </Link>
            ))}

          </div>

        </div>
      </section>

    </main>
  );
}