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
import { useUser } from "@/context/user-context"

type HealthGoal = {
  id: string
  label: string
}

// Lista de objetivos de salud con IDs que coinciden con el backend
const healthGoals: HealthGoal[] = [
  { id: "ganancia-muscular", label: "Ganancia muscular" },
  { id: "perdida-peso", label: "Pérdida de peso" },
  { id: "apoyo-inmune", label: "Apoyo al sistema inmunológico" },
  { id: "reduccion-estres", label: "Reducción del estrés" },
  { id: "aumento-energia", label: "Aumento de energía" },
  { id: "mejor-sueno", label: "Mejor calidad de sueño" },
  { id: "salud-articular", label: "Salud articular" },
  { id: "salud-cardiovascular", label: "Salud cardiovascular" },
  { id: "salud-digestiva", label: "Salud digestiva" },
  { id: "microbiota-intestinal", label: "Mejorar microbiota intestinal" },
  { id: "funcion-cerebral", label: "Función cerebral" },
  { id: "cabello-piel-unas", label: "Salud de cabello, piel y uñas" },
  { id: "equilibrio-hormonal", label: "Equilibrio hormonal" },
  { id: "salud-osea", label: "Salud ósea" },
  { id: "menopausia", label: "Menopausia" },
]

export default function HealthGoalsPage() {
  const router = useRouter()
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [error, setError] = useState("")
  const { setHealthGoals } = useUser()

  const handleGoalToggle = (goalId: string) => {
    setSelectedGoals((prev) => {
      if (prev.includes(goalId)) {
        return prev.filter((id) => id !== goalId)
      } else {
        return [...prev, goalId]
      }
    })
    setError("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (selectedGoals.length === 0) {
      setError("Por favor, selecciona al menos un objetivo de salud")
      return
    }

    // Save to context
    setHealthGoals(selectedGoals)

    // Navigate to the dietary restrictions page
    router.push("/dietary-restrictions")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-teal-50 flex flex-col">
      <header className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center">
          <Link href="/medications" className="inline-flex items-center text-teal-700 hover:text-teal-800">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a información de medicamentos
          </Link>
          <div className="text-sm text-gray-600">Paso 4 de 6</div>
        </div>
        <div className="mt-4">
          <Progress value={67} className="h-2 bg-teal-100" />
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <Card className="max-w-3xl mx-auto form-scale-in card-transition">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-teal-800">Objetivos de Salud</CardTitle>
            <CardDescription className="text-center">
              Selecciona los objetivos de salud que te gustaría alcanzar con los suplementos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">{error}</div>
              )}

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {healthGoals.map((goal) => (
                  <div key={goal.id} className="flex items-start space-x-2">
                    <Checkbox
                      id={goal.id}
                      checked={selectedGoals.includes(goal.id)}
                      onCheckedChange={() => handleGoalToggle(goal.id)}
                      className="data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600"
                    />
                    <Label htmlFor={goal.id} className="text-gray-700 cursor-pointer selection-transition">
                      {goal.label}
                    </Label>
                  </div>
                ))}
              </div>

              <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 flex items-center justify-center button-transition">
                Continuar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              Puedes cambiar tus objetivos de salud en cualquier momento desde tu perfil.
            </p>
          </CardFooter>
        </Card>
      </main>

      <footer className="py-4 text-center text-sm text-gray-600">
        <p>Suplementos+ &copy; {new Date().getFullYear()} - Todos los derechos reservados</p>
      </footer>
    </div>
  )
}
