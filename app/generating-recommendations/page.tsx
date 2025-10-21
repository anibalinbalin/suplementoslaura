"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useUser } from "@/context/user-context"
import { getAIRecommendations } from "../actions/recommendation-actions"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GeneratingRecommendationsPage() {
  const router = useRouter()
  const { userProfile, setRecommendations, setClinicalSafetyData } = useUser()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [statusMessage, setStatusMessage] = useState("Iniciando generación de recomendaciones...")

  useEffect(() => {
    const generateRecommendations = async () => {
      try {
        // Check if we have all the required data
        if (!userProfile.gender || !userProfile.age || userProfile.healthGoals.length === 0) {
          router.push("/gender-selection")
          return
        }

        setIsLoading(true)
        setProgress(10)
        setStatusMessage("Analizando tus objetivos de salud...")

        // Simulate progress updates
        const progressInterval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 90) {
              clearInterval(progressInterval)
              return prev
            }
            return prev + 10
          })

          // Update status messages based on progress
          if (progress > 20 && progress <= 40) {
            setStatusMessage("Consultando la base de datos científica...")
          } else if (progress > 40 && progress <= 60) {
            setStatusMessage("Generando recomendaciones personalizadas basadas en evidencia científica...")
          } else if (progress > 60 && progress <= 80) {
            setStatusMessage("Adaptando recomendaciones a tus restricciones dietéticas...")
          } else if (progress > 80) {
            setStatusMessage("Finalizando tus recomendaciones personalizadas...")
          }
        }, 800)

        // Prepare the request data
        const requestData = {
          gender: userProfile.gender,
          age: userProfile.age,
          healthGoals: userProfile.healthGoals,
          dietaryRestrictions: userProfile.dietaryRestrictions,
          allergies: userProfile.allergies,
          medications: userProfile.medications,
          bloodTestResults: userProfile.bloodTestResults || [],
        }

        console.log("Sending request with data:", JSON.stringify(requestData, null, 2))
        console.log("Dietary restrictions from profile:", userProfile.dietaryRestrictions)

        try {
          // Generate recommendations using only Examine data
          const result = await getAIRecommendations(requestData)

          clearInterval(progressInterval)
          setProgress(100)

          if (result.success && result.recommendations && result.recommendations.length > 0) {
            // Save recommendations to context
            setRecommendations(result.recommendations)

            // Save clinical safety data to context
            setClinicalSafetyData({
              clinicalDisclaimer: result.clinicalDisclaimer,
              drugDepletionWarnings: result.drugDepletionWarnings,
              overallRequiresProfessionalReview: result.overallRequiresProfessionalReview,
            })

            // Navigate to recommendations page
            setTimeout(() => {
              router.push("/recommendations")
            }, 500)
          } else {
            // Handle error
            setError(result.error || "Ocurrió un error al generar las recomendaciones")
            setIsLoading(false)
          }
        } catch (e: any) {
          console.error("Error making recommendation request:", e)
          clearInterval(progressInterval)
          setError("No se pudieron generar recomendaciones. Por favor, inténtalo de nuevo.")
          setIsLoading(false)
          setProgress(0)
        }
      } catch (error) {
        console.error("Error generating recommendations:", error)
        setError("Ocurrió un error al generar las recomendaciones. Por favor, inténtalo de nuevo.")
        setIsLoading(false)
        setProgress(0)
      }
    }

    // Start generating recommendations after a short delay
    const timer = setTimeout(() => {
      generateRecommendations()
    }, 1000)

    return () => clearTimeout(timer)
  }, [userProfile, router, setRecommendations, progress])

  const handleRetry = () => {
    setError(null)
    setIsLoading(true)
    setProgress(0)
    // Retry the recommendation generation
    const timer = setTimeout(() => {
      router.refresh()
    }, 500)
    return () => clearTimeout(timer)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-teal-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-teal-800">
            {error ? "Error al generar recomendaciones" : "Generando tus recomendaciones"}
          </CardTitle>
          <CardDescription className="text-center">
            {error
              ? "Lo sentimos, ha ocurrido un error al generar tus recomendaciones personalizadas."
              : "Estamos analizando tus objetivos de salud y restricciones dietéticas para ofrecerte las mejores recomendaciones personalizadas."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error ? (
            <>
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>

              <div className="flex flex-col space-y-2">
                <Button onClick={handleRetry} className="bg-teal-600 hover:bg-teal-700">
                  Intentar de nuevo
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{statusMessage}</span>
                  <span>{isLoading ? "Por favor espera..." : "¡Completado!"}</span>
                </div>
                <Progress value={progress} className="h-2 bg-teal-100" />
              </div>

              <div className="bg-teal-50 p-4 rounded-md text-sm text-teal-700">
                <div className="flex items-center gap-2 mb-2">
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  <p className="font-medium">Procesando información</p>
                </div>
                <p>
                  Nuestro sistema está analizando tus datos para recomendarte los suplementos más adecuados para tus
                  necesidades específicas, basándose en la evidencia científica más actualizada.
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
