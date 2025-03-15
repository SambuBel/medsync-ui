"use client";
import { useState, useEffect } from "react";
import { FaUserMd, FaClock } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SpecialtyEnum } from "@/utils/constants/Appointment";

const AppointmentModal = ({ isOpen, onClose }) => {
  const [specialty, setSpecialty] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (specialty) {
      fetchDoctors();
    }
  }, [specialty]);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/doctors?specialty=${specialty}`);
      const data = await res.json();
      setDoctors(data);
    } catch (error) {
      console.error("Error obteniendo médicos:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const handleSpecialtyChange = (event) => {
    console.log("ESPECIALIDAD : ", event.target.value)
    setSpecialty(event.target.value);
    setSelectedDoctor(null);
    setSelectedDate(null);
    setAvailableTimes([]);
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setAvailableTimes(doctor.availableTimes);
    setSelectedDate(null);
    setSelectedTime("");
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime("");
  };

  const handleSubmit = async () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) return;
    try {
      const tokenRes = await fetch("/api/auth/token", { credentials: "include" });
      const tokenData = await tokenRes.json();
  
      if (!tokenRes.ok || !tokenData.token) {
        alert("⚠️ Debes iniciar sesión para agendar un turno.");
        return;
      }
  
      const token = tokenData.token;
      
      // ✅ Ajustar la fecha y hora antes de enviarla
      const localDateTime = new Date(selectedDate);
      const [hours, minutes] = selectedTime.split(":");
      localDateTime.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
      
      // ✅ Ajustar la hora manualmente a UTC antes de enviarla
      const utcDateTime = new Date(localDateTime.getTime() - localDateTime.getTimezoneOffset() * 60000);      
  
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          doctorId: selectedDoctor.id,
          date:  utcDateTime.toISOString(),
          specialty: specialty,
        }),
        credentials: "include",
      });
  
      if (!res.ok) {
        throw new Error("❌ Error al agendar el turno");
      }
  
      alert("✅ Turno agendado con éxito");
      onClose();
    } catch (error) {
      console.error(error);
      alert("❌ Error al agendar el turno");
    }
  };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-4xl h-[90vh] flex flex-col overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Agendar Turno</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Especialidad</label>
          <select value={specialty} onChange={handleSpecialtyChange} className="select select-bordered w-full mt-2">
            <option value="">Seleccione una especialidad</option>
            {Object.keys(SpecialtyEnum).map((spec) => (
              <option key={spec} value={spec}>{SpecialtyEnum[spec]}</option>
            ))}
          </select>
        </div>

        {specialty && (
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Seleccione un médico</label>
            <div className="grid grid-cols-2 gap-4">
              {loading ? (
                <p className="text-gray-500 text-center">Cargando médicos...</p>
              ) : (
                doctors.length > 0 ? (
                  doctors.map((doctor) => (
                    <button
                      key={doctor.id}
                      onClick={() => handleDoctorSelect(doctor)}
                      className={`p-4 border rounded-lg shadow-md flex flex-col items-center hover:bg-gray-100 transition-all ${selectedDoctor?.id === doctor.id ? "border-blue-500 bg-blue-100" : "border-gray-300"}`}
                    >
                      <FaUserMd className="text-3xl text-blue-500 mb-2" />
                      <p className="text-blue-600 font-semibold">{doctor.user.name}</p>
                      <p className="text-gray-500 text-sm">{doctor.user.email}</p>
                    </button>
                  ))
                ) : (
                  <span className="text-gray-500 text-lg text-center w-full block">No hay médicos disponibles</span>
                )
              )}
            </div>
          </div>
        )}

        {selectedDoctor && (
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Seleccione un día</label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              className="input input-bordered w-full bg-white text-gray-800"
              minDate={new Date()}
              calendarClassName="bg-white shadow-md rounded-lg p-2"
            />
          </div>
        )}

        {selectedDoctor && selectedDate && availableTimes?.length > 0 && (
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Seleccione un horario</label>
            <div className="grid grid-cols-3 gap-2">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-2 border rounded-md shadow-md transition-all ${selectedTime === time ? "bg-blue-500 text-white" : "border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-200"}`}
                >
                  <FaClock className="inline mr-1" /> {time}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-auto flex justify-end gap-4 pb-6">
          <button onClick={onClose} className="btn btn-outline">Cancelar</button>
          <button onClick={handleSubmit} className="btn btn-primary" disabled={!selectedTime}>Confirmar</button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;