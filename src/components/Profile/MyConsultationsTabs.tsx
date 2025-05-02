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
    <div className="mt-10 max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6 border-b border-gray-200">
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
        <table className="table w-full">
          <thead>
            <tr className="bg-sky-100 text-sky-800">
              <th>Profesional</th>
              <th>Fecha</th>
              <th>Estado</th>
              {activeTab === 'emergency' && <th>Síntomas</th>}
              <th className="text-center">Opciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {(activeTab === 'appointments' ? appointments : emergencyVisits).map((item: Appointment | EmergencyVisit) => (
              <tr
                key={item.id}
                className="transition-colors hover:bg-sky-50 border-b border-gray-100 last:border-b-0"
              >
                <td>
                  <div className="flex items-center gap-3">
                    <img
                      src={item.doctor?.user?.profileImage?.url || "/images/avatar-default.png"}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full border border-gray-200 object-cover"
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900 leading-tight">
                        {item.doctor?.user?.name} {item.doctor?.user?.lastName}
                      </span>
                      <span className="text-xs text-gray-500">
                        {isAppointment(item) ? SpecialtyEnum[item.specialty] ?? '-' : '-'}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="align-middle">
                  <span className="text-base text-gray-700">
                    {isAppointment(item) ? formatLocalDateTime(item.date) : formatLocalDateTime(item.createdAt)}
                  </span>
                </td>
                <td className="align-middle">
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
                <td className="flex gap-2 justify-center align-middle">
                  <button className="btn btn-sm bg-sky-100 text-sky-700 border-sky-200 hover:bg-sky-200 gap-1">
                    <FaFileMedicalAlt />
                  </button>
                  <button className="btn btn-sm bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200 gap-1">
                    <FaDownload />
                  </button>
                  <button
                    className="btn btn-sm bg-red-100 text-red-700 border-red-200 hover:bg-red-200 gap-1"
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
