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
  };
  