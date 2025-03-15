"use client";
import {
  FaHome,
  FaCalendarAlt,
  FaFileMedical,
  FaNotesMedical,
  FaClipboardList,
  FaHeartbeat,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";

const ProfileSidebar = ({ activeTab, setActiveTab, handleLogout, isCollapsed, toggleSidebar }) => {
  return (
    <div
      className={`bg-white shadow-md border-r min-h-screen transition-all duration-300 flex flex-col ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* 🔹 Botón para Colapsar/Expandir */}
      <button
        className="btn btn-ghost text-xl flex justify-center items-center my-4"
        onClick={toggleSidebar}
      >
        <FaBars className="text-gray-700" />
      </button>

      {/* 🔹 Menú de Navegación */}
      <ul className="menu flex flex-col flex-grow space-y-2">
        {/* 🔸 Inicio */}
        <li className="mb-6">
          <button onClick={() => setActiveTab("home")} className="flex items-center gap-3 text-gray-800">
            <FaHome className="text-blue-500 text-2xl" /> {!isCollapsed && "Inicio"}
          </button>
        </li>

        {/* 🔸 Otras opciones */}
        {[
          { id: "appointments", label: "Turnos", icon: <FaCalendarAlt className="text-green-500 text-xl" /> },
          { id: "prescriptions", label: "Recetas", icon: <FaFileMedical className="text-purple-500 text-xl" /> },
          { id: "interconsults", label: "Interconsultas", icon: <FaNotesMedical className="text-red-500 text-xl" /> },
          { id: "tests", label: "Análisis", icon: <FaClipboardList className="text-blue-500 text-xl" /> },
          { id: "aptitude", label: "Aptitud Física", icon: <FaHeartbeat className="text-pink-500 text-xl" /> },
        ].map(({ id, label, icon }) => (
          <li key={id}>
            <button
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-3 text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-all ${
                activeTab === id ? "bg-gray-200" : ""
              }`}
            >
              {icon} {!isCollapsed && label}
            </button>
          </li>
        ))}
      </ul>
      <div className="py-4 border-t-gray-200 border-t-2 flex items-center flex-col justify-center">
        <button onClick={handleLogout} className="text-red-500 flex items-center gap-3 p-2">
          <FaSignOutAlt className="text-xl" /> {!isCollapsed && "Cerrar Sesión"}
        </button>
      </div>
    </div>
  );
};

export default ProfileSidebar;
