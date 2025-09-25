"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Camera,
  Languages,
  FileImage,
  Loader2,
  CheckCircle,
} from "lucide-react";

interface TranslationResponse {
  id: string;
  name: string;
  result: {
    Output: {
      translated_menu: string;
      cultural_notes: string;
    };
  };
}

export function ExpenseEstimator() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [translation, setTranslation] = useState<TranslationResponse | null>(
    null
  );
  const [error, setError] = useState<string>("");

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setError("");

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const translateMenu = async () => {
    if (!selectedImage) {
      setError("Please select an image first");
      return;
    }

    setIsTranslating(true);
    setError("");
    setTranslation(null);

    try {
      const formData = new FormData();
      formData.append("menu_image", selectedImage);

      const response = await fetch(
        "https://cmfprpi93lkr2jxgti3mod1q4.agent.a.smyth.ai/api/translate_menu_image",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: TranslationResponse = await response.json();
      setTranslation(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to translate menu");
    } finally {
      setIsTranslating(false);
    }
  };

  const formatTranslatedMenu = (menuText: string) => {
    return menuText
      .split("\n")
      .map((line, index) => {
        if (line.startsWith("- **") && line.includes("**:")) {
          return (
            <h3
              key={index}
              className="font-bold text-lg text-gray-800 dark:text-gray-200 mt-4 mb-2"
            >
              {line.replace(/- \*\*(.*?)\*\*:/, "$1")}
            </h3>
          );
        } else if (line.startsWith("  - **") && line.includes("**:")) {
          return (
            <h4
              key={index}
              className="font-semibold text-md text-gray-700 dark:text-gray-300 mt-3 mb-1 ml-4"
            >
              {line.replace(/  - \*\*(.*?)\*\*:/, "$1")}
            </h4>
          );
        } else if (line.startsWith("  - ")) {
          return (
            <p
              key={index}
              className="text-gray-600 dark:text-gray-400 ml-4 mb-1"
            >
              {line.replace(/  - /, "• ")}
            </p>
          );
        } else if (line.startsWith("- ")) {
          return (
            <p key={index} className="text-gray-600 dark:text-gray-400 mb-1">
              {line.replace(/- /, "• ")}
            </p>
          );
        } else if (line.trim()) {
          return (
            <p key={index} className="text-gray-600 dark:text-gray-400 mb-1">
              {line}
            </p>
          );
        }
        return null;
      })
      .filter(Boolean);
  };

  return (
    <Card className="w-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-white/20 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl text-gray-800 dark:text-gray-200">
          <div className="p-2 bg-gradient-to-r from-green-600 to-blue-600 rounded-full">
            <Camera className="h-5 w-5 text-white" />
          </div>
          Menu Translator
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Upload Menu Image
            </label>
            <div className="flex items-center gap-4">
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="bg-white/90 dark:bg-slate-700/90 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          </div>

          {imagePreview && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Preview
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4">
                <Image
                  src={imagePreview}
                  alt="Menu preview"
                  width={800}
                  height={400}
                  className="max-w-full max-h-96 mx-auto rounded-lg object-contain"
                />
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <Button
            onClick={translateMenu}
            disabled={!selectedImage || isTranslating}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:opacity-50"
          >
            {isTranslating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Translating...
              </>
            ) : (
              <>
                <Languages className="h-4 w-4 mr-2" />
                Translate Menu
              </>
            )}
          </Button>
        </div>

        {translation && (
          <div className="space-y-6 border-t pt-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Translation Complete
              </h3>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                  <FileImage className="h-4 w-4" />
                  Translated Menu
                </h4>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {formatTranslatedMenu(
                    translation.result.Output.translated_menu
                  )}
                </div>
              </div>

              {translation.result.Output.cultural_notes && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    Cultural Notes
                  </h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    {translation.result.Output.cultural_notes}
                  </p>
                </div>
              )}
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <p className="text-sm text-green-800 dark:text-green-200">
                💡 <strong>Tip:</strong> Use this translation to understand the
                menu items and make informed dining choices during your travels.
                The cultural notes provide additional context about the cuisine
                and dining customs.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
