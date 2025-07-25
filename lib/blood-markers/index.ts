// Export all blood marker data and utilities

export * from './types'
export * from './b12-data'
export * from './glucose-insulin-data'
export * from './cortisol-data'
export * from './electrolytes-data'
export * from './hematocrit-iron-data'

// Import existing vitamin D data and re-export with consistent structure
import { 
  vitaminDRanges, 
  getVitaminDRecommendation,
  vitaminDFoodSources,
  vitaminDFactors,
  vitaminDExamineEvidence
} from '../vitamin-d-data'
import { BloodMarkerData } from './types'

export const vitaminDData: BloodMarkerData = {
  name: 'Vitamina D',
  unit: 'ng/mL',
  ranges: vitaminDRanges,
  foodSources: vitaminDFoodSources.map(source => ({
    food: source.food,
    amount: source.amount,
    content: source.vitaminD,
  })),
  factors: vitaminDFactors,
  evidence: vitaminDExamineEvidence.map(e => ({
    ...e,
    evidence: e.evidence as 'Fuerte' | 'Moderada' | 'Preliminar' | 'Mixta' | 'Débil'
  })),
  testingNotes: [
    'No requiere ayuno',
    'Los niveles pueden variar según la estación',
    'La suplementación reciente puede elevar niveles',
    'Preferir análisis de 25(OH)D',
    'Considerar junto con calcio y PTH si hay alteraciones'
  ]
}

export { getVitaminDRecommendation }

// Master list of all available blood markers
export const availableBloodMarkers = [
  { id: 'vitamin-d', name: 'Vitamina D', unit: 'ng/mL', category: 'vitaminas' },
  { id: 'vitamin-b12', name: 'Vitamina B12', unit: 'pg/mL', category: 'vitaminas' },
  { id: 'glucose', name: 'Glucosa', unit: 'mg/dL', category: 'metabolico' },
  { id: 'insulin', name: 'Insulina', unit: 'μIU/mL', category: 'metabolico' },
  { id: 'cortisol', name: 'Cortisol', unit: 'μg/dL', category: 'hormonal' },
  { id: 'sodium', name: 'Sodio', unit: 'mEq/L', category: 'electrolitos' },
  { id: 'potassium', name: 'Potasio', unit: 'mEq/L', category: 'electrolitos' },
  { id: 'chloride', name: 'Cloruro', unit: 'mEq/L', category: 'electrolitos' },
  { id: 'calcium', name: 'Calcio', unit: 'mg/dL', category: 'electrolitos' },
  { id: 'magnesium', name: 'Magnesio', unit: 'mg/dL', category: 'electrolitos' },
  { id: 'hematocrit', name: 'Hematocrito', unit: '%', category: 'hematologia' },
  { id: 'iron', name: 'Hierro', unit: 'μg/dL', category: 'hematologia' },
  { id: 'ferritin', name: 'Ferritina', unit: 'ng/mL', category: 'hematologia' },
]

export const markerCategories = [
  { id: 'vitaminas', name: 'Vitaminas', icon: '💊' },
  { id: 'metabolico', name: 'Metabólico', icon: '🔥' },
  { id: 'hormonal', name: 'Hormonal', icon: '⚡' },
  { id: 'electrolitos', name: 'Electrolitos', icon: '💧' },
  { id: 'hematologia', name: 'Hematología', icon: '🩸' },
]

// Utility function to get all marker data
export function getMarkerData(markerId: string) {
  switch (markerId) {
    case 'vitamin-d':
      return vitaminDData
    case 'vitamin-b12':
      return b12Data
    case 'glucose':
      return glucoseData
    case 'insulin':
      return insulinData
    case 'cortisol':
      return cortisolData
    case 'sodium':
      return sodiumData
    case 'potassium':
      return potassiumData
    case 'chloride':
      return { name: 'Cloruro', unit: 'mEq/L', ranges: chlorideRanges }
    case 'calcium':
      return { name: 'Calcio', unit: 'mg/dL', ranges: calciumRanges }
    case 'magnesium':
      return { name: 'Magnesio', unit: 'mg/dL', ranges: magnesiumRanges }
    case 'hematocrit':
      return hematocritDataMen // Default, should check gender
    case 'iron':
      return ironData
    case 'ferritin':
      return ferritinData
    default:
      return null
  }
}

// Import specific data that wasn't exported
import { b12Data } from './b12-data'
import { glucoseData, insulinData } from './glucose-insulin-data'
import { cortisolData } from './cortisol-data'
import { 
  sodiumData, 
  potassiumData, 
  chlorideRanges,
  calciumRanges,
  magnesiumRanges
} from './electrolytes-data'
import { 
  hematocritDataMen, 
  hematocritDataWomen,
  ironData, 
  ferritinData 
} from './hematocrit-iron-data'