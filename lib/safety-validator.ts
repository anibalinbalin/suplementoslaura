/**
 * Safety Validation System
 *
 * Validates supplement recommendations against clinical safety criteria:
 * - Upper limit checking
 * - Contraindication detection
 * - Drug-nutrient depletion identification
 * - High-risk combination flagging
 */

import {
  UPPER_LIMITS,
  CONTRAINDICATIONS,
  DRUG_NUTRIENT_DEPLETIONS,
  SUPPLEMENT_FORMS,
  type SafetyWarning,
  type SeverityLevel,
  extractMaxDosage,
  extractUnit,
  normalizeDosageToStandardUnit,
  matchesMedication,
  matchesCondition,
  normalizeMedicalTerm,
} from './clinical-safety'

// ============================================================================
// TYPES
// ============================================================================

export interface ValidationContext {
  // Patient demographics
  age?: number
  gender?: 'hombre' | 'mujer'
  isPregnant?: boolean
  isBreastfeeding?: boolean

  // Medical history
  conditions?: string[]
  medications?: string[]

  // Supplement details
  supplementName: string
  dosage: string
  duration?: 'short-term' | 'long-term' // Default: long-term
}

export interface ValidationResult {
  isValid: boolean
  warnings: SafetyWarning[]
  requiresProfessionalReview: boolean
  suggestedAlternatives?: string[]
}

// ============================================================================
// UPPER LIMIT VALIDATION
// ============================================================================

/**
 * Validates dosage against tolerable upper intake limits
 * NOW WITH UNIT NORMALIZATION to prevent silent failures when units differ
 */
export function validateUpperLimit(context: ValidationContext): SafetyWarning[] {
  const warnings: SafetyWarning[] = []
  const { supplementName, dosage, duration = 'long-term' } = context

  // Find upper limit for this supplement
  const upperLimit = UPPER_LIMITS[supplementName]
  if (!upperLimit) {
    // No established upper limit - not necessarily safe, just not defined
    return warnings
  }

  // Extract dosage amount
  const maxDosageAmount = extractMaxDosage(dosage)
  if (!maxDosageAmount) {
    // Can't parse dosage - flag for review
    warnings.push({
      severity: 'INFO',
      category: 'UPPER_LIMIT',
      supplementName,
      message: `No se pudo validar la dosis "${dosage}" contra límites superiores`,
      recommendation: 'Verificar formato de dosis',
      requiresProfessionalReview: false,
    })
    return warnings
  }

  // Extract unit from dosage string
  const dosageUnit = extractUnit(dosage)

  // Normalize dosage to upper limit's unit
  const normalizationResult = normalizeDosageToStandardUnit(
    maxDosageAmount,
    dosageUnit,
    upperLimit.unit,
    supplementName
  )

  // If normalization failed, warn about unit mismatch
  if (!normalizationResult.success && dosageUnit !== upperLimit.unit) {
    warnings.push({
      severity: 'MODERATE',
      category: 'UPPER_LIMIT',
      supplementName,
      message: `No se pudo convertir la unidad de dosificación (${dosageUnit || 'desconocida'}) a la unidad del límite superior (${upperLimit.unit})`,
      recommendation: `Verificar dosis manualmente. Dosis indicada: ${dosage}. Límite superior: ${upperLimit.daily} ${upperLimit.unit}/día`,
      requiresProfessionalReview: true,
    })
    return warnings
  }

  const normalizedAmount = normalizationResult.normalizedAmount

  // Check short-term allowance if applicable
  if (duration === 'short-term' && upperLimit.shortTerm) {
    if (normalizedAmount > upperLimit.shortTerm.amount) {
      let message = `Dosis ${normalizedAmount} ${upperLimit.unit} excede límite superior a corto plazo de ${upperLimit.shortTerm.amount} ${upperLimit.unit}`

      // Add conversion note if conversion was applied
      if (normalizationResult.conversionApplied) {
        message += ` (convertido: ${normalizationResult.conversionApplied})`
      }

      warnings.push({
        severity: 'MAJOR',
        category: 'UPPER_LIMIT',
        supplementName,
        message,
        recommendation: `Limitar a ${upperLimit.shortTerm.amount} ${upperLimit.unit} durante ${upperLimit.shortTerm.duration}. ${upperLimit.shortTerm.condition}`,
        requiresProfessionalReview: true,
      })
    }
    // Within short-term limit - OK
    return warnings
  }

  // Check long-term daily limit
  if (upperLimit.daily && normalizedAmount > upperLimit.daily) {
    const severity: SeverityLevel = normalizedAmount > upperLimit.daily * 2 ? 'CRITICAL' : 'MAJOR'

    let message = `Dosis ${normalizedAmount} ${upperLimit.unit} excede el Límite Superior Tolerable de ${upperLimit.daily} ${upperLimit.unit}/día`

    // Add conversion note if conversion was applied
    if (normalizationResult.conversionApplied) {
      message += ` (convertido: ${normalizationResult.conversionApplied})`
    }

    warnings.push({
      severity,
      category: 'UPPER_LIMIT',
      supplementName,
      message,
      recommendation: `Reducir dosis a máximo ${upperLimit.daily} ${upperLimit.unit}/día para uso prolongado. Fuente: ${upperLimit.source}`,
      requiresProfessionalReview: true,
    })
  }

  return warnings
}

// ============================================================================
// UNKNOWN PATIENT DETAILS VALIDATION
// ============================================================================

/**
 * Generates warnings when critical patient details are unknown
 */
export function validateUnknownPatientDetails(context: ValidationContext): SafetyWarning[] {
  const warnings: SafetyWarning[] = []
  const {
    supplementName,
    isPregnant,
    isBreastfeeding,
    conditions,
  } = context

  // Check if pregnancy status, breastfeeding status, or conditions are unknown (undefined)
  if (isPregnant === undefined || isBreastfeeding === undefined || conditions === undefined) {
    const unknownDetails: string[] = []

    if (isPregnant === undefined) unknownDetails.push('embarazo')
    if (isBreastfeeding === undefined) unknownDetails.push('lactancia')
    if (conditions === undefined) unknownDetails.push('condiciones médicas preexistentes')

    warnings.push({
      severity: 'MODERATE',
      category: 'CONTRAINDICATION',
      supplementName,
      message: `Estado desconocido: ${unknownDetails.join(', ')}`,
      recommendation: `Antes de comenzar ${supplementName}, confirme con su médico que es seguro considerando: ${unknownDetails.join(', ')}. Esta recomendación asume que no está embarazada, amamantando, ni tiene condiciones médicas que puedan contraindicar este suplemento.`,
      requiresProfessionalReview: true,
    })
  }

  return warnings
}

// ============================================================================
// CONTRAINDICATION VALIDATION
// ============================================================================

/**
 * Checks for contraindications based on medications, conditions, and demographics
 */
export function validateContraindications(context: ValidationContext): SafetyWarning[] {
  const warnings: SafetyWarning[] = []
  const {
    supplementName,
    medications = [],
    conditions = [],
    isPregnant = false,
    isBreastfeeding = false,
    age,
  } = context

  // Find contraindications for this supplement
  const contraindication = CONTRAINDICATIONS[supplementName]
  if (!contraindication) {
    return warnings
  }

  // Check pregnancy/breastfeeding
  if (contraindication.demographicRestrictions?.pregnancy && isPregnant) {
    warnings.push({
      severity: 'CRITICAL',
      category: 'CONTRAINDICATION',
      supplementName,
      message: `${supplementName} está CONTRAINDICADO durante el embarazo`,
      recommendation: `NO USAR. ${contraindication.rationale}. Consultar con obstetra`,
      requiresProfessionalReview: true,
    })
  }

  if (contraindication.demographicRestrictions?.breastfeeding && isBreastfeeding) {
    warnings.push({
      severity: 'MAJOR',
      category: 'CONTRAINDICATION',
      supplementName,
      message: `${supplementName} está contraindicado durante la lactancia`,
      recommendation: `Evitar uso. ${contraindication.rationale}`,
      requiresProfessionalReview: true,
    })
  }

  // Check age restrictions
  if (age !== undefined) {
    const minAge = contraindication.demographicRestrictions?.minAge
    const maxAge = contraindication.demographicRestrictions?.maxAge

    if (minAge && age < minAge) {
      warnings.push({
        severity: 'MAJOR',
        category: 'CONTRAINDICATION',
        supplementName,
        message: `${supplementName} no recomendado para menores de ${minAge} años`,
        recommendation: `Edad actual: ${age} años. Consultar con pediatra`,
        requiresProfessionalReview: true,
      })
    }

    if (maxAge && age > maxAge) {
      warnings.push({
        severity: 'MODERATE',
        category: 'CONTRAINDICATION',
        supplementName,
        message: `${supplementName} requiere precaución en mayores de ${maxAge} años`,
        recommendation: `Edad actual: ${age} años. Monitoreo recomendado`,
        requiresProfessionalReview: true,
      })
    }
  }

  // Check medication interactions
  for (const medication of medications) {
    if (matchesMedication(medication, contraindication.medications)) {
      warnings.push({
        severity: contraindication.severity,
        category: 'CONTRAINDICATION',
        supplementName,
        message: `INTERACCIÓN ${contraindication.severity}: ${supplementName} + ${medication}`,
        recommendation: `${contraindication.rationale}. Consultar con médico prescriptor antes de iniciar`,
        requiresProfessionalReview: true,
      })
    }
  }

  // Check medical condition contraindications
  for (const condition of conditions) {
    if (matchesCondition(condition, contraindication.conditions)) {
      warnings.push({
        severity: contraindication.severity,
        category: 'CONTRAINDICATION',
        supplementName,
        message: `CONTRAINDICACIÓN ${contraindication.severity}: ${supplementName} en pacientes con ${condition}`,
        recommendation: `${contraindication.rationale}. NO USAR sin supervisión médica`,
        requiresProfessionalReview: true,
      })
    }
  }

  return warnings
}

// ============================================================================
// DRUG-NUTRIENT DEPLETION DETECTION
// ============================================================================

/**
 * Identifies nutrients that may be depleted by patient's medications
 */
export function detectNutrientDepletions(medications: string[]): {
  depletions: Array<{
    medication: string
    nutrientsDepleted: string[]
    mechanism: string
    recommendation: string
    monitoringAdvice: string
  }>
  recommendedSupplements: string[]
} {
  const depletions: Array<{
    medication: string
    nutrientsDepleted: string[]
    mechanism: string
    recommendation: string
    monitoringAdvice: string
  }> = []
  const recommendedSupplementsSet = new Set<string>()

  for (const medication of medications) {
    const normalizedMed = normalizeMedicalTerm(medication)

    // Check each known drug-nutrient depletion
    for (const [drugName, depletionData] of Object.entries(DRUG_NUTRIENT_DEPLETIONS)) {
      if (normalizedMed.includes(normalizeMedicalTerm(drugName))) {
        depletions.push({
          medication,
          nutrientsDepleted: depletionData.nutrientsDepleted,
          mechanism: depletionData.mechanism,
          recommendation: depletionData.recommendedSupplementation,
          monitoringAdvice: depletionData.monitoringAdvice,
        })

        // Add to recommended supplements
        depletionData.nutrientsDepleted.forEach(nutrient => recommendedSupplementsSet.add(nutrient))
      }
    }
  }

  return {
    depletions,
    recommendedSupplements: Array.from(recommendedSupplementsSet),
  }
}

/**
 * Generate warnings for missing depletion coverage
 */
export function validateDepletionCoverage(
  medications: string[],
  currentSupplements: string[]
): SafetyWarning[] {
  const warnings: SafetyWarning[] = []
  const { depletions, recommendedSupplements } = detectNutrientDepletions(medications)

  if (depletions.length === 0) {
    return warnings
  }

  // Check which depleted nutrients are NOT being supplemented
  const missingNutrients = recommendedSupplements.filter(
    nutrient => !currentSupplements.some(supp => supp.includes(nutrient))
  )

  if (missingNutrients.length > 0) {
    for (const depletion of depletions) {
      const missingFromThisDrug = depletion.nutrientsDepleted.filter(n =>
        missingNutrients.includes(n)
      )

      if (missingFromThisDrug.length > 0) {
        warnings.push({
          severity: 'MODERATE',
          category: 'DRUG_INTERACTION',
          supplementName: missingFromThisDrug.join(', '),
          message: `${depletion.medication} puede causar deficiencia de: ${missingFromThisDrug.join(', ')}`,
          recommendation: `${depletion.recommendation}. ${depletion.monitoringAdvice}`,
          requiresProfessionalReview: false,
        })
      }
    }
  }

  return warnings
}

// ============================================================================
// SUPPLEMENT FORM VALIDATION
// ============================================================================

/**
 * Provides guidance on optimal supplement forms for better bioavailability
 */
export function validateSupplementForm(supplementName: string): SafetyWarning | null {
  const formInfo = SUPPLEMENT_FORMS[supplementName]
  if (!formInfo) {
    return null
  }

  // Only provide info-level guidance (not a warning)
  return {
    severity: 'INFO',
    category: 'QUALITY',
    supplementName,
    message: `Forma recomendada: ${formInfo.preferredForm}`,
    recommendation: `${formInfo.notes}. Biodisponibilidad: ${formInfo.bioavailability}. Tolerabilidad: ${formInfo.tolerability}`,
    requiresProfessionalReview: false,
  }
}

// ============================================================================
// COMPREHENSIVE VALIDATION
// ============================================================================

/**
 * Run all validations for a supplement recommendation
 */
export function validateSupplement(context: ValidationContext): ValidationResult {
  const warnings: SafetyWarning[] = []

  // 1. Check for unknown patient details
  warnings.push(...validateUnknownPatientDetails(context))

  // 2. Check upper limits
  warnings.push(...validateUpperLimit(context))

  // 3. Check contraindications
  warnings.push(...validateContraindications(context))

  // 4. Provide form guidance
  const formWarning = validateSupplementForm(context.supplementName)
  if (formWarning) {
    warnings.push(formWarning)
  }

  // Determine if professional review is required
  const requiresProfessionalReview = warnings.some(w => w.requiresProfessionalReview)

  // Extract suggested alternatives from form info
  const formInfo = SUPPLEMENT_FORMS[context.supplementName]
  const suggestedAlternatives = formInfo?.alternatives

  return {
    isValid: !warnings.some(w => w.severity === 'CRITICAL'),
    warnings,
    requiresProfessionalReview,
    suggestedAlternatives,
  }
}

/**
 * Validate entire recommendation list
 */
export function validateRecommendationList(
  supplements: Array<{ name: string; dosage: string }>,
  patientContext: {
    age?: number
    gender?: 'hombre' | 'mujer'
    isPregnant?: boolean
    isBreastfeeding?: boolean
    conditions?: string[]
    medications?: string[]
  }
): {
  supplementValidations: Array<ValidationResult & { supplementName: string }>
  drugDepletionWarnings: SafetyWarning[]
  overallRequiresProfessionalReview: boolean
} {
  const supplementValidations = supplements.map(supp => ({
    supplementName: supp.name,
    ...validateSupplement({
      ...patientContext,
      supplementName: supp.name,
      dosage: supp.dosage,
    }),
  }))

  // Check drug-nutrient depletions
  const currentSupplementNames = supplements.map(s => s.name)
  const drugDepletionWarnings = validateDepletionCoverage(
    patientContext.medications || [],
    currentSupplementNames
  )

  // Overall professional review flag
  const overallRequiresProfessionalReview =
    supplementValidations.some(v => v.requiresProfessionalReview) ||
    drugDepletionWarnings.some(w => w.requiresProfessionalReview)

  return {
    supplementValidations,
    drugDepletionWarnings,
    overallRequiresProfessionalReview,
  }
}
