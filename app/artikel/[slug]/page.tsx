import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function DetailArtikel({ params }: Props) {
  const { slug } = await params;

  const article = await prisma.article.findUnique({
    where: { slug },
  });

  if (!article) return notFound();

  return (
    <main className="bg-white pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6">

        {/* COVER IMAGE */}
        <img
          src={article.image}
          className="rounded-2xl mb-8 w-full"
        />

        {/* TITLE */}
        <h1 className="text-4xl font-bold leading-tight">
          {article.title}
        </h1>

        {/* CATEGORY BADGE */}
        <div className="mt-4">
          <span className="bg-yellow-400 text-black text-xs px-3 py-1 rounded-full font-semibold">
            {article.category}
          </span>
        </div>

        {/* CONTENT */}
        <article className="mt-8 text-gray-700 leading-relaxed whitespace-pre-line text-lg">
          {article.content}
        </article>

      </div>
    </main>
  );
}
