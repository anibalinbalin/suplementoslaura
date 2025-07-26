"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, Heart, Info, ShoppingCart, AlertTriangle, BookOpen } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useUser } from "@/context/user-context"
import { AffiliateDisclosure } from "@/components/affiliate-disclosure"

export default function SupplementDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [isFavorite, setIsFavorite] = useState(false)
  const { userProfile } = useUser()
  const { id } = params

  // Actualizar la función traducirNombre para incluir más traducciones
  function traducirNombre(name: string): string {
    const traducciones: Record<string, string> = {
      "Branched-Chain Amino Acids": "Aminoácidos de Cadena Ramificada",
      "Whey Protein": "Proteína de Suero",
      Protein: "Proteína",
      "Green Tea Extract": "Extracto de Té Verde",
      Creatine: "Creatina",
      "Omega-3": "Omega-3",
      "Vitamin D": "Vitamina D",
      "Fish Oil": "Aceite de Pescado",
      Magnesium: "Magnesio",
      Zinc: "Zinc",
      Ashwagandha: "Ashwagandha",
      Caffeine: "Cafeína",
      Probiotics: "Probióticos",
      "Vitamin C": "Vitamina C",
      "Vitamin B Complex": "Complejo B",
      Multivitamin: "Multivitamínico",
      Iron: "Hierro",
      Calcium: "Calcio",
      "Vitamin A": "Vitamina A",
      "Vitamin E": "Vitamina E",
      Collagen: "Colágeno",
      Melatonin: "Melatonina",
      Glutamine: "Glutamina",
      "Beta-Alanine": "Beta-Alanina",
      "Vitamin K": "Vitamina K",
      "Vitamin K2": "Vitamina K2",
      "Vitamin B12": "Vitamina B12",
      "Folic Acid": "Ácido Fólico",
      "Coenzyme Q10": "Coenzima Q10",
      CoQ10: "Coenzima Q10",
      "Alpha-Lipoic Acid": "Ácido Alfa-Lipoico",
      Glucosamine: "Glucosamina",
      Chondroitin: "Condroitina",
      MSM: "MSM (Metilsulfonilmetano)",
      Turmeric: "Cúrcuma",
      Curcumin: "Curcumina",
      Ginger: "Jengibre",
      "Garlic Extract": "Extracto de Ajo",
      Echinacea: "Equinácea",
      Elderberry: "Saúco",
      "Ginkgo Biloba": "Ginkgo Biloba",
      Ginseng: "Ginseng",
      "Rhodiola Rosea": "Rhodiola Rosea",
      "L-Theanine": "L-Teanina",
      "Valerian Root": "Valeriana",
      Glycine: "Glicina",
      "L-Glutamine": "L-Glutamina",
      HMB: "HMB (Beta-hidroxi beta-metilbutirato)",
      CLA: "CLA (Ácido Linoleico Conjugado)",
      Glucomannan: "Glucomanano",
      Inulin: "Inulina",
      "Psyllium Husk": "Cáscara de Psyllium",
      "Digestive Enzymes": "Enzimas Digestivas",
      Prebiotics: "Prebióticos",
      "Plant Sterols": "Esteroles Vegetales",
      Fiber: "Fibra",
      Biotin: "Biotina",
      Silica: "Sílice",
      "Maca Root": "Maca",
      "Bacopa Monnieri": "Bacopa Monnieri",
      "Lion's Mane": "Melena de León",
      Phosphatidylserine: "Fosfatidilserina",
    }

    return traducciones[name] || name
  }

  // Actualizar la función obtenerInfoPeriodoDescanso para ser más específica
  function obtenerInfoPeriodoDescanso(name: string): string {
    const informacionDescanso: Record<string, string> = {
      Creatine:
        "Tomar durante 8-12 semanas, seguido de un descanso de 4 semanas. Esta estrategia de ciclado no es estrictamente necesaria según la evidencia científica actual, pero puede ser preferida por algunos usuarios para evitar la adaptación del cuerpo.",
      Creatina:
        "Tomar durante 8-12 semanas, seguido de un descanso de 4 semanas. Esta estrategia de ciclado no es estrictamente necesaria según la evidencia científica actual, pero puede ser preferida por algunos usuarios para evitar la adaptación del cuerpo.",
      Caffeine:
        "Tomar durante 6-8 semanas, seguido de un descanso de 1-2 semanas para evitar desarrollar tolerancia y dependencia. Durante los periodos de descanso puede experimentarse fatiga temporal y dolores de cabeza leves.",
      Cafeína:
        "Tomar durante 6-8 semanas, seguido de un descanso de 1-2 semanas para evitar desarrollar tolerancia y dependencia. Durante los periodos de descanso puede experimentarse fatiga temporal y dolores de cabeza leves.",
      "Beta-Alanine":
        "Tomar diariamente durante 12 semanas, seguido de un descanso de 2-4 semanas. Los ciclos son opcionales pero recomendados para evaluar si se mantienen los beneficios sin suplementación continua.",
      "Beta-Alanina":
        "Tomar diariamente durante 12 semanas, seguido de un descanso de 2-4 semanas. Los ciclos son opcionales pero recomendados para evaluar si se mantienen los beneficios sin suplementación continua.",
      Ashwagandha:
        "Tomar durante 3 meses, seguido de un descanso de 2-4 semanas para evitar la posible adaptación del cuerpo y mantener la efectividad del suplemento.",
    }

    return informacionDescanso[name] || "No se requieren periodos de descanso específicos"
  }

  // Agregar información sobre interacciones con medicamentos
  function obtenerInteraccionesMedicamentos(name: string): string[] {
    const interacciones: Record<string, string[]> = {
      "Omega-3": [
        "Puede aumentar el riesgo de sangrado cuando se toma con anticoagulantes como warfarina, heparina o aspirina. Consulte con su médico antes de combinarlos.",
        "Puede tener un efecto aditivo en la reducción de la presión arterial cuando se toma con medicamentos antihipertensivos. Monitoree su presión arterial regularmente.",
      ],
      "Vitamina D": [
        "Puede afectar la absorción de medicamentos para la tiroides como levotiroxina. Tome la vitamina D al menos 4 horas antes o después de estos medicamentos.",
        "Puede reducir la eficacia de las estatinas. Consulte con su médico sobre los niveles adecuados de suplementación.",
      ],
      Magnesio: [
        "Puede reducir la absorción de antibióticos, especialmente tetraciclinas y fluoroquinolonas. Separe la toma por al menos 2-3 horas.",
        "Puede tener un efecto aditivo en la reducción de la presión arterial. Monitoree su presión arterial si toma medicamentos antihipertensivos.",
      ],
      Hierro: [
        "Puede interferir con la absorción de medicamentos para la tiroides. Separe la toma por al menos 4 horas.",
        "Los antiácidos pueden reducir la absorción de hierro. Tome el hierro al menos 2 horas antes o 4 horas después de antiácidos.",
      ],
      Creatina: [
        "El uso prolongado conjunto con antiinflamatorios no esteroideos podría aumentar el estrés renal. Manténgase bien hidratado y consulte con su médico si tiene problemas renales.",
      ],
      Cafeína: [
        "Puede aumentar temporalmente la presión arterial, contrarrestando el efecto de medicamentos antihipertensivos.",
        "Puede interactuar con ciertos antidepresivos causando aumento de la presión arterial y ritmo cardíaco. Limite el consumo de cafeína si toma estos medicamentos.",
      ],
      Calcio: [
        "Puede interferir con la absorción de antibióticos, especialmente tetraciclinas y fluoroquinolonas. Separe la toma por al menos 2-3 horas.",
        "Puede reducir la eficacia de algunos medicamentos para la presión arterial como los bloqueadores de los canales de calcio.",
      ],
      "Vitamina K": [
        "Interfiere directamente con la acción de anticoagulantes como la warfarina. Debe mantener una ingesta constante de vitamina K si toma estos medicamentos.",
      ],
    }

    return interacciones[name] || interacciones[traducirNombre(name)] || []
  }

  // Agregar información sobre condiciones médicas
  function obtenerAdvertenciasCondicionesMedicas(name: string): string[] {
    const advertencias: Record<string, string[]> = {
      Creatina: [
        "Personas con enfermedad renal deben consultar a un médico antes de tomar este suplemento.",
        "Manténgase bien hidratado durante la suplementación con creatina.",
      ],
      Cafeína: [
        "No recomendado para personas con trastornos de ansiedad, insomnio o arritmias cardíacas.",
        "Las mujeres embarazadas o en lactancia deben limitar su consumo.",
      ],
      "Omega-3": [
        "Personas con trastornos hemorrágicos deben consultar a un médico antes de tomar dosis altas.",
        "Suspender 2 semanas antes de procedimientos quirúrgicos.",
      ],
      Hierro: [
        "No tomar sin supervisión médica si se tiene hemocromatosis u otras condiciones de sobrecarga de hierro.",
        "El exceso de hierro puede ser tóxico y causar daño orgánico.",
      ],
      Calcio: [
        "Personas con antecedentes de cálculos renales de calcio deben consultar a un médico.",
        "Tomar con vitamina K2 para evitar calcificación de tejidos blandos.",
      ],
      "Vitamina D": [
        "Personas con sarcoidosis, hiperparatiroidismo o enfermedad renal deben monitorear sus niveles cuidadosamente.",
        "Dosis muy altas pueden causar hipercalcemia.",
      ],
      Ashwagandha: [
        "No recomendado para personas con enfermedades autoinmunes como lupus, artritis reumatoide o Hashimoto.",
        "Puede disminuir los niveles de azúcar en sangre, precaución en diabéticos.",
      ],
    }

    return advertencias[name] || advertencias[traducirNombre(name)] || []
  }

  // Obtener los datos del suplemento
  const supplementData =
    userProfile?.recommendations?.length > 0 && Number(id) <= userProfile?.recommendations?.length
      ? {
          id: Number(id),
          nombre: traducirNombre(userProfile.recommendations[Number(id) - 1].name),
          descripcion: userProfile.recommendations[Number(id) - 1].description,
          descripcionLarga: `${userProfile.recommendations[Number(id) - 1].description}\n\n${obtenerInfoPeriodoDescanso(userProfile.recommendations[Number(id) - 1].name) !== "No se requieren periodos de descanso específicos" ? "PERIODOS DE DESCANSO RECOMENDADOS:\n" + obtenerInfoPeriodoDescanso(userProfile.recommendations[Number(id) - 1].name) : ""}`,
          imagen: "/placeholder.svg",
          etiquetas: userProfile.recommendations[Number(id) - 1].tags,
          beneficios: userProfile.recommendations[Number(id) - 1].benefits,
          momentoOptimo:
            userProfile.recommendations[Number(id) - 1].optimalTime ||
            "Consultar con un profesional para el momento óptimo de consumo",
          consejosAbsorcion:
            userProfile.recommendations[Number(id) - 1].absorptionTips ||
            "Seguir las instrucciones del fabricante para una mejor absorción",
          dosificacionEspecificaGenero: userProfile.recommendations[Number(id) - 1].genderSpecificDosage || {
            hombre: "Consultar la dosis recomendada para hombres en el envase",
            mujer: "Consultar la dosis recomendada para mujeres en el envase",
          },
          infoNutricional: {
            tamañoPorcion: "Varía según el fabricante",
            porcionesPorEnvase: "Varía según el fabricante",
            calorias: "-",
            proteina: "-",
            carbohidratos: "-",
            grasas: "-",
            sodio: "-",
            azucar: "-",
          },
          comoUsar: [userProfile.recommendations[Number(id) - 1].dosage],
          evidenciaCientifica: userProfile.recommendations[Number(id) - 1].scientificEvidence,
          marcas: userProfile.recommendations[Number(id) - 1].productosMercadoLibre?.map(producto => ({
            nombre: producto.marca,
            precio: producto.precio || Math.floor(Math.random() * 1000) + 500,
            enlace: producto.url,
            imagen: "/placeholder.svg",
          })) || [
            {
              nombre: "Producto genérico",
              precio: 800,
              enlace: "https://www.mercadolibre.com.uy",
              imagen: "/placeholder.svg",
            },
          ],
          advertencias: userProfile.recommendations[Number(id) - 1].warnings || [
            "Consultar con un profesional de la salud antes de comenzar cualquier régimen de suplementos",
          ],
          interaccionesMedicamentos: [
            ...(userProfile.recommendations[Number(id) - 1].medicationInteractions || []),
            ...obtenerInteraccionesMedicamentos(userProfile.recommendations[Number(id) - 1].name),
          ],
          advertenciasCondicionesMedicas: obtenerAdvertenciasCondicionesMedicas(
            userProfile.recommendations[Number(id) - 1].name,
          ),
          consultarNutricionista: userProfile.recommendations[Number(id) - 1].consultNutritionist || false,
        }
      : {
          id: 1,
          nombre: "Proteína Whey Isolate Premium",
          descripcion: "Proteína de suero aislada de alta calidad para la recuperación muscular y el crecimiento.",
          descripcionLarga: `
            La Proteína Whey Isolate Premium es un suplemento de proteína de suero de leche aislada de la más alta calidad, diseñada específicamente para atletas y personas activas que buscan maximizar su recuperación muscular y promover el crecimiento de masa magra.
            
            Este producto ha sido sometido a un proceso de microfiltración avanzado que elimina grasas, lactosa y otros componentes no deseados, resultando en una de las formas más puras de proteína disponibles en el mercado, con un contenido proteico de aproximadamente 90% por porción.
            
            La Proteína Whey Isolate Premium se absorbe rápidamente en el organismo, lo que la hace ideal para el consumo post-entrenamiento cuando los músculos necesitan nutrientes de forma inmediata para iniciar el proceso de recuperación.
          `,
          imagen: "/placeholder.svg",
          etiquetas: ["Ganancia muscular", "Recuperación", "Sin lactosa"],
          beneficios: [
            "Ayuda a la recuperación muscular después del ejercicio",
            "Promueve el crecimiento y mantenimiento de la masa muscular",
            "Fácil digestión y absorción gracias a su proceso de aislamiento",
            "Bajo en carbohidratos y grasas, ideal para dietas de definición",
            "Alto contenido proteico por porción (aproximadamente 27g por scoop)",
          ],
          momentoOptimo: "Consumir preferentemente dentro de los 30 minutos posteriores al entrenamiento",
          consejosAbsorcion:
            "Para una mejor absorción, mezclar con agua o leche y consumir inmediatamente después de preparar",
          dosificacionEspecificaGenero: {
            hombre: "30g (1 scoop) por porción, 1-2 porciones diarias",
            mujer: "20-25g (2/3-3/4 scoop) por porción, 1-2 porciones diarias",
          },
          infoNutricional: {
            tamañoPorcion: "30g (1 scoop)",
            porcionesPorEnvase: 30,
            calorias: 110,
            proteina: 27,
            carbohidratos: 1,
            grasas: 0.5,
            sodio: 120,
            azucar: 0,
          },
          comoUsar: [
            "Mezclar 1 scoop (30g) con 250ml de agua o leche",
            "Consumir preferentemente dentro de los 30 minutos posteriores al entrenamiento",
            "Puede consumirse también como snack alto en proteínas entre comidas",
            "Para mejores resultados, consumir 1-2 porciones diarias",
          ],
          evidenciaCientifica: [
            "Estudios han demostrado que el consumo de proteína de suero después del ejercicio aumenta la síntesis de proteínas musculares en un 25% en comparación con otros tipos de proteínas.",
            "La proteína de suero contiene todos los aminoácidos esenciales, incluyendo altos niveles de leucina, que es crucial para la síntesis de proteínas musculares.",
            "Investigaciones publicadas en el Journal of the International Society of Sports Nutrition indican que la proteína de suero aislada puede ayudar a reducir la grasa corporal mientras preserva la masa muscular durante períodos de restricción calórica.",
          ],
          marcas: [
            {
              nombre: "NutriTech",
              precio: 1290,
              enlace: "https://www.mercadolibre.com.uy",
              imagen: "/placeholder.svg",
            },
            {
              nombre: "MusclePro",
              precio: 1350,
              enlace: "https://www.mercadolibre.com.uy",
              imagen: "/placeholder.svg",
            },
            {
              nombre: "PureProtein",
              precio: 1320,
              enlace: "https://www.mercadolibre.com.uy",
              imagen: "/placeholder.svg",
            },
          ],
          advertencias: [
            "No recomendado para personas con intolerancia a la lactosa",
            "Consultar con un profesional de la salud antes de comenzar cualquier régimen de suplementos",
          ],
          interaccionesMedicamentos: [],
          advertenciasCondicionesMedicas: [],
          consultarNutricionista: false,
        }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-teal-50 flex flex-col">
      <header className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center">
          <Link href="/recommendations" className="inline-flex items-center text-teal-700 hover:text-teal-800">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a recomendaciones
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <div className="md:flex gap-8">
                <div className="md:w-1/3 mb-6 md:mb-0">
                  <div className="bg-white p-4 rounded-lg border flex items-center justify-center">
                    <Image
                      src={supplementData.imagen || "/placeholder.svg"}
                      alt={supplementData.nombre}
                      width={300}
                      height={300}
                      className="object-contain"
                    />
                  </div>
                  <div className="mt-4 space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-700 mb-2">Disponible en:</h3>
                      <div className="space-y-3">
                        {supplementData.marcas.map((marca, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-gray-50 rounded-md flex items-center justify-center">
                                <Image
                                  src={marca.imagen || "/placeholder.svg"}
                                  alt={marca.nombre}
                                  width={24}
                                  height={24}
                                  className="object-contain"
                                />
                              </div>
                              <span className="font-medium">{marca.nombre}</span>
                              <span className="text-gray-600">$ {marca.precio}</span>
                            </div>
                            <Link href={marca.enlace} target="_blank" rel="noopener noreferrer">
                              <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                                <ShoppingCart className="h-3 w-3 mr-1" />
                                Comprar
                              </Button>
                            </Link>
                          </div>
                        ))}
                      </div>
                      <AffiliateDisclosure variant="inline" className="mt-4" />
                    </div>
                  </div>
                </div>

                <div className="md:w-2/3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-2xl font-bold text-teal-800 mb-2">{supplementData.nombre}</h1>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={toggleFavorite}
                      className={`${isFavorite ? "text-red-500 border-red-200" : "text-gray-400"}`}
                    >
                      <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500" : ""}`} />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {supplementData.etiquetas.map((etiqueta, index) => (
                      <Badge key={index} variant="secondary" className="bg-teal-50 text-teal-700 hover:bg-teal-100">
                        {etiqueta}
                      </Badge>
                    ))}
                    {obtenerInfoPeriodoDescanso(supplementData.nombre) &&
                      obtenerInfoPeriodoDescanso(supplementData.nombre) !==
                        "No se requieren periodos de descanso específicos" && (
                        <Badge variant="outline" className="border-blue-400 text-blue-600 bg-blue-50">
                          Requiere periodos de descanso
                        </Badge>
                      )}
                  </div>

                  <p className="text-gray-600 mb-6">{supplementData.descripcion}</p>

                  {supplementData.consultarNutricionista && (
                    <Alert className="mb-6 bg-amber-50 border-amber-200">
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                      <AlertTitle className="text-amber-800">Consulta con un nutricionista</AlertTitle>
                      <AlertDescription className="text-amber-700">
                        Este suplemento puede tener interacciones con medicamentos o consideraciones especiales para tu
                        perfil. Recomendamos consultar con un nutricionista o profesional de la salud antes de comenzar
                        a tomarlo.
                      </AlertDescription>
                    </Alert>
                  )}

                  {supplementData.interaccionesMedicamentos && supplementData.interaccionesMedicamentos.length > 0 && (
                    <Alert variant="destructive" className="mb-6">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Posibles interacciones con medicamentos</AlertTitle>
                      <AlertDescription>
                        <ul className="list-disc list-inside mt-2">
                          {supplementData.interaccionesMedicamentos.map((interaccion, index) => (
                            <li key={index}>{interaccion}</li>
                          ))}
                        </ul>
                      </AlertDescription>
                    </Alert>
                  )}

                  {supplementData.advertenciasCondicionesMedicas &&
                    supplementData.advertenciasCondicionesMedicas.length > 0 && (
                      <Alert className="mb-6 bg-amber-50 border-amber-200">
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                        <AlertTitle className="text-amber-800">Advertencias para condiciones médicas</AlertTitle>
                        <AlertDescription className="text-amber-700">
                          <ul className="list-disc list-inside mt-2">
                            {supplementData.advertenciasCondicionesMedicas.map((advertencia, index) => (
                              <li key={index}>{advertencia}</li>
                            ))}
                          </ul>
                        </AlertDescription>
                      </Alert>
                    )}

                  <Tabs defaultValue="details" className="mt-6">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="details">Detalles</TabsTrigger>
                      <TabsTrigger value="usage">Uso</TabsTrigger>
                      <TabsTrigger value="nutrition">Nutrición</TabsTrigger>
                      <TabsTrigger value="evidence">Evidencia</TabsTrigger>
                    </TabsList>

                    <TabsContent value="details" className="pt-4">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium text-gray-700 mb-2">Descripción</h3>
                          <p className="text-gray-600 whitespace-pre-line">{supplementData.descripcionLarga}</p>
                        </div>

                        <Separator />

                        <div>
                          <h3 className="font-medium text-gray-700 mb-2">Beneficios</h3>
                          <ul className="list-disc list-inside text-gray-600 space-y-1">
                            {supplementData.beneficios.map((beneficio, index) => (
                              <li key={index}>{beneficio}</li>
                            ))}
                          </ul>
                        </div>

                        {supplementData.advertencias && supplementData.advertencias.length > 0 && (
                          <>
                            <Separator />
                            <div>
                              <h3 className="font-medium text-gray-700 mb-2">Advertencias</h3>
                              <ul className="list-disc list-inside text-gray-600 space-y-1">
                                {supplementData.advertencias.map((advertencia, index) => (
                                  <li key={index} className="text-amber-700">
                                    {advertencia}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </>
                        )}
                      </div>
                      {traducirNombre(supplementData.nombre) === "Proteína de Suero" && (
                        <>
                          <Separator />
                          <div>
                            <h3 className="font-medium text-gray-700 mb-2">
                              Información sobre Proteína de Suero para Ganancia Muscular
                            </h3>
                            <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
                              <p className="text-gray-700 mb-2">
                                <span className="font-semibold">Según la evidencia científica:</span> La proteína de suero es una de
                                las fuentes de proteína más efectivas para la síntesis de proteínas musculares. Contiene
                                todos los aminoácidos esenciales en proporciones óptimas, incluyendo altos niveles de
                                leucina, el aminoácido clave para estimular la síntesis proteica.
                              </p>
                              <p className="text-gray-700 mb-2">
                                Se digiere y absorbe rápidamente, lo que la hace ideal para el consumo
                                post-entrenamiento. Estudios han demostrado que el consumo de proteína de suero después
                                del ejercicio aumenta la síntesis de proteínas musculares en comparación con otros tipos
                                de proteínas.
                              </p>
                              <p className="text-gray-700">
                                Dosificación recomendada basada en estudios científicos: 20-30g por porción, 1-2 veces al día, con
                                una ingesta total de proteínas de 1.6-2.2g por kg de peso corporal para personas que
                                buscan ganancia muscular.
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                    </TabsContent>

                    <TabsContent value="usage" className="pt-4">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium text-gray-700 mb-2">Modo de uso</h3>
                          <ol className="list-decimal list-inside text-gray-600 space-y-1">
                            {supplementData.comoUsar.map((paso, index) => (
                              <li key={index}>{paso}</li>
                            ))}
                          </ol>
                        </div>

                        <Separator />

                        <div>
                          <h3 className="font-medium text-gray-700 mb-2">Momento óptimo</h3>
                          <div className="flex items-start gap-2 text-gray-600">
                            <Clock className="h-5 w-5 text-teal-600 mt-0.5 shrink-0" />
                            <p>{supplementData.momentoOptimo}</p>
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <h3 className="font-medium text-gray-700 mb-2">Consejos para mejor absorción</h3>
                          <div className="flex items-start gap-2 text-gray-600">
                            <Info className="h-5 w-5 text-teal-600 mt-0.5 shrink-0" />
                            <p>{supplementData.consejosAbsorcion}</p>
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <h3 className="font-medium text-gray-700 mb-2">Dosificación por género</h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-blue-50 p-3 rounded-md">
                              <h4 className="font-medium text-blue-700 mb-1">Hombres</h4>
                              <p className="text-gray-600">{
                                'hombre' in supplementData.dosificacionEspecificaGenero 
                                  ? supplementData.dosificacionEspecificaGenero.hombre 
                                  : supplementData.dosificacionEspecificaGenero.male
                              }</p>
                            </div>
                            <div className="bg-pink-50 p-3 rounded-md">
                              <h4 className="font-medium text-pink-700 mb-1">Mujeres</h4>
                              <p className="text-gray-600">{
                                'mujer' in supplementData.dosificacionEspecificaGenero 
                                  ? supplementData.dosificacionEspecificaGenero.mujer 
                                  : supplementData.dosificacionEspecificaGenero.female
                              }</p>
                            </div>
                          </div>
                        </div>

                        {obtenerInfoPeriodoDescanso(supplementData.nombre) &&
                          obtenerInfoPeriodoDescanso(supplementData.nombre) !==
                            "No se requieren periodos de descanso específicos" && (
                            <>
                              <Separator />
                              <div>
                                <h3 className="font-medium text-gray-700 mb-2">Periodos de descanso</h3>
                                <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
                                  <div className="flex items-start gap-2 text-gray-600">
                                    <Info className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
                                    <p>{obtenerInfoPeriodoDescanso(supplementData.nombre)}</p>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                      </div>
                    </TabsContent>

                    <TabsContent value="nutrition" className="pt-4">
                      <h3 className="font-medium text-gray-700 mb-3">Información Nutricional</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Tamaño de la porción: {supplementData.infoNutricional.tamañoPorcion}
                      </p>
                      <p className="text-sm text-gray-600 mb-4">
                        Porciones por envase: {supplementData.infoNutricional.porcionesPorEnvase}
                      </p>

                      <div className="border rounded-md overflow-hidden">
                        <table className="w-full text-sm">
                          <tbody>
                            <tr className="border-b">
                              <td className="px-4 py-2 font-medium">Calorías</td>
                              <td className="px-4 py-2 text-right">{supplementData.infoNutricional.calorias}</td>
                            </tr>
                            <tr className="border-b bg-gray-50">
                              <td className="px-4 py-2 font-medium">Proteínas</td>
                              <td className="px-4 py-2 text-right">
                                {typeof supplementData.infoNutricional.proteina === "number"
                                  ? `${supplementData.infoNutricional.proteina}g`
                                  : supplementData.infoNutricional.proteina}
                              </td>
                            </tr>
                            <tr className="border-b">
                              <td className="px-4 py-2 font-medium">Carbohidratos</td>
                              <td className="px-4 py-2 text-right">
                                {typeof supplementData.infoNutricional.carbohidratos === "number"
                                  ? `${supplementData.infoNutricional.carbohidratos}g`
                                  : supplementData.infoNutricional.carbohidratos}
                              </td>
                            </tr>
                            <tr className="border-b bg-gray-50">
                              <td className="px-4 py-2 font-medium">Grasas</td>
                              <td className="px-4 py-2 text-right">
                                {typeof supplementData.infoNutricional.grasas === "number"
                                  ? `${supplementData.infoNutricional.grasas}g`
                                  : supplementData.infoNutricional.grasas}
                              </td>
                            </tr>
                            <tr className="border-b">
                              <td className="px-4 py-2 font-medium">Sodio</td>
                              <td className="px-4 py-2 text-right">
                                {typeof supplementData.infoNutricional.sodio === "number"
                                  ? `${supplementData.infoNutricional.sodio}mg`
                                  : supplementData.infoNutricional.sodio}
                              </td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="px-4 py-2 font-medium">Azúcares</td>
                              <td className="px-4 py-2 text-right">
                                {typeof supplementData.infoNutricional.azucar === "number"
                                  ? `${supplementData.infoNutricional.azucar}g`
                                  : supplementData.infoNutricional.azucar}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <p className="text-sm text-gray-500 mt-4 italic">
                        Nota: La información nutricional puede variar según el fabricante. Consulta siempre la etiqueta
                        del producto.
                      </p>
                    </TabsContent>

                    <TabsContent value="evidence" className="pt-4">
                      <div className="flex items-center gap-2 mb-4">
                        <BookOpen className="h-5 w-5 text-teal-600" />
                        <h3 className="font-medium text-gray-700">Evidencia Científica</h3>
                      </div>

                      <div className="space-y-3">
                        {supplementData.evidenciaCientifica.map((evidencia, index) => (
                          <div key={index} className="bg-gray-50 p-3 rounded-md text-gray-600 border border-gray-100">
                            {evidencia}
                          </div>
                        ))}
                      </div>


                      <Alert className="mt-4 bg-blue-50 border-blue-200">
                        <Info className="h-4 w-4 text-blue-600" />
                        <AlertTitle className="text-blue-800">Importante</AlertTitle>
                        <AlertDescription className="text-blue-700">
                          La evidencia científica presentada está actualizada según las últimas investigaciones
                          disponibles. La investigación en nutrición y suplementos evoluciona constantemente, por lo que
                          recomendamos consultar con profesionales de la salud para obtener la información más reciente.
                        </AlertDescription>
                      </Alert>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="bg-teal-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">
            La información proporcionada es solo para fines educativos y no pretende ser un consejo médico.
          </p>
          <p className="text-sm text-teal-100 mt-2">
            Suplementos+ &copy; {new Date().getFullYear()} - Todos los derechos reservados
          </p>
        </div>
      </footer>
    </div>
  )
}
