import { GoogleGenAI } from "@google/genai";
import { cosineSimilarity } from "../utils/cosineSimilarity.js";
import embeddedSnippets from "../data/snippets-embedded.json" with { type: "json" };

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("WARNING: GEMINI_API_KEY is not defined in environment variables!");
}

const ai = new GoogleGenAI({ apiKey });

export async function searchSnippets(query) {
  if (!query) {
    throw new Error("Query is required");
  }

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  // Get embedding for user query
  const response = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: query,
  });

  if (!response || !response.embeddings || !response.embeddings[0]) {
    throw new Error("Failed to generate embedding from Gemini API");
  }

  const queryEmbedding = response.embeddings[0].values;

  // Map and sort snippets by cosine similarity score
  const results = embeddedSnippets
    .map((snippet) => ({
      id: snippet.id,
      title: snippet.title,
      code: snippet.code,
      score: cosineSimilarity(queryEmbedding, snippet.embedding),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3); // Get top 3 matches

  return results;
}
