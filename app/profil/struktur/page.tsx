"use client";

const pengurus = [
  {
    nama: "M. Yusuf Febrio",
    jabatan: "Ketua Umum",
    ig: "#",
    img: "https://mpwjmwrybukmjvbpqufm.supabase.co/storage/v1/object/public/uploads/struktur1.webp",
  },
  {
    nama: "Muhana Aydin",
    jabatan: "Sekretaris Umum",
    ig: "#",
    img: "https://mpwjmwrybukmjvbpqufm.supabase.co/storage/v1/object/public/uploads/struktur2.webp",
  },
  {
    nama: "Adi Hidayat",
    jabatan: "Bendahara Umum",
    ig: "#",
    img: "https://mpwjmwrybukmjvbpqufm.supabase.co/storage/v1/object/public/uploads/struktur3.webp",
  },
  {
    nama: "Alis Lisnawati",
    jabatan: "Wakil Bendahara",
    ig: "#",
    img: "https://mpwjmwrybukmjvbpqufm.supabase.co/storage/v1/object/public/uploads/struktur4.webp",
  },
  {
    nama: "Fahmi AL-Ahyar",
    jabatan: "Ketua Bidang 1",
    ig: "#",
    img: "https://mpwjmwrybukmjvbpqufm.supabase.co/storage/v1/object/public/uploads/struktur5.webp",
  },
  {
    nama: "Haris",
    jabatan: "Ketua Bidang 2",
    ig: "#",
    img: "https://mpwjmwrybukmjvbpqufm.supabase.co/storage/v1/object/public/uploads/default-user.webp",
  },
  {
    nama: "Masyhuril Pranata",
    jabatan: "Ketua Bidang 3",
    ig: "#",
    img: "https://mpwjmwrybukmjvbpqufm.supabase.co/storage/v1/object/public/uploads/struktur7.webp",
  },
  {
    nama: "M. Nurul Faqih",
    jabatan: "Sekretaris Bidang 1",
    ig: "#",
    img: "https://mpwjmwrybukmjvbpqufm.supabase.co/storage/v1/object/public/uploads/struktur8.webp",
  },
  {
    nama: "Berliana Silvia",
    jabatan: "Sekretaris Bidang 2",
    ig: "#",
    img: "https://mpwjmwrybukmjvbpqufm.supabase.co/storage/v1/object/public/uploads/struktur9.webp",
  },
  {
    nama: "Muhamad Azharudin",
    jabatan: "Sekretaris Bidang 3",
    ig: "#",
    img: "https://mpwjmwrybukmjvbpqufm.supabase.co/storage/v1/object/public/uploads/struktur10.webp",
  },
  {
    nama: "Akhsya Ubaidika Elghozi",
    jabatan: "Kepala Biro Kaderisasi",
    ig: "#",
    img: "https://mpwjmwrybukmjvbpqufm.supabase.co/storage/v1/object/public/uploads/struktur11.webp",
  },
  {
    nama: "Hafizah Arasya",
    jabatan: "Kepala Biro KOMDIGI",
    ig: "#",
    img: "https://mpwjmwrybukmjvbpqufm.supabase.co/storage/v1/object/public/uploads/struktur12.webp",
  },
  {
    nama: "Hadriansyah",
    jabatan: "Kepala Biro Keagamaan",
    ig: "#",
    img: "https://mpwjmwrybukmjvbpqufm.supabase.co/storage/v1/object/public/uploads/default-user.webp",
  },
  {
    nama: "Akhmad Alvi Sahri",
    jabatan: "Kepala Biro K3",
    ig: "#",
    img: "https://mpwjmwrybukmjvbpqufm.supabase.co/storage/v1/object/public/uploads/default-user.webp",
  },
];

function Card({ p }: { p: any }) {
  return (
    <div
      onClick={() => console.log(p)}
      className="bg-white rounded-2xl shadow hover:shadow-lg hover:scale-[1.02] transition duration-300 cursor-pointer overflow-hidden"
    >
      {/* IMAGE */}
      <div className="w-full h-[260px] md:h-[280px] overflow-hidden">
        <img
          src={p.img || "/default-user.png"}
          alt={p.nama}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* TEXT */}
      <div className="p-4 text-center">
        <h3 className="font-semibold text-lg">{p.nama}</h3>
        <p className="text-gray-500 text-sm">{p.jabatan}</p>
      </div>
    </div>
  );
}

export default function StrukturPage() {
  const topRow = pengurus.slice(0, 4);
  const rest = pengurus.slice(4);

  return (
    <section className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6">

        <h1 className="text-4xl font-bold text-center">
          Struktur Pengurus Komisariat
        </h1>

        {/* ROW 1 - 4 CARD */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {topRow.map((p, i) => (
            <Card key={i} p={p} />
          ))}
        </div>

        {/* ROW NEXT - 3 CARD */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {rest.map((p, i) => (
            <Card key={i} p={p} />
          ))}
        </div>

      </div>
    </section>
  );
}