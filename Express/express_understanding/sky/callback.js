// function doit1(val){
//     return val + 1;
// }
// function doit2(val){
//     return val + 1;
// }
// function doit3(val){
//     return val + 1;
// }
// function doit4(val){
//     return val + 1;
// }

// function mainOp(){
//     let result = 0;
//     result = doit1(result);
//     result = doit2(result);
//     result = doit3(result);
//     result = doit4(result);
//     console.log(result);
// }

// mainOp();

// function mul1(val, cal){
   
//     setTimeout(() => {
//         const res = val * 1;
//         cal(res);
//     }, 1000000000);
// }
// function mul2(val, cal){
//     const res = val * 2;
//     cal(res);
// }
// function mul3(val, cal){
//     const res = val + 3;
//     cal(res);
// }
// function mul4(val, cal){
//     const res = val + 4;
//     cal(res);
// }

// function mainCall(){
//     mul1(2,(result)=>{
//         mul2(result,(res2)=>{
//             mul3(res2,(res3)=>{
//                 mul4(res3,(res4)=>{
//                     console.log(res4,"is the last");
//                 })
//             })
//         })
//     })
// }

// mainCall();

// function mul1(val, cal){
//     console.log("mul1 started");

//     setTimeout(() => {
//         const res = val * 1;
//         console.log("timer finished");
//         cal(res);
//     }, 3000);

//     console.log("mul1 ended (not waiting)");
// }

// function mainCall(){
//     mul1(2, (result) => {
//         console.log("callback executed with:", result);
//     });

//     console.log("mainCall finished");
// }

// mainCall();





console.log("+++++++++++++++")

function task1(val, callback) {
    console.log("Task 1 started");

    setTimeout(() => {
        const result = val + 1;
        console.log("Task 1 finished");
        callback(result);
    }, 2000);
}

function task2(val, callback) {
    console.log("Task 2 started");

    setTimeout(() => {
        const result = val * 2;
        console.log("Task 2 finished");
        callback(result);
    }, 2000);
}

function task3(val, callback) {
    console.log("Task 3 started");

    setTimeout(() => {
        const result = val - 3;
        console.log("Task 3 finished");
        callback(result);
    }, 2000);
}

// function mainOP(){
//     task1(5,span);
//     function span(result){
//         task2(result,span2);
//         function span2(result){
//             task3(result,span3);
//             function span3(result){
//                 console.log(result);
//             }
//         }
//     }
// }

// function mainOP(){
//     task1(6,(result)=>{
//         task2(result,(result)=>{
//             task3(result,(result)=>{
//                 console.log(result);
//             })
//         })
//     })
// }

function mainOP(){
    task1(6,akshay);
    function akshay(result){
        task2(result,akshay1);
        function akshay1(result){
            task3(result,akshay3);
            function akshay3(result){
                console.log(result);
            }
        }
    }
}

// mainOP();

const obj = require('./generate.js');

console.log("helo");
console.log(obj.x);
obj.cre();

const{x,cre} = require('./generate.js');
console.log(x);
cre();
