"use client"

import { useMemo, useState } from "react"
import { Activity, Search, TrendingUp, Vote } from "lucide-react"
import { futardioStats, metaDaoMarkets, metaDaoMetrics } from "@/data/protocol-analytics"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const metricIcons = [Activity, TrendingUp, Vote, Search]

export function MetaDAOEcosystem() {
  const [query, setQuery] = useState("")

  const filteredMarkets = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return metaDaoMarkets

    return metaDaoMarkets.filter(
      (market) =>
        market.organization.toLowerCase().includes(normalizedQuery) ||
        market.title.toLowerCase().includes(normalizedQuery) ||
        market.status.toLowerCase().includes(normalizedQuery),
    )
  }, [query])

  return (
    <Card className="mb-6 border-orange-600/30 bg-black/50 shadow-lg backdrop-blur-lg">
      <CardHeader className="gap-4 pb-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Badge className="border-orange-500/30 bg-orange-950/60 text-orange-300 hover:bg-orange-950/60">
                Futarchy ecosystem
              </Badge>
              <span className="text-xs text-gray-400">Mock snapshot · Aug 15, 2026</span>
            </div>
            <CardTitle className="text-balance text-xl text-orange-400">MetaDAO Project Intelligence</CardTitle>
            <CardDescription className="max-w-2xl text-pretty text-orange-200/70">
              Conditional market activity across 13 projects, presented inside the Pandata analytics workspace.
            </CardDescription>
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" aria-hidden="true" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search projects or decisions"
              aria-label="Search MetaDAO projects or decisions"
              className="border-orange-700/40 bg-black/40 pl-9 text-gray-100 placeholder:text-gray-500 focus-visible:ring-orange-500"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="flex flex-col gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-xs font-medium uppercase tracking-wide text-gray-500">Futard.io launchpad</span>
          <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2">
            {futardioStats.map((stat, index) => (
              <div key={stat.label} className="flex items-baseline gap-2">
                {index > 0 && <span className="hidden h-4 w-px bg-white/10 sm:block" aria-hidden="true" />}
                <span className="text-lg font-semibold tabular-nums text-gray-100">{stat.value.toLocaleString()}</span>
                <span className="text-xs text-gray-500">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {metaDaoMetrics.map((metric, index) => {
            const Icon = metricIcons[index]
            return (
              <div key={metric.label} className="flex items-start gap-3 rounded-lg border border-orange-900/30 bg-black/30 p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-orange-950/70 text-orange-400">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">{metric.label}</p>
                  <p className="mt-1 text-2xl font-bold text-gray-100">{metric.value}</p>
                  <p className="mt-1 text-xs text-orange-200/60">{metric.detail}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="overflow-hidden rounded-lg border border-orange-900/30">
          <Table>
            <TableHeader className="bg-orange-950/30">
              <TableRow className="border-orange-900/30 hover:bg-transparent">
                <TableHead className="text-orange-300">Project</TableHead>
                <TableHead className="text-orange-300">Decision market</TableHead>
                <TableHead className="text-orange-300">Pass / Fail</TableHead>
                <TableHead className="text-orange-300">Volume</TableHead>
                <TableHead className="text-right text-orange-300">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMarkets.map((market) => (
                <TableRow key={`${market.organization}-${market.title}`} className="border-orange-900/20 hover:bg-orange-950/20">
                  <TableCell className="font-medium text-gray-100">{market.organization}</TableCell>
                  <TableCell className="max-w-md text-gray-300">{market.title}</TableCell>
                  <TableCell className="font-mono text-sm text-gray-300">
                    <span className="text-green-400">{market.pass.toFixed(2)}</span>
                    <span className="px-1.5 text-gray-600">/</span>
                    <span className="text-orange-400">{market.fail.toFixed(2)}</span>
                  </TableCell>
                  <TableCell className="text-gray-300">{market.volume}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      className={
                        market.status === "Trading"
                          ? "bg-green-950/60 text-green-400 hover:bg-green-950/60"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-800"
                      }
                    >
                      {market.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredMarkets.length === 0 && (
            <div className="p-8 text-center text-sm text-gray-400">No MetaDAO projects match your search.</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
