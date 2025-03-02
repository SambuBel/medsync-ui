import React from "react";
import { FaUserMd, FaStethoscope, FaRegHospital } from "react-icons/fa";

const services = [
  {
    icon: <FaUserMd className="text-5xl text-primary" />, // Icono de doctor
    title: "Consulta Médica Virtual",
    description: "Atención médica inmediata con especialistas en línea.",
  },
  {
    icon: <FaStethoscope className="text-5xl text-primary" />, // Icono de estetoscopio
    title: "Diagnóstico y Recetas",
    description: "Obtén un diagnóstico preciso y recetas médicas en minutos.",
  },
  {
    icon: <FaRegHospital className="text-5xl text-primary" />, // Icono de hospital
    title: "Emergencias 24/7",
    description: "Acceso a médicos y hospitales en cualquier momento del día.",
  },
];

const Services = () => {
  return (
    <section className="py-16 px-6 bg-gray-100">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Nuestros Servicios
        </h2>
        <p className="text-gray-600 mt-4">
          Brindamos atención médica de calidad con profesionales especializados.
        </p>
      </div>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <div key={index} className="bg-white p-6 shadow-lg rounded-lg text-center">
            <div className="mb-4 flex justify-center">{service.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800">
              {service.title}
            </h3>
            <p className="text-gray-600 mt-2">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
