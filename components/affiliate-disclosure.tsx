import { Info } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface AffiliateDisclosureProps {
  variant?: "inline" | "footer" | "alert"
  className?: string
}

export function AffiliateDisclosure({ variant = "inline", className = "" }: AffiliateDisclosureProps) {
  const disclosure = "Enlaces de afiliados: Podemos recibir una comisión sin costo adicional para ti si realizas una compra a través de estos enlaces."
  
  if (variant === "alert") {
    return (
      <Alert className={`border-amber-200 bg-amber-50 ${className}`}>
        <Info className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800 text-sm">
          {disclosure}
        </AlertDescription>
      </Alert>
    )
  }
  
  if (variant === "footer") {
    return (
      <div className={`text-xs text-gray-500 ${className}`}>
        <p className="flex items-center gap-1">
          <Info className="h-3 w-3" />
          {disclosure}
        </p>
      </div>
    )
  }
  
  // Default inline variant
  return (
    <p className={`text-xs text-gray-600 flex items-center gap-1 ${className}`}>
      <Info className="h-3 w-3" />
      <span>{disclosure}</span>
    </p>
  )
}