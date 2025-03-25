"use client";

import { FaUserMd } from "react-icons/fa";
import { SpecialtyEnum } from "@/utils/constants/Appointment";
import { SpecialtyIcons } from "@/utils/constants/SpecialtyIcons";

interface StepSelectSpecialtyProps {
  selected: string;
  onSelect: (value: string) => void;
}

const StepSelectSpecialty = ({ selected, onSelect }: StepSelectSpecialtyProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {Object.entries(SpecialtyEnum).map(([key, label]) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl shadow-md transition-all border-2
            ${selected === key ? "bg-blue-100 border-blue-500" : "bg-white border-gray-200 hover:bg-blue-50"}`}
        >
          <div className="text-3xl text-blue-600">
            {SpecialtyIcons[key] || <FaUserMd />}
          </div>
          <span className="text-sm font-semibold text-gray-800 text-center">{label}</span>
        </button>
      ))}
    </div>
  );
};

export default StepSelectSpecialty;


