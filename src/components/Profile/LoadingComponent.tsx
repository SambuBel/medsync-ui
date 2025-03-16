"use client";

import { motion } from "framer-motion";
import { FaCog } from "react-icons/fa";

const LoadingComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-gray-700">
      {/* 🔹 Animación de la tuerca */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="mb-4"
      >
        <FaCog className="text-sky-500 text-5xl" />
      </motion.div>

      {/* 🔹 Mensaje */}
      <h2 className="text-xl font-semibold">Estamos preparando todo para ti...</h2>
      <p className="text-gray-500 mt-2 text-center px-6 max-w-md">
        Organizando tu perfil para que puedas gestionar tus citas, 
        sacar turnos fácilmente y mantener el control de tus actividades. 
      </p>
    </div>
  );
};

export default LoadingComponent;
