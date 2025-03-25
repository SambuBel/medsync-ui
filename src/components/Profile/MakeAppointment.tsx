"use client";

import AppointmentStepper from "./StepsAppointment/AppointmentStepper";


const MakeAppointment = () => {
  return (
    <div className="bg-white p-8 w-full h-[90vh] flex flex-col overflow-y-auto">
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <h3 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          Reservar Consulta Médica
        </h3>
        <p className="text-gray-500 text-sm">Sigue los pasos para elegir una especialidad, un profesional y un horario disponible</p>
      </div>

      <AppointmentStepper />
    </div>
  );
};

export default MakeAppointment;
