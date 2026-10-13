import * as client from "openid-client";

let config : client.Configuration;

export async function initialOIDC() {
    config = await client.discovery(
        new URL("https://accounts.google.com"),
        process.env.GOOGLE_CLIENT_ID!,
        process.env.GOOGLE_CLINET_SECRET,
    );
}

export function initOIDCConfig(){
    if(!config){
        throw new Error("OIDC not able to initialsed");
    }

    return config;
}