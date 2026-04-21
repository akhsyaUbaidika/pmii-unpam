import { notFound } from "next/navigation";
import { headers } from "next/headers";
import BackButton from "@/components/BackButton";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

type Article = {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  slug: string;
  authorName: string;
  publishedAt: string;
};

async function getArticle(slug: string): Promise<Article | null> {
  try {
    const host = (await headers()).get("host");

    if (!host) {
      console.error("Host tidak ditemukan");
      return null;
    }

    const res = await fetch(`https://${host}/api/articles/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Fetch article gagal:", res.status);
      return null;
    }

    return res.json();
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
}

export default async function DetailArtikel({ params }: Props) {
  const { slug } = await params; // 🔥 WAJIB karena Promise

  console.log("SLUG:", slug);

  if (!slug) {
    console.error("Slug undefined!");
    return notFound();
  }

  const article = await getArticle(slug);

  if (!article) return notFound();

  return (
    <main className="bg-white pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6">

        <BackButton />

        <img
          src={
            article.image && article.image.startsWith("http")
              ? article.image
              : "/placeholder.jpg"
          }
          className="rounded-2xl mb-8 w-full"
          alt={article.title}
        />

        <h1 className="text-4xl font-bold">
          {article.title}
        </h1>
        <h2 className="text-3xl text-gray-500 mt-2">
          {article.excerpt}
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Oleh {article.authorName} •{" "}
          {new Date(article.publishedAt).toLocaleDateString("id-ID")}
        </p>

        <div className="mt-4">
          <span className="bg-yellow-400 px-3 py-1 rounded-full text-xs font-semibold">
            {article.category}
          </span>
        </div>

        <article className="mt-8 text-gray-700 whitespace-pre-line">
          {article.content}
        </article>

      </div>
    </main>
  );
}