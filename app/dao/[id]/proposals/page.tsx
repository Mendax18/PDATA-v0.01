import { DAOProposals } from "@/components/dao-proposals"

export default function ProposalsPage() {
  return (
    <div className="container mx-auto py-6 px-4">
      <h2 className="text-2xl font-bold text-white mb-6">Proposals</h2>
      <DAOProposals />
    </div>
  )
}
