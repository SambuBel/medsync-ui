"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { FaUserCircle, FaFileAlt } from "react-icons/fa";

const iconAnimation = {
  initial: { y: 0 },
  animate: {
    y: [0, -25, 0],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    },
  },
};

const QuoteRequest = () => {
  return (
    <section className="container flex flex-col lg:flex-row items-center justify-center gap-12 py-16 relative px-12">
      <div className="relative w-full lg:w-1/2 flex justify-center">
        <div className="relative w-auto h-auto  rounded-xl">
          <Image
            src="/images/contact.jpg"
            alt="Consulta médica"
            width={380}
            height={380}
            className="rounded-lg object-cover overflow-hidden shadow-lg"
          />
        </div>

        <motion.div
          className="absolute top-[20px] left-[60px] text-cyan-400 text-7xl"
          variants={iconAnimation as Variants}
          initial="initial"
          animate="animate"
        >
          <FaUserCircle />
        </motion.div>

        <motion.div
          className="absolute bottom-[50px] right-12 text-cyan-400 text-7xl"
          variants={iconAnimation as Variants}
          initial="initial"
          animate="animate"
        >
          <FaFileAlt />
        </motion.div>
      </div>

      <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
        <span className="badge badge-success text-white text-sm px-4 py-2 rounded-full">
          Atención personalizada
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          ¿Necesitas información sobre nuestros planes?
        </h2>
        <p className="text-gray-700">
          Déjanos tus datos y un asesor te contactará para resolver tus dudas y
          ofrecerte la mejor opción.
        </p>

        {/* 📄 Formulario */}
        <div className="bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-xl border border-gray-200">
          <h3 className="text-gray-800 text-lg font-semibold mb-4">
            Solicita más información
          </h3>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Nombre completo"
              className="input input-bordered w-full bg-gray-100 text-gray-800 placeholder-opacity-75 focus:ring-2 focus:ring-cyan-400"
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              className="input input-bordered w-full bg-gray-100 text-gray-800 placeholder-opacity-75 focus:ring-2 focus:ring-cyan-400"
            />
            <input
              type="tel"
              placeholder="Teléfono"
              className="input input-bordered w-full bg-gray-100 text-gray-800 placeholder-opacity-75 focus:ring-2 focus:ring-cyan-400"
            />
            <textarea
              placeholder="¿En qué podemos ayudarte?"
              className="textarea textarea-bordered w-full bg-gray-100 text-gray-800 placeholder-opacity-75 focus:ring-2 focus:ring-cyan-400"
            ></textarea>
          </div>

          <label className="flex items-center text-gray-700 text-sm gap-2 mt-4">
            <input type="checkbox" className="checkbox checkbox-sm" /> Acepto los
            términos y la política de privacidad.
          </label>

          <button className="btn btn-primary w-full mt-4 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold transition-all duration-300">
            Solicitar Información
          </button>
        </div>
      </div>
    </section>
  );
};

export default QuoteRequest;
