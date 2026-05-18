import Fastify from 'fastify';

const app = Fastify({ logger: true });

app.post(
	'/users/:id',
	{
		schema: {
			body: {
				type: 'object',
				required: ['name', 'age'],
				properties: {
					name: { type: 'string' },
					age: { type: 'number' }
				}
			},
			querystring: {
				type: 'object',
				required: ['page'],
				properties: {
					page: { type: 'integer' }
				}
			},
			params: {
				type: 'object',
				required: ['id'],
				properties: {
					id: { type: 'integer' }
				}
			},
			headers: {
				type: 'object',
				required: ['authorization'],
				properties: {
					authorization: { type: 'string' }
				}
			},
			response: {
				201: {
					type: 'object',
					properties: {
						message: { type: 'string' }
					}
				}
			}
		}
	},
	async (request, reply) => {
		reply.code(201);

		return {
			message: 'User created'
		};
	}
);

const start = async () => {
	try {
		await app.listen({ port: 3000 });
	} catch (error) {
		app.log.error(error);
		process.exit(1);
	}
};

start();