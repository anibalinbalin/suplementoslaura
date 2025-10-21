"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react"
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

    setAge(parsedAge)
    toast.success("Edad guardada correctamente")
    router.push("/medications")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link
            href="/gender-selection"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Atrás
          </Link>
          <div className="text-sm font-medium text-muted-foreground">
            Paso 2 de 5
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full bg-background/50 px-4">
        <div className="container">
          <Progress value={40} className="h-1" />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10 space-y-4 fade-in">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-primary/10 mb-2">
              <Calendar className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-display">
              ¿Cuál es tu edad?
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg mx-auto">
              Personalizamos las recomendaciones según tu etapa de vida
            </p>
          </div>

          <Card className="animate-in border-border/50">
            <CardContent className="pt-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {error && (
                  <div className="bg-destructive/10 border-2 border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div className="space-y-3">
                  <Label htmlFor="age" className="text-base font-medium">
                    Edad (años)
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    min="18"
                    max="100"
                    placeholder="Ej: 30"
                    value={ageValue}
                    onChange={(e) => {
                      const value = e.target.value
                      // Solo permitir números y limitar a 3 dígitos
                      if (value === "" || (/^\d+$/.test(value) && value.length <= 3)) {
                        setAgeValue(value)
                        setError("")
                      }
                    }}
                    className={`text-lg ${error ? "border-destructive focus-visible:border-destructive" : ""}`}
                    autoFocus
                  />
                  <p className="text-sm text-muted-foreground">
                    Debes tener al menos 18 años para usar este servicio
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link href="/gender-selection" className="flex-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="w-full"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Atrás
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    size="lg"
                    className="flex-1 group"
                  >
                    Continuar
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </form>
            </CardContent>
            <div className="px-8 pb-8">
              <p className="text-xs text-center text-muted-foreground">
                Tu información se mantiene privada y segura
              </p>
            </div>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center border-t border-border/40">
        <p className="text-sm text-muted-foreground">
          Suplementos+ &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  )
}
