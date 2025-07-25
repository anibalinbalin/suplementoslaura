"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { SupplementRecommendation } from "@/lib/gemini-service"
import type { BloodTestResult } from "@/lib/blood-markers"

interface UserProfile {
  gender: "male" | "female" | null
  age: number | null
  healthGoals: string[]
  dietaryRestrictions: string[]
  allergies: string
  medications: string
  recommendations: SupplementRecommendation[]
  bloodTestResults: BloodTestResult[]
  bloodTestDate: string | null
}

interface UserContextType {
  userProfile: UserProfile
  setGender: (gender: "male" | "female") => void
  setAge: (age: number) => void
  setHealthGoals: (goals: string[]) => void
  setDietaryRestrictions: (restrictions: string[]) => void
  setAllergies: (allergies: string) => void
  setMedications: (medications: string) => void
  setRecommendations: (recommendations: SupplementRecommendation[]) => void
  setBloodTestResults: (results: BloodTestResult[], date?: string) => void
  resetProfile: () => void
}

const initialProfile: UserProfile = {
  gender: null,
  age: null,
  healthGoals: [],
  dietaryRestrictions: [],
  allergies: "",
  medications: "",
  recommendations: [],
  bloodTestResults: [],
  bloodTestDate: null,
}

const UserContext = createContext<UserContextType | undefined>(undefined)

const STORAGE_KEY = 'suplementos-uruguay-profile'

export function UserProvider({ children }: { children: ReactNode }) {
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    // Intenta cargar el perfil desde localStorage al iniciar
    if (typeof window !== 'undefined') {
      const savedProfile = localStorage.getItem(STORAGE_KEY)
      if (savedProfile) {
        try {
          const parsed = JSON.parse(savedProfile)
          // Convert date strings back to Date objects for bloodTestResults
          if (parsed.bloodTestResults) {
            parsed.bloodTestResults = parsed.bloodTestResults.map((result: any) => ({
              ...result,
              date: new Date(result.date)
            }))
          }
          return parsed
        } catch (e) {
          console.error('Error loading saved profile:', e)
        }
      }
    }
    return initialProfile
  })

  // Guardar en localStorage cuando el perfil cambie
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userProfile))
    }
  }, [userProfile])

  const setGender = (gender: "male" | "female") => {
    setUserProfile((prev) => ({ ...prev, gender }))
  }

  const setAge = (age: number) => {
    setUserProfile((prev) => ({ ...prev, age }))
  }

  const setHealthGoals = (goals: string[]) => {
    setUserProfile((prev) => ({ ...prev, healthGoals: goals }))
  }

  const setDietaryRestrictions = (restrictions: string[]) => {
    setUserProfile((prev) => ({ ...prev, dietaryRestrictions: restrictions }))
  }

  const setAllergies = (allergies: string) => {
    setUserProfile((prev) => ({ ...prev, allergies }))
  }

  const setMedications = (medications: string) => {
    setUserProfile((prev) => ({ ...prev, medications }))
  }

  const setRecommendations = (recommendations: SupplementRecommendation[]) => {
    setUserProfile((prev) => ({ ...prev, recommendations }))
  }

  const setBloodTestResults = (results: BloodTestResult[], date?: string) => {
    setUserProfile((prev) => ({ 
      ...prev, 
      bloodTestResults: results,
      bloodTestDate: date || new Date().toISOString().split('T')[0]
    }))
  }

  const resetProfile = () => {
    setUserProfile(initialProfile)
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  return (
    <UserContext.Provider
      value={{
        userProfile,
        setGender,
        setAge,
        setHealthGoals,
        setDietaryRestrictions,
        setAllergies,
        setMedications,
        setRecommendations,
        setBloodTestResults,
        resetProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
