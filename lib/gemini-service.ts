// Este archivo ya no se utiliza para generar recomendaciones
// Todas las recomendaciones ahora provienen directamente de los datos de Examine

import type { SafetyWarning } from './clinical-safety'

export interface RecommendationRequest {
  gender: "male" | "female"
  age: number | null
  healthGoals: string[]
  dietaryRestrictions: string[]
  allergies?: string
  medications?: string
}

export interface SupplementRecommendation {
  name: string
  description: string
  benefits: string[]
  dosage: string
  optimalTime: string
  absorptionTips: string
  genderSpecificDosage: {
    male: string
    female: string
  }
  scientificEvidence: string[]
  suitableFor: string[]
  tags: string[]
  warnings?: string[]
  medicationInteractions?: string[]
  consultNutritionist?: boolean
  modelUsed?: string
  productosMercadoLibre?: Array<{
    marca: string
    url: string
    precio?: number
    disponible?: boolean
  }>
  // Clinical safety features
  safetyWarnings?: SafetyWarning[]
  requiresProfessionalReview?: boolean
  recommendedForm?: string
}

// Este archivo se mantiene solo para compatibilidad con tipos
// No contiene lógica de generación de recomendaciones
