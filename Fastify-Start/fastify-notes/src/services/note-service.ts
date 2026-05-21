import { Note } from '../types/note.ts';

const notes = new Map<string, Note>();

export const noteService = {
    create(note: Note) {
        notes.set(note.id, note);
        return note;
    },
    findAll() {
        return Array.from(notes.values());
    },
    findById(id: string){
        return notes.get(id);
    },
    delete(id: string){
        return notes.delete(id);
    }
}