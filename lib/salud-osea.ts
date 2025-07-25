// Este archivo contiene información específica sobre suplementos para la salud ósea

export interface SuplementoOseo {
  nombre: string
  descripcion: string
  beneficios: string[]
  dosificacion: {
    general: string
    hombres?: string
    mujeres?: string
  }
  sinergias: string[]
  poblacionObjetivo: string[]
  evidenciaCientifica: string[]
}

export const suplementosParaSaludOsea: SuplementoOseo[] = [
  {
    nombre: "Calcio",
    descripcion:
      "Mineral esencial para la formación y mantenimiento de huesos y dientes. El calcio es el componente estructural principal del tejido óseo, representando aproximadamente el 99% del calcio corporal total.",
    beneficios: [
      "Fortalece la estructura ósea y previene la pérdida de densidad ósea",
      "Reduce el riesgo de osteoporosis y fracturas, especialmente en adultos mayores",
      "Contribuye a la función muscular y nerviosa normal",
      "Participa en la coagulación sanguínea",
      "Apoya la salud dental",
    ],
    dosificacion: {
      general: "1000-1200mg diarios, divididos en dosis de 500mg o menos para mejor absorción",
      hombres: "1000mg diarios para hombres adultos hasta los 70 años, 1200mg para mayores de 70",
      mujeres: "1000mg diarios para mujeres adultas hasta los 50 años, 1200mg para mayores de 50",
    },
    sinergias: [
      "Combinar con vitamina D para mejorar la absorción de calcio",
      "La vitamina K2 ayuda a dirigir el calcio hacia los huesos y no hacia los tejidos blandos",
      "El magnesio trabaja en conjunto con el calcio para la salud ósea óptima",
    ],
    poblacionObjetivo: [
      "Adultos mayores de 50 años",
      "Mujeres posmenopáusicas",
      "Personas con baja ingesta de lácteos o alimentos fortificados con calcio",
      "Personas con osteopenia u osteoporosis diagnosticada",
    ],
    evidenciaCientifica: [
      "Numerosos estudios clínicos han demostrado que la suplementación adecuada de calcio, especialmente combinada con vitamina D, reduce el riesgo de fracturas en adultos mayores",
      "Un meta-análisis de 29 estudios con más de 63,000 participantes mostró que la suplementación con calcio y vitamina D reduce el riesgo de fracturas en un 15-30%",
      "La evidencia científica actual recomienda obtener calcio principalmente de fuentes alimenticias, complementando con suplementos solo cuando sea necesario",
    ],
  },
  {
    nombre: "Vitamina D",
    descripcion:
      "Hormona esencial para la absorción y utilización del calcio. Sin niveles adecuados de vitamina D, el cuerpo no puede absorber eficientemente el calcio de la dieta, lo que compromete la salud ósea.",
    beneficios: [
      "Mejora la absorción intestinal de calcio y fósforo",
      "Regula los niveles de calcio en sangre",
      "Promueve la mineralización ósea",
      "Reduce el riesgo de fracturas",
      "Apoya la función muscular y reduce el riesgo de caídas en adultos mayores",
    ],
    dosificacion: {
      general: "1000-2000 UI (25-50 mcg) diarios para adultos",
      hombres: "1500-2000 UI diarios, ajustando según niveles sanguíneos",
      mujeres: "1000-2000 UI diarios, con posible aumento durante embarazo y lactancia",
    },
    sinergias: [
      "Trabaja sinérgicamente con el calcio para la salud ósea",
      "La vitamina K2 complementa la acción de la vitamina D dirigiendo el calcio hacia los huesos",
      "El magnesio es necesario para la activación metabólica de la vitamina D",
    ],
    poblacionObjetivo: [
      "Personas con exposición solar limitada",
      "Adultos mayores (la capacidad de producir vitamina D disminuye con la edad)",
      "Personas con piel oscura",
      "Personas con síndromes de malabsorción",
      "Personas con osteopenia u osteoporosis",
    ],
    evidenciaCientifica: [
      "Estudios clínicos han demostrado que la corrección de deficiencias de vitamina D mejora la densidad mineral ósea",
      "Un análisis de 12 ensayos clínicos con más de 42,000 participantes mostró que la suplementación con vitamina D reduce el riesgo de fracturas en un 20% cuando se administra en dosis adecuadas",
      "La evidencia científica actual recomienda mantener niveles sanguíneos de 25(OH)D entre 30-50 ng/ml para salud ósea óptima",
    ],
  },
  {
    nombre: "Vitamina K2",
    descripcion:
      "Forma específica de vitamina K que activa proteínas dependientes de vitamina K como la osteocalcina, que dirige el calcio hacia los huesos y dientes, y la proteína Matrix Gla, que previene la calcificación de tejidos blandos.",
    beneficios: [
      "Dirige el calcio hacia los huesos, aumentando la densidad ósea",
      "Previene la calcificación arterial, protegiendo la salud cardiovascular",
      "Trabaja sinérgicamente con vitamina D y calcio para la salud ósea",
      "Puede reducir el riesgo de fracturas",
      "Apoya la salud dental",
    ],
    dosificacion: {
      general: "100-200mcg diarios de MK-7 o 1.5mg diarios de MK-4",
      hombres: "150-200mcg diarios de MK-7 para salud ósea y cardiovascular",
      mujeres: "100-180mcg diarios de MK-7, especialmente importante para mujeres posmenopáusicas",
    },
    sinergias: [
      "Forma el 'trío perfecto' con calcio y vitamina D para la salud ósea",
      "Complementa la acción de la vitamina D en la regulación del metabolismo del calcio",
      "Mejora la eficacia de los suplementos de calcio",
    ],
    poblacionObjetivo: [
      "Personas que toman suplementos de calcio y vitamina D",
      "Adultos mayores con riesgo de osteoporosis",
      "Mujeres posmenopáusicas",
      "Personas con preocupaciones sobre la salud cardiovascular y ósea simultáneamente",
    ],
    evidenciaCientifica: [
      "Estudios clínicos han demostrado que la suplementación con vitamina K2 puede reducir el riesgo de fracturas óseas en un 60-80% en mujeres posmenopáusicas",
      "Un estudio de 3 años mostró que la suplementación con MK-4 (45mg/día) redujo las fracturas vertebrales en un 60% en mujeres con osteoporosis",
      "Investigaciones recientes sugieren que la vitamina K2 puede reducir la calcificación arterial y mejorar la elasticidad vascular",
    ],
  },
  {
    nombre: "Magnesio",
    descripcion:
      "Mineral esencial que participa en más de 300 reacciones enzimáticas en el cuerpo. Aproximadamente el 60% del magnesio corporal se encuentra en los huesos, donde contribuye a la estructura ósea y sirve como reservorio para el organismo.",
    beneficios: [
      "Contribuye a la estructura y fortaleza ósea",
      "Regula el transporte de calcio y potasio a través de las membranas celulares",
      "Ayuda en la conversión de vitamina D a su forma activa",
      "Apoya la función muscular y previene calambres",
      "Reduce el riesgo de osteoporosis",
    ],
    dosificacion: {
      general: "300-400mg de magnesio elemental por día",
      hombres: "400-420mg por día para hombres adultos",
      mujeres: "310-320mg por día para mujeres adultas (350-360mg durante embarazo)",
    },
    sinergias: [
      "Trabaja en equilibrio con el calcio para la salud ósea y muscular",
      "Necesario para la activación metabólica de la vitamina D",
      "Complementa la acción de la vitamina K2 en la salud ósea",
    ],
    poblacionObjetivo: [
      "Personas con dietas bajas en vegetales de hoja verde, nueces y semillas",
      "Adultos mayores (la absorción disminuye con la edad)",
      "Personas con condiciones digestivas que afectan la absorción",
      "Deportistas (se pierde magnesio a través del sudor)",
      "Personas con osteoporosis o riesgo de desarrollarla",
    ],
    evidenciaCientifica: [
      "Estudios observacionales han encontrado una correlación positiva entre la ingesta de magnesio y la densidad mineral ósea",
      "Un estudio de 7 años con más de 70,000 mujeres mostró que aquellas con mayor ingesta de magnesio tenían un riesgo significativamente menor de fracturas",
      "Investigaciones recientes sugieren que el equilibrio calcio-magnesio es crucial para la salud ósea óptima",
    ],
  },
  {
    nombre: "Colágeno",
    descripcion:
      "Proteína estructural que forma la matriz orgánica del hueso, proporcionando flexibilidad y resistencia. El colágeno tipo I constituye aproximadamente el 90% de la matriz orgánica ósea.",
    beneficios: [
      "Mejora la densidad y resistencia ósea",
      "Proporciona la matriz estructural sobre la que se depositan los minerales óseos",
      "Puede reducir el dolor articular y mejorar la movilidad",
      "Apoya la salud de la piel, cabello y uñas",
      "Contribuye a la recuperación del tejido conectivo",
    ],
    dosificacion: {
      general: "10-15g de péptidos de colágeno hidrolizado diariamente",
      hombres: "15g diarios para hombres adultos",
      mujeres: "10-15g diarios para mujeres adultas",
    },
    sinergias: [
      "La vitamina C es esencial para la síntesis de colágeno",
      "Complementa la acción del calcio y otros minerales en la formación ósea",
      "Trabaja junto con glucosamina y condroitina para la salud articular",
    ],
    poblacionObjetivo: [
      "Adultos mayores con pérdida de densidad ósea",
      "Personas con osteoartritis o problemas articulares",
      "Deportistas con alto impacto en articulaciones",
      "Personas interesadas en la salud ósea y articular preventiva",
    ],
    evidenciaCientifica: [
      "Estudios clínicos han mostrado que la suplementación con péptidos de colágeno puede aumentar la densidad mineral ósea en mujeres posmenopáusicas",
      "Un estudio de 12 meses mostró que la suplementación con 5g de péptidos de colágeno aumentó significativamente la densidad mineral ósea en comparación con placebo",
      "Investigaciones recientes sugieren que los péptidos bioactivos derivados del colágeno pueden estimular la actividad de los osteoblastos (células formadoras de hueso)",
    ],
  },
]

export function obtenerRecomendacionesSaludOsea(): string {
  return `
# Recomendaciones para la Salud Ósea

La salud ósea es fundamental para mantener una buena calidad de vida, especialmente a medida que envejecemos. Los huesos no solo proporcionan estructura y protección a nuestros órganos, sino que también almacenan minerales esenciales y producen células sanguíneas.

## Suplementos Recomendados

Para una salud ósea óptima, se recomienda una combinación de los siguientes suplementos:

1. **Calcio**: El componente estructural principal de los huesos
2. **Vitamina D**: Esencial para la absorción del calcio
3. **Vitamina K2**: Dirige el calcio hacia los huesos y fuera de los tejidos blandos
4. **Magnesio**: Trabaja en conjunto con el calcio para la estructura ósea
5. **Colágeno**: Proporciona la matriz orgánica del hueso

## Combinación Óptima

La combinación de estos suplementos es más efectiva que tomarlos individualmente. El calcio necesita vitamina D para su absorción, mientras que la vitamina K2 asegura que el calcio se deposite en los huesos y no en las arterias. El magnesio es necesario para activar la vitamina D, y el colágeno proporciona la estructura sobre la que se depositan los minerales.

## Recomendaciones Específicas por Edad

### Para adultos menores de 50 años:
- Calcio: 1000mg diarios
- Vitamina D: 1000-2000 UI diarias
- Vitamina K2: 100-150mcg diarias
- Magnesio: 300-400mg diarios
- Colágeno: 10g diarios

### Para adultos mayores de 50 años:
- Calcio: 1200mg diarios
- Vitamina D: 1500-2000 UI diarias
- Vitamina K2: 150-200mcg diarias
- Magnesio: 350-450mg diarios
- Colágeno: 15g diarios

## Consideraciones Importantes

- La suplementación debe complementar, no reemplazar, una dieta rica en alimentos que promuevan la salud ósea
- El ejercicio de resistencia y con carga de peso es fundamental para mantener la densidad ósea
- Evitar el consumo excesivo de alcohol y tabaco, que pueden afectar negativamente la salud ósea
- Consultar siempre con un profesional de la salud antes de comenzar cualquier régimen de suplementación
`
}
