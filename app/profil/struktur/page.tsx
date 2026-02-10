const pengurus = [
  { nama: "Ketua Komisariat", jabatan: "Ketua", ig: "#" },
  { nama: "Sekretaris", jabatan: "Sekretaris", ig: "#" },
  { nama: "Bendahara", jabatan: "Bendahara", ig: "#" },
  { nama: "Bidang Kaderisasi", jabatan: "Koordinator", ig: "#" },
  { nama: "Bidang Humas", jabatan: "Koordinator", ig: "#" },
  { nama: "Bidang Sosial", jabatan: "Koordinator", ig: "#" },
];

export default function StrukturPage() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-4xl font-bold text-center">
          Struktur Pengurus Komisariat
        </h1>

        <div className="mt-16 grid md:grid-cols-3 gap-8">

          {pengurus.map((p, i) => (
            <div key={i} className="relative group overflow-hidden rounded-2xl shadow">
              
              {/* FOTO DUMMY */}
              <div className="h-80 bg-gray-300"></div>

              {/* OVERLAY HOVER */}
              <div className="absolute inset-0 bg-blue-700/90 
                              flex flex-col items-center justify-center
                              text-white opacity-0 group-hover:opacity-100 
                              transition">

                <h3 className="text-xl font-bold">{p.nama}</h3>
                <p className="text-blue-200">{p.jabatan}</p>

                <a 
                  href={p.ig}
                  target="_blank"
                  className="mt-4 bg-white text-blue-700 px-4 py-2 rounded-full text-sm font-semibold"
                >
                  Instagram
                </a>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
