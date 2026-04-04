const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.NEXT_PUBLIC_BASE_URL || "https://pmiiunpam.netlify.app";

async function getArticles() {
  const res = await fetch(`${baseUrl}/api/articles`, {
    cache: "no-store",
  });

  if (!res.ok) return [];
  return res.json();
}

async function getDocs() {
  const res = await fetch(`${baseUrl}/api/documentations`, {
    cache: "no-store",
  });

  if (!res.ok) return [];
  return res.json();
}

export default async function HomePage() {
  let articles = [];
  let docs = [];

  try {
    articles = await getArticles();
    docs = await getDocs();
  } catch (err) {
    console.error("Fetch error:", err);
  }

  return (
    <main className="bg-gray-50 text-gray-900">

      {/* HERO */}
      <section className="bg-blue-700 text-white pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

          <div className="text-center md:text-left">
            <p className="font-semibold">
              Halo 👋 Selamat datang di laman resmi
            </p>

            <h2 className="text-4xl md:text-5xl font-extrabold mt-4 leading-tight">
              PMII Komisariat <br />
              Universitas Pamulang
            </h2>

            <p className="mt-4 text-blue-100">
              Rumah kaderisasi dan gerakan mahasiswa Islam.
            </p>

            <button className="mt-6 px-6 py-3 rounded-xl bg-yellow-400 text-black font-semibold">
              Daftar Oprec
            </button>
          </div>

          <div className="flex justify-center">
            <img
              src="https://picsum.photos/400"
              className="w-72"
            />
          </div>

        </div>
      </section>

      {/* VISI */}
      <section className="py-20 text-center">
        <h3 className="text-3xl font-bold">
          Rekonstruksi Pemikiran &{" "}
          <span className="text-blue-700">Ekosistem Arus Baru</span>
        </h3>

        <p className="mt-6 max-w-3xl mx-auto text-gray-600">
          Gerakan untuk kader progresif dan adaptif terhadap zaman.
        </p>
      </section>

      {/* ARTIKEL */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">

          <h3 className="text-3xl font-bold text-center">
            Artikel
          </h3>

          <div className="mt-10 grid md:grid-cols-3 gap-6">

            {articles.length === 0 && (
              <p className="col-span-3 text-center text-gray-500">
                Belum ada artikel
              </p>
            )}

            {articles.slice(0, 3).map((item: any) => (
              <div key={item.id} className="bg-white rounded-2xl shadow overflow-hidden">

                {item.image && (
                  <img
                    src={item.image}
                    className="h-44 w-full object-cover"
                  />
                )}

                <div className="p-5">
                  <h4 className="font-bold">{item.title}</h4>
                  <p className="text-sm text-gray-600 mt-2">
                    {item.excerpt}
                  </p>
                </div>

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* DOKUMENTASI */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">

          <h3 className="text-3xl font-bold">
            Dokumentasi
          </h3>

          <div className="mt-8 grid md:grid-cols-3 gap-6">

            {docs.length === 0 && (
              <p className="text-gray-500">
                Belum ada dokumentasi
              </p>
            )}

            {docs.slice(0, 3).map((doc: any) => (
              <div key={doc.id} className="rounded-xl overflow-hidden">
                <img
                  src={doc.coverImage}
                  className="w-full h-48 object-cover"
                />
              </div>
            ))}

          </div>

        </div>
      </section>

    </main>
  );
}