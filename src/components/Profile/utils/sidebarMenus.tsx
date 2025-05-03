import {
    FaHome,
    FaCalendarAlt,
    FaFileMedical,
    FaClipboardList,
    FaHeartbeat,
    FaUser,
    FaUserMd,
    FaHistory,
  } from "react-icons/fa";
  import { ReactNode } from "react";
  
  export type MenuItem = {
    id: string;
    label: string;
    icon: ReactNode;
    submenu?: { id: string; label: string }[];
  };
  
  export const patientMenu: MenuItem[] = [
    { id: "home", label: "Inicio", icon: <FaHome /> },
    {
      id: "appointments",
      label: "Turnos",
      icon: <FaCalendarAlt />,
      submenu: [
        { id: "record-appointments", label: "Historial" },
        { id: "make-appointment", label: "Sacar turno" },
      ],
    },
    { id: "prescriptions", label: "Recetas", icon: <FaFileMedical /> },
    { id: "tests", label: "Estudios", icon: <FaClipboardList /> },
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
  
  export const doctorMenu: MenuItem[] = [
    { id: "home", label: "Inicio", icon: <FaHome /> },
    { id: "active-consultations", label: "Guardia Online", icon: <FaUserMd /> },
    {
      id: "doctor-appointments",
      label: "Historial de Turnos",
      icon: <FaHistory />,
    },
    {
      id: "personalData",
      label: "Mi perfil",
      icon: <FaUser />,
      submenu: [
        { id: "personalData-info", label: "Datos personales" },
        { id: "personalData-docs", label: "Documentación" },
        { id: "doctor-license", label: "Matrícula" },
      ],
    },
  ];
  