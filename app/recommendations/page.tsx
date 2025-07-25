"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  ExternalLink,
  Heart,
  Info,
  ShoppingCart,
  AlertTriangle,
  Clock,
  Check,
  ChevronUp,
  ChevronDown,
  Sun,
  Coffee,
  Utensils,
  Moon,
  Dumbbell,
  Zap,
  HelpCircle,
  Calendar,
  Loader2,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { useUser } from "@/context/user-context"
import type { CombinacionSuplementos } from "@/lib/recommendation-service"
import { suplementosExamine } from "@/lib/examine-data-es"
import { AffiliateDisclosure } from "@/components/affiliate-disclosure"

// Component to display detailed supplement information
function SupplementDetails({ supplement, gender, age }: { 
  supplement?: any; 
  gender: string; 
  age: number 
}) {
  if (!supplement) return null;

  return (
    <div className="mt-4 space-y-4 w-full">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-2">Información Científica</h4>
        <div className="space-y-2">
          {supplement.scientificEvidence?.map((evidence: string, idx: number) => (
            <p key={idx} className="text-sm text-gray-600">• {evidence}</p>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">Dosificación</h4>
          <p className="text-sm text-blue-700">{supplement.dosage}</p>
          {supplement.genderSpecificDosage && (
            <p className="text-sm text-blue-600 mt-2">
              {gender === "male" ? "Hombres" : "Mujeres"}: {
                gender === "male" 
                  ? supplement.genderSpecificDosage.male 
                  : supplement.genderSpecificDosage.female
              }
            </p>
          )}
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-medium text-green-800 mb-2">Mejor Momento</h4>
          <p className="text-sm text-green-700">{supplement.optimalTime}</p>
        </div>
      </div>

      {supplement.absorptionTips && (
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-medium text-yellow-800 mb-2">Consejos de Absorción</h4>
          <p className="text-sm text-yellow-700">{supplement.absorptionTips}</p>
        </div>
      )}

      {supplement.warnings && supplement.warnings.length > 0 && (
        <div className="bg-red-50 p-4 rounded-lg">
          <h4 className="font-medium text-red-800 mb-2 flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Advertencias
          </h4>
          <ul className="space-y-1">
            {supplement.warnings.map((warning: string, idx: number) => (
              <li key={idx} className="text-sm text-red-700">• {warning}</li>
            ))}
          </ul>
        </div>
      )}

      {supplement.medicationInteractions && supplement.medicationInteractions.length > 0 && (
        <div className="bg-orange-50 p-4 rounded-lg">
          <h4 className="font-medium text-orange-800 mb-2">Interacciones con Medicamentos</h4>
          <ul className="space-y-1">
            {supplement.medicationInteractions.map((interaction: string, idx: number) => (
              <li key={idx} className="text-sm text-orange-700">• {interaction}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function RecommendationsPage() {
  const { userProfile, resetProfile } = useUser()
  const [favorites, setFavorites] = useState<number[]>([])
  const [combinaciones, setCombinaciones] = useState<CombinacionSuplementos[]>([])
  const [expandedDetails, setExpandedDetails] = useState<Record<string, boolean>>({})
  const [showExerciseInfo, setShowExerciseInfo] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Track which combination is currently being viewed
  const [activeCombination, setActiveCombination] = useState<number | null>(null)
  
  // Handle loading state for hydration
  useEffect(() => {
    setIsLoading(false)
  }, [])
  
  // Función para filtrar y reemplazar suplementos según restricciones dietéticas
  const filterSupplementsByDietaryRestrictions = (supplements: any[]) => {
    if (!userProfile?.dietaryRestrictions || userProfile.dietaryRestrictions.length === 0) {
      return supplements
    }
    
    const restrictions = userProfile.dietaryRestrictions
    const isVegan = restrictions.includes("vegano")
    const isVegetarian = restrictions.includes("vegetariano")
    const isLactoseIntolerant = restrictions.includes("sin-lactosa")
    
    return supplements.map(supplement => {
      const name = supplement.nombre.toLowerCase()
      
      // Reemplazar proteína de suero para veganos, vegetarianos o intolerantes a lactosa
      if ((name.includes("proteína") && name.includes("suero")) || 
          name.includes("whey") || 
          name.includes("proteína whey")) {
        if (isVegan || isVegetarian || isLactoseIntolerant) {
          // Buscar proteína vegetal en la lista
          const veganProtein = supplements.find(s => s.nombre === "Proteína de Guisante")
          if (veganProtein) {
            return veganProtein
          }
        }
      }
      
      // Reemplazar omega-3 de pescado para veganos y vegetarianos
      if (supplement.nombre === "Omega-3 (EPA y DHA)" || 
          (name.includes("omega-3") && !name.includes("vegano"))) {
        if (isVegan || isVegetarian) {
          // Buscar omega-3 vegano en la lista
          const veganOmega = supplements.find(s => s.nombre === "Omega-3 Vegano (ALA)")
          if (veganOmega) {
            return veganOmega
          }
        }
      }
      
      return supplement
    }).filter((supplement, index, self) => 
      // Eliminar duplicados basándose en el nombre
      index === self.findIndex(s => s.nombre === supplement.nombre)
    )
  }

  // Toggle expanded details for a specific supplement
  const toggleDetails = (combinationId: number, supplementName: string) => {
    const key = `${combinationId}-${supplementName}`
    setExpandedDetails((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  // Check if details are expanded for a specific supplement
  const isExpanded = (combinationId: number, supplementName: string) => {
    const key = `${combinationId}-${supplementName}`
    return expandedDetails[key] || false
  }

  // Categorizar suplementos basados en su origen (análisis de sangre vs objetivos de salud)
  const [bloodTestSupplements, setBloodTestSupplements] = useState<string[]>([])
  const [bloodTestData, setBloodTestData] = useState<Record<string, { value: number; unit: string; status: string }>>({})
  
  // Si hay resultados de análisis de sangre, identificar qué suplementos vienen de ahí
  useEffect(() => {
    const supplements: string[] = []
    const data: Record<string, { value: number; unit: string; status: string }> = {}
    
    if (userProfile?.bloodTestResults && userProfile.bloodTestResults.length > 0) {
      userProfile.bloodTestResults.forEach(result => {
        // Mapear marcadores de sangre a nombres de suplementos
        let supplementName = ''
        let status = ''
        
        switch (result.markerId) {
          case 'vitamin-d':
            if (result.value < 20) {
              status = 'Deficiencia'
              supplementName = 'Vitamina D'
            } else if (result.value < 30) {
              status = 'Insuficiencia'
              supplementName = 'Vitamina D'
            }
            break
          case 'vitamin-b12':
            if (result.value < 200) {
              status = 'Deficiencia'
              supplementName = 'Vitamina B12'
            } else if (result.value < 300) {
              status = 'Límite bajo'
              supplementName = 'Vitamina B12'
            }
            break
          case 'iron':
            if (result.value < 60) {
              status = 'Bajo'
              supplementName = 'Hierro'
            }
            break
          case 'magnesium':
            if (result.value < 1.8) {
              status = 'Bajo'
              supplementName = 'Magnesio'
            }
            break
          case 'calcium':
            if (result.value < 8.5) {
              status = 'Bajo'
              supplementName = 'Calcio'
            }
            break
        }
        
        if (supplementName) {
          supplements.push(supplementName)
          data[supplementName] = {
            value: result.value,
            unit: result.unit,
            status: status
          }
        }
      })
    }
    
    setBloodTestSupplements(supplements)
    setBloodTestData(data)
  }, [userProfile?.bloodTestResults])

  // Obtener los suplementos de las recomendaciones del usuario
  console.log("Recomendaciones del usuario:", userProfile?.recommendations?.map(r => r.name))
  console.log("Restricciones dietéticas del usuario:", userProfile?.dietaryRestrictions)
  const supplements =
    userProfile?.recommendations?.length > 0
      ? userProfile.recommendations.map((rec, index) => ({
          id: index + 1,
          nombre: rec.name,
          descripcion: rec.description,
          imagen: "/placeholder.svg",
          calificacion: 4.5 + Math.random() * 0.4,
          beneficios: rec.benefits,
          etiquetas: rec.tags,
          marcas: rec.productosMercadoLibre?.slice(0, 2).map(producto => ({
            nombre: producto.marca,
            precio: producto.precio || Math.floor(Math.random() * 1000) + 500,
            enlace: producto.url,
          })) || [
            {
              nombre: "Ver productos",
              precio: 800,
              enlace: "https://www.mercadolibre.com.uy",
            },
          ],
          interaccionesMedicamentos: rec.medicationInteractions || [],
          consultarNutricionista: rec.consultNutritionist || false,
          fromBloodTest: bloodTestSupplements.includes(traducirNombre(rec.name)),
        }))
      : filterSupplementsByDietaryRestrictions([
          {
            id: 1,
            nombre: userProfile?.dietaryRestrictions?.includes("vegano") || userProfile?.dietaryRestrictions?.includes("vegetariano") 
              ? "Proteína de Guisante" 
              : "Proteína de Suero",
            descripcion: userProfile?.dietaryRestrictions?.includes("vegano") || userProfile?.dietaryRestrictions?.includes("vegetariano")
              ? "Proteína vegetal de guisante de alta calidad para la recuperación muscular y el crecimiento."
              : "Proteína de suero aislada de alta calidad para la recuperación muscular y el crecimiento.",
            imagen: "/placeholder.svg",
            calificacion: 4.8,
            beneficios: [
              "Ayuda a la recuperación muscular",
              "Promueve el crecimiento muscular",
              "Fácil digestión y absorción",
              userProfile?.dietaryRestrictions?.includes("vegano") || userProfile?.dietaryRestrictions?.includes("vegetariano")
                ? "100% vegetal"
                : "Bajo en carbohidratos y grasas",
            ],
            etiquetas: ["Ganancia muscular", "Recuperación", userProfile?.dietaryRestrictions?.includes("vegano") ? "Vegano" : "Sin lactosa"],
            marcas: [
              { nombre: "NutriTech", precio: 1290, enlace: "https://www.mercadolibre.com.uy" },
              { nombre: "MusclePro", precio: 1350, enlace: "https://www.mercadolibre.com.uy" },
            ],
            interaccionesMedicamentos: [],
            consultarNutricionista: false,
            fromBloodTest: false,
          },
          {
            id: 2,
            nombre: userProfile?.dietaryRestrictions?.includes("vegano") || userProfile?.dietaryRestrictions?.includes("vegetariano")
              ? "Omega-3 Vegano (ALA)"
              : "Omega-3 (EPA y DHA)",
            descripcion: userProfile?.dietaryRestrictions?.includes("vegano") || userProfile?.dietaryRestrictions?.includes("vegetariano")
              ? "Suplemento de omega-3 vegano derivado de algas para la salud cardiovascular y cerebral."
              : "Suplemento de ácidos grasos omega-3 para la salud cardiovascular y cerebral.",
            imagen: "/placeholder.svg",
            calificacion: 4.6,
            beneficios: [
              "Apoya la salud cardiovascular",
              "Mejora la función cerebral",
              "Reduce la inflamación",
              "Promueve la salud de las articulaciones",
            ],
            etiquetas: ["Salud cardiovascular", "Función cerebral", "Antiinflamatorio"],
            marcas: [
              { nombre: "VitaNature", precio: 790, enlace: "https://www.mercadolibre.com.uy" },
              { nombre: "OmegaLife", precio: 850, enlace: "https://www.mercadolibre.com.uy" },
            ],
            interaccionesMedicamentos: [],
            consultarNutricionista: false,
            fromBloodTest: false,
          },
          {
            id: 3,
            nombre: "Magnesio Bisglicinato",
            descripcion: "Suplemento de magnesio de alta absorción para la reducción del estrés y la mejora del sueño.",
            imagen: "/placeholder.svg",
            calificacion: 4.7,
            beneficios: [
              "Ayuda a reducir el estrés y la ansiedad",
              "Mejora la calidad del sueño",
              "Previene calambres musculares",
              "Apoya la salud ósea",
            ],
            etiquetas: ["Reducción del estrés", "Mejor sueño", "Salud muscular"],
            marcas: [
              { nombre: "RelaxNow", precio: 650, enlace: "https://www.mercadolibre.com.uy" },
              { nombre: "MineralPlus", precio: 690, enlace: "https://www.mercadolibre.com.uy" },
            ],
            interaccionesMedicamentos: [],
            consultarNutricionista: false,
            fromBloodTest: false,
          },
          {
            id: 4,
            nombre: "Omega-3 Vegano (ALA)",
            descripcion: "Omega-3 de fuentes vegetales como algas marinas, chía y linaza. Ideal para veganos y vegetarianos.",
            imagen: "/placeholder.svg",
            calificacion: 4.7,
            beneficios: [
              "Apoya la salud cardiovascular de forma natural",
              "Proporciona propiedades antiinflamatorias",
              "Contribuye a la salud cerebral",
              "100% libre de contaminantes marinos",
            ],
            etiquetas: ["Vegano", "Salud cardiovascular", "Función cerebral"],
            marcas: [
              { nombre: "VegaOmega", precio: 890, enlace: "https://www.mercadolibre.com.uy" },
              { nombre: "PlantLife", precio: 950, enlace: "https://www.mercadolibre.com.uy" },
            ],
            interaccionesMedicamentos: [],
            consultarNutricionista: false,
            fromBloodTest: false,
          },
          {
            id: 5,
            nombre: "Proteína de Guisante",
            descripcion: "Proteína vegetal completa de alta calidad, ideal para veganos y personas con intolerancia a la lactosa.",
            imagen: "/placeholder.svg",
            calificacion: 4.6,
            beneficios: [
              "Promueve el crecimiento muscular",
              "Rica en aminoácidos esenciales y BCAA",
              "Fácil digestión sin lactosa",
              "100% vegetal y sostenible",
            ],
            etiquetas: ["Vegano", "Ganancia muscular", "Sin lactosa"],
            marcas: [
              { nombre: "VegaPro", precio: 1150, enlace: "https://www.mercadolibre.com.uy" },
              { nombre: "PlantPower", precio: 1200, enlace: "https://www.mercadolibre.com.uy" },
            ],
            interaccionesMedicamentos: [],
            consultarNutricionista: false,
            fromBloodTest: false,
          },
        ])

  // Generar combinaciones de suplementos sinérgicos
  useEffect(() => {
    if (userProfile?.recommendations?.length > 0) {
      // Convertir las recomendaciones al formato esperado
      const recomendaciones = userProfile.recommendations.map((rec) => ({
        nombre: traducirNombre(rec.name),
        descripcion: rec.description,
        beneficios: rec.benefits,
        dosificacion: rec.dosage,
        momentoOptimo: rec.optimalTime,
        consejosAbsorcion: rec.absorptionTips,
        dosificacionEspecificaGenero: {
          hombre: rec.genderSpecificDosage.male,
          mujer: rec.genderSpecificDosage.female
        },
        evidenciaCientifica: rec.scientificEvidence,
        adecuadoPara: rec.suitableFor,
        etiquetas: rec.tags,
        advertencias: rec.warnings,
        interaccionesMedicamentos: rec.medicationInteractions,
        consultarNutricionista: rec.consultNutritionist,
      }))

      // Create a single comprehensive Pack Bienestar that includes ALL supplements
      const instruccionesPersonalizadas = generarInstruccionesPersonalizadas(recomendaciones)
      const precioTotal = recomendaciones.reduce((total) => total + (500 + Math.floor(Math.random() * 1000)), 0)
      const descuento = Math.floor(precioTotal * 0.15)

      const packBienestar = {
        id: 1,
        nombre: "Tu Régimen Personalizado",
        descripcion:
          "Combinación completa con todos los suplementos recomendados para ti, organizados en un régimen diario fácil de seguir. Incluye todos los suplementos individuales recomendados para asegurar una cobertura nutricional óptima.",
        suplementos: recomendaciones,
        precio: precioTotal - descuento,
        descuento: descuento,
        sinergias: [
          "Esta combinación proporciona apoyo nutricional completo para todas tus necesidades",
          "Los suplementos están organizados por momento del día para facilitar su consumo",
          "Formulación balanceada para resultados óptimos según tus necesidades específicas",
          "Incluye todos los suplementos recomendados para asegurar que no falte ningún nutriente esencial",
        ],
        instrucciones: instruccionesPersonalizadas,
      }

      // Only use the comprehensive pack
      setCombinaciones([packBienestar])
      setActiveCombination(packBienestar.id)
    } else {
      // Combinación predeterminada si no hay recomendaciones
      const defaultSupplements = filterSupplementsByDietaryRestrictions([
        {
          id: 1,
          nombre: "Proteína de Suero",
          descripcion: "Proteína de suero aislada de alta calidad para la recuperación muscular y el crecimiento.",
          imagen: "/placeholder.svg",
          calificacion: 4.8,
          beneficios: [
            "Ayuda a la recuperación muscular",
            "Promueve el crecimiento muscular",
            "Fácil digestión y absorción",
            "Bajo en carbohidratos y grasas",
          ],
          etiquetas: ["Ganancia muscular", "Recuperación", "Sin lactosa"],
          marcas: [
            { nombre: "NutriTech", precio: 1290, enlace: "https://www.mercadolibre.com.uy" },
            { nombre: "MusclePro", precio: 1350, enlace: "https://www.mercadolibre.com.uy" },
          ],
          interaccionesMedicamentos: [],
          consultarNutricionista: false,
          momentoOptimo: "Después del ejercicio o con el desayuno",
          dosificacion: "20-30g por porción, 1-2 veces al día",
          consejosAbsorcion: "Mezclar con agua o leche según preferencia",
        },
        {
          id: 2,
          nombre: "Omega-3",
          descripcion: "Suplemento de ácidos grasos omega-3 para la salud cardiovascular y cerebral.",
          imagen: "/placeholder.svg",
          calificacion: 4.6,
          beneficios: [
            "Apoya la salud cardiovascular",
            "Mejora la función cerebral",
            "Reduce la inflamación",
            "Promueve la salud de las articulaciones",
          ],
          etiquetas: ["Salud cardiovascular", "Función cerebral", "Antiinflamatorio"],
          marcas: [
            { nombre: "VitaNature", precio: 790, enlace: "https://www.mercadolibre.com.uy" },
            { nombre: "OmegaLife", precio: 850, enlace: "https://www.mercadolibre.com.uy" },
          ],
          interaccionesMedicamentos: [],
          consultarNutricionista: false,
          momentoOptimo: "Con las comidas",
          dosificacion: "1-2 cápsulas diarias con comida",
          consejosAbsorcion: "Tomar con alimentos que contengan grasas para mejor absorción",
        },
        {
          id: 3,
          nombre: "Magnesio Bisglicinato",
          descripcion: "Suplemento de magnesio de alta absorción para la reducción del estrés y la mejora del sueño.",
          imagen: "/placeholder.svg",
          calificacion: 4.7,
          beneficios: [
            "Ayuda a reducir el estrés y la ansiedad",
            "Mejora la calidad del sueño",
            "Previene calambres musculares",
            "Apoya la salud ósea",
          ],
          etiquetas: ["Reducción del estrés", "Mejor sueño", "Salud muscular"],
          marcas: [
            { nombre: "RelaxNow", precio: 650, enlace: "https://www.mercadolibre.com.uy" },
            { nombre: "MineralPlus", precio: 690, enlace: "https://www.mercadolibre.com.uy" },
          ],
          interaccionesMedicamentos: [],
          consultarNutricionista: false,
          momentoOptimo: "Por la noche antes de dormir",
          dosificacion: "200-400mg diarios",
          consejosAbsorcion: "Las formas queladas como el glicinato tienen mejor biodisponibilidad",
        },
        {
          id: 4,
          nombre: "Omega-3 Vegano (ALA)",
          descripcion: "Omega-3 de fuentes vegetales como algas marinas, chía y linaza. Ideal para veganos y vegetarianos.",
          imagen: "/placeholder.svg",
          calificacion: 4.7,
          beneficios: [
            "Apoya la salud cardiovascular de forma natural",
            "Proporciona propiedades antiinflamatorias",
            "Contribuye a la salud cerebral",
            "100% libre de contaminantes marinos",
          ],
          etiquetas: ["Vegano", "Salud cardiovascular", "Función cerebral"],
          marcas: [
            { nombre: "VegaOmega", precio: 890, enlace: "https://www.mercadolibre.com.uy" },
            { nombre: "PlantLife", precio: 950, enlace: "https://www.mercadolibre.com.uy" },
          ],
          interaccionesMedicamentos: [],
          consultarNutricionista: false,
          momentoOptimo: "Con las comidas principales",
          dosificacion: "2-3g de ALA diario + 250-500mg EPA/DHA de algas",
          consejosAbsorcion: "Combinar con alimentos ricos en grasas saludables para mejor absorción",
        },
        {
          id: 5,
          nombre: "Proteína de Guisante",
          descripcion: "Proteína vegetal completa de alta calidad, ideal para veganos y personas con intolerancia a la lactosa.",
          imagen: "/placeholder.svg",
          calificacion: 4.6,
          beneficios: [
            "Promueve el crecimiento muscular",
            "Rica en aminoácidos esenciales y BCAA",
            "Fácil digestión sin lactosa",
            "100% vegetal y sostenible",
          ],
          etiquetas: ["Vegano", "Ganancia muscular", "Sin lactosa"],
          marcas: [
            { nombre: "VegaPro", precio: 1150, enlace: "https://www.mercadolibre.com.uy" },
            { nombre: "PlantPower", precio: 1200, enlace: "https://www.mercadolibre.com.uy" },
          ],
          interaccionesMedicamentos: [],
          consultarNutricionista: false,
          momentoOptimo: "Después del ejercicio o con el desayuno",
          dosificacion: "20-30g por porción, 1-2 veces al día",
          consejosAbsorcion: "Mezclar con agua o leche vegetal. Combinar con frutas para mejor sabor",
        },
      ])

      const defaultPack = {
        id: 1,
        nombre: "Tu Régimen Personalizado",
        descripcion:
          "Combinación completa para mejorar tu salud general y bienestar, organizada en un régimen diario fácil de seguir.",
        suplementos: defaultSupplements,
        precio: 2500,
        descuento: 300,
        sinergias: [
          "Esta combinación proporciona apoyo nutricional completo para tus necesidades básicas",
          "Los suplementos están organizados por momento del día para facilitar su consumo",
          "Formulación balanceada para resultados óptimos",
        ],
        instrucciones: generarInstruccionesPersonalizadas(defaultSupplements),
      }

      setCombinaciones([defaultPack])
      setActiveCombination(defaultPack.id)
    }
  }, [userProfile])

  // Función auxiliar para generar instrucciones personalizadas
  function generarInstruccionesPersonalizadas(suplementos: any[]) {
    let instrucciones =
      "Para obtener los mejores resultados, tome los suplementos de este pack siguiendo estas instrucciones detalladas:\n\n"

    // Clasificar suplementos por momento óptimo
    const porMañana = suplementos.filter(
      (s: any) => s.momentoOptimo.toLowerCase().includes("mañana") || s.momentoOptimo.toLowerCase().includes("desayuno"),
    )
    const porNoche = suplementos.filter(
      (s: any) => s.momentoOptimo.toLowerCase().includes("noche") || s.momentoOptimo.toLowerCase().includes("dormir"),
    )
    const conComidas = suplementos.filter((s: any) => s.momentoOptimo.toLowerCase().includes("comida"))
    const antesEjercicio = suplementos.filter(
      (s: any) => s.momentoOptimo.toLowerCase().includes("antes") && s.momentoOptimo.toLowerCase().includes("ejercicio"),
    )
    const despuesEjercicio = suplementos.filter(
      (s: any) => s.momentoOptimo.toLowerCase().includes("después") && s.momentoOptimo.toLowerCase().includes("ejercicio"),
    )

    // Identificar suplementos con timing flexible o no especificado
    const otrosMomentos = suplementos.filter(
      (s: any) =>
        !s.momentoOptimo.toLowerCase().includes("mañana") &&
        !s.momentoOptimo.toLowerCase().includes("desayuno") &&
        !s.momentoOptimo.toLowerCase().includes("noche") &&
        !s.momentoOptimo.toLowerCase().includes("dormir") &&
        !s.momentoOptimo.toLowerCase().includes("comida") &&
        !s.momentoOptimo.toLowerCase().includes("antes") &&
        !s.momentoOptimo.toLowerCase().includes("después") &&
        !s.momentoOptimo.toLowerCase().includes("ejercicio"),
    )

    if (porMañana.length > 0) {
      instrucciones += `- Por la mañana (con el desayuno): ${porMañana.map((s: any) => traducirNombre(s.nombre)).join(", ")}\n`
    }

    if (conComidas.length > 0) {
      instrucciones += `- Con las comidas principales: ${conComidas.map((s: any) => traducirNombre(s.nombre)).join(", ")}\n`
    }

    if (antesEjercicio.length > 0) {
      instrucciones += `- Antes del ejercicio: ${antesEjercicio.map((s: any) => traducirNombre(s.nombre)).join(", ")}\n`
    }

    if (despuesEjercicio.length > 0) {
      instrucciones += `- Después del ejercicio: ${despuesEjercicio.map((s: any) => traducirNombre(s.nombre)).join(", ")}\n`
    }

    if (otrosMomentos.length > 0) {
      instrucciones += `- Timing flexible (cualquier momento del día): ${otrosMomentos.map((s: any) => traducirNombre(s.nombre)).join(", ")}\n`
    }

    if (porNoche.length > 0) {
      instrucciones += `- Por la noche: ${porNoche.map((s: any) => traducirNombre(s.nombre)).join(", ")}\n`
    }

    instrucciones += "\nDosificación recomendada:\n"
    suplementos.forEach((s: any) => {
      instrucciones += `- ${traducirNombre(s.nombre)}: ${s.dosificacion}\n`
    })

    // Añadir información sobre periodos de descanso para suplementos específicos
    const suplementosConDescanso = suplementos.filter((s: any) => requierePeriodoDescanso(s.nombre))
    if (suplementosConDescanso.length > 0) {
      instrucciones += "\nPeriodos de descanso recomendados:\n"
      suplementosConDescanso.forEach((s: any) => {
        instrucciones += `- ${traducirNombre(s.nombre)}: ${obtenerInfoPeriodoDescanso(s.nombre)}\n`
      })
    }

    // Añadir consejos de absorción si están disponibles
    const suplementosConConsejos = suplementos.filter((s: any) => s.consejosAbsorcion && s.consejosAbsorcion.length > 10)
    if (suplementosConConsejos.length > 0) {
      instrucciones += "\nConsejos para mejorar la absorción:\n"
      suplementosConConsejos.forEach((s: any) => {
        instrucciones += `- ${traducirNombre(s.nombre)}: ${s.consejosAbsorcion}\n`
      })
    }

    // Añadir información sobre combinaciones sinérgicas
    instrucciones += "\nCombinaciones sinérgicas recomendadas:\n"

    // Proteína y creatina
    if (
      suplementos.some((s) => s.nombre.toLowerCase().includes("proteína")) &&
      suplementos.some((s) => s.nombre.toLowerCase().includes("creatina"))
    ) {
      instrucciones +=
        "- Tomar proteína y creatina juntas después del entrenamiento para maximizar la recuperación y el crecimiento muscular.\n"
    }

    // Vitamina D y calcio
    if (
      suplementos.some((s) => s.nombre.toLowerCase().includes("vitamina d")) &&
      suplementos.some((s) => s.nombre.toLowerCase().includes("calcio"))
    ) {
      instrucciones +=
        "- Combinar vitamina D con calcio para mejorar la absorción del calcio y fortalecer la salud ósea.\n"
    }

    // Magnesio y vitamina B6
    if (
      suplementos.some((s) => s.nombre.toLowerCase().includes("magnesio")) &&
      suplementos.some((s) => s.nombre.toLowerCase().includes("vitamina b"))
    ) {
      instrucciones +=
        "- Tomar magnesio junto con vitaminas del complejo B para mejorar la absorción y reducir el estrés.\n"
    }

    // Omega-3 y vitamina E
    if (
      suplementos.some((s) => s.nombre.toLowerCase().includes("omega-3")) &&
      suplementos.some((s) => s.nombre.toLowerCase().includes("vitamina e"))
    ) {
      instrucciones +=
        "- Combinar Omega-3 con vitamina E para potenciar los efectos antioxidantes y antiinflamatorios.\n"
    }

    instrucciones +=
      "\nEsta distribución optimiza la absorción y eficacia de cada suplemento. Consulte con un profesional de la salud antes de comenzar cualquier régimen de suplementación."

    return instrucciones
  }

  // Función para traducir nombres de suplementos
  function traducirNombre(name: string): string {
    const traducciones: Record<string, string> = {
      "Branched-Chain Amino Acids": "Aminoácidos de Cadena Ramificada",
      "Whey Protein": "Proteína de Suero",
      "Plant Protein (Pea or Soy)": "Proteína Vegetal (Guisante o Soja)",
      "Vegan BCAA": "BCAA Vegano",
      "Vegan Omega-3 (ALA)": "Omega-3 Vegano (ALA)",
      Protein: "Proteína",
      "Green Tea Extract": "Extracto de Té Verde",
      Creatine: "Creatina",
      "Omega-3": "Omega-3",
      "Vitamin D": "Vitamina D",
      "Fish Oil": "Aceite de Pescado",
      Magnesium: "Magnesio",
      Zinc: "Zinc",
      Ashwagandha: "Ashwagandha",
      Caffeine: "Cafeína",
      Probiotics: "Probióticos",
      "Vitamin C": "Vitamina C",
      "Vitamin B Complex": "Complejo B",
      Multivitamin: "Multivitamínico",
      Iron: "Hierro",
      Calcium: "Calcio",
      "Vitamin A": "Vitamina A",
      "Vitamin E": "Vitamina E",
      Collagen: "Colágeno",
      Melatonin: "Melatonina",
      Glutamine: "Glutamina",
      "Beta-Alanine": "Beta-Alanina",
      "Vitamin K": "Vitamina K",
      "Vitamin K2": "Vitamina K2",
      "Vitamin B12": "Vitamina B12",
      "Folic Acid": "Ácido Fólico",
      "Coenzyme Q10": "Coenzima Q10",
      CoQ10: "Coenzima Q10",
      "Alpha-Lipoic Acid": "Ácido Alfa-Lipoico",
      Glucosamine: "Glucosamina",
      Chondroitin: "Condroitina",
      MSM: "MSM (Metilsulfonilmetano)",
      Turmeric: "Cúrcuma",
      Curcumin: "Curcumina",
      Ginger: "Jengibre",
      "Garlic Extract": "Extracto de Ajo",
      Echinacea: "Equinácea",
      Elderberry: "Saúco",
      "Ginkgo Biloba": "Ginkgo Biloba",
      Ginseng: "Ginseng",
      "Rhodiola Rosea": "Rhodiola Rosea",
      "L-Theanine": "L-Teanina",
      "Valerian Root": "Valeriana",
      Glycine: "Glicina",
      "L-Glutamine": "L-Glutamina",
      HMB: "HMB (Beta-hidroxi beta-metilbutirato)",
      CLA: "CLA (Ácido Linoleico Conjugado)",
      Glucomannan: "Glucomanano",
      Inulin: "Inulina",
      "Psyllium Husk": "Cáscara de Psyllium",
      "Digestive Enzymes": "Enzimas Digestivas",
      Prebiotics: "Prebióticos",
      "Plant Sterols": "Esteroles Vegetales",
      Fiber: "Fibra",
      Biotin: "Biotina",
      Silica: "Sílice",
      "Maca Root": "Maca",
      "Bacopa Monnieri": "Bacopa Monnieri",
      "Lion's Mane": "Melena de León",
      Phosphatidylserine: "Fosfatidilserina",
    }

    // Si el nombre ya está en español (contiene acentos o ñ), no traducir
    if (/[áéíóúñÑ]/.test(name) || name.includes("Proteína Vegetal") || name.includes("BCAA Vegano") || name.includes("Omega-3 Vegano")) {
      return name
    }
    
    return traducciones[name] || name
  }

  // Función para verificar si un suplemento requiere periodo de descanso
  function requierePeriodoDescanso(name: string): boolean {
    const suplementosConDescanso = [
      "Creatine",
      "Creatina",
      "Caffeine",
      "Cafeína",
      "Ashwagandha",
      "Beta-Alanine",
      "Beta-Alanina",
    ]

    return suplementosConDescanso.includes(name)
  }

  // This function checks if information is directly from the examine file
  function isFromExamineData(supplementName: string, infoType: string, infoContent: string): boolean {
    // Find the supplement in the examine data
    const examineData = suplementosExamine.find(
      (s) =>
        s.nombre.toLowerCase() === supplementName.toLowerCase() ||
        traducirNombre(s.nombre).toLowerCase() === supplementName.toLowerCase(),
    )

    if (!examineData) return false

    // Check different types of information
    switch (infoType) {
      case "descripcion":
        return examineData.descripcion.includes(infoContent)
      case "beneficio":
        return examineData.beneficios.some((b) => b.includes(infoContent)) || false
      case "dosificacion":
        if (!examineData.dosificacion) return false
        return (
          (examineData.dosificacion.general && examineData.dosificacion.general.includes(infoContent)) ||
          (examineData.dosificacion.hombres && examineData.dosificacion.hombres.includes(infoContent)) ||
          (examineData.dosificacion.mujeres && examineData.dosificacion.mujeres.includes(infoContent))
        )
      case "momento_optimo":
        return examineData.momento_optimo ? examineData.momento_optimo.includes(infoContent) : false
      case "consejos_absorcion":
        return examineData.consejos_absorcion ? examineData.consejos_absorcion.includes(infoContent) : false
      case "efecto_secundario":
        return examineData.efectos_secundarios.some((e) => e.includes(infoContent))
      case "evidencia":
        return examineData.evidencia_cientifica
          ? examineData.evidencia_cientifica.some((e) => e.includes(infoContent))
          : false
      default:
        return false
    }
  }

  // Component to display supplement information
  // and improve the display of verification status

  function SupplementInfo({ children }: { children: React.ReactNode }) {
    return <span>{children}</span>
  }

  // Add a specific function to get accurate BCAA and whey protein combination information
  function getBCAAWheyProteinInfo(): React.ReactNode {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-teal-800">Combinación de BCAA y Proteína de Suero</h3>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h4 className="font-medium text-teal-700 mb-2">Información basada en evidencia científica:</h4>
          <p className="text-gray-700 mb-3">
            La evidencia científica muestra que la suplementación con BCAA por sí solos no aumenta el crecimiento muscular, ya que todos
            los aminoácidos esenciales deben estar presentes para la síntesis de proteínas musculares. La proteína de
            suero ya contiene todos los aminoácidos esenciales, incluyendo los BCAA.
          </p>
          <p className="text-gray-700">
            La evidencia científica indica que la proteína de suero completa es más efectiva para la síntesis de
            proteínas musculares que los BCAA aislados. Si ya consumes suficiente proteína (incluyendo proteína de
            suero), la suplementación adicional con BCAA proporciona beneficios mínimos o nulos.
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-700 mb-2">Dosificación recomendada:</h4>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              <span className="font-medium">Proteína de Suero:</span> 20-30g por porción, 1-2 veces al día según
              necesidades proteicas totales
            </li>
            <li>
              <span className="font-medium">BCAA:</span> No necesarios si ya se consume suficiente proteína completa. Si
              se usan, 5-10g por día
            </li>
          </ul>
        </div>

        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
          <h4 className="font-medium text-amber-700 mb-2">Consideraciones importantes:</h4>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>La proteína de suero ya contiene altos niveles de BCAA, especialmente leucina</li>
            <li>Para la mayoría de las personas, la proteína de suero por sí sola es suficiente</li>
            <li>Los BCAA pueden ser redundantes si ya consumes suficiente proteína total</li>
            <li>
              No hay evidencia sólida de que tomar BCAA adicionales junto con proteína de suero
              proporcione beneficios significativos para el crecimiento muscular
            </li>
          </ul>
        </div>

        <div className="flex items-center justify-center bg-gray-100 p-3 rounded-lg">
          <Info className="h-5 w-5 text-gray-500 mr-2" />
          <p className="text-sm text-gray-600">
            Toda esta información está basada en evidencia científica actualizada
          </p>
        </div>
      </div>
    )
  }

  // Also add a function to provide detailed whey protein information
  // Add this function after the getBCAAWheyProteinInfo function:

  function getWheyProteinInfo(): React.ReactNode {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-teal-800">Proteína de Suero para Ganancia Muscular</h3>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h4 className="font-medium text-teal-700 mb-2">Información basada en evidencia científica:</h4>
          <p className="text-gray-700 mb-3">
            La proteína de suero es una de las fuentes de proteína más efectivas para la síntesis de
            proteínas musculares. Es un subproducto de la fabricación de queso y contiene todos los aminoácidos
            esenciales en proporciones óptimas, con altos niveles de leucina, el aminoácido clave para estimular la
            síntesis proteica.
          </p>
          <p className="text-gray-700">
            La proteína de suero se digiere y absorbe rápidamente, lo que la hace ideal para el consumo
            post-entrenamiento cuando los músculos necesitan nutrientes para iniciar el proceso de recuperación y
            crecimiento.
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-700 mb-2">Dosificación recomendada:</h4>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              <span className="font-medium">Dosis general:</span> 20-30g por porción, 1-2 veces al día según necesidades
              proteicas totales
            </li>
            <li>
              <span className="font-medium">Momento óptimo:</span> Dentro de los 30 minutos posteriores al entrenamiento
              para maximizar la recuperación muscular
            </li>
            <li>
              <span className="font-medium">Ingesta diaria total de proteínas:</span> 1.6-2.2g por kg de peso corporal
              para personas que buscan ganancia muscular
            </li>
          </ul>
        </div>

        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
          <h4 className="font-medium text-amber-700 mb-2">Consideraciones importantes:</h4>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>La proteína de suero contiene naturalmente todos los aminoácidos esenciales, incluyendo los BCAA</li>
            <li>
              Existen diferentes formas: concentrado (80% proteína), aislado (90% proteína) e hidrolizado (pre-digerido)
            </li>
            <li>El aislado contiene menos lactosa y es preferible para personas con sensibilidad a la lactosa</li>
            <li>
              La suplementación con proteína es más efectiva cuando forma parte de una dieta con
              adecuada ingesta calórica total
            </li>
            <li>No es necesario suplementar con BCAA adicionales si ya se consume suficiente proteína de suero</li>
          </ul>
        </div>

        <div className="flex items-center justify-center bg-gray-100 p-3 rounded-lg">
          <Info className="h-5 w-5 text-gray-500 mr-2" />
          <p className="text-sm text-gray-600">
            Toda esta información está basada en evidencia científica actualizada
          </p>
        </div>
      </div>
    )
  }

  // Function to get timing rationale
  function getTimingRationale(supplement: any): React.ReactNode {
    // Extract timing information
    const timing = supplement.momentoOptimo.toLowerCase()
    const supplementName = traducirNombre(supplement.nombre)

    if (timing.includes("mañana") || timing.includes("desayuno")) {
      return (
        <SupplementInfo>
          Tomar por la mañana optimiza los niveles de energía durante el día y aprovecha el metabolismo más activo.
        </SupplementInfo>
      )
    } else if (timing.includes("comida")) {
      return (
        <SupplementInfo>
          Tomar con las comidas mejora la absorción y reduce posibles molestias estomacales.
        </SupplementInfo>
      )
    } else if (timing.includes("noche") || timing.includes("dormir")) {
      return (
        <SupplementInfo>
          Tomar antes de dormir favorece la recuperación nocturna y mejora la calidad del sueño.
        </SupplementInfo>
      )
    } else if (timing.includes("antes") && timing.includes("ejercicio")) {
      return (
        <SupplementInfo>
          \ Tomar antes del ejercicio aumenta el rendimiento, la energía y la resistencia durante el entrenamiento.
        </SupplementInfo>
      )
    } else if (timing.includes("después") && timing.includes("ejercicio")) {
      return (
        <SupplementInfo>
          Tomar después del ejercicio acelera la recuperación muscular y repone nutrientes perdidos durante el
          entrenamiento.
        </SupplementInfo>
      )
    } else {
      return (
        <SupplementInfo>
          El momento de consumo es flexible y puede adaptarse a tu rutina diaria. La eficacia del suplemento no se verá
          significativamente afectada por el momento de consumo.
        </SupplementInfo>
      )
    }
  }

  // Function to get absorption tips
  function getAbsorptionTips(supplement: any): React.ReactNode {
    const supplementName = traducirNombre(supplement.nombre)

    if (supplement.consejosAbsorcion && supplement.consejosAbsorcion.length > 10) {
      return (
        <SupplementInfo>
          {supplement.consejosAbsorcion}
        </SupplementInfo>
      )
    }

    // Default absorption tips based on supplement type
    const name = supplement.nombre.toLowerCase()
    if (name.includes("proteína")) {
      return (
        <SupplementInfo>
          Para mejor absorción, consumir dentro de los 30 minutos posteriores al ejercicio. Mezclar con agua para
          absorción más rápida o con leche para liberación más prolongada.
        </SupplementInfo>
      )
    } else if (name.includes("vitamina d") || name.includes("omega") || name.includes("vitamina e")) {
      return (
        <SupplementInfo>
          Al ser liposoluble, se absorbe mejor cuando se toma con alimentos que contienen grasas saludables.
        </SupplementInfo>
      )
    } else if (name.includes("hierro")) {
      return (
        <SupplementInfo>
          La vitamina C mejora significativamente la absorción del hierro. Considere tomar con jugo de naranja o
          alimentos ricos en vitamina C.
        </SupplementInfo>
      )
    } else if (name.includes("calcio")) {
      return (
        <SupplementInfo>
          Dividir en dosis más pequeñas a lo largo del día mejora la absorción. Evitar tomar con alimentos ricos en
          oxalatos o fitatos.
        </SupplementInfo>
      )
    } else if (name.includes("magnesio")) {
      return (
        <SupplementInfo>
          Las formas queladas como el glicinato tienen mejor biodisponibilidad. Tomar con alimentos reduce efectos
          gastrointestinales.
        </SupplementInfo>
      )
    } else if (name.includes("zinc")) {
      return (
        <SupplementInfo>
          La vitamina C mejora la absorción. Evitar tomar con café, té, cereales integrales o suplementos de calcio y
          hierro.
        </SupplementInfo>
      )
    } else if (name.includes("probiótico")) {
      return (
        <SupplementInfo>
          Tomar con o justo antes de una comida que contenga algo de grasa para mejorar la supervivencia a través del
          ácido estomacal.
        </SupplementInfo>
      )
    } else {
      return (
        <SupplementInfo>
          Para optimizar la absorción, tomar con alimentos a menos que se indique lo contrario en el envase.
        </SupplementInfo>
      )
    }
  }

  // Function for rest period information
  function obtenerInfoPeriodoDescanso(name: string): React.ReactNode {
    const informacionDescanso: Record<string, string> = {
      Creatine:
        "Tomar durante 8-12 semanas, seguido de un descanso de 4 semanas. Esta estrategia de ciclado no es estrictamente necesaria según la evidencia científica actual, pero puede ser preferida por algunos usuarios para evitar la adaptación del cuerpo.",
      Creatina:
        "Tomar durante 8-12 semanas, seguido de un descanso de 4 semanas. Esta estrategia de ciclado no es estrictamente necesaria según la evidencia científica actual, pero puede ser preferida por algunos usuarios para evitar la adaptación del cuerpo.",
      Caffeine:
        "Tomar durante 6-8 semanas, seguido de un descanso de 1-2 semanas para evitar desarrollar tolerancia y dependencia. Durante los periodos de descanso puede experimentarse fatiga temporal y dolores de cabeza leves.",
      Cafeína:
        "Tomar durante 6-8 semanas, seguido de un descanso de 1-2 semanas para evitar desarrollar tolerancia y dependencia. Durante los periodos de descanso puede experimentarse fatiga temporal y dolores de cabeza leves.",
      "Beta-Alanine":
        "Tomar diariamente durante 12 semanas, seguido de un descanso de 2-4 semanas. Los ciclos son opcionales pero recomendados para evaluar si se mantienen los beneficios sin suplementación continua.",
      "Beta-Alanina":
        "Tomar diariamente durante 12 semanas, seguido de un descanso de 2-4 semanas. Los ciclos son opcionales pero recomendados para evaluar si se mantienen los beneficios sin suplementación continua.",
      Ashwagandha:
        "Tomar durante 3 meses, seguido de un descanso de 2-4 semanas para evitar la posible adaptación del cuerpo y mantener la efectividad del suplemento.",
    }

    const info = informacionDescanso[name] || "No se requieren periodos de descanso específicos"

    return (
      <SupplementInfo>
        {info}
      </SupplementInfo>
    )
  }

  // Get timing icon based on timing description
  function getTimingIcon(timing: string) {
    const timingLower = timing.toLowerCase()
    if (timingLower.includes("mañana") || timingLower.includes("desayuno")) {
      return <Coffee className="h-5 w-5 text-amber-500" />
    } else if (timingLower.includes("comida")) {
      return <Utensils className="h-5 w-5 text-green-600" />
    } else if (timingLower.includes("noche") || timingLower.includes("dormir")) {
      return <Moon className="h-5 w-5 text-indigo-600" />
    } else if (timingLower.includes("ejercicio")) {
      return <Dumbbell className="h-5 w-5 text-red-500" />
    } else {
      return <Calendar className="h-5 w-5 text-blue-500" />
    }
  }

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      if (prev.includes(id)) {
        return prev.filter((favId) => favId !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  const handleStartOver = () => {
    if (confirm("¿Estás seguro de que quieres comenzar de nuevo? Esto borrará todos tus datos actuales.")) {
      resetProfile()
      window.location.href = "/"
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-teal-600 mx-auto mb-4" />
          <p className="text-gray-600">Cargando tus recomendaciones...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-teal-50 flex flex-col">
      <header className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center">
          <Link href="/dietary-restrictions" className="inline-flex items-center text-teal-700 hover:text-teal-800">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a restricciones
          </Link>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">Paso 6 de 6</div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleStartOver}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Comenzar de nuevo
            </Button>
          </div>
        </div>
        <div className="mt-4">
          <Progress value={100} className="h-2 bg-teal-100" />
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-teal-800 mb-2 text-center">Tus Recomendaciones Personalizadas</h1>
          <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
            <div className="flex items-center gap-2 text-teal-700">
              <Info className="h-5 w-5" />
              <p className="text-sm">
                Estas recomendaciones están basadas en evidencia científica actualizada y certificadas por
                profesionales de la salud. Recuerda consultar con un profesional de la salud antes de comenzar cualquier
                régimen de suplementos.
              </p>
            </div>
          </div>
          {userProfile && userProfile.gender && (
            <p className="text-center text-gray-600 mb-6">
              Basadas en {userProfile.bloodTestResults && userProfile.bloodTestResults.length > 0 ? "tus análisis de sangre, " : ""}tus objetivos de salud como {userProfile.gender === "male" ? "hombre" : "mujer"}{userProfile.age ? ` de ${userProfile.age} años` : ""} y tus restricciones dietéticas.
            </p>
          )}
          <div className="text-center mb-8">
            <p className="text-teal-700 font-medium mb-2">
              Estas recomendaciones están basadas en evidencia científica y certificadas por profesionales de la salud.
            </p>
            <div className="inline-flex items-center justify-center bg-green-100 border-l-4 border-green-500 px-3 py-1 text-sm">
              <Check className="h-3 w-3 mr-1 text-green-600" />
              <span>Información basada en evidencia científica actualizada</span>
            </div>
          </div>

          <Tabs defaultValue="supplements" className="mb-8">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="supplements">Suplementos Individuales</TabsTrigger>
              <TabsTrigger value="combinations">Régimen Completo</TabsTrigger>
            </TabsList>

            <TabsContent value="supplements" className="space-y-6">
              {/* Sección de suplementos basados en análisis de sangre */}
              {bloodTestSupplements.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-teal-800">
                        Suplementos Recomendados por Deficiencias Detectadas
                      </h2>
                      <p className="text-sm text-gray-600">
                        Basados en los resultados de tu análisis de sangre
                      </p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    {supplements.filter(s => s.fromBloodTest).map((supplement) => (
                <Card key={supplement.id} className="overflow-hidden border-2 border-red-200 bg-red-50/20">
                  <div className="md:flex">
                    <div className="md:w-1/4 bg-red-50 flex items-center justify-center p-4">
                      <Image
                        src={supplement.imagen || "/placeholder.svg"}
                        alt={traducirNombre(supplement.nombre)}
                        width={200}
                        height={200}
                        className="object-contain h-48"
                      />
                    </div>
                    <div className="md:w-3/4">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl text-teal-800">{traducirNombre(supplement.nombre)}</CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                Deficiencia detectada
                              </Badge>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleFavorite(supplement.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <Heart
                              className={`h-5 w-5 ${
                                favorites.includes(supplement.id) ? "fill-red-500 text-red-500" : ""
                              }`}
                            />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-gray-600 mb-3">
                          <SupplementInfo>
                            {supplement.descripcion}
                          </SupplementInfo>
                        </p>
                        {bloodTestData[supplement.nombre] && (
                          <div className="bg-red-50 border border-red-200 p-3 rounded-lg mb-3">
                            <h4 className="font-medium text-red-800 mb-2">Valor detectado en tu análisis:</h4>
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-2xl font-bold text-red-700">
                                  {bloodTestData[supplement.nombre].value} {bloodTestData[supplement.nombre].unit}
                                </span>
                                <Badge className="ml-2 bg-red-600 text-white">
                                  {bloodTestData[supplement.nombre].status}
                                </Badge>
                              </div>
                              <div className="text-sm text-gray-600">
                                <p>Rango óptimo:</p>
                                <p className="font-medium">
                                  {supplement.nombre === 'Vitamina D' && '30-60 ng/mL'}
                                  {supplement.nombre === 'Vitamina B12' && '300-900 pg/mL'}
                                  {supplement.nombre === 'Hierro' && '60-170 μg/dL'}
                                  {supplement.nombre === 'Magnesio' && '1.8-2.4 mg/dL'}
                                  {supplement.nombre === 'Calcio' && '8.5-10.5 mg/dL'}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {supplement.etiquetas.map((tag: any, index: any) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-teal-50 text-teal-700 hover:bg-teal-100"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {requierePeriodoDescanso(supplement.nombre) && (
                            <Badge variant="outline" className="border-blue-400 text-blue-600 bg-blue-50">
                              Requiere periodos de descanso
                            </Badge>
                          )}
                        </div>
                        <div className="mb-3">
                          <h4 className="font-medium text-gray-700 mb-1">Beneficios:</h4>
                          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            {supplement.beneficios.map((beneficio: any, index: any) => (
                              <li key={index}>
                                <SupplementInfo>
                                  {beneficio}
                                </SupplementInfo>
                              </li>
                            ))}
                          </ul>
                        </div>
                        {requierePeriodoDescanso(supplement.nombre) && (
                          <div className="mb-3 bg-blue-50 p-3 rounded-md border border-blue-200">
                            <h4 className="font-medium text-blue-700 mb-1 flex items-center gap-1">
                              <Info className="h-4 w-4" />
                              Periodo de descanso recomendado:
                            </h4>
                            <p className="text-sm text-blue-700">{obtenerInfoPeriodoDescanso(supplement.nombre)}</p>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="flex flex-col items-start">
                        <h4 className="font-medium text-gray-700 mb-2">Disponible en:</h4>
                        <div className="grid gap-2 w-full">
                          {supplement.marcas.map((marca: any, index: any) => (
                            <div key={index} className="flex justify-between items-center">
                              <div>
                                <span className="font-medium">{marca.nombre}</span>
                                <span className="text-gray-600 ml-2">$ {marca.precio}</span>
                              </div>
                              <Link href={marca.enlace} target="_blank" rel="noopener noreferrer">
                                <Button className="bg-teal-600 hover:bg-teal-700">
                                  <ShoppingCart className="h-4 w-4 mr-2" />
                                  Comprar
                                </Button>
                              </Link>
                            </div>
                          ))}
                        </div>
                        <AffiliateDisclosure variant="inline" className="mt-2" />
                        {supplement.interaccionesMedicamentos && supplement.interaccionesMedicamentos.length > 0 && (
                          <div className="mt-2 text-red-600 text-sm flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            <span>Posibles interacciones medicamentosas</span>
                          </div>
                        )}

                        {supplement.consultarNutricionista && (
                          <div className="mt-1 text-amber-600 text-sm flex items-center gap-1">
                            <Info className="h-3 w-3" />
                            <span>Consulta con un profesional de la salud recomendada</span>
                          </div>
                        )}
                        <Link
                          href={`/supplement/${supplement.id}`}
                          className="text-teal-600 hover:text-teal-700 text-sm mt-4 inline-flex items-center"
                        >
                          Ver más detalles
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </Link>
                      </CardFooter>
                    </div>
                  </div>
                </Card>
              ))}
                  </div>
                </div>
              )}

              {/* Sección de suplementos basados en objetivos de salud */}
              {supplements.filter(s => !s.fromBloodTest).length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 bg-teal-100 rounded-full flex items-center justify-center">
                      <Heart className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-teal-800">
                        Suplementos Recomendados por Objetivos de Salud
                      </h2>
                      <p className="text-sm text-gray-600">
                        Basados en tus metas personales y perfil de salud
                      </p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    {supplements.filter(s => !s.fromBloodTest).map((supplement) => (
                      <Card key={supplement.id} className="overflow-hidden">
                        <div className="md:flex">
                          <div className="md:w-1/4 bg-gray-50 flex items-center justify-center p-4">
                            <Image
                              src={supplement.imagen || "/placeholder.svg"}
                              alt={traducirNombre(supplement.nombre)}
                              width={200}
                              height={200}
                              className="object-contain h-48"
                            />
                          </div>
                          <div className="md:w-3/4">
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start">
                                <div>
                                  <CardTitle className="text-xl text-teal-800">{traducirNombre(supplement.nombre)}</CardTitle>
                                  <div className="flex items-center mt-1">
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => toggleFavorite(supplement.id)}
                                  className="text-gray-400 hover:text-red-500"
                                >
                                  <Heart
                                    className={`h-5 w-5 ${
                                      favorites.includes(supplement.id) ? "fill-red-500 text-red-500" : ""
                                    }`}
                                  />
                                </Button>
                              </div>
                            </CardHeader>
                            <CardContent className="pb-2">
                              <p className="text-gray-600 mb-3">
                                <SupplementInfo>
                                  {supplement.descripcion}
                                </SupplementInfo>
                              </p>
                              <div className="flex flex-wrap gap-2 mb-3">
                                {supplement.etiquetas.map((tag: any, index: any) => (
                                  <Badge
                                    key={index}
                                    variant="secondary"
                                    className="bg-teal-50 text-teal-700 hover:bg-teal-100"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                                {requierePeriodoDescanso(supplement.nombre) && (
                                  <Badge variant="outline" className="border-blue-400 text-blue-600 bg-blue-50">
                                    Requiere periodos de descanso
                                  </Badge>
                                )}
                              </div>
                              <div className="mb-3">
                                <h4 className="font-medium text-gray-700 mb-1">Beneficios:</h4>
                                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                  {supplement.beneficios.map((beneficio: any, index: any) => (
                                    <li key={index}>
                                      <SupplementInfo>
                                        {beneficio}
                                      </SupplementInfo>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              {requierePeriodoDescanso(supplement.nombre) && (
                                <div className="mb-3 bg-blue-50 p-3 rounded-md border border-blue-200">
                                  <h4 className="font-medium text-blue-700 mb-1 flex items-center gap-1">
                                    <Info className="h-4 w-4" />
                                    Periodo de descanso recomendado:
                                  </h4>
                                  <p className="text-sm text-blue-700">{obtenerInfoPeriodoDescanso(supplement.nombre)}</p>
                                </div>
                              )}
                            </CardContent>
                            <CardFooter className="flex flex-col items-start">
                              <h4 className="font-medium text-gray-700 mb-2">Disponible en:</h4>
                              <div className="grid gap-2 w-full">
                                {supplement.marcas.map((marca: any, index: any) => (
                                  <div key={index} className="flex justify-between items-center">
                                    <div>
                                      <span className="font-medium">{marca.nombre}</span>
                                      <span className="text-gray-600 ml-2">$ {marca.precio}</span>
                                    </div>
                                    <Link href={marca.enlace} target="_blank" rel="noopener noreferrer">
                                      <Button className="bg-teal-600 hover:bg-teal-700">
                                        <ShoppingCart className="h-4 w-4 mr-2" />
                                        Comprar
                                      </Button>
                                    </Link>
                                  </div>
                                ))}
                              </div>
                              <Separator className="my-4" />
                              <Button
                                variant="ghost"
                                onClick={() => toggleDetails(supplement.id, supplement.nombre)}
                                className="flex items-center text-teal-600 hover:text-teal-700 w-full"
                              >
                                {isExpanded(supplement.id, supplement.nombre) ? (
                                  <>
                                    <ChevronUp className="h-4 w-4 mr-2" />
                                    Ocultar detalles
                                  </>
                                ) : (
                                  <>
                                    <ChevronDown className="h-4 w-4 mr-2" />
                                    Ver información científica completa
                                  </>
                                )}
                              </Button>
                              {isExpanded(supplement.id, supplement.nombre) && (
                                <SupplementDetails
                                  supplement={userProfile?.recommendations?.find((rec) => rec.name === supplement.nombre)}
                                  gender={userProfile?.gender || "male"}
                                  age={userProfile?.age || 30}
                                />
                              )}
                            </CardFooter>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="combinations" className="space-y-6">
              {/* Single comprehensive regimen */}
              {combinaciones.length > 0 && (
                <Card className="overflow-hidden">
                  <CardHeader className="pb-2 bg-gradient-to-r from-teal-50 to-green-50">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl text-teal-800">{combinaciones[0].nombre}</CardTitle>
                      <Badge className="bg-teal-600">Ahorra $ {combinaciones[0].descuento}</Badge>
                    </div>
                    <CardDescription className="text-base mt-2">{combinaciones[0].descripcion}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {/* Synergies section */}
                    <div className="mb-8">
                      <h3 className="text-lg font-medium text-teal-800 mb-4 flex items-center">
                        <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                        Beneficios de este régimen
                      </h3>
                      <div className="bg-teal-50 rounded-lg p-5">
                        <ul className="space-y-3">
                          {combinaciones[0].sinergias.map((sinergia, index) => (
                            <li key={index} className="flex items-start">
                              <div className="mr-3 mt-0.5 flex-shrink-0">
                                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-600 text-white">
                                  <Check className="h-3 w-3" />
                                </div>
                              </div>
                              <p className="text-gray-700">{sinergia}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Daily schedule section */}
                    <div className="mb-8">
                      <h3 className="text-lg font-medium text-teal-800 mb-4 flex items-center">
                        <Clock className="h-5 w-5 mr-2 text-blue-500" />
                        Tu plan diario de suplementos
                      </h3>

                      <div className="space-y-4">
                        {/* Morning supplements - only show if there are morning supplements */}
                        {(() => {
                          // Usar la misma lógica de clasificación que el backend
                          const suplementosMañana = combinaciones[0].suplementos.filter((s: any) => {
                            const momento = s.momentoOptimo.toLowerCase()
                            const nombre = s.nombre.toLowerCase()
                            return (momento.includes("mañana") || momento.includes("desayuno") || 
                                   momento.includes("ayunas") || nombre.includes("vitamina d")) &&
                                   !momento.includes("noche") && !momento.includes("ejercicio")
                          })
                          
                          return suplementosMañana.length > 0 && (
                          <div className="bg-amber-50 rounded-lg p-5 border border-amber-100">
                            <div className="flex items-center mb-3">
                              <Sun className="h-5 w-5 text-amber-500 mr-2" />
                              <h4 className="font-medium text-amber-800">Por la mañana</h4>
                            </div>
                            <div className="space-y-4">
                              {suplementosMañana.map((suplemento, idx) => (
                                  <div key={idx} className="bg-white rounded-md p-4 shadow-sm">
                                    <div className="flex justify-between items-start">
                                      <div className="flex items-start">
                                        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                                          <Coffee className="h-5 w-5 text-amber-600" />
                                        </div>
                                        <div>
                                          <h5 className="font-medium text-gray-800">
                                            {traducirNombre(suplemento.nombre)}
                                          </h5>
                                          <p className="text-sm text-gray-600 mt-1">
                                            Tomar con el desayuno -
                                            <SupplementInfo>
                                              {suplemento.dosificacion}
                                            </SupplementInfo>
                                          </p>
                                        </div>
                                      </div>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-gray-400 hover:text-teal-600"
                                        onClick={() => toggleDetails(combinaciones[0].id, suplemento.nombre)}
                                      >
                                        {isExpanded(combinaciones[0].id, suplemento.nombre) ? (
                                          <ChevronUp className="h-5 w-5" />
                                        ) : (
                                          <HelpCircle className="h-5 w-5" />
                                        )}
                                      </Button>
                                    </div>

                                    {isExpanded(combinaciones[0].id, suplemento.nombre) && (
                                      <div className="mt-3 pt-3 border-t text-sm">
                                        <p className="text-gray-700 mb-2">
                                          <span className="font-medium">¿Por qué por la mañana?</span>{" "}
                                          {getTimingRationale(suplemento)}
                                        </p>
                                        <p className="text-gray-700">
                                          <span className="font-medium">Consejo de absorción:</span>{" "}
                                          {getAbsorptionTips(suplemento)}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                ))}
                            </div>
                          </div>
                        )
                        })()}

                        {/* With meals supplements - only show if there are meal-related supplements */}
                        {combinaciones[0].suplementos.filter((s: any) => s.momentoOptimo.toLowerCase().includes("comida"))
                          .length > 0 && (
                          <div className="bg-green-50 rounded-lg p-5 border border-green-100">
                            <div className="flex items-center mb-3">
                              <Utensils className="h-5 w-5 text-green-600 mr-2" />
                              <h4 className="font-medium text-green-800">Con las comidas</h4>
                            </div>
                            <div className="space-y-4">
                              {combinaciones[0].suplementos
                                .filter((s: any) => s.momentoOptimo.toLowerCase().includes("comida"))
                                .map((suplemento, idx) => (
                                  <div key={idx} className="bg-white rounded-md p-4 shadow-sm">
                                    <div className="flex justify-between items-start">
                                      <div className="flex items-start">
                                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                                          <Utensils className="h-5 w-5 text-green-600" />
                                        </div>
                                        <div>
                                          <h5 className="font-medium text-gray-800">
                                            {traducirNombre(suplemento.nombre)}
                                          </h5>
                                          <p className="text-sm text-gray-600 mt-1">
                                            Tomar con las comidas principales -
                                            <SupplementInfo>
                                              {suplemento.dosificacion}
                                            </SupplementInfo>
                                          </p>
                                        </div>
                                      </div>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-gray-400 hover:text-teal-600"
                                        onClick={() => toggleDetails(combinaciones[0].id, suplemento.nombre)}
                                      >
                                        {isExpanded(combinaciones[0].id, suplemento.nombre) ? (
                                          <ChevronUp className="h-5 w-5" />
                                        ) : (
                                          <HelpCircle className="h-5 w-5" />
                                        )}
                                      </Button>
                                    </div>

                                    {isExpanded(combinaciones[0].id, suplemento.nombre) && (
                                      <div className="mt-3 pt-3 border-t text-sm">
                                        <p className="text-gray-700 mb-2">
                                          <span className="font-medium">¿Por qué con las comidas?</span>{" "}
                                          {getTimingRationale(suplemento)}
                                        </p>
                                        <p className="text-gray-700">
                                          <span className="font-medium">Consejo de absorción:</span>{" "}
                                          {getAbsorptionTips(suplemento)}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}

                        {/* Exercise supplements - only show if there are exercise-related supplements */}
                        {combinaciones[0].suplementos.filter((s: any) => s.momentoOptimo.toLowerCase().includes("ejercicio"))
                          .length > 0 && (
                          <div className="bg-red-50 rounded-lg p-5 border border-red-100">
                            <div className="flex items-center mb-3">
                              <Dumbbell className="h-5 w-5 text-red-500 mr-2" />
                              <h4 className="font-medium text-red-800">Para días de entrenamiento</h4>
                            </div>
                            <div className="space-y-4">
                              {combinaciones[0].suplementos
                                .filter((s: any) => s.momentoOptimo.toLowerCase().includes("ejercicio"))
                                .map((suplemento, idx) => (
                                  <div key={idx} className="bg-white rounded-md p-4 shadow-sm">
                                    <div className="flex justify-between items-start">
                                      <div className="flex items-start">
                                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                                          <Dumbbell className="h-5 w-5 text-red-500" />
                                        </div>
                                        <div>
                                          <h5 className="font-medium text-gray-800">
                                            {traducirNombre(suplemento.nombre)}
                                          </h5>
                                          <p className="text-sm text-gray-600 mt-1">
                                            {suplemento.momentoOptimo.toLowerCase().includes("antes")
                                              ? "Tomar antes del ejercicio"
                                              : "Tomar después del ejercicio"}{" "}
                                            -
                                            <SupplementInfo>
                                              {suplemento.dosificacion}
                                            </SupplementInfo>
                                          </p>
                                        </div>
                                      </div>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-gray-400 hover:text-teal-600"
                                        onClick={() => toggleDetails(combinaciones[0].id, suplemento.nombre)}
                                      >
                                        {isExpanded(combinaciones[0].id, suplemento.nombre) ? (
                                          <ChevronUp className="h-5 w-5" />
                                        ) : (
                                          <HelpCircle className="h-5 w-5" />
                                        )}
                                      </Button>
                                    </div>

                                    {isExpanded(combinaciones[0].id, suplemento.nombre) && (
                                      <div className="mt-3 pt-3 border-t text-sm">
                                        <p className="text-gray-700 mb-2">
                                          <span className="font-medium">
                                            ¿Por qué{" "}
                                            {suplemento.momentoOptimo.toLowerCase().includes("antes")
                                              ? "antes"
                                              : "después"}{" "}
                                            del ejercicio?
                                          </span>{" "}
                                          {getTimingRationale(suplemento)}
                                        </p>
                                        <p className="text-gray-700">
                                          <span className="font-medium">Consejo de absorción:</span>{" "}
                                          {getAbsorptionTips(suplemento)}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}

                        {/* Evening supplements - only show if there are evening supplements */}
                        {combinaciones[0].suplementos.filter(
                          (s) =>
                            s.momentoOptimo.toLowerCase().includes("noche") ||
                            s.momentoOptimo.toLowerCase().includes("dormir"),
                        ).length > 0 && (
                          <div className="bg-indigo-50 rounded-lg p-5 border border-indigo-100">
                            <div className="flex items-center mb-3">
                              <Moon className="h-5 w-5 text-indigo-500 mr-2" />
                              <h4 className="font-medium text-indigo-800">Por la noche</h4>
                            </div>
                            <div className="space-y-4">
                              {combinaciones[0].suplementos
                                .filter(
                                  (s) =>
                                    s.momentoOptimo.toLowerCase().includes("noche") ||
                                    s.momentoOptimo.toLowerCase().includes("dormir"),
                                )
                                .map((suplemento, idx) => (
                                  <div key={idx} className="bg-white rounded-md p-4 shadow-sm">
                                    <div className="flex justify-between items-start">
                                      <div className="flex items-start">
                                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                                          <Moon className="h-5 w-5 text-indigo-600" />
                                        </div>
                                        <div>
                                          <h5 className="font-medium text-gray-800">
                                            {traducirNombre(suplemento.nombre)}
                                          </h5>
                                          <p className="text-sm text-gray-600 mt-1">
                                            Tomar antes de dormir -
                                            <SupplementInfo>
                                              {suplemento.dosificacion}
                                            </SupplementInfo>
                                          </p>
                                        </div>
                                      </div>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-gray-400 hover:text-teal-600"
                                        onClick={() => toggleDetails(combinaciones[0].id, suplemento.nombre)}
                                      >
                                        {isExpanded(combinaciones[0].id, suplemento.nombre) ? (
                                          <ChevronUp className="h-5 w-5" />
                                        ) : (
                                          <HelpCircle className="h-5 w-5" />
                                        )}
                                      </Button>
                                    </div>

                                    {isExpanded(combinaciones[0].id, suplemento.nombre) && (
                                      <div className="mt-3 pt-3 border-t text-sm">
                                        <p className="text-gray-700 mb-2">
                                          <span className="font-medium">¿Por qué por la noche?</span>{" "}
                                          {getTimingRationale(suplemento)}
                                        </p>
                                        <p className="text-gray-700">
                                          <span className="font-medium">Consejo de absorción:</span>{" "}
                                          {getAbsorptionTips(suplemento)}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}

                        {/* Flexible timing supplements - for supplements that don't have a specific timing */}
                        {combinaciones[0].suplementos.filter(
                          (s) =>
                            !s.momentoOptimo.toLowerCase().includes("mañana") &&
                            !s.momentoOptimo.toLowerCase().includes("desayuno") &&
                            !s.momentoOptimo.toLowerCase().includes("noche") &&
                            !s.momentoOptimo.toLowerCase().includes("dormir") &&
                            !s.momentoOptimo.toLowerCase().includes("comida") &&
                            !s.momentoOptimo.toLowerCase().includes("ejercicio"),
                        ).length > 0 && (
                          <div className="bg-blue-50 rounded-lg p-5 border border-blue-100">
                            <div className="flex items-center mb-3">
                              <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                              <h4 className="font-medium text-blue-800">Timing flexible</h4>
                            </div>
                            <div className="space-y-4">
                              {combinaciones[0].suplementos
                                .filter(
                                  (s) =>
                                    !s.momentoOptimo.toLowerCase().includes("mañana") &&
                                    !s.momentoOptimo.toLowerCase().includes("desayuno") &&
                                    !s.momentoOptimo.toLowerCase().includes("noche") &&
                                    !s.momentoOptimo.toLowerCase().includes("dormir") &&
                                    !s.momentoOptimo.toLowerCase().includes("comida") &&
                                    !s.momentoOptimo.toLowerCase().includes("ejercicio"),
                                )
                                .map((suplemento, idx) => (
                                  <div key={idx} className="bg-white rounded-md p-4 shadow-sm">
                                    <div className="flex justify-between items-start">
                                      <div className="flex items-start">
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                                          <Calendar className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div>
                                          <h5 className="font-medium text-gray-800">
                                            {traducirNombre(suplemento.nombre)}
                                          </h5>
                                          <p className="text-sm text-gray-600 mt-1">
                                            Tomar en cualquier momento del día -
                                            <SupplementInfo>
                                              {suplemento.dosificacion}
                                            </SupplementInfo>
                                          </p>
                                        </div>
                                      </div>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-gray-400 hover:text-teal-600"
                                        onClick={() => toggleDetails(combinaciones[0].id, suplemento.nombre)}
                                      >
                                        {isExpanded(combinaciones[0].id, suplemento.nombre) ? (
                                          <ChevronUp className="h-5 w-5" />
                                        ) : (
                                          <HelpCircle className="h-5 w-5" />
                                        )}
                                      </Button>
                                    </div>

                                    {isExpanded(combinaciones[0].id, suplemento.nombre) && (
                                      <div className="mt-3 pt-3 border-t text-sm">
                                        <p className="text-gray-700 mb-2">
                                          <span className="font-medium">¿Por qué timing flexible?</span> Este suplemento
                                          puede tomarse en cualquier momento del día sin afectar significativamente su
                                          eficacia. Puedes adaptarlo a tu rutina diaria según te resulte más
                                          conveniente.
                                        </p>
                                        <p className="text-gray-700">
                                          <span className="font-medium">Consejo de absorción:</span>{" "}
                                          {getAbsorptionTips(suplemento)}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Nota sobre la distribución optimizada */}
                      <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div className="flex items-start">
                          <Info className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                          <div className="text-sm text-blue-800">
                            <p className="font-medium mb-1">Distribución optimizada</p>
                            <p>Los suplementos han sido distribuidos a lo largo del día para maximizar su absorción y evitar interacciones negativas. Si algún suplemento tiene múltiples opciones de horario, lo hemos asignado al momento más conveniente considerando el resto de tu régimen.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Supplement combinations section */}
                    <div className="mb-8">
                      <h3 className="text-lg font-medium text-teal-800 mb-4 flex items-center">
                        <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                        Combinaciones sinérgicas recomendadas
                      </h3>
                      <div className="bg-yellow-50 rounded-lg p-5 border border-yellow-100">
                        <p className="text-gray-700 mb-4">
                          Para maximizar los beneficios de tus suplementos, considera estas combinaciones sinérgicas
                          específicas:
                        </p>
                        <div className="space-y-3">
                          {/* Synergies section */}
                          {combinaciones[0].suplementos.some(
                            (s) =>
                              s.nombre.toLowerCase().includes("proteína") || s.nombre.toLowerCase().includes("protein"),
                          ) &&
                            combinaciones[0].suplementos.some(
                              (s) =>
                                s.nombre.toLowerCase().includes("creatina") ||
                                s.nombre.toLowerCase().includes("creatine"),
                            ) && (
                              <div className="flex items-start">
                                <div className="mr-3 mt-0.5 flex-shrink-0">
                                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                                    <Check className="h-3 w-3" />
                                  </div>
                                </div>
                                <div>
                                  <span className="font-medium text-gray-800">Proteína + Creatina:</span>
                                  <p className="text-sm text-gray-700">
                                    Tomar juntos después del entrenamiento para maximizar la recuperación y el
                                    crecimiento muscular. La proteína de suero contiene todos los aminoácidos esenciales
                                    necesarios (incluyendo BCAAs) para la síntesis de proteínas musculares, mientras que
                                    la creatina aumenta la fuerza y potencia durante el entrenamiento.
                                  </p>
                                </div>
                              </div>
                            )}

                          {/* Add this new code block after the above section: */}
                          {combinaciones[0].suplementos.some(
                            (s) =>
                              s.nombre.toLowerCase().includes("proteína") || s.nombre.toLowerCase().includes("protein"),
                          ) && (
                            <div className="flex items-start">
                              <div className="mr-3 mt-0.5 flex-shrink-0">
                                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600">
                                  <Info className="h-3 w-3" />
                                </div>
                              </div>
                              <div>
                                <span className="font-medium text-gray-800">¿Por qué no incluimos BCAAs?</span>
                                <p className="text-sm text-gray-700">
                                  Según la evidencia científica actualizada, los Aminoácidos de Cadena Ramificada
                                  (BCAAs) por sí solos no son efectivos para aumentar el crecimiento muscular. Esto se
                                  debe a que todos los aminoácidos esenciales deben estar presentes para la síntesis de
                                  proteínas musculares.
                                </p>
                                <p className="text-sm text-gray-700 mt-2">
                                  La proteína de suero ya contiene todos los aminoácidos esenciales, incluyendo altos
                                  niveles de BCAAs (especialmente leucina). Por lo tanto, suplementar con BCAAs
                                  adicionales cuando ya se consume suficiente proteína proporciona beneficios mínimos o
                                  nulos y representa un gasto innecesario.
                                </p>
                                <p className="text-sm text-gray-700 mt-2">
                                  Para maximizar la ganancia muscular, recomendamos enfocarse en proteína de suero
                                  completa, creatina y beta-alanina, que tienen evidencia sólida de efectividad según
                                  la investigación científica actual.
                                </p>
                              </div>
                            </div>
                          )}

                          {combinaciones[0].suplementos.some(
                            (s) =>
                              s.nombre.toLowerCase().includes("vitamina d") ||
                              s.nombre.toLowerCase().includes("vitamin d"),
                          ) &&
                            combinaciones[0].suplementos.some(
                              (s) =>
                                s.nombre.toLowerCase().includes("calcio") || s.nombre.toLowerCase().includes("calcium"),
                            ) && (
                              <div className="flex items-start">
                                <div className="mr-3 mt-0.5 flex-shrink-0">
                                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                                    <Check className="h-3 w-3" />
                                  </div>
                                </div>
                                <div>
                                  <span className="font-medium text-gray-800">Vitamina D + Calcio:</span>
                                  <p className="text-sm text-gray-700">
                                    Combinar para mejorar la absorción del calcio y fortalecer la salud ósea.
                                  </p>
                                </div>
                              </div>
                            )}

                          {combinaciones[0].suplementos.some((s) => s.nombre.toLowerCase().includes("magnesio")) &&
                            combinaciones[0].suplementos.some(
                              (s) =>
                                s.nombre.toLowerCase().includes("vitamina b") ||
                                s.nombre.toLowerCase().includes("vitamin b"),
                            ) && (
                              <div className="flex items-start">
                                <div className="mr-3 mt-0.5 flex-shrink-0">
                                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                                    <Check className="h-3 w-3" />
                                  </div>
                                </div>
                                <div>
                                  <span className="font-medium text-gray-800">Magnesio + Vitamina B:</span>
                                  <p className="text-sm text-gray-700">
                                    Tomar juntos para mejorar la absorción y reducir el estrés.
                                  </p>
                                </div>
                              </div>
                            )}

                          {combinaciones[0].suplementos.some((s) => s.nombre.toLowerCase().includes("omega-3")) &&
                            combinaciones[0].suplementos.some(
                              (s) =>
                                s.nombre.toLowerCase().includes("vitamina e") ||
                                s.nombre.toLowerCase().includes("vitamin e"),
                            ) && (
                              <div className="flex items-start">
                                <div className="mr-3 mt-0.5 flex-shrink-0">
                                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                                    <Check className="h-3 w-3" />
                                  </div>
                                </div>
                                <div>
                                  <span className="font-medium text-gray-800">Omega-3 + Vitamina E:</span>
                                  <p className="text-sm text-gray-700">
                                    Combinar para potenciar los efectos antioxidantes y antiinflamatorios.
                                  </p>
                                </div>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>

                    {/* Rest periods section - only show if there are supplements that require rest periods */}
                    {combinaciones[0].suplementos.some((s) => requierePeriodoDescanso(s.nombre)) && (
                      <div className="mb-8">
                        <h3 className="text-lg font-medium text-teal-800 mb-4 flex items-center">
                          <Clock className="h-5 w-5 mr-2 text-blue-500" />
                          Periodos de descanso recomendados
                        </h3>
                        <div className="bg-blue-50 rounded-lg p-5 border border-blue-100">
                          <p className="text-gray-700 mb-4">
                            Algunos suplementos requieren periodos de descanso para mantener su eficacia a largo plazo:
                          </p>
                          <div className="space-y-3">
                            {combinaciones[0].suplementos
                              .filter((s: any) => requierePeriodoDescanso(s.nombre))
                              .map((suplemento, idx) => (
                                <div key={idx} className="flex items-start">
                                  <div className="mr-3 mt-0.5 flex-shrink-0">
                                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                      <Clock className="h-3 w-3" />
                                    </div>
                                  </div>
                                  <div>
                                    <span className="font-medium text-gray-800">
                                      {traducirNombre(suplemento.nombre)}:
                                    </span>
                                    <p className="text-sm text-gray-700">
                                      {obtenerInfoPeriodoDescanso(suplemento.nombre)}
                                    </p>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button className="bg-teal-600 hover:bg-teal-700">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Comprar Régimen Completo
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
