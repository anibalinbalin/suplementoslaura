// Este archivo contiene los datos de suplementos de Examine.com traducidos al español
// Servirá como nuestra base de conocimiento principal para recomendaciones basadas en IA

export interface PreguntaFrecuente {
  pregunta: string
  respuesta: string
}

export interface ProductoMercadoLibre {
  marca: string
  url: string
  precio?: number
  disponible?: boolean
}

export interface DatosSuplemento {
  nombre: string
  descripcion: string
  descripcionesContextuales?: {
    menopausia?: string
    salud_osea?: string
    bienestar_mental?: string
    salud_digestiva?: string
    rendimiento_deportivo?: string
    control_peso?: string
    salud_cardiovascular?: string
    [key: string]: string | undefined
  }
  beneficios: string[]
  efectos_secundarios: string[]
  preguntas_frecuentes: PreguntaFrecuente[]
  dosificacion?: {
    general: string
    hombres?: string
    mujeres?: string
  }
  momento_optimo?: string
  consejos_absorcion?: string
  evidencia_cientifica?: string[]
  productosMercadoLibre?: ProductoMercadoLibre[]
}

// El conjunto completo de datos de Examine.com
export const suplementosExamine: DatosSuplemento[] = [
  {
    nombre: "Aminoácidos de Cadena Ramificada",
    descripcion:
      "Los aminoácidos de cadena ramificada (BCAA) son tres aminoácidos esenciales (leucina, isoleucina y valina) que se encuentran abundantemente en proteínas completas como la proteína de suero. IMPORTANTE: La evidencia científica actual NO respalda el uso de BCAA para la mayoría de personas. Solo son útiles en DOS casos específicos: 1) Personas con intolerancia a la lactosa que no pueden consumir proteína de suero y buscan apoyo para entrenamiento, o 2) Como refuerzo para proteínas vegetales incompletas (soja, guisante/arveja). Si ya consumes proteína de suero o suficiente proteína animal, los BCAA son completamente innecesarios y un gasto de dinero.",
    beneficios: [
      "Mejora el crecimiento muscular",
      "Alivia la fatiga muscular",
      "Reduce el daño muscular y el dolor después del ejercicio",
    ],
    efectos_secundarios: ["Niveles circulantes más altos de BCAA pueden correlacionarse con resistencia a la insulina"],
    preguntas_frecuentes: [
      {
        pregunta: "¿Qué son los aminoácidos de cadena ramificada?",
        respuesta:
          "Los BCAA se refieren a tres aminoácidos esenciales: leucina, isoleucina y valina. Se distinguen de otros aminoácidos esenciales porque poseen una cadena lateral ramificada y juegan un papel importante en la regulación de la masa muscular.",
      },
      {
        pregunta: "¿Cuáles son los principales beneficios de los aminoácidos de cadena ramificada?",
        respuesta:
          "Los principales beneficios de los BCAA son su capacidad para mejorar el crecimiento muscular y aliviar la fatiga muscular. Los estudios encontraron que la suplementación con BCAA por sí solos no proporciona una respuesta óptima de síntesis de proteínas musculares.",
      },
      {
        pregunta: "¿Cuáles son las principales desventajas de los aminoácidos de cadena ramificada?",
        respuesta:
          "Existe un creciente interés en comprender la correlación entre la cantidad de BCAA presentes en el cuerpo y la resistencia a la insulina.",
      },
      {
        pregunta: "¿Cómo funcionan los aminoácidos de cadena ramificada?",
        respuesta:
          "Los aminoácidos son los componentes básicos de las proteínas, y se requieren cantidades adecuadas de todos los aminoácidos esenciales para una síntesis adecuada de proteínas.",
      },
      {
        pregunta: "¿Cuándo realmente necesito suplementar con BCAA?",
        respuesta:
          "Los BCAA SOLO son necesarios en DOS situaciones muy específicas: 1) Si tienes intolerancia a la lactosa y no puedes consumir proteína de suero pero necesitas apoyo para entrenamiento de fuerza. 2) Si consumes principalmente proteínas vegetales (soja, guisante/arveja) que tienen un perfil de aminoácidos menos completo. IMPORTANTE: Si consumes proteína de suero, carne, huevos o cualquier proteína animal completa, los BCAA son COMPLETAMENTE INNECESARIOS. La proteína de suero ya contiene 25% de BCAA naturalmente.",
      },
    ],
    dosificacion: {
      general: "SOLO si cumples criterios específicos: 5-10g/día. NO necesarios con proteína completa",
      hombres: "10g/día SOLO si intolerante a lactosa o consumes proteína vegetal",
      mujeres: "5-10g/día SOLO si intolerante a lactosa o consumes proteína vegetal",
    },
    momento_optimo: "Con proteínas vegetales o 30 min antes/después del ejercicio (solo si no tienes acceso a proteína completa)",
    consejos_absorcion: "Innecesarios si consumes proteína de suero. Útiles SOLO con proteínas vegetales incompletas",
    evidencia_cientifica: [
      "Los BCAA aislados NO son superiores a la proteína completa para síntesis muscular",
      "La proteína de suero contiene naturalmente 25% de BCAA, haciendo la suplementación adicional redundante",
      "Solo muestran beneficios en ausencia de proteína completa adecuada",
    ],
  },
  {
    nombre: "Extracto de Té Verde",
    descripcion:
      "El extracto de té verde contiene fitoquímicos, especialmente catequinas como el galato de epigalocatequina (EGCG) y cafeína. El EGCG y la cafeína han demostrado influir sinérgicamente en los índices de salud, incluida la composición corporal, pero los contenidos dentro de los extractos de té verde varían entre marcas. Notablemente, también se han reportado efectos adversos al consumir extracto de té verde.",
    beneficios: [
      "Puede ayudar en el control de peso",
      "Apoya la salud metabólica",
      "Potenciales beneficios cognitivos",
      "Puede mejorar la salud cardiovascular",
      "Propiedades antioxidantes",
    ],
    efectos_secundarios: ["Náuseas", "Malestar estomacal", "Toxicidad hepática en dosis altas"],
    preguntas_frecuentes: [
      {
        pregunta: "¿Qué es el Extracto de Té Verde?",
        respuesta:
          "El Extracto de Té Verde es una forma concentrada de té verde que contiene altos niveles de catequinas, particularmente EGCG, y cafeína.",
      },
      {
        pregunta: "¿Cuáles son los beneficios del Extracto de Té Verde?",
        respuesta:
          "El Extracto de Té Verde puede ayudar con el control de peso, mejorar la salud metabólica, apoyar la función cognitiva y proporcionar beneficios antioxidantes.",
      },
      {
        pregunta: "¿Hay algún efecto secundario?",
        respuesta:
          "Los posibles efectos secundarios incluyen náuseas, malestar estomacal y toxicidad hepática en dosis altas.",
      },
      {
        pregunta: "¿Cómo debo tomar el Extracto de Té Verde?",
        respuesta:
          "Se recomienda seguir las instrucciones de dosificación en la etiqueta del producto o consultar con un profesional de la salud.",
      },
      {
        pregunta: "¿Puedo tomar Extracto de Té Verde con otros suplementos?",
        respuesta:
          "Sí, pero es aconsejable consultar con un proveedor de atención médica para evitar posibles interacciones.",
      },
    ],
    dosificacion: {
      general: "250-500mg por día, estandarizado para contener 50-70% de EGCG",
      hombres: "400-500mg por día",
      mujeres: "250-400mg por día",
    },
    momento_optimo: "Tomar con el desayuno o antes del ejercicio para aprovechar sus efectos termogénicos",
    consejos_absorcion: "Consumir con una comida que contenga algo de grasa para mejorar la absorción",
    evidencia_cientifica: [
      "Estudios han demostrado que el extracto de té verde puede aumentar el gasto energético y la oxidación de grasas",
      "Las catequinas del té verde han mostrado propiedades antioxidantes que pueden proteger contra el daño celular",
      "Investigaciones sugieren que el EGCG puede tener efectos beneficiosos sobre la salud metabólica y cardiovascular",
    ],
  },
  {
    nombre: "Creatina",
    descripcion:
      "La creatina es uno de los suplementos más estudiados y efectivos disponibles. Es un compuesto que se encuentra naturalmente en el músculo y también en alimentos como la carne roja. La suplementación con creatina aumenta las reservas de fosfocreatina en los músculos, lo que ayuda a producir más ATP durante el ejercicio de alta intensidad. Esto resulta en mejoras en la fuerza, potencia y rendimiento deportivo.",
    beneficios: [
      "Aumenta la fuerza y potencia muscular",
      "Mejora el rendimiento en ejercicios de alta intensidad",
      "Promueve el crecimiento muscular",
      "Acelera la recuperación entre series de ejercicios",
      "Puede tener beneficios neuroprotectores",
    ],
    efectos_secundarios: [
      "Retención de agua (generalmente inofensiva)",
      "Posibles molestias gastrointestinales en algunas personas",
      "Calambres musculares (poco comunes y generalmente relacionados con deshidratación)",
    ],
    preguntas_frecuentes: [
      {
        pregunta: "¿Qué es la creatina?",
        respuesta:
          "La creatina es un compuesto nitrogenado producido naturalmente por el cuerpo y encontrado en alimentos como la carne. Juega un papel crucial en la producción de energía durante ejercicios de alta intensidad.",
      },
      {
        pregunta: "¿Es necesaria una fase de carga con creatina?",
        respuesta:
          "No es estrictamente necesaria, pero una fase de carga (20g/día durante 5-7 días) puede saturar los músculos más rápidamente. Alternativamente, tomar 3-5g diarios eventualmente logrará el mismo nivel de saturación, solo tomará más tiempo (aproximadamente 3-4 semanas).",
      },
      {
        pregunta: "¿La creatina causa daño renal?",
        respuesta:
          "No hay evidencia científica que respalde que la creatina cause daño renal en individuos sanos. Numerosos estudios han demostrado que la suplementación con creatina es segura para los riñones en personas sin enfermedad renal preexistente.",
      },
      {
        pregunta: "¿Cuál es la mejor forma de creatina?",
        respuesta:
          "El monohidrato de creatina es la forma más estudiada, económica y efectiva. Otras formas (etil éster, HCl, etc.) no han demostrado ser superiores en estudios científicos rigurosos.",
      },
    ],
    dosificacion: {
      general: "3-5g por día como dosis de mantenimiento",
      hombres: "5g por día para hombres con mayor masa muscular",
      mujeres: "3g por día suele ser suficiente para la mayoría de las mujeres",
    },
    momento_optimo:
      "Puede tomarse en cualquier momento del día. Algunos estudios sugieren beneficios al tomarla cerca del entrenamiento (antes o después)",
    consejos_absorcion:
      "Consumir con carbohidratos puede aumentar ligeramente la absorción. Mezclar con líquidos calientes puede degradar la creatina, por lo que se recomienda usar líquidos fríos o a temperatura ambiente",
    evidencia_cientifica: [
      "Más de 500 estudios revisados por pares respaldan la eficacia y seguridad de la creatina",
      "Meta-análisis han demostrado que la creatina puede aumentar la fuerza en un 5-15% y el rendimiento en ejercicios de alta intensidad en un 10-20%",
      "Estudios recientes sugieren beneficios potenciales para la salud cerebral y función cognitiva",
    ],
  },
  {
    nombre: "Proteína de Suero",
    descripcion:
      "La proteína de suero es un subproducto de la fabricación de queso y contiene todos los aminoácidos esenciales necesarios para la síntesis de proteínas musculares. Es rápidamente digerida y absorbida, lo que la hace ideal para el consumo post-entrenamiento.",
    beneficios: [
      "Promueve la recuperación y el crecimiento muscular",
      "Ayuda a mantener y aumentar la masa muscular magra",
      "Puede contribuir a la pérdida de grasa cuando se usa como parte de una dieta controlada en calorías",
      "Proporciona todos los aminoácidos esenciales en proporciones óptimas",
      "Puede ayudar a controlar el apetito",
    ],
    efectos_secundarios: [
      "Malestar digestivo en personas con intolerancia a la lactosa",
      "Posible hinchazón o gases en algunas personas",
      "Alergias en personas sensibles a las proteínas de la leche",
    ],
    preguntas_frecuentes: [
      {
        pregunta: "¿Cuál es la diferencia entre concentrado, aislado e hidrolizado de proteína de suero?",
        respuesta:
          "El concentrado contiene 70-80% de proteína con algo de lactosa y grasa. El aislado contiene 90% o más de proteína con mínima lactosa y grasa. El hidrolizado es proteína pre-digerida para una absorción más rápida, pero suele ser más costoso.",
      },
      {
        pregunta: "¿Cuándo es el mejor momento para consumir proteína de suero?",
        respuesta:
          "Después del entrenamiento es ideal debido a su rápida absorción, pero puede consumirse en cualquier momento para aumentar la ingesta total de proteínas. La distribución de proteínas a lo largo del día parece ser más importante que el momento específico.",
      },
      {
        pregunta: "¿La proteína de suero engorda?",
        respuesta:
          "No por sí misma. Como cualquier alimento, contribuye calorías a la dieta. Si estas calorías adicionales llevan a un superávit calórico, podría contribuir al aumento de peso. Sin embargo, la proteína tiene un alto efecto de saciedad y puede ayudar en la pérdida de peso como parte de una dieta controlada en calorías.",
      },
      {
        pregunta: "¿Es necesario suplementar con BCAA adicionales si ya tomo proteína de suero?",
        respuesta:
          "No es necesario. La proteína de suero ya contiene altos niveles de BCAA, especialmente leucina. Para la mayoría de las personas que consumen suficiente proteína total, la suplementación adicional con BCAA proporciona beneficios mínimos o nulos para el crecimiento muscular.",
      },
    ],
    dosificacion: {
      general: "20-30g por porción, 1-2 veces al día según necesidades",
      hombres: "25-40g por porción para hombres con mayor masa muscular o necesidades proteicas elevadas",
      mujeres: "15-25g por porción suele ser suficiente para la mayoría de las mujeres",
    },
    momento_optimo:
      "Idealmente dentro de los 30 minutos posteriores al entrenamiento para maximizar la recuperación muscular. También puede ser útil como desayuno o entre comidas",
    consejos_absorcion:
      "Mezclar con agua para una absorción más rápida o con leche para una liberación más prolongada de aminoácidos. Añadir una fuente de carbohidratos después del entrenamiento puede mejorar la recuperación",
    evidencia_cientifica: [
      "Numerosos estudios han demostrado que la proteína de suero es efectiva para estimular la síntesis de proteínas musculares",
      "Investigaciones muestran que la suplementación con proteína de suero, combinada con entrenamiento de resistencia, aumenta significativamente la ganancia de masa muscular",
      "Meta-análisis han confirmado que la proteína de suero puede ayudar en la pérdida de grasa mientras preserva la masa muscular durante dietas hipocalóricas",
      "Según la evidencia científica, la ingesta total de proteínas de 1.6-2.2g por kg de peso corporal es óptima para personas que buscan ganancia muscular",
    ],
    productosMercadoLibre: [
      {
        marca: "Star Nutrition Premium Whey 2kg",
        url: "https://articulo.mercadolibre.com.uy/MLU-617885019",
        precio: 3049,
        disponible: true
      },
      {
        marca: "Star Nutrition 100% Whey 907g",
        url: "https://articulo.mercadolibre.com.uy/MLU-627764525",
        precio: 1829,
        disponible: true
      },
      {
        marca: "Star Nutrition Whey 2lbs",
        url: "https://articulo.mercadolibre.com.uy/MLU-478039206",
        precio: 1640,
        disponible: true
      }
    ],
  },
  {
    nombre: "Omega-3 (EPA y DHA)",
    descripcion:
      "Los ácidos grasos omega-3, especialmente EPA (ácido eicosapentaenoico) y DHA (ácido docosahexaenoico), son grasas poliinsaturadas esenciales que el cuerpo no puede producir por sí mismo. Se encuentran principalmente en pescados grasos, aceites de pescado y algunas fuentes vegetales. Son conocidos por sus propiedades antiinflamatorias y beneficios para la salud cardiovascular y cerebral.",
    descripcionesContextuales: {
      menopausia: "Los omega-3 son aliados valiosos durante la menopausia por su capacidad para reducir los sofocos y sudores nocturnos. Además, apoyan la salud cardiovascular en un momento donde el riesgo de enfermedad cardíaca aumenta debido a la caída de estrógeno. El DHA también puede ayudar con los cambios de humor y la memoria típicos de esta etapa.",
      salud_cardiovascular: "EPA y DHA reducen los triglicéridos, disminuyen la inflamación arterial y mejoran la función endotelial. Su consumo regular está asociado con menor riesgo de arritmias, infarto y eventos cardiovasculares.",
      bienestar_mental: "El DHA es un componente estructural clave del cerebro. Los omega-3 pueden mejorar los síntomas de depresión y ansiedad, y apoyan la función cognitiva y la memoria a largo plazo.",
      salud_osea: "Los omega-3 pueden ayudar a mantener la densidad mineral ósea al reducir la inflamación y mejorar la absorción de calcio, siendo especialmente beneficiosos cuando se combinan con vitamina D y calcio.",
    },
    beneficios: [
      "Apoya la salud cardiovascular y reduce factores de riesgo cardíaco",
      "Tiene propiedades antiinflamatorias que pueden beneficiar las articulaciones",
      "Promueve la salud cerebral y función cognitiva",
      "Puede mejorar la composición corporal cuando se combina con ejercicio",
      "Beneficia la salud ocular",
    ],
    efectos_secundarios: [
      "Sabor a pescado o eructos con sabor a pescado",
      "Posibles efectos anticoagulantes en dosis altas",
      "Malestar gastrointestinal en algunas personas",
    ],
    preguntas_frecuentes: [
      {
        pregunta: "¿Cuál es la diferencia entre omega-3 de pescado y de fuentes vegetales?",
        respuesta:
          "Los omega-3 de pescado contienen directamente EPA y DHA, que son las formas más bioactivas. Las fuentes vegetales como la chía o linaza contienen ALA (ácido alfa-linolénico), que el cuerpo debe convertir a EPA y DHA, un proceso poco eficiente en humanos.",
      },
      {
        pregunta: "¿Cómo puedo evitar el sabor a pescado?",
        respuesta:
          "Busca suplementos de omega-3 con recubrimiento entérico, tómalos con las comidas, mantenlos refrigerados, o elige fórmulas purificadas o destiladas molecularmente que suelen tener menos sabor a pescado.",
      },
      {
        pregunta: "¿Son seguros los omega-3 para embarazadas?",
        respuesta:
          "Sí, de hecho, el DHA es crucial para el desarrollo cerebral del feto. Sin embargo, las embarazadas deben elegir suplementos purificados para evitar contaminantes como mercurio y consultar con su médico sobre la dosis adecuada.",
      },
      {
        pregunta: "¿Debo preocuparme por la contaminación con metales pesados?",
        respuesta:
          "Es una preocupación válida. Busca suplementos que hayan sido destilados molecularmente o purificados y que indiquen pruebas de terceros para metales pesados y otros contaminantes.",
      },
    ],
    dosificacion: {
      general: "1-3g combinados de EPA y DHA por día",
      hombres: "1.6g de EPA+DHA para mantenimiento, hasta 3g para condiciones inflamatorias",
      mujeres: "1.1g de EPA+DHA para mantenimiento, hasta 3g para condiciones inflamatorias",
    },
    momento_optimo:
      "Con las comidas que contienen grasas para mejorar la absorción. Dividir en dos tomas si la dosis es alta",
    consejos_absorcion:
      "Tomar con una comida que contenga grasas saludables mejora significativamente la absorción. Las fórmulas en forma de triglicéridos pueden tener mejor biodisponibilidad que las de ésteres etílicos",
    evidencia_cientifica: [
      "Múltiples estudios clínicos han demostrado que los omega-3 reducen los triglicéridos y pueden disminuir el riesgo de enfermedad cardiovascular",
      "Investigaciones muestran efectos antiinflamatorios que benefician condiciones como la artritis",
      "Estudios en neurociencia sugieren que el DHA es esencial para la función cerebral óptima y puede ayudar a prevenir el deterioro cognitivo",
    ],
    productosMercadoLibre: [
      {
        marca: "Now Foods Ultra Omega 3 180 softgels",
        url: "https://articulo.mercadolibre.com.uy/MLU-477714970",
        precio: 2690,
        disponible: true
      },
      {
        marca: "Now Foods Ultra Omega-3 90 softgels",
        url: "https://articulo.mercadolibre.com.uy/MLU-505114019",
        precio: 1890,
        disponible: true
      },
      {
        marca: "Now Foods Omega-3 1000mg 200 softgels",
        url: "https://articulo.mercadolibre.com.uy/MLU-635445337",
        precio: 2380,
        disponible: true
      }
    ],
  },
  {
    nombre: "Vitamina D",
    descripcion:
      "La vitamina D es una vitamina liposoluble que funciona como una hormona en el cuerpo. Se produce naturalmente cuando la piel se expone a la luz solar, pero muchas personas tienen niveles insuficientes debido al estilo de vida moderno, ubicación geográfica o factores como la edad y el tono de piel. Es crucial para la salud ósea, inmunológica y muscular.",
    descripcionesContextuales: {
      menopausia: "Durante la menopausia, la disminución de estrógeno acelera la pérdida ósea, haciendo esencial la vitamina D para prevenir la osteoporosis. Esta vitamina mejora la absorción de calcio y ayuda a mantener la densidad ósea en esta etapa crítica. Además, puede ayudar con los cambios de humor típicos de la menopausia al apoyar la producción de serotonina.",
      salud_osea: "La vitamina D es fundamental para la absorción intestinal del calcio y el mantenimiento de niveles adecuados de calcio y fósforo en sangre. Esto permite una mineralización ósea normal y previene la osteomalacia en adultos y el raquitismo en niños.",
      bienestar_mental: "La vitamina D participa en la regulación de neurotransmisores como la serotonina, lo que puede influir en el estado de ánimo. Niveles bajos se han asociado con mayor riesgo de depresión y trastornos afectivos estacionales.",
    },
    beneficios: [
      "Esencial para la absorción de calcio y la salud ósea",
      "Apoya la función inmunológica óptima",
      "Contribuye a la salud muscular y puede reducir el riesgo de caídas en ancianos",
      "Puede mejorar el estado de ánimo y reducir síntomas de depresión",
      "Asociada con menor riesgo de ciertas enfermedades crónicas",
    ],
    efectos_secundarios: [
      "Toxicidad por vitamina D (hipercalcemia) en dosis muy altas durante períodos prolongados",
      "Posibles cálculos renales en personas susceptibles con dosis altas",
      "Interacciones con ciertos medicamentos",
    ],
    preguntas_frecuentes: [
      {
        pregunta: "¿Cuál es la diferencia entre vitamina D2 y D3?",
        respuesta:
          "La vitamina D3 (colecalciferol) es la forma que produce el cuerpo humano y se encuentra en fuentes animales. La D2 (ergocalciferol) proviene de fuentes vegetales. La D3 es generalmente más efectiva para elevar los niveles sanguíneos de vitamina D.",
      },
      {
        pregunta: "¿Debo hacerme análisis de sangre antes de suplementar?",
        respuesta:
          "Es recomendable, especialmente si tienes factores de riesgo para deficiencia o planeas tomar dosis altas. Un análisis de 25(OH)D es la mejor forma de evaluar tus niveles de vitamina D.",
      },
      {
        pregunta: "¿Puedo obtener suficiente vitamina D del sol?",
        respuesta:
          "Depende de factores como ubicación geográfica, estación, hora del día, tono de piel y área de piel expuesta. En muchos casos, especialmente en invierno o en latitudes altas, la producción cutánea puede ser insuficiente.",
      },
      {
        pregunta: "¿La vitamina D interactúa con otros suplementos o medicamentos?",
        respuesta:
          "Sí, puede interactuar con medicamentos como estatinas, corticosteroides y medicamentos para la presión arterial. También funciona sinérgicamente con vitamina K2, magnesio y calcio para la salud ósea.",
      },
    ],
    dosificacion: {
      general: "1,000-4,000 UI (25-100 mcg) diarios para adultos",
      hombres: "1,500-4,000 UI diarios, ajustando según niveles sanguíneos",
      mujeres: "1,000-4,000 UI diarios, con posible aumento durante embarazo y lactancia",
    },
    momento_optimo:
      "Con una comida que contenga grasas para mejorar la absorción, preferiblemente en la mañana o al mediodía para no interferir con el sueño",
    consejos_absorcion:
      "La vitamina D es liposoluble, por lo que se absorbe mejor cuando se toma con alimentos que contienen grasas saludables. La vitamina K2 y el magnesio mejoran su utilización",
    evidencia_cientifica: [
      "Numerosos estudios han confirmado el papel de la vitamina D en la salud ósea y la prevención de osteoporosis",
      "Investigaciones recientes muestran que niveles óptimos de vitamina D están asociados con mejor función inmunológica y menor riesgo de infecciones respiratorias",
      "Estudios observacionales y algunos ensayos clínicos sugieren beneficios para la salud muscular, cardiovascular y metabólica",
    ],
    productosMercadoLibre: [
      {
        marca: "Now Foods Vitamina D3 5000 UI 120 softgels",
        url: "https://articulo.mercadolibre.com.uy/MLU-477657195",
        precio: 1090,
        disponible: true
      },
      {
        marca: "Now Foods Vitamina D3 2000 UI 240 softgels",
        url: "https://articulo.mercadolibre.com.uy/MLU-477657184",
        precio: 1290,
        disponible: true
      },
      {
        marca: "Solgar Vitamina D3 1000 UI 100 softgels",
        url: "https://articulo.mercadolibre.com.uy/MLU-478833162",
        precio: 990,
        disponible: true
      }
    ],
  },
  {
    nombre: "Magnesio",
    descripcion:
      "El magnesio es un mineral esencial que participa en más de 300 reacciones enzimáticas en el cuerpo. Es crucial para la función muscular y nerviosa, la producción de energía, la síntesis de proteínas y la regulación de la glucosa. A pesar de su importancia, se estima que más del 50% de la población tiene una ingesta insuficiente de magnesio.",
    descripcionesContextuales: {
      menopausia: "El magnesio es especialmente valioso durante la menopausia por su capacidad para reducir el insomnio, la ansiedad y los cambios de humor característicos de esta etapa. También ayuda a prevenir la pérdida ósea posmenopáusica y puede reducir la frecuencia de sofocos nocturnos. Su efecto calmante sobre el sistema nervioso es particularmente beneficioso para manejar el estrés de la transición menopáusica.",
      bienestar_mental: "El magnesio actúa como un regulador natural del sistema nervioso, ayudando a reducir la ansiedad y mejorar la calidad del sueño. Su deficiencia está asociada con mayor riesgo de depresión y síntomas de estrés crónico.",
      salud_cardiovascular: "El magnesio ayuda a regular la presión arterial y mantener un ritmo cardíaco normal. Niveles adecuados están asociados con menor riesgo de hipertensión, arritmias y enfermedades cardiovasculares.",
      rendimiento_deportivo: "Esencial para la función muscular y la producción de energía (ATP). El magnesio previene calambres, mejora la recuperación muscular y optimiza el rendimiento durante el ejercicio.",
    },
    beneficios: [
      "Apoya la salud cardiovascular y la presión arterial normal",
      "Mejora la calidad del sueño y reduce el insomnio",
      "Alivia el estrés, la ansiedad y los síntomas de depresión",
      "Previene y reduce los calambres musculares",
      "Contribuye a la salud ósea y la función muscular",
    ],
    efectos_secundarios: [
      "Efectos laxantes o diarrea (especialmente con óxido de magnesio)",
      "Malestar estomacal en algunas personas",
      "Posible interacción con ciertos medicamentos",
    ],
    preguntas_frecuentes: [
      {
        pregunta: "¿Cuáles son las mejores formas de magnesio?",
        respuesta:
          "Depende del objetivo. El citrato es bien absorbido y útil para estreñimiento. El glicinato y taurato son gentiles con el estómago y buenos para ansiedad y sueño. El malato puede ayudar con fatiga. El treonato cruza mejor la barrera hematoencefálica para beneficios cognitivos.",
      },
      {
        pregunta: "¿Cómo sé si tengo deficiencia de magnesio?",
        respuesta:
          "Los síntomas pueden incluir calambres musculares, fatiga, irritabilidad, insomnio y palpitaciones cardíacas. Los análisis de sangre estándar no son muy útiles ya que solo el 1% del magnesio está en el torrente sanguíneo. Un análisis de magnesio en glóbulos rojos puede ser más informativo.",
      },
      {
        pregunta: "¿Puedo tomar magnesio con otros minerales?",
        respuesta:
          "Sí, pero el magnesio compite por la absorción con calcio, hierro y zinc. Es mejor separarlos por al menos 2 horas. El magnesio funciona sinérgicamente con vitamina D y K2 para la salud ósea.",
      },
      {
        pregunta: "¿El magnesio causa somnolencia?",
        respuesta:
          "Puede tener un efecto calmante en el sistema nervioso, lo que ayuda con el sueño. Si experimentas somnolencia, considera tomarlo por la noche. Formas como glicinato y taurato tienen efectos más pronunciados sobre la relajación.",
      },
    ],
    dosificacion: {
      general: "200-400mg de magnesio elemental por día",
      hombres: "400-420mg por día para hombres adultos",
      mujeres: "310-320mg por día para mujeres adultas (350-360mg durante embarazo)",
    },
    momento_optimo:
      "Dividir la dosis durante el día para mejor absorción. Para mejorar el sueño, tomar 1-2 horas antes de acostarse",
    consejos_absorcion:
      "Las formas queladas (glicinato, taurato) tienen mejor biodisponibilidad. Tomar con alimentos puede reducir efectos gastrointestinales. Evitar tomar con alimentos ricos en fitatos o con suplementos de calcio",
    evidencia_cientifica: [
      "Estudios clínicos han demostrado que la suplementación con magnesio puede mejorar la calidad del sueño y reducir el tiempo necesario para conciliar el sueño",
      "Investigaciones muestran que niveles adecuados de magnesio están asociados con menor riesgo de hipertensión y enfermedades cardiovasculares",
      "Ensayos controlados han encontrado beneficios del magnesio para reducir la frecuencia e intensidad de migrañas y calambres musculares",
    ],
    productosMercadoLibre: [
      {
        marca: "Star Nutrition Magnesio 60 caps",
        url: "https://articulo.mercadolibre.com.uy/MLU-472893456-magnesio-star-nutrition-60-capsulas",
        precio: 650,
        disponible: true
      },
      {
        marca: "Now Foods Magnesio Citrato 200mg 250 tabletas",
        url: "https://articulo.mercadolibre.com.uy/MLU-614723456-now-foods-magnesio-citrato-200mg-250-tabletas",
        precio: 1890,
        disponible: true
      },
      {
        marca: "Universal Nutrition Magnesio 100 caps",
        url: "https://articulo.mercadolibre.com.uy/MLU-639482716-universal-nutrition-magnesio-100-capsulas",
        precio: 890,
        disponible: true
      }
    ],
  },
  {
    nombre: "Zinc",
    descripcion:
      "El zinc es un mineral esencial involucrado en numerosos aspectos del metabolismo celular. Es necesario para la función inmunológica, síntesis de proteínas, cicatrización de heridas, síntesis de ADN y división celular. El cuerpo humano no almacena zinc, por lo que es necesario un consumo regular a través de la dieta o suplementos.",
    beneficios: [
      "Fortalece el sistema inmunológico y reduce la duración de resfriados",
      "Apoya la producción de testosterona y salud hormonal",
      "Promueve la cicatrización de heridas y salud de la piel",
      "Contribuye a la función cognitiva y neurológica",
      "Esencial para el sentido del gusto y olfato",
    ],
    efectos_secundarios: [
      "Náuseas o malestar estomacal, especialmente en ayunas",
      "Sabor metálico en la boca",
      "Posible interferencia con la absorción de cobre y hierro en dosis altas",
    ],
    preguntas_frecuentes: [
      {
        pregunta: "¿Cuáles son las mejores formas de zinc?",
        respuesta:
          "El picolinato, citrato y glicinato de zinc suelen tener mejor biodisponibilidad. El acetato de zinc es efectivo para pastillas para la garganta. El gluconato es suave para el estómago. El óxido de zinc tiene baja absorción y se usa principalmente en productos tópicos.",
      },
      {
        pregunta: "¿Puedo tomar zinc diariamente?",
        respuesta:
          "Sí, pero es importante no exceder la dosis recomendada a largo plazo. La suplementación crónica con dosis altas (más de 40mg/día) puede causar desequilibrios de cobre y otros problemas. Para uso diario, 15-30mg suele ser seguro para la mayoría de los adultos.",
      },
      {
        pregunta: "¿El zinc ayuda realmente con los resfriados?",
        respuesta:
          "Sí, la evidencia científica respalda que el zinc, especialmente en forma de pastillas para la garganta o jarabe, puede reducir la duración de los resfriados en aproximadamente 33% cuando se toma dentro de las 24 horas del inicio de los síntomas.",
      },
      {
        pregunta: "¿Quiénes tienen mayor riesgo de deficiencia de zinc?",
        respuesta:
          "Vegetarianos y veganos (debido a la menor biodisponibilidad en fuentes vegetales), adultos mayores, personas con enfermedades digestivas como enfermedad de Crohn, mujeres embarazadas y lactantes, y atletas que transpiran mucho.",
      },
    ],
    dosificacion: {
      general: "15-30mg de zinc elemental por día",
      hombres: "11-30mg por día, con dosis más altas (50mg) a corto plazo durante enfermedades",
      mujeres: "8-25mg por día, con posible aumento durante embarazo y lactancia",
    },
    momento_optimo:
      "Con alimentos para reducir malestar estomacal, pero no con alimentos ricos en fitatos, calcio o hierro que pueden inhibir su absorción",
    consejos_absorcion:
      "La vitamina C mejora la absorción de zinc. Evitar tomar con café, té, cereales integrales o suplementos de calcio y hierro. Las proteínas animales mejoran la absorción de zinc",
    evidencia_cientifica: [
      "Meta-análisis han confirmado que la suplementación con zinc reduce significativamente la duración e intensidad de los síntomas del resfriado común",
      "Estudios clínicos muestran que niveles adecuados de zinc están asociados con niveles saludables de testosterona en hombres",
      "Investigaciones han demostrado que el zinc juega un papel crucial en la función inmunológica y la respuesta a infecciones",
    ],
  },
  {
    nombre: "Ashwagandha",
    descripcion:
      "La Ashwagandha (Withania somnifera) es una hierba adaptógena utilizada durante siglos en la medicina ayurvédica. Ayuda al cuerpo a adaptarse al estrés y promueve el equilibrio en varios sistemas corporales. Sus componentes activos, los withanólidos, han mostrado efectos beneficiosos sobre el estrés, ansiedad, función cognitiva y rendimiento físico.",
    beneficios: [
      "Reduce el estrés y la ansiedad",
      "Mejora la resistencia al estrés físico y mental",
      "Puede aumentar los niveles de testosterona y fertilidad en hombres",
      "Mejora la recuperación muscular y el rendimiento físico",
      "Apoya la función cognitiva y memoria",
    ],
    efectos_secundarios: [
      "Somnolencia o sedación en algunas personas",
      "Malestar gastrointestinal leve",
      "Posible interacción con medicamentos para tiroides, diabetes o inmunosupresores",
    ],
    preguntas_frecuentes: [
      {
        pregunta: "¿Cuánto tiempo tarda en hacer efecto la Ashwagandha?",
        respuesta:
          "Los efectos sobre el estrés y ansiedad pueden comenzar a notarse en 1-2 semanas, pero los beneficios completos, especialmente para hormonas y adaptación al estrés, suelen desarrollarse después de 4-8 semanas de uso consistente.",
      },
      {
        pregunta: "¿Es segura para mujeres?",
        respuesta:
          "Sí, es segura y efectiva para mujeres, con beneficios para el estrés, energía y equilibrio hormonal. Sin embargo, no se recomienda durante el embarazo y lactancia por falta de estudios de seguridad. Algunas mujeres con condiciones hormonales como endometriosis deben consultar a un médico antes de usarla.",
      },
      {
        pregunta: "¿Qué diferencia hay entre raíz y extracto?",
        respuesta:
          "Los suplementos de raíz contienen la planta entera pulverizada, mientras que los extractos están estandarizados para contener un porcentaje específico de withanólidos (compuestos activos). Los extractos suelen ser más potentes y consistentes en sus efectos.",
      },
      {
        pregunta: "¿Puede causar problemas de hígado?",
        respuesta:
          "Los casos de toxicidad hepática son extremadamente raros y generalmente asociados con productos de baja calidad o contaminados. Elegir marcas respetables con pruebas de terceros minimiza este riesgo. Personas con enfermedades hepáticas preexistentes deben consultar a un médico.",
      },
    ],
    dosificacion: {
      general: "300-600mg de extracto estandarizado (5% de withanólidos) por día",
      hombres: "500-600mg para beneficios hormonales y rendimiento físico",
      mujeres: "300-500mg para estrés y equilibrio hormonal",
    },
    momento_optimo:
      "Dividir la dosis entre mañana y noche. Para mejorar el sueño, tomar la dosis completa 1-2 horas antes de acostarse",
    consejos_absorcion:
      "Tomar con alimentos que contengan grasas puede mejorar la absorción de los compuestos activos. La pimienta negra (piperina) puede aumentar la biodisponibilidad",
    evidencia_cientifica: [
      "Estudios clínicos han demostrado que la Ashwagandha reduce significativamente los niveles de cortisol y los síntomas de estrés y ansiedad",
      "Investigaciones muestran que puede aumentar la fuerza, masa muscular y recuperación en personas que realizan entrenamiento de resistencia",
      "Ensayos controlados han encontrado mejoras en la calidad del sueño, concentración y función cognitiva con suplementación regular",
    ],
  },
  {
    nombre: "Probióticos",
    descripcion:
      "Los probióticos son microorganismos vivos que, cuando se administran en cantidades adecuadas, confieren un beneficio para la salud del huésped. Principalmente bacterias de los géneros Lactobacillus y Bifidobacterium, estos organismos beneficiosos ayudan a mantener un equilibrio saludable en la microbiota intestinal, lo que influye en la digestión, inmunidad y salud general.",
    beneficios: [
      "Mejora la salud digestiva y reduce síntomas de síndrome de intestino irritable",
      "Fortalece el sistema inmunológico",
      "Puede ayudar a prevenir y tratar la diarrea asociada a antibióticos",
      "Contribuye a la salud mental a través del eje intestino-cerebro",
      "Potencial para mejorar la salud metabólica y cardiovascular",
    ],
    efectos_secundarios: [
      "Gases e hinchazón temporal al inicio del uso",
      "Posibles reacciones alérgicas en personas sensibles",
      "No recomendados para personas con inmunodeficiencias severas",
    ],
    preguntas_frecuentes: [
      {
        pregunta: "¿Todas las cepas probióticas son iguales?",
        respuesta:
          "No, los beneficios son específicos de cada cepa. Por ejemplo, Lactobacillus rhamnosus GG está bien estudiado para diarrea, mientras que Bifidobacterium longum puede beneficiar la salud mental. Es importante elegir cepas con investigación que respalde los beneficios específicos que buscas.",
      },
      {
        pregunta: "¿Cuánto tiempo debo tomar probióticos?",
        respuesta:
          "Depende del objetivo. Para problemas agudos como diarrea por antibióticos, 2-4 semanas pueden ser suficientes. Para condiciones crónicas como SII, se pueden necesitar meses. Algunos expertos recomiendan ciclos (ej. 3 meses on, 1 mes off) para prevenir dependencia del microbioma.",
      },
      {
        pregunta: "¿Necesito refrigerar los probióticos?",
        respuesta:
          "Depende de la formulación. Muchos requieren refrigeración para mantener la viabilidad de las bacterias. Sin embargo, algunas formulaciones modernas utilizan tecnologías de encapsulación o liofilización que permiten estabilidad a temperatura ambiente. Siempre sigue las instrucciones del fabricante.",
      },
      {
        pregunta: "¿Debo tomar probióticos durante un tratamiento con antibióticos?",
        respuesta:
          "Sí, pero sepáralos al menos 2-3 horas de la dosis de antibióticos. Los probióticos pueden reducir los efectos secundarios gastrointestinales y el riesgo de infección por C. difficile. Continúa tomándolos 1-2 semanas después de completar el tratamiento antibiótico.",
      },
    ],
    dosificacion: {
      general: "1-10 mil millones de UFC (unidades formadoras de colonias) diarias para mantenimiento",
      hombres: "Similar a la dosis general, ajustando según necesidades específicas",
      mujeres: "Similar a la dosis general, con posibles beneficios de cepas específicas para la salud vaginal",
    },
    momento_optimo:
      "Con o justo antes de una comida que contenga algo de grasa para mejorar la supervivencia a través del ácido estomacal",
    consejos_absorcion:
      "Los prebióticos (fibras fermentables) pueden mejorar la eficacia de los probióticos. Evitar bebidas muy calientes al tomarlos, ya que el calor puede matar las bacterias vivas",
    evidencia_cientifica: [
      "Meta-análisis han confirmado la eficacia de cepas específicas para reducir la duración de la diarrea infecciosa y prevenir la diarrea asociada a antibióticos",
      "Estudios clínicos muestran beneficios significativos de ciertos probióticos para síntomas del síndrome de intestino irritable",
      "Investigaciones emergentes sugieren efectos positivos sobre marcadores inflamatorios, salud mental y metabolismo",
    ],
  },
  {
    nombre: "Isoflavonas de Soja",
    descripcion:
      "Las isoflavonas de soja son fitoestrógenos naturales que pueden ayudar a aliviar los síntomas de la menopausia. Actúan como moduladores selectivos de los receptores de estrógeno, proporcionando efectos similares al estrógeno en algunos tejidos mientras antagonizan sus efectos en otros.",
    beneficios: [
      "Reduce significativamente los sofocos y sudores nocturnos",
      "Mejora la salud ósea y puede reducir el riesgo de osteoporosis",
      "Puede mejorar el perfil lipídico y la salud cardiovascular",
      "Alivia la sequedad vaginal y mejora la salud urogenital",
      "Puede mejorar el estado de ánimo y reducir la ansiedad durante la menopausia",
    ],
    efectos_secundarios: [
      "Molestias gastrointestinales leves en algunas personas",
      "Posibles cambios en el ciclo menstrual en mujeres premenopáusicas",
      "No recomendado para mujeres con antecedentes de cáncer hormono-dependiente sin supervisión médica",
    ],
    preguntas_frecuentes: [
      {
        pregunta: "¿Cuánto tiempo tardan en hacer efecto las isoflavonas de soja?",
        respuesta:
          "Los efectos sobre los sofocos generalmente comienzan a notarse después de 4-6 semanas de uso continuo, con beneficios máximos observados a las 12 semanas. Para efectos óseos, se requiere uso a largo plazo (mínimo 6 meses).",
      },
      {
        pregunta: "¿Son seguras las isoflavonas para todas las mujeres?",
        respuesta:
          "Son generalmente seguras para la mayoría de las mujeres. Sin embargo, aquellas con antecedentes de cáncer de mama o endometrio deben consultar con su médico antes de usarlas, ya que pueden tener efectos estrogénicos.",
      },
      {
        pregunta: "¿Puedo obtener isoflavonas solo de la dieta?",
        respuesta:
          "Sí, alimentos como tofu, tempeh, edamame y leche de soja son ricos en isoflavonas. Sin embargo, para efectos terapéuticos en menopausia, puede ser difícil alcanzar las dosis efectivas (40-80mg/día) solo con alimentos.",
      },
    ],
    dosificacion: {
      general: "40-80 mg de isoflavonas totales al día",
      mujeres: "50-100 mg al día para síntomas menopáusicos, divididos en 2 tomas",
    },
    momento_optimo: "Con las comidas para mejorar la absorción y reducir posibles molestias gastrointestinales",
    consejos_absorcion:
      "La absorción mejora cuando se toma con alimentos. La efectividad puede variar según la capacidad individual de producir equol (un metabolito activo de las isoflavonas)",
    evidencia_cientifica: [
      "Meta-análisis muestran reducción significativa en la frecuencia e intensidad de sofocos (20-50% de reducción)",
      "Estudios clínicos demuestran mejora en la densidad mineral ósea con uso a largo plazo",
      "Investigaciones sugieren beneficios cardiovasculares, incluyendo mejora en el perfil lipídico y función endotelial",
    ],
  },
  {
    nombre: "Cohosh Negro",
    descripcion:
      "El cohosh negro (Cimicifuga racemosa) es una hierba tradicionalmente utilizada por nativos americanos que ha demostrado eficacia en el alivio de síntomas menopáusicos. Su mecanismo de acción no es completamente estrogénico, lo que lo hace una opción para mujeres que no pueden usar terapia hormonal.",
    beneficios: [
      "Reduce efectivamente los sofocos y sudores nocturnos",
      "Mejora los trastornos del sueño asociados a la menopausia",
      "Alivia la irritabilidad y cambios de humor",
      "Puede reducir la ansiedad y síntomas depresivos leves",
      "Mejora la calidad de vida general durante la menopausia",
    ],
    efectos_secundarios: [
      "Molestias gastrointestinales ocasionales",
      "Dolor de cabeza en algunos casos",
      "Raramente, problemas hepáticos (se recomienda monitoreo en uso prolongado)",
      "Posibles interacciones con medicamentos para la presión arterial",
    ],
    preguntas_frecuentes: [
      {
        pregunta: "¿Es el cohosh negro una terapia hormonal?",
        respuesta:
          "No, el cohosh negro no contiene hormonas ni fitoestrógenos. Su mecanismo de acción parece involucrar neurotransmisores y no receptores de estrógeno, lo que lo hace seguro para mujeres con contraindicaciones para terapia hormonal.",
      },
      {
        pregunta: "¿Cuánto tiempo puedo tomar cohosh negro?",
        respuesta:
          "La mayoría de los estudios han evaluado su uso hasta por 6-12 meses. Para uso más prolongado, se recomienda supervisión médica y posibles análisis de función hepática periódicos.",
      },
      {
        pregunta: "¿Puedo combinarlo con otros suplementos para menopausia?",
        respuesta:
          "Sí, el cohosh negro se combina frecuentemente con isoflavonas de soja, vitamina D y calcio. Sin embargo, siempre consulte con un profesional de salud antes de combinar suplementos.",
      },
    ],
    dosificacion: {
      general: "20-40 mg de extracto estandarizado dos veces al día",
      mujeres: "40-80 mg al día del extracto estandarizado (2.5% de glucósidos triterpénicos)",
    },
    momento_optimo: "Con las comidas, preferiblemente mañana y noche para mantener niveles estables",
    consejos_absorcion:
      "Tomar con alimentos para minimizar molestias gastrointestinales. La consistencia en el horario de toma mejora la eficacia",
    evidencia_cientifica: [
      "Estudios clínicos muestran reducción del 26-50% en la frecuencia e intensidad de sofocos",
      "Investigaciones demuestran mejora significativa en escalas de calidad de vida menopáusica",
      "Evidencia de seguridad en uso a corto y mediano plazo (hasta 12 meses)",
    ],
  },
  {
    nombre: "Vitamina E",
    descripcion:
      "La vitamina E es un antioxidante liposoluble que puede ayudar con los síntomas vasomotores de la menopausia. Aunque su efecto es más modesto que otras opciones, es una alternativa segura para mujeres que buscan alivio natural de los sofocos.",
    descripcionesContextuales: {
      menopausia: "La vitamina E es un antioxidante liposoluble que puede ayudar con los síntomas vasomotores de la menopausia. Aunque su efecto es más modesto que otras opciones, es una alternativa segura para mujeres que buscan alivio natural de los sofocos.",
      salud_cardiovascular: "La vitamina E es un poderoso antioxidante que protege las células del daño oxidativo, especialmente importante para la salud cardiovascular. Ayuda a prevenir la oxidación del colesterol LDL, un factor clave en la prevención de enfermedades cardíacas.",
      cabello_piel_unas: "Como antioxidante liposoluble, la vitamina E protege las membranas celulares del daño oxidativo, mejorando la salud de la piel. Ayuda a mantener la hidratación cutánea y puede reducir los signos del envejecimiento.",
      general: "La vitamina E es un nutriente antioxidante esencial que protege las células del daño causado por los radicales libres. Apoya el sistema inmunológico, la salud de la piel y tiene propiedades antiinflamatorias.",
    },
    beneficios: [
      "Reduce la frecuencia e intensidad de sofocos leves a moderados",
      "Mejora la salud de la piel y reduce la sequedad",
      "Propiedades antioxidantes que protegen contra el estrés oxidativo",
      "Puede mejorar la lubricación vaginal",
      "Apoya la salud cardiovascular durante la menopausia",
    ],
    efectos_secundarios: [
      "Generalmente bien tolerada en dosis recomendadas",
      "Dosis altas pueden aumentar el riesgo de sangrado",
      "Posible interferencia con anticoagulantes",
      "Náuseas o diarrea en algunos casos",
    ],
    preguntas_frecuentes: [
      {
        pregunta: "¿Qué forma de vitamina E es mejor para la menopausia?",
        respuesta:
          "El d-alfa-tocoferol (forma natural) es preferible al dl-alfa-tocoferol (sintético). Los tocoferoles mixtos pueden proporcionar beneficios adicionales. Para síntomas menopáusicos, se prefiere la forma natural.",
      },
      {
        pregunta: "¿Puedo obtener suficiente vitamina E de los alimentos?",
        respuesta:
          "Alimentos como nueces, semillas, aceites vegetales y vegetales de hoja verde contienen vitamina E. Sin embargo, las dosis terapéuticas para síntomas menopáusicos (400-800 UI) son difíciles de alcanzar solo con dieta.",
      },
      {
        pregunta: "¿Es seguro tomar vitamina E a largo plazo?",
        respuesta:
          "Dosis de hasta 400 UI diarias son generalmente seguras para la mayoría de las personas. Dosis más altas requieren supervisión médica, especialmente en personas con condiciones de salud preexistentes.",
      },
    ],
    dosificacion: {
      general: "400-800 UI al día para síntomas menopáusicos",
      mujeres: "400 UI al día como dosis inicial, puede aumentarse a 800 UI si es necesario",
    },
    momento_optimo: "Con la comida principal del día para mejorar la absorción (es liposoluble)",
    consejos_absorcion:
      "Tomar con alimentos que contengan grasa para optimizar la absorción. Evitar tomar con suplementos de hierro ya que puede interferir con su absorción",
    evidencia_cientifica: [
      "Estudios muestran reducción modesta pero significativa en sofocos (1-2 menos por día)",
      "Evidencia de mejora en la sequedad vaginal y dispareunia",
      "Beneficios antioxidantes bien documentados que pueden proteger contra el envejecimiento acelerado post-menopausia",
    ],
  },
  {
    nombre: "Vitamina B12",
    descripcion:
      "La vitamina B12 (cobalamina) es esencial para la función neurológica, la formación de glóbulos rojos y la síntesis de ADN. Es particularmente importante para veganos y vegetarianos, ya que se encuentra principalmente en alimentos de origen animal. La deficiencia puede causar anemia megaloblástica y daño neurológico irreversible.",
    descripcionesContextuales: {
      energia_vitalidad: "La B12 es crucial para convertir los alimentos en energía celular y prevenir la fatiga. Su deficiencia es una causa común de cansancio crónico, especialmente en personas mayores o con dietas restrictivas.",
      bienestar_mental: "Esencial para la salud del sistema nervioso y la producción de neurotransmisores. Niveles bajos están asociados con depresión, problemas de memoria y deterioro cognitivo.",
      salud_cardiovascular: "Junto con folato y B6, la B12 ayuda a regular los niveles de homocisteína, un aminoácido que en niveles elevados aumenta el riesgo cardiovascular.",
    },
    beneficios: [
      "Previene la anemia megaloblástica y mejora la formación de glóbulos rojos",
      "Mantiene la salud del sistema nervioso y previene neuropatías",
      "Mejora los niveles de energía y reduce la fatiga",
      "Apoya la función cognitiva y la memoria",
      "Ayuda a regular los niveles de homocisteína",
      "Esencial para la síntesis de ADN y división celular",
    ],
    efectos_secundarios: [
      "Muy segura incluso en dosis altas (no tóxica)",
      "Posible acné en algunas personas con megadosis",
      "Raramente: reacciones alérgicas a formas específicas",
    ],
    preguntas_frecuentes: [
      {
        pregunta: "¿Cuál es la mejor forma de vitamina B12?",
        respuesta:
          "Las formas más activas son metilcobalamina y adenosilcobalamina. La cianocobalamina es más económica y estable, pero requiere conversión en el cuerpo. Para deficiencias severas, las inyecciones pueden ser necesarias inicialmente.",
      },
      {
        pregunta: "¿Quién tiene mayor riesgo de deficiencia de B12?",
        respuesta:
          "Veganos y vegetarianos (falta en dieta), adultos mayores de 50 años (menor absorción), personas con cirugía gástrica o intestinal, usuarios de metformina o inhibidores de bomba de protones, y personas con anemia perniciosa.",
      },
      {
        pregunta: "¿Por qué es tan importante la B12 para veganos?",
        respuesta:
          "La B12 se encuentra casi exclusivamente en productos animales. Sin suplementación, los veganos desarrollarán deficiencia que puede causar daño neurológico permanente. Es el único suplemento absolutamente esencial para veganos.",
      },
      {
        pregunta: "¿Puedo tomar demasiada B12?",
        respuesta:
          "La B12 es hidrosoluble y no se ha establecido un límite superior de ingesta. El exceso se elimina por la orina. Incluso dosis de 1000-2000 mcg diarios son seguras y se usan para tratar deficiencias.",
      },
    ],
    dosificacion: {
      general: "250-1000 mcg diarios para mantenimiento, 1000-2000 mcg para deficiencia",
      hombres: "250-500 mcg diarios para prevención, dosis más altas si hay deficiencia",
      mujeres: "250-500 mcg diarios, puede aumentar durante embarazo y lactancia",
    },
    momento_optimo: "Puede tomarse en cualquier momento del día, con o sin alimentos",
    consejos_absorcion:
      "La absorción oral es limitada (1-2% del total). Formas sublinguales pueden mejorar la absorción. En deficiencias severas o problemas de absorción, considerar inyecciones intramusculares",
    evidencia_cientifica: [
      "Múltiples estudios confirman que la suplementación con B12 revierte completamente la anemia megaloblástica",
      "Investigaciones demuestran que niveles adecuados de B12 son esenciales para prevenir el deterioro cognitivo en adultos mayores",
      "Evidencia sólida de que la B12 junto con folato reduce los niveles de homocisteína, disminuyendo el riesgo cardiovascular",
    ],
    productosMercadoLibre: [
      {
        marca: "Star Nutrition B12 60 caps",
        url: "https://articulo.mercadolibre.com.uy/MLU-629854321-star-nutrition-vitamina-b12-60-capsulas",
        precio: 590,
        disponible: true
      },
      {
        marca: "Now Foods B12 5000mcg 60 lozenges",
        url: "https://articulo.mercadolibre.com.uy/MLU-478965432-now-foods-b12-5000-mcg-60-tabletas-sublinguales",
        precio: 1490,
        disponible: true
      },
      {
        marca: "Universal B Complex + B12",
        url: "https://articulo.mercadolibre.com.uy/MLU-642178965-universal-b-complex-vitamina-b12-100-tabletas",
        precio: 890,
        disponible: true
      }
    ],
  },
  {
    nombre: "Complejo B",
    descripcion:
      "El complejo B incluye ocho vitaminas hidrosolubles esenciales que trabajan sinérgicamente: B1 (tiamina), B2 (riboflavina), B3 (niacina), B5 (ácido pantoténico), B6 (piridoxina), B7 (biotina), B9 (folato) y B12 (cobalamina). Estas vitaminas son fundamentales para el metabolismo energético, la función nerviosa y la salud celular.",
    descripcionesContextuales: {
      energia_vitalidad: "Las vitaminas B son cofactores esenciales en la producción de energía celular. Convierten carbohidratos, grasas y proteínas en ATP, la moneda energética del cuerpo. Un déficit en cualquier vitamina B puede causar fatiga persistente.",
      bienestar_mental: "Las vitaminas B son cruciales para la síntesis de neurotransmisores como serotonina, dopamina y GABA. Niveles óptimos apoyan el estado de ánimo, reducen el estrés y mejoran la función cognitiva.",
      reduccion_estres: "Durante períodos de estrés, el cuerpo consume vitaminas B más rápidamente. La suplementación puede ayudar a mantener la resiliencia al estrés y prevenir el agotamiento nervioso.",
    },
    beneficios: [
      "Mejora los niveles de energía y reduce la fatiga crónica",
      "Apoya la función del sistema nervioso y la salud mental",
      "Esencial para el metabolismo de macronutrientes",
      "Promueve la salud de piel, cabello y uñas",
      "Ayuda en la formación de glóbulos rojos",
      "Apoya la función inmunológica",
      "Puede reducir los síntomas de estrés y ansiedad",
    ],
    efectos_secundarios: [
      "Orina de color amarillo brillante (por la riboflavina, inofensivo)",
      "Posible malestar estomacal si se toma con el estómago vacío",
      "Rubor facial temporal con dosis altas de niacina",
    ],
    preguntas_frecuentes: [
      {
        pregunta: "¿Por qué tomar un complejo B en lugar de vitaminas B individuales?",
        respuesta:
          "Las vitaminas B trabajan mejor en conjunto. Tomar una sola en dosis altas puede crear desequilibrios. Un complejo B balanceado asegura que todas trabajen sinérgicamente, como ocurre en la naturaleza.",
      },
      {
        pregunta: "¿El complejo B me dará energía inmediata?",
        respuesta:
          "No es un estimulante como la cafeína. Las vitaminas B ayudan a tu cuerpo a producir energía de los alimentos más eficientemente. Si tienes deficiencia, notarás mejora en energía en días o semanas.",
      },
      {
        pregunta: "¿Es normal que mi orina sea amarilla brillante?",
        respuesta:
          "Sí, es completamente normal y se debe a la riboflavina (B2). Indica que tu cuerpo está absorbiendo las vitaminas y eliminando el exceso. No es señal de desperdicio, es el proceso normal.",
      },
    ],
    dosificacion: {
      general: "1 cápsula de complejo B-50 o B-100 al día (50mg o 100mg de la mayoría de vitaminas B)",
      hombres: "Complejo B-50 o B-100 diario, puede aumentar durante períodos de estrés",
      mujeres: "Complejo B-50 diario, B-100 durante embarazo o alta demanda",
    },
    momento_optimo: "Por la mañana con el desayuno para aprovechar el apoyo energético durante el día",
    consejos_absorcion:
      "Tomar con alimentos para mejorar la absorción y prevenir molestias estomacales. Las vitaminas B son hidrosolubles, por lo que el exceso se elimina en la orina",
    evidencia_cientifica: [
      "Estudios muestran que el complejo B puede reducir los síntomas de estrés y mejorar el estado de ánimo en adultos sanos",
      "Investigaciones confirman que las vitaminas B son esenciales para mantener niveles óptimos de energía y prevenir la fatiga",
      "Evidencia de que la suplementación con complejo B puede mejorar la función cognitiva y reducir el riesgo de deterioro mental",
    ],
  },
  {
    nombre: "Hierro",
    descripcion:
      "El hierro es un mineral esencial para la producción de hemoglobina, la proteína en los glóbulos rojos que transporta oxígeno por todo el cuerpo. La deficiencia de hierro es la carencia nutricional más común en el mundo y puede causar anemia, fatiga extrema y problemas cognitivos.",
    descripcionesContextuales: {
      energia_vitalidad: "El hierro es fundamental para el transporte de oxígeno a todas las células del cuerpo. Sin hierro adecuado, las células no pueden producir energía eficientemente, resultando en fatiga profunda y debilidad.",
      rendimiento_deportivo: "Los atletas, especialmente corredores y mujeres, tienen mayor riesgo de deficiencia de hierro. El hierro adecuado es crucial para el rendimiento aeróbico y la recuperación muscular.",
      salud_femenina: "Las mujeres en edad reproductiva tienen mayores necesidades de hierro debido a las pérdidas menstruales. La deficiencia es especialmente común en mujeres con menstruaciones abundantes.",
    },
    beneficios: [
      "Previene y trata la anemia ferropénica",
      "Mejora significativamente los niveles de energía y reduce la fatiga",
      "Apoya la función cognitiva y la concentración",
      "Esencial para el sistema inmunológico",
      "Mejora el rendimiento físico y la resistencia",
      "Importante para el crecimiento y desarrollo",
    ],
    efectos_secundarios: [
      "Estreñimiento (el más común)",
      "Náuseas o malestar estomacal",
      "Heces de color oscuro (normal e inofensivo)",
      "Sabor metálico en la boca",
    ],
    preguntas_frecuentes: [
      {
        pregunta: "¿Cuáles son las mejores formas de hierro?",
        respuesta:
          "El bisglicinato de hierro es la forma mejor tolerada con menos efectos secundarios. El sulfato ferroso es efectivo pero puede causar más molestias digestivas. El hierro hemo (de origen animal) se absorbe mejor pero no es apto para vegetarianos.",
      },
      {
        pregunta: "¿Por qué el hierro causa estreñimiento?",
        respuesta:
          "El hierro no absorbido en el intestino puede causar estreñimiento. Las formas queladas como el bisglicinato causan menos problemas. Aumentar la fibra, agua y considerar un ablandador de heces puede ayudar.",
      },
      {
        pregunta: "¿Debo tomar hierro si no tengo anemia?",
        respuesta:
          "Solo si tienes deficiencia confirmada por análisis de sangre (ferritina baja). El exceso de hierro puede ser perjudicial. Mujeres con menstruaciones abundantes, vegetarianos y atletas pueden beneficiarse de suplementación preventiva.",
      },
      {
        pregunta: "¿Por qué no debo tomar hierro con café o té?",
        respuesta:
          "Los taninos en el café y té pueden reducir la absorción de hierro hasta en un 60%. Es mejor esperar al menos 1-2 horas entre el consumo de estas bebidas y el suplemento de hierro.",
      },
    ],
    dosificacion: {
      general: "18-27 mg de hierro elemental al día para prevención, 50-100 mg para tratar deficiencia",
      hombres: "8-10 mg diarios (raramente necesitan suplementación unless hay pérdida de sangre)",
      mujeres: "18 mg diarios (premenopáusicas), 8 mg (postmenopáusicas), 27 mg (embarazo)",
    },
    momento_optimo: "Con el estómago vacío para mejor absorción (si se tolera), o con alimentos si causa molestias",
    consejos_absorcion:
      "La vitamina C mejora dramáticamente la absorción - tomar con jugo de naranja. Evitar tomar con calcio, café, té o antiácidos. Separar de otros minerales por 2 horas",
    evidencia_cientifica: [
      "Estudios confirman que la suplementación con hierro revierte completamente la anemia ferropénica en 2-3 meses",
      "Investigaciones muestran mejoras significativas en fatiga, función cognitiva y calidad de vida con la corrección de deficiencia de hierro",
      "Evidencia de que incluso la deficiencia de hierro sin anemia puede causar fatiga y beneficiarse de suplementación",
    ],
    productosMercadoLibre: [
      {
        marca: "Solgar Gentle Iron 25mg 90 cápsulas",
        url: "https://articulo.mercadolibre.com.uy/MLU-478833006",
        precio: 1290,
        disponible: true
      },
      {
        marca: "Solgar Gentle Iron 25mg",
        url: "https://articulo.mercadolibre.com.uy/MLU-614094873",
        precio: 1290,
        disponible: true
      },
      {
        marca: "Now Foods Iron 18mg 120 vcaps",
        url: "https://articulo.mercadolibre.com.uy/MLU-477714849",
        precio: 990,
        disponible: true
      }
    ],
  },
  {
    nombre: "Coenzima Q10",
    descripcion:
      "La coenzima Q10 (CoQ10) es un compuesto similar a las vitaminas que se encuentra en todas las células del cuerpo. Es esencial para la producción de energía celular (ATP) y actúa como un potente antioxidante. Los niveles de CoQ10 disminuyen con la edad y pueden verse reducidos por ciertos medicamentos, especialmente las estatinas.",
    descripcionesContextuales: {
      salud_cardiovascular: "La CoQ10 es especialmente importante para la salud del corazón, ya que este órgano tiene altas demandas energéticas. Puede ayudar a mejorar la función cardíaca, reducir la presión arterial y proteger contra el daño oxidativo. Es particularmente beneficiosa para personas que toman estatinas, ya que estos medicamentos reducen los niveles de CoQ10.",
      energia: "Como componente clave en la producción de ATP, la CoQ10 puede ayudar a reducir la fatiga y mejorar los niveles de energía, especialmente en personas mayores o con condiciones que afectan la producción de energía celular.",
    },
    beneficios: [
      "Mejora la producción de energía celular",
      "Potente antioxidante que protege contra el daño oxidativo",
      "Puede mejorar la función cardíaca y reducir la presión arterial",
      "Ayuda a reducir los efectos secundarios de las estatinas",
      "Puede mejorar el rendimiento durante el ejercicio",
      "Posibles beneficios para la salud de la piel"
    ],
    efectos_secundarios: [
      "Generalmente bien tolerada",
      "Puede causar molestias gastrointestinales leves en algunos casos",
      "Posible insomnio si se toma tarde en el día"
    ],
    preguntas_frecuentes: [
      {
        pregunta: "¿Cuál es la diferencia entre ubiquinona y ubiquinol?",
        respuesta:
          "La ubiquinona es la forma oxidada de CoQ10, mientras que el ubiquinol es la forma reducida (activa). El ubiquinol se absorbe mejor, especialmente en personas mayores, pero es más costoso. El cuerpo puede convertir entre ambas formas."
      },
      {
        pregunta: "¿Por qué es importante para quienes toman estatinas?",
        respuesta:
          "Las estatinas bloquean la misma vía que produce CoQ10 en el cuerpo, lo que puede llevar a deficiencia. Esto puede causar dolores musculares y fatiga. La suplementación con CoQ10 puede ayudar a prevenir estos efectos secundarios."
      }
    ],
    dosificacion: {
      general: "100-200 mg diarios para mantenimiento",
      hombres: "100-300 mg diarios, hasta 600 mg para condiciones específicas",
      mujeres: "100-200 mg diarios, puede aumentar con la edad"
    },
    momento_optimo: "Con las comidas principales para mejorar la absorción (es liposoluble)",
    consejos_absorcion:
      "Tomar con alimentos que contengan grasas mejora significativamente la absorción. Las formas en softgel o emulsionadas tienen mejor biodisponibilidad",
    evidencia_cientifica: [
      "Estudios han demostrado mejoras en la función cardíaca en pacientes con insuficiencia cardíaca",
      "Investigaciones muestran reducción de dolores musculares asociados con estatinas",
      "Evidencia de mejora en los niveles de energía en personas con fatiga crónica"
    ],
    productosMercadoLibre: [
      {
        marca: "Now Foods CoQ10 100mg 50 cápsulas",
        url: "https://articulo.mercadolibre.com.uy/MLU-689026033",
        precio: 1399,
        disponible: true
      },
      {
        marca: "Now Foods CoQ10 100mg 30 cápsulas",
        url: "https://articulo.mercadolibre.com.uy/MLU-689026027",
        precio: 1199,
        disponible: true
      },
      {
        marca: "Now Foods CoQ10 400mg 60 Softgels",
        url: "https://articulo.mercadolibre.com.uy/MLU-689026041",
        precio: 3799,
        disponible: true
      }
    ],
  },
  {
    nombre: "NAC (N-Acetil Cisteína)",
    descripcion:
      "La N-Acetil Cisteína (NAC) es una forma modificada del aminoácido cisteína. Es precursor del glutatión, el antioxidante más importante del cuerpo. NAC tiene propiedades mucolíticas, antioxidantes y desintoxicantes, y se ha utilizado durante décadas en medicina para diversas condiciones.",
    descripcionesContextuales: {
      salud_respiratoria: "NAC es especialmente conocida por su capacidad para romper el moco, haciéndola útil para condiciones respiratorias. También puede proteger los pulmones del daño oxidativo y la inflamación.",
      desintoxicacion: "Como precursor del glutatión, NAC apoya los procesos naturales de desintoxicación del hígado. Es el tratamiento estándar para la sobredosis de acetaminofén (paracetamol).",
      salud_mental: "Investigaciones emergentes sugieren que NAC puede tener beneficios para ciertos trastornos psiquiátricos y conductas compulsivas al modular los niveles de glutamato en el cerebro."
    },
    beneficios: [
      "Potente antioxidante y precursor del glutatión",
      "Ayuda a romper el moco en condiciones respiratorias",
      "Apoya la desintoxicación hepática",
      "Puede ayudar con conductas compulsivas y adicciones",
      "Protección contra el daño oxidativo",
      "Posibles beneficios para la salud mental"
    ],
    efectos_secundarios: [
      "Puede causar náuseas o molestias gastrointestinales",
      "Olor desagradable (sulfuroso) en algunas formas",
      "Raramente puede causar dolor de cabeza o mareos"
    ],
    preguntas_frecuentes: [
      {
        pregunta: "¿Por qué NAC fue restringida en algunos países?",
        respuesta:
          "En algunos países como Estados Unidos, la FDA ha cuestionado su venta como suplemento debido a que fue aprobada primero como medicamento. Sin embargo, sigue disponible en muchos lugares y es ampliamente utilizada."
      },
      {
        pregunta: "¿Puede NAC ayudar con el COVID-19?",
        respuesta:
          "Algunos estudios sugieren que NAC podría ayudar a reducir la severidad de infecciones respiratorias debido a sus propiedades antioxidantes y mucolíticas, pero se necesita más investigación específica."
      }
    ],
    dosificacion: {
      general: "600-1200 mg diarios, divididos en 2-3 tomas",
      hombres: "600-1800 mg diarios según la condición",
      mujeres: "600-1200 mg diarios"
    },
    momento_optimo: "Con el estómago vacío para mejor absorción, o con alimentos si causa molestias",
    consejos_absorcion:
      "Mejor absorción con el estómago vacío. Si causa molestias, tomar con alimentos. Evitar tomar con productos lácteos",
    evidencia_cientifica: [
      "Estudios clínicos han demostrado eficacia en condiciones respiratorias crónicas",
      "Investigaciones muestran beneficios en trastornos compulsivos y adicciones",
      "Evidencia sólida como tratamiento para intoxicación por paracetamol"
    ],
    productosMercadoLibre: [
      {
        marca: "Now Foods NAC 600mg 100 vcaps",
        url: "https://articulo.mercadolibre.com.uy/MLU-477657392",
        precio: 1890,
        disponible: true
      },
      {
        marca: "Life Extension NAC 600mg 60 caps",
        url: "https://articulo.mercadolibre.com.uy/MLU-642789456",
        precio: 1690,
        disponible: false
      },
      {
        marca: "Jarrow Formulas NAC Sustain 600mg",
        url: "https://articulo.mercadolibre.com.uy/MLU-478951234",
        precio: 2290,
        disponible: false
      }
    ],
  },
  {
    nombre: "Ashwagandha",
    descripcion:
      "La ashwagandha (Withania somnifera) es una hierba adaptógena utilizada en la medicina ayurvédica durante miles de años. Es conocida por su capacidad para ayudar al cuerpo a manejar el estrés, mejorar la energía y promover el equilibrio general. Los extractos modernos están estandarizados para contener withanólidos, sus compuestos activos.",
    descripcionesContextuales: {
      estres_ansiedad: "La ashwagandha es especialmente valorada por su capacidad para reducir los niveles de cortisol y ayudar con el estrés crónico y la ansiedad. Múltiples estudios han demostrado reducciones significativas en los síntomas de ansiedad.",
      rendimiento_deportivo: "Puede mejorar la fuerza muscular, la resistencia y la recuperación. También se ha demostrado que aumenta los niveles de testosterona en hombres y mejora la composición corporal.",
      salud_hormonal: "Ayuda a equilibrar las hormonas del estrés y puede mejorar la función tiroidea. En hombres, puede aumentar la testosterona y mejorar la fertilidad."
    },
    beneficios: [
      "Reduce significativamente los niveles de cortisol y estrés",
      "Mejora los síntomas de ansiedad y depresión leve",
      "Puede aumentar la testosterona y mejorar la fertilidad masculina",
      "Mejora la fuerza muscular y la resistencia",
      "Apoya la función cognitiva y la memoria",
      "Puede mejorar la calidad del sueño"
    ],
    efectos_secundarios: [
      "Generalmente bien tolerada",
      "Puede causar somnolencia en algunas personas",
      "Molestias gastrointestinales leves en dosis altas",
      "Puede afectar la función tiroidea (monitorear si hay condiciones tiroideas)"
    ],
    preguntas_frecuentes: [
      {
        pregunta: "¿Cuál es la diferencia entre KSM-66 y Sensoril?",
        respuesta:
          "KSM-66 y Sensoril son extractos patentados de ashwagandha. KSM-66 usa solo la raíz y tiene 5% de withanólidos, mientras que Sensoril usa raíz y hojas con 10% de withanólidos. KSM-66 es más energizante, Sensoril más relajante."
      },
      {
        pregunta: "¿Puede tomarse a largo plazo?",
        respuesta:
          "Sí, la ashwagandha es generalmente segura para uso a largo plazo. Sin embargo, algunos expertos recomiendan hacer pausas periódicas (por ejemplo, 8 semanas de uso, 2 semanas de descanso) para mantener la efectividad."
      }
    ],
    dosificacion: {
      general: "300-600 mg de extracto estandarizado (5% withanólidos) diarios",
      hombres: "600-1000 mg diarios para beneficios en testosterona y rendimiento",
      mujeres: "300-600 mg diarios"
    },
    momento_optimo: "Por la mañana para energía, o por la noche para mejorar el sueño, dependiendo del efecto individual",
    consejos_absorcion:
      "Puede tomarse con o sin alimentos. La absorción mejora ligeramente con grasas. Para ansiedad aguda, puede tomarse según necesidad",
    evidencia_cientifica: [
      "Múltiples estudios clínicos han demostrado reducciones del 30-40% en los niveles de cortisol",
      "Investigaciones muestran mejoras significativas en los síntomas de ansiedad y estrés",
      "Estudios en hombres muestran aumentos en testosterona y mejoras en la fertilidad"
    ],
    productosMercadoLibre: [
      {
        marca: "KSM-66 Ashwagandha Extracto de Raíz",
        url: "https://articulo.mercadolibre.com.uy/MLU-662233560",
        precio: 2490,
        disponible: true
      },
      {
        marca: "Nootropics Depot KSM-66 Ashwagandha",
        url: "https://articulo.mercadolibre.com.uy/MLU-600666698",
        precio: 3290,
        disponible: true
      },
      {
        marca: "Pure Ashwagandha 1200mg 60 capsules",
        url: "https://articulo.mercadolibre.com.uy/MLU-706082416",
        precio: 1490,
        disponible: true
      }
    ],
  }
]

// Información actualizada sobre cuándo los BCAAs son realmente útiles
export const notaSobreBCAAs = `
# Uso apropiado de BCAAs según la evidencia científica actual

Los Aminoácidos de Cadena Ramificada (BCAAs) han sido populares en el mundo del fitness, pero la evidencia científica ha clarificado cuándo son realmente útiles y cuándo son innecesarios.

## Cuándo NO necesitas BCAAs

1. **Si consumes proteína de suero**: La proteína de suero ya contiene altos niveles de BCAAs (especialmente leucina). Añadir BCAAs adicionales es redundante y no mejora los resultados.

2. **Si consumes suficiente proteína animal**: Las carnes, huevos y lácteos proporcionan todos los aminoácidos esenciales en proporciones óptimas.

3. **Si tu ingesta proteica total es adecuada**: Con 1.6-2.2g/kg de peso corporal de proteína completa, los BCAAs adicionales no ofrecen beneficios.

## Cuándo SÍ pueden ser útiles los BCAAs

1. **Intolerancia a la lactosa + objetivos de ganancia muscular**: Si no puedes consumir proteína de suero debido a intolerancia a la lactosa, los BCAAs pueden ser una alternativa parcial (aunque incompleta) para obtener aminoácidos clave para el músculo.

2. **Como complemento a proteínas vegetales**: Las proteínas de soja y guisante, aunque son de alta calidad, tienen menor contenido de leucina que las proteínas animales. Añadir 5-10g de BCAAs puede optimizar el estímulo para la síntesis de proteínas musculares.

3. **Durante ayunos prolongados con entrenamiento**: En situaciones muy específicas donde entrenas en ayunas y no puedes consumir proteína completa, los BCAAs pueden ayudar a reducir el catabolismo muscular.

## Recomendaciones basadas en evidencia

- **Para veganos/vegetarianos**: Combinar proteína vegetal (soja/guisante) con 5-10g de BCAAs alrededor del entrenamiento.
- **Para intolerantes a la lactosa**: Considerar BCAAs como alternativa parcial, aunque las proteínas vegetales serían una opción más completa.
- **Para omnívoros con acceso a proteína de suero**: No se necesitan BCAAs adicionales.

## Conclusión

Los BCAAs tienen un nicho específico en la suplementación moderna: complementar proteínas vegetales o servir como alternativa para quienes no pueden consumir proteínas lácteas. Para la mayoría de las personas, una proteína completa es superior y más costo-efectiva.
`

// Función auxiliar para encontrar un suplemento por nombre
export const encontrarSuplementoPorNombre = (nombre: string): DatosSuplemento | undefined => {
  return suplementosExamineFinal.find((suplemento) => suplemento.nombre.toLowerCase() === nombre.toLowerCase())
}

// Función auxiliar para encontrar suplementos por objetivo de salud
export const encontrarSuplementosPorObjetivoSalud = (objetivoSalud: string): DatosSuplemento[] => {
  const palabrasClave = obtenerPalabrasClavePorObjetivo(objetivoSalud)

  // Lista de suplementos a excluir de búsqueda por palabras clave
  // Estos serán manejados específicamente en el servicio de recomendaciones
  const suplementosExcluidos = ["Proteína de Suero", "Aminoácidos de Cadena Ramificada", "BCAA Vegano"]

  // Filtro inicial basado en coincidencia de palabras clave en beneficios
  const suplementosCoincidentes = suplementosExamineFinal.filter((suplemento) => {
    // Excluir suplementos de la lista de exclusión
    if (suplementosExcluidos.includes(suplemento.nombre)) {
      return false
    }
    return suplemento.beneficios.some((beneficio) =>
      palabrasClave.some((palabraClave) => beneficio.toLowerCase().includes(palabraClave.toLowerCase())),
    )
  })

  // Obtener mapeos directos para este objetivo
  const mapeoDirecto = obtenerMapeoDirectoSuplementos()[objetivoSalud] || []
  console.log(`Mapeo directo para ${objetivoSalud}:`, mapeoDirecto)

  // Encontrar suplementos por mapeo directo
  const suplementosMapeoDirecto = mapeoDirecto
    .map((nombre) => {
      const encontrado = suplementosExamineFinal.find((supl) => supl.nombre.toLowerCase() === nombre.toLowerCase())
      if (!encontrado) {
        console.log(`No se encontró el suplemento: ${nombre}`)
      }
      return encontrado
    })
    .filter(Boolean) as DatosSuplemento[]

  // Combinar y eliminar duplicados
  const resultado = [...new Set([...suplementosCoincidentes, ...suplementosMapeoDirecto])]
  console.log(`Suplementos finales para ${objetivoSalud}:`, resultado.map(s => s.nombre))
  return resultado
}

// Reemplazar la función obtenerMapeoDirectoSuplementos actual con esta versión actualizada
// NOTA: NO incluir ambas versiones (vegana y no vegana) del mismo suplemento
function obtenerMapeoDirectoSuplementos(): Record<string, string[]> {
  return {
    "ganancia-muscular": ["Creatina", "Beta-Alanina", "HMB"],
    "perdida-peso": ["Extracto de Té Verde", "Glucomanano", "CLA"],
    "apoyo-inmune": ["Vitamina C", "Vitamina D", "Zinc", "Saúco", "Equinácea"],
    "reduccion-estres": ["Ashwagandha", "Magnesio", "L-Teanina", "Rhodiola Rosea", "Valeriana"],
    "aumento-energia": ["Vitaminas B", "CoQ10", "Hierro", "Ginseng"],
    "mejor-sueno": ["Melatonina", "Magnesio", "L-Teanina", "Valeriana", "Glicina"],
    "salud-articular": ["Glucosamina", "Condroitina", "MSM", "Colágeno", "Cúrcuma"],
    "salud-cardiovascular": ["Omega-3 (EPA y DHA)", "CoQ10", "Extracto de Ajo", "Fibra", "Esteroles Vegetales"],
    "salud-digestiva": ["Probióticos", "Prebióticos", "Enzimas Digestivas", "Jengibre", "L-Glutamina"],
    "microbiota-intestinal": ["Probióticos", "Prebióticos", "Inulina", "Alimentos Fermentados", "Cáscara de Psyllium"],
    "funcion-cerebral": ["Omega-3 (EPA y DHA)", "Ginkgo Biloba", "Bacopa Monnieri", "Melena de León", "Fosfatidilserina"],
    "cabello-piel-unas": ["Biotina", "Colágeno", "Vitamina E", "Zinc", "Sílice"],
    "equilibrio-hormonal": ["Vitamina D", "Ashwagandha", "Maca", "Magnesio", "Zinc"],
    "salud-osea": ["Calcio", "Vitamina D", "Vitamina K2", "Magnesio", "Colágeno"],
    "menopausia": ["Isoflavonas de Soja", "Cohosh Negro", "Vitamina D", "Calcio", "Magnesio", "Vitamina E", "Omega-3 (EPA y DHA)", "Colágeno"],
  }
}

// Mapear objetivos de salud a palabras clave relevantes
const obtenerPalabrasClavePorObjetivo = (objetivoSalud: string): string[] => {
  const mapaObjetivosSalud: Record<string, string[]> = {
    "ganancia-muscular": ["músculo", "fuerza", "proteína", "recuperación", "ejercicio", "entrenamiento"],
    "perdida-peso": ["peso", "grasa", "metabolismo", "apetito", "obesidad"],
    "apoyo-inmune": ["inmune", "infección", "defensa", "resistencia"],
    "reduccion-estres": ["estrés", "ansiedad", "estado de ánimo", "relajación", "sueño"],
    "aumento-energia": ["energía", "fatiga", "rendimiento", "resistencia"],
    "mejor-sueno": ["sueño", "insomnio", "melatonina", "descanso"],
    "salud-articular": ["articulación", "artritis", "inflamación", "dolor"],
    "salud-cardiovascular": ["corazón", "cardiovascular", "colesterol", "presión arterial"],
    "salud-digestiva": ["digestivo", "intestinal", "digestión", "probiótico"],
    "microbiota-intestinal": [
      "microbioma",
      "probióticos",
      "prebióticos",
      "flora intestinal",
      "bacterias",
      "fermentados",
    ],
    "funcion-cerebral": ["cerebro", "cognitivo", "memoria", "concentración", "enfoque"],
    "cabello-piel-unas": ["cabello", "piel", "uñas", "belleza"],
    "equilibrio-hormonal": ["hormona", "testosterona", "estrógeno", "equilibrio"],
    "salud-osea": ["hueso", "óseo", "densidad", "osteoporosis", "fractura", "calcio"],
    "menopausia": ["menopausia", "sofocos", "bochornos", "climaterio", "hormonal", "estrógeno", "transición"],
  }

  return mapaObjetivosSalud[objetivoSalud] || []
}

// Obtener recomendaciones específicas por género
export const obtenerConsejoEspecificoGenero = (suplemento: DatosSuplemento, genero: "hombre" | "mujer"): string => {
  // Buscar información específica de género en la dosificación
  if (suplemento.dosificacion) {
    if (genero === "hombre" && suplemento.dosificacion.hombres) {
      return `Dosificación recomendada para hombres: ${suplemento.dosificacion.hombres}`
    } else if (genero === "mujer" && suplemento.dosificacion.mujeres) {
      return `Dosificación recomendada para mujeres: ${suplemento.dosificacion.mujeres}`
    }
  }

  // Buscar en preguntas frecuentes información específica de género
  const palabrasClaveGenero =
    genero === "hombre"
      ? ["hombre", "hombres", "masculino", "testosterona"]
      : ["mujer", "mujeres", "femenino", "estrógeno", "menopausia", "menstrual"]

  // Revisar preguntas frecuentes para información específica de género
  for (const pregunta of suplemento.preguntas_frecuentes) {
    if (
      palabrasClaveGenero.some(
        (palabra) =>
          pregunta.pregunta.toLowerCase().includes(palabra.toLowerCase()) ||
          pregunta.respuesta.toLowerCase().includes(palabra.toLowerCase()),
      )
    ) {
      return pregunta.respuesta
    }
  }

  // Si no se encuentra información específica de género
  return `No se encontró información específica de dosificación para ${genero === "hombre" ? "hombres" : "mujeres"} para ${suplemento.nombre}. Sigue las pautas generales de dosificación y consulta con un profesional de la salud.`
}

// Encontrar información sobre el momento óptimo
export const obtenerInfoMomentoOptimo = (suplemento: DatosSuplemento): string => {
  if (suplemento.momento_optimo) {
    return suplemento.momento_optimo
  }

  const palabrasClaveTiempo = [
    "momento",
    "cuándo tomar",
    "tiempo óptimo",
    "antes",
    "después",
    "comida",
    "mañana",
    "noche",
  ]

  // Revisar preguntas frecuentes para información sobre el momento óptimo
  for (const pregunta of suplemento.preguntas_frecuentes) {
    if (
      palabrasClaveTiempo.some(
        (palabra) =>
          pregunta.pregunta.toLowerCase().includes(palabra.toLowerCase()) ||
          pregunta.respuesta.toLowerCase().includes(palabra.toLowerCase()),
      )
    ) {
      return pregunta.respuesta
    }
  }

  // Si no se encuentra información específica sobre el momento óptimo
  return `No se encontró información específica sobre el momento óptimo para tomar ${suplemento.nombre}. Para la mayoría de los suplementos, tomarlos con alimentos puede mejorar la absorción y reducir las molestias estomacales.`
}

// Encontrar información sobre mejora de absorción
export const obtenerInfoAbsorcion = (suplemento: DatosSuplemento): string => {
  if (suplemento.consejos_absorcion) {
    return suplemento.consejos_absorcion
  }

  const palabrasClaveAbsorcion = ["absorción", "biodisponibilidad", "mejorar", "grasa", "agua", "soluble"]

  // Revisar preguntas frecuentes para información sobre absorción
  for (const pregunta of suplemento.preguntas_frecuentes) {
    if (
      palabrasClaveAbsorcion.some(
        (palabra) =>
          pregunta.pregunta.toLowerCase().includes(palabra.toLowerCase()) ||
          pregunta.respuesta.toLowerCase().includes(palabra.toLowerCase()),
      )
    ) {
      return pregunta.respuesta
    }
  }

  // Si no se encuentra información específica sobre absorción
  return `No se encontró información específica sobre mejora de absorción para ${suplemento.nombre}. Muchos suplementos se absorben mejor cuando se toman con una comida que contiene grasas saludables.`
}

// Verificar si un suplemento es apropiado para la edad del usuario
export const verificarSuplementosApropiadosEdad = (
  suplemento: DatosSuplemento,
  edad: number,
): {
  esApropiado: boolean
  advertencias: string[]
} => {
  const advertencias: string[] = []

  // Definir advertencias específicas por edad para suplementos
  const advertenciasEdad: Record<string, Record<string, string[]>> = {
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
    Cafeína: {
      "menores-18": ["Los adolescentes deben limitar el consumo de cafeína"],
      "65+": ["Los adultos mayores pueden ser más sensibles a los efectos de la cafeína"],
    },
  }

  // Verificar si hay advertencias para este suplemento
  const advertenciasSuplemento = advertenciasEdad[suplemento.nombre]
  if (advertenciasSuplemento) {
    // Verificar rangos de edad
    if (edad >= 65 && advertenciasSuplemento["65+"]) {
      advertencias.push(...advertenciasSuplemento["65+"])
    } else if (edad < 18 && advertenciasSuplemento["menores-18"]) {
      advertencias.push(...advertenciasSuplemento["menores-18"])
    }
  }

  return {
    esApropiado: advertencias.length === 0,
    advertencias,
  }
}

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
      "⚠️ MODERADA: Dosis altas (>3g/día) pueden aumentar ligeramente el tiempo de sangrado. En dosis normales (1-2g/día) el riesgo es mínimo. Si toma warfarina, mantenga dosis consistente y notifique a su médico.",
    ],
    PRESION_ARTERIAL: [
      "⚠️ MODERADA: Efecto aditivo en la reducción de la presión arterial con medicamentos antihipertensivos. Monitoree su presión arterial regularmente.",
    ],
    ANTICONCEPTIVOS: [
      "⚠️ MODERADA: Dosis altas pueden reducir la efectividad de anticonceptivos hormonales. Considere métodos adicionales de protección.",
    ],
  },
  "Vitamina D": {
    TIROIDES: [
      "⚠️ MODERADA: Puede afectar la absorción de levotiroxina. Tome la vitamina D al menos 4 horas después de medicamentos tiroideos.",
    ],
    COLESTEROL: [
      "⚠️ MODERADA: Las estatinas pueden reducir la síntesis de vitamina D. Considere monitorear niveles y ajustar suplementación. Total: 91 interacciones (11 mayores, 79 moderadas).",
    ],
    DIGOXINA: [
      "🔴 MAYOR: Riesgo de toxicidad por digoxina si desarrolla hipercalcemia. Requiere monitoreo estrecho de niveles de calcio.",
    ],
    DIURETICOS: [
      "🔴 MAYOR: Con tiazidas puede causar hipercalcemia peligrosa. Monitoree niveles de calcio regularmente.",
    ],
  },
  Magnesio: {
    ANTIBIOTICOS: [
      "🔴 MAYOR: Reduce significativamente la absorción de quinolonas y tetraciclinas. Separe por 2 horas antes o 4-6 horas después del antibiótico. Total: 230 interacciones (10 mayores, 128 moderadas).",
    ],
    PRESION_ARTERIAL: [
      "⚠️ MODERADA: Efecto aditivo hipotensor. Monitoree presión arterial con precaución.",
    ],
    BIFOSFONATOS: [
      "⚠️ MODERADA: Reduce absorción de alendronato, risedronato. Separe por al menos 2 horas.",
    ],
    TIROIDES: [
      "⚠️ MODERADA: Reduce absorción de levotiroxina. Separe por al menos 4 horas.",
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
      "🔴 MAYOR: Puede causar síndrome serotoninérgico cuando se combina con antidepresivos ISRS. Esta combinación debe evitarse.",
    ],
    ANTICOAGULANTES: [
      "🔴 MAYOR: Puede reducir significativamente los niveles de warfarina en sangre, disminuyendo su efectividad. Requiere supervisión médica estrecha y ajuste de dosis.",
    ],
  },
  "Ginkgo Biloba": {
    ANTICOAGULANTES: [
      "⚠️ MODERADA: Puede aumentar el riesgo de sangrado. Si toma warfarina, consulte con su médico antes de usar. Monitoree signos de sangrado inusual.",
    ],
    ANTIDEPRESIVOS: [
      "Puede interactuar con antidepresivos y causar efectos secundarios como aumento de la presión arterial o síndrome serotoninérgico.",
    ],
  },
  Probióticos: {
    ANTIBIOTICOS: [
      "⚠️ MODERADA: Tomar separados por al menos 2-3 horas de los antibióticos para evitar que estos últimos destruyan las bacterias beneficiosas del probiótico.",
    ],
    ANTICOAGULANTES: [
      "⚠️ MODERADA: Ciertos probióticos pueden aumentar los niveles locales de vitamina K en el intestino, potencialmente reduciendo la efectividad de warfarina. Si toma warfarina, monitoree su INR regularmente. Esta interacción NO ocurre con anticoagulantes más nuevos (DOACs).",
    ],
  },
  Calcio: {
    ANTIBIOTICOS: [
      "Puede interferir con la absorción de antibióticos, especialmente tetraciclinas y fluoroquinolonas. Separe la toma por al menos 2-3 horas.",
    ],
    BLOOD_PRESSURE: [
      "Puede reducir la eficacia de algunos medicamentos para la presión arterial como los bloqueadores de los canales de calcio.",
    ],
  },
  "Proteína de Suero": {
    ANTIBIOTICOS: ["Puede reducir la absorción de ciertos antibióticos. Separe la toma por al menos 1-2 horas."],
  },
  Creatina: {
    NSAIDS: [
      "El uso prolongado conjunto con antiinflamatorios no esteroideos podría aumentar el estrés renal. Manténgase bien hidratado y consulte con su médico si tiene problemas renales.",
    ],
  },
  "Vitamina K2": {
    ANTICOAGULANTES: [
      "🔴 MAYOR: Antagoniza directamente warfarina. NO inicie sin supervisión médica. Mantenga ingesta consistente si ya toma warfarina. Nota: No interactúa con anticoagulantes nuevos (DOACs).",
    ],
  },
  Ashwagandha: {
    SEDANTES: [
      "🔴 MAYOR: Riesgo de sedación excesiva con benzodiacepinas, barbitúricos. Total: 444 interacciones (7 mayores, 260 moderadas). Evite combinar.",
    ],
    DIABETES: [
      "⚠️ MODERADA: Puede potenciar efecto hipoglucémico de metformina, insulina. Monitoree glucosa sanguínea estrechamente.",
    ],
    TIROIDES: [
      "⚠️ MODERADA: Puede alterar función tiroidea. Separe de levotiroxina por 4 horas y monitoree TSH.",
    ],
    INMUNOSUPRESORES: [
      "⚠️ MODERADA: Puede interferir con ciclosporina, tacrolimus. Consulte con su médico antes de usar.",
    ],
  },
  "Coenzima Q10": {
    ESTATINAS: [
      "💡 BENEFICIOSA: Las estatinas reducen niveles de CoQ10. La suplementación puede aliviar dolores musculares asociados.",
    ],
    ANTICOAGULANTES: [
      "⚠️ MODERADA: Puede reducir efectividad de warfarina. Monitoree INR si combina.",
    ],
    DIABETES: [
      "⚠️ MODERADA: Puede reducir glucosa sanguínea. Ajuste dosis de medicamentos si es necesario.",
    ],
  },
  "NAC (N-Acetil Cisteína)": {
    NITROGLICERINA: [
      "🔴 MAYOR: Potencia efecto vasodilatador causando hipotensión severa. Evite combinación.",
    ],
    CARBON_ACTIVADO: [
      "⚠️ MODERADA: Reduce absorción de NAC. Separe por al menos 2 horas.",
    ],
  },
  "Vitamina E": {
    ANTICOAGULANTES: [
      "⚠️ MODERADA: Dosis altas (>400 UI/día) pueden aumentar el riesgo de sangrado. En dosis normales (200-400 UI/día) el riesgo es bajo. Informe a su médico si toma warfarina.",
    ],
    QUIMIOTERAPIA: [
      "⚠️ MODERADA: Puede interferir con algunos agentes quimioterapéuticos. Consulte oncólogo.",
    ],
  },
  "Extracto de Té Verde": {
    ANTICOAGULANTES: [
      "⚠️ MODERADA: El contenido de vitamina K puede reducir ligeramente la efectividad de warfarina. Mantenga consumo consistente y notifique a su médico. El EGCG en dosis altas puede aumentar tiempo de sangrado.",
    ],
    HEPATOTOXICOS: [
      "🔴 MAYOR: Riesgo aumentado de daño hepático con medicamentos hepatotóxicos. No exceda 800mg EGCG/día.",
    ],
  },
  Zinc: {
    ANTIBIOTICOS: [
      "⚠️ MODERADA: Reduce absorción mutua con quinolonas y tetraciclinas. Separe por 2-4 horas.",
    ],
    PENICILAMINA: [
      "⚠️ MODERADA: Reduce absorción del medicamento. Evite combinación o separe ampliamente.",
    ],
  },
  "Complejo B": {
    LEVODOPA: [
      "⚠️ MODERADA: La vitamina B6 puede reducir efectividad de levodopa. Use solo formulaciones con carbidopa.",
    ],
    FENITOINA: [
      "⚠️ MODERADA: El ácido fólico puede reducir niveles de fenitoína. Monitoree niveles del medicamento.",
    ],
  },
  "Vitamina B12": {
    METFORMINA: [
      "💡 BENEFICIOSA: La metformina reduce absorción de B12. Se recomienda suplementación en uso prolongado.",
    ],
    ANTIACIDOS: [
      "⚠️ MODERADA: Inhibidores de bomba de protones reducen absorción. Considere formas sublinguales o inyectables.",
    ],
  },
}

// Verificar interacciones con medicamentos
export const verificarInteraccionesMedicamentos = (nombreSuplemento: string, medicamentos: string): string[] => {
  if (!medicamentos) return []

  const interacciones: string[] = []
  const medicamentosMinusculas = medicamentos.toLowerCase()

  // Verificar interacciones conocidas
  const interaccionesConocidas = INTERACCIONES_SUPLEMENTOS[nombreSuplemento]
  if (interaccionesConocidas) {
    for (const [categoria, advertencias] of Object.entries(interaccionesConocidas)) {
      const medicamentosCategoria = CATEGORIAS_MEDICAMENTOS[categoria as keyof typeof CATEGORIAS_MEDICAMENTOS] || []

      // Verificar si se menciona algún medicamento de esta categoría
      if (medicamentosCategoria.some((med) => medicamentosMinusculas.includes(med))) {
        interacciones.push(...advertencias)
      }
    }
  }

  // NO añadir interacciones genéricas si no hay interacciones específicas conocidas
  // Esto evita alarmar innecesariamente al usuario

  return interacciones
}

function obtenerInfoPeriodoDescanso(name: string): string {
  const informacionDescanso: Record<string, string> = {
    Creatine:
      "Tomar durante 8-12 semanas, seguido de un descanso de 4 semanas. Esta estrategia de ciclado no es estrictamente necesaria según la evidencia científica actual, pero puede ser preferida por algunos usuarios para evitar la adaptación del cuerpo.",
    Creatina:
      "Tomar durante 8-12 semanas, seguido de un descanso de 4 semanas. Esta estrategia de ciclado no es estrictamente necesaria según la evidencia científica actual, pero puede ser preferida por algunos usuarios para evitar la adaptación del cuerpo.",
    "Beta-Alanine":
      "Tomar diariamente durante 12 semanas, seguido de un descanso de 2-4 semanas. Los ciclos son opcionales pero recomendados para evaluar si se mantienen los beneficios sin suplementación continua.",
    "Beta-Alanina":
      "Tomar diariamente durante 12 semanas, seguido de un descanso de 2-4 semanas. Los ciclos son opcionales pero recomendados para evaluar si se mantienen los beneficios sin suplementación continua.",
    Ashwagandha:
      "Tomar durante 3 meses, seguido de un descanso de 2-4 semanas para evitar la posible adaptación del cuerpo y mantener la efectividad del suplemento.",
  }

  return informacionDescanso[name] || "No se requieren periodos de descanso específicos"
}

// Agregar información sobre suplementos para la salud ósea
const suplementosSaludOsea: DatosSuplemento[] = [
  {
    nombre: "Calcio",
    descripcion:
      "Mineral esencial para la formación y mantenimiento de huesos y dientes fuertes. El calcio es el mineral más abundante en el cuerpo humano, con aproximadamente el 99% almacenado en los huesos.",
    descripcionesContextuales: {
      menopausia: "Durante la menopausia, la caída de estrógeno acelera dramáticamente la pérdida de masa ósea, aumentando el riesgo de osteoporosis. El calcio es fundamental en esta etapa para mantener la densidad ósea y prevenir fracturas. Las mujeres posmenopáusicas pueden perder hasta 3-5% de masa ósea por año sin suplementación adecuada.",
      salud_osea: "El calcio forma la estructura mineral de los huesos junto con el fósforo. Una ingesta adecuada es esencial para alcanzar el pico de masa ósea en la juventud y mantener la densidad ósea en la edad adulta, previniendo osteoporosis y fracturas.",
      salud_cardiovascular: "El calcio participa en la contracción muscular cardíaca y la regulación de la presión arterial. Sin embargo, es importante tomarlo con vitamina K2 para evitar la calcificación arterial.",
    },
    beneficios: [
      "Fortalece la estructura ósea y previene la pérdida de densidad ósea",
      "Reduce el riesgo de osteoporosis y fracturas, especialmente en adultos mayores",
      "Contribuye a la función muscular y nerviosa normal",
      "Participa en la coagulación sanguínea",
      "Apoya la salud dental",
    ],
    efectos_secundarios: [
      "Estreñimiento",
      "Gases o hinchazón",
      "En dosis muy altas, posible riesgo de cálculos renales",
      "Posible interferencia con la absorción de otros minerales",
    ],
    preguntas_frecuentes: [
      {
        pregunta: "¿Cuál es la mejor forma de calcio para suplementación?",
        respuesta:
          "El citrato de calcio suele ser mejor absorbido que el carbonato de calcio, especialmente en personas mayores o con baja acidez estomacal. El calcio de fuentes naturales como los lácteos también tiene excelente biodisponibilidad.",
      },
      {
        pregunta: "¿Puedo tomar calcio solo?",
        respuesta:
          "Para una óptima salud ósea, el calcio debe tomarse junto con vitamina D, que mejora su absorción, y vitamina K2, que ayuda a dirigir el calcio hacia los huesos y no hacia los tejidos blandos o arterias.",
      },
      {
        pregunta: "¿Cuándo debo tomar suplementos de calcio?",
        respuesta:
          "Para mejor absorción, tome calcio en dosis divididas (no más de 500mg a la vez) con las comidas. Evite tomarlo al mismo tiempo que suplementos de hierro o ciertos medicamentos.",
      },
    ],
    dosificacion: {
      general: "1000-1200mg diarios, divididos en dosis de 500mg o menos para mejor absorción",
      hombres: "1000mg diarios para hombres adultos hasta los 70 años, 1200mg para mayores de 70",
      mujeres: "1000mg diarios para mujeres adultas hasta los 50 años, 1200mg para mayores de 50",
    },
    momento_optimo: "Dividir la dosis durante el día, preferiblemente con las comidas para mejor absorción",
    consejos_absorcion:
      "Tomar con vitamina D para mejorar la absorción. Evitar tomar junto con alimentos ricos en oxalatos o fitatos que pueden inhibir la absorción",
    evidencia_cientifica: [
      "Numerosos estudios clínicos han demostrado que la suplementación adecuada de calcio, especialmente combinada con vitamina D, reduce el riesgo de fracturas en adultos mayores",
      "Meta-análisis confirman que mantener niveles óptimos de calcio es crucial para prevenir la osteoporosis, particularmente en mujeres posmenopáusicas",
    ],
  },
  {
    nombre: "Vitamina K2",
    descripcion:
      "Forma específica de vitamina K que ayuda a regular la distribución del calcio en el cuerpo, dirigiéndolo hacia los huesos y dientes donde es necesario y evitando su acumulación en arterias y tejidos blandos.",
    beneficios: [
      "Dirige el calcio hacia los huesos, aumentando la densidad ósea",
      "Previene la calcificación arterial, protegiendo la salud cardiovascular",
      "Trabaja sinérgicamente con vitamina D y calcio para la salud ósea",
      "Puede reducir el riesgo de fracturas",
      "Apoya la salud dental",
    ],
    efectos_secundarios: [
      "Generalmente bien tolerada con pocos efectos secundarios",
      "Posible interacción con medicamentos anticoagulantes",
    ],
    preguntas_frecuentes: [
      {
        pregunta: "¿Cuál es la diferencia entre vitamina K1 y K2?",
        respuesta:
          "La vitamina K1 (filoquinona) se encuentra principalmente en vegetales de hoja verde y está más involucrada en la coagulación sanguínea. La K2 (menaquinona) se encuentra en alimentos fermentados y productos animales, y es más efectiva para la salud ósea y cardiovascular.",
      },
      {
        pregunta: "¿Qué formas de vitamina K2 son mejores?",
        respuesta:
          "Las formas principales son MK-4 y MK-7. La MK-7 tiene mayor vida media en el cuerpo (permanece activa por más tiempo) y generalmente se considera más efectiva para suplementación diaria.",
      },
      {
        pregunta: "¿Puedo tomar vitamina K2 si estoy en tratamiento con anticoagulantes?",
        respuesta:
          "Consulte con su médico antes de tomar suplementos de vitamina K2 si está tomando warfarina u otros anticoagulantes, ya que puede interferir con estos medicamentos. Sin embargo, algunos anticoagulantes más nuevos no interactúan con la vitamina K.",
      },
    ],
    dosificacion: {
      general: "100-200mcg diarios de MK-7 o 1.5mg diarios de MK-4",
      hombres: "150-200mcg diarios de MK-7 para salud ósea y cardiovascular",
      mujeres: "100-180mcg diarios de MK-7, especialmente importante para mujeres posmenopáusicas",
    },
    momento_optimo:
      "Tomar con una comida que contenga grasas para mejorar la absorción, preferiblemente junto con suplementos de calcio y vitamina D",
    consejos_absorcion:
      "Como vitamina liposoluble, se absorbe mejor cuando se toma con alimentos que contienen grasas saludables",
    evidencia_cientifica: [
      "Estudios clínicos han demostrado que la suplementación con vitamina K2 puede reducir el riesgo de fracturas óseas en un 60-80% en mujeres posmenopáusicas",
      "Investigaciones recientes sugieren que la vitamina K2 puede reducir la calcificación arterial y mejorar la elasticidad vascular",
    ],
  },
  {
    nombre: "Colágeno",
    descripcion:
      "Proteína estructural que forma la matriz orgánica del hueso, proporcionando flexibilidad y resistencia. El colágeno tipo I constituye aproximadamente el 90% de la matriz orgánica ósea y también es fundamental para la salud de la piel, cabello y uñas. Disponible en versiones tanto de origen animal como vegano (a base de ingredientes vegetales que estimulan la producción de colágeno).",
    descripcionesContextuales: {
      menopausia: "La caída de estrógeno durante la menopausia reduce significativamente la producción de colágeno, afectando tanto la salud ósea como la elasticidad de la piel. La suplementación con colágeno en esta etapa ayuda a mantener la densidad ósea y reduce los signos visibles del envejecimiento cutáneo, incluyendo arrugas y pérdida de firmeza.",
      salud_osea: "El colágeno proporciona la matriz estructural flexible sobre la cual se depositan los minerales como calcio y fósforo. Sin colágeno adecuado, los huesos se vuelven frágiles y quebradizos, aumentando el riesgo de fracturas.",
      rendimiento_deportivo: "Para atletas y personas activas, el colágeno apoya la recuperación del tejido conectivo, reduce el dolor articular y mejora la flexibilidad. Es especialmente beneficioso para prevenir y recuperarse de lesiones en tendones y ligamentos.",
    },
    beneficios: [
      "Mejora la densidad y resistencia ósea",
      "Proporciona la matriz estructural sobre la que se depositan los minerales óseos",
      "Puede reducir el dolor articular y mejorar la movilidad",
      "Apoya la salud de la piel, cabello y uñas",
      "Contribuye a la recuperación del tejido conectivo",
      "Puede mejorar la elasticidad e hidratación de la piel"
    ],
    efectos_secundarios: [
      "Generalmente bien tolerado con pocos efectos secundarios",
      "Posible malestar digestivo leve en algunas personas",
      "Sabor desagradable en algunos productos"
    ],
    preguntas_frecuentes: [
      {
        pregunta: "¿Qué tipo de colágeno es mejor para los huesos?",
        respuesta:
          "El colágeno tipo I es el más importante para la salud ósea, ya que constituye la mayor parte de la matriz orgánica del hueso. Los péptidos de colágeno hidrolizado son la forma más biodisponible para suplementación."
      },
      {
        pregunta: "¿Cuánto tiempo tarda en hacer efecto el colágeno?",
        respuesta:
          "Los estudios sugieren que se necesitan al menos 8-12 semanas de suplementación constante para ver mejoras en la densidad ósea y la salud articular. Los beneficios para la piel pueden notarse en 4-8 semanas."
      },
      {
        pregunta: "¿Es mejor el colágeno en polvo o en cápsulas?",
        respuesta:
          "El colágeno en polvo generalmente es más práctico ya que las dosis efectivas (10-15g) requerirían muchas cápsulas. El polvo también se puede mezclar fácilmente con bebidas o alimentos."
      }
    ],
    dosificacion: {
      general: "10-15g de péptidos de colágeno hidrolizado diariamente",
      hombres: "15g diarios para hombres adultos",
      mujeres: "10-15g diarios para mujeres adultas"
    },
    momento_optimo: "Puede tomarse en cualquier momento del día, preferiblemente con vitamina C para optimizar la síntesis de colágeno",
    consejos_absorcion:
      "Tomar con vitamina C (jugo de naranja o suplemento) para mejorar la síntesis de colágeno. Evitar tomar con bebidas muy calientes que pueden desnaturalizar las proteínas",
    evidencia_cientifica: [
      "Estudios clínicos han mostrado que la suplementación con péptidos de colágeno puede aumentar la densidad mineral ósea en mujeres posmenopáusicas",
      "Un estudio de 12 meses mostró que la suplementación con 5g de péptidos de colágeno aumentó significativamente la densidad mineral ósea en comparación con placebo",
      "Investigaciones recientes sugieren que los péptidos bioactivos derivados del colágeno pueden estimular la actividad de los osteoblastos (células formadoras de hueso)"
    ]
  },
  {
    nombre: "Colágeno Vegano",
    descripcion:
      "Alternativa vegetal al colágeno tradicional, elaborada a partir de ingredientes como vitamina C, prolina, glicina, cobre y otros aminoácidos vegetales que estimulan la producción natural de colágeno en el cuerpo. Aunque no contiene colágeno real, proporciona los componentes necesarios para la síntesis de colágeno.",
    beneficios: [
      "Estimula la producción natural de colágeno en el cuerpo",
      "Apoya la salud de la piel, cabello y uñas",
      "Contribuye a la salud ósea y articular",
      "Proporciona antioxidantes adicionales",
      "Apto para dietas veganas y vegetarianas",
      "Sin riesgo de contaminantes animales"
    ],
    efectos_secundarios: [
      "Generalmente bien tolerado",
      "Posible malestar digestivo leve en personas sensibles",
      "Los resultados pueden ser más lentos que con colágeno animal"
    ],
    preguntas_frecuentes: [
      {
        pregunta: "¿Es el colágeno vegano tan efectivo como el colágeno animal?",
        respuesta:
          "El colágeno vegano no contiene colágeno real, sino nutrientes que apoyan la producción de colágeno. Los estudios sugieren que puede ser efectivo para mejorar la salud de la piel y articulaciones, aunque los resultados pueden tardar más en aparecer que con colágeno animal."
      },
      {
        pregunta: "¿Qué ingredientes contiene el colágeno vegano?",
        respuesta:
          "Típicamente contiene vitamina C, aminoácidos como prolina y glicina de fuentes vegetales, minerales como cobre y zinc, y extractos botánicos como bambú (sílice) o algas que apoyan la síntesis de colágeno."
      },
      {
        pregunta: "¿Cuánto tiempo tarda en hacer efecto?",
        respuesta:
          "Los beneficios pueden notarse en 12-16 semanas de uso constante, ligeramente más tiempo que el colágeno animal. La paciencia y consistencia son clave."
      }
    ],
    dosificacion: {
      general: "Seguir las indicaciones del fabricante, típicamente 5-10g diarios",
      hombres: "10g diarios",
      mujeres: "5-10g diarios"
    },
    momento_optimo: "Por la mañana con el desayuno o entre comidas, preferiblemente con vitamina C",
    consejos_absorcion:
      "Tomar con alimentos ricos en vitamina C o con jugo de naranja para maximizar la síntesis de colágeno. Mantener una hidratación adecuada",
    evidencia_cientifica: [
      "Estudios han mostrado que los componentes del colágeno vegano pueden estimular la producción de colágeno endógeno",
      "La vitamina C es esencial para la síntesis de colágeno y su suplementación mejora la producción",
      "Los aminoácidos vegetales pueden proporcionar los bloques de construcción necesarios para el colágeno"
    ]
  },
  {
    nombre: "Omega-3 Vegano (ALA)",
    descripcion:
      "Los omega-3 veganos provienen de fuentes vegetales como semillas de chía, linaza, cáñamo y algas marinas. Contienen ALA (ácido alfa-linolénico) que el cuerpo puede convertir parcialmente en EPA y DHA. Las algas marinas son la única fuente vegetal directa de EPA y DHA, siendo ideal para veganos y vegetarianos.",
    beneficios: [
      "Apoya la salud cardiovascular de forma natural y vegana",
      "Proporciona propiedades antiinflamatorias",
      "Contribuye a la salud cerebral y función cognitiva",
      "Mejora la salud de la piel y el cabello",
      "100% libre de contaminantes marinos como mercurio"
    ],
    efectos_secundarios: [
      "Posible malestar digestivo leve al inicio",
      "En dosis muy altas puede tener efecto laxante suave",
      "Algunas personas experimentan hinchazón con semillas de linaza"
    ],
    preguntas_frecuentes: [
      {
        pregunta: "¿Es tan efectivo como el omega-3 de pescado?",
        respuesta:
          "El ALA de fuentes vegetales se convierte en EPA y DHA en un 5-10%, por lo que se necesitan dosis mayores. Los suplementos de algas marinas proporcionan EPA y DHA directamente, siendo tan efectivos como el aceite de pescado."
      },
      {
        pregunta: "¿Cuáles son las mejores fuentes veganas de omega-3?",
        respuesta:
          "Las algas marinas (EPA/DHA directo), aceite de linaza, semillas de chía, semillas de cáñamo, nueces y aceite de perilla. Para suplementación, las algas marinas son la opción más completa."
      },
      {
        pregunta: "¿Necesito tomar más cantidad que el omega-3 regular?",
        respuesta:
          "Si usas fuentes de ALA (linaza, chía), sí necesitas más cantidad debido a la baja conversión. Con suplementos de algas marinas que contienen EPA/DHA, las dosis son similares a las del aceite de pescado."
      },
      {
        pregunta: "¿Cómo sé si estoy obteniendo suficiente omega-3 siendo vegano?",
        respuesta:
          "Considera un análisis de índice omega-3 en sangre. Los veganos deben asegurar consumo diario de fuentes de ALA y considerar suplementación con algas marinas para EPA/DHA directo."
      }
    ],
    dosificacion: {
      general: "2-3g de ALA diario de alimentos + 250-500mg EPA/DHA de algas",
      hombres: "3g ALA + 500mg EPA/DHA de algas marinas",
      mujeres: "2.5g ALA + 250-500mg EPA/DHA de algas marinas"
    },
    momento_optimo: "Con las comidas principales para mejorar absorción, preferiblemente con grasas saludables",
    consejos_absorcion:
      "Combinar con alimentos ricos en grasas saludables. Moler las semillas de linaza justo antes de consumir. Los suplementos de algas se absorben mejor con comidas",
    evidencia_cientifica: [
      "Estudios muestran que el ALA tiene beneficios cardiovasculares independientes de su conversión a EPA/DHA",
      "Las algas marinas proporcionan EPA y DHA biodisponibles comparables al aceite de pescado",
      "La suplementación con omega-3 vegano puede mejorar los marcadores inflamatorios en vegetarianos"
    ]
  },
  {
    nombre: "BCAA Vegano",
    descripcion:
      "Los BCAA veganos son aminoácidos de cadena ramificada (leucina, isoleucina y valina) derivados de fuentes vegetales mediante fermentación bacteriana de ingredientes como maíz o tapioca. Proporcionan los mismos beneficios que los BCAA tradicionales pero sin derivados animales, siendo ideales para veganos y vegetarianos que buscan apoyo para el entrenamiento.",
    beneficios: [
      "Apoya el crecimiento muscular de forma vegana",
      "Reduce la fatiga durante el ejercicio",
      "Disminuye el dolor muscular post-entrenamiento",
      "Ideal para complementar proteínas vegetales incompletas",
      "100% libre de ingredientes de origen animal"
    ],
    efectos_secundarios: [
      "Generalmente bien tolerados",
      "Posible malestar estomacal si se toman con el estómago vacío",
      "En dosis muy altas pueden competir con otros aminoácidos"
    ],
    preguntas_frecuentes: [
      {
        pregunta: "¿Son los BCAA veganos tan efectivos como los tradicionales?",
        respuesta:
          "Sí, los BCAA veganos son químicamente idénticos a los tradicionales. La única diferencia es la fuente: fermentación vegetal en lugar de procesamiento de pelo o plumas animales. La efectividad es la misma."
      },
      {
        pregunta: "¿Cuándo son realmente necesarios los BCAA veganos?",
        respuesta:
          "Son útiles principalmente para veganos/vegetarianos que: 1) No consumen suficiente proteína completa, 2) Entrenan en ayunas, 3) Buscan mejorar el perfil de aminoácidos de proteínas vegetales como soja o guisante."
      },
      {
        pregunta: "¿Cómo se producen los BCAA veganos?",
        respuesta:
          "Se producen mediante fermentación bacteriana de sustratos vegetales como maíz, tapioca o caña de azúcar. Este proceso natural produce aminoácidos puros sin necesidad de fuentes animales."
      }
    ],
    dosificacion: {
      general: "5-10g antes o durante el entrenamiento",
      hombres: "10g para hombres activos",
      mujeres: "5-7g para mujeres activas"
    },
    momento_optimo: "30 minutos antes del entrenamiento o durante sesiones largas de ejercicio",
    consejos_absorcion:
      "Tomar con agua o bebida deportiva. Pueden combinarse con proteína vegetal para mejorar el perfil de aminoácidos. Evitar tomar con comidas altas en proteína completa.",
    evidencia_cientifica: [
      "Los BCAA veganos muestran la misma biodisponibilidad que los de origen animal",
      "Efectivos para reducir el daño muscular inducido por ejercicio en atletas veganos",
      "Pueden mejorar la síntesis proteica cuando se combinan con proteínas vegetales bajas en leucina"
    ]
  }
]

// Agregar suplementos de proteína vegetal
const suplementosProteinaVegetal: DatosSuplemento[] = [
  {
    nombre: "Proteína de Soja",
    descripcion:
      "La proteína de soja es una proteína completa derivada de la soja que contiene todos los aminoácidos esenciales. Es una excelente alternativa vegetal a la proteína de suero, aunque su perfil de aminoácidos es ligeramente inferior en leucina comparado con las proteínas animales. Para optimizar la síntesis de proteínas musculares, puede beneficiarse de la suplementación adicional con BCAA.",
    beneficios: [
      "Proporciona todos los aminoácidos esenciales",
      "Apoya el crecimiento y mantenimiento muscular",
      "Puede ayudar a reducir el colesterol LDL",
      "Contiene isoflavonas con beneficios adicionales para la salud",
      "Apta para veganos y vegetarianos",
      "Libre de lactosa"
    ],
    efectos_secundarios: [
      "Posibles molestias digestivas en algunas personas",
      "Puede interferir con la absorción de minerales si se consume en exceso",
      "Contraindicada en personas alérgicas a la soja"
    ],
    preguntas_frecuentes: [
      {
        pregunta: "¿Es la proteína de soja tan efectiva como la proteína de suero?",
        respuesta:
          "La proteína de soja es una proteína completa y puede ser igualmente efectiva para el mantenimiento muscular. Sin embargo, tiene menos leucina que la proteína de suero, por lo que puede beneficiarse de la suplementación adicional con BCAA para optimizar la síntesis de proteínas musculares."
      },
      {
        pregunta: "¿Afecta la proteína de soja los niveles hormonales?",
        respuesta:
          "Los estudios actuales muestran que el consumo moderado de proteína de soja no afecta negativamente los niveles de testosterona en hombres ni causa problemas hormonales en mujeres. Las isoflavonas de soja tienen efectos muy débiles comparados con el estrógeno humano."
      },
      {
        pregunta: "¿Cuándo debo combinarla con BCAA?",
        respuesta:
          "Si tu objetivo es maximizar la ganancia muscular, considera añadir 5-10g de BCAA junto con tu proteína de soja, especialmente alrededor del entrenamiento. Esto compensará el menor contenido de leucina comparado con las proteínas animales."
      }
    ],
    dosificacion: {
      general: "20-30g por porción, 1-2 veces al día",
      hombres: "25-35g por porción para hombres activos",
      mujeres: "20-25g por porción para mujeres activas"
    },
    momento_optimo: "Después del entrenamiento o entre comidas para aumentar la ingesta proteica",
    consejos_absorcion: "Mezclar con agua o leche vegetal. Combinar con BCAA para optimizar el perfil de aminoácidos",
    evidencia_cientifica: [
      "Estudios muestran que la proteína de soja es efectiva para mantener la masa muscular durante pérdida de peso",
      "Meta-análisis confirman que puede reducir el colesterol LDL en un 3-4%",
      "La investigación sugiere que es tan efectiva como la proteína de suero para la recuperación muscular cuando se consume en cantidades adecuadas"
    ]
  },
  {
    nombre: "Proteína de Guisante",
    descripcion:
      "La proteína de guisante es una proteína vegetal de alta calidad extraída de guisantes amarillos. Aunque no es técnicamente una proteína completa (es baja en metionina), tiene un excelente perfil de aminoácidos, especialmente rico en arginina y BCAA. Es hipoalergénica y fácil de digerir. Para un perfil completo de aminoácidos, se recomienda combinarla con otras fuentes de proteína o BCAA.",
    beneficios: [
      "Rica en BCAA, especialmente leucina",
      "Hipoalergénica - apta para personas con alergias comunes",
      "Fácil digestión y absorción",
      "Promueve la saciedad y control de peso",
      "Apoya el crecimiento muscular",
      "Libre de los 8 alérgenos principales"
    ],
    efectos_secundarios: [
      "Generalmente muy bien tolerada",
      "Posible hinchazón leve en algunas personas",
      "Sabor característico que puede no gustar a todos"
    ],
    preguntas_frecuentes: [
      {
        pregunta: "¿Es la proteína de guisante una proteína completa?",
        respuesta:
          "La proteína de guisante es baja en metionina, por lo que técnicamente no es completa. Sin embargo, tiene un excelente contenido de BCAA y otros aminoácidos esenciales. Combinarla con granos o añadir BCAA puede optimizar su perfil de aminoácidos."
      },
      {
        pregunta: "¿Necesito añadir BCAA a la proteína de guisante?",
        respuesta:
          "Aunque la proteína de guisante es naturalmente rica en BCAA, añadir 5g adicionales de BCAA puede ser beneficioso para maximizar la síntesis de proteínas musculares, especialmente si es tu única fuente de proteína post-entrenamiento."
      },
      {
        pregunta: "¿Cómo se compara con otras proteínas vegetales?",
        respuesta:
          "La proteína de guisante tiene uno de los mejores perfiles de aminoácidos entre las proteínas vegetales, con un contenido de leucina comparable al de la proteína de suero. Es superior a la proteína de arroz y cáñamo en términos de contenido de BCAA."
      }
    ],
    dosificacion: {
      general: "20-30g por porción, 1-2 veces al día",
      hombres: "25-35g por porción",
      mujeres: "20-25g por porción"
    },
    momento_optimo: "Ideal después del entrenamiento o como snack proteico entre comidas",
    consejos_absorcion: "Mezclar bien con líquidos para evitar grumos. Combinar con frutas puede mejorar el sabor",
    evidencia_cientifica: [
      "Estudios muestran que la proteína de guisante es tan efectiva como la proteína de suero para aumentar el grosor muscular",
      "Investigaciones confirman su capacidad para promover la saciedad y ayudar en el control de peso",
      "Ensayos clínicos demuestran que estimula la liberación de hormonas de saciedad similares a las proteínas animales"
    ]
  }
]

// Asegurarse de que estos suplementos estén incluidos en la lista principal
const allSuplementos = [
  ...suplementosExamine,
  ...suplementosSaludOsea.filter((s) => !suplementosExamine.some((existing) => existing.nombre === s.nombre)),
  ...suplementosProteinaVegetal
]

// Eliminar el objeto de cafeína del array suplementosExamine
export const suplementosExamineFinal = allSuplementos.filter((suplemento) => suplemento.nombre !== "Cafeína")

// Add a debugging function to help validate data against the examine file
export function validateSupplementInfo(supplementName: string, infoType: string, content: string): boolean {
  // Find the supplement in our database
  const supplement = suplementosExamineFinal.find((s) => s.nombre.toLowerCase() === supplementName.toLowerCase())

  if (!supplement) {
    console.log(`Supplement not found: ${supplementName}`)
    return false
  }

  // Check different types of information
  let isValid = false

  switch (infoType) {
    case "descripcion":
      isValid = supplement.descripcion.includes(content)
      console.log(`Validating description for ${supplementName}: ${isValid}`)
      break
    case "beneficio":
      isValid = supplement.beneficios.some((b) => b.includes(content))
      console.log(`Validating benefit for ${supplementName}: ${isValid}`)
      break
    case "dosificacion":
      if (!supplement.dosificacion) {
        console.log(`No dosage info for ${supplementName}`)
        return false
      }
      isValid =
        (supplement.dosificacion.general && supplement.dosificacion.general.includes(content)) ||
        (supplement.dosificacion.hombres && supplement.dosificacion.hombres.includes(content)) ||
        (supplement.dosificacion.mujeres && supplement.dosificacion.mujeres.includes(content)) ||
        false
      console.log(`Validating dosage for ${supplementName}: ${isValid}`)
      break
    case "momento_optimo":
      isValid = supplement.momento_optimo ? supplement.momento_optimo.includes(content) : false
      console.log(`Validating optimal timing for ${supplementName}: ${isValid}`)
      break
    case "consejos_absorcion":
      isValid = supplement.consejos_absorcion ? supplement.consejos_absorcion.includes(content) : false
      console.log(`Validating absorption tips for ${supplementName}: ${isValid}`)
      break
    case "efecto_secundario":
      isValid = supplement.efectos_secundarios.some((e) => e.includes(content))
      console.log(`Validating side effects for ${supplementName}: ${isValid}`)
      break
    case "evidencia":
      isValid = supplement.evidencia_cientifica
        ? supplement.evidencia_cientifica.some((e) => e.includes(content))
        : false
      console.log(`Validating scientific evidence for ${supplementName}: ${isValid}`)
      break
    default:
      console.log(`Unknown info type: ${infoType}`)
      return false
  }

  return isValid
}

// Add a function to get all available data for a supplement
export function getSupplementDebugInfo(supplementName: string): any {
  const supplement = suplementosExamineFinal.find((s) => s.nombre.toLowerCase() === supplementName.toLowerCase())

  if (!supplement) {
    return { error: `Supplement not found: ${supplementName}` }
  }

  return {
    nombre: supplement.nombre,
    descripcion: supplement.descripcion,
    beneficios: supplement.beneficios,
    dosificacion: supplement.dosificacion,
    momento_optimo: supplement.momento_optimo,
    consejos_absorcion: supplement.consejos_absorcion,
    efectos_secundarios: supplement.efectos_secundarios,
    evidencia_cientifica: supplement.evidencia_cientifica,
  }
}
