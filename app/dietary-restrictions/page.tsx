"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { useUser } from "@/context/user-context"

type DietaryRestriction = {
  id: string
  label: string
}

const dietaryRestrictions: DietaryRestriction[] = [
  { id: "vegano", label: "Vegano" },
  { id: "vegetariano", label: "Vegetariano" },
  { id: "sin-gluten", label: "Sin gluten" },
  { id: "sin-lactosa", label: "Sin lactosa" },
  { id: "sin-frutos-secos", label: "Sin frutos secos" },
  { id: "sin-soja", label: "Sin soja" },
  { id: "sin-huevo", label: "Sin huevo" },
  { id: "sin-mariscos", label: "Sin mariscos" },
  { id: "kosher", label: "Kosher" },
]

export default function DietaryRestrictionsPage() {
  const router = useRouter()
  const { userProfile, setDietaryRestrictions, setAllergies } = useUser()
  const [selectedRestrictions, setSelectedRestrictions] = useState<string[]>(userProfile.dietaryRestrictions)
  const [allergiesState, setAllergiesState] = useState(userProfile.allergies)
  const [allergies, setAllergiesLocal] = useState(userProfile.allergies)

  const handleRestrictionToggle = (restrictionId: string) => {
    setSelectedRestrictions((prev) => {
      if (prev.includes(restrictionId)) {
        return prev.filter((id) => id !== restrictionId)
      } else {
        return [...prev, restrictionId]
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Save to context
    setDietaryRestrictions(selectedRestrictions)
    setAllergies(allergies)

    console.log("Saving dietary restrictions:", selectedRestrictions)
    console.log("Saving allergies:", allergies)

    // Make sure the data is saved before navigating
    setTimeout(() => {
      // Navigate to the loading page
      router.push("/generating-recommendations")
    }, 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-teal-50 flex flex-col">
      <header className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center">
          <Link href="/health-goals" className="inline-flex items-center text-teal-700 hover:text-teal-800">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a objetivos
          </Link>
          <div className="text-sm text-gray-600">Paso 5 de 6</div>
        </div>
        <div className="mt-4">
          <Progress value={83} className="h-2 bg-teal-100" />
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-teal-800">Restricciones Dietéticas</CardTitle>
            <CardDescription className="text-center">
              Indícanos tus restricciones dietéticas y alergias para personalizar tus recomendaciones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3">Restricciones dietéticas</h3>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {dietaryRestrictions.map((restriction) => (
                    <div key={restriction.id} className="flex items-start space-x-2">
                      <Checkbox
                        id={restriction.id}
                        checked={selectedRestrictions.includes(restriction.id)}
                        onCheckedChange={() => handleRestrictionToggle(restriction.id)}
                        className="data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600"
                      />
                      <Label htmlFor={restriction.id} className="text-gray-700 cursor-pointer">
                        {restriction.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3">Alergias o intolerancias adicionales</h3>
                <Textarea
                  placeholder="Describe cualquier alergia o intolerancia adicional que tengas..."
                  value={allergies}
                  onChange={(e) => setAllergiesLocal(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 flex items-center justify-center">
                Ver recomendaciones
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              Puedes cambiar tus restricciones dietéticas en cualquier momento desde tu perfil.
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
