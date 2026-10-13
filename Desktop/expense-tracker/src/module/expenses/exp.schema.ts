const createExpenseSchema = {
    body: {
        type: "object",
        required: ["title", "amount", "category"],
        properties: {
            title: { type: "string" },
            amount: { type: "number" },
            category: { type: "string" },
        }
    }
}

export default createExpenseSchema;