export const metadata = {
  title: "Sejarah PMII",
  description: "Sejarah Berdirinya PMII",
  openGraph: {
    title: "Sejarah PMII",
    description: "Sejarah Berdirinya PMII",
    url: "https://pmiiunpam.com/profil/sejarah",
    images: [
      {
        url: "https://mpwjmwrybukmjvbpqufm.supabase.co/storage/v1/object/public/uploads/1776794780855.webp",
      },
    ],
  },
};

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
            src="https://mpwjmwrybukmjvbpqufm.supabase.co/storage/v1/object/public/uploads/1776857758133.webp"
            className="w-72 drop-shadow-xl"
          />
        </div>

      </div>
    </section>
  );
}
