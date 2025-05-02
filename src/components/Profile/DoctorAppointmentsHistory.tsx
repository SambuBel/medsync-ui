import { useEffect, useState } from "react";
import { Appointment } from "./utils/constants";
import { SpecialtyEnum } from "@/utils/constants/Appointment";
import AppointmentStatusPill from "../common/AppointmentStatusPill";
import LoadingComponent from "../common/LoadingComponent";
import EmptyState from "../common/EmptyState";
import SectionHeader from "../common/SectionHeader";
import { FaCalendarAlt } from "react-icons/fa";
import { User } from "./ProfilePersonalData";

export default function DoctorAppointmentsHistory({ user, setUser }: { user: User, setUser: (user: User) => void }) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDoctorAppointments() {
      console.log("Fetching doctor appointments");
      setLoading(true);
      try {
        const res = await fetch(`/api/consultations`);
        if (res.ok) {
          const data = await res.json();
          console.log("DATA", data);
          setAppointments(data);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchDoctorAppointments();
  }, []);

  return (
    <div className="bg-white p-6">
      <SectionHeader
        title="Historial de Turnos"
        description="Gestiona tus consultas y visitas de emergencia"
        icon={<FaCalendarAlt className="text-sky-500" />}
        profileImage={user?.profileImage?.url}
        setUser={setUser}
      />
      {loading ? (
        <LoadingComponent />
      ) : appointments.length === 0 ? (
        <EmptyState title="No hay turnos registrados." />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Paciente</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Especialidad</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {Array.isArray(appointments) && appointments.map((appt) => (
                <tr key={appt.id}>
                  <td className="px-4 py-2">{appt.patient?.user?.name} {appt.patient?.user?.lastName}</td>
                  <td className="px-4 py-2">{new Date(appt.date).toLocaleString("es-AR", { dateStyle: "full", timeStyle: "short" })}</td>
                  <td className="px-4 py-2">{SpecialtyEnum[appt.specialty]}</td>
                  <td className="px-4 py-2"><AppointmentStatusPill status={appt.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 