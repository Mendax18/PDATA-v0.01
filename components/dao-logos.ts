// This is a placeholder mapping that should be replaced with actual logo URLs
export const daoLogos: Record<string, string> = {
  // Major Solana DAOs
  BonkDAO: "https://s3.coinmarketcap.com/static-gravity/image/a28128d9ff7c49c9ad33ee2f626fda40.png",
  Grape: "https://pbs.twimg.com/profile_images/1438067929594142724/fRsuAlcV_400x400.png",
  Mango: "https://pbs.twimg.com/profile_images/1735886890245537792/WFVThsyj_400x400.jpg",
  Solend:
    "https://img.step.finance/unsafe/s-1500/plain/https%3A%2F%2Fsf-cms.step.finance%2Fassets%2F0c6a8d6d-c778-46f2-a325-a1a97d1c7de4.png",
  DeanListNetwork: "https://pbs.twimg.com/profile_images/1603733084624617478/dz5uv27l_400x400.jpg",
  "Adrena DAO": "https://pbs.twimg.com/profile_images/1790572719387586560/KyuPmMdi_400x400.jpg",
  "Sol Man": "https://pbs.twimg.com/profile_images/1888986941200195584/fo4g5EQN_400x400.jpg",
  MonkeDAO: "https://pbs.twimg.com/profile_images/1520205713221382144/TM27IHMP_400x400.jpg",
  "Realms Ecosystem DAO":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/RED-v8KhCZjGdIuqaTLmlR02aIOgoTBdmH.png",
  FungiDAO: "https://pbs.twimg.com/profile_images/1757109966043787265/jxVBw4fX_400x400.jpg",
  TheExiledApes: "https://pbs.twimg.com/profile_images/1874106225425616896/P5bx2GYk_400x400.jpg",
  "Metaplex Foundation": "https://pbs.twimg.com/profile_images/1877049596536385536/-yXYQPGU_400x400.jpg",
  "Metaplex Genesis": "https://pbs.twimg.com/profile_images/1877049596536385536/-yXYQPGU_400x400.jpg",
  "Metaplex DAO": "https://pbs.twimg.com/profile_images/1877049596536385536/-yXYQPGU_400x400.jpg",
  Jito: "https://pbs.twimg.com/profile_images/1687112019563188224/mnbhxwox_400x400.png",
  Marinade: "https://app.realms.today/realms/MNDE/img/mnde_logo.png",
  RealmsEcosystemDAO: "https://app.realms.today/realms/RED/RED.png",
  // Add any other DAOs that might be referenced in your code
}

// Fallback logo to use when no specific logo is available
export const defaultLogo = "/placeholder.svg?height=24&width=24"

// Helper function to get a DAO logo with fallback
export function getDAOLogo(daoName: string): string {
  // Super simple implementation to avoid any potential errors
  if (!daoName) {
    return defaultLogo
  }

  // Just return the logo from the map or the default
  return daoLogos[daoName] || defaultLogo
}
