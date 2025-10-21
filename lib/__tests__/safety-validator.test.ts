/**
 * Safety Validator Tests
 *
 * Tests for clinical safety validation system including:
 * - Upper limit validation
 * - Contraindication detection
 * - Drug-nutrient depletion identification
 */

import {
  validateUpperLimit,
  validateContraindications,
  detectNutrientDepletions,
  validateDepletionCoverage,
  validateSupplement,
  validateRecommendationList,
} from '../safety-validator'

describe('Safety Validator', () => {
  describe('validateUpperLimit', () => {
    it('should flag when dosage exceeds upper limit', () => {
      const warnings = validateUpperLimit({
        supplementName: 'Vitamina D',
        dosage: '15000 UI diarias',
        duration: 'long-term',
      })

      expect(warnings.length).toBeGreaterThan(0)
      expect(warnings[0].severity).toBe('CRITICAL')
      expect(warnings[0].category).toBe('UPPER_LIMIT')
    })

    it('should allow short-term higher dosage for deficiency', () => {
      const warnings = validateUpperLimit({
        supplementName: 'Vitamina D',
        dosage: '8000 UI diarias',
        duration: 'short-term',
      })

      // Should NOT flag as critical since it's within short-term allowance (10000 UI)
      const criticalWarnings = warnings.filter(w => w.severity === 'CRITICAL')
      expect(criticalWarnings.length).toBe(0)
    })

    it('should pass when dosage is within safe limits', () => {
      const warnings = validateUpperLimit({
        supplementName: 'Vitamina D',
        dosage: '2000 UI diarias',
        duration: 'long-term',
      })

      const criticalOrMajorWarnings = warnings.filter(
        w => w.severity === 'CRITICAL' || w.severity === 'MAJOR'
      )
      expect(criticalOrMajorWarnings.length).toBe(0)
    })

    it('should handle iron upper limits correctly', () => {
      const warnings = validateUpperLimit({
        supplementName: 'Hierro',
        dosage: '60 mg hierro elemental',
        duration: 'long-term',
      })

      expect(warnings.length).toBeGreaterThan(0)
      expect(warnings[0].message).toContain('45')
    })
  })

  describe('validateContraindications', () => {
    it('should detect Omega-3 + Warfarin interaction', () => {
      const warnings = validateContraindications({
        supplementName: 'Omega-3 (EPA y DHA)',
        medications: ['warfarina'],
        dosage: '2000 mg',
      })

      expect(warnings.length).toBeGreaterThan(0)
      const interactionWarning = warnings.find(w => w.category === 'CONTRAINDICATION')
      expect(interactionWarning).toBeDefined()
      expect(interactionWarning?.severity).toBe('MAJOR')
    })

    it('should detect Vitamin A + Pregnancy contraindication', () => {
      const warnings = validateContraindications({
        supplementName: 'Vitamina A',
        dosage: '5000 mcg',
        isPregnant: true,
      })

      expect(warnings.length).toBeGreaterThan(0)
      const pregnancyWarning = warnings.find(w => w.message.includes('CONTRAINDICADO'))
      expect(pregnancyWarning).toBeDefined()
      expect(pregnancyWarning?.severity).toBe('CRITICAL')
    })

    it('should detect Iron + Levotiroxina interaction', () => {
      const warnings = validateContraindications({
        supplementName: 'Hierro',
        medications: ['levotiroxina'],
        dosage: '27 mg',
      })

      expect(warnings.length).toBeGreaterThan(0)
    })

    it('should flag potassium with kidney disease', () => {
      const warnings = validateContraindications({
        supplementName: 'Potasio',
        conditions: ['insuficiencia renal'],
        dosage: '500 mg',
      })

      expect(warnings.length).toBeGreaterThan(0)
      const kidneyWarning = warnings.find(w => w.severity === 'CRITICAL')
      expect(kidneyWarning).toBeDefined()
    })

    it('should not flag when no contraindications exist', () => {
      const warnings = validateContraindications({
        supplementName: 'Vitamina C',
        medications: ['paracetamol'],
        dosage: '1000 mg',
      })

      // Vitamin C has no contraindications defined, should return empty
      expect(warnings.length).toBe(0)
    })
  })

  describe('detectNutrientDepletions', () => {
    it('should detect B12 depletion from Metformin', () => {
      const { depletions, recommendedSupplements } = detectNutrientDepletions(['metformina'])

      expect(depletions.length).toBeGreaterThan(0)
      expect(depletions[0].nutrientsDepleted).toContain('Vitamina B12')
      expect(recommendedSupplements).toContain('Vitamina B12')
    })

    it('should detect CoQ10 depletion from Statins', () => {
      const { depletions, recommendedSupplements } = detectNutrientDepletions(['atorvastatina'])

      expect(depletions.length).toBeGreaterThan(0)
      expect(depletions[0].nutrientsDepleted).toContain('CoQ10')
    })

    it('should detect multiple depletions from Omeprazole', () => {
      const { depletions, recommendedSupplements } = detectNutrientDepletions(['omeprazol'])

      expect(depletions.length).toBeGreaterThan(0)
      expect(recommendedSupplements).toContain('Vitamina B12')
      expect(recommendedSupplements).toContain('Magnesio')
    })

    it('should return empty for medications without known depletions', () => {
      const { depletions } = detectNutrientDepletions(['paracetamol'])

      expect(depletions.length).toBe(0)
    })
  })

  describe('validateDepletionCoverage', () => {
    it('should warn when Metformin user is not supplementing B12', () => {
      const warnings = validateDepletionCoverage(
        ['metformina'],
        ['Vitamina D', 'Omega-3'] // No B12
      )

      expect(warnings.length).toBeGreaterThan(0)
      const b12Warning = warnings.find(w => w.supplementName.includes('B12'))
      expect(b12Warning).toBeDefined()
    })

    it('should not warn when depletion is already covered', () => {
      const warnings = validateDepletionCoverage(
        ['metformina'],
        ['Vitamina B12', 'Vitamina D'] // B12 included
      )

      // Should still have a warning for Ácido Fólico (also depleted by metformin)
      const b12Warning = warnings.find(w => w.supplementName === 'Vitamina B12')
      expect(b12Warning).toBeUndefined()
    })
  })

  describe('validateSupplement (comprehensive)', () => {
    it('should validate Vitamin D for elderly patient', () => {
      const result = validateSupplement({
        supplementName: 'Vitamina D',
        dosage: '2000 UI',
        age: 70,
        gender: 'mujer',
      })

      expect(result.isValid).toBe(true)
      // Should include form recommendation
      const formWarning = result.warnings.find(w => w.category === 'QUALITY')
      expect(formWarning).toBeDefined()
    })

    it('should flag high-dose Vitamin A for pregnant woman', () => {
      const result = validateSupplement({
        supplementName: 'Vitamina A',
        dosage: '5000 mcg',
        isPregnant: true,
      })

      expect(result.isValid).toBe(false) // Invalid due to CRITICAL warning
      const criticalWarning = result.warnings.find(w => w.severity === 'CRITICAL')
      expect(criticalWarning).toBeDefined()
    })

    it('should recommend supplement form for Iron', () => {
      const result = validateSupplement({
        supplementName: 'Hierro',
        dosage: '18 mg',
      })

      const formWarning = result.warnings.find(w => w.category === 'QUALITY')
      expect(formWarning).toBeDefined()
      expect(formWarning?.message).toContain('Bisglicinato')
    })
  })

  describe('validateRecommendationList (full integration)', () => {
    it('should validate complete recommendation list with multiple warnings', () => {
      const supplements = [
        { name: 'Omega-3 (EPA y DHA)', dosage: '2000 mg' },
        { name: 'Vitamina D', dosage: '2000 UI' },
        { name: 'Hierro', dosage: '27 mg' },
      ]

      const patientContext = {
        age: 45,
        gender: 'mujer' as const,
        medications: ['warfarina', 'levotiroxina'],
      }

      const result = validateRecommendationList(supplements, patientContext)

      // Should have warnings for Omega-3 + Warfarin
      const omega3Validation = result.supplementValidations.find(
        v => v.supplementName === 'Omega-3 (EPA y DHA)'
      )
      expect(omega3Validation?.warnings.length).toBeGreaterThan(0)

      // Should have warnings for Iron + Levotiroxina
      const ironValidation = result.supplementValidations.find(v => v.supplementName === 'Hierro')
      expect(ironValidation?.warnings.length).toBeGreaterThan(0)

      // Overall should require professional review
      expect(result.overallRequiresProfessionalReview).toBe(true)
    })

    it('should detect drug depletions in full list', () => {
      const supplements = [
        { name: 'Vitamina D', dosage: '2000 UI' },
        { name: 'Omega-3 (EPA y DHA)', dosage: '1000 mg' },
      ]

      const patientContext = {
        age: 55,
        gender: 'hombre' as const,
        medications: ['atorvastatina'], // Depletes CoQ10
      }

      const result = validateRecommendationList(supplements, patientContext)

      // Should warn about missing CoQ10
      expect(result.drugDepletionWarnings.length).toBeGreaterThan(0)
      const coq10Warning = result.drugDepletionWarnings.find(w => w.supplementName.includes('CoQ10'))
      expect(coq10Warning).toBeDefined()
    })

    it('should handle safe recommendation list with no warnings', () => {
      const supplements = [
        { name: 'Vitamina C', dosage: '500 mg' },
        { name: 'Magnesio', dosage: '200 mg' },
      ]

      const patientContext = {
        age: 30,
        gender: 'hombre' as const,
        medications: [],
      }

      const result = validateRecommendationList(supplements, patientContext)

      // Should have minimal warnings (maybe just quality recommendations)
      const criticalWarnings = result.supplementValidations.flatMap(v =>
        v.warnings.filter(w => w.severity === 'CRITICAL' || w.severity === 'MAJOR')
      )
      expect(criticalWarnings.length).toBe(0)
    })
  })

  describe('Edge Cases', () => {
    it('should handle dosage range (e.g., "500-1000 mg")', () => {
      const warnings = validateUpperLimit({
        supplementName: 'Vitamina C',
        dosage: '1500-2500 mg',
        duration: 'long-term',
      })

      // Should check against the UPPER value (2500 mg)
      // Vitamin C UL is 2000 mg, so this should warn
      const upperLimitWarning = warnings.find(w => w.category === 'UPPER_LIMIT')
      expect(upperLimitWarning).toBeDefined()
    })

    it('should handle case-insensitive medication matching', () => {
      const warnings = validateContraindications({
        supplementName: 'Omega-3 (EPA y DHA)',
        medications: ['WARFARINA'], // Uppercase
        dosage: '2000 mg',
      })

      expect(warnings.length).toBeGreaterThan(0)
    })

    it('should handle accented medication names', () => {
      const { depletions } = detectNutrientDepletions(['omeprazól']) // With accent

      expect(depletions.length).toBeGreaterThan(0)
    })

    it('should not crash on unparseable dosage', () => {
      const warnings = validateUpperLimit({
        supplementName: 'Vitamina D',
        dosage: 'según indicación médica',
        duration: 'long-term',
      })

      // Should return info warning about unparseable dose
      expect(warnings.length).toBeGreaterThan(0)
      expect(warnings[0].severity).toBe('INFO')
    })
  })
})
