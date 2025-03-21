import ProfileAppointments from "./Appointments";
import ControlAnalysis from "./ControlAnalysis";
import Interconsults from "./Interconsults";
import NewsCarousel from "./NewsCarousel";
import PhysicalFitness from "./PhysicalFitness";
import Prescriptions from "./Prescriptions";
import ProfileAvatar from "./ProfileAvatar";
import ProfilePersonalData from "./ProfilePersonalData";

const ProfileContent = ({ activeTab, setActiveTab, user, setUser, appointments, setViewAppointments }) => {
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
          <NewsCarousel />
        </>
      )}

      {/* 🔹 Nueva Sección de Datos Personales */}
      {activeTab === "personalData" && <ProfilePersonalData user={user} />}

      {/* 🔹 Otras Secciones */}
      {activeTab === "appointments" && (
        <ProfileAppointments appointments={appointments} setViewAppointments={setViewAppointments} />
      )}
      {activeTab === "prescriptions" && <Prescriptions />}
      {activeTab === "interconsults" && <Interconsults />}
      {activeTab === "tests" && <ControlAnalysis />}
      {activeTab === "aptitude" && <PhysicalFitness />}
    </div>
  );
};

export default ProfileContent;
