"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { AreaChart, Area } from "recharts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"
import {
  ChevronDown,
  ChevronUp,
  Clock,
  DollarSign,
  Users,
  BarChart2,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Hourglass,
  RefreshCcw,
} from "lucide-react"
import Image from "next/image"

// Import the enhanced proposal section
import { EnhancedProposalSection } from "@/components/enhanced-proposal-section"
import { deanListProposals, realmsEcosystemProposals } from "@/data/enhanced-proposals"

interface DAODetailsProps {
  isOpen: boolean
  onClose: () => void
  daoName: string
  daoDetails: any
}

const COLORS = ["#f97316", "#f59e0b", "#fbbf24", "#facc15", "#a3e635"]

// Helper function to format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

// Helper function to generate random data for visualizations
const generateRandomData = (min: number, max: number, count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    name: `Day ${i + 1}`,
    value: Math.floor(Math.random() * (max - min + 1)) + min,
  }))
}

// Helper function to generate random engagement data
const generateEngagementData = () => {
  return [
    { subject: "Discussion", A: Math.floor(Math.random() * 100) },
    { subject: "Participation", A: Math.floor(Math.random() * 100) },
    { subject: "Sentiment", A: Math.floor(Math.random() * 100) },
    { subject: "Reach", A: Math.floor(Math.random() * 100) },
    { subject: "Impact", A: Math.floor(Math.random() * 100) },
  ]
}

// Helper function to generate financial impact data
const generateFinancialImpactData = (amount: number) => {
  const baseValue = amount / 5
  return [
    { name: "Development", value: baseValue * (0.8 + Math.random() * 0.4) },
    { name: "Marketing", value: baseValue * (0.6 + Math.random() * 0.4) },
    { name: "Operations", value: baseValue * (0.7 + Math.random() * 0.4) },
    { name: "Reserves", value: baseValue * (0.5 + Math.random() * 0.4) },
    { name: "Community", value: baseValue * (0.9 + Math.random() * 0.4) },
  ]
}

// Helper function to generate sparkline data
const generateSparklineData = (days: number, trend: "up" | "down" | "volatile" | "stable" = "up") => {
  const data = []
  let value = 10 + Math.random() * 10

  for (let i = 0; i < days; i++) {
    if (trend === "up") {
      value += Math.random() * 3
    } else if (trend === "down") {
      value -= Math.random() * 3
    } else if (trend === "volatile") {
      value += (Math.random() - 0.5) * 8
    } else {
      value += (Math.random() - 0.5) * 2
    }
    value = Math.max(0, Math.min(30, value))
    data.push({ day: i + 1, value })
  }

  return data
}

// Component for proposal voting visualization
const ProposalVotingVisualization = ({ yesVotes, noVotes, yesPercentage, noPercentage }) => {
  const data = [
    { name: "Yes", value: yesVotes },
    { name: "No", value: noVotes },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <div>
        <h4 className="text-sm font-medium mb-2 text-gray-300">Vote Distribution</h4>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                <Cell key="cell-0" fill="#22c55e" />
                <Cell key="cell-1" fill="#ef4444" />
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "#000000", border: "none" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2 text-gray-300">Vote Timeline</h4>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={generateRandomData(0, 10, 7)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis dataKey="name" stroke="#ffffff80" />
              <YAxis stroke="#ffffff80" />
              <Tooltip contentStyle={{ backgroundColor: "#000000", border: "none" }} />
              <Line type="monotone" dataKey="value" name="Votes" stroke="#f97316" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

// Component for financial impact visualization
const FinancialImpactVisualization = ({ amount }) => {
  const data = generateFinancialImpactData(amount)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <div>
        <h4 className="text-sm font-medium mb-2 text-gray-300">Budget Allocation</h4>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: "#000000", border: "none" }}
                formatter={(value) => [formatCurrency(value), "Allocation"]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2 text-gray-300">Expected ROI</h4>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={generateRandomData(amount * 0.05, amount * 0.2, 5)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis dataKey="name" stroke="#ffffff80" />
              <YAxis stroke="#ffffff80" />
              <Tooltip
                contentStyle={{ backgroundColor: "#000000", border: "none" }}
                formatter={(value) => [formatCurrency(value), "Return"]}
              />
              <Bar dataKey="value" name="Expected Return" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

// Component for community engagement visualization
const CommunityEngagementVisualization = () => {
  const data = generateEngagementData()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <div>
        <h4 className="text-sm font-medium mb-2 text-gray-300">Engagement Metrics</h4>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid stroke="#ffffff20" />
              <PolarAngleAxis dataKey="subject" stroke="#ffffff80" />
              <PolarRadiusAxis stroke="#ffffff80" />
              <Radar name="Engagement" dataKey="A" stroke="#f97316" fill="#f97316" fillOpacity={0.6} />
              <Tooltip contentStyle={{ backgroundColor: "#000000", border: "none" }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2 text-gray-300">Community Activity</h4>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={generateRandomData(10, 50, 7)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis dataKey="name" stroke="#ffffff80" />
              <YAxis stroke="#ffffff80" />
              <Tooltip contentStyle={{ backgroundColor: "#000000", border: "none" }} />
              <Line type="monotone" dataKey="value" name="Comments" stroke="#22c55e" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

// Component for mini-charts in proposal list
const MiniCharts = ({ proposal }) => {
  // Generate data for sparkline
  const sparklineData = generateSparklineData(
    7,
    proposal.status === "Voting" ? "up" : proposal.status === "Completed" ? "stable" : "down",
  )

  // Calculate vote data
  const yesVotes = proposal.yesVotes || 0
  const noVotes = proposal.noVotes || 0
  const totalVotes = yesVotes + noVotes || 1 // Avoid division by zero
  const yesPercentage = ((yesVotes / totalVotes) * 100).toFixed(1)
  const noPercentage = ((noVotes / totalVotes) * 100).toFixed(1)

  // Participation data (simulated)
  const participationData = [
    { name: "Voted", value: totalVotes },
    { name: "Eligible", value: Math.max(30 - totalVotes, 0) },
  ]

  return (
    <div className="grid grid-cols-3 gap-2 mt-2">
      {/* Vote Distribution Mini Pie Chart */}
      <div className="bg-black/20 rounded-md p-1">
        <div className="text-xs text-gray-400 mb-1 text-center">Vote Split</div>
        <div className="h-[40px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <Pie
                data={[
                  { name: "Yes", value: yesVotes },
                  { name: "No", value: noVotes },
                ]}
                cx="50%"
                cy="50%"
                innerRadius={10}
                outerRadius={20}
                paddingAngle={2}
                dataKey="value"
              >
                <Cell fill="#22c55e" />
                <Cell fill="#ef4444" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 mt-1">
          <span>Yes: {yesPercentage}%</span>
          <span>No: {noPercentage}%</span>
        </div>
      </div>

      {/* Participation Rate Mini Bar Chart */}
      <div className="bg-black/20 rounded-md p-1">
        <div className="text-xs text-gray-400 mb-1 text-center">Participation</div>
        <div className="h-[40px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={participationData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                <Cell fill="#3b82f6" />
                <Cell fill="#1e293b" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="text-[10px] text-gray-400 mt-1 text-center">{totalVotes} of 30 members</div>
      </div>

      {/* Vote Trend Mini Sparkline */}
      <div className="bg-black/20 rounded-md p-1">
        <div className="text-xs text-gray-400 mb-1 text-center">Vote Trend</div>
        <div className="h-[40px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparklineData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <Area type="monotone" dataKey="value" stroke="#f97316" fill="#f97316" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="text-[10px] text-gray-400 mt-1 text-center">Last 7 days</div>
      </div>
    </div>
  )
}

// Enhanced Proposal Item component
const ProposalItem = ({ proposal, index }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [simulatedVotes, setSimulatedVotes] = useState({
    yes: proposal.yesVotes || 0,
    no: proposal.noVotes || 0,
  })

  // Extract financial amount from title if available
  const getAmountFromTitle = (title) => {
    if (!title) return 5000 // Default if title is undefined
    const match = title.match(/\$([0-9,]+)/)
    return match ? Number.parseInt(match[1].replace(/,/g, "")) : 5000 // Default to 5000 if no amount found
  }

  const amount = getAmountFromTitle(proposal.title)

  // Simulated vote function
  const handleVote = (voteType) => {
    if (proposal.status !== "Voting") return

    setSimulatedVotes((prev) => ({
      ...prev,
      [voteType]: prev[voteType] + 1,
    }))
  }

  // Calculate total votes and percentages
  const totalVotes = simulatedVotes.yes + simulatedVotes.no
  const yesPercentage = totalVotes > 0 ? ((simulatedVotes.yes / totalVotes) * 100).toFixed(1) : "0.0"
  const noPercentage = totalVotes > 0 ? ((simulatedVotes.no / totalVotes) * 100).toFixed(1) : "0.0"

  // Status icon mapping
  const statusIcon = {
    Voting: <Hourglass className="h-4 w-4" />,
    Completed: <CheckCircle2 className="h-4 w-4" />,
    Defeated: <XCircle className="h-4 w-4" />,
    Active: <AlertCircle className="h-4 w-4" />,
  }

  // Dummy RealTimeUpdates component
  const RealTimeUpdates = ({ proposal }) => {
    return (
      <div className="mt-4">
        <p className="text-sm text-gray-400">Real-time updates are not currently available for this proposal.</p>
      </div>
    )
  }

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="bg-black/30 p-4 rounded-lg border border-gray-800 transition-all duration-200 hover:border-orange-800/50"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="font-medium text-white flex items-center">
            {proposal.status && statusIcon[proposal.status] && (
              <span className="mr-2">{statusIcon[proposal.status]}</span>
            )}
            {proposal.title || "Untitled Proposal"}
          </div>
          {proposal.timeRemaining && (
            <div className="text-xs text-gray-400 mt-1 flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              Time remaining: {proposal.timeRemaining}
            </div>
          )}
          {proposal.completedAgo && <div className="text-xs text-gray-400 mt-1">{proposal.completedAgo}</div>}
        </div>
        <div className="flex items-center space-x-2">
          <Badge
            className={`${
              proposal.status === "Passed" || proposal.status === "Completed"
                ? "bg-green-900/50 text-green-400"
                : proposal.status === "Voting"
                  ? "bg-blue-900/50 text-blue-400"
                  : proposal.status === "Defeated"
                    ? "bg-red-900/50 text-red-400"
                    : "bg-gray-900/50 text-gray-400"
            }`}
          >
            {proposal.status || "Unknown"}
          </Badge>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
              {isOpen ? (
                <ChevronUp className="h-4 w-4 text-gray-400" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-400" />
              )}
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>

      {/* Mini-charts section - always visible */}
      <MiniCharts proposal={{ ...proposal, yesVotes: simulatedVotes.yes, noVotes: simulatedVotes.no }} />

      {(simulatedVotes.yes !== undefined || proposal.yesVotes !== undefined) && (
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>
              Yes: {simulatedVotes.yes} ({yesPercentage}%)
            </span>
            <span>
              No: {simulatedVotes.no} ({noPercentage}%)
            </span>
          </div>
          <Progress
            value={Number.parseFloat(yesPercentage)}
            className="h-2 bg-gray-800"
            indicatorClassName="bg-green-500"
          />

          {proposal.quorumStatus && <div className="text-xs text-gray-400 mt-1">{proposal.quorumStatus}</div>}
        </div>
      )}

      <CollapsibleContent className="mt-4 space-y-4">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-black/20 p-3 rounded-lg">
            <DollarSign className="h-5 w-5 text-green-400 mx-auto mb-1" />
            <div className="text-xs text-gray-400">Budget</div>
            <div className="text-sm font-medium">{formatCurrency(amount)}</div>
          </div>
          <div className="bg-black/20 p-3 rounded-lg">
            <Users className="h-5 w-5 text-blue-400 mx-auto mb-1" />
            <div className="text-xs text-gray-400">Participants</div>
            <div className="text-sm font-medium">{totalVotes}</div>
          </div>
          <div className="bg-black/20 p-3 rounded-lg">
            <BarChart2 className="h-5 w-5 text-purple-400 mx-auto mb-1" />
            <div className="text-xs text-gray-400">Impact Score</div>
            <div className="text-sm font-medium">{Math.floor(Math.random() * 50) + 50}/100</div>
          </div>
        </div>

        <Separator className="bg-gray-800" />

        {/* Tabs for different visualizations */}
        <Tabs defaultValue="voting" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4 bg-black/30">
            <TabsTrigger value="voting">Voting Analysis</TabsTrigger>
            <TabsTrigger value="financial">Financial Impact</TabsTrigger>
            <TabsTrigger value="community">Community Engagement</TabsTrigger>
          </TabsList>

          <TabsContent value="voting" className="space-y-4">
            <ProposalVotingVisualization
              yesVotes={simulatedVotes.yes}
              noVotes={simulatedVotes.no}
              yesPercentage={yesPercentage}
              noPercentage={noPercentage}
            />
          </TabsContent>

          <TabsContent value="financial" className="space-y-4">
            <FinancialImpactVisualization amount={amount} />
          </TabsContent>

          <TabsContent value="community" className="space-y-4">
            <CommunityEngagementVisualization />
          </TabsContent>
        </Tabs>

        {/* Interactive voting buttons (for proposals in voting status) */}
        {proposal.status === "Voting" && (
          <div className="flex space-x-3 mt-4">
            <Button
              onClick={() => handleVote("yes")}
              className="flex-1 bg-green-900/50 text-green-400 hover:bg-green-800/70"
            >
              <ThumbsUp className="h-4 w-4 mr-2" /> Vote Yes
            </Button>
            <Button onClick={() => handleVote("no")} className="flex-1 bg-red-900/50 text-red-400 hover:bg-red-800/70">
              <ThumbsDown className="h-4 w-4 mr-2" /> Vote No
            </Button>
          </div>
        )}

        {/* Real-time updates section */}
        <RealTimeUpdates proposal={proposal} />
      </CollapsibleContent>
    </Collapsible>
  )
}

export function DAODetailsModal({ isOpen, onClose, daoName, daoDetails }: DAODetailsProps) {
  // Ensure we have default values for all properties to prevent undefined errors
  const {
    description = "No description available",
    members = 0,
    votes = 0,
    proposals = 0,
    tvl = 0,
    treasuryAllocation = [],
    monthlyActivity = [],
    governance = { votingPower: 0, quorum: 0, proposalThreshold: 0, votingPeriod: 0 },
    tokenPerformance = [],
    recentProposals = [],
  } = daoDetails || {}

  // Use a default logo path to avoid any issues with undefined values
  const logoSrc = "/placeholder.svg?height=40&width=40"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-black/80 backdrop-blur-lg border-orange-600/30 text-white">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <Image
              src={logoSrc || "/placeholder.svg"}
              alt={`${daoName || "Unknown"} Logo`}
              width={40}
              height={40}
              className="rounded-full object-contain bg-black/20"
              unoptimized
            />
            <DialogTitle className="text-2xl font-bold text-orange-400">{daoName || "Unknown DAO"}</DialogTitle>
          </div>
        </DialogHeader>
        <p className="text-gray-300 mb-4">{description}</p>
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-black/50 p-3 rounded-lg border border-orange-600/30">
            <div className="text-sm text-orange-400">Members</div>
            <div className="text-xl font-bold">{members.toLocaleString()}</div>
          </div>
          <div className="bg-black/50 p-3 rounded-lg border border-amber-600/30">
            <div className="text-sm text-amber-400">Total Votes</div>
            <div className="text-xl font-bold">{votes.toLocaleString()}</div>
          </div>
          <div className="bg-black/50 p-3 rounded-lg border border-yellow-600/30">
            <div className="text-sm text-yellow-300">Proposals</div>
            <div className="text-xl font-bold">{proposals}</div>
          </div>
          <div className="bg-black/50 p-3 rounded-lg border border-green-600/30">
            <div className="text-sm text-green-400">Treasury Value</div>
            <div className="text-xl font-bold">
              $
              {tvl.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </div>
        </div>

        <Tabs defaultValue="proposals" className="w-full">
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="proposals">Proposals</TabsTrigger>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="treasury">Treasury</TabsTrigger>
            <TabsTrigger value="governance">Governance</TabsTrigger>
            <TabsTrigger value="token">Token</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <Card className="bg-black/50 border-orange-600/30">
              <CardHeader>
                <CardTitle className="text-orange-400">Monthly Activity</CardTitle>
              </CardHeader>
              <CardContent>
                {monthlyActivity && monthlyActivity.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyActivity}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                      <XAxis dataKey="month" stroke="#ffffff80" />
                      <YAxis stroke="#ffffff80" />
                      <Tooltip contentStyle={{ backgroundColor: "#000000", border: "none" }} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="transactions"
                        name="Transactions"
                        stroke="#f97316"
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="newMembers"
                        name="New Members"
                        stroke="#22c55e"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-center py-10 text-gray-400">No monthly activity data available</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="treasury" className="space-y-4">
            <Card className="bg-black/50 border-orange-600/30">
              <CardHeader>
                <CardTitle className="text-orange-400">Treasury Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                {treasuryAllocation && treasuryAllocation.length > 0 ? (
                  <div className="flex justify-center">
                    <div className="w-64 h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={treasuryAllocation}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {treasuryAllocation.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip contentStyle={{ backgroundColor: "#000000", border: "none" }} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10 text-gray-400">No treasury allocation data available</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="governance" className="space-y-4">
            <Card className="bg-black/50 border-orange-600/30">
              <CardHeader>
                <CardTitle className="text-orange-400">Governance Parameters</CardTitle>
              </CardHeader>
              <CardContent>
                {governance ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/30 p-4 rounded-lg">
                      <div className="text-sm text-gray-400">Voting Power</div>
                      <div className="text-xl font-bold">{governance.votingPower.toLocaleString()}</div>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg">
                      <div className="text-sm text-gray-400">Quorum</div>
                      <div className="text-xl font-bold">{governance.quorum}%</div>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg">
                      <div className="text-sm text-gray-400">Proposal Threshold</div>
                      <div className="text-xl font-bold">{governance.proposalThreshold.toLocaleString()}</div>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg">
                      <div className="text-sm text-gray-400">Voting Period</div>
                      <div className="text-xl font-bold">{governance.votingPeriod} days</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10 text-gray-400">No governance data available</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="token" className="space-y-4">
            <Card className="bg-black/50 border-orange-600/30">
              <CardHeader>
                <CardTitle className="text-orange-400">Token Performance</CardTitle>
              </CardHeader>
              <CardContent>
                {tokenPerformance && tokenPerformance.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={tokenPerformance}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                      <XAxis dataKey="date" stroke="#ffffff80" />
                      <YAxis stroke="#ffffff80" />
                      <Tooltip contentStyle={{ backgroundColor: "#000000", border: "none" }} />
                      <Legend />
                      <Line type="monotone" dataKey="price" name="Price" stroke="#f97316" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-center py-10 text-gray-400">No token performance data available</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="proposals" className="space-y-4">
            {daoName === "DeanListNetwork" && (
              <EnhancedProposalSection proposals={deanListProposals} daoName={daoName} />
            )}
            {daoName === "Realms Ecosystem DAO" && (
              <EnhancedProposalSection proposals={realmsEcosystemProposals} daoName={daoName} />
            )}
            {daoName !== "DeanListNetwork" && daoName !== "Realms Ecosystem DAO" && (
              <Card className="bg-black/50 border-orange-600/30">
                <CardHeader className="flex flex-row justify-between items-center">
                  <CardTitle className="text-orange-400">Recent Proposals</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-blue-900/50 text-blue-400">{recentProposals.length} Total</Badge>
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      <RefreshCcw className="h-3 w-3 mr-1" /> Refresh
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="max-h-[400px] overflow-y-auto pr-2">
                    {recentProposals && recentProposals.length > 0 ? (
                      <div className="space-y-4">
                        {recentProposals.map((proposal, index) => (
                          <ProposalItem key={index} proposal={proposal} index={index} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10 text-gray-400">No recent proposals available</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
