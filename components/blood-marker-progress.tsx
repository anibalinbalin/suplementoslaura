"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface BloodMarkerProgressProps {
  value: number
  ranges: {
    min: number
    max: number
    status: string
    color: string
  }[]
  unit: string
  optimalRange?: { min: number; max: number }
  size?: "sm" | "md" | "lg"
  showLabels?: boolean
}

export function BloodMarkerProgress({
  value,
  ranges,
  unit,
  optimalRange,
  size = "md",
  showLabels = true,
}: BloodMarkerProgressProps) {
  // Calculate the overall min and max from all ranges
  const overallMin = Math.min(...ranges.map(r => r.min))
  const overallMax = Math.max(...ranges.map(r => r.max))
  
  // Calculate position of value as percentage
  const valuePosition = ((value - overallMin) / (overallMax - overallMin)) * 100

  // Height based on size
  const heights = {
    sm: "h-4",
    md: "h-6",
    lg: "h-8"
  }

  return (
    <div className="w-full">
      <div className={cn("relative w-full rounded-full overflow-hidden bg-gray-200", heights[size])}>
        {/* Render range segments */}
        {ranges.map((range, index) => {
          const rangeStart = ((range.min - overallMin) / (overallMax - overallMin)) * 100
          const rangeWidth = ((range.max - range.min) / (overallMax - overallMin)) * 100
          
          return (
            <div
              key={index}
              className={cn("absolute h-full", range.color)}
              style={{
                left: `${rangeStart}%`,
                width: `${rangeWidth}%`
              }}
            />
          )
        })}
        
        {/* Optimal range indicator if provided */}
        {optimalRange && (
          <div
            className="absolute h-full border-2 border-green-600 rounded"
            style={{
              left: `${((optimalRange.min - overallMin) / (overallMax - overallMin)) * 100}%`,
              width: `${((optimalRange.max - optimalRange.min) / (overallMax - overallMin)) * 100}%`
            }}
          />
        )}
        
        {/* Value indicator */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-black"
          style={{ left: `${valuePosition}%` }}
        >
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-black rounded-full" />
        </div>
      </div>
      
      {/* Labels */}
      {showLabels && (
        <div className="flex justify-between mt-1 text-xs text-gray-600">
          <span>{overallMin} {unit}</span>
          {optimalRange && (
            <span className="text-green-600 font-medium">
              Óptimo: {optimalRange.min}-{optimalRange.max} {unit}
            </span>
          )}
          <span>{overallMax} {unit}</span>
        </div>
      )}
      
      {/* Current value */}
      <div className="text-center mt-2">
        <span className="text-sm font-medium">Tu valor: {value} {unit}</span>
      </div>
    </div>
  )
}