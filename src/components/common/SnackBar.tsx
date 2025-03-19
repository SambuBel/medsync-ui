import { useEffect } from "react";
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from "react-icons/fa";

const variants = {
  success: "bg-green-500 text-white",
  error: "bg-red-500 text-white",
  warning: "bg-yellow-500 text-gray-900",
  info: "bg-blue-500 text-white",
};

const icons = {
  success: <FaCheckCircle className="text-white text-lg" />,
  error: <FaExclamationCircle className="text-white text-lg" />,
  warning: <FaExclamationCircle className="text-gray-900 text-lg" />,
  info: <FaInfoCircle className="text-white text-lg" />,
};

interface SnackBarProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  onClose: () => void;
  duration?: number;
}

const SnackBar = ({ message, type = "info", onClose, duration = 5000 }: SnackBarProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div
      className={`fixed bottom-10 left-1/2 transform -translate-x-1/2 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 ${variants[type]}`}
    >
      {icons[type]}
      <span className="font-medium">{message}</span>
      <button onClick={onClose} className="ml-4 focus:outline-none">
        <FaTimes className="text-white text-lg" />
      </button>
    </div>
  );
};

export default SnackBar;
