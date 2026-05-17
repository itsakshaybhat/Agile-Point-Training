const orders = [
    { orderId: '123', customerId: '123', deliveryDate: '01-01-2020', delivered: true, items: [
        { productId: '123', price: 55 },
        { productId: '234', price: 30 },
    ]},
    { orderId: '234', customerId: '234', deliveryDate: '01-02-2020', delivered: false, items: [
        { productId: '234', price: 30 },
    ]},
    { orderId: '345', customerId: '234', deliveryDate: '05-01-2020', delivered: true, items: [
        { productId: '567', price: 30 },
        { productId: '678', price: 80 },
    ]},
    { orderId: '456', customerId: '345', deliveryDate: '12-01-2020', delivered: true, items: [
        { productId: '789', price: 12 },
        { productId: '890', price: 90 },
    ]},
        { orderId: '578', customerId: '456', deliveryDate: '12-01-2020', delivered: true, items: [
        { productId: '901', price: 43 },
        { productId: '123', price: 55 },
    ]},
];

// Exercises

// 1) Get a list of the orders for the customer with the ID 234 that have not been delivered.


// 2) Create a new property on each order with the total price of items ordered.


// 3) Have all the orders been delivered?


// 4) Has the customer with ID '123' made any orders?


// 5) Have any products with an id of 123 been sold?


 
// console.log(orders.filter(order => order.customerId === '234' && order.delivered === false));

// console.log(orders.reduce((acc, curr) =>acc + curr.items.price)); //Idu nan trial. 

// //nange complete list beku andre map use maadte adral price beku so I am going witht the reduce of items price>

// console.log(orders.map(order=>({...order, orderTotal: order.items.reduce((acc,item) => acc + item.price, 0)})));


// console.log(orders.delivered === true ? "All the orders are delivered" : "All the orders are not delivered");//this is the wrong method

// console.log(orders.every(order => order.delivered));

// console.log(orders.every(order=> order.cutomerId === '123'));

// console.log(orders.some(order => order.customerId === '123'));



// console.log(orders.map(order=> orderId === '123', orderCount: order.items.reduce(acc, len) => acc + len));


console.log(
    orders.reduce((acc, order) => 
        acc + order.items.reduce((acc, item) => 
            acc + (item.productId === '123'?1:0)
    ,0)
    , 0));


    