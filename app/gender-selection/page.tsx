"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, UserIcon as Male, UserIcon as Female } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useUser } from "@/context/user-context"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function GenderSelectionPage() {
  const router = useRouter()
  const { userProfile, setGender } = useUser()
  const [selectedGender, setSelectedGender] = useState<"male" | "female" | null>(userProfile.gender)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedGender) {
      setError("Por favor, selecciona tu género para continuar")
      return
    }

    setGender(selectedGender)
    router.push("/age-selection")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-teal-50 flex flex-col">
      <header className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="inline-flex items-center text-teal-700 hover:text-teal-800">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al inicio
          </Link>
          <div className="text-sm text-gray-600">Paso 1 de 4</div>
        </div>
        <div className="mt-4">
          <Progress value={25} className="h-2 bg-teal-100" />
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-teal-800">¿Cuál es tu género?</CardTitle>
            <CardDescription className="text-center">
              Esta información nos ayuda a personalizar tus recomendaciones de suplementos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">{error}</div>
              )}

              <RadioGroup
                value={selectedGender || ""}
                onValueChange={(value) => {
                  setSelectedGender(value as "male" | "female")
                  setError("")
                }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="relative">
                  <RadioGroupItem value="male" id="male" className="peer sr-only" />
                  <Label
                    htmlFor="male"
                    className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-teal-600 peer-data-[state=checked]:bg-teal-50 [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <Male className="mb-3 h-8 w-8 text-teal-700" />
                    <span className="font-medium">Hombre</span>
                  </Label>
                </div>

                <div className="relative">
                  <RadioGroupItem value="female" id="female" className="peer sr-only" />
                  <Label
                    htmlFor="female"
                    className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-teal-600 peer-data-[state=checked]:bg-teal-50 [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <Female className="mb-3 h-8 w-8 text-teal-700" />
                    <span className="font-medium">Mujer</span>
                  </Label>
                </div>
              </RadioGroup>

              <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 flex items-center justify-center">
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
        <p>Suplementos Uruguay &copy; {new Date().getFullYear()} - Todos los derechos reservados</p>
      </footer>
    </div>
  )
}
