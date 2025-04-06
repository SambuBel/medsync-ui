'use client';
import { useState, useRef, useEffect } from 'react';
import JitsiMeet from '@/components/common/JitsiMeet';

const symptomsList = [
  'Fiebre',
  'Dolor de cabeza',
  'Vómitos',
  'Dolor abdominal',
  'Dificultad para respirar',
  'Dolor en el pecho',
  'Sangrado',
];

export default function GuardiaRoomPage() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [roomData, setRoomData] = useState<any>(null);

  const handleToggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/guardia/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symptoms: selectedSymptoms,
          additionalInfo,
        }),
      });

      if (!res.ok) throw new Error('Error al crear la visita');

      const data = await res.json();
      setRoomData(data); // Guardamos datos de Jitsi para mostrar luego
    } catch (err) {
      console.error(err);
      alert('Ocurrió un error al iniciar la guardia.');
    } finally {
      setLoading(false);
    }
  };

  if (roomData) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Guardia Virtual</h2>
        <JitsiMeet
          roomName={roomData.roomName}
          server={roomData.server}
          displayName={roomData.displayName}
          email={roomData.email}
        />
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Ingresar a guardia
      </h2>
      <p className="mb-4 text-gray-600">Seleccioná tus síntomas:</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
        {symptomsList.map((symptom) => (
          <label key={symptom} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedSymptoms.includes(symptom)}
              onChange={() => handleToggleSymptom(symptom)}
            />
            {symptom}
          </label>
        ))}
      </div>

      <label className="block mb-2 text-gray-600 font-medium">
        Otros síntomas o información:
      </label>
      <textarea
        className="w-full border p-2 rounded mb-4"
        rows={4}
        value={additionalInfo}
        onChange={(e) => setAdditionalInfo(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Ingresando...' : 'Ingresar a la guardia'}
      </button>
    </div>
  );
}
