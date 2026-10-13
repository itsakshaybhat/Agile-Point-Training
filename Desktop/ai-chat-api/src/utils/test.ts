import {generateResponse} from "../services/ai.service.js";

async function main() {
    const result = await generateResponse(
        "Explain node js ai implementation in paragraph",
    )
    console.log(result);
}

main();