import { ProposalsList } from "@/components/proposals-list"

const proposals = [
  {
    id: "1",
    title: "Sponsoring Solana Contentathon",
    amount: "$2,000",
    status: "voting" as const,
    yesVotes: 12,
    noVotes: 0,
    totalVotes: 12,
    timeRemaining: {
      days: 1,
      hours: 12,
      minutes: 27,
    },
    quorumRequired: 5,
  },
  {
    id: "2",
    title: "Add community member EPKPw...rUCZL",
    status: "completed" as const,
    yesVotes: 15,
    noVotes: 0,
    totalVotes: 15,
    completedAgo: "3 days ago",
  },
  {
    id: "3",
    title: "Sponsoring the reward pool for GREED Academy Semester 2",
    amount: "$15,000",
    status: "voting" as const,
    yesVotes: 17,
    noVotes: 2,
    totalVotes: 19,
    timeRemaining: {
      days: 0,
      hours: 8,
      minutes: 47,
    },
    quorumRequired: 0,
  },
  {
    id: "4",
    title: "Deposit 100000.0000 USDC into Save",
    status: "defeated" as const,
    yesVotes: 8,
    noVotes: 12,
    totalVotes: 20,
    completedAgo: "4 days ago",
  },
  {
    id: "5",
    title: "Add community member By63j...WheWi",
    status: "completed" as const,
    yesVotes: 16,
    noVotes: 1,
    totalVotes: 17,
    completedAgo: "16 days ago",
  },
]

export default function ProposalsPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold text-orange-400 mb-6">Proposals</h1>
      <ProposalsList proposals={proposals} />
    </div>
  )
}
