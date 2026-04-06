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

    const res = await fetch(`https://${host}/api/articles/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    return res.json();
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
          src={article.image || "/placeholder.jpg"}
          className="rounded-2xl mb-8 w-full"
        />

        <h1 className="text-4xl font-bold">
          {article.title}
        </h1>

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