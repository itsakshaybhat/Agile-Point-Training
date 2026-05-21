// app.get('/error', async()=>{
//     throw new Error('Something failed');
// })

// {
//    "statusCode": 500,
//    "error": "Internal Server Error",
//    "message": "Something failed"
// }

// class UnauthorizedError extends Error {
//    statusCode = 401;

//    constructor(message: string) {
//       super(message);
//    }
// }

// throw new UnauthorizedError('Invalid token');