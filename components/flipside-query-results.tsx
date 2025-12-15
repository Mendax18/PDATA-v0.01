"use client"

import { useState, useEffect } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { getSolanaDAOTransactions, getDAOGovernanceProposals } from "@/actions/flipside-query"

interface FlipsideQueryResultsProps {
  queryType: "transactions" | "proposals"
  title: string
  description?: string
}

export function FlipsideQueryResults({ queryType, title, description }: FlipsideQueryResultsProps) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [timeRange, setTimeRange] = useState("7")

  const fetchData = async () => {
    setLoading(true)
    setError(null)

    try {
      let result

      if (queryType === "transactions") {
        result = await getSolanaDAOTransactions(Number.parseInt(timeRange))
      } else {
        result = await getDAOGovernanceProposals(Number.parseInt(timeRange))
      }

      if (result.success && result.data) {
        // Format the data for charts
        const formattedData = result.data.records.map((record: any) => {
          // Format date to be more readable
          const date = new Date(record.DAY)
          const formattedDate = date.toLocaleDateString("en-US", { month: "short", day: "numeric" })

          if (queryType === "transactions") {
            return {
              day: formattedDate,
              transactions: record.TX_COUNT,
            }
          } else {
            return {
              day: formattedDate,
              program: record.PROGRAM_ID.substring(0, 8) + "...",
              proposals: record.PROPOSAL_COUNT,
            }
          }
        })

        setData(formattedData)
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
  }, [timeRange, queryType])

  const renderChart = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-[300px]">
          <Loader2 className="h-8 w-8 animate-spin text-orange-400" />
        </div>
      )
    }

    if (error) {
      return (
        <div className="flex justify-center items-center h-[300px] text-red-400">
          <p>Error: {error}</p>
        </div>
      )
    }

    if (data.length === 0) {
      return (
        <div className="flex justify-center items-center h-[300px] text-gray-400">
          <p>No data available</p>
        </div>
      )
    }

    if (queryType === "transactions") {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis dataKey="day" stroke="#ffffff80" />
            <YAxis stroke="#ffffff80" />
            <Tooltip contentStyle={{ backgroundColor: "#000000", border: "none" }} />
            <Legend />
            <Line type="monotone" dataKey="transactions" name="Transactions" stroke="#f97316" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      )
    } else {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis dataKey="day" stroke="#ffffff80" />
            <YAxis stroke="#ffffff80" />
            <Tooltip contentStyle={{ backgroundColor: "#000000", border: "none" }} />
            <Legend />
            <Bar dataKey="proposals" name="Proposals" fill="#f97316" />
          </BarChart>
        </ResponsiveContainer>
      )
    }
  }

  return (
    <Card className="bg-black/50 backdrop-blur-lg border-orange-600/30 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-orange-400">{title}</CardTitle>
          {description && <CardDescription className="text-orange-300">{description}</CardDescription>}
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px] bg-black/30 border-orange-600/30">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent className="bg-black/90 border-orange-600/30">
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="14">Last 14 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchData}
            disabled={loading}
            className="border-orange-600/30 text-orange-400"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Refresh"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>{renderChart()}</CardContent>
    </Card>
  )
}
