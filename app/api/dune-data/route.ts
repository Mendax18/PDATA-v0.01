import { type NextRequest, NextResponse } from "next/server"
import { DuneClient } from "@duneanalytics/client-sdk"

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.DUNE_API_KEY

    if (!apiKey) {
      // Return a more helpful error message
      return NextResponse.json(
        {
          error: "DUNE_API_KEY environment variable is not set",
          note: "This API route requires the DUNE_API_KEY environment variable to be set in your Vercel project.",
          possibleSolution: "Make sure the environment variable is set and that it is exposed to API routes.",
        },
        { status: 500 },
      )
    }

    const dune = new DuneClient(apiKey)
    const queryResult = await dune.getLatestResult({ queryId: 4789765 })

    if (!queryResult || !queryResult.result || !queryResult.result.rows) {
      return NextResponse.json({ error: "Invalid response from Dune API" }, { status: 500 })
    }

    // Extract column names
    const columnNames = queryResult.result.metadata?.column_names || []

    // Process the first few rows to get a sample
    const sampleRows = queryResult.result.rows.slice(0, 5).map((row) => {
      // Create a simplified version of each row
      const simplifiedRow: Record<string, any> = {}

      // Add all fields to the simplified row
      Object.keys(row).forEach((key) => {
        if (typeof row[key] === "string" && row[key].length > 100) {
          // Truncate long strings
          simplifiedRow[key] = row[key].substring(0, 100) + "..."
        } else {
          simplifiedRow[key] = row[key]
        }
      })

      return simplifiedRow
    })

    return NextResponse.json({
      columnNames,
      sampleRows,
      rowCount: queryResult.result.rows.length,
    })
  } catch (error) {
    console.error("Error in Dune data API:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}
