import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DokumentasiPage() {
  const docs = await prisma.documentation.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="bg-gray-50 min-h-screen pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        
        <h1 className="text-4xl font-bold text-blue-700">
          Dokumentasi
        </h1>
        <p className="mt-2 text-gray-600">
          Arsip kegiatan PMII Komisariat Universitas Pamulang
        </p>

        {/* GRID */}
        <div className="mt-10 grid md:grid-cols-3 gap-8">
          {docs.map((doc) => (
            <a
              key={doc.id}
              href={`/dokumentasi/${doc.slug}`}
              className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
            >
              <img
                src={doc.coverImage}
                className="h-48 w-full object-cover"
              />

              <div className="p-5">
                <h3 className="font-bold text-lg">
                  {doc.title}
                </h3>

                <p className="text-sm text-gray-600 mt-2">
                  {doc.excerpt}
                </p>
              </div>
            </a>
          ))}
        </div>

      </div>
    </main>
  );
}
