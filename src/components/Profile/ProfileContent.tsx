import { useEffect } from "react";
import ProfileAppointments from "./Appointments";
import ControlAnalysis from "./ControlAnalysis";
import NewsCarousel from "./NewsCarousel";
import PhysicalFitness from "./PhysicalFitness";
import Prescriptions from "./Prescriptions";
import ProfileAvatar from "./ProfileAvatar";
import ProfilePersonalData, { Doctor, User } from "./ProfilePersonalData";
import MakeAppointment from "./MakeAppointment";
import GuardiaPage from "../GuardiaPage";
import { isTimeForAppointment } from "./utils/isTimeForAppointmen";
import GuardiaFormPage from "../Guardia/GuardiaFormPage";

interface Appointment {
  id: string;
  date: string;
  doctor: Doctor;
  status: 'CANCELED' | 'PENDING'
}

interface ProfileContentProps {
  activeTab: string;
  user: User;
  setUser: (user: User) => void;
  setActiveTab: (tab: string) => void;
  appointments: Appointment[];
}

const ProfileContent = ({ activeTab, setActiveTab, user, setUser, appointments } : ProfileContentProps) => {

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  return (
    <div className="flex-1 p-6 w-full bg-white">
      {/* 🔹 Sección de INICIO */}
      {activeTab === "home" && (
        <>
          <div className="bg-white p-6 flex justify-between border-b">
            <div>
              <h3 className="text-3xl font-bold text-gray-800">¡Bienvenido, {user?.name}! 👋</h3>
              <p className="text-gray-600 mt-2">Aquí puedes gestionar turnos, recetas y más.</p>
            </div>
            {/* 🔹 Avatar DaisyUI */}
            <ProfileAvatar profileImage={user?.profileImage?.url} setUser={setUser} />
          </div>
          {appointments.some(a =>
            isTimeForAppointment(a.date) && a.status !== "CANCELED"
          ) && (
            <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded mb-4 text-green-900">
              <p className="text-md font-semibold">🩺 Tienes una consulta en breve</p>
              <button
                onClick={() => setActiveTab("emergency")}
                className="mt-2 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Ingresar ahora
              </button>
            </div>
          )}
          <NewsCarousel />
        </>
      )}

      {/* 🔹 Nueva Sección de Datos Personales */}
      {activeTab === "personalData-info" && <ProfilePersonalData user={user} />}

      {/* 🔹 Otras Secciones */}
      {activeTab === "prescriptions" && <Prescriptions />}
      {activeTab === "tests" && <ControlAnalysis />}
      {activeTab === "aptitude" && <PhysicalFitness />}
      {activeTab === "record-appointments" &&  <ProfileAppointments setActiveTab={setActiveTab} appointments={appointments} />}
      {activeTab === "make-appointment" && <MakeAppointment /> }
      {activeTab === "emergency" && (
        <GuardiaFormPage />
      )}

    </div>
  );
};

export default ProfileContent;
