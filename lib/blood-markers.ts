// Tipos y funciones para análisis de marcadores sanguíneos

export type BloodMarkerType = 
  | 'vitamin-d'
  | 'vitamin-b12'
  | 'glucose'
  | 'insulin'
  | 'cortisol'
  | 'sodium'
  | 'potassium'
  | 'chloride'
  | 'calcium'
  | 'magnesium'
  | 'hematocrit'
  | 'iron'
  | 'ferritin'

export interface BloodTestResult {
  markerId: BloodMarkerType
  value: number
  unit: string
  date: Date
}

export interface SupplementRecommendation {
  name: string
  dosage: string
  timing: string
  duration: string
  notes?: string
}

export interface BloodMarkerRange {
  status: string
  description: string
  recommendation: string
  dosage?: string
  considerations: string[]
  supplementRecommendations?: SupplementRecommendation[]
  benefits?: string[]
  risks?: string[]
}

export interface BloodMarker {
  id: BloodMarkerType
  name: string
  unit: string
  category: string
  description?: string
  factors?: Array<{
    factor: string
    impact: string
    recommendation: string
  }>
}

// Categorías de marcadores
export const markerCategories = [
  { id: 'vitaminas', name: 'Vitaminas y Nutrientes', icon: '🧪' },
  { id: 'metabolismo', name: 'Metabolismo', icon: '🔬' },
  { id: 'electrolitos', name: 'Electrolitos', icon: '⚡' },
  { id: 'anemia', name: 'Anemia y Hierro', icon: '🩸' },
]

// Lista de marcadores disponibles
export const availableBloodMarkers: BloodMarker[] = [
  // Vitaminas
  {
    id: 'vitamin-d',
    name: 'Vitamina D (25-OH)',
    unit: 'ng/mL',
    category: 'vitaminas',
    description: 'Esencial para la salud ósea, inmunidad y estado de ánimo',
    factors: [
      {
        factor: 'Exposición solar',
        impact: 'La síntesis cutánea depende de la exposición UV',
        recommendation: '15-30 minutos de sol directo al día'
      },
      {
        factor: 'Estación del año',
        impact: 'Menor síntesis en invierno',
        recommendation: 'Considerar suplementación en meses de invierno'
      }
    ]
  },
  {
    id: 'vitamin-b12',
    name: 'Vitamina B12',
    unit: 'pg/mL',
    category: 'vitaminas',
    description: 'Vital para la función neurológica y formación de glóbulos rojos',
    factors: [
      {
        factor: 'Dieta vegana/vegetariana',
        impact: 'Mayor riesgo de deficiencia sin fuentes animales',
        recommendation: 'Suplementación obligatoria para veganos'
      },
      {
        factor: 'Edad',
        impact: 'Absorción disminuye después de los 50 años',
        recommendation: 'Considerar formas sublinguales o inyectables'
      }
    ]
  },
  
  // Metabolismo
  {
    id: 'glucose',
    name: 'Glucosa en ayunas',
    unit: 'mg/dL',
    category: 'metabolismo',
    description: 'Indicador principal del metabolismo de carbohidratos'
  },
  {
    id: 'insulin',
    name: 'Insulina en ayunas',
    unit: 'μU/mL',
    category: 'metabolismo',
    description: 'Hormona reguladora del metabolismo de glucosa'
  },
  {
    id: 'cortisol',
    name: 'Cortisol',
    unit: 'μg/dL',
    category: 'metabolismo',
    description: 'Hormona del estrés, ritmo circadiano'
  },
  
  // Electrolitos
  {
    id: 'sodium',
    name: 'Sodio',
    unit: 'mEq/L',
    category: 'electrolitos',
    description: 'Electrolito principal extracelular'
  },
  {
    id: 'potassium',
    name: 'Potasio',
    unit: 'mEq/L',
    category: 'electrolitos',
    description: 'Electrolito principal intracelular'
  },
  {
    id: 'chloride',
    name: 'Cloruro',
    unit: 'mEq/L',
    category: 'electrolitos',
    description: 'Electrolito importante para el equilibrio ácido-base'
  },
  {
    id: 'calcium',
    name: 'Calcio',
    unit: 'mg/dL',
    category: 'electrolitos',
    description: 'Mineral esencial para huesos y función muscular'
  },
  {
    id: 'magnesium',
    name: 'Magnesio',
    unit: 'mg/dL',
    category: 'electrolitos',
    description: 'Mineral clave para más de 300 reacciones enzimáticas'
  },
  
  // Anemia
  {
    id: 'hematocrit',
    name: 'Hematocrito',
    unit: '%',
    category: 'anemia',
    description: 'Porcentaje de glóbulos rojos en sangre'
  },
  {
    id: 'iron',
    name: 'Hierro sérico',
    unit: 'μg/dL',
    category: 'anemia',
    description: 'Hierro disponible en sangre'
  },
  {
    id: 'ferritin',
    name: 'Ferritina',
    unit: 'ng/mL',
    category: 'anemia',
    description: 'Reservas de hierro en el organismo'
  },
]

// Funciones para obtener información de marcadores
export function getMarkerData(markerId: string): BloodMarker | undefined {
  return availableBloodMarkers.find(m => m.id === markerId)
}

export function findMarkerRange(value: number, ranges: Array<{min: number, max: number, status: string}>): string {
  const range = ranges.find(r => value >= r.min && value < r.max)
  return range?.status || 'Desconocido'
}

// Conversiones de unidades
export const unitConversions = {
  'vitamin-d': {
    'ng/mL': 1,
    'nmol/L': 2.5,
  },
  'vitamin-b12': {
    'pg/mL': 1,
    'pmol/L': 0.738,
  },
}

// Funciones de recomendación para cada marcador

export function getVitaminDRecommendation(value: number): BloodMarkerRange {
  if (value < 20) {
    return {
      status: 'Deficiencia severa',
      description: 'Tu nivel de vitamina D está muy por debajo del rango óptimo. Esto puede afectar tu salud ósea, sistema inmune y estado de ánimo.',
      recommendation: 'Se recomienda suplementación inmediata con vitamina D3 bajo supervisión médica.',
      dosage: '5000-10000 UI diarias por 8-12 semanas, luego reevaluar',
      considerations: [
        'La deficiencia severa aumenta el riesgo de osteoporosis y fracturas',
        'Puede contribuir a fatiga, dolor muscular y depresión',
        'La absorción mejora tomándola con alimentos grasos',
        'Considerar también suplementar con vitamina K2 para mejor utilización del calcio'
      ],
      supplementRecommendations: [
        {
          name: 'Vitamina D',
          dosage: '5000-10000 UI',
          timing: 'Con el desayuno o almuerzo (con grasas)',
          duration: '8-12 semanas, luego ajustar según análisis',
          notes: 'Preferir D3 (colecalciferol) sobre D2'
        },
        {
          name: 'Vitamina K2',
          dosage: '100-200 mcg',
          timing: 'Con la vitamina D',
          duration: 'Continuo mientras se suplemente con vitamina D',
          notes: 'Ayuda a dirigir el calcio a los huesos'
        }
      ],
      benefits: [
        'Mejora la absorción de calcio',
        'Fortalece el sistema inmunológico',
        'Reduce el riesgo de depresión estacional',
        'Mejora la salud ósea y muscular'
      ],
      risks: [
        'Sin suplementación: mayor riesgo de osteoporosis',
        'Mayor susceptibilidad a infecciones',
        'Posible empeoramiento del estado de ánimo'
      ]
    }
  } else if (value < 30) {
    return {
      status: 'Insuficiencia',
      description: 'Tu nivel de vitamina D está por debajo del óptimo. Esto puede impactar tu salud a largo plazo.',
      recommendation: 'Suplementación moderada recomendada para alcanzar niveles óptimos.',
      dosage: '2000-4000 UI diarias',
      considerations: [
        'Los niveles subóptimos pueden afectar la función inmune',
        'Mayor riesgo de infecciones respiratorias',
        'Puede contribuir a fatiga leve',
        'La exposición solar puede ayudar pero suele no ser suficiente'
      ],
      supplementRecommendations: [
        {
          name: 'Vitamina D',
          dosage: '2000-4000 UI',
          timing: 'Con el desayuno (con grasas)',
          duration: '3-6 meses, luego mantener con 1000-2000 UI',
          notes: 'Ajustar dosis según estación del año'
        }
      ]
    }
  } else if (value <= 100) {
    return {
      status: 'Óptimo',
      description: 'Tu nivel de vitamina D está en el rango óptimo para la salud.',
      recommendation: 'Mantener niveles actuales con exposición solar adecuada o suplementación de mantenimiento.',
      dosage: '1000-2000 UI diarias para mantenimiento',
      considerations: [
        'Excelente para la salud ósea e inmunológica',
        'Continuar con hábitos actuales',
        'Considerar suplementación en invierno',
        'Reevaluar anualmente'
      ],
      supplementRecommendations: [
        {
          name: 'Vitamina D',
          dosage: '1000-2000 UI',
          timing: 'Con cualquier comida',
          duration: 'Mantenimiento continuo, especialmente en invierno',
          notes: 'Puede no ser necesaria en verano con buena exposición solar'
        }
      ]
    }
  } else {
    return {
      status: 'Elevado',
      description: 'Tu nivel de vitamina D está por encima del rango óptimo.',
      recommendation: 'Reducir o suspender la suplementación y consultar con un médico.',
      considerations: [
        'Niveles muy altos pueden causar hipercalcemia',
        'Revisar dosis de suplementación actual',
        'Monitorear niveles de calcio',
        'Reevaluar en 3 meses'
      ]
    }
  }
}

export function getB12Recommendation(value: number): BloodMarkerRange {
  if (value < 200) {
    return {
      status: 'Deficiencia',
      description: 'Deficiencia de B12 que puede causar anemia y problemas neurológicos.',
      recommendation: 'Suplementación urgente recomendada, preferiblemente forma sublingual o inyectable.',
      dosage: '1000-2000 mcg diarios sublingual',
      considerations: [
        'La deficiencia puede causar daño neurológico irreversible',
        'Síntomas incluyen fatiga, hormigueo, problemas de memoria',
        'Evaluar causa de malabsorción',
        'Considerar inyecciones si la absorción oral es problemática'
      ],
      supplementRecommendations: [
        {
          name: 'Vitamina B12 (Metilcobalamina)',
          dosage: '1000-2000 mcg',
          timing: 'Sublingual en ayunas',
          duration: '3 meses intensivo, luego mantener con 500-1000 mcg',
          notes: 'Preferir metilcobalamina o hidroxicobalamina sobre cianocobalamina'
        },
        {
          name: 'Complejo B',
          dosage: 'Según producto',
          timing: 'Con el desayuno',
          duration: 'Complementario a B12 específica',
          notes: 'Ayuda a balancear las vitaminas B'
        }
      ],
      benefits: [
        'Previene anemia megaloblástica',
        'Protege el sistema nervioso',
        'Mejora los niveles de energía',
        'Apoya la función cognitiva'
      ],
      risks: [
        'Daño neurológico progresivo sin tratamiento',
        'Anemia severa',
        'Problemas cognitivos y de memoria'
      ]
    }
  } else if (value < 300) {
    return {
      status: 'Límite bajo',
      description: 'Niveles en el límite inferior, especialmente preocupante en veganos/vegetarianos.',
      recommendation: 'Suplementación preventiva recomendada.',
      dosage: '500-1000 mcg diarios',
      considerations: [
        'Mayor riesgo si eres vegano o vegetariano',
        'Los síntomas pueden ser sutiles al inicio',
        'La absorción disminuye con la edad',
        'Monitorear regularmente'
      ],
      supplementRecommendations: [
        {
          name: 'Vitamina B12 (Metilcobalamina)',
          dosage: '500-1000 mcg',
          timing: 'Con el desayuno',
          duration: 'Continuo, especialmente para veganos',
          notes: 'Esencial para veganos y vegetarianos'
        }
      ]
    }
  } else if (value <= 900) {
    return {
      status: 'Normal',
      description: 'Niveles de B12 en rango normal.',
      recommendation: 'Mantener ingesta adecuada a través de dieta o suplementación si eres vegano.',
      considerations: [
        'Niveles adecuados para la función normal',
        'Si eres vegano, continuar suplementación preventiva',
        'Reevaluar anualmente',
        'Consumir alimentos fortificados si es posible'
      ],
      supplementRecommendations: value < 500 ? [
        {
          name: 'Vitamina B12',
          dosage: '250-500 mcg',
          timing: 'Con cualquier comida',
          duration: 'Mantenimiento continuo si vegano',
          notes: 'Preventivo para vegetarianos estrictos'
        }
      ] : []
    }
  } else {
    return {
      status: 'Elevado',
      description: 'Niveles de B12 por encima del rango normal.',
      recommendation: 'Generalmente no es preocupante, pero revisar suplementación actual.',
      considerations: [
        'La B12 es hidrosoluble y generalmente segura',
        'Puede indicar suplementación excesiva',
        'Raramente causa problemas',
        'Considerar reducir dosis de suplementos'
      ]
    }
  }
}

export function getIronRecommendation(value: number): BloodMarkerRange {
  if (value < 60) {
    return {
      status: 'Bajo',
      description: 'Niveles bajos de hierro que pueden indicar deficiencia o anemia.',
      recommendation: 'Considerar suplementación de hierro con vitamina C para mejorar absorción.',
      dosage: '18-27 mg de hierro elemental diario',
      considerations: [
        'Tomar con vitamina C y estómago vacío si es tolerable',
        'Separar del café, té y lácteos',
        'Puede causar estreñimiento',
        'Evaluar también ferritina para confirmar reservas'
      ],
      supplementRecommendations: [
        {
          name: 'Hierro',
          dosage: '18-27 mg',
          timing: 'En ayunas o entre comidas',
          duration: '3-6 meses',
          notes: 'Preferir bisglicinato de hierro para mejor tolerancia'
        },
        {
          name: 'Vitamina C',
          dosage: '250-500 mg',
          timing: 'Con el hierro',
          duration: 'Mientras se suplemente hierro',
          notes: 'Mejora significativamente la absorción'
        }
      ],
      benefits: [
        'Previene y trata la anemia ferropénica',
        'Mejora los niveles de energía',
        'Optimiza el transporte de oxígeno',
        'Mejora la función cognitiva'
      ],
      risks: [
        'Fatiga persistente sin tratamiento',
        'Palidez y debilidad',
        'Dificultad para concentrarse',
        'Mayor susceptibilidad a infecciones'
      ]
    }
  } else if (value <= 170) {
    return {
      status: 'Normal',
      description: 'Niveles de hierro en rango normal.',
      recommendation: 'Mantener ingesta adecuada a través de la dieta.',
      considerations: [
        'Consumir fuentes de hierro hemo y no hemo',
        'Combinar con vitamina C en las comidas',
        'Evitar té y café con comidas ricas en hierro',
        'Monitorear si hay síntomas de fatiga'
      ]
    }
  } else {
    return {
      status: 'Elevado',
      description: 'Niveles elevados de hierro que requieren evaluación médica.',
      recommendation: 'Consultar con médico para descartar hemocromatosis u otras causas.',
      considerations: [
        'No suplementar con hierro',
        'Evaluar posibles causas genéticas',
        'Puede requerir flebotomías terapéuticas',
        'Monitorear función hepática'
      ]
    }
  }
}

export function getFerritinRecommendation(value: number): BloodMarkerRange {
  if (value < 20) {
    return {
      status: 'Deficiencia de hierro',
      description: 'Reservas de hierro muy bajas, indicando deficiencia.',
      recommendation: 'Suplementación de hierro necesaria para reponer reservas.',
      dosage: '30-60 mg de hierro elemental diario',
      considerations: [
        'Las reservas bajas preceden a la anemia',
        'Investigar causas de pérdida de hierro',
        'Mujeres en edad fértil tienen mayor riesgo',
        'La repleción puede tomar 3-6 meses'
      ],
      supplementRecommendations: [
        {
          name: 'Hierro',
          dosage: '30-60 mg',
          timing: 'Entre comidas o antes de dormir',
          duration: '3-6 meses hasta normalizar ferritina',
          notes: 'Bisglicinato de hierro para mejor tolerancia'
        },
        {
          name: 'Vitamina C',
          dosage: '500 mg',
          timing: 'Con el hierro',
          duration: 'Durante la suplementación de hierro',
          notes: 'Duplica la absorción de hierro'
        }
      ]
    }
  } else if (value < 50) {
    return {
      status: 'Reservas bajas',
      description: 'Reservas de hierro subóptimas.',
      recommendation: 'Considerar suplementación preventiva.',
      dosage: '18-25 mg de hierro elemental diario',
      considerations: [
        'Riesgo de progresión a deficiencia',
        'Optimizar fuentes dietéticas',
        'Especialmente importante en deportistas',
        'Reevaluar en 3 meses'
      ],
      supplementRecommendations: [
        {
          name: 'Hierro',
          dosage: '18-25 mg',
          timing: 'Con vitamina C, entre comidas',
          duration: '3 meses, luego reevaluar',
          notes: 'Puede ser intermitente (días alternos)'
        }
      ]
    }
  } else if (value <= 200) {
    return {
      status: 'Normal',
      description: 'Reservas de hierro adecuadas.',
      recommendation: 'Mantener a través de dieta balanceada.',
      considerations: [
        'Reservas óptimas para necesidades corporales',
        'No requiere suplementación',
        'Mantener ingesta dietética adecuada',
        'Monitorear anualmente'
      ]
    }
  } else {
    return {
      status: 'Elevado',
      description: 'Ferritina elevada que puede indicar inflamación o sobrecarga de hierro.',
      recommendation: 'Evaluación médica para determinar causa.',
      considerations: [
        'Puede indicar inflamación crónica',
        'Descartar hemocromatosis',
        'No suplementar con hierro',
        'Evaluar marcadores inflamatorios'
      ]
    }
  }
}

export function getCalciumRecommendation(value: number): BloodMarkerRange {
  if (value < 8.5) {
    return {
      status: 'Bajo',
      description: 'Calcio sérico bajo que puede afectar función muscular y nerviosa.',
      recommendation: 'Suplementación de calcio con vitamina D para mejorar absorción.',
      dosage: '1000-1200 mg diarios en dosis divididas',
      considerations: [
        'Evaluar niveles de vitamina D simultáneamente',
        'Dividir dosis para mejor absorción',
        'Puede indicar hipoparatiroidismo',
        'Verificar albúmina para calcio corregido'
      ],
      supplementRecommendations: [
        {
          name: 'Calcio',
          dosage: '500-600 mg',
          timing: 'Dos veces al día con comidas',
          duration: 'Según indicación médica',
          notes: 'Citrato de calcio se absorbe mejor que carbonato'
        },
        {
          name: 'Vitamina D',
          dosage: '1000-2000 UI',
          timing: 'Con el calcio',
          duration: 'Continuo',
          notes: 'Esencial para absorción de calcio'
        },
        {
          name: 'Vitamina K2',
          dosage: '100 mcg',
          timing: 'Con calcio y vitamina D',
          duration: 'Continuo',
          notes: 'Dirige el calcio a los huesos'
        }
      ]
    }
  } else if (value <= 10.5) {
    return {
      status: 'Normal',
      description: 'Niveles de calcio en rango normal.',
      recommendation: 'Mantener ingesta adecuada de calcio dietético.',
      considerations: [
        'Consumir 1000-1200 mg diarios de fuentes alimentarias',
        'Asegurar vitamina D adecuada',
        'Ejercicio de resistencia para salud ósea',
        'Limitar sodio y cafeína excesivos'
      ]
    }
  } else {
    return {
      status: 'Elevado',
      description: 'Calcio elevado que requiere evaluación médica inmediata.',
      recommendation: 'Consultar médico para descartar hiperparatiroidismo u otras causas.',
      considerations: [
        'No suplementar con calcio',
        'Hidratación abundante',
        'Puede causar cálculos renales',
        'Requiere evaluación de paratiroides'
      ]
    }
  }
}

export function getMagnesiumRecommendation(value: number): BloodMarkerRange {
  if (value < 1.8) {
    return {
      status: 'Bajo',
      description: 'Deficiencia de magnesio que puede causar calambres, fatiga y arritmias.',
      recommendation: 'Suplementación de magnesio recomendada.',
      dosage: '400-600 mg diarios',
      considerations: [
        'El magnesio sérico no refleja reservas totales',
        'Común en dietas procesadas',
        'Mejora con formas queladas',
        'Puede causar diarrea en dosis altas'
      ],
      supplementRecommendations: [
        {
          name: 'Magnesio',
          dosage: '200-300 mg',
          timing: 'Antes de dormir',
          duration: '3-6 meses',
          notes: 'Glicinato o citrato para mejor absorción'
        }
      ],
      benefits: [
        'Reduce calambres musculares',
        'Mejora la calidad del sueño',
        'Apoya la función cardiovascular',
        'Reduce ansiedad y estrés'
      ]
    }
  } else if (value <= 2.4) {
    return {
      status: 'Normal',
      description: 'Niveles de magnesio adecuados.',
      recommendation: 'Mantener ingesta dietética rica en magnesio.',
      considerations: [
        'Consumir vegetales verdes, nueces y semillas',
        'El estrés aumenta las necesidades',
        'Considerar suplementación si hay síntomas',
        'Monitorear si toma diuréticos'
      ]
    }
  } else {
    return {
      status: 'Elevado',
      description: 'Magnesio elevado, poco común sin suplementación excesiva.',
      recommendation: 'Revisar suplementación y función renal.',
      considerations: [
        'Evaluar función renal',
        'Reducir suplementación',
        'Raramente problemático',
        'Puede causar debilidad muscular'
      ]
    }
  }
}

export function getGlucoseRecommendation(value: number): BloodMarkerRange {
  if (value < 70) {
    return {
      status: 'Hipoglucemia',
      description: 'Glucosa baja que puede causar síntomas agudos.',
      recommendation: 'Evaluar causas y ajustar dieta para estabilizar glucosa.',
      considerations: [
        'Consumir comidas frecuentes y balanceadas',
        'Incluir proteína en cada comida',
        'Evitar ayunos prolongados',
        'Consultar si hay síntomas recurrentes'
      ],
      supplementRecommendations: [
        {
          name: 'Cromo',
          dosage: '200-400 mcg',
          timing: 'Con las comidas',
          duration: '3 meses',
          notes: 'Ayuda a estabilizar glucosa'
        }
      ]
    }
  } else if (value < 100) {
    return {
      status: 'Normal',
      description: 'Glucosa en ayunas normal.',
      recommendation: 'Mantener hábitos saludables actuales.',
      considerations: [
        'Excelente control metabólico',
        'Continuar dieta balanceada',
        'Ejercicio regular',
        'Chequeo anual'
      ]
    }
  } else if (value < 126) {
    return {
      status: 'Prediabetes',
      description: 'Glucosa elevada que indica riesgo de diabetes.',
      recommendation: 'Cambios de estilo de vida urgentes para prevenir diabetes.',
      considerations: [
        'Pérdida de peso si hay sobrepeso',
        'Ejercicio mínimo 150 min/semana',
        'Dieta baja en carbohidratos refinados',
        'Monitoreo regular'
      ],
      supplementRecommendations: [
        {
          name: 'Cromo',
          dosage: '400 mcg',
          timing: 'Con comidas principales',
          duration: 'Continuo',
          notes: 'Mejora sensibilidad a insulina'
        },
        {
          name: 'Magnesio',
          dosage: '400 mg',
          timing: 'Antes de dormir',
          duration: 'Continuo',
          notes: 'Mejora metabolismo de glucosa'
        },
        {
          name: 'Omega-3 (EPA y DHA)',
          dosage: '2-3 g EPA+DHA',
          timing: 'Con comidas',
          duration: 'Continuo',
          notes: 'Reduce inflamación y mejora sensibilidad insulínica'
        }
      ]
    }
  } else {
    return {
      status: 'Diabetes',
      description: 'Glucosa en rango diabético.',
      recommendation: 'Requiere manejo médico inmediato y cambios de estilo de vida.',
      considerations: [
        'Consulta médica urgente',
        'Posible necesidad de medicación',
        'Control estricto de dieta',
        'Monitoreo frecuente de glucosa'
      ],
      supplementRecommendations: [
        {
          name: 'Cromo',
          dosage: '400-800 mcg',
          timing: 'Con comidas',
          duration: 'Bajo supervisión médica',
          notes: 'Complemento al tratamiento médico'
        }
      ]
    }
  }
}

export function getInsulinRecommendation(value: number): BloodMarkerRange {
  if (value < 3) {
    return {
      status: 'Baja',
      description: 'Insulina baja que puede indicar insuficiencia pancreática.',
      recommendation: 'Evaluación médica para determinar función pancreática.',
      considerations: [
        'Puede indicar diabetes tipo 1 en desarrollo',
        'Evaluar autoanticuerpos pancreáticos',
        'Requiere seguimiento médico',
        'Monitorear glucosa frecuentemente'
      ]
    }
  } else if (value <= 25) {
    return {
      status: 'Normal',
      description: 'Niveles de insulina normales indicando buena sensibilidad.',
      recommendation: 'Mantener estilo de vida saludable.',
      considerations: [
        'Buena sensibilidad a la insulina',
        'Continuar con dieta balanceada',
        'Ejercicio regular',
        'Prevención es clave'
      ]
    }
  } else {
    return {
      status: 'Elevada - Resistencia a insulina',
      description: 'Hiperinsulinemia indicando resistencia a la insulina.',
      recommendation: 'Intervención urgente con dieta y ejercicio.',
      considerations: [
        'Alto riesgo de diabetes tipo 2',
        'Pérdida de peso prioritaria',
        'Dieta baja en carbohidratos',
        'Ejercicio de resistencia'
      ],
      supplementRecommendations: [
        {
          name: 'Berberina',
          dosage: '500 mg',
          timing: 'Tres veces al día con comidas',
          duration: '3-6 meses',
          notes: 'Efectividad similar a metformina'
        },
        {
          name: 'Cromo',
          dosage: '400-800 mcg',
          timing: 'Con comidas',
          duration: 'Continuo',
          notes: 'Mejora sensibilidad a insulina'
        },
        {
          name: 'Omega-3 (EPA y DHA)',
          dosage: '3-4 g EPA+DHA',
          timing: 'Con comidas',
          duration: 'Continuo',
          notes: 'Reduce inflamación sistémica'
        }
      ]
    }
  }
}

export function getCortisolRecommendation(value: number, timeOfDay: 'morning' | 'evening' = 'morning'): BloodMarkerRange {
  const ranges = timeOfDay === 'morning' 
    ? { low: 5, high: 25 }
    : { low: 2, high: 10 }
    
  if (value < ranges.low) {
    return {
      status: 'Bajo',
      description: 'Cortisol bajo que puede indicar fatiga adrenal o insuficiencia.',
      recommendation: 'Manejo del estrés y posible evaluación endocrina.',
      considerations: [
        'Puede causar fatiga extrema',
        'Evaluar función adrenal completa',
        'Mejorar calidad del sueño',
        'Técnicas de manejo del estrés'
      ],
      supplementRecommendations: [
        {
          name: 'Ashwagandha',
          dosage: '600 mg extracto estandarizado',
          timing: 'Mañana y tarde',
          duration: '3 meses',
          notes: 'Adaptógeno que regula cortisol'
        },
        {
          name: 'Vitamina C',
          dosage: '1000 mg',
          timing: 'Con desayuno',
          duration: 'Continuo',
          notes: 'Apoya función adrenal'
        }
      ]
    }
  } else if (value <= ranges.high) {
    return {
      status: 'Normal',
      description: 'Niveles de cortisol apropiados para la hora del día.',
      recommendation: 'Mantener rutinas saludables de sueño y manejo del estrés.',
      considerations: [
        'Ritmo circadiano normal',
        'Continuar buenos hábitos',
        'Sueño regular 7-9 horas',
        'Técnicas de relajación preventivas'
      ]
    }
  } else {
    return {
      status: 'Elevado - Estrés crónico',
      description: 'Cortisol elevado indicando estrés crónico o síndrome de Cushing.',
      recommendation: 'Implementar técnicas de reducción de estrés urgentemente.',
      considerations: [
        'Aumenta riesgo cardiovascular',
        'Puede causar aumento de peso abdominal',
        'Afecta calidad del sueño',
        'Suprime sistema inmune'
      ],
      supplementRecommendations: [
        {
          name: 'Ashwagandha',
          dosage: '600-1000 mg',
          timing: 'Antes de dormir',
          duration: '3-6 meses',
          notes: 'Reduce cortisol hasta 30%'
        },
        {
          name: 'Magnesio',
          dosage: '400 mg glicinato',
          timing: 'Antes de dormir',
          duration: 'Continuo',
          notes: 'Calma sistema nervioso'
        },
        {
          name: 'L-Teanina',
          dosage: '200-400 mg',
          timing: 'Tarde o noche',
          duration: 'Según necesidad',
          notes: 'Promueve relajación sin sedación'
        }
      ]
    }
  }
}

export function getSodiumRecommendation(value: number): BloodMarkerRange {
  if (value < 135) {
    return {
      status: 'Hiponatremia',
      description: 'Sodio bajo que puede ser peligroso.',
      recommendation: 'Evaluación médica urgente requerida.',
      considerations: [
        'Puede causar confusión y convulsiones',
        'Evaluar hidratación',
        'Revisar medicamentos',
        'Requiere corrección cuidadosa'
      ]
    }
  } else if (value <= 145) {
    return {
      status: 'Normal',
      description: 'Niveles de sodio normales.',
      recommendation: 'Mantener hidratación adecuada.',
      considerations: [
        'Balance electrolítico normal',
        'Hidratación según sed',
        'Moderar ingesta de sal',
        'Monitorear si toma diuréticos'
      ]
    }
  } else {
    return {
      status: 'Hipernatremia',
      description: 'Sodio elevado indicando deshidratación.',
      recommendation: 'Aumentar ingesta de agua.',
      considerations: [
        'Indica deshidratación',
        'Aumentar ingesta de agua',
        'Reducir alimentos muy salados',
        'Evaluar función renal'
      ]
    }
  }
}

export function getPotassiumRecommendation(value: number): BloodMarkerRange {
  if (value < 3.5) {
    return {
      status: 'Hipocalemia',
      description: 'Potasio bajo que puede causar arritmias.',
      recommendation: 'Suplementación supervisada médicamente.',
      considerations: [
        'Riesgo de arritmias cardíacas',
        'Puede causar debilidad muscular',
        'Evaluar uso de diuréticos',
        'Aumentar alimentos ricos en potasio'
      ],
      supplementRecommendations: [
        {
          name: 'Potasio',
          dosage: 'Según indicación médica',
          timing: 'Con comidas',
          duration: 'Hasta normalizar',
          notes: 'Solo bajo supervisión médica'
        }
      ]
    }
  } else if (value <= 5.1) {
    return {
      status: 'Normal',
      description: 'Potasio en rango normal.',
      recommendation: 'Mantener ingesta dietética adecuada.',
      considerations: [
        'Función cardíaca normal',
        'Consumir frutas y verduras',
        'Plátanos, espinacas, aguacates',
        'Balance con sodio importante'
      ]
    }
  } else {
    return {
      status: 'Hipercalemia',
      description: 'Potasio elevado peligroso.',
      recommendation: 'Atención médica inmediata.',
      considerations: [
        'Emergencia médica potencial',
        'Riesgo de arritmias graves',
        'Evaluar función renal',
        'Revisar medicamentos'
      ]
    }
  }
}

export function getChlorideRecommendation(value: number): BloodMarkerRange {
  if (value < 98) {
    return {
      status: 'Bajo',
      description: 'Cloruro bajo que puede indicar desequilibrio ácido-base.',
      recommendation: 'Evaluación del balance electrolítico completo.',
      considerations: [
        'Puede indicar alcalosis',
        'Evaluar con otros electrolitos',
        'Hidratación adecuada',
        'Consultar si hay vómitos frecuentes'
      ]
    }
  } else if (value <= 107) {
    return {
      status: 'Normal',
      description: 'Niveles de cloruro normales.',
      recommendation: 'Mantener balance electrolítico.',
      considerations: [
        'Balance ácido-base normal',
        'Hidratación adecuada',
        'Dieta balanceada',
        'No requiere intervención'
      ]
    }
  } else {
    return {
      status: 'Elevado',
      description: 'Cloruro elevado que puede indicar acidosis.',
      recommendation: 'Evaluación médica del estado ácido-base.',
      considerations: [
        'Puede indicar acidosis',
        'Evaluar función renal',
        'Revisar respiración',
        'Hidratación importante'
      ]
    }
  }
}

export function getHematocritRecommendation(value: number, gender: 'male' | 'female' = 'male'): BloodMarkerRange {
  const ranges = gender === 'male' 
    ? { low: 38, normal: 54 }
    : { low: 35, normal: 47 }
    
  if (value < ranges.low) {
    return {
      status: 'Anemia',
      description: 'Hematocrito bajo indicando anemia.',
      recommendation: 'Investigar causa de anemia y suplementar según tipo.',
      considerations: [
        'Evaluar hierro, B12 y folato',
        'Puede causar fatiga severa',
        'Investigar pérdidas de sangre',
        'Requiere evaluación completa'
      ],
      supplementRecommendations: [
        {
          name: 'Hierro',
          dosage: '30-60 mg',
          timing: 'Con vitamina C',
          duration: 'Según causa',
          notes: 'Si es anemia ferropénica'
        },
        {
          name: 'Vitamina B12',
          dosage: '1000 mcg',
          timing: 'Diario',
          duration: 'Si hay deficiencia',
          notes: 'Para anemia megaloblástica'
        },
        {
          name: 'Ácido Fólico',
          dosage: '400-800 mcg',
          timing: 'Con comidas',
          duration: 'Según indicación',
          notes: 'Complementa B12'
        }
      ]
    }
  } else if (value <= ranges.normal) {
    return {
      status: 'Normal',
      description: 'Hematocrito en rango normal.',
      recommendation: 'Mantener estado nutricional adecuado.',
      considerations: [
        'Buena capacidad de transporte de oxígeno',
        'Mantener ingesta de hierro',
        'Hidratación adecuada',
        'Chequeo anual suficiente'
      ]
    }
  } else {
    return {
      status: 'Elevado',
      description: 'Hematocrito elevado que puede indicar deshidratación o policitemia.',
      recommendation: 'Evaluación médica para determinar causa.',
      considerations: [
        'Puede indicar deshidratación',
        'Riesgo de trombosis si es crónico',
        'Evaluar altitud de residencia',
        'Posible policitemia vera'
      ]
    }
  }
}

// Funciones auxiliares para cálculos metabólicos
export function calculateHOMAIR(glucose: number, insulin: number): number {
  // HOMA-IR = (Glucose × Insulin) / 405
  // Glucose in mg/dL, Insulin in μU/mL
  return (glucose * insulin) / 405
}

export function interpretHOMAIR(homaIR: number): string {
  if (homaIR < 1) {
    return 'Sensibilidad a insulina óptima'
  } else if (homaIR < 2.5) {
    return 'Sensibilidad a insulina normal'
  } else if (homaIR < 4) {
    return 'Resistencia a insulina leve a moderada'
  } else {
    return 'Resistencia a insulina significativa'
  }
}