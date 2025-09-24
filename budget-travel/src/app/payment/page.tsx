/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  CreditCard,
  Globe,
  Hotel,
  Lock,
  Package,
  Plane,
  Shield,
  Smartphone,
  Star,
  User,
  Users,
  Wallet,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface BookingData {
  type: "package" | "hotel" | "flight" | "restaurant" | "tour-guide";
  destination: string;
  package?: any;
  hotel?: any;
  flight?: any;
  restaurant?: any;
  guide?: any;
  guests: number;
  rooms?: number;
  checkIn?: string;
  checkOut?: string;
  date?: string;
  duration?: string;
  totalPrice: number;
}

export default function PaymentPage() {
  const router = useRouter();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "paypal" | "apple" | "google"
  >("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    // Billing Address
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    // Payment Information
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
    // Preferences
    newsletter: false,
    insurance: false,
    specialRequests: "",
  });

  useEffect(() => {
    // Get booking data from localStorage
    const data = localStorage.getItem("pendingBooking");
    if (data) {
      setBookingData(JSON.parse(data));
    } else {
      // Redirect back if no booking data
      router.push("/");
    }
  }, [router]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const calculateTotalWithExtras = () => {
    if (!bookingData) return 0;
    let total = bookingData.totalPrice;
    if (formData.insurance) {
      total += Math.round(bookingData.totalPrice * 0.05); // 5% insurance
    }
    return total;
  };

  const handlePayment = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Create booking confirmation data
    const confirmationData = {
      bookingId: `BT-${Date.now()}`,
      bookingData,
      paymentMethod,
      personalInfo: formData,
      totalPaid: calculateTotalWithExtras(),
      paymentDate: new Date().toISOString(),
      status: "confirmed",
    };

    // Store in localStorage (in real app, this would go to a database)
    const existingBookings = JSON.parse(
      localStorage.getItem("userBookings") || "[]"
    );
    existingBookings.push(confirmationData);
    localStorage.setItem("userBookings", JSON.stringify(existingBookings));

    // Clear pending booking
    localStorage.removeItem("pendingBooking");

    // Redirect to confirmation page
    router.push(`/booking-confirmation/${confirmationData.bookingId}`);
  };

  if (!bookingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔄</div>
          <h2 className="text-xl font-semibold mb-2">
            Loading booking details...
          </h2>
          <p className="text-gray-600">
            Please wait while we prepare your payment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Lock className="h-6 w-6 text-green-600" />
                Secure Payment
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Complete your booking for {bookingData.destination}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {bookingData.type === "package" && (
                    <Package className="h-5 w-5" />
                  )}
                  {bookingData.type === "hotel" && (
                    <Hotel className="h-5 w-5" />
                  )}
                  {bookingData.type === "flight" && (
                    <Plane className="h-5 w-5" />
                  )}
                  {bookingData.type === "tour-guide" && (
                    <Users className="h-5 w-5" />
                  )}
                  Booking Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">
                    {bookingData.destination}
                  </h3>
                  {bookingData.package && (
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">
                          {bookingData.package.image}
                        </span>
                        <div>
                          <p className="font-medium">
                            {bookingData.package.name}
                          </p>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">
                              {bookingData.package.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <p>{bookingData.package.duration}</p>
                        <p>
                          {bookingData.guests} guest(s) • {bookingData.rooms}{" "}
                          room(s)
                        </p>
                        {bookingData.checkIn && bookingData.checkOut && (
                          <p>
                            {bookingData.checkIn} to {bookingData.checkOut}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Tour Guide Details */}
                  {bookingData.guide && (
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">
                          {bookingData.guide.avatar}
                        </span>
                        <div>
                          <p className="font-medium">
                            {bookingData.guide.name}
                          </p>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">
                              {bookingData.guide.rating} (
                              {bookingData.guide.reviews} reviews)
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <p>
                          Duration:{" "}
                          {bookingData.duration === "half-day"
                            ? "Half Day (4 hours)"
                            : bookingData.duration === "full-day"
                            ? "Full Day (8 hours)"
                            : "Multi-day (2-3 days)"}
                        </p>
                        <p>Group Size: {bookingData.guests} guest(s)</p>
                        {bookingData.date && (
                          <p>Tour Date: {bookingData.date}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Booking Total</span>
                    <span className="font-semibold">
                      ${bookingData.totalPrice}
                    </span>
                  </div>
                  {formData.insurance && (
                    <div className="flex justify-between text-sm">
                      <span>Travel Insurance</span>
                      <span>${Math.round(bookingData.totalPrice * 0.05)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Taxes & Fees</span>
                    <span>Included</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between text-lg font-bold">
                    <span>Total Amount</span>
                    <span className="text-green-600">
                      ${calculateTotalWithExtras()}
                    </span>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                    <Shield className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      Secure & Protected
                    </span>
                  </div>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                    Your payment is encrypted and secure. Free cancellation
                    within 24 hours.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      First Name *
                    </label>
                    <Input
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      placeholder="John"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Last Name *
                    </label>
                    <Input
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email *
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Phone *
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Payment Method Selection */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button
                    onClick={() => setPaymentMethod("card")}
                    className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-all ${
                      paymentMethod === "card"
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <CreditCard className="h-6 w-6" />
                    <span className="text-sm">Card</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod("paypal")}
                    className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-all ${
                      paymentMethod === "paypal"
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <Wallet className="h-6 w-6" />
                    <span className="text-sm">PayPal</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod("apple")}
                    className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-all ${
                      paymentMethod === "apple"
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <Smartphone className="h-6 w-6" />
                    <span className="text-sm">Apple Pay</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod("google")}
                    className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-all ${
                      paymentMethod === "google"
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <Globe className="h-6 w-6" />
                    <span className="text-sm">Google Pay</span>
                  </button>
                </div>

                {/* Card Payment Form */}
                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Card Number *
                      </label>
                      <Input
                        value={formData.cardNumber}
                        onChange={(e) =>
                          handleInputChange("cardNumber", e.target.value)
                        }
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Expiry Date *
                        </label>
                        <Input
                          value={formData.expiryDate}
                          onChange={(e) =>
                            handleInputChange("expiryDate", e.target.value)
                          }
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          CVV *
                        </label>
                        <Input
                          value={formData.cvv}
                          onChange={(e) =>
                            handleInputChange("cvv", e.target.value)
                          }
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Name on Card *
                      </label>
                      <Input
                        value={formData.nameOnCard}
                        onChange={(e) =>
                          handleInputChange("nameOnCard", e.target.value)
                        }
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Other Payment Methods */}
                {paymentMethod !== "card" && (
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">
                      {paymentMethod === "paypal" && "💳"}
                      {paymentMethod === "apple" && "📱"}
                      {paymentMethod === "google" && "🌐"}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      You will be redirected to{" "}
                      {paymentMethod === "paypal"
                        ? "PayPal"
                        : paymentMethod === "apple"
                        ? "Apple Pay"
                        : "Google Pay"}{" "}
                      to complete your payment.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Additional Options */}
            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle>Additional Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Travel Insurance</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Protect your trip with comprehensive coverage (+5% of
                      booking total)
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.insurance}
                    onChange={(e) =>
                      handleInputChange("insurance", e.target.checked)
                    }
                    className="w-5 h-5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Special Requests
                  </label>
                  <textarea
                    value={formData.specialRequests}
                    onChange={(e) =>
                      handleInputChange("specialRequests", e.target.value)
                    }
                    placeholder="Any special requirements or requests..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.newsletter}
                    onChange={(e) =>
                      handleInputChange("newsletter", e.target.checked)
                    }
                    className="w-4 h-4"
                  />
                  <label className="text-sm">
                    Subscribe to our newsletter for travel deals and updates
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Payment Button */}
            <div className="text-center">
              <Button
                onClick={handlePayment}
                disabled={
                  isProcessing ||
                  !formData.firstName ||
                  !formData.lastName ||
                  !formData.email
                }
                className="w-full max-w-md bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-lg py-6"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Processing Payment...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Pay ${calculateTotalWithExtras()} Securely
                  </div>
                )}
              </Button>
              <p className="text-xs text-gray-500 mt-2">
                By completing this booking, you agree to our Terms of Service
                and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
