import { FastifyInstance } from 'fastify';

export default async function notesRoutes(app: FastifyInstance){
    app.post('/notes', async (request, reply)=>{
        const body = request.body as {
            title:string;
            content:string;
        };
        const note = {
            id: crypto.randomUUID(),
            title:body.title,
            content:body.content,
            createdAt: new Date(),
        };
        const createdNote = app.notesStore.create(note);
        return reply.status(201).send(createdNote);
    })

    app.get('/notes', async()=>{
        return app.notesStore.findAll();
    })

    app.get('/notes/:id',async(request,reply)=>{
        const params = request.params as {
            id:string;
        }
        const note = app.notesStore.findById(params.id);
        if(!note){
            return reply.status(404).send({
                message: "Note not found",
            })
        }
        return note;
    })

    app.delete('/notes:id',async(request, reply)=>{
        const params = request.params as {
            id : string;
        }
        const deleted = app.notesStore.delete(params.id);
        if(!deleted){
            return reply.status(404).send({
                message: 'Note not found',
            })
        }
        return reply.status(204).send();
    })
}