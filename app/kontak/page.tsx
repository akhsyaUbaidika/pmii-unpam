export default function KontakPage() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-extrabold">
            Kontak Kami
          </h1>
          <p className="mt-4 text-gray-600">
            Hubungi sekretariat PMII Komisariat Universitas Pamulang
            untuk informasi kegiatan, kaderisasi, dan kolaborasi.
          </p>
        </div>

        {/* CONTACT CARD */}
        <div className="mt-16 bg-white rounded-3xl shadow-xl p-10 grid md:grid-cols-2 gap-10">

          {/* LEFT INFO */}
          <div className="space-y-6">

            <div>
              <h3 className="font-bold text-xl text-blue-700">
                Sekretariat PMII UNPAM
              </h3>
              <p className="mt-2 text-gray-600">
                Pamulang, Jl. Pajajaran, Pamulang Bar.,  
                Kec. Pamulang, Kota Tangerang Selatan,  
                Banten 15417
              </p>
            </div>

            <div>
              <h4 className="font-semibold">Google Maps</h4>
              <a 
                href="https://maps.app.goo.gl/tjQuJptgUjvGmWdJA"
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                Buka di Google Maps →
              </a>
            </div>

            <div>
              <h4 className="font-semibold">Email</h4>
              <p className="text-gray-600">
                pmiiunpam@gmail.com
              </p>
            </div>

            <div>
              <h4 className="font-semibold">WhatsApp</h4>
              <p className="text-gray-600">
                +62 xxxx xxxx xxxx
              </p>
            </div>

          </div>

          {/* RIGHT MAP EMBED */}
          <div className="rounded-2xl overflow-hidden shadow">
            {/* <iframe
              src="https://maps.google.com/maps?q=pamulang&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="350"
              loading="lazy"
            /> */}
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d495.6783071326537!2d106.73812197166842!3d-6.338771010103707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ef5deac0b715%3A0xbc3b4ccb3d11e6aa!2sSekretariat%20PMII%20Unpam!5e0!3m2!1sid!2sid!4v1770736950525!5m2!1sid!2sid" 
                width="100%"
                height="350"
                loading="lazy"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
