// This file contains the parsed medication interaction data
// Generated from interacciones-farmacos-detalladas.md

import { InteractionSeverity, type SupplementInteractionData } from './medication-interaction-service'

export const MEDICATION_INTERACTIONS: Record<string, SupplementInteractionData> = {
  "Ashwagandha": {
    name: "Ashwagandha",
    totalInteractions: "444 (7 mayores, 260 moderadas, 177 menores)",
    interactions: [
      {
        medicationCategory: "Sedantes y Benzodiacepinas",
        medications: ["alprazolam", "xanax", "diazepam", "valium", "lorazepam", "ativan"],
        warning: "Riesgo de sedación excesiva",
        severity: InteractionSeverity.MAJOR
      },
      {
        medicationCategory: "Medicamentos para Diabetes",
        medications: ["metformina", "glibenclamida", "insulina"],
        warning: "Puede potenciar efecto hipoglucémico",
        severity: InteractionSeverity.MODERATE
      },
      {
        medicationCategory: "Medicamentos Tiroideos",
        medications: ["levotiroxina"],
        warning: "Puede alterar función tiroidea",
        severity: InteractionSeverity.MODERATE
      },
      {
        medicationCategory: "Inmunosupresores",
        medications: ["ciclosporina", "tacrolimus"],
        warning: "Puede interferir con la supresión inmune",
        severity: InteractionSeverity.MODERATE
      }
    ],
    recommendations: [
      "Separar la toma de medicamentos tiroideos por al menos 4 horas",
      "Monitorear glucosa sanguínea si se combina con medicamentos para diabetes",
      "Evitar con sedantes o alcohol"
    ],
    drugsComUrl: "https://www.drugs.com/drug-interactions/ashwaganda.html"
  },
  
  "Magnesio": {
    name: "Magnesio",
    totalInteractions: "230 (10 mayores, 128 moderadas, 92 menores)",
    interactions: [
      {
        medicationCategory: "Antibióticos Quinolonas",
        medications: ["ciprofloxacina", "levofloxacina", "moxifloxacina"],
        warning: "Reduce absorción del antibiótico",
        severity: InteractionSeverity.MAJOR
      },
      {
        medicationCategory: "Bifosfonatos",
        medications: ["alendronato", "risedronato", "ibandronato"],
        warning: "Reduce absorción del medicamento",
        severity: InteractionSeverity.MODERATE
      },
      {
        medicationCategory: "Tetraciclinas",
        medications: ["doxiciclina", "minociclina", "tetraciclina"],
        warning: "Forma complejos que reducen absorción",
        severity: InteractionSeverity.MODERATE
      },
      {
        medicationCategory: "Levotiroxina",
        medications: ["levotiroxina"],
        warning: "Reduce absorción de hormona tiroidea",
        severity: InteractionSeverity.MODERATE
      }
    ],
    recommendations: [
      "Separar antibióticos por 2-4 horas",
      "Tomar bifosfonatos 30 minutos antes del magnesio",
      "Separar levotiroxina por al menos 4 horas"
    ],
    drugsComUrl: "https://www.drugs.com/drug-interactions/magnesium-oxide.html"
  },
  
  "Vitamina D": {
    name: "Vitamina D",
    totalInteractions: "183 (3 mayores, 128 moderadas, 52 menores)",
    interactions: [
      {
        medicationCategory: "Digoxina",
        medications: ["digoxina"],
        warning: "Riesgo de toxicidad por digoxina si hay hipercalcemia",
        severity: InteractionSeverity.MAJOR
      },
      {
        medicationCategory: "Tiazidas",
        medications: ["hidroclorotiazida", "clorotiazida"],
        warning: "Puede causar hipercalcemia",
        severity: InteractionSeverity.MAJOR
      },
      {
        medicationCategory: "Estatinas",
        medications: ["atorvastatina", "simvastatina", "rosuvastatina"],
        warning: "Puede reducir síntesis de vitamina D",
        severity: InteractionSeverity.MODERATE
      },
      {
        medicationCategory: "Corticosteroides",
        medications: ["prednisona", "dexametasona"],
        warning: "Reducen absorción de calcio",
        severity: InteractionSeverity.MODERATE
      },
      {
        medicationCategory: "Orlistat",
        medications: ["orlistat"],
        warning: "Reduce absorción de vitaminas liposolubles",
        severity: InteractionSeverity.MODERATE
      }
    ],
    recommendations: [
      "Monitorear niveles de calcio con diuréticos tiazídicos",
      "Considerar suplementación adicional con corticosteroides",
      "Tomar vitamina D 2 horas antes o después de orlistat"
    ],
    drugsComUrl: "https://www.drugs.com/drug-interactions/cholecalciferol,vitamin-d3.html"
  },
  
  "Omega-3": {
    name: "Omega-3",
    totalInteractions: "76 (0 mayores, 76 moderadas, 0 menores)",
    interactions: [
      {
        medicationCategory: "Anticoagulantes",
        medications: ["warfarina", "heparina", "clopidogrel", "aspirina"],
        warning: "Aumenta riesgo de sangrado",
        severity: InteractionSeverity.MODERATE,
        recommendation: "Limitar dosis a <3g/día si toma anticoagulantes"
      },
      {
        medicationCategory: "Medicamentos para Presión Arterial",
        medications: ["lisinopril", "amlodipino", "losartán"],
        warning: "Efecto aditivo hipotensor",
        severity: InteractionSeverity.MODERATE
      },
      {
        medicationCategory: "Anticonceptivos Orales",
        medications: ["anticonceptivos orales"],
        warning: "Puede reducir efectividad",
        severity: InteractionSeverity.MODERATE
      }
    ],
    recommendations: [
      "Limitar dosis a <3g/día si toma anticoagulantes",
      "Monitorear presión arterial regularmente",
      "Informar al médico si nota sangrado inusual"
    ],
    drugsComUrl: "https://www.drugs.com/drug-interactions/omega-3-polyunsaturated-fatty-acids,omega-3.html"
  },
  
  "Hierro": {
    name: "Hierro",
    totalInteractions: "Significativas con varios medicamentos",
    interactions: [
      {
        medicationCategory: "Antibióticos",
        medications: ["tetraciclinas", "fluoroquinolonas"],
        warning: "Reduce absorción mutua",
        severity: InteractionSeverity.MODERATE,
        recommendation: "Separar antibióticos por 2-3 horas"
      },
      {
        medicationCategory: "Levotiroxina",
        medications: ["levotiroxina"],
        warning: "Reduce absorción de hormona tiroidea",
        severity: InteractionSeverity.MODERATE,
        recommendation: "Tomar levotiroxina 4 horas antes del hierro"
      },
      {
        medicationCategory: "Inhibidores de Bomba de Protones",
        medications: ["omeprazol", "esomeprazol"],
        warning: "Reducen absorción de hierro",
        severity: InteractionSeverity.MODERATE
      },
      {
        medicationCategory: "Antiácidos",
        medications: ["antiácidos"],
        warning: "Reducen absorción de hierro",
        severity: InteractionSeverity.MODERATE
      }
    ],
    recommendations: [
      "Separar antibióticos por 2-3 horas",
      "Tomar levotiroxina 4 horas antes del hierro",
      "Considerar formas queladas con antiácidos"
    ],
    drugsComUrl: undefined
  },
  
  "Vitamina K2": {
    name: "Vitamina K2",
    totalInteractions: "Principalmente con anticoagulantes",
    interactions: [
      {
        medicationCategory: "Warfarina",
        medications: ["warfarina"],
        warning: "Antagoniza directamente el efecto anticoagulante",
        severity: InteractionSeverity.MAJOR
      }
    ],
    recommendations: [
      "Contraindicada con warfarina",
      "Mantener ingesta consistente si toma anticoagulantes",
      "Monitorear INR si es necesario usar"
    ],
    drugsComUrl: undefined
  },
  
  "Coenzima Q10": {
    name: "Coenzima Q10",
    totalInteractions: undefined,
    interactions: [
      {
        medicationCategory: "Estatinas",
        medications: ["atorvastatina", "simvastatina", "rosuvastatina"],
        warning: "Las estatinas reducen niveles de CoQ10",
        severity: InteractionSeverity.MODERATE
      },
      {
        medicationCategory: "Medicamentos para Diabetes",
        medications: ["medicamentos para diabetes"],
        warning: "Puede reducir glucosa sanguínea",
        severity: InteractionSeverity.MODERATE
      },
      {
        medicationCategory: "Warfarina",
        medications: ["warfarina"],
        warning: "Puede reducir efectividad del anticoagulante",
        severity: InteractionSeverity.MODERATE
      }
    ],
    recommendations: [
      "Muy recomendada si toma estatinas",
      "Monitorear glucosa con medicamentos para diabetes",
      "Vigilar INR si combina con warfarina"
    ],
    drugsComUrl: undefined
  },
  
  "NAC": {
    name: "NAC",
    totalInteractions: undefined,
    interactions: [
      {
        medicationCategory: "Nitroglicerina",
        medications: ["nitroglicerina"],
        warning: "Puede potenciar efecto vasodilatador",
        severity: InteractionSeverity.MODERATE
      },
      {
        medicationCategory: "Carbón Activado",
        medications: ["carbón activado"],
        warning: "Reduce absorción de NAC",
        severity: InteractionSeverity.MODERATE
      }
    ],
    recommendations: [
      "Precaución con nitroglicerina",
      "Separar del carbón activado por 2 horas"
    ],
    drugsComUrl: undefined
  },
  
  "Vitamina E": {
    name: "Vitamina E",
    totalInteractions: undefined,
    interactions: [
      {
        medicationCategory: "Anticoagulantes",
        medications: ["warfarina", "clopidogrel"],
        warning: "Aumenta riesgo de sangrado",
        severity: InteractionSeverity.MODERATE
      },
      {
        medicationCategory: "Quimioterapia",
        medications: ["quimioterapia"],
        warning: "Puede interferir con algunos agentes",
        severity: InteractionSeverity.MODERATE
      },
      {
        medicationCategory: "Ciclosporina",
        medications: ["ciclosporina"],
        warning: "Puede aumentar absorción",
        severity: InteractionSeverity.MODERATE
      }
    ],
    recommendations: [
      "Limitar dosis a <400 UI/día con anticoagulantes",
      "Consultar oncólogo si está en quimioterapia"
    ],
    drugsComUrl: undefined
  },
  
  "Extracto de Té Verde": {
    name: "Extracto de Té Verde",
    totalInteractions: undefined,
    interactions: [
      {
        medicationCategory: "Anticoagulantes",
        medications: ["warfarina"],
        warning: "Contenido de vitamina K puede interferir",
        severity: InteractionSeverity.MODERATE
      },
      {
        medicationCategory: "Medicamentos Hepatotóxicos",
        medications: ["medicamentos hepatotóxicos"],
        warning: "Riesgo aumentado de daño hepático",
        severity: InteractionSeverity.MODERATE
      },
      {
        medicationCategory: "Estimulantes",
        medications: ["estimulantes"],
        warning: "Efecto aditivo por cafeína",
        severity: InteractionSeverity.MODERATE
      }
    ],
    recommendations: [
      "Evitar dosis altas con anticoagulantes",
      "Monitorear función hepática",
      "Considerar contenido de cafeína"
    ],
    drugsComUrl: undefined
  },
  
  "Zinc": {
    name: "Zinc",
    totalInteractions: undefined,
    interactions: [
      {
        medicationCategory: "Antibióticos",
        medications: ["tetraciclina", "quinolonas"],
        warning: "Reduce absorción mutua",
        severity: InteractionSeverity.MODERATE
      },
      {
        medicationCategory: "Penicilamina",
        medications: ["penicilamina"],
        warning: "Reduce absorción del medicamento",
        severity: InteractionSeverity.MODERATE
      },
      {
        medicationCategory: "Cobre",
        medications: ["suplementos de cobre"],
        warning: "Antagonismo mineral",
        severity: InteractionSeverity.MINOR
      }
    ],
    recommendations: [
      "Separar antibióticos por 2 horas",
      "Evitar con penicilamina",
      "Balancear con cobre en uso prolongado"
    ],
    drugsComUrl: undefined
  },
  
  "Calcio": {
    name: "Calcio",
    totalInteractions: undefined,
    interactions: [
      {
        medicationCategory: "Bifosfonatos",
        medications: ["alendronato"],
        warning: "Reduce absorción significativamente",
        severity: InteractionSeverity.MAJOR
      },
      {
        medicationCategory: "Antibióticos",
        medications: ["tetraciclinas", "fluoroquinolonas"],
        warning: "Forma complejos no absorbibles",
        severity: InteractionSeverity.MODERATE
      },
      {
        medicationCategory: "Levotiroxina",
        medications: ["levotiroxina"],
        warning: "Reduce absorción",
        severity: InteractionSeverity.MODERATE
      }
    ],
    recommendations: [
      "Tomar bifosfonatos 30 minutos antes del calcio",
      "Separar antibióticos por 2-4 horas",
      "Separar levotiroxina por 4 horas"
    ],
    drugsComUrl: undefined
  }
}