import Fastify from 'fastify';
import notesStorePlugin from './plugins/notes-store.js';
import notesRoutes from './routes/notes.ts';
export function buildApp() {
    const app = Fastify({logger: true});

    app.register(notesStorePlugin);
    app.register(notesRoutes);

    app.ready(()=>{
        app.log.info(app.notesStore.findAll());
    })

    app.get('/health', async()=>{
        return {status: "ok"};
    })

    return app;
}

