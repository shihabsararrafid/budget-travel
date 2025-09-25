"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { apiService } from "@/lib/api"
import { 
  MapPin, 
  ArrowLeft,
  FileSpreadsheet,
  DollarSign,
  Globe,
  NotebookPen,
  Save,
  Calendar
} from "lucide-react"

export default function NewCostSheetPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    sheet_name: "",
    tour_place: "",
    currency: "USD",
    status: "draft",
    notes: ""
  })

  const currencies = [
    { code: "USD", name: "US Dollar", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "GBP", name: "British Pound", symbol: "£" },
    { code: "BDT", name: "Bangladeshi Taka", symbol: "৳" },
    { code: "INR", name: "Indian Rupee", symbol: "₹" },
    { code: "JPY", name: "Japanese Yen", symbol: "¥" },
    { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
    { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  ]

  const statuses = [
    { value: "draft", label: "Draft", description: "Planning stage - not yet finalized" },
    { value: "active", label: "Active", description: "Currently tracking expenses" },
    { value: "completed", label: "Completed", description: "Trip finished, final expenses recorded" }
  ]

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const response = await apiService.createCostSheet(formData)
      console.log("Cost sheet created:", response)
      router.push(`/cost-sheets/${response.id}`)
    } catch (error) {
      console.error("Failed to create cost sheet:", error)
      alert("Failed to create cost sheet. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    router.push("/cost-sheets")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <div className="border-b border-white/20 bg-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  BudgetTravel
                </span>
              </Link>
              <span className="text-gray-400 dark:text-gray-500">•</span>
              <Link href="/cost-sheets" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">
                Cost Sheets
              </Link>
              <span className="text-gray-400 dark:text-gray-500">•</span>
              <span className="text-gray-600 dark:text-gray-400 font-medium">New</span>
            </div>
            
            <Link 
              href="/cost-sheets"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Cost Sheets
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
              <FileSpreadsheet className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Create New Cost Sheet
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Set up a new expense tracking sheet for your upcoming trip
          </p>
        </div>

        <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <NotebookPen className="h-5 w-5 text-blue-600" />
              Trip Details
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Fill in the basic information about your trip
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Sheet Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Sheet Name *
                </label>
                <Input
                  placeholder="e.g., Cox's Bazar Family Trip, Europe Backpacking..."
                  value={formData.sheet_name}
                  onChange={(e) => updateFormData("sheet_name", e.target.value)}
                  className="bg-white/90 dark:bg-slate-700/90"
                  required
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Give your cost sheet a memorable name
                </p>
              </div>

              {/* Tour Place */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Destination *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="e.g., Cox's Bazar, Paris, Tokyo..."
                    value={formData.tour_place}
                    onChange={(e) => updateFormData("tour_place", e.target.value)}
                    className="pl-10 bg-white/90 dark:bg-slate-700/90"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Where are you traveling to?
                </p>
              </div>

              {/* Currency Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Currency *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {currencies.map((currency) => (
                    <button
                      key={currency.code}
                      type="button"
                      onClick={() => updateFormData("currency", currency.code)}
                      className={`p-3 rounded-lg border-2 text-left transition-all ${
                        formData.currency === currency.code
                          ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                          : "border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{currency.symbol}</span>
                        <div>
                          <div className="font-medium text-sm text-gray-900 dark:text-gray-100">
                            {currency.code}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            {currency.name}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status *
                </label>
                <div className="space-y-2">
                  {statuses.map((status) => (
                    <button
                      key={status.value}
                      type="button"
                      onClick={() => updateFormData("status", status.value)}
                      className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                        formData.status === status.value
                          ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                          : "border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm text-gray-900 dark:text-gray-100">
                            {status.label}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            {status.description}
                          </div>
                        </div>
                        {formData.status === status.value && (
                          <Badge className="text-xs bg-blue-100 text-blue-700 border-blue-200">
                            Selected
                          </Badge>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Notes (Optional)
                </label>
                <textarea
                  placeholder="Any additional notes about this trip..."
                  value={formData.notes}
                  onChange={(e) => updateFormData("notes", e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-md bg-white/90 dark:bg-slate-700/90 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Add any relevant details about your trip
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="flex-1 sm:flex-none"
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!formData.sheet_name || !formData.tour_place || isLoading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Create Cost Sheet
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Help Card */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-700">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-800/50 rounded-full">
                <FileSpreadsheet className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-1">
                  What happens next?
                </h3>
                <p className="text-sm text-blue-600 dark:text-blue-300">
                  After creating your cost sheet, you'll be able to add individual expenses, categorize them, 
                  and track your total spending. You can update the status as your trip progresses from 
                  planning to completion.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}