import Link from "next/link"
import { ArrowLeft, Shield, Lock, Database, Trash2, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-teal-50 flex flex-col">
      <header className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="inline-flex items-center text-teal-700 hover:text-teal-800">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al inicio
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
              <Shield className="h-8 w-8 text-teal-600" />
            </div>
            <h1 className="text-3xl font-bold text-teal-800 mb-2">Política de Privacidad</h1>
            <p className="text-gray-600">Última actualización: {new Date().toLocaleDateString('es-UY')}</p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-xl text-teal-800 flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Tu Privacidad es Nuestra Prioridad
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700">
              <p>
                En Suplementos+, nos comprometemos a proteger tu información personal. 
                Esta política describe cómo recopilamos, usamos y protegemos tus datos.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-teal-800 flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Información que Recopilamos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-teal-600 mr-2">•</span>
                    <div>
                      <strong>Información básica:</strong> Género y edad (solo para personalizar recomendaciones)
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 mr-2">•</span>
                    <div>
                      <strong>Información de salud:</strong> Objetivos de salud, restricciones dietéticas, 
                      alergias y medicamentos actuales (opcional)
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 mr-2">•</span>
                    <div>
                      <strong>Resultados de análisis:</strong> Valores de análisis de sangre (si los proporcionas)
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-teal-800">Cómo Usamos tu Información</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-teal-600 mr-2">✓</span>
                    Generar recomendaciones personalizadas de suplementos
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 mr-2">✓</span>
                    Verificar interacciones con medicamentos para tu seguridad
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 mr-2">✓</span>
                    Mejorar la precisión de las recomendaciones basadas en tu perfil
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-teal-800">Almacenamiento y Seguridad</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="font-medium text-green-800 mb-2">🔒 Tus datos están seguros</p>
                  <ul className="space-y-2 text-sm">
                    <li>• Todos los datos se almacenan localmente en tu dispositivo</li>
                    <li>• Los datos están cifrados para mayor seguridad</li>
                    <li>• No compartimos información con terceros</li>
                    <li>• No utilizamos cookies de rastreo</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-teal-800 flex items-center gap-2">
                  <Trash2 className="h-5 w-5" />
                  Tus Derechos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Tienes control total sobre tus datos. Puedes:
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-teal-600 mr-2">•</span>
                    <div>
                      <strong>Acceder:</strong> Ver toda la información que hemos recopilado
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 mr-2">•</span>
                    <div>
                      <strong>Modificar:</strong> Actualizar tu información en cualquier momento
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 mr-2">•</span>
                    <div>
                      <strong>Eliminar:</strong> Borrar todos tus datos permanentemente usando el botón 
                      &quot;Comenzar de nuevo&quot; en la página de recomendaciones
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-teal-800">Cambios en esta Política</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Podemos actualizar esta política ocasionalmente. Te notificaremos sobre cambios 
                  importantes publicando la nueva política en esta página con una nueva fecha de 
                  actualización.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-teal-50 border-teal-200">
              <CardHeader>
                <CardTitle className="text-lg text-teal-800 flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Contacto
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Si tienes preguntas sobre esta política de privacidad o sobre cómo manejamos 
                  tus datos, no dudes en contactarnos.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Link href="/">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                Volver al inicio
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}