// // // call apply bind 

// // call: call(context , arg1, arg2) ;
// // apply: apply(context, [arg1, arg2, arg3 .........]);
// // bind: bind(context , arg1, arg2, arg3...);


// // const userA = {name: "System Admin"};
// // const userB = {name: "Guest"};

// // function grantAccess(system, accesslevel, privacy) {
// //     console.log(`Granting ${accesslevel} access to ${this.name} on ${system} with ${privacy}`);
// // }

// // grantAccess.call(userA, "AWS", "FULL");
// // grantAccess.call(userB, "DevOps", "Partial");

// // grantAccess.apply(userA, ["Linux Server", "Read-Only", "HIGH"]);
// // grantAccess.apply(userB, ["Software Tester", "Monitorization", "Low"]);

// // const adminAccess = grantAccess.bind(userA) ;
// // adminAccess("Database", "Write","Full");
// // const adminAccess1 = grantAccess.bind(userB) ;
// // adminAccess1("Database", "Write","Open");


// const authLogger = {
//     serviceName: "AuthService",
//     logError: function(errorCode) {
//         console.log(`[${this.serviceName}] Error: ${errorCode}`);
//     }
// };

// function executeCallback(callback) {
//     // We are simulating an asynchronous event triggering the callback
//     callback("401 Unauthorized");
// }

// // Scenario A
// executeCallback(authLogger.logError);

// // Scenario B
// const safeLogger = authLogger.logError.bind(authLogger);
// executeCallback(safeLogger);