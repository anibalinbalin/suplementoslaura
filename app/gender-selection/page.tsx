"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, User } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useUser } from "@/context/user-context"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function GenderSelectionPage() {
  const router = useRouter()
  const { userProfile, setGender } = useUser()
  const [selectedGender, setSelectedGender] = useState<"male" | "female" | null>(null)
  const [error, setError] = useState("")
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
    if (userProfile.gender) {
      setSelectedGender(userProfile.gender)
    }
  }, [userProfile.gender])

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
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al inicio
          </Link>
          <div className="text-sm font-medium text-muted-foreground">
            Paso 1 de 5
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full bg-background/50 px-4">
        <div className="container">
          <Progress value={20} className="h-1" />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10 space-y-4 fade-in">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-primary/10 mb-2">
              <User className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-display">
              ¿Cuál es tu género?
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg mx-auto">
              Esta información nos ayuda a personalizar tus recomendaciones de suplementos
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

                <RadioGroup
                  value={selectedGender || ""}
                  onValueChange={(value) => {
                    setSelectedGender(value as "male" | "female")
                    setError("")
                  }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  <div className="relative">
                    <RadioGroupItem value="male" id="male" className="peer sr-only" />
                    <Label
                      htmlFor="male"
                      className="flex flex-col items-center justify-center rounded-2xl border-2 border-border/50 bg-background p-8 hover:bg-accent/50 hover:border-accent transition-all duration-200 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:ring-4 peer-data-[state=checked]:ring-primary/10 cursor-pointer group"
                    >
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                        <User className="h-8 w-8 text-primary" />
                      </div>
                      <span className="text-lg font-semibold">Hombre</span>
                    </Label>
                  </div>

                  <div className="relative">
                    <RadioGroupItem value="female" id="female" className="peer sr-only" />
                    <Label
                      htmlFor="female"
                      className="flex flex-col items-center justify-center rounded-2xl border-2 border-border/50 bg-background p-8 hover:bg-accent/50 hover:border-accent transition-all duration-200 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:ring-4 peer-data-[state=checked]:ring-primary/10 cursor-pointer group"
                    >
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                        <User className="h-8 w-8 text-primary" />
                      </div>
                      <span className="text-lg font-semibold">Mujer</span>
                    </Label>
                  </div>
                </RadioGroup>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link href="/" className="flex-1">
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
                Puedes cambiar esta información en cualquier momento
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
