import type{FastifyRequest, FastifyReply} from "fastify";
import {AppError} from "../../errors/app-error.ts";
import {createExpenseService,getExpenseService,removeExpenseService,getExpenses} from "./exp.service.ts";

interface CreateExpenseBody {
    id: number;
    title: string;
    amount: number;
    category: string;
}

type CreateExpense = FastifyRequest<{
    Body:CreateExpenseBody
}>

export async function createExpenseController(request:CreateExpense, reply: FastifyReply){
    const {title, amount, category} = request.body;
    const data = await createExpenseService(request.server.mysql,title, amount, category);
    if(!data){
        throw new AppError(400,"Unable to insert in the database");
    }
    return reply.status(200).send({
        success: true,
        message: "Expense Created",
        data
    });
}


export async function getByIdExpenseController(request: FastifyRequest<{Params:{id: string;};}>, reply: FastifyReply){
    const {id} = request.params;
    const data = await getExpenseService(request.server.mysql, Number(id));
    if(!data){
        throw new AppError(404, "Not found ID");
    }
    return reply.status(200).send({
        success: true,
        message: 'Retrieved successfully',
        data: data,
    })
}





export async function removeExpenseController(request: FastifyRequest<{Params:{id: string;};}>, reply: FastifyReply){
    const {id} = request.params;
    const data = await removeExpenseService(request.server.mysql, Number(id));
    if(!data){
        throw new AppError(404, "Not found ID");
    }
    return reply.status(200).send({
        success: true,
        message: 'Deleted successfully',
        data
    })
}


export async function getExpenseController(request: FastifyRequest, reply: FastifyReply){
    const data = await getExpenses(request.server.mysql);
    if(!data){
        throw new AppError(404, "Not found ID");
    }
    return reply.status(200).send({
        success: true,
        message: 'Data successfully Retrieved',
        data
    })
}