import "fastify";

declare module "fastify"{
    interface FastifyInstance {
        mysql: import("@fastify/mysql").MySQLPromisePool;
    }
}
