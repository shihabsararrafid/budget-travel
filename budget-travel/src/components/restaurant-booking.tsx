"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  UtensilsCrossed,
  Star,
  MapPin,
  Clock,
  Users,
  Calendar,
  Filter,
  Phone,
  Heart,
  Share2,
  ChefHat,
  Coffee,
  Wine,
  CreditCard,
  CheckCircle,
} from "lucide-react";
import { Destination } from "@/app/destination/[id]/destination-data";

interface RestaurantOption {
  id: string;
  name: string;
  cuisine: string[];
  rating: number;
  priceRange: "$" | "$$" | "$$$" | "$$$$";
  avgPrice: number;
  image: string;
  location: string;
  distance: string;
  openHours: string;
  specialties: string[];
  features: string[];
  description: string;
  photos: string[];
  reviews: {
    total: number;
    rating: number;
    recentReview: string;
  };
  availability: {
    today: string[];
    tomorrow: string[];
  };
  reservationRequired: boolean;
  phone: string;
  menuHighlights: string[];
  dietary: string[];
  ambiance: string[];
  dealType?: "special" | "popular" | "new";
}

interface RestaurantBookingProps {
  destination: Destination;
}

const getRestaurantsForDestination = (destinationId: number): RestaurantOption[] => {
  const baseRestaurants: Record<number, RestaurantOption[]> = {
    1: [ // Bangkok
      {
        id: "bkk-rest-1",
        name: "Som Tam Nua",
        cuisine: ["Thai", "Isaan"],
        rating: 4.6,
        priceRange: "$",
        avgPrice: 8,
        image: "🌶️",
        location: "Siam Square",
        distance: "0.8 km from city center",
        openHours: "11:00 AM - 10:00 PM",
        specialties: ["Som Tam", "Grilled Chicken", "Sticky Rice"],
        features: ["outdoor seating", "spicy", "authentic", "casual"],
        description: "Legendary som tam (papaya salad) restaurant serving authentic Isaan cuisine with fiery flavors.",
        photos: ["🌶️", "🥗", "🍗", "🍚"],
        reviews: {
          total: 2847,
          rating: 4.6,
          recentReview: "Best som tam in Bangkok! Incredibly spicy and authentic. Must try the grilled chicken too!"
        },
        availability: {
          today: ["12:00 PM", "1:00 PM", "2:00 PM", "6:00 PM", "7:00 PM"],
          tomorrow: ["12:00 PM", "1:00 PM", "2:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"]
        },
        reservationRequired: false,
        phone: "+66 2 251 4880",
        menuHighlights: ["Som Tam Thai", "Larb Moo", "Gai Yang", "Khao Niao"],
        dietary: ["halal options", "vegetarian"],
        ambiance: ["casual", "lively", "local"],
        dealType: "popular"
      },
      {
        id: "bkk-rest-2",
        name: "Gaggan Anand",
        cuisine: ["Progressive Indian", "Fine Dining"],
        rating: 4.8,
        priceRange: "$$$$",
        avgPrice: 180,
        image: "👨‍🍳",
        location: "Langsuan",
        distance: "2.5 km from city center",
        openHours: "6:00 PM - 12:00 AM",
        specialties: ["Molecular Gastronomy", "Indian Fusion", "Tasting Menu"],
        features: ["fine dining", "tasting menu", "wine pairing", "creative"],
        description: "World-renowned progressive Indian restaurant offering innovative molecular gastronomy experiences.",
        photos: ["👨‍🍳", "🍽️", "🍷", "🎨"],
        reviews: {
          total: 1456,
          rating: 4.8,
          recentReview: "Absolutely mind-blowing culinary experience. Every course is a work of art!"
        },
        availability: {
          today: ["7:00 PM", "8:30 PM"],
          tomorrow: ["6:00 PM", "7:00 PM", "8:30 PM"]
        },
        reservationRequired: true,
        phone: "+66 2 652 1700",
        menuHighlights: ["Emoji Tasting Menu", "Yogurt Explosion", "Charcoal", "Lick It Up"],
        dietary: ["vegetarian options", "vegan options"],
        ambiance: ["intimate", "modern", "sophisticated"],
        dealType: "special"
      },
      {
        id: "bkk-rest-3",
        name: "Thip Samai",
        cuisine: ["Thai", "Street Food"],
        rating: 4.4,
        priceRange: "$",
        avgPrice: 6,
        image: "🍜",
        location: "Phra Nakhon",
        distance: "1.2 km from Grand Palace",
        openHours: "5:00 PM - 2:00 AM",
        specialties: ["Pad Thai", "Thai Noodles"],
        features: ["street food", "late night", "authentic", "historic"],
        description: "Historic pad thai institution serving the dish since 1966, famous for orange-wrapped pad thai.",
        photos: ["🍜", "🍳", "🥢", "🍊"],
        reviews: {
          total: 3892,
          rating: 4.4,
          recentReview: "The original and still the best pad thai! Love the orange-wrapped version."
        },
        availability: {
          today: ["6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM"],
          tomorrow: ["5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"]
        },
        reservationRequired: false,
        phone: "+66 2 221 6280",
        menuHighlights: ["Pad Thai Wrapped in Egg", "Pad Thai with Prawns", "Traditional Pad Thai"],
        dietary: ["vegetarian options"],
        ambiance: ["casual", "bustling", "authentic"]
      }
    ],
    2: [ // Prague
      {
        id: "prg-rest-1",
        name: "U Fleků",
        cuisine: ["Czech", "Traditional"],
        rating: 4.3,
        priceRange: "$$",
        avgPrice: 25,
        image: "🍺",
        location: "New Town",
        distance: "0.5 km from Wenceslas Square",
        openHours: "9:00 AM - 11:00 PM",
        specialties: ["Goulash", "Pork Knuckle", "Dark Beer"],
        features: ["brewery", "traditional", "historic", "beer garden"],
        description: "Historic brewery restaurant from 1499 serving traditional Czech cuisine with their famous dark beer.",
        photos: ["🍺", "🥩", "🥨", "🏰"],
        reviews: {
          total: 5647,
          rating: 4.3,
          recentReview: "Amazing goulash and the darkest beer I've ever had! Great atmosphere with live music."
        },
        availability: {
          today: ["12:00 PM", "1:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"],
          tomorrow: ["11:00 AM", "12:00 PM", "1:00 PM", "6:00 PM", "7:00 PM"]
        },
        reservationRequired: true,
        phone: "+420 224 934 019",
        menuHighlights: ["Bohemian Goulash", "Roasted Pork Knuckle", "Svíčková", "Kozel Dark"],
        dietary: ["limited vegetarian"],
        ambiance: ["traditional", "lively", "historic"],
        dealType: "popular"
      },
      {
        id: "prg-rest-2",
        name: "Lokál",
        cuisine: ["Czech", "Modern"],
        rating: 4.5,
        priceRange: "$$",
        avgPrice: 18,
        image: "🥩",
        location: "Old Town",
        distance: "0.3 km from Old Town Square",
        openHours: "11:30 AM - 1:00 AM",
        specialties: ["Fresh Beer", "Schnitzel", "Modern Czech"],
        features: ["modern czech", "fresh beer", "trendy", "local favorite"],
        description: "Modern take on traditional Czech cuisine with the freshest beer in Prague and contemporary atmosphere.",
        photos: ["🥩", "🍺", "🥗", "🏢"],
        reviews: {
          total: 2934,
          rating: 4.5,
          recentReview: "Best schnitzel and incredibly fresh beer. Modern twist on Czech classics!"
        },
        availability: {
          today: ["12:00 PM", "1:00 PM", "2:00 PM", "7:00 PM", "8:00 PM"],
          tomorrow: ["12:00 PM", "1:00 PM", "2:00 PM", "6:00 PM", "7:00 PM"]
        },
        reservationRequired: false,
        phone: "+420 222 316 265",
        menuHighlights: ["Wiener Schnitzel", "Beef Tartare", "Pilsner Urquell", "Roasted Duck"],
        dietary: ["vegetarian options"],
        ambiance: ["modern", "casual", "trendy"]
      }
    ],
    3: [ // Lisbon
      {
        id: "lis-rest-1",
        name: "Taberna Real do Fado",
        cuisine: ["Portuguese", "Traditional"],
        rating: 4.6,
        priceRange: "$$$",
        avgPrice: 45,
        image: "🎵",
        location: "Alfama",
        distance: "1.0 km from city center",
        openHours: "7:00 PM - 2:00 AM",
        specialties: ["Fado Music", "Bacalhau", "Portuguese Wine"],
        features: ["fado music", "traditional", "romantic", "authentic"],
        description: "Authentic fado house serving traditional Portuguese cuisine while famous fado singers perform.",
        photos: ["🎵", "🐟", "🍷", "🎸"],
        reviews: {
          total: 1876,
          rating: 4.6,
          recentReview: "Incredible fado performance with amazing food. The bacalhau was perfect!"
        },
        availability: {
          today: ["8:00 PM", "9:00 PM", "10:00 PM"],
          tomorrow: ["7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM"]
        },
        reservationRequired: true,
        phone: "+351 21 886 8441",
        menuHighlights: ["Bacalhau à Brás", "Caldo Verde", "Pastéis de Nata", "Vinho Verde"],
        dietary: ["seafood focus", "limited vegetarian"],
        ambiance: ["romantic", "traditional", "intimate"],
        dealType: "special"
      },
      {
        id: "lis-rest-2",
        name: "Time Out Market",
        cuisine: ["International", "Food Court"],
        rating: 4.2,
        priceRange: "$$",
        avgPrice: 15,
        image: "🍽️",
        location: "Cais do Sodré",
        distance: "1.5 km from city center",
        openHours: "10:00 AM - 2:00 AM",
        specialties: ["Various Cuisines", "Local Chefs", "Food Market"],
        features: ["food court", "variety", "modern", "chef curated"],
        description: "Curated food market featuring dishes from Lisbon's top chefs under one roof.",
        photos: ["🍽️", "🦐", "🥘", "🏪"],
        reviews: {
          total: 8945,
          rating: 4.2,
          recentReview: "Amazing variety! Tried dishes from 5 different chefs. Perfect for groups with different tastes."
        },
        availability: {
          today: ["11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "7:00 PM"],
          tomorrow: ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM"]
        },
        reservationRequired: false,
        phone: "+351 21 395 0274",
        menuHighlights: ["Francesinha", "Bifana", "Pastéis de Bacalhau", "Fresh Seafood"],
        dietary: ["vegetarian options", "vegan options", "gluten-free"],
        ambiance: ["casual", "bustling", "modern"]
      }
    ],
    4: [ // Mexico City
      {
        id: "mex-rest-1",
        name: "Pujol",
        cuisine: ["Mexican", "Fine Dining"],
        rating: 4.9,
        priceRange: "$$$$",
        avgPrice: 120,
        image: "🌟",
        location: "Polanco",
        distance: "8 km from city center",
        openHours: "1:00 PM - 12:00 AM",
        specialties: ["Modern Mexican", "Mole", "Tasting Menu"],
        features: ["michelin starred", "tasting menu", "modern mexican", "creative"],
        description: "World-renowned restaurant by Chef Enrique Olvera, redefining Mexican cuisine with innovative techniques.",
        photos: ["🌟", "🌽", "🌶️", "🎨"],
        reviews: {
          total: 3456,
          rating: 4.9,
          recentReview: "Life-changing meal! The mole aged 1000 days is absolutely incredible. Worth every peso!"
        },
        availability: {
          today: ["2:00 PM", "8:00 PM"],
          tomorrow: ["1:00 PM", "2:00 PM", "7:00 PM", "8:00 PM"]
        },
        reservationRequired: true,
        phone: "+52 55 5545 4111",
        menuHighlights: ["Mole Madre", "Baby Corn", "Escamoles", "Street Food Tasting"],
        dietary: ["vegetarian options", "gluten-free options"],
        ambiance: ["sophisticated", "modern", "intimate"],
        dealType: "special"
      },
      {
        id: "mex-rest-2",
        name: "Tacos El Califa de León",
        cuisine: ["Mexican", "Street Food"],
        rating: 4.7,
        priceRange: "$",
        avgPrice: 5,
        image: "🌮",
        location: "Roma Norte",
        distance: "3 km from city center",
        openHours: "11:00 AM - 2:00 AM",
        specialties: ["Tacos al Pastor", "Street Tacos", "Suadero"],
        features: ["street food", "authentic", "late night", "local favorite"],
        description: "Legendary taco stand serving some of the best al pastor in Mexico City since 1968.",
        photos: ["🌮", "🥩", "🍍", "🌶️"],
        reviews: {
          total: 12847,
          rating: 4.7,
          recentReview: "The al pastor is unreal! Perfectly seasoned with fresh pineapple. Best tacos in CDMX!"
        },
        availability: {
          today: ["12:00 PM", "1:00 PM", "2:00 PM", "8:00 PM", "9:00 PM"],
          tomorrow: ["11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "8:00 PM"]
        },
        reservationRequired: false,
        phone: "+52 55 5564 7799",
        menuHighlights: ["Tacos al Pastor", "Suadero", "Campechana", "Gringa"],
        dietary: ["limited vegetarian"],
        ambiance: ["casual", "authentic", "bustling"],
        dealType: "popular"
      }
    ]
  };

  return baseRestaurants[destinationId] || baseRestaurants[1];
};

const featureIcons: Record<string, React.ReactElement> = {
  "fine dining": <ChefHat className="h-4 w-4" />,
  "vegetarian": <span className="text-xs">🥗</span>,
  "coffee": <Coffee className="h-4 w-4" />,
  "wine pairing": <Wine className="h-4 w-4" />,
  "outdoor seating": <span className="text-xs">🪑</span>,
  "authentic": <span className="text-xs">🏛️</span>,
  "modern": <span className="text-xs">🏢</span>,
  "romantic": <span className="text-xs">💕</span>
};

export function RestaurantBooking({ destination }: RestaurantBookingProps) {
  const router = useRouter();
  const [restaurants] = useState<RestaurantOption[]>(getRestaurantsForDestination(destination.id));
  const [searchFilters, setSearchFilters] = useState({
    date: "",
    time: "",
    guests: 2,
    cuisine: "",
    priceRange: "",
    maxPrice: 100,
    minRating: 3
  });
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

  const toggleFavorite = (restaurantId: string) => {
    const newFavorites = new Set(favorites);
    if (favorites.has(restaurantId)) {
      newFavorites.delete(restaurantId);
    } else {
      newFavorites.add(restaurantId);
    }
    setFavorites(newFavorites);
  };

  const filteredRestaurants = restaurants.filter(restaurant => {
    const priceMatch = searchFilters.priceRange ? restaurant.priceRange === searchFilters.priceRange : true;
    const cuisineMatch = searchFilters.cuisine ? restaurant.cuisine.some(c => c.toLowerCase().includes(searchFilters.cuisine.toLowerCase())) : true;
    return restaurant.avgPrice <= searchFilters.maxPrice && 
           restaurant.rating >= searchFilters.minRating &&
           priceMatch &&
           cuisineMatch;
  });

  const handleReservation = (restaurant: RestaurantOption) => {
    if (restaurant.reservationRequired && (!searchFilters.date || !searchFilters.time)) {
      alert("Please select date and time for reservation");
      return;
    }
    
    const bookingData = {
      type: 'restaurant',
      destination: destination.name,
      restaurant: restaurant,
      date: searchFilters.date,
      time: searchFilters.time,
      guests: searchFilters.guests,
      totalPrice: restaurant.avgPrice * searchFilters.guests
    };
    
    localStorage.setItem('pendingBooking', JSON.stringify(bookingData));
    router.push('/payment');
  };

  const getPriceRangeColor = (priceRange: string) => {
    switch (priceRange) {
      case "$": return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300";
      case "$$": return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300";
      case "$$$": return "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300";
      case "$$$$": return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300";
      default: return "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-white/20 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <UtensilsCrossed className="h-6 w-6" />
          Restaurants in {destination.name}
        </h2>
        
        {/* Search Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <Input
              type="date"
              value={searchFilters.date}
              onChange={(e) => setSearchFilters(prev => ({ ...prev, date: e.target.value }))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Time</label>
            <Input
              type="time"
              value={searchFilters.time}
              onChange={(e) => setSearchFilters(prev => ({ ...prev, time: e.target.value }))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Guests</label>
            <Input
              type="number"
              min="1"
              max="20"
              value={searchFilters.guests}
              onChange={(e) => setSearchFilters(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Cuisine</label>
            <Input
              type="text"
              placeholder="Thai, Italian, etc."
              value={searchFilters.cuisine}
              onChange={(e) => setSearchFilters(prev => ({ ...prev, cuisine: e.target.value }))}
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
          <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Price Range</label>
              <select
                value={searchFilters.priceRange}
                onChange={(e) => setSearchFilters(prev => ({ ...prev, priceRange: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Any price</option>
                <option value="$">$ - Budget</option>
                <option value="$$">$$ - Moderate</option>
                <option value="$$$">$$$ - Expensive</option>
                <option value="$$$$">$$$$ - Fine Dining</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Max Price (per person)</label>
              <Input
                type="range"
                min="5"
                max="200"
                step="5"
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
          Found {filteredRestaurants.length} restaurants
        </p>
        <div className="text-sm text-gray-500">
          Showing results for {searchFilters.guests} guests
        </div>
      </div>

      {/* Restaurant Cards */}
      <div className="space-y-4">
        {filteredRestaurants.map((restaurant) => (
          <Card key={restaurant.id} className="group hover:shadow-lg transition-all duration-300 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Restaurant Image */}
                <div className="lg:w-64 flex-shrink-0">
                  <div className="aspect-video bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900 to-red-900 rounded-lg flex items-center justify-center text-6xl">
                    {restaurant.image}
                  </div>
                  <div className="flex gap-2 mt-2">
                    {restaurant.photos.slice(0, 4).map((photo, index) => (
                      <div key={index} className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded text-lg flex items-center justify-center">
                        {photo}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Restaurant Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold">{restaurant.name}</h3>
                        <Badge className={getPriceRangeColor(restaurant.priceRange)}>
                          {restaurant.priceRange}
                        </Badge>
                        {restaurant.dealType && (
                          <Badge variant={restaurant.dealType === "special" ? "destructive" : "secondary"}>
                            {restaurant.dealType === "special" ? "Special" : 
                             restaurant.dealType === "popular" ? "Popular" : "New"}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {restaurant.location}
                        </div>
                        <span>{restaurant.distance}</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          {restaurant.rating} ({restaurant.reviews.total} reviews)
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {restaurant.cuisine.map((c, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {c}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleFavorite(restaurant.id)}
                        className={favorites.has(restaurant.id) ? "text-red-600" : ""}
                      >
                        <Heart className={`h-4 w-4 ${favorites.has(restaurant.id) ? "fill-red-600" : ""}`} />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    {restaurant.description}
                  </p>

                  {/* Operating Hours */}
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {restaurant.openHours}
                    </span>
                  </div>

                  {/* Specialties */}
                  <div className="mb-3">
                    <h4 className="font-medium text-sm mb-2">Specialties:</h4>
                    <div className="flex flex-wrap gap-1">
                      {restaurant.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {restaurant.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-md text-sm">
                        {featureIcons[feature] || <UtensilsCrossed className="h-4 w-4" />}
                        <span className="capitalize">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Recent Review */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                      &ldquo;{restaurant.reviews.recentReview}&rdquo;
                    </p>
                  </div>

                  {/* Dietary Options */}
                  <div className="flex items-center gap-2 mb-2">
                    {restaurant.dietary.map((diet, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {diet}
                      </Badge>
                    ))}
                  </div>

                  {/* Contact */}
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Phone className="h-4 w-4" />
                    <span>{restaurant.phone}</span>
                  </div>
                </div>

                {/* Pricing and Booking */}
                <div className="lg:w-48 flex-shrink-0">
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      ${restaurant.avgPrice}
                    </div>
                    <div className="text-sm text-gray-500">avg per person</div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-sm font-medium mb-2">
                      {restaurant.reservationRequired ? "Reservation Required" : "Walk-ins Welcome"}
                    </div>
                    {restaurant.reservationRequired && (
                      <div className="text-xs text-amber-600 dark:text-amber-400">
                        <CheckCircle className="h-3 w-3 inline mr-1" />
                        Advance booking recommended
                      </div>
                    )}
                  </div>

                  {/* Available Times */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">Available Today:</h4>
                    <div className="grid grid-cols-2 gap-1 text-xs">
                      {restaurant.availability.today.slice(0, 4).map((time, index) => (
                        <Button key={index} variant="outline" size="sm" className="text-xs h-7">
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Button 
                    onClick={() => handleReservation(restaurant)}
                    className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 mb-2"
                  >
                    {restaurant.reservationRequired ? "Reserve Table" : "Book Now"}
                  </Button>
                  
                  <Button variant="outline" className="w-full text-xs">
                    View Menu & Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRestaurants.length === 0 && (
        <div className="text-center py-12">
          <UtensilsCrossed className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
            No restaurants found
          </h3>
          <p className="text-gray-500">
            Try adjusting your filters or search criteria
          </p>
        </div>
      )}
    </div>
  );
}