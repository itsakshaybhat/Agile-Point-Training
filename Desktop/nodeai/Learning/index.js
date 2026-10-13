import { GoogleGenAI } from "@google/genai";
import env from "dotenv";
import { encoding_for_model } from "tiktoken";
env.config();

const google_Key = process.env.GOOGLE_API_KEY;

const prompt = "what is the thing in fastify which is wrong in one line of answer";

const ai = new GoogleGenAI({ apiKey: google_Key });

// const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: "Tell me about ai in node js",
//     config:{
//         systemInstruction: `
//         Start with the correct roadmap for learning in short one after the other
//         `
//     },
//     temprature: 0.7,
// });


const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
        {
            role: "user",
            parts: [
                { text: "What is coding" }
            ]
        },
        {
            role: "model",
            parts: [
                { text: "Tell me about the nodejs " }
            ]
        },
        {
            role: "user",
            parts: [
                { text: "tell me in kannada" }
            ]
        }
    ],
    temperature: 0.7,
//     max_output_tokens: 100,
//     store: true,
});

console.log(response);cs