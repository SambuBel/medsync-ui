"use client";
import { useEffect } from "react";

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const ModalComponent = ({ isOpen, onClose, title, children }: ModalComponentProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        {title && <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>}
        {children}
        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition-all"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ModalComponent;
