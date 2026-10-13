import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

import snippets from "../data/snippets.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFilePath);

const outputFilePath = path.join(
  currentDirectory,
  "../data/snippets-embedded.json"
);

async function embedSnippets() {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing from the .env file");
  }

  const embeddedSnippets = [];

  for (let index = 0; index < snippets.length; index++) {
    const snippet = snippets[index];

    console.log(
      `Embedding ${index + 1}/${snippets.length}: ${snippet.title}`
    );

    const response = await ai.models.embedContent({
      model: "gemini-embedding-001",
      contents: snippet.description,
    });

    const embedding = response.embeddings?.[0]?.values;

    if (!embedding) {
      throw new Error(
        `Embedding was not returned for snippet: ${snippet.id}`
      );
    }

    embeddedSnippets.push({
      ...snippet,
      embedding,
    });
  }

  await writeFile(
    outputFilePath,
    JSON.stringify(embeddedSnippets, null, 2),
    "utf-8"
  );

  console.log("\nAll snippets embedded successfully.");
  console.log(`Saved to: ${outputFilePath}`);
}

embedSnippets().catch((error) => {
  console.error("\nFailed to embed snippets:");
  console.error(error);
  process.exit(1);
});