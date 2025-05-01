import { useState } from 'react';
import SectionHeader from '../common/SectionHeader';
import CustomTabs from '../common/CustomTabs';
import { FaUserMd, FaChevronRight, FaUser, FaStethoscope, FaFileMedical, FaFileAlt, FaVideo } from 'react-icons/fa';

// Mock data types
type ConsultationType = 'ONLINE' | 'PEDIATRIA' | 'EMERGENCY';
type ConsultationStatus = 'waiting' | 'in_progress' | 'completed';

interface ActiveConsultation {
  id: string;
  patientName: string;
  patientAge: number;
  type: ConsultationType;
  status: ConsultationStatus;
  waitingTime?: string;
  symptoms?: string[];
}

// Mock data
const mockConsultations: ActiveConsultation[] = [
  {
    id: '1',
    patientName: 'Carlos Armando Bonahora',
    patientAge: 58,
    type: 'ONLINE',
    status: 'waiting',
    waitingTime: '5 min',
    symptoms: ['Dolor de cabeza', 'Fiebre']
  },
  {
    id: '2',
    patientName: 'María González',
    patientAge: 12,
    type: 'PEDIATRIA',
    status: 'in_progress',
    symptoms: ['Tos', 'Congestión']
  },
  {
    id: '3',
    patientName: 'Juan Pérez',
    patientAge: 35,
    type: 'EMERGENCY',
    status: 'waiting',
    waitingTime: '2 min',
    symptoms: ['Dolor abdominal', 'Náuseas']
  }
];


// Mover la función fuera de los componentes, al inicio del archivo después de los tipos
const getStatusBadge = (status: ConsultationStatus) => {
  const styles = {
    waiting: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-green-100 text-green-800',
    completed: 'bg-gray-100 text-gray-800'
  };
  const labels = {
    waiting: 'En espera',
    in_progress: 'En curso',
    completed: 'Completada'
  };
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};

export default function DoctorConsultations() {
  const [activeFilter, setActiveFilter] = useState<ConsultationType | 'ALL'>('ALL');
  const [selectedConsultation, setSelectedConsultation] = useState<string | null>(null);

  const tabs = [
    { id: 'ALL', label: 'Todas las consultas', count: mockConsultations.length },
    { id: 'PEDIATRIA', label: 'Pediatría', count: mockConsultations.filter(c => c.type === 'PEDIATRIA').length },
    { id: 'ONLINE', label: 'Guardia Online', count: mockConsultations.filter(c => c.type === 'ONLINE').length },
  ];

  const filteredConsultations = activeFilter === 'ALL' 
    ? mockConsultations 
    : mockConsultations.filter(c => c.type === activeFilter);

  return (
    <div className="min-h-screen bg-gray-50">
      <SectionHeader
        title="Guardia Online"
        description="Gestiona las consultas de guardia en tiempo real y atiende a los pacientes que necesitan asistencia."
        icon={<FaUserMd className="text-sky-500" />}
      />
      
      <div className="p-6 max-w-7xl mx-auto">
        <CustomTabs
          tabs={tabs}
          activeTab={activeFilter}
          onTabChange={(tabId) => setActiveFilter(tabId as ConsultationType | 'ALL')}
        />

        {/* Lista de consultas */}
        <div className="grid gap-4 mt-6">
          {filteredConsultations.map((consultation) => (
            <div
              key={consultation.id}
              className="bg-white rounded-xl border border-gray-200 hover:border-sky-200 transition-all"
            >
              {/* Cabecera principal siempre visible */}
              <div 
                className="px-6 py-4 flex justify-between items-center cursor-pointer"
                onClick={() => setSelectedConsultation(
                  selectedConsultation === consultation.id ? null : consultation.id
                )}
              >
                <div className="flex items-center gap-6">
                  <FaChevronRight 
                    className={`text-gray-400 transform transition-transform duration-300 ${
                      selectedConsultation === consultation.id ? 'rotate-90' : ''
                    }`}
                  />
                  <div>
                    <h3 className="font-medium text-lg text-gray-900">{consultation.patientName}</h3>
                    <p className="text-gray-500">
                      {consultation.patientAge} años
                      {consultation.waitingTime && (
                        <span className="ml-2 text-sky-600">• Esperando: {consultation.waitingTime}</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {getStatusBadge(consultation.status)}
                  <button
                    className="p-2 rounded-full bg-green-200 hover:bg-green-100 text-green-600 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Lógica para atender
                    }}
                    title="Iniciar videollamada"
                  >
                    <FaVideo className="text-xl" />
                  </button>
                </div>
              </div>

              {/* Contenido expandible */}
              <div
                className={`
                  grid grid-cols-3 gap-6 px-6 pb-6 overflow-hidden transition-all duration-300
                  ${selectedConsultation === consultation.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
                `}
              >
                {/* Información general */}
                <div className="space-y-2 border-t pt-4">
                  <h4 className="text-sky-600 font-medium flex items-center gap-2">
                    <FaUser className="text-sm" />
                    Información general
                  </h4>
                  <div className="text-sm text-gray-600">
                    <div>Edad: {consultation.patientAge} años</div>
                    <div>Estado: {consultation.status}</div>
                    {consultation.waitingTime && (
                      <div>Tiempo de espera: {consultation.waitingTime}</div>
                    )}
                  </div>
                </div>

                {/* Datos de Consulta */}
                <div className="space-y-2 border-t pt-4">
                  <h4 className="text-sky-600 font-medium flex items-center gap-2">
                    <FaStethoscope className="text-sm" />
                    Datos de Consulta
                  </h4>
                  <div className="text-sm">
                    <div className="text-gray-600">Tipo: {consultation.type}</div>
                    <div className="mt-2">
                      {consultation.symptoms?.map((symptom, index) => (
                        <span
                          key={index}
                          className="inline-block px-2 py-1 bg-sky-50 text-sky-700 rounded-full text-xs font-medium mr-2 mb-2"
                        >
                          {symptom}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Historia Clínica */}
                <div className="space-y-2 border-t pt-4">
                  <h4 className="text-sky-600 font-medium flex items-center gap-2">
                    <FaFileMedical className="text-sm" />
                    Historia Clínica
                  </h4>
                  <button className="btn btn-sm bg-sky-100 text-sky-700 hover:bg-sky-200 border-none gap-2">
                    <FaFileAlt /> Ver Historia
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 