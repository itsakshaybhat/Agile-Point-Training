import argon2 from "argon2";

export const hashedPassword = (password:string)=>{
    return argon2.hash(password);
}

export const verifyPassword = (password1: string, password2: string)=>{
    return argon2.verify(password1, password2);
}