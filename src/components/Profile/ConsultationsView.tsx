import { useState } from "react";
import { Appointment, EmergencyVisit } from "./utils/constants";
import MyConsultationsTabs from "./MyConsultationsTabs";
import SectionHeader from "../common/SectionHeader";
import { FaCalendarAlt } from "react-icons/fa";
import { User } from "./ProfilePersonalData";

type ProfileViewProps = {
  appointments: Appointment[];
  emergencyVisits: EmergencyVisit[];
  setActiveTab: (tab: string) => void;
  user: User;
  setUser: (user: User) => void;
};

export default function ConsultationsView({
  appointments,
  emergencyVisits,
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
      <MyConsultationsTabs
        appointments={appointments}
        emergencyVisits={emergencyVisits}
        setSelectedAppointmentId={setSelectedAppointmentId}
      />

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
