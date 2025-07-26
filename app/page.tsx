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
          <h1 className="text-2xl font-bold text-teal-700">Suplementos+</h1>
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

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section con diseño mejorado */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-500 via-teal-600 to-green-600 text-white mb-16 shadow-2xl">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-400 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-green-400 rounded-full opacity-20 blur-3xl"></div>
          
          <div className="relative z-10 px-8 py-16 md:py-24 text-center">
            <div className="mb-6 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Shield className="h-4 w-4" />
              <span className="text-sm font-medium">Basado en evidencia científica</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Encuentra los suplementos<br />
              <span className="text-teal-100">perfectos para ti</span>
            </h2>
            
            <p className="text-lg md:text-xl text-teal-50 max-w-3xl mx-auto mb-10 leading-relaxed">
              Obtén recomendaciones personalizadas basadas en tus objetivos de salud o análisis de sangre.
              Respaldado por más de 50,000 estudios científicos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/gender-selection" className="group">
                <Button className="relative overflow-hidden bg-white text-teal-700 hover:text-teal-800 px-8 py-6 text-lg shadow-xl transform transition-all duration-300 hover:scale-105">
                  <span className="absolute inset-0 bg-gradient-to-r from-teal-50 to-green-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative flex items-center">
                    <Target className="mr-2 h-5 w-5" />
                    Por Objetivos de Salud
                  </span>
                </Button>
              </Link>
              
              <div className="flex items-center gap-4">
                <div className="hidden sm:block h-px w-8 bg-white/30"></div>
                <span className="text-teal-100 font-medium">o</span>
                <div className="hidden sm:block h-px w-8 bg-white/30"></div>
              </div>
              
              <Link href="/analisis-sangre" className="group">
                <Button variant="outline" className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 px-8 py-6 text-lg shadow-xl transform transition-all duration-300 hover:scale-105">
                  <Flask className="mr-2 h-5 w-5" />
                  Por Análisis de Sangre
                </Button>
              </Link>
            </div>
            
            <div className="mt-12 flex justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-teal-200" />
                <span className="text-teal-100">Sin receta médica</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-teal-200" />
                <span className="text-teal-100">100% personalizado</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-teal-200" />
                <span className="text-teal-100">Envío rápido</span>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de las dos formas de obtener recomendaciones */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-teal-800 mb-8 text-center">Dos formas de obtener tus recomendaciones</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Opción 1: Por Objetivos de Salud */}
            <Card className="group relative overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-0">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-green-500"></div>
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-12 w-12 bg-gradient-to-br from-teal-100 to-green-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
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
                  <li className="flex items-center gap-2 group/item">
                    <CheckCircle className="h-5 w-5 text-green-600 group-hover/item:scale-110 transition-transform" />
                    <span className="text-gray-700 group-hover/item:text-teal-700 transition-colors">Proceso guiado paso a paso</span>
                  </li>
                  <li className="flex items-center gap-2 group/item">
                    <CheckCircle className="h-5 w-5 text-green-600 group-hover/item:scale-110 transition-transform" />
                    <span className="text-gray-700 group-hover/item:text-teal-700 transition-colors">Considera restricciones dietéticas</span>
                  </li>
                  <li className="flex items-center gap-2 group/item">
                    <CheckCircle className="h-5 w-5 text-green-600 group-hover/item:scale-110 transition-transform" />
                    <span className="text-gray-700 group-hover/item:text-teal-700 transition-colors">Múltiples objetivos de salud</span>
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
            <Card className="group relative overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-0">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500"></div>
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-12 w-12 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Flask className="h-6 w-6 text-red-600" />
                  </div>
                  <CardTitle className="text-2xl text-teal-800">Por Análisis de Sangre</CardTitle>
                </div>
                <Badge className="bg-gradient-to-r from-red-100 to-orange-100 text-red-800 w-fit border-0">
                  ¡Nuevo! Análisis Completo
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Ingresa tus resultados de análisis de sangre para detectar deficiencias y recibir 
                  recomendaciones precisas de suplementación.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 group/item">
                    <CheckCircle className="h-5 w-5 text-green-600 group-hover/item:scale-110 transition-transform" />
                    <span className="text-gray-700 group-hover/item:text-red-600 transition-colors">Vitaminas: D, B12, A, E, K</span>
                  </li>
                  <li className="flex items-center gap-2 group/item">
                    <CheckCircle className="h-5 w-5 text-green-600 group-hover/item:scale-110 transition-transform" />
                    <span className="text-gray-700 group-hover/item:text-red-600 transition-colors">Minerales: Hierro, Calcio, Magnesio</span>
                  </li>
                  <li className="flex items-center gap-2 group/item">
                    <CheckCircle className="h-5 w-5 text-green-600 group-hover/item:scale-110 transition-transform" />
                    <span className="text-gray-700 group-hover/item:text-red-600 transition-colors">Indicadores: Glucosa, Cortisol, Electrolitos</span>
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
          <Card className="group relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-white to-teal-50/30">
            <CardHeader className="text-center">
              <div className="mx-auto bg-gradient-to-br from-teal-100 to-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Dumbbell className="h-8 w-8 text-teal-700" />
              </div>
              <CardTitle className="text-teal-700 group-hover:text-teal-800 transition-colors">Ganancia Muscular</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center group-hover:text-gray-700 transition-colors">
                Suplementos diseñados para ayudarte a aumentar masa muscular y mejorar tu rendimiento físico.
              </p>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-white to-teal-50/30">
            <CardHeader className="text-center">
              <div className="mx-auto bg-gradient-to-br from-teal-100 to-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Leaf className="h-8 w-8 text-teal-700" />
              </div>
              <CardTitle className="text-teal-700 group-hover:text-teal-800 transition-colors">Pérdida de Peso</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center group-hover:text-gray-700 transition-colors">
                Encuentra suplementos que apoyan tus objetivos de pérdida de peso de manera saludable y efectiva.
              </p>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-white to-teal-50/30">
            <CardHeader className="text-center">
              <div className="mx-auto bg-gradient-to-br from-teal-100 to-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-8 w-8 text-teal-700" />
              </div>
              <CardTitle className="text-teal-700 group-hover:text-teal-800 transition-colors">Sistema Inmune</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center group-hover:text-gray-700 transition-colors">
                Suplementos para fortalecer tu sistema inmunológico y mantener tu salud en óptimas condiciones.
              </p>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-white to-teal-50/30">
            <CardHeader className="text-center">
              <div className="mx-auto bg-gradient-to-br from-teal-100 to-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Brain className="h-8 w-8 text-teal-700" />
              </div>
              <CardTitle className="text-teal-700 group-hover:text-teal-800 transition-colors">Reducción de Estrés</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center group-hover:text-gray-700 transition-colors">
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
              <h3 className="text-xl font-bold mb-4">Suplementos+</h3>
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
            <p>&copy; {new Date().getFullYear()} Suplementos+. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
