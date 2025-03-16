import ProfileAppointments from "./Appointments";
import ControlAnalysis from "./ControlAnalysis";
import Interconsults from "./Interconsults";
import NewsCarousel from "./NewsCarousel";
import PhysicalFitness from "./PhysicalFitness";
import Prescriptions from "./Prescriptions";
import ProfilePersonalData from "./ProfilePersonalData";

const ProfileContent = ({ activeTab, setActiveTab, user, appointments, setViewAppointments }) => {
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
              <div className="avatar">
              <div className="w-24 rounded-full border border-gray-300 shadow-md">
                <img
                  src={user?.profilePicture || "/images/arcane.jpg"}
                  alt="Foto de perfil"
                />
              </div>
            </div>
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
