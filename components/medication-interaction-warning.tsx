"use client"

import { AlertTriangle, Info, AlertCircle, ChevronDown, ChevronUp, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface MedicationInteraction {
  supplement: string
  medication: string
  severity: "high" | "moderate" | "low"
  description: string
  recommendation: string
}

interface MedicationInteractionWarningProps {
  interactions: MedicationInteraction[]
  medications: string
}

export function MedicationInteractionWarning({ interactions, medications }: MedicationInteractionWarningProps) {
  const [expanded, setExpanded] = useState(true)
  
  if (!interactions || interactions.length === 0) return null

  const highSeverityCount = interactions.filter(i => i.severity === "high").length
  const moderateSeverityCount = interactions.filter(i => i.severity === "moderate").length

  const getSeverityConfig = (severity: "high" | "moderate" | "low") => {
    switch (severity) {
      case "high":
        return {
          color: "text-red-800 bg-red-50 border-red-200",
          icon: AlertTriangle,
          label: "IMPORTANTE",
          badgeClass: "bg-red-600 hover:bg-red-700",
        }
      case "moderate":
        return {
          color: "text-amber-800 bg-amber-50 border-amber-200",
          icon: AlertCircle,
          label: "PRECAUCIÓN",
          badgeClass: "bg-amber-600 hover:bg-amber-700",
        }
      case "low":
        return {
          color: "text-yellow-800 bg-yellow-50 border-yellow-200",
          icon: Info,
          label: "INFORMACIÓN",
          badgeClass: "bg-yellow-600 hover:bg-yellow-700",
        }
    }
  }

  return (
    <Card className={cn(
      "mb-8",
      highSeverityCount > 0 ? "border-red-300 shadow-red-50" : "border-amber-300 shadow-amber-50",
      "shadow-lg"
    )}>
      <CardHeader 
        className={cn(
          "cursor-pointer",
          highSeverityCount > 0 ? "bg-red-50" : "bg-amber-50"
        )}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              "h-10 w-10 rounded-full flex items-center justify-center",
              highSeverityCount > 0 ? "bg-red-100" : "bg-amber-100"
            )}>
              <Shield className={cn(
                "h-6 w-6",
                highSeverityCount > 0 ? "text-red-600" : "text-amber-600"
              )} />
            </div>
            <div>
              <CardTitle className={cn(
                "text-xl",
                highSeverityCount > 0 ? "text-red-800" : "text-amber-800"
              )}>
                {highSeverityCount > 0 ? "⚠️ Interacciones Importantes con Medicamentos" : "💡 Precauciones con Medicamentos"}
              </CardTitle>
              <CardDescription className="mt-1">
                Tus medicamentos actuales: <span className="font-medium text-gray-800">{medications}</span>
              </CardDescription>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      
      {expanded && (
        <CardContent className="pt-6">
          <div className="space-y-4">
            {highSeverityCount > 0 && (
              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertTitle className="text-red-800">Consulte con su Médico</AlertTitle>
                <AlertDescription className="text-red-700">
                  Se han detectado {highSeverityCount} interacciones importantes. Por su seguridad, 
                  consulte con su médico antes de tomar estos suplementos junto con sus medicamentos actuales.
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-3">
              {interactions
                .sort((a, b) => {
                  const severityOrder = { high: 0, moderate: 1, low: 2 }
                  return severityOrder[a.severity] - severityOrder[b.severity]
                })
                .map((interaction, index) => {
                  const config = getSeverityConfig(interaction.severity)
                  const IconComponent = config.icon

                  return (
                    <div
                      key={index}
                      className={cn(
                        "p-4 rounded-lg border",
                        config.color
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <IconComponent className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">
                              {interaction.supplement} + {interaction.medication}
                            </h4>
                            <Badge className={cn("text-white", config.badgeClass)}>
                              {config.label}
                            </Badge>
                          </div>
                          <p className="text-sm mb-2">{interaction.description}</p>
                          <div className="bg-white/50 p-3 rounded-md">
                            <p className="text-sm font-medium mb-1">Recomendación:</p>
                            <p className="text-sm">{interaction.recommendation}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>

            <div className="mt-6 space-y-3">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">¿Qué significan estos niveles?</p>
                    <ul className="space-y-1 ml-4">
                      <li>• <span className="font-medium">Importante:</span> Requiere supervisión médica antes de usar</li>
                      <li>• <span className="font-medium">Precaución:</span> Generalmente seguro con monitoreo apropiado</li>
                      <li>• <span className="font-medium">Información:</span> Interacción menor, pero bueno saberlo</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Recomendación:</span> Comparta esta información con su médico 
                  en su próxima consulta para ajustar su plan de suplementación de forma segura.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}