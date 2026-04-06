import Link from "next/link";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

type Documentation = {
  id: number;
  title: string;
  excerpt: string;
  coverImage: string;
  slug: string;
};

async function getDocs(): Promise<Documentation[]> {
  try {
    const host = (await headers()).get("host");

    const res = await fetch(`https://${host}/api/documentations`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch documentations:", res.status);
      return [];
    }

    return res.json();
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
}

export default async function DokumentasiPage() {
  const docs = await getDocs();

  return (
    <main className="bg-gray-50 min-h-screen pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* HEADER */}
        <h1 className="text-4xl font-bold text-blue-700">
          Dokumentasi
        </h1>

        <p className="mt-2 text-gray-600">
          Arsip kegiatan PMII Komisariat Universitas Pamulang
        </p>

        {/* EMPTY STATE */}
        {docs.length === 0 ? (
          <p className="text-center mt-10 text-gray-500">
            Belum ada dokumentasi.
          </p>
        ) : (
          /* GRID */
          <div className="mt-10 grid md:grid-cols-3 gap-8">
            {docs.map((doc) => (
              <Link
                key={doc.id}
                href={`/dokumentasi/${doc.slug}`}
                className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
              >
                {/* IMAGE */}
                <img
                  src={
                    doc.coverImage && doc.coverImage.startsWith("http")
                      ? doc.coverImage
                      : "/placeholder.jpg"
                  }
                  className="h-48 w-full object-cover"
                  alt={doc.title}
                />

                {/* CONTENT */}
                <div className="p-5">
                  <h3 className="font-bold text-lg">
                    {doc.title}
                  </h3>

                  <p className="text-sm text-gray-600 mt-2">
                    {doc.excerpt || "Tidak ada deskripsi"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}