// Utilidad para cifrado simple de datos en localStorage
// Nota: Para producción real, considera usar Web Crypto API o una librería más robusta

const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'suplementos-uruguay-2024-secure-key'

// Función simple de cifrado usando base64 seguro
function encrypt(text: string): string {
  if (!text) return ''
  
  try {
    // Convertir a JSON string si no lo es
    const jsonString = typeof text === 'string' ? text : JSON.stringify(text)
    
    // Codificar en base64 que maneja Unicode correctamente
    const utf8Bytes = new TextEncoder().encode(jsonString)
    const base64 = btoa(String.fromCharCode(...utf8Bytes))
    
    // Aplicar XOR simple para ofuscar (no es criptografía real)
    let encrypted = ''
    for (let i = 0; i < base64.length; i++) {
      const charCode = base64.charCodeAt(i)
      const keyChar = ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length)
      const encryptedChar = (charCode ^ keyChar) % 256 // Asegurar que esté en rango ASCII
      encrypted += String.fromCharCode(encryptedChar)
    }
    
    // Convertir resultado a hex para evitar problemas de encoding
    return Array.from(encrypted)
      .map(char => char.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('')
  } catch (error) {
    console.error('Error al cifrar:', error)
    return ''
  }
}

// Función de descifrado
function decrypt(encryptedText: string): string {
  if (!encryptedText) return ''
  
  try {
    // Si no es hex válido, probablemente es data antigua sin cifrar
    if (!/^[0-9a-fA-F]+$/.test(encryptedText)) {
      return encryptedText
    }
    
    // Convertir de hex a string
    const encrypted = encryptedText.match(/.{2}/g)
      ?.map(hex => String.fromCharCode(parseInt(hex, 16)))
      .join('') || ''
    
    // Revertir XOR
    let base64 = ''
    for (let i = 0; i < encrypted.length; i++) {
      const charCode = encrypted.charCodeAt(i)
      const keyChar = ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length)
      const decryptedChar = (charCode ^ keyChar) % 256
      base64 += String.fromCharCode(decryptedChar)
    }
    
    // Decodificar de base64
    const utf8String = atob(base64)
    const bytes = Uint8Array.from(utf8String, char => char.charCodeAt(0))
    return new TextDecoder().decode(bytes)
  } catch (error) {
    console.error('Error al descifrar, retornando vacío:', error)
    return ''
  }
}

// Versión segura de localStorage con cifrado
export const secureStorage = {
  setItem: (key: string, value: any): void => {
    try {
      const jsonString = JSON.stringify(value)
      const encrypted = encrypt(jsonString)
      localStorage.setItem(key, encrypted)
    } catch (error) {
      console.error('Error al guardar datos cifrados:', error)
    }
  },

  getItem: (key: string): any => {
    try {
      const encrypted = localStorage.getItem(key)
      if (!encrypted) return null
      
      // Intentar descifrar
      const decrypted = decrypt(encrypted)
      if (!decrypted) return null
      
      // Si es JSON válido, parsearlo
      try {
        return JSON.parse(decrypted)
      } catch {
        // Si no es JSON, tal vez es data antigua
        try {
          // Intentar parsear directamente el valor almacenado
          return JSON.parse(encrypted)
        } catch {
          // Si todo falla, retornar null
          return null
        }
      }
    } catch (error) {
      console.error('Error al recuperar datos cifrados:', error)
      return null
    }
  },

  removeItem: (key: string): void => {
    localStorage.removeItem(key)
  },

  clear: (): void => {
    localStorage.clear()
  },

  // Migrar datos existentes al formato cifrado
  migrateExistingData: (key: string): void => {
    try {
      const existingData = localStorage.getItem(key)
      if (existingData) {
        // Verificar si ya está cifrado (es hex)
        if (/^[0-9a-fA-F]+$/.test(existingData)) {
          console.log('Los datos ya están cifrados')
          return
        }
        
        // Intentar parsear como JSON (datos no cifrados)
        try {
          const parsed = JSON.parse(existingData)
          // Si se puede parsear, reencriptar
          secureStorage.setItem(key, parsed)
          console.log('Datos migrados a formato cifrado')
        } catch {
          // Si no se puede parsear, eliminar datos corruptos
          console.log('Datos corruptos detectados, eliminando...')
          localStorage.removeItem(key)
        }
      }
    } catch (error) {
      console.error('Error al migrar datos:', error)
      // En caso de error, limpiar los datos
      localStorage.removeItem(key)
    }
  }
}

// Función para verificar si los datos necesitan migración
export function needsMigration(key: string): boolean {
  const data = localStorage.getItem(key)
  if (!data) return false
  
  // Si es hex válido, ya está cifrado
  if (/^[0-9a-fA-F]+$/.test(data)) {
    return false
  }
  
  // Si no es hex, necesita migración
  return true
}