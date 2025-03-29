"use client";
import React from "react";

type AppointmentStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELED"
  | "RESCHEDULED"
  | "COMPLETED";

type Props = {
  status: AppointmentStatus;
};

const statusLabelMap: Record<AppointmentStatus, string> = {
  PENDING: "Pendiente",
  CONFIRMED: "Confirmado",
  CANCELED: "Cancelado",
  RESCHEDULED: "Reprogramado",
  COMPLETED: "Completado",
};

const statusColorMap: Record<AppointmentStatus, string> = {
  PENDING: "badge-warning text-yellow-700 border border-yellow-800",
  CONFIRMED: "badge-success text-green-700",
  CANCELED: "bg-gray-400 text-white border-gray-500",
  RESCHEDULED: "badge-info text-blue-700",
  COMPLETED: "badge-success"
};

const AppointmentStatusPill = ({ status }: Props) => {
  return (
    <span className={`badge p-3 text-xs tracking-widest ${statusColorMap[status]} capitalize `}>
      {statusLabelMap[status].toUpperCase()}
    </span>
  );
};

export default AppointmentStatusPill;
