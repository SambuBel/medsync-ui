"use client";

import { FaStethoscope } from "react-icons/fa";

export default function NoDoctorsAvailable() {
  return (
    <div className="bg-sky-100 border border-sky-400 text-sky-800 p-6 rounded-xl text-center animate-fadeIn flex flex-col items-center gap-2">
      <FaStethoscope className="text-4xl text-sky-500 animate-pulse" />
      <p className="text-lg font-semibold">No hay médicos disponibles en este momento</p>
      <p className="text-sm text-sky-700">
        Intenta cambiar la especialidad o volver a intentarlo más tarde.
      </p>
    </div>
  );
}
