import { useState, useEffect } from 'react';
import SectionHeader from '../common/SectionHeader';
import CustomTabs from '../common/CustomTabs';
import { FaUserMd, FaChevronRight, FaUser, FaStethoscope, FaFileMedical, FaFileAlt, FaVideo } from 'react-icons/fa';
import JitsiMeet from '../common/JitsiMeet';
import { User } from './ProfilePersonalData';

// Mock data types
type ConsultationType = 'ONLINE' | 'PEDIATRIA' | 'EMERGENCY';
type ConsultationStatus = 'waiting' | 'in_progress' | 'completed';

interface Consultation {
  id: string;
  roomName: string;
  patientName: string;
  patientAge: number;
  symptoms: string[];
  otherSymptoms?: string;
  waitingTime: string;
  status: 'WAITING' | 'IN_PROGRESS' | 'COMPLETED';
}

interface ActiveConsultation {
  id: string;
  patientName: string;
  patientAge: number;
  type: ConsultationType;
  status: ConsultationStatus;
  waitingTime?: string;
  symptoms?: string[];
  roomName?: string;
}


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

export default function DoctorConsultations({ user, setUser }: { user: User, setUser: (user: User) => void }) {
  const [activeFilter, setActiveFilter] = useState<ConsultationType | 'ALL'>('ALL');
  const [activeCall, setActiveCall] = useState<ActiveConsultation | null>(null);
  const [consultations, setConsultations] = useState<ActiveConsultation[]>([]);
  const [expandedConsultation, setExpandedConsultation] = useState<string | null>(null);

  const handleJoinCall = async (consultation: Consultation, e: React.MouseEvent) => {
    e.stopPropagation();
    
    try {
      // Usar la ruta correcta que configuramos
      const res = await fetch(`/api/guardia/join/${consultation.roomName}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) throw new Error('Error al unirse a la consulta');

      const data = await res.json();
      setActiveCall({
        ...consultation,
        roomName: data.roomName,
        status: 'IN_PROGRESS'
      });
      
    } catch (error) {
      console.error('Error:', error);
      alert('No se pudo iniciar la videollamada');
    }
  };

  const fetchWaitingConsultations = async () => {
    try {
      const res = await fetch('/api/jitsi/consultation');
      if (!res.ok) throw new Error('Error fetching consultations');
      const data = await res.json();
      setConsultations(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchWaitingConsultations();
    // Puedes agregar un intervalo para actualizar periódicamente
    const interval = setInterval(fetchWaitingConsultations, 10000);
    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: 'ALL', label: 'Todas las consultas', count: consultations.length },
    { id: 'PEDIATRIA', label: 'Pediatría', count: consultations.filter(c => c.type === 'PEDIATRIA').length },
    { id: 'ONLINE', label: 'Guardia Online', count: consultations.filter(c => c.type === 'ONLINE').length },
  ];

  const filteredConsultations = activeFilter === 'ALL' 
    ? consultations 
    : consultations.filter(c => c.type === activeFilter);

  const toggleExpand = (id: string) => {
    setExpandedConsultation(expandedConsultation === id ? null : id);
  };

  // Si hay una llamada activa, mostrar la interfaz de Jitsi
  if (activeCall) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SectionHeader
          title={`Consulta con ${activeCall.patientName}`}
          description="Consulta en curso"
          icon={<FaUserMd className="text-sky-500" />}
          profileImage={user?.profileImage?.url}
          setUser={setUser}
        />
        <div className="p-6 max-w-7xl mx-auto">
          <div className="mb-4 flex justify-between items-center">
            <button
              onClick={() => setActiveCall(null)}
              className="btn btn-ghost gap-2"
            >
              ← Volver a la lista
            </button>
          </div>
          <JitsiMeet
            roomName={activeCall.roomName || ''}
            server="https://localhost:8443"
            displayName={`Dr. ${user?.name} ${user?.lastName}`}
            email={user?.email}
            role="moderator"
            status="IN_PROGRESS"
          />
        </div>
      </div>
    );
  }

  // Vista de lista de consultas (código existente)
  return (
    <div className="min-h-screen bg-gray-50">
      <SectionHeader
        title="Guardia Online"
        description="Gestiona las consultas de guardia en tiempo real y atiende a los pacientes que necesitan asistencia."
        icon={<FaUserMd className="text-sky-500" />}
        profileImage={user?.profileImage?.url}
        setUser={setUser}
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
              className={`bg-white rounded-xl border transition-all ${
                consultation.status === 'waiting' 
                  ? 'border-yellow-200 hover:border-yellow-300' 
                  : 'border-gray-200 hover:border-sky-200'
              }`}
            >
              {/* Cabecera principal siempre visible */}
              <div 
                className="px-6 py-4 flex justify-between items-center cursor-pointer"
                onClick={() => toggleExpand(consultation.id)}
              >
                <div className="flex items-center gap-6">
                  <FaChevronRight 
                    className={`text-gray-400 transform transition-transform duration-300 ${
                      expandedConsultation === consultation.id ? 'rotate-90' : ''
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
                  {consultation.status === 'WAITING' && (
                    <button
                      className="p-2 rounded-full bg-green-200 hover:bg-green-100 text-green-600 transition-colors"
                      onClick={(e) => handleJoinCall(consultation, e)}
                      title="Atender paciente"
                    >
                      <FaVideo className="text-xl" />
                    </button>
                  )}
                </div>
              </div>

              {/* Contenido expandible */}
              <div
                className={`
                  grid grid-cols-3 gap-6 px-6 pb-6 overflow-hidden transition-all duration-300
                  ${expandedConsultation === consultation.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
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