"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { runFlipsideQuery } from "@/actions/flipside-query"
import { Loader2 } from "lucide-react"

export function FlipsideDebug() {
  const [sql, setSql] = useState(`
SELECT 
  date_trunc('day', block_timestamp) as day,
  count(distinct tx_id) as tx_count
FROM solana.core.fact_transactions 
WHERE block_timestamp >= CURRENT_DATE - interval '7 days'
GROUP BY 1
ORDER BY 1 ASC
  `)
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const executeQuery = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const queryResult = await runFlipsideQuery(sql)

      if (queryResult.success) {
        setResult(queryResult.data)
      } else {
        setError(queryResult.error || "Failed to execute query")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="bg-black/50 backdrop-blur-lg border-orange-600/30 shadow-lg">
      <CardHeader>
        <CardTitle className="text-orange-400">Flipside Query Debugger</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Textarea
            value={sql}
            onChange={(e) => setSql(e.target.value)}
            className="min-h-[200px] bg-black/30 border-gray-700 text-white font-mono"
            placeholder="Enter SQL query..."
          />

          <Button
            onClick={executeQuery}
            disabled={loading}
            className="bg-orange-900/50 text-orange-400 hover:bg-orange-800/70"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Execute Query
          </Button>

          {error && (
            <div className="p-4 bg-red-900/30 text-red-400 rounded-md">
              <p className="font-bold">Error:</p>
              <p>{error}</p>
            </div>
          )}

          {result && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-orange-400">Query Results:</h3>
              <div className="bg-black/30 p-4 rounded-md overflow-auto max-h-[400px]">
                <pre className="text-xs text-white">{JSON.stringify(result, null, 2)}</pre>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
