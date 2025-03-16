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
  DOCTOR: "Doctor",
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