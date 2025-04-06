import { FaEllipsisV, FaPlusCircle } from "react-icons/fa";
import { Appointment } from "./utils/constants";
import { SpecialtyEnum } from "@/utils/constants/Appointment";
import AppointmentStatusPill from "../common/AppointmentStatusPill";
import { useState } from "react";
import { formatLocalDateTime } from "@/helpers/formatLocalDateTime";

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
    <div className="bg-white p-6 rounded-lg flex flex-col items-center">
      <div className="flex justify-between items-center border-b pb-4 mb-10 w-full">
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
          <div className="overflow-visible text-gray-600 max-w-screen-xl w-full">
            <table className="table border border-gray-300 rounded-t-xl overflow-hidden bg-white shadow-sm z-10">
              <thead className="bg-sky-500 text-white text-sm">
                  <tr>
                  <th className="px-4 py-3 text-left">Profesional</th>
                  <th className="px-4 py-3 text-left">Especialidad</th>
                  <th className="px-4 py-3 text-left">Fecha</th>
                  <th className="px-4 py-3 text-left">Estado</th>
                  {appointments.some(a => a.status !== "CANCELED") && (
                      <th className="px-4 py-3 text-left">Opciones</th>
                  )}
                  </tr>
              </thead>
              <tbody>
                  {appointments.map((appt) => (
                    <tr key={`appointment-${appt.doctor.user.email}-${appt.date}`} className="hover:bg-gray-50 border-b border-gray-200">
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
                      <td>{formatLocalDateTime(appt.date)}</td>
                      <td>
                          <AppointmentStatusPill status={appt.status} />
                      </td>
                      {appt.status !== "CANCELED" && (
                      <td className="text-end relative">
                      <div className="dropdown dropdown-end">
                        <button tabIndex={0} className="text-gray-500 hover:text-gray-700">
                          <FaEllipsisV />
                        </button>
                        <ul
                          tabIndex={0}
                          className="dropdown-content menu absolute right-0 mt-1 border w-[160px] rounded-md shadow z-50 bg-white"
                        >
                          <li>
                            <button
                              onClick={() => setSelectedAppointmentId(appt.id)}
                              className="text-red-500 px-4 py-2 text-left hover:bg-red-50"
                            >
                              Cancelar turno
                            </button>
                          </li>
                          {new Date(appt.date) <= new Date(new Date().getTime() + 30 * 60000) &&
                            new Date(appt.date) >= new Date(new Date().getTime() - 15 * 60000) && (
                              <li>
                                <button
                                  onClick={() => {
                                    setActiveTab("emergency"); // o a una página específica del turno
                                  }}
                                  className="text-green-600 px-4 py-2 text-left hover:bg-green-50"
                                >
                                  Ingresar a consulta
                                </button>
                              </li>
                          )}
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
