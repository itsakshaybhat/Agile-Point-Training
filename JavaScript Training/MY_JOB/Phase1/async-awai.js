// function getUserData() {
//     fetchFromDatabase() 
//         .then(user => {
//             console.log(user) ;
//         })
//         .catch((error)=>{
//             console.error("Failed:", error) ;
//         });
// }

// async function getUserDataModern() {
//     try {
//         const user = await fetchFromDatabase();
//         console.log(user);
//     } catch (error) {
//         console.error("Failed:", error);
//     }
// }

// getUserData();
// getUserDataModern();

// Some bugs are there here
simulateNetworkRequest()
    .then((mesg) =>{
        console.log(mesg);
    });

async function fetchData(){
    try{
        const result = await simulateNetworkRequest();
        console.log(result);

    } catch (error) {
        console.log(error);

    }

}


fetchData();