"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const testimonials = [
  {
    name: "Dr. Juan Pérez",
    specialty: "Cardiólogo",
    comment:
      "Excelente servicio y atención. Recomiendo totalmente esta plataforma para gestionar mis turnos.",
    avatar: "/images/avatar1.jpg",
  },
  {
    name: "Dra. María González",
    specialty: "Dermatóloga",
    comment:
      "Facilita mi día a día permitiéndome concentrarme en mis pacientes en lugar de la administración.",
    avatar: "/images/avatar2.jpg",
  },
  {
    name: "Dr. Ricardo López",
    specialty: "Pediatra",
    comment:
      "Desde que uso esta plataforma, mis pacientes pueden reservar turnos fácilmente sin inconvenientes.",
    avatar: "/images/avatar3.jpg",
  },
  {
    name: "Dra. Ana Fernández",
    specialty: "Ginecóloga",
    comment:
      "Es una plataforma intuitiva y práctica, la mejor solución que he encontrado.",
    avatar: "/images/avatar4.jpg",
  },
  {
    name: "Dr. Martín Rodríguez",
    specialty: "Traumatólogo",
    comment:
      "Me ha permitido optimizar mis horarios y dar una mejor atención a mis pacientes.",
    avatar: "/images/avatar5.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="relative py-16 bg-gray-100 w-full">
      <div className="container mx-auto text-center relative">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Testimonios de Profesionales
        </h2>

        <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-gray-100 to-transparent z-10"></div>
        <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-gray-100 to-transparent z-10"></div>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={10}
          slidesPerView={1.3}
          breakpoints={{
            768: { slidesPerView: 2.2 },
            1024: { slidesPerView: 2.8 },
          }}
          centeredSlides={true}
          loop={true}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          speed={1200}
          className="w-full"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} className="opacity-80 hover:opacity-100 transition-opacity duration-300">
              <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-lg h-[320px]">
                <Image
                  src={testimonial.avatar}
                  width={80}
                  height={80}
                  className="rounded-full mb-4"
                  alt={testimonial.name}
                />
                <p className="text-gray-700 text-lg italic text-center h-[120px] flex items-center justify-center">
                  "{testimonial.comment}"
                </p>
                <h4 className="mt-4 text-lg font-semibold text-gray-900">
                  {testimonial.name}
                </h4>
                <span className="text-gray-500 text-sm">
                  {testimonial.specialty}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
