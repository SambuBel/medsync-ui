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

        alert("✅ Turno agendado con éxito");
      } catch (err) {
        console.error(err);
        alert("❌ Error al agendar el turno");
      }
    };

    return (
      <div className="p-6  space-y-6">
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
              onSelect={(doc, time, dayOfWeek) => {
                const today = new Date();
                const currentDay = today.getDay();
                let daysToAdd = (dayOfWeek - currentDay + 7) % 7;
                const isToday = dayOfWeek === currentDay;
                if (isToday) daysToAdd = 0;

                const selectedDate = new Date();
                selectedDate.setDate(today.getDate() + daysToAdd);
              
                setSelectedDoctor(doc);
                setSelectedTime(time);
                setSelectedDate(selectedDate);
                setStep(3);
              }}
              
              loading={loading}
            />
            <div className="flex justify-end mt-4">
              <button onClick={handleBack} className="btn btn-sm btn-outline">Volver</button>
            </div>
          </>
        )}

        {step === 3 && selectedDoctor && selectedTime && (
          <AppointmentSummary
            doctor={selectedDoctor}
            date={new Date().toISOString()}
            time={selectedTime}
            onConfirm={handleSubmit}
            onBack={handleBack}
          />
        )}
      </div>
    );
  };

  export default AppointmentStepper;
