
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AIModelType } from "../types";

/**
 * Service to handle Gemini API interactions for beauty consultation.
 * Updated to reflect Pearlz De Beauty branding and expert persona.
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

  // Use generateContent with model name and prompt/parts
  const response: GenerateContentResponse = await ai.models.generateContent({
    model: modelName,
    contents: { parts },
    config: {
      systemInstruction: "You are the head artist at Pearlz De Beauty, a premium semi-permanent makeup and beauty studio. Your voice is elegant, professional, and reassuring. You specialize in natural beauty enhancements, microblading, and lip tinting. Use terms like 'natural stroke', 'skin harmony', 'pigment balance', and 'aesthetic precision'.",
    }
  });

  // Extract text using the .text property (not a method) as per guidelines
  return response.text || "죄송합니다. 메시지를 처리하는 중에 오류가 발생했습니다.";
};

/**
 * Service to handle beauty image generation using Gemini models.
 * Renamed from generateArchitecturalImage to fix export error and match context.
 */
export const generateBeautyImage = async (
  prompt: string,
  modelName: string = AIModelType.FLASH_IMAGE,
  aspectRatio: "1:1" | "16:9" | "9:16" = "1:1"
): Promise<string | null> => {
  // Use API key directly from process.env.API_KEY and instantiate inside the call
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response: GenerateContentResponse = await ai.models.generateContent({
    model: modelName,
    contents: {
      parts: [{ text: `High-end beauty and semi-permanent makeup photography: ${prompt}. Professional lighting, sharp focus on skin texture and details, clean aesthetic, high quality, minimal studio background.` }]
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
