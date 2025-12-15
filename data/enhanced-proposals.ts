// Enhanced proposal data for DeanListNetwork and Realms Ecosystem DAO
import { format, subDays } from "date-fns"

// Helper function to create dates
const createDate = (daysAgo: number) => {
  return subDays(new Date(), daysAgo).toISOString()
}

export const deanListProposals = [
  {
    id: "PROP-001",
    title: "Vote for our AllDomains Collab winning criteria!",
    summary:
      "This proposal aims to establish the criteria for selecting winners in the AllDomains Collaboration initiative.",
    description:
      "The AllDomains Collaboration is a key initiative for our DAO to foster partnerships across the Solana ecosystem. This proposal outlines the criteria that will be used to select winning projects, including technical innovation, community impact, and sustainability.\n\nThe selection committee will consist of 5 members from our DAO and 3 external advisors to ensure fair evaluation. Winners will receive both funding and technical support from our community.",
    proposer: {
      name: "Alex Thompson",
      avatar: "https://i.pravatar.cc/150?u=alex",
    },
    status: "Completed",
    createdAt: createDate(12),
    endDate: createDate(4),
    category: "Governance",
    yesVotes: 156,
    noVotes: 12,
    abstainVotes: 0,
    completedAgo: "Completed 8 days ago",
    quorum: {
      required: 0,
      achieved: true,
    },
    documents: [
      {
        name: "AllDomains_Collab_Criteria.pdf",
        url: "#",
        type: "PDF Document",
      },
      {
        name: "Selection_Committee_Guidelines.docx",
        url: "#",
        type: "Word Document",
      },
    ],
    comments: [
      {
        author: {
          name: "Sarah Chen",
          avatar: "https://i.pravatar.cc/150?u=sarah",
        },
        text: "I think we should add a criterion for social impact. Many projects are technically sound but don't necessarily benefit the wider community.",
        timestamp: createDate(10),
        replies: [
          {
            author: {
              name: "Alex Thompson",
              avatar: "https://i.pravatar.cc/150?u=alex",
            },
            text: "Great point, Sarah. I've updated the proposal to include social impact as a criterion.",
            timestamp: createDate(10),
          },
        ],
      },
      {
        author: {
          name: "Michael Rodriguez",
          avatar: "https://i.pravatar.cc/150?u=michael",
        },
        text: "Fully support this proposal. The collaboration will bring much-needed attention to our ecosystem.",
        timestamp: createDate(9),
      },
    ],
    votingHistory: [
      { date: format(subDays(new Date(), 12), "MMM dd"), yesVotes: 20, noVotes: 2 },
      { date: format(subDays(new Date(), 11), "MMM dd"), yesVotes: 45, noVotes: 5 },
      { date: format(subDays(new Date(), 10), "MMM dd"), yesVotes: 78, noVotes: 8 },
      { date: format(subDays(new Date(), 9), "MMM dd"), yesVotes: 110, noVotes: 10 },
      { date: format(subDays(new Date(), 8), "MMM dd"), yesVotes: 130, noVotes: 11 },
      { date: format(subDays(new Date(), 7), "MMM dd"), yesVotes: 145, noVotes: 12 },
      { date: format(subDays(new Date(), 6), "MMM dd"), yesVotes: 156, noVotes: 12 },
    ],
  },
  {
    id: "PROP-002",
    title: "Removal of DL Symmetry Basket Liquidity",
    summary: "This proposal suggests removing liquidity from the DL Symmetry Basket to optimize capital allocation.",
    description:
      "The DL Symmetry Basket was created to provide liquidity across multiple trading pairs. However, recent analysis shows that the capital could be more efficiently deployed elsewhere. This proposal recommends removing the liquidity and reallocating it to higher-performing pools.\n\nThe transition will be gradual to minimize market impact, with complete removal targeted within 14 days of approval. The freed capital will be temporarily held in the treasury until a follow-up proposal for reallocation is approved.",
    proposer: {
      name: "Jordan Lee",
      avatar: "https://i.pravatar.cc/150?u=jordan",
    },
    status: "Completed",
    createdAt: createDate(14),
    endDate: createDate(6),
    category: "Treasury",
    yesVotes: 189,
    noVotes: 15,
    abstainVotes: 0,
    completedAgo: "Succeeded 8 days ago",
    quorum: {
      required: 0,
      achieved: true,
    },
    executable: true,
    documents: [
      {
        name: "Liquidity_Analysis_Report.pdf",
        url: "#",
        type: "PDF Document",
      },
      {
        name: "Capital_Reallocation_Strategy.xlsx",
        url: "#",
        type: "Excel Spreadsheet",
      },
    ],
    comments: [
      {
        author: {
          name: "Emma Wilson",
          avatar: "https://i.pravatar.cc/150?u=emma",
        },
        text: "I'm concerned about the market impact of removing liquidity too quickly. Can we extend the timeframe to 30 days?",
        timestamp: createDate(13),
        replies: [
          {
            author: {
              name: "Jordan Lee",
              avatar: "https://i.pravatar.cc/150?u=jordan",
            },
            text: "That's a valid concern, Emma. The 14-day period is a minimum, and we'll monitor market conditions closely. If we see significant slippage, we can slow down the process.",
            timestamp: createDate(13),
          },
        ],
      },
      {
        author: {
          name: "David Park",
          avatar: "https://i.pravatar.cc/150?u=david",
        },
        text: "Strongly support this. Our capital efficiency has been suboptimal for months.",
        timestamp: createDate(12),
      },
    ],
    votingHistory: [
      { date: format(subDays(new Date(), 14), "MMM dd"), yesVotes: 25, noVotes: 2 },
      { date: format(subDays(new Date(), 13), "MMM dd"), yesVotes: 60, noVotes: 5 },
      { date: format(subDays(new Date(), 12), "MMM dd"), yesVotes: 95, noVotes: 8 },
      { date: format(subDays(new Date(), 11), "MMM dd"), yesVotes: 130, noVotes: 10 },
      { date: format(subDays(new Date(), 10), "MMM dd"), yesVotes: 155, noVotes: 12 },
      { date: format(subDays(new Date(), 9), "MMM dd"), yesVotes: 175, noVotes: 14 },
      { date: format(subDays(new Date(), 8), "MMM dd"), yesVotes: 189, noVotes: 15 },
    ],
  },
  {
    id: "PROP-003",
    title: "Adapt Quorum based on the last proposal",
    summary: "Proposal to adjust the quorum requirements based on recent governance participation trends.",
    description:
      "Our current quorum requirements were established when our DAO had fewer members. With our growing community, we need to adapt these requirements to ensure proposals can be passed efficiently while still maintaining broad representation.\n\nThis proposal suggests adjusting the quorum to 15% of total voting power, down from the current 20%. Analysis of the last 10 proposals shows this would still ensure adequate participation while reducing governance bottlenecks.",
    proposer: {
      name: "Taylor Swift",
      avatar: "https://i.pravatar.cc/150?u=taylor",
    },
    status: "Completed",
    createdAt: createDate(16),
    endDate: createDate(8),
    category: "Governance",
    yesVotes: 145,
    noVotes: 23,
    abstainVotes: 0,
    completedAgo: "Completed 8 days ago",
    quorum: {
      required: 0,
      achieved: true,
    },
    documents: [
      {
        name: "Governance_Participation_Analysis.pdf",
        url: "#",
        type: "PDF Document",
      },
    ],
    comments: [
      {
        author: {
          name: "Chris Johnson",
          avatar: "https://i.pravatar.cc/150?u=chris",
        },
        text: "I'm concerned that lowering the quorum might lead to proposals passing without sufficient community input.",
        timestamp: createDate(15),
        replies: [
          {
            author: {
              name: "Taylor Swift",
              avatar: "https://i.pravatar.cc/150?u=taylor",
            },
            text: "That's a fair concern, Chris. However, our analysis shows that even with the lower quorum, we'd still have more absolute votes than when the DAO was smaller. We're just adjusting to our growth.",
            timestamp: createDate(15),
          },
        ],
      },
    ],
    votingHistory: [
      { date: format(subDays(new Date(), 16), "MMM dd"), yesVotes: 20, noVotes: 3 },
      { date: format(subDays(new Date(), 15), "MMM dd"), yesVotes: 50, noVotes: 8 },
      { date: format(subDays(new Date(), 14), "MMM dd"), yesVotes: 80, noVotes: 12 },
      { date: format(subDays(new Date(), 13), "MMM dd"), yesVotes: 100, noVotes: 15 },
      { date: format(subDays(new Date(), 12), "MMM dd"), yesVotes: 120, noVotes: 18 },
      { date: format(subDays(new Date(), 11), "MMM dd"), yesVotes: 135, noVotes: 20 },
      { date: format(subDays(new Date(), 10), "MMM dd"), yesVotes: 145, noVotes: 23 },
    ],
  },
  {
    id: "PROP-004",
    title: "Fund Dean's List DAO Website Redesign - DEAN Payout",
    summary: "Proposal to allocate funds for a comprehensive redesign of the Dean's List DAO website.",
    description:
      "Our current website has served us well, but as we grow, we need a more robust platform that better showcases our projects, community, and governance processes. This proposal requests 25,000 DEAN tokens to fund a complete redesign.\n\nThe redesign will include improved navigation, better mobile responsiveness, integrated governance tools, and enhanced project showcases. We've already received proposals from three design agencies, with the selected team ready to begin work immediately upon approval.",
    proposer: {
      name: "Olivia Martinez",
      avatar: "https://i.pravatar.cc/150?u=olivia",
    },
    status: "Completed",
    createdAt: createDate(20),
    endDate: createDate(12),
    category: "Development",
    amount: 25000,
    yesVotes: 178,
    noVotes: 8,
    abstainVotes: 0,
    completedAgo: "Completed 8 days ago",
    quorum: {
      required: 0,
      achieved: true,
    },
    documents: [
      {
        name: "Website_Redesign_Proposal.pdf",
        url: "#",
        type: "PDF Document",
      },
      {
        name: "Design_Agency_Comparison.xlsx",
        url: "#",
        type: "Excel Spreadsheet",
      },
      {
        name: "Proposed_Sitemap.png",
        url: "#",
        type: "Image",
      },
    ],
    comments: [
      {
        author: {
          name: "Ryan Kim",
          avatar: "https://i.pravatar.cc/150?u=ryan",
        },
        text: "This is long overdue. Our current website doesn't reflect the quality of our projects or the strength of our community. Fully support this proposal.",
        timestamp: createDate(19),
      },
      {
        author: {
          name: "Sophia Garcia",
          avatar: "https://i.pravatar.cc/150?u=sophia",
        },
        text: "Have we considered using community talent for this instead of an external agency?",
        timestamp: createDate(18),
        replies: [
          {
            author: {
              name: "Olivia Martinez",
              avatar: "https://i.pravatar.cc/150?u=olivia",
            },
            text: "We did explore that option, Sophia. We'll still be involving community members in the review process, but the timeline and scope require dedicated resources from a professional team.",
            timestamp: createDate(18),
          },
        ],
      },
    ],
    votingHistory: [
      { date: format(subDays(new Date(), 20), "MMM dd"), yesVotes: 25, noVotes: 1 },
      { date: format(subDays(new Date(), 19), "MMM dd"), yesVotes: 60, noVotes: 3 },
      { date: format(subDays(new Date(), 18), "MMM dd"), yesVotes: 95, noVotes: 4 },
      { date: format(subDays(new Date(), 17), "MMM dd"), yesVotes: 125, noVotes: 5 },
      { date: format(subDays(new Date(), 16), "MMM dd"), yesVotes: 150, noVotes: 6 },
      { date: format(subDays(new Date(), 15), "MMM dd"), yesVotes: 165, noVotes: 7 },
      { date: format(subDays(new Date(), 14), "MMM dd"), yesVotes: 178, noVotes: 8 },
    ],
  },
  {
    id: "PROP-005",
    title: "2025 March Quorum Check",
    summary: "Regular monthly check to ensure governance quorum requirements are being met.",
    description:
      "As part of our governance health monitoring, we conduct monthly quorum checks to ensure our governance system is functioning as intended. This proposal is a formality to verify that we have sufficient active participation to maintain our governance processes.\n\nIf the proposal fails to reach quorum, it will trigger a community review of our governance parameters and potential adjustments to improve participation.",
    proposer: {
      name: "Admin",
      avatar: "",
    },
    status: "Defeated",
    createdAt: createDate(15),
    endDate: createDate(8),
    category: "Governance",
    yesVotes: 98,
    noVotes: 145,
    abstainVotes: 0,
    completedAgo: "Defeated 8 days ago",
    quorum: {
      required: 0,
      achieved: true,
    },
    comments: [
      {
        author: {
          name: "James Wilson",
          avatar: "https://i.pravatar.cc/150?u=james",
        },
        text: "I'm voting no because I believe we need to revisit our governance structure. This is a good opportunity to trigger that review.",
        timestamp: createDate(14),
      },
      {
        author: {
          name: "Liam Johnson",
          avatar: "https://i.pravatar.cc/150?u=liam",
        },
        text: "Agreed with James. Our current system needs some adjustments.",
        timestamp: createDate(13),
      },
    ],
    votingHistory: [
      { date: format(subDays(new Date(), 15), "MMM dd"), yesVotes: 15, noVotes: 20 },
      { date: format(subDays(new Date(), 14), "MMM dd"), yesVotes: 35, noVotes: 50 },
      { date: format(subDays(new Date(), 13), "MMM dd"), yesVotes: 55, noVotes: 80 },
      { date: format(subDays(new Date(), 12), "MMM dd"), yesVotes: 70, noVotes: 100 },
      { date: format(subDays(new Date(), 11), "MMM dd"), yesVotes: 85, noVotes: 120 },
      { date: format(subDays(new Date(), 10), "MMM dd"), yesVotes: 95, noVotes: 135 },
      { date: format(subDays(new Date(), 9), "MMM dd"), yesVotes: 98, noVotes: 145 },
    ],
  },
  {
    id: "PROP-006",
    title: "Set dean_liquidity_reserves.sol as primary domain for EZ3V9...NprJX",
    summary: "Proposal to set a specific domain as the primary identifier for our treasury wallet.",
    description:
      "This proposal aims to set dean_liquidity_reserves.sol as the primary domain for our treasury wallet (address EZ3V9...NprJX). Having a human-readable domain will improve transparency and make it easier for community members to verify treasury transactions.\n\nThis is a technical proposal that requires on-chain execution upon approval.",
    proposer: {
      name: "Finance Team",
      avatar: "",
    },
    status: "Completed",
    createdAt: createDate(25),
    endDate: createDate(17),
    category: "Treasury",
    yesVotes: 167,
    noVotes: 12,
    abstainVotes: 0,
    completedAgo: "Succeeded 17 days ago",
    quorum: {
      required: 0,
      achieved: true,
    },
    executable: true,
    executedAt: createDate(16),
    documents: [
      {
        name: "Domain_Configuration_Details.pdf",
        url: "#",
        type: "PDF Document",
      },
    ],
    comments: [
      {
        author: {
          name: "Noah Chen",
          avatar: "https://i.pravatar.cc/150?u=noah",
        },
        text: "This is a great move for transparency. Fully support it.",
        timestamp: createDate(24),
      },
    ],
    votingHistory: [
      { date: format(subDays(new Date(), 25), "MMM dd"), yesVotes: 20, noVotes: 1 },
      { date: format(subDays(new Date(), 24), "MMM dd"), yesVotes: 50, noVotes: 3 },
      { date: format(subDays(new Date(), 23), "MMM dd"), yesVotes: 80, noVotes: 5 },
      { date: format(subDays(new Date(), 22), "MMM dd"), yesVotes: 110, noVotes: 7 },
      { date: format(subDays(new Date(), 21), "MMM dd"), yesVotes: 135, noVotes: 9 },
      { date: format(subDays(new Date(), 20), "MMM dd"), yesVotes: 155, noVotes: 11 },
      { date: format(subDays(new Date(), 19), "MMM dd"), yesVotes: 167, noVotes: 12 },
    ],
  },
  {
    id: "PROP-007",
    title: "Increase Developer Grants Budget for Q2 2025",
    summary: "Proposal to increase the budget allocated for developer grants in the upcoming quarter.",
    description:
      "As our ecosystem continues to grow, we're seeing increased interest from developers wanting to build on our platform. This proposal seeks to increase our Q2 2025 developer grants budget from 50,000 DEAN to 75,000 DEAN to accommodate this growth.\n\nThe additional funds will allow us to support approximately 5-7 more projects, with a focus on infrastructure improvements and user experience enhancements.",
    proposer: {
      name: "Dev Relations Team",
      avatar: "",
    },
    status: "Voting",
    createdAt: createDate(5),
    category: "Treasury",
    amount: 75000,
    yesVotes: 112,
    noVotes: 28,
    abstainVotes: 15,
    timeRemaining: "2d 8h 45m",
    quorum: {
      required: 0,
      achieved: true,
    },
    documents: [
      {
        name: "Q2_Grant_Proposal.pdf",
        url: "#",
        type: "PDF Document",
      },
      {
        name: "Previous_Grants_Impact_Report.pdf",
        url: "#",
        type: "PDF Document",
      },
    ],
    comments: [
      {
        author: {
          name: "Isabella Kim",
          avatar: "https://i.pravatar.cc/150?u=isabella",
        },
        text: "I support increasing the budget, but I'd like to see more specific criteria for how projects will be selected.",
        timestamp: createDate(4),
        replies: [
          {
            author: {
              name: "Dev Relations Team",
              avatar: "",
            },
            text: "Great point, Isabella. We'll be publishing detailed selection criteria next week, before the voting period ends.",
            timestamp: createDate(4),
          },
        ],
      },
    ],
    votingHistory: [
      { date: format(subDays(new Date(), 5), "MMM dd"), yesVotes: 25, noVotes: 5, abstainVotes: 3 },
      { date: format(subDays(new Date(), 4), "MMM dd"), yesVotes: 45, noVotes: 10, abstainVotes: 5 },
      { date: format(subDays(new Date(), 3), "MMM dd"), yesVotes: 70, noVotes: 15, abstainVotes: 8 },
      { date: format(subDays(new Date(), 2), "MMM dd"), yesVotes: 90, noVotes: 20, abstainVotes: 12 },
      { date: format(subDays(new Date(), 1), "MMM dd"), yesVotes: 112, noVotes: 28, abstainVotes: 15 },
    ],
  },
]

export const realmsEcosystemProposals = [
  {
    id: "PROP-001",
    title: "Sponsoring Solana Contentathon - $2,000",
    summary: "Proposal to sponsor the upcoming Solana Contentathon with $2,000 to promote ecosystem growth.",
    description:
      "The Solana Contentathon is a community-driven event that encourages content creators to produce educational material about Solana and its ecosystem. By sponsoring this event, we can increase awareness of governance tools and DAOs on Solana.\n\nThe $2,000 sponsorship will be used for prizes, promotional materials, and event coordination. As sponsors, we'll have our logo featured prominently and get the opportunity to showcase Realms to a wider audience.",
    proposer: {
      name: "Marketing Team",
      avatar: "",
    },
    status: "Voting",
    createdAt: createDate(3),
    category: "Marketing",
    amount: 2000,
    yesVotes: 12,
    noVotes: 0,
    abstainVotes: 0,
    timeRemaining: "01d 12h 27m",
    quorum: {
      required: 5,
      achieved: false,
    },
    documents: [
      {
        name: "Contentathon_Sponsorship_Details.pdf",
        url: "#",
        type: "PDF Document",
      },
    ],
    comments: [
      {
        author: {
          name: "Ethan Williams",
          avatar: "https://i.pravatar.cc/150?u=ethan",
        },
        text: "This is a great opportunity to increase our visibility in the ecosystem. Fully support it.",
        timestamp: createDate(2),
      },
    ],
    votingHistory: [
      { date: format(subDays(new Date(), 3), "MMM dd"), yesVotes: 3, noVotes: 0, abstainVotes: 0 },
      { date: format(subDays(new Date(), 2), "MMM dd"), yesVotes: 7, noVotes: 0, abstainVotes: 0 },
      { date: format(subDays(new Date(), 1), "MMM dd"), yesVotes: 12, noVotes: 0, abstainVotes: 0 },
    ],
  },
  {
    id: "PROP-002",
    title: "Add community member EPKPw...rUCZL",
    summary: "Proposal to add a new community member to the DAO with voting rights.",
    description:
      "This proposal seeks to add community member EPKPw...rUCZL as a voting member of our DAO. This individual has been an active contributor to our community for the past 3 months, providing valuable insights and technical contributions.\n\nBy adding them as a voting member, we acknowledge their contributions and enable them to participate more directly in our governance process.",
    proposer: {
      name: "Governance Team",
      avatar: "",
    },
    status: "Completed",
    createdAt: createDate(10),
    endDate: createDate(3),
    category: "Membership",
    yesVotes: 15,
    noVotes: 0,
    abstainVotes: 0,
    completedAgo: "Completed 3 days ago",
    quorum: {
      required: 0,
      achieved: true,
    },
    comments: [
      {
        author: {
          name: "Ava Johnson",
          avatar: "https://i.pravatar.cc/150?u=ava",
        },
        text: "I've worked with this member on several projects. They're knowledgeable and committed to our mission.",
        timestamp: createDate(9),
      },
    ],
    votingHistory: [
      { date: format(subDays(new Date(), 10), "MMM dd"), yesVotes: 3, noVotes: 0, abstainVotes: 0 },
      { date: format(subDays(new Date(), 9), "MMM dd"), yesVotes: 6, noVotes: 0, abstainVotes: 0 },
      { date: format(subDays(new Date(), 8), "MMM dd"), yesVotes: 9, noVotes: 0, abstainVotes: 0 },
      { date: format(subDays(new Date(), 7), "MMM dd"), yesVotes: 12, noVotes: 0, abstainVotes: 0 },
      { date: format(subDays(new Date(), 6), "MMM dd"), yesVotes: 15, noVotes: 0, abstainVotes: 0 },
    ],
  },
  {
    id: "PROP-003",
    title: "Sponsoring the reward pool for GREED Academy Semester 2 - $15,000",
    summary: "Proposal to sponsor the GREED Academy's second semester with a $15,000 reward pool.",
    description:
      "GREED Academy is an educational initiative that teaches developers how to build on Solana, with a focus on governance and DAO tools. Their first semester was highly successful, with over 200 participants and 30 completed projects.\n\nThis proposal seeks to sponsor their second semester with a $15,000 reward pool. The funds will be used to incentivize participants to complete projects that utilize Realms and other governance tools, directly contributing to our ecosystem growth.",
    proposer: {
      name: "Education Team",
      avatar: "",
    },
    status: "Voting",
    createdAt: createDate(5),
    category: "Education",
    amount: 15000,
    yesVotes: 17,
    noVotes: 2,
    abstainVotes: 0,
    timeRemaining: "00d 08h 47m",
    quorum: {
      required: 0,
      achieved: true,
    },
    documents: [
      {
        name: "GREED_Academy_Proposal.pdf",
        url: "#",
        type: "PDF Document",
      },
      {
        name: "Semester_1_Results.pdf",
        url: "#",
        type: "PDF Document",
      },
    ],
    comments: [
      {
        author: {
          name: "Lucas Brown",
          avatar: "https://i.pravatar.cc/150?u=lucas",
        },
        text: "The first semester produced some impressive projects. This is a worthwhile investment.",
        timestamp: createDate(4),
      },
      {
        author: {
          name: "Zoe Garcia",
          avatar: "https://i.pravatar.cc/150?u=zoe",
        },
        text: "I think $15,000 is a bit high. Could we start with $10,000 and increase if needed?",
        timestamp: createDate(3),
        replies: [
          {
            author: {
              name: "Education Team",
              avatar: "",
            },
            text: "We considered that approach, Zoe. The $15,000 is based on the number of expected participants and projects. We can provide a detailed breakdown if helpful.",
            timestamp: createDate(3),
          },
        ],
      },
    ],
    votingHistory: [
      { date: format(subDays(new Date(), 5), "MMM dd"), yesVotes: 4, noVotes: 0, abstainVotes: 0 },
      { date: format(subDays(new Date(), 4), "MMM dd"), yesVotes: 8, noVotes: 1, abstainVotes: 0 },
      { date: format(subDays(new Date(), 3), "MMM dd"), yesVotes: 12, noVotes: 1, abstainVotes: 0 },
      { date: format(subDays(new Date(), 2), "MMM dd"), yesVotes: 15, noVotes: 2, abstainVotes: 0 },
      { date: format(subDays(new Date(), 1), "MMM dd"), yesVotes: 17, noVotes: 2, abstainVotes: 0 },
    ],
  },
  {
    id: "PROP-004",
    title: "Deposit 100000.0000 USDC into Save",
    summary: "Proposal to deposit 100,000 USDC from the treasury into a yield-generating Save account.",
    description:
      "This proposal suggests depositing 100,000 USDC from our treasury into a Save account to generate yield. The current APY is 4.8%, which would generate approximately 4,800 USDC annually.\n\nThe funds would remain liquid and could be withdrawn at any time if needed for other purposes. This represents a low-risk way to make our treasury assets more productive.",
    proposer: {
      name: "Treasury Team",
      avatar: "",
    },
    status: "Defeated",
    createdAt: createDate(12),
    endDate: createDate(4),
    category: "Treasury",
    amount: 100000,
    yesVotes: 8,
    noVotes: 12,
    abstainVotes: 0,
    completedAgo: "Defeated 4 days ago",
    quorum: {
      required: 0,
      achieved: true,
    },
    documents: [
      {
        name: "Save_Account_Details.pdf",
        url: "#",
        type: "PDF Document",
      },
      {
        name: "Risk_Assessment.pdf",
        url: "#",
        type: "PDF Document",
      },
    ],
    comments: [
      {
        author: {
          name: "Benjamin Lee",
          avatar: "https://i.pravatar.cc/150?u=benjamin",
        },
        text: "I'm concerned about the counterparty risk. Do we have a thorough assessment of the platform's security?",
        timestamp: createDate(11),
        replies: [
          {
            author: {
              name: "Treasury Team",
              avatar: "",
            },
            text: "Yes, we've included a risk assessment document with the proposal. The platform has been audited multiple times and has a strong security track record.",
            timestamp: createDate(11),
          },
        ],
      },
      {
        author: {
          name: "Mia Wilson",
          avatar: "https://i.pravatar.cc/150?u=mia",
        },
        text: "I think we should diversify our yield strategies rather than putting such a large amount in one place.",
        timestamp: createDate(10),
      },
    ],
    votingHistory: [
      { date: format(subDays(new Date(), 12), "MMM dd"), yesVotes: 2, noVotes: 3, abstainVotes: 0 },
      { date: format(subDays(new Date(), 11), "MMM dd"), yesVotes: 4, noVotes: 5, abstainVotes: 0 },
      { date: format(subDays(new Date(), 10), "MMM dd"), yesVotes: 5, noVotes: 7, abstainVotes: 0 },
      { date: format(subDays(new Date(), 9), "MMM dd"), yesVotes: 6, noVotes: 9, abstainVotes: 0 },
      { date: format(subDays(new Date(), 8), "MMM dd"), yesVotes: 7, noVotes: 10, abstainVotes: 0 },
      { date: format(subDays(new Date(), 7), "MMM dd"), yesVotes: 8, noVotes: 11, abstainVotes: 0 },
      { date: format(subDays(new Date(), 6), "MMM dd"), yesVotes: 8, noVotes: 12, abstainVotes: 0 },
    ],
  },
  {
    id: "PROP-005",
    title: "Add community member By63j...WheWi",
    summary: "Proposal to add a new community member to the DAO with voting rights.",
    description:
      "This proposal seeks to add community member By63j...WheWi as a voting member of our DAO. This individual has been contributing to our documentation and community support for the past 4 months.\n\nTheir technical writing skills have significantly improved our documentation, making our tools more accessible to new users. Adding them as a voting member acknowledges their contributions and encourages continued involvement.",
    proposer: {
      name: "Governance Team",
      avatar: "",
    },
    status: "Completed",
    createdAt: createDate(24),
    endDate: createDate(16),
    category: "Membership",
    yesVotes: 16,
    noVotes: 1,
    abstainVotes: 0,
    completedAgo: "Completed 16 days ago",
    quorum: {
      required: 0,
      achieved: true,
    },
    comments: [
      {
        author: {
          name: "Sophia Martinez",
          avatar: "https://i.pravatar.cc/150?u=sophia_m",
        },
        text: "Their documentation contributions have been invaluable. Strong support from me.",
        timestamp: createDate(23),
      },
    ],
    votingHistory: [
      { date: format(subDays(new Date(), 24), "MMM dd"), yesVotes: 3, noVotes: 0, abstainVotes: 0 },
      { date: format(subDays(new Date(), 23), "MMM dd"), yesVotes: 6, noVotes: 0, abstainVotes: 0 },
      { date: format(subDays(new Date(), 22), "MMM dd"), yesVotes: 9, noVotes: 0, abstainVotes: 0 },
      { date: format(subDays(new Date(), 21), "MMM dd"), yesVotes: 12, noVotes: 0, abstainVotes: 0 },
      { date: format(subDays(new Date(), 20), "MMM dd"), yesVotes: 14, noVotes: 1, abstainVotes: 0 },
      { date: format(subDays(new Date(), 19), "MMM dd"), yesVotes: 15, noVotes: 1, abstainVotes: 0 },
      { date: format(subDays(new Date(), 18), "MMM dd"), yesVotes: 16, noVotes: 1, abstainVotes: 0 },
    ],
  },
]
