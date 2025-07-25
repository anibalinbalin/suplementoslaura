// Datos basados en la investigación de Examine.com sobre hematocrito y marcadores de hierro

import { BloodMarkerData, BloodMarkerRange } from './types'

// Hematocrito - Hombres
export const hematocritMenRanges: BloodMarkerRange[] = [
  {
    min: 0,
    max: 39,
    status: 'Anemia',
    description:
      'Hematocrito por debajo de 39% en hombres indica anemia. Puede causar fatiga, debilidad, mareos y falta de aire.',
    recommendation: 'Evaluación médica para determinar el tipo de anemia y causa subyacente.',
    supplementRecommendations: [
      {
        name: 'Hierro',
        dosage: '65-100 mg hierro elemental',
        timing: 'Con vitamina C, estómago vacío si tolera',
        duration: '3-6 meses',
        notes: 'Solo si ferritina está baja'
      },
      {
        name: 'Vitamina B12',
        dosage: '1000 mcg',
        timing: 'Diario',
        duration: 'Según deficiencia',
        notes: 'Si hay anemia megaloblástica'
      },
      {
        name: 'Ácido fólico',
        dosage: '1-5 mg',
        timing: 'Diario',
        duration: '3-4 meses',
        notes: 'Si hay deficiencia de folato'
      }
    ],
    considerations: [
      'Evaluar hierro, B12, folato',
      'Descartar sangrado oculto',
      'Considerar enfermedad crónica',
      'Evaluar función renal',
      'Historia menstrual en mujeres'
    ],
    risks: [
      'Fatiga severa',
      'Insuficiencia cardíaca',
      'Deterioro cognitivo',
      'Intolerancia al ejercicio'
    ],
  },
  {
    min: 39,
    max: 49,
    status: 'Normal',
    description:
      'Hematocrito entre 39-49% es normal en hombres. Indica buena capacidad de transporte de oxígeno.',
    recommendation: 'Mantener estado nutricional adecuado y hábitos saludables.',
    benefits: [
      'Oxigenación tisular óptima',
      'Buena capacidad de ejercicio',
      'Energía estable',
      'Función cognitiva normal'
    ],
    considerations: [
      'Mantener hidratación adecuada',
      'Dieta equilibrada en hierro'
    ]
  },
  {
    min: 49,
    max: 54,
    status: 'Elevado',
    description:
      'Hematocrito entre 49-54% está elevado. Puede ser por deshidratación, tabaquismo o vivir en altitud.',
    recommendation: 'Evaluar hidratación y factores de riesgo. Considerar flebotomía si es persistente.',
    considerations: [
      'Evaluar hidratación',
      'Historia de tabaquismo',
      'Altitud de residencia',
      'Apnea del sueño',
      'Uso de testosterona'
    ]
  },
  {
    min: 54,
    max: 100,
    status: 'Policitemia',
    description:
      'Hematocrito por encima de 54% indica policitemia. Aumenta el riesgo de trombosis.',
    recommendation: 'Evaluación médica urgente. Puede requerir flebotomía terapéutica.',
    risks: [
      'Trombosis',
      'Accidente cerebrovascular',
      'Infarto de miocardio',
      'Hiperviscosidad sanguínea'
    ],
    considerations: [
      'Evaluación médica urgente',
      'Posible flebotomía terapéutica',
      'Descartar policitemia vera'
    ]
  }
]

// Hematocrito - Mujeres
export const hematocritWomenRanges: BloodMarkerRange[] = [
  {
    min: 0,
    max: 36,
    status: 'Anemia',
    description:
      'Hematocrito por debajo de 36% en mujeres indica anemia. Común en mujeres con menstruación abundante.',
    recommendation: 'Evaluación de causas, especialmente pérdidas menstruales y estado del hierro.',
    supplementRecommendations: [
      {
        name: 'Hierro',
        dosage: '25-50 mg',
        timing: 'Con vitamina C, preferiblemente en ayunas',
        duration: '3-6 meses',
        notes: 'Forma más tolerable de hierro'
      },
      {
        name: 'Vitamina C',
        dosage: '250-500 mg',
        timing: 'Con el hierro',
        duration: 'Mientras tome hierro',
        notes: 'Mejora absorción del hierro'
      }
    ],
    considerations: [
      'Evaluar patrón menstrual',
      'Considerar DIU hormonal si hay sangrado abundante',
      'Evaluar enfermedad celíaca',
      'Dieta vegetariana aumenta riesgo'
    ]
  },
  {
    min: 36,
    max: 46,
    status: 'Normal',
    description:
      'Hematocrito entre 36-46% es normal en mujeres. Valores pueden ser menores durante menstruación.',
    recommendation: 'Mantener ingesta adecuada de hierro, especialmente durante edad fértil.',
    benefits: [
      'Energía óptima',
      'Capacidad reproductiva normal',
      'Buena recuperación post-ejercicio',
      'Función inmune adecuada'
    ],
    considerations: [
      'Mantener ingesta adecuada de hierro',
      'Control anual suficiente'
    ]
  },
  {
    min: 46,
    max: 100,
    status: 'Elevado',
    description:
      'Hematocrito por encima de 46% está elevado en mujeres. Evaluar causas similares a hombres.',
    recommendation: 'Evaluación médica para descartar policitemia u otras causas.',
    considerations: [
      'Menos común en mujeres premenopáusicas',
      'Evaluar uso de hormonas',
      'Considerar causas secundarias'
    ]
  }
]

// Hierro sérico
export const ironRanges: BloodMarkerRange[] = [
  {
    min: 0,
    max: 60,
    status: 'Deficiencia',
    description:
      'Hierro sérico por debajo de 60 μg/dL indica deficiencia. Puede preceder a la anemia ferropénica.',
    recommendation: 'Suplementación con hierro y evaluación de causas de pérdida o malabsorción.',
    supplementRecommendations: [
      {
        name: 'Hierro',
        dosage: '25-50 mg hierro elemental',
        timing: 'En ayunas o con vitamina C',
        duration: '3-6 meses',
        notes: 'Mejor tolerado que sulfato ferroso'
      },
      {
        name: 'Lactoferrina',
        dosage: '250-500 mg',
        timing: 'Con comidas',
        duration: '2-3 meses',
        notes: 'Mejora utilización del hierro'
      }
    ],
    considerations: [
      'El hierro sérico varía durante el día',
      'Mejor evaluar con ferritina y transferrina',
      'Evitar té y café con las comidas',
      'Separar de calcio y zinc'
    ]
  },
  {
    min: 60,
    max: 170,
    status: 'Normal',
    description:
      'Hierro sérico entre 60-170 μg/dL es normal. Varía considerablemente durante el día.',
    recommendation: 'Mantener dieta rica en hierro hemo y no hemo con facilitadores de absorción.',
    considerations: [
      'Variabilidad diurna normal',
      'Mejor medición en ayunas'
    ]
  },
  {
    min: 170,
    max: 300,
    status: 'Elevado',
    description:
      'Hierro sérico por encima de 170 μg/dL está elevado. Puede indicar sobrecarga o inflamación.',
    recommendation: 'Evaluar ferritina y saturación de transferrina. Descartar hemocromatosis.',
    considerations: [
      'No suplementar hierro',
      'Evaluar mutación HFE',
      'Considerar flebotomía si hay sobrecarga',
      'Limitar vitamina C con comidas'
    ]
  }
]

// Ferritina
export const ferritinRanges: BloodMarkerRange[] = [
  {
    min: 0,
    max: 30,
    status: 'Deficiencia de hierro',
    description:
      'Ferritina por debajo de 30 ng/mL indica depósitos de hierro agotados. Es el marcador más sensible de deficiencia.',
    recommendation: 'Suplementación con hierro urgente. La ferritina óptima es >50 ng/mL.',
    supplementRecommendations: [
      {
        name: 'Hierro',
        dosage: '50-100 mg',
        timing: 'En ayunas con vitamina C',
        duration: '3-6 meses',
        notes: 'Hasta ferritina >50'
      },
      {
        name: 'Complejo B',
        dosage: '1 cápsula',
        timing: 'Con desayuno',
        duration: 'Durante tratamiento',
        notes: 'Apoya la eritropoyesis'
      }
    ],
    considerations: [
      'Ferritina <15 = depósitos vacíos',
      'Común en mujeres menstruantes',
      'Evaluar causas de pérdida',
      'Puede tomar 3-6 meses normalizar'
    ],
    risks: [
      'Anemia ferropénica inminente',
      'Fatiga severa',
      'Caída del cabello',
      'Síndrome de piernas inquietas',
      'Deterioro cognitivo'
    ],
  },
  {
    min: 30,
    max: 50,
    status: 'Subóptimo',
    description:
      'Ferritina entre 30-50 ng/mL es subóptima. Muchas personas tienen síntomas en este rango.',
    recommendation: 'Considerar suplementación para alcanzar niveles óptimos de 50-150 ng/mL.',
    supplementRecommendations: [
      {
        name: 'Hierro',
        dosage: '25-50 mg',
        timing: 'Días alternos',
        duration: '2-3 meses',
        notes: 'Dosificación más conservadora'
      }
    ],
    considerations: [
      'Síntomas pueden estar presentes',
      'Especialmente importante en atletas',
      'Mujeres embarazadas necesitan >70'
    ]
  },
  {
    min: 50,
    max: 150,
    status: 'Óptimo',
    description:
      'Ferritina entre 50-150 ng/mL es óptima según la evidencia científica. Buenos depósitos sin riesgo de sobrecarga.',
    recommendation: 'Mantener con dieta rica en hierro. No necesita suplementación rutinaria.',
    benefits: [
      'Energía óptima',
      'Cabello saludable',
      'Función tiroidea normal',
      'Inmunidad adecuada',
      'Rendimiento deportivo óptimo'
    ],
    considerations: [
      'Mantener dieta equilibrada',
      'No requiere suplementación',
      'Control anual suficiente'
    ]
  },
  {
    min: 150,
    max: 300,
    status: 'Elevado',
    description:
      'Ferritina entre 150-300 ng/mL está elevada. Puede ser por inflamación o inicio de sobrecarga.',
    recommendation: 'Evaluar causas. No suplementar hierro. Considerar donación de sangre.',
    considerations: [
      'Ferritina es reactante de fase aguda',
      'Evaluar PCR para descartar inflamación',
      'Considerar hígado graso',
      'Evaluar consumo de alcohol'
    ]
  },
  {
    min: 300,
    max: 1000,
    status: 'Sobrecarga de hierro',
    description:
      'Ferritina por encima de 300 ng/mL indica sobrecarga. Requiere evaluación médica.',
    recommendation: 'No consumir hierro. Evaluación para hemocromatosis. Considerar flebotomía.',
    considerations: [
      'Test genético HFE',
      'Evaluar daño hepático',
      'Evitar vitamina C con comidas',
      'Limitar alcohol',
      'Flebotomía terapéutica'
    ],
    risks: [
      'Daño hepático',
      'Diabetes',
      'Cardiopatía',
      'Artritis',
      'Daño oxidativo'
    ],
  }
]

export const hematocritDataMen: BloodMarkerData = {
  name: 'Hematocrito (Hombres)',
  unit: '%',
  ranges: hematocritMenRanges,
  factors: [
    {
      factor: 'Hidratación',
      impact: 'La deshidratación puede elevar falsamente el hematocrito',
      recommendation: 'Mantener hidratación adecuada antes del análisis'
    },
    {
      factor: 'Altitud',
      impact: 'Vivir en altitud eleva el hematocrito como adaptación',
      recommendation: 'Considerar valores normales ajustados por altitud'
    },
    {
      factor: 'Tabaquismo',
      impact: 'Eleva el hematocrito por hipoxia crónica',
      recommendation: 'Cesación del tabaquismo'
    }
  ],
  testingNotes: [
    'No requiere ayuno',
    'La posición (sentado vs acostado) puede afectar resultados',
    'Mejor evaluar junto con hemoglobina y VCM',
    'Considerar junto con hierro si hay anemia'
  ]
}

export const hematocritDataWomen: BloodMarkerData = {
  name: 'Hematocrito (Mujeres)',
  unit: '%',
  ranges: hematocritWomenRanges,
  factors: [
    {
      factor: 'Menstruación',
      impact: 'Pérdidas menstruales abundantes causan anemia',
      recommendation: 'Evaluar patrón menstrual y considerar tratamiento'
    },
    {
      factor: 'Embarazo',
      impact: 'Hemodilución fisiológica reduce el hematocrito',
      recommendation: 'Valores de referencia diferentes en embarazo'
    },
    {
      factor: 'Anticonceptivos',
      impact: 'Pueden reducir pérdidas menstruales y mejorar hematocrito',
      recommendation: 'Considerar si hay anemia por sangrado abundante'
    }
  ]
}

export const ironData: BloodMarkerData = {
  name: 'Hierro sérico',
  unit: 'μg/dL',
  ranges: ironRanges,
  factors: [
    {
      factor: 'Momento del día',
      impact: 'El hierro es más alto en la mañana, puede variar 30-40%',
      recommendation: 'Siempre hacer el análisis a la misma hora, preferiblemente AM'
    },
    {
      factor: 'Inflamación',
      impact: 'La inflamación reduce el hierro sérico (hepcidina)',
      recommendation: 'Evaluar PCR junto con hierro'
    },
    {
      factor: 'Dieta reciente',
      impact: 'Comida rica en hierro puede elevar temporalmente niveles',
      recommendation: 'Ayuno de 12 horas antes del análisis'
    }
  ],
  evidence: [
    {
      claim: 'El hierro hemo se absorbe mejor que el no hemo',
      evidence: 'Fuerte',
      details: 'El hierro hemo (carnes) tiene 15-35% absorción vs 2-20% del no hemo (vegetales).'
    },
    {
      claim: 'La vitamina C mejora la absorción del hierro',
      evidence: 'Fuerte',
      details: '100 mg de vitamina C puede aumentar la absorción del hierro no hemo hasta 4 veces.'
    },
    {
      claim: 'El té y café inhiben la absorción del hierro',
      evidence: 'Fuerte',
      details: 'Los taninos pueden reducir la absorción del hierro hasta 60%. Evitar 1 hora antes y después de comidas.'
    }
  ]
}

export const ferritinData: BloodMarkerData = {
  name: 'Ferritina',
  unit: 'ng/mL',
  ranges: ferritinRanges,
  factors: [
    {
      factor: 'Inflamación',
      impact: 'Eleva la ferritina independientemente del hierro',
      recommendation: 'Medir PCR simultáneamente para interpretación correcta'
    },
    {
      factor: 'Ejercicio intenso',
      impact: 'Puede elevar temporalmente la ferritina',
      recommendation: 'Evitar ejercicio extenuante 48h antes del análisis'
    },
    {
      factor: 'Genética',
      impact: 'Mutaciones HFE causan acumulación de hierro',
      recommendation: 'Test genético si ferritina persistentemente elevada'
    }
  ],
  evidence: [
    {
      claim: 'Ferritina <30 causa síntomas incluso sin anemia',
      evidence: 'Fuerte',
      details: 'Fatiga, caída del cabello, síndrome de piernas inquietas pueden ocurrir con ferritina baja sin anemia.'
    },
    {
      claim: 'Ferritina óptima para atletas es >50 ng/mL',
      evidence: 'Moderada',
      details: 'Atletas con ferritina <35 tienen peor rendimiento y mayor fatiga.'
    },
    {
      claim: 'La suplementación en días alternos mejora absorción',
      evidence: 'Fuerte',
      details: 'Dosis diarias elevan hepcidina. Días alternos permiten mejor absorción total.'
    }
  ],
  testingNotes: [
    'Mejor marcador de depósitos de hierro',
    'No requiere ayuno estricto',
    'Si está elevada con PCR normal, sospechar sobrecarga',
    'En inflamación, ferritina <100 puede indicar deficiencia'
  ]
}

// Funciones de recomendación
export function getHematocritRecommendation(level: number, gender: 'male' | 'female'): BloodMarkerRange | null {
  const ranges = gender === 'male' ? hematocritMenRanges : hematocritWomenRanges
  return ranges.find((range) => level >= range.min && level < range.max) || null
}

export function getIronRecommendation(level: number): BloodMarkerRange | null {
  return ironRanges.find((range) => level >= range.min && level < range.max) || null
}

export function getFerritinRecommendation(level: number): BloodMarkerRange | null {
  return ferritinRanges.find((range) => level >= range.min && level < range.max) || null
}