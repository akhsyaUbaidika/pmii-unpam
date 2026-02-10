export default function HomePage() {
  return (
    <main className="bg-white text-gray-900">

      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-blue-700 text-white">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">

          <h1 className="font-bold text-lg">
            PMII UNPAM
          </h1>

          <div className="flex gap-6 text-sm font-medium">
            <a href="#" className="hover:text-yellow-300">Beranda</a>
            <a href="#" className="hover:text-yellow-300">Profil</a>
            <a href="#" className="hover:text-yellow-300">Artikel</a>
            <a href="#" className="hover:text-yellow-300">Dokumentasi</a>
            <a href="#" className="hover:text-yellow-300">Kontak</a>
          </div>

        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="pt-28 bg-blue-700 text-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center py-20">

          {/* Left */}
          <div>
            <p className="text-yellow-300 font-semibold">
              Halo 👋 Selamat datang di laman resmi
            </p>

            <h2 className="text-5xl font-extrabold mt-4 leading-tight">
              PMII Komisariat <br />
              Universitas Pamulang
            </h2>

            <p className="mt-4 text-blue-100">
              Berdiri sebagai rumah kaderisasi dan gerakan mahasiswa Islam di UNPAM.
            </p>
          </div>

          {/* Right */}
          <div className="flex justify-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Logo_PMII.svg/512px-Logo_PMII.svg.png"
              alt="Logo PMII"
              className="w-64 drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg
            viewBox="0 0 1440 120"
            className="w-full h-[120px]"
            preserveAspectRatio="none"
          >
            <path
              fill="white"
              d="M0,64L80,74.7C160,85,320,107,480,101.3C640,96,800,64,960,53.3C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            />
          </svg>
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
          senantiasa progresif, kolaboratif, dan adaptif terhadap tantangan zaman.
          PMII Komisariat Universitas Pamulang berkomitmen untuk terus menjadi
          garda terdepan dalam merespons isu kebangsaan serta memberikan
          sumbangsih pemikiran yang relevan.
        </p>
      </section>

      {/* ================= NILAI PMII ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

          {/* Left */}
          <div>
            <h3 className="text-3xl font-bold">
              Dzikir, Fikir, <br /> Amal Shaleh
            </h3>

            <p className="mt-4 text-gray-600">
              Setiap kader PMII harus senantiasa mengingat Allah (dzikir),
              berpikir secara kritis (fikir), serta melakukan perbuatan baik dan
              bermanfaat (amal shaleh).
            </p>
          </div>

          {/* Right CTA */}
          <div className="bg-white shadow-lg rounded-2xl p-8">
            <h4 className="text-xl font-bold text-blue-700">
              Mau jadi bagian dari PMII?
            </h4>

            <p className="mt-3 text-gray-600 text-sm">
              Di PMII, kamu akan belajar kepemimpinan, kontribusi nyata untuk
              masyarakat, dan menjadi agen perubahan berlandaskan nilai Islam dan
              kebangsaan.
            </p>

            <button className="mt-6 px-6 py-3 rounded-xl bg-pink-600 text-white hover:bg-pink-700">
              Gabung Sekarang!
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

            {[
              "RUU Perampasan Aset",
              "Kegagalan Reformasi",
              "Seruan 'Bubarkan DPR'",
            ].map((title, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
              >
                <div className="h-44 bg-gray-200"></div>

                <div className="p-5">
                  <h4 className="font-bold">{title}</h4>
                  <p className="text-sm text-gray-600 mt-2">
                    Ini adalah preview singkat artikel opini PMII UNPAM.
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
            Arsip visual dari kegiatan PMII Komisariat Universitas Pamulang.
          </p>

          <div className="mt-8 h-72 rounded-2xl bg-blue-900 flex items-center justify-center text-white text-xl font-semibold">
            Slider Dokumentasi (Coming Soon)
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">

          {/* Left */}
          <div>
            <h3 className="text-4xl font-extrabold">
              PMII <br /> UNPAM
            </h3>
            <p className="mt-4 text-gray-400">
              Salam Pergerakan!
            </p>
          </div>

          {/* Menu */}
          <div>
            <h4 className="text-2xl font-bold">
              Menu
            </h4>

            <ul className="mt-4 space-y-2 text-gray-300 text-sm">
              <li>Beranda</li>
              <li>Profil</li>
              <li>Artikel</li>
              <li>Dokumentasi</li>
              <li>Oprec</li>
              <li>Kontak</li>
            </ul>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-12">
          © 2026 PMII Komisariat Universitas Pamulang. All Rights Reserved.
        </p>
      </footer>

    </main>
  );
}
