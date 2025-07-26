import jsPDF from "jspdf"
import html2canvas from "html2canvas"

interface RecommendationData {
  nombre: string
  beneficios: string[]
  dosificacion?: string
  momentoOptimo?: string
  consejosAbsorcion?: string
  interaccionesMedicamentos?: string[]
}

export async function exportRecommendationsToPDF(
  recommendations: RecommendationData[],
  userProfile: {
    gender?: string
    age?: number
    healthGoals?: string[]
    medications?: string
  }
) {
  const pdf = new jsPDF("p", "mm", "a4")
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const margin = 15
  let yPosition = margin

  // Configurar fuente
  pdf.setFontSize(20)
  pdf.setTextColor(13, 148, 136) // Teal color
  pdf.text("Recomendaciones de Suplementos", pageWidth / 2, yPosition, { align: "center" })
  
  yPosition += 15

  // Información del usuario
  pdf.setFontSize(10)
  pdf.setTextColor(100, 100, 100)
  const fecha = new Date().toLocaleDateString("es-UY")
  pdf.text(`Fecha: ${fecha}`, margin, yPosition)
  yPosition += 7

  if (userProfile.gender || userProfile.age) {
    const profile = `Perfil: ${userProfile.gender === "male" ? "Hombre" : "Mujer"}, ${userProfile.age} años`
    pdf.text(profile, margin, yPosition)
    yPosition += 7
  }

  if (userProfile.healthGoals && userProfile.healthGoals.length > 0) {
    pdf.text("Objetivos de salud:", margin, yPosition)
    yPosition += 5
    pdf.setFontSize(9)
    userProfile.healthGoals.forEach(goal => {
      pdf.text(`• ${goal}`, margin + 5, yPosition)
      yPosition += 5
    })
    yPosition += 5
  }

  // Línea separadora
  pdf.setDrawColor(200, 200, 200)
  pdf.line(margin, yPosition, pageWidth - margin, yPosition)
  yPosition += 10

  // Recomendaciones
  recommendations.forEach((rec, index) => {
    // Verificar si necesitamos nueva página
    if (yPosition > pageHeight - 80) {
      pdf.addPage()
      yPosition = margin
    }

    // Nombre del suplemento
    pdf.setFontSize(14)
    pdf.setTextColor(13, 148, 136)
    pdf.text(`${index + 1}. ${rec.nombre}`, margin, yPosition)
    yPosition += 10

    // Beneficios
    pdf.setFontSize(10)
    pdf.setTextColor(50, 50, 50)
    pdf.text("Beneficios:", margin, yPosition)
    yPosition += 5
    
    pdf.setFontSize(9)
    rec.beneficios.forEach(beneficio => {
      const lines = pdf.splitTextToSize(`• ${beneficio}`, pageWidth - margin * 2 - 5)
      lines.forEach((line: string) => {
        if (yPosition > pageHeight - 20) {
          pdf.addPage()
          yPosition = margin
        }
        pdf.text(line, margin + 5, yPosition)
        yPosition += 5
      })
    })
    yPosition += 3

    // Dosificación
    if (rec.dosificacion) {
      pdf.setFontSize(10)
      pdf.setTextColor(50, 50, 50)
      pdf.text("Dosificación:", margin, yPosition)
      yPosition += 5
      pdf.setFontSize(9)
      const dosisLines = pdf.splitTextToSize(rec.dosificacion, pageWidth - margin * 2 - 5)
      dosisLines.forEach((line: string) => {
        pdf.text(line, margin + 5, yPosition)
        yPosition += 5
      })
      yPosition += 3
    }

    // Momento óptimo
    if (rec.momentoOptimo) {
      pdf.setFontSize(10)
      pdf.setTextColor(50, 50, 50)
      pdf.text("Momento óptimo:", margin, yPosition)
      yPosition += 5
      pdf.setFontSize(9)
      pdf.text(rec.momentoOptimo, margin + 5, yPosition)
      yPosition += 8
    }

    // Interacciones con medicamentos
    if (rec.interaccionesMedicamentos && rec.interaccionesMedicamentos.length > 0) {
      pdf.setFontSize(10)
      pdf.setTextColor(220, 38, 38) // Red color
      pdf.text("⚠️ Interacciones con medicamentos:", margin, yPosition)
      yPosition += 5
      pdf.setFontSize(9)
      rec.interaccionesMedicamentos.forEach(interaccion => {
        const lines = pdf.splitTextToSize(`• ${interaccion}`, pageWidth - margin * 2 - 5)
        lines.forEach((line: string) => {
          if (yPosition > pageHeight - 20) {
            pdf.addPage()
            yPosition = margin
          }
          pdf.text(line, margin + 5, yPosition)
          yPosition += 5
        })
      })
      yPosition += 3
    }

    yPosition += 10
  })

  // Disclaimer
  if (yPosition > pageHeight - 40) {
    pdf.addPage()
    yPosition = margin
  }

  pdf.setDrawColor(200, 200, 200)
  pdf.line(margin, yPosition, pageWidth - margin, yPosition)
  yPosition += 10

  pdf.setFontSize(8)
  pdf.setTextColor(150, 150, 150)
  const disclaimer = "Importante: Estas recomendaciones están basadas en evidencia científica general. Siempre consulte con un profesional de la salud antes de comenzar cualquier régimen de suplementos."
  const disclaimerLines = pdf.splitTextToSize(disclaimer, pageWidth - margin * 2)
  disclaimerLines.forEach((line: string) => {
    pdf.text(line, margin, yPosition)
    yPosition += 4
  })

  // Guardar el PDF
  pdf.save(`recomendaciones-suplementos-${fecha}.pdf`)
}

// Función alternativa para exportar elemento HTML directamente
export async function exportElementToPDF(elementId: string, filename: string = "recomendaciones.pdf") {
  const element = document.getElementById(elementId)
  if (!element) return

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      logging: false,
      useCORS: true,
    })

    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF("p", "mm", "a4")
    
    const imgWidth = 210 // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    
    let heightLeft = imgHeight
    let position = 0

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
    heightLeft -= 297 // A4 height in mm

    while (heightLeft > 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
      heightLeft -= 297
    }

    pdf.save(filename)
  } catch (error) {
    console.error("Error al generar PDF:", error)
    throw error
  }
}