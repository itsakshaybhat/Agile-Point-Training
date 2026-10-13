import {generateCodeVerifier, generateCodeChallenger} from "../utils/pkce.ts";
import {generateState, generateNonce} from "../utils/auth.ts";
import {authStore} from "../store/auth.store.ts";


const codeVerifier = generateCodeVerifier();
const codeChallenge = generateCodeChallenger(codeVerifier);

const state = generateState();
const nonce = generateNonce();

authStore.set(state, {
    codeVerifier,
    nonce,
});

const config = getOIDCConfig();

