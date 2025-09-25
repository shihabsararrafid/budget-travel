"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { apiService, type CostSheet, type Cost } from "@/lib/api"
import { 
  MapPin, 
  ArrowLeft,
  Plus,
  Calendar,
  DollarSign,
  Edit,
  Trash2,
  Receipt,
  PieChart,
  FileSpreadsheet,
  Save,
  X
} from "lucide-react"

export default function CostSheetDetailPage() {
  const router = useRouter()
  const params = useParams()
  const costSheetId = Number(params?.id)
  
  const [costSheet, setCostSheet] = useState<CostSheet | null>(null)
  const [costs, setCosts] = useState<Cost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddCost, setShowAddCost] = useState(false)
  const [isAddingCost, setIsAddingCost] = useState(false)
  
  const [newCost, setNewCost] = useState({
    cost_type: "",
    cost_description: "",
    amount: "",
    cost_date: new Date().toISOString().split('T')[0]
  })

  const costTypes = [
    { value: "Accommodation", icon: "🏨", color: "bg-blue-100 text-blue-700 border-blue-200" },
    { value: "Transportation", icon: "✈️", color: "bg-green-100 text-green-700 border-green-200" },
    { value: "Food", icon: "🍽️", color: "bg-orange-100 text-orange-700 border-orange-200" },
    { value: "Activities", icon: "🎯", color: "bg-purple-100 text-purple-700 border-purple-200" },
    { value: "Shopping", icon: "🛍️", color: "bg-pink-100 text-pink-700 border-pink-200" },
    { value: "Miscellaneous", icon: "📋", color: "bg-gray-100 text-gray-700 border-gray-200" }
  ]

  useEffect(() => {
    if (!apiService.isAuthenticated()) {
      router.push("/signin")
      return
    }
    
    loadCostSheetData()
  }, [router, costSheetId])

  const loadCostSheetData = async () => {
    try {
      // Load the cost sheet details
      const sheets = await apiService.getCostSheets()
      const sheet = sheets.find(s => s.id === costSheetId)
      
      if (!sheet) {
        router.push("/cost-sheets")
        return
      }
      
      setCostSheet(sheet)
      
      try {
        // Load costs for this cost sheet
        const costs = await apiService.getCostsByCostSheet(costSheetId)
        setCosts(costs || []) // Handle case where costs might be null/undefined
        
        // Update the cost sheet total based on actual costs
        const totalAmount = (costs || []).reduce((sum, cost) => sum + cost.amount, 0)
        setCostSheet(prev => prev ? { ...prev, total_amount: totalAmount } : null)
      } catch (costsError) {
        console.error("Failed to load costs:", costsError)
        // If costs fail to load, just set empty array but don't redirect
        setCosts([])
      }
      
    } catch (error) {
      console.error("Failed to load cost sheet:", error)
      router.push("/cost-sheets")
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddCost = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsAddingCost(true)
    
    try {
      await apiService.createCost({
        cost_sheet_id: costSheetId,
        cost_type: newCost.cost_type,
        cost_description: newCost.cost_description,
        amount: parseFloat(newCost.amount),
        cost_date: newCost.cost_date
      })
      
      // Reload the costs to get the updated list
      const updatedCosts = await apiService.getCostsByCostSheet(costSheetId)
      setCosts(updatedCosts)
      
      // Update the cost sheet total based on actual costs
      const totalAmount = updatedCosts.reduce((sum, cost) => sum + cost.amount, 0)
      setCostSheet(prev => prev ? { ...prev, total_amount: totalAmount } : null)
      
      // Reset form
      setNewCost({
        cost_type: "",
        cost_description: "",
        amount: "",
        cost_date: new Date().toISOString().split('T')[0]
      })
      setShowAddCost(false)
    } catch (error) {
      console.error("Failed to add cost:", error)
      alert("Failed to add cost. Please try again.")
    } finally {
      setIsAddingCost(false)
    }
  }

  const getCostTypeStyle = (costType: string) => {
    const type = costTypes.find(t => t.value === costType)
    return type ? type.color : "bg-gray-100 text-gray-700 border-gray-200"
  }

  const getCostTypeIcon = (costType: string) => {
    const type = costTypes.find(t => t.value === costType)
    return type ? type.icon : "📋"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-700 border-gray-200"
      case "active":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "completed":
        return "bg-green-100 text-green-700 border-green-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="flex items-center gap-2 text-blue-600">
          <div className="w-6 h-6 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
          Loading cost sheet...
        </div>
      </div>
    )
  }

  if (!costSheet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <FileSpreadsheet className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Cost sheet not found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The cost sheet you're looking for doesn't exist or has been deleted.
          </p>
          <Link href="/cost-sheets">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Cost Sheets
            </Button>
          </Link>
        </div>
      </div>
    )
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
              <span className="text-gray-600 dark:text-gray-400 font-medium truncate max-w-32">
                {costSheet.sheet_name}
              </span>
            </div>
            
            <Link 
              href="/cost-sheets"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cost Sheet Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {costSheet.sheet_name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {costSheet.tour_place}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Created {new Date(costSheet.created_at).toLocaleDateString()}
                </div>
                <Badge className={`text-xs px-2 py-1 ${getStatusColor(costSheet.status)}`}>
                  {costSheet.status}
                </Badge>
              </div>
              {costSheet.notes && (
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  {costSheet.notes}
                </p>
              )}
            </div>
            
            <Button
              onClick={() => setShowAddCost(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Expense
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Summary Cards */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-white/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  Total Expenses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                  {costSheet.currency} {costSheet.total_amount.toFixed(2)}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {costs.length} expense{costs.length !== 1 ? 's' : ''} recorded
                </p>
              </CardContent>
            </Card>

            {/* Expense Breakdown by Category */}
            {costs.length > 0 && (
              <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-white/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-blue-600" />
                    By Category
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {costTypes.map(type => {
                      const typeCosts = costs.filter(c => c.cost_type === type.value)
                      const total = typeCosts.reduce((sum, c) => sum + c.amount, 0)
                      
                      if (total === 0) return null
                      
                      return (
                        <div key={type.value} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{type.icon}</span>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {type.value}
                            </span>
                          </div>
                          <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                            {costSheet.currency} {total.toFixed(2)}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Expenses List */}
          <div className="lg:col-span-2">
            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Receipt className="h-5 w-5 text-purple-600" />
                  Expense Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                {costs.length === 0 ? (
                  <div className="text-center py-12">
                    <Receipt className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      No expenses recorded yet
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Start tracking your trip expenses by adding your first cost entry
                    </p>
                    <Button 
                      onClick={() => setShowAddCost(true)}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add First Expense
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {costs.map((cost) => (
                      <div key={cost.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{getCostTypeIcon(cost.cost_type)}</span>
                            <Badge className={`text-xs px-2 py-1 ${getCostTypeStyle(cost.cost_type)}`}>
                              {cost.cost_type}
                            </Badge>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-gray-100">
                              {cost.cost_description}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {new Date(cost.cost_date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="font-semibold text-gray-900 dark:text-gray-100">
                              {costSheet.currency} {cost.amount.toFixed(2)}
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Add Cost Dialog */}
      <Dialog open={showAddCost} onOpenChange={setShowAddCost}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-blue-600" />
              Add New Expense
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleAddCost} className="space-y-4">
            {/* Cost Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Category *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {costTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setNewCost(prev => ({ ...prev, cost_type: type.value }))}
                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                      newCost.cost_type === type.value
                        ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{type.icon}</span>
                      <span className="text-xs font-medium text-gray-900 dark:text-gray-100">
                        {type.value}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Description *
              </label>
              <Input
                placeholder="e.g., Hotel booking, Flight tickets, Lunch..."
                value={newCost.cost_description}
                onChange={(e) => setNewCost(prev => ({ ...prev, cost_description: e.target.value }))}
                required
              />
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Amount ({costSheet.currency}) *
              </label>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={newCost.amount}
                onChange={(e) => setNewCost(prev => ({ ...prev, amount: e.target.value }))}
                required
              />
            </div>

            {/* Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Date *
              </label>
              <Input
                type="date"
                value={newCost.cost_date}
                onChange={(e) => setNewCost(prev => ({ ...prev, cost_date: e.target.value }))}
                required
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddCost(false)}
                className="flex-1"
                disabled={isAddingCost}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!newCost.cost_type || !newCost.cost_description || !newCost.amount || isAddingCost}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isAddingCost ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Adding...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Add Expense
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}