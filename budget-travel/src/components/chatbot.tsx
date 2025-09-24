"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, MessageCircle, Sparkles } from "lucide-react"

interface Message {
  id: number
  type: "user" | "bot"
  content: string
  timestamp: Date
}

const suggestedQuestions = [
  "What's the cheapest way to travel to Europe?",
  "Best budget destinations for solo travelers?",
  "How to save money on accommodation?",
  "What should I include in my travel budget?",
  "Best time to book flights for cheaper prices?"
]

export function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      content: "Hi! I'm your AI travel assistant. I can help you find budget-friendly destinations, plan your trip costs, and give you money-saving travel tips. What would you like to know?",
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      type: "user",
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        type: "bot",
        content: getBotResponse(inputMessage),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const getBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase()
    
    if (lowerMessage.includes("budget") || lowerMessage.includes("cheap")) {
      return "For budget travel, I recommend Southeast Asia (Thailand, Vietnam), Eastern Europe (Czech Republic, Poland), or Central America (Guatemala, Mexico). These regions offer great value with accommodation under $30/night and meals under $10. Would you like specific recommendations for any of these areas?"
    }
    
    if (lowerMessage.includes("europe")) {
      return "For budget-friendly Europe, consider Eastern European countries like Czech Republic, Hungary, or Poland. Avoid peak summer season, use budget airlines like Ryanair, stay in hostels or Airbnb, and eat at local markets. A 2-week trip can cost $1000-1500 including flights from the US."
    }
    
    if (lowerMessage.includes("accommodation") || lowerMessage.includes("hotel")) {
      return "To save on accommodation: 1) Book hostels or guesthouses 2) Use Airbnb for longer stays 3) Consider house-sitting or home exchanges 4) Stay slightly outside city centers 5) Book in advance or last-minute for deals. Aim for $20-50/night in budget destinations."
    }
    
    if (lowerMessage.includes("flight") || lowerMessage.includes("booking")) {
      return "Best flight booking tips: 1) Book 6-8 weeks in advance for international flights 2) Use Tuesday/Wednesday for cheapest fares 3) Clear browser cookies 4) Consider budget airlines 5) Be flexible with dates 6) Use flight comparison sites like Skyscanner or Google Flights."
    }
    
    return "That's a great question! Based on your budget and preferences, I can help you find the perfect destination. Could you tell me more about your budget range, travel dates, and what type of experience you're looking for? This will help me give you more personalized recommendations."
  }

  const handleSuggestedQuestion = (question: string) => {
    setInputMessage(question)
  }

  return (
    <Card className="w-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-white/20 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl text-gray-800 dark:text-gray-200">
          <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
            <Bot className="h-5 w-5 text-white" />
          </div>
          AI Travel Assistant
          <Badge variant="secondary" className="ml-auto">
            <Sparkles className="h-3 w-3 mr-1" />
            Beta
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="h-96 overflow-y-auto space-y-4 p-4 bg-gray-50/50 dark:bg-slate-900/50 rounded-lg">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex gap-2 max-w-[80%] ${message.type === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === "user" 
                    ? "bg-blue-600 text-white" 
                    : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                }`}>
                  {message.type === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div className={`p-3 rounded-lg ${
                  message.type === "user" 
                    ? "bg-blue-600 text-white" 
                    : "bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-200 border"
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="flex gap-2 max-w-[80%]">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="p-3 rounded-lg bg-white dark:bg-slate-700 border">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <p className="text-sm text-gray-600 dark:text-gray-400 w-full mb-2">💡 Try asking:</p>
            {suggestedQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs h-8"
                onClick={() => handleSuggestedQuestion(question)}
              >
                {question}
              </Button>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask me about budget travel tips, destinations, or planning advice..."
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 bg-white/90 dark:bg-slate-700/90"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}