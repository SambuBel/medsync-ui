import { Specialty } from "@/utils/constants/Appointment";
import { User } from "../ProfilePersonalData";

export type Appointment = {
    id: string;
    date: string;
    patientId: string;
    doctorId: string;
    specialty: Specialty;
    status: "PENDING" | "CONFIRMED" | "CANCELED" | "RESCHEDULED" | "COMPLETED";
    doctor: {
      id: string;
      userId: string;
      specialty: string[];
      license: string;
      licenseType: string;
      experience: number;
      description: string;
      education: string;
      verified: boolean;
      user: User;
    };
    patient?: {
      user?: {
        name?: string;
        lastName?: string;
        gender?: string;
        dni?: string;
        birthDate?: string;
      }
    };
  };
  

export type EmergencyVisitStatus = "WAITING" | "IN_PROGRESS" | "COMPLETED" | "CANCELED";

export type EmergencyVisit = {
  id: string;
  createdAt: string;
  attendedAt?: string | null;
  finishedAt?: string | null;
  status: EmergencyVisitStatus;
  symptoms: string[];
  otherSymptoms?: string | null;
  triageLevel?: number | null;

  patient: {
    id: string;
    user: User;
  };

  doctor?: {
    id: string;
    user: User;
  } | null;
};
