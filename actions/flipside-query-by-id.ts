"use server"

import { Flipside } from "@flipsidecrypto/sdk"

// Define the response type
export interface FlipsideQueryResult {
  success: boolean
  data?: any
  error?: string
}

export async function runFlipsideQueryById(queryId: string): Promise<FlipsideQueryResult> {
  try {
    // Get API key from environment variables
    const apiKey = process.env.FLIPSIDE_API_KEY

    if (!apiKey) {
      return {
        success: false,
        error: "FLIPSIDE_API_KEY environment variable is not set",
      }
    }

    // Initialize Flipside with your API key
    const flipside = new Flipside(apiKey, "https://api-v2.flipsidecrypto.xyz")

    // Run the query by ID
    const queryResultSet = await flipside.query.run({
      queryRunId: queryId,
    })

    return {
      success: true,
      data: queryResultSet,
    }
  } catch (error) {
    console.error("Error running Flipside query by ID:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

// Function to get FungiDAO TVL data
export async function getFungiDAOTVL(): Promise<FlipsideQueryResult> {
  // Use the specific query ID provided
  return runFlipsideQueryById("1bd04384-6f5e-4c3a-b31f-157dde736751")
}
