import { MEDICATION_INTERACTIONS } from './medication-interaction-data'

export enum InteractionSeverity {
  MAJOR = 'MAJOR',
  MODERATE = 'MODERATE', 
  MINOR = 'MINOR'
}

export interface MedicationInteraction {
  medicationCategory: string
  medications: string[]
  warning: string
  severity: InteractionSeverity
  recommendation?: string
}

export interface SupplementInteractionData {
  name: string
  totalInteractions?: string
  interactions: MedicationInteraction[]
  recommendations: string[]
  drugsComUrl?: string
}

export interface InteractionResult {
  medicationCategory: string
  severity: InteractionSeverity
  warning: string
  recommendation?: string
}

export class MedicationInteractionService {
  private supplementInteractions: Record<string, SupplementInteractionData> = MEDICATION_INTERACTIONS
  private initialized = false

  async initialize(): Promise<void> {
    // No need to load from file anymore, data is already loaded
    this.initialized = true
  }


  getSupplementInteractions(): Record<string, SupplementInteractionData> {
    return this.supplementInteractions
  }

  checkInteractions(supplementName: string, medications: string): InteractionResult[] {
    const supplement = this.findSupplement(supplementName)
    if (!supplement) return []

    const medicationsLower = medications.toLowerCase()
    const results: InteractionResult[] = []

    for (const interaction of supplement.interactions) {
      // Check if any specific medication is mentioned
      const hasMedication = interaction.medications.some(med => 
        medicationsLower.includes(med)
      )
      
      // Check if medication category is mentioned
      const hasCategory = medicationsLower.includes(
        interaction.medicationCategory.toLowerCase()
      )

      if (hasMedication || hasCategory) {
        results.push({
          medicationCategory: interaction.medicationCategory,
          severity: interaction.severity,
          warning: interaction.warning,
          recommendation: interaction.recommendation
        })
      }
    }

    return results
  }

  getSupplementRecommendations(supplementName: string): string[] {
    const supplement = this.findSupplement(supplementName)
    return supplement?.recommendations || []
  }

  getDrugsComUrl(supplementName: string): string | undefined {
    const supplement = this.findSupplement(supplementName)
    return supplement?.drugsComUrl
  }

  private findSupplement(name: string): SupplementInteractionData | undefined {
    // Try exact match first
    if (this.supplementInteractions[name]) {
      return this.supplementInteractions[name]
    }

    // Try case-insensitive match
    const normalizedName = name.toLowerCase()
    for (const [key, value] of Object.entries(this.supplementInteractions)) {
      if (key.toLowerCase() === normalizedName) {
        return value
      }
    }

    return undefined
  }
}