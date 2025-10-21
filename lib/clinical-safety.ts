/**
 * Clinical Safety System
 *
 * This module provides critical safety checks for supplement recommendations:
 * - Upper limit enforcement (UL - Tolerable Upper Intake Levels)
 * - Contraindication detection
 * - Drug-nutrient depletion tracking
 * - High-risk combination flagging
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type SeverityLevel = 'CRITICAL' | 'MAJOR' | 'MODERATE' | 'MINOR' | 'INFO'

export interface SafetyWarning {
  severity: SeverityLevel
  category: 'UPPER_LIMIT' | 'CONTRAINDICATION' | 'DRUG_INTERACTION' | 'NUTRIENT_CONFLICT' | 'QUALITY'
  supplementName: string
  message: string
  recommendation: string
  requiresProfessionalReview: boolean
}

export interface UpperLimit {
  daily: number | null
  unit: string
  shortTerm?: {
    amount: number
    duration: string
    condition: string
  }
  source: string // Reference (e.g., "NIH ODS", "EFSA")
}

export interface Contraindication {
  conditions: string[]
  medications: string[]
  demographicRestrictions?: {
    pregnancy?: boolean
    breastfeeding?: boolean
    minAge?: number
    maxAge?: number
  }
  severity: SeverityLevel
  rationale: string
}

export interface DrugNutrientDepletion {
  nutrientsDepleted: string[]
  mechanism: string
  recommendedSupplementation: string
  monitoringAdvice: string
}

export interface SupplementForm {
  preferredForm: string
  bioavailability: 'HIGH' | 'MEDIUM' | 'LOW'
  tolerability: 'EXCELLENT' | 'GOOD' | 'MODERATE' | 'POOR'
  alternatives: string[]
  notes: string
}

// ============================================================================
// UPPER LIMITS (Tolerable Upper Intake Levels)
// Based on NIH, EFSA, and IOM guidelines
// ============================================================================

export const UPPER_LIMITS: Record<string, UpperLimit> = {
  // Fat-Soluble Vitamins (highest toxicity risk)
  "Vitamina A": {
    daily: 3000, // mcg RAE (10,000 IU)
    unit: "mcg RAE",
    source: "NIH ODS",
  },
  "Vitamina D": {
    daily: 4000,
    unit: "UI",
    shortTerm: {
      amount: 10000,
      duration: "8-12 semanas",
      condition: "Deficiencia severa (<20 ng/mL) bajo supervisión",
    },
    source: "Endocrine Society 2011",
  },
  "Vitamina E": {
    daily: 1000,
    unit: "mg",
    source: "NIH ODS",
  },
  "Vitamina K": {
    daily: null, // No UL established, but caution with anticoagulants
    unit: "mcg",
    source: "NIH ODS - No UL, pero interacción con anticoagulantes",
  },

  // Water-Soluble Vitamins
  "Vitamina C": {
    daily: 2000,
    unit: "mg",
    source: "NIH ODS",
  },
  "Vitamina B3 (Niacina)": {
    daily: 35, // For nicotinic acid (flushing form)
    unit: "mg",
    source: "NIH ODS",
  },
  "Vitamina B6": {
    daily: 100,
    unit: "mg",
    source: "NIH ODS - Neuropatía con dosis altas crónicas",
  },
  "Ácido Fólico": {
    daily: 1000,
    unit: "mcg",
    source: "NIH ODS",
  },
  "Colina": {
    daily: 3500,
    unit: "mg",
    source: "NIH ODS",
  },

  // Minerals
  "Calcio": {
    daily: 2500, // 2000 for adults >50
    unit: "mg",
    source: "NIH ODS",
  },
  "Hierro": {
    daily: 45,
    unit: "mg hierro elemental",
    source: "NIH ODS - Mayor riesgo en hombres (sin pérdida menstrual)",
  },
  "Magnesio": {
    daily: 350, // From supplements only (not food)
    unit: "mg suplementario",
    source: "NIH ODS",
  },
  "Zinc": {
    daily: 40,
    unit: "mg",
    source: "NIH ODS - Interfiere con absorción de cobre",
  },
  "Cobre": {
    daily: 10,
    unit: "mg",
    source: "NIH ODS",
  },
  "Selenio": {
    daily: 400,
    unit: "mcg",
    source: "NIH ODS - Toxicidad: pérdida cabello, uñas quebradizas",
  },
  "Yodo": {
    daily: 1100,
    unit: "mcg",
    source: "NIH ODS",
  },
  "Manganeso": {
    daily: 11,
    unit: "mg",
    source: "NIH ODS",
  },

  // Amino Acids
  "L-Arginina": {
    daily: null,
    unit: "g",
    source: "No UL establecido - Hasta 30g estudiado, pero precaución en herpes",
  },

  // Omega-3
  "Omega-3 (EPA y DHA)": {
    daily: 3000,
    unit: "mg combinados",
    source: "FDA - Dosis mayores bajo supervisión médica",
  },
}

// ============================================================================
// CONTRAINDICATIONS
// Medical conditions and medications that contraindicate supplements
// ============================================================================

export const CONTRAINDICATIONS: Record<string, Contraindication> = {
  "Omega-3 (EPA y DHA)": {
    conditions: ["trastorno hemorrágico", "cirugía programada", "hemofilia"],
    medications: ["warfarina", "coumadin", "anticoagulante", "aspirina", "clopidogrel", "plavix"],
    severity: "MAJOR",
    rationale: "Aumenta riesgo de sangrado al inhibir agregación plaquetaria",
  },
  "Vitamina K": {
    conditions: [],
    medications: ["warfarina", "coumadin", "anticoagulante"],
    severity: "CRITICAL",
    rationale: "Antagoniza directamente la acción de warfarina (vitamina K es el antídoto)",
  },
  "Vitamina A": {
    conditions: ["embarazo"],
    medications: ["isotretinoína", "acitretina", "retinoides"],
    demographicRestrictions: {
      pregnancy: true,
    },
    severity: "CRITICAL",
    rationale: "Teratogénico en dosis >3000 mcg/día. Alto riesgo de defectos del tubo neural",
  },
  "Hierro": {
    conditions: ["hemocromatosis", "talasemia", "hepatopatía"],
    medications: ["levotiroxina", "antibióticos quinolonas", "tetraciclinas"],
    severity: "MAJOR",
    rationale: "Sobrecarga de hierro en hemocromatosis. Interfiere con absorción de levotiroxina",
  },
  "Calcio": {
    conditions: ["hipercalcemia", "cálculos renales de calcio", "sarcoidosis"],
    medications: ["digoxina", "tiazidas", "levotiroxina", "bifosfonatos"],
    severity: "MAJOR",
    rationale: "Aumenta riesgo de arritmias con digoxina. Interfiere con absorción de bifosfonatos",
  },
  "Magnesio": {
    conditions: ["insuficiencia renal", "enfermedad renal crónica"],
    medications: ["bifosfonatos", "antibióticos quinolonas", "tetraciclinas"],
    severity: "MAJOR",
    rationale: "Acumulación peligrosa en insuficiencia renal. Puede causar hipotensión y debilidad",
  },
  "Potasio": {
    conditions: ["insuficiencia renal", "enfermedad renal", "hiperpotasemia"],
    medications: ["IECA", "ARA II", "espironolactona", "amilorida", "triamtereno"],
    severity: "CRITICAL",
    rationale: "Riesgo de hiperpotasemia fatal (arritmias). Los IECA retienen potasio",
  },
  "Yodo": {
    conditions: ["hipertiroidismo", "enfermedad de Graves", "tiroiditis autoinmune"],
    medications: ["levotiroxina", "metimazol", "propiltiouracilo"],
    severity: "MAJOR",
    rationale: "Puede desencadenar crisis tirotóxica en hipertiroidismo",
  },
  "Ginkgo Biloba": {
    conditions: ["trastorno hemorrágico", "epilepsia", "cirugía programada"],
    medications: ["warfarina", "anticoagulantes", "anticonvulsivantes", "ISRS"],
    severity: "MAJOR",
    rationale: "Aumenta riesgo de sangrado y convulsiones. Interacción con ISRS (síndrome serotoninérgico)",
  },
  "Hierba de San Juan": {
    conditions: ["depresión mayor", "trastorno bipolar"],
    medications: ["ISRS", "antidepresivos", "anticonceptivos", "warfarina", "ciclosporina", "digoxina"],
    severity: "CRITICAL",
    rationale: "Induce CYP450 - reduce eficacia de anticonceptivos, inmunosupresores, anticoagulantes",
  },
  "Ácido Alfa Lipoico": {
    conditions: ["diabetes tipo 1", "hipoglucemia"],
    medications: ["insulina", "metformina", "sulfonilureas"],
    severity: "MODERATE",
    rationale: "Efecto hipoglucemiante aditivo. Requiere monitoreo de glucosa",
  },
  "Creatina": {
    conditions: ["enfermedad renal", "insuficiencia renal"],
    medications: ["AINE", "diuréticos"],
    severity: "MODERATE",
    rationale: "Puede empeorar función renal en enfermedad preexistente",
  },
  "Cohosh Negro (Cimicífuga)": {
    conditions: ["hepatopatía", "cáncer de mama estrógeno-positivo"],
    medications: ["tamoxifeno", "terapia hormonal"],
    demographicRestrictions: {
      pregnancy: true,
      breastfeeding: true,
    },
    severity: "MAJOR",
    rationale: "Hepatotoxicidad reportada. Posible actividad estrogénica",
  },
}

// ============================================================================
// DRUG-NUTRIENT DEPLETIONS
// Medications that deplete specific nutrients
// ============================================================================

export const DRUG_NUTRIENT_DEPLETIONS: Record<string, DrugNutrientDepletion> = {
  "metformina": {
    nutrientsDepleted: ["Vitamina B12", "Ácido Fólico"],
    mechanism: "Interfiere con absorción de B12 en íleon terminal",
    recommendedSupplementation: "Vitamina B12: 500-1000 mcg/día oral o 1000 mcg/mes IM",
    monitoringAdvice: "Medir B12 sérica anualmente. Considerar metilmalonico si B12 en rango bajo-normal",
  },
  "omeprazol": {
    nutrientsDepleted: ["Vitamina B12", "Magnesio", "Calcio", "Hierro"],
    mechanism: "Hipoclorhidria reduce absorción de nutrientes dependientes de pH ácido",
    recommendedSupplementation: "B12: 500-1000 mcg/día. Magnesio: 200-400 mg/día",
    monitoringAdvice: "Medir Mg cada 6-12 meses (riesgo de hipomagnesemia severa). B12 anualmente",
  },
  "esomeprazol": {
    nutrientsDepleted: ["Vitamina B12", "Magnesio", "Calcio", "Hierro"],
    mechanism: "IBP - reduce acidez gástrica",
    recommendedSupplementation: "B12: 500-1000 mcg/día. Magnesio: 200-400 mg/día",
    monitoringAdvice: "Igual que omeprazol",
  },
  "lansoprazol": {
    nutrientsDepleted: ["Vitamina B12", "Magnesio", "Calcio"],
    mechanism: "IBP - hipoclorhidria",
    recommendedSupplementation: "B12: 500-1000 mcg/día. Magnesio: 200-400 mg/día",
    monitoringAdvice: "Igual que omeprazol",
  },
  "pantoprazol": {
    nutrientsDepleted: ["Vitamina B12", "Magnesio", "Calcio"],
    mechanism: "IBP - hipoclorhidria",
    recommendedSupplementation: "B12: 500-1000 mcg/día. Magnesio: 200-400 mg/día",
    monitoringAdvice: "Igual que omeprazol",
  },
  "ranitidina": {
    nutrientsDepleted: ["Vitamina B12", "Hierro"],
    mechanism: "Bloqueador H2 - reduce acidez (menor efecto que IBP)",
    recommendedSupplementation: "B12: 250-500 mcg/día si uso >1 año",
    monitoringAdvice: "Medir B12 si uso prolongado (>2 años)",
  },
  "estatinas": {
    nutrientsDepleted: ["CoQ10", "Vitamina D"],
    mechanism: "Inhiben síntesis de mevalonato (precursor de CoQ10 y colesterol)",
    recommendedSupplementation: "CoQ10: 100-200 mg/día (ubiquinol preferido). Vitamina D según niveles",
    monitoringAdvice: "Considerar CoQ10 si mialgia/fatiga. Medir 25-OH vitamina D anualmente",
  },
  "atorvastatina": {
    nutrientsDepleted: ["CoQ10"],
    mechanism: "Estatina - bloquea HMG-CoA reductasa",
    recommendedSupplementation: "CoQ10: 100-200 mg/día",
    monitoringAdvice: "Especialmente si síntomas musculares",
  },
  "simvastatina": {
    nutrientsDepleted: ["CoQ10"],
    mechanism: "Estatina - bloquea HMG-CoA reductasa",
    recommendedSupplementation: "CoQ10: 100-200 mg/día",
    monitoringAdvice: "Especialmente si síntomas musculares",
  },
  "rosuvastatina": {
    nutrientsDepleted: ["CoQ10"],
    mechanism: "Estatina - bloquea HMG-CoA reductasa",
    recommendedSupplementation: "CoQ10: 100-200 mg/día",
    monitoringAdvice: "Especialmente si síntomas musculares",
  },
  "diuréticos tiazídicos": {
    nutrientsDepleted: ["Potasio", "Magnesio", "Zinc"],
    mechanism: "Aumenta excreción renal de electrolitos",
    recommendedSupplementation: "Potasio: según niveles séricos. Magnesio: 200-400 mg/día",
    monitoringAdvice: "Medir K y Mg cada 3-6 meses. Riesgo de arritmias si hipokalemia",
  },
  "furosemida": {
    nutrientsDepleted: ["Potasio", "Magnesio", "Calcio", "Tiamina (B1)"],
    mechanism: "Diurético de asa - pérdida masiva de electrolitos",
    recommendedSupplementation: "Según niveles séricos. Tiamina: 100 mg/día si uso crónico",
    monitoringAdvice: "Monitoreo frecuente de electrolitos (K, Mg, Ca)",
  },
  "hidroclorotiazida": {
    nutrientsDepleted: ["Potasio", "Magnesio", "Zinc"],
    mechanism: "Diurético tiazídico",
    recommendedSupplementation: "Potasio y Magnesio según niveles",
    monitoringAdvice: "Medir K y Mg cada 3-6 meses",
  },
  "anticonceptivos orales": {
    nutrientsDepleted: ["Vitamina B6", "Ácido Fólico", "Vitamina B12", "Magnesio"],
    mechanism: "Aumenta metabolismo de vitaminas B. Reduce absorción de folato",
    recommendedSupplementation: "Complejo B: B6 25-50 mg, Folato 400 mcg, B12 100 mcg",
    monitoringAdvice: "Considerar si síntomas de deficiencia (fatiga, depresión)",
  },
  "corticosteroides": {
    nutrientsDepleted: ["Calcio", "Vitamina D", "Potasio", "Magnesio"],
    mechanism: "Aumenta excreción de calcio. Interfiere con metabolismo de vitamina D",
    recommendedSupplementation: "Calcio: 1000-1500 mg/día + Vitamina D: 800-2000 UI/día",
    monitoringAdvice: "DEXA scan si uso >3 meses. Medir 25-OH vitamina D",
  },
  "prednisona": {
    nutrientsDepleted: ["Calcio", "Vitamina D", "Potasio"],
    mechanism: "Corticosteroide",
    recommendedSupplementation: "Calcio + Vitamina D obligatorio si uso crónico",
    monitoringAdvice: "Prevención de osteoporosis inducida por esteroides",
  },
  "levotiroxina": {
    nutrientsDepleted: [],
    mechanism: "No depleta, pero su absorción es interferida por Calcio, Hierro, Magnesio",
    recommendedSupplementation: "Separar suplementos 4 horas de levotiroxina",
    monitoringAdvice: "Tomar levotiroxina en ayunas, suplementos en tarde/noche",
  },
  "antibióticos quinolonas": {
    nutrientsDepleted: [],
    mechanism: "Quelan con minerales divalentes (Ca, Mg, Fe, Zn)",
    recommendedSupplementation: "Separar minerales 2-4 horas del antibiótico",
    monitoringAdvice: "Reduce eficacia del antibiótico si se toman juntos",
  },
  "tetraciclinas": {
    nutrientsDepleted: [],
    mechanism: "Quelan con Ca, Mg, Fe",
    recommendedSupplementation: "Separar minerales 2-4 horas",
    monitoringAdvice: "Tomar con estómago vacío",
  },
  "bifosfonatos": {
    nutrientsDepleted: [],
    mechanism: "Requiere Ca y vitamina D para eficacia",
    recommendedSupplementation: "Calcio: 1000-1200 mg/día + Vitamina D: 800-2000 UI (separado 2+ horas)",
    monitoringAdvice: "Tomar bifosfonato en ayunas, suplementos en tarde",
  },
}

// ============================================================================
// SUPPLEMENT FORMS (Bioavailability & Tolerability)
// ============================================================================

export const SUPPLEMENT_FORMS: Record<string, SupplementForm> = {
  "Hierro": {
    preferredForm: "Bisglicinato ferroso (quelado)",
    bioavailability: "HIGH",
    tolerability: "EXCELLENT",
    alternatives: [
      "Sulfato ferroso (20% elemental, mal tolerado)",
      "Fumarato ferroso (33% elemental, mejor absorción)",
      "Citrato férrico (menor biodisponibilidad)",
    ],
    notes: "Bisglicinato ferroso tiene 25% hierro elemental y causa menos estreñimiento/náusea. Tomar con vitamina C, evitar con café/té",
  },
  "Magnesio": {
    preferredForm: "Bisglicinato o Treonato de magnesio",
    bioavailability: "HIGH",
    tolerability: "EXCELLENT",
    alternatives: [
      "Citrato de magnesio (efecto laxante)",
      "Óxido de magnesio (4% absorción, laxante fuerte)",
      "Cloruro de magnesio (buena absorción)",
    ],
    notes: "Bisglicinato: mejor tolerado, no laxante. Treonato: cruza barrera hematoencefálica (función cognitiva). Óxido: evitar salvo para estreñimiento",
  },
  "Calcio": {
    preferredForm: "Citrato de calcio",
    bioavailability: "HIGH",
    tolerability: "GOOD",
    alternatives: [
      "Carbonato de calcio (40% elemental, requiere acidez gástrica)",
      "Fosfato de calcio",
      "Hidroxiapatita de calcio",
    ],
    notes: "Citrato: absorción independiente de pH (ideal con IBP). Carbonato: más elemental pero requiere comida. Máximo 500 mg por dosis",
  },
  "Zinc": {
    preferredForm: "Picolinato o Bisglicinato de zinc",
    bioavailability: "HIGH",
    tolerability: "GOOD",
    alternatives: [
      "Acetato de zinc",
      "Sulfato de zinc (puede causar náusea)",
      "Gluconato de zinc",
    ],
    notes: "Formas queladas mejor absorbidas. Tomar con comida para reducir náusea. Dosis >40 mg interfieren con cobre",
  },
  "Omega-3 (EPA y DHA)": {
    preferredForm: "Triglicéridos (TG) naturales",
    bioavailability: "HIGH",
    tolerability: "GOOD",
    alternatives: [
      "Ésteres etílicos (EE) - 50% menos biodisponibilidad",
      "Fosfolípidos (aceite de krill)",
      "Triglicéridos reformados (rTG)",
    ],
    notes: "Forma TG tiene 2x absorción vs EE. Buscar certificación IFOS/USP (pureza). Índice TOTOX <26. Refrigerar para evitar oxidación",
  },
  "Vitamina D": {
    preferredForm: "Colecalciferol (D3)",
    bioavailability: "HIGH",
    tolerability: "EXCELLENT",
    alternatives: [
      "Ergocalciferol (D2) - menos potente",
    ],
    notes: "D3 es 87% más eficaz que D2. Tomar con grasa para absorción. Considerar K2 (MK-7) para evitar calcificación vascular",
  },
  "Vitamina K2": {
    preferredForm: "Menaquinona-7 (MK-7)",
    bioavailability: "HIGH",
    tolerability: "EXCELLENT",
    alternatives: [
      "Menaquinona-4 (MK-4) - vida media corta",
    ],
    notes: "MK-7 tiene vida media más larga. Esencial con suplementación de vitamina D y calcio",
  },
  "Vitamina B12": {
    preferredForm: "Metilcobalamina o Hidroxocobalamina",
    bioavailability: "HIGH",
    tolerability: "EXCELLENT",
    alternatives: [
      "Cianocobalamina (requiere conversión)",
      "Adenosilcobalamina",
    ],
    notes: "Metil/hidroxo son formas activas. Sublingual/IM si malabsorción (IBP, metformina, ancianos)",
  },
  "Ácido Fólico": {
    preferredForm: "L-Metilfolato (5-MTHF)",
    bioavailability: "HIGH",
    tolerability: "EXCELLENT",
    alternatives: [
      "Ácido fólico sintético (requiere conversión MTHFR)",
      "Folinato de calcio (ácido folínico)",
    ],
    notes: "L-metilfolato es forma activa. Crítico si mutación MTHFR. Evitar ácido fólico >400 mcg sin B12 (puede enmascarar deficiencia B12)",
  },
  "Curcumina": {
    preferredForm: "Curcumina con piperina o formulación liposomal",
    bioavailability: "MEDIUM",
    tolerability: "GOOD",
    alternatives: [
      "Curcumina sin mejorador (1% absorción)",
      "Meriva (fitosomal)",
      "BCM-95",
    ],
    notes: "Piperina aumenta absorción 2000%. Formulaciones especiales mejoran biodisponibilidad",
  },
  "CoQ10": {
    preferredForm: "Ubiquinol",
    bioavailability: "HIGH",
    tolerability: "EXCELLENT",
    alternatives: [
      "Ubiquinona (requiere conversión a ubiquinol)",
    ],
    notes: "Ubiquinol es forma reducida activa. 8x más biodisponible en >40 años. Tomar con grasa",
  },
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Normalize medication/condition names for matching
 */
export function normalizeMedicalTerm(term: string): string {
  return term
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .trim()
}

/**
 * Check if medication matches a contraindication keyword
 */
export function matchesMedication(userMedication: string, contraindicationKeywords: string[]): boolean {
  const normalized = normalizeMedicalTerm(userMedication)
  return contraindicationKeywords.some(keyword =>
    normalized.includes(normalizeMedicalTerm(keyword))
  )
}

/**
 * Check if condition matches a contraindication keyword
 */
export function matchesCondition(userCondition: string, contraindicationKeywords: string[]): boolean {
  const normalized = normalizeMedicalTerm(userCondition)
  return contraindicationKeywords.some(keyword =>
    normalized.includes(normalizeMedicalTerm(keyword))
  )
}

/**
 * Extract dosage amount from string (e.g., "500-1000 mg" -> 1000)
 */
export function extractMaxDosage(dosageString: string): number | null {
  const matches = dosageString.match(/(\d+(?:\.\d+)?)-?(\d+(?:\.\d+)?)?/)
  if (!matches) return null

  // Return the higher value if range, otherwise the single value
  return matches[2] ? parseFloat(matches[2]) : parseFloat(matches[1])
}

/**
 * Extract unit from dosage string
 */
export function extractUnit(dosageString: string): string | null {
  const normalized = dosageString.toLowerCase()

  // Check for compound units first (order matters)
  if (normalized.includes('mcg rae') || normalized.includes('μg rae')) return 'mcg RAE'
  if (normalized.includes('mg hierro elemental')) return 'mg hierro elemental'
  if (normalized.includes('mg suplementario')) return 'mg suplementario'
  if (normalized.includes('mg combinados')) return 'mg combinados'

  // Check for standard units
  const units = ['ui', 'iu', 'mg', 'mcg', 'μg', 'g', 'ml']
  for (const unit of units) {
    if (normalized.includes(unit)) {
      return unit === 'ui' || unit === 'iu' ? 'UI' : unit
    }
  }

  return null
}

/**
 * Normalize dosage to standard unit for comparison
 * Handles critical conversions for fat-soluble vitamins
 */
export function normalizeDosageToStandardUnit(
  amount: number,
  fromUnit: string | null,
  toUnit: string,
  supplementName?: string
): { normalizedAmount: number; success: boolean; conversionApplied?: string } {
  // If units match, no conversion needed
  if (fromUnit === toUnit) {
    return { normalizedAmount: amount, success: true }
  }

  if (!fromUnit) {
    return { normalizedAmount: amount, success: false }
  }

  // Normalize unit strings for comparison
  const from = fromUnit.toLowerCase().trim()
  const to = toUnit.toLowerCase().trim()

  // ============================================================================
  // VITAMIN A CONVERSIONS
  // ============================================================================
  if (supplementName === "Vitamina A" || to.includes('rae')) {
    // IU to mcg RAE conversion for Vitamin A
    // 1 mcg RAE = 3.33 IU (for preformed vitamin A / retinol)
    if ((from === 'ui' || from === 'iu') && to.includes('mcg')) {
      const normalizedAmount = amount / 3.33
      return {
        normalizedAmount: Math.round(normalizedAmount),
        success: true,
        conversionApplied: `${amount} UI → ${Math.round(normalizedAmount)} mcg RAE`
      }
    }

    // mcg RAE to IU (reverse)
    if (from.includes('mcg') && (to === 'ui' || to === 'iu')) {
      const normalizedAmount = amount * 3.33
      return {
        normalizedAmount: Math.round(normalizedAmount),
        success: true,
        conversionApplied: `${amount} mcg RAE → ${Math.round(normalizedAmount)} UI`
      }
    }
  }

  // ============================================================================
  // VITAMIN E CONVERSIONS
  // ============================================================================
  if (supplementName === "Vitamina E") {
    // IU to mg conversion for Vitamin E (d-alpha-tocopherol, natural)
    // 1 mg d-alpha-tocopherol = 1.49 IU
    if ((from === 'ui' || from === 'iu') && to === 'mg') {
      const normalizedAmount = amount / 1.49
      return {
        normalizedAmount: Math.round(normalizedAmount),
        success: true,
        conversionApplied: `${amount} UI → ${Math.round(normalizedAmount)} mg (natural form)`
      }
    }

    // mg to IU (reverse)
    if (from === 'mg' && (to === 'ui' || to === 'iu')) {
      const normalizedAmount = amount * 1.49
      return {
        normalizedAmount: Math.round(normalizedAmount),
        success: true,
        conversionApplied: `${amount} mg → ${Math.round(normalizedAmount)} UI (natural form)`
      }
    }
  }

  // ============================================================================
  // STANDARD METRIC CONVERSIONS
  // ============================================================================

  // mg to mcg
  if (from === 'mg' && (to === 'mcg' || to === 'μg' || to.includes('mcg'))) {
    const normalizedAmount = amount * 1000
    return {
      normalizedAmount,
      success: true,
      conversionApplied: `${amount} mg → ${normalizedAmount} mcg`
    }
  }

  // mcg to mg
  if ((from === 'mcg' || from === 'μg') && (to === 'mg' || to.includes('mg'))) {
    const normalizedAmount = amount / 1000
    return {
      normalizedAmount,
      success: true,
      conversionApplied: `${amount} mcg → ${normalizedAmount} mg`
    }
  }

  // g to mg (including compound units like "mg combinados", "mg suplementario", etc.)
  if (from === 'g' && (to === 'mg' || to.includes('mg'))) {
    const normalizedAmount = amount * 1000
    return {
      normalizedAmount,
      success: true,
      conversionApplied: `${amount} g → ${normalizedAmount} mg`
    }
  }

  // mg to g
  if (from === 'mg' && to === 'g') {
    const normalizedAmount = amount / 1000
    return {
      normalizedAmount,
      success: true,
      conversionApplied: `${amount} mg → ${normalizedAmount} g`
    }
  }

  // g to mcg
  if (from === 'g' && (to === 'mcg' || to === 'μg')) {
    const normalizedAmount = amount * 1000000
    return {
      normalizedAmount,
      success: true,
      conversionApplied: `${amount} g → ${normalizedAmount} mcg`
    }
  }

  // mcg to g
  if ((from === 'mcg' || from === 'μg') && to === 'g') {
    const normalizedAmount = amount / 1000000
    return {
      normalizedAmount,
      success: true,
      conversionApplied: `${amount} mcg → ${normalizedAmount} g`
    }
  }

  // If no conversion matched, return failure
  return { normalizedAmount: amount, success: false }
}
