import {nanoid} from "nanoid";

export async function generateShortCode(){
    const shortCode = nanoid(7);

    return shortCode;
}