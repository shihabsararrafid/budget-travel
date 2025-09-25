"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiService, type CostSheet } from "@/lib/api";
import {
  Calendar,
  Edit,
  Eye,
  FileSpreadsheet,
  Filter,
  LogOut,
  MapPin,
  Plus,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CostSheetsPage() {
  const router = useRouter();
  const [costSheets, setCostSheets] = useState<CostSheet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    if (!apiService.isAuthenticated()) {
      router.push("/signin");
      return;
    }

    loadCostSheets();
  }, [router]);

  const loadCostSheets = async () => {
    try {
      const sheets = await apiService.getCostSheets();
      setCostSheets(sheets);
    } catch (error) {
      console.error("Failed to load cost sheets:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    apiService.logout();
    router.push("/");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "active":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const filteredSheets = costSheets.filter((sheet) => {
    if (filter === "all") return true;
    return sheet.status === filter;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="flex items-center gap-2 text-blue-600">
          <div className="w-6 h-6 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
          Loading your cost sheets...
        </div>
      </div>
    );
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
              <span className="text-gray-600 dark:text-gray-400 font-medium">
                Cost Sheets
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600 hover:text-red-700"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Your Trip Cost Sheets
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage and track expenses for all your travel adventures
            </p>
          </div>

          <Button
            onClick={() => router.push("/cost-sheets/new")}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Plus className="h-4 w-4" />
            New Cost Sheet
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Filter:
            </span>
          </div>
          {["all", "draft", "active", "completed"].map((status) => (
            <Button
              key={status}
              variant={filter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(status)}
              className={
                filter === status ? "bg-blue-600 hover:bg-blue-700" : ""
              }
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              {status === "all"
                ? ` (${costSheets.length})`
                : ` (${costSheets.filter((s) => s.status === status).length})`}
            </Button>
          ))}
        </div>

        {/* Cost Sheets Grid */}
        {filteredSheets.length === 0 ? (
          <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-white/20">
            <CardContent className="text-center py-12">
              <FileSpreadsheet className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {filter === "all"
                  ? "No cost sheets yet"
                  : `No ${filter} cost sheets`}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {filter === "all"
                  ? "Create your first cost sheet to start tracking travel expenses"
                  : `You don't have any ${filter} cost sheets at the moment`}
              </p>
              {filter === "all" && (
                <Button
                  onClick={() => router.push("/cost-sheets/new")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Cost Sheet
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSheets.map((sheet) => (
              <Card
                key={sheet.id}
                className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-white/20 hover:shadow-lg transition-all duration-200"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                        {sheet.sheet_name}
                      </CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {sheet.tour_place}
                      </p>
                    </div>
                    <Badge
                      className={`text-xs px-2 py-1 ${getStatusColor(
                        sheet.status
                      )}`}
                    >
                      {sheet.status}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Total Amount:
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        {sheet.currency} {sheet.total_amount.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <Calendar className="h-3 w-3" />
                      Created {new Date(sheet.created_at).toLocaleDateString()}
                    </div>

                    {sheet.notes && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {sheet.notes}
                      </p>
                    )}

                    <div className="flex items-center gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/cost-sheets/${sheet.id}`)}
                        className="flex-1 text-xs"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          router.push(`/cost-sheets/${sheet.id}/edit`)
                        }
                        className="flex-1 text-xs"
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
