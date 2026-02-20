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
import { ArrowDown, ArrowUp } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mini Sparkline Component
const MiniSparkline = ({ data, color, height = 40, area = false }) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      {area ? (
        <AreaChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id={`color${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            fill={`url(#color${color.replace("#", "")})`}
            fillOpacity={1}
            isAnimationActive={false}
          />
        </AreaChart>
      ) : (
        <LineChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            dot={false}
            isAnimationActive={false}
            strokeWidth={1.5}
          />
        </LineChart>
      )}
    </ResponsiveContainer>
  )
}

// Mini Bar Chart Component
const MiniBarChart = ({ data, color }) => {
  return (
    <ResponsiveContainer width="100%" height={40}>
      <BarChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <Bar dataKey="value" fill={color} isAnimationActive={false} radius={[2, 2, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

// Mini Pie Chart Component
const MiniPieChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={40}>
      <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={10}
          outerRadius={20}
          paddingAngle={2}
          dataKey="value"
          isAnimationActive={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}

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
            {statusIcon[proposal.status] && <span className="mr-2">{statusIcon[proposal.status]}</span>}
            {proposal.title}
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
            {proposal.status}
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
      <DialogContent className="max-w-4xl bg-black/80 backdrop-blur-lg border-orange-600/30 text-white overflow-hidden">
        <DialogHeader className="pb-2">
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

        {/* Mini Stats Overview */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          <div className="bg-black/30 rounded-lg p-3 border border-orange-600/20 flex flex-col">
            <div className="text-xs text-orange-400/80 mb-1">Members</div>
            <div className="text-xl font-bold">{members.toLocaleString()}</div>
            <div className="mt-auto pt-2">
              <MiniSparkline data={generateRandomData(members * 0.8, members * 1.2, 10)} color="#f97316" height={20} />
            </div>
          </div>
          <div className="bg-black/30 rounded-lg p-3 border border-amber-600/20 flex flex-col">
            <div className="text-xs text-amber-400/80 mb-1">Votes</div>
            <div className="text-xl font-bold">{votes.toLocaleString()}</div>
            <div className="mt-auto pt-2">
              <MiniSparkline data={generateRandomData(votes * 0.7, votes * 1.3, 10)} color="#f59e0b" height={20} />
            </div>
          </div>
          <div className="bg-black/30 rounded-lg p-3 border border-yellow-600/20 flex flex-col">
            <div className="text-xs text-yellow-300/80 mb-1">Proposals</div>
            <div className="text-xl font-bold">{proposals}</div>
            <div className="mt-auto pt-2">
              <MiniSparkline data={generateRandomData(1, proposals * 1.5, 10)} color="#facc15" height={20} />
            </div>
          </div>
          <div className="bg-black/30 rounded-lg p-3 border border-green-600/20 flex flex-col">
            <div className="text-xs text-green-400/80 mb-1">Treasury</div>
            <div className="text-xl font-bold">
              $
              {tvl.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </div>
            <div className="mt-auto pt-2">
              <MiniSparkline data={generateRandomData(tvl * 0.9, tvl * 1.1, 10)} color="#22c55e" height={20} />
            </div>
          </div>
        </div>

        <Tabs defaultValue="proposals" className="w-full">
          <TabsList className="grid grid-cols-5 mb-4 bg-black/40 p-0.5 rounded-lg">
            <TabsTrigger
              value="overview"
              className="rounded-md data-[state=active]:bg-orange-950/40 data-[state=active]:text-orange-400"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="proposals"
              className="rounded-md data-[state=active]:bg-orange-950/40 data-[state=active]:text-orange-400"
            >
              Proposals
            </TabsTrigger>
            <TabsTrigger
              value="treasury"
              className="rounded-md data-[state=active]:bg-orange-950/40 data-[state=active]:text-orange-400"
            >
              Treasury
            </TabsTrigger>
            <TabsTrigger
              value="governance"
              className="rounded-md data-[state=active]:bg-orange-950/40 data-[state=active]:text-orange-400"
            >
              Governance
            </TabsTrigger>
            <TabsTrigger
              value="token"
              className="rounded-md data-[state=active]:bg-orange-950/40 data-[state=active]:text-orange-400"
            >
              Token
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-2">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-black/30 rounded-lg p-4 border border-orange-600/10">
                <h3 className="text-sm font-medium text-orange-400 mb-2">Activity Trend</h3>
                <div className="h-[120px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={generateRandomData(10, 100, 14)}>
                      <defs>
                        <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#f97316"
                        fillOpacity={1}
                        fill="url(#colorActivity)"
                      />
                      <Tooltip contentStyle={{ backgroundColor: "#000000", border: "none" }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-black/30 rounded-lg p-4 border border-orange-600/10">
                <h3 className="text-sm font-medium text-orange-400 mb-2">Member Growth</h3>
                <div className="h-[120px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={generateRandomData(members * 0.7, members * 1.1, 14)}>
                      <defs>
                        <linearGradient id="colorMembers" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#22c55e"
                        fillOpacity={1}
                        fill="url(#colorMembers)"
                      />
                      <Tooltip contentStyle={{ backgroundColor: "#000000", border: "none" }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="bg-black/30 rounded-lg p-4 border border-orange-600/10">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-medium text-orange-400">Monthly Activity</h3>
                <Button variant="ghost" size="sm" className="h-7 text-xs">
                  <RefreshCcw className="h-3 w-3 mr-1" /> Refresh
                </Button>
              </div>
              <div className="h-[200px]">
                {monthlyActivity && monthlyActivity.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyActivity}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                      <XAxis dataKey="month" stroke="#ffffff60" />
                      <YAxis stroke="#ffffff60" />
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
                  <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                    No monthly activity data available
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="proposals" className="space-y-4 mt-2">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-black/30 rounded-lg p-4 border border-orange-600/10">
                <h3 className="text-xs text-gray-400 mb-1">Active Proposals</h3>
                <div className="flex items-end gap-2">
                  <div className="text-xl font-bold">{Math.floor(proposals * 0.3)}</div>
                  <div className="text-xs text-green-400 pb-1">+{Math.floor(Math.random() * 3) + 1} new</div>
                </div>
                <div className="mt-2 h-[40px]">
                  <MiniBarChart
                    data={[
                      { name: "Mon", value: Math.floor(Math.random() * 5) },
                      { name: "Tue", value: Math.floor(Math.random() * 5) },
                      { name: "Wed", value: Math.floor(Math.random() * 5) },
                      { name: "Thu", value: Math.floor(Math.random() * 5) },
                      { name: "Fri", value: Math.floor(Math.random() * 5) },
                      { name: "Sat", value: Math.floor(Math.random() * 5) },
                      { name: "Sun", value: Math.floor(Math.random() * 5) },
                    ]}
                    color="#f97316"
                  />
                </div>
              </div>
              <div className="bg-black/30 rounded-lg p-4 border border-orange-600/10">
                <h3 className="text-xs text-gray-400 mb-1">Completed Proposals</h3>
                <div className="flex items-end gap-2">
                  <div className="text-xl font-bold">{Math.floor(proposals * 0.6)}</div>
                  <div className="text-xs text-gray-400 pb-1">last 30 days</div>
                </div>
                <div className="mt-2 h-[40px]">
                  <MiniPieChart
                    data={[
                      { name: "Passed", value: Math.floor(proposals * 0.4), color: "#22c55e" },
                      { name: "Failed", value: Math.floor(proposals * 0.2), color: "#ef4444" },
                    ]}
                  />
                </div>
              </div>
              <div className="bg-black/30 rounded-lg p-4 border border-orange-600/10">
                <h3 className="text-xs text-gray-400 mb-1">Avg. Participation</h3>
                <div className="flex items-end gap-2">
                  <div className="text-xl font-bold">{Math.floor(Math.random() * 30) + 40}%</div>
                  <div className="text-xs text-yellow-400 pb-1">of members</div>
                </div>
                <div className="mt-2 h-[40px]">
                  <MiniSparkline data={generateRandomData(30, 70, 10)} color="#facc15" height={40} area={true} />
                </div>
              </div>
            </div>

            {daoName === "DeanListNetwork" && (
              <EnhancedProposalSection proposals={deanListProposals} daoName={daoName} />
            )}
            {daoName === "Realms Ecosystem DAO" && (
              <EnhancedProposalSection proposals={realmsEcosystemProposals} daoName={daoName} />
            )}
            {daoName !== "DeanListNetwork" && daoName !== "Realms Ecosystem DAO" && (
              <Card className="bg-black/30 border-orange-600/10">
                <CardHeader className="flex flex-row justify-between items-center py-3">
                  <CardTitle className="text-sm text-orange-400">Recent Proposals</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-blue-900/30 text-blue-400 border-none">{recentProposals.length} Total</Badge>
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      <RefreshCcw className="h-3 w-3 mr-1" /> Refresh
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="max-h-[400px] overflow-y-auto pr-2">
                    {recentProposals && recentProposals.length > 0 ? (
                      <div className="space-y-3">
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

          <TabsContent value="treasury" className="space-y-4 mt-2">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-black/30 rounded-lg p-4 border border-orange-600/10">
                <h3 className="text-xs text-gray-400 mb-1">Total Value</h3>
                <div className="flex items-end gap-2">
                  <div className="text-xl font-bold">
                    $
                    {tvl.toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </div>
                </div>
                <div className="mt-2 h-[40px]">
                  <MiniSparkline
                    data={generateRandomData(tvl * 0.9, tvl * 1.1, 10)}
                    color="#22c55e"
                    height={40}
                    area={true}
                  />
                </div>
              </div>
              <div className="bg-black/30 rounded-lg p-4 border border-orange-600/10">
                <h3 className="text-xs text-gray-400 mb-1">Monthly Change</h3>
                <div className="flex items-end gap-2">
                  <div className="text-xl font-bold text-green-400">+{Math.floor(Math.random() * 10) + 2}%</div>
                  <div className="text-xs text-gray-400 pb-1">last 30 days</div>
                </div>
                <div className="mt-2 h-[40px]">
                  <MiniBarChart
                    data={[
                      { name: "W1", value: Math.floor(Math.random() * 10) + 1 },
                      { name: "W2", value: Math.floor(Math.random() * 10) + 1 },
                      { name: "W3", value: Math.floor(Math.random() * 10) + 1 },
                      { name: "W4", value: Math.floor(Math.random() * 10) + 1 },
                    ]}
                    color="#22c55e"
                  />
                </div>
              </div>
              <div className="bg-black/30 rounded-lg p-4 border border-orange-600/10">
                <h3 className="text-xs text-gray-400 mb-1">Spending Rate</h3>
                <div className="flex items-end gap-2">
                  <div className="text-xl font-bold">${Math.floor(tvl * 0.05).toLocaleString()}</div>
                  <div className="text-xs text-gray-400 pb-1">/month</div>
                </div>
                <div className="mt-2 h-[40px]">
                  <MiniBarChart
                    data={[
                      { name: "Jan", value: Math.floor(tvl * 0.04) },
                      { name: "Feb", value: Math.floor(tvl * 0.05) },
                      { name: "Mar", value: Math.floor(tvl * 0.06) },
                      { name: "Apr", value: Math.floor(tvl * 0.05) },
                    ]}
                    color="#f97316"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/30 rounded-lg p-4 border border-orange-600/10">
                <h3 className="text-sm font-medium text-orange-400 mb-3">Treasury Allocation</h3>
                <div className="h-[200px]">
                  {treasuryAllocation && treasuryAllocation.length > 0 ? (
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
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                      No treasury allocation data available
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-black/30 rounded-lg p-4 border border-orange-600/10">
                <h3 className="text-sm font-medium text-orange-400 mb-3">Treasury History</h3>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={generateRandomData(tvl * 0.7, tvl * 1.2, 12)}>
                      <defs>
                        <linearGradient id="colorTreasury" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                      <XAxis dataKey="name" stroke="#ffffff60" />
                      <YAxis stroke="#ffffff60" />
                      <Tooltip contentStyle={{ backgroundColor: "#000000", border: "none" }} />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#22c55e"
                        fillOpacity={1}
                        fill="url(#colorTreasury)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="bg-black/30 rounded-lg p-4 border border-orange-600/10">
              <h3 className="text-sm font-medium text-orange-400 mb-3">Recent Transactions</h3>
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-gray-800">
                    <div className="flex items-center gap-3">
                      {i % 2 === 0 ? (
                        <div className="w-6 h-6 rounded-full bg-green-900/30 flex items-center justify-center">
                          <ArrowDown className="h-3 w-3 text-green-400" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-red-900/30 flex items-center justify-center">
                          <ArrowUp className="h-3 w-3 text-red-400" />
                        </div>
                      )}
                      <div>
                        <div className="text-sm">{i % 2 === 0 ? "Deposit" : "Withdrawal"}</div>
                        <div className="text-xs text-gray-400">
                          {new Date(Date.now() - i * 86400000).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className={`text-sm ${i % 2 === 0 ? "text-green-400" : "text-red-400"}`}>
                      {i % 2 === 0 ? "+" : "-"}${(Math.random() * 10000).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="governance" className="space-y-4 mt-2">
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="bg-black/30 rounded-lg p-4 border border-orange-600/10">
                <h3 className="text-xs text-gray-400 mb-1">Voting Power</h3>
                <div className="text-xl font-bold">{governance.votingPower.toLocaleString()}</div>
                <div className="mt-2 h-[40px]">
                  <MiniSparkline
                    data={generateRandomData(governance.votingPower * 0.9, governance.votingPower * 1.1, 10)}
                    color="#f97316"
                    height={40}
                  />
                </div>
              </div>
              <div className="bg-black/30 rounded-lg p-4 border border-orange-600/10">
                <h3 className="text-xs text-gray-400 mb-1">Quorum</h3>
                <div className="text-xl font-bold">{governance.quorum}%</div>
                <div className="mt-2 h-[40px]">
                  <div className="w-full bg-gray-800 rounded-full h-2.5 mt-4">
                    <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: `${governance.quorum}%` }}></div>
                  </div>
                </div>
              </div>
              <div className="bg-black/30 rounded-lg p-4 border border-orange-600/10">
                <h3 className="text-xs text-gray-400 mb-1">Proposal Threshold</h3>
                <div className="text-xl font-bold">{governance.proposalThreshold.toLocaleString()}</div>
                <div className="mt-2 h-[40px]">
                  <div className="w-full bg-gray-800 rounded-full h-2.5 mt-4">
                    <div
                      className="bg-amber-500 h-2.5 rounded-full"
                      style={{ width: `${(governance.proposalThreshold / governance.votingPower) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="bg-black/30 rounded-lg p-4 border border-orange-600/10">
                <h3 className="text-xs text-gray-400 mb-1">Voting Period</h3>
                <div className="text-xl font-bold">{governance.votingPeriod} days</div>
                <div className="mt-2 h-[40px]">
                  <MiniBarChart
                    data={[
                      { name: "Min", value: Math.max(1, governance.votingPeriod - 2) },
                      { name: "Avg", value: governance.votingPeriod },
                      { name: "Max", value: governance.votingPeriod + 2 },
                    ]}
                    color="#f59e0b"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/30 rounded-lg p-4 border border-orange-600/10">
                <h3 className="text-sm font-medium text-orange-400 mb-3">Voting Power Distribution</h3>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: "Top 1%", value: Math.floor(governance.votingPower * 0.4) },
                        { name: "Top 5%", value: Math.floor(governance.votingPower * 0.2) },
                        { name: "Top 10%", value: Math.floor(governance.votingPower * 0.15) },
                        { name: "Top 25%", value: Math.floor(governance.votingPower * 0.1) },
                        { name: "Rest", value: Math.floor(governance.votingPower * 0.15) },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                      <XAxis dataKey="name" stroke="#ffffff60" />
                      <YAxis stroke="#ffffff60" />
                      <Tooltip contentStyle={{ backgroundColor: "#000000", border: "none" }} />
                      <Bar dataKey="value" fill="#f97316" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-black/30 rounded-lg p-4 border border-orange-600/10">
                <h3 className="text-sm font-medium text-orange-400 mb-3">Proposal Success Rate</h3>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Passed", value: Math.floor(proposals * 0.65), color: "#22c55e" },
                          { name: "Failed", value: Math.floor(proposals * 0.25), color: "#ef4444" },
                          { name: "Canceled", value: Math.floor(proposals * 0.1), color: "#94a3b8" },
                        ]}
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
                        <Cell key="cell-2" fill="#94a3b8" />
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: "#000000", border: "none" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="bg-black/30 rounded-lg p-4 border border-orange-600/10">
              <h3 className="text-sm font-medium text-orange-400 mb-3">Governance Parameters</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs text-gray-400 mb-2">Key Settings</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Voting Delay</span>
                      <span className="text-sm font-medium">{Math.floor(Math.random() * 3) + 1} days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Execution Delay</span>
                      <span className="text-sm font-medium">{Math.floor(Math.random() * 2) + 1} days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Proposal Expiration</span>
                      <span className="text-sm font-medium">{Math.floor(Math.random() * 10) + 30} days</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs text-gray-400 mb-2">Governance Stats</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Avg. Voter Turnout</span>
                      <span className="text-sm font-medium">{Math.floor(Math.random() * 30) + 40}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Avg. Proposal Duration</span>
                      <span className="text-sm font-medium">{Math.floor(Math.random() * 5) + 5} days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Governance Score</span>
                      <span className="text-sm font-medium text-orange-400">
                        {Math.floor(Math.random() * 30) + 70}/100
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="token" className="space-y-4 mt-2">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-black/30 rounded-lg p-4 border border-orange-600/10">
                <h3 className="text-xs text-gray-400 mb-1">Token Price</h3>
                <div className="flex items-end gap-2">
                  <div className="text-xl font-bold">${(Math.random() * 10).toFixed(2)}</div>
                  <div className="text-xs text-green-400 pb-1">+{(Math.random() * 5).toFixed(2)}%</div>
                </div>
                <div className="mt-2 h-[40px]">
                  <MiniSparkline data={generateRandomData(8, 12, 10)} color="#22c55e" height={40} area={true} />
                </div>
              </div>
              <div className="bg-black/30 rounded-lg p-4 border border-orange-600/10">
                <h3 className="text-xs text-gray-400 mb-1">Market Cap</h3>
                <div className="flex items-end gap-2">
                  <div className="text-xl font-bold">${(Math.random() * 10000000).toFixed(0)}</div>
                </div>
                <div className="mt-2 h-[40px]">
                  <MiniBarChart
                    data={[
                      { name: "Q1", value: Math.floor(Math.random() * 100) + 50 },
                      { name: "Q2", value: Math.floor(Math.random() * 100) + 60 },
                      { name: "Q3", value: Math.floor(Math.random() * 100) + 70 },
                      { name: "Q4", value: Math.floor(Math.random() * 100) + 80 },
                    ]}
                    color="#f97316"
                  />
                </div>
              </div>
              <div className="bg-black/30 rounded-lg p-4 border border-orange-600/10">
                <h3 className="text-xs text-gray-400 mb-1">Circulating Supply</h3>
                <div className="flex items-end gap-2">
                  <div className="text-xl font-bold">{(Math.random() * 1000000).toFixed(0)}</div>
                  <div className="text-xs text-gray-400 pb-1">tokens</div>
                </div>
                <div className="mt-2 h-[40px]">
                  <div className="w-full bg-gray-800 rounded-full h-2.5 mt-4">
                    <div
                      className="bg-amber-500 h-2.5 rounded-full"
                      style={{ width: `${Math.floor(Math.random() * 40) + 40}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-black/30 rounded-lg p-4 border border-orange-600/10">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-medium text-orange-400">Token Performance</h3>
                <Select defaultValue="30d">
                  <SelectTrigger className="w-[100px] h-8 text-xs bg-black/30 border-gray-700">
                    <SelectValue placeholder="Period" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-gray-700 text-white">
                    <SelectItem value="7d">7 days</SelectItem>
                    <SelectItem value="30d">30 days</SelectItem>
                    <SelectItem value="90d">90 days</SelectItem>
                    <SelectItem value="1y">1 year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="h-[250px]">
                {tokenPerformance && tokenPerformance.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={tokenPerformance}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                      <XAxis dataKey="date" stroke="#ffffff60" />
                      <YAxis stroke="#ffffff60" />
                      <Tooltip contentStyle={{ backgroundColor: "#000000", border: "none" }} />
                      <Legend />
                      <Line type="monotone" dataKey="price" name="Price" stroke="#f97316" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={generateRandomData(1, 10, 30)}>
                      <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                      <XAxis dataKey="name" stroke="#ffffff60" />
                      <YAxis stroke="#ffffff60" />
                      <Tooltip contentStyle={{ backgroundColor: "#000000", border: "none" }} />
                      <Area type="monotone" dataKey="value" stroke="#f97316" fillOpacity={1} fill="url(#colorPrice)" />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/30 rounded-lg p-4 border border-orange-600/10">
                <h3 className="text-sm font-medium text-orange-400 mb-3">Token Distribution</h3>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Treasury", value: 40, color: "#f97316" },
                          { name: "Team", value: 15, color: "#3b82f6" },
                          { name: "Community", value: 30, color: "#22c55e" },
                          { name: "Investors", value: 15, color: "#f59e0b" },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        <Cell key="cell-0" fill="#f97316" />
                        <Cell key="cell-1" fill="#3b82f6" />
                        <Cell key="cell-2" fill="#22c55e" />
                        <Cell key="cell-3" fill="#f59e0b" />
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: "#000000", border: "none" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-black/30 rounded-lg p-4 border border-orange-600/10">
                <h3 className="text-sm font-medium text-orange-400 mb-3">Token Metrics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Supply</span>
                    <span className="text-sm font-medium">{(Math.random() * 10000000).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Circulating Supply</span>
                    <span className="text-sm font-medium">{(Math.random() * 5000000).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Holders</span>
                    <span className="text-sm font-medium">{(Math.random() * 10000).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">24h Volume</span>
                    <span className="text-sm font-medium">${(Math.random() * 1000000).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">All-time High</span>
                    <span className="text-sm font-medium">${(Math.random() * 20).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">All-time Low</span>
                    <span className="text-sm font-medium">${(Math.random() * 2).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
