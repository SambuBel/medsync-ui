import { SpecialtyEnum } from "@/utils/constants/Appointment";
import { FaCalendarAlt, FaClock } from "react-icons/fa";

type AppointmentSummaryProps = {
  doctor: {
    user: { name: string; profileImage?: { url: string } };
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
  console.log("DOCTOR :", doctor)
  console.log("DATE :", date)
  return (
    <div className="max-w-xl mx-auto bg-white border rounded-xl shadow-md p-6 space-y-6 text-gray-800">
      <h2 className="text-2xl font-bold">Confirmar Turno</h2>

      <div className="flex items-center gap-4">
        <div className="avatar">
          <div className="w-16 rounded-full">
            <img src={doctor?.user?.profileImage?.url || "/images/avatar-default.png"} alt="Doctor" />
          </div>
        </div>
        <div>
          <p className="text-lg font-semibold">{doctor.user.name}</p>
          <p className="text-sm text-gray-600">{SpecialtyEnum[doctor.specialty[0]]}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 text-sm">
        <FaCalendarAlt className="text-blue-600" />
        <span>{formattedDate}</span>
      </div>
      <div className="flex items-center gap-3 text-sm">
        <FaClock className="text-blue-600" />
        <span>{time}</span>
      </div>

      <div className="flex justify-between pt-4">
        <button className="btn btn-outline" onClick={onBack}>
          Volver
        </button>
        <button className="btn btn-primary bg-blue-600 text-white hover:bg-blue-700" onClick={onConfirm}>
          Confirmar Turno
        </button>
      </div>
    </div>
  );
};

export default AppointmentSummary;
