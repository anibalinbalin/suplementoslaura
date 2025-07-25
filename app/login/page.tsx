"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido"
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      // In a real app, you would call an API to authenticate the user
      console.log("Login form submitted:", formData)

      // Redirect to the recommendations page (assuming the user has already set up their profile)
      router.push("/recommendations")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-teal-50 flex flex-col">
      <header className="container mx-auto py-6 px-4">
        <Link href="/" className="inline-flex items-center text-teal-700 hover:text-teal-800">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al inicio
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-teal-800">Iniciar Sesión</CardTitle>
            <CardDescription className="text-center">
              Accede a tu cuenta para ver tus recomendaciones personalizadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>

              <div className="flex items-center justify-end">
                <Link href="/forgot-password" className="text-sm text-teal-600 hover:text-teal-700">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
                Iniciar Sesión
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              ¿No tienes una cuenta?{" "}
              <Link href="/signup" className="text-teal-600 hover:text-teal-700 font-medium">
                Regístrate
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>

      <footer className="py-4 text-center text-sm text-gray-600">
        <p>
          Al iniciar sesión, aceptas nuestros{" "}
          <Link href="/terms" className="text-teal-600 hover:text-teal-700">
            Términos y Condiciones
          </Link>{" "}
          y{" "}
          <Link href="/privacy" className="text-teal-600 hover:text-teal-700">
            Política de Privacidad
          </Link>
        </p>
      </footer>
    </div>
  )
}
