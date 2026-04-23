"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import Image from "next/image";

export default function DocumentationCarousel({ docs }: any) {
  return (
    <section className="relative w-full">
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        navigation
        pagination={{ clickable: true }}
        loop
        autoplay={{ delay: 4000 }}
      >
        {docs.map((doc: any) => (
          <SwiperSlide key={doc.id}>
            <div className="relative h-[70vh]">

              {/* <img
                src={doc.coverImage}
                className="w-full h-full object-cover"
              /> */}

              <Image
                src={doc.coverImage}
                alt="Dokumentasi"
                fill
                className="object-cover"
                priority={doc.id === docs[0]?.id}
              />

              <div className="absolute inset-0 bg-black/60 pointer-events-none" />

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