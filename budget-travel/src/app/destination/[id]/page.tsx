"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  Clock,
  DollarSign,
  Star,
  Calendar,
  Route,
  Camera,
  UtensilsCrossed,
  Building,
  Car,
  Info,
  ArrowLeft,
  Plane,
  Hotel,
  Package,
  Users,
} from "lucide-react";

// Import destination data and types from the original component
import { destinations, getAllRoutes } from "./destination-data";
import type { Activity, Destination, RouteOption, DayActivity } from "./destination-data";
import { HotelBooking } from "@/components/hotel-booking";
import { FlightBooking } from "@/components/flight-booking";
import { RestaurantBooking } from "@/components/restaurant-booking";
import { TourGuideBooking } from "@/components/tour-guide-booking";
import { PackageBooking } from "@/components/package-booking";

export default function DestinationPage() {
  const params = useParams();
  const router = useRouter();
  const destinationId = parseInt(params.id as string);

  const [selectedRoute, setSelectedRoute] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<
    "itinerary" | "packages" | "hotels" | "flights" | "restaurants" | "tour-guides"
  >("itinerary");

  const destination = destinations.find((d: Destination) => d.id === destinationId);
  
  // Get routes dynamically based on destination using useMemo for performance
  const routes = useMemo(() => {
    return destination ? getAllRoutes(destination.id) : [];
  }, [destination]);

  useEffect(() => {
    if (!destination) {
      router.push("/");
      return;
    }
  }, [destination, router]);
  useEffect(() => {
    if (!selectedRoute && routes.length > 0) {
      setSelectedRoute(routes[0].id);
    }
  }, [selectedRoute, routes]);
  if (!destination) {
    return null;
  }

  // Get routes dynamically based on destination

  // Set default route if none selected
  const defaultRoute = selectedRoute || routes[0]?.id || "";
  const currentRoute = routes.find((r: RouteOption) => r.id === defaultRoute) || routes[0];

  // Update selected route if it's empty using useEffect to avoid state updates during render

  const currentDay =
    currentRoute?.timeline.find((d: DayActivity) => d.day === selectedDay) ||
    currentRoute?.timeline[0];

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "sightseeing":
        return <Camera className="h-4 w-4" />;
      case "food":
        return <UtensilsCrossed className="h-4 w-4" />;
      case "transport":
        return <Car className="h-4 w-4" />;
      case "accommodation":
        return <Building className="h-4 w-4" />;
      case "activity":
        return <Star className="h-4 w-4" />;
      default:
        return <MapPin className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: Activity["type"]) => {
    switch (type) {
      case "sightseeing":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300";
      case "food":
        return "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300";
      case "transport":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300";
      case "accommodation":
        return "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300";
      case "activity":
        return "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300";
      case "Moderate":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300";
      case "Challenging":
        return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/")}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Destinations
              </Button>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-3">
                  <span className="text-3xl">{destination.image}</span>
                  {destination.name}
                </h1>
                <div className="flex items-center gap-4 mt-1 text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {destination.country}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {destination.rating}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {destination.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    {destination.totalBudget}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-6 py-4">
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === "itinerary" ? "default" : "outline"}
            onClick={() => setActiveTab("itinerary")}
            className="flex items-center gap-2"
          >
            <Route className="h-4 w-4" />
            Itinerary
          </Button>
          <Button
            variant={activeTab === "packages" ? "default" : "outline"}
            onClick={() => setActiveTab("packages")}
            className="flex items-center gap-2"
          >
            <Package className="h-4 w-4" />
            Packages
          </Button>
          <Button
            variant={activeTab === "hotels" ? "default" : "outline"}
            onClick={() => setActiveTab("hotels")}
            className="flex items-center gap-2"
          >
            <Hotel className="h-4 w-4" />
            Hotels
          </Button>
          <Button
            variant={activeTab === "flights" ? "default" : "outline"}
            onClick={() => setActiveTab("flights")}
            className="flex items-center gap-2"
          >
            <Plane className="h-4 w-4" />
            Flights
          </Button>
          <Button
            variant={activeTab === "restaurants" ? "default" : "outline"}
            onClick={() => setActiveTab("restaurants")}
            className="flex items-center gap-2"
          >
            <UtensilsCrossed className="h-4 w-4" />
            Restaurants
          </Button>
          <Button
            variant={activeTab === "tour-guides" ? "default" : "outline"}
            onClick={() => setActiveTab("tour-guides")}
            className="flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            Tour Guides
          </Button>
        </div>

        {/* Tab Content */}
        {activeTab === "itinerary" && (
          <div className="flex gap-6">
            {/* Left Sidebar - Route Selection */}
            <div className="w-96 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-white/20 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Route className="h-5 w-5" />
                Choose Your Route
              </h3>

              <div className="space-y-3">
                {routes.map((route: RouteOption) => (
                  <button
                    key={route.id}
                    onClick={() => {
                      setSelectedRoute(route.id);
                      setSelectedDay(1);
                    }}
                    className={`w-full p-4 rounded-lg border text-left transition-all ${
                      selectedRoute === route.id
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-sm">{route.name}</h4>
                      <Badge className={getDifficultyColor(route.difficulty)}>
                        {route.difficulty}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      {route.duration} • {route.totalCost}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {route.highlights.slice(0, 2).map((highlight: string, index: number) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </button>
                ))}
              </div>

              {/* Day Selection */}
              <div className="mt-6">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Day Timeline
                </h4>
                <div className="space-y-2">
                  {currentRoute?.timeline.map((day: DayActivity) => (
                    <button
                      key={day.day}
                      onClick={() => setSelectedDay(day.day)}
                      className={`w-full p-3 rounded-lg border text-left transition-all ${
                        selectedDay === day.day
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                          : "border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                            selectedDay === day.day
                              ? "bg-blue-600 text-white"
                              : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                          }`}
                        >
                          {day.day}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-medium text-sm truncate">
                            {day.title}
                          </h5>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {day.totalCost}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content - Day Details */}
            <div className="flex-1 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-white/20 rounded-lg p-6">
              {currentDay && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">
                      Day {currentDay.day}: {currentDay.title}
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>💰 {currentDay.totalCost}</span>
                      <span>🚗 {currentDay.transportation}</span>
                      <span>🏨 {currentDay.accommodation}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {currentDay.description}
                  </p>
                </div>
              )}

              {/* Timeline */}
              {currentDay && (
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>

                  <div className="space-y-6">
                    {currentDay.activities.map((activity: Activity, index: number) => (
                      <div
                        key={index}
                        className="relative flex items-start gap-4"
                      >
                        {/* Timeline Dot */}
                        <div
                          className={`relative z-10 w-12 h-12 rounded-full border-4 border-white dark:border-slate-800 flex items-center justify-center ${getActivityColor(
                            activity.type
                          )}`}
                        >
                          {getActivityIcon(activity.type)}
                        </div>

                        {/* Activity Card */}
                        <Card className="flex-1 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-white/20 shadow-md">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                                  {activity.name}
                                </h4>
                                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                                  <span>🕐 {activity.time}</span>
                                  <span>⏱️ {activity.duration}</span>
                                  <span>💵 {activity.cost}</span>
                                </div>
                              </div>
                              <Badge
                                variant="outline"
                                className="text-xs capitalize"
                              >
                                {activity.type}
                              </Badge>
                            </div>

                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                              {activity.description}
                            </p>

                            {activity.tips && (
                              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                                <div className="flex items-start gap-2">
                                  <Info className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                                  <p className="text-sm text-amber-800 dark:text-amber-200">
                                    <strong>Tip:</strong> {activity.tips}
                                  </p>
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Day Navigation */}
              {currentDay && (
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedDay(Math.max(1, selectedDay - 1))}
                    disabled={selectedDay === 1}
                    className="flex items-center gap-2"
                  >
                    ← Previous Day
                  </Button>

                  <Button
                    onClick={() =>
                      setSelectedDay(
                        Math.min(
                          currentRoute?.timeline.length || 1,
                          selectedDay + 1
                        )
                      )
                    }
                    disabled={
                      selectedDay === (currentRoute?.timeline.length || 1)
                    }
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Next Day →
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "packages" && <PackageBooking destination={destination} />}
        {activeTab === "hotels" && <HotelBooking destination={destination} />}
        {activeTab === "flights" && <FlightBooking destination={destination} />}
        {activeTab === "restaurants" && (
          <RestaurantBooking destination={destination} />
        )}
        {activeTab === "tour-guides" && <TourGuideBooking destination={destination} />}
      </div>
    </div>
  );
}
