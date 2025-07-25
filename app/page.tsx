import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, Shield, Dumbbell, Brain, FlaskRoundIcon as Flask, Target, ArrowRight, CheckCircle } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-teal-50">
      <header className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-teal-700">Suplementos Uruguay</h1>
          <div className="space-x-2">
            <Link href="/login">
              <Button variant="outline" className="border-teal-600 text-teal-700 hover:bg-teal-50">
                Iniciar Sesión
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white">Registrarse</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold text-teal-800 mb-4">
            Encuentra los suplementos perfectos para tus necesidades
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Obtén recomendaciones personalizadas basadas en tus objetivos de salud o análisis de sangre.
            Información respaldada por evidencia científica actualizada.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/gender-selection">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-6 text-lg">
                <Target className="mr-2 h-5 w-5" />
                Por Objetivos de Salud
              </Button>
            </Link>
            <span className="text-gray-500">o</span>
            <Link href="/analisis-sangre">
              <Button variant="outline" className="border-teal-600 text-teal-700 hover:bg-teal-50 px-8 py-6 text-lg">
                <Flask className="mr-2 h-5 w-5" />
                Por Análisis de Sangre
              </Button>
            </Link>
          </div>
        </section>

        {/* Sección de las dos formas de obtener recomendaciones */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-teal-800 mb-8 text-center">Dos formas de obtener tus recomendaciones</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Opción 1: Por Objetivos de Salud */}
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-12 w-12 bg-teal-100 rounded-full flex items-center justify-center">
                    <Target className="h-6 w-6 text-teal-700" />
                  </div>
                  <CardTitle className="text-2xl text-teal-800">Por Objetivos de Salud</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Responde algunas preguntas sobre tus metas de salud, edad, género y restricciones dietéticas
                  para recibir recomendaciones personalizadas.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">Proceso guiado paso a paso</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">Considera restricciones dietéticas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">Múltiples objetivos de salud</span>
                  </li>
                </ul>
                <Link href="/gender-selection">
                  <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                    Comenzar Cuestionario
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Opción 2: Por Análisis de Sangre */}
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow border-2 border-red-100">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Flask className="h-6 w-6 text-red-600" />
                  </div>
                  <CardTitle className="text-2xl text-teal-800">Por Análisis de Sangre</CardTitle>
                </div>
                <Badge className="bg-red-100 text-red-800 w-fit">
                  ¡Nuevo! Análisis Completo
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Ingresa tus resultados de análisis de sangre para detectar deficiencias y recibir 
                  recomendaciones precisas de suplementación.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">Vitaminas: D, B12, A, E, K</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">Minerales: Hierro, Calcio, Magnesio</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">Indicadores: Glucosa, Cortisol, Electrolitos</span>
                  </li>
                </ul>
                <Link href="/analisis-sangre">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                    Analizar Resultados
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="border-teal-100 hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto bg-teal-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Dumbbell className="h-8 w-8 text-teal-700" />
              </div>
              <CardTitle className="text-teal-700">Ganancia Muscular</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Suplementos diseñados para ayudarte a aumentar masa muscular y mejorar tu rendimiento físico.
              </p>
            </CardContent>
          </Card>

          <Card className="border-teal-100 hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto bg-teal-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Leaf className="h-8 w-8 text-teal-700" />
              </div>
              <CardTitle className="text-teal-700">Pérdida de Peso</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Encuentra suplementos que apoyan tus objetivos de pérdida de peso de manera saludable y efectiva.
              </p>
            </CardContent>
          </Card>

          <Card className="border-teal-100 hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto bg-teal-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-teal-700" />
              </div>
              <CardTitle className="text-teal-700">Sistema Inmune</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Suplementos para fortalecer tu sistema inmunológico y mantener tu salud en óptimas condiciones.
              </p>
            </CardContent>
          </Card>

          <Card className="border-teal-100 hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto bg-teal-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Brain className="h-8 w-8 text-teal-700" />
              </div>
              <CardTitle className="text-teal-700">Reducción de Estrés</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Descubre suplementos que te ayudan a manejar el estrés y mejorar tu bienestar mental.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="bg-white rounded-lg shadow-sm p-8 mb-16">
          <h2 className="text-3xl font-bold text-teal-800 mb-6 text-center">Cómo Funciona</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-teal-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-teal-700 font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold text-teal-700 mb-2">Elige tu método</h3>
              <p className="text-gray-600">
                Selecciona si quieres recomendaciones por objetivos de salud o por análisis de sangre.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-teal-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-teal-700 font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold text-teal-700 mb-2">Recibe recomendaciones</h3>
              <p className="text-gray-600">
                Obtén suplementos personalizados basados en evidencia científica actualizada.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-teal-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-teal-700 font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold text-teal-700 mb-2">Compra con confianza</h3>
              <p className="text-gray-600">Accede a información detallada y enlaces para comprar en Mercado Libre.</p>
            </div>
          </div>
        </section>

        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold text-teal-800 mb-6">¿Listo para encontrar tus suplementos ideales?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/gender-selection">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-6 text-lg">
                <Target className="mr-2 h-5 w-5" />
                Comenzar con Objetivos
              </Button>
            </Link>
            <span className="text-gray-500">o</span>
            <Link href="/analisis-sangre">
              <Button variant="outline" className="border-red-600 text-red-700 hover:bg-red-50 px-8 py-6 text-lg">
                <Flask className="mr-2 h-5 w-5" />
                Comenzar con Análisis
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-teal-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Suplementos Uruguay</h3>
              <p className="text-teal-100">
                Ayudando a los uruguayos a encontrar los suplementos adecuados para sus necesidades de salud.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-teal-100 hover:text-white">
                    Acerca de Nosotros
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-teal-100 hover:text-white">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-teal-100 hover:text-white">
                    Términos y Condiciones
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-teal-100 hover:text-white">
                    Política de Privacidad
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Aviso Legal</h3>
              <p className="text-teal-100 text-sm">
                La información proporcionada en esta aplicación es solo para fines educativos y no pretende ser un
                consejo médico. Consulte siempre con un profesional de la salud antes de comenzar cualquier régimen de
                suplementos.
              </p>
            </div>
          </div>
          <div className="border-t border-teal-700 mt-8 pt-4 text-center text-teal-100">
            <p>&copy; {new Date().getFullYear()} Suplementos Uruguay. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
