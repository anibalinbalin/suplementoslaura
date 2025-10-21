"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Leaf, AlertCircle } from "lucide-react"
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

    // Make sure the data is saved before navigating
    setTimeout(() => {
      // Navigate to the loading page
      router.push("/generating-recommendations")
    }, 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link
            href="/health-goals"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Atrás
          </Link>
          <div className="text-sm font-medium text-muted-foreground">
            Paso 5 de 5
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full bg-background/50 px-4">
        <div className="container">
          <Progress value={100} className="h-1" />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 space-y-4 fade-in">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-emerald-500/10 mb-2">
              <Leaf className="h-7 w-7 text-emerald-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-display">
              Restricciones dietéticas
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Asegúrate de recibir recomendaciones compatibles con tu dieta y alergias
            </p>
            {selectedRestrictions.length > 0 && (
              <Badge variant="success" className="text-sm">
                {selectedRestrictions.length} restricción{selectedRestrictions.length !== 1 ? 'es' : ''} seleccionada{selectedRestrictions.length !== 1 ? 's' : ''}
              </Badge>
            )}
          </div>

          <Card className="animate-in border-border/50">
            <CardContent className="pt-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Dietary Restrictions */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">Restricciones dietéticas</h3>
                    <span className="text-sm text-muted-foreground">(opcional)</span>
                  </div>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {dietaryRestrictions.map((restriction) => {
                      const isSelected = selectedRestrictions.includes(restriction.id)

                      return (
                        <div key={restriction.id} className="relative">
                          <Checkbox
                            id={restriction.id}
                            checked={isSelected}
                            onCheckedChange={() => handleRestrictionToggle(restriction.id)}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={restriction.id}
                            className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 cursor-pointer transition-all duration-200 ${
                              isSelected
                                ? "border-emerald-500 bg-emerald-500/5 ring-4 ring-emerald-500/10"
                                : "border-border/50 bg-background hover:bg-accent/50 hover:border-accent"
                            }`}
                          >
                            <span className="text-sm font-medium flex-1">{restriction.label}</span>
                            {isSelected && (
                              <div className="h-5 w-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                                <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            )}
                          </Label>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Allergies */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-amber-600" />
                    <h3 className="text-lg font-semibold">Alergias o intolerancias</h3>
                    <span className="text-sm text-muted-foreground">(opcional)</span>
                  </div>
                  <Textarea
                    placeholder="Describe cualquier alergia o intolerancia adicional que tengas..."
                    value={allergies}
                    onChange={(e) => setAllergiesLocal(e.target.value)}
                    className="min-h-[120px] resize-none"
                  />
                  <p className="text-sm text-muted-foreground">
                    Ejemplo: alergia al polen, intolerancia a ciertos conservantes, etc.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link href="/health-goals" className="flex-1">
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
                    className="flex-1 group bg-emerald-600 hover:bg-emerald-700"
                  >
                    Ver recomendaciones
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </form>
            </CardContent>
            <div className="px-8 pb-8">
              <p className="text-xs text-center text-muted-foreground">
                Tus recomendaciones se ajustarán automáticamente a tus restricciones
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
