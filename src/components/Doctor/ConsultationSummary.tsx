'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaFileMedical, FaPrescriptionBottleAlt, FaUserMd, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

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
    if (!clinicalNote.content.trim()) {
      alert('La nota clínica no puede estar vacía');
      return;
    }

    setLoading(true);
    try {
      await fetch(`/api/consultations/${visitId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clinicalNote),
      });

      // Si quieres, puedes actualizar el estado o redirigir
      router.push('/profile?tab=active-consultations');
    } catch (error) {
      console.error("Error al guardar la nota clínica", error);
      alert('Ocurrió un error al guardar la nota clínica');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl shadow p-6 mb-8 border-b-2 border-blue-100 flex items-center gap-5">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100">
          <FaUserMd className="text-3xl text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Resumen de Consulta</h2>
          <p className="text-gray-500 text-sm mt-1">Paciente: <span className="font-semibold">{patientName || 'No especificado'}</span></p>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="bg-white rounded-xl shadow p-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab('notes')}
            className={`flex items-center gap-2 px-5 py-2 rounded-full font-semibold transition-colors duration-200
              ${activeTab === 'notes'
                ? 'bg-blue-600 text-white shadow'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`}
          >
            <FaFileMedical />
            Notas Clínicas
          </button>
          <button
            onClick={() => setActiveTab('prescription')}
            className={`flex items-center gap-2 px-5 py-2 rounded-full font-semibold transition-colors duration-200
              ${activeTab === 'prescription'
                ? 'bg-blue-600 text-white shadow'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`}
          >
            <FaPrescriptionBottleAlt />
            Prescripción
          </button>
        </div>

        {/* Panel de Notas Clínicas */}
        {activeTab === 'notes' && (
          <div className="space-y-4">
            <select
              className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-400 text-gray-700"
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
            <textarea
              className="w-full p-4 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-400 min-h-[160px] text-gray-700 placeholder-gray-400"
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
              className="w-full p-4 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-400 min-h-[160px] text-gray-700 placeholder-gray-400"
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
        <div className="flex flex-col md:flex-row justify-end gap-4 mt-8 pt-6 border-t">
          <button
            onClick={() => router.push('/profile?tab=active-consultations')}
            className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors"
            disabled={loading}
          >
            <FaTimesCircle />
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="animate-spin">⌛</span>
                Guardando...
              </>
            ) : (
              <>
                <FaCheckCircle />
                Finalizar Consulta
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}