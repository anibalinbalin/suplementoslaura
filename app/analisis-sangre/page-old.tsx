"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Info, ExternalLink, Check, AlertTriangle } from "lucide-react"
import {
  getVitaminDRecommendation,
  vitaminDFoodSources,
  vitaminDFactors,
  vitaminDExamineEvidence,
} from "@/lib/vitamin-d-data"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AnalisisSangrePage() {
  const router = useRouter()
  const [vitaminDLevel, setVitaminDLevel] = useState<string>("")
  const [vitaminDUnit, setVitaminDUnit] = useState<string>("ng/mL")
  const [age, setAge] = useState<string>("")
  const [weight, setWeight] = useState<string>("")
  const [skinTone, setSkinTone] = useState<string>("")
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<string>("input")

  // Convertir nmol/L a ng/mL si es necesario
  const getNormalizedLevel = (): number => {
    const level = Number.parseFloat(vitaminDLevel)
    if (isNaN(level)) return 0

    // Si la unidad es nmol/L, convertir a ng/mL (dividir por 2.5)
    return vitaminDUnit === "nmol/L" ? level / 2.5 : level
  }

  const normalizedLevel = getNormalizedLevel()
  const recommendation = getVitaminDRecommendation(normalizedLevel)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setActiveTab("results")
  }

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "Deficiencia":
        return "bg-red-100 text-red-800 border-red-300"
      case "Insuficiencia":
        return "bg-amber-100 text-amber-800 border-amber-300"
      case "Óptimo":
        return "bg-green-100 text-green-800 border-green-300"
      case "Alto (pero generalmente seguro)":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "Potencialmente tóxico":
        return "bg-purple-100 text-purple-800 border-purple-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getProgressValue = (): number => {
    if (normalizedLevel <= 0) return 0
    if (normalizedLevel >= 100) return 100

    // Escala no lineal para visualizar mejor los rangos importantes
    if (normalizedLevel < 20) return normalizedLevel
    if (normalizedLevel < 30) return 20 + (normalizedLevel - 20) * 1.5
    if (normalizedLevel < 50) return 35 + (normalizedLevel - 30) * 1.25
    return 60 + (normalizedLevel - 50) * 0.8
  }

  const getProgressColor = (): string => {
    if (normalizedLevel < 20) return "bg-red-500"
    if (normalizedLevel < 30) return "bg-amber-500"
    if (normalizedLevel < 50) return "bg-green-500"
    if (normalizedLevel < 100) return "bg-blue-500"
    return "bg-purple-500"
  }

  const getAdjustedDosage = (): string => {
    if (!recommendation) return ""

    const baseDosage = recommendation.dosage
    const adjustmentFactors = []

    // Ajustar por edad
    const ageNum = Number.parseInt(age)
    if (!isNaN(ageNum)) {
      if (ageNum > 70) {
        adjustmentFactors.push("edad avanzada (+25%)")
      } else if (ageNum > 50) {
        adjustmentFactors.push("edad mayor a 50 años (+10%)")
      }
    }

    // Ajustar por tono de piel
    if (skinTone === "oscuro") {
      adjustmentFactors.push("piel oscura (+20%)")
    } else if (skinTone === "medio") {
      adjustmentFactors.push("piel de tono medio (+10%)")
    }

    // Ajustar por peso
    const weightNum = Number.parseInt(weight)
    if (!isNaN(weightNum) && weightNum > 90) {
      adjustmentFactors.push("peso elevado (+15%)")
    }

    if (adjustmentFactors.length === 0) {
      return baseDosage
    }

    return `${baseDosage} (Ajustado por: ${adjustmentFactors.join(", ")})`
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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-teal-800 mb-2 text-center">Análisis de Vitamina D</h1>
          <p className="text-center text-gray-600 mb-8">
            Ingresa tus resultados de análisis de sangre para recibir recomendaciones personalizadas basadas en la
            evidencia científica de Examine.com
          </p>

          <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
            <div className="flex items-center gap-2 text-teal-700">
              <Info className="h-5 w-5" />
              <p className="text-sm">
                Esta herramienta analiza tus niveles de vitamina D y proporciona recomendaciones basadas en la
                investigación científica recopilada por Examine.com. Recuerda consultar con un profesional de la salud
                antes de realizar cambios en tu régimen de suplementación.
              </p>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="input">Ingresar Datos</TabsTrigger>
              <TabsTrigger value="results" disabled={!submitted}>
                Resultados
              </TabsTrigger>
            </TabsList>

            <TabsContent value="input">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-teal-800">Ingresa tus resultados de análisis</CardTitle>
                  <CardDescription>
                    Proporciona tus niveles de vitamina D y algunos datos adicionales para recibir recomendaciones
                    personalizadas.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="vitamin-d" className="text-base">
                          Nivel de Vitamina D <span className="text-red-500">*</span>
                        </Label>
                        <div className="flex gap-4 mt-1.5">
                          <Input
                            id="vitamin-d"
                            type="number"
                            step="0.1"
                            placeholder="Ej: 25.5"
                            value={vitaminDLevel}
                            onChange={(e) => setVitaminDLevel(e.target.value)}
                            className="flex-1"
                            required
                          />
                          <Select value={vitaminDUnit} onValueChange={setVitaminDUnit}>
                            <SelectTrigger className="w-[120px]">
                              <SelectValue placeholder="Unidad" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ng/mL">ng/mL</SelectItem>
                              <SelectItem value="nmol/L">nmol/L</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Ingresa el valor exacto de tu análisis de sangre. Si tu resultado está en nmol/L, selecciona
                          esa unidad.
                        </p>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="age" className="text-base">
                            Edad
                          </Label>
                          <Input
                            id="age"
                            type="number"
                            placeholder="Ej: 45"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor="weight" className="text-base">
                            Peso (kg)
                          </Label>
                          <Input
                            id="weight"
                            type="number"
                            placeholder="Ej: 70"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor="skin-tone" className="text-base">
                            Tono de piel
                          </Label>
                          <Select value={skinTone} onValueChange={setSkinTone}>
                            <SelectTrigger className="mt-1.5">
                              <SelectValue placeholder="Seleccionar" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="claro">Claro</SelectItem>
                              <SelectItem value="medio">Medio</SelectItem>
                              <SelectItem value="oscuro">Oscuro</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <Alert className="bg-blue-50 border-blue-200">
                      <Info className="h-4 w-4 text-blue-600" />
                      <AlertTitle className="text-blue-800">Información importante</AlertTitle>
                      <AlertDescription className="text-blue-700">
                        Esta herramienta no reemplaza el consejo médico profesional. Las recomendaciones están basadas
                        en la investigación científica recopilada por Examine.com, pero deben ser discutidas con tu
                        médico.
                      </AlertDescription>
                    </Alert>

                    <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
                      Analizar resultados
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="results">
              {submitted && recommendation ? (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl text-teal-800">Resultados del análisis</CardTitle>
                      <CardDescription>
                        Basado en tu nivel de vitamina D de {vitaminDLevel} {vitaminDUnit}
                        {vitaminDUnit === "nmol/L" && ` (${normalizedLevel.toFixed(1)} ng/mL)`}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-red-700">Deficiencia</span>
                          <span className="text-amber-700">Insuficiencia</span>
                          <span className="text-green-700">Óptimo</span>
                          <span className="text-blue-700">Alto</span>
                          <span className="text-purple-700">Tóxico</span>
                        </div>
                        <Progress value={getProgressValue()} className={`h-3 ${getProgressColor()}`} />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>0</span>
                          <span>20</span>
                          <span>30</span>
                          <span>50</span>
                          <span>100+</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-center">
                        <div
                          className={`inline-block px-4 py-2 rounded-lg border ${getStatusColor(recommendation.status)}`}
                        >
                          <span className="font-medium">Estado: {recommendation.status}</span>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium text-gray-800 mb-2">Descripción:</h3>
                        <p className="text-gray-700">{recommendation.description}</p>
                      </div>

                      <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
                        <h3 className="font-medium text-teal-800 mb-2 flex items-center">
                          <Check className="h-4 w-4 mr-2" />
                          Recomendación:
                        </h3>
                        <p className="text-teal-700 mb-4">{recommendation.recommendation}</p>

                        <h4 className="font-medium text-teal-800 mb-1">Dosificación sugerida:</h4>
                        <p className="text-teal-700 mb-4">{getAdjustedDosage()}</p>

                        <div className="flex items-center text-xs text-teal-600 mt-2">
                          <Info className="h-3 w-3 mr-1" />
                          <span>Basado en evidencia científica actualizada</span>
                        </div>
                      </div>

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

                        <AccordionItem value="factors">
                          <AccordionTrigger className="text-gray-800 hover:text-teal-700">
                            Factores que afectan los niveles de vitamina D
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-3">
                              {vitaminDFactors.map((factor, index) => (
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

                        <AccordionItem value="food-sources">
                          <AccordionTrigger className="text-gray-800 hover:text-teal-700">
                            Fuentes alimenticias de vitamina D
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="overflow-x-auto">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Alimento
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Cantidad
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Vitamina D
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {vitaminDFoodSources.map((source, index) => (
                                    <tr key={index}>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {source.food}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {source.amount}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {source.vitaminD}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                      <Alert className="bg-amber-50 border-amber-200">
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                        <AlertTitle className="text-amber-800">Consulta médica recomendada</AlertTitle>
                        <AlertDescription className="text-amber-700">
                          Estas recomendaciones están basadas en la investigación científica, pero cada persona es
                          única. Consulta con un profesional de la salud antes de iniciar o modificar cualquier régimen
                          de suplementación.
                        </AlertDescription>
                      </Alert>

                      <div className="flex justify-between w-full">
                        <Button variant="outline" onClick={() => setActiveTab("input")}>
                          Volver a los datos
                        </Button>
                        <Link
                          href="https://examine.com/supplements/vitamin-d/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline" className="flex items-center">
                            Ver en Examine.com
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl text-teal-800">Evidencia científica</CardTitle>
                      <CardDescription>
                        Información basada en la investigación recopilada por Examine.com
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {vitaminDExamineEvidence.map((item, index) => (
                          <div key={index} className="border rounded-lg overflow-hidden">
                            <div className="bg-gray-50 p-3 border-b flex justify-between items-center">
                              <h3 className="font-medium text-gray-800">{item.claim}</h3>
                              <Badge
                                className={
                                  item.evidence === "Fuerte"
                                    ? "bg-green-100 text-green-800 hover:bg-green-200"
                                    : item.evidence === "Moderada"
                                      ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                                      : item.evidence === "Preliminar"
                                        ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                                }
                              >
                                Evidencia: {item.evidence}
                              </Badge>
                            </div>
                            <div className="p-3 text-gray-700 text-sm">{item.details}</div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 flex items-center justify-center">
                        <div className="bg-gray-50 p-3 rounded-lg text-center max-w-md">
                          <p className="text-gray-600 text-sm">
                            Toda la información presentada está basada en la investigación científica recopilada y
                            analizada por Examine.com, una fuente independiente y basada en evidencia sobre nutrición y
                            suplementos.
                          </p>
                          <Link
                            href="https://examine.com/about/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-teal-600 hover:text-teal-700 text-sm mt-2 inline-flex items-center"
                          >
                            Más sobre Examine.com
                            <ExternalLink className="ml-1 h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    </CardContent>
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
        <p>Suplementos+ &copy; {new Date().getFullYear()} - Todos los derechos reservados</p>
        <p className="mt-1">
          Datos basados en la investigación científica de{" "}
          <a
            href="https://examine.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-600 hover:underline"
          >
            Examine.com
          </a>
        </p>
      </footer>
    </div>
  )
}
