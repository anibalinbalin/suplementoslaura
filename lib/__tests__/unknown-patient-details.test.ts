/**
 * Test for unknown patient details validation
 */

import { validateUnknownPatientDetails } from '../safety-validator'

describe('validateUnknownPatientDetails', () => {
  it('should generate warning when pregnancy status is unknown', () => {
    const warnings = validateUnknownPatientDetails({
      supplementName: 'Vitamina D',
      dosage: '1000 UI',
      isPregnant: undefined,
      isBreastfeeding: false,
      conditions: ['diabetes'],
    })

    expect(warnings.length).toBe(1)
    expect(warnings[0].severity).toBe('MODERATE')
    expect(warnings[0].category).toBe('CONTRAINDICATION')
    expect(warnings[0].message).toContain('embarazo')
    expect(warnings[0].requiresProfessionalReview).toBe(true)
  })

  it('should generate warning when breastfeeding status is unknown', () => {
    const warnings = validateUnknownPatientDetails({
      supplementName: 'Vitamina D',
      dosage: '1000 UI',
      isPregnant: false,
      isBreastfeeding: undefined,
      conditions: [],
    })

    expect(warnings.length).toBe(1)
    expect(warnings[0].message).toContain('lactancia')
  })

  it('should generate warning when conditions are unknown', () => {
    const warnings = validateUnknownPatientDetails({
      supplementName: 'Vitamina D',
      dosage: '1000 UI',
      isPregnant: false,
      isBreastfeeding: false,
      conditions: undefined,
    })

    expect(warnings.length).toBe(1)
    expect(warnings[0].message).toContain('condiciones médicas preexistentes')
  })

  it('should generate single warning listing all unknown details', () => {
    const warnings = validateUnknownPatientDetails({
      supplementName: 'Vitamina D',
      dosage: '1000 UI',
      isPregnant: undefined,
      isBreastfeeding: undefined,
      conditions: undefined,
    })

    expect(warnings.length).toBe(1)
    expect(warnings[0].message).toContain('embarazo')
    expect(warnings[0].message).toContain('lactancia')
    expect(warnings[0].message).toContain('condiciones médicas preexistentes')
    expect(warnings[0].recommendation).toContain('confirme con su médico')
  })

  it('should not generate warning when all details are known', () => {
    const warnings = validateUnknownPatientDetails({
      supplementName: 'Vitamina D',
      dosage: '1000 UI',
      isPregnant: false,
      isBreastfeeding: false,
      conditions: [],
    })

    expect(warnings.length).toBe(0)
  })
})
