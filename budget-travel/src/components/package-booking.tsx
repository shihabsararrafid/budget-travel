"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Package,
  Star,
  MapPin,
  Plane,
  Hotel,
  Calendar,
  Users,
  Clock,
  Check,
  Sparkles,
  Heart,
  Share2,
} from "lucide-react";
import { Destination } from "@/app/destination/[id]/destination-data";

interface PackageOption {
  id: string;
  name: string;
  type: "economy" | "comfort" | "luxury";
  rating: number;
  originalPrice: number;
  packagePrice: number;
  savings: number;
  currency: string;
  duration: string;
  image: string;
  description: string;
  includes: string[];
  flight: {
    airline: string;
    departure: string;
    arrival: string;
    duration: string;
    stops: number;
    class: string;
  };
  hotel: {
    name: string;
    rating: number;
    location: string;
    amenities: string[];
    roomType: string;
  };
  extras: {
    breakfast: boolean;
    airportTransfer: boolean;
    tourGuide?: boolean;
    cityTour?: boolean;
    insurance: boolean;
  };
  availability: boolean;
  popular?: boolean;
  bestDeal?: boolean;
}

interface PackageBookingProps {
  destination: Destination;
}

const getPackagesForDestination = (destinationId: number): PackageOption[] => {
  const basePackages: Record<number, PackageOption[]> = {
    1: [ // Bangkok
      {
        id: "bkk-package-1",
        name: "Bangkok Explorer Package",
        type: "economy",
        rating: 4.4,
        originalPrice: 1050,
        packagePrice: 895,
        savings: 155,
        currency: "USD",
        duration: "7 days / 6 nights",
        image: "🏯",
        description: "Perfect introduction to Bangkok with comfortable accommodations and reliable flights.",
        includes: ["Round-trip flights", "6 nights hotel", "Airport transfers", "Daily breakfast", "City orientation tour"],
        flight: {
          airline: "Thai Airways",
          departure: "JFK 22:30",
          arrival: "BKK 05:45+2",
          duration: "18h 15m",
          stops: 1,
          class: "Economy"
        },
        hotel: {
          name: "Khao San Palace Hotel",
          rating: 4.2,
          location: "Khao San Road",
          amenities: ["WiFi", "Pool", "Gym", "Restaurant"],
          roomType: "Deluxe Room"
        },
        extras: {
          breakfast: true,
          airportTransfer: true,
          tourGuide: true,
          cityTour: true,
          insurance: false
        },
        availability: true,
        popular: true
      },
      {
        id: "bkk-package-2",
        name: "Bangkok Comfort Package",
        type: "comfort",
        rating: 4.6,
        originalPrice: 1450,
        packagePrice: 1285,
        savings: 165,
        currency: "USD",
        duration: "7 days / 6 nights",
        image: "🏨",
        description: "Enhanced comfort with premium hotel and better flight options plus guided tours.",
        includes: ["Premium flights", "6 nights 4-star hotel", "Private transfers", "All meals", "Private tour guide", "Temple tours"],
        flight: {
          airline: "Emirates",
          departure: "JFK 14:15",
          arrival: "BKK 22:10+1",
          duration: "20h 55m",
          stops: 1,
          class: "Economy Plus"
        },
        hotel: {
          name: "Riverside Garden Hotel",
          rating: 4.7,
          location: "Chao Phraya Riverside",
          amenities: ["WiFi", "Pool", "Spa", "Restaurant", "River View"],
          roomType: "Superior River View"
        },
        extras: {
          breakfast: true,
          airportTransfer: true,
          tourGuide: true,
          cityTour: true,
          insurance: true
        },
        availability: true,
        bestDeal: true
      },
      {
        id: "bkk-package-3",
        name: "Bangkok Luxury Experience",
        type: "luxury",
        rating: 4.9,
        originalPrice: 2200,
        packagePrice: 1950,
        savings: 250,
        currency: "USD",
        duration: "7 days / 6 nights",
        image: "✨",
        description: "Ultimate luxury experience with 5-star accommodations and premium services.",
        includes: ["Business class flights", "6 nights 5-star hotel", "Luxury transfers", "Fine dining", "Personal butler", "Exclusive tours"],
        flight: {
          airline: "Singapore Airlines",
          departure: "JFK 08:30",
          arrival: "BKK 18:45+1",
          duration: "22h 15m",
          stops: 1,
          class: "Business"
        },
        hotel: {
          name: "Oriental Heritage Bangkok",
          rating: 4.9,
          location: "Silom District",
          amenities: ["WiFi", "Infinity Pool", "World-class Spa", "Fine Dining", "Butler Service"],
          roomType: "Executive Suite"
        },
        extras: {
          breakfast: true,
          airportTransfer: true,
          tourGuide: true,
          cityTour: true,
          insurance: true
        },
        availability: true
      }
    ],
    2: [ // Prague
      {
        id: "prg-package-1",
        name: "Prague Medieval Package",
        type: "economy",
        rating: 4.3,
        originalPrice: 920,
        packagePrice: 825,
        savings: 95,
        currency: "USD",
        duration: "6 days / 5 nights",
        image: "🏰",
        description: "Discover Prague's medieval charm with comfortable accommodations in the heart of Old Town.",
        includes: ["Round-trip flights", "5 nights hotel", "Airport transfers", "Daily breakfast", "Castle tour"],
        flight: {
          airline: "Lufthansa",
          departure: "JFK 19:25",
          arrival: "PRG 14:30+1",
          duration: "11h 05m",
          stops: 1,
          class: "Economy"
        },
        hotel: {
          name: "Old Town Heritage Hotel",
          rating: 4.4,
          location: "Old Town Square",
          amenities: ["WiFi", "Restaurant", "Historic Building"],
          roomType: "Classic Room"
        },
        extras: {
          breakfast: true,
          airportTransfer: true,
          tourGuide: true,
          cityTour: true,
          insurance: false
        },
        availability: true,
        popular: true
      }
    ],
    3: [ // Lisbon
      {
        id: "lis-package-1",
        name: "Lisbon Coastal Package",
        type: "comfort",
        rating: 4.5,
        originalPrice: 1180,
        packagePrice: 1050,
        savings: 130,
        currency: "USD",
        duration: "8 days / 7 nights",
        image: "🌊",
        description: "Coastal beauty and Portuguese culture with excellent accommodations.",
        includes: ["Direct flights", "7 nights hotel", "Airport transfers", "Daily breakfast", "Coastal tours"],
        flight: {
          airline: "TAP Air Portugal",
          departure: "JFK 21:15",
          arrival: "LIS 08:25+1",
          duration: "7h 10m",
          stops: 0,
          class: "Economy"
        },
        hotel: {
          name: "Belém Tower Hotel",
          rating: 4.5,
          location: "Belém District",
          amenities: ["WiFi", "Pool", "Restaurant", "Ocean View"],
          roomType: "Ocean View Room"
        },
        extras: {
          breakfast: true,
          airportTransfer: true,
          tourGuide: true,
          cityTour: true,
          insurance: true
        },
        availability: true,
        bestDeal: true
      }
    ],
    4: [ // Mexico City
      {
        id: "mex-package-1",
        name: "Mexico City Culture Package",
        type: "economy",
        rating: 4.2,
        originalPrice: 780,
        packagePrice: 695,
        savings: 85,
        currency: "USD",
        duration: "7 days / 6 nights",
        image: "🌮",
        description: "Immerse in Mexican culture with great value accommodations and authentic experiences.",
        includes: ["Round-trip flights", "6 nights hotel", "Airport transfers", "Daily breakfast", "Food tours"],
        flight: {
          airline: "Aeromexico",
          departure: "JFK 07:45",
          arrival: "MEX 12:30",
          duration: "5h 45m",
          stops: 0,
          class: "Economy"
        },
        hotel: {
          name: "Centro Histórico Inn",
          rating: 4.1,
          location: "Historic Center",
          amenities: ["WiFi", "Restaurant", "Rooftop Terrace"],
          roomType: "Standard Room"
        },
        extras: {
          breakfast: true,
          airportTransfer: true,
          tourGuide: true,
          cityTour: true,
          insurance: false
        },
        availability: true,
        popular: true
      }
    ]
  };

  return basePackages[destinationId] || basePackages[1];
};

export function PackageBooking({ destination }: PackageBookingProps) {
  const router = useRouter();
  const [packages] = useState<PackageOption[]>(getPackagesForDestination(destination.id));
  const [searchFilters, setSearchFilters] = useState<{
    checkIn: string;
    checkOut: string;
    guests: number;
    rooms: number;
    packageType: '' | 'all' | 'adventure' | 'cultural' | 'relaxation' | 'family' | 'romantic';
  }>({
    checkIn: "",
    checkOut: "",
    guests: 2,
    rooms: 1,
    packageType: ""
  });
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (packageId: string) => {
    const newFavorites = new Set(favorites);
    if (favorites.has(packageId)) {
      newFavorites.delete(packageId);
    } else {
      newFavorites.add(packageId);
    }
    setFavorites(newFavorites);
  };

  const filteredPackages = packages.filter(pkg => 
    !searchFilters.packageType || searchFilters.packageType === 'all'
  );

  const handleBookPackage = (packageOption: PackageOption) => {
    // Navigate to payment page with package details
    const bookingData = {
      type: 'package',
      destination: destination.name,
      package: packageOption,
      guests: searchFilters.guests,
      rooms: searchFilters.rooms,
      checkIn: searchFilters.checkIn,
      checkOut: searchFilters.checkOut,
      totalPrice: packageOption.packagePrice * searchFilters.guests
    };
    
    // Store booking data in localStorage for payment page
    localStorage.setItem('pendingBooking', JSON.stringify(bookingData));
    router.push('/payment');
  };

  const getPackageTypeColor = (type: string) => {
    switch (type) {
      case "economy": return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300";
      case "comfort": return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300";
      case "luxury": return "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300";
      default: return "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-white/20 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Package className="h-6 w-6" />
          Flight + Hotel Packages to {destination.name}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Save money by booking your flight and hotel together! All packages include accommodation, flights, and exclusive benefits.
        </p>
        
        {/* Search Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Check-in</label>
            <Input
              type="date"
              value={searchFilters.checkIn}
              onChange={(e) => setSearchFilters(prev => ({ ...prev, checkIn: e.target.value }))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Check-out</label>
            <Input
              type="date"
              value={searchFilters.checkOut}
              onChange={(e) => setSearchFilters(prev => ({ ...prev, checkOut: e.target.value }))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Guests</label>
            <Input
              type="number"
              min="1"
              max="10"
              value={searchFilters.guests}
              onChange={(e) => setSearchFilters(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Rooms</label>
            <Input
              type="number"
              min="1"
              max="5"
              value={searchFilters.rooms}
              onChange={(e) => setSearchFilters(prev => ({ ...prev, rooms: parseInt(e.target.value) }))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Package Type</label>
            <select
              value={searchFilters.packageType}
              onChange={(e) => setSearchFilters(prev => ({ ...prev, packageType: e.target.value as 'all' | 'adventure' | 'cultural' | 'relaxation' | 'family' | 'romantic' }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Packages</option>
              <option value="economy">Economy</option>
              <option value="comfort">Comfort</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>
        </div>
      </div>

      {/* Package Cards */}
      <div className="space-y-6">
        {filteredPackages.map((packageOption) => (
          <Card key={packageOption.id} className="group hover:shadow-lg transition-all duration-300 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-white/20">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{packageOption.image}</div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-xl">{packageOption.name}</CardTitle>
                      <Badge className={getPackageTypeColor(packageOption.type)}>
                        {packageOption.type.charAt(0).toUpperCase() + packageOption.type.slice(1)}
                      </Badge>
                      {packageOption.popular && (
                        <Badge variant="destructive">Popular</Badge>
                      )}
                      {packageOption.bestDeal && (
                        <Badge className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300">
                          <Sparkles className="h-3 w-3 mr-1" />
                          Best Deal
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {packageOption.rating}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {packageOption.duration}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500 line-through">
                    ${packageOption.originalPrice}
                  </div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    ${packageOption.packagePrice}
                  </div>
                  <div className="text-sm text-green-600 font-medium">
                    Save ${packageOption.savings}
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <p className="text-gray-600 dark:text-gray-400">
                {packageOption.description}
              </p>

              {/* Package Includes */}
              <div>
                <h4 className="font-semibold mb-2 text-green-700 dark:text-green-300">✓ Package Includes:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {packageOption.includes.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Flight & Hotel Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Flight Details */}
                <div className="border rounded-lg p-4">
                  <h5 className="font-semibold mb-2 flex items-center gap-2">
                    <Plane className="h-4 w-4" />
                    Flight Details
                  </h5>
                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <div>Airline: {packageOption.flight.airline}</div>
                    <div>Departure: {packageOption.flight.departure}</div>
                    <div>Arrival: {packageOption.flight.arrival}</div>
                    <div>Duration: {packageOption.flight.duration}</div>
                    <div>Class: {packageOption.flight.class}</div>
                    <div>Stops: {packageOption.flight.stops === 0 ? "Non-stop" : `${packageOption.flight.stops} stop`}</div>
                  </div>
                </div>

                {/* Hotel Details */}
                <div className="border rounded-lg p-4">
                  <h5 className="font-semibold mb-2 flex items-center gap-2">
                    <Hotel className="h-4 w-4" />
                    Hotel Details
                  </h5>
                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <div className="font-medium">{packageOption.hotel.name}</div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {packageOption.hotel.rating} stars
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {packageOption.hotel.location}
                    </div>
                    <div>Room: {packageOption.hotel.roomType}</div>
                    <div>Amenities: {packageOption.hotel.amenities.join(", ")}</div>
                  </div>
                </div>
              </div>

              {/* Booking Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleFavorite(packageOption.id)}
                    className={favorites.has(packageOption.id) ? "text-red-600" : ""}
                  >
                    <Heart className={`h-4 w-4 ${favorites.has(packageOption.id) ? "fill-red-600" : ""}`} />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-lg font-semibold">
                      Total: ${packageOption.packagePrice * searchFilters.guests}
                    </div>
                    <div className="text-xs text-gray-500">
                      for {searchFilters.guests} guest(s)
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleBookPackage(packageOption)}
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                    disabled={!searchFilters.checkIn || !searchFilters.checkOut}
                  >
                    Book Package
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPackages.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
            No packages found
          </h3>
          <p className="text-gray-500">
            Try adjusting your filters or search criteria
          </p>
        </div>
      )}
    </div>
  );
}