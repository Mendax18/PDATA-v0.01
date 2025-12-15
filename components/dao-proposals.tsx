"use client"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Info, ChevronRight, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProposalData {
  id: string
  title: string
  amount?: string
  status: "Voting" | "Completed" | "Defeated"
  timeRemaining?: {
    days: number
    hours: number
    minutes: number
  }
  yesVotes: {
    count: number
    percentage: number
  }
  noVotes: {
    count: number
    percentage: number
  }
  quorum?: {
    required: number
    achieved: boolean
  }
  completedAgo?: string
}

const proposals: ProposalData[] = [
  {
    id: "1",
    title: "Sponsoring Solana Contentathon",
    amount: "$2,000",
    status: "Voting",
    timeRemaining: {
      days: 1,
      hours: 12,
      minutes: 27,
    },
    yesVotes: {
      count: 12,
      percentage: 100.0,
    },
    noVotes: {
      count: 0,
      percentage: 0.0,
    },
    quorum: {
      required: 5,
      achieved: false,
    },
  },
  {
    id: "2",
    title: "Add community member EPKPw...rUCZL",
    status: "Completed",
    completedAgo: "3 days ago",
    yesVotes: {
      count: 15,
      percentage: 100,
    },
    noVotes: {
      count: 0,
      percentage: 0,
    },
  },
  {
    id: "3",
    title: "Sponsoring the reward pool for GREED Academy Semester 2",
    amount: "$15,000",
    status: "Voting",
    timeRemaining: {
      days: 0,
      hours: 8,
      minutes: 47,
    },
    yesVotes: {
      count: 17,
      percentage: 89.5,
    },
    noVotes: {
      count: 2,
      percentage: 10.5,
    },
    quorum: {
      required: 0,
      achieved: true,
    },
  },
  {
    id: "4",
    title: "Deposit 100000.0000 USDC into Save",
    status: "Defeated",
    completedAgo: "4 days ago",
    yesVotes: {
      count: 8,
      percentage: 40,
    },
    noVotes: {
      count: 12,
      percentage: 60,
    },
  },
  {
    id: "5",
    title: "Add community member By63j...WheWi",
    status: "Completed",
    completedAgo: "16 days ago",
    yesVotes: {
      count: 16,
      percentage: 94,
    },
    noVotes: {
      count: 1,
      percentage: 6,
    },
  },
]

export function DAOProposals() {
  return (
    <div className="space-y-2">
      {proposals.map((proposal) => (
        <Card key={proposal.id} className="bg-[#1C1C1F] hover:bg-[#1C1C1F]/90 transition-colors">
          <div className="p-4 space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="text-[15px] text-white font-medium">
                  {proposal.title}
                  {proposal.amount && <span className="text-gray-400"> - {proposal.amount}</span>}
                </h3>
                {proposal.timeRemaining && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-400">
                      {proposal.timeRemaining.days}d {proposal.timeRemaining.hours}h {proposal.timeRemaining.minutes}m
                    </span>
                    <div className="w-24 h-1 bg-[#2C2C2F] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#00C2B2] rounded-full"
                        style={{
                          width: `${
                            ((proposal.timeRemaining.days * 24 * 60 +
                              proposal.timeRemaining.hours * 60 +
                              proposal.timeRemaining.minutes) /
                              (2 * 24 * 60)) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                )}
                {proposal.completedAgo && (
                  <p className="text-sm text-gray-400">
                    {proposal.status === "Completed" ? "Completed" : "Defeated"} {proposal.completedAgo}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={cn(
                    "rounded-full px-3 py-0.5 text-xs font-medium",
                    proposal.status === "Voting" && "bg-[#1C3B39] text-[#00C2B2] border-transparent",
                    proposal.status === "Completed" && "bg-[#1C3B39] text-[#00C2B2] border-transparent",
                    proposal.status === "Defeated" && "bg-red-900/20 text-red-400 border-transparent",
                  )}
                >
                  {proposal.status}
                </Badge>
                <ChevronRight className="h-5 w-5 text-gray-500" />
              </div>
            </div>

            {/* Voting Stats */}
            {proposal.status === "Voting" && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-400">Yes Votes</div>
                    <div>
                      <span className="text-white">{proposal.yesVotes.count}</span>{" "}
                      <span className="text-gray-500">{proposal.yesVotes.percentage.toFixed(1)}%</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">No Votes</div>
                    <div>
                      <span className="text-white">{proposal.noVotes.count}</span>{" "}
                      <span className="text-gray-500">{proposal.noVotes.percentage.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>

                {/* Vote Progress Bar */}
                <div className="relative h-2">
                  <div className="absolute inset-0 bg-red-900/20 rounded-full" />
                  <div
                    className="absolute inset-y-0 left-0 bg-[#00C2B2] rounded-full"
                    style={{ width: `${proposal.yesVotes.percentage}%` }}
                  />
                </div>

                {/* Quorum Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-gray-400">Approval Quorum</span>
                    <Info className="h-4 w-4 text-gray-500" />
                  </div>
                  {proposal.quorum && (
                    <span className={cn("text-sm", proposal.quorum.achieved ? "text-[#00C2B2]" : "text-gray-400")}>
                      {proposal.quorum.achieved
                        ? "Required approval achieved"
                        : `${proposal.quorum.required} more Yes votes required`}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  )
}
