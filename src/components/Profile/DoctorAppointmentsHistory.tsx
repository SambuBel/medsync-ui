import { useEffect, useState } from "react";
import { Appointment } from "./utils/constants";
import { SpecialtyEnum } from "@/utils/constants/Appointment";
import AppointmentStatusPill from "../common/AppointmentStatusPill";
import LoadingComponent from "../common/LoadingComponent";
import EmptyState from "../common/EmptyState";
import SectionHeader from "../common/SectionHeader";
import { FaCalendarAlt } from "react-icons/fa";
import { User } from "./ProfilePersonalData";
import SideDrawer from "../common/SideDrawer";

export default function DoctorAppointmentsHistory({ user, setUser }: { user: User, setUser: (user: User) => void }) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<{
    name?: string;
    lastName?: string;
    gender?: string;
    dni?: string;
    birthDate?: string;
  } | null>(null);
  console.log("USER", user);
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
    <div className="bg-white p-6 rounded-lg">
      <SectionHeader
        title="Historial de Turnos"
        description="Gestiona tus consultas y visitas de emergencia"
        icon={<FaCalendarAlt className="text-sky-500" />}
        profileImage={user?.profileImage?.url}
        setUser={setUser}
        name={user?.name}
        lastName={user?.lastName}
      />
      <div className="mt-8">
        {loading ? (
          <LoadingComponent />
        ) : appointments.length === 0 ? (
          <EmptyState title="No hay turnos registrados." />
        ) : (
          <div className="overflow-x-auto rounded-lg shadow border border-gray-100 bg-white">
            <table className="min-w-full">
              <thead>
                <tr className="bg-sky-50 text-sky-700">
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase">Paciente</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase">Fecha</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase">Especialidad</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase">Estado</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase">Motivo</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {Array.isArray(appointments) && appointments.map((appt) => {
                  // Datos del paciente
                  const patient = appt.patient?.user;
                  const sexo = patient?.gender || "-";
                  const dni = patient?.dni || "-";
                  // Si tienes fecha de nacimiento, calcula la edad
                  const birthDate = patient?.birthDate ? new Date(patient.birthDate) : null;
                  const edad = birthDate ? Math.floor((Date.now() - birthDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000)) : "-";
                  // Motivo de consulta
                  let motivo = "-";
                  if ('reason' in appt && typeof appt.reason === 'string' && appt.reason) {
                    motivo = appt.reason;
                  } else if ('symptoms' in appt && Array.isArray(appt.symptoms) && appt.symptoms.length > 0) {
                    motivo = appt.symptoms.join(", ");
                  }

                  return (
                    <tr
                      key={appt.id}
                      className="transition-colors hover:bg-sky-50 border-b border-gray-100 last:border-b-0"
                    >
                      <td className="px-6 py-4">
                        <div className="font-semibold">{patient?.name} {patient?.lastName}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          <span className="mr-2">Sexo: <b>{sexo}</b></span>
                          <span className="mr-2">Edad: <b>{edad}</b></span>
                          <span className="mr-2">DNI: <b>{dni}</b></span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {(() => {
                          const dateValue = (appt as { date?: string; createdAt?: string }).date
                            || (appt as { date?: string; createdAt?: string }).createdAt;
                          const dateObj = dateValue ? new Date(dateValue) : null;
                          return dateObj && !isNaN(dateObj.getTime())
                            ? dateObj.toLocaleString("es-AR", { dateStyle: "full", timeStyle: "short" })
                            : "-";
                        })()}
                      </td>
                      <td className="px-6 py-4">
                        {appt.specialty ? SpecialtyEnum[appt.specialty] : "Guardia"}
                      </td>
                      <td className="px-6 py-4"><AppointmentStatusPill status={appt.status} /></td>
                      <td className="px-6 py-4">
                        <div>
                          <span className="block font-medium">Motivo:</span>
                          <span className="text-sm text-gray-700">{motivo}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          className="px-3 py-1 bg-sky-100 text-sky-700 rounded-lg border border-sky-300 hover:bg-sky-200 transition text-sm font-semibold"
                          onClick={() => {
                            setSelectedPatient(patient || null);
                            setDrawerOpen(true);
                          }}
                        >
                          Ver historia clínica
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <SideDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <h2 className="text-2xl font-bold mb-4">Historia clínica</h2>
        {selectedPatient ? (
          <div>
            <div className="mb-2"><b>Nombre:</b> {selectedPatient.name} {selectedPatient.lastName}</div>
            <div className="mb-2"><b>Sexo:</b> {selectedPatient.gender || "-"}</div>
            <div className="mb-2"><b>DNI:</b> {selectedPatient.dni || "-"}</div>
            <div className="mb-2"><b>Fecha de nacimiento:</b> {selectedPatient.birthDate || "-"}</div>
            {/* Aquí puedes agregar más info o un historial real en el futuro */}
            <div className="mt-6 text-gray-400 text-sm">Aquí irá la historia clínica completa del paciente.</div>
          </div>
        ) : (
          <div className="text-gray-500">No se encontró información del paciente.</div>
        )}
      </SideDrawer>
    </div>
  );
} 