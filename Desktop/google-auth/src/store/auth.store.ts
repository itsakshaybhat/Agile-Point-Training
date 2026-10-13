type AuthSession = {
    codeVerifier: string;
    nonce: string;
}

export const authStore = new Map<string, AuthSession>();