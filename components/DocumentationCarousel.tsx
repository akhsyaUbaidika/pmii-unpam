"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";

export default function DocumentationCarousel({ docs }: any) {
  return (
    <section className="relative">
      <Swiper loop autoplay={{ delay: 4000 }}>
        {docs.map((doc: any) => (
          <SwiperSlide key={doc.id}>
            <div className="relative h-[70vh]">

              <img
                src={doc.coverImage}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/60" />

              <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-6">

                <h2 className="text-3xl md:text-5xl font-bold">
                  Dokumentasi Kegiatan
                </h2>

                <Link href={`/dokumentasi/${doc.slug}`}>
                  <button className="mt-6 px-6 py-3 border border-white rounded-lg">
                    Lihat Selengkapnya
                  </button>
                </Link>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}