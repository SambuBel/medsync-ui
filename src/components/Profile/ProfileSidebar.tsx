"use client";
import {
  FaHome,
  FaCalendarAlt,
  FaFileMedical,
  FaNotesMedical,
  FaClipboardList,
  FaHeartbeat,
  FaUser,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";

type ProfileSidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleLogout: () => void;
  isCollapsed: boolean;
  toggleSidebar: () => void;
};

const ProfileSidebar = ({ activeTab, setActiveTab, handleLogout, isCollapsed, toggleSidebar } : ProfileSidebarProps) => {
  return (
    <div
      className={`bg-gray-900 text-white shadow-lg border-r min-h-screen transition-all duration-300 flex flex-col ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* 🔹 Botón para Colapsar/Expandir */}
      <button
        className="p-3 flex justify-center items-center text-gray-400 hover:text-white transition-all"
        onClick={toggleSidebar}
      >
        <FaBars className="text-2xl" />
      </button>

      {/* 🔹 Menú de Navegación */}
      <ul className="menu flex flex-col flex-grow space-y-2 mt-4">
        {/* 🔸 Inicio */}
        <li>
          <button
            onClick={() => setActiveTab("home")}
            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-all ${
              activeTab === "home" ? "bg-gray-800" : ""
            }`}
          >
            <FaHome className="text-lg" /> {!isCollapsed && "Inicio"}
          </button>
        </li>

        {/* 🔸 Secciones del perfil */}
        {[
          { id: "appointments", label: "Turnos", icon: <FaCalendarAlt className="text-lg" /> },
          { id: "prescriptions", label: "Recetas", icon: <FaFileMedical className="text-lg" /> },
          { id: "interconsults", label: "Interconsultas", icon: <FaNotesMedical className="text-lg" /> },
          { id: "tests", label: "Análisis", icon: <FaClipboardList className="text-lg" /> },
          { id: "aptitude", label: "Aptitud Física", icon: <FaHeartbeat className="text-lg" /> },
          { id: "personalData", label: "Mis Datos", icon: <FaUser className="text-lg" /> }, // 🔹 Nueva sección
        ].map(({ id, label, icon }) => (
          <li key={id}>
            <button
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-all ${
                activeTab === id ? "bg-gray-800" : ""
              }`}
            >
              {icon} {!isCollapsed && label}
            </button>
          </li>
        ))}
      </ul>

      {/* 🔹 Cierre de sesión */}
      <div className="py-4 border-t border-gray-700 flex items-center flex-col justify-center">
        <button
          onClick={handleLogout}
          className="text-red-400 hover:text-red-300 flex items-center gap-3 p-3 transition-all"
        >
          <FaSignOutAlt className="text-lg" /> {!isCollapsed && "Cerrar Sesión"}
        </button>
      </div>
    </div>
  );
};

export default ProfileSidebar;
