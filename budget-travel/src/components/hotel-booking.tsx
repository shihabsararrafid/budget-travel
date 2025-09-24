"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Hotel,
  Star,
  MapPin,
  Wifi,
  Car,
  Coffee,
  Dumbbell,
  Calendar,
  Users,
  Filter,
  Heart,
  Share2,
} from "lucide-react";
import { Destination } from "@/app/destination/[id]/destination-data";

interface HotelOption {
  id: string;
  name: string;
  rating: number;
  price: number;
  originalPrice?: number;
  currency: string;
  image: string;
  location: string;
  distance: string;
  amenities: string[];
  description: string;
  photos: string[];
  reviews: {
    total: number;
    rating: number;
    recentReview: string;
  };
  availability: boolean;
  cancellation: "free" | "partial" | "none";
  dealType?: "limited" | "popular" | "new";
}

interface HotelBookingProps {
  destination: Destination;
}

const getHotelsForDestination = (destinationId: number): HotelOption[] => {
  const baseHotels: Record<number, HotelOption[]> = {
    1: [ // Bangkok
      {
        id: "bkk-1",
        name: "Khao San Palace Hotel",
        rating: 4.2,
        price: 35,
        originalPrice: 45,
        currency: "USD",
        image: "🏨",
        location: "Khao San Road",
        distance: "0.5 km from city center",
        amenities: ["wifi", "pool", "gym", "breakfast"],
        description: "Modern hotel in the heart of Bangkok's backpacker district with easy access to temples and street food.",
        photos: ["🏨", "🛏️", "🏊", "🍳"],
        reviews: {
          total: 1240,
          rating: 4.2,
          recentReview: "Great location, clean rooms, and helpful staff. Perfect for exploring Bangkok!"
        },
        availability: true,
        cancellation: "free",
        dealType: "limited"
      },
      {
        id: "bkk-2", 
        name: "Silom Boutique Inn",
        rating: 4.5,
        price: 48,
        currency: "USD",
        image: "🏩",
        location: "Silom District",
        distance: "1.2 km from city center",
        amenities: ["wifi", "coffee", "gym"],
        description: "Stylish boutique hotel near business district with excellent restaurants and nightlife nearby.",
        photos: ["🏩", "☕", "🏋️", "🍽️"],
        reviews: {
          total: 856,
          rating: 4.5,
          recentReview: "Beautiful rooms, great breakfast, perfect location for business and leisure."
        },
        availability: true,
        cancellation: "free"
      },
      {
        id: "bkk-3",
        name: "Riverside Garden Hotel",
        rating: 4.7,
        price: 65,
        currency: "USD",
        image: "🌊",
        location: "Chao Phraya Riverside",
        distance: "2.0 km from city center",
        amenities: ["wifi", "pool", "breakfast", "parking"],
        description: "Luxury riverside hotel with stunning river views, spa services, and traditional Thai architecture.",
        photos: ["🌊", "🏊", "🛀", "🏯"],
        reviews: {
          total: 2156,
          rating: 4.7,
          recentReview: "Absolutely stunning views, excellent service, and authentic Thai hospitality."
        },
        availability: true,
        cancellation: "partial",
        dealType: "popular"
      }
    ],
    2: [ // Prague
      {
        id: "prg-1",
        name: "Old Town Heritage Hotel",
        rating: 4.4,
        price: 42,
        originalPrice: 55,
        currency: "USD",
        image: "🏰",
        location: "Old Town Square",
        distance: "0.3 km from main square",
        amenities: ["wifi", "breakfast", "parking"],
        description: "Historic hotel in a 14th-century building with modern amenities and traditional Czech charm.",
        photos: ["🏰", "🍺", "🏛️", "🛏️"],
        reviews: {
          total: 987,
          rating: 4.4,
          recentReview: "Perfect location, beautiful historic building, great value for money!"
        },
        availability: true,
        cancellation: "free",
        dealType: "limited"
      },
      {
        id: "prg-2",
        name: "Charles Bridge Boutique",
        rating: 4.6,
        price: 58,
        currency: "USD",
        image: "🌉",
        location: "Lesser Town",
        distance: "0.8 km from Charles Bridge",
        amenities: ["wifi", "coffee", "gym", "breakfast"],
        description: "Elegant boutique hotel with views of Charles Bridge and Prague Castle.",
        photos: ["🌉", "🏰", "☕", "🛏️"],
        reviews: {
          total: 1456,
          rating: 4.6,
          recentReview: "Incredible views, excellent breakfast, walking distance to everything."
        },
        availability: true,
        cancellation: "free",
        dealType: "popular"
      }
    ],
    3: [ // Lisbon
      {
        id: "lis-1",
        name: "Alfama View Guesthouse",
        rating: 4.3,
        price: 38,
        currency: "USD",
        image: "🏘️",
        location: "Alfama District",
        distance: "1.5 km from city center",
        amenities: ["wifi", "breakfast"],
        description: "Charming guesthouse in historic Alfama with traditional Portuguese tiles and Fado music.",
        photos: ["🏘️", "🎵", "🍳", "🌅"],
        reviews: {
          total: 743,
          rating: 4.3,
          recentReview: "Authentic Lisbon experience, beautiful views, great breakfast with pastéis de nata!"
        },
        availability: true,
        cancellation: "free"
      },
      {
        id: "lis-2",
        name: "Belém Tower Hotel",
        rating: 4.5,
        price: 52,
        currency: "USD",
        image: "🗼",
        location: "Belém District",
        distance: "6 km from city center",
        amenities: ["wifi", "pool", "breakfast", "parking"],
        description: "Modern hotel near Belém Tower and Jerónimos Monastery with easy tram access to downtown.",
        photos: ["🗼", "🏊", "🚋", "🍰"],
        reviews: {
          total: 1289,
          rating: 4.5,
          recentReview: "Great location for sightseeing, comfortable rooms, excellent pastries at breakfast."
        },
        availability: true,
        cancellation: "free",
        dealType: "new"
      }
    ],
    4: [ // Mexico City
      {
        id: "mex-1",
        name: "Centro Histórico Inn",
        rating: 4.1,
        price: 28,
        originalPrice: 35,
        currency: "USD",
        image: "🏛️",
        location: "Historic Center",
        distance: "0.2 km from Zócalo",
        amenities: ["wifi", "breakfast"],
        description: "Budget-friendly hotel in colonial building near main square and cathedral.",
        photos: ["🏛️", "⛪", "🌮", "🎨"],
        reviews: {
          total: 892,
          rating: 4.1,
          recentReview: "Perfect location for exploring, friendly staff, great tacos nearby!"
        },
        availability: true,
        cancellation: "free",
        dealType: "limited"
      },
      {
        id: "mex-2",
        name: "Roma Norte Boutique",
        rating: 4.6,
        price: 45,
        currency: "USD",
        image: "🎨",
        location: "Roma Norte",
        distance: "4 km from city center",
        amenities: ["wifi", "coffee", "gym", "breakfast"],
        description: "Hip boutique hotel in trendy Roma Norte neighborhood with art galleries and cafes.",
        photos: ["🎨", "☕", "🖼️", "🥐"],
        reviews: {
          total: 1034,
          rating: 4.6,
          recentReview: "Stylish rooms, amazing coffee, perfect for exploring the cool neighborhood."
        },
        availability: true,
        cancellation: "free",
        dealType: "popular"
      }
    ]
  };

  return baseHotels[destinationId] || baseHotels[1];
};

const amenityIcons: Record<string, React.ReactElement> = {
  wifi: <Wifi className="h-4 w-4" />,
  pool: <span className="text-xs">🏊</span>,
  gym: <Dumbbell className="h-4 w-4" />,
  breakfast: <Coffee className="h-4 w-4" />,
  parking: <Car className="h-4 w-4" />
};

export function HotelBooking({ destination }: HotelBookingProps) {
  const [hotels] = useState<HotelOption[]>(getHotelsForDestination(destination.id));
  const [searchFilters, setSearchFilters] = useState({
    checkIn: "",
    checkOut: "",
    guests: 2,
    rooms: 1,
    maxPrice: 100,
    minRating: 3
  });
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

  const toggleFavorite = (hotelId: string) => {
    const newFavorites = new Set(favorites);
    if (favorites.has(hotelId)) {
      newFavorites.delete(hotelId);
    } else {
      newFavorites.add(hotelId);
    }
    setFavorites(newFavorites);
  };

  const filteredHotels = hotels.filter(hotel => 
    hotel.price <= searchFilters.maxPrice && 
    hotel.rating >= searchFilters.minRating &&
    hotel.availability
  );

  const handleBooking = (hotel: HotelOption) => {
    // This would typically open a booking modal or redirect to payment
    alert(`Booking ${hotel.name} for ${searchFilters.guests} guests from ${searchFilters.checkIn} to ${searchFilters.checkOut}`);
  };

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-white/20 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Hotel className="h-6 w-6" />
          Hotels in {destination.name}
        </h2>
        
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
          <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Max Price (per night)</label>
              <Input
                type="range"
                min="20"
                max="200"
                value={searchFilters.maxPrice}
                onChange={(e) => setSearchFilters(prev => ({ ...prev, maxPrice: parseInt(e.target.value) }))}
                className="w-full"
              />
              <span className="text-sm text-gray-600">${searchFilters.maxPrice}</span>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Minimum Rating</label>
              <Input
                type="range"
                min="1"
                max="5"
                step="0.5"
                value={searchFilters.minRating}
                onChange={(e) => setSearchFilters(prev => ({ ...prev, minRating: parseFloat(e.target.value) }))}
                className="w-full"
              />
              <span className="text-sm text-gray-600">{searchFilters.minRating} stars</span>
            </div>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600 dark:text-gray-400">
          Found {filteredHotels.length} hotels
        </p>
        <div className="text-sm text-gray-500">
          Showing results for {searchFilters.guests} guests • {searchFilters.rooms} room(s)
        </div>
      </div>

      {/* Hotel Cards */}
      <div className="space-y-4">
        {filteredHotels.map((hotel) => (
          <Card key={hotel.id} className="group hover:shadow-lg transition-all duration-300 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Hotel Image */}
                <div className="lg:w-64 flex-shrink-0">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 to-purple-900 rounded-lg flex items-center justify-center text-6xl">
                    {hotel.image}
                  </div>
                  <div className="flex gap-2 mt-2">
                    {hotel.photos.slice(0, 4).map((photo, index) => (
                      <div key={index} className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded text-lg flex items-center justify-center">
                        {photo}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hotel Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold">{hotel.name}</h3>
                        {hotel.dealType && (
                          <Badge variant={hotel.dealType === "limited" ? "destructive" : "secondary"}>
                            {hotel.dealType === "limited" ? "Limited Time" : 
                             hotel.dealType === "popular" ? "Popular" : "New"}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {hotel.location}
                        </div>
                        <span>{hotel.distance}</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          {hotel.rating} ({hotel.reviews.total} reviews)
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleFavorite(hotel.id)}
                        className={favorites.has(hotel.id) ? "text-red-600" : ""}
                      >
                        <Heart className={`h-4 w-4 ${favorites.has(hotel.id) ? "fill-red-600" : ""}`} />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    {hotel.description}
                  </p>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center gap-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-md text-sm">
                        {amenityIcons[amenity]}
                        <span className="capitalize">{amenity}</span>
                      </div>
                    ))}
                  </div>

                  {/* Recent Review */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                      &ldquo;{hotel.reviews.recentReview}&rdquo;
                    </p>
                  </div>

                  {/* Cancellation Policy */}
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant={hotel.cancellation === "free" ? "secondary" : "outline"}>
                      {hotel.cancellation === "free" ? "Free Cancellation" : 
                       hotel.cancellation === "partial" ? "Partial Refund" : "Non-refundable"}
                    </Badge>
                  </div>
                </div>

                {/* Pricing and Booking */}
                <div className="lg:w-48 flex-shrink-0 text-right">
                  <div className="mb-2">
                    {hotel.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${hotel.originalPrice}
                      </span>
                    )}
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      ${hotel.price}
                    </div>
                    <div className="text-sm text-gray-500">per night</div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Total: ${hotel.price * (searchFilters.checkIn && searchFilters.checkOut ? 
                        Math.max(1, Math.ceil((new Date(searchFilters.checkOut).getTime() - new Date(searchFilters.checkIn).getTime()) / (1000 * 60 * 60 * 24))) : 1
                      )}
                    </div>
                    <div className="text-xs text-gray-500">
                      Includes taxes & fees
                    </div>
                  </div>

                  <Button 
                    onClick={() => handleBooking(hotel)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={!searchFilters.checkIn || !searchFilters.checkOut}
                  >
                    Book Now
                  </Button>
                  
                  <Button variant="outline" className="w-full mt-2">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredHotels.length === 0 && (
        <div className="text-center py-12">
          <Hotel className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
            No hotels found
          </h3>
          <p className="text-gray-500">
            Try adjusting your filters or search criteria
          </p>
        </div>
      )}
    </div>
  );
}