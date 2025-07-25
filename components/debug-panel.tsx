// Create a new component for debugging supplement information
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X, Bug, AlertTriangle } from "lucide-react"

export default function DebugPanel() {
  const [supplementName, setSupplementName] = useState("")
  const [infoType, setInfoType] = useState("descripcion")
  const [content, setContent] = useState("")
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showDebugPanel, setShowDebugPanel] = useState(false)

  const validateInfo = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/validate-supplement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          supplementName,
          infoType,
          content,
        }),
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error("Error validating supplement info:", error)
      setResult({ error: "Failed to validate supplement information" })
    } finally {
      setIsLoading(false)
    }
  }

  const getSupplementInfo = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/validate-supplement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          supplementName,
          infoType,
        }),
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error("Error getting supplement info:", error)
      setResult({ error: "Failed to get supplement information" })
    } finally {
      setIsLoading(false)
    }
  }

  if (!showDebugPanel) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button onClick={() => setShowDebugPanel(true)} size="sm" className="bg-amber-600 hover:bg-amber-700">
          <Bug className="h-4 w-4 mr-1" />
          Debug
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-md">
      <Card className="border-amber-300 shadow-lg">
        <CardHeader className="bg-amber-50 border-b border-amber-200">
          <div className="flex justify-between items-center">
            <CardTitle className="text-amber-800 flex items-center">
              <Bug className="h-5 w-5 mr-2" />
              Validador de Información
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setShowDebugPanel(false)} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>Verifica si la información proviene del archivo examine-data-es.ts</CardDescription>
        </CardHeader>
        <CardContent className="pt-4 space-y-3">
          <div>
            <label className="text-sm font-medium mb-1 block">Nombre del Suplemento</label>
            <Input
              value={supplementName}
              onChange={(e) => setSupplementName(e.target.value)}
              placeholder="Ej: Creatina, Proteína, Magnesio"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Tipo de Información</label>
            <Select value={infoType} onValueChange={setInfoType}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona el tipo de información" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="descripcion">Descripción</SelectItem>
                <SelectItem value="beneficio">Beneficio</SelectItem>
                <SelectItem value="dosificacion">Dosificación</SelectItem>
                <SelectItem value="momento_optimo">Momento Óptimo</SelectItem>
                <SelectItem value="consejos_absorcion">Consejos de Absorción</SelectItem>
                <SelectItem value="efecto_secundario">Efecto Secundario</SelectItem>
                <SelectItem value="evidencia">Evidencia Científica</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Contenido a Verificar</label>
            <Input value={content} onChange={(e) => setContent(e.target.value)} placeholder="Texto a verificar" />
            <p className="text-xs text-gray-500 mt-1">Deja en blanco para obtener toda la información disponible</p>
          </div>

          {result && (
            <div className="mt-4 p-3 bg-gray-50 rounded-md border text-sm overflow-auto max-h-40">
              {result.isValid !== undefined ? (
                <div className="flex items-center">
                  {result.isValid ? (
                    <>
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-green-700">Información verificada en la base de datos</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                      <span className="text-amber-700">Información no encontrada en la base de datos</span>
                    </>
                  )}
                </div>
              ) : (
                <pre className="text-xs">{JSON.stringify(result, null, 2)}</pre>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4 bg-gray-50">
          <Button variant="outline" onClick={getSupplementInfo} disabled={isLoading || !supplementName}>
            Ver Datos
          </Button>
          <Button
            onClick={validateInfo}
            disabled={isLoading || !supplementName || !content}
            className="bg-amber-600 hover:bg-amber-700"
          >
            {isLoading ? "Verificando..." : "Verificar"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
