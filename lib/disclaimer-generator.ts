/**
 * Disclaimer Generation System
 *
 * Generates appropriate medical and legal disclaimers based on:
 * - Risk level of recommendations
 * - Patient demographics (pregnancy, age, conditions)
 * - Severity of warnings
 */

import type { SafetyWarning, SeverityLevel } from './clinical-safety'

// ============================================================================
// TYPES
// ============================================================================

export interface DisclaimerContext {
  hasWarnings: boolean
  maxSeverity?: SeverityLevel
  isPregnant?: boolean
  isBreastfeeding?: boolean
  hasChronicConditions?: boolean
  onMultipleMedications?: boolean // 2+ medications
  requiresProfessionalReview: boolean
  warningCategories: Set<string>
}

export interface GeneratedDisclaimer {
  level: 'STANDARD' | 'ENHANCED' | 'CRITICAL'
  primaryDisclaimer: string
  specificWarnings: string[]
  actionRequired?: string
  professionalConsultRequired: boolean
}

// ============================================================================
// BASE DISCLAIMERS
// ============================================================================

const STANDARD_DISCLAIMER = `
**IMPORTANTE: Información General**

Esta recomendación de suplementos está basada en evidencia científica y los datos que proporcionaste. Sin embargo, **NO sustituye el consejo médico profesional**.

**Antes de comenzar cualquier suplementación:**
- Consulta con tu médico, especialmente si tienes condiciones médicas preexistentes
- Informa a tu médico sobre todos los medicamentos que tomas
- No excedas las dosis recomendadas
- Suspende y consulta si experimentas efectos adversos

**Consideraciones de calidad:**
- Compra suplementos de marcas reconocidas con certificación de terceros (USP, NSF, IFOS)
- Verifica la forma del suplemento (algunas tienen mejor absorción que otras)
- Almacena según indicaciones del fabricante

**Monitoreo:**
- Realiza análisis de sangre de seguimiento según indicación médica
- Los resultados pueden tardar 3-6 meses en manifestarse
- No todos los suplementos requieren uso indefinido
`.trim()

const ENHANCED_DISCLAIMER = `
**⚠️ ADVERTENCIA IMPORTANTE**

Tu perfil de salud requiere **precaución especial** con la suplementación. Las recomendaciones a continuación tienen advertencias específicas que debes revisar cuidadosamente.

**ACCIÓN REQUERIDA:**
- **CONSULTA con tu médico ANTES de iniciar estos suplementos**
- Muestra esta recomendación a tu médico para que evalúe interacciones
- NO automediques sin supervisión profesional
- Algunas recomendaciones pueden estar contraindicadas en tu caso

**Por qué necesitas supervisión:**
- Posibles interacciones con tus medicamentos actuales
- Riesgo de exceder límites superiores seguros
- Condiciones médicas que requieren ajuste de dosis
- Necesidad de monitoreo de laboratorio

${STANDARD_DISCLAIMER}
`.trim()

const CRITICAL_DISCLAIMER = `
**🚨 ALERTA CRÍTICA - REVISIÓN PROFESIONAL OBLIGATORIA**

Esta recomendación ha generado **ADVERTENCIAS DE ALTA GRAVEDAD** que requieren evaluación médica inmediata.

**⛔ NO INICIES ESTOS SUPLEMENTOS SIN SUPERVISIÓN MÉDICA ⛔**

**CONTRAINDICACIONES DETECTADAS:**
Se identificaron uno o más de los siguientes riesgos:
- Interacciones medicamentosas graves
- Contraindicaciones absolutas para tu condición médica
- Dosis que exceden límites superiores seguros
- Combinaciones peligrosas con tus medicamentos

**QUÉ HACER AHORA:**
1. **PROGRAMA UNA CITA MÉDICA** antes de comprar cualquier suplemento
2. **IMPRIME O COMPARTE** esta recomendación con tu médico
3. **NO COMPRES** los suplementos marcados con advertencias críticas
4. **PREGUNTA** a tu médico sobre alternativas seguras

**Tu seguridad es prioritaria.** Estas recomendaciones son educativas y requieren validación profesional en tu caso específico.

${STANDARD_DISCLAIMER}
`.trim()

// ============================================================================
// SPECIFIC WARNING MESSAGES
// ============================================================================

const SPECIFIC_WARNINGS: Record<string, string> = {
  PREGNANCY: `
    **⚠️ Embarazo Detectado**
    Algunos suplementos están contraindicados durante el embarazo (ej: Vitamina A >3000 mcg, hierbas).
    Consulta con tu obstetra antes de tomar cualquier suplemento más allá de vitaminas prenatales estándar.
  `,
  BREASTFEEDING: `
    **⚠️ Lactancia**
    Durante la lactancia, algunos suplementos pueden pasar a la leche materna.
    Verifica con tu pediatra y médico cuáles son seguros para tu bebé.
  `,
  CHRONIC_CONDITIONS: `
    **⚠️ Condiciones Médicas Crónicas**
    Tus condiciones médicas pueden requerir ajustes en las dosis o contraindicar ciertos suplementos.
    Monitoreo médico regular es esencial.
  `,
  POLYPHARMACY: `
    **⚠️ Múltiples Medicamentos**
    Tomas varios medicamentos, lo que aumenta el riesgo de interacciones farmacológicas.
    Es crítico que tu médico revise todas las interacciones potenciales.
  `,
  UPPER_LIMIT_EXCEEDED: `
    **🚨 Límite Superior Excedido**
    Una o más dosis recomendadas exceden los límites superiores tolerables establecidos por autoridades sanitarias.
    Esto puede causar toxicidad con uso prolongado. Ajuste de dosis requerido.
  `,
  DRUG_INTERACTION: `
    **🚨 Interacción Medicamentosa Detectada**
    Se identificaron interacciones entre tus medicamentos y los suplementos recomendados.
    Algunas pueden ser graves (ej: sangrado aumentado, eficacia reducida de medicamentos).
  `,
  CONTRAINDICATION: `
    **🚨 Contraindicación Absoluta**
    Algunos suplementos están CONTRAINDICADOS para tu condición médica o medicamentos actuales.
    NO uses estos suplementos sin aprobación médica explícita.
  `,
  DRUG_DEPLETION: `
    **💊 Depleción Nutricional por Medicamentos**
    Tus medicamentos pueden estar causando deficiencias de ciertos nutrientes.
    La suplementación puede ser necesaria, pero requiere monitoreo de laboratorio.
  `,
  QUALITY_CONCERN: `
    **ℹ️ Consideraciones de Calidad**
    La forma y calidad del suplemento afectan significativamente su eficacia.
    Presta atención a las recomendaciones de formas específicas (ej: bisglicinato vs sulfato de hierro).
  `,
}

// ============================================================================
// DISCLAIMER GENERATION LOGIC
// ============================================================================

/**
 * Determine disclaimer level based on context
 */
export function determineDisclaimerLevel(context: DisclaimerContext): 'STANDARD' | 'ENHANCED' | 'CRITICAL' {
  // CRITICAL level triggers
  if (
    context.maxSeverity === 'CRITICAL' ||
    context.warningCategories.has('CONTRAINDICATION') ||
    context.warningCategories.has('UPPER_LIMIT')
  ) {
    return 'CRITICAL'
  }

  // ENHANCED level triggers
  if (
    context.requiresProfessionalReview ||
    context.maxSeverity === 'MAJOR' ||
    context.isPregnant ||
    context.isBreastfeeding ||
    context.onMultipleMedications ||
    context.warningCategories.has('DRUG_INTERACTION')
  ) {
    return 'ENHANCED'
  }

  // Default to STANDARD
  return 'STANDARD'
}

/**
 * Generate specific warnings based on context
 */
export function generateSpecificWarnings(context: DisclaimerContext): string[] {
  const warnings: string[] = []

  // Demographic warnings
  if (context.isPregnant) {
    warnings.push(SPECIFIC_WARNINGS.PREGNANCY)
  }
  if (context.isBreastfeeding) {
    warnings.push(SPECIFIC_WARNINGS.BREASTFEEDING)
  }
  if (context.hasChronicConditions) {
    warnings.push(SPECIFIC_WARNINGS.CHRONIC_CONDITIONS)
  }
  if (context.onMultipleMedications) {
    warnings.push(SPECIFIC_WARNINGS.POLYPHARMACY)
  }

  // Category-specific warnings
  if (context.warningCategories.has('UPPER_LIMIT')) {
    warnings.push(SPECIFIC_WARNINGS.UPPER_LIMIT_EXCEEDED)
  }
  if (context.warningCategories.has('DRUG_INTERACTION')) {
    warnings.push(SPECIFIC_WARNINGS.DRUG_INTERACTION)
  }
  if (context.warningCategories.has('CONTRAINDICATION')) {
    warnings.push(SPECIFIC_WARNINGS.CONTRAINDICATION)
  }
  if (context.warningCategories.has('NUTRIENT_CONFLICT')) {
    warnings.push(SPECIFIC_WARNINGS.DRUG_DEPLETION)
  }
  if (context.warningCategories.has('QUALITY')) {
    warnings.push(SPECIFIC_WARNINGS.QUALITY_CONCERN)
  }

  return warnings
}

/**
 * Generate action items based on severity
 */
export function generateActionRequired(level: 'STANDARD' | 'ENHANCED' | 'CRITICAL'): string | undefined {
  switch (level) {
    case 'CRITICAL':
      return '⛔ NO inicies suplementación. Agenda cita médica urgente para revisar esta recomendación.'
    case 'ENHANCED':
      return '⚠️ Consulta con tu médico antes de comprar. Muestra esta recomendación en tu próxima cita.'
    case 'STANDARD':
      return undefined
  }
}

/**
 * Main disclaimer generation function
 */
export function generateDisclaimer(context: DisclaimerContext): GeneratedDisclaimer {
  const level = determineDisclaimerLevel(context)
  const specificWarnings = generateSpecificWarnings(context)
  const actionRequired = generateActionRequired(level)

  let primaryDisclaimer: string
  switch (level) {
    case 'CRITICAL':
      primaryDisclaimer = CRITICAL_DISCLAIMER
      break
    case 'ENHANCED':
      primaryDisclaimer = ENHANCED_DISCLAIMER
      break
    case 'STANDARD':
      primaryDisclaimer = STANDARD_DISCLAIMER
      break
  }

  return {
    level,
    primaryDisclaimer,
    specificWarnings,
    actionRequired,
    professionalConsultRequired: level !== 'STANDARD',
  }
}

/**
 * Build disclaimer context from validation results
 */
export function buildDisclaimerContext(
  warnings: SafetyWarning[],
  patientContext: {
    isPregnant?: boolean
    isBreastfeeding?: boolean
    conditions?: string[]
    medications?: string[]
  }
): DisclaimerContext {
  const maxSeverity = warnings.reduce<SeverityLevel | undefined>((max, w) => {
    const severityOrder: SeverityLevel[] = ['INFO', 'MINOR', 'MODERATE', 'MAJOR', 'CRITICAL']
    if (!max) return w.severity
    return severityOrder.indexOf(w.severity) > severityOrder.indexOf(max) ? w.severity : max
  }, undefined)

  const warningCategories = new Set(warnings.map(w => w.category))

  const requiresProfessionalReview = warnings.some(w => w.requiresProfessionalReview)

  return {
    hasWarnings: warnings.length > 0,
    maxSeverity,
    isPregnant: patientContext.isPregnant,
    isBreastfeeding: patientContext.isBreastfeeding,
    hasChronicConditions: (patientContext.conditions?.length || 0) > 0,
    onMultipleMedications: (patientContext.medications?.length || 0) >= 2,
    requiresProfessionalReview,
    warningCategories,
  }
}

/**
 * Generate full disclaimer from validation results
 */
export function generateFullDisclaimer(
  warnings: SafetyWarning[],
  patientContext: {
    isPregnant?: boolean
    isBreastfeeding?: boolean
    conditions?: string[]
    medications?: string[]
  }
): GeneratedDisclaimer {
  const context = buildDisclaimerContext(warnings, patientContext)
  return generateDisclaimer(context)
}
