function createDatabaseConnection(dbName) {
    return function query(sql){
        console.log(`Executing '${sql}' on database: ${dbName} `);
    }
}

const queryUserDB = createDatabaseConnection("ProductionDB");

queryUserDB("SELECT * FROM users");