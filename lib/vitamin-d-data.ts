// Datos basados en la investigación de Examine.com sobre vitamina D

export interface VitaminDRange {
  min: number
  max: number
  status: string
  description: string
  recommendation: string
  dosage: string
  considerations: string[]
  benefits: string[]
  supplementRecommendations?: Array<{
    name: string
    dosage: string
    timing: string
    duration: string
    notes?: string
  }>
}

export const vitaminDRanges: VitaminDRange[] = [
  {
    min: 0,
    max: 20,
    status: "Deficiencia",
    description:
      "Niveles por debajo de 20 ng/mL (50 nmol/L) se consideran deficientes según la evidencia científica. La deficiencia de vitamina D puede causar problemas óseos y está asociada con un mayor riesgo de diversas condiciones de salud.",
    recommendation: "Se recomienda suplementación inmediata bajo supervisión médica para corregir la deficiencia.",
    dosage:
      "5,000-10,000 UI diarias durante 8-12 semanas, seguido de una dosis de mantenimiento de 2,000-4,000 UI diarias.",
    considerations: [
      "La absorción mejora cuando se toma con comidas que contienen grasas",
      "Monitorear los niveles cada 3 meses hasta alcanzar niveles óptimos",
      "Considerar suplementos que contengan vitamina K2 para una salud ósea óptima",
      "Personas con problemas renales deben consultar a un médico antes de suplementar",
    ],
    benefits: [
      "Mejora de la salud ósea y reducción del riesgo de fracturas",
      "Posible reducción de síntomas de depresión",
      "Fortalecimiento del sistema inmunológico",
      "Potencial reducción del riesgo de enfermedades cardiovasculares",
    ],
    supplementRecommendations: [
      {
        name: "Vitamina D",
        dosage: "5000-10000 UI",
        timing: "Con la comida principal (mejora absorción)",
        duration: "8-12 semanas, luego reducir",
        notes: "Preferir D3 (colecalciferol) sobre D2"
      }
    ],
  },
  {
    min: 20,
    max: 30,
    status: "Insuficiencia",
    description:
      "Niveles entre 20-30 ng/mL (50-75 nmol/L) se consideran insuficientes. Aunque no hay deficiencia severa, estos niveles no son óptimos para la salud general según la evidencia científica revisada.",
    recommendation: "Se recomienda suplementación moderada para alcanzar niveles óptimos.",
    dosage:
      "2,000-4,000 UI diarias durante 8-12 semanas, seguido de una dosis de mantenimiento de 1,000-2,000 UI diarias.",
    considerations: [
      "La absorción mejora cuando se toma con comidas que contienen grasas",
      "Monitorear los niveles después de 3-6 meses de suplementación",
      "Considerar la exposición solar como fuente complementaria",
      "Personas con condiciones autoinmunes pueden beneficiarse de niveles más altos dentro del rango óptimo",
    ],
    benefits: [
      "Optimización de la absorción de calcio",
      "Mejora de la función muscular y reducción del riesgo de caídas",
      "Apoyo a la función inmunológica óptima",
      "Posible mejora del estado de ánimo y la cognición",
    ],
    supplementRecommendations: [
      {
        name: "Vitamina D",
        dosage: "2000-4000 UI",
        timing: "Con la comida principal del día",
        duration: "8-12 semanas, luego dosis de mantenimiento",
        notes: "Considerar vitamina K2 para optimizar beneficios"
      }
    ],
  },
  {
    min: 30,
    max: 40,
    status: "Subóptimo",
    description:
      "Niveles entre 30-40 ng/mL (75-100 nmol/L) están en el límite inferior del rango saludable. Aunque no hay deficiencia, muchos expertos recomiendan alcanzar niveles más robustos (40-60 ng/mL) para beneficios óptimos.",
    recommendation:
      "Se recomienda suplementación preventiva para alcanzar y mantener niveles más óptimos, especialmente en invierno o con poca exposición solar.",
    dosage:
      "1,000-2,000 UI diarias para elevar gradualmente los niveles al rango óptimo de 40-60 ng/mL.",
    considerations: [
      "Reevaluar niveles en 3-4 meses después de iniciar suplementación",
      "Aumentar dosis en invierno o con exposición solar limitada",
      "Combinar con vitamina K2 para optimizar beneficios",
      "Considerar factores de riesgo individuales (edad, tono de piel, ubicación geográfica)",
    ],
    benefits: [
      "Prevención de progresión a deficiencia",
      "Mejora gradual de la función inmune",
      "Optimización de la salud ósea",
      "Potencial mejora del estado de ánimo y energía",
    ],
    supplementRecommendations: [
      {
        name: "Vitamina D",
        dosage: "1000-2000 UI",
        timing: "Con la comida principal del día",
        duration: "Continuo hasta alcanzar 40-60 ng/mL",
        notes: "Preferir vitamina D3 sobre D2"
      }
    ],
  },
  {
    min: 40,
    max: 60,
    status: "Óptimo",
    description:
      "Niveles entre 40-60 ng/mL (100-150 nmol/L) son considerados óptimos por la mayoría de expertos. Este rango proporciona beneficios máximos para la salud sin riesgo de efectos adversos.",
    recommendation:
      "Mantener estos niveles con exposición solar moderada y/o suplementación mínima de mantenimiento según sea necesario.",
    dosage:
      "0-1,000 UI diarias para mantenimiento, dependiendo de la exposición solar y la época del año.",
    considerations: [
      "Verificar niveles 1-2 veces al año",
      "Puede no requerir suplementación en verano con exposición solar adecuada",
      "Mantener ingesta de vitamina K2 y magnesio",
      "Este es el rango objetivo ideal para la mayoría de las personas",
    ],
    benefits: [
      "Función inmunológica óptima",
      "Salud ósea y muscular óptima",
      "Reducción del riesgo de enfermedades crónicas",
      "Apoyo óptimo a la salud cardiovascular y metabólica",
      "Mejor estado de ánimo y función cognitiva",
    ],
  },
  {
    min: 60,
    max: 100,
    status: "Alto (pero generalmente seguro)",
    description:
      "Niveles entre 60-100 ng/mL (150-250 nmol/L) están por encima de lo necesario para la mayoría de los beneficios de salud. Aunque generalmente no son tóxicos, no hay evidencia clara de beneficios adicionales más allá de 60 ng/mL.",
    recommendation:
      "No se recomienda suplementación adicional. Considerar reducir la dosis actual si está suplementando.",
    dosage:
      "Reducir o suspender la suplementación actual hasta que los niveles vuelvan al rango óptimo. Luego considerar 1,000 UI diarias o menos para mantenimiento.",
    considerations: [
      "Monitorear los niveles de calcio en sangre y orina",
      "Aumentar la ingesta de agua para prevenir cálculos renales",
      "Asegurar una ingesta adecuada de vitamina K2 para dirigir el calcio a los huesos",
      "Consultar con un profesional de la salud para descartar condiciones que puedan causar niveles elevados",
    ],
    benefits: [
      "No hay evidencia de beneficios adicionales más allá del rango óptimo",
      "Mantener una vigilancia para prevenir posibles efectos adversos a largo plazo",
    ],
  },
  {
    min: 100,
    max: 1000,
    status: "Potencialmente tóxico",
    description:
      "Niveles por encima de 100 ng/mL (250 nmol/L) se consideran elevados y potencialmente tóxicos según la evidencia científica. Pueden aumentar el riesgo de hipercalcemia y problemas relacionados.",
    recommendation: "Suspender inmediatamente la suplementación y consultar a un profesional de la salud.",
    dosage:
      "Suspender toda suplementación de vitamina D hasta que los niveles vuelvan al rango normal bajo supervisión médica.",
    considerations: [
      "Buscar atención médica inmediata",
      "Aumentar la ingesta de agua",
      "Reducir el consumo de alimentos ricos en calcio temporalmente",
      "Realizar análisis de calcio en sangre y función renal",
    ],
    benefits: ["No hay beneficios en este rango, solo riesgos potenciales para la salud"],
  },
]

export const vitaminDFoodSources = [
  {
    food: "Pescados grasos (salmón, atún, caballa)",
    amount: "100g",
    vitaminD: "400-1000 UI",
  },
  {
    food: "Hígado de res",
    amount: "100g",
    vitaminD: "50 UI",
  },
  {
    food: "Yema de huevo",
    amount: "1 unidad",
    vitaminD: "40 UI",
  },
  {
    food: "Leche fortificada",
    amount: "1 taza",
    vitaminD: "100-125 UI",
  },
  {
    food: "Yogur fortificado",
    amount: "1 taza",
    vitaminD: "80-100 UI",
  },
  {
    food: "Cereales fortificados",
    amount: "1 porción",
    vitaminD: "40-100 UI",
  },
  {
    food: "Hongos expuestos a luz UV",
    amount: "100g",
    vitaminD: "400-700 UI",
  },
  {
    food: "Queso fortificado",
    amount: "100g",
    vitaminD: "40-100 UI",
  },
]

export const vitaminDFactors = [
  {
    factor: "Edad avanzada",
    impact: "La piel produce hasta 75% menos vitamina D a los 70 años que a los 20 años",
    recommendation: "Considerar dosis más altas de suplementación y monitoreo más frecuente",
  },
  {
    factor: "Piel oscura",
    impact:
      "La melanina reduce la producción de vitamina D; las personas con piel muy oscura pueden producir hasta 90% menos vitamina D que las de piel clara",
    recommendation: "Considerar dosis más altas de suplementación o mayor tiempo de exposición solar",
  },
  {
    factor: "Obesidad (IMC > 30)",
    impact: "La vitamina D se almacena en el tejido adiposo, reduciendo su biodisponibilidad",
    recommendation: "Pueden requerirse dosis 2-3 veces mayores para alcanzar los mismos niveles sanguíneos",
  },
  {
    factor: "Problemas de absorción intestinal",
    impact: "Condiciones como enfermedad celíaca, enfermedad de Crohn o cirugía bariátrica reducen la absorción",
    recommendation: "Considerar formas más biodisponibles y dosis más altas bajo supervisión médica",
  },
  {
    factor: "Medicamentos",
    impact:
      "Anticonvulsivos, glucocorticoides, antirretrovirales y algunos otros medicamentos pueden reducir los niveles",
    recommendation: "Monitoreo más frecuente y posible ajuste de dosis",
  },
  {
    factor: "Ubicación geográfica",
    impact:
      "Latitudes por encima de 37° N o por debajo de 37° S tienen producción insuficiente de vitamina D en invierno",
    recommendation: "Considerar suplementación estacional durante meses de menor exposición solar",
  },
  {
    factor: "Uso de protector solar",
    impact: "SPF 30 reduce la producción de vitamina D en aproximadamente 95%",
    recommendation: "Considerar 10-15 minutos de exposición solar sin protector antes de aplicarlo",
  },
]

export const vitaminDExamineEvidence = [
  {
    claim: "La vitamina D mejora la salud ósea",
    evidence: "Fuerte",
    details:
      "Múltiples ensayos clínicos controlados han demostrado que la suplementación con vitamina D, especialmente combinada con calcio, mejora la densidad mineral ósea y reduce el riesgo de fracturas, particularmente en adultos mayores y personas con deficiencia.",
  },
  {
    claim: "La vitamina D reduce el riesgo de caídas",
    evidence: "Moderada",
    details:
      "Varios estudios han encontrado que la suplementación con vitamina D puede mejorar la función muscular y reducir el riesgo de caídas en adultos mayores, especialmente aquellos con niveles bajos iniciales.",
  },
  {
    claim: "La vitamina D mejora la función inmunológica",
    evidence: "Moderada",
    details:
      "Estudios observacionales y algunos ensayos clínicos sugieren que niveles adecuados de vitamina D están asociados con menor riesgo de infecciones respiratorias y mejor respuesta inmune.",
  },
  {
    claim: "La vitamina D mejora el estado de ánimo y reduce la depresión",
    evidence: "Preliminar a Moderada",
    details:
      "Algunos estudios han encontrado asociaciones entre niveles bajos de vitamina D y mayor riesgo de depresión, con ensayos clínicos mostrando resultados mixtos pero prometedores para la suplementación en personas con deficiencia.",
  },
  {
    claim: "La vitamina D reduce el riesgo de enfermedades cardiovasculares",
    evidence: "Preliminar",
    details:
      "Estudios observacionales muestran asociaciones entre niveles bajos de vitamina D y mayor riesgo cardiovascular, pero los ensayos de intervención han mostrado resultados inconsistentes.",
  },
  {
    claim: "La vitamina D mejora el control glucémico",
    evidence: "Preliminar",
    details:
      "Algunos estudios sugieren que la vitamina D puede mejorar la sensibilidad a la insulina y el control glucémico en personas con prediabetes o diabetes tipo 2, especialmente aquellas con deficiencia.",
  },
  {
    claim: "La vitamina D reduce el riesgo de cáncer",
    evidence: "Mixta",
    details:
      "Estudios observacionales han encontrado asociaciones entre niveles más altos de vitamina D y menor riesgo de algunos cánceres, pero los ensayos clínicos han mostrado resultados inconsistentes.",
  },
]

export function getVitaminDRecommendation(level: number): VitaminDRange | null {
  return vitaminDRanges.find((range) => level >= range.min && level < range.max) || null
}
