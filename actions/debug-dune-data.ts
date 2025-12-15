"use server"

import { DuneClient } from "@duneanalytics/client-sdk"

export async function debugDuneData() {
  try {
    const apiKey = process.env.DUNE_API_KEY

    if (!apiKey) {
      return {
        error: "DUNE_API_KEY environment variable is not set",
        environmentVariables: Object.keys(process.env).filter((key) => !key.includes("SECRET") && !key.includes("KEY")),
      }
    }

    const dune = new DuneClient(apiKey)
    const queryResult = await dune.getLatestResult({ queryId: 4789765 })

    if (!queryResult || !queryResult.result || !queryResult.result.rows) {
      return { error: "Invalid response from Dune API" }
    }

    // Get the first row as a sample
    const sampleRow = queryResult.result.rows[0]

    // Extract the column names
    const columnNames = Object.keys(sampleRow)

    // Get a sample of the data
    const sampleData = queryResult.result.rows.slice(0, 3).map((row) => {
      const processedRow: Record<string, any> = {}

      for (const key of columnNames) {
        // For string values, show a preview
        if (typeof row[key] === "string") {
          processedRow[key] =
            row[key].length > 50 ? `${row[key].substring(0, 50)}... (${row[key].length} chars)` : row[key]
        } else {
          processedRow[key] = row[key]
        }
      }

      return processedRow
    })

    return {
      success: true,
      columnNames,
      sampleData,
      rowCount: queryResult.result.rows.length,
    }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    }
  }
}
