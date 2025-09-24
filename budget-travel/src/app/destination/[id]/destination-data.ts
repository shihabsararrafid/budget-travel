export type Destination = {
  id: number;
  name: string;
  country: string;
  image: string;
  totalBudget: string;
  duration: string;
  rating: number;
  highlights: string[];
  breakdown: {
    flights: string;
    accommodation: string;
    food: string;
    activities: string;
  };
  description: string;
  tags: string[];
}

export type RouteOption = {
  id: string;
  name: string;
  type: "relaxed" | "moderate" | "intensive";
  duration: string;
  difficulty: "Easy" | "Moderate" | "Challenging";
  highlights: string[];
  totalCost: string;
  timeline: DayActivity[];
}

export type DayActivity = {
  day: number;
  title: string;
  description: string;
  activities: Activity[];
  totalCost: string;
  transportation: string;
  accommodation: string;
}

export type Activity = {
  time: string;
  name: string;
  type: "sightseeing" | "food" | "transport" | "accommodation" | "activity";
  cost: string;
  duration: string;
  description: string;
  tips?: string;
}

export const destinations: Destination[] = [
  {
    id: 1,
    name: "Bangkok, Thailand",
    country: "Thailand",
    image: "🏯",
    totalBudget: "$800-1200",
    duration: "7 days",
    rating: 4.8,
    highlights: ["Street Food Paradise", "Cultural Temples", "Floating Markets"],
    breakdown: {
      flights: "$250-400",
      accommodation: "$20-40/night",
      food: "$10-20/day",
      activities: "$15-30/day"
    },
    description: "Experience the vibrant culture, delicious street food, and stunning temples without breaking the bank.",
    tags: ["Budget-Friendly", "Culture", "Food", "Urban"]
  },
  {
    id: 2,
    name: "Prague, Czech Republic",
    country: "Czech Republic", 
    image: "🏰",
    totalBudget: "$900-1300",
    duration: "6 days",
    rating: 4.7,
    highlights: ["Medieval Architecture", "Cheap Beer", "Historic Castle"],
    breakdown: {
      flights: "$300-500",
      accommodation: "$25-45/night",
      food: "$15-25/day",
      activities: "$20-35/day"
    },
    description: "Discover fairy-tale architecture, world-class beer, and rich history in this affordable European gem.",
    tags: ["Europe", "History", "Architecture", "Nightlife"]
  },
  {
    id: 3,
    name: "Lisbon, Portugal",
    country: "Portugal",
    image: "🌊",
    totalBudget: "$1000-1500",
    duration: "8 days",
    rating: 4.6,
    highlights: ["Coastal Beauty", "Pastéis de Nata", "Colorful Neighborhoods"],
    breakdown: {
      flights: "$350-550",
      accommodation: "$30-50/night",
      food: "$20-30/day",
      activities: "$25-40/day"
    },
    description: "Enjoy stunning coastlines, delicious pastries, and charming neighborhoods in this Atlantic jewel.",
    tags: ["Coastal", "Food", "Culture", "Relaxing"]
  },
  {
    id: 4,
    name: "Mexico City, Mexico",
    country: "Mexico",
    image: "🌮",
    totalBudget: "$700-1000",
    duration: "7 days",
    rating: 4.5,
    highlights: ["Authentic Tacos", "Ancient Ruins", "Vibrant Markets"],
    breakdown: {
      flights: "$200-350",
      accommodation: "$20-35/night",
      food: "$8-15/day",
      activities: "$12-25/day"
    },
    description: "Immerse yourself in rich culture, incredible cuisine, and fascinating history at unbeatable prices.",
    tags: ["Culture", "Food", "History", "Budget-Friendly"]
  }
];

// Create comprehensive route data for all destinations
export const getAllRoutes = (destinationId: number): RouteOption[] => {
  switch (destinationId) {
    case 1: // Bangkok
      return bangkokRoutes;
    case 2: // Prague
      return pragueRoutes;
    case 3: // Lisbon
      return lisbonRoutes;
    case 4: // Mexico City
      return mexicoCityRoutes;
    default:
      return bangkokRoutes;
  }
};

const bangkokRoutes: RouteOption[] = [
  {
    id: "cultural-explorer",
    name: "Cultural Explorer",
    type: "relaxed",
    duration: "7 days",
    difficulty: "Easy",
    highlights: [
      "Grand Palace",
      "Floating Markets",
      "Temple Tours",
      "Street Food",
    ],
    totalCost: "$850-1100",
    timeline: [
      {
        day: 1,
        title: "Arrival & Grand Palace District",
        description: "Explore the heart of royal Bangkok",
        totalCost: "$45-60",
        transportation: "Airport Rail Link + BTS",
        accommodation: "Khao San Road Area",
        activities: [
          {
            time: "09:00",
            name: "Airport to Hotel",
            type: "transport",
            cost: "$8",
            duration: "45 min",
            description:
              "Take Airport Rail Link to Phaya Thai, then BTS to National Stadium",
          },
          {
            time: "11:00",
            name: "Check-in & Rest",
            type: "accommodation",
            cost: "$25",
            duration: "2 hours",
            description: "Budget guesthouse in Khao San area",
          },
          {
            time: "14:00",
            name: "Grand Palace Complex",
            type: "sightseeing",
            cost: "$15",
            duration: "3 hours",
            description:
              "Explore the magnificent royal complex and Wat Phra Kaew",
            tips: "Dress modestly - cover shoulders and knees",
          },
          {
            time: "18:00",
            name: "Street Food Dinner",
            type: "food",
            cost: "$5-8",
            duration: "1 hour",
            description: "Try pad thai, mango sticky rice at Khao San Road",
          },
        ],
      },
      {
        day: 2,
        title: "Floating Markets & River Adventure",
        description: "Experience traditional Thai markets on water",
        totalCost: "$35-50",
        transportation: "Songthaew + Boat",
        accommodation: "Same hotel",
        activities: [
          {
            time: "06:00",
            name: "Damnoen Saduak Floating Market",
            type: "activity",
            cost: "$25",
            duration: "4 hours",
            description:
              "Traditional floating market experience with boat ride",
            tips: "Go early to avoid crowds and heat",
          },
          {
            time: "11:00",
            name: "Local Boat Noodles",
            type: "food",
            cost: "$3",
            duration: "30 min",
            description: "Authentic boat noodles near the market",
          },
          {
            time: "14:00",
            name: "Maeklong Railway Market",
            type: "sightseeing",
            cost: "$0",
            duration: "1 hour",
            description:
              "Famous train market - see vendors move for passing trains",
          },
          {
            time: "16:00",
            name: "Return to Bangkok",
            type: "transport",
            cost: "$7",
            duration: "2 hours",
            description: "Minivan back to city center",
          },
          {
            time: "19:00",
            name: "Chinatown Food Tour",
            type: "food",
            cost: "$8-12",
            duration: "2 hours",
            description: "Explore Yaowarat Road food scene",
          },
        ],
      },
      {
        day: 3,
        title: "Temple Hopping & Cultural Sites",
        description: "Discover Bangkok's spiritual side",
        totalCost: "$25-35",
        transportation: "BTS + Walking",
        accommodation: "Same hotel",
        activities: [
          {
            time: "08:00",
            name: "Wat Pho Temple",
            type: "sightseeing",
            cost: "$3",
            duration: "2 hours",
            description:
              "Famous reclining Buddha and traditional massage school",
          },
          {
            time: "11:00",
            name: "Wat Arun (Temple of Dawn)",
            type: "sightseeing",
            cost: "$2",
            duration: "1.5 hours",
            description: "Climb the iconic riverside temple for city views",
          },
          {
            time: "13:00",
            name: "Riverside Lunch",
            type: "food",
            cost: "$8",
            duration: "1 hour",
            description: "Thai cuisine with Chao Phraya River views",
          },
          {
            time: "15:00",
            name: "Jim Thompson House",
            type: "sightseeing",
            cost: "$5",
            duration: "1.5 hours",
            description: "Traditional Thai architecture and silk museum",
          },
          {
            time: "17:30",
            name: "Lumpini Park",
            type: "activity",
            cost: "$0",
            duration: "1 hour",
            description:
              "Relax in Bangkok's green heart, watch monitor lizards",
          },
          {
            time: "19:00",
            name: "Food Court Dinner",
            type: "food",
            cost: "$5-8",
            duration: "1 hour",
            description:
              "Try various Thai dishes at MBK or Terminal 21 food court",
          },
        ],
      },
    ],
  },
  {
    id: "foodie-adventure",
    name: "Foodie Adventure",
    type: "moderate",
    duration: "7 days",
    difficulty: "Moderate",
    highlights: [
      "Cooking Classes",
      "Night Markets",
      "Hidden Local Spots",
      "Food Tours",
    ],
    totalCost: "$900-1200",
    timeline: [
      {
        day: 1,
        title: "Arrival & Street Food Introduction",
        description: "Dive into Bangkok's incredible food scene",
        totalCost: "$40-55",
        transportation: "Airport Rail Link + Taxi",
        accommodation: "Silom Area Hotel",
        activities: [
          {
            time: "10:00",
            name: "Airport to Hotel",
            type: "transport",
            cost: "$10",
            duration: "1 hour",
            description: "Airport Rail Link + taxi to Silom area",
          },
          {
            time: "12:00",
            name: "Hotel Check-in",
            type: "accommodation",
            cost: "$30",
            duration: "30 min",
            description: "Mid-range hotel in Silom district",
          },
          {
            time: "14:00",
            name: "Street Food Walking Tour",
            type: "food",
            cost: "$15",
            duration: "3 hours",
            description: "Guided tour through Silom and Sathorn food scene",
          },
          {
            time: "18:00",
            name: "Patpong Night Market",
            type: "activity",
            cost: "$5-10",
            duration: "2 hours",
            description: "Browse night market and try grilled seafood",
          },
        ],
      },
    ],
  },
  {
    id: "budget-backpacker",
    name: "Budget Backpacker",
    type: "intensive",
    duration: "7 days",
    difficulty: "Easy",
    highlights: [
      "Hostels",
      "Local Transport",
      "Free Activities",
      "Budget Eats",
    ],
    totalCost: "$600-800",
    timeline: [
      {
        day: 1,
        title: "Arrival & Khao San Road",
        description: "Budget accommodation and backpacker scene",
        totalCost: "$25-35",
        transportation: "Airport Bus + Walk",
        accommodation: "Khao San Road Hostel",
        activities: [
          {
            time: "09:00",
            name: "Airport Bus to Khao San",
            type: "transport",
            cost: "$1",
            duration: "1 hour",
            description: "Public bus A1 or A2 to Khao San Road",
          },
          {
            time: "11:00",
            name: "Hostel Check-in",
            type: "accommodation",
            cost: "$8",
            duration: "30 min",
            description: "Dorm bed in Khao San Road hostel",
          },
          {
            time: "12:00",
            name: "Free Walking Tour",
            type: "activity",
            cost: "$0",
            duration: "3 hours",
            description: "Join free walking tour of old Bangkok (tip-based)",
          },
          {
            time: "16:00",
            name: "7-Eleven Snacks",
            type: "food",
            cost: "$3",
            duration: "15 min",
            description: "Budget meal from convenience store",
          },
          {
            time: "18:00",
            name: "Sunset at Wat Saket",
            type: "sightseeing",
            cost: "$1",
            duration: "2 hours",
            description: "Climb Golden Mount for sunset views",
          },
          {
            time: "20:00",
            name: "Street Food Dinner",
            type: "food",
            cost: "$3-5",
            duration: "1 hour",
            description: "Pad thai and fresh fruit from street vendors",
          },
        ],
      },
    ],
  },
];

const pragueRoutes: RouteOption[] = [
  {
    id: "historic-explorer",
    name: "Historic Explorer",
    type: "relaxed",
    duration: "6 days",
    difficulty: "Easy",
    highlights: [
      "Prague Castle",
      "Old Town Square",
      "Charles Bridge",
      "Beer Gardens",
    ],
    totalCost: "$900-1200",
    timeline: [
      {
        day: 1,
        title: "Arrival & Old Town",
        description: "Explore the historic heart of Prague",
        totalCost: "$50-70",
        transportation: "Airport Express + Tram",
        accommodation: "Old Town Guesthouse",
        activities: [
          {
            time: "10:00",
            name: "Airport to Old Town",
            type: "transport",
            cost: "$12",
            duration: "45 min",
            description: "Airport Express bus + Metro to city center",
          },
          {
            time: "12:00",
            name: "Hotel Check-in",
            type: "accommodation",
            cost: "$35",
            duration: "30 min",
            description: "Budget hotel near Wenceslas Square",
          },
          {
            time: "14:00",
            name: "Old Town Square",
            type: "sightseeing",
            cost: "$0",
            duration: "2 hours",
            description: "Astronomical Clock and Gothic churches",
            tips: "Visit at the top of the hour to see the clock animation",
          },
          {
            time: "17:00",
            name: "Traditional Czech Dinner",
            type: "food",
            cost: "$15-20",
            duration: "2 hours",
            description: "Goulash and Czech beer in a traditional pub",
          },
        ],
      },
    ],
  },
  {
    id: "beer-culture",
    name: "Beer & Culture",
    type: "moderate",
    duration: "6 days",
    difficulty: "Easy",
    highlights: [
      "Brewery Tours",
      "Beer Gardens",
      "Local Pubs",
      "Cultural Sites",
    ],
    totalCost: "$800-1100",
    timeline: [
      {
        day: 1,
        title: "Arrival & Beer Introduction",
        description: "Start your Prague beer adventure",
        totalCost: "$45-65",
        transportation: "Public Transport",
        accommodation: "Hostel Near City Center",
        activities: [
          {
            time: "11:00",
            name: "Arrival & Check-in",
            type: "accommodation",
            cost: "$25",
            duration: "1 hour",
            description: "Modern hostel with social areas",
          },
          {
            time: "15:00",
            name: "Brewery Tour",
            type: "activity",
            cost: "$20",
            duration: "2 hours",
            description: "Learn about Czech beer making traditions",
          },
        ],
      },
    ],
  },
];

const lisbonRoutes: RouteOption[] = [
  {
    id: "coastal-explorer",
    name: "Coastal Explorer",
    type: "relaxed",
    duration: "8 days",
    difficulty: "Easy",
    highlights: ["Beaches", "Coastal Towns", "Seafood", "Sunset Views"],
    totalCost: "$1000-1400",
    timeline: [
      {
        day: 1,
        title: "Arrival & Alfama District",
        description: "Explore Lisbon's oldest neighborhood",
        totalCost: "$60-80",
        transportation: "Metro + Tram",
        accommodation: "Alfama Guesthouse",
        activities: [
          {
            time: "09:00",
            name: "Airport to City",
            type: "transport",
            cost: "$15",
            duration: "45 min",
            description: "Metro Red Line to city center",
          },
          {
            time: "11:00",
            name: "Guesthouse Check-in",
            type: "accommodation",
            cost: "$40",
            duration: "30 min",
            description: "Traditional Portuguese guesthouse",
          },
          {
            time: "14:00",
            name: "Alfama Walking Tour",
            type: "sightseeing",
            cost: "$0",
            duration: "3 hours",
            description: "Narrow streets, viewpoints, and Fado music",
            tips: "Wear comfortable shoes for the steep cobblestone streets",
          },
          {
            time: "18:00",
            name: "Pastéis de Nata Tasting",
            type: "food",
            cost: "$8-12",
            duration: "1 hour",
            description: "Try the famous Portuguese custard tarts",
          },
        ],
      },
    ],
  },
];

const mexicoCityRoutes: RouteOption[] = [
  {
    id: "cultural-foodie",
    name: "Cultural Foodie",
    type: "moderate",
    duration: "7 days",
    difficulty: "Easy",
    highlights: ["Street Tacos", "Museums", "Markets", "Historic Sites"],
    totalCost: "$650-900",
    timeline: [
      {
        day: 1,
        title: "Arrival & Historic Center",
        description: "Discover Mexico City's rich history and amazing food",
        totalCost: "$40-55",
        transportation: "Metro + Walking",
        accommodation: "Centro Historico Hotel",
        activities: [
          {
            time: "08:00",
            name: "Airport to Centro",
            type: "transport",
            cost: "$5",
            duration: "1 hour",
            description: "Metro from airport to historic center",
          },
          {
            time: "10:00",
            name: "Hotel Check-in",
            type: "accommodation",
            cost: "$25",
            duration: "30 min",
            description: "Budget hotel near Zocalo main square",
          },
          {
            time: "12:00",
            name: "Zocalo & Cathedral",
            type: "sightseeing",
            cost: "$0",
            duration: "2 hours",
            description: "Main square and Metropolitan Cathedral",
          },
          {
            time: "15:00",
            name: "Street Taco Tour",
            type: "food",
            cost: "$8-12",
            duration: "2 hours",
            description: "Try authentic tacos al pastor and carnitas",
            tips: "Look for busy stalls with locals - that's where the best tacos are!",
          },
        ],
      },
    ],
  },
];