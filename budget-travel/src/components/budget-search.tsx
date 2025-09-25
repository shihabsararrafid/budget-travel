/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Combobox } from "@/components/ui/combobox";
import { popularDestinations, popularCities, getCurrentLocation } from "@/data/locations";
import {
  Search,
  DollarSign,
  Calendar,
  MapPin,
  Users,
  Loader2,
  Plane,
  Hotel,
  MapPin as MapIcon,
  Star,
  Clock,
  UtensilsCrossed,
  Route,
  Info,
  Camera,
  Building,
  Car,
  ArrowLeft,
  Sun,
  Cloud,
  CloudRain,
  Wind,
  Thermometer,
  Droplets,
  Eye,
  TrendingUp,
  PieChart,
  Wallet,
} from "lucide-react";

interface TripPlanData {
  weather_forecast: string;
  itinerary: string;
  cost_summary: string;
}

interface Activity {
  type: "sightseeing" | "food" | "transport" | "accommodation" | "activity";
  name: string;
  time: string;
  duration: string;
  cost: string;
  description: string;
  tips?: string;
}

interface DayActivity {
  day: number;
  title: string;
  description: string;
  totalCost: string;
  transportation: string;
  accommodation: string;
  activities: Activity[];
}

interface TripPlanCard {
  destination: string;
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
  rawData: TripPlanData;
  timeline?: DayActivity[];
}

export function BudgetSearch() {
  const [budget, setBudget] = useState("");
  const [duration, setDuration] = useState("");
  const [travelers, setTravelers] = useState("");
  const [destination, setDestination] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [startingPoint, setStartingPoint] = useState("");
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [tripCard, setTripCard] = useState<TripPlanCard | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"itinerary" | "weather" | "costs">(
    "itinerary"
  );

  // Handle geolocation
  const handleGetCurrentLocation = async () => {
    setIsGettingLocation(true);
    try {
      const currentLocation = await getCurrentLocation();
      setStartingPoint(currentLocation.value);
    } catch (error) {
      console.error("Failed to get current location:", error);
      // Fallback to a default or show error message
    } finally {
      setIsGettingLocation(false);
    }
  };

  // Auto-detect location on component mount (optional)
  useEffect(() => {
    if (!startingPoint && navigator.geolocation) {
      // Optionally auto-detect location on load
      // handleGetCurrentLocation();
    }
  }, [startingPoint]);

  const calculateDateRangeFromDuration = (days: string) => {
    if (!days) return undefined;
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + parseInt(days));
    return { from: startDate, to: endDate };
  };

  const calculateDurationFromDateRange = (dateRange: DateRange | undefined) => {
    if (!dateRange?.from || !dateRange?.to) return "";
    const diffTime = Math.abs(dateRange.to.getTime() - dateRange.from.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays.toString();
  };

  // Helper functions to format the data properly
  const formatWeatherForecast = (weather: any) => {
    if (!weather) return "No weather data available";
    if (typeof weather === "string") return weather;

    if (weather.list && Array.isArray(weather.list)) {
      const city = weather.city?.name || "Unknown";
      const firstForecast = weather.list[0];

      return `🌤️ Weather Forecast for ${city}

Current conditions: ${firstForecast?.weather[0]?.description || "N/A"}
Temperature: ${firstForecast?.main?.temp || "N/A"}°C (feels like ${
        firstForecast?.main?.feels_like || "N/A"
      }°C)
Humidity: ${firstForecast?.main?.humidity || "N/A"}%
Wind: ${firstForecast?.wind?.speed || "N/A"} m/s

5-day forecast shows generally ${weather.list
        .slice(0, 5)
        .map((item: any) => item.weather[0]?.main)
        .join(", ")} conditions.

Perfect weather for your trip! 🌞`;
    }

    return JSON.stringify(weather, null, 2);
  };

  const formatItinerary = (itinerary: any) => {
    if (!itinerary) return "No itinerary available";
    if (typeof itinerary === "string") return itinerary;

    let formatted = `🎒 **Travel Itinerary**\n\n`;
    formatted += `📍 **Destination:** ${itinerary?.trip_summary?.destination || itinerary?.destination || "Unknown"}\n`;
    formatted += `🚀 **Starting Point:** ${itinerary?.trip_summary?.origin || itinerary?.starting_point || "Unknown"}\n`;
    formatted += `📅 **Dates:** ${itinerary?.trip_summary?.dates || `${itinerary?.dates?.start} to ${itinerary?.dates?.end}` || "Not specified"}\n`;
    formatted += `💰 **Total Budget:** ${itinerary?.trip_summary?.total_estimated_cost || `$${itinerary?.total_budget}` || "Not specified"}\n\n`;

    if (itinerary?.transportation?.outbound) {
      formatted += `✈️ **Travel Route**\n`;
      formatted += `- Mode: ${itinerary.transportation.outbound.type}\n`;
      formatted += `- Duration: ${itinerary.transportation.outbound.duration}\n`;
      formatted += `- Cost: ${itinerary.transportation.outbound.cost}\n\n`;
    } else if (itinerary?.travel_route) {
      formatted += `✈️ **Travel Route**\n`;
      formatted += `- Mode: ${itinerary.travel_route.transportation_mode}\n`;
      formatted += `- Duration: ${itinerary.travel_route.duration}\n`;
      formatted += `- Cost: $${itinerary.travel_route.cost}\n`;
      formatted += `- Details: ${itinerary.travel_route.details}\n\n`;
    }

    if (itinerary.daily_itinerary && Array.isArray(itinerary.daily_itinerary)) {
      formatted += `📋 **Daily Itinerary**\n\n`;
      itinerary.daily_itinerary.forEach((day: any) => {
        const dayCost = day.daily_total || day.daily_cost || "0";
        formatted += `**Day ${day.day} - ${day.date}** (Cost: ${dayCost})\n`;
        if (day.activities && Array.isArray(day.activities)) {
          day.activities.forEach((activity: any) => {
            formatted += `  • ${activity.time}: ${activity.activity} at ${activity.location}\n`;
            if (activity.cost && activity.cost !== "Included" && activity.cost !== "$0") {
              formatted += `    Cost: ${activity.cost}\n`;
            }
            if (activity.notes) formatted += `    ${activity.notes}\n`;
          });
        }
        
        // Handle meals if they exist
        if (day.meals) {
          formatted += `  Meals:\n`;
          Object.entries(day.meals).forEach(([mealType, meal]: [string, any]) => {
            formatted += `    ${mealType.charAt(0).toUpperCase() + mealType.slice(1)}: ${meal.restaurant} - ${meal.cost}\n`;
          });
        }
        
        // Handle accommodation if it exists
        if (day.accommodation) {
          formatted += `  Accommodation: ${day.accommodation.hotel} - ${day.accommodation.cost}\n`;
        }
        
        formatted += `\n`;
      });
    }

    if (
      (itinerary?.tips && Array.isArray(itinerary.tips)) ||
      (itinerary?.money_saving_tips && Array.isArray(itinerary.money_saving_tips))
    ) {
      formatted += `💡 **Money Saving Tips**\n`;
      const tips = itinerary.tips || itinerary.money_saving_tips;
      tips.forEach((tip: string, index: number) => {
        formatted += `${index + 1}. ${tip}\n`;
      });
      formatted += `\n`;
    }

    if (
      itinerary.weather_alternatives &&
      Array.isArray(itinerary.weather_alternatives)
    ) {
      formatted += `🌧️ **Weather Alternatives**\n`;
      itinerary.weather_alternatives.forEach((alt: string, index: number) => {
        formatted += `${index + 1}. ${alt}\n`;
      });
    }

    return formatted;
  };

  const formatCostSummary = (costs: any) => {
    if (!costs) return "No cost information available";
    if (typeof costs === "string") return costs;

    // Try to parse nested JSON if it exists
    let nestedData = null;
    if (costs.total_budget_needed) {
      try {
        nestedData = typeof costs.total_budget_needed === 'string' 
          ? JSON.parse(costs.total_budget_needed) 
          : costs.total_budget_needed;
      } catch {
        // If parsing fails, continue without nested data
      }
    }

    const destination = nestedData?.trip_summary?.destination || costs.destination || "your destination";
    const totalBudget = nestedData?.trip_summary?.total_estimated_cost || costs.total_budget;
    const breakdown = nestedData?.budget_breakdown || costs.cost_breakdown;

    let formatted = `💰 **Cost Summary for ${destination}**\n\n`;
    if (totalBudget) {
      formatted += `**Total Budget:** ${totalBudget}\n\n`;
    }

    if (breakdown) {
      formatted += `📊 **Cost Breakdown:**\n`;
      Object.entries(breakdown).forEach(([category, amount]) => {
        formatted += `• ${
          category.charAt(0).toUpperCase() + category.slice(1)
        }: ${amount}\n`;
      });
      formatted += `\n`;
    }

    if (costs.money_saving_tips && Array.isArray(costs.money_saving_tips)) {
      formatted += `💡 **Money Saving Tips:**\n`;
      costs.money_saving_tips.forEach((tip: string, index: number) => {
        formatted += `${index + 1}. ${tip}\n`;
      });
      formatted += `\n`;
    }

    if (
      costs.weather_alternatives &&
      Array.isArray(costs.weather_alternatives)
    ) {
      formatted += `🌧️ **Backup Plans:**\n`;
      costs.weather_alternatives.forEach((alt: string, index: number) => {
        formatted += `${index + 1}. ${alt}\n`;
      });
    }

    return formatted;
  };

  // Helper functions for timeline display
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

  // Parse API response into timeline format
  const parseItineraryToTimeline = (itinerary: any): DayActivity[] => {
    if (
      !itinerary?.daily_itinerary ||
      !Array.isArray(itinerary.daily_itinerary)
    ) {
      return [];
    }

    return itinerary.daily_itinerary.map((day: any, index: number) => {
      const activities: Activity[] = [];

      if (day.activities && Array.isArray(day.activities)) {
        day.activities.forEach((activity: any) => {
          const activityType =
            activity.activity?.toLowerCase().includes("eat") ||
            activity.activity?.toLowerCase().includes("dinner") ||
            activity.activity?.toLowerCase().includes("lunch") ||
            activity.activity?.toLowerCase().includes("food")
              ? "food"
              : activity.activity?.toLowerCase().includes("hotel") ||
                activity.activity?.toLowerCase().includes("check")
              ? "accommodation"
              : activity.activity?.toLowerCase().includes("taxi") ||
                activity.activity?.toLowerCase().includes("transport") ||
                activity.activity?.toLowerCase().includes("flight")
              ? "transport"
              : activity.activity?.toLowerCase().includes("visit") ||
                activity.activity?.toLowerCase().includes("explore") ||
                activity.activity?.toLowerCase().includes("museum")
              ? "sightseeing"
              : "activity";

          activities.push({
            type: activityType as Activity["type"],
            name: activity.activity || `Activity ${activities.length + 1}`,
            time: activity.time || "All day",
            duration: "2-3 hours",
            cost: activity.cost ? `$${activity.cost}` : "$0",
            description:
              activity.notes ||
              `Experience ${activity.activity} at ${activity.location}`,
            tips: activity.notes ? `💡 ${activity.notes}` : undefined,
          });
        });
      }

      return {
        day: day.day || index + 1,
        title: `Day ${day.day || index + 1} - ${day.date || "Exploring"}`,
        description: `Explore and enjoy your ${
          day.day || index + 1
        }${getDayOrdinal(day.day || index + 1)} day in ${
          itinerary?.trip_summary?.destination || itinerary?.destination || "your destination"
        }`,
        totalCost: day.daily_total ? `${day.daily_total}` : "$0",
        transportation: "Local transport",
        accommodation: "Hotel/Accommodation",
        activities,
      };
    });
  };

  const getDayOrdinal = (day: number): string => {
    const suffixes = ["th", "st", "nd", "rd"];
    const v = day % 100;
    return suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
  };

  // Parse weather data for beautiful display
  const parseWeatherData = (weatherData: any) => {
    if (!weatherData) return null;

    let parsedWeather;
    try {
      parsedWeather =
        typeof weatherData === "string" ? JSON.parse(weatherData) : weatherData;
    } catch {
      return null;
    }

    if (parsedWeather.list && Array.isArray(parsedWeather.list)) {
      const currentWeather = parsedWeather.list[0];
      const forecast = parsedWeather.list.slice(0, 5);

      return {
        city: parsedWeather.city?.name || "Unknown",
        current: {
          temp: Math.round(currentWeather.main?.temp || 0),
          feelsLike: Math.round(currentWeather.main?.feels_like || 0),
          description: currentWeather.weather?.[0]?.description || "",
          humidity: currentWeather.main?.humidity || 0,
          windSpeed: currentWeather.wind?.speed || 0,
          visibility: (currentWeather.visibility || 0) / 1000,
          icon: getWeatherIcon(currentWeather.weather?.[0]?.main || "Clear"),
        },
        forecast: forecast.map((day: any) => ({
          date: new Date(day.dt * 1000).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          }),
          temp: Math.round(day.main?.temp || 0),
          description: day.weather?.[0]?.main || "",
          icon: getWeatherIcon(day.weather?.[0]?.main || "Clear"),
        })),
      };
    }

    return null;
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return <Sun className="h-8 w-8 text-yellow-500" />;
      case "clouds":
        return <Cloud className="h-8 w-8 text-gray-500" />;
      case "rain":
        return <CloudRain className="h-8 w-8 text-blue-500" />;
      default:
        return <Sun className="h-8 w-8 text-yellow-500" />;
    }
  };

  // Parse cost data for beautiful display
  const parseCostData = (costData: any, totalBudget: string) => {
    if (!costData) return null;

    let parsedCost;
    try {
      parsedCost =
        typeof costData === "string" ? JSON.parse(costData) : costData;
    } catch {
      return null;
    }

    // Try to parse nested JSON if it exists
    let nestedData = null;
    if (parsedCost.total_budget_needed) {
      try {
        nestedData = typeof parsedCost.total_budget_needed === 'string' 
          ? JSON.parse(parsedCost.total_budget_needed) 
          : parsedCost.total_budget_needed;
      } catch {
        // If parsing fails, continue without nested data
      }
    }

    const budget = parseInt(totalBudget.replace(/\$|,/g, "")) || 0;
    const breakdown = nestedData?.budget_breakdown || parsedCost.cost_breakdown || {};

    const categories = [
      {
        name: "Accommodation",
        value: breakdown.accommodation || 0,
        icon: <Hotel className="h-5 w-5" />,
        color: "bg-blue-500",
      },
      {
        name: "Transportation",
        value: breakdown.transportation || 0,
        icon: <Car className="h-5 w-5" />,
        color: "bg-green-500",
      },
      {
        name: "Food",
        value: breakdown.food || 0,
        icon: <UtensilsCrossed className="h-5 w-5" />,
        color: "bg-orange-500",
      },
      {
        name: "Activities",
        value: breakdown.activities || 0,
        icon: <Star className="h-5 w-5" />,
        color: "bg-purple-500",
      },
    ];

    const total = categories.reduce((sum, cat) => sum + cat.value, 0);

    return {
      total: total,
      budget: budget,
      categories: categories.map((cat) => ({
        ...cat,
        percentage: total > 0 ? Math.round((cat.value / total) * 100) : 0,
      })),
      savings: budget - total,
      tips: nestedData?.tips || parsedCost.money_saving_tips || [],
    };
  };

  const convertToTripCard = (apiResult: any, userInputs: any): TripPlanCard => {
    // Parse JSON strings from the new API response format
    let itinerary, costSummary, weatherForecast;
    
    try {
      itinerary = typeof apiResult.itinerary === 'string' ? JSON.parse(apiResult.itinerary) : apiResult.itinerary;
    } catch {
      itinerary = null;
    }
    
    try {
      costSummary = typeof apiResult.cost_summary === 'string' ? JSON.parse(apiResult.cost_summary) : apiResult.cost_summary;
    } catch {
      costSummary = null;
    }
    
    try {
      weatherForecast = typeof apiResult.weather_forecast === 'string' ? JSON.parse(apiResult.weather_forecast) : apiResult.weather_forecast;
    } catch {
      weatherForecast = null;
    }

    // Extract key information from API response
    // Handle nested JSON in cost_summary.total_budget_needed
    let nestedItinerary = null;
    if (costSummary?.total_budget_needed) {
      try {
        nestedItinerary = typeof costSummary.total_budget_needed === 'string' 
          ? JSON.parse(costSummary.total_budget_needed) 
          : costSummary.total_budget_needed;
      } catch {
        // If parsing fails, keep null
      }
    }
    
    const totalBudget = itinerary?.trip_summary?.total_estimated_cost?.replace(/[\$,]/g, '').split('-')[0] || 
                       nestedItinerary?.trip_summary?.total_estimated_cost?.replace(/[\$,]/g, '').split('-')[0] ||
                       userInputs.budget;
    const destination = itinerary?.trip_summary?.destination || 
                       nestedItinerary?.trip_summary?.destination || 
                       userInputs.destination;
    const startingPoint = itinerary?.trip_summary?.origin || 
                         nestedItinerary?.trip_summary?.origin || 
                         userInputs.startingPoint;
    const costBreakdown = itinerary?.budget_breakdown || 
                         nestedItinerary?.budget_breakdown || 
                         costSummary?.cost_breakdown;

    // Calculate duration
    const tripDuration = userInputs.duration || 7;

    // Determine country and image emoji based on destination
    const getDestinationInfo = (dest: string) => {
      const lower = dest.toLowerCase();
      if (lower.includes("santorini") || lower.includes("greece"))
        return { country: "Greece", image: "🏛️" };
      if (lower.includes("paris") || lower.includes("france"))
        return { country: "France", image: "🗼" };
      if (lower.includes("tokyo") || lower.includes("japan"))
        return { country: "Japan", image: "🗾" };
      if (lower.includes("bali") || lower.includes("indonesia"))
        return { country: "Indonesia", image: "🏝️" };
      if (lower.includes("rome") || lower.includes("italy"))
        return { country: "Italy", image: "🍝" };
      if (lower.includes("london") || lower.includes("uk"))
        return { country: "United Kingdom", image: "🏰" };
      if (lower.includes("amsterdam") || lower.includes("netherlands"))
        return { country: "Netherlands", image: "🌷" };
      return { country: "Unknown", image: "🌍" };
    };

    const destInfo = getDestinationInfo(destination);

    // Generate highlights from itinerary
    const highlights: string[] = [];
    const allItinerary = itinerary || nestedItinerary;
    
    if (allItinerary?.transportation?.outbound?.type) {
      highlights.push(`${allItinerary.transportation.outbound.type} Travel`);
    }
    if (allItinerary?.tips?.length > 0) {
      highlights.push("Budget Tips");
    }
    if (weatherForecast?.city?.name) {
      highlights.push("Weather Forecast");
    }
    if (allItinerary?.daily_itinerary?.length > 0) {
      highlights.push("Daily Itinerary");
    }

    // Extract cost breakdown
    const breakdown = {
      flights: costBreakdown?.transportation
        ? `$${costBreakdown.transportation}`
        : "N/A",
      accommodation: costBreakdown?.accommodation
        ? `$${costBreakdown.accommodation}`
        : "N/A",
      food: costBreakdown?.food ? `$${costBreakdown.food}` : "N/A",
      activities: costBreakdown?.activities
        ? `$${costBreakdown.activities}`
        : "N/A",
    };

    return {
      destination,
      country: destInfo.country,
      image: destInfo.image,
      totalBudget: `$${totalBudget}`,
      duration: `${tripDuration} days`,
      rating: 4.5, // Default rating
      highlights: highlights.slice(0, 3), // Limit to 3 highlights
      breakdown,
      description: `Experience ${destination} with a carefully planned ${tripDuration}-day itinerary from ${startingPoint}. Perfect for your budget of $${totalBudget}.`,
      tags: ["AI Generated", "Personalized", "Budget-Friendly"],
      rawData: {
        weather_forecast: apiResult.weather_forecast || formatWeatherForecast(weatherForecast),
        itinerary: apiResult.itinerary || formatItinerary(allItinerary),
        cost_summary: apiResult.cost_summary || formatCostSummary(costSummary),
      },
      timeline: parseItineraryToTimeline(allItinerary),
    };
  };

  const handleSearch = async () => {
    if (!destination || !budget) {
      setError("Please fill in destination and budget");
      return;
    }

    if (!dateRange?.from || !dateRange?.to) {
      setError("Please select a date range for your trip");
      return;
    }

    setIsLoading(true);
    setError(null);
    setTripCard(null);

    try {
      // Helper function to get display name from value
      const getDisplayName = (value: string, options: any[]) => {
        const option = options.find(opt => opt.value === value);
        return option ? option.label : value;
      };

      const budgetRange = budget.includes("-")
        ? budget
        : `$${budget}-${parseInt(budget) + 500}`;

      const response = await fetch(
        "https://cmfprpi93lkr2jxgti3mod1q4.agent.a.smyth.ai/api/plan_trip",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            starting_point: getDisplayName(startingPoint, popularCities) || "Current Location",
            destination: getDisplayName(destination, popularDestinations),
            start_date: format(dateRange.from, "yyyy-MM-dd"),
            end_date: format(dateRange.to, "yyyy-MM-dd"),
            budget_range: budgetRange,
            preferences: [
              "Budget accommodations",
              "Local attractions",
              "Cultural experiences",
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      // Create trip card for visual display  
      const userInputs = {
        destination: getDisplayName(destination, popularDestinations),
        startingPoint: getDisplayName(startingPoint, popularCities) || "Current Location",
        startDate: format(dateRange.from, "yyyy-MM-dd"),
        endDate: format(dateRange.to, "yyyy-MM-dd"),
        budget: budgetRange.replace("$", "").split("-")[0],
        duration: calculateDurationFromDateRange(dateRange),
      };

      const cardData = convertToTripCard(result, userInputs);
      setTripCard(cardData);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to connect to trip planning service"
      );
      console.error("API Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const budgetRanges = [
    { label: "$500-1000", value: "500-1000" },
    { label: "$1000-2000", value: "1000-2000" },
    { label: "$2000-3000", value: "2000-3000" },
    { label: "$3000+", value: "3000+" },
  ];

  return (
    <>
      <Card className="w-full max-w-4xl mx-auto bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/20 shadow-xl">
        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                Find Your Perfect Budget Destination
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Enter your budget and preferences to discover amazing places you
                can afford
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Starting Point
                </label>
                <div className="flex gap-2">
                  <Combobox
                    options={[...popularCities, ...(startingPoint && startingPoint.includes('current-location') ? [{
                      value: startingPoint,
                      label: "Current Location",
                      category: "Current Location"
                    }] : [])]}
                    value={startingPoint}
                    onValueChange={setStartingPoint}
                    placeholder="Select or search starting point"
                    emptyText="No cities found."
                    className="flex-1 bg-white/90 dark:bg-slate-700/90"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleGetCurrentLocation}
                    disabled={isGettingLocation}
                    className="px-3"
                  >
                    {isGettingLocation ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <MapPin className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Destination *
                </label>
                <Combobox
                  options={popularDestinations}
                  value={destination}
                  onValueChange={setDestination}
                  placeholder="Select or search destination"
                  emptyText="No destinations found."
                  className="bg-white/90 dark:bg-slate-700/90"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Budget (USD) *
                </label>
                <Input
                  type="number"
                  placeholder="e.g., 3000"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="bg-white/90 dark:bg-slate-700/90"
                  required
                />
              </div>
            </div>

            {/* Date Range Selection */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                Travel Dates
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Select Date Range *
                  </label>
                  <DatePickerWithRange
                    date={dateRange}
                    onDateChange={(newDateRange) => {
                      setDateRange(newDateRange);
                      if (newDateRange?.from && newDateRange?.to) {
                        setDuration(calculateDurationFromDateRange(newDateRange));
                      }
                    }}
                    className="bg-white/90 dark:bg-slate-700/90"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Duration (days)
                  </label>
                  <Input
                    type="number"
                    placeholder="e.g., 7"
                    value={duration}
                    onChange={(e) => {
                      setDuration(e.target.value);
                      const newDateRange = calculateDateRangeFromDuration(e.target.value);
                      if (newDateRange) {
                        setDateRange(newDateRange);
                      }
                    }}
                    className="bg-white/90 dark:bg-slate-700/90"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Travelers
                </label>
                <Input
                  type="number"
                  placeholder="e.g., 2"
                  value={travelers}
                  onChange={(e) => setTravelers(e.target.value)}
                  className="bg-white/90 dark:bg-slate-700/90"
                />
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Quick Budget Ranges:
              </p>
              <div className="flex flex-wrap gap-2">
                {budgetRanges.map((range) => (
                  <Badge
                    key={range.value}
                    variant="outline"
                    className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                    onClick={() => setBudget(range.value)}
                  >
                    {range.label}
                  </Badge>
                ))}
              </div>
            </div>

            {error && (
              <div
                className={`${
                  error.includes("sample data")
                    ? "bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800"
                    : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                } rounded-lg p-4`}
              >
                <p
                  className={`${
                    error.includes("sample data")
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-red-600 dark:text-red-400"
                  } text-sm`}
                >
                  {error}
                </p>
              </div>
            )}

            <Button
              onClick={handleSearch}
              size="lg"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Planning Your Trip...
                </>
              ) : (
                <>
                  <Search className="h-5 w-5 mr-2" />
                  Search Destinations
                </>
              )}
            </Button>

            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              <p>
                💡 Tip: Include flights, accommodation, food, and activities in
                your budget
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trip Plan Results as Destination Card */}
      {tripCard && (
        <div className="w-full max-w-4xl mx-auto mt-8">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              🎉 Your AI-Generated Trip Plan
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Here&apos;s your personalized travel itinerary
            </p>
          </div>

          <Card className="group hover:shadow-2xl transition-all duration-300 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-white/20 overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <span className="text-2xl">{tripCard.image}</span>
                    {tripCard.destination}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="h-4 w-4" />
                    <span>{tripCard.country}</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{tripCard.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {tripCard.totalBudget}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {tripCard.duration}
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {tripCard.description}
              </p>

              <div className="space-y-2">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                  Highlights:
                </h4>
                <div className="flex flex-wrap gap-1">
                  {tripCard.highlights.map((highlight, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {highlight}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Plane className="h-3 w-3" />
                  <span>Flights: {tripCard.breakdown.flights}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Hotel className="h-3 w-3" />
                  <span>Hotel: {tripCard.breakdown.accommodation}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <UtensilsCrossed className="h-3 w-3" />
                  <span>Food: {tripCard.breakdown.food}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <DollarSign className="h-3 w-3" />
                  <span>Activities: {tripCard.breakdown.activities}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {tripCard.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={() => setShowDetailModal(true)}
                >
                  <Route className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  Save for Later
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Detail Modal - Destination Page Style */}
      {showDetailModal &&
        tripCard &&
        (() => {
          const currentDay =
            tripCard.timeline?.find(
              (d: DayActivity) => d.day === selectedDay
            ) || tripCard.timeline?.[0];

          return (
            <div className="fixed inset-0 bg-black/50 z-50 overflow-auto">
              <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
                {/* Header */}
                <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
                  <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowDetailModal(false)}
                          className="flex items-center gap-2"
                        >
                          <ArrowLeft className="h-4 w-4" />
                          Close Details
                        </Button>
                        <div>
                          <h1 className="text-2xl font-bold flex items-center gap-3">
                            <span className="text-3xl">{tripCard.image}</span>
                            {tripCard.destination}
                          </h1>
                          <div className="flex items-center gap-4 mt-1 text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {tripCard.country}
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              {tripCard.rating}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {tripCard.duration}
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              {tripCard.totalBudget}
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
                      variant={
                        activeTab === "itinerary" ? "default" : "outline"
                      }
                      onClick={() => setActiveTab("itinerary")}
                      className="flex items-center gap-2"
                    >
                      <Route className="h-4 w-4" />
                      Itinerary
                    </Button>
                    <Button
                      variant={activeTab === "weather" ? "default" : "outline"}
                      onClick={() => setActiveTab("weather")}
                      className="flex items-center gap-2"
                    >
                      <MapIcon className="h-4 w-4" />
                      Weather
                    </Button>
                    <Button
                      variant={activeTab === "costs" ? "default" : "outline"}
                      onClick={() => setActiveTab("costs")}
                      className="flex items-center gap-2"
                    >
                      <DollarSign className="h-4 w-4" />
                      Costs
                    </Button>
                  </div>

                  {/* Tab Content */}
                  {activeTab === "itinerary" && tripCard.timeline && (
                    <div className="flex gap-6">
                      {/* Left Sidebar - Day Selection */}
                      <div className="w-96 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                          <Calendar className="h-5 w-5" />
                          Day Timeline
                        </h3>
                        <div className="space-y-2">
                          {tripCard.timeline.map((day: DayActivity) => (
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

                      {/* Main Content - Day Details */}
                      <div className="flex-1 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                        {currentDay && (
                          <>
                            <div className="mb-6">
                              <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold">
                                  {currentDay.title}
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

                            {/* Timeline */}
                            <div className="relative">
                              {/* Timeline Line */}
                              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>

                              <div className="space-y-6">
                                {currentDay.activities.map(
                                  (activity: Activity, index: number) => (
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
                                                <span>
                                                  ⏱️ {activity.duration}
                                                </span>
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
                                                  <strong>Tip:</strong>{" "}
                                                  {activity.tips}
                                                </p>
                                              </div>
                                            </div>
                                          )}
                                        </CardContent>
                                      </Card>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>

                            {/* Day Navigation */}
                            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                              <Button
                                variant="outline"
                                onClick={() =>
                                  setSelectedDay(Math.max(1, selectedDay - 1))
                                }
                                disabled={selectedDay === 1}
                                className="flex items-center gap-2"
                              >
                                ← Previous Day
                              </Button>

                              <Button
                                onClick={() =>
                                  setSelectedDay(
                                    Math.min(
                                      tripCard.timeline?.length || 1,
                                      selectedDay + 1
                                    )
                                  )
                                }
                                disabled={
                                  selectedDay ===
                                  (tripCard.timeline?.length || 1)
                                }
                                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                              >
                                Next Day →
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Weather Tab */}
                  {activeTab === "weather" &&
                    (() => {
                      const weatherData = parseWeatherData(
                        tripCard.rawData.weather_forecast
                      );

                      return (
                        <div className="space-y-6">
                          {weatherData ? (
                            <>
                              {/* Current Weather Card */}
                              <Card className="bg-gradient-to-br from-blue-50 to-sky-100 dark:from-blue-900/20 dark:to-sky-900/20 border-blue-200 dark:border-blue-800">
                                <CardHeader>
                                  <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
                                    {weatherData.current.icon}
                                    Current Weather in {weatherData.city}
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                                      <Thermometer className="h-6 w-6 text-red-500" />
                                      <div>
                                        <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                                          {weatherData.current.temp}°C
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                          Feels like{" "}
                                          {weatherData.current.feelsLike}°C
                                        </div>
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                                      <Droplets className="h-6 w-6 text-blue-500" />
                                      <div>
                                        <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                                          {weatherData.current.humidity}%
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                          Humidity
                                        </div>
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                                      <Wind className="h-6 w-6 text-gray-500" />
                                      <div>
                                        <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                                          {weatherData.current.windSpeed} m/s
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                          Wind Speed
                                        </div>
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                                      <Eye className="h-6 w-6 text-purple-500" />
                                      <div>
                                        <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                                          {weatherData.current.visibility} km
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                          Visibility
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="mt-4 p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                    <p className="text-blue-800 dark:text-blue-200 font-medium capitalize">
                                      {weatherData.current.description}
                                    </p>
                                  </div>
                                </CardContent>
                              </Card>

                              {/* 5-Day Forecast */}
                              <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-white/20">
                                <CardHeader>
                                  <CardTitle className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5" />
                                    5-Day Forecast
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="grid grid-cols-5 gap-4">
                                    {weatherData.forecast.map(
                                      (day: any, index: number) => (
                                        <div
                                          key={index}
                                          className="text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                                        >
                                          <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                                            {day.date}
                                          </div>
                                          <div className="flex justify-center mb-2">
                                            {day.icon}
                                          </div>
                                          <div className="text-xl font-bold text-gray-800 dark:text-gray-200">
                                            {day.temp}°C
                                          </div>
                                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            {day.description}
                                          </div>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </CardContent>
                              </Card>
                            </>
                          ) : (
                            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-white/20">
                              <CardContent className="p-6">
                                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                                  <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                    {tripCard.rawData.weather_forecast}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          )}
                        </div>
                      );
                    })()}

                  {/* Costs Tab */}
                  {activeTab === "costs" &&
                    (() => {
                      const costData = parseCostData(
                        tripCard.rawData.cost_summary,
                        tripCard.totalBudget
                      );

                      return (
                        <div className="space-y-6">
                          {costData ? (
                            <>
                              {/* Budget Overview */}
                              <Card className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
                                <CardHeader>
                                  <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
                                    <Wallet className="h-6 w-6" />
                                    Budget Overview
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="grid grid-cols-3 gap-6">
                                    <div className="text-center p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                                      <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                                        ${costData.budget.toLocaleString()}
                                      </div>
                                      <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Total Budget
                                      </div>
                                    </div>
                                    <div className="text-center p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                                        ${costData.total.toLocaleString()}
                                      </div>
                                      <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Estimated Cost
                                      </div>
                                    </div>
                                    <div className="text-center p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                                      <div
                                        className={`text-3xl font-bold mb-1 ${
                                          costData.savings >= 0
                                            ? "text-emerald-600 dark:text-emerald-400"
                                            : "text-red-600 dark:text-red-400"
                                        }`}
                                      >
                                        $
                                        {Math.abs(
                                          costData.savings
                                        ).toLocaleString()}
                                      </div>
                                      <div className="text-sm text-gray-600 dark:text-gray-400">
                                        {costData.savings >= 0
                                          ? "Remaining"
                                          : "Over Budget"}
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>

                              {/* Cost Breakdown */}
                              <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-white/20">
                                <CardHeader>
                                  <CardTitle className="flex items-center gap-2">
                                    <PieChart className="h-6 w-6" />
                                    Cost Breakdown
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-4">
                                    {costData.categories.map(
                                      (category: any, index: number) => (
                                        <div key={index} className="space-y-2">
                                          <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                              <div
                                                className={`p-2 rounded-lg text-white ${category.color}`}
                                              >
                                                {category.icon}
                                              </div>
                                              <div>
                                                <div className="font-medium text-gray-800 dark:text-gray-200">
                                                  {category.name}
                                                </div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                                  $
                                                  {category.value.toLocaleString()}
                                                </div>
                                              </div>
                                            </div>
                                            <div className="text-right">
                                              <div className="font-bold text-gray-800 dark:text-gray-200">
                                                {category.percentage}%
                                              </div>
                                            </div>
                                          </div>
                                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                            <div
                                              className={`h-2 rounded-full ${category.color
                                                .replace("bg-", "bg-")
                                                .replace("-500", "-600")}`}
                                              style={{
                                                width: `${category.percentage}%`,
                                              }}
                                            ></div>
                                          </div>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </CardContent>
                              </Card>

                              {/* Money Saving Tips */}
                              {costData.tips.length > 0 && (
                                <Card className="bg-gradient-to-br from-amber-50 to-yellow-100 dark:from-amber-900/20 dark:to-yellow-900/20 border-amber-200 dark:border-amber-800">
                                  <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
                                      <TrendingUp className="h-6 w-6" />
                                      Money Saving Tips
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-3">
                                      {costData.tips
                                        .slice(0, 5)
                                        .map((tip: string, index: number) => (
                                          <div
                                            key={index}
                                            className="flex items-start gap-3 p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg"
                                          >
                                            <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                                              {index + 1}
                                            </div>
                                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                              {tip}
                                            </p>
                                          </div>
                                        ))}
                                    </div>
                                  </CardContent>
                                </Card>
                              )}
                            </>
                          ) : (
                            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-white/20">
                              <CardContent className="p-6">
                                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                                  <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                    {tripCard.rawData.cost_summary}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          )}
                        </div>
                      );
                    })()}
                </div>
              </div>
            </div>
          );
        })()}
    </>
  );
}
