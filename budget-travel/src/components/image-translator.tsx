"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Camera, Upload, Image as ImageIcon, Languages, FileText, Loader2 } from "lucide-react"

export function ImageTranslator() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isTranslating, setIsTranslating] = useState(false)
  const [translatedText, setTranslatedText] = useState("")
  const [detectedLanguage, setDetectedLanguage] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleTranslate = async () => {
    if (!selectedImage) return

    setIsTranslating(true)
    
    setTimeout(() => {
      setDetectedLanguage("Spanish")
      setTranslatedText(`Translated text from image:

"Welcome to Barcelona! 
🏛️ Sagrada Familia - Entry: €20
🎨 Park Güell - Entry: €10  
🍽️ Local Tapas Bar - Menu: €15-25
🚇 Metro Day Pass - €8.40
🏨 Budget Hotel - €35-50/night

Opening Hours: 9:00 AM - 6:00 PM
Address: Carrer de Mallorca, 401, Barcelona"

This appears to be tourist information about Barcelona attractions and prices, which would be very helpful for budget planning!`)
      setIsTranslating(false)
    }, 2000)
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const exampleUses = [
    "Menu translations at restaurants",
    "Street signs and directions", 
    "Price tags and receipts",
    "Tourist attraction information",
    "Transportation schedules",
    "Emergency contact information"
  ]

  return (
    <Card className="w-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-white/20 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl text-gray-800 dark:text-gray-200">
          <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full">
            <Languages className="h-5 w-5 text-white" />
          </div>
          Image Translator
          <Badge variant="secondary" className="ml-auto">
            <Camera className="h-3 w-3 mr-1" />
            AI
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="text-center space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Take a photo or upload an image with foreign text, and get instant English translations!
          </p>

          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 transition-colors hover:border-purple-400 dark:hover:border-purple-500">
            {selectedImage ? (
              <div className="space-y-4">
                <img
                  src={selectedImage}
                  alt="Uploaded image"
                  className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
                />
                <div className="flex gap-2 justify-center">
                  <Button
                    onClick={triggerFileInput}
                    variant="outline"
                    size="sm"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Change Image
                  </Button>
                  <Button
                    onClick={handleTranslate}
                    disabled={isTranslating}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    {isTranslating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Translating...
                      </>
                    ) : (
                      <>
                        <Languages className="h-4 w-4 mr-2" />
                        Translate Text
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <ImageIcon className="h-12 w-12 text-gray-400 mx-auto" />
                <div className="space-y-2">
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    Upload an Image
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    JPG, PNG, or WEBP (max 10MB)
                  </p>
                </div>
                <Button
                  onClick={triggerFileInput}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Choose File
                </Button>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {translatedText && (
          <div className="space-y-4 border-t pt-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                Translation Result
              </h4>
              {detectedLanguage && (
                <Badge variant="outline" className="text-xs">
                  Detected: {detectedLanguage}
                </Badge>
              )}
            </div>
            
            <div className="bg-gray-50 dark:bg-slate-900/50 p-4 rounded-lg border">
              <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-sans">
                {translatedText}
              </pre>
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1">
                <FileText className="h-4 w-4 mr-2" />
                Copy Text
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                💾 Save Translation
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-3 border-t pt-4">
          <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
            Perfect for translating:
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {exampleUses.map((use, index) => (
              <div key={index} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                {use}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <p className="text-sm text-purple-800 dark:text-purple-200">
            💡 <strong>Travel Tip:</strong> Save translations offline for areas with poor internet connectivity. 
            This tool supports 100+ languages and can help you navigate foreign countries with confidence!
          </p>
        </div>
      </CardContent>
    </Card>
  )
}