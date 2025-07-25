"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, AlertCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useUser } from "@/context/user-context"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function MedicationsPage() {
  const router = useRouter()
  const { userProfile, setMedications } = useUser()
  const [takingMeds, setTakingMeds] = useState<string>(userProfile.medications ? "yes" : "no")
  const [medsDetails, setMedsDetails] = useState<string>(userProfile.medications || "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Save medications info to context
    setMedications(takingMeds === "yes" ? medsDetails : "")

    // Navigate to the health goals page
    router.push("/health-goals")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-teal-50 flex flex-col">
      <header className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center">
          <Link href="/age-selection" className="inline-flex items-center text-teal-700 hover:text-teal-800">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a selección de edad
          </Link>
          <div className="text-sm text-gray-600">Paso 3 de 6</div>
        </div>
        <div className="mt-4">
          <Progress value={50} className="h-2 bg-teal-100" />
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-teal-800">Información sobre medicamentos</CardTitle>
            <CardDescription className="text-center">
              Esta información es importante para evitar posibles interacciones entre suplementos y medicamentos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Importante</AlertTitle>
              <AlertDescription>
                Algunos suplementos pueden interactuar con medicamentos. Esta información nos ayuda a brindarte
                recomendaciones más seguras, pero siempre consulta con un profesional de la salud antes de comenzar
                cualquier régimen de suplementos.
              </AlertDescription>
            </Alert>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-700">¿Estás tomando algún medicamento actualmente?</h3>

                <RadioGroup value={takingMeds} onValueChange={setTakingMeds} className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <RadioGroupItem value="yes" id="yes" className="peer sr-only" />
                    <Label
                      htmlFor="yes"
                      className="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-teal-600 peer-data-[state=checked]:bg-teal-50 [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      <span className="font-medium">Sí</span>
                    </Label>
                  </div>

                  <div className="relative">
                    <RadioGroupItem value="no" id="no" className="peer sr-only" />
                    <Label
                      htmlFor="no"
                      className="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-teal-600 peer-data-[state=checked]:bg-teal-50 [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      <span className="font-medium">No</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {takingMeds === "yes" && (
                <div className="space-y-2">
                  <Label htmlFor="medications">Por favor, lista los medicamentos que estás tomando actualmente:</Label>
                  <Textarea
                    id="medications"
                    placeholder="Ejemplo: Atorvastatina 20mg, Levotiroxina 50mcg, etc."
                    value={medsDetails}
                    onChange={(e) => setMedsDetails(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <p className="text-sm text-gray-500">
                    Incluye el nombre y la dosis de cada medicamento si la conoces.
                  </p>
                </div>
              )}

              <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 flex items-center justify-center">
                Continuar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              Esta información se mantiene privada y solo se utiliza para generar recomendaciones más seguras.
            </p>
          </CardFooter>
        </Card>
      </main>

      <footer className="py-4 text-center text-sm text-gray-600">
        <p>Suplementos Uruguay &copy; {new Date().getFullYear()} - Todos los derechos reservados</p>
      </footer>
    </div>
  )
}
