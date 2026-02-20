"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { fetchNewestDAOs, type NewestDAO } from "@/actions/fetch-newest-daos"
import { ExternalLink, Bell } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

const getRandomPixelLogo = (name: string) => {
  // Use the name as a seed for consistent logo selection for the same DAO
  const seed = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)

  const logos = [
    "/images/pixel-panda-orange.png",
    "/images/pixel-crown.png",
    "/images/pixel-captain.png",
    "/images/pixel-demon.png",
    "/images/pixel-wizard.png",
    "/images/pixel-panda.png",
  ]

  // Use the seed to select a logo
  return logos[seed % logos.length]
}

export const NewestDAOs = () => {
  const [allDaos, setAllDaos] = useState<NewestDAO[]>([])
  const [displayedDaos, setDisplayedDaos] = useState<NewestDAO[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedDaos = await fetchNewestDAOs()
        setAllDaos(fetchedDaos)
      } catch (error) {
        console.error("Error fetching newest DAOs:", error)
        // Use fallback data with 10 DAOs if fetch fails
        setAllDaos([
          { name: "Jupiter", hasToken: true },
          { name: "Kamino", hasToken: true },
          { name: "Drift", hasToken: true },
          { name: "Zeta", hasToken: false },
          { name: "Parcl", hasToken: false },
          { name: "Marinade", hasToken: true },
          { name: "Mango", hasToken: true },
          { name: "Solend", hasToken: true },
          { name: "Orca", hasToken: true },
          { name: "Raydium", hasToken: true },
        ])
      } finally {
        setIsLoading(false)
        // Start with empty list
        setDisplayedDaos([])
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (allDaos.length > 0 && !isLoading) {
      // Add DAOs one by one with a delay to simulate real-time creation
      let currentIndex = 0

      const addDaoInterval = setInterval(() => {
        if (currentIndex < allDaos.length) {
          // Add new DAOs at the end of the array (bottom of the list)
          setDisplayedDaos((prev) => [...prev, allDaos[currentIndex]])
          currentIndex++
        } else {
          clearInterval(addDaoInterval)
        }
      }, 1200) // Add a new DAO every 1.2 seconds

      return () => clearInterval(addDaoInterval)
    }
  }, [allDaos, isLoading])

  return (
    <div className="mt-6 border border-orange-800/30 rounded-lg p-4 bg-black/30">
      <h3 className="text-sm font-medium text-orange-400 mb-2 flex items-center">
        <Bell className="h-3 w-3 mr-1" />
        Newest DAOs
      </h3>
      <div className="space-y-2 max-h-[450px] overflow-y-auto pr-1 custom-scrollbar">
        {isLoading ? (
          <div className="flex justify-center py-4">
            <div className="animate-pulse h-6 w-6 rounded-full bg-orange-700/30"></div>
          </div>
        ) : displayedDaos.length === 0 ? (
          <div className="text-sm text-gray-400 py-2 text-center">Esperando nuevas DAOs...</div>
        ) : (
          displayedDaos.map((dao, index) => (
            <div
              key={index}
              className={`flex flex-col p-2 rounded-md hover:bg-orange-950/40 transition-all duration-300 ${
                index === displayedDaos.length - 1 ? "animate-newDaoBottom" : ""
              }`}
            >
              {index === displayedDaos.length - 1 && (
                <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-1 h-full">
                  <div className="h-full w-full bg-orange-500 animate-pulse rounded-full"></div>
                </div>
              )}
              <div className="flex items-center w-full mb-1">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
                  <Image
                    src={getRandomPixelLogo(dao.name || "")}
                    alt={`${dao.name || "Unknown"} Logo`}
                    width={36}
                    height={36}
                    className={`object-contain ${index === displayedDaos.length - 1 ? "animate-pulse" : ""}`}
                    unoptimized
                  />
                </div>
                <span className="text-white font-medium text-base ml-2" title={dao.name || "Unknown"}>
                  {dao.name || "Unknown DAO"}
                </span>
                <div className="ml-auto">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" className="h-6 w-6 p-0 rounded-full">
                        <ExternalLink className="h-3 w-3 text-gray-400" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-2 bg-black/90 border-orange-800/30">
                      <div className="flex flex-col space-y-1">
                        <a
                          href={`https://orb.helius.dev/address/${dao.account_newAccount || dao.account_NewAccount || ""}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-1 hover:bg-orange-950/40 rounded text-xs text-orange-400"
                        >
                          <ExternalLink className="h-3 w-3 mr-2" />
                          View on Helius Orb
                        </a>
                        {dao.realm_address && (
                          <a
                            href={`https://app.realms.today/dao/${dao.realm_address}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center p-1 hover:bg-orange-950/40 rounded text-xs text-orange-400"
                          >
                            <ExternalLink className="h-3 w-3 mr-2" />
                            View on Realms
                          </a>
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="flex items-center ml-12">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    dao.hasToken ? "bg-green-900/50 text-green-400" : "bg-gray-800/50 text-gray-400"
                  }`}
                >
                  {dao.hasToken ? "Token" : "No Token"}
                </span>
                {dao.proposal_count && (
                  <span className="text-xs text-gray-400 ml-2">
                    {dao.proposal_count} proposals
                    {dao.member_count ? ` • ${dao.member_count} members` : ""}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      <style jsx global>{`
        @keyframes newDaoBottom {
          0% {
            opacity: 0;
            transform: translateY(20px);
            background-color: rgba(249, 115, 22, 0.2);
          }
          20% {
            opacity: 1;
            transform: translateY(0);
            background-color: rgba(249, 115, 22, 0.2);
          }
          100% {
            background-color: transparent;
          }
        }
        .animate-newDaoBottom {
          animation: newDaoBottom 3s ease-out;
          position: relative;
          overflow: hidden;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(249, 115, 22, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(249, 115, 22, 0.5);
        }
      `}</style>
    </div>
  )
}
