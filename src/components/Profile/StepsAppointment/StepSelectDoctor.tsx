import { SpecialtyEnum } from "@/utils/constants/Appointment";
import { Doctor } from "../ProfilePersonalData";
import { FaCalendarAlt } from "react-icons/fa";
import { useState } from "react";
import NoDoctorsAvailable from "./NoDoctorsAvailable";
import LoadingComponent from "@/components/common/LoadingComponent";
import type { Slot } from "@/utils/constants/Appointment";

interface StepSelectDoctorProps {
  doctors: Doctor[];
  selectedDoctor: Doctor | null;
  onSelect: (doctor: Doctor, time: string, dayOfWeek: number, date: string) => void;
  loading: boolean;
}

const getTitleByGender = (gender: string) => {
  return gender === "FEMALE" ? "Dra." : "Dr.";
};

const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

// Agrupar los turnos por fecha visible (ej: lunes, 31 de marzo de 2025)
const groupSlotsByDay = (slots: Slot[]) => {
  const grouped: { [key: string]: { label: string; slots: typeof slots } } = {};

  slots.forEach((slot) => {
    const date = new Date(slot.date);
    const key = date.toISOString().split("T")[0]; // YYYY-MM-DD
    const label = date.toLocaleDateString("es-AR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    if (!grouped[key]) {
      grouped[key] = { label, slots: [] };
    }

    grouped[key].slots.push(slot);
  });

  return grouped;
};



const StepSelectDoctor = ({ doctors, selectedDoctor, onSelect, loading }: StepSelectDoctorProps) => {
  const [expandedDoctorId, setExpandedDoctorId] = useState<string | null>(null);

  if (loading) return (
    <div className="flex flex-col justify-center w-full">
      <LoadingComponent />
      <p className="text-gray-500">Cargando médicos...</p>
    </div>
  );
  if (!doctors.length) return <NoDoctorsAvailable />;

  return (
    <div className="flex flex-col gap-4 mt-4">
      {doctors.map((doctor) => {
        const nextSlot = doctor.availableSlots?.[0];
        const isExpanded = expandedDoctorId === doctor.id;
        const groupedSlots = groupSlotsByDay(doctor.availableSlots || []);

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
                    src={doctor?.user?.profileImage?.url || "/images/avatar-default.png"}
                    alt="Foto profesional"
                  />
                </div>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-800">
                  {getTitleByGender(doctor.user?.gender || "")} {doctor.user?.name} {doctor.user?.lastName}
                </p>
                <p className="text-sm text-gray-600">
                  {SpecialtyEnum[doctor.specialty[0] as keyof typeof SpecialtyEnum] || doctor.specialty[0]}
                </p>
              </div>
            </div>

            <div className="hidden md:block w-px h-16 bg-gray-300" />

            {/* Turnos disponibles */}
            <div className="w-full md:w-1/2">
              {nextSlot && (
                <button
                  onClick={() => onSelect(doctor, nextSlot.time, nextSlot.dayOfWeek, nextSlot.date)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md border border-blue-300 bg-blue-50 text-sky-500 text-sm mb-2 transition-all hover:bg-sky-500 hover:text-white"
                >
                  <FaCalendarAlt /> Próximo turno: {daysOfWeek[nextSlot.dayOfWeek]} a las {nextSlot.time} hs
                </button>
              )}

              {doctor.availableSlots?.length && doctor.availableSlots?.length > 1 && (
                <button
                  onClick={() => setExpandedDoctorId(isExpanded ? null : doctor.id || null)}
                  className="text-sky-600 text-sm mb-2 hover:underline transition-all"
                >
                  {isExpanded ? "Ocultar horarios ▲" : "Ver más horarios ▼"}
                </button>
              )}

              {isExpanded && (
                <div className="animate-fadeIn space-y-4">
                  {Object.entries(groupedSlots).map(([dateKey, group]) => (
                    <div key={dateKey}>
                      <p className="text-sm font-semibold text-gray-700 mb-2">🗓️ {group.label}</p>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                        {group.slots.map((slot, i) => (
                          <button
                            key={i}
                            onClick={() => onSelect(doctor, slot.time, slot.dayOfWeek, slot.date)}
                            className="flex whitespace-nowrap items-center gap-2 px-1 py-1 text-xs rounded-md border border-blue-300 bg-blue-50 text-sky-500 hover:bg-sky-500 hover:text-white transition-all min-w-[55px]"
                          >
                            {slot.time} hs
                          </button>
                        ))}
                      </div>
                    </div>
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
