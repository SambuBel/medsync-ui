// components/common/ConsultationStatusPill.tsx
"use client";
import React from "react";

type StatusType =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELED"
  | "RESCHEDULED"
  | "COMPLETED"
  | "WAITING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELED";

export enum MeetingStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELED = "CANCELED",
  COMPLETED = "COMPLETED",
  WAITING = "WAITING",
  IN_PROGRESS = "IN_PROGRESS",
}

type Props = {
  status: StatusType;
};

const statusLabelMap: Record<StatusType, string> = {
  PENDING: "Pendiente",
  CONFIRMED: "Confirmado",
  CANCELED: "Cancelado",
  RESCHEDULED: "Reprogramado",
  COMPLETED: "Completado",
  WAITING: "En espera",
  IN_PROGRESS: "En curso",
};

const statusColorMap: Record<StatusType, string> = {
  PENDING: "badge-warning text-yellow-700 border border-yellow-800",
  CONFIRMED: "badge-success text-green-700",
  CANCELED: "bg-gray-400 text-white border-gray-500",
  RESCHEDULED: "badge-info text-blue-700",
  COMPLETED: "badge-success",
  WAITING: "badge-warning text-yellow-700 border border-yellow-800",
  IN_PROGRESS: "badge-info text-blue-700",
};

const ConsultationStatusPill = ({ status }: Props) => {
  const label = statusLabelMap[status] || status;
  const style = statusColorMap[status] || "badge-secondary";

  return (
    <span className={`badge p-3 text-xs tracking-widest ${style} capitalize`}>
      {label.toUpperCase()}
    </span>
  );
};

export default ConsultationStatusPill;
