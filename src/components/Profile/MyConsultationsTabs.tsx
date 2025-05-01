'use client';

import { useState } from 'react';
import AppointmentStatusPill from '../common/AppointmentStatusPill';
import { formatLocalDateTime } from '@/helpers/formatLocalDateTime';
import { FaFileMedicalAlt, FaDownload } from 'react-icons/fa';
import { SpecialtyEnum } from '@/utils/constants/Appointment';
import { Appointment, EmergencyVisit } from './utils/constants';

type TabType = 'appointments' | 'emergency';

type Props = {
  appointments: Appointment[];
  emergencyVisits: EmergencyVisit[];
  setSelectedAppointmentId: (id: string) => void;
};

export default function MyConsultationsTabs({ appointments, emergencyVisits, setSelectedAppointmentId }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>('appointments');
  console.log("APPOINTMENTS : ", appointments)
  return (
    <div className="mt-10 max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <div role="tablist" className="tabs tabs-boxed mb-6">
        <a
          role="tab"
          className={`tab ${activeTab === 'appointments' ? 'tab-active bg-sky-500 text-white' : ''}`}
          onClick={() => setActiveTab('appointments')}
        >
          <span className='text-white font-medium'>🗓 Turnos Programados</span>
        </a>
        <a
          role="tab"
          className={`tab ${activeTab === 'emergency' ? 'tab-active bg-sky-500 text-white' : ''}`}
          onClick={() => setActiveTab('emergency')}
        >
          <span className='text-white font-medium'>🚨 Visitas de Guardia</span>
        </a>
      </div>

      {activeTab === 'appointments' && appointments.length === 0 && (
        <p className="text-gray-600 text-center">No tenés turnos programados aún.</p>
      )}

      {activeTab === 'emergency' && emergencyVisits.length === 0 && (
        <p className="text-gray-600 text-center">Aún no has tenido visitas por guardia.</p>
      )}

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="bg-sky-100 text-sky-800">
              <th>Profesional</th>
              <th>Especialidad</th>
              <th>Fecha</th>
              <th>Estado</th>
              {activeTab === 'emergency' && <th>Síntomas</th>}
              <th className="text-center">Opciones</th>
            </tr>
          </thead>
          <tbody className='text-gray-600 even:bg-gray-100'>
            {(activeTab === 'appointments' ? appointments : emergencyVisits).map((item: Appointment | EmergencyVisit) => (
              <tr key={item.id} className="hover:bg-gray-50 ">
                <td>
                  {item.doctor?.user?.name} {item.doctor?.user?.lastName}
                </td>
                <td>{isAppointment(item) ? SpecialtyEnum[item.specialty] ?? '-' : '-'}</td>
                <td>{isAppointment(item) ? formatLocalDateTime(item.date) : formatLocalDateTime(item.createdAt)}</td>
                <td>
                  <AppointmentStatusPill status={item.status} />
                </td>

                {activeTab === 'emergency' && (
                  <td>
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {isEmergencyVisit(item) && item.symptoms?.slice(0, 3).map((symptom: string, i: number) => (
                        <span key={i} className="badge badge-outline badge-sm text-gray-700 border-sky-400">
                          {symptom}
                        </span>
                      ))}
                      {isEmergencyVisit(item) && item.symptoms?.length > 3 && (
                        <div className="tooltip tooltip-top" data-tip={item.symptoms.slice(3).join(', ')}>
                          <span className="badge badge-sm bg-sky-100 text-sky-700">
                            +{item.symptoms.length - 3}
                          </span>
                        </div>
                      )}
                      {isEmergencyVisit(item) && item.otherSymptoms && (
                        <span className="badge badge-ghost badge-sm text-gray-600 italic">
                          + {item.otherSymptoms}
                        </span>
                      )}
                    </div>
                  </td>
                )}

                <td className="flex gap-2 justify-center">
                  <button className="btn btn-sm btn-outline btn-info gap-1">
                    <FaFileMedicalAlt />
                  </button>
                  <button className="btn btn-sm btn-outline btn-success gap-1">
                    <FaDownload />
                  </button>
                  <button
                    className="btn btn-sm btn-outline btn-error gap-1"
                    onClick={() => setSelectedAppointmentId(item.id)}
                  >
                    ❌ Cancelar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function isEmergencyVisit(item: Appointment | EmergencyVisit): item is EmergencyVisit {
  return 'symptoms' in item;
}

function isAppointment(item: Appointment | EmergencyVisit): item is Appointment {
  return 'specialty' in item;
}
