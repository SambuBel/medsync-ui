"use client";
import { useState } from "react";
import InputField from "@/components/Register/InputField";
import { GenderEnum } from "@/utils/constants/Appointment";
import SnackBar from "../common/SnackBar";
import CollapsibleCard from "../common/CollapsibleCard";
import { FiUser, FiBriefcase } from "react-icons/fi";

export interface Doctor {
    specialty: string[];
    license: string;
    licenseType: string;
    experience?: number;
    description?: string;
    education?: string;
  }

export interface User {
  name: string;
  lastName: string;
  phone: string;
  address?: string;
  email: string;
  gender?: GenderEnum;
  role: "DOCTOR" | "PATIENT";
  doctor?: Doctor | null;
  profileImage?: {
    url: string
  };
}

interface ProfilePersonalDataProps {
  user: User
}

const ProfilePersonalData: React.FC<ProfilePersonalDataProps> = ({ user }) => {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    lastName: user?.lastName || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  const [doctorData, setDoctorData] = useState({
    specialty: user?.doctor?.specialty || [],
    license: user?.doctor?.license || "",
    licenseType: user?.doctor?.licenseType || "",
    education: user?.doctor?.education || "",
    experience: user?.doctor?.experience || "",
  });

  const [loading, setLoading] = useState(false);
  const [snackBar, setSnackBar] = useState({ show: false, message: "", type: "success" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDoctorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setDoctorData({ ...doctorData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al actualizar perfil");
  
      setSnackBar({ show: true, message: "Datos actualizados correctamente.", type: "success" });

    } catch (error) {
        setSnackBar({ show: true, message: `❌ ${error.message}`, type: "error" });
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="bg-white h-full p-6 rounded-lg max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 🔹 Información Personal */}
        <CollapsibleCard title="Datos Personales" icon={<FiUser size={20} />} defaultOpen={false}>
          <div className="gap-4 flex flex-col py-8">
            <InputField label="Nombre" name="name" value={formData.name} onChange={handleChange} />
            <InputField label="Apellido" name="lastName" value={formData.lastName} onChange={handleChange} />
            <InputField label="Teléfono" name="phone" value={formData.phone} onChange={handleChange} />
            <InputField label="Dirección" name="address" value={formData.address} onChange={handleChange} />
            <InputField disabled label="Email" name="email" value={user.email} onChange={() => {}} />
          </div>
        </CollapsibleCard>

        {/* 🔹 Sección de Datos Profesionales (Solo para DOCTORES) */}
        {user.role === "DOCTOR" && (
          <CollapsibleCard title="Mi documentación" icon={<FiBriefcase size={20} />} defaultOpen={false}>
            <div className="gap-4 flex flex-col mt-10 py-8">
              <InputField label="Especialidad" name="specialty" value={doctorData.specialty.toString()} onChange={handleDoctorChange} />
              <InputField label="Licencia" name="license" value={doctorData.license} onChange={handleDoctorChange} />
              <InputField label="Tipo de Licencia" name="licenseType" value={doctorData.licenseType} onChange={handleDoctorChange} />
              <InputField label="Educación" name="education" value={doctorData.education} onChange={handleDoctorChange} />
              <InputField label="Experiencia (años)" type="number" name="experience" value={doctorData.experience.toString()} onChange={handleDoctorChange} />
            </div>
        </CollapsibleCard>
        )}

        {/* 🔹 Botón de Guardar */}
        <div className="pt-4">
          <button
            type="submit"
            className="btn btn-primary w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-all"
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      </form>
      {snackBar.show && <SnackBar message={snackBar.message} type={snackBar.type} onClose={() => setSnackBar({ show: false, message: "", type: "success" })} />}
    </div>
  );
};

export default ProfilePersonalData;
