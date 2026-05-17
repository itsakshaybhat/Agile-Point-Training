const EventEmitter = require('events') ;
const securitySystem = new EventEmitter() ;
const EvenetEmitter = require('evnets') ;
const securitySystem = new EventEmitter() ;
securitySystem.on("unauthorized_access",(ipAddress) => {
    console.log("Security Alert: Blocking IP", ipAddress) ;
});
securitySystem.on("unauthorized_access", (ipAddress)=> {
    console.log
}
securitySystem.on("unauthorized_access",(ipAddress) => {
    console.log("Audit : Logging unauthorized attempt from", ipAddress, "to database");
})

function checkLogin(username, password,ipAddress) {
    if (password === "admin123") {
        console.log("Login Successful");
    }
    securitySystem.emit("unauthorized_access", ipAddress) ;
}

checkLogin("Akshay", "admin12", "192.168.0.50");