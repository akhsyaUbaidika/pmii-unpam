export default function SejarahPage() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* TEXT */}
        <div>
          <h1 className="text-4xl font-extrabold leading-tight">
            Pergerakan Mahasiswa <br />
            Islam <span className="text-blue-700">Indonesia</span>
          </h1>

          <p className="mt-6 text-gray-600 leading-relaxed">
            PMII merupakan organisasi gerakan dan kaderisasi yang 
            berlandaskan Islam Ahlussunnah Wal Jamaah. Berdiri sejak 
            17 April 1960 di Surabaya dan hingga kini eksis memberikan 
            kontribusi bagi kemajuan bangsa dan negara.
          </p>

          <p className="mt-4 text-gray-600 leading-relaxed">
            PMII Komisariat Universitas Pamulang lahir dari kebutuhan 
            mahasiswa Nahdliyin di lingkungan kampus sebagai wadah 
            kaderisasi, intelektual, dan pengabdian masyarakat.
          </p>
        </div>

        {/* GAMBAR */}
        <div className="flex justify-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Logo_PMII.svg/512px-Logo_PMII.svg.png"
            className="w-72 drop-shadow-xl"
          />
        </div>

      </div>
    </section>
  );
}
