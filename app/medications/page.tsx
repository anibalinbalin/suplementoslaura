"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Pill, AlertCircle, Shield } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useUser } from "@/context/user-context"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/lib/toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function MedicationsPage() {
  const router = useRouter()
  const { userProfile, setMedications } = useUser()
  const [takingMeds, setTakingMeds] = useState<string>(userProfile.medications ? "yes" : "no")
  const [medsDetails, setMedsDetails] = useState<string>(userProfile.medications || "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!takingMeds) {
      toast.error("Selección requerida", "Por favor indica si tomas medicamentos")
      return
    }

    if (takingMeds === "yes") {
      if (!medsDetails.trim()) {
        toast.error("Información requerida", "Por favor lista los medicamentos que tomas")
        return
      }
      // Validar formato básico
      if (medsDetails.trim().length < 3) {
        toast.error("Información incompleta", "Por favor proporciona más detalles sobre tus medicamentos")
        return
      }
      setMedications(medsDetails.trim())
      toast.success("Medicamentos guardados", "Verificaremos las interacciones para tu seguridad")
    } else {
      setMedications("")
      toast.success("Información guardada")
    }

    // Navigate to the health goals page
    router.push("/health-goals")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link
            href="/age-selection"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Atrás
          </Link>
          <div className="text-sm font-medium text-muted-foreground">
            Paso 3 de 5
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full bg-background/50 px-4">
        <div className="container">
          <Progress value={60} className="h-1" />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 space-y-4 fade-in">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-amber-500/10 mb-2">
              <Pill className="h-7 w-7 text-amber-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-display">
              Información sobre medicamentos
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ayúdanos a evitar posibles interacciones entre suplementos y medicamentos
            </p>
          </div>

          {/* Important Notice */}
          <div className="mb-8 animate-in">
            <div className="rounded-xl border-2 border-amber-500/20 bg-amber-500/5 p-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-amber-900 mb-2">Tu seguridad es nuestra prioridad</h3>
                  <p className="text-sm text-amber-800 leading-relaxed">
                    Algunos suplementos pueden interactuar con medicamentos. Esta información nos ayuda a brindarte
                    recomendaciones más seguras, pero siempre consulta con un profesional de la salud antes de comenzar
                    cualquier régimen de suplementos.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Card className="animate-in border-border/50">
            <CardContent className="pt-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Yes/No Selection */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">¿Estás tomando algún medicamento actualmente?</h3>

                  <RadioGroup value={takingMeds} onValueChange={setTakingMeds} className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <RadioGroupItem value="yes" id="yes" className="peer sr-only" />
                      <Label
                        htmlFor="yes"
                        className="flex items-center justify-center rounded-xl border-2 border-border/50 bg-background p-6 hover:bg-accent/50 hover:border-accent transition-all duration-200 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:ring-4 peer-data-[state=checked]:ring-primary/10 cursor-pointer"
                      >
                        <span className="text-base font-medium">Sí</span>
                      </Label>
                    </div>

                    <div className="relative">
                      <RadioGroupItem value="no" id="no" className="peer sr-only" />
                      <Label
                        htmlFor="no"
                        className="flex items-center justify-center rounded-xl border-2 border-border/50 bg-background p-6 hover:bg-accent/50 hover:border-accent transition-all duration-200 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:ring-4 peer-data-[state=checked]:ring-primary/10 cursor-pointer"
                      >
                        <span className="text-base font-medium">No</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Medication Details (shown if Yes) */}
                {takingMeds === "yes" && (
                  <div className="space-y-4 slide-in-from-bottom">
                    <div className="space-y-2">
                      <Label htmlFor="medications" className="text-base font-medium">
                        Por favor, lista los medicamentos que estás tomando
                      </Label>
                      <Textarea
                        id="medications"
                        placeholder="Ejemplo: Atorvastatina 20mg, Levotiroxina 50mcg, Metformina 500mg..."
                        value={medsDetails}
                        onChange={(e) => setMedsDetails(e.target.value)}
                        className="min-h-[140px] resize-none"
                        autoFocus
                      />
                      <div className="flex items-start gap-2 text-sm text-muted-foreground">
                        <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <p>
                          Incluye el nombre y la dosis de cada medicamento si la conoces. Esto nos ayuda a
                          identificar posibles interacciones.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link href="/age-selection" className="flex-1">
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
                Tu información médica se mantiene privada y segura
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
