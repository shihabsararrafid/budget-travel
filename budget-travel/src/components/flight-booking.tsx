"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Plane,
  Clock,
  MapPin,
  Calendar,
  Users,
  Filter,
  ArrowRight,
  Wifi,
  UtensilsCrossed,
  Luggage,
  Monitor,
  Coffee,
  RefreshCw,
} from "lucide-react";
import { Destination } from "@/app/destination/[id]/destination-data";

interface FlightOption {
  id: string;
  airline: string;
  airlineCode: string;
  logo: string;
  departure: {
    airport: string;
    code: string;
    time: string;
    date: string;
  };
  arrival: {
    airport: string;
    code: string;
    time: string;
    date: string;
  };
  duration: string;
  stops: number;
  stopDetails?: string[];
  price: number;
  originalPrice?: number;
  currency: string;
  class: "economy" | "premium" | "business" | "first";
  amenities: string[];
  baggage: {
    carry: string;
    checked: string;
  };
  cancellation: "flexible" | "standard" | "restricted";
  seatsLeft: number;
  dealType?: "limited" | "popular" | "best";
}

interface FlightBookingProps {
  destination: Destination;
}

const getFlightsForDestination = (destinationId: number): FlightOption[] => {
  const baseFlights: Record<number, FlightOption[]> = {
    1: [ // Bangkok
      {
        id: "bkk-flight-1",
        airline: "Thai Airways",
        airlineCode: "TG",
        logo: "✈️",
        departure: {
          airport: "John F. Kennedy International",
          code: "JFK",
          time: "22:30",
          date: "2024-03-15"
        },
        arrival: {
          airport: "Suvarnabhumi Airport",
          code: "BKK",
          time: "05:45+2",
          date: "2024-03-17"
        },
        duration: "18h 15m",
        stops: 1,
        stopDetails: ["1 stop in Tokyo (NRT) - 2h 30m layover"],
        price: 785,
        originalPrice: 920,
        currency: "USD",
        class: "economy",
        amenities: ["wifi", "entertainment", "meals", "drinks"],
        baggage: {
          carry: "7kg",
          checked: "23kg"
        },
        cancellation: "flexible",
        seatsLeft: 7,
        dealType: "limited"
      },
      {
        id: "bkk-flight-2",
        airline: "Emirates",
        airlineCode: "EK",
        logo: "🦅",
        departure: {
          airport: "John F. Kennedy International",
          code: "JFK",
          time: "14:15",
          date: "2024-03-15"
        },
        arrival: {
          airport: "Suvarnabhumi Airport",
          code: "BKK",
          time: "22:10+1",
          date: "2024-03-16"
        },
        duration: "20h 55m",
        stops: 1,
        stopDetails: ["1 stop in Dubai (DXB) - 3h 45m layover"],
        price: 892,
        currency: "USD",
        class: "economy",
        amenities: ["wifi", "entertainment", "meals", "drinks", "power"],
        baggage: {
          carry: "7kg",
          checked: "30kg"
        },
        cancellation: "standard",
        seatsLeft: 12,
        dealType: "popular"
      },
      {
        id: "bkk-flight-3",
        airline: "Singapore Airlines",
        airlineCode: "SQ",
        logo: "🇸🇬",
        departure: {
          airport: "John F. Kennedy International",
          code: "JFK",
          time: "08:30",
          date: "2024-03-15"
        },
        arrival: {
          airport: "Suvarnabhumi Airport",
          code: "BKK",
          time: "18:45+1",
          date: "2024-03-16"
        },
        duration: "22h 15m",
        stops: 1,
        stopDetails: ["1 stop in Singapore (SIN) - 4h 20m layover"],
        price: 1050,
        currency: "USD",
        class: "economy",
        amenities: ["wifi", "entertainment", "meals", "drinks", "power", "comfort"],
        baggage: {
          carry: "7kg",
          checked: "30kg"
        },
        cancellation: "flexible",
        seatsLeft: 18,
        dealType: "best"
      }
    ],
    2: [ // Prague
      {
        id: "prg-flight-1",
        airline: "Lufthansa",
        airlineCode: "LH",
        logo: "🇩🇪",
        departure: {
          airport: "John F. Kennedy International",
          code: "JFK",
          time: "19:25",
          date: "2024-03-15"
        },
        arrival: {
          airport: "Václav Havel Airport",
          code: "PRG",
          time: "14:30+1",
          date: "2024-03-16"
        },
        duration: "11h 05m",
        stops: 1,
        stopDetails: ["1 stop in Frankfurt (FRA) - 1h 45m layover"],
        price: 620,
        originalPrice: 750,
        currency: "USD",
        class: "economy",
        amenities: ["wifi", "entertainment", "meals"],
        baggage: {
          carry: "8kg",
          checked: "23kg"
        },
        cancellation: "standard",
        seatsLeft: 15,
        dealType: "limited"
      },
      {
        id: "prg-flight-2",
        airline: "KLM",
        airlineCode: "KL",
        logo: "🇳🇱",
        departure: {
          airport: "John F. Kennedy International",
          code: "JFK",
          time: "16:40",
          date: "2024-03-15"
        },
        arrival: {
          airport: "Václav Havel Airport",
          code: "PRG",
          time: "12:15+1",
          date: "2024-03-16"
        },
        duration: "11h 35m",
        stops: 1,
        stopDetails: ["1 stop in Amsterdam (AMS) - 2h 10m layover"],
        price: 685,
        currency: "USD",
        class: "economy",
        amenities: ["wifi", "entertainment", "meals", "drinks"],
        baggage: {
          carry: "8kg",
          checked: "23kg"
        },
        cancellation: "flexible",
        seatsLeft: 9,
        dealType: "popular"
      }
    ],
    3: [ // Lisbon
      {
        id: "lis-flight-1",
        airline: "TAP Air Portugal",
        airlineCode: "TP",
        logo: "🇵🇹",
        departure: {
          airport: "John F. Kennedy International",
          code: "JFK",
          time: "21:15",
          date: "2024-03-15"
        },
        arrival: {
          airport: "Lisbon Airport",
          code: "LIS",
          time: "08:25+1",
          date: "2024-03-16"
        },
        duration: "7h 10m",
        stops: 0,
        price: 550,
        originalPrice: 650,
        currency: "USD",
        class: "economy",
        amenities: ["wifi", "entertainment", "meals"],
        baggage: {
          carry: "8kg",
          checked: "23kg"
        },
        cancellation: "standard",
        seatsLeft: 22,
        dealType: "best"
      },
      {
        id: "lis-flight-2",
        airline: "United Airlines",
        airlineCode: "UA",
        logo: "🇺🇸",
        departure: {
          airport: "Newark Liberty International",
          code: "EWR",
          time: "23:10",
          date: "2024-03-15"
        },
        arrival: {
          airport: "Lisbon Airport",
          code: "LIS",
          time: "11:30+1",
          date: "2024-03-16"
        },
        duration: "6h 20m",
        stops: 0,
        price: 620,
        currency: "USD",
        class: "economy",
        amenities: ["wifi", "entertainment", "meals", "power"],
        baggage: {
          carry: "7kg",
          checked: "23kg"
        },
        cancellation: "flexible",
        seatsLeft: 8,
        dealType: "limited"
      }
    ],
    4: [ // Mexico City
      {
        id: "mex-flight-1",
        airline: "Aeromexico",
        airlineCode: "AM",
        logo: "🇲🇽",
        departure: {
          airport: "John F. Kennedy International",
          code: "JFK",
          time: "07:45",
          date: "2024-03-15"
        },
        arrival: {
          airport: "Mexico City International",
          code: "MEX",
          time: "12:30",
          date: "2024-03-15"
        },
        duration: "5h 45m",
        stops: 0,
        price: 420,
        originalPrice: 520,
        currency: "USD",
        class: "economy",
        amenities: ["wifi", "entertainment", "meals"],
        baggage: {
          carry: "10kg",
          checked: "25kg"
        },
        cancellation: "standard",
        seatsLeft: 14,
        dealType: "best"
      },
      {
        id: "mex-flight-2",
        airline: "Delta Air Lines",
        airlineCode: "DL",
        logo: "🔺",
        departure: {
          airport: "John F. Kennedy International",
          code: "JFK",
          time: "15:20",
          date: "2024-03-15"
        },
        arrival: {
          airport: "Mexico City International",
          code: "MEX",
          time: "20:15",
          date: "2024-03-15"
        },
        duration: "5h 55m",
        stops: 0,
        price: 485,
        currency: "USD",
        class: "economy",
        amenities: ["wifi", "entertainment", "meals", "power"],
        baggage: {
          carry: "7kg",
          checked: "23kg"
        },
        cancellation: "flexible",
        seatsLeft: 11,
        dealType: "popular"
      }
    ]
  };

  return baseFlights[destinationId] || baseFlights[1];
};

const amenityIcons: Record<string, React.ReactElement> = {
  wifi: <Wifi className="h-4 w-4" />,
  entertainment: <Monitor className="h-4 w-4" />,
  meals: <UtensilsCrossed className="h-4 w-4" />,
  drinks: <Coffee className="h-4 w-4" />,
  power: <span className="text-xs">⚡</span>,
  comfort: <span className="text-xs">🛋️</span>
};

export function FlightBooking({ destination }: FlightBookingProps) {
  const router = useRouter();
  const [flights] = useState<FlightOption[]>(getFlightsForDestination(destination.id));
  const [searchFilters, setSearchFilters] = useState<{
    departure: string;
    return: string;
    passengers: number;
    class: 'economy' | 'premium' | 'business' | 'first';
    maxPrice: number;
    maxStops: number;
    directOnly: boolean;
  }>({
    departure: "",
    return: "",
    passengers: 1,
    class: "economy",
    maxPrice: 1500,
    maxStops: 2,
    directOnly: false
  });
  const [tripType, setTripType] = useState<"roundtrip" | "oneway">("roundtrip");
  const [showFilters, setShowFilters] = useState(false);

  const filteredFlights = flights.filter(flight => 
    flight.price <= searchFilters.maxPrice && 
    flight.stops <= searchFilters.maxStops &&
    (!searchFilters.directOnly || flight.stops === 0) &&
    flight.class === searchFilters.class
  );

  const handleBooking = (flight: FlightOption) => {
    const bookingData = {
      type: 'flight',
      destination: destination.name,
      flight: flight,
      departure: searchFilters.departure,
      return: searchFilters.return,
      passengers: searchFilters.passengers,
      class: searchFilters.class,
      totalPrice: flight.price * searchFilters.passengers
    };
    
    localStorage.setItem('pendingBooking', JSON.stringify(bookingData));
    router.push('/payment');
  };

  const formatTime = (time: string) => {
    if (time.includes('+')) {
      const [baseTime, dayOffset] = time.split('+');
      return `${baseTime} +${dayOffset}d`;
    }
    return time;
  };

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-white/20 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Plane className="h-6 w-6" />
          Flights to {destination.name}
        </h2>
        
        {/* Trip Type Toggle */}
        <div className="flex gap-2 mb-4">
          <Button
            variant={tripType === "roundtrip" ? "default" : "outline"}
            onClick={() => setTripType("roundtrip")}
            size="sm"
          >
            Round Trip
          </Button>
          <Button
            variant={tripType === "oneway" ? "default" : "outline"}
            onClick={() => setTripType("oneway")}
            size="sm"
          >
            One Way
          </Button>
        </div>

        {/* Search Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Departure</label>
            <Input
              type="date"
              value={searchFilters.departure}
              onChange={(e) => setSearchFilters(prev => ({ ...prev, departure: e.target.value }))}
              className="w-full"
            />
          </div>
          {tripType === "roundtrip" && (
            <div>
              <label className="block text-sm font-medium mb-1">Return</label>
              <Input
                type="date"
                value={searchFilters.return}
                onChange={(e) => setSearchFilters(prev => ({ ...prev, return: e.target.value }))}
                className="w-full"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1">Passengers</label>
            <Input
              type="number"
              min="1"
              max="9"
              value={searchFilters.passengers}
              onChange={(e) => setSearchFilters(prev => ({ ...prev, passengers: parseInt(e.target.value) }))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Class</label>
            <select
              value={searchFilters.class}
              onChange={(e) => setSearchFilters(prev => ({ ...prev, class: e.target.value as 'economy' | 'premium' | 'business' | 'first' }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="economy">Economy</option>
              <option value="premium">Premium Economy</option>
              <option value="business">Business</option>
              <option value="first">First Class</option>
            </select>
          </div>
          <div className="flex items-end">
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Max Price</label>
              <Input
                type="range"
                min="200"
                max="2000"
                step="50"
                value={searchFilters.maxPrice}
                onChange={(e) => setSearchFilters(prev => ({ ...prev, maxPrice: parseInt(e.target.value) }))}
                className="w-full"
              />
              <span className="text-sm text-gray-600">${searchFilters.maxPrice}</span>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Max Stops</label>
              <select
                value={searchFilters.maxStops}
                onChange={(e) => setSearchFilters(prev => ({ ...prev, maxStops: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={0}>Non-stop only</option>
                <option value={1}>Up to 1 stop</option>
                <option value={2}>Up to 2 stops</option>
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="directOnly"
                checked={searchFilters.directOnly}
                onChange={(e) => setSearchFilters(prev => ({ ...prev, directOnly: e.target.checked }))}
                className="mr-2"
              />
              <label htmlFor="directOnly" className="text-sm">Direct flights only</label>
            </div>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600 dark:text-gray-400">
          Found {filteredFlights.length} flights
        </p>
        <div className="text-sm text-gray-500">
          Showing results for {searchFilters.passengers} passenger(s) • {searchFilters.class}
        </div>
      </div>

      {/* Flight Cards */}
      <div className="space-y-4">
        {filteredFlights.map((flight) => (
          <Card key={flight.id} className="group hover:shadow-lg transition-all duration-300 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Flight Details */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{flight.logo}</div>
                      <div>
                        <h3 className="font-semibold">{flight.airline}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{flight.airlineCode}</p>
                      </div>
                    </div>
                    {flight.dealType && (
                      <Badge variant={
                        flight.dealType === "limited" ? "destructive" : 
                        flight.dealType === "best" ? "default" : "secondary"
                      }>
                        {flight.dealType === "limited" ? "Limited Time" : 
                         flight.dealType === "best" ? "Best Value" : "Popular"}
                      </Badge>
                    )}
                  </div>

                  {/* Route Information */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {/* Departure */}
                    <div className="text-center">
                      <div className="text-2xl font-bold">{formatTime(flight.departure.time)}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{flight.departure.code}</div>
                      <div className="text-xs text-gray-500">{flight.departure.airport}</div>
                    </div>

                    {/* Duration & Stops */}
                    <div className="text-center flex flex-col items-center justify-center">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="h-px bg-gray-300 flex-1"></div>
                        <Plane className="h-4 w-4 text-gray-400" />
                        <div className="h-px bg-gray-300 flex-1"></div>
                      </div>
                      <div className="text-sm font-medium">{flight.duration}</div>
                      <div className="text-xs text-gray-500">
                        {flight.stops === 0 ? "Non-stop" : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                      </div>
                    </div>

                    {/* Arrival */}
                    <div className="text-center">
                      <div className="text-2xl font-bold">{formatTime(flight.arrival.time)}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{flight.arrival.code}</div>
                      <div className="text-xs text-gray-500">{flight.arrival.airport}</div>
                    </div>
                  </div>

                  {/* Stop Details */}
                  {flight.stopDetails && (
                    <div className="mb-4">
                      {flight.stopDetails.map((stop, index) => (
                        <div key={index} className="text-sm text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 px-3 py-1 rounded">
                          {stop}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {flight.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center gap-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded text-sm">
                        {amenityIcons[amenity]}
                        <span className="capitalize">{amenity}</span>
                      </div>
                    ))}
                  </div>

                  {/* Baggage & Policies */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Baggage:</span>
                      <div className="text-gray-600 dark:text-gray-400">
                        Carry-on: {flight.baggage.carry}<br />
                        Checked: {flight.baggage.checked}
                      </div>
                    </div>
                    <div>
                      <span className="font-medium">Cancellation:</span>
                      <div className="text-gray-600 dark:text-gray-400 capitalize">
                        {flight.cancellation}
                      </div>
                    </div>
                    <div>
                      <span className="font-medium">Seats left:</span>
                      <div className={`${flight.seatsLeft <= 5 ? 'text-red-600' : 'text-gray-600 dark:text-gray-400'}`}>
                        {flight.seatsLeft} remaining
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing and Booking */}
                <div className="lg:w-48 flex-shrink-0 text-center">
                  <div className="mb-4">
                    {flight.originalPrice && (
                      <div className="text-sm text-gray-500 line-through">
                        ${flight.originalPrice}
                      </div>
                    )}
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                      ${flight.price}
                    </div>
                    <div className="text-sm text-gray-500">per person</div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-lg font-semibold">
                      Total: ${flight.price * searchFilters.passengers}
                    </div>
                    <div className="text-xs text-gray-500">
                      All taxes included
                    </div>
                  </div>

                  <Button 
                    onClick={() => handleBooking(flight)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 mb-2"
                  >
                    Book Now
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFlights.length === 0 && (
        <div className="text-center py-12">
          <Plane className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
            No flights found
          </h3>
          <p className="text-gray-500">
            Try adjusting your filters or search criteria
          </p>
        </div>
      )}
    </div>
  );
}