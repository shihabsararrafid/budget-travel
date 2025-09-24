"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Calculator, DollarSign, PieChart, TrendingUp, Plane, Hotel, UtensilsCrossed, Camera } from "lucide-react"

interface ExpenseCategory {
  id: string
  name: string
  icon: React.ReactNode
  amount: number
  percentage: number
  color: string
}

export function ExpenseEstimator() {
  const [destination, setDestination] = useState("")
  const [duration, setDuration] = useState("")
  const [travelers, setTravelers] = useState("")
  const [budget, setBudget] = useState("")
  const [showEstimate, setShowEstimate] = useState(false)

  const calculateEstimate = () => {
    setShowEstimate(true)
  }

  const expenseBreakdown: ExpenseCategory[] = [
    {
      id: "flights",
      name: "Flights",
      icon: <Plane className="h-4 w-4" />,
      amount: 450,
      percentage: 30,
      color: "bg-blue-500"
    },
    {
      id: "accommodation",
      name: "Accommodation",
      icon: <Hotel className="h-4 w-4" />,
      amount: 420,
      percentage: 28,
      color: "bg-green-500"
    },
    {
      id: "food",
      name: "Food & Dining",
      icon: <UtensilsCrossed className="h-4 w-4" />,
      amount: 315,
      percentage: 21,
      color: "bg-orange-500"
    },
    {
      id: "activities",
      name: "Activities & Tours",
      icon: <Camera className="h-4 w-4" />,
      amount: 240,
      percentage: 16,
      color: "bg-purple-500"
    },
    {
      id: "misc",
      name: "Miscellaneous",
      icon: <DollarSign className="h-4 w-4" />,
      amount: 75,
      percentage: 5,
      color: "bg-gray-500"
    }
  ]

  const totalEstimate = expenseBreakdown.reduce((sum, category) => sum + category.amount, 0)

  const tips = [
    "Book flights 6-8 weeks in advance for better deals",
    "Consider staying in hostels or Airbnb to save on accommodation",
    "Eat at local restaurants and markets for authentic, affordable meals",
    "Look for free walking tours and city passes for activities",
    "Use public transportation instead of taxis"
  ]

  return (
    <Card className="w-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-white/20 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl text-gray-800 dark:text-gray-200">
          <div className="p-2 bg-gradient-to-r from-green-600 to-blue-600 rounded-full">
            <Calculator className="h-5 w-5 text-white" />
          </div>
          Expense Estimator
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Destination
            </label>
            <Input
              placeholder="e.g., Thailand"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="bg-white/90 dark:bg-slate-700/90"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Duration (days)
            </label>
            <Input
              type="number"
              placeholder="7"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="bg-white/90 dark:bg-slate-700/90"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Travelers
            </label>
            <Input
              type="number"
              placeholder="2"
              value={travelers}
              onChange={(e) => setTravelers(e.target.value)}
              className="bg-white/90 dark:bg-slate-700/90"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Target Budget
            </label>
            <Input
              type="number"
              placeholder="1500"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="bg-white/90 dark:bg-slate-700/90"
            />
          </div>
        </div>

        <Button
          onClick={calculateEstimate}
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
        >
          <Calculator className="h-4 w-4 mr-2" />
          Calculate Estimate
        </Button>

        {showEstimate && (
          <div className="space-y-4 border-t pt-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                ${totalEstimate}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Estimated total cost for {travelers || "2"} travelers, {duration || "7"} days
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <PieChart className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">Cost Breakdown</h4>
              </div>
              
              {expenseBreakdown.map((category) => (
                <div key={category.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {category.icon}
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {category.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {category.percentage}%
                      </Badge>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">
                        ${category.amount}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${category.color}`}
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t pt-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">Money-Saving Tips</h4>
              </div>
              <div className="space-y-2">
                {tips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-green-600"></div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                💡 <strong>Budget Status:</strong> Your target budget of ${budget || "1500"} is{" "}
                {parseInt(budget || "1500") >= totalEstimate ? (
                  <span className="text-green-600 dark:text-green-400 font-semibold">sufficient</span>
                ) : (
                  <span className="text-red-600 dark:text-red-400 font-semibold">
                    ${totalEstimate - parseInt(budget || "1500")} over budget
                  </span>
                )}{" "}
                for this trip.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}