"use client";
import { useState } from "react";
import ModalComponent from "./ModalComponent";
import { FaCamera } from "react-icons/fa";
import SnackBar from "../common/SnackBar";
import { User } from "./ProfilePersonalData";

interface ProfileAvatarProps {
  profileImage?: string;
  setUser: (user: User) => void;
  size?: number;
}

const ProfileAvatar = ({ profileImage, setUser, size = 24 }: ProfileAvatarProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{ message: string; type: "success" | "error" | "info" | "warning" } | null>(null);

  // 🔹 Manejar la selección de archivo
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Previsualizar la imagen seleccionada
    }
  };

  // 🔹 Subir la imagen al backend
  const handleUpload = async () => {
    if (!selectedFile) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await fetch("/api/files", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al subir la imagen");

      setSnackbar({ message: "Imagen subida correctamente.", type: "success" });
      setIsModalOpen(false);
      setPreviewUrl(null);

      // 🔹 Obtener el perfil actualizado del usuario
      const updatedUserRes = await fetch("/api/profile");
      const updatedUserData = await updatedUserRes.json();
      setUser(updatedUserData);
    } catch (error) {
      setSnackbar({ message: `❌ ${error.message}`, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 🔹 Contenedor del Avatar */}
      <div className="relative group cursor-pointer" onClick={() => setIsModalOpen(true)}>
        <div className={`w-${size} h-${size} rounded-full border-2 border-gray-300 shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105`}>
          <img
            src={profileImage || "/images/avatar-default.png"}
            alt="Foto de perfil"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 🔹 Ícono de cámara cuando se pasa el mouse */}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all">
          <FaCamera className="text-lg" />
        </div>
      </div>

      {/* 🔹 Modal para cambiar la imagen de perfil */}
      <ModalComponent isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Actualizar Foto de Perfil">
        <p className="text-gray-600 text-center">Selecciona una nueva imagen para tu perfil.</p>

        {/* 🔹 Previsualización de la imagen */}
        {previewUrl && (
          <div className="my-4 flex justify-center">
            <img src={previewUrl} alt="Vista previa" className="w-32 h-32 object-cover rounded-full border border-gray-300 shadow-md" />
          </div>
        )}

        <input type="file" accept="image/*" onChange={handleFileChange} className="mt-3 w-full cursor-pointer" />

        <button
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all shadow-md"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? "Subiendo..." : "Subir Imagen"}
        </button>
      </ModalComponent>

      {/* 🔹 SnackBar para mostrar mensajes */}
      {snackbar && <SnackBar message={snackbar.message} type={snackbar.type} onClose={() => setSnackbar(null)} />}
    </>
  );
};

export default ProfileAvatar;
