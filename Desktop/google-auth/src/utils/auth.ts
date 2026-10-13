import crypto from "node:crypto";

export function generateState():string{
    return crypto.randomBytes(32).toString("base64url");
}

export function generateNonce():string{
    return crypto.randomBytes(32).toString("base64url");
}