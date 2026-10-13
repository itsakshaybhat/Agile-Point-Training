import type { FastifyRequest, FastifyReply } from "fastify";
import { createUrlSchema } from "./url.schema.ts";
import {
    createShortUrl,
    getUrlByCode,
    increamentClicks,
} from "./url.service.ts";
import { AppError } from "../../common/errors/app-error.js";

export async function createUrlHandler(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const body = createUrlSchema.parse(request.body);
    const url = await createShortUrl(
        body.originalUrl,
    );
    return reply.status(201).send({
        url: url.originalUrl,
        shortCode: url.shortCode,
        shortUrl: `http://localhost:3000/${url.shortCode}`,
    });
}

export async function redirectHandler(
    request: FastifyRequest<{
        Params: {
            shortCode: string;
        };
    }>,
    reply: FastifyReply
) {
    const { shortCode } = request.params;
    const url = await getUrlByCode(shortCode);

    if (!url) {
        throw new AppError(
            "URL not found",
            404
        )
    }

    await increamentClicks(shortCode);

    return reply.redirect(url.originalUrl);
}

export async function analyticsHandler(
    request: FastifyRequest<{
        Params: {
            shortCode: string;
        }
    }>,
    reply: FastifyReply,
) {
    const { shortCode } = request.params;
    const url = await getUrlByCode(shortCode);

    if (!url) {
        return reply.send(url);
    }
    return reply.send(url);
}