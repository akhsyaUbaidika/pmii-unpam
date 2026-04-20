import { notFound } from "next/navigation";
import { headers } from "next/headers";
import BackButton from "@/components/BackButton";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

type Documentation = {
  id: number;
  title: string;
  content: string;
  coverImage: string;
  slug: string;
  images: {
    id: number;
    imageUrl: string;
  }[];
};

async function getDoc(slug: string): Promise<Documentation | null> {
  try {
    const host = (await headers()).get("host");

    if (!host) {
      console.error("Host tidak ditemukan");
      return null;
    }

    const res = await fetch(`https://${host}/api/documentations/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Fetch doc gagal:", res.status);
      return null;
    }

    return res.json();
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
}

export default async function DetailDokumentasi({ params }: Props) {
  const { slug } = await params; // 🔥 WAJIB

  console.log("SLUG DOC:", slug);

  if (!slug) {
    console.error("Slug undefined!");
    return notFound();
  }

  const doc = await getDoc(slug);

  if (!doc) return notFound();

  return (
    <main className="bg-white pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6">

        <BackButton />

        <img
          src={
            doc.coverImage && doc.coverImage.startsWith("http")
              ? doc.coverImage
              : "/placeholder.jpg"
          }
          className="rounded-2xl mb-8 w-full"
          alt={doc.title}
        />

        <h1 className="text-4xl font-bold">
          {doc.title}
        </h1>

        <p className="mt-6 whitespace-pre-line text-gray-700">
          {doc.content}
        </p>

        {doc.images?.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mt-10 mb-6">
              Galeri Kegiatan
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {doc.images.map((img) => (
                <img
                  key={img.id}
                  src={
                    img.imageUrl && img.imageUrl.startsWith("http")
                      ? img.imageUrl
                      : "/placeholder.jpg"
                  }
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