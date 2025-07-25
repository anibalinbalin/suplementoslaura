// Datos basados en la investigación de Examine.com sobre glucosa e insulina

import { BloodMarkerData, BloodMarkerRange } from './types'

// Glucosa en ayunas
export const glucoseRanges: BloodMarkerRange[] = [
  {
    min: 0,
    max: 70,
    status: 'Hipoglucemia',
    description:
      'Niveles por debajo de 70 mg/dL (3.9 mmol/L) indican hipoglucemia. Puede causar síntomas como mareos, confusión, sudoración y debilidad.',
    recommendation: 'Consumir carbohidratos de acción rápida inmediatamente. Si es recurrente, consultar con un médico.',
    supplementRecommendations: [
      {
        name: 'Cromo',
        dosage: '200-400 mcg',
        timing: 'Con las comidas',
        duration: 'Continuo',
        notes: 'Ayuda a estabilizar los niveles de glucosa'
      },
      {
        name: 'Proteína en polvo',
        dosage: '20-30g',
        timing: 'Entre comidas',
        duration: 'Según necesidad',
        notes: 'Ayuda a mantener niveles estables de glucosa'
      }
    ],
    considerations: [
      'Llevar siempre carbohidratos de acción rápida',
      'Comer cada 3-4 horas',
      'Evitar ayunos prolongados',
      'Monitorear si toma medicamentos para diabetes',
      'Evaluar función suprarrenal si es recurrente'
    ],
    risks: [
      'Pérdida de conciencia',
      'Convulsiones en casos severos',
      'Daño neurológico si es prolongado'
    ]
  },
  {
    min: 70,
    max: 100,
    status: 'Normal',
    description:
      'Niveles entre 70-100 mg/dL (3.9-5.6 mmol/L) en ayunas son normales según los criterios de la ADA y evidencia científica.', 
    recommendation: 'Mantener hábitos saludables de alimentación y ejercicio.',
    supplementRecommendations: [
      {
        name: 'Magnesio',
        dosage: '200-400 mg',
        timing: 'Antes de dormir',
        duration: 'Continuo',
        notes: 'Apoya la sensibilidad a la insulina'
      },
      {
        name: 'Omega-3',
        dosage: '1-2g EPA+DHA',
        timing: 'Con comidas',
        duration: 'Continuo',
        notes: 'Mejora el perfil metabólico'
      }
    ],
    considerations: [
      'Mantener un peso saludable',
      'Ejercicio regular (150 min/semana mínimo)',
      'Dieta rica en fibra y baja en azúcares simples',
      'Dormir 7-9 horas por noche'
    ],
    benefits: [
      'Energía estable durante el día',
      'Menor riesgo de diabetes tipo 2',
      'Mejor función cognitiva',
      'Salud cardiovascular óptima'
    ]
  },
  {
    min: 100,
    max: 126,
    status: 'Prediabetes',
    description:
      'Niveles entre 100-125 mg/dL (5.6-6.9 mmol/L) indican prediabetes o glucosa alterada en ayunas. Mayor riesgo de desarrollar diabetes tipo 2.',
    recommendation: 'Implementar cambios en el estilo de vida y considerar suplementación para mejorar la sensibilidad a la insulina.',
    supplementRecommendations: [
      {
        name: 'Berberina',
        dosage: '500 mg',
        timing: '2-3 veces al día con comidas',
        duration: '3-6 meses',
        notes: 'Tan efectiva como metformina en algunos estudios'
      },
      {
        name: 'Canela de Ceilán',
        dosage: '1-2g',
        timing: 'Con las comidas',
        duration: 'Continuo',
        notes: 'Mejora la sensibilidad a la insulina'
      },
      {
        name: 'Ácido alfa lipoico',
        dosage: '300-600 mg',
        timing: 'Con el estómago vacío',
        duration: '3-6 meses',
        notes: 'Potente antioxidante que mejora el metabolismo de la glucosa'
      },
      {
        name: 'Vitamina D',
        dosage: '2000-4000 UI',
        timing: 'Con comida grasa',
        duration: 'Continuo',
        notes: 'Si los niveles son bajos'
      }
    ],
    considerations: [
      'Pérdida de peso del 5-7% si hay sobrepeso',
      'Ejercicio regular, especialmente entrenamiento de fuerza',
      'Dieta baja en carbohidratos refinados',
      'Monitoreo cada 3-6 meses',
      'Considerar medición de HbA1c'
    ],
    benefits: [
      'Reversión de prediabetes es posible',
      'Prevención de diabetes tipo 2',
      'Mejora del perfil lipídico',
      'Reducción del riesgo cardiovascular'
    ]
  },
  {
    min: 126,
    max: 200,
    status: 'Diabetes',
    description:
      'Niveles de 126 mg/dL (7.0 mmol/L) o más en ayunas en dos ocasiones indican diabetes. Requiere manejo médico.',
    recommendation: 'Consultar inmediatamente con un médico. Implementar cambios en el estilo de vida y seguir tratamiento médico.',
    supplementRecommendations: [
      {
        name: 'Berberina',
        dosage: '500 mg',
        timing: '3 veces al día con comidas',
        duration: 'Bajo supervisión médica',
        notes: 'Puede interactuar con medicamentos para diabetes'
      },
      {
        name: 'Gymnema sylvestre',
        dosage: '200-400 mg',
        timing: '2 veces al día',
        duration: 'Continuo',
        notes: 'Reduce la absorción de azúcar'
      },
      {
        name: 'Cromo',
        dosage: '400-1000 mcg',
        timing: 'Dividido en 2-3 dosis',
        duration: 'Continuo',
        notes: 'Mejora el control glucémico'
      }
    ],
    considerations: [
      'Requiere supervisión médica',
      'Monitoreo frecuente de glucosa',
      'Examen de ojos y pies regular',
      'Control de presión arterial y lípidos',
      'Educación en diabetes'
    ],
    risks: [
      'Complicaciones microvasculares',
      'Neuropatía',
      'Retinopatía',
      'Nefropatía',
      'Mayor riesgo cardiovascular'
    ]
  },
  {
    min: 200,
    max: 1000,
    status: 'Diabetes severa',
    description:
      'Niveles por encima de 200 mg/dL (11.1 mmol/L) indican diabetes descontrolada. Riesgo de complicaciones agudas.',
    recommendation: 'Atención médica urgente. Ajuste de medicación y manejo intensivo.',
    considerations: [
      'Riesgo de cetoacidosis diabética',
      'Requiere ajuste inmediato de tratamiento',
      'Posible hospitalización',
      'Monitoreo de cetonas',
      'Hidratación adecuada'
    ],
    risks: [
      'Cetoacidosis diabética',
      'Estado hiperosmolar',
      'Deshidratación severa',
      'Complicaciones agudas'
    ]
  }
]

// Insulina en ayunas
export const insulinRanges: BloodMarkerRange[] = [
  {
    min: 0,
    max: 3,
    status: 'Bajo',
    description:
      'Niveles por debajo de 3 μIU/mL pueden indicar insuficiencia pancreática o diabetes tipo 1.',
    recommendation: 'Evaluación médica para determinar la función pancreática.',
    considerations: [
      'Puede indicar diabetes tipo 1',
      'Evaluar péptido C',
      'Considerar autoanticuerpos pancreáticos',
      'Requiere evaluación endocrinológica'
    ]
  },
  {
    min: 3,
    max: 8,
    status: 'Óptimo',
    description:
      'Niveles entre 3-8 μIU/mL en ayunas indican excelente sensibilidad a la insulina según la evidencia científica.',
    recommendation: 'Mantener el estilo de vida actual. Excelente salud metabólica.',
    supplementRecommendations: [
      {
        name: 'Magnesio',
        dosage: '200-400 mg',
        timing: 'Antes de dormir',
        duration: 'Mantenimiento',
        notes: 'Mantiene la sensibilidad a la insulina'
      }
    ],
    considerations: [
      'Indicador de excelente salud metabólica',
      'Bajo riesgo de diabetes tipo 2',
      'Mantener peso saludable',
      'Continuar con ejercicio regular'
    ],
    benefits: [
      'Metabolismo eficiente',
      'Facilidad para mantener peso',
      'Energía estable',
      'Bajo riesgo de enfermedades metabólicas'
    ]
  },
  {
    min: 8,
    max: 15,
    status: 'Normal-alto',
    description:
      'Niveles entre 8-15 μIU/mL sugieren resistencia a la insulina incipiente. Momento ideal para intervención.',
    recommendation: 'Implementar estrategias para mejorar la sensibilidad a la insulina.',
    supplementRecommendations: [
      {
        name: 'Berberina',
        dosage: '500 mg',
        timing: '2-3 veces al día',
        duration: '3-6 meses',
        notes: 'Mejora significativa en sensibilidad a insulina'
      },
      {
        name: 'Inositol',
        dosage: '2-4g',
        timing: 'Dividido en 2 dosis',
        duration: '3-6 meses',
        notes: 'Especialmente útil en mujeres con SOP'
      },
      {
        name: 'Vinagre de manzana',
        dosage: '15-30 ml',
        timing: 'Antes de comidas con carbohidratos',
        duration: 'Continuo',
        notes: 'Reduce picos de glucosa e insulina'
      }
    ],
    considerations: [
      'Reducir carbohidratos refinados',
      'Implementar ayuno intermitente',
      'Aumentar actividad física',
      'Priorizar el sueño',
      'Manejo del estrés'
    ]
  },
  {
    min: 15,
    max: 25,
    status: 'Resistencia a la insulina',
    description:
      'Niveles entre 15-25 μIU/mL indican resistencia a la insulina significativa. Alto riesgo de desarrollar diabetes tipo 2.',
    recommendation: 'Intervención agresiva en estilo de vida. Considerar evaluación médica.',
    supplementRecommendations: [
      {
        name: 'Berberina',
        dosage: '500 mg',
        timing: '3 veces al día',
        duration: 'Continuo',
        notes: 'Combinar con cambios en dieta'
      },
      {
        name: 'Ácido alfa lipoico',
        dosage: '600-1200 mg',
        timing: 'Dividido en 2 dosis',
        duration: '3-6 meses',
        notes: 'Mejora la captación de glucosa'
      },
      {
        name: 'Resveratrol',
        dosage: '150-500 mg',
        timing: 'Con comida grasa',
        duration: '3-6 meses',
        notes: 'Activa AMPK y mejora metabolismo'
      }
    ],
    considerations: [
      'Dieta muy baja en carbohidratos puede ser necesaria',
      'Considerar dieta cetogénica temporal',
      'Ejercicio de alta intensidad',
      'Evaluación de síndrome metabólico',
      'Posible medicación (metformina)'
    ],
    risks: [
      'Alto riesgo de diabetes tipo 2',
      'Síndrome metabólico',
      'Enfermedad cardiovascular',
      'Hígado graso no alcohólico'
    ]
  },
  {
    min: 25,
    max: 100,
    status: 'Hiperinsulinemia severa',
    description:
      'Niveles por encima de 25 μIU/mL indican hiperinsulinemia severa. Requiere intervención médica.',
    recommendation: 'Consulta médica urgente. Evaluación completa del síndrome metabólico.',
    considerations: [
      'Alto riesgo de complicaciones metabólicas',
      'Evaluación de hígado graso',
      'Screening cardiovascular',
      'Posible inicio de metformina',
      'Cambios drásticos en estilo de vida necesarios'
    ],
    risks: [
      'Diabetes tipo 2 inminente',
      'Enfermedad cardiovascular',
      'Accidente cerebrovascular',
      'Cáncer (asociación con algunos tipos)'
    ]
  }
]

export const glucoseData: BloodMarkerData = {
  name: 'Glucosa en ayunas',
  unit: 'mg/dL',
  ranges: glucoseRanges,
  foodSources: [
    {
      food: 'Canela',
      amount: '1-6g diarios',
      content: 'Mejora sensibilidad a insulina',
      notes: 'Preferir canela de Ceilán'
    },
    {
      food: 'Vinagre de manzana',
      amount: '15-30 ml',
      content: 'Reduce picos de glucosa',
      notes: 'Diluir en agua, tomar antes de comidas'
    },
    {
      food: 'Avena',
      amount: '1/2 taza cocida',
      content: 'Beta-glucanos estabilizan glucosa',
      notes: 'Preferir avena entera'
    },
    {
      food: 'Nueces',
      amount: '30g',
      content: 'Mejoran control glucémico',
      notes: 'Especialmente almendras y nueces'
    },
    {
      food: 'Vegetales de hoja verde',
      amount: 'Sin límite',
      content: 'Muy bajo índice glucémico',
      notes: 'Base de una dieta saludable'
    },
    {
      food: 'Legumbres',
      amount: '1/2 taza cocida',
      content: 'Liberación lenta de glucosa',
      notes: 'Lentejas, garbanzos, frijoles'
    }
  ],
  factors: [
    {
      factor: 'Obesidad abdominal',
      impact: 'Principal factor de resistencia a la insulina',
      recommendation: 'Pérdida de peso del 5-10% mejora significativamente la sensibilidad'
    },
    {
      factor: 'Sedentarismo',
      impact: 'Reduce la captación de glucosa por los músculos',
      recommendation: '150 min/semana de ejercicio moderado + 2 sesiones de fuerza'
    },
    {
      factor: 'Estrés crónico',
      impact: 'Eleva cortisol que aumenta la glucosa',
      recommendation: 'Técnicas de manejo del estrés, meditación, yoga'
    },
    {
      factor: 'Falta de sueño',
      impact: 'Una noche de mal sueño puede elevar la glucosa',
      recommendation: '7-9 horas de sueño de calidad por noche'
    },
    {
      factor: 'Medicamentos',
      impact: 'Corticoides, antipsicóticos, algunos diuréticos elevan glucosa',
      recommendation: 'Monitoreo más frecuente si toma estos medicamentos'
    },
    {
      factor: 'Genética',
      impact: 'Historia familiar aumenta el riesgo 2-6 veces',
      recommendation: 'Screening más temprano y frecuente si hay antecedentes'
    }
  ],
  evidence: [
    {
      claim: 'La berberina es tan efectiva como la metformina',
      evidence: 'Fuerte',
      details: 'Múltiples estudios muestran que 1500 mg/día de berberina tiene efectos similares a 1500 mg/día de metformina en el control glucémico.'
    },
    {
      claim: 'El ejercicio mejora la sensibilidad a la insulina',
      evidence: 'Fuerte',
      details: 'Tanto el ejercicio aeróbico como el de resistencia mejoran la captación de glucosa muscular independientemente de la insulina.'
    },
    {
      claim: 'La pérdida de peso mejora el control glucémico',
      evidence: 'Fuerte',
      details: 'Una pérdida del 5-7% del peso corporal puede prevenir o retrasar la diabetes tipo 2 en personas con prediabetes.'
    },
    {
      claim: 'El ayuno intermitente mejora la sensibilidad a la insulina',
      evidence: 'Moderada',
      details: 'Estudios muestran mejoras en la sensibilidad a la insulina con varios protocolos de ayuno intermitente.'
    },
    {
      claim: 'El magnesio mejora el control glucémico',
      evidence: 'Moderada',
      details: 'La deficiencia de magnesio está asociada con resistencia a la insulina. La suplementación mejora el control en deficientes.'
    }
  ],
  testingNotes: [
    'Ayuno de 8-12 horas antes del análisis',
    'No realizar ejercicio intenso 24 horas antes',
    'Mantener hidratación normal',
    'Si está enfermo, posponer el análisis',
    'Algunos medicamentos pueden alterar los resultados'
  ]
}

export const insulinData: BloodMarkerData = {
  name: 'Insulina en ayunas',
  unit: 'μIU/mL',
  ranges: insulinRanges,
  factors: [
    {
      factor: 'Dieta alta en carbohidratos refinados',
      impact: 'Causa picos repetidos de insulina llevando a resistencia',
      recommendation: 'Reducir azúcares y harinas refinadas, aumentar fibra'
    },
    {
      factor: 'Grasa visceral',
      impact: 'Libera citoquinas inflamatorias que causan resistencia',
      recommendation: 'Pérdida de grasa abdominal es prioritaria'
    },
    {
      factor: 'Síndrome de ovario poliquístico',
      impact: 'Causa resistencia a la insulina en 70% de las mujeres con SOP',
      recommendation: 'Inositol, berberina y dieta baja en carbohidratos'
    },
    {
      factor: 'Inflamación crónica',
      impact: 'Interfiere con la señalización de la insulina',
      recommendation: 'Dieta antiinflamatoria, omega-3, curcumina'
    }
  ],
  evidence: [
    {
      claim: 'La hiperinsulinemia precede a la diabetes tipo 2',
      evidence: 'Fuerte',
      details: 'Los niveles elevados de insulina pueden aparecer 10-20 años antes del diagnóstico de diabetes tipo 2.'
    },
    {
      claim: 'La dieta baja en carbohidratos reduce la insulina',
      evidence: 'Fuerte',
      details: 'Reducir carbohidratos a <100g/día puede reducir los niveles de insulina en 50% en semanas.'
    },
    {
      claim: 'El ayuno reduce los niveles de insulina',
      evidence: 'Fuerte',
      details: 'El ayuno intermitente y prolongado son las formas más rápidas de reducir la insulina.'
    }
  ],
  testingNotes: [
    'Ayuno estricto de 12 horas',
    'No se requiere en diabetes tipo 1 diagnosticada',
    'Útil para evaluar resistencia a la insulina',
    'Considerar junto con glucosa para calcular HOMA-IR',
    'Puede variar significativamente día a día'
  ]
}

export function getGlucoseRecommendation(level: number): BloodMarkerRange | null {
  return glucoseRanges.find((range) => level >= range.min && level < range.max) || null
}

export function getInsulinRecommendation(level: number): BloodMarkerRange | null {
  return insulinRanges.find((range) => level >= range.min && level < range.max) || null
}

// Cálculo del índice HOMA-IR (Homeostatic Model Assessment of Insulin Resistance)
export function calculateHOMAIR(glucose: number, insulin: number): number {
  // HOMA-IR = (Glucosa en mg/dL × Insulina en μIU/mL) / 405
  return (glucose * insulin) / 405
}

export function interpretHOMAIR(homaIR: number): string {
  if (homaIR < 1) return 'Excelente sensibilidad a la insulina'
  if (homaIR < 1.9) return 'Sensibilidad a la insulina normal'
  if (homaIR < 2.9) return 'Resistencia a la insulina leve'
  if (homaIR < 5) return 'Resistencia a la insulina moderada'
  return 'Resistencia a la insulina severa'
}