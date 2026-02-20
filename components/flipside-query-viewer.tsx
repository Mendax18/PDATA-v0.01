"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { runFlipsideQueryById } from "@/actions/flipside-query-by-id"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function FlipsideQueryViewer({ queryId }: { queryId: string }) {
  const [data, setData] = useState<any[] | null>(null)
  const [columns, setColumns] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)

    try {
      const result = await runFlipsideQueryById(queryId)

      if (result.success && result.data) {
        // Get the records
        const records = result.data.records || []
        setData(records)

        // Extract column names from the first record
        if (records.length > 0) {
          setColumns(Object.keys(records[0]))
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
  }, [queryId])

  return (
    <Card className="bg-black/50 backdrop-blur-lg border-orange-600/30 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-orange-400">Query Results: {queryId}</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchData}
          disabled={loading}
          className="border-orange-600/30 text-orange-400"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Refresh"}
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-[300px]">
            <Loader2 className="h-8 w-8 animate-spin text-orange-400" />
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-[100px] text-red-400">
            <p>Error: {error}</p>
          </div>
        ) : data === null || data.length === 0 ? (
          <div className="flex justify-center items-center h-[100px] text-gray-400">
            <p>No data available</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-orange-900/30">
                  {columns.map((column) => (
                    <TableHead key={column} className="text-orange-400">
                      {column}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.slice(0, 10).map((row, rowIndex) => (
                  <TableRow key={rowIndex} className="border-b border-orange-900/30 hover:bg-orange-950/40">
                    {columns.map((column) => (
                      <TableCell key={column} className="text-white">
                        {typeof row[column] === "object"
                          ? JSON.stringify(row[column])
                          : String(row[column] !== null ? row[column] : "null")}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {data.length > 10 && (
              <div className="text-center mt-4 text-sm text-gray-400">Showing 10 of {data.length} rows</div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
