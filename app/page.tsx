export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="pb-20 bg-gradient-to-r from-blue-100 via-white to-blue-50">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center py-20">

          <div>
            <p className="text-blue-600 font-semibold">
              Selamat Datang di
            </p>

            <h2 className="text-5xl font-extrabold mt-4 leading-tight">
              PMII Komisariat <br />
              Universitas Pamulang
            </h2>

            <p className="mt-4 text-gray-600 text-lg">
              Bergerak dalam Ilmu, Berkhidmat untuk Bangsa
            </p>

            <button className="mt-6 px-6 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-500 font-semibold shadow">
              Daftar Oprec
            </button>
          </div>

          <div className="flex justify-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Logo_PMII.svg/512px-Logo_PMII.svg.png"
              alt="Logo PMII"
              className="w-72 drop-shadow-xl"
            />
          </div>

        </div>
      </section>
    </>
  );
}
