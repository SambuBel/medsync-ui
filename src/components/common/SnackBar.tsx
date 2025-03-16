"use client";
import { useEffect } from "react";
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from "react-icons/fa";

type SnackBarType = "success" | "error" | "warning" | "info";

interface SnackBarProps {
  message: string;
  type?: SnackBarType;
  onClose: () => void;
  duration?: number;
}

const variants: Record<SnackBarType, string> = {
  success: "bg-green-500 text-white",
  error: "bg-red-500 text-white",
  warning: "bg-yellow-500 text-gray-900",
  info: "bg-blue-500 text-white",
};

const icons: Record<SnackBarType, JSX.Element> = {
  success: <FaCheckCircle className="text-white text-2xl" />, 
  error: <FaExclamationCircle className="text-white text-2xl" />, 
  warning: <FaExclamationCircle className="text-gray-900 text-2xl" />, 
  info: <FaInfoCircle className="text-white text-2xl" />, 
};

const SnackBar: React.FC<SnackBarProps> = ({ message, type = "info", onClose, duration = 5000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div 
      className={`fixed bottom-0 left-0 w-full px-6 py-5 h-20 flex items-center justify-between ${variants[type]} shadow-lg transition-transform duration-500 ease-in-out`}
    > 
      <div className="flex items-center gap-4">
        {icons[type]}
        <span className="font-medium text-lg">{message}</span>
      </div>
      <button onClick={onClose} className="focus:outline-none">
        <FaTimes className="text-white text-2xl" />
      </button>
    </div>
  );
};

export default SnackBar;
