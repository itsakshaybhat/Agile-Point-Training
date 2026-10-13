import { prisma } from "../../lib/prisma.ts";
import {nanoid} from "nanoid";

export async function createShortUrl(originalUrl:string) {
    let shortCode = nanoid(7);
    while(
        await prisma.url.findUnique({
            where:{
                shortCode,
            },
        })
    ){
        shortCode = nanoid(7);
    }

    return prisma.url.create({
        data:{
            originalUrl,
            shortCode,
        }
    });
}

export async function getUrlByCode(shortCode:string){
    const url = await prisma.url.findUnique({
        where:{
            shortCode: shortCode,
        }
    });     
    return url;
}

export async function increamentClicks(shortCode:string){
    return prisma.url.update({
        where:{
            shortCode,
        },
        data:{
            clicks: {
                increment: 1,
            },
        },
    });
}