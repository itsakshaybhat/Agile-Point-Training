function alarm(person, delay) {
    return new Promise((resolve, reject) => {
        if (delay < 0) {
            reject(new Error("Alarm delay must not be negative"));
            return;
        }
        setTimeout(()=>{
            resolve(`Wake UP : ${person}`);
        },delay);
    });
}


// alarm("akshay",300).then((result)=> console.log(result));

async function run() {
    const result = await alarm("akshay", 2000);
    console.log(result);
}
run();





const util = require("util");

// old callback style function
function readData(callback) {
  setTimeout(() => {
    callback(null, "Data loaded");
  }, 1000);
}

// convert to promise
const readDataAsync = util.promisify(readData);

// use with async/await
async function run() {
  const result = await readDataAsync();
  console.log(result);
}

run();