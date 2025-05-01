import { useState } from "react";
import { Appointment, EmergencyVisit } from "./utils/constants";
import MyConsultationsTabs from "./MyConsultationsTabs";

type ProfileViewProps = {
  appointments: Appointment[];
  emergencyVisits: EmergencyVisit[];
  setActiveTab: (tab: string) => void;
};

export default function ConsultationsView({
  appointments,
  emergencyVisits,
  setActiveTab,
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
    } catch (err) {
      alert("❌ Hubo un error al cancelar el turno");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <h3 className="text-3xl font-bold text-gray-800">Mis Consultas</h3>
        <button
          className="btn btn-primary bg-sky-500 text-white hover:bg-sky-600"
          onClick={() => setActiveTab("make-appointment")}
        >
          <span className="mr-2">➕</span> Agendar consulta
        </button>
      </div>

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
