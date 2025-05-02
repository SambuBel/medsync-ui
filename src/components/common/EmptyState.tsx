import React from "react";

export default function EmptyState({ title, description }: {
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      {/* Avión de papel animado */}
      <svg
        className="w-24 h-24 mb-4 animate-float"
        viewBox="0 0 64 64"
        fill="none"
      >
        <path
          d="M2 32L62 2L32 62L28 36L2 32Z"
          fill="#38bdf8"
          stroke="#0ea5e9"
          strokeWidth="2"
        />
      </svg>
      <h3 className="text-lg font-semibold text-gray-700 mb-1">{title}</h3>
      {description && <p className="text-gray-500 text-center">{description}</p>}
      <style jsx>{`
        .animate-float {
          animation: float 2s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </div>
  );
}