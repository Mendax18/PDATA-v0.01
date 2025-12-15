"use client"

import { useState, useMemo } from "react"
import {
  Search,
  Filter,
  Calendar,
  User,
  FileText,
  ThumbsUp,
  ThumbsDown,
  ChevronDown,
  ChevronUp,
  Clock,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Download,
  MessageSquare,
  Hourglass,
} from "lucide-react"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts"

// Enhanced proposal interface
interface EnhancedProposal {
  id: string
  title: string
  summary?: string
  description?: string
  proposer: {
    name: string
    avatar?: string
  }
  status: "Voting" | "Completed" | "Defeated" | "Canceled" | "Draft"
  createdAt: string // ISO date string
  endDate?: string // ISO date string
  category?: string
  amount?: number
  yesVotes: number
  noVotes: number
  abstainVotes?: number
  quorum?: {
    required: number
    achieved: boolean
  }
  timeRemaining?: string
  completedAgo?: string
  documents?: {
    name: string
    url: string
    type: string
  }[]
  comments?: {
    author: {
      name: string
      avatar?: string
    }
    text: string
    timestamp: string
    replies?: {
      author: {
        name: string
        avatar?: string
      }
      text: string
      timestamp: string
    }[]
  }[]
  executable?: boolean
  executedAt?: string
  votingHistory?: {
    date: string
    yesVotes: number
    noVotes: number
    abstainVotes?: number
  }[]
}

interface EnhancedProposalSectionProps {
  proposals: EnhancedProposal[]
  daoName: string
}

// Helper function to format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

// Helper function to generate sparkline data
const generateSparklineData = (proposal: EnhancedProposal) => {
  if (proposal.votingHistory && proposal.votingHistory.length > 0) {
    return proposal.votingHistory.map((history) => ({
      date: history.date,
      yesVotes: history.yesVotes,
      noVotes: history.noVotes,
      abstainVotes: history.abstainVotes || 0,
    }))
  }

  // Generate mock data if no history exists
  const days = 7
  const data = []
  const trend = proposal.status === "Voting" ? "up" : proposal.status === "Completed" ? "stable" : "down"
  let yesValue = proposal.yesVotes / days
  let noValue = proposal.noVotes / days

  for (let i = 0; i < days; i++) {
    if (trend === "up") {
      yesValue += Math.random() * (proposal.yesVotes / days / 2)
      noValue += Math.random() * (proposal.noVotes / days / 3)
    } else if (trend === "down") {
      yesValue += Math.random() * (proposal.yesVotes / days / 3)
      noValue += Math.random() * (proposal.noVotes / days / 2)
    } else {
      yesValue += (Math.random() - 0.5) * (proposal.yesVotes / days / 2)
      noValue += (Math.random() - 0.5) * (proposal.noVotes / days / 2)
    }

    const date = new Date()
    date.setDate(date.getDate() - (days - i))

    data.push({
      date: format(date, "MMM dd"),
      yesVotes: Math.round(yesValue * (i + 1)),
      noVotes: Math.round(noValue * (i + 1)),
      abstainVotes: Math.round(((proposal.abstainVotes || 0) / days) * (i + 1)),
    })
  }

  return data
}

// Component for mini-charts in proposal list
const MiniCharts = ({ proposal }: { proposal: EnhancedProposal }) => {
  // Calculate vote data
  const totalVotes = proposal.yesVotes + proposal.noVotes + (proposal.abstainVotes || 0)
  const yesPercentage = totalVotes > 0 ? ((proposal.yesVotes / totalVotes) * 100).toFixed(1) : "0.0"
  const noPercentage = totalVotes > 0 ? ((proposal.noVotes / totalVotes) * 100).toFixed(1) : "0.0"
  const abstainPercentage =
    totalVotes > 0 && proposal.abstainVotes ? ((proposal.abstainVotes / totalVotes) * 100).toFixed(1) : "0.0"

  // Participation data (simulated)
  const participationData = [
    { name: "Voted", value: totalVotes },
    { name: "Eligible", value: Math.max(30 - totalVotes, 0) },
  ]

  // Voting history data
  const sparklineData = generateSparklineData(proposal)

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
                  { name: "Yes", value: proposal.yesVotes },
                  { name: "No", value: proposal.noVotes },
                  ...(proposal.abstainVotes ? [{ name: "Abstain", value: proposal.abstainVotes }] : []),
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
                {proposal.abstainVotes && <Cell fill="#f59e0b" />}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 mt-1">
          <span>Yes: {yesPercentage}%</span>
          <span>No: {noPercentage}%</span>
          {proposal.abstainVotes && <span>Abs: {abstainPercentage}%</span>}
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
              <Area type="monotone" dataKey="yesVotes" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} />
              <Area type="monotone" dataKey="noVotes" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
              {proposal.abstainVotes && (
                <Area
                  type="monotone"
                  dataKey="abstainVotes"
                  stackId="1"
                  stroke="#f59e0b"
                  fill="#f59e0b"
                  fillOpacity={0.3}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="text-[10px] text-gray-400 mt-1 text-center">Voting Trend</div>
      </div>
    </div>
  )
}

// Proposal Item Component
const ProposalItem = ({
  proposal,
  onViewDetails,
}: { proposal: EnhancedProposal; onViewDetails: (proposal: EnhancedProposal) => void }) => {
  const [isOpen, setIsOpen] = useState(false)

  // Calculate total votes and percentages
  const totalVotes = proposal.yesVotes + proposal.noVotes + (proposal.abstainVotes || 0)
  const yesPercentage = totalVotes > 0 ? ((proposal.yesVotes / totalVotes) * 100).toFixed(1) : "0.0"
  const noPercentage = totalVotes > 0 ? ((proposal.noVotes / totalVotes) * 100).toFixed(1) : "0.0"

  // Status icon mapping
  const statusIcon = {
    Voting: <Hourglass className="h-4 w-4" />,
    Completed: <CheckCircle2 className="h-4 w-4" />,
    Defeated: <XCircle className="h-4 w-4" />,
    Canceled: <XCircle className="h-4 w-4" />,
    Draft: <FileText className="h-4 w-4" />,
  }

  // Format date
  const formattedDate = new Date(proposal.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

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
            {proposal.amount && <span className="text-gray-400 ml-2">- {formatCurrency(proposal.amount)}</span>}
          </div>
          <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {formattedDate}
            </div>
            <div className="flex items-center">
              <User className="h-3 w-3 mr-1" />
              {proposal.proposer.name}
            </div>
            {proposal.category && (
              <Badge variant="outline" className="text-xs bg-black/20 border-gray-700">
                {proposal.category}
              </Badge>
            )}
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
            className={cn(
              "rounded-full px-3 py-0.5 text-xs font-medium",
              proposal.status === "Voting" && "bg-[#1C3B39] text-[#00C2B2] border-transparent",
              proposal.status === "Completed" && "bg-[#1C3B39] text-[#00C2B2] border-transparent",
              proposal.status === "Defeated" && "bg-red-900/20 text-red-400 border-transparent",
              proposal.status === "Canceled" && "bg-gray-800/50 text-gray-400 border-transparent",
              proposal.status === "Draft" && "bg-blue-900/20 text-blue-400 border-transparent",
            )}
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

      {/* Summary - always visible */}
      {proposal.summary && <div className="mt-2 text-sm text-gray-300">{proposal.summary}</div>}

      {/* Mini-charts section - always visible */}
      <MiniCharts proposal={proposal} />

      {/* Voting progress bar */}
      <div className="mt-3">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>
            Yes: {proposal.yesVotes} ({yesPercentage}%)
          </span>
          <span>
            No: {proposal.noVotes} ({noPercentage}%)
          </span>
          {proposal.abstainVotes && (
            <span>
              Abstain: {proposal.abstainVotes} ({((proposal.abstainVotes / totalVotes) * 100).toFixed(1)}%)
            </span>
          )}
        </div>
        <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
          <div className="absolute inset-y-0 left-0 bg-green-500 rounded-full" style={{ width: `${yesPercentage}%` }} />
          {proposal.abstainVotes && (
            <div
              className="absolute inset-y-0 bg-yellow-500 rounded-full"
              style={{
                left: `${yesPercentage}%`,
                width: `${((proposal.abstainVotes / totalVotes) * 100).toFixed(1)}%`,
              }}
            />
          )}
        </div>

        {proposal.quorum && (
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-gray-400">Quorum Status</span>
            <span className={cn("text-xs", proposal.quorum.achieved ? "text-[#00C2B2]" : "text-gray-400")}>
              {proposal.quorum.achieved
                ? "Required approval achieved"
                : `${proposal.quorum.required} more Yes votes required`}
            </span>
          </div>
        )}
      </div>

      <CollapsibleContent className="mt-4 space-y-4">
        {/* Description */}
        {proposal.description && (
          <div className="bg-black/20 p-3 rounded-lg">
            <h4 className="text-sm font-medium text-white mb-2">Description</h4>
            <p className="text-sm text-gray-300">{proposal.description}</p>
          </div>
        )}

        {/* Documents */}
        {proposal.documents && proposal.documents.length > 0 && (
          <div className="bg-black/20 p-3 rounded-lg">
            <h4 className="text-sm font-medium text-white mb-2">Documents</h4>
            <div className="space-y-2">
              {proposal.documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between bg-black/30 p-2 rounded">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="text-sm text-gray-300">{doc.name}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Download className="h-4 w-4 text-gray-400" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comments preview */}
        {proposal.comments && proposal.comments.length > 0 && (
          <div className="bg-black/20 p-3 rounded-lg">
            <h4 className="text-sm font-medium text-white mb-2">Recent Comments</h4>
            <div className="space-y-3">
              {proposal.comments.slice(0, 2).map((comment, index) => (
                <div key={index} className="flex space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                    <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">{comment.author.name}</span>
                      <span className="text-xs text-gray-400">{new Date(comment.timestamp).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-gray-300">{comment.text}</p>
                  </div>
                </div>
              ))}
              {proposal.comments.length > 2 && (
                <div className="text-center">
                  <Button variant="ghost" size="sm" className="text-xs text-gray-400">
                    View all {proposal.comments.length} comments
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* View Details Button */}
        <div className="flex justify-center">
          <Button
            onClick={() => onViewDetails(proposal)}
            className="bg-orange-900/50 text-orange-400 hover:bg-orange-800/70"
          >
            View Full Details
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

// Detailed Proposal View Component
const DetailedProposalView = ({
  proposal,
  isOpen,
  onClose,
}: {
  proposal: EnhancedProposal | null
  isOpen: boolean
  onClose: () => void
}) => {
  if (!proposal) return null

  const totalVotes = proposal.yesVotes + proposal.noVotes + (proposal.abstainVotes || 0)
  const yesPercentage = totalVotes > 0 ? ((proposal.yesVotes / totalVotes) * 100).toFixed(1) : "0.0"
  const noPercentage = totalVotes > 0 ? ((proposal.noVotes / totalVotes) * 100).toFixed(1) : "0.0"
  const abstainPercentage =
    totalVotes > 0 && proposal.abstainVotes ? ((proposal.abstainVotes / totalVotes) * 100).toFixed(1) : "0.0"

  // Voting history data
  const votingHistoryData = generateSparklineData(proposal)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-black/80 backdrop-blur-lg border-orange-600/30 text-white overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <Badge
              className={cn(
                "rounded-full px-3 py-0.5 text-xs font-medium",
                proposal.status === "Voting" && "bg-[#1C3B39] text-[#00C2B2] border-transparent",
                proposal.status === "Completed" && "bg-[#1C3B39] text-[#00C2B2] border-transparent",
                proposal.status === "Defeated" && "bg-red-900/20 text-red-400 border-transparent",
                proposal.status === "Canceled" && "bg-gray-800/50 text-gray-400 border-transparent",
                proposal.status === "Draft" && "bg-blue-900/20 text-blue-400 border-transparent",
              )}
            >
              {proposal.status}
            </Badge>
            {proposal.executable && (
              <Badge className="bg-purple-900/20 text-purple-400 border-transparent">Executable</Badge>
            )}
          </div>
          <DialogTitle className="text-2xl font-bold text-orange-400 mt-2">{proposal.title}</DialogTitle>
          <DialogDescription className="text-gray-300">{proposal.summary}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-black/30 p-3 rounded-lg">
            <div className="text-xs text-gray-400">Proposer</div>
            <div className="flex items-center mt-1">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage src={proposal.proposer.avatar} alt={proposal.proposer.name} />
                <AvatarFallback>{proposal.proposer.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{proposal.proposer.name}</span>
            </div>
          </div>
          <div className="bg-black/30 p-3 rounded-lg">
            <div className="text-xs text-gray-400">Created</div>
            <div className="flex items-center mt-1">
              <Calendar className="h-4 w-4 mr-2 text-gray-400" />
              <span className="text-sm font-medium">
                {new Date(proposal.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
          <div className="bg-black/30 p-3 rounded-lg">
            <div className="text-xs text-gray-400">{proposal.status === "Voting" ? "Ends" : "Ended"}</div>
            <div className="flex items-center mt-1">
              <Clock className="h-4 w-4 mr-2 text-gray-400" />
              <span className="text-sm font-medium">
                {proposal.endDate
                  ? new Date(proposal.endDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : proposal.timeRemaining || proposal.completedAgo || "N/A"}
              </span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="voting">Voting</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            {proposal.description && (
              <Card className="bg-black/30 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-sm text-orange-400">Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-300 whitespace-pre-line">{proposal.description}</div>
                </CardContent>
              </Card>
            )}

            {proposal.amount && (
              <Card className="bg-black/30 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-sm text-orange-400">Financial Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/20 p-3 rounded-lg">
                      <div className="text-xs text-gray-400">Amount</div>
                      <div className="text-lg font-bold text-white">{formatCurrency(proposal.amount)}</div>
                    </div>
                    <div className="bg-black/20 p-3 rounded-lg">
                      <div className="text-xs text-gray-400">Category</div>
                      <div className="text-lg font-bold text-white">{proposal.category || "Uncategorized"}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {proposal.executable && (
              <Card className="bg-black/30 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-sm text-orange-400">Execution Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-black/20 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-gray-400">Status</div>
                        <div className="text-sm font-medium text-white">
                          {proposal.executedAt ? "Executed" : "Ready for Execution"}
                        </div>
                      </div>
                      {proposal.executedAt ? (
                        <div>
                          <div className="text-xs text-gray-400">Executed On</div>
                          <div className="text-sm font-medium text-white">
                            {new Date(proposal.executedAt).toLocaleDateString()}
                          </div>
                        </div>
                      ) : (
                        <Button
                          className="bg-purple-900/50 text-purple-400 hover:bg-purple-800/70"
                          disabled={proposal.status !== "Completed"}
                        >
                          Execute Proposal
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="voting" className="space-y-4">
            <Card className="bg-black/30 border-gray-800">
              <CardHeader>
                <CardTitle className="text-sm text-orange-400">Voting Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2 text-gray-300">Vote Distribution</h4>
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: "Yes", value: proposal.yesVotes },
                              { name: "No", value: proposal.noVotes },
                              ...(proposal.abstainVotes ? [{ name: "Abstain", value: proposal.abstainVotes }] : []),
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
                            {proposal.abstainVotes && <Cell key="cell-2" fill="#f59e0b" />}
                          </Pie>
                          <Tooltip contentStyle={{ backgroundColor: "#000000", border: "none" }} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2 text-gray-300">Voting Timeline</h4>
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={votingHistoryData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                          <XAxis dataKey="date" stroke="#ffffff80" />
                          <YAxis stroke="#ffffff80" />
                          <Tooltip contentStyle={{ backgroundColor: "#000000", border: "none" }} />
                          <Legend />
                          <Area
                            type="monotone"
                            dataKey="yesVotes"
                            name="Yes"
                            stackId="1"
                            stroke="#22c55e"
                            fill="#22c55e"
                            fillOpacity={0.3}
                          />
                          <Area
                            type="monotone"
                            dataKey="noVotes"
                            name="No"
                            stackId="1"
                            stroke="#ef4444"
                            fill="#ef4444"
                            fillOpacity={0.3}
                          />
                          {proposal.abstainVotes && (
                            <Area
                              type="monotone"
                              dataKey="abstainVotes"
                              name="Abstain"
                              stackId="1"
                              stroke="#f59e0b"
                              fill="#f59e0b"
                              fillOpacity={0.3}
                            />
                          )}
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2 text-gray-300">Voting Progress</h4>
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>
                      Yes: {proposal.yesVotes} ({yesPercentage}%)
                    </span>
                    <span>
                      No: {proposal.noVotes} ({noPercentage}%)
                    </span>
                    {proposal.abstainVotes && (
                      <span>
                        Abstain: {proposal.abstainVotes} ({abstainPercentage}%)
                      </span>
                    )}
                  </div>
                  <div className="relative h-4 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-green-500 rounded-full"
                      style={{ width: `${yesPercentage}%` }}
                    />
                    {proposal.abstainVotes && (
                      <div
                        className="absolute inset-y-0 bg-yellow-500 rounded-full"
                        style={{
                          left: `${yesPercentage}%`,
                          width: `${abstainPercentage}%`,
                        }}
                      />
                    )}
                  </div>

                  {proposal.quorum && (
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-400">Quorum Status</span>
                      <span className={cn("text-sm", proposal.quorum.achieved ? "text-[#00C2B2]" : "text-gray-400")}>
                        {proposal.quorum.achieved
                          ? "Required approval achieved"
                          : `${proposal.quorum.required} more Yes votes required`}
                      </span>
                    </div>
                  )}
                </div>

                {proposal.status === "Voting" && (
                  <div className="flex space-x-3 mt-6">
                    <Button className="flex-1 bg-green-900/50 text-green-400 hover:bg-green-800/70">
                      <ThumbsUp className="h-4 w-4 mr-2" /> Vote Yes
                    </Button>
                    <Button className="flex-1 bg-red-900/50 text-red-400 hover:bg-red-800/70">
                      <ThumbsDown className="h-4 w-4 mr-2" /> Vote No
                    </Button>
                    <Button className="flex-1 bg-yellow-900/50 text-yellow-400 hover:bg-yellow-800/70">Abstain</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <Card className="bg-black/30 border-gray-800">
              <CardHeader>
                <CardTitle className="text-sm text-orange-400">Related Documents</CardTitle>
              </CardHeader>
              <CardContent>
                {proposal.documents && proposal.documents.length > 0 ? (
                  <div className="space-y-3">
                    {proposal.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between bg-black/20 p-3 rounded-lg">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 mr-3 text-gray-400" />
                          <div>
                            <div className="text-sm font-medium text-white">{doc.name}</div>
                            <div className="text-xs text-gray-400">{doc.type}</div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="text-xs">
                          <Download className="h-4 w-4 mr-2" /> Download
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-400">No documents attached to this proposal</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comments" className="space-y-4">
            <Card className="bg-black/30 border-gray-800">
              <CardHeader>
                <CardTitle className="text-sm text-orange-400">Discussion ({proposal.comments?.length || 0})</CardTitle>
              </CardHeader>
              <CardContent>
                {proposal.comments && proposal.comments.length > 0 ? (
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-4">
                      {proposal.comments.map((comment, index) => (
                        <div key={index} className="bg-black/20 p-3 rounded-lg">
                          <div className="flex space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                              <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-white">{comment.author.name}</span>
                                <span className="text-xs text-gray-400">
                                  {new Date(comment.timestamp).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-sm text-gray-300 mt-1">{comment.text}</p>

                              {comment.replies && comment.replies.length > 0 && (
                                <div className="mt-3 pl-4 border-l border-gray-800 space-y-3">
                                  {comment.replies.map((reply, replyIndex) => (
                                    <div key={replyIndex} className="flex space-x-3">
                                      <Avatar className="h-6 w-6">
                                        <AvatarImage src={reply.author.avatar} alt={reply.author.name} />
                                        <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                                      </Avatar>
                                      <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                          <span className="text-xs font-medium text-white">{reply.author.name}</span>
                                          <span className="text-xs text-gray-400">
                                            {new Date(reply.timestamp).toLocaleDateString()}
                                          </span>
                                        </div>
                                        <p className="text-xs text-gray-300 mt-1">{reply.text}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="text-center py-6 text-gray-400">No comments on this proposal yet</div>
                )}

                <div className="mt-4">
                  <Label htmlFor="comment" className="text-sm text-gray-300">
                    Add a comment
                  </Label>
                  <div className="flex space-x-2 mt-2">
                    <Input
                      id="comment"
                      placeholder="Share your thoughts..."
                      className="bg-black/20 border-gray-700 text-white"
                    />
                    <Button className="bg-orange-900/50 text-orange-400 hover:bg-orange-800/70">
                      <MessageSquare className="h-4 w-4 mr-2" /> Comment
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function EnhancedProposalSection({ proposals, daoName }: EnhancedProposalSectionProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("newest")
  const [selectedProposal, setSelectedProposal] = useState<EnhancedProposal | null>(null)
  const [isDetailedViewOpen, setIsDetailedViewOpen] = useState(false)

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>()
    proposals.forEach((proposal) => {
      if (proposal.category) {
        uniqueCategories.add(proposal.category)
      }
    })
    return Array.from(uniqueCategories)
  }, [proposals])

  // Filter and sort proposals
  const filteredProposals = useMemo(() => {
    return proposals
      .filter((proposal) => {
        // Search filter
        const matchesSearch =
          searchQuery === "" ||
          proposal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (proposal.description && proposal.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
          proposal.proposer.name.toLowerCase().includes(searchQuery.toLowerCase())

        // Status filter
        const matchesStatus = statusFilter === "all" || proposal.status === statusFilter

        // Category filter
        const matchesCategory = categoryFilter === "all" || proposal.category === categoryFilter

        return matchesSearch && matchesStatus && matchesCategory
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "newest":
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          case "oldest":
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          case "most-votes":
            return b.yesVotes + b.noVotes + (b.abstainVotes || 0) - (a.yesVotes + a.noVotes + (a.abstainVotes || 0))
          case "highest-approval":
            const aTotal = a.yesVotes + a.noVotes + (a.abstainVotes || 0)
            const bTotal = b.yesVotes + b.noVotes + (b.abstainVotes || 0)
            const aApproval = aTotal > 0 ? a.yesVotes / aTotal : 0
            const bApproval = bTotal > 0 ? b.yesVotes / bTotal : 0
            return bApproval - aApproval
          default:
            return 0
        }
      })
  }, [proposals, searchQuery, statusFilter, categoryFilter, sortBy])

  const handleViewDetails = (proposal: EnhancedProposal) => {
    setSelectedProposal(proposal)
    setIsDetailedViewOpen(true)
  }

  return (
    <Card className="bg-black/50 border-orange-600/30">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-orange-400">{daoName} Proposals</CardTitle>
        <Button className="bg-orange-900/50 text-orange-400 hover:bg-orange-800/70">+ New Proposal</Button>
      </CardHeader>
      <CardContent>
        {/* Remove these duplicated elements:
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-orange-400">{daoName} Proposals</h2>
          <Button className="bg-orange-900/50 text-orange-400 hover:bg-orange-800/70">+ New Proposal</Button>
        </div>
        */}

        {/* Filters and Search */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search proposals..."
              className="pl-10 bg-black/20 border-gray-700 text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="bg-black/20 border-gray-700 text-white">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-gray-700 text-white">
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Voting">Voting</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Defeated">Defeated</SelectItem>
                <SelectItem value="Canceled">Canceled</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {categories.length > 0 && (
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="bg-black/20 border-gray-700 text-white">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-gray-700 text-white">
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-black/20 border-gray-700 text-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-gray-700 text-white">
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="most-votes">Most Votes</SelectItem>
                <SelectItem value="highest-approval">Highest Approval</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results count */}
        <div className="text-sm text-gray-400">
          Showing {filteredProposals.length} of {proposals.length} proposals
        </div>

        {/* Proposals List */}
        <div className="space-y-4 mt-4 max-h-[400px] overflow-y-auto pr-2">
          {filteredProposals.length > 0 ? (
            filteredProposals.map((proposal) => (
              <ProposalItem key={proposal.id} proposal={proposal} onViewDetails={handleViewDetails} />
            ))
          ) : (
            <div className="text-center py-10 bg-black/20 rounded-lg border border-gray-800">
              <FileText className="h-10 w-10 text-gray-500 mx-auto mb-2" />
              <h3 className="text-lg font-medium text-gray-300">No proposals found</h3>
              <p className="text-sm text-gray-400 mt-1">
                {searchQuery || statusFilter !== "all" || categoryFilter !== "all"
                  ? "Try adjusting your filters"
                  : "There are no proposals yet"}
              </p>
            </div>
          )}
        </div>

        {/* Detailed Proposal View */}
        <DetailedProposalView
          proposal={selectedProposal}
          isOpen={isDetailedViewOpen}
          onClose={() => setIsDetailedViewOpen(false)}
        />
      </CardContent>
    </Card>
  )
}
