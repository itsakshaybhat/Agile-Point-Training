
//Union
let subs: number | string = "Hi";  //union

let apiRequestStatus: 'pending' | 'success' | 'error'  = 'pending';

let airLineSeat: 'aisle' | 'window' | 'middle' = 'middle';
airLineSeat = 'aisle';

const orders = ['12', '220', '22', '66'];
let currentOrder: string | undefined;
for(let order of orders){
    if(order === '22'){
        currentOrder = order;
        break;
    }
    currentOrder = "11";
}

console.log(currentOrder);