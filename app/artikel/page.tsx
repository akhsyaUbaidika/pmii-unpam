import Link from "next/link";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

type Article = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  slug: string;
};

async function getArticles(): Promise<Article[]> {
  try {
    // 🔥 ambil host dari request
    const host = (await headers()).get("host");

    const res = await fetch(`https://${host}/api/articles`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Fetch gagal:", res.status);
      return [];
    }

    return res.json();
  } catch (err) {
    console.error("Error fetch:", err);
    return [];
  }
}

export default async function ArtikelPage() {
  const articles = await getArticles();

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center">Artikel</h1>

        {articles.length === 0 ? (
          <p className="text-center mt-10 text-gray-500">
            Belum ada artikel.
          </p>
        ) : (
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {articles.map((item) => (
              <Link
                key={item.id}
                href={`/artikel/${item.slug}`}
                className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden block"
              >
                <img
                  src={
                    item.image && item.image.startsWith("http")
                      ? item.image
                      : "/placeholder.jpg"
                  }
                  className="h-48 w-full object-cover"
                  alt={item.title}
                />

                <div className="p-5">
                  <span className="text-xs bg-yellow-400 px-3 py-1 rounded-full font-semibold">
                    {item.category}
                  </span>

                  <h3 className="mt-3 font-bold text-lg">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-600 mt-2">
                    {item.excerpt || "Tidak ada deskripsi"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}