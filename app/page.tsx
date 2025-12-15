"use client"

import { useState, useMemo, useEffect } from "react"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { ArrowUpDown, ArrowDown, ArrowUp } from "lucide-react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DAODetailsModal } from "@/components/dao-details-modal"
import { NewestDAOs } from "@/components/newest-daos"
import { getDAOLogo, defaultLogo } from "@/components/dao-logos"
import { fetchDuneProposals, type DailyProposalData } from "@/actions/fetch-dune-proposals"

// Add debugging function to help diagnose chart issues
function debugChartData(name, data) {
  console.log(`Debug ${name}:`, {
    dataExists: !!data,
    length: data?.length || 0,
    sample: data?.slice(0, 2) || "No data",
    isArray: Array.isArray(data),
  })
}

const daoGrowthData = [
  { month: "May 2025", newDaos: 151, totalDaos: 151 },
  { month: "June 2025", newDaos: 44, totalDaos: 195 },
  { month: "July 2025", newDaos: 34, totalDaos: 229 },
]

// Debug DAO growth data
debugChartData("DAO Growth Data", daoGrowthData)

// Fallback data in case the Dune query fails
const fallbackProposalsData = [
  { day: "Mar 1", originalDate: "2025-03-01", proposals: 42 },
  { day: "Mar 2", originalDate: "2025-03-02", proposals: 38 },
  { day: "Mar 3", originalDate: "2025-03-03", proposals: 45 },
  { day: "Mar 4", originalDate: "2025-03-04", proposals: 39 },
  { day: "Mar 5", originalDate: "2025-03-05", proposals: 52 },
  { day: "Mar 6", originalDate: "2025-03-06", proposals: 48 },
  { day: "Mar 7", originalDate: "2025-03-07", proposals: 55 },
  { day: "Mar 8", originalDate: "2025-03-08", proposals: 51 },
  { day: "Mar 9", originalDate: "2025-03-09", proposals: 49 },
  { day: "Mar 10", originalDate: "2025-03-10", proposals: 63 },
  { day: "Mar 11", originalDate: "2025-03-11", proposals: 59 },
  { day: "Mar 12", originalDate: "2025-03-12", proposals: 47 },
  { day: "Mar 13", originalDate: "2025-03-13", proposals: 55 },
  { day: "Mar 14", originalDate: "2025-03-14", proposals: 60 },
]

// Debug fallback proposals data
debugChartData("Fallback Proposals Data", fallbackProposalsData)

// Update the daoDetails object with exact numbers from the image
const daoDetails = {
  BonkDAO: {
    description: "BonkDAO governs the Bonk ecosystem on Solana.",
    members: 14805,
    votes: 25398,
    proposals: 82,
    tvl: 77965829.0,
  },
  MonarkDAO: {
    description: "MonarkDAO governs the Monark ecosystem on Solana.",
    members: 9,
    votes: 20,
    proposals: 5,
    tvl: 0,
  },
  Grape: {
    description: "Grape Protocol DAO governance.",
    members: 346,
    votes: 5237,
    proposals: 255,
    tvl: 963428.0,
  },
  Mango: {
    description: "Mango Markets DAO governance.",
    members: 321,
    votes: 5676,
    proposals: 963,
    tvl: 22814324,
  },
  Solend: {
    description: "Solend Protocol DAO governance.",
    members: 303,
    votes: 508,
    proposals: 13,
    tvl: 0,
  },
  DeanListNetwork: {
    description: "DeanList Network DAO governance.",
    members: 247,
    votes: 4594,
    proposals: 321,
    tvl: 85060.0,
    treasuryAllocation: [
      { name: "Development", value: 45 },
      { name: "Operations", value: 25 },
      { name: "Marketing", value: 20 },
      { name: "Reserves", value: 10 },
    ],
    monthlyActivity: [
      { month: "Oct", transactions: 12000, newMembers: 15 },
      { month: "Nov", transactions: 15000, newMembers: 22 },
      { month: "Dec", transactions: 18000, newMembers: 25 },
      { month: "Jan", transactions: 20000, newMembers: 18 },
      { month: "Feb", transactions: 22000, newMembers: 20 },
      { month: "Mar", transactions: 19000, newMembers: 12 },
    ],
    governance: {
      votingPower: 450000,
      quorum: 12,
      proposalThreshold: 25000,
      votingPeriod: 3,
    },
    tokenPerformance: [
      { date: "2024-10-01", price: 0.25 },
      { date: "2024-11-01", price: 0.28 },
      { date: "2024-12-01", price: 0.32 },
      { date: "2025-01-01", price: 0.35 },
      { date: "2025-02-01", price: 0.3 },
      { date: "2025-03-01", price: 0.33 },
    ],
    recentProposals: [
      {
        id: "PROP-001",
        title: "Vote for our AllDomains Collab winning criteria!",
        status: "Completed",
        completedAgo: "Completed 8 days ago",
        yesVotes: 156,
        noVotes: 12,
        votes: 168,
      },
      {
        id: "PROP-002",
        title: "Removal of DL Symmetry Basket Liquidity",
        status: "Completed",
        completedAgo: "Succeeded 8 days ago",
        yesVotes: 189,
        noVotes: 15,
        votes: 204,
        executable: true,
      },
      {
        id: "PROP-003",
        title: "Adapt Quorum based on the last proposal",
        status: "Completed",
        completedAgo: "Completed 8 days ago",
        yesVotes: 145,
        noVotes: 23,
        votes: 168,
      },
      {
        id: "PROP-004",
        title: "Fund Dean's List DAO Website Redesign - DEAN Payout",
        status: "Completed",
        completedAgo: "Completed 8 days ago",
        yesVotes: 178,
        noVotes: 8,
        votes: 186,
        amount: 25000,
      },
      {
        id: "PROP-005",
        title: "2025 March Quorum Check",
        status: "Defeated",
        completedAgo: "Defeated 8 days ago",
        yesVotes: 98,
        noVotes: 145,
        votes: 243,
      },
      {
        id: "PROP-006",
        title: "Set dean_liquidity_reserves.sol as primary domain for EZ3V9...NprJX",
        status: "Completed",
        completedAgo: "Succeeded 17 days ago",
        yesVotes: 167,
        noVotes: 12,
        votes: 179,
        executable: true,
      },
    ],
  },
  "Adrena DAO": {
    description: "Adrena Protocol DAO governance.",
    members: 139,
    votes: 731,
    proposals: 107,
    tvl: 195365,
  },
  "Sol Man": {
    description: "Sol Man DAO governance.",
    members: 69,
    votes: 360,
    proposals: 25,
    tvl: 32680.0,
  },
  MonkeDAO: {
    description: "MonkeDAO governance.",
    members: 34,
    votes: 2855,
    proposals: 553,
    tvl: 60860,
  },
  "Realms Ecosystem DAO": {
    description: "Realms Ecosystem DAO governance.",
    members: 30,
    votes: 163,
    proposals: 33,
    tvl: 139715,
    treasuryAllocation: [
      { name: "Development", value: 50 },
      { name: "Grants", value: 30 },
      { name: "Operations", value: 20 },
    ],
    monthlyActivity: [
      { month: "Oct", transactions: 15000, newMembers: 5 },
      { month: "Nov", transactions: 18000, newMembers: 8 },
      { month: "Dec", transactions: 22000, newMembers: 7 },
      { month: "Jan", transactions: 25000, newMembers: 6 },
      { month: "Feb", transactions: 20000, newMembers: 4 },
      { month: "Mar", transactions: 18000, newMembers: 0 },
    ],
    governance: {
      votingPower: 350000,
      quorum: 15,
      proposalThreshold: 10000,
      votingPeriod: 3,
    },
    tokenPerformance: [
      { date: "2024-10-01", price: 0.15 },
      { date: "2024-11-01", price: 0.18 },
      { date: "2024-12-01", price: 0.22 },
      { date: "2025-01-01", price: 0.2 },
      { date: "2025-02-01", price: 0.25 },
      { date: "2025-03-01", price: 0.23 },
    ],
    recentProposals: [
      {
        id: "PROP-001",
        title: "Sponsoring Solana Contentathon - $2,000",
        status: "Voting",
        timeRemaining: "01d 12h 27m",
        yesVotes: 12,
        yesPercentage: "100.0%",
        noVotes: 0,
        noPercentage: "0.0%",
        quorumStatus: "5 more Yes votes required",
      },
      {
        id: "PROP-002",
        title: "Add community member EPKPw...rUCZL",
        status: "Completed",
        completedAgo: "Completed 3 days ago",
        votes: 163,
      },
      {
        id: "PROP-003",
        title: "Sponsoring the reward pool for GREED Academy Semester 2 - $15,000",
        status: "Voting",
        timeRemaining: "00d 08h 47m",
        yesVotes: 17,
        yesPercentage: "89.5%",
        noVotes: 2,
        noPercentage: "10.5%",
        quorumStatus: "Required approval achieved",
      },
      {
        id: "PROP-004",
        title: "Deposit 100000.0000 USDC into Save",
        status: "Defeated",
        completedAgo: "Defeated 4 days ago",
        votes: 163,
      },
      {
        id: "PROP-005",
        title: "Add community member By63j...WheWi",
        status: "Completed",
        completedAgo: "Completed 16 days ago",
        votes: 163,
      },
    ],
  },
  FungiDAO: {
    description: "FungiDAO governance.",
    members: 9,
    votes: 20,
    proposals: 5,
    tvl: 17159,
  },
  TheExiledApes: {
    description: "The Exiled Apes DAO governance.",
    members: 5,
    votes: 112,
    proposals: 42,
    tvl: 0,
  },
  "Metaplex Foundation": {
    description: "Metaplex Foundation DAO governance.",
    members: 3,
    votes: 131,
    proposals: 49,
    tvl: 0,
  },
  "Metaplex Genesis": {
    description: "Metaplex Genesis DAO governance.",
    members: 3,
    votes: 48,
    proposals: 18,
    tvl: 0,
  },
  Jito: {
    description: "Jito Protocol DAO governance.",
    members: 86,
    votes: 0,
    proposals: 40,
    tvl: 574619195.0,
  },
  "Metaplex DAO": {
    description: "Metaplex DAO governance.",
    members: 130,
    votes: 0,
    proposals: 27,
    tvl: 58175361.0,
  },
  "DL Metaplex Grants": {
    description: "DL Metaplex Grants DAO governance.",
    members: 42,
    votes: 187,
    proposals: 31,
    tvl: 245680.0,
  },
  "Pyth Network": {
    description: "Pyth Network DAO governance for the oracle protocol.",
    members: 156,
    votes: 892,
    proposals: 67,
    tvl: 406543.0,
  },
  "The $GREED Experiment": {
    description: "The $GREED Experiment DAO governance.",
    members: 78,
    votes: 423,
    proposals: 29,
    tvl: 15118.0,
  },
  "SolBlaze DAO": {
    description: "SolBlaze DAO governance for the SolBlaze ecosystem.",
    members: 63,
    votes: 315,
    proposals: 22,
    tvl: 411622.0,
  },
  Marinade: {
    description: "Marinade DAO governance for the liquid staking protocol.",
    members: 189,
    votes: 1245,
    proposals: 83,
    tvl: 68743492.0,
  },
}

// Update the type definition for sort fields
type SortField = "members" | "votes" | "proposals" | "tvl"
type SortDirection = "asc" | "desc"

export default function Page() {
  const [selectedDAO, setSelectedDAO] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sortField, setSortField] = useState<SortField>("members")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [dailyProposalsData, setDailyProposalsData] = useState<DailyProposalData[]>(fallbackProposalsData)
  const [isLoadingProposals, setIsLoadingProposals] = useState(true)

  // Fetch the Dune data when the component mounts
  useEffect(() => {
    async function loadDuneData() {
      try {
        setIsLoadingProposals(true)
        const data = await fetchDuneProposals()
        if (data && data.length > 0) {
          setDailyProposalsData(data)
          console.log("Loaded Dune data:", data)
          debugChartData("Loaded Dune Data", data)
        } else {
          console.warn("No data returned from Dune query, using fallback data")
          debugChartData("Using Fallback Data", fallbackProposalsData)
          setDailyProposalsData(fallbackProposalsData)
        }
      } catch (error) {
        console.error("Failed to load Dune data:", error)
        // Keep using the fallback data
        debugChartData("Error - Using Fallback Data", fallbackProposalsData)
        setDailyProposalsData(fallbackProposalsData)
      } finally {
        setIsLoadingProposals(false)
      }
    }

    loadDuneData()
  }, [])

  // Calculate total TVL from all DAOs
  const totalTVL = useMemo(() => {
    return Object.values(daoDetails).reduce((sum, dao) => sum + dao.tvl, 0)
  }, [])

  // Format TVL for display
  const formattedTVL = useMemo(() => {
    if (totalTVL >= 1000000000) {
      return `${(totalTVL / 1000000000).toFixed(1)}B`
    } else if (totalTVL >= 1000000) {
      return `${(totalTVL / 1000000).toFixed(1)}M`
    } else {
      return `${totalTVL.toLocaleString()}`
    }
  }, [totalTVL])

  const openDAODetails = (daoName: string) => {
    setSelectedDAO(daoName)
    setIsModalOpen(true)
  }

  const closeDAODetails = () => {
    setIsModalOpen(false)
  }

  // Handle sorting
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      // Set new field and default to descending
      setSortField(field)
      setSortDirection("desc")
    }
  }

  // Sort the DAOs based on current sort field and direction
  const sortedDAOs = Object.entries(daoDetails).sort(([nameA, daoA], [nameB, daoB]) => {
    const valueA = daoA[sortField] || 0
    const valueB = daoB[sortField] || 0

    if (sortDirection === "asc") {
      return valueA - valueB
    } else {
      return valueB - valueA
    }
  })

  // Get top 5 DAOs by TVL for the chart
  const top5DAOsByTVL = useMemo(() => {
    return Object.entries(daoDetails)
      .sort(([, a], [, b]) => b.tvl - a.tvl)
      .slice(0, 5)
      .map(([name]) => name)
  }, [])

  // Debug top 5 DAOs
  debugChartData("Top 5 DAOs by TVL", top5DAOsByTVL)

  // Create simulated historical TVL data for the top 5 DAOs
  const tvlData = useMemo(() => {
    const months = ["Oct 2024", "Nov 2024", "Dec 2024", "Jan 2025", "Feb 2025", "Mar 2025"]

    return months.map((month, index) => {
      const monthData: any = { month }

      top5DAOsByTVL.forEach((daoName) => {
        const currentTVL = daoDetails[daoName].tvl
        // Create a simulated historical value with some random variation
        // Earlier months have lower values to show growth trend
        const factor = 0.7 + index * 0.06 + Math.random() * 0.04
        monthData[daoName] = Math.round((currentTVL * factor) / 1000000) // Convert to millions for better display
      })

      return monthData
    })
  }, [top5DAOsByTVL])

  // Debug TVL data
  debugChartData("TVL Data", tvlData)

  // Create data for the Top 5 DAOs by TVL bar chart
  const topDaosTVLData = useMemo(() => {
    return top5DAOsByTVL.map((daoName) => ({
      name: daoName,
      tvl: Math.round(daoDetails[daoName].tvl / 1000000), // Convert to millions for better display
    }))
  }, [top5DAOsByTVL])

  // Debug top DAOs TVL data
  debugChartData("Top DAOs TVL Data", topDaosTVLData)

  // Helper function to render sort indicator
  const renderSortIndicator = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="ml-1 h-4 w-4 inline" />
    }

    return sortDirection === "asc" ? (
      <ArrowUp className="ml-1 h-4 w-4 inline text-green-400" />
    ) : (
      <ArrowDown className="ml-1 h-4 w-4 inline text-green-400" />
    )
  }

  // Safe function to get DAO logo with fallback
  const getSafeDAOLogo = (daoName: string | null | undefined) => {
    if (!daoName) return defaultLogo
    return getDAOLogo(daoName)
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-orange-950 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-black/40 backdrop-blur-lg p-4 hidden lg:block border-r border-orange-800/30">
        <div className="flex items-center mb-6">
          <Image
            src="/images/pandata-logo-new.png"
            alt="Pandata Logo"
            width={40}
            height={40}
            className="mr-2 rounded-full bg-white p-1"
          />
          <h2 className="text-xl font-bold text-orange-400">Pandata Aggregator</h2>
        </div>
        <nav>
          <h3 className="text-sm font-semibold text-orange-400 uppercase tracking-wider mb-3">Top 3 DAOs</h3>
          <div className="space-y-3">
            {Object.entries(daoDetails)
              .map(([name, dao]) => {
                // Calculate a score based on proposals, members (voters), and TVL
                const proposalScore = dao.proposals * 0.4 // 40% weight
                const memberScore = dao.members * 0.3 // 30% weight
                const tvlScore = (dao.tvl / 1000000) * 0.3 // 30% weight, normalized by millions
                return {
                  name,
                  dao,
                  score: proposalScore + memberScore + tvlScore,
                }
              })
              .sort((a, b) => b.score - a.score) // Sort by score descending
              .slice(0, 3) // Take top 3
              .map(({ name, dao, score }, index) => {
                // Generate fake activity data for the mini chart
                const activityData = Array(7)
                  .fill(0)
                  .map((_, i) => ({
                    day: i,
                    value: Math.floor(Math.random() * 20) + 10 + index * 5,
                  }))

                return (
                  <div
                    key={name}
                    className="flex items-center space-x-3 p-2 rounded-md hover:bg-orange-950/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-900/20"
                  >
                    <div className="flex-shrink-0 w-10 h-10">
                      <Image
                        src={getDAOLogo(name) || defaultLogo}
                        alt={`${name} Logo`}
                        width={40}
                        height={40}
                        className="rounded-full object-cover border-2 border-orange-500/50 transition-opacity duration-300 hover:opacity-80"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-orange-300 truncate group-hover:text-orange-200 transition-colors duration-300">
                        {name}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-400">
                          {dao.proposals} props · {dao.members} members
                        </p>
                        <div className="h-6 w-16">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={activityData}>
                              <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#f97316"
                                strokeWidth={1.5}
                                dot={false}
                                isAnimationActive={true}
                                animationDuration={1500}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </nav>

        {/* Newest DAOs Section */}
        <NewestDAOs />
      </aside>

      <main className="flex-1 p-6 overflow-y-auto">
        {/* Charts - Restructured in a vertical layout */}
        <div className="flex flex-col gap-6 mb-8 mt-6">
          {/* Top row - Two main charts side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-black/50 backdrop-blur-lg border-orange-600/30 shadow-lg">
              <CardHeader className="p-4">
                <CardTitle className="text-lg text-orange-400">DAO Growth Over Time</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%" minHeight={300}>
                    <LineChart data={daoGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                      <XAxis dataKey="month" stroke="#ffffff80" fontSize={12} />
                      <YAxis stroke="#ffffff80" fontSize={12} />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#000000", border: "none" }}
                        formatter={(value, name) => {
                          if (name === undefined) return ["", ""]
                          return [value, name.toString().includes("newDaos") ? "New DAOs" : "Total DAOs"]
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="newDaos"
                        name="New DAOs"
                        stroke="#f97316"
                        activeDot={{ r: 8 }}
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="totalDaos"
                        name="Total DAOs"
                        stroke="#22c55e"
                        activeDot={{ r: 6 }}
                        strokeWidth={2}
                      />
                      {/* Pandata Watermark */}
                      <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="#ffffff30"
                        fontSize={28}
                        fontWeight="bold"
                      >
                        Pandata
                      </text>
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-black/50 backdrop-blur-lg border-amber-600/30 shadow-lg">
              <CardHeader className="p-4">
                <CardTitle className="text-lg text-amber-400">Top 5 DAOs by Treasury Value</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%" minHeight={300}>
                    <BarChart data={topDaosTVLData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                      <XAxis type="number" stroke="#ffffff80" fontSize={12} />
                      <YAxis dataKey="name" type="category" stroke="#ffffff80" fontSize={12} width={100} />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#000000", border: "none" }}
                        formatter={(value) => {
                          return [`${value || 0}M`, "Treasury Value"]
                        }}
                      />
                      <Legend />
                      <Bar dataKey="tvl" name="Treasury Value (M$)" fill="#f59e0b" />
                      {/* Pandata Watermark */}
                      <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="#ffffff30"
                        fontSize={28}
                        fontWeight="bold"
                      >
                        Pandata
                      </text>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle row - DeFi Opportunities in a horizontal card */}
          <Card className="bg-black/50 backdrop-blur-lg border-green-600/30 shadow-lg">
            <CardHeader className="p-4">
              <CardTitle className="text-lg text-green-400">DeFi Opportunities</CardTitle>
              <CardDescription className="text-sm text-green-300">
                Best rates across Solana DeFi platforms
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Lending Platforms */}
                <div>
                  <h3 className="text-sm font-semibold text-green-400 mb-2">Lending Platforms</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 rounded-md bg-black/30">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center mr-2 overflow-hidden">
                          <Image
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1345e107-383c-4392-9f9b-e0b527d37851_small.jpg-bnGYk67Yg1QDGZaQJebDiF7xRnT6Cz.jpeg"
                            alt="MarginFi Logo"
                            width={24}
                            height={24}
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">MarginFi</p>
                          <p className="text-xs text-gray-400">SOL Supply</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-green-400">5.8% APY</p>
                        <p className="text-xs text-gray-400">$42.3M TVL</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-md bg-black/30">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-2 overflow-hidden">
                          <Image
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/solend2-76X5XbWo5jzpfyGHMgw0ddWbJEAOAt.png"
                            alt="Solend Logo"
                            width={24}
                            height={24}
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">Solend</p>
                          <p className="text-xs text-gray-400">USDC Supply</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-green-400">4.2% APY</p>
                        <p className="text-xs text-gray-400">$89.7M TVL</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AMMs */}
                <div>
                  <h3 className="text-sm font-semibold text-green-400 mb-2">AMM Pools</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 rounded-md bg-black/30">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                          <Image
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/meteora2.jpg-MrjaW0FVDcWUUth6MxYZgmXb1Ppxcz.jpeg"
                            alt="Meteora Logo"
                            width={32}
                            height={32}
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">Meteora DLMM</p>
                          <p className="text-xs text-gray-400">SOL-USDC</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-green-400">12.4% APR</p>
                        <p className="text-xs text-gray-400">$18.5M TVL</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-md bg-black/30">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                          <Image
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/orca1-SjOjRyHbXFRKDqksOUT2nmDpFpFg83.png"
                            alt="Orca Logo"
                            width={32}
                            height={32}
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">Orca</p>
                          <p className="text-xs text-gray-400">BONK-SOL</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-green-400">22.7% APR</p>
                        <p className="text-xs text-gray-400">$5.2M TVL</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Staking */}
                <div>
                  <h3 className="text-sm font-semibold text-green-400 mb-2">Liquid Staking</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 rounded-md bg-black/30">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-yellow-900 flex items-center justify-center mr-2">
                          <span className="text-xs font-bold text-white">MR</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">Marinade</p>
                          <p className="text-xs text-gray-400">mSOL</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-green-400">7.1% APY</p>
                        <p className="text-xs text-gray-400">$320.5M TVL</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pandata Watermark */}
              <div className="relative mt-4">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                  <p className="text-2xl font-bold text-green-500">Pandata</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bottom row - Daily Proposals Chart */}
          {/* Bottom row - Daily Proposals Chart with Enhanced Metrics */}
          <Card className="bg-black/50 backdrop-blur-lg border-yellow-600/30 shadow-lg">
            <CardHeader className="p-4">
              <CardTitle className="text-lg text-yellow-400">Daily New Proposals</CardTitle>
              <CardDescription className="text-sm text-yellow-300">
                Comprehensive analysis of governance proposal creation
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              {isLoadingProposals ? (
                <div className="flex items-center justify-center h-[300px]">
                  <div className="text-yellow-400">Loading data from Dune Analytics...</div>
                </div>
              ) : dailyProposalsData.length > 0 ? (
                <div className="space-y-6">
                  {/* Key Metrics Row */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-black/30 rounded-lg p-3 border border-yellow-900/20">
                      <p className="text-xs text-yellow-300 mb-1">Total Proposals</p>
                      <div className="flex items-end justify-between">
                        <p className="text-2xl font-bold text-white">
                          {dailyProposalsData.reduce((sum, day) => sum + day.proposals, 0)}
                        </p>
                        <div className="h-10 w-20">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={dailyProposalsData.slice(-7)}>
                              <Line
                                type="monotone"
                                dataKey="proposals"
                                stroke="#eab308"
                                strokeWidth={1.5}
                                dot={false}
                                isAnimationActive={false}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400">Last {dailyProposalsData.length} days</p>
                    </div>

                    <div className="bg-black/30 rounded-lg p-3 border border-yellow-900/20">
                      <p className="text-xs text-yellow-300 mb-1">Daily Average</p>
                      <div className="flex items-end justify-between">
                        <p className="text-2xl font-bold text-white">
                          {(
                            dailyProposalsData.reduce((sum, day) => sum + day.proposals, 0) / dailyProposalsData.length
                          ).toFixed(1)}
                        </p>
                        <div className="h-10 w-20">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={[
                                {
                                  name: "Avg",
                                  value:
                                    dailyProposalsData.reduce((sum, day) => sum + day.proposals, 0) /
                                    dailyProposalsData.length,
                                },
                                { name: "Min", value: Math.min(...dailyProposalsData.map((d) => d.proposals)) },
                                { name: "Max", value: Math.max(...dailyProposalsData.map((d) => d.proposals)) },
                              ]}
                            >
                              <Bar dataKey="value" fill="#eab308" isAnimationActive={false} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400">Proposals per day</p>
                    </div>

                    <div className="bg-black/30 rounded-lg p-3 border border-yellow-900/20">
                      <p className="text-xs text-yellow-300 mb-1">Peak Day</p>
                      {(() => {
                        const peakDay = [...dailyProposalsData].sort((a, b) => b.proposals - a.proposals)[0]
                        const peakIndex = dailyProposalsData.findIndex((d) => d.day === peakDay.day)
                        const surroundingDays = dailyProposalsData
                          .slice(Math.max(0, peakIndex - 2), Math.min(dailyProposalsData.length, peakIndex + 3))
                          .map((d) => ({ day: d.day, value: d.proposals }))

                        return (
                          <>
                            <div className="flex items-end justify-between">
                              <p className="text-2xl font-bold text-white">{peakDay.proposals}</p>
                              <div className="h-10 w-20">
                                <ResponsiveContainer width="100%" height="100%">
                                  <BarChart data={surroundingDays}>
                                    <Bar
                                      dataKey="value"
                                      fill={(data) => (data.day === peakDay.day ? "#eab308" : "#eab30880")}
                                      isAnimationActive={false}
                                    />
                                  </BarChart>
                                </ResponsiveContainer>
                              </div>
                            </div>
                            <p className="text-xs text-gray-400">on {peakDay.day}</p>
                          </>
                        )
                      })()}
                    </div>

                    <div className="bg-black/30 rounded-lg p-3 border border-yellow-900/20">
                      <p className="text-xs text-yellow-300 mb-1">Weekly Trend</p>
                      {(() => {
                        const lastWeek = dailyProposalsData.slice(-7)
                        const prevWeek = dailyProposalsData.slice(-14, -7)
                        const lastWeekTotal = lastWeek.reduce((sum, day) => sum + day.proposals, 0)
                        const prevWeekTotal = prevWeek.reduce((sum, day) => sum + day.proposals, 0)
                        const percentChange =
                          prevWeekTotal > 0
                            ? (((lastWeekTotal - prevWeekTotal) / prevWeekTotal) * 100).toFixed(1)
                            : "N/A"
                        const isPositive = lastWeekTotal > prevWeekTotal

                        // Create trend data for mini chart
                        const trendData = [
                          { week: "Previous", value: prevWeekTotal / 7 },
                          { week: "Current", value: lastWeekTotal / 7 },
                        ]

                        return (
                          <>
                            <div className="flex items-end justify-between">
                              <div className="flex items-center">
                                <p className="text-2xl font-bold text-white">{percentChange}%</p>
                                {isPositive ? (
                                  <ArrowUp className="ml-1 h-5 w-5 text-green-400" />
                                ) : (
                                  <ArrowDown className="ml-1 h-5 w-5 text-red-400" />
                                )}
                              </div>
                              <div className="h-10 w-20">
                                <ResponsiveContainer width="100%" height="100%">
                                  <LineChart data={trendData}>
                                    <Line
                                      type="monotone"
                                      dataKey="value"
                                      stroke={isPositive ? "#22c55e" : "#ef4444"}
                                      strokeWidth={2}
                                      dot={{ fill: isPositive ? "#22c55e" : "#ef4444", r: 4 }}
                                      isAnimationActive={false}
                                    />
                                  </LineChart>
                                </ResponsiveContainer>
                              </div>
                            </div>
                            <p className="text-xs text-gray-400">vs previous week</p>
                          </>
                        )
                      })()}
                    </div>
                  </div>

                  {/* Main Chart */}
                  <div className="bg-black/20 rounded-lg p-4 border border-yellow-900/20">
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%" minHeight={300}>
                        <LineChart data={dailyProposalsData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                          <XAxis dataKey="day" stroke="#ffffff80" tickFormatter={(value) => value} fontSize={12} />
                          <YAxis stroke="#ffffff80" domain={[0, "auto"]} allowDecimals={false} fontSize={12} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#000000",
                              border: "1px solid #eab30840",
                              borderRadius: "4px",
                            }}
                            formatter={(value) => [`${value || 0} proposals`, "Proposals Created"]}
                            labelFormatter={(label) => `Date: ${label || "Unknown"}`}
                          />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="proposals"
                            name="Proposals Created"
                            stroke="#eab308"
                            strokeWidth={3}
                            activeDot={{ r: 8 }}
                            isAnimationActive={true}
                            animationDuration={1000}
                          />
                          {/* Pandata Watermark */}
                          <text
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill="#ffffff30"
                            fontSize={28}
                            fontWeight="bold"
                          >
                            Pandata
                          </text>
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-[300px]">
                  <div className="text-yellow-400">No proposal data available. Using fallback data.</div>
                </div>
              )}
              <div className="text-xs text-gray-400 mt-4 text-right">Data source: Dune Analytics Query ID 5065223</div>
            </CardContent>
          </Card>

          {/* Top DAOs Table - Now below the charts */}
          <Card className="bg-black/50 backdrop-blur-lg border-orange-600/30 shadow-lg mb-6">
            <CardHeader>
              <CardTitle className="text-orange-400">Top Solana Projects</CardTitle>
              <CardDescription className="text-orange-300">A list of top performing projects on Solana</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-orange-900/30">
                    <TableHead className="text-orange-400">Name</TableHead>
                    <TableHead className="text-orange-400 cursor-pointer" onClick={() => handleSort("members")}>
                      Members {renderSortIndicator("members")}
                    </TableHead>
                    <TableHead className="text-orange-400 cursor-pointer" onClick={() => handleSort("votes")}>
                      Total Votes {renderSortIndicator("votes")}
                    </TableHead>
                    <TableHead className="text-orange-400 cursor-pointer" onClick={() => handleSort("proposals")}>
                      Proposals {renderSortIndicator("proposals")}
                    </TableHead>
                    <TableHead className="text-orange-400 cursor-pointer" onClick={() => handleSort("tvl")}>
                      Treasury Value {renderSortIndicator("tvl")}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedDAOs.map(([daoName, dao]) => (
                    <TableRow key={daoName} className="border-b border-orange-900/30 hover:bg-orange-950/40">
                      <TableCell className="font-medium text-white">
                        <button
                          onClick={() => openDAODetails(daoName)}
                          className="flex items-center text-white hover:text-orange-400 transition-colors w-full text-left"
                        >
                          <Image
                            src={daoName && getDAOLogo(daoName) ? getDAOLogo(daoName) : defaultLogo}
                            alt={`${daoName || "DAO"} Logo`}
                            width={24}
                            height={24}
                            className="mr-2 rounded-full object-contain bg-black/20"
                            unoptimized
                          />
                          {daoName}
                        </button>
                      </TableCell>
                      <TableCell className="text-amber-200">{dao?.members?.toLocaleString() || "0"}</TableCell>
                      <TableCell className="text-orange-200">{dao?.votes?.toLocaleString() || "0"}</TableCell>
                      <TableCell className="text-yellow-200">{dao?.proposals || "0"}</TableCell>
                      <TableCell className="text-green-200">
                        $
                        {dao?.tvl
                          ? dao.tvl.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                          : "0.00"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* DAO Details Modal */}
      {selectedDAO && (
        <DAODetailsModal
          isOpen={isModalOpen}
          onClose={closeDAODetails}
          daoName={selectedDAO}
          daoDetails={daoDetails[selectedDAO]}
        />
      )}
    </div>
  )
}
