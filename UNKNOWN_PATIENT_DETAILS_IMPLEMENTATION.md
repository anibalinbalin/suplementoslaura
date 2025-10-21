# Unknown Patient Details Handling Implementation

## Summary

This implementation adjusts the patient context validation system to handle unknown pregnancy, breastfeeding, and medical condition status, rather than defaulting to "safe" assumptions.

## Changes Made

### 1. Patient Context Update (`app/actions/recommendation-actions.ts`)

**Before:**
```typescript
const patientContext = {
  isPregnant: false, // TODO: Add pregnancy detection from user input
  isBreastfeeding: false, // TODO: Add breastfeeding detection from user input
  conditions: [], // TODO: Extract from health goals or add separate field
}
```

**After:**
```typescript
const patientContext = {
  isPregnant: undefined, // Unknown - survey doesn't capture this yet
  isBreastfeeding: undefined, // Unknown - survey doesn't capture this yet
  conditions: undefined, // Unknown - will be extracted from health goals in future
}
```

**Impact:**
- Changed from assuming safe (`false`/`[]`) to explicitly marking as unknown (`undefined`)
- Applied to both `getAIRecommendations` and `getFallbackRecommendations` functions

### 2. New Validation Function (`lib/safety-validator.ts`)

Added `validateUnknownPatientDetails()` function:

**Purpose:** Generates medium-severity warnings when critical patient details are unknown

**Behavior:**
- Checks if `isPregnant`, `isBreastfeeding`, or `conditions` are `undefined`
- Creates a single warning listing all unknown details
- Severity: `MODERATE`
- Category: `CONTRAINDICATION`
- Requires professional review: `true`

**Warning Message:**
```
Estado desconocido: embarazo, lactancia, condiciones médicas preexistentes

Antes de comenzar [Supplement], confirme con su médico que es seguro
considerando: [unknown details]. Esta recomendación asume que no está
embarazada, amamantando, ni tiene condiciones médicas que puedan
contraindicar este suplemento.
```

### 3. Validation Flow Update

The `validateSupplement()` function now calls validations in this order:

1. **Check for unknown patient details** (NEW)
2. Check upper limits
3. Check contraindications
4. Provide form guidance

## Testing

Created comprehensive tests covering:

### Unit Tests (`lib/__tests__/unknown-patient-details.test.ts`)
- ✓ Warning when pregnancy status is unknown
- ✓ Warning when breastfeeding status is unknown
- ✓ Warning when conditions are unknown
- ✓ Single warning listing all unknown details
- ✓ No warning when all details are known

### Integration Tests (`lib/__tests__/unknown-patient-integration.test.ts`)
- ✓ Warnings added to each supplement when details are undefined
- ✓ No warnings when details are known
- ✓ All three unknown details included in warning message
- ✓ Professional review required when details unknown

**All tests passing:** 8/8 ✓

## User Experience Impact

### Before
- System assumed users were **not pregnant, not breastfeeding, and had no medical conditions**
- No warnings about these assumptions
- Potentially unsafe recommendations for pregnant/breastfeeding women

### After
- System explicitly acknowledges **unknown status**
- Generates **medium-severity warning** for each supplement
- **Requires professional review** flag is set
- Clear message to users: **"Confirm with your doctor before starting"**

## Example Recommendation Output

For a user with all unknown patient details, each supplement now includes:

```json
{
  "name": "Vitamina D",
  "dosage": "1000 UI",
  "safetyWarnings": [
    {
      "severity": "MODERATE",
      "category": "CONTRAINDICATION",
      "message": "Estado desconocido: embarazo, lactancia, condiciones médicas preexistentes",
      "recommendation": "Antes de comenzar Vitamina D, confirme con su médico...",
      "requiresProfessionalReview": true
    }
  ],
  "requiresProfessionalReview": true
}
```

## Future Enhancements

Once the survey captures these fields:

1. **Pregnancy field:** Add to user input form
2. **Breastfeeding field:** Add to user input form
3. **Medical conditions:** Extract from health goals or add dedicated field

When these are implemented, simply pass the actual values instead of `undefined`:

```typescript
const patientContext = {
  isPregnant: request.isPregnant,  // From survey
  isBreastfeeding: request.isBreastfeeding,  // From survey
  conditions: extractConditionsFromHealthGoals(request.healthGoals),  // Parsed
}
```

## Clinical Safety Rationale

### Why This Matters

1. **Pregnancy Contraindications:** Many supplements are contraindicated during pregnancy (e.g., Vitamin A, certain herbs)
2. **Breastfeeding Safety:** Different safety profiles for lactating mothers
3. **Medical Conditions:** Conditions like kidney disease, liver disease, etc. contraindicate many supplements

### Safety Improvement

- **Before:** Silent assumption = potential harm
- **After:** Explicit warning = informed decision-making
- **Result:** More ethically responsible system

## Technical Notes

- Uses TypeScript's type system with optional properties (`?`)
- `undefined` semantically represents "unknown" vs `false` representing "known negative"
- No breaking changes to existing API
- Backward compatible with existing data structures

## Validation Status

- ✅ TypeScript compilation: Success
- ✅ Unit tests: 5/5 passing
- ✅ Integration tests: 3/3 passing
- ✅ No runtime errors
- ✅ Type safety maintained

## Files Modified

1. `/app/actions/recommendation-actions.ts` - Patient context initialization (2 instances)
2. `/lib/safety-validator.ts` - New validation function + integration

## Files Created

1. `/lib/__tests__/unknown-patient-details.test.ts` - Unit tests
2. `/lib/__tests__/unknown-patient-integration.test.ts` - Integration tests
3. `UNKNOWN_PATIENT_DETAILS_IMPLEMENTATION.md` - This documentation

---

**Implementation Date:** 2025-10-21
**Status:** ✅ Complete and Tested
