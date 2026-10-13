import type {FastifyRequest, FastifyReply} from "fastify";
export async function notFoundHandler(request:FastifyRequest, reply: FastifyReply){
    return reply.status(404).send({
        success: false,
        message: "Route Not Found",
    })
}