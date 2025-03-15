"use client"
import { useState } from "react";
import { FaWhatsapp, FaTimes } from "react-icons/fa";

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed z-100 bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all"
      >
        <FaWhatsapp size={24} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center relative">
            <button onClick={() => setIsOpen(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
              <FaTimes size={18} />
            </button>
            <h2 className="text-xl font-semibold text-gray-800">¿Necesitas ayuda?</h2>
            <p className="text-gray-600 mt-2">Escríbenos por WhatsApp y responderemos de inmediato.</p>
            <a
              href="https://wa.me/541166049235?text=Hola%2C+quiero+más+información."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-4 flex items-center gap-2"
            >
              <FaWhatsapp size={20} />
              Abrir WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  );
}
