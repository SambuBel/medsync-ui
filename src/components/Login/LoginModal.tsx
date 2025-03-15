"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaTimes } from "react-icons/fa";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Error al iniciar sesión");
        return;
      }

      console.log("✅ Login exitoso!");
      onClose(); // 🔒 Cierra el modal
      router.push("/profile"); // 🔄 Redirige al usuario al perfil
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96 relative">
        {/* 🔹 Botón para cerrar */}
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          <FaTimes size={18} />
        </button>

        {/* 🔹 Título */}
        <h2 className="text-2xl font-semibold text-gray-800 text-center">Iniciar Sesión</h2>
        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

        {/* 🔹 Formulario */}
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />

          {/* 🔹 Botón de envío */}
          <button
            type="submit"
            className="btn btn-primary w-full text-white rounded-lg font-semibold hover:bg-blue-600 transition-all"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
