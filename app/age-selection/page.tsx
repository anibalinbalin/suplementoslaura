"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useUser } from "@/context/user-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/lib/toast"

export default function AgeSelectionPage() {
  const router = useRouter()
  const { userProfile, setAge } = useUser()
  const [ageValue, setAgeValue] = useState<string>(userProfile.age ? userProfile.age.toString() : "")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!ageValue.trim()) {
      setError("Por favor ingresa tu edad")
      toast.error("Campo requerido", "Debes ingresar tu edad para continuar")
      return
    }

    const parsedAge = Number.parseInt(ageValue, 10)

    if (isNaN(parsedAge)) {
      setError("Por favor ingresa un número válido")
      toast.error("Edad inválida", "La edad debe ser un número")
      return
    }

    if (parsedAge < 18) {
      setError("Debes ser mayor de 18 años para usar esta aplicación")
      toast.warning("Edad mínima", "Esta aplicación es solo para adultos mayores de 18 años")
      return
    }

    if (parsedAge > 100) {
      setError("Por favor, ingresa una edad válida")
      toast.error("Edad inválida", "Por favor verifica tu edad")
      return
    }

    console.log("Guardando edad:", parsedAge)
    setAge(parsedAge)
    toast.success("Edad guardada correctamente")
    router.push("/medications")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-teal-50 flex flex-col">
      <header className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center">
          <Link href="/gender-selection" className="inline-flex items-center text-teal-700 hover:text-teal-800">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a selección de género
          </Link>
          <div className="text-sm text-gray-600">Paso 2 de 6</div>
        </div>
        <div className="mt-4">
          <Progress value={33} className="h-2 bg-teal-100" />
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto form-scale-in card-transition">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-teal-800">¿Cuál es tu edad?</CardTitle>
            <CardDescription className="text-center">
              Esta información nos ayuda a personalizar tus recomendaciones de suplementos según tu etapa de vida
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">{error}</div>
              )}

              <div className="space-y-2">
                <Label htmlFor="age">Edad (años)</Label>
                <Input
                  id="age"
                  type="number"
                  min="18"
                  max="100"
                  placeholder="Ingresa tu edad"
                  value={ageValue}
                  onChange={(e) => {
                    const value = e.target.value
                    // Solo permitir números y limitar a 3 dígitos
                    if (value === "" || (/^\d+$/.test(value) && value.length <= 3)) {
                      setAgeValue(value)
                      setError("")
                    }
                  }}
                  className={`input-transition ${error ? "border-red-500" : ""}`}
                />
              </div>

              <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 flex items-center justify-center button-transition">
                Continuar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              Puedes cambiar esta información en cualquier momento desde tu perfil.
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
