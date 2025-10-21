# Examine.com Supplement Database (Spanish)

## Skill Overview

This skill provides access to comprehensive, evidence-based supplement information from Examine.com, translated to Spanish. Use this skill when you need detailed information about dietary supplements, their benefits, dosing, side effects, and scientific evidence.

## When to Use This Skill

Use this skill when:
- Generating personalized supplement recommendations
- Answering questions about specific supplements
- Providing dosing information (general, gender-specific)
- Explaining supplement benefits and side effects
- Checking medication interactions with supplements
- Finding optimal timing for supplement intake
- Providing evidence-based supplement information in Spanish
- Recommending supplements available in Uruguay (MercadoLibre products)

## Data Structure

The supplement database (`examine-data-es.ts`) contains an array of supplements with the following structure:

### DatosSuplemento Interface

```typescript
{
  nombre: string                    // Supplement name in Spanish
  descripcion: string               // Detailed description
  descripcionesContextuales?: {     // Context-specific descriptions
    menopausia?: string
    salud_osea?: string
    bienestar_mental?: string
    salud_digestiva?: string
    rendimiento_deportivo?: string
    control_peso?: string
    salud_cardiovascular?: string
  }
  beneficios: string[]              // List of benefits
  efectos_secundarios: string[]     // Side effects
  preguntas_frecuentes: [           // FAQs
    {
      pregunta: string
      respuesta: string
    }
  ]
  dosificacion?: {                  // Dosing information
    general: string
    hombres?: string                // Men-specific
    mujeres?: string                // Women-specific
  }
  momento_optimo?: string           // Optimal timing
  consejos_absorcion?: string       // Absorption tips
  evidencia_cientifica?: string[]   // Scientific evidence
  productosMercadoLibre?: [         // Available products in Uruguay
    {
      marca: string
      url: string
      precio?: number
      disponible?: boolean
    }
  ]
}
```

## How to Use This Data

### 1. Accessing Supplement Information

The data is exported as `suplementosExamine` array. To find a specific supplement:

```typescript
const supplement = suplementosExamine.find(s =>
  s.nombre.toLowerCase().includes(searchTerm.toLowerCase())
);
```

### 2. Generating Recommendations

When generating recommendations:
- Consider user's health goals and match with `descripcionesContextuales`
- Check `beneficios` array for goal alignment
- Review `efectos_secundarios` for safety
- Check medication interactions using `MedicationInteractionService`
- Provide gender-specific dosing when available (`dosificacion.hombres` / `dosificacion.mujeres`)
- Include `momento_optimo` for timing guidance
- Share `consejos_absorcion` for better efficacy

### 3. Medication Interactions

The file imports `MedicationInteractionService` which provides:
- Interaction severity levels (minor, moderate, major, contraindicated)
- Specific interaction warnings
- Safety recommendations

Always check for interactions before recommending supplements to users on medications.

### 4. Product Recommendations

Many supplements include `productosMercadoLibre` with:
- Available brands in Uruguay
- Direct purchase links
- Pricing information (when available)
- Availability status

## Important Guidelines

1. **Evidence-Based Recommendations**: All information is sourced from Examine.com's scientific reviews. Always prioritize evidence over marketing claims.

2. **Dosing Accuracy**: Use the exact dosing recommendations provided. Gender-specific dosing takes precedence when available.

3. **Safety First**:
   - Always mention relevant `efectos_secundarios`
   - Check medication interactions
   - Note contraindications in descriptions

4. **Context Matters**: Use `descripcionesContextuales` when available to provide targeted information for specific health goals.

5. **Language**: All content is in Spanish - maintain this language consistency in responses.

6. **Local Availability**: When possible, reference `productosMercadoLibre` to help users find products in Uruguay.

## Example Usage

**User Query**: "¿Qué suplemento me recomiendas para la salud ósea?"

**Response Pattern**:
1. Search supplements with `descripcionesContextuales.salud_osea` or relevant benefits
2. Filter by safety (check `efectos_secundarios` and medications)
3. Provide dosing from `dosificacion`
4. Mention `momento_optimo` and `consejos_absorcion`
5. Include `productosMercadoLibre` links if available
6. Support with `evidencia_cientifica`

## Data Quality Notes

- The database contains comprehensive information for major supplements
- Some supplements may have incomplete data (optional fields)
- Scientific evidence is summarized, not exhaustive
- MercadoLibre product information may need periodic updates

## Reference Files

- `examine-data-es.ts` - Complete supplement database
- `medication-interaction-service.ts` - Medication interaction checking utilities

## Skills Integration

This skill works well with:
- Health goal assessment
- Personalized recommendation generation
- E-commerce product lookup (MercadoLibre)
- Medication safety checking
