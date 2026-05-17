const fs = require('fs');


//Synchronous File
// fs.writeFileSync("./akshay.js", 'File is created');


// fs.writeFile("./akshay.js", "Callback functio called", (e) => {});


// const result = fs.readFileSync("./File Handling/contacts.txt", "utf-8");
// console.log(result);

// const result = fs.readFile("./File Handling/contacts.txt", "utf-8", (err, result ) => {
//     if(err){
//         console.log(err);
//     } else {
//         console.log(result);
//     }
// })

// console.log(result);
// fs.appendFileSync("./File Handling/contacts.txt", new Date().getDate().toLocaleString);

// fs.appendFileSync("./File Handling/contacts.txt", `${Date.now()} Hey there`);

// fs.copyFile('./File Handling/contacts.txt', './File Handling/akshay.js');

// fs.unlinkSync("./File Handling/contacts.txt");


// fs.writeFileSync("./File Handling/akshay.txt", "Oke the file is created\n");

// console.log(fs.readFileSync("./File Handling/akshay.txt", "utf-8"));

// console.log(fs.statSync("./File Handling/akshay.txt").isFile());

fs.mkdirSync("y-docss/a/b",{recursive:true});