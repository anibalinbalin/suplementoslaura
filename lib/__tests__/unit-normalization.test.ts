/**
 * Unit Normalization Tests
 *
 * Verifies that dosage units are correctly normalized before upper limit validation,
 * preventing silent failures when units differ (especially for fat-soluble vitamins)
 */

import { normalizeDosageToStandardUnit, extractUnit, extractMaxDosage } from '../clinical-safety'
import { validateUpperLimit } from '../safety-validator'

describe('Unit Normalization', () => {
  describe('normalizeDosageToStandardUnit', () => {
    test('Vitamin A: IU to mcg RAE conversion', () => {
      // 10000 IU should convert to ~3003 mcg RAE (10000 / 3.33)
      const result = normalizeDosageToStandardUnit(10000, 'UI', 'mcg RAE', 'Vitamina A')

      expect(result.success).toBe(true)
      expect(result.normalizedAmount).toBeCloseTo(3003, 0) // Allow rounding
      expect(result.conversionApplied).toContain('UI → ')
      expect(result.conversionApplied).toContain('mcg RAE')
    })

    test('Vitamin A: mcg RAE to IU conversion', () => {
      // 3000 mcg RAE should convert to ~9990 IU (3000 * 3.33)
      const result = normalizeDosageToStandardUnit(3000, 'mcg RAE', 'UI', 'Vitamina A')

      expect(result.success).toBe(true)
      expect(result.normalizedAmount).toBeCloseTo(9990, 0)
      expect(result.conversionApplied).toContain('mcg RAE → ')
      expect(result.conversionApplied).toContain('UI')
    })

    test('Vitamin E: IU to mg conversion', () => {
      // 1000 IU should convert to ~671 mg (1000 / 1.49)
      const result = normalizeDosageToStandardUnit(1000, 'UI', 'mg', 'Vitamina E')

      expect(result.success).toBe(true)
      expect(result.normalizedAmount).toBeCloseTo(671, 0)
      expect(result.conversionApplied).toContain('UI → ')
      expect(result.conversionApplied).toContain('mg')
    })

    test('Standard metric: mg to mcg', () => {
      const result = normalizeDosageToStandardUnit(5, 'mg', 'mcg')

      expect(result.success).toBe(true)
      expect(result.normalizedAmount).toBe(5000)
      expect(result.conversionApplied).toContain('5 mg → 5000 mcg')
    })

    test('Standard metric: mcg to mg', () => {
      const result = normalizeDosageToStandardUnit(1000, 'mcg', 'mg')

      expect(result.success).toBe(true)
      expect(result.normalizedAmount).toBe(1)
      expect(result.conversionApplied).toContain('1000 mcg → 1 mg')
    })

    test('Same units: no conversion needed', () => {
      const result = normalizeDosageToStandardUnit(500, 'mg', 'mg')

      expect(result.success).toBe(true)
      expect(result.normalizedAmount).toBe(500)
      expect(result.conversionApplied).toBeUndefined()
    })

    test('Unsupported conversion: returns failure', () => {
      const result = normalizeDosageToStandardUnit(100, 'ml', 'mg')

      expect(result.success).toBe(false)
      expect(result.normalizedAmount).toBe(100) // Returns original amount
    })
  })

  describe('extractUnit', () => {
    test('extracts compound units correctly', () => {
      expect(extractUnit('3000 mcg RAE')).toBe('mcg RAE')
      expect(extractUnit('45 mg hierro elemental')).toBe('mg hierro elemental')
      expect(extractUnit('350 mg suplementario')).toBe('mg suplementario')
    })

    test('extracts standard units', () => {
      expect(extractUnit('1000 UI')).toBe('UI')
      expect(extractUnit('500 mg')).toBe('mg')
      expect(extractUnit('400 mcg')).toBe('mcg')
      expect(extractUnit('2 g')).toBe('g')
    })

    test('handles case insensitivity', () => {
      expect(extractUnit('1000 IU')).toBe('UI')
      expect(extractUnit('500 MG')).toBe('mg')
    })
  })

  describe('extractMaxDosage', () => {
    test('extracts single values', () => {
      expect(extractMaxDosage('1000 mg')).toBe(1000)
      expect(extractMaxDosage('500 mcg')).toBe(500)
    })

    test('extracts max from range', () => {
      expect(extractMaxDosage('500-1000 mg')).toBe(1000)
      expect(extractMaxDosage('100-200 UI')).toBe(200)
    })

    test('handles decimal values', () => {
      expect(extractMaxDosage('2.5 mg')).toBe(2.5)
      expect(extractMaxDosage('1.5-3.0 g')).toBe(3.0)
    })
  })

  describe('validateUpperLimit - Integration Tests', () => {
    test('MAJOR: Vitamin A in IU should be converted and flagged when exceeding UL', () => {
      // 10000 IU = ~3003 mcg RAE, which exceeds the UL of 3000 mcg RAE (but not 2x)
      const warnings = validateUpperLimit({
        supplementName: 'Vitamina A',
        dosage: '10000 UI',
        duration: 'long-term',
      })

      expect(warnings.length).toBeGreaterThan(0)
      const upperLimitWarning = warnings.find(w => w.category === 'UPPER_LIMIT')

      expect(upperLimitWarning).toBeDefined()
      expect(upperLimitWarning?.severity).toBe('MAJOR') // Just over the limit, not 2x
      expect(upperLimitWarning?.message).toContain('convertido')
      expect(upperLimitWarning?.message).toContain('UI')
      expect(upperLimitWarning?.message).toContain('mcg RAE')
    })

    test('CRITICAL: Vitamin A in IU at 2x UL should be CRITICAL severity', () => {
      // 20000 IU = ~6006 mcg RAE, which is 2x the UL of 3000 mcg RAE
      const warnings = validateUpperLimit({
        supplementName: 'Vitamina A',
        dosage: '20000 UI',
        duration: 'long-term',
      })

      expect(warnings.length).toBeGreaterThan(0)
      const upperLimitWarning = warnings.find(w => w.category === 'UPPER_LIMIT')

      expect(upperLimitWarning).toBeDefined()
      expect(upperLimitWarning?.severity).toBe('CRITICAL') // Exceeds 2x the limit
      expect(upperLimitWarning?.message).toContain('convertido')
    })

    test('Vitamin A in mcg RAE should be validated correctly without conversion', () => {
      // 2500 mcg RAE is below the UL of 3000 mcg RAE
      const warnings = validateUpperLimit({
        supplementName: 'Vitamina A',
        dosage: '2500 mcg RAE',
        duration: 'long-term',
      })

      const upperLimitWarning = warnings.find(w => w.category === 'UPPER_LIMIT' && w.severity !== 'INFO')
      expect(upperLimitWarning).toBeUndefined() // No warning should be generated
    })

    test('Vitamin D in IU should pass without conversion (same unit as UL)', () => {
      // 3000 UI is below the UL of 4000 UI
      const warnings = validateUpperLimit({
        supplementName: 'Vitamina D',
        dosage: '3000 UI',
        duration: 'long-term',
      })

      const upperLimitWarning = warnings.find(w => w.category === 'UPPER_LIMIT' && w.severity !== 'INFO')
      expect(upperLimitWarning).toBeUndefined() // No warning
    })

    test('Vitamin D exceeding UL should be flagged', () => {
      // 5000 UI exceeds the UL of 4000 UI
      const warnings = validateUpperLimit({
        supplementName: 'Vitamina D',
        dosage: '5000 UI',
        duration: 'long-term',
      })

      expect(warnings.length).toBeGreaterThan(0)
      const upperLimitWarning = warnings.find(w => w.category === 'UPPER_LIMIT')

      expect(upperLimitWarning).toBeDefined()
      expect(upperLimitWarning?.severity).toBe('MAJOR')
    })

    test('Selenium in mg should be converted to mcg and validated', () => {
      // 0.5 mg = 500 mcg, which exceeds the UL of 400 mcg
      const warnings = validateUpperLimit({
        supplementName: 'Selenio',
        dosage: '0.5 mg',
        duration: 'long-term',
      })

      expect(warnings.length).toBeGreaterThan(0)
      const upperLimitWarning = warnings.find(w => w.category === 'UPPER_LIMIT')

      expect(upperLimitWarning).toBeDefined()
      expect(upperLimitWarning?.severity).toBe('MAJOR')
      expect(upperLimitWarning?.message).toContain('convertido')
      expect(upperLimitWarning?.message).toContain('mg → ')
      expect(upperLimitWarning?.message).toContain('mcg')
    })

    test('Omega-3: g to mg combinados conversion should work', () => {
      // 3 g should be converted to 3000 mg, which equals the UL exactly (no warning expected)
      const warnings = validateUpperLimit({
        supplementName: 'Omega-3 (EPA y DHA)',
        dosage: '3 g',
        duration: 'long-term',
      })

      // 3 g = 3000 mg combinados, which equals the UL exactly (no warning expected)
      const upperLimitWarning = warnings.find(w => w.category === 'UPPER_LIMIT' && w.severity !== 'INFO')
      expect(upperLimitWarning).toBeUndefined()
    })

    test('Omega-3: exceeding UL with g to mg conversion should warn', () => {
      // 4 g = 4000 mg, which exceeds the UL of 3000 mg
      const warnings = validateUpperLimit({
        supplementName: 'Omega-3 (EPA y DHA)',
        dosage: '4 g',
        duration: 'long-term',
      })

      expect(warnings.length).toBeGreaterThan(0)
      const upperLimitWarning = warnings.find(w => w.category === 'UPPER_LIMIT')

      expect(upperLimitWarning).toBeDefined()
      expect(upperLimitWarning?.severity).toBe('MAJOR')
      expect(upperLimitWarning?.message).toContain('convertido')
      expect(upperLimitWarning?.message).toContain('g → ')
      expect(upperLimitWarning?.message).toContain('mg')
    })

    test('Short-term higher dosage should use short-term limit with conversion', () => {
      // Vitamin D short-term: 10000 UI is allowed
      const warnings = validateUpperLimit({
        supplementName: 'Vitamina D',
        dosage: '8000 UI',
        duration: 'short-term',
      })

      const upperLimitWarning = warnings.find(w => w.category === 'UPPER_LIMIT' && w.severity !== 'INFO')
      expect(upperLimitWarning).toBeUndefined() // Should be OK for short-term
    })

    test('Short-term exceeding short-term limit should warn', () => {
      // Vitamin D short-term: 12000 UI exceeds the short-term UL of 10000 UI
      const warnings = validateUpperLimit({
        supplementName: 'Vitamina D',
        dosage: '12000 UI',
        duration: 'short-term',
      })

      expect(warnings.length).toBeGreaterThan(0)
      const upperLimitWarning = warnings.find(w => w.category === 'UPPER_LIMIT')

      expect(upperLimitWarning).toBeDefined()
      expect(upperLimitWarning?.severity).toBe('MAJOR')
      expect(upperLimitWarning?.message).toContain('corto plazo')
    })
  })
})
