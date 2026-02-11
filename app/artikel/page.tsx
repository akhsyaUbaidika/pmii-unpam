import prisma from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

type Article = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  slug: string;
};

export default async function ArtikelPage() {
  // 🔥 langsung query database (bukan fetch API)
  const articles: Article[] = await prisma.article.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center">Artikel</h1>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {articles.map((item) => (
            <Link
              key={item.id}
              href={`/artikel/${item.slug}`}
              className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden block"
            >
              <img
                src={item.image}
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
                  {item.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
