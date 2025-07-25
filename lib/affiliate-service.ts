/**
 * Servicio para manejar enlaces de afiliados de Mercado Libre
 * Agrega parámetros de tracking a las URLs de productos
 */

interface AffiliateConfig {
  affiliateId?: string
  campaign?: string
  enabled?: boolean
}

/**
 * Obtiene la configuración de afiliados desde las variables de entorno
 */
function getAffiliateConfig(): AffiliateConfig {
  return {
    affiliateId: process.env.NEXT_PUBLIC_ML_AFFILIATE_ID || 'suplementos-uy',
    campaign: process.env.NEXT_PUBLIC_ML_TRACKING_CAMPAIGN || 'recomendaciones',
    enabled: process.env.NEXT_PUBLIC_ENABLE_AFFILIATE_LINKS !== 'false'
  }
}

/**
 * Convierte una URL de Mercado Libre en un enlace de afiliado
 * @param originalUrl URL original del producto
 * @param customParams Parámetros adicionales opcionales
 * @returns URL con parámetros de afiliado
 */
export function createAffiliateLink(originalUrl: string, customParams?: Record<string, string>): string {
  const config = getAffiliateConfig()
  
  // Si los enlaces de afiliado están deshabilitados, devolver la URL original
  if (!config.enabled || !config.affiliateId) {
    return originalUrl
  }
  
  try {
    const url = new URL(originalUrl)
    
    // Agregar parámetros de afiliado
    // Nota: Los parámetros exactos dependerán del programa de afiliados de ML
    // Estos son ejemplos comunes, ajustar según la documentación oficial
    url.searchParams.set('tracking_id', config.affiliateId)
    url.searchParams.set('campaign', config.campaign)
    
    // Agregar timestamp para tracking único
    url.searchParams.set('click_id', `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`)
    
    // Agregar parámetros personalizados si se proporcionan
    if (customParams) {
      Object.entries(customParams).forEach(([key, value]) => {
        url.searchParams.set(key, value)
      })
    }
    
    return url.toString()
  } catch (error) {
    console.error('Error al crear enlace de afiliado:', error)
    return originalUrl
  }
}

/**
 * Procesa un array de productos y agrega tracking de afiliados
 */
export function processProductsWithAffiliateLinks<T extends { url: string }>(
  products: T[],
  supplement?: string
): T[] {
  return products.map(product => ({
    ...product,
    url: createAffiliateLink(product.url, {
      source: 'recomendaciones',
      supplement: supplement || 'general'
    })
  }))
}

/**
 * Verifica si una URL ya tiene parámetros de afiliado
 */
export function hasAffiliateParams(url: string): boolean {
  try {
    const urlObj = new URL(url)
    return urlObj.searchParams.has('tracking_id') || urlObj.searchParams.has('aff_id')
  } catch {
    return false
  }
}

/**
 * Genera un mensaje de divulgación de afiliados en español
 */
export function getAffiliateDisclosure(): string {
  return "Enlaces de afiliados: Podemos recibir una comisión sin costo adicional para ti si realizas una compra a través de estos enlaces."
}