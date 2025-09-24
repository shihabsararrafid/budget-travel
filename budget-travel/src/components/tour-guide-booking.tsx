"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  User,
  Star,
  MapPin,
  Languages,
  Clock,
  Calendar,
  Users,
  Shield,
  Award,
  MessageCircle,
  Heart,
  Share2,
  CheckCircle,
  Camera,
  Car,
  Plane,
  DollarSign,
} from "lucide-react";
import { Destination } from "@/app/destination/[id]/destination-data";

interface TourGuide {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviews: number;
  experience: string;
  languages: string[];
  specialties: string[];
  pricePerDay: number;
  currency: string;
  description: string;
  verified: boolean;
  responseTime: string;
  location: string;
  availability: {
    [date: string]: boolean;
  };
  photos: string[];
  services: {
    type: string;
    description: string;
    included: boolean;
  }[];
  achievements: string[];
  tourTypes: string[];
}

interface TourGuideBookingProps {
  destination: Destination;
}

const getTourGuidesForDestination = (destinationId: number): TourGuide[] => {
  const guideDatabase: Record<number, TourGuide[]> = {
    1: [ // Bangkok
      {
        id: "guide-bkk-1",
        name: "Somchai Pattana",
        avatar: "👨‍🦱",
        rating: 4.9,
        reviews: 127,
        experience: "8 years",
        languages: ["English", "Thai", "Chinese"],
        specialties: ["Cultural Tours", "Food Tours", "Temple Visits", "Local Markets"],
        pricePerDay: 85,
        currency: "USD",
        description: "Born and raised in Bangkok, I'm passionate about sharing the hidden gems and authentic culture of my city. From bustling markets to serene temples, I'll show you the real Bangkok.",
        verified: true,
        responseTime: "Within 1 hour",
        location: "Bangkok Central",
        availability: {
          "2024-01-15": true,
          "2024-01-16": true,
          "2024-01-17": false,
          "2024-01-18": true,
        },
        photos: ["🏯", "🍜", "🛺", "📸"],
        services: [
          { type: "Transportation", description: "Private car with driver", included: true },
          { type: "Entrance Fees", description: "All temple and attraction fees", included: true },
          { type: "Lunch", description: "Traditional Thai lunch", included: true },
          { type: "Photography", description: "Professional photos of your tour", included: false },
        ],
        achievements: ["Certified Tour Guide", "Cultural Heritage Specialist", "Food Tour Expert"],
        tourTypes: ["Half Day (4 hours)", "Full Day (8 hours)", "Multi-day packages"]
      },
      {
        id: "guide-bkk-2",
        name: "Niran Kultawat",
        avatar: "👨‍💼",
        rating: 4.8,
        reviews: 89,
        experience: "12 years",
        languages: ["English", "Thai", "Japanese", "German"],
        specialties: ["Historical Tours", "Architecture", "Photography Tours", "Off-the-beaten-path"],
        pricePerDay: 95,
        currency: "USD",
        description: "With over a decade of experience, I specialize in Bangkok's rich history and stunning architecture. Perfect for photography enthusiasts and culture lovers.",
        verified: true,
        responseTime: "Within 2 hours",
        location: "Bangkok Historical District",
        availability: {
          "2024-01-15": true,
          "2024-01-16": false,
          "2024-01-17": true,
          "2024-01-18": true,
        },
        photos: ["🏛️", "📷", "🎨", "🌅"],
        services: [
          { type: "Transportation", description: "Private vehicle", included: true },
          { type: "Professional Camera", description: "DSLR camera for guest use", included: true },
          { type: "Historical Guide Book", description: "Detailed historical information", included: true },
          { type: "Drone Photography", description: "Aerial shots (where permitted)", included: false },
        ],
        achievements: ["Licensed Professional Guide", "Photography Instructor", "Historical Society Member"],
        tourTypes: ["Photography Tours", "Historical Walking Tours", "Architecture Focus Tours"]
      }
    ],
    2: [ // Prague
      {
        id: "guide-prg-1",
        name: "Pavel Novák",
        avatar: "👨‍🎓",
        rating: 4.7,
        reviews: 156,
        experience: "10 years",
        languages: ["English", "Czech", "German", "Russian"],
        specialties: ["Medieval History", "Castle Tours", "Beer Culture", "Art & Literature"],
        pricePerDay: 75,
        currency: "USD",
        description: "Historian turned tour guide, I bring Prague's medieval stories to life. From castle legends to beer traditions, discover Prague through local eyes.",
        verified: true,
        responseTime: "Within 3 hours",
        location: "Prague Old Town",
        availability: {
          "2024-01-15": true,
          "2024-01-16": true,
          "2024-01-17": true,
          "2024-01-18": false,
        },
        photos: ["🏰", "🍺", "📚", "⛪"],
        services: [
          { type: "Walking Tour", description: "Expert guided walking tours", included: true },
          { type: "Castle Entry", description: "Priority castle entrance", included: true },
          { type: "Beer Tasting", description: "Traditional Czech beer experience", included: true },
          { type: "Private Transport", description: "Car service between locations", included: false },
        ],
        achievements: ["Certified Historical Guide", "Beer Sommelier", "Published Author"],
        tourTypes: ["Castle Tours", "Beer Culture Tours", "Literary Prague Tours"]
      }
    ],
    3: [ // Lisbon
      {
        id: "guide-lis-1",
        name: "Maria Santos",
        avatar: "👩‍🦱",
        rating: 4.8,
        reviews: 134,
        experience: "7 years",
        languages: ["English", "Portuguese", "Spanish", "French"],
        specialties: ["Coastal Tours", "Fado Music", "Portuguese Cuisine", "Art & Design"],
        pricePerDay: 80,
        currency: "USD",
        description: "Lisbon native with a passion for our beautiful coastal city. I'll show you hidden viewpoints, authentic fado houses, and the best pastéis de nata in town!",
        verified: true,
        responseTime: "Within 1 hour",
        location: "Lisbon Coastal Area",
        availability: {
          "2024-01-15": false,
          "2024-01-16": true,
          "2024-01-17": true,
          "2024-01-18": true,
        },
        photos: ["🌊", "🎵", "🥐", "🎨"],
        services: [
          { type: "Coastal Transport", description: "Scenic coastal route transport", included: true },
          { type: "Fado Experience", description: "Authentic fado house visit", included: true },
          { type: "Food Tastings", description: "Traditional Portuguese delicacies", included: true },
          { type: "Sunset Photography", description: "Professional sunset photo session", included: false },
        ],
        achievements: ["Licensed Cultural Guide", "Fado Music Expert", "Culinary Tour Specialist"],
        tourTypes: ["Coastal Tours", "Cultural Experiences", "Food & Wine Tours"]
      }
    ],
    4: [ // Mexico City
      {
        id: "guide-mex-1",
        name: "Carlos Hernández",
        avatar: "👨‍🍳",
        rating: 4.9,
        reviews: 98,
        experience: "9 years",
        languages: ["English", "Spanish", "French"],
        specialties: ["Authentic Cuisine", "Aztec History", "Street Art", "Local Markets"],
        pricePerDay: 65,
        currency: "USD",
        description: "Former chef turned cultural guide. I'll take you on a culinary journey through Mexico City's rich flavors while exploring our incredible Aztec heritage.",
        verified: true,
        responseTime: "Within 2 hours",
        location: "Mexico City Historic Center",
        availability: {
          "2024-01-15": true,
          "2024-01-16": true,
          "2024-01-17": true,
          "2024-01-18": true,
        },
        photos: ["🌮", "🏛️", "🎨", "🌶️"],
        services: [
          { type: "Food Tour", description: "Authentic street food experience", included: true },
          { type: "Market Visit", description: "Traditional market exploration", included: true },
          { type: "Cooking Class", description: "Learn to make traditional dishes", included: false },
          { type: "Mezcal Tasting", description: "Premium mezcal tasting experience", included: false },
        ],
        achievements: ["Certified Culinary Guide", "Former Professional Chef", "Street Art Expert"],
        tourTypes: ["Food Tours", "Cultural Tours", "Art & History Tours"]
      }
    ]
  };

  return guideDatabase[destinationId] || [];
};

export function TourGuideBooking({ destination }: TourGuideBookingProps) {
  const router = useRouter();
  const [guides] = useState<TourGuide[]>(getTourGuidesForDestination(destination.id));
  const [selectedDate, setSelectedDate] = useState("");
  const [duration, setDuration] = useState("full-day");
  const [guests, setGuests] = useState(2);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [selectedGuide, setSelectedGuide] = useState<TourGuide | null>(null);

  const toggleFavorite = (guideId: string) => {
    const newFavorites = new Set(favorites);
    if (favorites.has(guideId)) {
      newFavorites.delete(guideId);
    } else {
      newFavorites.add(guideId);
    }
    setFavorites(newFavorites);
  };

  const handleBookGuide = (guide: TourGuide) => {
    const bookingData = {
      type: 'tour-guide',
      destination: destination.name,
      guide: guide,
      date: selectedDate,
      duration: duration,
      guests: guests,
      totalPrice: calculatePrice(guide.pricePerDay, duration, guests)
    };
    
    localStorage.setItem('pendingBooking', JSON.stringify(bookingData));
    router.push('/payment');
  };

  const calculatePrice = (basePrice: number, duration: string, guests: number) => {
    let multiplier = 1;
    if (duration === "half-day") multiplier = 0.6;
    if (duration === "multi-day") multiplier = 2.5;
    
    const groupSizeMultiplier = guests > 4 ? 1.2 : 1;
    return Math.round(basePrice * multiplier * groupSizeMultiplier);
  };

  const getDurationLabel = (duration: string) => {
    switch (duration) {
      case "half-day": return "Half Day (4 hours)";
      case "full-day": return "Full Day (8 hours)";
      case "multi-day": return "Multi-day (2-3 days)";
      default: return "Full Day";
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-white/20 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <User className="h-6 w-6" />
          Tour Guides in {destination.name}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Connect with local experts who know the hidden gems and authentic experiences of {destination.name}.
        </p>
        
        {/* Search Form */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tour Date</label>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Duration</label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="half-day">Half Day (4h)</option>
              <option value="full-day">Full Day (8h)</option>
              <option value="multi-day">Multi-day</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Group Size</label>
            <Input
              type="number"
              min="1"
              max="15"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="flex items-end">
            <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
              Search Guides
            </Button>
          </div>
        </div>
      </div>

      {/* Guide Cards */}
      <div className="space-y-6">
        {guides.map((guide) => (
          <Card key={guide.id} className="group hover:shadow-lg transition-all duration-300 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-white/20">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-4xl text-white">
                    {guide.avatar}
                  </div>
                  {guide.verified && (
                    <div className="absolute -bottom-1 -right-1 bg-green-600 rounded-full p-1">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-xl">{guide.name}</CardTitle>
                        {guide.verified && (
                          <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                            <Shield className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          {guide.rating} ({guide.reviews} reviews)
                        </div>
                        <div className="flex items-center gap-1">
                          <Award className="h-4 w-4" />
                          {guide.experience} experience
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {guide.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          {guide.responseTime}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {guide.languages.map((lang, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            <Languages className="h-3 w-3 mr-1" />
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        ${calculatePrice(guide.pricePerDay, duration, guests)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {getDurationLabel(duration)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                {guide.description}
              </p>

              {/* Specialties */}
              <div>
                <h5 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">Specialties:</h5>
                <div className="flex flex-wrap gap-2">
                  {guide.specialties.map((specialty, index) => (
                    <Badge key={index} className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div>
                <h5 className="font-semibold mb-2 text-green-700 dark:text-green-300">What&apos;s Included:</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {guide.services.filter(service => service.included).map((service, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>{service.type}: {service.description}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h5 className="font-semibold mb-2 text-purple-700 dark:text-purple-300">Achievements:</h5>
                <div className="flex flex-wrap gap-2">
                  {guide.achievements.map((achievement, index) => (
                    <Badge key={index} className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                      <Award className="h-3 w-3 mr-1" />
                      {achievement}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Photos */}
              <div>
                <h5 className="font-semibold mb-2">Tour Photos:</h5>
                <div className="flex gap-2">
                  {guide.photos.map((photo, index) => (
                    <div key={index} className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-2xl">
                      {photo}
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleFavorite(guide.id)}
                    className={favorites.has(guide.id) ? "text-red-600" : ""}
                  >
                    <Heart className={`h-4 w-4 ${favorites.has(guide.id) ? "fill-red-600" : ""}`} />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4" />
                    Message
                  </Button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-lg font-semibold">
                      ${calculatePrice(guide.pricePerDay, duration, guests)}
                    </div>
                    <div className="text-xs text-gray-500">
                      for {guests} guest(s)
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleBookGuide(guide)}
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                    disabled={!selectedDate}
                  >
                    Book Guide
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {guides.length === 0 && (
        <div className="text-center py-12">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
            No tour guides available
          </h3>
          <p className="text-gray-500">
            Try selecting a different date or location
          </p>
        </div>
      )}
    </div>
  );
}