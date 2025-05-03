"use client";
import { useState } from "react";
import { resetPassword } from "@/firebase/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    try {
      const response = await resetPassword(email);
      setMessage(response);
    } catch {
      setMessage("⚠️ Error al enviar el correo.");
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-700">Restablecer Contraseña</h2>
      <input
        type="email"
        className="input input-bordered w-full mt-4"
        placeholder="Ingresa tu correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleReset} className="btn btn-primary w-full mt-4">
        Enviar enlace
      </button>
      {message && <p className="text-sm text-gray-600 mt-2">{message}</p>}
    </div>
  );
};

export default ForgotPassword;
