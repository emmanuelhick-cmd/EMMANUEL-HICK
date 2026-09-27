export type ActiveTab = 'inicio' | 'consultar' | 'casos' | 'consejos';
export type GuideType = 'riego' | 'luz' | 'nutricion' | 'plagas';

export interface Plant {
  id: string;
  name: string;
  nickname: string;
  species: string;
  location: string;
  status: 'Saludable' | 'En Tratamiento' | 'Atención';
  progress: number; // 0 - 100
  treatmentDay?: string; // e.g. "Día 4/7"
  image: string;
  nextWateringDays: number;
  nextFertilizingDays: number;
  notes?: string;
  exposure?: string;
  wateringFrequency?: string;
  waterType?: string;
  hasDrainageHoles?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agronomist';
  text: string;
  timestamp: string;
  image?: string;
}

export interface OfficialPrescription {
  folio: string;
  date: string;
  agronomist: string;
  matricula: string;
  plantName: string;
  species: string;
  diagnosis: string;
  severity: 'Leve' | 'Moderado' | 'Crítico';
  activePrinciples: string[];
  treatmentSteps: { step: number; title: string; instruction: string; frequency: string; completed?: boolean }[];
  wateringAdjustment: string;
  lightAdjustment: string;
  observations: string;
  signatureUrl: string;
}

export interface ClinicalCase {
  id: string;
  plantId?: string;
  plantName: string;
  species: string;
  date: string;
  status: 'Pendiente' | 'Respondida' | 'En Tratamiento' | 'Resuelto';
  symptoms: string[];
  userQuery: string;
  photos: {
    general: string;
    symptom: string;
    soil: string;
    product: string;
  };
  location: string;
  evolutionTime: string;
  prescription?: OfficialPrescription;
  messages: ChatMessage[];
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'watering' | 'diagnosis' | 'seasonal' | 'fertilizer';
  read: boolean;
}
