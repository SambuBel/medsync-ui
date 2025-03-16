import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ModalComponent = ({ message, onClose }: { message: string; onClose: () => void }) => {
  const [countdown, setCountdown] = useState(7);
  const router = useRouter();

  useEffect(() => {
    if (message.includes("Cuenta creada con éxito")) {
      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      const timeout = setTimeout(() => {
        router.push("/");
      }, 7000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [message, router]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96">
        <h2 className="text-xl font-semibold text-gray-800">
          {message.includes("Usuario registrado exitosamente")
            ? "🎉 Cuenta creada con éxito!"
            : "⚠️ Atención"}
        </h2>
        <p className="text-gray-600 mt-2">
          {message.includes("Usuario registrado exitosamente")
            ? "Te hemos enviado un correo de confirmación. Por favor revisa tu bandeja de entrada."
            : message}
        </p>
        {message.includes("Usuario registrado exitosamente") && (
          <p className="text-gray-500 mt-3">
            Serás redirigido a la página principal en <strong>{countdown}</strong> segundos...
          </p>
        )}
        <button onClick={onClose} className="btn btn-primary text-white mt-4">
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ModalComponent;
