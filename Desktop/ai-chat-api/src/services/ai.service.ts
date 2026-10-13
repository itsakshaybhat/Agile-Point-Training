import { GoogleGenAI } from "@google/genai";
import env from "dotenv";
env.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function generateResponse(message: string) {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: message,
        });

        return response.text;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to generate response");
    }
}