"use client";

import { useEffect, useState } from "react";
import StepSelectSpecialty from "./StepSelectSpecialty";
import StepSelectDoctor from "./StepSelectDoctor";
import AppointmentSummary from "./AppointmentSummary";

const AppointmentStepper = () => {
  const [step, setStep] = useState(1);
  const [specialty, setSpecialty] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (specialty) fetchDoctors();
  }, [specialty]);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/doctors?specialty=${specialty}`);
      const data = await res.json();
      setDoctors(data);
    } catch (error) {
      console.error("Error al obtener médicos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) return;
    try {
      const tokenRes = await fetch("/api/auth/token", { credentials: "include" });
      const tokenData = await tokenRes.json();

      if (!tokenData.token) {
        alert("Debes iniciar sesión para agendar un turno.");
        return;
      }

      const localDateTime = new Date(selectedDate);
      const [h, m] = selectedTime.split(":");
      localDateTime.setHours(parseInt(h), parseInt(m), 0, 0);
      const utcDateTime = new Date(localDateTime.getTime() - localDateTime.getTimezoneOffset() * 60000);

      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData.token}`,
        },
        body: JSON.stringify({
          doctorId: selectedDoctor.id,
          date: utcDateTime.toISOString(),
          specialty,
        }),
      });

      if (!res.ok) throw new Error("Error al agendar el turno");

      showSuccessAndRedirect();
    } catch (err) {
      console.error(err);
      alert("❌ Error al agendar el turno");
    }
  };

  const showSuccessAndRedirect = () => {
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      window.location.href = "/profile";
    }, 3000);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="p-6  space-y-6 max-w-screen-lg w-full">
        <h2 className="text-2xl font-bold text-gray-800">Agendar Turno</h2>

        {step === 1 && (
          <>
            <h3 className="text-md text-gray-700 font-semibold mb-2">Selecciona una especialidad</h3>
            <StepSelectSpecialty selected={specialty} onSelect={(val) => { setSpecialty(val); setStep(2); }} />
          </>
        )}

        {step === 2 && (
          <>
            <h3 className="text-md text-gray-700 font-semibold mb-2">Selecciona un profesional</h3>
            <StepSelectDoctor
              doctors={doctors}
              selectedDoctor={selectedDoctor}
              onSelect={(doc, time, dayOfWeek, date) => {
                const today = new Date();
                const currentDay = today.getDay();
                let daysToAdd = (dayOfWeek - currentDay + 7) % 7;
                const isToday = dayOfWeek === currentDay;
                if (isToday) daysToAdd = 0;

                const selectedDate = new Date();
                selectedDate.setDate(today.getDate() + daysToAdd);
              
                setSelectedDoctor(doc);
                setSelectedTime(time);
                setSelectedDate(new Date(date));
                setStep(3);
              }}
              
              loading={loading}
            />
            {!loading && <div className="flex justify-end mt-4">
              <button onClick={handleBack} className="border border-sky-400 flex items-center gap-2 bg-sky-500 text-sm font-semibold text-white hover:bg-sky-600 hover:text-sky-100 px-8 py-2 rounded">Volver</button>
            </div>}
          </>
        )}

        {step === 3 && selectedDoctor && selectedTime && (
          <AppointmentSummary
            doctor={selectedDoctor}
            date={selectedDate?.toISOString() || ""}
            time={selectedTime}
            onConfirm={handleSubmit}
            onBack={handleBack}
          />
        )}
      </div>
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 transition-all">
          <div className="bg-green-50 border-l-8 border-green-600 text-green-800 px-10 py-8 rounded-2xl shadow-xl w-full max-w-xl text-center animate-fadeInUp">
            <div className="flex flex-col items-center gap-4">
              <div className="text-7xl animate-bounce">😄</div>

              <h2 className="text-2xl font-bold">¡Turno agendado con éxito!</h2>
              <p className="text-md text-green-800">
                Serás redirigido a tu perfil en unos segundos...
              </p>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  window.location.href = "/profile";
                }}
                className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
              >
                Ir ahora
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentStepper;
