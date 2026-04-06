import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = {
  params: { slug: string };
};

async function getArticle(slug: string) {
  try {
    const res = await fetch(`/api/articles/${slug}`, {
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
    <div className="p-10">
      <h1>{article.title}</h1>
      <p>{article.content}</p>
    </div>
  );
}