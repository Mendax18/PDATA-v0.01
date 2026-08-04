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
  Area,
  AreaChart,
  Pie,
  PieChart,
  Cell,
} from "recharts"
import {
  ArrowUpDown,
  ArrowDown,
  ArrowUp,
  Search,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  BarChart3,
  Coins,
  Vote,
  Activity,
} from "lucide-react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DAODetailsModal } from "@/components/dao-details-modal"
import { NewestDAOs } from "@/components/newest-daos"
import { getDAOLogo, defaultLogo } from "@/components/dao-logos"
import { fetchDuneProposals, type DailyProposalData } from "@/actions/fetch-dune-proposals"
  import { ProtocolDashboard } from "@/components/protocols/protocol-dashboard"
  import { protocolMeta, type ProtocolId } from "@/data/protocol-analytics"
  import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

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
  { month: "Feb 2026", newDaos: 26, totalDaos: 26 },
  { month: "Mar 2026", newDaos: 45, totalDaos: 71 },
  { month: "Apr 2026", newDaos: 18, totalDaos: 89 },
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

// Comprehensive fallback DAO data structure used alongside Dune proposal activity
const fallbackDAOData = {
  // New DAOs
  FactBrah: {
    description: "FactBrah DAO governance for community-driven fact-checking and verification initiatives.",
    members: 198,
    votes: 1247,
    proposals: 7,
    tvl: 45000.0,
    treasuryAllocation: [
      { name: "Fact Verification", value: 50 },
      { name: "Community Rewards", value: 30 },
      { name: "Operations", value: 20 },
    ],
    monthlyActivity: [
      { month: "Oct", transactions: 2200, newMembers: 15 },
      { month: "Nov", transactions: 2800, newMembers: 22 },
      { month: "Dec", transactions: 3100, newMembers: 28 },
      { month: "Jan", transactions: 3500, newMembers: 35 },
      { month: "Feb", transactions: 3200, newMembers: 31 },
      { month: "Mar", transactions: 2900, newMembers: 27 },
    ],
    governance: {
      votingPower: 180000,
      quorum: 15,
      proposalThreshold: 12000,
      votingPeriod: 5,
    },
    recentProposals: [
      {
        id: "PROP-001",
        title: "Community Fact-Check Rewards Program",
        status: "Voting",
        timeRemaining: "2d 8h 15m",
        yesVotes: 145,
        noVotes: 23,
        votes: 168,
      },
    ],
  },
  "Solcentral By Guardian Platform": {
    description: "Solcentral By Guardian Platform DAO governance for decentralized security and guardian services.",
    members: 142,
    votes: 892,
    proposals: 5,
    tvl: 78000.0,
    treasuryAllocation: [
      { name: "Security Infrastructure", value: 60 },
      { name: "Guardian Rewards", value: 25 },
      { name: "Operations", value: 15 },
    ],
    monthlyActivity: [
      { month: "Oct", transactions: 1800, newMembers: 12 },
      { month: "Nov", transactions: 2100, newMembers: 18 },
      { month: "Dec", transactions: 2400, newMembers: 21 },
      { month: "Jan", transactions: 2700, newMembers: 24 },
      { month: "Feb", transactions: 2500, newMembers: 22 },
      { month: "Mar", transactions: 2200, newMembers: 19 },
    ],
    governance: {
      votingPower: 150000,
      quorum: 20,
      proposalThreshold: 10000,
      votingPeriod: 7,
    },
    recentProposals: [
      {
        id: "PROP-001",
        title: "Guardian Network Expansion",
        status: "Completed",
        completedAgo: "Completed 3 days ago",
        yesVotes: 118,
        noVotes: 15,
        votes: 133,
      },
    ],
  },
  "Digi Mentor DAO": {
    description: "Digi Mentor DAO governance for digital mentorship and education programs.",
    members: 87,
    votes: 456,
    proposals: 4,
    tvl: 32000.0,
    treasuryAllocation: [
      { name: "Education Programs", value: 55 },
      { name: "Mentor Rewards", value: 30 },
      { name: "Operations", value: 15 },
    ],
    monthlyActivity: [
      { month: "Oct", transactions: 1200, newMembers: 8 },
      { month: "Nov", transactions: 1450, newMembers: 12 },
      { month: "Dec", transactions: 1600, newMembers: 14 },
      { month: "Jan", transactions: 1800, newMembers: 16 },
      { month: "Feb", transactions: 1700, newMembers: 15 },
      { month: "Mar", transactions: 1500, newMembers: 13 },
    ],
    governance: {
      votingPower: 95000,
      quorum: 25,
      proposalThreshold: 8000,
      votingPeriod: 5,
    },
    recentProposals: [
      {
        id: "PROP-001",
        title: "Digital Mentorship Program Launch",
        status: "Voting",
        timeRemaining: "1d 14h 32m",
        yesVotes: 62,
        noVotes: 11,
        votes: 73,
      },
    ],
  },
  // Major DAOs with comprehensive data
  BonkDAO: {
    description:
      "BonkDAO governs the Bonk ecosystem on Solana, focusing on meme coin governance and community initiatives.",
    members: 14805,
    votes: 25398,
    proposals: 82,
    tvl: 77965829.0,
    treasuryAllocation: [
      { name: "Community", value: 40 },
      { name: "Development", value: 30 },
      { name: "Marketing", value: 20 },
      { name: "Reserves", value: 10 },
    ],
    monthlyActivity: [
      { month: "Oct", transactions: 45000, newMembers: 1200 },
      { month: "Nov", transactions: 52000, newMembers: 1500 },
      { month: "Dec", transactions: 48000, newMembers: 1100 },
      { month: "Jan", transactions: 55000, newMembers: 1800 },
      { month: "Feb", transactions: 58000, newMembers: 1600 },
      { month: "Mar", transactions: 62000, newMembers: 1400 },
    ],
    governance: {
      votingPower: 2500000,
      quorum: 8,
      proposalThreshold: 100000,
      votingPeriod: 7,
    },
    tokenPerformance: [
      { date: "2024-10-01", price: 0.000015 },
      { date: "2024-11-01", price: 0.000018 },
      { date: "2024-12-01", price: 0.000022 },
      { date: "2025-01-01", price: 0.000025 },
      { date: "2025-02-01", price: 0.000028 },
      { date: "2025-03-01", price: 0.000032 },
    ],
    recentProposals: [
      {
        id: "PROP-001",
        title: "BONK Community Fund Allocation",
        status: "Completed",
        completedAgo: "Completed 5 days ago",
        yesVotes: 12500,
        noVotes: 890,
        votes: 13390,
      },
      {
        id: "PROP-002",
        title: "Marketing Campaign for Q2 2025",
        status: "Voting",
        timeRemaining: "3d 14h 27m",
        yesVotes: 8900,
        noVotes: 1200,
        votes: 10100,
      },
    ],
  },
  Jito: {
    description: "Jito Protocol DAO governance for the leading MEV solution on Solana.",
    members: 86,
    votes: 0,
    proposals: 40,
    tvl: 574619195.0,
    treasuryAllocation: [
      { name: "Protocol Development", value: 50 },
      { name: "Research", value: 25 },
      { name: "Operations", value: 15 },
      { name: "Reserves", value: 10 },
    ],
    monthlyActivity: [
      { month: "Oct", transactions: 25000, newMembers: 8 },
      { month: "Nov", transactions: 28000, newMembers: 12 },
      { month: "Dec", transactions: 32000, newMembers: 15 },
      { month: "Jan", transactions: 35000, newMembers: 18 },
      { month: "Feb", transactions: 38000, newMembers: 16 },
      { month: "Mar", transactions: 42000, newMembers: 17 },
    ],
    governance: {
      votingPower: 1000000,
      quorum: 15,
      proposalThreshold: 50000,
      votingPeriod: 5,
    },
    tokenPerformance: [
      { date: "2024-10-01", price: 2.45 },
      { date: "2024-11-01", price: 2.78 },
      { date: "2024-12-01", price: 3.12 },
      { date: "2025-01-01", price: 3.45 },
      { date: "2025-02-01", price: 3.28 },
      { date: "2025-03-01", price: 3.67 },
    ],
    recentProposals: [
      {
        id: "PROP-001",
        title: "MEV Revenue Distribution Model",
        status: "Completed",
        completedAgo: "Completed 12 days ago",
        yesVotes: 65,
        noVotes: 8,
        votes: 73,
      },
    ],
  },
  Marinade: {
    description: "Marinade DAO governance for the liquid staking protocol on Solana.",
    members: 189,
    votes: 1245,
    proposals: 83,
    tvl: 68743492.0,
    treasuryAllocation: [
      { name: "Protocol Development", value: 45 },
      { name: "Validator Relations", value: 25 },
      { name: "Marketing", value: 20 },
      { name: "Reserves", value: 10 },
    ],
    monthlyActivity: [
      { month: "Oct", transactions: 18000, newMembers: 25 },
      { month: "Nov", transactions: 22000, newMembers: 32 },
      { month: "Dec", transactions: 25000, newMembers: 28 },
      { month: "Jan", transactions: 28000, newMembers: 35 },
      { month: "Feb", transactions: 30000, newMembers: 30 },
      { month: "Mar", transactions: 33000, newMembers: 39 },
    ],
    governance: {
      votingPower: 750000,
      quorum: 12,
      proposalThreshold: 25000,
      votingPeriod: 7,
    },
    tokenPerformance: [
      { date: "2024-10-01", price: 0.085 },
      { date: "2024-11-01", price: 0.092 },
      { date: "2024-12-01", price: 0.098 },
      { date: "2025-01-01", price: 0.105 },
      { date: "2025-02-01", price: 0.112 },
      { date: "2025-03-01", price: 0.118 },
    ],
    recentProposals: [
      {
        id: "PROP-001",
        title: "Validator Set Expansion",
        status: "Voting",
        timeRemaining: "2d 8h 15m",
        yesVotes: 145,
        noVotes: 23,
        votes: 168,
      },
    ],
  },
  MonarkDAO: {
    description: "MonarkDAO governs the Monark ecosystem on Solana.",
    members: 9,
    votes: 20,
    proposals: 5,
    tvl: 0,
    treasuryAllocation: [
      { name: "Development", value: 60 },
      { name: "Community", value: 25 },
      { name: "Operations", value: 15 },
    ],
    monthlyActivity: [
      { month: "Oct", transactions: 150, newMembers: 1 },
      { month: "Nov", transactions: 180, newMembers: 2 },
      { month: "Dec", transactions: 200, newMembers: 1 },
      { month: "Jan", transactions: 220, newMembers: 2 },
      { month: "Feb", transactions: 190, newMembers: 1 },
      { month: "Mar", transactions: 210, newMembers: 2 },
    ],
    governance: {
      votingPower: 50000,
      quorum: 50,
      proposalThreshold: 5000,
      votingPeriod: 3,
    },
    recentProposals: [
      {
        id: "PROP-001",
        title: "Initial Governance Framework",
        status: "Completed",
        completedAgo: "Completed 30 days ago",
        yesVotes: 8,
        noVotes: 1,
        votes: 9,
      },
    ],
  },
  Grape: {
    description: "Grape Protocol DAO governance for community-driven initiatives.",
    members: 346,
    votes: 5237,
    proposals: 255,
    tvl: 963428.0,
    treasuryAllocation: [
      { name: "Community Programs", value: 45 },
      { name: "Development", value: 30 },
      { name: "Marketing", value: 15 },
      { name: "Operations", value: 10 },
    ],
    monthlyActivity: [
      { month: "Oct", transactions: 8500, newMembers: 28 },
      { month: "Nov", transactions: 9200, newMembers: 35 },
      { month: "Dec", transactions: 8800, newMembers: 32 },
      { month: "Jan", transactions: 9800, newMembers: 42 },
      { month: "Feb", transactions: 10200, newMembers: 38 },
      { month: "Mar", transactions: 9600, newMembers: 31 },
    ],
    governance: {
      votingPower: 500000,
      quorum: 10,
      proposalThreshold: 15000,
      votingPeriod: 5,
    },
    recentProposals: [
      {
        id: "PROP-001",
        title: "Community Rewards Program v3",
        status: "Voting",
        timeRemaining: "1d 18h 42m",
        yesVotes: 285,
        noVotes: 45,
        votes: 330,
      },
    ],
  },
  Mango: {
    description: "Mango Markets DAO governance for the decentralized trading platform.",
    members: 321,
    votes: 5676,
    proposals: 963,
    tvl: 22814324,
    treasuryAllocation: [
      { name: "Protocol Development", value: 50 },
      { name: "Security Audits", value: 25 },
      { name: "Marketing", value: 15 },
      { name: "Operations", value: 10 },
    ],
    monthlyActivity: [
      { month: "Oct", transactions: 15000, newMembers: 25 },
      { month: "Nov", transactions: 18000, newMembers: 32 },
      { month: "Dec", transactions: 16500, newMembers: 28 },
      { month: "Jan", transactions: 19500, newMembers: 38 },
      { month: "Feb", transactions: 21000, newMembers: 35 },
      { month: "Mar", transactions: 18800, newMembers: 29 },
    ],
    governance: {
      votingPower: 800000,
      quorum: 8,
      proposalThreshold: 20000,
      votingPeriod: 7,
    },
    recentProposals: [
      {
        id: "PROP-001",
        title: "Trading Fee Structure Update",
        status: "Completed",
        completedAgo: "Completed 6 days ago",
        yesVotes: 278,
        noVotes: 32,
        votes: 310,
      },
    ],
  },
  Solend: {
    description: "Solend Protocol DAO governance for the lending platform.",
    members: 303,
    votes: 508,
    proposals: 13,
    tvl: 0,
    treasuryAllocation: [
      { name: "Protocol Development", value: 55 },
      { name: "Risk Management", value: 25 },
      { name: "Operations", value: 20 },
    ],
    monthlyActivity: [
      { month: "Oct", transactions: 12000, newMembers: 22 },
      { month: "Nov", transactions: 14000, newMembers: 28 },
      { month: "Dec", transactions: 13500, newMembers: 25 },
      { month: "Jan", transactions: 15500, newMembers: 32 },
      { month: "Feb", transactions: 16000, newMembers: 29 },
      { month: "Mar", transactions: 14800, newMembers: 26 },
    ],
    governance: {
      votingPower: 400000,
      quorum: 15,
      proposalThreshold: 30000,
      votingPeriod: 5,
    },
    recentProposals: [
      {
        id: "PROP-001",
        title: "Risk Parameter Adjustment",
        status: "Voting",
        timeRemaining: "4d 6h 12m",
        yesVotes: 245,
        noVotes: 38,
        votes: 283,
      },
    ],
  },
  IslandDAO: {
    description: "IslandDAO governance for the Island ecosystem on Solana.",
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
        title: "Island Protocol Upgrade v2.0",
        status: "Completed",
        completedAgo: "Completed 8 days ago",
        yesVotes: 156,
        noVotes: 12,
        votes: 168,
      },
      {
        id: "PROP-002",
        title: "Treasury Diversification Strategy",
        status: "Completed",
        completedAgo: "Succeeded 8 days ago",
        yesVotes: 189,
        noVotes: 15,
        votes: 204,
        executable: true,
      },
      {
        id: "PROP-003",
        title: "Community Rewards Program",
        status: "Completed",
        completedAgo: "Completed 8 days ago",
        yesVotes: 145,
        noVotes: 23,
        votes: 168,
      },
      {
        id: "PROP-004",
        title: "Island DAO Website Redesign - ISLAND Payout",
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
        title: "Set island_treasury.sol as primary domain",
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
    description: "Adrena Protocol DAO governance for the derivatives trading platform.",
    members: 139,
    votes: 731,
    proposals: 107,
    tvl: 195365,
    treasuryAllocation: [
      { name: "Protocol Development", value: 50 },
      { name: "Liquidity Incentives", value: 30 },
      { name: "Operations", value: 20 },
    ],
    monthlyActivity: [
      { month: "Oct", transactions: 5500, newMembers: 12 },
      { month: "Nov", transactions: 6200, newMembers: 15 },
      { month: "Dec", transactions: 5800, newMembers: 13 },
      { month: "Jan", transactions: 6800, newMembers: 18 },
      { month: "Feb", transactions: 7200, newMembers: 16 },
      { month: "Mar", transactions: 6600, newMembers: 14 },
    ],
    governance: {
      votingPower: 300000,
      quorum: 18,
      proposalThreshold: 15000,
      votingPeriod: 5,
    },
    recentProposals: [
      {
        id: "PROP-001",
        title: "Leverage Limits Adjustment",
        status: "Voting",
        timeRemaining: "2d 14h 33m",
        yesVotes: 98,
        noVotes: 22,
        votes: 120,
      },
    ],
  },
  "Sol Man": {
    description: "Sol Man DAO governance for community initiatives.",
    members: 69,
    votes: 360,
    proposals: 25,
    tvl: 32680.0,
    treasuryAllocation: [
      { name: "Community", value: 50 },
      { name: "Development", value: 30 },
      { name: "Marketing", value: 20 },
    ],
    monthlyActivity: [
      { month: "Oct", transactions: 1200, newMembers: 5 },
      { month: "Nov", transactions: 1400, newMembers: 7 },
      { month: "Dec", transactions: 1300, newMembers: 6 },
      { month: "Jan", transactions: 1600, newMembers: 8 },
      { month: "Feb", transactions: 1700, newMembers: 7 },
      { month: "Mar", transactions: 1500, newMembers: 6 },
    ],
    governance: {
      votingPower: 150000,
      quorum: 25,
      proposalThreshold: 8000,
      votingPeriod: 3,
    },
    recentProposals: [
      {
        id: "PROP-001",
        title: "Community Event Funding",
        status: "Completed",
        completedAgo: "Completed 15 days ago",
        yesVotes: 52,
        noVotes: 8,
        votes: 60,
      },
    ],
  },
  MonkeDAO: {
    description: "MonkeDAO governance for the NFT community.",
    members: 34,
    votes: 2855,
    proposals: 553,
    tvl: 60860,
    treasuryAllocation: [
      { name: "NFT Acquisitions", value: 40 },
      { name: "Community Events", value: 30 },
      { name: "Development", value: 20 },
      { name: "Operations", value: 10 },
    ],
    monthlyActivity: [
      { month: "Oct", transactions: 2800, newMembers: 3 },
      { month: "Nov", transactions: 3200, newMembers: 4 },
      { month: "Dec", transactions: 2900, newMembers: 2 },
      { month: "Jan", transactions: 3500, newMembers: 5 },
      { month: "Feb", transactions: 3800, newMembers: 4 },
      { month: "Mar", transactions: 3300, newMembers: 3 },
    ],
    governance: {
      votingPower: 200000,
      quorum: 20,
      proposalThreshold: 10000,
      votingPeriod: 5,
    },
    recentProposals: [
      {
        id: "PROP-001",
        title: "NFT Collection Expansion",
        status: "Voting",
        timeRemaining: "1d 8h 22m",
        yesVotes: 28,
        noVotes: 4,
        votes: 32,
      },
    ],
  },
  "Realms Ecosystem DAO": {
    description: "Realms Ecosystem DAO governance for the governance platform.",
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
    description: "FungiDAO governance for the Fungi ecosystem.",
    members: 9,
    votes: 20,
    proposals: 5,
    tvl: 17159,
    treasuryAllocation: [
      { name: "Research", value: 50 },
      { name: "Development", value: 30 },
      { name: "Community", value: 20 },
    ],
    monthlyActivity: [
      { month: "Oct", transactions: 180, newMembers: 1 },
      { month: "Nov", transactions: 220, newMembers: 2 },
      { month: "Dec", transactions: 200, newMembers: 1 },
      { month: "Jan", transactions: 250, newMembers: 2 },
      { month: "Feb", transactions: 230, newMembers: 1 },
      { month: "Mar", transactions: 210, newMembers: 2 },
    ],
    governance: {
      votingPower: 80000,
      quorum: 40,
      proposalThreshold: 8000,
      votingPeriod: 5,
    },
    recentProposals: [
      {
        id: "PROP-001",
        title: "Research Grant Program",
        status: "Completed",
        completedAgo: "Completed 20 days ago",
        yesVotes: 7,
        noVotes: 2,
        votes: 9,
      },
    ],
  },
  TheExiledApes: {
    description: "The Exiled Apes DAO governance for the NFT community.",
    members: 5,
    votes: 112,
    proposals: 42,
    tvl: 0,
    treasuryAllocation: [
      { name: "NFT Operations", value: 60 },
      { name: "Community", value: 25 },
      { name: "Development", value: 15 },
    ],
    monthlyActivity: [
      { month: "Oct", transactions: 450, newMembers: 0 },
      { month: "Nov", transactions: 520, newMembers: 1 },
      { month: "Dec", transactions: 480, newMembers: 1 },
      { month: "Jan", transactions: 580, newMembers: 1 },
      { month: "Feb", transactions: 620, newMembers: 1 },
      { month: "Mar", transactions: 550, newMembers: 1 },
    ],
    governance: {
      votingPower: 25000,
      quorum: 60,
      proposalThreshold: 2000,
      votingPeriod: 3,
    },
    recentProposals: [
      {
        id: "PROP-001",
        title: "NFT Royalty Distribution",
        status: "Voting",
        timeRemaining: "3d 2h 45m",
        yesVotes: 4,
        noVotes: 1,
        votes: 5,
      },
    ],
  },
  "Metaplex Foundation": {
    description: "Metaplex Foundation DAO governance for the NFT infrastructure.",
    members: 3,
    votes: 131,
    proposals: 49,
    tvl: 0,
    treasuryAllocation: [
      { name: "Infrastructure", value: 70 },
      { name: "Grants", value: 20 },
      { name: "Operations", value: 10 },
    ],
    monthlyActivity: [
      { month: "Oct", transactions: 8500, newMembers: 0 },
      { month: "Nov", transactions: 9200, newMembers: 1 },
      { month: "Dec", transactions: 8800, newMembers: 0 },
      { month: "Jan", transactions: 9800, newMembers: 1 },
      { month: "Feb", transactions: 10200, newMembers: 0 },
      { month: "Mar", transactions: 9600, newMembers: 1 },
    ],
    governance: {
      votingPower: 100000,
      quorum: 66,
      proposalThreshold: 30000,
      votingPeriod: 7,
    },
    recentProposals: [
      {
        id: "PROP-001",
        title: "Protocol Upgrade v4.0",
        status: "Completed",
        completedAgo: "Completed 10 days ago",
        yesVotes: 3,
        noVotes: 0,
        votes: 3,
      },
    ],
  },
  "Metaplex Genesis": {
    description: "Metaplex Genesis DAO governance for early adopters.",
    members: 3,
    votes: 48,
    proposals: 18,
    tvl: 0,
    treasuryAllocation: [
      { name: "Genesis Programs", value: 60 },
      { name: "Community", value: 25 },
      { name: "Operations", value: 15 },
    ],
    monthlyActivity: [
      { month: "Oct", transactions: 2200, newMembers: 0 },
      { month: "Nov", transactions: 2500, newMembers: 0 },
      { month: "Dec", transactions: 2300, newMembers: 1 },
      { month: "Jan", transactions: 2700, newMembers: 0 },
      { month: "Feb", transactions: 2900, newMembers: 1 },
      { month: "Mar", transactions: 2600, newMembers: 1 },
    ],
    governance: {
      votingPower: 75000,
      quorum: 66,
      proposalThreshold: 25000,
      votingPeriod: 5,
    },
    recentProposals: [
      {
        id: "PROP-001",
        title: "Genesis Collection Expansion",
        status: "Voting",
        timeRemaining: "5d 12h 18m",
        yesVotes: 2,
        noVotes: 1,
        votes: 3,
      },
    ],
  },
  "Metaplex DAO": {
    description: "Metaplex DAO governance for the broader ecosystem.",
    members: 130,
    votes: 0,
    proposals: 27,
    tvl: 58175361.0,
    treasuryAllocation: [
      { name: "Ecosystem Development", value: 50 },
      { name: "Grants", value: 30 },
      { name: "Operations", value: 20 },
    ],
    monthlyActivity: [
      { month: "Oct", transactions: 12000, newMembers: 15 },
      { month: "Nov", transactions: 14000, newMembers: 18 },
      { month: "Dec", transactions: 13000, newMembers: 16 },
      { month: "Jan", transactions: 15500, newMembers: 22 },
      { month: "Feb", transactions: 16500, newMembers: 20 },
      { month: "Mar", transactions: 14800, newMembers: 17 },
    ],
    governance: {
      votingPower: 650000,
      quorum: 10,
      proposalThreshold: 35000,
      votingPeriod: 7,
    },
    recentProposals: [
      {
        id: "PROP-001",
        title: "Ecosystem Grant Program Q2",
        status: "Voting",
        timeRemaining: "2d 6h 30m",
        yesVotes: 95,
        noVotes: 18,
        votes: 113,
      },
    ],
  },
  "DL Metaplex Grants": {
    description: "DL Metaplex Grants DAO governance for grant distribution.",
    members: 42,
    votes: 187,
    proposals: 31,
    tvl: 245680.0,
    treasuryAllocation: [
      { name: "Grants", value: 80 },
      { name: "Operations", value: 15 },
      { name: "Reserves", value: 5 },
    ],
    monthlyActivity: [
      { month: "Oct", transactions: 1800, newMembers: 3 },
      { month: "Nov", transactions: 2100, newMembers: 4 },
      { month: "Dec", transactions: 1900, newMembers: 3 },
      { month: "Jan", transactions: 2300, newMembers: 5 },
      { month: "Feb", transactions: 2500, newMembers: 4 },
      { month: "Mar", transactions: 2200, newMembers: 3 },
    ],
    governance: {
      votingPower: 180000,
      quorum: 20,
      proposalThreshold: 12000,
      votingPeriod: 5,
    },
    recentProposals: [
      {
        id: "PROP-001",
        title: "Grant Allocation Framework",
        status: "Completed",
        completedAgo: "Completed 7 days ago",
        yesVotes: 35,
        noVotes: 5,
        votes: 40,
      },
    ],
  },
  "Pyth Network": {
    description: "Pyth Network DAO governance for the oracle protocol.",
    members: 156,
    votes: 892,
    proposals: 67,
    tvl: 406543.0,
    treasuryAllocation: [
      { name: "Oracle Development", value: 50 },
      { name: "Data Provider Incentives", value: 30 },
      { name: "Operations", value: 20 },
    ],
    monthlyActivity: [
      { month: "Oct", transactions: 25000, newMembers: 12 },
      { month: "Nov", transactions: 28000, newMembers: 15 },
      { month: "Dec", transactions: 26000, newMembers: 13 },
      { month: "Jan", transactions: 30000, newMembers: 18 },
      { month: "Feb", transactions: 32000, newMembers: 16 },
      { month: "Mar", transactions: 29000, newMembers: 14 },
    ],
    governance: {
      votingPower: 600000,
      quorum: 12,
      proposalThreshold: 25000,
      votingPeriod: 7,
    },
    recentProposals: [
      {
        id: "PROP-001",
        title: "Oracle Feed Expansion",
        status: "Voting",
        timeRemaining: "3d 18h 45m",
        yesVotes: 125,
        noVotes: 18,
        votes: 143,
      },
    ],
  },
  "The $GREED Experiment": {
    description: "The $GREED Experiment DAO governance for experimental tokenomics.",
    members: 78,
    votes: 423,
    proposals: 29,
    tvl: 15118.0,
    treasuryAllocation: [
      { name: "Experiments", value: 60 },
      { name: "Community", value: 25 },
      { name: "Operations", value: 15 },
    ],
    monthlyActivity: [
      { month: "Oct", transactions: 3200, newMembers: 8 },
      { month: "Nov", transactions: 3600, newMembers: 10 },
      { month: "Dec", transactions: 3400, newMembers: 9 },
      { month: "Jan", transactions: 3900, newMembers: 12 },
      { month: "Feb", transactions: 4100, newMembers: 11 },
      { month: "Mar", transactions: 3700, newMembers: 9 },
    ],
    governance: {
      votingPower: 250000,
      quorum: 15,
      proposalThreshold: 12000,
      votingPeriod: 3,
    },
    recentProposals: [
      {
        id: "PROP-001",
        title: "Tokenomics Experiment v2",
        status: "Voting",
        timeRemaining: "1d 4h 15m",
        yesVotes: 58,
        noVotes: 12,
        votes: 70,
      },
    ],
  },
  "SolBlaze DAO": {
    description: "SolBlaze DAO governance for the SolBlaze ecosystem.",
    members: 63,
    votes: 315,
    proposals: 22,
    tvl: 411622.0,
    treasuryAllocation: [
      { name: "Protocol Development", value: 55 },
      { name: "Marketing", value: 25 },
      { name: "Operations", value: 20 },
    ],
    monthlyActivity: [
      { month: "Oct", transactions: 4500, newMembers: 6 },
      { month: "Nov", transactions: 5100, newMembers: 8 },
      { month: "Dec", transactions: 4800, newMembers: 7 },
      { month: "Jan", transactions: 5500, newMembers: 9 },
      { month: "Feb", transactions: 5800, newMembers: 8 },
      { month: "Mar", transactions: 5200, newMembers: 7 },
    ],
    governance: {
      votingPower: 280000,
      quorum: 18,
      proposalThreshold: 15000,
      votingPeriod: 5,
    },
    recentProposals: [
      {
        id: "PROP-001",
        title: "Staking Rewards Optimization",
        status: "Completed",
        completedAgo: "Completed 4 days ago",
        yesVotes: 48,
        noVotes: 9,
        votes: 57,
      },
    ],
  },
  // Additional DAOs included in the curated Realms dataset
  "Xandeum DAO": {
    description: "Xandeum DAO governance for the Xandeum ecosystem.",
    members: 25,
    votes: 150,
    proposals: 12,
    tvl: 50000,
    treasuryAllocation: [
      { name: "Development", value: 60 },
      { name: "Community", value: 25 },
      { name: "Operations", value: 15 },
    ],
    monthlyActivity: [
      { month: "Oct", transactions: 1500, newMembers: 2 },
      { month: "Nov", transactions: 1700, newMembers: 3 },
      { month: "Dec", transactions: 1600, newMembers: 2 },
      { month: "Jan", transactions: 1900, newMembers: 4 },
      { month: "Feb", transactions: 2000, newMembers: 3 },
      { month: "Mar", transactions: 1800, newMembers: 2 },
    ],
    governance: {
      votingPower: 120000,
      quorum: 30,
      proposalThreshold: 10000,
      votingPeriod: 5,
    },
    recentProposals: [
      {
        id: "PROP-001",
        title: "Ecosystem Development Fund",
        status: "Voting",
        timeRemaining: "2d 10h 30m",
        yesVotes: 18,
        noVotes: 4,
        votes: 22,
      },
    ],
  },
  "Dual DAO": {
    description: "Dual DAO governance for dual investment strategies.",
    members: 35,
    votes: 200,
    proposals: 15,
    tvl: 75000,
    treasuryAllocation: [
      { name: "Investment Strategies", value: 70 },
      { name: "Operations", value: 20 },
      { name: "Reserves", value: 10 },
    ],
    monthlyActivity: [
      { month: "Oct", transactions: 2200, newMembers: 3 },
      { month: "Nov", transactions: 2500, newMembers: 4 },
      { month: "Dec", transactions: 2300, newMembers: 3 },
      { month: "Jan", transactions: 2700, newMembers: 5 },
      { month: "Feb", transactions: 2900, newMembers: 4 },
      { month: "Mar", transactions: 2600, newMembers: 3 },
    ],
    governance: {
      votingPower: 150000,
      quorum: 25,
      proposalThreshold: 12000,
      votingPeriod: 7,
    },
    recentProposals: [
      {
        id: "PROP-001",
        title: "Investment Strategy Update",
        status: "Completed",
        completedAgo: "Completed 9 days ago",
        yesVotes: 28,
        noVotes: 5,
        votes: 33,
      },
    ],
  },
  deScier: {
    description: "deScier DAO governance for decentralized science initiatives.",
    members: 18,
    votes: 95,
    proposals: 8,
    tvl: 25000,
    treasuryAllocation: [
      { name: "Research Grants", value: 65 },
      { name: "Platform Development", value: 25 },
      { name: "Operations", value: 10 },
    ],
    monthlyActivity: [
      { month: "Oct", transactions: 800, newMembers: 2 },
      { month: "Nov", transactions: 950, newMembers: 2 },
      { month: "Dec", transactions: 900, newMembers: 1 },
      { month: "Jan", transactions: 1100, newMembers: 3 },
      { month: "Feb", transactions: 1200, newMembers: 2 },
      { month: "Mar", transactions: 1050, newMembers: 2 },
    ],
    governance: {
      votingPower: 90000,
      quorum: 35,
      proposalThreshold: 8000,
      votingPeriod: 7,
    },
    recentProposals: [
      {
        id: "PROP-001",
        title: "Research Grant Program Launch",
        status: "Voting",
        timeRemaining: "4d 16h 20m",
        yesVotes: 14,
        noVotes: 2,
        votes: 16,
      },
    ],
  },
  "Apex United FC": {
    description: "Apex United FC DAO governance for the sports organization.",
    members: 42,
    votes: 280,
    proposals: 18,
    tvl: 120000,
    treasuryAllocation: [
      { name: "Player Development", value: 50 },
      { name: "Facilities", value: 30 },
      { name: "Operations", value: 20 },
    ],
    monthlyActivity: [
      { month: "Oct", transactions: 1800, newMembers: 4 },
      { month: "Nov", transactions: 2100, newMembers: 5 },
      { month: "Dec", transactions: 1950, newMembers: 4 },
      { month: "Jan", transactions: 2300, newMembers: 6 },
      { month: "Feb", transactions: 2500, newMembers: 5 },
      { month: "Mar", transactions: 2200, newMembers: 4 },
    ],
    governance: {
      votingPower: 200000,
      quorum: 20,
      proposalThreshold: 15000,
      votingPeriod: 5,
    },
    recentProposals: [
      {
        id: "PROP-001",
        title: "Stadium Upgrade Funding",
        status: "Voting",
        timeRemaining: "1d 20h 45m",
        yesVotes: 32,
        noVotes: 6,
        votes: 38,
      },
    ],
  },
  "DL Ecosystem Grants": {
    description: "DL Ecosystem Grants DAO governance for ecosystem funding.",
    members: 28,
    votes: 165,
    proposals: 14,
    tvl: 180000,
    treasuryAllocation: [
      { name: "Ecosystem Grants", value: 75 },
      { name: "Operations", value: 15 },
      { name: "Reserves", value: 10 },
    ],
    monthlyActivity: [
      { month: "Oct", transactions: 1200, newMembers: 2 },
      { month: "Nov", transactions: 1400, newMembers: 3 },
      { month: "Dec", transactions: 1300, newMembers: 2 },
      { month: "Jan", transactions: 1600, newMembers: 4 },
      { month: "Feb", transactions: 1700, newMembers: 3 },
      { month: "Mar", transactions: 1500, newMembers: 2 },
    ],
    governance: {
      votingPower: 140000,
      quorum: 25,
      proposalThreshold: 12000,
      votingPeriod: 7,
    },
    recentProposals: [
      {
        id: "PROP-001",
        title: "Grant Distribution Framework",
        status: "Completed",
        completedAgo: "Completed 6 days ago",
        yesVotes: 22,
        noVotes: 4,
        votes: 26,
      },
    ],
  },
  StockTrader: {
    description: "StockTrader DAO governance for trading strategies.",
    members: 15,
    votes: 85,
    proposals: 6,
    tvl: 35000,
    treasuryAllocation: [
      { name: "Trading Capital", value: 70 },
      { name: "Platform Development", value: 20 },
      { name: "Operations", value: 10 },
    ],
    monthlyActivity: [
      { month: "Oct", transactions: 650, newMembers: 1 },
      { month: "Nov", transactions: 750, newMembers: 2 },
      { month: "Dec", transactions: 700, newMembers: 1 },
      { month: "Jan", transactions: 850, newMembers: 2 },
      { month: "Feb", transactions: 900, newMembers: 2 },
      { month: "Mar", transactions: 800, newMembers: 1 },
    ],
    governance: {
      votingPower: 75000,
      quorum: 40,
      proposalThreshold: 7500,
      votingPeriod: 3,
    },
    recentProposals: [
      {
        id: "PROP-001",
        title: "Trading Strategy Optimization",
        status: "Voting",
        timeRemaining: "2d 8h 12m",
        yesVotes: 11,
        noVotes: 2,
        votes: 13,
      },
    ],
  },
  EpicentralDAO: {
    description: "EpicentralDAO governance for the Epicentral ecosystem.",
    members: 22,
    votes: 130,
    proposals: 10,
    tvl: 45000,
    treasuryAllocation: [
      { name: "Development", value: 55 },
      { name: "Community", value: 30 },
      { name: "Operations", value: 15 },
    ],
    monthlyActivity: [
      { month: "Oct", transactions: 1100, newMembers: 2 },
      { month: "Nov", transactions: 1300, newMembers: 3 },
      { month: "Dec", transactions: 1200, newMembers: 2 },
      { month: "Jan", transactions: 1450, newMembers: 3 },
      { month: "Feb", transactions: 1500, newMembers: 3 },
      { month: "Mar", transactions: 1350, newMembers: 2 },
    ],
    governance: {
      votingPower: 110000,
      quorum: 30,
      proposalThreshold: 10000,
      votingPeriod: 5,
    },
    recentProposals: [
      {
        id: "PROP-001",
        title: "Platform Enhancement Proposal",
        status: "Completed",
        completedAgo: "Completed 11 days ago",
        yesVotes: 18,
        noVotes: 3,
        votes: 21,
      },
    ],
  },
}

// Update the type definition for sort fields
type SortField = "members" | "votes" | "proposals" | "tvl"
type SortDirection = "asc" | "desc"

// Add filter types for new filter functionality
type FilterCategory = "all" | "high-tvl" | "active" | "new"

export default function SolanaDAODashboard() {
  const [selectedDAO, setSelectedDAO] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sortField, setSortField] = useState<SortField>("tvl")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [daoDetails] = useState(fallbackDAOData)
  const [isLoadingProposals, setIsLoadingProposals] = useState(true)
  const [activeProtocol, setActiveProtocol] = useState<ProtocolId>("realms")
  const [dailyProposalsData, setDailyProposalsData] = useState<DailyProposalData[]>(fallbackProposalsData)
  const [activeCategory, setActiveCategory] = useState(0)
  const [touchStartX, setTouchStartX] = useState(0)

  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all")
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Add swipeable menu state and handlers
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  // Touch handlers for swipe functionality
  const handleTouchStartSwipe = (e: any) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMoveSwipe = (e: any) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEndSwipe = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && activeCategory < 1) {
      setActiveCategory(activeCategory + 1)
    }
    if (isRightSwipe && activeCategory > 0) {
      setActiveCategory(activeCategory - 1)
    }
  }

  // Add new state variables for Daily Proposals analytics
  const [proposalTimeRange, setProposalTimeRange] = useState<"7d" | "14d" | "30d" | "all">("all")
  const [proposalChartType, setProposalChartType] = useState<"line" | "bar" | "area">("line")

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
  }, [daoDetails])

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

  const filteredAndSearchedDAOs = useMemo(() => {
    let filtered = Object.entries(daoDetails)

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        ([name, dao]) => name.toLowerCase().includes(query) || dao.description?.toLowerCase().includes(query),
      )
    }

    // Apply category filter
    switch (activeFilter) {
      case "high-tvl":
        filtered = filtered.filter(([_, dao]) => dao.tvl > 1000000)
        break
      case "active":
        filtered = filtered.filter(([_, dao]) => dao.proposals > 50)
        break
      case "new":
        filtered = filtered.filter(([_, dao]) => dao.members < 500)
        break
      default:
        break
    }

    return filtered
  }, [daoDetails, searchQuery, activeFilter])

  const sortedDAOs = useMemo(() => {
    return [...filteredAndSearchedDAOs].sort(([nameA, daoA], [nameB, daoB]) => {
      const valueA = daoA[sortField] || 0
      const valueB = daoB[sortField] || 0

      if (sortDirection === "asc") {
        return valueA - valueB
      } else {
        return valueB - valueA
      }
    })
  }, [filteredAndSearchedDAOs, sortField, sortDirection])

  const paginatedDAOs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return sortedDAOs.slice(startIndex, startIndex + itemsPerPage)
  }, [sortedDAOs, currentPage, itemsPerPage])

  const totalPages = Math.ceil(sortedDAOs.length / itemsPerPage)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, activeFilter, sortField, sortDirection])

  // Get top 5 DAOs by TVL for the chart
  const top5DAOsByTVL = useMemo(() => {
    return Object.entries(daoDetails)
      .sort(([, a], [, b]) => b.tvl - a.tvl)
      .slice(0, 5)
      .map(([name]) => name)
  }, [daoDetails])

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
  }, [top5DAOsByTVL, daoDetails])

  // Debug TVL data
  debugChartData("TVL Data", tvlData)

  // Create data for the Top 5 DAOs by TVL bar chart
  const topDaosTVLData = useMemo(() => {
    return top5DAOsByTVL.map((daoName) => ({
      name: daoName,
      tvl: Math.round(daoDetails[daoName].tvl / 1000000), // Convert to millions for better display
    }))
  }, [top5DAOsByTVL, daoDetails])

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

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStartX(e.touches[0].clientX)
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!touchStartX) return

    const touchEndX = e.touches[0].clientX
    const touchDiff = touchStartX - touchEndX

    if (touchDiff > 5) {
      // Swipe left
      setActiveCategory(Math.min(3, activeCategory + 1))
    }

    if (touchDiff < -5) {
      // Swipe right
      setActiveCategory(Math.max(0, activeCategory - 1))
    }

    setTouchStartX(0) // Reset touch start position
  }

  const handleTouchEnd = () => {
    setTouchStartX(0)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-black via-gray-900 to-orange-950 text-white">
      <header className="sticky top-0 z-40 border-b border-orange-800/30 bg-black/90 px-4 py-3 backdrop-blur-xl md:px-6">
        <div className="mx-auto flex max-w-[1600px] flex-col justify-between gap-3 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <Image src="/images/pandata-logo-new.png" alt="Pandata Aggregator" width={34} height={34} className="rounded-full bg-white p-1" />
            <div><p className="text-sm font-bold text-orange-300">Governance Protocols</p><p className="text-xs text-gray-500">Solana governance intelligence</p></div>
          </div>
          <nav aria-label="Governance protocols" className="flex w-full gap-1 overflow-x-auto rounded-lg border border-orange-900/40 bg-black/60 p-1 md:w-auto">
            {(["realms", "metadao", "squads"] as ProtocolId[]).map((protocol) => (
              <button key={protocol} type="button" onClick={() => setActiveProtocol(protocol)} aria-pressed={activeProtocol === protocol} className={`min-w-28 rounded-md px-4 py-2 text-sm font-medium transition-colors ${activeProtocol === protocol ? "bg-orange-600/30 text-orange-200 shadow-inner shadow-orange-900/30" : "text-gray-400 hover:bg-orange-950/30 hover:text-orange-300"}`}>
                {protocolMeta[protocol].name}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {activeProtocol === "realms" ? <div className="flex min-h-0 flex-1">
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

          {/* Middle row - Enhanced Swipeable DeFi Opportunities */}
          <Card className="bg-black/50 backdrop-blur-lg border-green-600/30 shadow-lg">
            <CardHeader className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg text-green-400">Market Insights</CardTitle>
                  <CardDescription className="text-sm text-green-300">
                    Comprehensive overview of Solana ecosystem opportunities
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex bg-black/30 rounded-lg p-1">
                    {["Proposals", "DeFi"].map((category, index) => (
                      <button
                        key={category}
                        onClick={() => setActiveCategory(index)}
                        className={`px-3 py-1 text-xs rounded-md transition-all duration-300 ${
                          activeCategory === index
                            ? "bg-green-600/50 text-green-300"
                            : "text-gray-400 hover:text-green-400"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => setActiveCategory(Math.max(0, activeCategory - 1))}
                      disabled={activeCategory === 0}
                      className="p-1 rounded-md bg-black/30 text-gray-400 hover:text-green-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setActiveCategory(Math.min(1, activeCategory + 1))}
                      disabled={activeCategory === 1}
                      className="p-1 rounded-md bg-black/30 text-gray-400 hover:text-green-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="relative overflow-hidden h-48">
                <div
                  className="flex transition-transform duration-500 ease-in-out h-full"
                  style={{ transform: `translateX(-${activeCategory * 100}%)` }}
                  onTouchStart={handleTouchStartSwipe}
                  onTouchMove={handleTouchMoveSwipe}
                  onTouchEnd={handleTouchEndSwipe}
                >
                  {/* Top Proposals Panel */}
                  <div className="w-full flex-shrink-0 h-full">
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold text-green-400 mb-4 flex items-center">
                        <Vote className="h-4 w-4 mr-2" />
                        Top Active Proposals
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Featured Proposals - Updated to use IslandDAO */}
                        {[
                          {
                            dao: "IslandDAO",
                            title: "Island Protocol Upgrade v2.0",
                            amount: "$25,000",
                            status: "Voting",
                            timeLeft: "2d 14h",
                            yesVotes: 178,
                            totalVotes: 186,
                            category: "Development",
                          },
                          {
                            dao: "Realms Ecosystem",
                            title: "Solana Contentathon Sponsorship",
                            amount: "$2,000",
                            status: "Voting",
                            timeLeft: "1d 12h",
                            yesVotes: 12,
                            totalVotes: 12,
                            category: "Marketing",
                          },
                        ].map((proposal, index) => (
                          <div
                            key={index}
                            className="bg-black/30 rounded-lg p-4 hover:bg-black/40 transition-colors border border-green-900/20"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <p className="text-xs text-green-400 font-medium">{proposal.dao}</p>
                                <p className="text-sm font-medium text-white">{proposal.title}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-bold text-green-400">{proposal.amount}</p>
                                <Badge
                                  className={`text-xs ${
                                    proposal.status === "Voting"
                                      ? "bg-blue-900/30 text-blue-400"
                                      : "bg-green-900/30 text-green-400"
                                  }`}
                                >
                                  {proposal.status}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs text-gray-400">{proposal.category}</span>
                              <span className="text-xs text-gray-400">{proposal.timeLeft}</span>
                            </div>
                            <div className="w-full bg-gray-800 rounded-full h-2">
                              <div
                                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${(proposal.yesVotes / proposal.totalVotes) * 100}%` }}
                              />
                            </div>
                            <div className="flex justify-between text-xs text-gray-400 mt-1">
                              <span>Yes: {proposal.yesVotes}</span>
                              <span>Total: {proposal.totalVotes}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* DeFi Opportunities Panel */}
                  <div className="w-full flex-shrink-0 h-full">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
                      {/* Lending Platforms */}
                      <div>
                        <h3 className="text-sm font-semibold text-green-400 mb-2 flex items-center">
                          <TrendingUp className="h-4 w-4 mr-2" />
                          Lending Platforms
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-2 rounded-md bg-black/30 hover:bg-black/40 transition-colors">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center mr-2 overflow-hidden">
                                <Image
                                  src="/images/1345e107-383c-4392-9f9b-e0b527d37851-small.jpeg"
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
                          <div className="flex items-center justify-between p-2 rounded-md bg-black/30 hover:bg-black/40 transition-colors">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-2 overflow-hidden">
                                <Image
                                  src="/images/solend2.png"
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
                        <h3 className="text-sm font-semibold text-green-400 mb-2 flex items-center">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          AMM Pools
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-2 rounded-md bg-black/30 hover:bg-black/40 transition-colors">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                                <Image
                                  src="/images/meteora2.jpeg"
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
                          <div className="flex items-center justify-between p-2 rounded-md bg-black/30 hover:bg-black/40 transition-colors">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                                <Image
                                  src="/images/orca1.png"
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
                        <h3 className="text-sm font-semibold text-green-400 mb-2 flex items-center">
                          <Coins className="h-4 w-4 mr-2" />
                          Liquid Staking
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-2 rounded-md bg-black/30 hover:bg-black/40 transition-colors">
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
                  </div>
                </div>
              </div>

              {/* Progress Indicators */}
              <div className="flex justify-center mt-4 space-x-2">
                {[0, 1].map((index) => (
                  <button
                    key={index}
                    onClick={() => setActiveCategory(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeCategory === index ? "bg-green-400" : "bg-gray-600"
                    }`}
                  />
                ))}
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
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-lg text-yellow-400">Daily New Proposals</CardTitle>
                  <CardDescription className="text-sm text-yellow-300">
                    Comprehensive analysis of governance proposal creation
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {/* Time Range Selector */}
                  <div className="flex bg-black/40 rounded-lg p-1 border border-yellow-600/20">
                    {(["7d", "14d", "30d", "all"] as const).map((range) => (
                      <button
                        key={range}
                        onClick={() => setProposalTimeRange(range)}
                        className={`px-3 py-1 text-xs rounded-md transition-all ${
                          proposalTimeRange === range
                            ? "bg-yellow-600 text-black font-medium"
                            : "text-yellow-400 hover:bg-yellow-600/20"
                        }`}
                      >
                        {range === "all" ? "All" : range}
                      </button>
                    ))}
                  </div>
                  {/* Chart Type Toggle */}
                  <div className="flex bg-black/40 rounded-lg p-1 border border-yellow-600/20">
                    <button
                      onClick={() => setProposalChartType("line")}
                      className={`p-1.5 rounded-md transition-all ${
                        proposalChartType === "line"
                          ? "bg-yellow-600 text-black"
                          : "text-yellow-400 hover:bg-yellow-600/20"
                      }`}
                      title="Line Chart"
                    >
                      <TrendingUp className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setProposalChartType("bar")}
                      className={`p-1.5 rounded-md transition-all ${
                        proposalChartType === "bar"
                          ? "bg-yellow-600 text-black"
                          : "text-yellow-400 hover:bg-yellow-600/20"
                      }`}
                      title="Bar Chart"
                    >
                      <BarChart3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setProposalChartType("area")}
                      className={`p-1.5 rounded-md transition-all ${
                        proposalChartType === "area"
                          ? "bg-yellow-600 text-black"
                          : "text-yellow-400 hover:bg-yellow-600/20"
                      }`}
                      title="Area Chart"
                    >
                      <Activity className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              {isLoadingProposals ? (
                <div className="flex items-center justify-center h-[300px]">
                  <div className="text-yellow-400">Loading data from Dune Analytics...</div>
                </div>
              ) : dailyProposalsData.length > 0 ? (
                (() => {
                  const filteredData =
                    proposalTimeRange === "all"
                      ? dailyProposalsData
                      : dailyProposalsData.slice(
                          -(proposalTimeRange === "7d" ? 7 : proposalTimeRange === "14d" ? 14 : 30),
                        )

                  const totalProposals = filteredData.reduce((sum, day) => sum + day.proposals, 0)
                  const avgProposals = totalProposals / filteredData.length
                  const maxDay = [...filteredData].sort((a, b) => b.proposals - a.proposals)[0]
                  const minDay = [...filteredData].sort((a, b) => a.proposals - b.proposals)[0]
                  const lastWeek = filteredData.slice(-7)
                  const prevWeek = filteredData.slice(-14, -7)
                  const lastWeekTotal = lastWeek.reduce((sum, day) => sum + day.proposals, 0)
                  const prevWeekTotal =
                    prevWeek.length > 0 ? prevWeek.reduce((sum, day) => sum + day.proposals, 0) : lastWeekTotal
                  const weeklyChange = prevWeekTotal > 0 ? ((lastWeekTotal - prevWeekTotal) / prevWeekTotal) * 100 : 0

                  const variance =
                    filteredData.reduce((sum, day) => sum + Math.pow(day.proposals - avgProposals, 2), 0) /
                    filteredData.length
                  const stdDev = Math.sqrt(variance)

                  const movingAvgData = filteredData.map((day, index) => {
                    const start = Math.max(0, index - 6)
                    const subset = filteredData.slice(start, index + 1)
                    const ma = subset.reduce((sum, d) => sum + d.proposals, 0) / subset.length
                    return { ...day, movingAvg: ma }
                  })

                  const distributionData = [
                    {
                      name: "High (>" + Math.ceil(avgProposals * 1.5) + ")",
                      value: filteredData.filter((d) => d.proposals > avgProposals * 1.5).length,
                      color: "#22c55e",
                    },
                    {
                      name: "Medium",
                      value: filteredData.filter(
                        (d) => d.proposals >= avgProposals * 0.5 && d.proposals <= avgProposals * 1.5,
                      ).length,
                      color: "#eab308",
                    },
                    {
                      name: "Low (<" + Math.floor(avgProposals * 0.5) + ")",
                      value: filteredData.filter((d) => d.proposals < avgProposals * 0.5).length,
                      color: "#ef4444",
                    },
                  ]

                  return (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                        {/* Total Proposals */}
                        <div className="bg-black/30 rounded-lg p-3 border border-yellow-900/20">
                          <p className="text-xs text-yellow-300 mb-1">Total Proposals</p>
                          <div className="flex items-end justify-between">
                            <p className="text-xl font-bold text-white">{totalProposals}</p>
                            <div className="h-8 w-16">
                              <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={filteredData.slice(-7)}>
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
                          <p className="text-xs text-gray-400 mt-1">Last {filteredData.length} days</p>
                        </div>

                        {/* Daily Average */}
                        <div className="bg-black/30 rounded-lg p-3 border border-yellow-900/20">
                          <p className="text-xs text-yellow-300 mb-1">Daily Average</p>
                          <div className="flex items-end justify-between">
                            <p className="text-xl font-bold text-white">{avgProposals.toFixed(1)}</p>
                            <div className="h-8 w-16">
                              <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                  data={[
                                    { name: "Avg", value: avgProposals },
                                    { name: "Min", value: minDay.proposals },
                                    { name: "Max", value: maxDay.proposals },
                                  ]}
                                >
                                  <Bar dataKey="value" fill="#eab308" isAnimationActive={false} />
                                </BarChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">Per day</p>
                        </div>

                        {/* Weekly Change */}
                        <div className="bg-black/30 rounded-lg p-3 border border-yellow-900/20">
                          <p className="text-xs text-yellow-300 mb-1">Weekly Change</p>
                          <div className="flex items-center">
                            <p className={`text-xl font-bold ${weeklyChange >= 0 ? "text-green-400" : "text-red-400"}`}>
                              {weeklyChange >= 0 ? "+" : ""}
                              {weeklyChange.toFixed(1)}%
                            </p>
                            {weeklyChange >= 0 ? (
                              <ArrowUp className="ml-1 h-4 w-4 text-green-400" />
                            ) : (
                              <ArrowDown className="ml-1 h-4 w-4 text-red-400" />
                            )}
                          </div>
                          <p className="text-xs text-gray-400 mt-1">vs previous week</p>
                        </div>

                        {/* Peak Day */}
                        <div className="bg-black/30 rounded-lg p-3 border border-yellow-900/20">
                          <p className="text-xs text-yellow-300 mb-1">Peak Day</p>
                          <p className="text-xl font-bold text-white">{maxDay.proposals}</p>
                          <p className="text-xs text-gray-400 mt-1">{maxDay.day}</p>
                        </div>

                        {/* Volatility */}
                        <div className="bg-black/30 rounded-lg p-3 border border-yellow-900/20">
                          <p className="text-xs text-yellow-300 mb-1">Volatility</p>
                          <p className="text-xl font-bold text-white">{stdDev.toFixed(1)}</p>
                          <p className="text-xs text-gray-400 mt-1">Std deviation</p>
                        </div>

                        {/* Active Days */}
                        <div className="bg-black/30 rounded-lg p-3 border border-yellow-900/20">
                          <p className="text-xs text-yellow-300 mb-1">Active Days</p>
                          <p className="text-xl font-bold text-white">
                            {filteredData.filter((d) => d.proposals > 0).length}/{filteredData.length}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {((filteredData.filter((d) => d.proposals > 0).length / filteredData.length) * 100).toFixed(
                              0,
                            )}
                            % activity
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        {/* Primary Chart */}
                        <div className="lg:col-span-2 bg-black/20 rounded-lg p-4 border border-yellow-900/20">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-medium text-yellow-400">Proposal Activity</h3>
                            <div className="flex items-center gap-2 text-xs">
                              <span className="flex items-center gap-1">
                                <span className="w-3 h-0.5 bg-yellow-500 rounded"></span>
                                <span className="text-gray-400">Proposals</span>
                              </span>
                              <span className="flex items-center gap-1">
                                <span className="w-3 h-0.5 bg-orange-500 rounded"></span>
                                <span className="text-gray-400">7-day MA</span>
                              </span>
                            </div>
                          </div>
                          <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                              {proposalChartType === "line" ? (
                                <LineChart data={movingAvgData}>
                                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                                  <XAxis
                                    dataKey="day"
                                    stroke="#ffffff80"
                                    fontSize={10}
                                    angle={-45}
                                    textAnchor="end"
                                    height={60}
                                    interval={Math.max(0, Math.floor(movingAvgData.length / 10))}
                                  />
                                  <YAxis stroke="#ffffff80" domain={[0, "auto"]} allowDecimals={false} fontSize={10} />
                                  <Tooltip
                                    contentStyle={{
                                      backgroundColor: "#000000",
                                      border: "1px solid #eab30840",
                                      borderRadius: "4px",
                                    }}
                                    formatter={(value: number, name: string) => [
                                      value.toFixed(1),
                                      name === "movingAvg" ? "7-day MA" : "Proposals",
                                    ]}
                                  />
                                  <Line
                                    type="monotone"
                                    dataKey="proposals"
                                    stroke="#eab308"
                                    strokeWidth={2}
                                    dot={false}
                                    isAnimationActive={true}
                                  />
                                  <Line
                                    type="monotone"
                                    dataKey="movingAvg"
                                    stroke="#f97316"
                                    strokeWidth={2}
                                    strokeDasharray="5 5"
                                    dot={false}
                                    isAnimationActive={true}
                                  />
                                </LineChart>
                              ) : proposalChartType === "bar" ? (
                                <BarChart data={movingAvgData}>
                                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                                  <XAxis
                                    dataKey="day"
                                    stroke="#ffffff80"
                                    fontSize={10}
                                    angle={-45}
                                    textAnchor="end"
                                    height={60}
                                    interval={Math.max(0, Math.floor(movingAvgData.length / 10))}
                                  />
                                  <YAxis stroke="#ffffff80" domain={[0, "auto"]} allowDecimals={false} fontSize={10} />
                                  <Tooltip
                                    contentStyle={{
                                      backgroundColor: "#000000",
                                      border: "1px solid #eab30840",
                                      borderRadius: "4px",
                                    }}
                                    formatter={(value: number) => [value, "Proposals"]}
                                  />
                                  <Bar dataKey="proposals" fill="#eab308" isAnimationActive={true} />
                                </BarChart>
                              ) : (
                                <AreaChart data={movingAvgData}>
                                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                                  <XAxis
                                    dataKey="day"
                                    stroke="#ffffff80"
                                    fontSize={10}
                                    angle={-45}
                                    textAnchor="end"
                                    height={60}
                                    interval={Math.max(0, Math.floor(movingAvgData.length / 10))}
                                  />
                                  <YAxis stroke="#ffffff80" domain={[0, "auto"]} allowDecimals={false} fontSize={10} />
                                  <Tooltip
                                    contentStyle={{
                                      backgroundColor: "#000000",
                                      border: "1px solid #eab30840",
                                      borderRadius: "4px",
                                    }}
                                    formatter={(value: number) => [value.toFixed(1), "Proposals"]}
                                  />
                                  <Area
                                    type="monotone"
                                    dataKey="proposals"
                                    stroke="#eab308"
                                    fill="#eab30840"
                                    isAnimationActive={true}
                                  />
                                </AreaChart>
                              )}
                            </ResponsiveContainer>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {/* Distribution Chart */}
                          <div className="bg-black/20 rounded-lg p-4 border border-yellow-900/20">
                            <h3 className="text-sm font-medium text-yellow-400 mb-3">Activity Distribution</h3>
                            <div className="h-[100px] w-full">
                              <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                  <Pie
                                    data={distributionData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={25}
                                    outerRadius={40}
                                    dataKey="value"
                                    isAnimationActive={true}
                                  >
                                    {distributionData.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                  </Pie>
                                  <Tooltip
                                    contentStyle={{
                                      backgroundColor: "#000000",
                                      border: "1px solid #eab30840",
                                      borderRadius: "4px",
                                    }}
                                    formatter={(value: number) => [`${value} days`, ""]}
                                  />
                                </PieChart>
                              </ResponsiveContainer>
                            </div>
                            <div className="flex justify-center gap-3 mt-2">
                              {distributionData.map((item, i) => (
                                <div key={i} className="flex items-center gap-1 text-xs">
                                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                                  <span className="text-gray-400">{item.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Quick Stats */}
                          <div className="bg-black/20 rounded-lg p-4 border border-yellow-900/20">
                            <h3 className="text-sm font-medium text-yellow-400 mb-3">Quick Insights</h3>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-400">Highest Week</span>
                                <span className="text-white font-medium">
                                  {Math.max(
                                    ...Array.from({ length: Math.ceil(filteredData.length / 7) }, (_, i) =>
                                      filteredData.slice(i * 7, (i + 1) * 7).reduce((sum, d) => sum + d.proposals, 0),
                                    ),
                                  )}{" "}
                                  proposals
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-400">Lowest Day</span>
                                <span className="text-white font-medium">
                                  {minDay.proposals} on {minDay.day}
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-400">Consistency</span>
                                <span className="text-white font-medium">
                                  {((1 - stdDev / avgProposals) * 100).toFixed(0)}%
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-400">Trend</span>
                                <span
                                  className={`font-medium ${weeklyChange >= 0 ? "text-green-400" : "text-red-400"}`}
                                >
                                  {weeklyChange >= 0 ? "Increasing" : "Decreasing"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })()
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
            <CardHeader className="pb-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-orange-400">Top Solana Projects</CardTitle>
                  <CardDescription className="text-orange-300">
                    A list of top performing projects on Solana {isLoadingDAOData && "(Loading mock data...)"}
                  </CardDescription>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Search Input */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search DAOs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-10 w-full sm:w-64 bg-black/40 border-orange-600/30 text-white placeholder:text-gray-500 focus:border-orange-500"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  {/* Filter Toggle Button */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                      showFilters || activeFilter !== "all"
                        ? "bg-orange-600/50 text-orange-200"
                        : "bg-black/40 text-gray-400 hover:text-orange-400 border border-orange-600/30"
                    }`}
                  >
                    <Filter className="h-4 w-4" />
                    <span className="text-sm">Filters</span>
                    {activeFilter !== "all" && (
                      <Badge variant="secondary" className="bg-orange-500/30 text-orange-200 text-xs">
                        1
                      </Badge>
                    )}
                  </button>
                </div>
              </div>

              {showFilters && (
                <div className="mt-4 p-4 bg-black/30 rounded-lg border border-orange-600/20">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm text-gray-400 mr-2 self-center">Filter by:</span>
                    {[
                      { key: "all", label: "All Projects", icon: null },
                      { key: "high-tvl", label: "High TVL (>$1M)", icon: <Coins className="h-3 w-3" /> },
                      { key: "active", label: "Most Active (>50 proposals)", icon: <Vote className="h-3 w-3" /> },
                      { key: "new", label: "Emerging (<500 members)", icon: <TrendingUp className="h-3 w-3" /> },
                    ].map((filter) => (
                      <button
                        key={filter.key}
                        onClick={() => setActiveFilter(filter.key as FilterCategory)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all ${
                          activeFilter === filter.key
                            ? "bg-orange-600/50 text-orange-200 border border-orange-500"
                            : "bg-black/40 text-gray-400 hover:text-orange-400 border border-gray-700 hover:border-orange-600/50"
                        }`}
                      >
                        {filter.icon}
                        {filter.label}
                      </button>
                    ))}
                    {activeFilter !== "all" && (
                      <button
                        onClick={() => setActiveFilter("all")}
                        className="flex items-center gap-1 px-2 py-1.5 text-sm text-red-400 hover:text-red-300"
                      >
                        <X className="h-3 w-3" />
                        Clear
                      </button>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
                <span>
                  Showing {paginatedDAOs.length} of {sortedDAOs.length} projects
                  {searchQuery && ` matching "${searchQuery}"`}
                  {activeFilter !== "all" && ` (filtered)`}
                </span>
                <span>
                  Page {currentPage} of {totalPages || 1}
                </span>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-orange-900/30">
                    <TableHead className="text-orange-400">Name</TableHead>
                    <TableHead
                      className="text-orange-400 cursor-pointer hover:text-orange-300 transition-colors"
                      onClick={() => handleSort("members")}
                    >
                      Members {renderSortIndicator("members")}
                    </TableHead>
                    <TableHead
                      className="text-orange-400 cursor-pointer hover:text-orange-300 transition-colors"
                      onClick={() => handleSort("votes")}
                    >
                      Total Votes {renderSortIndicator("votes")}
                    </TableHead>
                    <TableHead
                      className="text-orange-400 cursor-pointer hover:text-orange-300 transition-colors"
                      onClick={() => handleSort("proposals")}
                    >
                      Proposals {renderSortIndicator("proposals")}
                    </TableHead>
                    <TableHead
                      className="text-orange-400 cursor-pointer hover:text-orange-300 transition-colors"
                      onClick={() => handleSort("tvl")}
                    >
                      Treasury Value {renderSortIndicator("tvl")}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedDAOs.length > 0 ? (
                    paginatedDAOs.map(([daoName, dao]) => (
                      <TableRow
                        key={daoName}
                        className="border-b border-orange-900/30 hover:bg-orange-950/40 transition-colors"
                      >
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
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-gray-400">
                        <div className="flex flex-col items-center gap-2">
                          <Search className="h-8 w-8 text-gray-500" />
                          <p>No projects found matching your criteria</p>
                          <button
                            onClick={() => {
                              setSearchQuery("")
                              setActiveFilter("all")
                            }}
                            className="text-orange-400 hover:text-orange-300 text-sm"
                          >
                            Clear filters
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

              {totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 border-t border-orange-900/30">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-black/40 text-gray-400 hover:text-orange-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum
                      if (totalPages <= 5) {
                        pageNum = i + 1
                      } else if (currentPage <= 3) {
                        pageNum = i + 1
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i
                      } else {
                        pageNum = currentPage - 2 + i
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-8 h-8 rounded-md text-sm transition-colors ${
                            currentPage === pageNum
                              ? "bg-orange-600/50 text-orange-200"
                              : "bg-black/40 text-gray-400 hover:text-orange-400"
                          }`}
                        >
                          {pageNum}
                        </button>
                      )
                    })}
                  </div>

                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-black/40 text-gray-400 hover:text-orange-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}

              <div className="text-xs text-gray-400 p-4 text-right">
                Data source: Dune Analytics and curated protocol metadata
              </div>
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
      </div> : <ProtocolDashboard protocol={activeProtocol} />}
    </div>
  )
}
