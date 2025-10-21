"use server"
import { suplementosExamine } from "@/lib/examine-data-es"
import { generarRecomendaciones } from "@/lib/recommendation-service"
import type { BloodTestResult } from "@/lib/blood-markers"
import { validateRecommendationList } from "@/lib/safety-validator"
import { generateFullDisclaimer } from "@/lib/disclaimer-generator"
import type { SafetyWarning } from "@/lib/clinical-safety"

interface RecommendationRequest {
  gender: "male" | "female"
  age: number | null
  healthGoals: string[]
  dietaryRestrictions: string[]
  allergies?: string
  medications?: string
  bloodTestResults?: BloodTestResult[]
}

interface SupplementRecommendation {
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
  productosMercadoLibre?: Array<{
    marca: string
    url: string
    precio?: number
    disponible?: boolean
  }>
  // NEW: Clinical safety features
  safetyWarnings?: SafetyWarning[]
  requiresProfessionalReview?: boolean
  recommendedForm?: string
}

interface RecommendationResponse {
  success: boolean
  recommendations?: SupplementRecommendation[]
  error?: string
  source?: string
  modelUsed?: string
  // NEW: Clinical safety disclaimers
  clinicalDisclaimer?: {
    level: 'STANDARD' | 'ENHANCED' | 'CRITICAL'
    primaryDisclaimer: string
    specificWarnings: string[]
    actionRequired?: string
    professionalConsultRequired: boolean
  }
  drugDepletionWarnings?: SafetyWarning[]
  overallRequiresProfessionalReview?: boolean
}

/**
 * Server action to get supplement recommendations based on Examine data
 * @param request The user's recommendation request
 * @returns A promise that resolves to a recommendation response
 */
export async function getAIRecommendations(request: RecommendationRequest): Promise<RecommendationResponse> {
  try {
    console.log("Starting recommendation generation with request:", JSON.stringify(request, null, 2))
    console.log("Generando recomendaciones basadas en datos de Examine")

    // Validate the request
    if (
      !request.gender ||
      !request.age ||
      !request.healthGoals ||
      !Array.isArray(request.healthGoals) ||
      request.healthGoals.length === 0
    ) {
      return {
        success: false,
        error: "La solicitud no contiene información suficiente. Por favor, completa todos los campos requeridos.",
      }
    }

    // Use the enhanced recommendation service that considers blood test results
    const solicitud = {
      genero: request.gender === "male" ? "hombre" : "mujer" as "hombre" | "mujer",
      edad: request.age,
      objetivosSalud: request.healthGoals,
      restriccionesDietarias: request.dietaryRestrictions,
      alergias: request.allergies,
      medicamentos: request.medications,
      bloodTestResults: request.bloodTestResults,
    }
    
    console.log("Solicitud a generar recomendaciones:", JSON.stringify(solicitud, null, 2))

    const recomendaciones = await generarRecomendaciones(solicitud)

    // Convert the recommendations to the expected format
    const recommendations: SupplementRecommendation[] = recomendaciones.map(rec => ({
      name: rec.nombre,
      description: rec.descripcion,
      benefits: rec.beneficios,
      dosage: rec.dosificacion,
      optimalTime: rec.momentoOptimo,
      absorptionTips: rec.consejosAbsorcion,
      genderSpecificDosage: {
        male: rec.dosificacionEspecificaGenero.hombre,
        female: rec.dosificacionEspecificaGenero.mujer
      },
      scientificEvidence: rec.evidenciaCientifica,
      suitableFor: rec.adecuadoPara,
      tags: rec.etiquetas,
      warnings: rec.advertencias,
      medicationInteractions: rec.interaccionesMedicamentos,
      consultNutritionist: rec.consultarNutricionista,
      productosMercadoLibre: rec.productosMercadoLibre,
    }))

    // ============================================================================
    // NEW: CLINICAL SAFETY VALIDATION
    // ============================================================================

    // Prepare patient context for safety validation
    const patientContext = {
      age: request.age || undefined,
      gender: request.gender === 'male' ? 'hombre' as const : 'mujer' as const,
      isPregnant: undefined, // Unknown - survey doesn't capture this yet
      isBreastfeeding: undefined, // Unknown - survey doesn't capture this yet
      conditions: undefined, // Unknown - will be extracted from health goals in future
      medications: request.medications ? request.medications.split(',').map(m => m.trim()) : [],
    }

    // Validate all supplements
    const supplementList = recommendations.map(rec => ({
      name: rec.name,
      dosage: rec.dosage,
    }))

    const validationResults = validateRecommendationList(supplementList, patientContext)

    // Add safety warnings to each recommendation
    recommendations.forEach((rec, index) => {
      const validation = validationResults.supplementValidations[index]
      if (validation) {
        rec.safetyWarnings = validation.warnings
        rec.requiresProfessionalReview = validation.requiresProfessionalReview

        // Extract recommended form from warnings
        const formWarning = validation.warnings.find(w => w.category === 'QUALITY')
        if (formWarning) {
          rec.recommendedForm = formWarning.message
        }

        // Add critical warnings to the main warnings array
        const criticalWarnings = validation.warnings
          .filter(w => w.severity === 'CRITICAL' || w.severity === 'MAJOR')
          .map(w => `${w.severity}: ${w.message}`)

        if (criticalWarnings.length > 0) {
          rec.warnings = [...(rec.warnings || []), ...criticalWarnings]
          rec.consultNutritionist = true
        }
      }
    })

    // Generate overall disclaimer
    const allWarnings = validationResults.supplementValidations.flatMap(v => v.warnings)
    const disclaimer = generateFullDisclaimer(allWarnings, patientContext)

    return {
      success: true,
      recommendations,
      source: "Basado en evidencia científica y análisis de sangre",
      modelUsed: "Sistema de recomendación integrado con validación clínica",
      clinicalDisclaimer: disclaimer,
      drugDepletionWarnings: validationResults.drugDepletionWarnings,
      overallRequiresProfessionalReview: validationResults.overallRequiresProfessionalReview,
    }
  } catch (error: any) {
    console.error("Error in getAIRecommendations:", error)

    // Create a more user-friendly error message
    const errorMessage = "No se pudieron generar recomendaciones. Por favor, inténtalo más tarde."
    const detailedError = error.message || String(error)

    // Try to get fallback recommendations
    try {
      const fallbackResponse = await getFallbackRecommendations(request)
      if (fallbackResponse.success) {
        return fallbackResponse
      }
    } catch (fallbackError) {
      console.error("Fallback also failed:", fallbackError)
    }

    return {
      success: false,
      error: errorMessage,
    }
  }
}

/**
 * Server action to get recommendations based on Examine data
 * @param request The user's recommendation request
 * @returns A promise that resolves to a recommendation response with recommendations
 */
export async function getFallbackRecommendations(request: RecommendationRequest): Promise<RecommendationResponse> {
  try {
    console.log("Generating recommendations from Examine data")

    // Find supplements that match the user's health goals
    const relevantHealthGoals = request.healthGoals.filter((goal) => goal !== "halal")
    let matchingSupplements: any[] = []

    // Use a matching algorithm for Examine data
    for (const goal of relevantHealthGoals) {
      // Map health goals to keywords
      const keywords = getKeywordsByHealthGoal(goal)

      // Find supplements that match these keywords
      const matches = suplementosExamine.filter((supplement) =>
        supplement.beneficios.some((beneficio) =>
          keywords.some((keyword) => beneficio.toLowerCase().includes(keyword.toLowerCase())),
        ),
      )

      matchingSupplements = [...matchingSupplements, ...matches]
    }

    // Remove duplicates
    let uniqueSupplements = Array.from(new Set(matchingSupplements.map((s) => s.nombre)))
      .map((name) => matchingSupplements.find((s) => s.nombre === name))
      .filter(Boolean) // Ensure we don't have any undefined values

    // Filter supplements based on dietary restrictions
    const isVegan = request.dietaryRestrictions.includes("vegano")
    const isVegetarian = request.dietaryRestrictions.includes("vegetariano")
    
    if (isVegan || isVegetarian) {
      // Define supplements that are not suitable for vegans/vegetarians
      const nonVeganSupplements = ["Proteína de Suero", "Omega-3 (EPA y DHA)", "Colágeno", "Aceite de Pescado", "Glucosamina", "Condroitina"]
      const nonVegetarianSupplements = ["Omega-3 (EPA y DHA)", "Colágeno", "Aceite de Pescado", "Glucosamina", "Condroitina"]
      
      const restrictedSupplements = isVegan ? nonVeganSupplements : nonVegetarianSupplements
      
      // Filter out non-vegan/vegetarian supplements
      uniqueSupplements = uniqueSupplements.filter(supplement => 
        !restrictedSupplements.includes(supplement.nombre)
      )
      
      console.log(`Filtered supplements for ${isVegan ? 'vegan' : 'vegetarian'} user`)
    }

    // If we don't have enough supplements, add some default ones from the same dataset
    if (uniqueSupplements.length < 2) {
      console.log("Not enough matching supplements found, adding default supplements from Examine data")

      // Check if user is vegan/vegetarian
      const isVegan = request.dietaryRestrictions.includes("vegano")
      const isVegetarian = request.dietaryRestrictions.includes("vegetariano")

      // Add some general supplements that are commonly recommended
      // Use vegan alternatives when appropriate
      const defaultSupplements = [
        suplementosExamine.find((s) => s.nombre === "Vitamina D"),
        suplementosExamine.find((s) => s.nombre === "Magnesio"),
        suplementosExamine.find((s) => s.nombre === (isVegan || isVegetarian ? "Omega-3 Vegano (ALA)" : "Omega-3 (EPA y DHA)")),
        suplementosExamine.find((s) => s.nombre === "Zinc"),
      ].filter(Boolean)

      uniqueSupplements.push(...defaultSupplements)
    }

    // Convert to the expected format
    const recommendations: SupplementRecommendation[] = uniqueSupplements.map((supplement) => {
      // Check for medication interactions
      const interactions = checkMedicationInteractions(supplement.nombre, request.medications || "")
      // Check for age-specific warnings
      const ageWarnings = request.age ? getAgeSpecificWarnings(supplement.nombre, request.age) : []

      return {
        name: supplement.nombre,
        description: supplement.descripcion,
        benefits: supplement.beneficios,
        dosage: getDosageInfo(supplement, request.gender),
        optimalTime: supplement.momento_optimo || "Consulta las instrucciones del fabricante para el momento óptimo.",
        absorptionTips:
          supplement.consejos_absorcion || "Sigue las recomendaciones del fabricante para una mejor absorción.",
        genderSpecificDosage: {
          male: getGenderSpecificDosage(supplement, "male"),
          female: getGenderSpecificDosage(supplement, "female"),
        },
        scientificEvidence: supplement.evidencia_cientifica || [
          `Según la evidencia científica, ${supplement.nombre} puede ser beneficioso para ${supplement.beneficios[0].toLowerCase()}.`,
        ],
        suitableFor: [
          `${request.gender === "male" ? "Hombres" : "Mujeres"} interesados en ${supplement.beneficios[0].toLowerCase()}`,
        ],
        tags: supplement.beneficios.map((b: string) => b.split(" ")[0].toLowerCase()).slice(0, 3),
        warnings: [
          "Consulta con un profesional de la salud antes de comenzar cualquier régimen de suplementos.",
          ...ageWarnings,
          ...(supplement.efectos_secundarios || []),
        ],
        medicationInteractions: interactions,
        consultNutritionist: interactions.length > 0 || ageWarnings.length > 0,
      }
    })

    // ============================================================================
    // CLINICAL SAFETY VALIDATION (same as primary flow)
    // ============================================================================

    // Prepare patient context for safety validation
    const patientContext = {
      age: request.age || undefined,
      gender: request.gender === 'male' ? 'hombre' as const : 'mujer' as const,
      isPregnant: undefined, // Unknown - survey doesn't capture this yet
      isBreastfeeding: undefined, // Unknown - survey doesn't capture this yet
      conditions: undefined, // Unknown - will be extracted from health goals in future
      medications: request.medications ? request.medications.split(',').map(m => m.trim()) : [],
    }

    // Validate all supplements
    const supplementList = recommendations.map(rec => ({
      name: rec.name,
      dosage: rec.dosage,
    }))

    const validationResults = validateRecommendationList(supplementList, patientContext)

    // Add safety warnings to each recommendation
    recommendations.forEach((rec, index) => {
      const validation = validationResults.supplementValidations[index]
      if (validation) {
        rec.safetyWarnings = validation.warnings
        rec.requiresProfessionalReview = validation.requiresProfessionalReview

        // Extract recommended form from warnings
        const formWarning = validation.warnings.find(w => w.category === 'QUALITY')
        if (formWarning) {
          rec.recommendedForm = formWarning.message
        }

        // Add critical warnings to the main warnings array
        const criticalWarnings = validation.warnings
          .filter(w => w.severity === 'CRITICAL' || w.severity === 'MAJOR')
          .map(w => `${w.severity}: ${w.message}`)

        if (criticalWarnings.length > 0) {
          rec.warnings = [...(rec.warnings || []), ...criticalWarnings]
          rec.consultNutritionist = true
        }
      }
    })

    // Generate overall disclaimer
    const allWarnings = validationResults.supplementValidations.flatMap(v => v.warnings)
    const disclaimer = generateFullDisclaimer(allWarnings, patientContext)

    return {
      success: true,
      recommendations,
      source: "Basado en evidencia científica",
      modelUsed: "análisis de datos científicos con validación clínica",
      clinicalDisclaimer: disclaimer,
      drugDepletionWarnings: validationResults.drugDepletionWarnings,
      overallRequiresProfessionalReview: validationResults.overallRequiresProfessionalReview,
    }
  } catch (error) {
    console.error("Error in getFallbackRecommendations:", error)

    // Return a basic error response
    return {
      success: false,
      error: "Error al generar recomendaciones desde los datos científicos. Por favor, inténtalo de nuevo.",
    }
  }
}

/**
 * Maps health goals to relevant keywords for supplement matching
 * @param healthGoal The health goal to map
 * @returns Array of related keywords
 */
function getKeywordsByHealthGoal(healthGoal: string): string[] {
  const healthGoalMap: Record<string, string[]> = {
    "muscle-gain": ["músculo", "fuerza", "proteína", "recuperación", "ejercicio", "entrenamiento"],
    "weight-loss": ["peso", "grasa", "metabolismo", "apetito", "obesidad"],
    "immune-support": ["inmune", "infección", "defensa", "resistencia"],
    "stress-reduction": ["estrés", "ansiedad", "estado de ánimo", "relajación", "sueño"],
    "energy-boost": ["energía", "fatiga", "rendimiento", "resistencia"],
    "better-sleep": ["sueño", "insomnio", "melatonina", "descanso"],
    "joint-health": ["articulación", "artritis", "inflamación", "dolor"],
    "heart-health": ["corazón", "cardiovascular", "colesterol", "presión arterial"],
    "digestive-health": ["digestivo", "intestinal", "digestión", "probiótico"],
    "brain-function": ["cerebro", "cognitivo", "memoria", "concentración", "enfoque"],
    "hair-skin-nails": ["cabello", "piel", "uñas", "belleza"],
    "hormone-balance": ["hormona", "testosterona", "estrógeno", "equilibrio"],
    "bone-health": ["hueso", "óseo", "densidad", "osteoporosis", "fractura", "calcio"],
    "menopause": ["menopausia", "sofocos", "bochornos", "climaterio", "hormonal", "estrógeno"],
  }

  return healthGoalMap[healthGoal] || []
}

/**
 * Gets dosage information from a supplement
 */
function getDosageInfo(supplement: any, gender: string): string {
  if (supplement.dosificacion) {
    if (gender === "male" && supplement.dosificacion.hombres) {
      return supplement.dosificacion.hombres
    } else if (gender === "female" && supplement.dosificacion.mujeres) {
      return supplement.dosificacion.mujeres
    } else if (supplement.dosificacion.general) {
      return supplement.dosificacion.general
    }
  }

  return `Consulta con un profesional de la salud para la dosis adecuada para ${gender === "male" ? "hombres" : "mujeres"}.`
}

/**
 * Gets gender-specific dosage information
 */
function getGenderSpecificDosage(supplement: any, gender: string): string {
  if (supplement.dosificacion) {
    if (gender === "male" && supplement.dosificacion.hombres) {
      return supplement.dosificacion.hombres
    } else if (gender === "female" && supplement.dosificacion.mujeres) {
      return supplement.dosificacion.mujeres
    }
  }

  return `Consulta con un profesional de la salud para la dosis adecuada para ${gender === "male" ? "hombres" : "mujeres"}.`
}

/**
 * Checks for age-specific warnings for a supplement
 */
function getAgeSpecificWarnings(supplementName: string, age: number): string[] {
  const warnings: string[] = []

  // Define age-specific warnings for supplements
  const ageWarnings: Record<string, Record<string, string[]>> = {
    Hierro: {
      "65+": [
        "Los adultos mayores deben tener precaución con la suplementación de hierro, ya que puede aumentar el riesgo de sobrecarga de hierro",
      ],
    },
    "Vitamina A": {
      "65+": ["Los adultos mayores pueden tener mayor riesgo de toxicidad por vitamina A"],
    },
    Calcio: {
      "65+": ["Los adultos mayores pueden necesitar más calcio, pero deben consultar sobre la dosis adecuada"],
    },
    Creatina: {
      "menores-18": ["No se recomienda para menores de 18 años sin supervisión médica"],
    },
    "Suplementos pre-entrenamiento": {
      "menores-18": ["No se recomienda para menores de 18 años"],
      "65+": ["Los adultos mayores deben consultar antes de usar suplementos pre-entrenamiento"],
    },
  }

  // Check if there are warnings for this supplement
  const supplementWarnings = ageWarnings[supplementName]
  if (supplementWarnings) {
    // Check age ranges
    if (age >= 65 && supplementWarnings["65+"]) {
      warnings.push(...supplementWarnings["65+"])
    } else if (age < 18 && supplementWarnings["menores-18"]) {
      warnings.push(...supplementWarnings["menores-18"])
    }
  }

  return warnings
}

/**
 * Checks for medication interactions with a supplement
 */
function checkMedicationInteractions(supplementName: string, medications: string): string[] {
  if (!medications) return []

  const interacciones: string[] = []
  const medicamentosMinusculas = medications.toLowerCase()

  // Categorías comunes de medicamentos para verificar interacciones
  const CATEGORIAS_MEDICAMENTOS: Record<string, string[]> = {
    ANTICOAGULANTES: [
      "warfarina",
      "heparina",
      "aspirina",
      "clopidogrel",
      "apixaban",
      "rivaroxaban",
      "dabigatran",
      "anticoagulante",
    ],
    PRESION_ARTERIAL: [
      "lisinopril",
      "enalapril",
      "losartan",
      "valsartan",
      "amlodipina",
      "metoprolol",
      "atenolol",
      "hidroclorotiazida",
      "presión",
      "hipertensión",
    ],
    DIABETES: ["metformina", "glibenclamida", "insulina", "glipizida", "sitagliptina", "diabetes"],
    TIROIDES: ["levotiroxina", "tiroides"],
    COLESTEROL: ["atorvastatina", "simvastatina", "rosuvastatina", "estatina", "colesterol"],
    ANTIDEPRESIVOS: [
      "fluoxetina",
      "sertralina",
      "escitalopram",
      "paroxetina",
      "venlafaxina",
      "bupropion",
      "antidepresivo",
    ],
    AINES: ["ibuprofeno", "naproxeno", "diclofenaco", "celecoxib", "antiinflamatorio"],
    CORTICOSTEROIDES: ["prednisona", "dexametasona", "corticoide", "corticosteroide"],
    ANTIBIOTICOS: ["amoxicilina", "azitromicina", "ciprofloxacina", "doxiciclina", "antibiótico"],
    ANTIACIDOS: ["omeprazol", "esomeprazol", "ranitidina", "famotidina", "antiácido"],
  }

  // Interacciones conocidas entre suplementos y medicamentos
  const INTERACCIONES_SUPLEMENTOS: Record<string, Record<string, string[]>> = {
    "Omega-3": {
      ANTICOAGULANTES: [
        "Puede aumentar el riesgo de sangrado cuando se toma con anticoagulantes como warfarina, heparina o aspirina. Consulte con su médico antes de combinarlos.",
      ],
      PRESION_ARTERIAL: [
        "Puede tener un efecto aditivo en la reducción de la presión arterial cuando se toma con medicamentos antihipertensivos. Monitoree su presión arterial regularmente.",
      ],
    },
    "Omega-3 (EPA y DHA)": {
      ANTICOAGULANTES: [
        "Puede aumentar el riesgo de sangrado cuando se toma con anticoagulantes como warfarina, heparina o aspirina. Consulte con su médico antes de combinarlos.",
      ],
      PRESION_ARTERIAL: [
        "Puede tener un efecto aditivo en la reducción de la presión arterial cuando se toma con medicamentos antihipertensivos. Monitoree su presión arterial regularmente.",
      ],
    },
    "Vitamina D": {
      TIROIDES: [
        "Puede afectar la absorción de medicamentos para la tiroides como levotiroxina. Tome la vitamina D al menos 4 horas antes o después de estos medicamentos.",
      ],
      COLESTEROL: [
        "Puede reducir la eficacia de las estatinas. Consulte con su médico sobre los niveles adecuados de suplementación.",
      ],
    },
    Magnesio: {
      ANTIBIOTICOS: [
        "Puede reducir la absorción de antibióticos, especialmente tetraciclinas y fluoroquinolonas. Separe la toma por al menos 2-3 horas.",
      ],
      PRESION_ARTERIAL: [
        "Puede tener un efecto aditivo en la reducción de la presión arterial. Monitoree su presión arterial si toma medicamentos antihipertensivos.",
      ],
    },
    Hierro: {
      TIROIDES: [
        "Puede interferir con la absorción de medicamentos para la tiroides. Separe la toma por al menos 4 horas.",
      ],
      ANTIACIDOS: [
        "Los antiácidos pueden reducir la absorción de hierro. Tome el hierro al menos 2 horas antes o 4 horas después de antiácidos.",
      ],
    },
    "Hierba de San Juan": {
      ANTIDEPRESIVOS: [
        "Puede causar síndrome serotoninérgico cuando se combina con antidepresivos ISRS. Esta combinación puede ser peligrosa y debe evitarse completamente.",
      ],
      ANTICOAGULANTES: [
        "Puede reducir la eficacia de los anticoagulantes, poniendo en riesgo la salud cardiovascular. No combine sin supervisión médica.",
      ],
    },
    "Ginkgo Biloba": {
      ANTICOAGULANTES: [
        "Puede aumentar el riesgo de sangrado cuando se toma con anticoagulantes. Evite esta combinación o use solo bajo estricta supervisión médica.",
      ],
      ANTIDEPRESIVOS: [
        "Puede interactuar con antidepresivos y causar efectos secundarios como aumento de la presión arterial o síndrome serotoninérgico.",
      ],
    },
    Probióticos: {
      ANTIBIOTICOS: [
        "Tomar separados por al menos 2-3 horas de los antibióticos para evitar que estos últimos destruyan las bacterias beneficiosas del probiótico.",
      ],
    },
    Calcio: {
      ANTIBIOTICOS: [
        "Puede interferir con la absorción de antibióticos, especialmente tetraciclinas y fluoroquinolonas. Separe la toma por al menos 2-3 horas.",
      ],
      PRESION_ARTERIAL: [
        "Puede reducir la eficacia de algunos medicamentos para la presión arterial como los bloqueadores de los canales de calcio.",
      ],
    },
    "Proteína de Suero": {
      ANTIBIOTICOS: ["Puede reducir la absorción de ciertos antibióticos. Separe la toma por al menos 1-2 horas."],
    },
    Creatina: {
      AINES: [
        "El uso prolongado conjunto con antiinflamatorios no esteroideos podría aumentar el estrés renal. Manténgase bien hidratado y consulte con su médico si tiene problemas renales.",
      ],
    },
    "Vitamina K": {
      ANTICOAGULANTES: [
        "Interfiere directamente con la acción de anticoagulantes como la warfarina. Debe mantener una ingesta constante de vitamina K si toma estos medicamentos.",
      ],
    },
    "Vitamina K2": {
      ANTICOAGULANTES: [
        "Interfiere directamente con la acción de anticoagulantes como la warfarina. Debe mantener una ingesta constante de vitamina K si toma estos medicamentos.",
      ],
    },
  }

  // Verificar interacciones conocidas
  const interaccionesConocidas = INTERACCIONES_SUPLEMENTOS[supplementName]
  if (interaccionesConocidas) {
    for (const [categoria, advertencias] of Object.entries(interaccionesConocidas)) {
      const medicamentosCategoria = CATEGORIAS_MEDICAMENTOS[categoria as keyof typeof CATEGORIAS_MEDICAMENTOS] || []

      // Verificar si se menciona algún medicamento de esta categoría
      if (medicamentosCategoria.some((med) => medicamentosMinusculas.includes(med))) {
        interacciones.push(...advertencias)
      }
    }
  }

  // Verificación genérica para cualquier suplemento si no se definen interacciones específicas
  if (interacciones.length === 0 && medications.trim() !== "") {
    interacciones.push(
      "Consulta con un profesional de la salud sobre posibles interacciones con tus medicamentos actuales",
    )
  }

  return interacciones
}
