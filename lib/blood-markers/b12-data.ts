// Datos basados en la investigación de Examine.com sobre vitamina B12

import { BloodMarkerData, BloodMarkerRange } from './types'

export const b12Ranges: BloodMarkerRange[] = [
  {
    min: 0,
    max: 200,
    status: 'Deficiencia severa',
    description:
      'Niveles por debajo de 200 pg/mL (148 pmol/L) indican deficiencia severa de B12. Esto puede causar anemia megaloblástica, daño neurológico y problemas cognitivos.',
    recommendation: 'Se requiere intervención médica inmediata. Suplementación intensiva bajo supervisión médica.',
    supplementRecommendations: [
      {
        name: 'Vitamina B12',
        dosage: '1000-2000 mcg',
        timing: 'Diariamente',
        duration: '3-6 meses',
        notes: 'Puede requerir inyecciones intramusculares inicialmente'
      },
      {
        name: 'Complejo B',
        dosage: '1 cápsula',
        timing: 'Con el desayuno',
        duration: 'Continuo',
        notes: 'Como apoyo adicional'
      }
    ],
    considerations: [
      'Consultar inmediatamente con un médico',
      'Puede requerir inyecciones de B12 semanales inicialmente',
      'Evaluar la presencia de anemia perniciosa',
      'Monitorear niveles de homocisteína y ácido metilmalónico',
      'Investigar causas subyacentes (problemas de absorción, dieta vegana, medicamentos)'
    ],
    benefits: [
      'Reversión de la anemia megaloblástica',
      'Mejora de la función neurológica',
      'Reducción de la fatiga y debilidad',
      'Mejora de la función cognitiva'
    ],
    risks: [
      'Daño neurológico permanente si no se trata',
      'Anemia severa',
      'Deterioro cognitivo',
      'Neuropatía periférica'
    ]
  },
  {
    min: 200,
    max: 300,
    status: 'Deficiencia',
    description:
      'Niveles entre 200-300 pg/mL (148-221 pmol/L) indican deficiencia de B12. Pueden presentarse síntomas sutiles como fatiga, problemas de memoria y hormigueo.',
    recommendation: 'Se recomienda suplementación para corregir la deficiencia.',
    supplementRecommendations: [
      {
        name: 'Vitamina B12',
        dosage: '1000 mcg',
        timing: 'Diariamente',
        duration: '3 meses, luego reevaluar',
        notes: 'Preferir forma sublingual para mejor absorción (metilcobalamina)'
      },
      {
        name: 'Ácido fólico',
        dosage: '400-800 mcg',
        timing: 'Con la B12',
        duration: '3 meses',
        notes: 'Trabajar en sinergia con B12'
      }
    ],
    considerations: [
      'Evaluar dieta y factores de riesgo',
      'Considerar pruebas adicionales (homocisteína, ácido metilmalónico)',
      'La absorción mejora con formas sublinguales o spray nasal',
      'Vegetarianos y veganos tienen mayor riesgo',
      'Adultos mayores pueden tener problemas de absorción'
    ],
    benefits: [
      'Mejora de los niveles de energía',
      'Mejor función cognitiva',
      'Reducción del riesgo de anemia',
      'Apoyo a la salud neurológica'
    ]
  },
  {
    min: 300,
    max: 400,
    status: 'Límite bajo',
    description:
      'Niveles entre 300-400 pg/mL (221-295 pmol/L) están en el límite bajo. Aunque técnicamente normales, pueden ser subóptimos para algunas personas.',
    recommendation: 'Considerar suplementación preventiva, especialmente en grupos de riesgo.',
    supplementRecommendations: [
      {
        name: 'Vitamina B12',
        dosage: '500-1000 mcg',
        timing: '2-3 veces por semana',
        duration: 'Continuo',
        notes: 'Como mantenimiento preventivo'
      }
    ],
    considerations: [
      'Monitorear síntomas sutiles',
      'Evaluar factores de riesgo (edad, dieta, medicamentos)',
      'Considerar pruebas funcionales si hay síntomas',
      'La suplementación preventiva es segura'
    ],
    benefits: [
      'Prevención de deficiencia futura',
      'Mantenimiento de función neurológica óptima',
      'Apoyo a la producción de glóbulos rojos'
    ]
  },
  {
    min: 400,
    max: 900,
    status: 'Óptimo',
    description:
      'Niveles entre 400-900 pg/mL (295-664 pmol/L) son óptimos según la evidencia científica. Este rango está asociado con función neurológica y hematológica óptima.',
    recommendation: 'Mantener estos niveles con dieta adecuada o suplementación mínima si es necesario.',
    supplementRecommendations: [
      {
        name: 'Vitamina B12',
        dosage: '250-500 mcg',
        timing: '2-3 veces por semana',
        duration: 'Según necesidad',
        notes: 'Solo si la dieta es insuficiente'
      }
    ],
    dosage: 'Mantenimiento: 250-500 mcg 2-3 veces por semana si es necesario',
    considerations: [
      'Mantener una dieta rica en B12 si es posible',
      'Vegetarianos/veganos deben suplementar regularmente',
      'Verificar niveles anualmente',
      'No hay necesidad de suplementación si la dieta es adecuada'
    ],
    benefits: [
      'Función neurológica óptima',
      'Producción saludable de glóbulos rojos',
      'Metabolismo energético eficiente',
      'Síntesis adecuada de ADN'
    ]
  },
  {
    min: 900,
    max: 2000,
    status: 'Elevado',
    description:
      'Niveles entre 900-2000 pg/mL (664-1476 pmol/L) están elevados. Generalmente no causan problemas, pero pueden indicar suplementación excesiva.',
    recommendation: 'Reducir o suspender suplementación. Investigar posibles causas subyacentes.',
    considerations: [
      'Evaluar suplementación actual',
      'Descartar condiciones hematológicas',
      'La B12 es soluble en agua y generalmente segura',
      'Puede indicar problemas de metabolismo de B12'
    ],
    risks: [
      'Generalmente no hay riesgos directos',
      'Puede enmascarar deficiencia de folato',
      'Investigar si hay condiciones subyacentes'
    ]
  },
  {
    min: 2000,
    max: 10000,
    status: 'Muy elevado',
    description:
      'Niveles por encima de 2000 pg/mL (1476 pmol/L) están muy elevados. Requiere investigación médica para descartar condiciones subyacentes.',
    recommendation: 'Suspender toda suplementación y consultar con un médico.',
    considerations: [
      'Investigar enfermedades hematológicas',
      'Evaluar función hepática y renal',
      'Puede indicar leucemia o trastornos mieloproliferativos',
      'Requiere evaluación médica completa'
    ],
    risks: [
      'No por la B12 en sí, sino por posibles condiciones subyacentes',
      'Necesita investigación médica'
    ]
  }
]

export const b12Data: BloodMarkerData = {
  name: 'Vitamina B12',
  unit: 'pg/mL',
  ranges: b12Ranges,
  foodSources: [
    {
      food: 'Hígado de res',
      amount: '100g',
      content: '70-80 mcg',
      notes: 'La fuente más rica de B12'
    },
    {
      food: 'Almejas',
      amount: '100g',
      content: '98 mcg',
      notes: 'Excelente fuente marina'
    },
    {
      food: 'Sardinas',
      amount: '100g',
      content: '8.9 mcg',
      notes: 'También aporta omega-3'
    },
    {
      food: 'Carne de res',
      amount: '100g',
      content: '2.6 mcg',
      notes: 'Fuente confiable'
    },
    {
      food: 'Salmón',
      amount: '100g',
      content: '3.2 mcg',
      notes: 'Rico en omega-3'
    },
    {
      food: 'Huevos',
      amount: '2 unidades',
      content: '1.3 mcg',
      notes: 'Principalmente en la yema'
    },
    {
      food: 'Leche',
      amount: '1 taza',
      content: '1.2 mcg',
      notes: 'Fuente láctea común'
    },
    {
      food: 'Queso',
      amount: '30g',
      content: '0.5-1 mcg',
      notes: 'Varía según el tipo'
    },
    {
      food: 'Cereales fortificados',
      amount: '1 porción',
      content: '1.5-6 mcg',
      notes: 'Opción para vegetarianos'
    },
    {
      food: 'Levadura nutricional fortificada',
      amount: '1 cucharada',
      content: '2-8 mcg',
      notes: 'Opción vegana'
    }
  ],
  factors: [
    {
      factor: 'Edad avanzada',
      impact: 'Reducción de la producción de ácido estomacal y factor intrínseco, afectando la absorción',
      recommendation: 'Preferir formas sublinguales o inyectables de B12'
    },
    {
      factor: 'Dieta vegetariana/vegana',
      impact: 'La B12 se encuentra casi exclusivamente en productos animales',
      recommendation: 'Suplementación obligatoria de 250-500 mcg diarios o 2500 mcg semanales'
    },
    {
      factor: 'Cirugía gastrointestinal',
      impact: 'Bypass gástrico o resección ileal afectan severamente la absorción',
      recommendation: 'Inyecciones de B12 o dosis altas sublinguales de por vida'
    },
    {
      factor: 'Medicamentos',
      impact: 'Metformina, IBP (omeprazol), antiácidos reducen la absorción',
      recommendation: 'Monitorear niveles y suplementar según necesidad'
    },
    {
      factor: 'Enfermedad celíaca o Crohn',
      impact: 'Daño intestinal que afecta la absorción',
      recommendation: 'Formas inyectables o sublinguales, monitoreo frecuente'
    },
    {
      factor: 'Anemia perniciosa',
      impact: 'Falta de factor intrínseco, imposibilita la absorción oral',
      recommendation: 'Inyecciones de B12 de por vida'
    },
    {
      factor: 'Alcoholismo',
      impact: 'Afecta la absorción y el almacenamiento hepático',
      recommendation: 'Suplementación y tratamiento del alcoholismo'
    }
  ],
  evidence: [
    {
      claim: 'La B12 es esencial para la función neurológica',
      evidence: 'Fuerte',
      details: 'Múltiples estudios demuestran que la deficiencia de B12 causa daño neurológico, incluyendo neuropatía periférica, deterioro cognitivo y cambios en la sustancia blanca cerebral.'
    },
    {
      claim: 'La B12 mejora los niveles de energía en deficientes',
      evidence: 'Fuerte',
      details: 'En personas con deficiencia, la suplementación mejora significativamente la fatiga y los niveles de energía. No hay evidencia de beneficio en personas con niveles normales.'
    },
    {
      claim: 'La B12 reduce los niveles de homocisteína',
      evidence: 'Fuerte',
      details: 'La B12, junto con folato y B6, es esencial para el metabolismo de la homocisteína. Niveles altos de homocisteína están asociados con riesgo cardiovascular.'
    },
    {
      claim: 'La B12 mejora la memoria y cognición',
      evidence: 'Moderada',
      details: 'En personas con deficiencia o niveles subóptimos, la suplementación puede mejorar la función cognitiva. No hay evidencia clara de beneficio en personas con niveles normales.'
    },
    {
      claim: 'La B12 previene la depresión',
      evidence: 'Preliminar',
      details: 'Algunos estudios sugieren asociación entre niveles bajos de B12 y depresión, pero la evidencia causal es limitada.'
    }
  ],
  interactions: [
    'Ácido fólico: trabaja sinérgicamente con B12 en el metabolismo de homocisteína',
    'Vitamina B6: necesaria para el metabolismo conjunto de homocisteína',
    'Hierro: la deficiencia de B12 puede enmascarar deficiencia de hierro',
    'Vitamina C: en dosis muy altas puede degradar la B12 en suplementos'
  ],
  testingNotes: [
    'El ayuno no es necesario para la prueba de B12',
    'Los niveles pueden estar falsamente elevados si se toma suplementos',
    'Considerar pruebas adicionales (homocisteína, ácido metilmalónico) si hay síntomas con B12 "normal"',
    'La B12 activa (holotranscobalamina) es más específica pero menos disponible'
  ]
}

export function getB12Recommendation(level: number): BloodMarkerRange | null {
  return b12Ranges.find((range) => level >= range.min && level < range.max) || null
}