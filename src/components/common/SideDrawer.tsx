import React from "react";

type SideDrawerProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string; // opcional, por defecto 400px
  title?: string; // opcional, para mostrar en la cabecera
};

const SideDrawer: React.FC<SideDrawerProps> = ({
  open,
  onClose,
  children,
  width = "max-w-md",
  title = "Historia clínica"
}) => {
  if (!open) return null;

  return (
    <>
      {/* Overlay con blur SOLO en el fondo */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity z-40"
        onClick={onClose}
      />
      {/* Drawer animado */}
      <div className="fixed inset-0 z-50 flex pointer-events-none">
        <div
          className={`
            ml-auto h-full bg-white shadow-2xl border-l border-gray-200
            ${width} flex flex-col rounded-l-2xl animate-slideInDrawer pointer-events-auto
          `}
          style={{
            minWidth: 320,
            maxWidth: 480,
            transition: "transform 0.3s cubic-bezier(.4,0,.2,1)",
          }}
        >
          {/* Cabecera sticky */}
          <div className="sticky top-0 z-10 bg-white flex items-center justify-between px-6 py-4 border-b border-gray-100 shadow-sm">
            <span className="font-bold text-lg text-gray-800">{title}</span>
            <button
              className="text-gray-400 hover:text-gray-700 text-3xl font-bold transition"
              onClick={onClose}
              aria-label="Cerrar"
            >
              &times;
            </button>
          </div>
          {/* Contenido scrollable */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {children}
          </div>
        </div>
        <style jsx global>{`
          @keyframes slideInDrawer {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
          .animate-slideInDrawer {
            animation: slideInDrawer 0.3s cubic-bezier(.4,0,.2,1);
          }
        `}</style>
      </div>
    </>
  );
};

export default SideDrawer;