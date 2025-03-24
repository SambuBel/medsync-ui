"use client";
import { motion } from "framer-motion";
import { useState } from "react";
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
  FaChevronDown,
} from "react-icons/fa";

type ProfileSidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleLogout: () => void;
  isCollapsed: boolean;
  toggleSidebar: () => void;
};

const ProfileSidebar = ({ activeTab, setActiveTab, handleLogout, isCollapsed, toggleSidebar } : ProfileSidebarProps) => {
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>({});

  const toggleSubmenu = (id: string) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const menuItems = [
    { id: "home", label: "Inicio", icon: <FaHome /> },
    { id: "appointments", label: "Turnos", icon: <FaCalendarAlt /> },
    { id: "prescriptions", label: "Recetas", icon: <FaFileMedical /> },
    { id: "interconsults", label: "Interconsultas", icon: <FaNotesMedical /> },
    { id: "tests", label: "Análisis", icon: <FaClipboardList /> },
    { id: "aptitude", label: "Aptitud Física", icon: <FaHeartbeat /> },
    {
      id: "personalData",
      label: "Mi perfil",
      icon: <FaUser />,
      submenu: [
        { id: "personalData-info", label: "Datos personales" },
        { id: "personalData-docs", label: "Documentación" },
      ],
    },
  ];  

  return (
    <div
      className={`bg-gray-900 text-white shadow-lg border-r min-h-screen transition-all duration-300 flex flex-col ${
        isCollapsed ? "w-20 items-center" : "w-64"
      }`}
    >
      <h2 className={`text-white font-bold tracking-wide text-center py-8 ${isCollapsed ? "px-4": "px-8"}`}>SAMBU</h2>
      {/* 🔹 Botón para Colapsar/Expandir */}
      <button
        className="p-3 flex justify-center items-center text-gray-400 hover:text-white transition-all"
        onClick={toggleSidebar}
      >
        <FaBars className="text-2xl" />
      </button>

      {/* 🔹 Menú de Navegación */}
      <ul className="menu flex flex-col flex-grow space-y-2 mt-4">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id || activeTab.startsWith(item.id);
          const isOpen = openSubmenus[item.id] || activeTab.startsWith(item.id);

          return (
            <li key={item.id}>
              {/* 🔹 Si tiene submenú */}
              {item.submenu ? (
                <>
                  <div
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-700 transition-all ${
                      isActive ? "bg-gray-800" : ""
                    }`}
                    onClick={() => toggleSubmenu(item.id)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{item.icon}</span>
                      {!isCollapsed && <span>{item.label}</span>}
                    </div>
                    {!isCollapsed && (
                      <FaChevronDown
                        className={`transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
                      />
                    )}
                  </div>

                  {/* 🔹 Submenú con animación */}
                  {!isCollapsed && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="ml-6 overflow-hidden"
                    >
                      {item.submenu.map((sub) => (
                        <li key={sub.id}>
                          <button
                            onClick={() => setActiveTab(sub.id)}
                            className={`flex items-center gap-2 p-2 rounded-md text-sm my-1 hover:bg-gray-800 w-full text-left ${
                              activeTab === sub.id ? "bg-gray-800" : ""
                            }`}
                          >
                            {sub.label}
                          </button>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </>
              ) : (
                // 🔹 Si NO tiene submenú
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-all ${
                    activeTab === item.id ? "bg-gray-800" : ""
                  }`}
                >
                  <span className="text-lg">{item.icon}</span> {!isCollapsed && item.label}
                </button>
              )}
            </li>
          );
        })}
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
