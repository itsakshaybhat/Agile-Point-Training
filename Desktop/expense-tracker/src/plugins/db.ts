import mysql from "@fastify/mysql";
import fp from 'fastify-plugin';
import type { FastifyInstance } from "fastify";

async function dbPlugin(app: FastifyInstance) {
    await app.register(mysql, {
        promise: true,
        connectionString:
            "mysql://root:password@localhost:3306/expense_tracker",
    });
    console.log("Database Connected\n");
}

export default fp(dbPlugin);

