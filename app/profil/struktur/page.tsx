const pengurus = [
  { nama: "M. Yusuf Febrio", jabatan: "Ketua Umum", ig: "#", img:"https://mpwjmwrybukmjvbpqufm.supabase.co/storage/v1/object/public/uploads/aten.png"},
  { nama: "Adi Hidayat", jabatan: "Sekretaris Umum", ig: "#", img:"https://mpwjmwrybukmjvbpqufm.supabase.co/storage/v1/object/public/uploads/1775567857015.jpeg" },
  { nama: "Muhana Aydin", jabatan: "Bendahara Umum", ig: "#", img:"https://mpwjmwrybukmjvbpqufm.supabase.co/storage/v1/object/public/uploads/1775567867111.jpeg" },
  { nama: "Fahmi AL-Ahyar", jabatan: "Ketua Bidang 1", ig: "#", img:"https://mpwjmwrybukmjvbpqufm.supabase.co/storage/v1/object/public/uploads/1775567894028.jpeg" },
  { nama: "-", jabatan: "Ketua Bidang 2", ig: "#", img:"" },
  { nama: "Masyhuril Pranata", jabatan: "Ketua Bidang 3", ig: "#", img:"https://mpwjmwrybukmjvbpqufm.supabase.co/storage/v1/object/public/uploads/1775567907028.jpeg" },
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
              
              {/* FOTO */}
              <div className="h-80 overflow-hidden">
                {p.img ? (
                  <img 
                    src={p.img} 
                    alt={p.nama}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300"></div>
                )}
              </div>

              {/* OVERLAY HOVER */}
              <div 
                className="absolute inset-0 bg-blue-700/90 
                          flex flex-col items-center justify-center
                          text-white opacity-0 group-hover:opacity-100 
                          transition-opacity duration-300"
              >

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
