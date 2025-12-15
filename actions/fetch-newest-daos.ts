"use server"

import { DuneClient } from "@duneanalytics/client-sdk"

// Define the type for the DAO data
export interface NewestDAO {
  name: string
  hasToken: boolean
  proposal_count?: number
  member_count?: number
  realm_address?: string
  account_newAccount?: string
  account_NewAccount?: string
  created_at?: string
}

export async function fetchNewestDAOs(): Promise<NewestDAO[]> {
  try {
    // IMPORTANT: This is only for testing purposes
    // In production, use environment variables instead
    const apiKey = process.env.DUNE_API_KEY || "ZAKViYDJuHF9y2LdpvYVqTAgYnAjG0nT"

    // Use the same query ID as in the Python example
    const dune = new DuneClient(apiKey)
    const queryResult = await dune.getLatestResult({ queryId: 4789765 })

    if (!queryResult || !queryResult.result || !queryResult.result.rows) {
      console.error("Invalid response from Dune API")
      return getFallbackDAOs()
    }

    // Debug: Log the first row to see its structure
    if (queryResult.result.rows.length > 0) {
      console.log("First row sample:", JSON.stringify(queryResult.result.rows[0], null, 2))
    }

    // Parse the result and extract the DAO names and token status
    const daos = queryResult.result.rows.map((row: any) => {
      let name = "Unknown DAO"
      let hasToken = false
      let proposal_count = undefined
      let member_count = undefined
      let realm_address = undefined
      let created_at = undefined

      // Check if there's a realm_json field that might contain the name
      if (row.realm_json && typeof row.realm_json === "string") {
        try {
          // This regex matches both quoted and unquoted name patterns:
          // name: "Value" or "name": "Value"
          const nameMatch = row.realm_json.match(/(?:name:|"name":)\s*"([^"]+)"/)
          if (nameMatch && nameMatch[1]) {
            name = nameMatch[1]
            console.log(`Found name in realm_json: ${name}`)
          }
        } catch (error) {
          console.error("Error extracting name from realm_json:", error)
        }
      }

      // If we couldn't find the name in realm_json, try other fields
      if (name === "Unknown DAO") {
        if (row.name) {
          name = row.name
        } else if (row.dao_name) {
          name = row.dao_name
        } else if (row.realm_name) {
          name = row.realm_name
        }
      }

      // Determine if the DAO has a token
      if ("has_token" in row) {
        hasToken = Boolean(row.has_token)
      } else if ("token_mint" in row) {
        hasToken = Boolean(row.token_mint)
      } else if ("governance_token" in row) {
        hasToken = Boolean(row.governance_token)
      } else if ("community_mint" in row) {
        hasToken = Boolean(row.community_mint)
      } else if (row.realm_json && row.realm_json.includes("use_council_mint: true")) {
        hasToken = true
      }

      // Extract additional information if available
      if ("proposal_count" in row) {
        proposal_count = row.proposal_count
      }

      if ("member_count" in row) {
        member_count = row.member_count
      }

      if ("realm_address" in row) {
        realm_address = row.realm_address
      } else if ("realm_id" in row) {
        realm_address = row.realm_id
      }

      if ("created_at" in row) {
        created_at = row.created_at
      } else if ("creation_date" in row) {
        created_at = row.creation_date
      }

      return {
        name: name,
        hasToken: hasToken,
        proposal_count: proposal_count,
        member_count: member_count,
        realm_address: realm_address,
        created_at: created_at,
        account_newAccount: row.account_newAccount,
        account_NewAccount: row.account_NewAccount,
      }
    })

    // Log the extracted DAOs
    console.log("Extracted DAOs:", daos)

    // Return only the 15 newest DAOs (increased from 10)
    return daos.slice(0, 15)
  } catch (error) {
    console.error("Error fetching newest DAOs from Dune:", error)
    return getFallbackDAOs()
  }
}

// Fallback data in case the API call fails
function getFallbackDAOs(): NewestDAO[] {
  return [
    { name: "Jupiter", hasToken: true, proposal_count: 12, member_count: 345 },
    { name: "Kamino", hasToken: true, proposal_count: 8, member_count: 156 },
    { name: "Drift", hasToken: true, proposal_count: 15, member_count: 278 },
    { name: "Zeta", hasToken: false, proposal_count: 3, member_count: 89 },
    { name: "Parcl", hasToken: false, proposal_count: 5, member_count: 124 },
    { name: "Marinade", hasToken: true, proposal_count: 21, member_count: 412 },
    { name: "Mango", hasToken: true, proposal_count: 18, member_count: 367 },
    { name: "Solend", hasToken: true, proposal_count: 14, member_count: 298 },
    { name: "Orca", hasToken: true, proposal_count: 11, member_count: 245 },
    { name: "Raydium", hasToken: true, proposal_count: 9, member_count: 189 },
    { name: "Pyth", hasToken: true, proposal_count: 7, member_count: 176 },
    { name: "Squads", hasToken: false, proposal_count: 4, member_count: 112 },
    { name: "Serum", hasToken: true, proposal_count: 16, member_count: 321 },
    { name: "Metaplex", hasToken: true, proposal_count: 10, member_count: 234 },
    { name: "Aurory", hasToken: true, proposal_count: 6, member_count: 145 },
  ]
}
