"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DebugDuneDataProps {
  queryId: number
}

export function DebugDuneData({ queryId }: DebugDuneDataProps) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showData, setShowData] = useState(false)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/dune-debug?queryId=${queryId}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      setData(result)
      setShowData(true)
    } catch (err) {
      console.error("Error fetching Dune data:", err)
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-4">
      <Button onClick={fetchData} disabled={loading} variant="outline" size="sm" className="text-xs">
        {loading ? "Loading..." : "Debug Dune Data"}
      </Button>

      {error && <div className="mt-2 p-2 bg-red-900/30 text-red-400 text-xs rounded">Error: {error}</div>}

      {showData && data && (
        <Card className="mt-2 bg-black/70 border-orange-900/30">
          <CardHeader className="py-2">
            <CardTitle className="text-sm text-orange-400">Dune Query Result</CardTitle>
            <Button
              onClick={() => setShowData(false)}
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 h-6 w-6 p-0"
            >
              ×
            </Button>
          </CardHeader>
          <CardContent className="py-2">
            <pre className="text-xs overflow-auto max-h-60 p-2 bg-black/50 rounded">
              {JSON.stringify(data, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
