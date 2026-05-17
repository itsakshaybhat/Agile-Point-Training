// function checkDatabaseConnection(){
//     return new Promise((resolve, reject)=>{
//         let isConnected = true ;
//         if(isConnected) {
//             resolve("Connected to the database");
//         } else {
//             reject("Connection refused");
//         }
//     });
// }


// checkDatabaseConnection()
//     .then((message) => {
//         console.log("Sucess:", message) ;
//     }) 
//     .catch((error) => {
//         console.error(error) ;
//     })


function simulateNetworkRequest(){
    return new Promise((resolve) => {
        setTimeout(()=>{resolve("Data fetched Successfully")},2000);
        }
)
}

simulateNetworkRequest()
    .then((message)=>{
        console.log(message); 
    });