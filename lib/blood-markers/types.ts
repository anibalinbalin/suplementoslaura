// Tipos comunes para todos los marcadores sanguíneos

export interface BloodMarkerRange {
  min: number
  max: number
  status: string
  description: string
  recommendation: string
  supplementRecommendations?: SupplementRecommendation[]
  dosage?: string
  considerations: string[]
  benefits?: string[]
  risks?: string[]
}

export interface SupplementRecommendation {
  name: string
  dosage: string
  timing: string
  duration: string
  notes?: string
}

export interface BloodMarkerFoodSource {
  food: string
  amount: string
  content: string
  notes?: string
}

export interface BloodMarkerFactor {
  factor: string
  impact: string
  recommendation: string
}

export interface BloodMarkerEvidence {
  claim: string
  evidence: 'Fuerte' | 'Moderada' | 'Preliminar' | 'Mixta' | 'Débil'
  details: string
}

export interface BloodMarkerData {
  name: string
  unit: string
  ranges: BloodMarkerRange[]
  foodSources?: BloodMarkerFoodSource[]
  factors?: BloodMarkerFactor[]
  evidence?: BloodMarkerEvidence[]
  interactions?: string[]
  testingNotes?: string[]
}

export type BloodMarkerType = 
  | 'vitamin-d'
  | 'vitamin-b12'
  | 'glucose'
  | 'insulin'
  | 'cortisol'
  | 'sodium'
  | 'potassium'
  | 'chloride'
  | 'calcium'
  | 'magnesium'
  | 'hematocrit'
  | 'hemoglobin'
  | 'ferritin'
  | 'iron'

export interface BloodTestResult {
  markerId: BloodMarkerType
  value: number
  date: Date
  unit: string
}

export interface BloodTestAnalysis {
  results: BloodTestResult[]
  recommendations: SupplementRecommendation[]
  dietaryAdvice: string[]
  lifestyleAdvice: string[]
  followUpSuggestions: string[]
}

// Función helper para encontrar el rango correspondiente
export function findMarkerRange(
  value: number,
  ranges: BloodMarkerRange[]
): BloodMarkerRange | null {
  return ranges.find((range) => value >= range.min && value < range.max) || null
}

// Función para convertir unidades comunes
export const unitConversions = {
  // Vitamina D: ng/mL a nmol/L
  vitaminD: {
    ngmlToNmoll: (value: number) => value * 2.5,
    nmollToNgml: (value: number) => value / 2.5,
  },
  // Glucosa: mg/dL a mmol/L
  glucose: {
    mgdlToMmoll: (value: number) => value / 18.0182,
    mmollToMgdl: (value: number) => value * 18.0182,
  },
  // B12: pg/mL a pmol/L
  b12: {
    pgmlToPmoll: (value: number) => value * 0.738,
    pmollToPgml: (value: number) => value / 0.738,
  },
}