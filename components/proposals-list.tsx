"use client"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Info, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Proposal {
  id: string
  title: string
  status: "voting" | "completed" | "defeated"
  yesVotes: number
  noVotes: number
  totalVotes: number
  timeRemaining?: {
    days: number
    hours: number
    minutes: number
  }
  quorumRequired?: number
  completedAgo?: string
  amount?: string
}

interface ProposalsListProps {
  proposals: Proposal[]
}

export function ProposalsList({ proposals }: ProposalsListProps) {
  return (
    <div className="space-y-2">
      {proposals.map((proposal) => (
        <Card key={proposal.id} className="bg-black/40 hover:bg-black/60 transition-colors p-4 cursor-pointer">
          <div className="flex items-start justify-between">
            <div className="space-y-3 flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-white">
                    {proposal.title}
                    {proposal.amount && <span className="text-gray-400"> - {proposal.amount}</span>}
                  </h3>
                  {proposal.timeRemaining && (
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-400">
                        {proposal.timeRemaining.days}d {proposal.timeRemaining.hours}h {proposal.timeRemaining.minutes}m
                      </span>
                      <div className="w-24 h-1 bg-gray-800 rounded-full">
                        <div
                          className="h-full bg-green-500 rounded-full"
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
                  {(proposal.status === "completed" || proposal.status === "defeated") && (
                    <p className="text-sm text-gray-400">
                      {proposal.status === "completed" ? "Completed" : "Defeated"} {proposal.completedAgo}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={cn(
                      "capitalize",
                      proposal.status === "voting" && "bg-green-900/20 text-green-400 border-green-900/50",
                      proposal.status === "completed" && "bg-blue-900/20 text-blue-400 border-blue-900/50",
                      proposal.status === "defeated" && "bg-red-900/20 text-red-400 border-red-900/50",
                    )}
                  >
                    {proposal.status}
                  </Badge>
                  <ChevronRight className="h-5 w-5 text-gray-500" />
                </div>
              </div>

              {proposal.status === "voting" && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <div>
                      <span className="text-gray-400">Yes Votes</span>
                      <div className="text-white">
                        {proposal.yesVotes}{" "}
                        <span className="text-gray-500">
                          {((proposal.yesVotes / proposal.totalVotes) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-400">No Votes</span>
                      <div className="text-white">
                        {proposal.noVotes}{" "}
                        <span className="text-gray-500">
                          {((proposal.noVotes / proposal.totalVotes) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <Progress
                    value={(proposal.yesVotes / proposal.totalVotes) * 100}
                    className="h-2 bg-red-900/20"
                    indicatorClassName="bg-green-500"
                  />
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-gray-400">Approval Quorum</span>
                      <Info className="h-4 w-4 text-gray-500" />
                    </div>
                    {proposal.quorumRequired && proposal.quorumRequired > 0 ? (
                      <span className="text-sm text-gray-400">{proposal.quorumRequired} more Yes votes required</span>
                    ) : (
                      <span className="text-sm text-green-400">Required approval achieved</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
