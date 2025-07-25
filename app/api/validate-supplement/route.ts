// Add a new API route for validating supplement information
import { NextResponse } from "next/server"
import { validateSupplementInfo, getSupplementDebugInfo } from "@/lib/examine-data-es"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { supplementName, infoType, content } = body

    if (!supplementName || !infoType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // If content is provided, validate specific content
    if (content) {
      const isValid = validateSupplementInfo(supplementName, infoType, content)
      return NextResponse.json({ isValid })
    }

    // If no content is provided, return all available data for the supplement
    const supplementInfo = getSupplementDebugInfo(supplementName)
    return NextResponse.json(supplementInfo)
  } catch (error) {
    console.error("Error validating supplement info:", error)
    return NextResponse.json({ error: "Failed to validate supplement information" }, { status: 500 })
  }
}
