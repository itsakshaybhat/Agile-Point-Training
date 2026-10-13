import { GoogleGenAI } from "@google/genai";
import env from "dotenv";

env.config();

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
const model = "gemini-2.5-flash";
const contents = [
    {
        role: "user",
        parts: [
            {
                text: "Keep answers short and simple."
            }
        ]
    }
];

async function aiAnswer(qsn) {
    contents.push({
        role: "user",
        parts: [{ text: qsn }]
    });

    const response = await ai.models.generateContent({
        model,
        contents,
        temperature: 0,
    });

    contents.push({
        role: "model",
        parts: [{ text: response.text }]
    });

    console.log(response.text);
}

process.stdout.write("Ask your question: ");
process.stdin.on("data", async(data) => {
    const qsn = data.toString().trim();
    if (qsn.toLowerCase() === "exit") {
        process.exit();
    }
        await aiAnswer(qsn);

        process.stdout.write("\nAsk your question: ")
});

