import type {FastifyInstance} from "fastify";


export async function generateAccessToken(app:FastifyInstance,user:any){
    return app.jwt.sign({
        id: user.id,
        email: user.email,
    }, {
        expiresIn:"15m",
    });
}

export async function generateRefreshToken(app:FastifyInstance,user:any){
    return app.jwt.sign({
        id: user.id,
        email: user.email,
    }, {
        expiresIn:"7d",
    });
}

// export async function verifyRefreshToken(app:FastifyInstance, refreshToken:string){
//     return app.jwt.verify(refreshToken);
// }

export async function verifyRefreshToken(
  app: FastifyInstance,
  refreshToken: string,
) {
  return app.jwt.verify<{
    id: number;
    email: string;
  }>(refreshToken);
}

export async function compareToken(
    storedToken: string | null,
    incomingToken: string,
) {
    return storedToken === incomingToken;
}