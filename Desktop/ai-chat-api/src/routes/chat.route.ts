import type { FastifyInstance } from "fastify";
import { generateResponse } from "../services/ai.service.js";

type ChatBody = {
    message: string;
}

export default async function chatRoute(
    fastify: FastifyInstance,
) {
    fastify.post("/health", async (request, reply) => {
        return {
            message: 'routing working',
        }
    });


    fastify.post<{ Body: ChatBody }>("/chat", async (request, reply) => {
        const { message } = request.body;
        if (!message?.trim()) {
        return reply.status(400).send({
            error: "Message is required",
        });
        }
        const answer = await generateResponse(message);
        return {
            answer,
        }
    });

}