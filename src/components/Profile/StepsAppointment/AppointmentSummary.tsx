import { SpecialtyEnum } from "@/utils/constants/Appointment";
import { FaCalendarAlt, FaClock } from "react-icons/fa";

type AppointmentSummaryProps = {
  doctor: {
    user: { name: string; lastName?: string; profileImage?: { url: string } };
    specialty: string[];
  };
  date: string;
  time: string;
  onConfirm: () => void;
  onBack: () => void;
};

const AppointmentSummary = ({ doctor, date, time, onConfirm, onBack }: AppointmentSummaryProps) => {
  const formattedDate = new Date(date).toLocaleDateString("es-AR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-3xl mx-auto bg-white border rounded-xl shadow-sm p-6 text-gray-800 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Confirmar Turno</h2>

      <div className="flex flex-col md:flex-row items-start justify-between gap-6">
        {/* 🔹 Info del profesional */}
        <div className="flex items-center gap-4 w-full md:w-1/2">
          <div className="avatar">
            <div className="w-16 rounded-full ring ring-sky-500 ring-offset-base-100 ring-offset-2">
              <img
                src={doctor?.user?.profileImage?.url || "/images/avatar-default.png"}
                alt="Doctor"
              />
            </div>
          </div>
          <div>
            <p className="text-lg font-semibold">
              {doctor.user.name} {doctor.user.lastName || ""}
            </p>
            <p className="text-sm text-gray-600">{SpecialtyEnum[doctor.specialty[0]]}</p>
          </div>
        </div>

        {/* 🔹 Línea divisoria vertical */}
        <div className="hidden md:block h-16 w-px bg-gray-300" />

        {/* 🔹 Info de fecha y hora */}
        <div className="flex flex-col gap-3 w-full md:w-1/2">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <FaCalendarAlt className="text-sky-500" />
            <span className="font-medium">{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <FaClock className="text-sky-500" />
            <span className="font-medium">{time} hs</span>
          </div>
        </div>
      </div>

      {/* 🔹 Botones */}
      <div className="flex justify-between pt-6">
        <button
          className="btn btn-outline border-gray-300 text-gray-700 hover:bg-gray-100"
          onClick={onBack}
        >
          Volver
        </button>
        <button
          className="btn bg-sky-500 text-white hover:bg-sky-600"
          onClick={onConfirm}
        >
          Confirmar Turno
        </button>
      </div>
    </div>
  );
};

export default AppointmentSummary;
