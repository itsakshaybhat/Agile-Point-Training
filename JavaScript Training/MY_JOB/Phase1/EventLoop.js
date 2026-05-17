console.log("1. Server Starting");

setTimeout(() => {
    console.log("2. Database Backup Complete (Timeout)");
}, 0);

Promise.resolve().then(() => {
    console.log("3. API Route Registered (Promise)");
});

console.log("4. Server Running");