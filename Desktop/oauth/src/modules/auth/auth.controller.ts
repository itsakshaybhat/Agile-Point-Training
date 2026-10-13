import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { registerUser, loginUser, storingRefresh,findUser} from "./auth.service.ts";
import { loginSchema, registerSchema } from "./auth.schema.ts";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken , compareToken} from "./auth.token.ts";
import { AppError } from "../../errors/AppError.ts";
export const registerController = async function (
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const body = registerSchema.parse(request.body);
    const { email, password } = body;
    const result = await registerUser(email, password);

    return reply.status(201).send({
        success: true,
        data: result.email,
    })
}

export const loginController = async function (
    request: FastifyRequest,
    reply: FastifyReply,
) {
    console.log(request.body);
    const body = loginSchema.parse(request.body);
    const { email, password } = body;
    const result = await loginUser(email, password);
    const accessToken = await generateAccessToken(request.server, result);
    const refreshToken = await generateRefreshToken(request.server, result);
    await storingRefresh(refreshToken, result.id);
    return reply.status(200).send({
        success: true,
        message: "Logged in successfully",
        data: result.email,
        accessToken: accessToken,
        refreshToken: refreshToken,
    });
}


export const meController = async function (
    request: FastifyRequest,
    reply: FastifyReply,
) {
    await request.jwtVerify();
    return reply.status(200).send({
        success: true,
        data: request.user,
    });
}

type request={
    id: number;
    email: string;
}

export async function refreshController(
    request: FastifyRequest,
    reply: FastifyReply,
){

    const { refreshToken }  = request.body as {
        refreshToken: string;
    }
    const payload = await verifyRefreshToken(request.server,refreshToken);
    const { id } = payload;
    const user = await findUser(payload.id);
    if(!user){
        throw new AppError(404,"User not found");
    }
    const compare = await compareToken(user.refreshToken, refreshToken);
    if(!compare){
        throw new AppError(401,"Invalid RefreshToken");
    }
    const accessToken = await generateAccessToken(request.server, user);
    return {
        success: "true",
        accessToken: accessToken,
    }


    // const refreshToken = request.body;

    // const verify = await request.jwtVerify(refreshToken);
    // const { id, email } = request;

    // const user = await findUser(Number(id));
    // if(!user){
    //     throw new AppError(404,"Not found");
    // }
    // const compare = await request.jwt.compare(request.refreshToken, user.refreshToken);

    // if(!compare){
    //     throw new AppError(404,"Not found");
    // }

    // const accessToken = await generateAccessToken(id, email);
    // return {
    //     success: true,
    //     accessToken: accessToken,
    // }

}

// import { compareToken } from "./auth.token.ts";

// export async function refreshController(
//   request: FastifyRequest,
//   reply: FastifyReply,
// ) {
//   const { refreshToken } = request.body as {
//     refreshToken: string;
//   };

//   const payload = await verifyRefreshToken(
//     request.server,
//     refreshToken,
//   );

//   const user = await findUser(payload.id);

//   if (!user) {
//     throw new AppError(404, "User not found");
//   }

//   const isValid = await compareToken(
//     user.refreshToken,
//     refreshToken,
//   );

//   if (!isValid) {
//     throw new AppError(401, "Invalid Refresh Token");
//   }

//   const accessToken = await generateAccessToken(
//     request.server,
//     user,
//   );

//   return reply.status(200).send({
//     success: true,
//     accessToken,
//   });
// }