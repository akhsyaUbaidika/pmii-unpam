import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function DetailDokumentasi({ params }: Props) {
  const { slug } = await params; // ← ini kunci penting

  const doc = await prisma.documentation.findUnique({
    where: { slug },
    include: { images: true },
  });

  if (!doc) return notFound();

  return (
    <main className="bg-white pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6">

        {/* COVER */}
        <img
          src={doc.coverImage}
          className="rounded-2xl mb-8 w-full"
        />

        <h1 className="text-4xl font-bold">{doc.title}</h1>

        <p className="mt-6 text-gray-700 leading-relaxed whitespace-pre-line">
          {doc.content}
        </p>

        {/* GALLERY */}
        {doc.images.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mt-12 mb-6">
              Galeri Kegiatan
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {doc.images.map((img) => (
                <img
                  key={img.id}
                  src={img.imageUrl}
                  className="rounded-xl"
                />
              ))}
            </div>
          </>
        )}

      </div>
    </main>
  );
}
