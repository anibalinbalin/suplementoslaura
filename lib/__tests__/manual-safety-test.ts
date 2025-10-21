/**
 * Manual Safety Validation Test
 *
 * Run this with: npx tsx lib/__tests__/manual-safety-test.ts
 */

import { validateRecommendationList } from '../safety-validator'
import { generateFullDisclaimer } from '../disclaimer-generator'

console.log('🧪 Testing Clinical Safety Validation System\n')
console.log('='.repeat(80))

// Test Case 1: Omega-3 + Warfarin (MAJOR interaction)
console.log('\n📋 Test Case 1: Omega-3 + Warfarin Interaction')
console.log('-'.repeat(80))

const testCase1 = validateRecommendationList(
  [
    { name: 'Omega-3 (EPA y DHA)', dosage: '2000 mg' },
    { name: 'Vitamina D', dosage: '2000 UI' },
  ],
  {
    age: 65,
    gender: 'hombre',
    medications: ['warfarina'],
  }
)

console.log('Supplements:', testCase1.supplementValidations.map(v => v.supplementName))
console.log('Omega-3 Warnings:', testCase1.supplementValidations[0].warnings.length)
testCase1.supplementValidations[0].warnings.forEach(w => {
  console.log(`  - [${w.severity}] ${w.message}`)
})

console.log('\nProfessional Review Required:', testCase1.overallRequiresProfessionalReview)

// Test Case 2: Vitamin A + Pregnancy (CRITICAL contraindication)
console.log('\n📋 Test Case 2: Vitamin A + Pregnancy')
console.log('-'.repeat(80))

const testCase2 = validateRecommendationList(
  [
    { name: 'Vitamina A', dosage: '5000 mcg' },
  ],
  {
    age: 28,
    gender: 'mujer',
    isPregnant: true,
  }
)

console.log('Vitamin A Warnings:', testCase2.supplementValidations[0].warnings.length)
testCase2.supplementValidations[0].warnings.forEach(w => {
  console.log(`  - [${w.severity}] ${w.message}`)
  console.log(`    Recommendation: ${w.recommendation}`)
})

// Test Case 3: Metformin Drug-Nutrient Depletion
console.log('\n📋 Test Case 3: Metformin B12 Depletion Detection')
console.log('-'.repeat(80))

const testCase3 = validateRecommendationList(
  [
    { name: 'Vitamina D', dosage: '2000 UI' },
    { name: 'Omega-3 (EPA y DHA)', dosage: '1000 mg' },
  ],
  {
    age: 55,
    gender: 'hombre',
    medications: ['metformina'],
  }
)

console.log('Drug Depletion Warnings:', testCase3.drugDepletionWarnings.length)
testCase3.drugDepletionWarnings.forEach(w => {
  console.log(`  - Missing: ${w.supplementName}`)
  console.log(`    Reason: ${w.message}`)
})

// Test Case 4: Upper Limit Violation
console.log('\n📋 Test Case 4: Vitamin D Upper Limit Violation')
console.log('-'.repeat(80))

const testCase4 = validateRecommendationList(
  [
    { name: 'Vitamina D', dosage: '15000 UI' }, // Exceeds 4000 UI UL
  ],
  {
    age: 45,
    gender: 'mujer',
  }
)

console.log('Vitamin D Warnings:', testCase4.supplementValidations[0].warnings.length)
const upperLimitWarning = testCase4.supplementValidations[0].warnings.find(
  w => w.category === 'UPPER_LIMIT'
)
if (upperLimitWarning) {
  console.log(`  - [${upperLimitWarning.severity}] ${upperLimitWarning.message}`)
  console.log(`    Recommendation: ${upperLimitWarning.recommendation}`)
}

// Test Case 5: Disclaimer Generation
console.log('\n📋 Test Case 5: Disclaimer Generation')
console.log('-'.repeat(80))

const allWarnings = testCase2.supplementValidations.flatMap(v => v.warnings)
const disclaimer = generateFullDisclaimer(allWarnings, {
  isPregnant: true,
})

console.log('Disclaimer Level:', disclaimer.level)
console.log('Professional Consult Required:', disclaimer.professionalConsultRequired)
console.log('Action Required:', disclaimer.actionRequired)
console.log('\nSpecific Warnings Count:', disclaimer.specificWarnings.length)

// Test Case 6: Safe Recommendation (No Warnings)
console.log('\n📋 Test Case 6: Safe Recommendation (Minimal Warnings)')
console.log('-'.repeat(80))

const testCase6 = validateRecommendationList(
  [
    { name: 'Vitamina C', dosage: '500 mg' },
    { name: 'Magnesio', dosage: '200 mg' },
  ],
  {
    age: 30,
    gender: 'hombre',
    medications: [],
  }
)

console.log('Vitamin C Warnings:', testCase6.supplementValidations[0].warnings.length)
console.log('Magnesium Warnings:', testCase6.supplementValidations[1].warnings.length)
console.log('Professional Review Required:', testCase6.overallRequiresProfessionalReview)

// Summary
console.log('\n' + '='.repeat(80))
console.log('✅ Safety Validation System Test Complete')
console.log('='.repeat(80))
console.log(`
Summary:
- Upper Limit Validation: ${testCase4.supplementValidations[0].warnings.some(w => w.category === 'UPPER_LIMIT') ? '✅ WORKING' : '❌ FAILED'}
- Contraindication Detection: ${testCase2.supplementValidations[0].warnings.some(w => w.severity === 'CRITICAL') ? '✅ WORKING' : '❌ FAILED'}
- Drug Interaction Detection: ${testCase1.supplementValidations[0].warnings.length > 0 ? '✅ WORKING' : '❌ FAILED'}
- Drug-Nutrient Depletion: ${testCase3.drugDepletionWarnings.length > 0 ? '✅ WORKING' : '❌ FAILED'}
- Disclaimer Generation: ${disclaimer.level === 'CRITICAL' ? '✅ WORKING' : '❌ FAILED'}
- Safe Recommendation Handling: ${!testCase6.overallRequiresProfessionalReview ? '✅ WORKING' : '❌ FAILED'}
`)
