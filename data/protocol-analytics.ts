export type ProtocolId = "realms" | "metadao" | "squads"

export const metaDaoMetrics = [
  { label: "Active markets", value: "14", detail: "+3 this month" },
  { label: "Decision volume", value: "$8.42M", detail: "Across conditional markets" },
  { label: "Resolved decisions", value: "67", detail: "71.6% approved" },
  { label: "Unique traders", value: "1,284", detail: "+12.8% in 30d" },
]

export const metaDaoActivity = [
  { date: "Feb 03", volume: 420, markets: 7 },
  { date: "Feb 10", volume: 610, markets: 8 },
  { date: "Feb 17", volume: 540, markets: 9 },
  { date: "Feb 24", volume: 880, markets: 10 },
  { date: "Mar 03", volume: 760, markets: 11 },
  { date: "Mar 10", volume: 1120, markets: 12 },
  { date: "Mar 17", volume: 980, markets: 14 },
]

export const metaDaoMarkets = [
  { title: "Increase META liquidity incentives", organization: "MetaDAO", pass: 0.68, fail: 0.42, volume: "$1.24M", status: "Trading" },
  { title: "Fund Futarchy SDK v2", organization: "Futarchy Labs", pass: 0.81, fail: 0.55, volume: "$842K", status: "Trading" },
  { title: "Acquire protocol-owned liquidity", organization: "MetaDAO", pass: 0.57, fail: 0.48, volume: "$536K", status: "Trading" },
  { title: "Launch grants cohort 04", organization: "MetaDAO", pass: 0.74, fail: 0.61, volume: "$319K", status: "Resolved" },
]

export const squadsMetrics = [
  { label: "Active multisigs", value: "6,842", detail: "+284 this month" },
  { label: "Secured value", value: "$1.31B", detail: "Across tracked vaults" },
  { label: "Transactions", value: "48,296", detail: "93.4% executed" },
  { label: "Active signers", value: "18,720", detail: "2.74 avg per multisig" },
]

export const squadsActivity = [
  { date: "Feb 03", created: 148, executed: 132 },
  { date: "Feb 10", created: 176, executed: 158 },
  { date: "Feb 17", created: 169, executed: 151 },
  { date: "Feb 24", created: 214, executed: 192 },
  { date: "Mar 03", created: 238, executed: 219 },
  { date: "Mar 10", created: 265, executed: 244 },
  { date: "Mar 17", created: 291, executed: 271 },
]

export const squadsVaults = [
  { name: "Jupiter Core Treasury", threshold: "4 / 7", value: "$184.2M", transactions: 1248, status: "Active" },
  { name: "Drift Protocol Operations", threshold: "3 / 5", value: "$96.8M", transactions: 886, status: "Active" },
  { name: "Tensor Foundation", threshold: "3 / 6", value: "$52.4M", transactions: 617, status: "Active" },
  { name: "Mad Lads Community Vault", threshold: "5 / 8", value: "$28.7M", transactions: 402, status: "Review" },
]

export const protocolMeta: Record<ProtocolId, { name: string; eyebrow: string; description: string; source: string }> = {
  realms: { name: "Realms", eyebrow: "DAO governance", description: "Organizations, proposals, voters, and treasury activity across Realms.", source: "Dune analytics" },
  metadao: { name: "MetaDAO", eyebrow: "Futarchy governance", description: "Conditional markets, decision liquidity, and outcomes across the futarchy ecosystem.", source: "Mock data · Dune ready" },
  squads: { name: "Squads", eyebrow: "Multisig infrastructure", description: "Multisig adoption, treasury security, signer activity, and transaction execution.", source: "Mock data · Dune ready" },
}
