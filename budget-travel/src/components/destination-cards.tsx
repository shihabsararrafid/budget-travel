"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  DollarSign,
  Clock,
  Star,
  Plane,
  Hotel,
  UtensilsCrossed,
} from "lucide-react";

const destinations = [
  {
    id: 1,
    name: "Bangkok, Thailand",
    country: "Thailand",
    image: "🏯",
    totalBudget: "$800-1200",
    duration: "7 days",
    rating: 4.8,
    highlights: [
      "Street Food Paradise",
      "Cultural Temples",
      "Floating Markets",
    ],
    breakdown: {
      flights: "$250-400",
      accommodation: "$20-40/night",
      food: "$10-20/day",
      activities: "$15-30/day",
    },
    description:
      "Experience the vibrant culture, delicious street food, and stunning temples without breaking the bank.",
    tags: ["Budget-Friendly", "Culture", "Food", "Urban"],
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
      activities: "$20-35/day",
    },
    description:
      "Discover fairy-tale architecture, world-class beer, and rich history in this affordable European gem.",
    tags: ["Europe", "History", "Architecture", "Nightlife"],
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
      activities: "$25-40/day",
    },
    description:
      "Enjoy stunning coastlines, delicious pastries, and charming neighborhoods in this Atlantic jewel.",
    tags: ["Coastal", "Food", "Culture", "Relaxing"],
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
      activities: "$12-25/day",
    },
    description:
      "Immerse yourself in rich culture, incredible cuisine, and fascinating history at unbeatable prices.",
    tags: ["Culture", "Food", "History", "Budget-Friendly"],
  },
];

export function DestinationCards() {
  const router = useRouter();

  const handleViewDetails = (destination: (typeof destinations)[0]) => {
    router.push(`/destination/${destination.id}`);
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
      {destinations.map((destination) => (
        <Card
          key={destination.id}
          className="group hover:shadow-2xl transition-all duration-300 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-white/20 overflow-hidden"
        >
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                  <span className="text-2xl">{destination.image}</span>
                  {destination.name}
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4" />
                  <span>{destination.country}</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{destination.rating}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {destination.totalBudget}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {destination.duration}
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {destination.description}
            </p>

            <div className="space-y-2">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                Highlights:
              </h4>
              <div className="flex flex-wrap gap-1">
                {destination.highlights.map((highlight, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {highlight}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Plane className="h-3 w-3" />
                <span>Flights: {destination.breakdown.flights}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Hotel className="h-3 w-3" />
                <span>Hotel: {destination.breakdown.accommodation}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <UtensilsCrossed className="h-3 w-3" />
                <span>Food: {destination.breakdown.food}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <DollarSign className="h-3 w-3" />
                <span>Activities: {destination.breakdown.activities}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              {destination.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                size="sm"
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={() => handleViewDetails(destination)}
              >
                View Details
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                Save for Later
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
