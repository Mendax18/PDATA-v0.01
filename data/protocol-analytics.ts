export type ProtocolId = "realms" | "metadao" | "squads"

export const futardioStats = [
  { label: "Unique Users", value: 12623 },
  { label: "Unique TX", value: 85881 },
  { label: "Total Calls", value: 207427 },
]

export const metaDaoMetrics = [
  { label: "Active markets", value: "9", detail: "Across 13 ecosystem projects" },
  { label: "Decision volume", value: "$7.20M", detail: "In the expanded mock dataset" },
  { label: "Resolved decisions", value: "4", detail: "30.8% of tracked decisions" },
  { label: "Ecosystem projects", value: "13", detail: "One decision per project" },
]

export const metaDaoActivity = [
  { date: "Jul 04", volume: 486, markets: 4 },
  { date: "Jul 11", volume: 702, markets: 5 },
  { date: "Jul 18", volume: 648, markets: 6 },
  { date: "Jul 25", volume: 936, markets: 7 },
  { date: "Aug 01", volume: 884, markets: 7 },
  { date: "Aug 08", volume: 1086, markets: 8 },
  { date: "Aug 15", volume: 1240, markets: 9 },
]

export const metaDaoMarkets = [
  { title: "Increase META liquidity incentives", organization: "MetaDAO", pass: 0.68, fail: 0.42, volume: "$1.24M", status: "Trading" },
  { title: "Fund Futarchy SDK v2", organization: "Futarchy Labs", pass: 0.81, fail: 0.55, volume: "$842K", status: "Trading" },
  { title: "Expand validator strategy capacity", organization: "Avici", pass: 0.72, fail: 0.51, volume: "$736K", status: "Trading" },
  { title: "Ship private transfer beta", organization: "Umbra", pass: 0.63, fail: 0.46, volume: "$654K", status: "Trading" },
  { title: "Renew contributor rewards program", organization: "Loyal", pass: 0.77, fail: 0.58, volume: "$598K", status: "Resolved" },
  { title: "Add streamed payroll collateral", organization: "Paystream", pass: 0.66, fail: 0.49, volume: "$546K", status: "Trading" },
  { title: "Deploy treasury strategy vault", organization: "Solomon", pass: 0.59, fail: 0.44, volume: "$487K", status: "Trading" },
  { title: "Increase node operator allocation", organization: "P2P", pass: 0.71, fail: 0.57, volume: "$432K", status: "Resolved" },
  { title: "Launch isolated lending market", organization: "Jurassic Finance", pass: 0.62, fail: 0.39, volume: "$398K", status: "Trading" },
  { title: "Extend creator market incentives", organization: "Futardio", pass: 0.69, fail: 0.53, volume: "$362K", status: "Trading" },
  { title: "Approve autonomous agent budget", organization: "Superclaw", pass: 0.75, fail: 0.47, volume: "$341K", status: "Resolved" },
  { title: "Fund onchain reputation pilot", organization: "Spark", pass: 0.64, fail: 0.52, volume: "$297K", status: "Trading" },
  { title: "Migrate reserves to managed vaults", organization: "Bedrock", pass: 0.58, fail: 0.45, volume: "$266K", status: "Resolved" },
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
