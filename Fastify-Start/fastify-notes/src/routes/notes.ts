import { FastifyInstance } from 'fastify';
import { noteService } from '../services/note-service.js';
import { noteBodySchema, noteParamSchema } from '../schemas/note-schema.ts';

export default async function notesRoutes(app: FastifyInstance) {

    app.post('/notes', {
        schema: {
            body: noteBodySchema,
        },
    }, async (request, reply) => {

        const body = request.body as {
            title: string;
            content: string;
        };

        const note = {
            id: crypto.randomUUID(),
            title: body.title,
            content: body.content,
            createdAt: new Date(),
        };

        const createdNote = noteService.create(note);

        return reply.status(201).send(createdNote);
    });

    app.get('/notes', async () => {
        return noteService.findAll();
    });

    app.get('/notes/:id', {
        schema: {
            params: noteParamSchema,
        },
    }, async (request, reply) => {

        const params = request.params as {
            id: string;
        };

        const note = noteService.findById(params.id);

        if (!note) {
            return reply.status(404).send({
                message: 'Note not found',
            });
        }

        return note;
    });

    app.delete('/notes/:id', {
        schema: {
            params: noteParamSchema,
        },
    }, async (request, reply) => {

        const params = request.params as {
            id: string;
        };

        const deleted = noteService.delete(params.id);

        if (!deleted) {
            return reply.status(404).send({
                message: 'Note not found',
            });
        }

        return reply.status(204).send();
    });

    app.put('/notes/:id', {
        schema: {
            params: noteParamSchema,
            body: noteBodySchema,
        },
    }, async (request, reply) => {

        const params = request.params as {
            id: string;
        };

        const body = request.body as {
            title: string;
            content: string;
        };

        const existingNote = noteService.findById(params.id);

        if (!existingNote) {
            return reply.status(404).send({
                message: 'Note not found',
            });
        }

        const updatedNote = {
            ...existingNote,
            title: body.title,
            content: body.content,
        };

        noteService.create(updatedNote);

        return updatedNote;
    });
}