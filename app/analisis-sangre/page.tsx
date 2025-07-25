"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useUser } from "@/context/user-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Info, ExternalLink, Check, AlertTriangle, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { BloodMarkerProgress } from "@/components/blood-marker-progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  availableBloodMarkers,
  markerCategories,
  getMarkerData,
  findMarkerRange,
  BloodTestResult,
  BloodMarkerRange,
  BloodMarkerType,
  SupplementRecommendation,
  unitConversions,
  getVitaminDRecommendation,
  getB12Recommendation,
  getGlucoseRecommendation,
  getInsulinRecommendation,
  getCortisolRecommendation,
  getSodiumRecommendation,
  getPotassiumRecommendation,
  getChlorideRecommendation,
  getCalciumRecommendation,
  getMagnesiumRecommendation,
  getHematocritRecommendation,
  getIronRecommendation,
  getFerritinRecommendation,
  calculateHOMAIR,
  interpretHOMAIR,
} from "@/lib/blood-markers"

interface MarkerInput {
  id: string
  markerId: string
  value: string
  unit?: string
  timeOfDay?: string
  gender?: string
}

export default function AnalisisSangrePage() {
  const router = useRouter()
  const { userProfile, setBloodTestResults } = useUser()
  const [markerInputs, setMarkerInputs] = useState<MarkerInput[]>([])
  const [activeTab, setActiveTab] = useState<string>("input")
  const [submitted, setSubmitted] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['vitaminas'])
  const [userData, setUserData] = useState({
    age: userProfile?.age?.toString() || "",
    gender: userProfile?.gender || "",
    weight: "",
  })

  const addMarker = (markerId: string) => {
    const marker = availableBloodMarkers.find(m => m.id === markerId)
    if (!marker) return

    const newInput: MarkerInput = {
      id: Date.now().toString(),
      markerId,
      value: "",
      unit: marker.unit,
    }

    // Add specific fields based on marker
    if (markerId === 'cortisol') {
      newInput.timeOfDay = 'morning'
    }
    if (markerId === 'hematocrit') {
      newInput.gender = userData.gender || 'male'
    }

    setMarkerInputs([...markerInputs, newInput])
  }

  const removeMarker = (id: string) => {
    setMarkerInputs(markerInputs.filter(input => input.id !== id))
  }

  const updateMarkerInput = (id: string, field: keyof MarkerInput, value: string) => {
    setMarkerInputs(markerInputs.map(input => 
      input.id === id ? { ...input, [field]: value } : input
    ))
  }

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setActiveTab("results")
  }

  const getRecommendation = (input: MarkerInput): BloodMarkerRange | null => {
    const value = parseFloat(input.value)
    if (isNaN(value)) return null

    switch (input.markerId) {
      case 'vitamin-d':
        return getVitaminDRecommendation(value)
      case 'vitamin-b12':
        return getB12Recommendation(value)
      case 'glucose':
        return getGlucoseRecommendation(value)
      case 'insulin':
        return getInsulinRecommendation(value)
      case 'cortisol':
        return getCortisolRecommendation(value, input.timeOfDay as 'morning' | 'evening' || 'morning')
      case 'sodium':
        return getSodiumRecommendation(value)
      case 'potassium':
        return getPotassiumRecommendation(value)
      case 'chloride':
        return getChlorideRecommendation(value)
      case 'calcium':
        return getCalciumRecommendation(value)
      case 'magnesium':
        return getMagnesiumRecommendation(value)
      case 'hematocrit':
        return getHematocritRecommendation(value, input.gender as 'male' | 'female' || 'male')
      case 'iron':
        return getIronRecommendation(value)
      case 'ferritin':
        return getFerritinRecommendation(value)
      default:
        return null
    }
  }

  const getStatusColor = (status: string): string => {
    const statusLower = status.toLowerCase()
    if (statusLower.includes('deficiencia') || statusLower.includes('bajo') || statusLower.includes('anemia')) {
      return "bg-red-100 text-red-800 border-red-300"
    }
    if (statusLower.includes('insuficien') || statusLower.includes('límite')) {
      return "bg-amber-100 text-amber-800 border-amber-300"
    }
    if (statusLower.includes('normal') || statusLower.includes('óptimo')) {
      return "bg-green-100 text-green-800 border-green-300"
    }
    if (statusLower.includes('elevado') || statusLower.includes('alto')) {
      return "bg-orange-100 text-orange-800 border-orange-300"
    }
    if (statusLower.includes('tóxico') || statusLower.includes('severo')) {
      return "bg-purple-100 text-purple-800 border-purple-300"
    }
    return "bg-gray-100 text-gray-800 border-gray-300"
  }

  const getProgressBarColor = (status: string): string => {
    const statusLower = status.toLowerCase()
    if (statusLower.includes('deficiencia') || statusLower.includes('bajo') || statusLower.includes('anemia')) {
      return "bg-red-500"
    }
    if (statusLower.includes('insuficien') || statusLower.includes('límite')) {
      return "bg-amber-500"
    }
    if (statusLower.includes('normal') || statusLower.includes('óptimo')) {
      return "bg-green-500"
    }
    if (statusLower.includes('elevado') || statusLower.includes('alto')) {
      return "bg-orange-500"
    }
    if (statusLower.includes('tóxico') || statusLower.includes('severo')) {
      return "bg-purple-500"
    }
    return "bg-gray-500"
  }

  const getMarkerRanges = (markerId: string) => {
    // Define ranges for all markers
    const rangeMap: Record<string, any[]> = {
      'vitamin-d': [
        { min: 0, max: 20, status: 'Deficiencia', color: 'bg-red-500' },
        { min: 20, max: 30, status: 'Insuficiencia', color: 'bg-amber-500' },
        { min: 30, max: 100, status: 'Óptimo', color: 'bg-green-500' },
        { min: 100, max: 150, status: 'Elevado', color: 'bg-orange-500' }
      ],
      'vitamin-b12': [
        { min: 0, max: 200, status: 'Deficiencia', color: 'bg-red-500' },
        { min: 200, max: 300, status: 'Límite', color: 'bg-amber-500' },
        { min: 300, max: 900, status: 'Normal', color: 'bg-green-500' },
        { min: 900, max: 1500, status: 'Elevado', color: 'bg-orange-500' }
      ],
      'glucose': [
        { min: 0, max: 70, status: 'Hipoglucemia', color: 'bg-red-500' },
        { min: 70, max: 100, status: 'Normal', color: 'bg-green-500' },
        { min: 100, max: 126, status: 'Prediabetes', color: 'bg-amber-500' },
        { min: 126, max: 200, status: 'Diabetes', color: 'bg-orange-500' }
      ],
      'insulin': [
        { min: 0, max: 3, status: 'Bajo', color: 'bg-red-500' },
        { min: 3, max: 25, status: 'Normal', color: 'bg-green-500' },
        { min: 25, max: 50, status: 'Elevado', color: 'bg-orange-500' },
        { min: 50, max: 100, status: 'Muy elevado', color: 'bg-red-500' }
      ],
      'cortisol': [
        { min: 0, max: 5, status: 'Bajo', color: 'bg-red-500' },
        { min: 5, max: 25, status: 'Normal', color: 'bg-green-500' },
        { min: 25, max: 35, status: 'Elevado', color: 'bg-orange-500' },
        { min: 35, max: 50, status: 'Muy elevado', color: 'bg-red-500' }
      ],
      'iron': [
        { min: 0, max: 60, status: 'Bajo', color: 'bg-red-500' },
        { min: 60, max: 170, status: 'Normal', color: 'bg-green-500' },
        { min: 170, max: 250, status: 'Elevado', color: 'bg-orange-500' }
      ],
      'ferritin': [
        { min: 0, max: 20, status: 'Deficiencia', color: 'bg-red-500' },
        { min: 20, max: 50, status: 'Bajo', color: 'bg-amber-500' },
        { min: 50, max: 200, status: 'Normal', color: 'bg-green-500' },
        { min: 200, max: 400, status: 'Elevado', color: 'bg-orange-500' }
      ],
      'hematocrit': [
        { min: 0, max: 38, status: 'Anemia', color: 'bg-red-500' },
        { min: 38, max: 54, status: 'Normal', color: 'bg-green-500' },
        { min: 54, max: 65, status: 'Elevado', color: 'bg-orange-500' }
      ],
      'calcium': [
        { min: 0, max: 8.5, status: 'Bajo', color: 'bg-red-500' },
        { min: 8.5, max: 10.5, status: 'Normal', color: 'bg-green-500' },
        { min: 10.5, max: 12, status: 'Elevado', color: 'bg-orange-500' }
      ],
      'magnesium': [
        { min: 0, max: 1.8, status: 'Bajo', color: 'bg-red-500' },
        { min: 1.8, max: 2.4, status: 'Normal', color: 'bg-green-500' },
        { min: 2.4, max: 3, status: 'Elevado', color: 'bg-orange-500' }
      ],
      'sodium': [
        { min: 0, max: 135, status: 'Bajo', color: 'bg-red-500' },
        { min: 135, max: 145, status: 'Normal', color: 'bg-green-500' },
        { min: 145, max: 160, status: 'Elevado', color: 'bg-orange-500' }
      ],
      'potassium': [
        { min: 0, max: 3.5, status: 'Bajo', color: 'bg-red-500' },
        { min: 3.5, max: 5.1, status: 'Normal', color: 'bg-green-500' },
        { min: 5.1, max: 6.5, status: 'Elevado', color: 'bg-orange-500' }
      ],
      'chloride': [
        { min: 0, max: 98, status: 'Bajo', color: 'bg-red-500' },
        { min: 98, max: 107, status: 'Normal', color: 'bg-green-500' },
        { min: 107, max: 120, status: 'Elevado', color: 'bg-orange-500' }
      ]
    }
    
    return rangeMap[markerId] || []
  }

  const getOptimalRange = (markerId: string) => {
    const optimalRanges: Record<string, { min: number; max: number }> = {
      'vitamin-d': { min: 30, max: 60 },
      'vitamin-b12': { min: 300, max: 600 },
      'glucose': { min: 70, max: 90 },
      'insulin': { min: 3, max: 15 },
      'cortisol': { min: 10, max: 20 },
      'iron': { min: 70, max: 150 },
      'ferritin': { min: 50, max: 150 },
      'hematocrit': { min: 40, max: 50 },
      'calcium': { min: 9, max: 10 },
      'magnesium': { min: 2.0, max: 2.2 },
      'sodium': { min: 138, max: 142 },
      'potassium': { min: 4.0, max: 4.5 },
      'chloride': { min: 100, max: 105 }
    }
    
    return optimalRanges[markerId]
  }

  // Collect all supplement recommendations
  const getAllSupplementRecommendations = (): SupplementRecommendation[] => {
    const allRecommendations: SupplementRecommendation[] = []
    const recommendationMap = new Map<string, SupplementRecommendation>()

    markerInputs.forEach(input => {
      const recommendation = getRecommendation(input)
      if (recommendation?.supplementRecommendations) {
        recommendation.supplementRecommendations.forEach(supp => {
          const existing = recommendationMap.get(supp.name)
          if (!existing || (supp.dosage && !existing.dosage)) {
            recommendationMap.set(supp.name, supp)
          }
        })
      }
    })

    return Array.from(recommendationMap.values())
  }

  // Calculate HOMA-IR if both glucose and insulin are present
  const calculateMetabolicIndices = () => {
    const glucoseInput = markerInputs.find(m => m.markerId === 'glucose')
    const insulinInput = markerInputs.find(m => m.markerId === 'insulin')
    
    if (glucoseInput && insulinInput) {
      const glucose = parseFloat(glucoseInput.value)
      const insulin = parseFloat(insulinInput.value)
      
      if (!isNaN(glucose) && !isNaN(insulin)) {
        const homaIR = calculateHOMAIR(glucose, insulin)
        return {
          homaIR,
          interpretation: interpretHOMAIR(homaIR)
        }
      }
    }
    return null
  }

  // Save blood test results and navigate to recommendations
  const saveResultsAndNavigate = () => {
    // Convert marker inputs to BloodTestResult format
    const bloodTestResults: BloodTestResult[] = markerInputs.map(input => {
      const marker = availableBloodMarkers.find(m => m.id === input.markerId)
      return {
        markerId: input.markerId as BloodMarkerType,
        value: parseFloat(input.value),
        unit: input.unit || marker?.unit || '',
        date: new Date()
      }
    })

    // Save to user context
    setBloodTestResults(bloodTestResults, new Date().toISOString().split('T')[0])

    // Navigate to recommendations flow
    if (userProfile?.gender && userProfile?.age) {
      // If we already have basic profile info, go directly to health goals
      router.push('/health-goals')
    } else {
      // Otherwise start from the beginning
      router.push('/gender-selection')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-teal-50 flex flex-col">
      <header className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="inline-flex items-center text-teal-700 hover:text-teal-800">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al inicio
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-teal-800 mb-2 text-center">Análisis Completo de Sangre</h1>
          <p className="text-center text-gray-600 mb-8">
            Ingresa tus resultados de análisis de sangre para recibir recomendaciones personalizadas basadas en 
            evidencia científica actualizada
          </p>

          <div className="bg-amber-50 p-4 rounded-lg shadow-sm mb-8 border-2 border-amber-300">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-amber-800 mb-1">
                  AVISO IMPORTANTE: Consulta Profesional Requerida
                </p>
                <p className="text-sm text-amber-700">
                  Esta herramienta proporciona información educativa basada en investigación científica, pero 
                  <strong> NO reemplaza el diagnóstico o consejo médico profesional</strong>. Es sugerido consultar 
                  a un profesional de salud antes de iniciar cualquier suplementación. 
                  Solo un profesional de la salud puede evaluar correctamente tus resultados en el contexto de 
                  tu historial médico completo.
                </p>
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="input">Ingresar Datos</TabsTrigger>
              <TabsTrigger value="results" disabled={!submitted}>
                Resultados y Recomendaciones
              </TabsTrigger>
            </TabsList>

            <TabsContent value="input">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-teal-800">Ingresa tus resultados de análisis</CardTitle>
                  <CardDescription>
                    Selecciona los marcadores que deseas analizar y proporciona los valores de tu análisis de sangre.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* User Data */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-800 mb-3">Datos personales (opcional)</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="age">Edad</Label>
                          <Input
                            id="age"
                            type="number"
                            placeholder="Ej: 45"
                            value={userData.age}
                            onChange={(e) => setUserData({...userData, age: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="gender">Género</Label>
                          <Select 
                            value={userData.gender} 
                            onValueChange={(value) => setUserData({...userData, gender: value})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Masculino</SelectItem>
                              <SelectItem value="female">Femenino</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="weight">Peso (kg)</Label>
                          <Input
                            id="weight"
                            type="number"
                            placeholder="Ej: 70"
                            value={userData.weight}
                            onChange={(e) => setUserData({...userData, weight: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Selected Markers */}
                    {markerInputs.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="font-medium text-gray-800">Marcadores seleccionados</h3>
                        {markerInputs.map((input) => {
                          const marker = availableBloodMarkers.find(m => m.id === input.markerId)
                          if (!marker) return null

                          return (
                            <div key={input.id} className="bg-gray-50 p-4 rounded-lg relative">
                              <button
                                type="button"
                                onClick={() => removeMarker(input.id)}
                                className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                              
                              <div className="grid md:grid-cols-3 gap-4">
                                <div className="md:col-span-2">
                                  <Label htmlFor={`marker-${input.id}`}>
                                    {marker.name} <span className="text-red-500">*</span>
                                  </Label>
                                  <div className="flex gap-2 mt-1">
                                    <Input
                                      id={`marker-${input.id}`}
                                      type="number"
                                      step="0.01"
                                      placeholder="Valor"
                                      value={input.value}
                                      onChange={(e) => updateMarkerInput(input.id, 'value', e.target.value)}
                                      required
                                      className="flex-1"
                                    />
                                    <div className="w-24 flex items-center text-sm text-gray-600">
                                      {marker.unit}
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Additional fields for specific markers */}
                                {input.markerId === 'cortisol' && (
                                  <div>
                                    <Label>Hora del día</Label>
                                    <Select 
                                      value={input.timeOfDay} 
                                      onValueChange={(value) => updateMarkerInput(input.id, 'timeOfDay', value)}
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="morning">Mañana (7-9 AM)</SelectItem>
                                        <SelectItem value="evening">Tarde (4-8 PM)</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                )}
                                
                                {input.markerId === 'hematocrit' && (
                                  <div>
                                    <Label>Género</Label>
                                    <Select 
                                      value={input.gender || userData.gender || 'male'} 
                                      onValueChange={(value) => updateMarkerInput(input.id, 'gender', value)}
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="male">Masculino</SelectItem>
                                        <SelectItem value="female">Femenino</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}

                    {/* Add Markers */}
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-800">Agregar marcadores</h3>
                      {markerCategories.map((category) => (
                        <Collapsible
                          key={category.id}
                          open={expandedCategories.includes(category.id)}
                          onOpenChange={() => toggleCategory(category.id)}
                        >
                          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                            <div className="flex items-center gap-2">
                              <span className="text-xl">{category.icon}</span>
                              <span className="font-medium">{category.name}</span>
                            </div>
                            {expandedCategories.includes(category.id) ? 
                              <ChevronUp className="h-4 w-4" /> : 
                              <ChevronDown className="h-4 w-4" />
                            }
                          </CollapsibleTrigger>
                          <CollapsibleContent className="mt-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-2">
                              {availableBloodMarkers
                                .filter(marker => marker.category === category.id)
                                .map((marker) => {
                                  const isAdded = markerInputs.some(input => input.markerId === marker.id)
                                  return (
                                    <button
                                      key={marker.id}
                                      type="button"
                                      onClick={() => !isAdded && addMarker(marker.id)}
                                      disabled={isAdded}
                                      className={`p-3 rounded-lg border text-left transition-colors ${
                                        isAdded 
                                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed border-gray-300' 
                                          : 'bg-white hover:bg-teal-50 hover:border-teal-300 border-gray-200'
                                      }`}
                                    >
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">{marker.name}</span>
                                        {!isAdded && <Plus className="h-4 w-4 text-teal-600" />}
                                        {isAdded && <Check className="h-4 w-4 text-gray-400" />}
                                      </div>
                                      <span className="text-xs text-gray-500">{marker.unit}</span>
                                    </button>
                                  )
                                })}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      ))}
                    </div>

                    <Alert className="bg-amber-50 border-amber-200">
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                      <AlertTitle className="text-amber-800">Importante: Consulta Profesional Requerida</AlertTitle>
                      <AlertDescription className="text-amber-700">
                        <strong>Esta herramienta NO reemplaza el consejo médico profesional.</strong> Es fundamental 
                        consultar con un profesional de la salud o nutricionista antes de iniciar cualquier régimen 
                        de suplementación. Las recomendaciones son orientativas y deben ser validadas por un profesional 
                        calificado que conozca tu historial médico completo.
                      </AlertDescription>
                    </Alert>

                    <Button 
                      type="submit" 
                      className="w-full bg-teal-600 hover:bg-teal-700"
                      disabled={markerInputs.length === 0}
                    >
                      Analizar resultados ({markerInputs.length} marcador{markerInputs.length !== 1 ? 'es' : ''})
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="results">
              {submitted && markerInputs.length > 0 ? (
                <div className="space-y-6">
                  {/* Summary Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl text-teal-800">Resumen del Análisis</CardTitle>
                      <CardDescription>
                        Análisis de {markerInputs.length} marcador{markerInputs.length !== 1 ? 'es' : ''} sanguíneo{markerInputs.length !== 1 ? 's' : ''}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {markerInputs.map((input) => {
                          const marker = availableBloodMarkers.find(m => m.id === input.markerId)
                          const recommendation = getRecommendation(input)
                          if (!marker || !recommendation) return null

                          const ranges = getMarkerRanges(input.markerId)
                          const optimalRange = getOptimalRange(input.markerId)
                          const value = parseFloat(input.value)

                          return (
                            <div key={input.id} className="bg-gray-50 p-3 rounded-lg">
                              <div className="flex justify-between items-start mb-2">
                                <span className="font-medium text-sm">{marker.name}</span>
                                <Badge className={`text-xs ${getStatusColor(recommendation.status)}`}>
                                  {recommendation.status}
                                </Badge>
                              </div>
                              <div className="text-lg font-semibold mb-3">
                                {input.value} {marker.unit}
                              </div>
                              {ranges.length > 0 && !isNaN(value) && (
                                <BloodMarkerProgress
                                  value={value}
                                  ranges={ranges}
                                  unit={marker.unit}
                                  optimalRange={optimalRange}
                                  size="sm"
                                  showLabels={false}
                                />
                              )}
                            </div>
                          )
                        })}
                      </div>

                      {/* HOMA-IR Calculation */}
                      {calculateMetabolicIndices() && (
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                          <h4 className="font-medium text-blue-800 mb-2">Índices Metabólicos Calculados</h4>
                          <div className="text-sm text-blue-700">
                            <p>HOMA-IR: <span className="font-semibold">{calculateMetabolicIndices()?.homaIR.toFixed(2)}</span></p>
                            <p>Interpretación: <span className="font-semibold">{calculateMetabolicIndices()?.interpretation}</span></p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Detailed Results */}
                  {markerInputs.map((input) => {
                    const marker = availableBloodMarkers.find(m => m.id === input.markerId)
                    const recommendation = getRecommendation(input)
                    const markerData = getMarkerData(input.markerId)
                    
                    if (!marker || !recommendation || !markerData) return null

                    return (
                      <Card key={input.id}>
                        <CardHeader>
                          <CardTitle className="text-lg text-teal-800">{marker.name}</CardTitle>
                          <CardDescription>
                            Valor: {input.value} {marker.unit}
                            {input.timeOfDay && ` - ${input.timeOfDay === 'morning' ? 'Mañana' : 'Tarde'}`}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className={`inline-block px-4 py-2 rounded-lg border ${getStatusColor(recommendation.status)}`}>
                            <span className="font-medium">Estado: {recommendation.status}</span>
                          </div>

                          {/* Progress Bar */}
                          {(() => {
                            const ranges = getMarkerRanges(input.markerId)
                            const optimalRange = getOptimalRange(input.markerId)
                            const value = parseFloat(input.value)
                            
                            if (ranges.length > 0 && !isNaN(value)) {
                              return (
                                <div className="bg-white p-4 rounded-lg border border-gray-200">
                                  <h3 className="font-medium text-gray-800 mb-3">Posición en el rango de valores:</h3>
                                  <BloodMarkerProgress
                                    value={value}
                                    ranges={ranges}
                                    unit={marker.unit}
                                    optimalRange={optimalRange}
                                    size="lg"
                                    showLabels={true}
                                  />
                                </div>
                              )
                            }
                            return null
                          })()}

                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-medium text-gray-800 mb-2">Descripción:</h3>
                            <p className="text-gray-700">{recommendation.description}</p>
                          </div>

                          <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
                            <h3 className="font-medium text-teal-800 mb-2 flex items-center">
                              <Check className="h-4 w-4 mr-2" />
                              Recomendación:
                            </h3>
                            <p className="text-teal-700">{recommendation.recommendation}</p>
                            
                            {recommendation.dosage && (
                              <>
                                <h4 className="font-medium text-teal-800 mb-1 mt-3">Dosificación:</h4>
                                <p className="text-teal-700">{recommendation.dosage}</p>
                              </>
                            )}
                            
                            <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-md">
                              <p className="text-sm text-amber-700">
                                <strong>Importante:</strong> Consulte con un profesional de la salud o nutricionista 
                                antes de iniciar cualquier suplementación.
                              </p>
                            </div>
                          </div>

                          {/* Considerations */}
                          {recommendation.considerations.length > 0 && (
                            <Accordion type="single" collapsible className="w-full">
                              <AccordionItem value="considerations">
                                <AccordionTrigger className="text-gray-800 hover:text-teal-700">
                                  Consideraciones importantes
                                </AccordionTrigger>
                                <AccordionContent>
                                  <ul className="space-y-2 text-gray-700">
                                    {recommendation.considerations.map((consideration, index) => (
                                      <li key={index} className="flex items-start">
                                        <span className="inline-block h-5 w-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center mr-2 flex-shrink-0 text-xs">
                                          {index + 1}
                                        </span>
                                        {consideration}
                                      </li>
                                    ))}
                                  </ul>
                                </AccordionContent>
                              </AccordionItem>

                              {/* Benefits */}
                              {recommendation.benefits && recommendation.benefits.length > 0 && (
                                <AccordionItem value="benefits">
                                  <AccordionTrigger className="text-gray-800 hover:text-teal-700">
                                    Beneficios potenciales
                                  </AccordionTrigger>
                                  <AccordionContent>
                                    <ul className="space-y-2 text-gray-700">
                                      {recommendation.benefits.map((benefit, index) => (
                                        <li key={index} className="flex items-start">
                                          <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                                          {benefit}
                                        </li>
                                      ))}
                                    </ul>
                                  </AccordionContent>
                                </AccordionItem>
                              )}

                              {/* Risks */}
                              {recommendation.risks && recommendation.risks.length > 0 && (
                                <AccordionItem value="risks">
                                  <AccordionTrigger className="text-gray-800 hover:text-teal-700">
                                    Riesgos potenciales
                                  </AccordionTrigger>
                                  <AccordionContent>
                                    <ul className="space-y-2 text-gray-700">
                                      {recommendation.risks.map((risk, index) => (
                                        <li key={index} className="flex items-start">
                                          <AlertTriangle className="h-4 w-4 text-amber-600 mr-2 flex-shrink-0" />
                                          {risk}
                                        </li>
                                      ))}
                                    </ul>
                                  </AccordionContent>
                                </AccordionItem>
                              )}

                              {/* Factors */}
                              {markerData.factors && markerData.factors.length > 0 && (
                                <AccordionItem value="factors">
                                  <AccordionTrigger className="text-gray-800 hover:text-teal-700">
                                    Factores que afectan este marcador
                                  </AccordionTrigger>
                                  <AccordionContent>
                                    <div className="space-y-3">
                                      {markerData.factors.map((factor, index) => (
                                        <div key={index} className="bg-gray-50 p-3 rounded-md">
                                          <h4 className="font-medium text-gray-800">{factor.factor}</h4>
                                          <p className="text-gray-600 text-sm mt-1">{factor.impact}</p>
                                          <p className="text-teal-700 text-sm mt-1">
                                            <span className="font-medium">Recomendación:</span> {factor.recommendation}
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  </AccordionContent>
                                </AccordionItem>
                              )}
                            </Accordion>
                          )}
                        </CardContent>
                      </Card>
                    )
                  })}

                  {/* Combined Supplement Recommendations */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl text-teal-800">Recomendaciones de Suplementación Integral</CardTitle>
                      <CardDescription>
                        Suplementos recomendados basados en todos los marcadores analizados
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {getAllSupplementRecommendations().length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {getAllSupplementRecommendations().map((supp, index) => (
                            <div key={index} className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                              <h4 className="font-semibold text-teal-800">{supp.name}</h4>
                              <p className="text-sm text-teal-700 mt-1">
                                <span className="font-medium">Dosis:</span> {supp.dosage}
                              </p>
                              <p className="text-sm text-teal-700">
                                <span className="font-medium">Horario:</span> {supp.timing}
                              </p>
                              <p className="text-sm text-teal-700">
                                <span className="font-medium">Duración:</span> {supp.duration}
                              </p>
                              {supp.notes && (
                                <p className="text-sm text-teal-600 mt-2 italic">{supp.notes}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-600">
                          No se requieren suplementos específicos basados en los marcadores analizados.
                        </p>
                      )}

                      <Alert className="mt-6 bg-red-50 border-2 border-red-300">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                        <AlertTitle className="text-red-800 text-lg">CONSULTA PROFESIONAL OBLIGATORIA</AlertTitle>
                        <AlertDescription className="text-red-700 font-medium">
                          <strong>Es FUNDAMENTAL consultar con un profesional de la salud o nutricionista certificado</strong> 
                          antes de iniciar cualquier régimen de suplementación. Estas recomendaciones son únicamente 
                          orientativas y deben ser validadas por un profesional que conozca tu historial médico completo, 
                          especialmente si:
                          <ul className="list-disc list-inside mt-2">
                            <li>Tomas medicamentos de cualquier tipo</li>
                            <li>Tienes condiciones médicas preexistentes</li>
                            <li>Estás embarazada o en período de lactancia</li>
                            <li>Eres menor de 18 años o mayor de 65 años</li>
                          </ul>
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                      <Button 
                        onClick={saveResultsAndNavigate}
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                        size="lg"
                      >
                        Obtener Recomendaciones Personalizadas
                      </Button>
                      <div className="flex justify-center w-full">
                        <Button variant="outline" onClick={() => setActiveTab("input")}>
                          Volver a los datos
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              ) : (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center py-8">
                      <p className="text-gray-600">Por favor, ingresa tus datos para ver los resultados.</p>
                      <Button variant="outline" onClick={() => setActiveTab("input")} className="mt-4">
                        Volver al formulario
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="py-4 text-center text-sm text-gray-600">
        <p>Suplementos Uruguay &copy; {new Date().getFullYear()} - Todos los derechos reservados</p>
        <p className="mt-1">
          Datos basados en evidencia científica actualizada
        </p>
      </footer>
    </div>
  )
}