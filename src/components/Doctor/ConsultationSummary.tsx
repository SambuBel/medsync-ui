'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaFileMedical, FaPrescriptionBottleAlt, FaUserMd } from 'react-icons/fa';

type NoteType = 'GENERAL' | 'DIAGNOSIS' | 'PRESCRIPTION' | 'FOLLOW_UP' | 'DERIVATION';

interface ClinicalNoteForm {
  noteType: NoteType;
  content: string;
}

interface ConsultationSummaryProps {
  visitId: string;
  patientName: string | null;
}

export default function DoctorConsultationSummary({ visitId, patientName }: ConsultationSummaryProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'notes' | 'prescription'>('notes');
  const [clinicalNote, setClinicalNote] = useState<ClinicalNoteForm>({
    noteType: 'GENERAL',
    content: '',
  });
  const [prescription, setPrescription] = useState({
    medication: '',
  });

  // Añadir efecto para cargar datos existentes si los hay
  useEffect(() => {
    const loadExistingData = async () => {
      try {
        const response = await fetch(`/api/consultations/${visitId}/documents`);
        if (response.ok) {
          const data = await response.json();
          // Actualizar el estado con notas/prescripciones existentes
          if (data.clinicalNotes?.length) {
            setClinicalNote(data.clinicalNotes[0]);
          }
          // ... manejar otros datos
        }
      } catch (error) {
        console.error('Error loading existing data:', error);
      }
    };

    loadExistingData();
  }, [visitId]);

  const handleSubmit = async () => {
    if (!visitId) {
      alert('ID de visita no encontrado');
      return;
    }
    
    setLoading(true);
    try {
      // 1. Guardar nota clínica
      if (clinicalNote.content.trim()) {
        await fetch(`/api/consultations/${visitId}/notes`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(clinicalNote),
        });
      }

      // 2. Guardar prescripción
      if (prescription.medication.trim()) {
        await fetch(`/api/consultations/${visitId}/prescriptions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(prescription),
        });
      }

      // 3. Marcar consulta como completada
      await fetch(`/api/consultations/emergency/${visitId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'COMPLETED' }),
      });

      router.push('/profile?tab=active-consultations');
    } catch (error) {
      console.error('Error al guardar el resumen:', error);
      alert('Ocurrió un error al guardar el resumen de la consulta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Encabezado */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <FaUserMd className="text-3xl text-blue-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Resumen de Consulta
            </h2>
            <p className="text-gray-600">Paciente: {patientName || 'No especificado'}</p>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('notes')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'notes'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FaFileMedical />
            Notas Clínicas
          </button>
          <button
            onClick={() => setActiveTab('prescription')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'prescription'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FaPrescriptionBottleAlt />
            Prescripción
          </button>
        </div>

        {/* Panel de Notas Clínicas */}
        {activeTab === 'notes' && (
          <div className="space-y-4">
            <div className="flex gap-4">
              <select
                className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={clinicalNote.noteType}
                onChange={(e) => setClinicalNote({
                  ...clinicalNote,
                  noteType: e.target.value as NoteType
                })}
              >
                <option value="GENERAL">Nota General</option>
                <option value="DIAGNOSIS">Diagnóstico</option>
                <option value="PRESCRIPTION">Indicaciones de Prescripción</option>
                <option value="FOLLOW_UP">Seguimiento</option>
                <option value="DERIVATION">Derivación</option>
              </select>
            </div>
            <textarea
              className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 min-h-[200px]"
              placeholder="Ingrese la nota clínica detallada..."
              value={clinicalNote.content}
              onChange={(e) => setClinicalNote({
                ...clinicalNote,
                content: e.target.value
              })}
            />
          </div>
        )}

        {/* Panel de Prescripción */}
        {activeTab === 'prescription' && (
          <div className="space-y-4">
            <textarea
              className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 min-h-[200px]"
              placeholder="Ingrese los medicamentos recetados y sus indicaciones..."
              value={prescription.medication}
              onChange={(e) => setPrescription({
                ...prescription,
                medication: e.target.value
              })}
            />
          </div>
        )}

        {/* Botones de Acción */}
        <div className="flex justify-end gap-4 mt-6 pt-6 border-t">
          <button
            onClick={() => router.push('/profile?tab=active-consultations')}
            className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="animate-spin">⌛</span>
                Guardando...
              </>
            ) : (
              'Finalizar Consulta'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}