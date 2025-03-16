"use client";
import { useState } from "react";
import { FaNewspaper, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";

const images = [
  { src: "/images/propaganda-01.jpg", alt: "Vacunación", text: "La importancia de la vacunación para prevenir enfermedades." },
  { src: "/images/propaganda-02.jpg", alt: "Dengue", text: "Cómo prevenir el dengue en épocas de lluvias y calor." },
  { src: "/images/propaganda-03.jpg", alt: "Fiebre en niños", text: "Cuándo preocuparse por la fiebre en niños y qué hacer." },
];

const NewsCarousel = () => {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 2) % images.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 2 + images.length) % images.length);
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-500">
        <FaNewspaper className="text-blue-500" /> Novedades
      </h3>

      <div className="relative w-full overflow-hidden rounded-lg shadow-md bg-white mt-4">
        {/* 🔹 Carrusel con 2 imágenes por vista */}
        <motion.div
          className="flex transition-transform duration-500 ease-in-out"
          animate={{ x: `-${index * 50}%` }}
        >
          {images.map((img, i) => (
            <div key={i} className="w-1/2 flex-shrink-0 p-2">
              <div className="relative">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-[200px] object-cover rounded-lg"
                />
                <p className="absolute bottom-0 left-0 w-full bg-gray-800/75 text-white text-xs p-2 text-center rounded-b-lg">
                  {img.text}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* 🔹 Botones de navegación */}
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700"
          onClick={prevSlide}
        >
          <FaChevronLeft />
        </button>
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700"
          onClick={nextSlide}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default NewsCarousel;
