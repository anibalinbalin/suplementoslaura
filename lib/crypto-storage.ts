// Utilidad para cifrado simple de datos en localStorage
// Nota: Para producción real, considera usar Web Crypto API o una librería más robusta

const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'suplementos-uruguay-2024-secure-key'

// Función simple de cifrado (XOR con rotación)
function encrypt(text: string): string {
  if (!text) return ''
  
  let encrypted = ''
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i)
    const keyChar = ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length)
    const encryptedChar = charCode ^ keyChar
    encrypted += String.fromCharCode(encryptedChar)
  }
  
  // Convertir a base64 para almacenamiento seguro
  return btoa(encrypted)
}

// Función de descifrado
function decrypt(encryptedText: string): string {
  if (!encryptedText) return ''
  
  try {
    // Decodificar de base64
    const decoded = atob(encryptedText)
    
    let decrypted = ''
    for (let i = 0; i < decoded.length; i++) {
      const charCode = decoded.charCodeAt(i)
      const keyChar = ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length)
      const decryptedChar = charCode ^ keyChar
      decrypted += String.fromCharCode(decryptedChar)
    }
    
    return decrypted
  } catch (error) {
    console.error('Error al descifrar datos:', error)
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
      
      const decrypted = decrypt(encrypted)
      return JSON.parse(decrypted)
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
        // Intentar parsear como JSON (datos no cifrados)
        try {
          const parsed = JSON.parse(existingData)
          // Si se puede parsear, significa que no está cifrado
          secureStorage.setItem(key, parsed)
          console.log('Datos migrados a formato cifrado')
        } catch {
          // Si no se puede parsear, asumimos que ya está cifrado
          console.log('Los datos ya están cifrados')
        }
      }
    } catch (error) {
      console.error('Error al migrar datos:', error)
    }
  }
}

// Función para verificar si los datos necesitan migración
export function needsMigration(key: string): boolean {
  const data = localStorage.getItem(key)
  if (!data) return false
  
  try {
    // Si podemos parsearlo como JSON, necesita migración
    JSON.parse(data)
    return true
  } catch {
    // Si no se puede parsear, ya está cifrado
    return false
  }
}