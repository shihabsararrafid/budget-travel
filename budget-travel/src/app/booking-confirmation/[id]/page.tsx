/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Calendar,
  MapPin,
  Download,
  Share2,
  Mail,
  Phone,
  Plane,
  Hotel,
  Package,
  Star,
  Clock,
  User,
  CreditCard,
  Home,
  Users,
  Award,
  Languages,
} from "lucide-react";

interface BookingData {
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  totalCost: number;
  type: 'package' | 'hotel' | 'flight' | 'tour-guide' | 'restaurant';
  [key: string]: unknown;
}

interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  address?: string;
  firstName?: string;
  lastName?: string;
}

interface ConfirmationData {
  bookingId: string;
  bookingData: BookingData;
  paymentMethod: string;
  personalInfo: PersonalInfo;
  totalPaid: number;
  paymentDate: string;
  status: string;
}

export default function BookingConfirmationPage() {
  const params = useParams();
  const router = useRouter();
  const [confirmationData, setConfirmationData] = useState<ConfirmationData | null>(null);
  const bookingId = params.id as string;

  useEffect(() => {
    // Get booking confirmation data
    const userBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
    const booking = userBookings.find((b: ConfirmationData) => b.bookingId === bookingId);
    
    if (booking) {
      setConfirmationData(booking);
    } else {
      // Redirect if booking not found
      router.push('/');
    }
  }, [bookingId, router]);

  const downloadConfirmation = () => {
    // In a real app, this would generate a PDF
    alert('Downloading confirmation PDF...');
  };

  const shareBooking = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Travel Booking',
        text: `I just booked my trip to ${confirmationData?.bookingData.destination}!`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Booking link copied to clipboard!');
    }
  };

  if (!confirmationData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔄</div>
          <h2 className="text-xl font-semibold mb-2">Loading confirmation...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Success Header */}
      <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-6 py-8 text-center">
          <div className="mb-4">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-green-600 mb-2">Booking Confirmed!</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Your trip to {confirmationData.bookingData.destination} is all set
            </p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <Button onClick={downloadConfirmation} variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
            <Button onClick={shareBooking} variant="outline" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button onClick={() => router.push('/profile')} className="flex items-center gap-2">
              <User className="h-4 w-4" />
              View My Trips
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Booking Summary */}
            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {confirmationData.bookingData.type === 'package' && <Package className="h-5 w-5" />}
                  {confirmationData.bookingData.type === 'hotel' && <Hotel className="h-5 w-5" />}
                  {confirmationData.bookingData.type === 'flight' && <Plane className="h-5 w-5" />}
                  {confirmationData.bookingData.type === 'tour-guide' && <Users className="h-5 w-5" />}
                  Booking Details
                </CardTitle>
                <div className="text-sm text-gray-600">
                  Booking ID: <span className="font-mono font-semibold">{confirmationData.bookingId}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {(confirmationData.bookingData as any).package && (
                  <div className="border rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{(confirmationData.bookingData as any).package?.image || '🏝️'}</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{(confirmationData.bookingData as any).package?.name || 'Travel Package'}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                          {(confirmationData.bookingData as any).package?.description || 'Travel package description'}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="font-medium mb-1">📍 Destination</div>
                            <div>{confirmationData.bookingData.destination || 'Destination'}</div>
                          </div>
                          <div>
                            <div className="font-medium mb-1">⏱️ Duration</div>
                            <div>{(confirmationData.bookingData as any).package?.duration || 'Duration TBD'}</div>
                          </div>
                          <div>
                            <div className="font-medium mb-1">👥 Guests</div>
                            <div>{(confirmationData.bookingData as any).guests || confirmationData.bookingData.travelers || 1} guest(s)</div>
                          </div>
                          <div>
                            <div className="font-medium mb-1">🏨 Rooms</div>
                            <div>{(confirmationData.bookingData as any).rooms || 1} room(s)</div>
                          </div>
                        </div>
                        
                        {(confirmationData.bookingData as any).checkIn && (
                          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className="font-medium mb-1">📅 Check-in</div>
                              <div>{(confirmationData.bookingData as any).checkIn}</div>
                            </div>
                            <div>
                              <div className="font-medium mb-1">📅 Check-out</div>
                              <div>{(confirmationData.bookingData as any).checkOut}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Flight Details */}
                {(confirmationData.bookingData as any).package?.flight && (
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Plane className="h-4 w-4" />
                      Flight Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="font-medium">Airline</div>
                        <div>{(confirmationData.bookingData as any).package?.flight?.airline || 'Airline TBD'}</div>
                      </div>
                      <div>
                        <div className="font-medium">Departure</div>
                        <div>{(confirmationData.bookingData as any).package?.flight?.departure || 'Departure TBD'}</div>
                      </div>
                      <div>
                        <div className="font-medium">Arrival</div>
                        <div>{(confirmationData.bookingData as any).package?.flight?.arrival || 'Arrival TBD'}</div>
                      </div>
                      <div>
                        <div className="font-medium">Duration</div>
                        <div>{(confirmationData.bookingData as any).package?.flight?.duration || 'Duration TBD'}</div>
                      </div>
                      <div>
                        <div className="font-medium">Class</div>
                        <div>{(confirmationData.bookingData as any).package?.flight?.class || 'Economy'}</div>
                      </div>
                      <div>
                        <div className="font-medium">Stops</div>
                        <div>{((confirmationData.bookingData as any).package?.flight?.stops === 0 ? 'Non-stop' : `${(confirmationData.bookingData as any).package?.flight?.stops || 0} stop`) || 'Flight info TBD'}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tour Guide Details */}
                {(confirmationData.bookingData as any).guide && (
                  <div className="border rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{(confirmationData.bookingData as any).guide?.avatar || '👨‍💼'}</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{(confirmationData.bookingData as any).guide?.name || 'Tour Guide'}</h3>
                        <div className="flex items-center gap-1 mb-2">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{(confirmationData.bookingData as any).guide?.rating || 4.5} ({(confirmationData.bookingData as any).guide?.reviews || 0} reviews)</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                          {(confirmationData.bookingData as any).guide?.description || 'Professional tour guide'}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="font-medium mb-1">📍 Location</div>
                            <div>{(confirmationData.bookingData as any).guide?.location || 'Local area'}</div>
                          </div>
                          <div>
                            <div className="font-medium mb-1">⏱️ Duration</div>
                            <div>{(confirmationData.bookingData as any).duration === 'half-day' ? 'Half Day (4 hours)' : (confirmationData.bookingData as any).duration === 'full-day' ? 'Full Day (8 hours)' : (confirmationData.bookingData as any).duration ? 'Multi-day (2-3 days)' : 'Duration TBD'}</div>
                          </div>
                          <div>
                            <div className="font-medium mb-1">👥 Group Size</div>
                            <div>{(confirmationData.bookingData as any).guests || confirmationData.bookingData.travelers || 1} guest(s)</div>
                          </div>
                          <div>
                            <div className="font-medium mb-1">📅 Tour Date</div>
                            <div>{(confirmationData.bookingData as any).date || 'Date TBD'}</div>
                          </div>
                        </div>
                        
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="font-medium mb-1">Languages</div>
                            <div className="flex flex-wrap gap-1">
                              {((confirmationData.bookingData as any).guide?.languages || []).map((lang: string, index: number) => (
                                <span key={index} className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded text-xs">
                                  {lang}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <div className="font-medium mb-1">Specialties</div>
                            <div className="flex flex-wrap gap-1">
                              {((confirmationData.bookingData as any).guide?.specialties || []).slice(0, 3).map((specialty: string, index: number) => (
                                <span key={index} className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded text-xs">
                                  {specialty}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Hotel Details */}
                {(confirmationData.bookingData as any).package?.hotel && (
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Hotel className="h-4 w-4" />
                      Hotel Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="font-medium">Hotel Name</div>
                          <div>{(confirmationData.bookingData as any).package?.hotel?.name || 'Hotel TBD'}</div>
                        </div>
                        <div>
                          <div className="font-medium">Location</div>
                          <div>{(confirmationData.bookingData as any).package?.hotel?.location || 'Location TBD'}</div>
                        </div>
                        <div>
                          <div className="font-medium">Room Type</div>
                          <div>{(confirmationData.bookingData as any).package?.hotel?.roomType || 'Room Type TBD'}</div>
                        </div>
                        <div>
                          <div className="font-medium">Rating</div>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            {(confirmationData.bookingData as any).package?.hotel?.rating || 4.0}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="font-medium mb-1">Amenities</div>
                        <div>{(confirmationData.bookingData as any).package?.hotel?.amenities?.join(", ") || 'Amenities TBD'}</div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Important Information */}
            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle>Important Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <div className="font-medium">Check-in Information</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Please arrive at the hotel after 3:00 PM for check-in. Early check-in may be available upon request.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Plane className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <div className="font-medium">Flight Information</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Please arrive at the airport at least 2-3 hours before international flights. Check-in online 24 hours before departure.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <div className="font-medium">Local Contact</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Our local partner will contact you 24 hours before your arrival with pickup details and local information.
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Payment Summary */}
            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Booking Total</span>
                  <span className="font-semibold">${(confirmationData.bookingData as any).totalPrice || confirmationData.bookingData.totalCost || '0'}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Payment Method</span>
                  <span className="capitalize">{confirmationData.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Payment Date</span>
                  <span>{new Date(confirmationData.paymentDate).toLocaleDateString()}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold text-green-600">
                  <span>Total Paid</span>
                  <span>${confirmationData.totalPaid}</span>
                </div>
                <div className="text-center">
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Payment Confirmed
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="font-medium">Traveler</div>
                  <div className="text-sm text-gray-600">
                    {confirmationData.personalInfo.firstName} {confirmationData.personalInfo.lastName}
                  </div>
                </div>
                <div>
                  <div className="font-medium flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </div>
                  <div className="text-sm text-gray-600">
                    {confirmationData.personalInfo.email}
                  </div>
                </div>
                <div>
                  <div className="font-medium flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone
                  </div>
                  <div className="text-sm text-gray-600">
                    {confirmationData.personalInfo.phone}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="text-blue-800 dark:text-blue-200">What&apos;s Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-blue-700 dark:text-blue-300">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center mt-0.5">1</div>
                  <div>You&apos;ll receive a confirmation email shortly with all booking details</div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center mt-0.5">2</div>
                  <div>Check-in online for your flight 24 hours before departure</div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center mt-0.5">3</div>
                  <div>Our local partner will contact you with pickup details</div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center mt-0.5">4</div>
                  <div>Enjoy your trip! Contact us anytime for support</div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button onClick={() => router.push('/')} variant="outline" className="w-full">
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <Button onClick={() => router.push('/profile')} className="w-full">
                <User className="h-4 w-4 mr-2" />
                Manage My Trips
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}