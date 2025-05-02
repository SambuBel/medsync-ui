'use client';
import { useState } from 'react';
import WaitingRoom from './WaitingRoom';
import { User } from '../Profile/ProfilePersonalData';

interface RoomData {
  roomName: string;
  server: string;
  displayName: string;
  email: string;
  role: 'patient' | 'moderator';
  status: 'WAITING' | 'IN_PROGRESS' | 'COMPLETED';
}

interface GuardiaFormPageProps {
  user: User;
}

const symptomsList = [
  'Fiebre',
  'Dolor de cabeza',
  'Vómitos',
  'Dolor abdominal',
  'Dificultad para respirar',
  'Dolor en el pecho',
  'Sangrado',
];

export default function GuardiaFormPage({ user }: GuardiaFormPageProps) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [roomData, setRoomData] = useState<RoomData | null>(null);

  const handleToggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSubmit = async () => {
    if (!user.id) {
      alert('Error: No se pudo identificar al usuario. Por favor, recarga la página.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/guardia/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symptoms: selectedSymptoms,
          additionalInfo,
          user: {
            id: user.id,
            name: user.name,
            lastName: user.lastName,
            email: user.email
          }
        }),
      });

      if (!res.ok) throw new Error('Error al crear la visita');

      const data = await res.json();
      setRoomData(data);
    } catch (err) {
      console.error(err);
      alert('Ocurrió un error al iniciar la guardia.');
    } finally {
      setLoading(false);
    }
  };

  if (roomData && user.id) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Guardia Virtual</h2>
        <WaitingRoom
          roomName={roomData.roomName}
          user={{ ...user, id: user.id }}
        />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200 mt-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">🚨 Ingreso a Guardia</h2>

      <p className="mb-4 text-gray-600 text-center">Seleccioná tus síntomas para priorizar la atención:</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {symptomsList.map((symptom) => (
          <label key={symptom} className="flex items-center gap-2 text-gray-800">
            <input
              type="checkbox"
              checked={selectedSymptoms.includes(symptom)}
              onChange={() => handleToggleSymptom(symptom)}
              className="accent-sky-500 w-5 h-5"
            />
            <span>{symptom}</span>
          </label>
        ))}
      </div>

      <label className="block mb-2 text-gray-700 font-medium">Otros síntomas o comentarios:</label>
      <textarea
        className="w-full border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:outline-none p-3 rounded mb-6 bg-white text-gray-800 resize-none"
        rows={4}
        placeholder="Escribí cualquier detalle adicional que quieras compartir..."
        value={additionalInfo}
        onChange={(e) => setAdditionalInfo(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-sky-500 hover:bg-sky-600 transition text-white font-semibold py-3 rounded-lg shadow"
        disabled={loading}
      >
        {loading ? 'Ingresando...' : 'Ingresar a la guardia'}
      </button>
    </div>
  );
}
