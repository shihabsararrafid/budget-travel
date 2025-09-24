/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  Camera,
  CreditCard,
  Download,
  Edit,
  Globe,
  Heart,
  MapPin,
  Package,
  Settings,
  Shield,
  Star,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  memberSince: string;
  totalTrips: number;
  countriesVisited: number;
  favoriteDestinations: string[];
  travelPreferences: {
    budgetRange: string;
    travelStyle: string;
    accommodationType: string;
    activities: string[];
  };
}

interface BookingData {
  bookingId: string;
  bookingData: any;
  paymentMethod: string;
  personalInfo: any;
  totalPaid: number;
  paymentDate: string;
  status: "confirmed" | "completed" | "cancelled";
}

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "overview" | "trips" | "favorites" | "settings"
  >("overview");
  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "👤",
    memberSince: "2023-01-15",
    totalTrips: 0,
    countriesVisited: 0,
    favoriteDestinations: [],
    travelPreferences: {
      budgetRange: "$500-$1500",
      travelStyle: "Adventure",
      accommodationType: "Hotels",
      activities: ["Sightseeing", "Food Tours", "Cultural Sites"],
    },
  });
  const [userBookings, setUserBookings] = useState<BookingData[]>([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // Load user bookings from localStorage
    const bookings = JSON.parse(localStorage.getItem("userBookings") || "[]");
    setUserBookings(bookings);

    // Update profile stats based on bookings
    const completedTrips = bookings.filter(
      (b: BookingData) => b.status === "completed"
    ).length;
    const uniqueDestinations = [
      ...new Set(bookings.map((b: BookingData) => b.bookingData.destination)),
    ].filter((dest): dest is string => typeof dest === 'string');

    setUserProfile((prev) => ({
      ...prev,
      totalTrips: completedTrips,
      countriesVisited: uniqueDestinations.length,
      favoriteDestinations: uniqueDestinations.slice(0, 3),
    }));
  }, []);

  const upcomingTrips = userBookings.filter((booking) => {
    const tripDate = new Date(
      booking.bookingData.checkIn || booking.paymentDate
    );
    return tripDate > new Date() && booking.status === "confirmed";
  });

  const pastTrips = userBookings.filter((booking) => {
    const tripDate = new Date(
      booking.bookingData.checkIn || booking.paymentDate
    );
    return tripDate <= new Date() || booking.status === "completed";
  });

  const handleProfileUpdate = () => {
    // In a real app, this would save to a database
    setEditMode(false);
    alert("Profile updated successfully!");
  };

  const cancelBooking = (bookingId: string) => {
    const updatedBookings = userBookings.map((booking) =>
      booking.bookingId === bookingId
        ? { ...booking, status: "cancelled" as const }
        : booking
    );
    setUserBookings(updatedBookings);
    localStorage.setItem("userBookings", JSON.stringify(updatedBookings));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
            <div className="relative mx-auto sm:mx-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl sm:text-4xl text-white">
                {userProfile.avatar}
              </div>
              <button
                className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 text-white hover:bg-blue-700"
                aria-label="Change profile picture"
                type="button"
              >
                <Camera className="h-3 w-3 sm:h-4 sm:w-4" />
              </button>
            </div>
            <div className="flex-1 w-full">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                    {userProfile.firstName} {userProfile.lastName}
                  </h1>
                  <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-gray-600 dark:text-gray-400 mb-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Member since{" "}
                      {new Date(userProfile.memberSince).getFullYear()}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {userProfile.countriesVisited} countries visited
                    </div>
                    <div className="flex items-center gap-1">
                      <Package className="h-4 w-4" />
                      {userProfile.totalTrips} trips completed
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => setEditMode(!editMode)}
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  {editMode ? "Cancel" : "Edit Profile"}
                </Button>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mt-4">
                <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  <CardContent className="p-3 sm:p-4 text-center">
                    <div className="text-xl sm:text-2xl font-bold">
                      {upcomingTrips.length}
                    </div>
                    <div className="text-xs sm:text-sm opacity-90">
                      Upcoming Trips
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-r from-green-500 to-teal-600 text-white">
                  <CardContent className="p-3 sm:p-4 text-center">
                    <div className="text-xl sm:text-2xl font-bold">
                      {pastTrips.length}
                    </div>
                    <div className="text-xs sm:text-sm opacity-90">
                      Past Trips
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
                  <CardContent className="p-3 sm:p-4 text-center">
                    <div className="text-xl sm:text-2xl font-bold">
                      {userProfile.favoriteDestinations.length}
                    </div>
                    <div className="text-xs sm:text-sm opacity-90">
                      Favorite Places
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
                  <CardContent className="p-3 sm:p-4 text-center">
                    <div className="text-xl sm:text-2xl font-bold">4.8</div>
                    <div className="text-xs sm:text-sm opacity-90">
                      Travel Rating
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto">
          <Button
            variant={activeTab === "overview" ? "default" : "outline"}
            onClick={() => setActiveTab("overview")}
            className="flex items-center gap-2 text-sm whitespace-nowrap"
            size="sm"
          >
            <User className="h-4 w-4" />
            Overview
          </Button>
          <Button
            variant={activeTab === "trips" ? "default" : "outline"}
            onClick={() => setActiveTab("trips")}
            className="flex items-center gap-2 text-sm whitespace-nowrap"
            size="sm"
          >
            <Package className="h-4 w-4" />
            My Trips
          </Button>
          <Button
            variant={activeTab === "favorites" ? "default" : "outline"}
            onClick={() => setActiveTab("favorites")}
            className="flex items-center gap-2 text-sm whitespace-nowrap"
            size="sm"
          >
            <Heart className="h-4 w-4" />
            Favorites
          </Button>
          <Button
            variant={activeTab === "settings" ? "default" : "outline"}
            onClick={() => setActiveTab("settings")}
            className="flex items-center gap-2 text-sm whitespace-nowrap"
            size="sm"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upcoming Trips */}
            <div className="lg:col-span-2">
              <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Upcoming Trips ({upcomingTrips.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {upcomingTrips.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingTrips.slice(0, 3).map((booking) => (
                        <div
                          key={booking.bookingId}
                          className="border rounded-lg p-4"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              <div className="text-2xl">
                                {booking.bookingData.type === "tour-guide"
                                  ? booking.bookingData.guide?.avatar || "👨‍🏫"
                                  : booking.bookingData.package?.image || "🌍"}
                              </div>
                              <div>
                                <h4 className="font-semibold">
                                  {booking.bookingData.destination}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {booking.bookingData.type === "tour-guide"
                                    ? `Tour Guide: ${
                                        booking.bookingData.guide?.name ||
                                        "Private Guide"
                                      }`
                                    : booking.bookingData.package?.name ||
                                      "Trip Package"}
                                </p>
                                <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                                  <span>
                                    📅{" "}
                                    {booking.bookingData.checkIn ||
                                      booking.bookingData.date ||
                                      "Date TBD"}
                                  </span>
                                  <span>
                                    👥 {booking.bookingData.guests} guests
                                  </span>
                                  <span>🆔 {booking.bookingId}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge className={getStatusColor(booking.status)}>
                                {booking.status}
                              </Badge>
                              <div className="text-sm font-semibold mt-1">
                                ${booking.totalPaid}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      {upcomingTrips.length > 3 && (
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => setActiveTab("trips")}
                        >
                          View All Trips
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="font-semibold text-gray-600 dark:text-gray-400 mb-2">
                        No upcoming trips
                      </h3>
                      <p className="text-gray-500 mb-4">
                        Start planning your next adventure!
                      </p>
                      <Button onClick={() => router.push("/")}>
                        Explore Destinations
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions & Stats */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    onClick={() => router.push("/")}
                    className="w-full justify-start"
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    Explore Destinations
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Heart className="h-4 w-4 mr-2" />
                    My Wishlist
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Star className="h-4 w-4 mr-2" />
                    Write Reviews
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Download Invoices
                  </Button>
                </CardContent>
              </Card>

              {/* Travel Preferences */}
              <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Travel Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <div className="font-medium">Budget Range</div>
                    <div className="text-gray-600">
                      {userProfile.travelPreferences.budgetRange}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Travel Style</div>
                    <div className="text-gray-600">
                      {userProfile.travelPreferences.travelStyle}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Accommodation</div>
                    <div className="text-gray-600">
                      {userProfile.travelPreferences.accommodationType}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Favorite Activities</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {userProfile.travelPreferences.activities.map(
                        (activity, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {activity}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "trips" && (
          <div className="space-y-6">
            {/* Trip Filters */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                All Trips
              </Button>
              <Button variant="outline" size="sm">
                Upcoming
              </Button>
              <Button variant="outline" size="sm">
                Completed
              </Button>
              <Button variant="outline" size="sm">
                Cancelled
              </Button>
            </div>

            {/* All Trips */}
            <div className="space-y-4">
              {userBookings.length > 0 ? (
                userBookings.map((booking) => (
                  <Card
                    key={booking.bookingId}
                    className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-white/20"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="text-4xl">
                            {booking.bookingData.type === "tour-guide"
                              ? booking.bookingData.guide?.avatar || "👨‍🏫"
                              : booking.bookingData.package?.image || "🌍"}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg font-semibold">
                                {booking.bookingData.destination}
                              </h3>
                              <Badge className={getStatusColor(booking.status)}>
                                {booking.status}
                              </Badge>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 mb-2">
                              {booking.bookingData.type === "tour-guide"
                                ? `Tour Guide: ${
                                    booking.bookingData.guide?.name ||
                                    "Private Guide"
                                  }`
                                : booking.bookingData.package?.name ||
                                  "Custom Trip"}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                              <div>
                                <div className="font-medium">Booking ID</div>
                                <div className="text-gray-600 font-mono text-xs sm:text-sm break-all">
                                  {booking.bookingId}
                                </div>
                              </div>
                              <div>
                                <div className="font-medium">Travel Date</div>
                                <div className="text-gray-600">
                                  {booking.bookingData.checkIn ||
                                    new Date(
                                      booking.paymentDate
                                    ).toLocaleDateString()}
                                </div>
                              </div>
                              <div>
                                <div className="font-medium">Guests</div>
                                <div className="text-gray-600">
                                  {booking.bookingData.guests} guest(s)
                                </div>
                              </div>
                              <div>
                                <div className="font-medium">Total Paid</div>
                                <div className="text-gray-600 font-semibold">
                                  ${booking.totalPaid}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row lg:flex-col gap-2 mt-4 lg:mt-0">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              router.push(
                                `/booking-confirmation/${booking.bookingId}`
                              )
                            }
                            className="w-full sm:w-auto lg:w-full"
                          >
                            View Details
                          </Button>
                          {booking.status === "confirmed" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => cancelBooking(booking.bookingId)}
                              className="text-red-600 hover:text-red-700 w-full sm:w-auto lg:w-full"
                            >
                              Cancel
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full sm:w-auto lg:w-full"
                          >
                            <Download className="h-3 w-3 mr-1" />
                            Invoice
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    No trips yet
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Book your first trip to get started!
                  </p>
                  <Button onClick={() => router.push("/")}>
                    Explore Destinations
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "favorites" && (
          <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Favorite Destinations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  No favorites yet
                </h3>
                <p className="text-gray-500 mb-4">
                  Start exploring and save your favorite destinations!
                </p>
                <Button onClick={() => router.push("/")}>
                  Explore Destinations
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "settings" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information */}
            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium mb-1"
                    >
                      First Name
                    </label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={userProfile.firstName}
                      onChange={(e) =>
                        setUserProfile((prev) => ({
                          ...prev,
                          firstName: e.target.value,
                        }))
                      }
                      disabled={!editMode}
                      aria-label="First Name"
                      aria-required="true"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium mb-1"
                    >
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={userProfile.lastName}
                      onChange={(e) =>
                        setUserProfile((prev) => ({
                          ...prev,
                          lastName: e.target.value,
                        }))
                      }
                      disabled={!editMode}
                      aria-label="Last Name"
                      aria-required="true"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={userProfile.email}
                    onChange={(e) =>
                      setUserProfile((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    disabled={!editMode}
                    aria-label="Email Address"
                    aria-required="true"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium mb-1"
                  >
                    Phone
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={userProfile.phone}
                    onChange={(e) =>
                      setUserProfile((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    disabled={!editMode}
                    aria-label="Phone Number"
                  />
                </div>
                {editMode && (
                  <Button onClick={handleProfileUpdate} className="w-full">
                    Save Changes
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Account Settings */}
            <div className="space-y-6">
              <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Email Notifications</div>
                      <div className="text-sm text-gray-600">
                        Booking confirmations and updates
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4"
                      id="emailNotifications"
                      aria-label="Enable email notifications"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">SMS Notifications</div>
                      <div className="text-sm text-gray-600">
                        Flight changes and reminders
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4"
                      id="smsNotifications"
                      aria-label="Enable SMS notifications"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Marketing Emails</div>
                      <div className="text-sm text-gray-600">
                        Travel deals and promotions
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      id="marketingEmails"
                      aria-label="Enable marketing emails"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Privacy & Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Payment Methods
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Download My Data
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-red-600"
                  >
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
