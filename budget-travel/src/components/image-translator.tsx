/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Camera,
  Upload,
  Image as ImageIcon,
  MapPin,
  Loader2,
  Globe,
  DollarSign,
  Clock,
} from "lucide-react";

interface Recommendation {
  "Destination Name & Country": string;
  "Similarity Reason": string;
  "Best Time to Visit": string;
  "Must-See Attractions": string | string[];
  "Estimated Daily Budget": string;
  "Cultural Tips": string;
}

interface APIResponseItem {
  id?: string;
  name?: string;
  recommendations?: string;
  result?: {
    _error?: string;
    Output?: {
      location_info?: string;
      recommendations?: string;
    };
  };
}

type APIResponse = APIResponseItem[];

export function ImageTranslator() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [locationInfo, setLocationInfo] = useState("");
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setError("");
      setLocationInfo("");
      setRecommendations([]);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("place_image", selectedFile);

      const response = await fetch(
        "https://cmfprpi93lkr2jxgti3mod1q4.agent.a.smyth.ai/api/recommend_from_image",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: APIResponse = await response.json();

      // Handle array response format
      if (!Array.isArray(data)) {
        throw new Error("Invalid API response format: expected array");
      }

      // Find the recommendations item
      const recommendationsItem = data.find((item) => item.recommendations);

      // Check for errors in any of the response items
      const errorItem = data.find((item) => item.result?._error);
      if (errorItem) {
        console.warn("API returned an error:", errorItem.result?._error);
        // Continue processing if we have recommendations, otherwise throw error
        if (!recommendationsItem) {
          throw new Error(
            `API Error: ${errorItem.result?._error || "Unknown error"}`
          );
        }
      }

      if (!recommendationsItem?.recommendations) {
        throw new Error("No recommendations found in API response");
      }

      // Set location info (if available in any item)
      const locationItem = data.find(
        (item) => item.result?.Output?.location_info
      );
      if (locationItem?.result?.Output?.location_info) {
        setLocationInfo(locationItem.result.Output.location_info);
      } else {
        setLocationInfo("Location analysis completed");
      }

      try {
        // Log the raw recommendations string for debugging
        console.log(
          "Raw recommendations string:",
          recommendationsItem.recommendations
        );

        // Clean the string by removing any potential control characters or fixing common issues
        let cleanedRecommendations = recommendationsItem.recommendations.trim();

        // Check if the string is properly formatted JSON
        if (
          !cleanedRecommendations.startsWith("[") &&
          !cleanedRecommendations.startsWith("{")
        ) {
          // If it doesn't start with [ or {, it might be wrapped in quotes
          if (
            cleanedRecommendations.startsWith('"') &&
            cleanedRecommendations.endsWith('"')
          ) {
            cleanedRecommendations = cleanedRecommendations.slice(1, -1);
            // Unescape any escaped quotes
            cleanedRecommendations = cleanedRecommendations.replace(
              /\\"/g,
              '"'
            );
          }
        }

        console.log("Cleaned recommendations string:", cleanedRecommendations);

        const parsedRecommendations = JSON.parse(
          cleanedRecommendations
        ) as Recommendation[];

        // Process attractions to ensure they're always arrays and handle any data issues
        const processedRecommendations = parsedRecommendations
          .map((rec) => ({
            ...rec,
            "Must-See Attractions":
              typeof rec["Must-See Attractions"] === "string"
                ? rec["Must-See Attractions"]
                    .split(", ")
                    .filter((item) => item.trim().length > 0)
                : Array.isArray(rec["Must-See Attractions"])
                ? rec["Must-See Attractions"].filter(
                    (item) => item && item.trim().length > 0
                  )
                : [],
          }))
          .filter(
            (rec) =>
              rec["Destination Name & Country"] &&
              rec["Destination Name & Country"].trim().length > 0
          );

        setRecommendations(processedRecommendations);
      } catch (parseError) {
        console.error("Error parsing recommendations:", parseError);
        console.error(
          "Original recommendations string:",
          recommendationsItem.recommendations
        );

        // Try to extract any readable destination names even if JSON parsing fails
        try {
          const rawString = recommendationsItem.recommendations;
          // Look for destination patterns in the string
          const destinationMatches = rawString.match(
            /Destination Name & Country['"]*:\s*['"]*([^'"]+)['"]*,/gi
          );

          if (destinationMatches && destinationMatches.length > 0) {
            // Create minimal recommendations from extracted destination names
            const fallbackRecommendations: Recommendation[] =
              destinationMatches.map((match) => {
                const destinationName = match.replace(
                  /Destination Name & Country['"]*:\s*['"]*([^'"]+)['"]*,/i,
                  "$1"
                );
                return {
                  "Destination Name & Country": destinationName,
                  "Similarity Reason": "Similar destination found",
                  "Best Time to Visit": "Check local weather conditions",
                  "Must-See Attractions": [
                    "Contact local tourism board for details",
                  ],
                  "Estimated Daily Budget": "Budget varies by season",
                  "Cultural Tips": "Research local customs before visiting",
                };
              });

            console.log(
              "Using fallback recommendations:",
              fallbackRecommendations
            );
            setRecommendations(fallbackRecommendations);
            return; // Exit early with fallback data
          }
        } catch (fallbackError) {
          console.error("Fallback parsing also failed:", fallbackError);
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        throw new Error(
          `Failed to parse recommendations data. The API response may be malformed. Error: `
        );
      }
    } catch (err) {
      console.error("API Error:", err);
      setError(
        err instanceof Error && err.message.includes("parse")
          ? "The API returned data in an unexpected format. Please try uploading a different image or try again later."
          : "Failed to analyze image. The API might be slow or unavailable. Please try again."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const exampleUses = [
    "Famous landmarks and monuments",
    "Natural landscapes and parks",
    "Beach and coastal destinations",
    "Mountain and hiking locations",
    "Urban cityscapes and architecture",
    "Cultural and historical sites",
  ];

  return (
    <div className="w-full max-w-7xl mx-auto">
      <Card className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-white/20 shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl text-gray-800 dark:text-gray-200">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            Travel Destination Finder
            <Badge variant="secondary" className="ml-auto">
              <Camera className="h-3 w-3 mr-1" />
              AI
            </Badge>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Upload an image of any travel destination and get AI-powered
              recommendations for similar places to visit!
            </p>

            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 transition-colors hover:border-purple-400 dark:hover:border-purple-500">
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
                      onClick={handleAnalyze}
                      disabled={isAnalyzing}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <MapPin className="h-4 w-4 mr-2" />
                          Find Destinations
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

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
              <p className="text-red-800 dark:text-red-200 text-sm">
                ❌ {error}
              </p>
            </div>
          )}

          {/* Results Section - Only show when we have results */}
          {locationInfo || recommendations.length > 0 ? (
            <div className="space-y-6">
              {/* Location Analysis */}
              {locationInfo && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">
                      📍 Location Analysis
                    </h3>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {locationInfo}
                  </p>
                </div>
              )}

              {/* Similar Destinations */}
              {recommendations.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <Globe className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    <h3 className="font-bold text-xl text-gray-800 dark:text-gray-200">
                      🌍 Similar Destinations
                    </h3>
                    <Badge variant="secondary" className="ml-2">
                      {recommendations.length} found
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {recommendations.map((rec, index) => (
                      <Card
                        key={index}
                        className="bg-white dark:bg-slate-700 border border-gray-200 dark:border-gray-600 shadow-lg hover:shadow-xl transition-shadow duration-300"
                      >
                        <CardContent className="p-6">
                          <div className="space-y-4">
                            {/* Header */}
                            <div className="flex items-start justify-between">
                              <h4 className="font-bold text-lg text-gray-800 dark:text-gray-200 leading-tight">
                                {rec["Destination Name & Country"]}
                              </h4>
                              <Badge
                                variant="outline"
                                className="text-xs font-medium"
                              >
                                #{index + 1}
                              </Badge>
                            </div>

                            {/* Similarity Reason */}
                            <div className="bg-gray-50 dark:bg-slate-800 p-3 rounded-lg">
                              <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                                &ldquo;{rec["Similarity Reason"]}&rdquo;
                              </p>
                            </div>

                            {/* Key Information Grid */}
                            <div className="space-y-3">
                              <div className="flex items-start gap-3">
                                <Clock className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                <div className="flex-1">
                                  <span className="font-medium text-sm text-gray-800 dark:text-gray-200">
                                    Best Time to Visit:
                                  </span>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {rec["Best Time to Visit"]}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-start gap-3">
                                <DollarSign className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <div className="flex-1">
                                  <span className="font-medium text-sm text-gray-800 dark:text-gray-200">
                                    Daily Budget:
                                  </span>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {rec["Estimated Daily Budget"]}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-start gap-3">
                                <MapPin className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                                <div className="flex-1">
                                  <span className="font-medium text-sm text-gray-800 dark:text-gray-200">
                                    Must-See Attractions:
                                  </span>
                                  <div className="mt-1 space-y-1">
                                    {(Array.isArray(rec["Must-See Attractions"])
                                      ? rec["Must-See Attractions"]
                                      : rec["Must-See Attractions"].split(", ")
                                    )
                                      .slice(0, 3)
                                      .map((attraction, i) => (
                                        <div
                                          key={i}
                                          className="flex items-center gap-2"
                                        >
                                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full flex-shrink-0"></div>
                                          <span className="text-xs text-gray-600 dark:text-gray-400">
                                            {attraction.trim()}
                                          </span>
                                        </div>
                                      ))}
                                    {(Array.isArray(rec["Must-See Attractions"])
                                      ? rec["Must-See Attractions"]
                                      : rec["Must-See Attractions"].split(", ")
                                    ).length > 3 && (
                                      <p className="text-xs text-gray-500 dark:text-gray-500 ml-3">
                                        +
                                        {(Array.isArray(
                                          rec["Must-See Attractions"]
                                        )
                                          ? rec["Must-See Attractions"]
                                          : rec["Must-See Attractions"].split(
                                              ", "
                                            )
                                        ).length - 3}{" "}
                                        more
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Cultural Tips */}
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                              <p className="text-sm text-blue-800 dark:text-blue-200">
                                <span className="font-medium">
                                  💡 Cultural Tips:
                                </span>
                                <span className="block mt-1">
                                  {rec["Cultural Tips"]}
                                </span>
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Show helper content only when no results */
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-base mb-3 flex items-center gap-2">
                  <Camera className="h-5 w-5 text-purple-600" />
                  Perfect for analyzing:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {exampleUses.map((use, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400"
                    >
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex-shrink-0"></div>
                      <span>{use}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-6">
                <p className="text-sm text-indigo-800 dark:text-indigo-200 leading-relaxed">
                  <span className="font-bold text-base">🚀 How it works:</span>
                  <span className="block mt-2">
                    Upload clear, high-quality images of travel destinations and
                    our AI will identify the location, analyze its features, and
                    suggest similar places around the world with detailed budget
                    information and cultural tips!
                  </span>
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
