// // function Worker(name) {
// //     this.name = name;
// // }

// // Worker.prototype.clockIn = function() {
// //     console.log(`${this.name} has clocked in.`);
// // }

// // const w1 = new Worker("Akshay");
// // const w2 = new Worker("Bob");

// // w1.clockIn();
// // w2.clockIn();




// function Worker(name, branch){
//     this.name = "Akshay",
//     this.branch = "CSE"
// };

// Worker.prototype.vkit = function() {
//     console.log(`${this.name} is a student of Vkit in the branch of ${this.branch}`);
// }

// const first = new Worker("Akshay", "CSE");
// first.vkit();


function Server(ip) {
    this.ip = ip;
}

Server.prototype.reboot = function() {
    console.log(`Rebooting ${this.ip}`);
}

const prodServer = new Server("192.168.1.1");
const devServer = new Server("10.0.0.5");

// Scenario A
console.log(prodServer.reboot === devServer.reboot); 

// Scenario B
prodServer.reboot = function() {
    console.log("Emergency custom reboot!");
}

prodServer.reboot(); 
devServer.reboot();