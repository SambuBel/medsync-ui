import { SpecialtyEnum } from "@/utils/constants/Appointment";
import { Doctor } from "../ProfilePersonalData";
import { FaCalendarAlt } from "react-icons/fa";
import { generateHalfHourIntervals } from "@/utils/generateTime";
import { useState } from "react";

interface StepSelectDoctorProps {
  doctors: Doctor[];
  selectedDoctor: Doctor | null;
  onSelect: (doctor: Doctor, time: string, dayOfWeek: number) => void;  
  loading: boolean;
}

const getTitleByGender = (gender: string) => {
  if (gender === "FEMALE") return "Dra.";
  return "Dr.";
};

const StepSelectDoctor = ({ doctors, selectedDoctor, onSelect, loading }: StepSelectDoctorProps) => {
  const [expandedDoctorId, setExpandedDoctorId] = useState<string | null>(null);

  if (loading) return <p className="text-gray-500">Cargando médicos...</p>;
  if (!doctors.length) return <p className="text-gray-500">No hay médicos disponibles.</p>;

  const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const isToday = (dayOfWeek: number) => new Date().getDay() === dayOfWeek;

  return (
    <div className="flex flex-col gap-4 mt-4">
      {doctors.map((doctor) => {
        const availability = doctor.availabilities?.[0];
        const slots = availability ? generateHalfHourIntervals(availability.startTime, availability.endTime) : [];
        const nextSlot = slots[0];
        const dayLabel = availability
          ? isToday(availability.dayOfWeek)
            ? "Hoy"
            : daysOfWeek[availability.dayOfWeek]
          : "";
        const isExpanded = expandedDoctorId === doctor.id;

        return (
          <div
            key={doctor.id}
            className={`border rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${
              selectedDoctor?.id === doctor.id ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"
            }`}
          >
            {/* Info profesional */}
            <div className="flex items-center gap-4 w-full md:w-1/2">
              <div className="avatar">
                <div className="w-14 rounded-full">
                  <img
                    src={doctor?.user?.profileImage?.url || "/images/default-avatar.png"}
                    alt="Foto profesional"
                  />
                </div>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-800">
                  {getTitleByGender(doctor.user.gender)} {doctor.user.name} {doctor.user.lastName}
                </p>
                <p className="text-sm text-gray-600">{SpecialtyEnum[doctor.specialty[0]] || doctor.specialty[0]}</p>
              </div>
            </div>

            <div className="hidden md:block w-px h-16 bg-gray-300" />

            <div className="w-full md:w-1/2">
              {availability && nextSlot && (
                <button
                onClick={() => onSelect(doctor, nextSlot, availability.dayOfWeek)}
                className="flex items-center gap-2 px-3 py-2 rounded-md border border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-200 text-sm mb-2 transition-all"
                >
                  <FaCalendarAlt /> Próximo turno: {dayLabel} a las {nextSlot} hs
                </button>
              )}

              {availability && (
                <button
                  onClick={() => setExpandedDoctorId(isExpanded ? null : doctor.id)}
                  className="text-blue-600 text-sm mb-2 hover:underline transition-all"
                >
                  {isExpanded ? "Ocultar horarios ▲" : "Ver más horarios ▼"}
                </button>
              )}

              {isExpanded && (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 animate-fadeIn">
                  {slots.map((slot, i) => (
                    <button
                      key={i}
                      onClick={() => onSelect(doctor, slot, availability.dayOfWeek)}
                      className="flex items-center gap-2 px-1 py-1 text-xs rounded-md border border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-200 transition-all"
                    >
                      {slot} HS
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StepSelectDoctor;
