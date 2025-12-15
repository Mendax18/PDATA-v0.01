"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, RefreshCw } from "lucide-react"
import { getFungiDAOTVL } from "@/actions/flipside-query-by-id"

export function FungiDAOTVL({ onTVLUpdate }: { onTVLUpdate: (tvl: number) => void }) {
  const [tvl, setTvl] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)

    try {
      const result = await getFungiDAOTVL()

      if (result.success && result.data) {
        // Find the TOTAL_TVL_USD value in the result
        const fungiData = result.data.records.find(
          (record: any) => record.DAO_NAME === "FungiDAO" || record.NAME === "FungiDAO",
        )

        if (fungiData && (fungiData.TOTAL_TVL_USD !== undefined || fungiData.TVL !== undefined)) {
          const tvlValue = fungiData.TOTAL_TVL_USD || fungiData.TVL || 0
          setTvl(tvlValue)
          // Call the callback to update the parent component
          onTVLUpdate(tvlValue)
        } else {
          setError("FungiDAO TVL data not found in query results")
        }
      } else {
        setError(result.error || "Failed to fetch data")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Card className="bg-black/50 backdrop-blur-lg border-green-600/30 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-green-400">FungiDAO Treasury Value</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchData}
          disabled={loading}
          className="border-green-600/30 text-green-400"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-[100px]">
            <Loader2 className="h-8 w-8 animate-spin text-green-400" />
          </div>
        ) : error ? (
          <div className="text-red-400 text-sm">
            <p>Error: {error}</p>
          </div>
        ) : tvl !== null ? (
          <div className="text-2xl font-bold text-white">
            ${tvl.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </div>
        ) : (
          <div className="text-gray-400">No data available</div>
        )}
        <p className="text-xs text-green-400 mt-1">Data from Flipside Query</p>
      </CardContent>
    </Card>
  )
}
