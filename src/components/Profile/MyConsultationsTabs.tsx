'use client';

import { useState } from 'react';
import AppointmentStatusPill from '../common/AppointmentStatusPill';
import { formatLocalDateTime } from '@/helpers/formatLocalDateTime';
import { FaFileMedicalAlt, FaDownload } from 'react-icons/fa';
import { SpecialtyEnum } from '@/utils/constants/Appointment';
import { Appointment, EmergencyVisit } from './utils/constants';
import EmptyState from "../common/EmptyState";

type TabType = 'appointments' | 'emergency';

type Props = {
  appointments: Appointment[];
  emergencyVisits: EmergencyVisit[];
  setSelectedAppointmentId: (id: string) => void;
};

export default function MyConsultationsTabs({ appointments, emergencyVisits, setSelectedAppointmentId }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>('appointments');

  const data = activeTab === 'appointments' ? appointments : emergencyVisits;

  return (
    <div className="mt-10 w-full mx-auto bg-white rounded-lg shadow-lg p-6 border-b border-gray-200">
      {/* Modern Tabs */}
      <div className="flex gap-2 mb-8">
        <button
          className={`px-5 py-2 rounded-full font-semibold flex items-center gap-2 transition-colors duration-200 ${activeTab === 'appointments' ? 'bg-sky-500 text-white shadow' : 'bg-sky-50 text-sky-700 hover:bg-sky-100'}`}
          onClick={() => setActiveTab('appointments')}
        >
          🗓 Turnos Programados
        </button>
        <button
          className={`px-5 py-2 rounded-full font-semibold flex items-center gap-2 transition-colors duration-200 ${activeTab === 'emergency' ? 'bg-sky-500 text-white shadow' : 'bg-sky-50 text-sky-700 hover:bg-sky-100'}`}
          onClick={() => setActiveTab('emergency')}
        >
          🚨 Visitas de Guardia
        </button>
      </div>

      {/* Header de columnas */}
      <div className="hidden md:flex items-center px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50 rounded-t-xl border-b border-gray-200">
        <div className="w-1/4">Profesional</div>
        <div className="w-1/4">Fecha</div>
        <div className="w-1/6">Estado</div>
        {activeTab === 'emergency' && <div className="w-1/4">Síntomas</div>}
        <div className="w-1/6 text-center">Opciones</div>
      </div>

      {data.length === 0 && (
        <div className="col-span-full">
          <EmptyState
            title={activeTab === 'appointments'
              ? "No tenés turnos programados aún."
              : "Aún no has tenido visitas por guardia."
            }
            description="¡Cuando tengas consultas aparecerán aquí!"
          />
        </div>
      )}

      <div className="divide-y divide-gray-200">
        {data.map((item: Appointment | EmergencyVisit) => (
          <div
            key={item.id}
            className="hidden md:grid grid-cols-4 gap-4 items-center px-4 py-4 bg-white"
          >
            {/* Profesional */}
            <div className="flex items-center gap-4">
              <img
                src={item.doctor?.user?.profileImage?.url || "/images/avatar-default.png"}
                alt="Avatar"
                className="w-12 h-12 rounded-full border border-gray-200 object-cover flex-shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <span className="font-semibold text-gray-900 truncate">
                  {item.doctor?.user?.name} {item.doctor?.user?.lastName}
                </span>
                <span className="text-xs text-gray-500 truncate">
                  {isAppointment(item) ? SpecialtyEnum[item.specialty] ?? '-' : '-'}
                </span>
              </div>
            </div>
            {/* Fecha */}
            <div className="text-base text-gray-700 whitespace-nowrap">
              {isAppointment(item) ? formatLocalDateTime(item.date) : formatLocalDateTime(item.createdAt)}
            </div>
            {/* Estado */}
            <div>
              <AppointmentStatusPill status={item.status} />
            </div>
            {/* Opciones */}
            <div className="flex gap-2 justify-end">
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
            </div>
          </div>
        ))}
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
