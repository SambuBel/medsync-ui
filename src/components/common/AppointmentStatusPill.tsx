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
  PENDING: "badge-warning text-yellow-700",
  CONFIRMED: "badge-success text-green-700",
  CANCELED: "badge-error text-red-700",
  RESCHEDULED: "badge-info text-blue-700",
  COMPLETED: "badge-success"
};

const AppointmentStatusPill = ({ status }: Props) => {
  return (
    <span className={` font-semibold badge ${statusColorMap[status]} capitalize`}>
      {statusLabelMap[status]}
    </span>
  );
};

export default AppointmentStatusPill;
