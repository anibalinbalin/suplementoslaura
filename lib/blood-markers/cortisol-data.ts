// Datos basados en la investigación de Examine.com sobre cortisol

import { BloodMarkerData, BloodMarkerRange } from './types'

// Cortisol matutino (7-9 AM)
export const cortisolMorningRanges: BloodMarkerRange[] = [
  {
    min: 0,
    max: 5,
    status: 'Insuficiencia suprarrenal',
    description:
      'Niveles por debajo de 5 μg/dL en la mañana sugieren insuficiencia suprarrenal. Requiere evaluación médica urgente.',
    recommendation: 'Consulta endocrinológica urgente. Posible necesidad de reemplazo hormonal.',
    considerations: [
      'Riesgo de crisis suprarrenal',
      'Evaluar causas (autoinmune, infecciosa, tumoral)',
      'Puede requerir hidrocortisona de reemplazo',
      'Monitoreo de electrolitos',
      'Educación sobre manejo de estrés y enfermedad'
    ],
    risks: [
      'Crisis suprarrenal potencialmente fatal',
      'Hipotensión severa',
      'Hipoglucemia',
      'Desequilibrio electrolítico'
    ]
  },
  {
    min: 5,
    max: 10,
    status: 'Bajo',
    description:
      'Niveles entre 5-10 μg/dL en la mañana están por debajo del rango óptimo. Puede indicar fatiga suprarrenal o fase inicial de insuficiencia.',
    recommendation: 'Evaluar síntomas y considerar pruebas adicionales. Implementar soporte suprarrenal.',
    supplementRecommendations: [
      {
        name: 'Ashwagandha',
        dosage: '300-600 mg',
        timing: '2 veces al día',
        duration: '3-6 meses',
        notes: 'Extracto estandarizado al 5% withanólidos'
      },
      {
        name: 'Rhodiola',
        dosage: '200-400 mg',
        timing: 'Por la mañana',
        duration: '3 meses',
        notes: 'Adaptógeno que mejora la respuesta al estrés'
      },
      {
        name: 'Vitamina C',
        dosage: '500-1000 mg',
        timing: '2-3 veces al día',
        duration: 'Continuo',
        notes: 'Las glándulas suprarrenales tienen alta concentración de vitamina C'
      },
      {
        name: 'Complejo B',
        dosage: '1 cápsula de alta potencia',
        timing: 'Con el desayuno',
        duration: 'Continuo',
        notes: 'Especialmente B5 (ácido pantoténico)'
      }
    ],
    considerations: [
      'Mejorar higiene del sueño',
      'Reducir cafeína',
      'Manejo del estrés',
      'Desayuno con proteína dentro de 1 hora de despertar',
      'Evitar ejercicio intenso temporalmente'
    ],
    benefits: [
      'Mejora de energía matutina',
      'Mejor respuesta al estrés',
      'Estabilización del estado de ánimo'
    ]
  },
  {
    min: 10,
    max: 20,
    status: 'Normal',
    description:
      'Niveles entre 10-20 μg/dL en la mañana son normales según la evidencia científica. Indica función suprarrenal saludable.',
    recommendation: 'Mantener hábitos saludables y manejo adecuado del estrés.',
    supplementRecommendations: [
      {
        name: 'Magnesio',
        dosage: '200-400 mg',
        timing: 'Antes de dormir',
        duration: 'Según necesidad',
        notes: 'Ayuda a regular el eje HPA'
      },
      {
        name: 'L-teanina',
        dosage: '100-200 mg',
        timing: 'Según necesidad de relajación',
        duration: 'Ocasional',
        notes: 'Para momentos de estrés agudo'
      }
    ],
    considerations: [
      'Mantener rutina de sueño regular',
      'Ejercicio regular pero no excesivo',
      'Técnicas de relajación',
      'Exposición a luz solar matutina',
      'Limitar alcohol y cafeína'
    ],
    benefits: [
      'Energía estable durante el día',
      'Buena respuesta al estrés',
      'Ritmo circadiano saludable',
      'Sistema inmune equilibrado'
    ]
  },
  {
    min: 20,
    max: 25,
    status: 'Normal-alto',
    description:
      'Niveles entre 20-25 μg/dL están en el límite superior. Puede indicar estrés agudo o crónico.',
    recommendation: 'Implementar estrategias activas de manejo del estrés.',
    supplementRecommendations: [
      {
        name: 'Ashwagandha',
        dosage: '600 mg',
        timing: 'Antes de dormir',
        duration: '2-3 meses',
        notes: 'Reduce cortisol en 30% según estudios'
      },
      {
        name: 'Fosfatidilserina',
        dosage: '300-400 mg',
        timing: 'Con la cena',
        duration: '2-3 meses',
        notes: 'Modula la respuesta de cortisol'
      },
      {
        name: 'Holy Basil (Tulsi)',
        dosage: '500 mg',
        timing: '2 veces al día',
        duration: '2-3 meses',
        notes: 'Adaptógeno que normaliza cortisol'
      }
    ],
    considerations: [
      'Evaluar fuentes de estrés',
      'Meditación o mindfulness diario',
      'Yoga o tai chi',
      'Terapia si hay estrés emocional',
      'Revisar carga de trabajo'
    ]
  },
  {
    min: 25,
    max: 100,
    status: 'Elevado',
    description:
      'Niveles por encima de 25 μg/dL indican hipercortisolismo. Puede ser por estrés severo o condiciones médicas.',
    recommendation: 'Evaluación médica para descartar síndrome de Cushing u otras causas.',
    considerations: [
      'Screening para síndrome de Cushing',
      'Evaluar medicamentos (corticoides)',
      'Pruebas adicionales (cortisol nocturno, supresión con dexametasona)',
      'Manejo agresivo del estrés',
      'Posible referencia a endocrinología'
    ],
    risks: [
      'Hipertensión',
      'Diabetes',
      'Osteoporosis',
      'Depresión',
      'Supresión inmune'
    ]
  }
]

// Cortisol vespertino (4-8 PM)
export const cortisolEveningRanges: BloodMarkerRange[] = [
  {
    min: 0,
    max: 3,
    status: 'Bajo',
    description:
      'Niveles por debajo de 3 μg/dL por la tarde pueden ser normales si el ritmo circadiano es adecuado.',
    recommendation: 'Evaluar en contexto con cortisol matutino y síntomas.',
    considerations: [
      'Normal si el cortisol matutino es normal',
      'Evaluar fatiga vespertina',
      'Considerar ritmo circadiano'
    ]
  },
  {
    min: 3,
    max: 10,
    status: 'Normal',
    description:
      'Niveles entre 3-10 μg/dL por la tarde son normales. El cortisol debe disminuir naturalmente durante el día.',
    recommendation: 'Mantener rutinas que apoyen el ritmo circadiano natural.',
    considerations: [
      'Evitar ejercicio intenso en la noche',
      'Limitar exposición a luz azul',
      'Cena ligera 3 horas antes de dormir',
      'Rutina de relajación nocturna'
    ],
    benefits: [
      'Facilita el sueño',
      'Recuperación nocturna adecuada',
      'Ritmo circadiano saludable'
    ]
  },
  {
    min: 10,
    max: 20,
    status: 'Elevado',
    description:
      'Niveles entre 10-20 μg/dL por la tarde están elevados. Puede interferir con el sueño y la recuperación.',
    recommendation: 'Implementar rutina estricta de relajación nocturna.',
    supplementRecommendations: [
      {
        name: 'Melatonina',
        dosage: '0.5-3 mg',
        timing: '30-60 min antes de dormir',
        duration: '2-4 semanas',
        notes: 'Ayuda a regular el ritmo circadiano'
      },
      {
        name: 'Glicina',
        dosage: '3g',
        timing: 'Antes de dormir',
        duration: 'Según necesidad',
        notes: 'Mejora la calidad del sueño'
      },
      {
        name: 'Magnesio glicinato',
        dosage: '400 mg',
        timing: '1-2 horas antes de dormir',
        duration: 'Continuo',
        notes: 'Forma más relajante de magnesio'
      }
    ],
    considerations: [
      'No ejercicio después de las 6 PM',
      'Evitar cafeína después del mediodía',
      'Baño caliente antes de dormir',
      'Temperatura fresca en dormitorio',
      'Oscuridad total para dormir'
    ],
    risks: [
      'Insomnio',
      'Sueño no reparador',
      'Fatiga diurna',
      'Alteración del metabolismo'
    ]
  }
]

export const cortisolData: BloodMarkerData = {
  name: 'Cortisol',
  unit: 'μg/dL',
  ranges: cortisolMorningRanges, // Por defecto usar rangos matutinos
  factors: [
    {
      factor: 'Estrés crónico',
      impact: 'Eleva el cortisol de forma sostenida, alterando el ritmo circadiano',
      recommendation: 'Terapia, meditación, cambios en estilo de vida'
    },
    {
      factor: 'Falta de sueño',
      impact: 'Una noche de mal sueño puede elevar el cortisol hasta 45%',
      recommendation: '7-9 horas de sueño de calidad, horario regular'
    },
    {
      factor: 'Ejercicio excesivo',
      impact: 'El sobreentrenamiento eleva crónicamente el cortisol',
      recommendation: 'Periodización del entrenamiento, días de descanso adecuados'
    },
    {
      factor: 'Cafeína',
      impact: 'Puede elevar el cortisol hasta 30%, especialmente en sensibles',
      recommendation: 'Limitar a 200-400 mg/día, no después del mediodía'
    },
    {
      factor: 'Ayuno prolongado',
      impact: 'Ayunos >24 horas elevan significativamente el cortisol',
      recommendation: 'Ayuno intermitente moderado (16:8) es más sostenible'
    },
    {
      factor: 'Alcohol',
      impact: 'Altera el eje HPA y el ritmo de cortisol',
      recommendation: 'Limitar o evitar, especialmente cerca de la hora de dormir'
    },
    {
      factor: 'Deficiencias nutricionales',
      impact: 'Bajos niveles de vitamina C, B5 y magnesio afectan la regulación',
      recommendation: 'Dieta rica en nutrientes, considerar suplementación'
    }
  ],
  evidence: [
    {
      claim: 'Ashwagandha reduce significativamente el cortisol',
      evidence: 'Fuerte',
      details: 'Múltiples estudios muestran reducciones del 25-30% en cortisol con 600 mg/día de extracto estandarizado.'
    },
    {
      claim: 'La meditación reduce el cortisol',
      evidence: 'Fuerte',
      details: 'La meditación regular reduce el cortisol basal y mejora la respuesta al estrés agudo.'
    },
    {
      claim: 'El ejercicio moderado regula el cortisol',
      evidence: 'Fuerte',
      details: 'El ejercicio regular moderado mejora la regulación del eje HPA, mientras que el excesivo la empeora.'
    },
    {
      claim: 'La fosfatidilserina modula el cortisol',
      evidence: 'Moderada',
      details: '300-800 mg/día puede reducir la respuesta de cortisol al estrés físico y mental.'
    },
    {
      claim: 'El sueño inadecuado eleva el cortisol',
      evidence: 'Fuerte',
      details: 'La privación de sueño, incluso parcial, eleva significativamente el cortisol al día siguiente.'
    }
  ],
  testingNotes: [
    'El cortisol sigue un ritmo circadiano: alto en la mañana, bajo en la noche',
    'Ideal medir a las 8 AM para cortisol matutino',
    'Evitar estrés antes de la prueba',
    'No ejercicio intenso 24 horas antes',
    'Algunos prefieren cortisol salival por conveniencia',
    'Considerar múltiples mediciones para evaluar el ritmo'
  ],
  interactions: [
    'DHEA: relación cortisol/DHEA importante para evaluar estrés',
    'Insulina: el cortisol elevado causa resistencia a la insulina',
    'Hormona tiroidea: el cortisol alto puede suprimir la conversión de T4 a T3',
    'Testosterona: relación inversa con cortisol',
    'Hormona del crecimiento: suprimida por cortisol elevado'
  ]
}

export function getCortisolRecommendation(level: number, timeOfDay: 'morning' | 'evening' = 'morning'): BloodMarkerRange | null {
  const ranges = timeOfDay === 'morning' ? cortisolMorningRanges : cortisolEveningRanges
  return ranges.find((range) => level >= range.min && level < range.max) || null
}