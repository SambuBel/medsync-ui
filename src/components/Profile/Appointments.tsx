import { FaEllipsisV, FaPlusCircle } from "react-icons/fa";
import { Appointment } from "./utils/constants";
import { SpecialtyEnum } from "@/utils/constants/Appointment";
import AppointmentStatusPill from "../common/AppointmentStatusPill";
import { useState } from "react";

type ProfileAppointmentsType = {
  appointments: Appointment[];
  setActiveTab: (tab: string) => void;
};

export default function ProfileAppointments({ appointments, setActiveTab }: ProfileAppointmentsType) {
    const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    console.log("appointments :", appointments)
  const redirectAppointmentView = () => {
    setActiveTab("make-appointment");
  };

  const handleCancelAppointment = async () => {
    if (!selectedAppointmentId) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/appointments`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedAppointmentId, status: "CANCELED" }),
      });

      if (!res.ok) throw new Error("Error al cancelar el turno");
      location.reload();
    } catch (err) {
      alert("❌ Hubo un error al cancelar el turno");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <div className="flex justify-between items-center border-b pb-4 mb-10">
        <h3 className="text-3xl font-bold text-gray-800 flex items-center gap-2">Mis Turnos</h3>
        <button
          className="btn btn-primary flex items-center gap-2 bg-sky-500 text-white"
          onClick={redirectAppointmentView}
        >
          <FaPlusCircle /> Agendar consulta
        </button>
      </div>

      {appointments.length === 0 ? (
        <p className="text-gray-600 mt-2">No tienes turnos programados.</p>
      ) : (
            <div className="overflow-visible text-gray-600">
            <table className="table">
                <thead className="bg-sky-500 border">
                    <tr className="text-white">
                        <th>Profesional</th>
                        <th>Especialidad</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                        {appointments.some(appt => appt.status !== "CANCELED") && (
                            <th><label>Más opciones</label></th>
                        )}
                    </tr>
                </thead>
                <tbody>
                {appointments.map((appt) => (
                    <tr key={`appointment-${appt.doctor.user.email}-${appt.date}`} className="hover:bg-gray-100">
                    <td>
                        <div className="flex items-center gap-3">
                        <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                            <img
                                src={appt.doctor.user.profileImage?.url || "/images/avatar-default.png"}
                                alt="Avatar del profesional"
                            />
                            </div>
                        </div>
                        <div>
                            <div className="font-bold">
                            {appt.doctor.user.name} {appt.doctor.user.lastName}
                            </div>
                        </div>
                        </div>
                    </td>
                    <td>{SpecialtyEnum[appt.specialty]}</td>
                    <td>{new Date(appt.date).toLocaleString("es-AR")}</td>
                    <td>
                        <AppointmentStatusPill status={appt.status} />
                    </td>
                    {appt.status !== "CANCELED" && (
                        <td className="text-end">
                        <div className="dropdown dropdown-end z-40">
                        <button tabIndex={0} className="btn btn-sm btn-ghost">
                            <FaEllipsisV />
                        </button>
                        <ul className="dropdown-content menu absolute right-0 mt-1  border w-[150px] rounded shadow z-50 bg-white">
                            <li className="w-full">
                            <button
                            onClick={() => setSelectedAppointmentId(appt.id)}
                                className="text-gray-500"
                            >
                                Cancelar turno
                            </button>
                            </li>
                        </ul>
                        </div>
                        </td>
                    )}
                    </tr>
                ))}
                </tbody>
          </table>
        </div>
      )}
      {selectedAppointmentId && (
        <dialog id="cancelModal" className="modal modal-open">
            <div className="modal-box bg-white rounded-xl shadow-lg text-gray-800">
            <h3 className="text-xl font-semibold text-blue-700 flex items-center gap-2">
                <span className="text-2xl">⚠️</span> Confirmar cancelación
            </h3>
            <p className="mt-2 text-sm text-gray-600">
                ¿Estás seguro de que deseas cancelar este turno? Esta acción no se puede deshacer.
            </p>

            <div className="modal-action mt-6">
                <form method="dialog" className="flex gap-3">
                <button
                    type="button"
                    className="btn btn-outline border-gray-300 text-gray-700 hover:bg-gray-100"
                    onClick={() => setSelectedAppointmentId(null)}
                >
                    Volver
                </button>
                <button
                    type="submit"
                    className={`btn bg-red-100 text-red-700 hover:bg-red-200 border-red-200 ${isLoading ? "loading" : ""}`}
                    onClick={handleCancelAppointment}
                >
                    Cancelar turno
                </button>
                </form>
            </div>
            </div>
        </dialog>
        )}
    </div>
  );
}
