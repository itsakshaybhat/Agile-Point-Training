import Fastify from 'fastify';
import notesRoutes from './routes/notes.js';

export function buildApp() {

    const app = Fastify({
        logger: true,
    });

    app.addHook('onRequest', async (request) => {
        app.log.info(`${request.method} ${request.url}`);
    });

    app.register(notesRoutes);

    app.setErrorHandler((error, request, reply) => {

        app.log.error(error);

        return reply.status(500).send({
            message: 'Internal Server Error',
        });
    });

    app.setNotFoundHandler((request, reply) => {

        return reply.status(404).send({
            message: 'Route not found',
        });
    });

    return app;
}