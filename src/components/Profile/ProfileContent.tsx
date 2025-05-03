"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProfileAppointments from "./ConsultationsView";
import ControlAnalysis from "./ControlAnalysis";
import NewsCarousel from "./NewsCarousel";
import PhysicalFitness from "./PhysicalFitness";
import Prescriptions from "./Prescriptions";
import ProfilePersonalData from "./ProfilePersonalData";
import MakeAppointment from "./MakeAppointment";
import { isTimeForAppointment } from "./utils/isTimeForAppointmen";
import GuardiaFormPage from "../Guardia/GuardiaFormPage";
import { EmergencyVisit, Appointment } from "./utils/constants";
import DoctorConsultations from "./DoctorConsultations";
import ConsultationSummary from "../Doctor/ConsultationSummary";
import DoctorAppointmentsHistory from "./DoctorAppointmentsHistory";
import SectionHeader from "../common/SectionHeader";
import { User } from "./ProfilePersonalData";

interface ProfileContentProps {
  activeTab: string;
  user: User;
  setUser: (user: User) => void;
  setActiveTab: (tab: string) => void;
  appointments: Appointment[];
  emergencyVisits: EmergencyVisit[]
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "¡Buen día";
  if (hour < 19) return "¡Buenas tardes";
  return "¡Buenas noches";
}

const ProfileContent = ({ activeTab, setActiveTab, user, setUser, appointments, emergencyVisits } : ProfileContentProps) => {
  const searchParams = useSearchParams();
  const visitId = searchParams.get('visitId');
  const patientName = searchParams.get('patientName');

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  return (
    <div className="flex-1 p-6 w-full bg-white overflow-y-auto">
      {/* 🔹 Sección de INICIO */}
      {activeTab === "home" && (
        <>
          <div className="bg-white flex justify-between">
            <SectionHeader
              title={`${getGreeting()}, ${user?.name}! 👋`}
              description="Aquí puedes gestionar turnos, recetas y más."
              profileImage={user?.profileImage?.url}
              setUser={setUser}
              name={user?.name}
              lastName={user?.lastName}
            />
          </div>
          {Array.isArray(appointments) && appointments.some(a =>
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
      {activeTab === "prescriptions" && <Prescriptions user={user} setUser={setUser} />}
      {activeTab === "tests" && <ControlAnalysis />}
      {activeTab === "aptitude" && <PhysicalFitness />}
      {activeTab === "record-appointments" && (
        <ProfileAppointments
          setActiveTab={setActiveTab}
          appointments={appointments}
          user={user}
          setUser={setUser}
          emergencyVisits={emergencyVisits}
        />
      )}
      {activeTab === "doctor-appointments" && <DoctorAppointmentsHistory user={user} setUser={setUser} />}
      {activeTab === "make-appointment" && <MakeAppointment /> }
      {activeTab === "emergency" && (
        <GuardiaFormPage user={user} />
      )}
      {activeTab === "active-consultations" && (
        <DoctorConsultations user={user} setUser={setUser} />
      )}
      {activeTab === "consultation-summary" && visitId && (
        <ConsultationSummary visitId={visitId} patientName={patientName} />
      )}

    </div>
  );
};

export default ProfileContent;
