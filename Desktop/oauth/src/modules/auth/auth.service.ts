import prisma from "../../database/prisma.ts";
import { hashedPassword, verifyPassword } from "../../utils/hash.ts";
import {AppError} from "../../errors/AppError.ts";



export const registerUser = async function (
    email: string,
    password: string,
) {
    const existingUser = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    if (existingUser) {
        throw new AppError(409,"User Already Exists");
    }
    const hashed = await hashedPassword(password);
    const user = await prisma.user.create({
        data: {
            email: email,
            passwordHash: hashed,
        }
    });
    return user;
}


export const loginUser = async function (
    email: string,
    password: string,
){
    const existingUser = await prisma.user.findUnique({
        where: {
            email: email,
        }
    });
    if(!existingUser){
        throw new AppError(401, "Invalid Credentials");
    }
    const verificationPassword = await verifyPassword(existingUser.passwordHash, password);
    if(!verificationPassword){
        throw new AppError(401,"Invalid Credentials");
    }
    return existingUser;
}

export async function storingRefresh(refreshToken: string, id:number){

    const refresh = await prisma.user.update({
        data:{
            refreshToken: refreshToken,
        },
        where:{
            id: id,
        }
    });
    return refresh;
}


export async function findUser(id: number) {
    return prisma.user.findUnique({
        where: {
            id,
        },
    });
}