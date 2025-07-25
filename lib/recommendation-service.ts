import {
  encontrarSuplementosPorObjetivoSalud,
  encontrarSuplementoPorNombre,
  verificarInteraccionesMedicamentos,
  verificarSuplementosApropiadosEdad,
  obtenerInfoMomentoOptimo,
  obtenerInfoAbsorcion,
  type DatosSuplemento,
} from "./examine-data-es"
import { processProductsWithAffiliateLinks } from "./affiliate-service"

import type { BloodTestResult } from "./blood-markers"
import {
  getVitaminDRecommendation,
  getB12Recommendation,
  getGlucoseRecommendation,
  getInsulinRecommendation,
  getCortisolRecommendation,
  getSodiumRecommendation,
  getPotassiumRecommendation,
  getChlorideRecommendation,
  getCalciumRecommendation,
  getMagnesiumRecommendation,
  getHematocritRecommendation,
  getIronRecommendation,
  getFerritinRecommendation,
} from "./blood-markers"

export interface SolicitudRecomendacion {
  genero: "hombre" | "mujer"
  edad: number | null
  objetivosSalud: string[]
  restriccionesDietarias: string[]
  alergias?: string
  medicamentos?: string
  bloodTestResults?: BloodTestResult[]
}

export interface RecomendacionSuplemento {
  nombre: string
  descripcion: string
  beneficios: string[]
  dosificacion: string
  momentoOptimo: string
  consejosAbsorcion: string
  dosificacionEspecificaGenero: {
    hombre: string
    mujer: string
  }
  evidenciaCientifica: string[]
  adecuadoPara: string[]
  etiquetas: string[]
  advertencias?: string[]
  interaccionesMedicamentos?: string[]
  consultarNutricionista?: boolean
  productosMercadoLibre?: Array<{
    marca: string
    url: string
    precio?: number
    disponible?: boolean
  }>
}

export interface CombinacionSuplementos {
  id: number
  nombre: string
  descripcion: string
  suplementos: RecomendacionSuplemento[]
  precio: number
  descuento: number
  sinergias: string[]
  instrucciones?: string
}

/**
 * Genera recomendaciones de suplementos basadas en las preferencias del usuario
 * @param solicitud La solicitud de recomendación del usuario
 * @returns Una promesa que se resuelve en un array de recomendaciones de suplementos
 */
export async function generarRecomendaciones(solicitud: SolicitudRecomendacion): Promise<RecomendacionSuplemento[]> {
  try {
    console.log("Generando recomendaciones basadas en datos de Examine.com")
    console.log("Solicitud:", JSON.stringify(solicitud, null, 2))

    // Determinar si el usuario es vegano/vegetariano desde el inicio
    const esVegano = solicitud.restriccionesDietarias.includes("vegano")
    const esVegetariano = solicitud.restriccionesDietarias.includes("vegetariano")
    
    console.log(`Usuario es vegano: ${esVegano}, vegetariano: ${esVegetariano}`)

    let suplementosRelevantes: DatosSuplemento[] = []
    let suplementosDeAnalisisSangre: string[] = []

    // PRIORIDAD 1: Analizar resultados de sangre si están disponibles
    if (solicitud.bloodTestResults && solicitud.bloodTestResults.length > 0) {
      console.log("Analizando resultados de análisis de sangre...")
      console.log("Datos recibidos:", JSON.stringify(solicitud.bloodTestResults, null, 2))
      
      solicitud.bloodTestResults.forEach(result => {
        let recommendation = null
        
        // Obtener recomendación según el marcador
        switch (result.markerId) {
          case 'vitamin-d':
            recommendation = getVitaminDRecommendation(result.value)
            break
          case 'vitamin-b12':
            recommendation = getB12Recommendation(result.value)
            break
          case 'calcium':
            recommendation = getCalciumRecommendation(result.value)
            break
          case 'magnesium':
            recommendation = getMagnesiumRecommendation(result.value)
            break
          case 'iron':
            recommendation = getIronRecommendation(result.value)
            break
          // Añadir más casos según sea necesario
        }

        // Si hay deficiencia o insuficiencia, añadir suplementos recomendados
        if (recommendation && recommendation.supplementRecommendations) {
          console.log(`Marcador ${result.markerId}: ${recommendation.status} - Recomendaciones:`)
          recommendation.supplementRecommendations.forEach(supp => {
            console.log(`  - ${supp.name} (${supp.dosage})`)
            if (!suplementosDeAnalisisSangre.includes(supp.name)) {
              suplementosDeAnalisisSangre.push(supp.name)
            }
          })
        }
      })
    }

    // PRIORIDAD 2: Encontrar suplementos relevantes basados en objetivos de salud
    let objetivosRelevantes = solicitud.objetivosSalud.filter((objetivo) => objetivo !== "halal")
    console.log("Objetivos de salud recibidos:", solicitud.objetivosSalud)
    console.log("Objetivos relevantes filtrados:", objetivosRelevantes)
    
    // Añadir automáticamente menopausia para mujeres en edad apropiada
    if (solicitud.genero === "mujer" && solicitud.edad && solicitud.edad >= 45 && solicitud.edad <= 60) {
      if (!objetivosRelevantes.includes("menopausia")) {
        console.log("Añadiendo objetivo de menopausia automáticamente para mujer de", solicitud.edad, "años")
        objetivosRelevantes.push("menopausia")
      }
    }

    // Recopilar suplementos que coincidan con cada objetivo de salud
    for (const objetivo of objetivosRelevantes) {
      let suplementos = encontrarSuplementosPorObjetivoSalud(objetivo)
      
      // Si el usuario es vegano/vegetariano, filtrar versiones no veganas cuando exista alternativa
      if (solicitud.restriccionesDietarias.includes("vegano") || solicitud.restriccionesDietarias.includes("vegetariano")) {
        // Filtrar suplementos que tienen alternativa vegana
        suplementos = suplementos.filter(suplemento => {
          // Si es Omega-3 regular y existe versión vegana en la lista, excluirlo
          if (suplemento.nombre === "Omega-3 (EPA y DHA)" && 
              suplementos.some(s => s.nombre === "Omega-3 Vegano (ALA)")) {
            console.log("Filtrando Omega-3 de pescado porque existe versión vegana")
            return false
          }
          // Si es Colágeno regular y existe versión vegana, excluirlo
          if (suplemento.nombre === "Colágeno" && 
              suplementos.some(s => s.nombre === "Colágeno Vegano")) {
            console.log("Filtrando Colágeno animal porque existe versión vegana")
            return false
          }
          return true
        })
      }
      
      suplementosRelevantes = [...suplementosRelevantes, ...suplementos]
    }
    
    // Agregar proteína apropiada según restricciones dietéticas para ganancia muscular
    if (objetivosRelevantes.includes("ganancia-muscular")) {
      const esVegano = solicitud.restriccionesDietarias.includes("vegano")
      const esVegetariano = solicitud.restriccionesDietarias.includes("vegetariano")
      const sinLactosa = solicitud.restriccionesDietarias.includes("sin-lactosa")
      
      if (esVegano || esVegetariano) {
        // Agregar proteína vegetal - puede ser guisante o soja según disponibilidad
        const proteinaGuisante = encontrarSuplementoPorNombre("Proteína de Guisante")
        const proteinaSoja = encontrarSuplementoPorNombre("Proteína de Soja")
        
        // Priorizar guisante por su perfil de aminoácidos, pero ofrecer soja como alternativa
        if (proteinaGuisante) {
          // Modificar el nombre para indicar que puede ser guisante o soja
          const proteinaVegetal = {
            ...proteinaGuisante,
            nombre: "Proteína Vegetal (Guisante o Soja)",
            descripcion: "Proteína vegetal de alta calidad (guisante o soja) para la recuperación muscular y el crecimiento. Ambas son excelentes alternativas veganas con perfiles completos de aminoácidos."
          }
          suplementosRelevantes.push(proteinaVegetal)
          console.log("Agregando proteína vegetal (guisante/soja) para usuario vegano/vegetariano")
        } else if (proteinaSoja) {
          const proteinaVegetal = {
            ...proteinaSoja,
            nombre: "Proteína Vegetal (Guisante o Soja)",
            descripcion: "Proteína vegetal de alta calidad (guisante o soja) para la recuperación muscular y el crecimiento. Ambas son excelentes alternativas veganas con perfiles completos de aminoácidos."
          }
          suplementosRelevantes.push(proteinaVegetal)
          console.log("Agregando proteína vegetal (guisante/soja) para usuario vegano/vegetariano")
        }
      } else if (!sinLactosa && !esVegano && !esVegetariano) {
        // Solo agregar proteína de suero si NO hay restricción de lactosa Y NO es vegano/vegetariano
        const proteinaSuero = encontrarSuplementoPorNombre("Proteína de Suero")
        if (proteinaSuero) {
          suplementosRelevantes.push(proteinaSuero)
          console.log("Agregando proteína de suero para usuario sin restricciones lácteas ni veganas")
        }
      } else {
        // Usuario con intolerancia a lactosa pero no vegano
        const proteinaGuisante = encontrarSuplementoPorNombre("Proteína de Guisante")
        const proteinaSoja = encontrarSuplementoPorNombre("Proteína de Soja")
        
        if (proteinaGuisante) {
          const proteinaVegetal = {
            ...proteinaGuisante,
            nombre: "Proteína Vegetal (Guisante o Soja)",
            descripcion: "Proteína vegetal de alta calidad (guisante o soja) ideal para personas con intolerancia a la lactosa. Ambas opciones proporcionan aminoácidos esenciales sin lácteos."
          }
          suplementosRelevantes.push(proteinaVegetal)
          console.log("Agregando proteína vegetal para usuario intolerante a lactosa")
        } else if (proteinaSoja) {
          const proteinaVegetal = {
            ...proteinaSoja,
            nombre: "Proteína Vegetal (Guisante o Soja)",
            descripcion: "Proteína vegetal de alta calidad (guisante o soja) ideal para personas con intolerancia a la lactosa. Ambas opciones proporcionan aminoácidos esenciales sin lácteos."
          }
          suplementosRelevantes.push(proteinaVegetal)
          console.log("Agregando proteína vegetal para usuario intolerante a lactosa")
        }
      }
    }

    // Eliminar duplicados
    let suplementosUnicos = Array.from(new Set(suplementosRelevantes.map((s) => s.nombre))).map((nombre) =>
      suplementosRelevantes.find((s) => s.nombre === nombre),
    )
    
    // FILTRAR VERSIONES VEGANAS SI EL USUARIO NO ES VEGANO/VEGETARIANO
    if (!solicitud.restriccionesDietarias.includes("vegano") && !solicitud.restriccionesDietarias.includes("vegetariano")) {
      // Lista de suplementos veganos que solo deben aparecer para usuarios veganos/vegetarianos
      const suplementosExclusivamenteVeganos = [
        "Omega-3 Vegano (ALA)", 
        "BCAA Vegano", 
        "Colágeno Vegano",
        "Proteína de Soja", // Solo mantener si hay objetivo muscular específico
        "Proteína de Guisante" // Solo mantener si hay objetivo muscular específico
      ]
      
      // Permitir proteínas vegetales solo si hay objetivo de ganancia muscular
      const tieneObjetivoMuscular = objetivosRelevantes.includes("ganancia-muscular")
      
      suplementosUnicos = suplementosUnicos.filter(s => {
        if (!s) return false
        
        // Si es proteína vegetal y hay objetivo muscular, permitirla
        if ((s.nombre === "Proteína de Soja" || s.nombre === "Proteína de Guisante") && tieneObjetivoMuscular) {
          return true
        }
        
        // En caso contrario, filtrar todos los suplementos exclusivamente veganos
        return !suplementosExclusivamenteVeganos.includes(s.nombre)
      })
      
      console.log("Filtrados suplementos exclusivamente veganos para usuario no vegano/vegetariano")
    }
    
    // IMPORTANTE: Reemplazar suplementos no veganos ANTES del filtrado
    // Si el usuario es vegano/vegetariano, reemplazar proteínas animales con vegetales
    if (solicitud.restriccionesDietarias.includes("vegano") || solicitud.restriccionesDietarias.includes("vegetariano")) {
      // Reemplazar colágeno con colágeno vegano
      const indiceColageno = suplementosUnicos.findIndex(s => s?.nombre === "Colágeno")
      if (indiceColageno !== -1) {
        const colagenVegano = encontrarSuplementoPorNombre("Colágeno Vegano")
        if (colagenVegano) {
          suplementosUnicos[indiceColageno] = colagenVegano
        }
      }
      
      // Reemplazar proteína de suero con proteína vegetal para usuarios veganos/vegetarianos
      const indiceProteinaSuero = suplementosUnicos.findIndex(s => 
        s?.nombre === "Proteína de Suero" || s?.nombre.toLowerCase().includes("whey")
      )
      if (indiceProteinaSuero !== -1) {
        console.log("Proteína de Suero detectada para usuario vegano/vegetariano - será reemplazada")
        // Preferir proteína de guisante por su alto contenido de BCAA
        const proteinaGuisante = encontrarSuplementoPorNombre("Proteína de Guisante")
        const proteinaSoja = encontrarSuplementoPorNombre("Proteína de Soja")
        
        if (proteinaGuisante) {
          suplementosUnicos[indiceProteinaSuero] = proteinaGuisante
          console.log("Reemplazando proteína de suero con proteína de guisante para usuario vegano/vegetariano")
        } else if (proteinaSoja) {
          suplementosUnicos[indiceProteinaSuero] = proteinaSoja
          console.log("Reemplazando proteína de suero con proteína de soja para usuario vegano/vegetariano")
        }
      }
      
      // Reemplazar Omega-3 regular con Omega-3 vegano
      const indiceOmega3 = suplementosUnicos.findIndex(s => 
        s?.nombre === "Omega-3 (EPA y DHA)" || s?.nombre.toLowerCase().includes("aceite de pescado")
      )
      if (indiceOmega3 !== -1) {
        console.log("Omega-3 de pescado detectado para usuario vegano/vegetariano - será reemplazado")
        const omega3Vegano = encontrarSuplementoPorNombre("Omega-3 Vegano (ALA)")
        if (omega3Vegano) {
          suplementosUnicos[indiceOmega3] = omega3Vegano
          console.log("Reemplazando omega-3 de pescado con omega-3 vegano")
        }
      }
      
      // Reemplazar BCAA regular con BCAA vegano
      const indiceBCAA = suplementosUnicos.findIndex(s => 
        s?.nombre === "Aminoácidos de Cadena Ramificada" || s?.nombre.toLowerCase().includes("bcaa")
      )
      if (indiceBCAA !== -1) {
        console.log("BCAA tradicional detectado para usuario vegano/vegetariano - será reemplazado")
        const bcaaVegano = encontrarSuplementoPorNombre("BCAA Vegano")
        if (bcaaVegano) {
          suplementosUnicos[indiceBCAA] = bcaaVegano
          console.log("Reemplazando BCAA tradicional con BCAA vegano")
        }
      }
    }

    // Filtrar suplementos que no cumplen con restricciones dietéticas
    // NOTA: Los reemplazos veganos ya se hicieron arriba
    console.log("Suplementos antes de filtrar por restricciones (con reemplazos veganos ya hechos):", suplementosUnicos.map(s => s?.nombre))
    console.log("Restricciones dietéticas del usuario:", solicitud.restriccionesDietarias)
    
    let suplementosFiltrados = filtrarPorRestriccionesDietarias(
      suplementosUnicos as DatosSuplemento[],
      solicitud.restriccionesDietarias,
    )
    
    console.log("Suplementos después de filtrar por restricciones:", suplementosFiltrados.map(s => s.nombre))

    // PRIORIDAD 3: Combinar suplementos de análisis de sangre con los de objetivos de salud
    let suplementosFinales: DatosSuplemento[] = []
    
    // Primero añadir los suplementos detectados por análisis de sangre
    if (suplementosDeAnalisisSangre.length > 0) {
      console.log("Priorizando suplementos basados en deficiencias detectadas en análisis de sangre")
      console.log("Suplementos a buscar:", suplementosDeAnalisisSangre)
      
      // Buscar estos suplementos en nuestra base de datos
      for (const nombreSuplemento of suplementosDeAnalisisSangre) {
        console.log(`Buscando "${nombreSuplemento}" en base de datos...`)
        const suplemento = encontrarSuplementoPorNombre(nombreSuplemento)
        if (suplemento) {
          console.log(`  ✓ Encontrado: ${suplemento.nombre}`)
          if (!suplementosFinales.some(s => s.nombre === suplemento.nombre)) {
            // Verificar restricciones dietéticas
            const cumpleRestricciones = filtrarPorRestriccionesDietarias([suplemento], solicitud.restriccionesDietarias)
            if (cumpleRestricciones.length > 0) {
              suplementosFinales.push(suplemento)
              console.log(`  ✓ Añadido a recomendaciones finales`)
            } else {
              console.log(`  ✗ No cumple restricciones dietéticas`)
            }
          } else {
            console.log(`  - Ya estaba en la lista`)
          }
        } else {
          console.log(`  ✗ NO ENCONTRADO en base de datos - verificar nombre exacto`)
        }
      }
    }

    // Luego añadir los suplementos de objetivos de salud que no están duplicados
    for (const suplemento of suplementosFiltrados) {
      if (!suplementosFinales.some(s => s.nombre === suplemento.nombre)) {
        suplementosFinales.push(suplemento)
      }
    }
    
    // Eliminar esta lógica - la proteína ya se maneja arriba basada en restricciones dietéticas
    // No agregar proteína de suero después del filtrado, ya que esto evita el filtrado vegano

    // Si no hay suficientes suplementos, añadir algunos generales
    if (suplementosFinales.length < 2) {
      console.log("No se encontraron suficientes suplementos específicos, agregando suplementos generales de Examine")

      // Adaptar suplementos generales según restricciones dietéticas
      const esVegano = solicitud.restriccionesDietarias.includes("vegano")
      const esVegetariano = solicitud.restriccionesDietarias.includes("vegetariano")
      
      const suplementosGenerales = esVegano || esVegetariano 
        ? ["Vitamina D", "Magnesio", "Omega-3 Vegano (ALA)", "Zinc"]
        : ["Vitamina D", "Magnesio", "Omega-3 (EPA y DHA)", "Zinc"]
        
      for (const nombre of suplementosGenerales) {
        const suplemento = encontrarSuplementoPorNombre(nombre)
        if (suplemento && !suplementosFinales.some(s => s.nombre === suplemento.nombre)) {
          const cumpleRestricciones = filtrarPorRestriccionesDietarias([suplemento], solicitud.restriccionesDietarias)
          if (cumpleRestricciones.length > 0) {
            suplementosFinales.push(suplemento)
          }
        }
      }
    }

    // LÓGICA MEJORADA PARA BCAA - Solo recomendar en casos específicos
    // Según evidencia científica actual, los BCAA solo son útiles cuando:
    // 1. El usuario tiene intolerancia a la lactosa (no puede usar proteína de suero)
    // 2. Como complemento a proteínas vegetales (soja o guisante)
    
    const tieneBCAA = suplementosFinales.some(s => 
      s.nombre.toLowerCase().includes("aminoácidos de cadena ramificada") ||
      s.nombre.toLowerCase().includes("bcaa")
    )
    
    const tieneProteinaSuero = suplementosFinales.some(s => 
      s.nombre.toLowerCase().includes("proteína de suero") || 
      s.nombre.toLowerCase().includes("whey")
    )
    
    const tieneProteinaVegetal = suplementosFinales.some(s => 
      s.nombre.toLowerCase().includes("proteína de soja") || 
      s.nombre.toLowerCase().includes("proteína de guisante") ||
      s.nombre.toLowerCase().includes("proteína vegetal")
    )
    
    const esIntoleranciaLactosa = solicitud.restriccionesDietarias.includes("sin-lactosa")
    const tieneObjetivoMuscular = objetivosRelevantes.includes("ganancia-muscular")
    
    // Eliminar BCAA por defecto
    if (tieneBCAA) {
      console.log("Evaluando si los BCAA son necesarios...")
      
      // Caso 1: Si hay proteína de suero, eliminar BCAA (redundante)
      if (tieneProteinaSuero) {
        console.log("Proteína de Suero detectada, eliminando BCAA (redundante)")
        suplementosFinales = suplementosFinales.filter(s => 
          !s.nombre.toLowerCase().includes("aminoácidos de cadena ramificada") &&
          !s.nombre.toLowerCase().includes("bcaa")
        )
      }
      // Caso 2: Si NO hay proteína vegetal Y NO hay intolerancia a lactosa con objetivo muscular, eliminar BCAA
      else if (!tieneProteinaVegetal && !(esIntoleranciaLactosa && tieneObjetivoMuscular)) {
        console.log("BCAA no necesarios - no hay proteína vegetal ni intolerancia a lactosa con objetivo muscular")
        suplementosFinales = suplementosFinales.filter(s => 
          !s.nombre.toLowerCase().includes("aminoácidos de cadena ramificada") &&
          !s.nombre.toLowerCase().includes("bcaa")
        )
      }
      // Caso 3: Mantener BCAA si hay proteína vegetal
      else if (tieneProteinaVegetal) {
        console.log("Manteniendo BCAA como complemento a proteína vegetal")
      }
      // Caso 4: Mantener BCAA si hay intolerancia a lactosa con objetivo muscular
      else if (esIntoleranciaLactosa && tieneObjetivoMuscular) {
        console.log("Manteniendo BCAA para intolerancia a lactosa con objetivo de ganancia muscular")
      }
    }
    
    // Si el usuario tiene intolerancia a lactosa y objetivo muscular, pero no se añadieron BCAA, considerarlos
    const esVeganoOVegetariano = solicitud.restriccionesDietarias.includes("vegano") || solicitud.restriccionesDietarias.includes("vegetariano")
    if (esIntoleranciaLactosa && tieneObjetivoMuscular && !tieneBCAA && !tieneProteinaSuero) {
      console.log("Añadiendo BCAA para usuario con intolerancia a lactosa y objetivo de ganancia muscular")
      // Elegir BCAA vegano si el usuario es vegano/vegetariano
      const nombreBCAA = esVeganoOVegetariano ? "BCAA Vegano" : "Aminoácidos de Cadena Ramificada"
      const bcaaSuplemento = encontrarSuplementoPorNombre(nombreBCAA)
      if (bcaaSuplemento && suplementosFinales.length < 8) {
        suplementosFinales.push(bcaaSuplemento)
      }
    }

    // VALIDACIÓN FINAL: Asegurar que no haya suplementos no veganos si el usuario es vegano
    if (esVegano || esVegetariano) {
      const suplementosNoVeganos = ["Proteína de Suero", "Omega-3 (EPA y DHA)", "Colágeno", "Aceite de Pescado", "Glucosamina", "Condroitina", "Aminoácidos de Cadena Ramificada"]
      const suplementosNoVegetarianos = ["Omega-3 (EPA y DHA)", "Colágeno", "Aceite de Pescado", "Glucosamina", "Condroitina", "Aminoácidos de Cadena Ramificada"]
      
      const suplementosRestringidos = esVegano ? suplementosNoVeganos : suplementosNoVegetarianos
      
      // Filtrar cualquier suplemento no permitido que haya llegado hasta aquí
      const suplementosAntesFiltro = suplementosFinales.length
      suplementosFinales = suplementosFinales.filter(s => !suplementosRestringidos.includes(s.nombre))
      
      if (suplementosAntesFiltro !== suplementosFinales.length) {
        console.log(`ADVERTENCIA: Se filtraron ${suplementosAntesFiltro - suplementosFinales.length} suplementos no ${esVegano ? 'veganos' : 'vegetarianos'} en la validación final`)
      }
    }
    
    // VALIDACIÓN DE GÉNERO: Filtrar suplementos específicos de género
    if (solicitud.genero === "hombre") {
      // Suplementos específicos para mujeres/menopausia que no deben aparecer para hombres
      const suplementosExclusivamenteParaMujeres = ["Isoflavonas de Soja", "Cohosh Negro"]
      
      const suplementosAntesFiltroGenero = suplementosFinales.length
      suplementosFinales = suplementosFinales.filter(s => !suplementosExclusivamenteParaMujeres.includes(s.nombre))
      
      if (suplementosAntesFiltroGenero !== suplementosFinales.length) {
        console.log(`ADVERTENCIA: Se filtraron ${suplementosAntesFiltroGenero - suplementosFinales.length} suplementos específicos de mujeres para usuario hombre`)
      }
    }

    // Debug: ver qué suplementos tenemos antes del slice
    console.log("Suplementos finales antes del límite:", suplementosFinales.map(s => s.nombre))
    
    // Crear las recomendaciones finales (máximo 8 para dar espacio a los de análisis de sangre)
    const recomendaciones = suplementosFinales.slice(0, 8).map((suplemento) => {
      // Verificar advertencias específicas por edad
      const { advertencias: advertenciasEdad } = verificarSuplementosApropiadosEdad(suplemento, solicitud.edad || 30)

      // Verificar interacciones con medicamentos
      const interacciones = verificarInteraccionesMedicamentos(suplemento.nombre, solicitud.medicamentos || "")

      // Determinar si se debe consultar a un nutricionista
      const consultarNutricionista =
        interacciones.length > 0 ||
        advertenciasEdad.length > 0 ||
        (suplemento.efectos_secundarios &&
          suplemento.efectos_secundarios.some(
            (efecto) =>
              efecto.toLowerCase().includes("grave") ||
              efecto.toLowerCase().includes("serio") ||
              efecto.toLowerCase().includes("severo"),
          ))

      // Seleccionar la descripción contextual apropiada
      let descripcionFinal = suplemento.descripcion
      if (suplemento.descripcionesContextuales) {
        // Priorizar descripción para menopausia si está presente
        if (objetivosRelevantes.includes("menopausia") && suplemento.descripcionesContextuales.menopausia) {
          descripcionFinal = suplemento.descripcionesContextuales.menopausia
        }
        // Luego buscar otras coincidencias de objetivos
        else {
          for (const objetivo of objetivosRelevantes) {
            const objetivoNormalizado = objetivo.replace(/-/g, "_")
            if (suplemento.descripcionesContextuales[objetivoNormalizado]) {
              descripcionFinal = suplemento.descripcionesContextuales[objetivoNormalizado]
              break
            }
          }
        }
      }

      return {
        nombre: suplemento.nombre,
        descripcion: descripcionFinal,
        beneficios: suplemento.beneficios,
        dosificacion: extraerInfoDosificacion(suplemento, solicitud.genero),
        momentoOptimo: obtenerInfoMomentoOptimo(suplemento),
        consejosAbsorcion: obtenerInfoAbsorcion(suplemento),
        dosificacionEspecificaGenero: {
          hombre: extraerInfoDosificacion(suplemento, "hombre"),
          mujer: extraerInfoDosificacion(suplemento, "mujer"),
        },
        evidenciaCientifica: suplemento.evidencia_cientifica || [
          `${suplemento.nombre} ha mostrado beneficios para ${suplemento.beneficios[0].toLowerCase()} según la evidencia científica.`,
        ],
        adecuadoPara: obtenerInfoAdecuacion(suplemento, solicitud),
        etiquetas: obtenerEtiquetasDeBeneficios(suplemento.beneficios),
        advertencias: [...advertenciasEdad, ...(suplemento.efectos_secundarios || [])],
        interaccionesMedicamentos: interacciones,
        consultarNutricionista: consultarNutricionista,
        productosMercadoLibre: suplemento.productosMercadoLibre 
          ? processProductsWithAffiliateLinks(suplemento.productosMercadoLibre, suplemento.nombre)
          : undefined,
      }
    })

    // Generar combinaciones de suplementos sinérgicos
    const combinaciones = generarCombinacionesSinergicas(recomendaciones, objetivosRelevantes, solicitud.restriccionesDietarias)

    console.log(`Generadas ${recomendaciones.length} recomendaciones basadas en evidencia científica`)
    return recomendaciones
  } catch (error) {
    console.error("Error en generarRecomendaciones:", error)
    throw new Error(`Error al generar recomendaciones: ${error instanceof Error ? error.message : String(error)}`)
  }
}

/**
 * Genera combinaciones sinérgicas de suplementos
 * @param recomendaciones Lista de recomendaciones de suplementos
 * @param objetivosSalud Objetivos de salud del usuario
 * @returns Array de combinaciones de suplementos
 */
export function generarCombinacionesSinergicas(
  recomendaciones: RecomendacionSuplemento[],
  objetivosSalud: string[],
  restriccionesDietarias?: string[]
): CombinacionSuplementos[] {
  const combinaciones: CombinacionSuplementos[] = []
  
  // Determinar si el usuario es vegano/vegetariano
  const esVegano = restriccionesDietarias?.includes("vegano") || false
  const esVegetariano = restriccionesDietarias?.includes("vegetariano") || false

  // Mapeo de objetivos de salud a combinaciones específicas
  const mapeoObjetivosCombinaciones: Record<
    string,
    {
      nombre: string
      descripcion: string
      suplementos: string[]
      sinergias: string[]
    }
  > = {
    "ganancia-muscular": {
      nombre: "Pack Ganancia Muscular",
      descripcion:
        "Combinación ideal para maximizar el crecimiento muscular y la recuperación, basada en evidencia científica actualizada.",
      suplementos: esVegano || esVegetariano 
        ? ["Creatina", "Proteína Vegetal (Guisante o Soja)", "BCAA Vegano"]
        : ["Creatina", "Proteína de Suero", "Aminoácidos de Cadena Ramificada"],
      sinergias: esVegano || esVegetariano ? [
        "La creatina aumenta la fuerza y potencia durante el entrenamiento según estudios clínicos",
        "La proteína vegetal (guisante o soja) proporciona los aminoácidos esenciales necesarios para la síntesis de proteínas musculares",
        "Los BCAA veganos complementan la proteína vegetal optimizando el perfil de aminoácidos para máxima efectividad",
        "Esta combinación vegana está respaldada por la evidencia científica para optimizar el crecimiento muscular",
      ] : [
        "La creatina aumenta la fuerza y potencia durante el entrenamiento según estudios clínicos",
        "La proteína de suero proporciona los aminoácidos esenciales necesarios para la síntesis de proteínas musculares",
        "Los BCAA complementan la proteína optimizando la recuperación muscular",
        "Esta combinación está respaldada por la evidencia científica para optimizar el crecimiento muscular",
      ],
    },
    "perdida-peso": {
      nombre: "Pack Control de Peso",
      descripcion: "Combinación efectiva para apoyar la pérdida de peso y el metabolismo saludable.",
      suplementos: esVegano || esVegetariano 
        ? ["Extracto de Té Verde", "Proteína Vegetal (Guisante o Soja)", "Magnesio"]
        : ["Extracto de Té Verde", "Proteína de Suero", "Magnesio"],
      sinergias: [
        "El extracto de té verde ayuda a aumentar el metabolismo",
        "La proteína ayuda a mantener la saciedad y preservar la masa muscular",
        "Esta combinación apoya la oxidación de grasas y el bienestar general durante dietas",
      ],
    },
    "reduccion-estres": {
      nombre: "Pack Anti-Estrés",
      descripcion: "Combinación calmante para reducir el estrés y mejorar la calidad del sueño.",
      suplementos: ["Magnesio", "Ashwagandha"],
      sinergias: [
        "El magnesio y la ashwagandha trabajan sinérgicamente para reducir la ansiedad",
        "Esta combinación ayuda a regular los niveles de cortisol",
        "Mejora la calidad del sueño y la resistencia al estrés",
      ],
    },
    "apoyo-inmune": {
      nombre: "Pack Inmunidad",
      descripcion: "Combinación potente para fortalecer las defensas del organismo.",
      suplementos: ["Vitamina D", "Zinc", "Probióticos"],
      sinergias: [
        "La vitamina D y el zinc son fundamentales para la función inmune óptima",
        "Los probióticos mejoran la inmunidad intestinal",
        "Esta combinación proporciona apoyo inmunológico completo",
      ],
    },
    "gut-microbiota": {
      nombre: "Pack Microbiota Intestinal",
      descripcion: "Combinación ideal para mejorar la salud intestinal y la microbiota.",
      suplementos: ["Probióticos", "Prebióticos", "Fibra Soluble", "Enzimas Digestivas"],
      sinergias: [
        "Los probióticos y prebióticos trabajan juntos para optimizar la flora intestinal",
        "La fibra soluble alimenta las bacterias beneficiosas",
        "Las enzimas digestivas mejoran la absorción de nutrientes",
      ],
    },
    "salud-osea": {
      nombre: "Pack Salud Ósea",
      descripcion: "Combinación completa para fortalecer los huesos y prevenir la pérdida de densidad ósea.",
      suplementos: ["Calcio", "Vitamina D", "Vitamina K2", "Magnesio"],
      sinergias: [
        "El calcio es el componente estructural principal de los huesos",
        "La vitamina D mejora la absorción de calcio",
        "La vitamina K2 dirige el calcio hacia los huesos y evita su acumulación en arterias",
        "El magnesio trabaja junto con el calcio para optimizar la salud ósea",
      ],
    },
    "menopausia": {
      nombre: "Pack Menopausia",
      descripcion: "Combinación especializada para apoyar durante la transición menopáusica y aliviar síntomas.",
      suplementos: ["Isoflavonas de Soja", "Cohosh Negro", "Vitamina D", "Calcio", "Magnesio", esVegano || esVegetariano ? "Omega-3 Vegano (ALA)" : "Omega-3", esVegano || esVegetariano ? "Colágeno Vegano" : "Colágeno"],
      sinergias: [
        "Las isoflavonas de soja ayudan a reducir los sofocos y síntomas vasomotores",
        "El cohosh negro ha mostrado eficacia en el alivio de síntomas menopáusicos",
        "La vitamina D y el calcio son esenciales para mantener la salud ósea durante la menopausia",
        "El colágeno ayuda a mantener la densidad ósea y mejora la elasticidad de la piel",
        "El magnesio ayuda con el sueño y reduce la ansiedad",
        "Los omega-3 apoyan la salud cardiovascular y el estado de ánimo",
      ],
    },
  }

  // Crear combinaciones basadas en los objetivos de salud del usuario
  let idCombinacion = 1

  for (const objetivo of objetivosSalud) {
    const combinacionPredefinida = mapeoObjetivosCombinaciones[objetivo]

    if (combinacionPredefinida) {
      // Encontrar los suplementos recomendados que coinciden con esta combinación
      const suplementosCombinacion = recomendaciones.filter((rec) => {
        // Manejo especial para proteínas - considerar coincidencias parciales
        if (rec.nombre.toLowerCase().includes("proteína")) {
          return combinacionPredefinida.suplementos.some(supl => 
            supl.toLowerCase().includes("proteína") && 
            (supl.includes("Vegetal") || supl.includes("Suero") || supl.includes("Guisante") || supl.includes("Soja"))
          )
        }
        return combinacionPredefinida.suplementos.includes(rec.nombre)
      })

      // Solo crear la combinación si encontramos al menos 2 suplementos
      if (suplementosCombinacion.length >= 2) {
        const precioTotal = suplementosCombinacion.reduce(
          (total, supl) => total + (500 + Math.floor(Math.random() * 1000)),
          0,
        )

        const descuento = Math.floor(precioTotal * 0.15) // 15% de descuento

        // Generar instrucciones específicas basadas en los suplementos reales incluidos
        const instrucciones = objetivo === "menopausia" 
          ? generarInstruccionesMenopausia(suplementosCombinacion)
          : generarInstruccionesEspecificas(suplementosCombinacion, objetivo)

        combinaciones.push({
          id: idCombinacion++,
          nombre: combinacionPredefinida.nombre,
          descripcion: combinacionPredefinida.descripcion,
          suplementos: suplementosCombinacion,
          precio: precioTotal - descuento,
          descuento: descuento,
          sinergias: combinacionPredefinida.sinergias,
          instrucciones: instrucciones,
        })
      }
    }
  }

  // Modificar la función para asegurar que el Pack Bienestar incluya todos los suplementos recomendados
  // Si no se crearon combinaciones específicas, crear una combinación general
  if (combinaciones.length === 0 && recomendaciones.length >= 2) {
    // Usar TODOS los suplementos disponibles (hasta un máximo razonable para no sobrecargar)
    const suplementosGenerales = recomendaciones.slice(0, Math.min(recomendaciones.length, 6))

    // Generar instrucciones específicas para estos suplementos
    const instruccionesGenerales = generarInstruccionesEspecificas(suplementosGenerales, "general")

    const precioTotal = suplementosGenerales.reduce((total) => total + (500 + Math.floor(Math.random() * 1000)), 0)

    const descuento = Math.floor(precioTotal * 0.15)

    combinaciones.push({
      id: 1,
      nombre: "Pack Bienestar Completo",
      descripcion:
        "Combinación completa con todos los suplementos recomendados para mejorar tu salud general y bienestar.",
      suplementos: suplementosGenerales,
      precio: precioTotal - descuento,
      descuento: descuento,
      sinergias: [
        "Esta combinación proporciona apoyo nutricional completo",
        "Los suplementos seleccionados trabajan juntos para mejorar la salud general",
        "Formulación balanceada para resultados óptimos",
      ],
      instrucciones: instruccionesGenerales,
    })
  }

  return combinaciones
}

// Función para distribuir inteligentemente los suplementos y evitar sobrecarga
function distribuirSuplementosInteligentemente(momentos: Record<string, RecomendacionSuplemento[]>) {
  const MAX_POR_MOMENTO = 3 // Máximo de suplementos por momento del día
  
  // Si la mañana está sobrecargada, mover algunos a con_comidas
  if (momentos.mañana.length > MAX_POR_MOMENTO) {
    const exceso = momentos.mañana.splice(MAX_POR_MOMENTO)
    momentos.con_comidas.push(...exceso)
  }
  
  // Si con_comidas está sobrecargado, distribuir algunos
  if (momentos.con_comidas.length > MAX_POR_MOMENTO + 1) {
    // Buscar vitaminas liposolubles para mantener con comidas
    const vitaminasLiposolubles = momentos.con_comidas.filter(s => 
      s.nombre.toLowerCase().includes("vitamina d") ||
      s.nombre.toLowerCase().includes("vitamina e") ||
      s.nombre.toLowerCase().includes("vitamina k") ||
      s.nombre.toLowerCase().includes("omega")
    )
    
    const otros = momentos.con_comidas.filter(s => 
      !vitaminasLiposolubles.includes(s)
    )
    
    // Mantener las vitaminas liposolubles con comidas
    momentos.con_comidas = vitaminasLiposolubles
    
    // Redistribuir otros
    if (momentos.mañana.length < MAX_POR_MOMENTO && otros.length > 0) {
      const paraManana = otros.splice(0, MAX_POR_MOMENTO - momentos.mañana.length)
      momentos.mañana.push(...paraManana)
    }
    
    // Si aún quedan, ponerlos en la tarde (crear nueva categoría si es necesario)
    if (otros.length > 0) {
      momentos.con_comidas.push(...otros.slice(0, 2)) // Máximo 2 más con comidas
    }
  }
  
  // Verificar interacciones negativas
  verificarYSepararInteracciones(momentos)
}

// Función para separar suplementos que no deben tomarse juntos
function verificarYSepararInteracciones(momentos: Record<string, RecomendacionSuplemento[]>) {
  // Hierro y Calcio no deben tomarse juntos
  for (const [momento, suplementos] of Object.entries(momentos)) {
    const tieneHierro = suplementos.some(s => s.nombre.toLowerCase().includes("hierro"))
    const tieneCalcio = suplementos.some(s => s.nombre.toLowerCase().includes("calcio"))
    
    if (tieneHierro && tieneCalcio && suplementos.length > 1) {
      // Mover el hierro a otro momento
      const hierroIndex = suplementos.findIndex(s => s.nombre.toLowerCase().includes("hierro"))
      if (hierroIndex !== -1) {
        const hierro = suplementos.splice(hierroIndex, 1)[0]
        // Preferir mañana para hierro (mejor absorción en ayunas)
        if (momento !== "mañana" && momentos.mañana.length < 3) {
          momentos.mañana.push(hierro)
        } else if (momento !== "con_comidas") {
          momentos.con_comidas.push(hierro)
        }
      }
    }
  }
}

// Función mejorada para clasificar suplementos por momento óptimo único
function clasificarSuplementoPorMomento(suplemento: RecomendacionSuplemento): string {
  const momento = suplemento.momentoOptimo.toLowerCase()
  const nombre = suplemento.nombre.toLowerCase()
  
  // Prioridad 1: Suplementos específicos de ejercicio
  if (momento.includes("ejercicio") || nombre.includes("creatina") || nombre.includes("beta-alanina")) {
    if (momento.includes("antes")) return "antes_ejercicio"
    if (momento.includes("después")) return "despues_ejercicio"
    return "ejercicio" // Para los que pueden ser antes o después
  }
  
  // Prioridad 2: Suplementos específicos de sueño/noche
  if (momento.includes("dormir") || momento.includes("acostarse") || 
      momento.includes("sueño") || nombre.includes("melatonina") || 
      (nombre.includes("magnesio") && momento.includes("noche"))) {
    return "noche"
  }
  
  // Prioridad 3: Suplementos de mañana
  if (momento.includes("mañana") || momento.includes("desayuno") || 
      momento.includes("ayunas") || nombre.includes("vitamina d")) {
    return "mañana"
  }
  
  // Prioridad 4: Si menciona "dividir dosis", asignar según el suplemento
  if (momento.includes("dividir")) {
    if (nombre.includes("magnesio") || nombre.includes("calcio")) {
      return "con_comidas" // Mejor absorción con comidas
    }
    return "mañana" // Por defecto, empezar en la mañana
  }
  
  // Prioridad 5: Con comidas
  if (momento.includes("comida") || momento.includes("alimento") || 
      momento.includes("grasa") || nombre.includes("omega") || 
      nombre.includes("vitamina e") || nombre.includes("vitamina k")) {
    return "con_comidas"
  }
  
  // Por defecto: con comidas para mejor absorción
  return "con_comidas"
}

// Agregar esta nueva función para generar instrucciones específicas
function generarInstruccionesEspecificas(suplementos: RecomendacionSuplemento[], objetivo: string): string {
  // Crear un mapa de momentos óptimos para tomar cada suplemento
  const momentos: Record<string, RecomendacionSuplemento[]> = {
    mañana: [],
    con_comidas: [],
    ejercicio: [],
    antes_ejercicio: [],
    despues_ejercicio: [],
    noche: [],
  }
  
  // Mapa para evitar duplicados
  const suplementosAsignados = new Set<string>()

  // Clasificar cada suplemento según su momento óptimo único
  suplementos.forEach((suplemento) => {
    if (!suplementosAsignados.has(suplemento.nombre)) {
      const momentoAsignado = clasificarSuplementoPorMomento(suplemento)
      momentos[momentoAsignado].push(suplemento)
      suplementosAsignados.add(suplemento.nombre)
    }
  })

  // Implementar distribución inteligente para evitar sobrecarga
  distribuirSuplementosInteligentemente(momentos)
  
  // Generar instrucciones basadas en la clasificación
  let instrucciones =
    "Para obtener los mejores resultados, tome los suplementos de este pack de la siguiente manera:\n\n"

  if (momentos.mañana.length > 0) {
    instrucciones += `- Por la mañana (con el desayuno): ${momentos.mañana.map(s => s.nombre).join(", ")}\n`
  }

  if (momentos.con_comidas.length > 0) {
    instrucciones += `- Con las comidas principales: ${momentos.con_comidas.map(s => s.nombre).join(", ")}\n`
  }

  if (momentos.ejercicio.length > 0) {
    instrucciones += `- En días de entrenamiento: ${momentos.ejercicio.map(s => s.nombre).join(", ")}\n`
  }

  if (momentos.antes_ejercicio.length > 0) {
    instrucciones += `- Antes del ejercicio: ${momentos.antes_ejercicio.map(s => s.nombre).join(", ")}\n`
  }

  if (momentos.despues_ejercicio.length > 0) {
    instrucciones += `- Después del ejercicio: ${momentos.despues_ejercicio.map(s => s.nombre).join(", ")}\n`
  }

  if (momentos.noche.length > 0) {
    instrucciones += `- Por la noche (antes de acostarse): ${momentos.noche.map(s => s.nombre).join(", ")}\n`
  }

  // Proteína y creatina
  if (
    suplementos.some((s) => s.nombre.toLowerCase().includes("proteína")) &&
    suplementos.some((s) => s.nombre.toLowerCase().includes("creatina"))
  ) {
    instrucciones +=
      "- Tomar proteína y creatina juntas después del entrenamiento para maximizar la recuperación y el crecimiento muscular.\n"
  }

  // Nota sobre proteína para ganancia muscular
  const tieneProteinaSuero = suplementos.some((s) => s.nombre.toLowerCase().includes("proteína de suero"))
  const tieneProteinaVegetal = suplementos.some((s) => 
    s.nombre.toLowerCase().includes("proteína de soja") || 
    s.nombre.toLowerCase().includes("proteína de guisante") ||
    s.nombre.toLowerCase().includes("proteína vegetal")
  )
  const tieneBCAA = suplementos.some((s) => s.nombre.toLowerCase().includes("aminoácidos de cadena ramificada"))
  
  if (tieneProteinaSuero) {
    instrucciones +=
      "- Según la evidencia científica, la proteína de suero contiene todos los aminoácidos esenciales necesarios para la síntesis de proteínas musculares, incluyendo altos niveles de leucina, que es crucial para estimular este proceso.\n"
  } else if (tieneProteinaVegetal) {
    instrucciones +=
      "- Las proteínas vegetales (guisante o soja) son excelentes alternativas veganas con perfiles completos de aminoácidos. Ambas opciones proporcionan todos los aminoácidos esenciales necesarios para la síntesis muscular.\n"
    
    if (tieneBCAA) {
      instrucciones +=
        "- Los BCAA complementan perfectamente las proteínas vegetales, optimizando el perfil de aminoácidos para máxima síntesis de proteínas musculares.\n"
      instrucciones +=
        "- Tome los BCAA junto con su proteína vegetal o inmediatamente antes/después del entrenamiento.\n"
    }
  }

  // Añadir información sobre dosificación
  instrucciones += "\nDosificación recomendada:\n"
  suplementos.forEach((suplemento) => {
    instrucciones += `- ${suplemento.nombre}: ${suplemento.dosificacion}\n`
  })

  // Añadir consejos de absorción si están disponibles
  const suplementosConConsejos = suplementos.filter((s) => s.consejosAbsorcion && s.consejosAbsorcion.length > 10)
  if (suplementosConConsejos.length > 0) {
    instrucciones += "\nConsejos para mejorar la absorción:\n"
    suplementosConConsejos.forEach((suplemento) => {
      instrucciones += `- ${suplemento.nombre}: ${suplemento.consejosAbsorcion}\n`
    })
  }

  // Añadir información sobre periodos de descanso si es necesario
  const suplementosConDescanso = suplementos.filter((s) =>
    ["Creatina", "Beta-Alanina", "Ashwagandha"].includes(s.nombre),
  )

  if (suplementosConDescanso.length > 0) {
    instrucciones += "\nPeriodos de descanso recomendados:\n"
    suplementosConDescanso.forEach((suplemento) => {
      const infoPeriodoDescanso = obtenerInfoPeriodoDescanso(suplemento.nombre)
      instrucciones += `- ${suplemento.nombre}: ${infoPeriodoDescanso}\n`
    })
  }

  // Añadir nota final
  instrucciones +=
    "\nEsta distribución optimiza la absorción y eficacia de cada suplemento. Consulte con un profesional de la salud antes de comenzar cualquier régimen de suplementación."

  return instrucciones
}

/**
 * Filtra suplementos basados en restricciones dietéticas
 * @param suplementos Array de suplementos a filtrar
 * @param restriccionesDietarias Array de restricciones dietéticas
 * @returns Array filtrado de suplementos
 */
function filtrarPorRestriccionesDietarias(
  suplementos: DatosSuplemento[],
  restriccionesDietarias: string[],
): DatosSuplemento[] {
  if (!restriccionesDietarias.length) {
    return suplementos
  }

  // Traducir los conflictos de restricciones dietéticas
  const conflictosRestricciones: Record<string, string[]> = {
    vegano: ["Aceite de Pescado", "Glucosamina", "Condroitina", "MSM", "Quitosano"],
    vegetariano: ["Aceite de Pescado", "Glucosamina", "Condroitina"],
    "sin-gluten": [], // No hay suplementos comunes que contengan gluten en nuestra lista
    "sin-lactosa": ["Proteína de Suero"],
    "sin-frutos-secos": [], // No hay suplementos comunes en nuestra lista que contengan frutos secos
    "sin-soja": ["Isoflavonas de Soja", "Proteína de Soja"],
    "sin-huevo": [], // No hay suplementos comunes en nuestra lista que contengan huevo
    "sin-mariscos": ["Glucosamina", "Quitosano"],
    kosher: ["Suplementos a base de gelatina"],
  }

  return suplementos.filter((suplemento) => {
    // Verificar si el suplemento entra en conflicto con alguna de las restricciones dietéticas del usuario
    for (const restriccion of restriccionesDietarias) {
      const conflictos = conflictosRestricciones[restriccion] || []
      if (conflictos.includes(suplemento.nombre)) {
        console.log(`Filtrando ${suplemento.nombre} debido a restricción: ${restriccion}`)
        return false
      }
    }
    return true
  })
}

/**
 * Extrae información de dosificación de un suplemento
 * @param suplemento Datos del suplemento
 * @param genero Género del usuario
 * @returns Información de dosificación como string
 */
function extraerInfoDosificacion(suplemento: DatosSuplemento, genero: "hombre" | "mujer"): string {
  // Intentar obtener dosificación específica por género
  if (suplemento.dosificacion) {
    if (genero === "hombre" && suplemento.dosificacion.hombres) {
      return suplemento.dosificacion.hombres
    } else if (genero === "mujer" && suplemento.dosificacion.mujeres) {
      return suplemento.dosificacion.mujeres
    } else if (suplemento.dosificacion.general) {
      return suplemento.dosificacion.general
    }
  }

  // Si no hay información específica, proporcionar un mensaje genérico
  return `Consulta con un profesional de la salud para la dosificación adecuada para ${
    genero === "hombre" ? "hombres" : "mujeres"
  }.`
}

/**
 * Determina para quién es adecuado un suplemento basado en la solicitud del usuario
 * @param suplemento Datos del suplemento
 * @param solicitud Solicitud de recomendación del usuario
 * @returns Array de declaraciones de adecuación
 */
function obtenerInfoAdecuacion(suplemento: DatosSuplemento, solicitud: SolicitudRecomendacion): string[] {
  const adecuacion: string[] = []

  // Añadir adecuación basada en género y edad
  adecuacion.push(
    `${solicitud.genero === "hombre" ? "Hombres" : "Mujeres"} de ${
      solicitud.edad
    } años buscando ${solicitud.objetivosSalud.join(" y ")}`,
  )

  // Añadir adecuación basada en restricciones dietéticas
  if (solicitud.restriccionesDietarias.includes("vegano")) {
    adecuacion.push("Apto para veganos")
  } else if (solicitud.restriccionesDietarias.includes("vegetariano")) {
    adecuacion.push("Apto para vegetarianos")
  }

  // Añadir adecuación general
  adecuacion.push(`Personas interesadas en ${suplemento.beneficios[0].toLowerCase()}`)

  return adecuacion
}

/**
 * Extrae etiquetas de los beneficios de un suplemento
 * @param beneficios Array de declaraciones de beneficios
 * @returns Array de etiquetas
 */
function obtenerEtiquetasDeBeneficios(beneficios: string[]): string[] {
  // Convertir beneficios a etiquetas
  const etiquetas: string[] = []

  for (const beneficio of beneficios) {
    // Extraer términos clave de los beneficios
    const palabras = beneficio.toLowerCase().split(/\s+/)
    const palabrasImportantes = palabras.filter(
      (palabra) =>
        palabra.length > 3 &&
        ![
          "with",
          "from",
          "this",
          "that",
          "than",
          "what",
          "when",
          "where",
          "which",
          "while",
          "your",
          "para",
          "como",
          "cuando",
          "donde",
          "cual",
          "mientras",
          "desde",
          "hasta",
          "sobre",
          "entre",
        ].includes(palabra),
    )

    etiquetas.push(...palabrasImportantes)
  }

  // Eliminar duplicados y limitar a 5 etiquetas
  return Array.from(new Set(etiquetas)).slice(0, 5)
}

// Función para obtener información sobre periodos de descanso
function obtenerInfoPeriodoDescanso(nombre: string): string {
  const informacionDescanso: Record<string, string> = {
    Creatina:
      "Tomar durante 8-12 semanas, seguido de un descanso de 4 semanas. Esta estrategia de ciclado no es estrictamente necesaria según la evidencia científica actual, pero puede ser preferida por algunos usuarios para evitar la adaptación del cuerpo.",
    "Beta-Alanina":
      "Tomar diariamente durante 12 semanas, seguido de un descanso de 2-4 semanas. Los ciclos son opcionales pero recomendados para evaluar si se mantienen los beneficios sin suplementación continua.",
    Ashwagandha:
      "Tomar durante 3 meses, seguido de un descanso de 2-4 semanas para evitar la posible adaptación del cuerpo y mantener la efectividad del suplemento.",
  }

  return informacionDescanso[nombre] || "No se requieren periodos de descanso específicos"
}

// Función específica para generar instrucciones detalladas para menopausia
function generarInstruccionesMenopausia(suplementos: RecomendacionSuplemento[]): string {
  let instrucciones = "## Protocolo Especializado para Alivio de Síntomas Menopáusicos\n\n"
  
  instrucciones += "Este régimen está diseñado específicamente para abordar los múltiples síntomas de la menopausia de manera integral:\n\n"
  
  // Organizar por momento del día y síntoma objetivo
  instrucciones += "### 🌅 Por la mañana (con el desayuno):\n"
  
  const suplementosMañana: string[] = []
  const suplementosComida: string[] = []
  const suplementosNoche: string[] = []
  
  suplementos.forEach(sup => {
    const nombre = sup.nombre
    
    // Clasificar según el suplemento para menopausia
    if (nombre.includes("Isoflavonas de Soja")) {
      suplementosMañana.push(`- **${nombre}**: 40-50 mg - Primera dosis para control de sofocos diurnos`)
    } else if (nombre.includes("Vitamina D")) {
      suplementosMañana.push(`- **${nombre}**: ${sup.dosificacion} - Para salud ósea y estado de ánimo`)
    } else if (nombre.includes("Calcio")) {
      suplementosMañana.push(`- **${nombre}**: 500-600 mg - Primera dosis (dividir dosis mejora absorción)`)
    } else if (nombre.includes("Cohosh Negro")) {
      suplementosMañana.push(`- **${nombre}**: 20-40 mg - Para síntomas vasomotores y estado de ánimo`)
    } else if (nombre.includes("Omega-3")) {
      suplementosComida.push(`- **${nombre}**: ${sup.dosificacion} - Con la comida principal para mejor absorción`)
    } else if (nombre.includes("Vitamina E")) {
      suplementosComida.push(`- **${nombre}**: 400 UI - Con alimentos grasos para absorción óptima`)
    } else if (nombre.includes("Magnesio")) {
      suplementosNoche.push(`- **${nombre}**: ${sup.dosificacion} - Para mejorar sueño y reducir sudores nocturnos`)
    } else {
      // Otros suplementos según su momento óptimo
      const momento = sup.momentoOptimo.toLowerCase()
      if (momento.includes("mañana") || momento.includes("desayuno")) {
        suplementosMañana.push(`- **${nombre}**: ${sup.dosificacion}`)
      } else if (momento.includes("noche")) {
        suplementosNoche.push(`- **${nombre}**: ${sup.dosificacion}`)
      } else {
        suplementosComida.push(`- **${nombre}**: ${sup.dosificacion}`)
      }
    }
  })
  
  // Agregar las instrucciones organizadas
  suplementosMañana.forEach(s => instrucciones += s + "\n")
  
  instrucciones += "\n### 🍽️ Con la comida principal del día:\n"
  suplementosComida.forEach(s => instrucciones += s + "\n")
  
  if (suplementos.some(s => s.nombre.includes("Isoflavonas de Soja"))) {
    instrucciones += "- **Isoflavonas de Soja**: 40-50 mg - Segunda dosis para control de síntomas vespertinos\n"
  }
  if (suplementos.some(s => s.nombre.includes("Cohosh Negro"))) {
    instrucciones += "- **Cohosh Negro**: 20-40 mg - Segunda dosis para mantener niveles estables\n"
  }
  
  instrucciones += "\n### 🌙 Por la noche (30-60 min antes de dormir):\n"
  suplementosNoche.forEach(s => instrucciones += s + "\n")
  if (suplementos.some(s => s.nombre.includes("Calcio"))) {
    instrucciones += "- **Calcio**: 500-600 mg - Segunda dosis (separada del hierro si lo toma)\n"
  }
  
  // Agregar sección de sinergias específicas para menopausia
  instrucciones += "\n### 💡 Sinergias y Consejos Específicos:\n\n"
  
  if (suplementos.some(s => s.nombre.includes("Isoflavonas de Soja"))) {
    instrucciones += "**Para sofocos y sudores nocturnos:**\n"
    instrucciones += "- Las isoflavonas tardan 4-6 semanas en mostrar efectos. Sea paciente y consistente.\n"
    instrucciones += "- Combine con técnicas de respiración profunda durante los sofocos.\n"
    instrucciones += "- Evite desencadenantes: alcohol, cafeína, comidas picantes.\n\n"
  }
  
  if (suplementos.some(s => s.nombre.includes("Calcio")) && suplementos.some(s => s.nombre.includes("Vitamina D"))) {
    instrucciones += "**Para salud ósea:**\n"
    instrucciones += "- La vitamina D mejora la absorción del calcio - tómelos juntos.\n"
    instrucciones += "- Agregue ejercicios de resistencia 2-3 veces por semana.\n"
    instrucciones += "- Considere una densitometría ósea anual.\n\n"
  }
  
  if (suplementos.some(s => s.nombre.includes("Magnesio"))) {
    instrucciones += "**Para mejor sueño:**\n"
    instrucciones += "- El magnesio antes de dormir ayuda con el insomnio menopáusico.\n"
    instrucciones += "- Mantenga el dormitorio fresco (18-20°C) para sudores nocturnos.\n"
    instrucciones += "- Use ropa de cama de algodón transpirable.\n\n"
  }
  
  // Agregar timeline de resultados esperados
  instrucciones += "### 📅 Cronograma de Resultados Esperados:\n\n"
  instrucciones += "- **Semana 1-2**: Posible mejora en calidad del sueño (magnesio)\n"
  instrucciones += "- **Semana 2-4**: Reducción inicial en frecuencia de sofocos\n"
  instrucciones += "- **Semana 4-6**: Mejora significativa en síntomas vasomotores\n"
  instrucciones += "- **Semana 8-12**: Beneficios completos, incluyendo estado de ánimo\n"
  instrucciones += "- **3-6 meses**: Mejoras en salud ósea y cardiovascular\n\n"
  
  // Agregar precauciones específicas
  instrucciones += "### ⚠️ Precauciones Importantes:\n\n"
  instrucciones += "- Consulte con su ginecólogo antes de iniciar, especialmente si tiene antecedentes de cáncer hormono-dependiente.\n"
  instrucciones += "- Las isoflavonas de soja pueden interactuar con medicamentos tiroideos.\n"
  instrucciones += "- Monitoree función hepática si usa cohosh negro por más de 6 meses.\n"
  instrucciones += "- Este régimen NO reemplaza la terapia hormonal de reemplazo cuando está indicada.\n\n"
  
  // Agregar recomendaciones de estilo de vida
  instrucciones += "### 🌿 Recomendaciones Complementarias de Estilo de Vida:\n\n"
  instrucciones += "1. **Ejercicio regular**: 150 min/semana de actividad moderada + 2 sesiones de fuerza\n"
  instrucciones += "2. **Técnicas de relajación**: Yoga, meditación o tai chi para manejo del estrés\n"
  instrucciones += "3. **Dieta mediterránea**: Rica en fitoestrógenos naturales\n"
  instrucciones += "4. **Hidratación**: 8-10 vasos de agua al día\n"
  instrucciones += "5. **Evitar**: Tabaco, exceso de alcohol, alimentos ultraprocesados\n"
  
  return instrucciones
}
