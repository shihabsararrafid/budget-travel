"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Menu, X, MapPin, DollarSign, MessageCircle, Camera } from "lucide-react"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <MapPin className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              BudgetTravel
            </span>
            <Badge variant="secondary" className="text-xs">Beta</Badge>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <a href="#search" className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">
              <DollarSign className="h-4 w-4" />
              <span>Budget Search</span>
            </a>
            <a href="#chat" className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">
              <MessageCircle className="h-4 w-4" />
              <span>Chat Assistant</span>
            </a>
            <a href="#translate" className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">
              <Camera className="h-4 w-4" />
              <span>Image Translate</span>
            </a>
            <Link href="/signin">
              <Button variant="outline" size="sm">Sign In</Button>
            </Link>
            <Link href="/get-started">
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Get Started
              </Button>
            </Link>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <a href="#search" className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800">
              <DollarSign className="h-4 w-4" />
              <span>Budget Search</span>
            </a>
            <a href="#chat" className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800">
              <MessageCircle className="h-4 w-4" />
              <span>Chat Assistant</span>
            </a>
            <a href="#translate" className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800">
              <Camera className="h-4 w-4" />
              <span>Image Translate</span>
            </a>
            <div className="flex space-x-2 px-3 pt-2">
              <Link href="/signin" className="flex-1">
                <Button variant="outline" size="sm" className="w-full">Sign In</Button>
              </Link>
              <Link href="/get-started" className="flex-1">
                <Button size="sm" className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}