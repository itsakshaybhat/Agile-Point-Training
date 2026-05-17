const countCoins = (money, coins = [25, 10, 5, 2, 1]) => {
    const totalCoins = [];
    for (let i = 0 ; i < coins.length; i++){
        const thisCoinNum = Math.floor(money / coins[i]);
        for(let y =0; y< thisCoinNum; y ++) {
            totalCoins.push(coins[i]);
        }
        money = money - coins[i] * thisCoinNum;
    }

    return totalCoins;
}

console.log(countCoins(98));




// const coinsCount = (money, coins = [25,10,5,2,1]) => {
//     const totalCoin = [];
//     for ( let i =0 ; i<coins.length; i++ ) {
//         const thisCoin = Math.floor(money/coins[i]);
//         for ( let y = 0; y<thisCoin; y++) {
//             totalCoin.push(coins[i]);
//         }
//         money = money - thisCoin * coins[i];

//     }
//     return totalCoin;
// }

// console.log(coinsCount(45));