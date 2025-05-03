/** 🔹 Enum con nombres amigables para las especialidades */
export const SpecialtyEnum = {
  GENERAL_MEDICINE: "Medicina General",
  CARDIOLOGY: "Cardiología",
  PEDIATRICS: "Pediatría",
  DERMATOLOGY: "Dermatología",
  NEUROLOGY: "Neurología",
  ORTHOPEDICS: "Ortopedia y Traumatología",
  OPHTHALMOLOGY: "Oftalmología",
  OTOLARYNGOLOGY: "Otorrinolaringología",
  GYNECOLOGY: "Ginecología y Obstetricia",
  UROLOGY: "Urología",
  ONCOLOGY: "Oncología",
  PSYCHIATRY: "Psiquiatría",
  PSYCHOLOGY: "Psicología",
  GASTROENTEROLOGY: "Gastroenterología",
  ENDOCRINOLOGY: "Endocrinología",
  PULMONOLOGY: "Neumología",
  INFECTOLOGY: "Infectología",
  RHEUMATOLOGY: "Reumatología",
  NEPHROLOGY: "Nefrología",
  HEMATOLOGY: "Hematología",
  ALLERGOLOGY: "Alergología",
  ANESTHESIOLOGY: "Anestesiología",
  RADIOLOGY: "Radiología",
  PATHOLOGY: "Patología",
  SPORTS_MEDICINE: "Medicina del Deporte",
  EMERGENCY_MEDICINE: "Medicina de Emergencias",
  REHABILITATION: "Medicina Física y Rehabilitación",
  DENTISTRY: "Odontología",
  PLASTIC_SURGERY: "Cirugía Plástica y Estética",
};

export const RoleEnum = {
  DOCTOR: "Profesional",
  PATIENT: "Paciente",
};

export enum GenderEnum {
  MALE = "MALE",
  FEMALE = "FEMALE",
  NON_BINARY = "NON_BINARY",
  OTHER = "OTHER",
  PREFER_NOT_TO_SAY = "PREFER_NOT_TO_SAY",
}

export const GenderLabels: Record<GenderEnum, string> = {
  [GenderEnum.MALE]: "Masculino",
  [GenderEnum.FEMALE]: "Femenino",
  [GenderEnum.NON_BINARY]: "No binario",
  [GenderEnum.OTHER]: "Otro",
  [GenderEnum.PREFER_NOT_TO_SAY]: "Prefiero no decirlo",
};

export const LicenseTypeEnum = {
  NATIONAL: "Nacional",
  PROVINCIAL: "Provincial",
  MUNICIPAL: "Municipal",
  PRIVATE: "Privado",
  OTHER: "Otro",
};

export enum Specialty {
  GENERAL_MEDICINE = "GENERAL_MEDICINE",
  CARDIOLOGY = "CARDIOLOGY",
  PEDIATRICS = "PEDIATRICS",
  DERMATOLOGY = "DERMATOLOGY",
  NEUROLOGY = "NEUROLOGY",
  ORTHOPEDICS = "ORTHOPEDICS",
  OPHTHALMOLOGY = "OPHTHALMOLOGY",
  OTOLARYNGOLOGY = "OTOLARYNGOLOGY",
  GYNECOLOGY = "GYNECOLOGY",
  UROLOGY = "UROLOGY",
  ONCOLOGY = "ONCOLOGY",
  PSYCHIATRY = "PSYCHIATRY",
  PSYCHOLOGY = "PSYCHOLOGY",
  GASTROENTEROLOGY = "GASTROENTEROLOGY",
  ENDOCRINOLOGY = "ENDOCRINOLOGY",
  PULMONOLOGY = "PULMONOLOGY",
  INFECTOLOGY = "INFECTOLOGY",
  RHEUMATOLOGY = "RHEUMATOLOGY",
  NEPHROLOGY = "NEPHROLOGY",
  HEMATOLOGY = "HEMATOLOGY",
  ALLERGOLOGY = "ALLERGOLOGY",
  ANESTHESIOLOGY = "ANESTHESIOLOGY",
  RADIOLOGY = "RADIOLOGY",
  PATHOLOGY = "PATHOLOGY",
  SPORTS_MEDICINE = "SPORTS_MEDICINE",
  EMERGENCY_MEDICINE = "EMERGENCY_MEDICINE",
  REHABILITATION = "REHABILITATION",
  DENTISTRY = "DENTISTRY",
  PLASTIC_SURGERY = "PLASTIC_SURGERY",
}

export interface Slot {
  date: string;
  time: string;
  dayOfWeek: number;
  // ...otros campos si es necesario
}
