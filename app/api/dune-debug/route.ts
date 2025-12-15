import { type NextRequest, NextResponse } from "next/server"
import { DuneClient } from "@duneanalytics/client-sdk"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const queryId = searchParams.get("queryId")

    if (!queryId) {
      return NextResponse.json({ error: "Missing queryId parameter" }, { status: 400 })
    }

    const apiKey = process.env.DUNE_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: "DUNE_API_KEY environment variable is not set" }, { status: 500 })
    }

    const dune = new DuneClient(apiKey)
    const queryResult = await dune.getLatestResult({ queryId: Number.parseInt(queryId) })

    // Return a sample of the data to avoid large responses
    const sampleData = {
      metadata: queryResult.metadata,
      result: {
        rows: queryResult.result?.rows?.slice(0, 3) || [],
        metadata: queryResult.result?.metadata,
      },
    }

    return NextResponse.json(sampleData)
  } catch (error) {
    console.error("Error in Dune debug API:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}
