import { describe, it, expect, beforeAll } from '@jest/globals'
import { 
  MedicationInteractionService,
  InteractionSeverity,
  type MedicationInteraction
} from '../medication-interaction-service'

describe('MedicationInteractionService', () => {
  let service: MedicationInteractionService

  beforeAll(async () => {
    service = new MedicationInteractionService()
    await service.initialize()
  })

  describe('parseInteractionData', () => {
    it('should parse supplement names correctly', () => {
      const interactions = service.getSupplementInteractions()
      expect(interactions).toHaveProperty('Ashwagandha')
      expect(interactions).toHaveProperty('Magnesio')
      expect(interactions).toHaveProperty('Vitamina D')
      expect(interactions).toHaveProperty('Omega-3')
    })

    it('should parse interaction severities correctly', () => {
      const ashwagandha = service.getSupplementInteractions()['Ashwagandha']
      expect(ashwagandha).toBeDefined()
      
      const majorInteractions = ashwagandha.interactions.filter(
        i => i.severity === InteractionSeverity.MAJOR
      )
      expect(majorInteractions.length).toBeGreaterThan(0)
      expect(majorInteractions[0].medicationCategory).toBe('Sedantes y Benzodiacepinas')
    })

    it('should parse medication examples correctly', () => {
      const omega3 = service.getSupplementInteractions()['Omega-3']
      const anticoagulants = omega3.interactions.find(
        i => i.medicationCategory === 'Anticoagulantes'
      )
      expect(anticoagulants?.medications).toContain('warfarina')
      expect(anticoagulants?.medications).toContain('aspirina')
    })

    it('should parse recommendations correctly', () => {
      const vitaminD = service.getSupplementInteractions()['Vitamina D']
      expect(vitaminD.recommendations).toContain(
        'Monitorear niveles de calcio con diuréticos tiazídicos'
      )
    })

    it('should parse drugs.com links correctly', () => {
      const magnesium = service.getSupplementInteractions()['Magnesio']
      expect(magnesium.drugsComUrl).toBe(
        'https://www.drugs.com/drug-interactions/magnesium-oxide.html'
      )
    })
  })

  describe('checkInteractions', () => {
    it('should detect interactions with exact medication names', () => {
      const interactions = service.checkInteractions('Omega-3', 'warfarina')
      expect(interactions.length).toBeGreaterThan(0)
      expect(interactions[0].severity).toBe(InteractionSeverity.MODERATE)
      expect(interactions[0].warning).toContain('riesgo de sangrado')
    })

    it('should detect interactions with medication variations', () => {
      const interactions = service.checkInteractions('Ashwagandha', 'Xanax')
      expect(interactions.length).toBeGreaterThan(0)
      expect(interactions[0].severity).toBe(InteractionSeverity.MAJOR)
    })

    it('should detect multiple interactions', () => {
      const interactions = service.checkInteractions(
        'Magnesio', 
        'Estoy tomando levotiroxina y ciprofloxacina'
      )
      expect(interactions.length).toBe(2)
      
      const hasThyroid = interactions.some(i => 
        i.medicationCategory === 'Levotiroxina'
      )
      const hasAntibiotic = interactions.some(i => 
        i.medicationCategory === 'Antibióticos Quinolonas'
      )
      expect(hasThyroid).toBe(true)
      expect(hasAntibiotic).toBe(true)
    })

    it('should handle case-insensitive matching', () => {
      const interactions1 = service.checkInteractions('omega-3', 'WARFARINA')
      const interactions2 = service.checkInteractions('Omega-3', 'warfarina')
      expect(interactions1).toEqual(interactions2)
    })

    it('should return empty array for no interactions', () => {
      const interactions = service.checkInteractions('Vitamina C', 'paracetamol')
      expect(interactions).toEqual([])
    })

    it('should include specific recommendations in interactions', () => {
      const interactions = service.checkInteractions('Omega-3', 'warfarina')
      expect(interactions[0].recommendation).toBe(
        'Limitar dosis a <3g/día si toma anticoagulantes'
      )
    })
  })

  describe('getSupplementRecommendations', () => {
    it('should return all recommendations for a supplement', () => {
      const recommendations = service.getSupplementRecommendations('Hierro')
      expect(recommendations).toContain('Separar antibióticos por 2-3 horas')
      expect(recommendations).toContain('Tomar levotiroxina 4 horas antes del hierro')
    })

    it('should return empty array for unknown supplement', () => {
      const recommendations = service.getSupplementRecommendations('UnknownSupplement')
      expect(recommendations).toEqual([])
    })
  })

  describe('getDrugsComUrl', () => {
    it('should return the correct drugs.com URL', () => {
      const url = service.getDrugsComUrl('Vitamina D')
      expect(url).toBe('https://www.drugs.com/drug-interactions/cholecalciferol,vitamin-d3.html')
    })

    it('should return undefined for unknown supplement', () => {
      const url = service.getDrugsComUrl('UnknownSupplement')
      expect(url).toBeUndefined()
    })
  })
})