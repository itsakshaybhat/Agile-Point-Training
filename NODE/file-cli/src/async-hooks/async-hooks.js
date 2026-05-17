import async_hooks from 'async_hooks';

const store = new Map();

const hook = async_hooks.createHook({
    init(asyncId, type, triggeredAsyncId){
        store.set(asyncId, {type, triggeredAsyncId});
        console.log(`[INIT] ${type} -> asyncId: ${asyncId}`);
    },
    destroy(asyncId){
        store.delete(asyncId);
        console.log(`[DESTROY] asyncId: ${asyncId}`);
    }
})

hook.enable();