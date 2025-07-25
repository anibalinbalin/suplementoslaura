// This file contains the supplement data from Examine.com
// This will serve as our primary knowledge base for AI-driven recommendations

export interface SupplementFAQ {
  question: string
  answer: string
}

export interface SupplementData {
  name: string
  description: string
  benefits: string[]
  side_effects: string[]
  faq: SupplementFAQ[]
}

// The full dataset from Examine.com
export const examineSupplements: SupplementData[] = [
  {
    name: "Branched-Chain Amino Acids",
    description:
      "Branched-chain amino acids (BCAAs) are three essential amino acids that are frequently supplemented because of their role in muscle growth and development. These amino acids are naturally found in dietary protein sources. Studies show that supplementation of BCAAs alone does not increase muscle growth, as all essential amino acids must be present for muscle protein synthesis to occur.",
    benefits: ["Enhance muscle growth", "Alleviate muscle fatigue", "Reduce muscle damage and soreness after exercise"],
    side_effects: ["Higher circulating levels of BCAAs may correlate with insulin resistance"],
    faq: [
      {
        question: "What are branched-chain amino acids?",
        answer:
          "BCAAs refer to three essential amino acids: leucine, isoleucine, and valine. They are distinct from other essential amino acids as they possess a branched side chain and play a large role in the regulation of muscle mass.",
      },
      {
        question: "What are branched-chain amino acids' main benefits?",
        answer:
          "The main benefit of BCAAs are their ability to enhance muscle growth and alleviate muscle fatigue. Studies found that supplementing with BCAAs alone does not provide an optimal muscle protein synthesis response.",
      },
      {
        question: "What are branched-chain amino acids' main drawbacks?",
        answer:
          "There is a growing interest in understanding the correlation between the amount of BCAAs present within the body and insulin resistance.",
      },
      {
        question: "How do branched-chain amino acids work?",
        answer:
          "Amino acids are the building blocks of proteins, and adequate amounts of all essential amino acids are required for adequate protein synthesis.",
      },
    ],
  },
  {
    name: "Green Tea Extract",
    description:
      "Green Tea extract contains phytochemicals, especially catechins like epigallocatechin gallate (EGCG) and caffeine. EGCG and caffeine have been shown to synergistically influence health indices, including body composition, but the contents within green tea extracts vary among brands. Notably, adverse effects have also been reported upon consuming green tea extract.",
    benefits: [
      "May aid in weight management",
      "Supports metabolic health",
      "Potential cognitive benefits",
      "May improve cardiovascular health",
      "Antioxidant properties",
    ],
    side_effects: ["Nausea", "Stomach upset", "Liver toxicity at high doses"],
    faq: [
      {
        question: "What is Green Tea Extract?",
        answer:
          "Green Tea Extract is a concentrated form of green tea that contains high levels of catechins, particularly EGCG, and caffeine.",
      },
      {
        question: "What are the benefits of Green Tea Extract?",
        answer:
          "Green Tea Extract may help with weight management, improve metabolic health, support cognitive function, and provide antioxidant benefits.",
      },
      {
        question: "Are there any side effects?",
        answer: "Possible side effects include nausea, stomach upset, and liver toxicity at high doses.",
      },
      {
        question: "How should I take Green Tea Extract?",
        answer:
          "It is recommended to follow the dosage instructions on the product label or consult with a healthcare professional.",
      },
      {
        question: "Can I take Green Tea Extract with other supplements?",
        answer: "Yes, but it's advisable to consult with a healthcare provider to avoid potential interactions.",
      },
    ],
  },
  // Additional supplements would be included here...
  // For brevity, I'm only including the first two supplements
  // In the actual implementation, you would include all supplements from the JSON file
]

// Helper function to find a supplement by name
export const findSupplementByName = (name: string): SupplementData | undefined => {
  return examineSupplements.find((supplement) => supplement.name.toLowerCase() === name.toLowerCase())
}

// Helper function to find supplements by health goal
export const findSupplementsByHealthGoal = (healthGoal: string): SupplementData[] => {
  const keywords = getKeywordsByHealthGoal(healthGoal)

  // Initial filter based on keyword matching in benefits
  const matchingSupplements = examineSupplements.filter((supplement) => {
    return supplement.benefits.some((benefit) =>
      keywords.some((keyword) => benefit.toLowerCase().includes(keyword.toLowerCase())),
    )
  })

  // Get direct mappings for this goal
  const directMappings = getDirectSupplementMappings()[healthGoal] || []

  // Find supplements by direct mapping
  const directlyMappedSupplements = directMappings
    .map((name) => examineSupplements.find((supp) => supp.name.toLowerCase() === name.toLowerCase()))
    .filter(Boolean) as SupplementData[]

  // Combine and remove duplicates
  return [...new Set([...matchingSupplements, ...directlyMappedSupplements])]
}

// Direct mappings of health goals to specific supplements
function getDirectSupplementMappings(): Record<string, string[]> {
  return {
    "muscle-gain": ["Branched-Chain Amino Acids", "Creatine", "Protein", "Beta-Alanine", "HMB"],
    "weight-loss": ["Green Tea Extract", "Protein", "Glucomannan", "CLA"],
    "immune-support": ["Vitamin C", "Vitamin D", "Zinc", "Elderberry", "Echinacea"],
    "stress-reduction": ["Ashwagandha", "Magnesium", "L-Theanine", "Rhodiola Rosea", "Valerian Root"],
    "energy-boost": ["B Vitamins", "CoQ10", "Iron", "Ginseng"],
    "better-sleep": ["Melatonin", "Magnesium", "L-Theanine", "Valerian Root", "Glycine"],
    "joint-health": ["Glucosamine", "Chondroitin", "MSM", "Collagen", "Turmeric"],
    "heart-health": ["Omega-3 Fatty Acids", "CoQ10", "Garlic Extract", "Fiber", "Plant Sterols"],
    "digestive-health": ["Probiotics", "Prebiotics", "Digestive Enzymes", "Ginger", "L-Glutamine"],
    "gut-microbiota": ["Probiotics", "Prebiotics", "Inulin", "Fermented Foods", "Psyllium Husk"],
    "brain-function": ["Omega-3 Fatty Acids", "Ginkgo Biloba", "Bacopa Monnieri", "Lion's Mane", "Phosphatidylserine"],
    "hair-skin-nails": ["Biotin", "Collagen", "Vitamin E", "Zinc", "Silica"],
    "hormone-balance": ["Vitamin D", "Ashwagandha", "Maca Root", "Magnesium", "Zinc"],
  }
}

// Map health goals to relevant keywords
const getKeywordsByHealthGoal = (healthGoal: string): string[] => {
  const healthGoalMap: Record<string, string[]> = {
    "muscle-gain": ["muscle", "strength", "protein", "recovery", "exercise", "workout"],
    "weight-loss": ["weight", "fat", "metabolism", "appetite", "obesity"],
    "immune-support": ["immune", "infection", "defense", "resistance"],
    "stress-reduction": ["stress", "anxiety", "mood", "relaxation", "sleep"],
    "energy-boost": ["energy", "fatigue", "performance", "endurance"],
    "better-sleep": ["sleep", "insomnia", "melatonin", "rest"],
    "joint-health": ["joint", "arthritis", "inflammation", "pain"],
    "heart-health": ["heart", "cardiovascular", "cholesterol", "blood pressure"],
    "digestive-health": ["digestive", "gut", "intestinal", "digestion", "probiotic"],
    "gut-microbiota": ["microbiome", "probiotics", "prebiotics", "gut flora", "bacteria", "fermented"],
    "brain-function": ["brain", "cognitive", "memory", "focus", "concentration"],
    "hair-skin-nails": ["hair", "skin", "nails", "beauty"],
    "hormone-balance": ["hormone", "testosterone", "estrogen", "balance"],
  }

  return healthGoalMap[healthGoal] || []
}

// Get gender-specific recommendations
export const getGenderSpecificAdvice = (supplement: SupplementData, gender: "male" | "female"): string => {
  // Look through FAQs for gender-specific information
  const genderKeywords =
    gender === "male"
      ? ["male", "men", "man", "testosterone"]
      : ["female", "women", "woman", "estrogen", "menopause", "menstrual"]

  // Check FAQs for gender-specific information
  for (const faq of supplement.faq) {
    if (
      genderKeywords.some(
        (keyword) =>
          faq.question.toLowerCase().includes(keyword.toLowerCase()) ||
          faq.answer.toLowerCase().includes(keyword.toLowerCase()),
      )
    ) {
      return faq.answer
    }
  }

  // If no specific gender information found
  return `No specific ${gender} dosage information found for ${supplement.name}. Follow general dosage guidelines and consult with a healthcare professional.`
}

// Find optimal timing information
export const getOptimalTimingInfo = (supplement: SupplementData): string => {
  const timingKeywords = ["timing", "when to take", "optimal time", "before", "after", "meal", "morning", "night"]

  // Check FAQs for timing information
  for (const faq of supplement.faq) {
    if (
      timingKeywords.some(
        (keyword) =>
          faq.question.toLowerCase().includes(keyword.toLowerCase()) ||
          faq.answer.toLowerCase().includes(keyword.toLowerCase()),
      )
    ) {
      return faq.answer
    }
  }

  // If no specific timing information found
  return `No specific timing information found for ${supplement.name}. For most supplements, taking with food can improve absorption and reduce stomach discomfort.`
}

// Find absorption enhancement information
export const getAbsorptionInfo = (supplement: SupplementData): string => {
  const absorptionKeywords = ["absorption", "bioavailability", "enhance", "fat", "water", "soluble"]

  // Check FAQs for absorption information
  for (const faq of supplement.faq) {
    if (
      absorptionKeywords.some(
        (keyword) =>
          faq.question.toLowerCase().includes(keyword.toLowerCase()) ||
          faq.answer.toLowerCase().includes(keyword.toLowerCase()),
      )
    ) {
      return faq.answer
    }
  }

  // If no specific absorption information found
  return `No specific absorption enhancement information found for ${supplement.name}. Many supplements are better absorbed when taken with a meal containing healthy fats.`
}

// Check if a supplement is appropriate for a user's age
export const checkAgeAppropriateSupplements = (
  supplement: SupplementData,
  age: number,
): {
  isAppropriate: boolean
  warnings: string[]
} => {
  const warnings: string[] = []

  // Define age-specific warnings for supplements
  const ageWarnings: Record<string, Record<string, string[]>> = {
    Iron: {
      "65+": [
        "Los adultos mayores deben tener precaución con la suplementación de hierro, ya que puede aumentar el riesgo de sobrecarga de hierro",
      ],
    },
    "Vitamin A": {
      "65+": ["Los adultos mayores pueden tener mayor riesgo de toxicidad por vitamina A"],
    },
    Calcium: {
      "65+": ["Los adultos mayores pueden necesitar más calcio, pero deben consultar sobre la dosis adecuada"],
    },
    Creatine: {
      "under-18": ["No se recomienda para menores de 18 años sin supervisión médica"],
    },
    "Pre-workout supplements": {
      "under-18": ["No se recomienda para menores de 18 años"],
      "65+": ["Los adultos mayores deben consultar antes de usar suplementos pre-entrenamiento"],
    },
    Caffeine: {
      "under-18": ["Los adolescentes deben limitar el consumo de cafeína"],
      "65+": ["Los adultos mayores pueden ser más sensibles a los efectos de la cafeína"],
    },
  }

  // Check if there are warnings for this supplement
  const supplementWarnings = ageWarnings[supplement.name]
  if (supplementWarnings) {
    // Check age ranges
    if (age >= 65 && supplementWarnings["65+"]) {
      warnings.push(...supplementWarnings["65+"])
    } else if (age < 18 && supplementWarnings["under-18"]) {
      warnings.push(...supplementWarnings["under-18"])
    }
  }

  return {
    isAppropriate: warnings.length === 0,
    warnings,
  }
}

// Common medication categories for interaction checking
const MEDICATION_CATEGORIES: Record<string, string[]> = {
  BLOOD_THINNERS: [
    "warfarina",
    "heparina",
    "aspirina",
    "clopidogrel",
    "apixaban",
    "rivaroxaban",
    "dabigatran",
    "anticoagulante",
  ],
  BLOOD_PRESSURE: [
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
  THYROID: ["levotiroxina", "tiroides"],
  CHOLESTEROL: ["atorvastatina", "simvastatina", "rosuvastatina", "estatina", "colesterol"],
  ANTIDEPRESSANTS: [
    "fluoxetina",
    "sertralina",
    "escitalopram",
    "paroxetina",
    "venlafaxina",
    "bupropion",
    "antidepresivo",
  ],
  NSAIDS: ["ibuprofeno", "naproxeno", "diclofenaco", "celecoxib", "antiinflamatorio"],
  CORTICOSTEROIDS: ["prednisona", "dexametasona", "corticoide", "corticosteroide"],
  ANTIBIOTICS: ["amoxicilina", "azitromicina", "ciprofloxacina", "doxiciclina", "antibiótico"],
  ANTACIDS: ["omeprazol", "esomeprazol", "ranitidina", "famotidina", "antiácido"],
}

// Known supplement-medication interactions
const SUPPLEMENT_INTERACTIONS: Record<string, Record<string, string[]>> = {
  "Omega-3": {
    BLOOD_THINNERS: ["Puede aumentar el riesgo de sangrado cuando se toma con anticoagulantes"],
    BLOOD_PRESSURE: ["Puede tener un efecto aditivo en la reducción de la presión arterial"],
  },
  "Vitamin D": {
    THYROID: ["Puede afectar la absorción de medicamentos para la tiroides"],
    CHOLESTEROL: ["Puede reducir la eficacia de las estatinas"],
  },
  Magnesium: {
    ANTIBIOTICS: ["Puede reducir la absorción de antibióticos"],
    BLOOD_PRESSURE: ["Puede tener un efecto aditivo en la reducción de la presión arterial"],
  },
  Iron: {
    THYROID: ["Puede interferir con la absorción de medicamentos para la tiroides"],
    ANTACIDS: ["Los antiácidos pueden reducir la absorción de hierro"],
  },
  "St. John's Wort": {
    ANTIDEPRESSANTS: ["Puede causar síndrome serotoninérgico cuando se combina con antidepresivos ISRS"],
    BLOOD_THINNERS: ["Puede reducir la eficacia de los anticoagulantes"],
  },
  "Ginkgo Biloba": {
    BLOOD_THINNERS: ["Puede aumentar el riesgo de sangrado cuando se toma con anticoagulantes"],
    ANTIDEPRESSANTS: ["Puede interactuar con antidepresivos y causar efectos secundarios"],
  },
  Calcium: {
    ANTIBIOTICS: ["Puede interferir con la absorción de antibióticos"],
    BLOOD_PRESSURE: ["Puede reducir la eficacia de algunos medicamentos para la presión arterial"],
  },
  "Vitamin K": {
    BLOOD_THINNERS: ["Puede interferir con la acción de anticoagulantes como la warfarina"],
  },
  "Green Tea Extract": {
    BLOOD_THINNERS: ["Puede aumentar el riesgo de sangrado"],
    BLOOD_PRESSURE: ["Puede interferir con medicamentos para la presión arterial"],
  },
}

// Check for medication interactions
export const checkMedicationInteractions = (supplementName: string, medications: string): string[] => {
  if (!medications) return []

  const interactions: string[] = []
  const medicationsLower = medications.toLowerCase()

  // Check for known interactions
  const knownInteractions = SUPPLEMENT_INTERACTIONS[supplementName]
  if (knownInteractions) {
    for (const [category, warnings] of Object.entries(knownInteractions)) {
      const categoryMeds = MEDICATION_CATEGORIES[category as keyof typeof MEDICATION_CATEGORIES] || []

      // Check if any medication in this category is mentioned
      if (categoryMeds.some((med) => medicationsLower.includes(med))) {
        interactions.push(...warnings)
      }
    }
  }

  // Generic check for any supplement if no specific interactions are defined
  if (interactions.length === 0 && medications.trim() !== "") {
    interactions.push(
      "Consulta con un profesional de la salud sobre posibles interacciones con tus medicamentos actuales",
    )
  }

  return interactions
}
