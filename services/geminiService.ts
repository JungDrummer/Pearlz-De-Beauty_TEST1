import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AIModelType } from "../types";

/**
 * Service to handle Gemini API interactions for architectural consultation.
 */
export const getGeminiResponse = async (
  prompt: string, 
  modelName: string = AIModelType.FLASH,
  image?: { data: string; mimeType: string }
): Promise<string> => {
  // Always use process.env.API_KEY directly for initialization as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const parts: any[] = [{ text: prompt }];
  if (image) {
    parts.unshift({
      inlineData: {
        data: image.data.split(',')[1], // remove base64 prefix
        mimeType: image.mimeType
      }
    });
  }

  const response: GenerateContentResponse = await ai.models.generateContent({
    model: modelName,
    contents: { parts },
    config: {
      systemInstruction: "You are the head architect at PEARLZ, a firm specializing in brutalist, minimal, and concrete architecture inspired by Japanese and Korean aesthetics. Your voice is professional, philosophical, and visionary. You use terms like 'frozen music', 'sculptural structure', 'void', and 'materiality'.",
    }
  });

  // Extract text using the .text property (not a method)
  return response.text || "죄송합니다. 메시지를 처리하는 중에 오류가 발생했습니다.";
};

/**
 * Service to handle architectural image generation using Gemini models.
 */
export const generateArchitecturalImage = async (
  prompt: string,
  modelName: string = AIModelType.FLASH_IMAGE,
  aspectRatio: "1:1" | "16:9" | "9:16" = "1:1"
): Promise<string | null> => {
  // Use API key directly from process.env.API_KEY and instantiate inside the call
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response: GenerateContentResponse = await ai.models.generateContent({
    model: modelName,
    contents: {
      parts: [{ text: `High-end architectural concept: ${prompt}. Brutalist concrete style, cinematic lighting, high-quality, minimal aesthetic.` }]
    },
    config: {
      imageConfig: {
        aspectRatio,
        // imageSize is supported only for gemini-3-pro-image-preview
        imageSize: modelName === AIModelType.PRO_IMAGE ? "1K" : undefined
      }
    }
  });

  // Iterating through parts as an image might not be the first part returned by the model
  const parts = response.candidates?.[0]?.content?.parts || [];
  for (const part of parts) {
    if (part.inlineData) {
      const base64EncodeString: string = part.inlineData.data;
      return `data:image/png;base64,${base64EncodeString}`;
    }
  }
  
  return null;
};