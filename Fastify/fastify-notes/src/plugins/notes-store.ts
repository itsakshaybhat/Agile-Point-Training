import fp from 'fastify-plugin';
import { Note } from '../types/note.js';

export default fp(async function notesStorePlugin(app){
    const notes = new Map<string, Note>();

    app.decorate('notesStore',{
        create(note: Note) {
            notes.set(note.id, note);
            return note;
        },
        findAll() {
            return Array.from(notes.values());
        },
        findById(id: string) {
            return notes.get(id);
        },
        delete(id: string) {
            return notes.delete(id);
        },
    });
});

