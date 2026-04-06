import { notFound } from "next/navigation";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

type Article = {
  id: number;
  title: string;
  content: string;
  image: string;
  category: string;
  slug: string;
};

type Props = {
  params: { slug: string };
};

async function getArticle(slug: string): Promise<Article | null> {
  try {
    const host = (await headers()).get("host");

    const res = await fetch(`https://${host}/api/articles`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const articles: Article[] = await res.json();

    return articles.find((a) => a.slug === slug) || null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export default async function DetailArtikel({ params }: Props) {
  const article = await getArticle(params.slug);

  if (!article) return notFound();

  return (
    <main className="bg-white pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6">

        <img
          src={
            article.image && article.image.startsWith("http")
              ? article.image
              : "/placeholder.jpg"
          }
          className="rounded-2xl mb-8 w-full"
          alt={article.title}
        />

        <h1 className="text-4xl font-bold leading-tight">
          {article.title}
        </h1>

        <div className="mt-4">
          <span className="bg-yellow-400 text-black text-xs px-3 py-1 rounded-full font-semibold">
            {article.category}
          </span>
        </div>

        <article className="mt-8 text-gray-700 leading-relaxed whitespace-pre-line text-lg">
          {article.content || "Konten belum tersedia."}
        </article>

      </div>
    </main>
  );
}