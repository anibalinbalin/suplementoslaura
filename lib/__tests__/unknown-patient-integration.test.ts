/**
 * Integration test for unknown patient details in full recommendation validation
 */

import { validateRecommendationList } from '../safety-validator'

describe('Unknown Patient Details Integration', () => {
  it('should add unknown patient details warning to each supplement when details are undefined', () => {
    const supplements = [
      { name: 'Vitamina D', dosage: '1000 UI' },
      { name: 'Magnesio', dosage: '200 mg' },
      { name: 'Omega-3 (EPA y DHA)', dosage: '1000 mg' },
    ]

    const patientContext = {
      age: 35,
      gender: 'mujer' as const,
      isPregnant: undefined, // Unknown
      isBreastfeeding: undefined, // Unknown
      conditions: undefined, // Unknown
      medications: [],
    }

    const result = validateRecommendationList(supplements, patientContext)

    // Each supplement should have the unknown patient details warning
    expect(result.supplementValidations.length).toBe(3)

    result.supplementValidations.forEach((validation) => {
      const unknownWarning = validation.warnings.find(
        w => w.message.includes('Estado desconocido')
      )
      expect(unknownWarning).toBeDefined()
      expect(unknownWarning?.severity).toBe('MODERATE')
      expect(unknownWarning?.requiresProfessionalReview).toBe(true)
    })

    // Professional review should be required
    expect(result.overallRequiresProfessionalReview).toBe(true)
  })

  it('should not add unknown patient details warning when details are known', () => {
    const supplements = [
      { name: 'Vitamina D', dosage: '1000 UI' },
      { name: 'Magnesio', dosage: '200 mg' },
    ]

    const patientContext = {
      age: 35,
      gender: 'mujer' as const,
      isPregnant: false, // Known
      isBreastfeeding: false, // Known
      conditions: [], // Known (empty array means no conditions)
      medications: [],
    }

    const result = validateRecommendationList(supplements, patientContext)

    // No unknown warnings should be present
    result.supplementValidations.forEach((validation) => {
      const unknownWarning = validation.warnings.find(
        w => w.message.includes('Estado desconocido')
      )
      expect(unknownWarning).toBeUndefined()
    })
  })

  it('should include all three unknown details in the warning message', () => {
    const supplements = [{ name: 'Vitamina D', dosage: '1000 UI' }]

    const patientContext = {
      age: 35,
      gender: 'mujer' as const,
      isPregnant: undefined,
      isBreastfeeding: undefined,
      conditions: undefined,
      medications: [],
    }

    const result = validateRecommendationList(supplements, patientContext)

    const unknownWarning = result.supplementValidations[0].warnings.find(
      w => w.message.includes('Estado desconocido')
    )

    expect(unknownWarning?.message).toContain('embarazo')
    expect(unknownWarning?.message).toContain('lactancia')
    expect(unknownWarning?.message).toContain('condiciones médicas preexistentes')
    expect(unknownWarning?.recommendation).toContain('confirme con su médico')
    expect(unknownWarning?.recommendation).toContain('asume que no está embarazada')
  })
})
