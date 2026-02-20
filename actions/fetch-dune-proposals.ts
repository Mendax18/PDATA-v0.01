"use server"

import { DuneClient } from "@duneanalytics/client-sdk"

export type DailyProposalData = {
  day: string
  originalDate: string // Store the original date string for sorting
  proposals: number
}

// Using Dune query ID 5065223 for daily proposal data
export async function fetchDuneProposals(): Promise<DailyProposalData[]> {
  try {
    // Create a Dune client with the API key from environment variables
    const dune = new DuneClient(process.env.DUNE_API_KEY || "")

    // Fetch the latest result for query ID 4863662
    const queryResult = await dune.getLatestResult({ queryId: 5065223 })

    if (!queryResult || !queryResult.result || !queryResult.result.rows) {
      console.error("No data returned from Dune query")
      return []
    }

    // Log the first row to understand the structure
    if (queryResult.result.rows.length > 0) {
      console.log("Sample row from Dune query:", JSON.stringify(queryResult.result.rows[0]))
    }

    // Transform the data into the format needed for the chart
    const formattedData = queryResult.result.rows
      .map((row: any) => {
        // Look for any date/time field using case-insensitive matching
        let dateValue = null

        // Check for common date field names with case insensitivity
        const possibleDateFields = ["proposal_creation_time", "date", "time", "created_at", "timestamp", "day"]

        for (const field of possibleDateFields) {
          // Check for the field in both lowercase and uppercase
          const value = row[field] || row[field.toUpperCase()] || row[field.toLowerCase()]
          if (value) {
            dateValue = value
            break
          }
        }

        // If we still don't have a date, try to find any field that looks like a date
        if (!dateValue) {
          for (const key in row) {
            const value = row[key]
            if (typeof value === "string" && (value.includes("-") || value.includes("/") || value.includes(":"))) {
              dateValue = value
              break
            }
          }
        }

        if (!dateValue) {
          console.warn("Missing date in row:", row)
          return null
        }

        // Store the original date string for sorting
        const originalDate = dateValue.toString()

        // Parse the date - ensure it's a valid date object
        let dateObj
        try {
          dateObj = new Date(dateValue)
          // Check if date is valid
          if (isNaN(dateObj.getTime())) {
            console.warn("Invalid date value:", dateValue)
            return null
          }
        } catch (e) {
          console.error("Error parsing date:", dateValue, e)
          return null
        }

        // Format the date as "MMM D" (e.g., "Mar 15")
        const day = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" })

        // Extract the proposals_created field (handle different possible field names)
        let proposalsCount = 0
        const possibleProposalFields = ["proposals_created", "proposal_count", "count", "proposals"]

        for (const field of possibleProposalFields) {
          // Check for the field in both lowercase and uppercase
          const value = row[field] || row[field.toUpperCase()] || row[field.toLowerCase()]
          if (value !== undefined && !isNaN(Number(value))) {
            proposalsCount = Number(value)
            break
          }
        }

        return {
          day,
          originalDate,
          proposals: proposalsCount,
        }
      })
      .filter(Boolean) // Remove any null entries

    // Sort the data by date to ensure proper chronological order
    formattedData.sort((a, b) => {
      // Use the original date strings for sorting
      const dateA = new Date(a.originalDate)
      const dateB = new Date(b.originalDate)

      // Fallback to string comparison if date parsing fails
      if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
        return a.originalDate.localeCompare(b.originalDate)
      }

      return dateA.getTime() - dateB.getTime()
    })

    return formattedData
  } catch (error) {
    console.error("Error fetching Dune data:", error)
    return []
  }
}
