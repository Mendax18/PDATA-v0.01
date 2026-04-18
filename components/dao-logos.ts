// This is a placeholder mapping that should be replaced with actual logo URLs
export const daoLogos: Record<string, string> = {
  // New DAOs
  FactBrah: "/placeholder.svg?height=40&width=40&text=FB",
  "Solcentral By Guardian Platform": "/placeholder.svg?height=40&width=40&text=SGP",
  "Sol Man": "/placeholder.svg?height=40&width=40&text=SM",
  "Digi Mentor DAO": "/placeholder.svg?height=40&width=40&text=DMD",

  // Major Solana DAOs
  BonkDAO: "https://s3.coinmarketcap.com/static-gravity/image/a28128d9ff7c49c9ad33ee2f626fda40.png",
  Grape: "https://pbs.twimg.com/profile_images/1438067929594142724/fRsuAlcV_400x400.png",
  Mango: "https://pbs.twimg.com/profile_images/1735886890245537792/WFVThsyj_400x400.jpg",
  Solend:
    "https://img.step.finance/unsafe/s-1500/plain/https%3A%2F%2Fsf-cms.step.finance%2Fassets%2F0c6a8d6d-c778-46f2-a325-a1a97d1c7de4.png",
  IslandDAO: "https://pbs.twimg.com/profile_images/1603733084624617478/dz5uv27l_400x400.jpg",
  "Adrena DAO": "https://pbs.twimg.com/profile_images/1735886890245537792/WFVThsyj_400x400.jpg",
  MonkeDAO: "https://pbs.twimg.com/profile_images/1735886890245537792/WFVThsyj_400x400.jpg",
  "Realms Ecosystem DAO": "https://pbs.twimg.com/profile_images/1735886890245537792/WFVThsyj_400x400.jpg",
  FungiDAO: "https://pbs.twimg.com/profile_images/1735886890245537792/WFVThsyj_400x400.jpg",
  TheExiledApes: "https://pbs.twimg.com/profile_images/1735886890245537792/WFVThsyj_400x400.jpg",
  "Metaplex Foundation": "https://pbs.twimg.com/profile_images/1735886890245537792/WFVThsyj_400x400.jpg",
  "Metaplex Genesis": "https://pbs.twimg.com/profile_images/1735886890245537792/WFVThsyj_400x400.jpg",
  "Metaplex DAO": "https://pbs.twimg.com/profile_images/1735886890245537792/WFVThsyj_400x400.jpg",
  "DL Metaplex Grants": "https://pbs.twimg.com/profile_images/1735886890245537792/WFVThsyj_400x400.jpg",
  "Pyth Network": "https://pbs.twimg.com/profile_images/1735886890245537792/WFVThsyj_400x400.jpg",
  "The $GREED Experiment": "https://pbs.twimg.com/profile_images/1735886890245537792/WFVThsyj_400x400.jpg",
  "SolBlaze DAO": "https://pbs.twimg.com/profile_images/1735886890245537792/WFVThsyj_400x400.jpg",
  Marinade: "https://pbs.twimg.com/profile_images/1735886890245537792/WFVThsyj_400x400.jpg",
  MonarkDAO: "https://pbs.twimg.com/profile_images/1735886890245537792/WFVThsyj_400x400.jpg",
  Jito: "https://pbs.twimg.com/profile_images/1735886890245537792/WFVThsyj_400x400.jpg",
  "Xandeum DAO": "https://pbs.twimg.com/profile_images/1735886890245537792/WFVThsyj_400x400.jpg",
  "Dual DAO": "https://pbs.twimg.com/profile_images/1735886890245537792/WFVThsyj_400x400.jpg",
  deScier: "https://pbs.twimg.com/profile_images/1735886890245537792/WFVThsyj_400x400.jpg",
  "Apex United FC": "https://pbs.twimg.com/profile_images/1735886890245537792/WFVThsyj_400x400.jpg",
  "DL Ecosystem Grants": "https://pbs.twimg.com/profile_images/1735886890245537792/WFVThsyj_400x400.jpg",
  StockTrader: "https://pbs.twimg.com/profile_images/1735886890245537792/WFVThsyj_400x400.jpg",
  EpicentralDAO: "https://pbs.twimg.com/profile_images/1735886890245537792/WFVThsyj_400x400.jpg",
}

// Default logo for DAOs without specific logos
export const defaultLogo = "/images/pixel-panda-orange.png"

// Function to get DAO logo with fallback
export function getDAOLogo(daoName: string): string {
  return daoLogos[daoName] || defaultLogo
}

// Function to check if a DAO has a custom logo
export function hasCustomLogo(daoName: string): boolean {
  return daoName in daoLogos
}

// Function to add or update a DAO logo
export function setDAOLogo(daoName: string, logoUrl: string): void {
  daoLogos[daoName] = logoUrl
}

// Function to get all available DAO names with logos
export function getAvailableDAOLogos(): string[] {
  return Object.keys(daoLogos)
}
