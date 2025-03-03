"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaCalendarAlt, FaSignOutAlt, FaHeartbeat, FaFileMedical } from "react-icons/fa";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch("/api/profile");

      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        router.push("/");
      }
      setLoading(false);
    }

    fetchProfile();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });

    // Redirigir al usuario a la página de inicio
    router.push("/");
  };

  if (loading) return <p className="text-center mt-10">Cargando...</p>;
  if (!user) return <p className="text-center mt-10">No autorizado</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-12 px-4">
      {/* 🔹 Tarjeta del Usuario */}
      <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-lg text-center">
        <div className="avatar mb-4">
          <div className="w-24 h-24 rounded-full border-4 border-primary mx-auto">
            <FaUser className="w-full h-full text-gray-500" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">{user.email}</h2>
        <p className="text-gray-600 text-sm">{user.role}</p>
      </div>

      {/* 🔹 Accesos Rápidos */}
      <div className="grid grid-cols-2 gap-6 mt-8 max-w-lg w-full">
        <button className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center justify-center hover:bg-blue-100 transition-all">
          <FaCalendarAlt className="text-3xl text-primary mb-2" />
          <p className="text-gray-700 text-sm font-medium">Mis Turnos</p>
        </button>
        <button className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center justify-center hover:bg-blue-100 transition-all">
          <FaHeartbeat className="text-3xl text-primary mb-2" />
          <p className="text-gray-700 text-sm font-medium">Historial Médico</p>
        </button>
        <button className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center justify-center hover:bg-blue-100 transition-all">
          <FaFileMedical className="text-3xl text-primary mb-2" />
          <p className="text-gray-700 text-sm font-medium">Recetas</p>
        </button>
        <button
          className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center justify-center hover:bg-red-100 transition-all"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="text-3xl text-red-500 mb-2" />
          <p className="text-gray-700 text-sm font-medium">Cerrar Sesión</p>
        </button>
      </div>
    </div>
  );
}
