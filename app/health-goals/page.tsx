"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Target, Dumbbell, Heart, Brain, Moon, Shield, Activity, Bone, Pill, Sparkles } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useUser } from "@/context/user-context"

type HealthGoal = {
  id: string
  label: string
  icon: React.ElementType
}

// Lista de objetivos de salud con IDs que coinciden con el backend e iconos
const healthGoals: HealthGoal[] = [
  { id: "ganancia-muscular", label: "Ganancia muscular", icon: Dumbbell },
  { id: "perdida-peso", label: "Pérdida de peso", icon: Target },
  { id: "apoyo-inmune", label: "Apoyo al sistema inmunológico", icon: Shield },
  { id: "reduccion-estres", label: "Reducción del estrés", icon: Brain },
  { id: "aumento-energia", label: "Aumento de energía", icon: Activity },
  { id: "mejor-sueno", label: "Mejor calidad de sueño", icon: Moon },
  { id: "salud-articular", label: "Salud articular", icon: Bone },
  { id: "salud-cardiovascular", label: "Salud cardiovascular", icon: Heart },
  { id: "salud-digestiva", label: "Salud digestiva", icon: Sparkles },
  { id: "microbiota-intestinal", label: "Mejorar microbiota intestinal", icon: Sparkles },
  { id: "funcion-cerebral", label: "Función cerebral", icon: Brain },
  { id: "cabello-piel-unas", label: "Salud de cabello, piel y uñas", icon: Sparkles },
  { id: "equilibrio-hormonal", label: "Equilibrio hormonal", icon: Pill },
  { id: "salud-osea", label: "Salud ósea", icon: Bone },
  { id: "menopausia", label: "Menopausia", icon: Pill },
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
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link
            href="/medications"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Atrás
          </Link>
          <div className="text-sm font-medium text-muted-foreground">
            Paso 4 de 5
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full bg-background/50 px-4">
        <div className="container">
          <Progress value={80} className="h-1" />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 space-y-4 fade-in">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-primary/10 mb-2">
              <Target className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-display">
              ¿Cuáles son tus objetivos?
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Selecciona todos los objetivos de salud que te gustaría alcanzar
            </p>
            {selectedGoals.length > 0 && (
              <Badge variant="default" className="text-sm">
                {selectedGoals.length} objetivo{selectedGoals.length !== 1 ? 's' : ''} seleccionado{selectedGoals.length !== 1 ? 's' : ''}
              </Badge>
            )}
          </div>

          <Card className="animate-in border-border/50">
            <CardContent className="pt-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {error && (
                  <div className="bg-destructive/10 border-2 border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm text-center">
                    {error}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {healthGoals.map((goal) => {
                    const isSelected = selectedGoals.includes(goal.id)
                    const Icon = goal.icon

                    return (
                      <div key={goal.id} className="relative">
                        <Checkbox
                          id={goal.id}
                          checked={isSelected}
                          onCheckedChange={() => handleGoalToggle(goal.id)}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={goal.id}
                          className={`flex items-center gap-3 rounded-xl border-2 p-4 cursor-pointer transition-all duration-200 ${
                            isSelected
                              ? "border-primary bg-primary/5 ring-4 ring-primary/10"
                              : "border-border/50 bg-background hover:bg-accent/50 hover:border-accent"
                          }`}
                        >
                          <div className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                            isSelected ? "bg-primary/20" : "bg-muted"
                          }`}>
                            <Icon className={`h-5 w-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                          </div>
                          <span className="text-sm font-medium flex-1">{goal.label}</span>
                          {isSelected && (
                            <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
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

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link href="/medications" className="flex-1">
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
                Puedes modificar tus objetivos en cualquier momento
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
