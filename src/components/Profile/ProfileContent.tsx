"use client";
import { useEffect, useState } from "react";
import {
  FaNewspaper,
} from "react-icons/fa";
import ProfileAppointments from "./Appointments";
import Prescriptions from "./Prescriptions";
import Interconsults from "./Interconsults";
import ControlAnalysis from "./ControlAnalysis";
import PhysicalFitness from "./PhysicalFitness";
import NewsCarousel from "./NewsCarousel";

const ProfileContent = ({ activeTab, setActiveTab, user, appointments, setViewAppointments }) => {
  const [welcomeMessage, setWelcomeMessage] = useState("");

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) setWelcomeMessage("¡Buenos días!");
    else if (currentHour < 18) setWelcomeMessage("¡Buenas tardes!");
    else setWelcomeMessage("¡Buenas noches!");
  }, []);

  return (
    <div className="flex-1 p-6 w-full bg-white">
      {/* 🔹 Sección de INICIO */}
      {activeTab === "home" && (
        <>
          <div className="bg-white p-6 flex justify-between border-b">
            <div>
              <h3 className="text-3xl font-bold text-gray-800">{welcomeMessage} {user?.name} 👋</h3>
              <p className="text-gray-600 mt-2">
                Bienvenido/a a tu espacio de salud digital. Aquí puedes gestionar turnos, recetas, análisis y más.
              </p>
            </div>
            <div className="avatar">
              <div className="w-24 rounded-full border">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
          </div>
          {/* 🔹 Carrusel de novedades */}
          <NewsCarousel />
        </>
      )}

      {/* 🔹 Sección de TURNOS */}
      {activeTab === "appointments" && (
        <ProfileAppointments appointments={appointments} setViewAppointments={setViewAppointments} />
      )}

      {/* 🔹 Sección de RECETAS */}
      {activeTab === "prescriptions" && (
        <Prescriptions />
      )}

      {/* 🔹 Sección de INTERCONSULTAS */}
      {activeTab === "interconsults" && (
        <Interconsults />
      )}

      {/* 🔹 Sección de ANÁLISIS */}
      {activeTab === "tests" && (
        <ControlAnalysis />
      )}

      {/* 🔹 Sección de APTITUD FÍSICA */}
      {activeTab === "aptitude" && (
        <PhysicalFitness />
      )}
    </div>
  );
};

export default ProfileContent;
