import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-gray-800 dark:text-white py-12">
      <div className="container mx-auto grid md:grid-cols-3 gap-8 px-6">
        {/* Logo y descripción */}
        <div>
          <h2 className="text-2xl font-bold text-primary">MedSync</h2>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            Tu plataforma confiable para la gestión de turnos médicos. Fácil, rápido y seguro.
          </p>
        </div>

        {/* Enlaces rápidos */}
        <div>
          <h4 className="text-lg font-semibold">Enlaces</h4>
          <ul className="mt-3 space-y-2">
            <li><a href="#" className="hover:text-primary">Inicio</a></li>
            <li><a href="#" className="hover:text-primary">Servicios</a></li>
            <li><a href="#" className="hover:text-primary">Testimoniales</a></li>
            <li><a href="#" className="hover:text-primary">Contacto</a></li>
          </ul>
        </div>

        {/* Redes Sociales */}
        <div>
          <h4 className="text-lg font-semibold">Síguenos</h4>
          <div className="flex gap-4 mt-3">
            <a href="#" className="text-xl hover:text-primary"><FaFacebook /></a>
            <a href="#" className="text-xl hover:text-primary"><FaInstagram /></a>
            <a href="#" className="text-xl hover:text-primary"><FaTwitter /></a>
            <a href="#" className="text-xl hover:text-primary"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-300 pt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        &copy; {new Date().getFullYear()} MedSync - Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
