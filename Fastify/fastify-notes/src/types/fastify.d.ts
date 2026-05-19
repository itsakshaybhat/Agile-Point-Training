import 'fastify';
import type { Note } from './note.ts';

declare module 'fastify' {
    interface FastifyInstance {
        notesStore: {
            create(note: Note): Note;
            findAll(): Note[];
            findById(id: string): Note | undefined;
            delete(id: string): boolean;
        }
    }
}

