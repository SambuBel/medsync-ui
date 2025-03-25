import { JSX } from "react";
import {
    FaStethoscope,
    FaHeartbeat,
    FaBaby,
    FaAllergies,
    FaBrain,
    FaBone,
    FaEye,
    FaEyeSlash,
    FaVenus,
    FaMale,
    FaRadiation,
    FaNotesMedical,
    FaTeeth,
    FaUserMd,
  } from "react-icons/fa";
  
  export const SpecialtyIcons: Record<string, JSX.Element> = {
    GENERAL_MEDICINE: <FaStethoscope />,
    CARDIOLOGY: <FaHeartbeat />,
    PEDIATRICS: <FaBaby />,
    DERMATOLOGY: <FaAllergies />,
    NEUROLOGY: <FaBrain />,
    ORTHOPEDICS: <FaBone />,
    OPHTHALMOLOGY: <FaEye />,
    OTOLARYNGOLOGY: <FaEyeSlash />,
    GYNECOLOGY: <FaVenus />,
    UROLOGY: <FaMale />,
    RADIOLOGY: <FaRadiation />,
    ONCOLOGY: <FaNotesMedical />,
    DENTISTRY: <FaTeeth />,
    PSYCHOLOGY: <FaBrain />,
    PSYCHIATRY: <FaBrain />,
    EMERGENCY_MEDICINE: <FaUserMd />,
  };
  