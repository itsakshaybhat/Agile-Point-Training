export async function createExpenseService(
    mysql: any,
    title: string,
    amount: number,
    category: string
) {
    const [result]: any = await mysql.execute(
        `
        INSERT INTO expenses
        (title, amount, category)
        VALUES (?, ?, ?)
        `,
        [title, amount, category]
    );

    return {
        id: result.insertId,
        title,
        amount,
        category,
    };
}

export async function getExpenseService(mysql:any, id:number){
    const [result] = await mysql.query(
        `
            SELECT * FROM expenses 
            WHERE id = ?;    
        `, [id]
    );
    return result;
}

export async function removeExpenseService(mysql:any, id:number){
    let rank = id;
    await mysql.query(
        `
            DELETE FROM expenses
            WHERE id = ?;
        `, [id]
    );
    return rank;

}

export async function getExpenses(mysql:any){
    const [result] = await mysql.query(
        `
            SELECT * FROM expenses;
        `
    );
    return result;

}

