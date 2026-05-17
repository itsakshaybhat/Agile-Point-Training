const os = require('os');
console.log("Platform:", os.platform());  // e.g., 'win32', 'linux', 'darwin'
console.log("Architecture:", os.arch());  // e.g., 'x64'
console.log("OS Version:", os.version());
console.log("Hostname:", os.hostname());


// os.platform,os.arch, os.version, os.hostname

const cpus = os.cpus();
console.log("Number of cores:", cpus.length);
console.log("CPU model:", cpus[0].model);
console.log("CPU speed (MHz):", cpus[0].speed);

console.log("Total Memory:", (os.totalmem() / 1024 / 1024).toFixed(2), "MB");
console.log("Free Memory:", (os.freemem() / 1024 / 1024).toFixed(2), "MB");
console.log("Used Memory:", ((os.totalmem() - os.freemem()) / 1024 / 1024).toFixed(2), "MB");

console.log("Network Interfaces:", os.networkInterfaces());

console.log("System uptime (seconds):", os.uptime());
console.log("System uptime (hours):", (os.uptime() / 3600).toFixed(2));

console.log("Current User Info:", os.userInfo());

console.log("===== System Power Check =====");
console.log("Platform:", os.platform());
console.log("Architecture:", os.arch());
console.log("CPU Cores:", os.cpus().length);
console.log("CPU Model:", os.cpus()[0].model);
console.log("CPU Speed:", os.cpus()[0].speed, "MHz");
console.log("Total RAM:", (os.totalmem() / 1024 / 1024).toFixed(2), "MB");
console.log("Free RAM:", (os.freemem() / 1024 / 1024).toFixed(2), "MB");
console.log("Used RAM:", ((os.totalmem() - os.freemem()) / 1024 / 1024).toFixed(2), "MB");
console.log("System Uptime (hours):", (os.uptime() / 3600).toFixed(2));