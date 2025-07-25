// Datos basados en la investigación de Examine.com sobre electrolitos

import { BloodMarkerData, BloodMarkerRange } from './types'

// Sodio
export const sodiumRanges: BloodMarkerRange[] = [
  {
    min: 0,
    max: 135,
    status: 'Hiponatremia',
    description:
      'Niveles por debajo de 135 mEq/L indican hiponatremia. Puede causar confusión, náuseas, dolor de cabeza y en casos severos, convulsiones.',
    recommendation: 'Evaluación médica urgente para determinar la causa y tratamiento apropiado.',
    considerations: [
      'Evaluar hidratación y función renal',
      'Revisar medicamentos (diuréticos, antidepresivos)',
      'Considerar SIADH',
      'Corrección gradual para evitar desmielinización',
      'Monitoreo frecuente durante corrección'
    ],
    risks: [
      'Edema cerebral',
      'Convulsiones',
      'Coma en casos severos',
      'Riesgo de desmielinización con corrección rápida'
    ]
  },
  {
    min: 135,
    max: 145,
    status: 'Normal',
    description:
      'Niveles entre 135-145 mEq/L son normales. El sodio es esencial para el equilibrio de fluidos y la función nerviosa.',
    recommendation: 'Mantener hidratación adecuada y consumo balanceado de sal.',
    considerations: [
      'Hidratación adecuada (2-3 litros/día)',
      'Balance con otros electrolitos',
      'Ajustar ingesta según actividad física',
      'Considerar pérdidas por sudoración'
    ],
    benefits: [
      'Presión arterial regulada',
      'Función nerviosa óptima',
      'Balance de fluidos adecuado',
      'Contracción muscular normal'
    ]
  },
  {
    min: 145,
    max: 160,
    status: 'Hipernatremia',
    description:
      'Niveles por encima de 145 mEq/L indican hipernatremia. Generalmente por deshidratación o exceso de sodio.',
    recommendation: 'Rehidratación cuidadosa y evaluación de la causa.',
    considerations: [
      'Rehidratación gradual',
      'Evaluar función renal',
      'Revisar ingesta de sodio',
      'Considerar diabetes insípida',
      'Monitoreo de otros electrolitos'
    ],
    risks: [
      'Deshidratación celular',
      'Confusión mental',
      'Convulsiones',
      'Daño renal'
    ]
  }
]

// Potasio
export const potassiumRanges: BloodMarkerRange[] = [
  {
    min: 0,
    max: 3.5,
    status: 'Hipopotasemia',
    description:
      'Niveles por debajo de 3.5 mEq/L indican hipopotasemia. Puede causar debilidad muscular, calambres y arritmias cardíacas.',
    recommendation: 'Suplementación de potasio y evaluación de causas.',
    supplementRecommendations: [
      {
        name: 'Citrato de potasio',
        dosage: '10-20 mEq',
        timing: '2-3 veces al día con comidas',
        duration: 'Hasta normalización',
        notes: 'Preferir formas de liberación lenta'
      },
      {
        name: 'Magnesio',
        dosage: '400 mg',
        timing: 'Al acostarse',
        duration: 'Continuo',
        notes: 'Necesario para retener potasio'
      }
    ],
    considerations: [
      'Evaluar uso de diuréticos',
      'Aumentar alimentos ricos en potasio',
      'Corregir magnesio simultáneamente',
      'Monitoreo cardíaco si es severo',
      'Evitar cambios bruscos'
    ],
    risks: [
      'Arritmias cardíacas',
      'Parálisis muscular',
      'Íleo paralítico',
      'Rabdomiólisis'
    ]
  },
  {
    min: 3.5,
    max: 5.0,
    status: 'Normal',
    description:
      'Niveles entre 3.5-5.0 mEq/L son normales. El potasio es crucial para la función cardíaca y muscular.',
    recommendation: 'Mantener dieta rica en potasio y equilibrada con sodio.',
    supplementRecommendations: [
      {
        name: 'Alimentos ricos en potasio',
        dosage: '3500-4700 mg/día',
        timing: 'Distribuido en comidas',
        duration: 'Continuo',
        notes: 'Plátanos, aguacates, espinacas, papas'
      }
    ],
    considerations: [
      'Balance sodio:potasio ideal 1:2',
      'Aumentar si hay mucha sudoración',
      'Cuidado con suplementos si hay problemas renales',
      'Monitorear si toma medicamentos que afectan potasio'
    ],
    benefits: [
      'Presión arterial saludable',
      'Función cardíaca óptima',
      'Contracción muscular normal',
      'Prevención de cálculos renales'
    ]
  },
  {
    min: 5.0,
    max: 5.5,
    status: 'Límite alto',
    description:
      'Niveles entre 5.0-5.5 mEq/L están en el límite alto. Requiere monitoreo, especialmente si hay enfermedad renal.',
    recommendation: 'Limitar alimentos muy ricos en potasio. Evaluar función renal.',
    considerations: [
      'Evaluar función renal',
      'Revisar medicamentos (IECA, ARA II, espironolactona)',
      'Limitar suplementos de potasio',
      'Considerar pseudohiperpotasemia',
      'ECG si hay síntomas'
    ]
  },
  {
    min: 5.5,
    max: 10,
    status: 'Hiperpotasemia',
    description:
      'Niveles por encima de 5.5 mEq/L indican hiperpotasemia. Emergencia médica por riesgo de arritmias fatales.',
    recommendation: 'Atención médica inmediata. Requiere tratamiento urgente.',
    considerations: [
      'ECG inmediato',
      'Gluconato de calcio si hay cambios en ECG',
      'Insulina + glucosa para redistribución',
      'Evaluar necesidad de diálisis',
      'Suspender medicamentos que elevan potasio'
    ],
    risks: [
      'Paro cardíaco',
      'Arritmias ventriculares',
      'Parálisis muscular',
      'Muerte súbita'
    ]
  }
]

// Cloruro
export const chlorideRanges: BloodMarkerRange[] = [
  {
    min: 0,
    max: 96,
    status: 'Hipocloremia',
    description:
      'Niveles por debajo de 96 mEq/L indican hipocloremia. Generalmente acompaña a otros desequilibrios electrolíticos.',
    recommendation: 'Evaluar causas y corregir junto con otros electrolitos.',
    considerations: [
      'Común con vómitos prolongados',
      'Evaluar equilibrio ácido-base',
      'Corregir deshidratación',
      'Monitorear sodio y potasio'
    ]
  },
  {
    min: 96,
    max: 106,
    status: 'Normal',
    description:
      'Niveles entre 96-106 mEq/L son normales. El cloruro trabaja con sodio para mantener el equilibrio de fluidos.',
    recommendation: 'Mantener hidratación y dieta equilibrada.',
    benefits: [
      'Balance ácido-base adecuado',
      'Digestión normal (HCl estomacal)',
      'Equilibrio de fluidos'
    ],
    considerations: []
  },
  {
    min: 106,
    max: 120,
    status: 'Hipercloremia',
    description:
      'Niveles por encima de 106 mEq/L indican hipercloremia. Puede indicar deshidratación o acidosis.',
    recommendation: 'Evaluar función renal y estado de hidratación.',
    considerations: [
      'Común en deshidratación',
      'Evaluar función renal',
      'Considerar acidosis metabólica',
      'Revisar ingesta de sal'
    ]
  }
]

// Calcio
export const calciumRanges: BloodMarkerRange[] = [
  {
    min: 0,
    max: 8.5,
    status: 'Hipocalcemia',
    description:
      'Niveles por debajo de 8.5 mg/dL indican hipocalcemia. Puede causar calambres, parestesias y tetania.',
    recommendation: 'Suplementación de calcio y vitamina D. Evaluar función paratiroidea.',
    supplementRecommendations: [
      {
        name: 'Citrato de calcio',
        dosage: '500-600 mg',
        timing: '2 veces al día con comidas',
        duration: 'Según necesidad',
        notes: 'Mejor absorción que carbonato'
      },
      {
        name: 'Vitamina D3',
        dosage: '2000-4000 UI',
        timing: 'Con comida grasa',
        duration: 'Continuo',
        notes: 'Esencial para absorción de calcio'
      },
      {
        name: 'Magnesio',
        dosage: '400 mg',
        timing: 'Al acostarse',
        duration: 'Continuo',
        notes: 'Necesario para metabolismo del calcio'
      }
    ],
    considerations: [
      'Corregir niveles de vitamina D primero',
      'Evaluar función paratiroidea',
      'Monitorear magnesio y fosfato',
      'Considerar malabsorción',
      'ECG si es severo'
    ],
    risks: [
      'Tetania',
      'Convulsiones',
      'Laringoespasmo',
      'Arritmias cardíacas'
    ]
  },
  {
    min: 8.5,
    max: 10.5,
    status: 'Normal',
    description:
      'Niveles entre 8.5-10.5 mg/dL son normales. El calcio es esencial para huesos, músculos y nervios.',
    recommendation: 'Mantener ingesta adecuada de calcio y vitamina D.',
    supplementRecommendations: [
      {
        name: 'Calcio dietético',
        dosage: '1000-1200 mg/día',
        timing: 'Distribuido en comidas',
        duration: 'Continuo',
        notes: 'Preferir fuentes alimentarias'
      }
    ],
    benefits: [
      'Huesos y dientes fuertes',
      'Contracción muscular normal',
      'Coagulación sanguínea adecuada',
      'Transmisión nerviosa óptima'
    ],
    considerations: []
  },
  {
    min: 10.5,
    max: 12,
    status: 'Hipercalcemia',
    description:
      'Niveles por encima de 10.5 mg/dL indican hipercalcemia. Puede ser por hiperparatiroidismo, cáncer o exceso de vitamina D.',
    recommendation: 'Evaluación médica para determinar causa. Hidratación abundante.',
    considerations: [
      'Evaluar PTH y vitamina D',
      'Descartar malignidad',
      'Hidratación agresiva',
      'Limitar calcio y vitamina D dietéticos',
      'Considerar bifosfonatos si es severo'
    ],
    risks: [
      'Cálculos renales',
      'Osteoporosis paradójica',
      'Confusión mental',
      'Arritmias cardíacas'
    ]
  }
]

// Magnesio
export const magnesiumRanges: BloodMarkerRange[] = [
  {
    min: 0,
    max: 1.7,
    status: 'Hipomagnesemia',
    description:
      'Niveles por debajo de 1.7 mg/dL indican deficiencia de magnesio. Muy común y a menudo no diagnosticada.',
    recommendation: 'Suplementación de magnesio en forma biodisponible.',
    supplementRecommendations: [
      {
        name: 'Glicinato de magnesio',
        dosage: '400-800 mg',
        timing: 'Dividido en 2 dosis',
        duration: '3-6 meses',
        notes: 'Mejor absorción y tolerancia'
      },
      {
        name: 'Citrato de magnesio',
        dosage: '300-600 mg',
        timing: 'Con comidas',
        duration: '3-6 meses',
        notes: 'Buena biodisponibilidad'
      },
      {
        name: 'Aceite de magnesio tópico',
        dosage: 'Aplicación diaria',
        timing: 'Después del baño',
        duration: 'Complementario',
        notes: 'Absorción transdérmica'
      }
    ],
    considerations: [
      'Común en diabéticos y alcohólicos',
      'Mejora sensibilidad a insulina',
      'Esencial para vitamina D activa',
      'Puede causar diarrea al inicio',
      'Separar de antibióticos'
    ],
    benefits: [
      'Mejor calidad del sueño',
      'Reducción de calambres',
      'Mejora del estado de ánimo',
      'Regulación de glucosa'
    ]
  },
  {
    min: 1.7,
    max: 2.2,
    status: 'Normal',
    description:
      'Niveles entre 1.7-2.2 mg/dL son normales. El magnesio participa en más de 300 reacciones enzimáticas.',
    recommendation: 'Mantener ingesta adecuada a través de dieta y suplementación si es necesario.',
    supplementRecommendations: [
      {
        name: 'Magnesio',
        dosage: '200-400 mg',
        timing: 'Al acostarse',
        duration: 'Mantenimiento',
        notes: 'Mejora calidad del sueño'
      }
    ],
    considerations: [
      'El 99% del magnesio es intracelular',
      'Los niveles séricos pueden no reflejar deficiencia',
      'Considerar prueba de magnesio en glóbulos rojos',
      'Aumentar si hay estrés o ejercicio intenso'
    ],
    benefits: [
      'Función muscular óptima',
      'Salud cardiovascular',
      'Metabolismo energético',
      'Síntesis de proteínas'
    ]
  },
  {
    min: 2.2,
    max: 5,
    status: 'Hipermagnesemia',
    description:
      'Niveles por encima de 2.2 mg/dL indican exceso de magnesio. Raro excepto en enfermedad renal o sobredosis.',
    recommendation: 'Suspender suplementación. Evaluar función renal.',
    considerations: [
      'Común en insuficiencia renal',
      'Revisar uso de antiácidos con magnesio',
      'Puede causar hipotensión',
      'Monitoreo cardíaco si es severo'
    ],
    risks: [
      'Debilidad muscular',
      'Hipotensión',
      'Bradicardia',
      'Depresión respiratoria en casos severos'
    ]
  }
]

export const sodiumData: BloodMarkerData = {
  name: 'Sodio',
  unit: 'mEq/L',
  ranges: sodiumRanges,
  factors: [
    {
      factor: 'Hidratación',
      impact: 'La deshidratación concentra el sodio, la sobrehidratación lo diluye',
      recommendation: 'Mantener hidratación balanceada, 2-3 litros/día'
    },
    {
      factor: 'Sudoración excesiva',
      impact: 'Pérdida de sodio y agua, puede causar hiponatremia',
      recommendation: 'Bebidas con electrolitos durante ejercicio prolongado'
    },
    {
      factor: 'Diuréticos',
      impact: 'Pueden causar pérdida excesiva de sodio',
      recommendation: 'Monitoreo regular si toma diuréticos'
    }
  ],
  testingNotes: [
    'No requiere ayuno',
    'La hemólisis puede alterar resultados',
    'Evaluar junto con otros electrolitos',
    'Considerar osmolalidad si hay alteraciones'
  ]
}

export const potassiumData: BloodMarkerData = {
  name: 'Potasio',
  unit: 'mEq/L',
  ranges: potassiumRanges,
  factors: [
    {
      factor: 'Función renal',
      impact: 'Los riñones regulan el 90% de la excreción de potasio',
      recommendation: 'Monitoreo frecuente si hay enfermedad renal'
    },
    {
      factor: 'Medicamentos',
      impact: 'IECA, ARA II, espironolactona elevan; diuréticos bajan',
      recommendation: 'Ajustar dieta según medicamentos'
    },
    {
      factor: 'Insulina',
      impact: 'Mueve potasio hacia las células',
      recommendation: 'Cuidado en diabéticos con cambios de insulina'
    }
  ],
  evidence: [
    {
      claim: 'El potasio reduce la presión arterial',
      evidence: 'Fuerte',
      details: 'Aumentar la ingesta de potasio en 1000 mg/día reduce la presión sistólica en 2-4 mmHg.'
    },
    {
      claim: 'El balance sodio:potasio es crucial',
      evidence: 'Fuerte',
      details: 'Una relación sodio:potasio alta está asociada con mayor riesgo cardiovascular.'
    }
  ]
}

export const electrolytesData = {
  sodium: sodiumData,
  potassium: potassiumData,
  chloride: {
    name: 'Cloruro',
    unit: 'mEq/L',
    ranges: chlorideRanges
  },
  calcium: {
    name: 'Calcio',
    unit: 'mg/dL',
    ranges: calciumRanges
  },
  magnesium: {
    name: 'Magnesio',
    unit: 'mg/dL',
    ranges: magnesiumRanges
  }
}

// Funciones de recomendación para cada electrolito
export function getSodiumRecommendation(level: number): BloodMarkerRange | null {
  return sodiumRanges.find((range) => level >= range.min && level < range.max) || null
}

export function getPotassiumRecommendation(level: number): BloodMarkerRange | null {
  return potassiumRanges.find((range) => level >= range.min && level < range.max) || null
}

export function getChlorideRecommendation(level: number): BloodMarkerRange | null {
  return chlorideRanges.find((range) => level >= range.min && level < range.max) || null
}

export function getCalciumRecommendation(level: number): BloodMarkerRange | null {
  return calciumRanges.find((range) => level >= range.min && level < range.max) || null
}

export function getMagnesiumRecommendation(level: number): BloodMarkerRange | null {
  return magnesiumRanges.find((range) => level >= range.min && level < range.max) || null
}