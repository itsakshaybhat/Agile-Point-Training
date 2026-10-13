import type { FastifyInstance } from "fastify";
import { createExpenseController,getByIdExpenseController,removeExpenseController,getExpenseController } from "./exp.controller.ts";
import createExpenseSchema from "./exp.schema.ts";

export async function expenseRoute(app: FastifyInstance) {
    app.post("/expenses", {
        schema: createExpenseSchema
    }, createExpenseController);

    app.get("/expenses/:id", getByIdExpenseController);

    app.get('/expenses', getExpenseController);

    app.delete('/expenses/:id', removeExpenseController);
}

