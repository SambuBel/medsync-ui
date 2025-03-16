"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { GenderEnum, LicenseTypeEnum, RoleEnum, SpecialtyEnum } from "@/utils/constants/Appointment";
import { motion, useAnimation } from "framer-motion";
import InputField from "@/components/Register/InputField";
import LoadingComponent from "@/components/common/LoadingComponent";
import ModalComponent from "@/components/common/ModalComponent";
import { registerWithFirebase } from "@/firebase/auth";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const BouncingBall = ({ reverse }: { reverse?: boolean }) => {
    const controls = useAnimation();
  
    useEffect(() => {
      const animateBall = async () => {
        while (true) {
          await controls.start({
            x: reverse ? [500, 0, -500, 0, 500] : [-500, 0, 500, 0, -500],
            y: [0, 300, 0, -300, 0],
            scale: [1, 1.8, 1.4, 1, 1],
            borderRadius: ["50%", "40%", "50%"],
            transition: { duration: 20, ease: "easeInOut", repeat: Infinity }
          });
        }
      };
      animateBall();
    }, [controls, reverse]);
  
    return (
      <motion.div
        animate={controls}
        className="absolute w-32 h-32 bg-blue-400 opacity-50 rounded-full"
      />
    );
  };
  
const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    lastName: "",
    phone: "",
    birthDate: "",
    gender: "",
    address: "",
    role: "",
    specialty: [],
    license: "",
    licenseType: "",
    description: "",
    education: "",
    experience: "",
    bloodType: "",
    chronicDiseases: "",
    allergies: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      await registerWithFirebase(formData.email, formData.password, formData);
  
      setModalMessage("✅ Cuenta creada con éxito. Por favor, revisa tu correo para verificar tu cuenta.");
      setShowModal(true);
    } catch (error: any) {
      setModalMessage(`❌ ${error.message}`);
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <div className="flex h-screen overflow-hidden pb-10 bg-white">
      {/* Formulario */}
      <div className="w-3/4 flex flex-col justify-center items-center p-10 bg-white overflow-y-auto h-full z-30 pb-10">
        {loading && <LoadingComponent />}
        {showModal && <ModalComponent message={modalMessage} onClose={() => setShowModal(false)} />}
        {/* 🔹 Botón para volver a la Home */}
        <div className="absolute top-6 left-6">
          <Link href="/" className="flex items-center gap-2 text-sky-500 text-sm font-semibold hover:text-sky-600">
            <FaArrowLeft className="bg-sky-500 text-white p-2 rounded-full w-8 h-8" />
            Volver
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4 h-full">
          <h2 className="text-3xl font-bold text-sky-500 text-center mb-4 py-10">Crear cuenta</h2>

          {/* Datos básicos */}
          <div className="space-y-3 flex flex-col gap-4">
            <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
            <InputField label="Contraseña" type="password" name="password" value={formData.password} onChange={handleChange} />
            <InputField label="Nombre" name="name" value={formData.name} onChange={handleChange} />
            <InputField label="Apellido" name="lastName" value={formData.lastName} onChange={handleChange} />
            <InputField label="Teléfono" name="phone" value={formData.phone} onChange={handleChange} />

            <select name="gender" value={formData.gender} onChange={handleChange} className="select select-bordered w-full bg-white text-gray-800">
              <option value="" disabled>Seleccione un género</option>
              {Object.entries(GenderEnum).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
          </div>
        <div className="border-sky-500 border-t my-10"></div>
          {/* Selección de Rol */}
          <div className="space-y-3 text-gray-400 py-10">
            <label>Con cual te identificas</label>
            <div className="flex gap-4">
              {Object.entries(RoleEnum).map(([key, value]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFormData({ ...formData, role: key })}
                  className={`btn w-1/2 btn-info border-gray-300 text-gray-400 hover:bg-blue-700 hover:text-white hover:border-none ${formData.role === key ? "bg-blue-500 text-white" : "bg-white border-gray-300"}`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          {/* Datos adicionales según el rol */}
          <div className="space-y-3 overflow-y-auto max-h-80 flex flex-col gap-4 pt-8">
            {formData.role === "DOCTOR" && (
              <>
                <label>Especialidad</label>
                <select name="specialty" multiple value={formData.specialty} onChange={handleChange} className="select select-bordered w-full bg-white text-gray-800">
                  {Object.entries(SpecialtyEnum).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </select>
                <InputField label="Licencia" name="license" value={formData.license} onChange={handleChange} />
                <label>Tipo de Licencia</label>
                <select name="licenseType" value={formData.licenseType} onChange={handleChange} className="select select-bordered w-full bg-white text-gray-800">
                  <option value="" disabled>Seleccione un tipo</option>
                  {Object.entries(LicenseTypeEnum).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </select>
                <InputField label="Educación" name="education" value={formData.education} onChange={handleChange} />
                <InputField label="Experiencia (años)" type="number" name="experience" value={formData.experience} onChange={handleChange} />
              </>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-full bg-blue-500 text-white mb-10">Registrarse</button>
        </form>
      </div>

      {/* Imagen */}
      <div className="w-1/4 h-screen relative bg-current">
        <BouncingBall />
        <BouncingBall reverse />      
        <Image src="/images/medico-01.jpg" alt="Médicos" layout="fill" objectFit="cover" className="opacity-70" />
      </div>
    </div>
  );
};

export default RegisterPage;
