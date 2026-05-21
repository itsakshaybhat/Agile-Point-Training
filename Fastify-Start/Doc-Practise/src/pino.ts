const pino = require('pino')();

const customLogger = {
    info: function (o: any, ...n: any){},
    warn: function (o: any, ...n: any){},
    error: function (o: any, ...n: any){},
    fatal: function (o: any, ...n: any){},
    trace: function (o: any, ...n: any){},
    debug: function (o: any, ...n: any){},
    child: function (o: any, ...n: any){
        const child = Object.create(this);
        child.pino = pino.child(...arguments);
        return child;
    },   
}

const fastify = require('fastify')({ loggerInstance: customLogger});