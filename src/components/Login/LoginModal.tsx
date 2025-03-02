"use client";

import React, { useEffect } from "react";
import { FaTimes, FaEnvelope, FaLock } from "react-icons/fa";

const LoginModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Bloquea el scroll
    } else {
      document.body.style.overflow = "auto"; // Restaura el scroll
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100] h-screen"
      onClick={onClose}
    >
      <div
        className="modal-box relative w-96 bg-white rounded-lg shadow-xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition" 
          onClick={onClose}
        >
          <FaTimes size={18} />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 text-center">Iniciar Sesión</h2>
        <p className="text-gray-500 text-sm text-center mt-2">
          Ingresa tus credenciales para continuar
        </p>

        <form className="mt-6 space-y-4">
          <div className="form-control">
            <label className="input input-bordered flex items-center gap-2">
              <FaEnvelope className="text-gray-500" />
              <input type="email" placeholder="Correo Electrónico" className="grow" required />
            </label>
          </div>

          <div className="form-control">
            <label className="input input-bordered flex items-center gap-2">
              <FaLock className="text-gray-500" />
              <input type="password" placeholder="Contraseña" className="grow" required />
            </label>
          </div>

          <button className="btn btn-primary w-full mt-2 text-white hover:bg-blue-600">
            Iniciar Sesión
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          ¿Olvidaste tu contraseña?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Recuperar acceso
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
