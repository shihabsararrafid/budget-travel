/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Script from "next/script";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Sparkles } from "lucide-react";

declare global {
  interface Window {
    ChatBot: {
      init: (config: any) => void;
    };
  }
}

export function ChatBot() {
  const [status, setStatus] = useState("Loading chatbot...");
  const [isLoaded, setIsLoaded] = useState(false);

  const initializeChatBot = () => {
    try {
      if (!window.ChatBot || typeof window.ChatBot.init !== 'function') {
        console.error("ChatBot is not available or init method not found");
        setStatus("❌ ChatBot initialization failed - API not available.");
        return;
      }

      window.ChatBot.init({
        domain: "cmfprpi93lkr2jxgti3mod1q4.agent.pa.smyth.ai",
        isChatOnly: false,
        allowAttachments: true,
        allowImageUpload: true,
        maxFileSize: 10,
        acceptedFileTypes: [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp",
          "application/pdf",
        ],
        introMessage:
          "Hello! I can help you with budget travel planning, destinations, and travel tips. Feel free to upload images of places you want to visit!",
        backgroundColor: "#ffffff",
        primaryColor: "#007bff",
        textColor: "#333333",
        buttonColor: "#28a745",
        enableImagePreview: true,
        imageUploadText: "Upload Image",
        dragAndDropText: "Drag & drop images here",
      });

      setTimeout(() => {
        setStatus(
          "✅ Chatbot with image support loaded successfully! Look for the chat widget in the bottom right corner."
        );
        setIsLoaded(true);
      }, 2000);
    } catch (error) {
      console.error("ChatBot initialization failed:", error);
      setStatus(
        "❌ Failed to load chatbot. Please check the console for errors."
      );
    }
  };

  const handleScriptLoad = () => {
    console.log("ChatBot script loaded successfully");
    // Add a small delay to ensure the ChatBot object is fully initialized
    setTimeout(initializeChatBot, 100);
  };

  const handleScriptError = () => {
    console.error("Failed to load chatbot script");
    setStatus("❌ Failed to load chatbot script.");
  };

  return (
    <>
      <Script
        src="https://cmfprpi93lkr2jxgti3mod1q4.agent.pa.smyth.ai/static/embodiment/chatBot/chatbot-v2.js"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
        onError={handleScriptError}
      />
      
      <Card className="w-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl text-gray-800 dark:text-gray-200">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
              <Bot className="h-5 w-5 text-white" />
            </div>
            AI Travel Assistant
            <Badge variant="secondary" className="ml-auto">
              <Sparkles className="h-3 w-3 mr-1" />
              Enhanced
            </Badge>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div
            id="status"
            className={`p-4 rounded-lg text-center transition-all duration-300 ${
              isLoaded
                ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200"
                : "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200"
            }`}
          >
            {status}
          </div>

          {isLoaded && (
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <div className="bg-gray-50 dark:bg-slate-900/50 rounded-lg p-4">
                <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                  Features Available:
                </h3>
                <ul className="space-y-1">
                  <li>• Budget travel planning and tips</li>
                  <li>• Destination recommendations</li>
                  <li>• Image upload and analysis</li>
                  <li>• File attachments (images, PDFs)</li>
                  <li>• Travel cost estimation</li>
                </ul>
              </div>

              <p className="text-center">
                The chatbot widget should appear in the bottom right corner of
                your screen.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
