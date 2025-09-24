"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  MapPin, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  DollarSign, 
  Calendar, 
  Users, 
  Plane, 
  Hotel, 
  UtensilsCrossed,
  Camera,
  Sparkles,
  Globe
} from "lucide-react"

export default function GetStartedPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    travelStyle: "",
    budgetRange: "",
    destinations: [] as string[],
    travelFrequency: "",
    interests: [] as string[],
    name: "",
    email: ""
  })

  const totalSteps = 4

  const travelStyles = [
    { id: "budget", name: "Budget Explorer", desc: "Maximum value for minimum cost", icon: "💰" },
    { id: "comfort", name: "Comfortable Traveler", desc: "Balance of comfort and affordability", icon: "✈️" },
    { id: "luxury", name: "Luxury on Budget", desc: "Premium experiences at smart prices", icon: "💎" },
    { id: "backpacker", name: "Backpacker", desc: "Adventure-focused minimal spending", icon: "🎒" }
  ]

  const budgetRanges = [
    { id: "500-1000", name: "$500 - $1,000", desc: "Perfect for regional adventures" },
    { id: "1000-2500", name: "$1,000 - $2,500", desc: "Great for international trips" },
    { id: "2500-5000", name: "$2,500 - $5,000", desc: "Premium destinations within reach" },
    { id: "5000+", name: "$5,000+", desc: "Luxury travel with smart planning" }
  ]

  const destinationTypes = [
    { id: "asia", name: "Southeast Asia", icon: "🏯" },
    { id: "europe", name: "Europe", icon: "🏰" },
    { id: "americas", name: "Americas", icon: "🗺️" },
    { id: "africa", name: "Africa", icon: "🦁" },
    { id: "oceania", name: "Oceania", icon: "🏝️" },
    { id: "domestic", name: "Domestic", icon: "🏡" }
  ]

  const interests = [
    { id: "culture", name: "Culture & History", icon: "🏛️" },
    { id: "food", name: "Food & Dining", icon: "🍜" },
    { id: "nature", name: "Nature & Wildlife", icon: "🌿" },
    { id: "adventure", name: "Adventure Sports", icon: "🏔️" },
    { id: "beaches", name: "Beaches & Islands", icon: "🏖️" },
    { id: "cities", name: "City Exploration", icon: "🏙️" },
    { id: "photography", name: "Photography", icon: "📸" },
    { id: "nightlife", name: "Nightlife", icon: "🌃" }
  ]

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFinish = () => {
    console.log("Onboarding completed:", formData)
    // Redirect to dashboard or main app
  }

  const updateFormData = (field: string, value: string | number | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const toggleArrayItem = (field: string, item: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].includes(item)
        ? (prev[field as keyof typeof prev] as string[]).filter(i => i !== item)
        : [...(prev[field as keyof typeof prev] as string[]), item]
    }))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                What&apos;s your travel style?
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Help us personalize your budget travel experience
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {travelStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => updateFormData("travelStyle", style.id)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    formData.travelStyle === style.id
                      ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{style.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                        {style.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {style.desc}
                      </p>
                    </div>
                    {formData.travelStyle === style.id && (
                      <Check className="h-5 w-5 text-blue-600 ml-auto" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                What&apos;s your typical budget range?
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Per trip, including flights, accommodation, and activities
              </p>
            </div>
            
            <div className="space-y-3">
              {budgetRanges.map((range) => (
                <button
                  key={range.id}
                  onClick={() => updateFormData("budgetRange", range.id)}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    formData.budgetRange === range.id
                      ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                        {range.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {range.desc}
                      </p>
                    </div>
                    {formData.budgetRange === range.id && (
                      <Check className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                Where do you love to travel?
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Select all regions that interest you (multiple selections allowed)
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {destinationTypes.map((dest) => (
                <button
                  key={dest.id}
                  onClick={() => toggleArrayItem("destinations", dest.id)}
                  className={`p-4 rounded-lg border-2 text-center transition-all ${
                    formData.destinations.includes(dest.id)
                      ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500"
                  }`}
                >
                  <span className="text-3xl block mb-2">{dest.icon}</span>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                    {dest.name}
                  </h3>
                  {formData.destinations.includes(dest.id) && (
                    <Check className="h-4 w-4 text-blue-600 mx-auto mt-2" />
                  )}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                What interests you most? (Select multiple)
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {interests.map((interest) => (
                  <button
                    key={interest.id}
                    onClick={() => toggleArrayItem("interests", interest.id)}
                    className={`p-3 rounded-lg border text-sm transition-all ${
                      formData.interests.includes(interest.id)
                        ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200"
                        : "border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500"
                    }`}
                  >
                    <span className="mr-2">{interest.icon}</span>
                    {interest.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                Create your account
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Get personalized recommendations and save your favorite destinations
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name
                </label>
                <Input
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => updateFormData("name", e.target.value)}
                  className="bg-white/90 dark:bg-slate-700/90"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  className="bg-white/90 dark:bg-slate-700/90"
                />
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
                <div className="flex items-center gap-3 mb-3">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-blue-800 dark:text-blue-200">
                    Your Personalized Profile
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-blue-600 dark:text-blue-400 font-medium">Travel Style:</span>
                    <p className="text-blue-800 dark:text-blue-200">
                      {travelStyles.find(s => s.id === formData.travelStyle)?.name || "Not selected"}
                    </p>
                  </div>
                  <div>
                    <span className="text-blue-600 dark:text-blue-400 font-medium">Budget Range:</span>
                    <p className="text-blue-800 dark:text-blue-200">
                      {budgetRanges.find(b => b.id === formData.budgetRange)?.name || "Not selected"}
                    </p>
                  </div>
                  <div>
                    <span className="text-blue-600 dark:text-blue-400 font-medium">Regions:</span>
                    <p className="text-blue-800 dark:text-blue-200">
                      {formData.destinations.length} selected
                    </p>
                  </div>
                  <div>
                    <span className="text-blue-600 dark:text-blue-400 font-medium">Interests:</span>
                    <p className="text-blue-800 dark:text-blue-200">
                      {formData.interests.length} selected
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Back to Home */}
        <div className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to BudgetTravel
          </Link>
        </div>

        <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-white/20 shadow-2xl">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                BudgetTravel
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
              <div 
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
            </div>
          </CardHeader>

          <CardContent>
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8 border-t border-gray-200 dark:border-gray-700 mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  onClick={handleNext}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={
                    (currentStep === 1 && !formData.travelStyle) ||
                    (currentStep === 2 && !formData.budgetRange) ||
                    (currentStep === 3 && formData.destinations.length === 0)
                  }
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleFinish}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  disabled={!formData.name || !formData.email}
                >
                  <Globe className="h-4 w-4" />
                  Start Exploring
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
            <Badge variant="outline" className="text-xs bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800">
              ✨ 100% Free
            </Badge>
            <span>•</span>
            <span>No credit card required</span>
            <span>•</span>
            <span>Cancel anytime</span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            By continuing, you agree to our{" "}
            <Link href="/terms" className="text-blue-600 hover:text-blue-700">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-blue-600 hover:text-blue-700">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}