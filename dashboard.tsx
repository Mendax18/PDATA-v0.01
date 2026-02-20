"use client"

import { useState } from "react"
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
import { ArrowRightIcon, ArrowUpIcon, Users, DollarSign, FileText, Menu } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DAODetailsModal } from "@/components/dao-details-modal"
import { NewestDAOs } from "@/components/newest-daos"

const daoGrowthData = [
  { month: "Jan", daos: 500 },
  { month: "Feb", daos: 650 },
  { month: "Mar", daos: 800 },
  { month: "Apr", daos: 950 },
  { month: "May", daos: 1100 },
  { month: "Jun", daos: 1284 },
]

const topDaosTVLData = [
  { name: "Mango", tvl: 250 },
  { name: "Serum", tvl: 200 },
  { name: "Raydium", tvl: 180 },
  { name: "Orca", tvl: 150 },
  { name: "Marinade", tvl: 120 },
  { name: "Metaplex", tvl: 100 },
  { name: "Bonk", tvl: 90 },
  { name: "Jito", tvl: 80 },
  { name: "Grape", tvl: 60 },
]

const tvlData = [
  {
    month: "Jan",
    Mango: 200,
    Serum: 180,
    Raydium: 160,
    Orca: 140,
    Marinade: 100,
    Metaplex: 80,
    Bonk: 70,
    Jito: 60,
    Grape: 50,
  },
  {
    month: "Feb",
    Mango: 220,
    Serum: 190,
    Raydium: 170,
    Orca: 145,
    Marinade: 110,
    Metaplex: 85,
    Bonk: 75,
    Jito: 65,
    Grape: 55,
  },
  {
    month: "Mar",
    Mango: 240,
    Serum: 200,
    Raydium: 185,
    Orca: 155,
    Marinade: 120,
    Metaplex: 90,
    Bonk: 80,
    Jito: 70,
    Grape: 58,
  },
  {
    month: "Apr",
    Mango: 280,
    Serum: 220,
    Raydium: 200,
    Orca: 170,
    Marinade: 130,
    Metaplex: 95,
    Bonk: 85,
    Jito: 75,
    Grape: 62,
  },
  {
    month: "May",
    Mango: 300,
    Serum: 240,
    Raydium: 220,
    Orca: 190,
    Marinade: 150,
    Metaplex: 100,
    Bonk: 90,
    Jito: 80,
    Grape: 60,
  },
  {
    month: "Jun",
    Mango: 250,
    Serum: 200,
    Raydium: 180,
    Orca: 150,
    Marinade: 120,
    Metaplex: 100,
    Bonk: 90,
    Jito: 80,
    Grape: 60,
  },
]

const daoDetails = {
  Mango: {
    description: "Mango is a decentralized trading platform on Solana.",
    members: 125000,
    tvl: 250000000,
    proposals: 532,
    treasuryAllocation: [
      { name: "Reserves", value: 40 },
      { name: "Development", value: 30 },
      { name: "Marketing", value: 20 },
      { name: "Partnerships", value: 10 },
    ],
    monthlyActivity: [
      { month: "Jan", transactions: 50000, newMembers: 5000 },
      { month: "Feb", transactions: 55000, newMembers: 5500 },
      { month: "Mar", transactions: 60000, newMembers: 6000 },
      { month: "Apr", transactions: 65000, newMembers: 6500 },
      { month: "May", transactions: 70000, newMembers: 7000 },
      { month: "Jun", transactions: 75000, newMembers: 7500 },
    ],
    governance: {
      votingPower: 1250000000,
      quorum: 10,
      proposalThreshold: 100000,
      votingPeriod: 3,
    },
    tokenPerformance: [
      { date: "2023-01-01", price: 0.5 },
      { date: "2023-02-01", price: 0.6 },
      { date: "2023-03-01", price: 0.55 },
      { date: "2023-04-01", price: 0.7 },
      { date: "2023-05-01", price: 0.8 },
      { date: "2023-06-01", price: 0.75 },
    ],
    recentProposals: [
      { id: "PROP-001", title: "Increase Liquidity Rewards", status: "Passed", votes: 980000 },
      { id: "PROP-002", title: "Upgrade Oracle System", status: "Active", votes: 750000 },
      { id: "PROP-003", title: "Reduce Trading Fees", status: "Failed", votes: 620000 },
    ],
  },
  Serum: {
    description: "Serum governs the Serum decentralized exchange on Solana.",
    members: 98000,
    tvl: 200000000,
    proposals: 423,
    treasuryAllocation: [
      { name: "Reserves", value: 35 },
      { name: "Development", value: 35 },
      { name: "Marketing", value: 20 },
      { name: "Partnerships", value: 10 },
    ],
    monthlyActivity: [
      { month: "Jan", transactions: 40000, newMembers: 4000 },
      { month: "Feb", transactions: 45000, newMembers: 4500 },
      { month: "Mar", transactions: 50000, newMembers: 5000 },
      { month: "Apr", transactions: 55000, newMembers: 5500 },
      { month: "May", transactions: 60000, newMembers: 6000 },
      { month: "Jun", transactions: 65000, newMembers: 6500 },
    ],
    governance: {
      votingPower: 980000000,
      quorum: 10,
      proposalThreshold: 80000,
      votingPeriod: 3,
    },
    tokenPerformance: [
      { date: "2023-01-01", price: 0.4 },
      { date: "2023-02-01", price: 0.5 },
      { date: "2023-03-01", price: 0.45 },
      { date: "2023-04-01", price: 0.6 },
      { date: "2023-05-01", price: 0.7 },
      { date: "2023-06-01", price: 0.65 },
    ],
    recentProposals: [
      { id: "PROP-001", title: "Implement New Fee Structure", status: "Passed", votes: 784000 },
      { id: "PROP-002", title: "Enhance Security Measures", status: "Active", votes: 627200 },
      { id: "PROP-003", title: "Launch New Trading Pair", status: "Failed", votes: 510400 },
    ],
  },
  Raydium: {
    description: "Raydium manages the Raydium automated market maker (AMM) on Solana.",
    members: 87000,
    tvl: 180000000,
    proposals: 387,
    treasuryAllocation: [
      { name: "Reserves", value: 30 },
      { name: "Development", value: 40 },
      { name: "Marketing", value: 20 },
      { name: "Partnerships", value: 10 },
    ],
    monthlyActivity: [
      { month: "Jan", transactions: 35000, newMembers: 3500 },
      { month: "Feb", transactions: 40000, newMembers: 4000 },
      { month: "Mar", transactions: 45000, newMembers: 4500 },
      { month: "Apr", transactions: 50000, newMembers: 5000 },
      { month: "May", transactions: 55000, newMembers: 5500 },
      { month: "Jun", transactions: 60000, newMembers: 6000 },
    ],
    governance: {
      votingPower: 870000000,
      quorum: 10,
      proposalThreshold: 70000,
      votingPeriod: 3,
    },
    tokenPerformance: [
      { date: "2023-01-01", price: 0.35 },
      { date: "2023-02-01", price: 0.4 },
      { date: "2023-03-01", price: 0.38 },
      { date: "2023-04-01", price: 0.5 },
      { date: "2023-05-01", price: 0.6 },
      { date: "2023-06-01", price: 0.55 },
    ],
    recentProposals: [
      { id: "PROP-001", title: "Optimize Liquidity Provision", status: "Passed", votes: 696000 },
      { id: "PROP-002", title: "Integrate New DEX", status: "Active", votes: 556800 },
      { id: "PROP-003", title: "Implement Referral Program", status: "Failed", votes: 464000 },
    ],
  },
  Orca: {
    description: "Orca oversees the Orca decentralized exchange and automated market maker on Solana.",
    members: 72000,
    tvl: 150000000,
    proposals: 312,
    treasuryAllocation: [
      { name: "Reserves", value: 25 },
      { name: "Development", value: 45 },
      { name: "Marketing", value: 20 },
      { name: "Partnerships", value: 10 },
    ],
    monthlyActivity: [
      { month: "Jan", transactions: 30000, newMembers: 3000 },
      { month: "Feb", transactions: 35000, newMembers: 3500 },
      { month: "Mar", transactions: 40000, newMembers: 4000 },
      { month: "Apr", transactions: 45000, newMembers: 4500 },
      { month: "May", transactions: 50000, newMembers: 5000 },
      { month: "Jun", transactions: 55000, newMembers: 5500 },
    ],
    governance: {
      votingPower: 720000000,
      quorum: 10,
      proposalThreshold: 60000,
      votingPeriod: 3,
    },
    tokenPerformance: [
      { date: "2023-01-01", price: 0.3 },
      { date: "2023-02-01", price: 0.35 },
      { date: "2023-03-01", price: 0.33 },
      { date: "2023-04-01", price: 0.45 },
      { date: "2023-05-01", price: 0.55 },
      { date: "2023-06-01", price: 0.5 },
    ],
    recentProposals: [
      { id: "PROP-001", title: "Improve User Interface", status: "Passed", votes: 576000 },
      { id: "PROP-002", title: "Add Support for New Tokens", status: "Active", votes: 460800 },
      { id: "PROP-003", title: "Enhance Security Audits", status: "Failed", votes: 384000 },
    ],
  },
  Marinade: {
    description: "Marinade governs the Marinade liquid staking protocol on Solana.",
    members: 65000,
    tvl: 120000000,
    proposals: 278,
    treasuryAllocation: [
      { name: "Reserves", value: 20 },
      { name: "Development", value: 50 },
      { name: "Marketing", value: 20 },
      { name: "Partnerships", value: 10 },
    ],
    monthlyActivity: [
      { month: "Jan", transactions: 25000, newMembers: 2500 },
      { month: "Feb", transactions: 30000, newMembers: 3000 },
      { month: "Mar", transactions: 35000, newMembers: 3500 },
      { month: "Apr", transactions: 40000, newMembers: 4000 },
      { month: "May", transactions: 45000, newMembers: 4500 },
      { month: "Jun", transactions: 50000, newMembers: 5000 },
    ],
    governance: {
      votingPower: 650000000,
      quorum: 10,
      proposalThreshold: 50000,
      votingPeriod: 3,
    },
    tokenPerformance: [
      { date: "2023-01-01", price: 0.25 },
      { date: "2023-02-01", price: 0.3 },
      { date: "2023-03-01", price: 0.28 },
      { date: "2023-04-01", price: 0.4 },
      { date: "2023-05-01", price: 0.5 },
      { date: "2023-06-01", price: 0.45 },
    ],
    recentProposals: [
      { id: "PROP-001", title: "Enhance Staking Rewards", status: "Passed", votes: 520000 },
      { id: "PROP-002", title: "Improve User Experience", status: "Active", votes: 416000 },
      { id: "PROP-003", title: "Expand Ecosystem Partnerships", status: "Failed", votes: 340000 },
    ],
  },
  Jito: {
    description: "Jito governs the Jito MEV infrastructure on Solana.",
    members: 45000,
    tvl: 80000000,
    proposals: 156,
    treasuryAllocation: [
      { name: "Reserves", value: 30 },
      { name: "Development", value: 40 },
      { name: "Marketing", value: 15 },
      { name: "Partnerships", value: 15 },
    ],
    monthlyActivity: [
      { month: "Jan", transactions: 20000, newMembers: 2000 },
      { month: "Feb", transactions: 22000, newMembers: 2200 },
      { month: "Mar", transactions: 24000, newMembers: 2400 },
      { month: "Apr", transactions: 26000, newMembers: 2600 },
      { month: "May", transactions: 28000, newMembers: 2800 },
      { month: "Jun", transactions: 30000, newMembers: 3000 },
    ],
    governance: {
      votingPower: 450000000,
      quorum: 15,
      proposalThreshold: 45000,
      votingPeriod: 5,
    },
    tokenPerformance: [
      { date: "2023-01-01", price: 0.2 },
      { date: "2023-02-01", price: 0.25 },
      { date: "2023-03-01", price: 0.3 },
      { date: "2023-04-01", price: 0.35 },
      { date: "2023-05-01", price: 0.4 },
      { date: "2023-06-01", price: 0.45 },
    ],
    recentProposals: [
      { id: "PROP-001", title: "Implement New MEV Strategies", status: "Passed", votes: 360000 },
      { id: "PROP-002", title: "Expand Validator Network", status: "Active", votes: 270000 },
      { id: "PROP-003", title: "Increase Block Builder Rewards", status: "Failed", votes: 225000 },
    ],
  },
  Metaplex: {
    description: "Metaplex oversees the development of NFT standards and tools on Solana.",
    members: 55000,
    tvl: 100000000,
    proposals: 201,
    treasuryAllocation: [
      { name: "Reserves", value: 25 },
      { name: "Development", value: 45 },
      { name: "Marketing", value: 20 },
      { name: "Partnerships", value: 10 },
    ],
    monthlyActivity: [
      { month: "Jan", transactions: 28000, newMembers: 2800 },
      { month: "Feb", transactions: 30000, newMembers: 3000 },
      { month: "Mar", transactions: 32000, newMembers: 3200 },
      { month: "Apr", transactions: 34000, newMembers: 3400 },
      { month: "May", transactions: 36000, newMembers: 3600 },
      { month: "Jun", transactions: 38000, newMembers: 3800 },
    ],
    governance: {
      votingPower: 550000000,
      quorum: 12,
      proposalThreshold: 55000,
      votingPeriod: 4,
    },
    tokenPerformance: [
      { date: "2023-01-01", price: 0.3 },
      { date: "2023-02-01", price: 0.35 },
      { date: "2023-03-01", price: 0.32 },
      { date: "2023-04-01", price: 0.4 },
      { date: "2023-05-01", price: 0.45 },
      { date: "2023-06-01", price: 0.42 },
    ],
    recentProposals: [
      { id: "PROP-001", title: "Upgrade NFT Metadata Standard", status: "Passed", votes: 440000 },
      { id: "PROP-002", title: "Launch Creator Royalties Program", status: "Active", votes: 330000 },
      { id: "PROP-003", title: "Implement Cross-Chain NFT Bridge", status: "Failed", votes: 275000 },
    ],
  },
  Grape: {
    description: "Grape focuses on building social and community tools for Web3 on Solana.",
    members: 35000,
    tvl: 60000000,
    proposals: 134,
    treasuryAllocation: [
      { name: "Reserves", value: 20 },
      { name: "Development", value: 50 },
      { name: "Marketing", value: 20 },
      { name: "Partnerships", value: 10 },
    ],
    monthlyActivity: [
      { month: "Jan", transactions: 15000, newMembers: 1500 },
      { month: "Feb", transactions: 16000, newMembers: 1600 },
      { month: "Mar", transactions: 17000, newMembers: 1700 },
      { month: "Apr", transactions: 18000, newMembers: 1800 },
      { month: "May", transactions: 19000, newMembers: 1900 },
      { month: "Jun", transactions: 20000, newMembers: 2000 },
    ],
    governance: {
      votingPower: 350000000,
      quorum: 8,
      proposalThreshold: 35000,
      votingPeriod: 3,
    },
    tokenPerformance: [
      { date: "2023-01-01", price: 0.15 },
      { date: "2023-02-01", price: 0.18 },
      { date: "2023-03-01", price: 0.17 },
      { date: "2023-04-01", price: 0.2 },
      { date: "2023-05-01", price: 0.22 },
      { date: "2023-06-01", price: 0.21 },
    ],
    recentProposals: [
      { id: "PROP-001", title: "Launch Decentralized Social Platform", status: "Passed", votes: 280000 },
      { id: "PROP-002", title: "Integrate with Solana Pay", status: "Active", votes: 210000 },
      { id: "PROP-003", title: "Develop Community Reputation System", status: "Failed", votes: 175000 },
    ],
  },
  Bonk: {
    description: "Bonk governs the Bonk meme token ecosystem on Solana.",
    members: 75000,
    tvl: 90000000,
    proposals: 189,
    treasuryAllocation: [
      { name: "Reserves", value: 35 },
      { name: "Development", value: 30 },
      { name: "Marketing", value: 25 },
      { name: "Partnerships", value: 10 },
    ],
    monthlyActivity: [
      { month: "Jan", transactions: 40000, newMembers: 4000 },
      { month: "Feb", transactions: 45000, newMembers: 4500 },
      { month: "Mar", transactions: 50000, newMembers: 5000 },
      { month: "Apr", transactions: 55000, newMembers: 5500 },
      { month: "May", transactions: 60000, newMembers: 6000 },
      { month: "Jun", transactions: 65000, newMembers: 6500 },
    ],
    governance: {
      votingPower: 750000000,
      quorum: 10,
      proposalThreshold: 75000,
      votingPeriod: 2,
    },
    tokenPerformance: [
      { date: "2023-01-01", price: 0.000001 },
      { date: "2023-02-01", price: 0.000002 },
      { date: "2023-03-01", price: 0.0000015 },
      { date: "2023-04-01", price: 0.000003 },
      { date: "2023-05-01", price: 0.000004 },
      { date: "2023-06-01", price: 0.0000035 },
    ],
    recentProposals: [
      { id: "PROP-001", title: "Launch Bonk NFT Collection", status: "Passed", votes: 600000 },
      { id: "PROP-002", title: "Implement Token Burn Mechanism", status: "Active", votes: 450000 },
      { id: "PROP-003", title: "Partner with Major Solana Projects", status: "Failed", votes: 375000 },
    ],
  },
}

export default function DashboardPage() {
  const [selectedDAO, setSelectedDAO] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openDAODetails = (daoName: string) => {
    setSelectedDAO(daoName)
    setIsModalOpen(true)
  }

  const closeDAODetails = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-orange-950 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-black/40 backdrop-blur-lg p-4 hidden lg:block border-r border-orange-800/30">
        <div className="flex items-center mb-6">
          <Image src="/placeholder.svg?height=40&width=40" alt="Solana Logo" width={40} height={40} className="mr-2" />
          <h2 className="text-xl font-bold text-orange-400">Solana DAO Analytics</h2>
        </div>
        <nav>
          <ul className="space-y-2">
            <li>
              <Button
                variant="ghost"
                className="w-full justify-start text-orange-400 hover:bg-orange-950/60 hover:text-orange-300"
              >
                <Users className="mr-2 h-4 w-4" />
                Overview
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className="w-full justify-start text-orange-400 hover:bg-orange-950/60 hover:text-orange-300"
              >
                <ArrowUpIcon className="mr-2 h-4 w-4" />
                Top DAOs
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className="w-full justify-start text-orange-400 hover:bg-orange-950/60 hover:text-orange-300"
              >
                <ArrowRightIcon className="mr-2 h-4 w-4" />
                Recent Activity
              </Button>
            </li>
          </ul>
        </nav>

        {/* Newest DAOs Section */}
        <NewestDAOs />
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-orange-400">Solana DAO Analytics Dashboard</h1>
          <Button variant="outline" className="lg:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card className="bg-black/50 backdrop-blur-lg border-orange-600/30 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-400">Total DAOs</CardTitle>
              <Users className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">1,284</div>
              <p className="text-xs text-orange-400">+20% from last month</p>
            </CardContent>
          </Card>
          <Card className="bg-black/50 backdrop-blur-lg border-amber-600/30 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-amber-400">Active Members</CardTitle>
              <Users className="h-4 w-4 text-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">573,204</div>
              <p className="text-xs text-amber-400">+12% from last month</p>
            </CardContent>
          </Card>
          <Card className="bg-black/50 backdrop-blur-lg border-red-600/30 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-400">Total Value Locked (TVL)</CardTitle>
              <DollarSign className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">$1.2B</div>
              <p className="text-xs text-red-400">+5% from last week</p>
            </CardContent>
          </Card>
          <Card className="bg-black/50 backdrop-blur-lg border-yellow-600/30 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-yellow-300">Proposals Created</CardTitle>
              <FileText className="h-4 w-4 text-yellow-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">3,782</div>
              <p className="text-xs text-yellow-300">+8% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-4 md:grid-cols-2 mb-6">
          <Card className="bg-black/50 backdrop-blur-lg border-orange-600/30 shadow-lg">
            <CardHeader>
              <CardTitle className="text-orange-400">DAO Growth Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={daoGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                  <XAxis dataKey="month" stroke="#ffffff80" />
                  <YAxis stroke="#ffffff80" />
                  <Tooltip contentStyle={{ backgroundColor: "#000000", border: "none" }} />
                  <Legend />
                  <Line type="monotone" dataKey="daos" stroke="#f97316" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="bg-black/50 backdrop-blur-lg border-amber-600/30 shadow-lg">
            <CardHeader>
              <CardTitle className="text-amber-400">Top 5 DAOs by TVL</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topDaosTVLData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                  <XAxis type="number" stroke="#ffffff80" />
                  <YAxis dataKey="name" type="category" stroke="#ffffff80" />
                  <Tooltip contentStyle={{ backgroundColor: "#000000", border: "none" }} />
                  <Legend />
                  <Bar dataKey="tvl" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Comparative TVL Chart */}
        <Card className="bg-black/50 backdrop-blur-lg border-red-600/30 shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="text-red-400">Comparative TVL Trends</CardTitle>
            <CardDescription className="text-red-300">TVL trends for top 5 DAOs over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={tvlData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="month" stroke="#ffffff80" />
                <YAxis stroke="#ffffff80" />
                <Tooltip contentStyle={{ backgroundColor: "#000000", border: "none" }} />
                <Legend />
                <Line type="monotone" dataKey="Mango" stroke="#f97316" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Serum" stroke="#f59e0b" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Raydium" stroke="#fbbf24" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Orca" stroke="#ef4444" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Marinade" stroke="#dc2626" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Metaplex" stroke="#ea580c" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Bonk" stroke="#fb923c" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Jito" stroke="#fdba74" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Grape" stroke="#ffedd5" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top DAOs Table */}
        <Card className="bg-black/50 backdrop-blur-lg border-orange-600/30 shadow-lg">
          <CardHeader>
            <CardTitle className="text-orange-400">Top Solana Projects</CardTitle>
            <CardDescription className="text-orange-300">A list of top performing projects on Solana</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-b border-orange-900/30">
                  <TableHead className="text-orange-400">Name</TableHead>
                  <TableHead className="text-orange-400">Members</TableHead>
                  <TableHead className="text-orange-400">TVL</TableHead>
                  <TableHead className="text-orange-400">Proposals</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(daoDetails).map(([daoName, dao]) => (
                  <TableRow key={daoName} className="border-b border-orange-900/30 hover:bg-orange-950/40">
                    <TableCell className="font-medium">
                      <button
                        onClick={() => openDAODetails(daoName)}
                        className="flex items-center hover:text-orange-400 transition-colors"
                      >
                        <Image
                          src="/placeholder.svg?height=24&width=24"
                          alt={`${daoName} Logo`}
                          width={24}
                          height={24}
                          className="mr-2 rounded-full"
                        />
                        {daoName}
                      </button>
                    </TableCell>
                    <TableCell className="text-amber-200">{dao.members.toLocaleString()}</TableCell>
                    <TableCell className="text-orange-200">${(dao.tvl / 1000000).toFixed(1)}M</TableCell>
                    <TableCell className="text-yellow-200">{dao.proposals}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
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
