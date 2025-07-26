"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Shield, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { secureStorage } from "@/lib/crypto-storage"

const CONSENT_KEY = "suplementos-uruguay-privacy-consent"

export function PrivacyConsent() {
  const [showConsent, setShowConsent] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)

  useEffect(() => {
    // Verificar si el usuario ya dio consentimiento
    const hasConsent = secureStorage.getItem(CONSENT_KEY)
    if (!hasConsent) {
      setShowConsent(true)
    }
  }, [])

  const handleAccept = () => {
    if (acceptTerms) {
      secureStorage.setItem(CONSENT_KEY, {
        accepted: true,
        date: new Date().toISOString(),
      })
      setShowConsent(false)
    }
  }

  const handleDecline = () => {
    // Si el usuario no acepta, no puede usar la aplicación
    window.location.href = "https://www.google.com"
  }

  if (!showConsent) return null

  return (
    <Dialog open={showConsent} onOpenChange={() => {}}>
      <DialogContent className="max-w-lg" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <div className="flex items-center justify-center w-12 h-12 bg-teal-100 rounded-full mb-4 mx-auto">
            <Shield className="h-6 w-6 text-teal-600" />
          </div>
          <DialogTitle className="text-xl text-center">Consentimiento de Privacidad</DialogTitle>
          <DialogDescription className="text-center">
            Tu privacidad es importante para nosotros
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 space-y-2">
            <p>Para brindarte recomendaciones personalizadas, necesitamos:</p>
            <ul className="space-y-1 ml-4">
              <li>• Almacenar tu información de forma segura en tu dispositivo</li>
              <li>• Procesar tus datos de salud localmente</li>
              <li>• Mantener tus preferencias para futuras visitas</li>
            </ul>
          </div>

          <div className="bg-green-50 p-4 rounded-lg text-sm">
            <p className="font-medium text-green-800 mb-2">🔒 Tu información está protegida</p>
            <ul className="space-y-1 text-green-700">
              <li>• Todos los datos se cifran antes de guardarse</li>
              <li>• No compartimos información con terceros</li>
              <li>• Puedes eliminar tus datos en cualquier momento</li>
            </ul>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="terms"
              checked={acceptTerms}
              onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
              className="mt-1"
            />
            <label
              htmlFor="terms"
              className="text-sm text-gray-600 cursor-pointer"
            >
              He leído y acepto la{" "}
              <Link
                href="/privacidad"
                target="_blank"
                className="text-teal-600 hover:text-teal-700 underline"
              >
                Política de Privacidad
              </Link>
              {" "}y autorizo el almacenamiento seguro de mis datos en este dispositivo.
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleDecline}
              className="flex-1"
            >
              No acepto
            </Button>
            <Button
              onClick={handleAccept}
              disabled={!acceptTerms}
              className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
            >
              Acepto y continúo
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}