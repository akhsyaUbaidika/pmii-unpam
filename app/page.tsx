export default function HomePage() {
  return (
    <main className="bg-gray-50 text-gray-900">

      {/* ================= HERO ================= */}
      <section className="pt-28 pb-20 bg-gradient-to-r from-blue-100 via-white to-blue-50">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center py-16">

          <div>
            <p className="text-blue-600 font-semibold">
              Halo 👋 Selamat datang di laman resmi
            </p>

            <h2 className="text-5xl font-extrabold mt-4 leading-tight">
              PMII Komisariat <br />
              Universitas Pamulang
            </h2>

            <p className="mt-4 text-gray-600">
              Berdiri sebagai rumah kaderisasi dan gerakan mahasiswa Islam di UNPAM.
            </p>

            <button className="mt-6 px-6 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black font-semibold shadow">
              Daftar Oprec
            </button>
          </div>

          <div className="flex justify-center">
            <img
              src="https://pmii-unpam.onrender.com/uploads/1771093408127.png"
              alt="Logo PMII"
              className="w-72 drop-shadow-xl"
            />
          </div>

        </div>
      </section>

      {/* ================= VISI SECTION ================= */}
      <section className="py-20 text-center">
        <h3 className="text-3xl font-bold">
          Rekonstruksi Pemikiran &{" "}
          <span className="text-blue-700">Ekosistem Arus Baru</span>
        </h3>

        <p className="mt-6 max-w-3xl mx-auto text-gray-600 leading-relaxed">
          Gerakan ini bertujuan untuk membangun kesadaran kolektif kader agar
          progresif, kolaboratif, dan adaptif terhadap tantangan zaman.
          PMII Komisariat Universitas Pamulang berkomitmen menjadi garda
          terdepan dalam merespons isu kebangsaan.
        </p>
      </section>

      {/* ================= NILAI PMII ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

          <div>
            <h3 className="text-3xl font-bold">
              Dzikir, Fikir, <br /> Amal Shaleh
            </h3>

            <p className="mt-4 text-gray-600">
              Setiap kader PMII harus senantiasa mengingat Allah (dzikir),
              berpikir kritis (fikir), dan memberi manfaat nyata (amal shaleh).
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-8">
            <h4 className="text-xl font-bold text-blue-700">
              Mau jadi bagian dari PMII?
            </h4>

            <p className="mt-3 text-gray-600 text-sm">
              Belajar kepemimpinan, kontribusi sosial, dan menjadi agen perubahan.
            </p>

            <button className="mt-6 px-6 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
              Gabung Sekarang
            </button>
          </div>
        </div>
      </section>

      {/* ================= ARTIKEL ================= */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">

          <h3 className="text-3xl font-bold text-center">
            Artikel
          </h3>

          <p className="text-center text-gray-500 mt-2">
            Baca sekarang!
          </p>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
              >
                <div className="h-44 bg-gray-200"></div>

                <div className="p-5">
                  <h4 className="font-bold">Judul Artikel {i}</h4>

                  <p className="text-sm text-gray-600 mt-2">
                    Preview artikel PMII UNPAM.
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= DOKUMENTASI ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">

          <h3 className="text-3xl font-bold">
            Dokumentasi
          </h3>

          <p className="mt-2 text-gray-600">
            Arsip kegiatan PMII UNPAM.
          </p>

          <div className="mt-8 h-72 rounded-2xl bg-blue-700 flex items-center justify-center text-white text-xl font-semibold">
            Slider Dokumentasi (Coming Soon)
          </div>

        </div>
      </section>

    </main>
  );
}