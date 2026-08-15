"use client"

import { useMemo, useState } from "react"
import { Activity, CheckCircle2, Clock3, Search, ShieldCheck, TrendingUp, Users } from "lucide-react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  metaDaoActivity,
  metaDaoMarkets,
  metaDaoMetrics,
  protocolMeta,
  squadsActivity,
  squadsMetrics,
  squadsVaults,
  type ProtocolId,
} from "@/data/protocol-analytics"

const icons = [Activity, TrendingUp, CheckCircle2, Users]

export function ProtocolDashboard({ protocol }: { protocol: Exclude<ProtocolId, "realms"> }) {
  const [query, setQuery] = useState("")
  const isMetaDAO = protocol === "metadao"
  const meta = protocolMeta[protocol]
  const metrics = isMetaDAO ? metaDaoMetrics : squadsMetrics
  const rows = useMemo(() => {
    const source = isMetaDAO ? metaDaoMarkets : squadsVaults
    return source.filter((item) => JSON.stringify(item).toLowerCase().includes(query.toLowerCase()))
  }, [isMetaDAO, query])

  return (
    <div className="flex min-w-0 flex-1 flex-col lg:flex-row">
      <aside className="hidden w-64 shrink-0 border-r border-orange-800/30 bg-black/40 p-4 backdrop-blur-lg lg:block">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-orange-400">{meta.eyebrow}</p>
        <h2 className="text-xl font-bold text-orange-200">{meta.name}</h2>
        <p className="mt-2 text-sm leading-6 text-gray-400">{meta.description}</p>
        <div className="mt-6 border-t border-orange-900/40 pt-5">
          <p className="text-xs uppercase tracking-wider text-gray-500">Protocol pulse</p>
          <div className="mt-3 flex flex-col gap-3">
            {metrics.slice(0, 3).map((metric, index) => (
              <div key={metric.label} className="rounded-lg border border-orange-900/30 bg-black/30 p-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-gray-400">{metric.label}</span>
                  {(() => { const Icon = icons[index]; return <Icon className="h-4 w-4 text-orange-400" /> })()}
                </div>
                <p className="mt-1 text-lg font-bold text-orange-200">{metric.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 rounded-lg border border-green-900/30 bg-green-950/20 p-3">
          <div className="flex items-center gap-2 text-xs font-medium text-green-400"><ShieldCheck className="h-4 w-4" /> Data adapter ready</div>
          <p className="mt-2 text-xs leading-5 text-gray-400">Mock records follow a typed schema and can be replaced with your Dune query mapper.</p>
        </div>
      </aside>

      <main className="min-w-0 flex-1 overflow-y-auto p-4 md:p-6">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2">
              <Badge className="border-orange-700/50 bg-orange-950/40 text-orange-300">{meta.eyebrow}</Badge>
              <span className="text-xs text-gray-500">{meta.source}</span>
            </div>
            <h1 className="mt-3 text-balance text-2xl font-bold text-orange-200 md:text-3xl">{meta.name} analytics</h1>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-400">{meta.description}</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400"><Clock3 className="h-4 w-4 text-green-400" /> {isMetaDAO ? "Mock snapshot · Aug 15, 2026" : "Updated Mar 17, 2026"}</div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric, index) => {
            const Icon = icons[index]
            return <Card key={metric.label} className="border-orange-800/30 bg-black/50 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3"><p className="text-sm text-gray-400">{metric.label}</p><Icon className="h-5 w-5 text-orange-400" /></div>
                <p className="mt-3 text-2xl font-bold text-orange-200">{metric.value}</p>
                <p className="mt-1 text-xs text-green-400">{metric.detail}</p>
              </CardContent>
            </Card>
          })}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.6fr_1fr]">
          <Card className="border-orange-800/30 bg-black/50 shadow-lg">
            <CardHeader className="p-4">
              <CardTitle className="text-lg text-orange-300">{isMetaDAO ? "Decision market activity" : "Multisig transaction activity"}</CardTitle>
              <CardDescription className="text-gray-400">Weekly protocol activity with dates from the normalized dataset</CardDescription>
            </CardHeader>
            <CardContent className="h-80 p-4 pt-0">
              <ResponsiveContainer width="100%" height="100%">
                {isMetaDAO ? <AreaChart data={metaDaoActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff18" /><XAxis dataKey="date" stroke="#ffffff80" fontSize={11} /><YAxis stroke="#ffffff80" fontSize={11} /><Tooltip contentStyle={{ backgroundColor: "#080808", border: "1px solid #7c2d12" }} /><Area type="monotone" dataKey="volume" name="Volume ($K)" stroke="#f97316" fill="#f9731638" strokeWidth={2} />
                </AreaChart> : <BarChart data={squadsActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff18" /><XAxis dataKey="date" stroke="#ffffff80" fontSize={11} /><YAxis stroke="#ffffff80" fontSize={11} /><Tooltip contentStyle={{ backgroundColor: "#080808", border: "1px solid #7c2d12" }} /><Bar dataKey="created" name="Created" fill="#f97316" radius={[3,3,0,0]} /><Bar dataKey="executed" name="Executed" fill="#22c55e" radius={[3,3,0,0]} />
                </BarChart>}
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="border-green-800/30 bg-black/50 shadow-lg">
            <CardHeader className="p-4"><CardTitle className="text-lg text-green-400">Protocol insights</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-3 p-4 pt-0">
              {(isMetaDAO ? ["The mock dataset spans 13 projects across the futarchy ecosystem.", "Nine of 13 tracked decisions are currently marked as trading.", "Tracked mock decision volume totals $7.20M across all projects."] : ["Execution rate reached 93.4% across tracked transactions.", "4-of-7 is the most common threshold among high-value vaults.", "Signer activity increased for five consecutive weeks."]).map((text, index) => <div key={text} className="flex gap-3 rounded-lg border border-green-900/30 bg-green-950/20 p-3"><span className="font-mono text-xs text-green-500">0{index + 1}</span><p className="text-sm leading-6 text-gray-300">{text}</p></div>)}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6 border-orange-800/30 bg-black/50 shadow-lg">
          <CardHeader className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
            <div><CardTitle className="text-lg text-orange-300">{isMetaDAO ? "Decision markets" : "Tracked multisig vaults"}</CardTitle><CardDescription className="text-gray-400">Search and inspect protocol-native activity</CardDescription></div>
            <div className="relative w-full md:w-72"><Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={isMetaDAO ? "Search markets..." : "Search vaults..."} className="border-orange-900/40 bg-black/40 pl-9 text-gray-200" /></div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto"><table className="w-full min-w-[720px] text-left text-sm"><thead className="border-y border-orange-900/30 bg-orange-950/20 text-xs uppercase tracking-wider text-gray-500"><tr>{(isMetaDAO ? ["Decision", "Organization", "Pass / fail", "Volume", "Status"] : ["Vault", "Threshold", "Secured value", "Transactions", "Status"]).map((heading) => <th key={heading} className="px-4 py-3 font-medium">{heading}</th>)}</tr></thead><tbody className="divide-y divide-orange-900/20">{rows.map((row: any) => <tr key={row.title ?? row.name} className="hover:bg-orange-950/20">{isMetaDAO ? <><td className="px-4 py-4 font-medium text-gray-200">{row.title}</td><td className="px-4 py-4 text-gray-400">{row.organization}</td><td className="px-4 py-4 font-mono text-xs"><span className="text-green-400">${row.pass.toFixed(2)}</span><span className="text-gray-600"> / </span><span className="text-orange-400">${row.fail.toFixed(2)}</span></td><td className="px-4 py-4 text-gray-300">{row.volume}</td></> : <><td className="px-4 py-4 font-medium text-gray-200">{row.name}</td><td className="px-4 py-4 font-mono text-orange-300">{row.threshold}</td><td className="px-4 py-4 text-gray-300">{row.value}</td><td className="px-4 py-4 text-gray-400">{row.transactions.toLocaleString()}</td></>}<td className="px-4 py-4"><Badge className={row.status === "Active" || row.status === "Trading" ? "bg-green-950/40 text-green-400" : "bg-orange-950/40 text-orange-300"}>{row.status}</Badge></td></tr>)}</tbody></table></div>
            {rows.length === 0 && <p className="p-8 text-center text-sm text-gray-500">No matching records found.</p>}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
