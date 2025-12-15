"use server"

import { Flipside } from "@flipsidecrypto/sdk"

// Define the response type
export interface FlipsideQueryResult {
  success: boolean
  data?: any
  error?: string
}

export async function runFlipsideQuery(sqlQuery: string): Promise<FlipsideQueryResult> {
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

    // Send the Query to Flipside's query engine and await the results
    const queryResultSet = await flipside.query.run({ sql: sqlQuery })

    return {
      success: true,
      data: queryResultSet,
    }
  } catch (error) {
    console.error("Error running Flipside query:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

// Example query for Solana DAO transactions
export async function getSolanaDAOTransactions(days = 7): Promise<FlipsideQueryResult> {
  const sql = `
    SELECT 
      date_trunc('day', block_timestamp) as day,
      count(distinct tx_id) as tx_count
    FROM solana.core.fact_transactions 
    WHERE block_timestamp >= CURRENT_DATE - interval '${days} days'
    GROUP BY 1
    ORDER BY 1 ASC
  `

  return runFlipsideQuery(sql)
}

// Example query for DAO governance proposals
export async function getDAOGovernanceProposals(days = 30): Promise<FlipsideQueryResult> {
  const sql = `
    SELECT 
      date_trunc('day', block_timestamp) as day,
      program_id,
      count(*) as proposal_count
    FROM solana.core.fact_events
    WHERE block_timestamp >= CURRENT_DATE - interval '${days} days'
      AND program_id IN (
        -- Realms/SPL Governance program ID
        'GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw',
        -- Other DAO governance programs can be added here
        'GTesTBiEWE32WHXXE2S4XbZvA5CrEc4xs6ZgRe895dP'
      )
    GROUP BY 1, 2
    ORDER BY 1 ASC, 3 DESC
  `

  return runFlipsideQuery(sql)
}
