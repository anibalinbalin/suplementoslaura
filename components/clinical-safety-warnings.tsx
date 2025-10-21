"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  AlertTriangle,
  AlertCircle,
  Info,
  ShieldAlert,
  X,
  CheckCircle
} from "lucide-react"
import type { SafetyWarning } from "@/lib/clinical-safety"

interface ClinicalSafetyWarningsProps {
  warnings: SafetyWarning[]
  supplementName: string
}

interface DisclaimerProps {
  disclaimer: {
    level: 'STANDARD' | 'ENHANCED' | 'CRITICAL'
    primaryDisclaimer: string
    specificWarnings: string[]
    actionRequired?: string
    professionalConsultRequired: boolean
  }
}

/**
 * Display clinical safety warnings for a specific supplement
 */
export function ClinicalSafetyWarnings({ warnings, supplementName }: ClinicalSafetyWarningsProps) {
  if (!warnings || warnings.length === 0) {
    return null
  }

  // Group warnings by severity
  const criticalWarnings = warnings.filter(w => w.severity === 'CRITICAL')
  const majorWarnings = warnings.filter(w => w.severity === 'MAJOR')
  const moderateWarnings = warnings.filter(w => w.severity === 'MODERATE')
  const minorWarnings = warnings.filter(w => w.severity === 'MINOR' || w.severity === 'INFO')

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'bg-red-100 border-red-500 text-red-900'
      case 'MAJOR': return 'bg-orange-100 border-orange-500 text-orange-900'
      case 'MODERATE': return 'bg-yellow-100 border-yellow-500 text-yellow-900'
      case 'MINOR': return 'bg-blue-100 border-blue-500 text-blue-900'
      case 'INFO': return 'bg-gray-100 border-gray-500 text-gray-900'
      default: return 'bg-gray-100 border-gray-500 text-gray-900'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return <X className="h-5 w-5" />
      case 'MAJOR': return <AlertTriangle className="h-5 w-5" />
      case 'MODERATE': return <AlertCircle className="h-5 w-5" />
      case 'MINOR': return <Info className="h-5 w-5" />
      case 'INFO': return <Info className="h-5 w-5" />
      default: return <Info className="h-5 w-5" />
    }
  }

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      'UPPER_LIMIT': 'Límite Superior Excedido',
      'CONTRAINDICATION': 'Contraindicación',
      'DRUG_INTERACTION': 'Interacción Medicamentosa',
      'NUTRIENT_CONFLICT': 'Conflicto Nutricional',
      'QUALITY': 'Recomendación de Calidad'
    }
    return labels[category] || category
  }

  return (
    <div className="space-y-3 mt-4">
      <div className="flex items-center gap-2 mb-2">
        <ShieldAlert className="h-5 w-5 text-red-600" />
        <h4 className="font-semibold text-gray-900">Advertencias Clínicas - {supplementName}</h4>
      </div>

      {/* Critical Warnings */}
      {criticalWarnings.map((warning, idx) => (
        <Alert key={`critical-${idx}`} className={getSeverityColor('CRITICAL') + ' border-l-4'}>
          <div className="flex items-start gap-3">
            {getSeverityIcon('CRITICAL')}
            <div className="flex-1">
              <AlertTitle className="text-base font-bold mb-2">
                🚨 CRÍTICO: {getCategoryLabel(warning.category)}
              </AlertTitle>
              <AlertDescription className="space-y-2">
                <p className="font-medium">{warning.message}</p>
                <p className="text-sm border-t border-red-300 pt-2 mt-2">
                  <strong>Recomendación:</strong> {warning.recommendation}
                </p>
              </AlertDescription>
            </div>
          </div>
        </Alert>
      ))}

      {/* Major Warnings */}
      {majorWarnings.map((warning, idx) => (
        <Alert key={`major-${idx}`} className={getSeverityColor('MAJOR') + ' border-l-4'}>
          <div className="flex items-start gap-3">
            {getSeverityIcon('MAJOR')}
            <div className="flex-1">
              <AlertTitle className="text-base font-semibold mb-2">
                ⚠️ IMPORTANTE: {getCategoryLabel(warning.category)}
              </AlertTitle>
              <AlertDescription className="space-y-2">
                <p>{warning.message}</p>
                <p className="text-sm border-t border-orange-300 pt-2 mt-2">
                  <strong>Recomendación:</strong> {warning.recommendation}
                </p>
              </AlertDescription>
            </div>
          </div>
        </Alert>
      ))}

      {/* Moderate Warnings */}
      {moderateWarnings.map((warning, idx) => (
        <Alert key={`moderate-${idx}`} className={getSeverityColor('MODERATE') + ' border-l-4'}>
          <div className="flex items-start gap-3">
            {getSeverityIcon('MODERATE')}
            <div className="flex-1">
              <AlertTitle className="text-sm font-semibold mb-1">
                {getCategoryLabel(warning.category)}
              </AlertTitle>
              <AlertDescription className="text-sm">
                <p>{warning.message}</p>
                <p className="text-xs mt-1 italic">{warning.recommendation}</p>
              </AlertDescription>
            </div>
          </div>
        </Alert>
      ))}

      {/* Minor/Info Warnings */}
      {minorWarnings.map((warning, idx) => (
        <Alert key={`minor-${idx}`} className={getSeverityColor(warning.severity) + ' border-l-4'}>
          <div className="flex items-start gap-3">
            {getSeverityIcon(warning.severity)}
            <div className="flex-1">
              <AlertTitle className="text-sm font-medium mb-1">
                {getCategoryLabel(warning.category)}
              </AlertTitle>
              <AlertDescription className="text-sm">
                <p>{warning.message}</p>
                {warning.recommendation && (
                  <p className="text-xs mt-1 text-gray-600">{warning.recommendation}</p>
                )}
              </AlertDescription>
            </div>
          </div>
        </Alert>
      ))}
    </div>
  )
}

/**
 * Display overall clinical disclaimer
 */
export function ClinicalDisclaimer({ disclaimer }: DisclaimerProps) {
  const getDisclaimerColor = (level: string) => {
    switch (level) {
      case 'CRITICAL': return 'bg-red-50 border-red-600'
      case 'ENHANCED': return 'bg-orange-50 border-orange-600'
      case 'STANDARD': return 'bg-blue-50 border-blue-600'
      default: return 'bg-gray-50 border-gray-600'
    }
  }

  const getDisclaimerIcon = (level: string) => {
    switch (level) {
      case 'CRITICAL': return <ShieldAlert className="h-6 w-6 text-red-600" />
      case 'ENHANCED': return <AlertTriangle className="h-6 w-6 text-orange-600" />
      case 'STANDARD': return <Info className="h-6 w-6 text-blue-600" />
      default: return <Info className="h-6 w-6 text-gray-600" />
    }
  }

  const getDisclaimerTitle = (level: string) => {
    switch (level) {
      case 'CRITICAL': return '🚨 ALERTA CRÍTICA - Revisión Profesional Obligatoria'
      case 'ENHANCED': return '⚠️ IMPORTANTE - Consulta Profesional Recomendada'
      case 'STANDARD': return 'ℹ️ Información Importante'
      default: return 'Información'
    }
  }

  return (
    <Card className={`border-l-4 ${getDisclaimerColor(disclaimer.level)} shadow-lg`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          {getDisclaimerIcon(disclaimer.level)}
          <span>{getDisclaimerTitle(disclaimer.level)}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Action Required (if critical/enhanced) */}
        {disclaimer.actionRequired && (
          <Alert className="bg-yellow-100 border-yellow-600 border-l-4">
            <AlertTriangle className="h-5 w-5 text-yellow-700" />
            <AlertTitle className="text-yellow-900 font-bold">Acción Requerida</AlertTitle>
            <AlertDescription className="text-yellow-800">
              {disclaimer.actionRequired}
            </AlertDescription>
          </Alert>
        )}

        {/* Specific Warnings */}
        {disclaimer.specificWarnings.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-900">Advertencias Específicas:</h4>
            <div className="space-y-2">
              {disclaimer.specificWarnings.map((warning, idx) => (
                <div key={idx} className="bg-white p-3 rounded-md border border-gray-200 text-sm whitespace-pre-line">
                  {warning}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Primary Disclaimer */}
        <div className="bg-white p-4 rounded-md border border-gray-300">
          <div className="prose prose-sm max-w-none whitespace-pre-line text-gray-700">
            {disclaimer.primaryDisclaimer}
          </div>
        </div>

        {/* Professional Consult Badge */}
        {disclaimer.professionalConsultRequired && (
          <div className="flex items-center gap-2 justify-center p-3 bg-orange-100 rounded-md border border-orange-400">
            <ShieldAlert className="h-5 w-5 text-orange-700" />
            <span className="text-orange-900 font-semibold">
              Consulta profesional requerida antes de iniciar suplementación
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

/**
 * Display drug-nutrient depletion warnings
 */
export function DrugDepletionWarnings({ warnings }: { warnings: SafetyWarning[] }) {
  if (!warnings || warnings.length === 0) {
    return null
  }

  return (
    <Card className="border-l-4 border-purple-600 bg-purple-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-900">
          <AlertCircle className="h-5 w-5" />
          Nutrientes Posiblemente Deficientes por Medicamentos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-purple-800 mb-4">
          Los siguientes medicamentos que tomas pueden estar causando deficiencias nutricionales:
        </p>
        <div className="space-y-3">
          {warnings.map((warning, idx) => (
            <Alert key={idx} className="bg-white border-purple-300">
              <Info className="h-4 w-4 text-purple-700" />
              <AlertTitle className="text-purple-900 font-semibold">
                {warning.supplementName}
              </AlertTitle>
              <AlertDescription className="text-purple-800 text-sm">
                <p>{warning.message}</p>
                <p className="mt-2 text-xs font-medium">{warning.recommendation}</p>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
