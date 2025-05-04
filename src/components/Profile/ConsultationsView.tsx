import { useState } from "react";
import { Appointment, EmergencyVisit } from "./utils/constants";
import SectionHeader from "../common/SectionHeader";
import { FaCalendarAlt } from "react-icons/fa";
import { User } from "./ProfilePersonalData";

interface ProfileViewProps {
  setActiveTab: (tab: string) => void;
  emergencyVisits: EmergencyVisit[];
  appointments: Appointment[];
  user: User;
  setUser: (user: User) => void;
}

export default function ConsultationsView({
  appointments,
  setActiveTab,
  user,
  setUser,
}: ProfileViewProps) {
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
    } catch {
      alert("❌ Hubo un error al cancelar el turno");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      {/* Header de sección */}
      <SectionHeader
        title="Mis Consultas"
        description="Gestiona tus consultas y visitas de emergencia"
        icon={<FaCalendarAlt className="text-sky-500" />}
        profileImage={user?.profileImage?.url}
        setUser={setUser}
        name={user?.name}
        lastName={user?.lastName}
      />

      {/* Botón agendar consulta */}
      <div className="flex justify-end mt-4 mb-6">
        <button
          className="px-4 py-2 bg-sky-50 text-sky-500 border border-sky-300 rounded-lg font-semibold hover:bg-sky-100 transition"
          onClick={() => setActiveTab("make-appointment")}
        >
          <span className="mr-2">➕</span> Agendar consulta
        </button>
      </div>

      {/* Lista de turnos/cards */}
      <div className="overflow-x-auto rounded-lg shadow border border-gray-100 bg-white mt-6">
        <table className="min-w-full">
          <thead>
            <tr className="bg-sky-50 text-sky-700">
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase">Profesional</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase">Opciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {(appointments?.length ?? 0) === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-400">
                  No hay turnos programados.
                </td>
              </tr>
            ) : (
              appointments.map((appt) => (
                <tr
                  key={appt.id}
                  className="transition-colors hover:bg-sky-50 border-b border-gray-100 last:border-b-0"
                >
                  <td className="px-6 py-4 font-semibold">
                    <div className="flex items-center gap-3">
                      <img
                        src={appt.doctor?.user?.profileImage?.url || "/images/avatar-default.png"}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full border border-gray-200 object-cover flex-shrink-0"
                      />
                      <span>{appt.doctor?.user?.name} {appt.doctor?.user?.lastName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {new Date(appt.date).toLocaleString("es-AR", { dateStyle: "full", timeStyle: "short" })}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      appt.status === "CONFIRMED"
                        ? "bg-green-100 text-green-800"
                        : appt.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-800"
                        : appt.status === "CANCELED"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {appt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      className="px-3 py-1 bg-sky-100 text-sky-700 rounded-lg border border-sky-300 hover:bg-sky-200 transition text-sm font-semibold"
                      onClick={() => setSelectedAppointmentId(appt.id)}
                    >
                      Cancelar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

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
