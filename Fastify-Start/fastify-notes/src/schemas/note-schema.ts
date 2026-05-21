export const noteBodySchema = {
    type: 'object',
    required: ['title', 'content'],
    properties: {
        title: { type: 'string'},
        content: { type: 'string'},
    },
};

export const noteParamSchema = {
    type: 'object',
    required: ['id'],
    properties: {
        id: { type: 'string'},
    }
}