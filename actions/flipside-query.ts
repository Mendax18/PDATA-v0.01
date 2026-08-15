"use server"

// Define the response type
export interface FlipsideQueryResult {
  success: boolean
  data?: any
  error?: string
}

// Mock data to replace the deprecated Flipside API
const mockFlipsideData = {
  success: true,
  data: {
    records: [
      { DAO: "BonkDAO", NUMBER_OF_MEMBERS: 14805, TOTAL_VOTES: 25398, NUMBER_OF_PROPOSALS: 82 },
      { DAO: "Jito", NUMBER_OF_MEMBERS: 86, TOTAL_VOTES: 0, NUMBER_OF_PROPOSALS: 40 },
      { DAO: "Marinade", NUMBER_OF_MEMBERS: 189, TOTAL_VOTES: 1245, NUMBER_OF_PROPOSALS: 83 },
      { DAO: "MonarkDAO", NUMBER_OF_MEMBERS: 9, TOTAL_VOTES: 20, NUMBER_OF_PROPOSALS: 5 },
      { DAO: "Grape", NUMBER_OF_MEMBERS: 346, TOTAL_VOTES: 5237, NUMBER_OF_PROPOSALS: 255 },
      { DAO: "Mango", NUMBER_OF_MEMBERS: 321, TOTAL_VOTES: 5676, NUMBER_OF_PROPOSALS: 963 },
      { DAO: "Solend", NUMBER_OF_MEMBERS: 303, TOTAL_VOTES: 508, NUMBER_OF_PROPOSALS: 13 },
      { DAO: "IslandDAO", NUMBER_OF_MEMBERS: 247, TOTAL_VOTES: 4594, NUMBER_OF_PROPOSALS: 321 },
      { DAO: "Adrena DAO", NUMBER_OF_MEMBERS: 139, TOTAL_VOTES: 731, NUMBER_OF_PROPOSALS: 107 },
      { DAO: "Sol Man", NUMBER_OF_MEMBERS: 69, TOTAL_VOTES: 360, NUMBER_OF_PROPOSALS: 25 },
      { DAO: "MonkeDAO", NUMBER_OF_MEMBERS: 34, TOTAL_VOTES: 2855, NUMBER_OF_PROPOSALS: 553 },
      { DAO: "Realms Ecosystem DAO", NUMBER_OF_MEMBERS: 30, TOTAL_VOTES: 163, NUMBER_OF_PROPOSALS: 33 },
      { DAO: "FungiDAO", NUMBER_OF_MEMBERS: 9, TOTAL_VOTES: 20, NUMBER_OF_PROPOSALS: 5 },
      { DAO: "TheExiledApes", NUMBER_OF_MEMBERS: 5, TOTAL_VOTES: 112, NUMBER_OF_PROPOSALS: 42 },
      { DAO: "Metaplex Foundation", NUMBER_OF_MEMBERS: 3, TOTAL_VOTES: 131, NUMBER_OF_PROPOSALS: 49 },
      { DAO: "Metaplex Genesis", NUMBER_OF_MEMBERS: 3, TOTAL_VOTES: 48, NUMBER_OF_PROPOSALS: 18 },
      { DAO: "Metaplex DAO", NUMBER_OF_MEMBERS: 130, TOTAL_VOTES: 0, NUMBER_OF_PROPOSALS: 27 },
      { DAO: "DL Metaplex Grants", NUMBER_OF_MEMBERS: 42, TOTAL_VOTES: 187, NUMBER_OF_PROPOSALS: 31 },
      { DAO: "Pyth Network", NUMBER_OF_MEMBERS: 156, TOTAL_VOTES: 892, NUMBER_OF_PROPOSALS: 67 },
      { DAO: "The $GREED Experiment", NUMBER_OF_MEMBERS: 78, TOTAL_VOTES: 423, NUMBER_OF_PROPOSALS: 29 },
      { DAO: "SolBlaze DAO", NUMBER_OF_MEMBERS: 63, TOTAL_VOTES: 315, NUMBER_OF_PROPOSALS: 22 },
      { DAO: "FactBrah", NUMBER_OF_MEMBERS: 198, TOTAL_VOTES: 1247, NUMBER_OF_PROPOSALS: 7 },
      { DAO: "Solcentral By Guardian Platform", NUMBER_OF_MEMBERS: 142, TOTAL_VOTES: 892, NUMBER_OF_PROPOSALS: 5 },
      { DAO: "Digi Mentor DAO", NUMBER_OF_MEMBERS: 87, TOTAL_VOTES: 456, NUMBER_OF_PROPOSALS: 4 },
    ],
  },
}

// Comprehensive DAO name mapping function to match Flipside results with dashboard names
function mapFlipsideNameToDashboardName(flipsideName: string): string {
  const nameMapping: { [key: string]: string } = {
    // Exact matches from Flipside query
    JitoDAO: "Jito",
    BonkDAO: "BonkDAO",
    FungiDAO: "FungiDAO",
    "Metaplex Foundation": "Metaplex Foundation",
    "Metaplex Genesis": "Metaplex Genesis",
    MonkeDAO: "MonkeDAO",
    Solend: "Solend",
    "Sol Man": "Sol Man",
    Grape: "Grape",
    Mango: "Mango",
    "Adrena DAO": "Adrena DAO",
    IslandDAO: "IslandDAO",
    "Realms Ecosystem DAO": "Realms Ecosystem DAO",
    "Pyth Network": "Pyth Network",
    TheExiledApes: "TheExiledApes",
    "Monark DAO": "MonarkDAO", // Fix mapping
    "The $GREED Experiment": "The $GREED Experiment", // Exact match
    "Xandeum DAO": "Xandeum DAO",
    "Dual DAO": "Dual DAO",
    "DL Metaplex Grants": "DL Metaplex Grants",
    deScier: "deScier",
    "Apex United FC": "Apex United FC",
    "DL Ecosystem Grants": "DL Ecosystem Grants",
    StockTrader: "StockTrader",
    EpicentralDAO: "EpicentralDAO",
    // Additional mappings for any variations
    "Jito DAO": "Jito",
    "BONK DAO": "BonkDAO",
    "Fungi DAO": "FungiDAO",
    "Island DAO": "IslandDAO",
    "Monke DAO": "MonkeDAO",
    "Realms DAO": "Realms Ecosystem DAO",
    "Pyth DAO": "Pyth Network",
    "The Exiled Apes": "TheExiledApes",
    "Exiled Apes": "TheExiledApes",
    "Metaplex DAO": "Metaplex DAO",
    "SolBlaze DAO": "SolBlaze DAO",
    Marinade: "Marinade",
    "Marinade DAO": "Marinade",
    FactBrah: "FactBrah",
    "SolCentral by Guardian Platform": "Solcentral By Guardian Platform",
    "Solcentral By Guardian Platform": "Solcentral By Guardian Platform",
    "Digi Mentor DAO": "Digi Mentor DAO",
  }

  return nameMapping[flipsideName] || flipsideName
}

export async function runFlipsideRestAPI(queryId: string, params: any = {}) {
  console.log("Flipside REST API is deprecated. Using mock data instead.")

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return mockFlipsideData
}

export async function runFlipsideQuery(queryId: string, params: any = {}) {
  try {
    console.log(`Running mock Flipside query ${queryId} with params:`, params)
    const result = await runFlipsideRestAPI(queryId, params)
    console.log("Mock Flipside query result:", result)
    return result
  } catch (error) {
    console.error("Mock Flipside query error:", error)
    return { success: false, error: error.message }
  }
}

export async function getDAOData() {
  return await runFlipsideQuery("mock-dao-query", {})
}

// Simplified test query to verify connectivity - now returns mock success
export async function testFlipsideConnection(): Promise<FlipsideQueryResult> {
  console.log("Testing Flipside connection with mock data...")
  return {
    success: true,
    data: { records: [{ test_value: 1 }] },
  }
}

// Example query for Solana DAO transactions - now returns mock data
export async function getSolanaDAOTransactions(days = 7): Promise<FlipsideQueryResult> {
  console.log(`Getting mock Solana DAO transactions for ${days} days...`)

  // Generate mock transaction data
  const mockTransactions = []
  for (let i = 0; i < days; i++) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    mockTransactions.push({
      day: date.toISOString().split("T")[0],
      tx_count: Math.floor(Math.random() * 1000) + 500,
    })
  }

  return {
    success: true,
    data: { records: mockTransactions },
  }
}

// Example query for DAO governance proposals - now returns mock data
export async function getDAOGovernanceProposals(days = 30): Promise<FlipsideQueryResult> {
  console.log(`Getting mock DAO governance proposals for ${days} days...`)

  // Generate mock proposal data
  const mockProposals = []
  for (let i = 0; i < Math.min(days, 10); i++) {
    const date = new Date()
    date.setDate(date.getDate() - i * 3)
    mockProposals.push({
      day: date.toISOString().split("T")[0],
      program_id: "GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw",
      proposal_count: Math.floor(Math.random() * 20) + 5,
    })
  }

  return {
    success: true,
    data: { records: mockProposals },
  }
}
