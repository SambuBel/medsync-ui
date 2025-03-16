"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaPhone } from "react-icons/fa";
import InputField from "@/components/Register/InputField";
import { loginWithEmail, loginWithGoogle, loginWithPhone } from "@/firebase/auth";
import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    try {
      const firebaseUser = await loginWithEmail(email, password);
  
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firebaseUID: firebaseUser.uid }),
      });
 
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Error al iniciar sesión");
        return;
      }
  
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
  
      console.log("✅ Login exitoso!");
      router.push("/profile");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const firebaseUser = await loginWithGoogle();
      console.log("✅ Usuario autenticado con Google:", firebaseUser);
      router.push("/profile");
    } catch (error) {
      setError("Error en Google Login");
    }
  };

  const handlePhoneLogin = async () => {
    try {
      const phoneNumber = prompt("Ingrese su número de teléfono");
      if (!phoneNumber) return;
  
      const confirmationResult = await loginWithPhone(phoneNumber);
      const code = prompt("Ingrese el código de verificación enviado por SMS");
      
      if (code) {
        await confirmationResult.confirm(code);
        console.log("✅ Usuario autenticado con Teléfono");
        router.push("/profile");
      }
    } catch (error) {
      setError("Error en Login con Teléfono");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-sky-500 bg-opacity-50 z-50 h-screen">
      <div className="absolute top-6 left-6 hover:opacity-90">
        <Link href="/" className="flex items-center gap-2 text-white text-sm font-semibold ">
          <FaArrowLeft className="bg-white text-sky-500 p-2 rounded-full w-8 h-8" />
          Volver
        </Link>
      </div>
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96 relative">
        {/* 🔹 Título */}
        <h2 className="text-2xl font-semibold text-gray-800 text-center">Iniciar Sesión</h2>
        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

        {/* 🔹 Formulario */}
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <InputField label="Correo Electrónico" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <InputField label="Contraseña" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <a href="/forgot-password" className="text-blue-500 hover:underline text-sm">
            ¿Olvidaste tu contraseña?
            </a>

          {/* 🔹 Recordar Usuario */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="checkbox checkbox-primary bg-white"
            />
            <label className="text-gray-700 text-sm">Recordar usuario</label>
          </div>

          {/* 🔹 Botón de envío */}
          <button
            type="submit"
            className="btn btn-primary w-full text-white rounded-lg font-semibold hover:bg-blue-600 transition-all"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>

        {/* 🔹 Separador */}
        <div className="flex items-center my-4">
          <hr className="flex-1 border-gray-300" />
          <span className="px-2 text-gray-400 text-sm">O ingresa con</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* 🔹 Botones de login alternativo */}
        <button onClick={handleGoogleLogin} className="btn btn-outline w-full flex items-center gap-2 hover:bg-gray-100">
          <Image src="/images/google-logo.png"
            alt="Logo google"
            width={20}
            height={20}
            className="rounded-lg object-cover overflow-hidden" /> Continuar con Google
        </button>
        <button onClick={handlePhoneLogin} className="btn btn-outline w-full flex items-center gap-2 mt-2 hover:bg-gray-100">
          <FaPhone className="text-green-500" /> Teléfono
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
