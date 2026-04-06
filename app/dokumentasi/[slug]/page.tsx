import { notFound } from "next/navigation";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

type Props = {
  params: { slug: string };
};

async function getDoc(slug: string) {
  try {
    const host = (await headers()).get("host");

    const res = await fetch(`https://${host}/api/documentations/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    return res.json();
  } catch {
    return null;
  }
}

export default async function DetailDokumentasi({ params }: Props) {
  const doc = await getDoc(params.slug);

  if (!doc) return notFound();

  return (
    <main className="bg-white pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6">

        <img
          src={doc.coverImage || "/placeholder.jpg"}
          className="rounded-2xl mb-8 w-full"
        />

        <h1 className="text-4xl font-bold">{doc.title}</h1>

        <p className="mt-6 whitespace-pre-line">
          {doc.content}
        </p>

        {doc.images?.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {doc.images.map((img: any) => (
              <img
                key={img.id}
                src={img.imageUrl || "/placeholder.jpg"}
                className="rounded-xl"
              />
            ))}
          </div>
        )}

      </div>
    </main>
  );
}