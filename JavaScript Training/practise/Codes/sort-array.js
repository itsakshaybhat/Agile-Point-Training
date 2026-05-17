function bubble(arr, order = "asc"){
    const a = [...arr];
    const n = a.length;
    for(let i=0; i<n; i++) {
        for(let j=0; j<n-i-1; j++){
            const shouldSwap = order ==="asc" ? a[j] > a[j+1] : a[j] < a[j+1];
            if(shouldSwap) {
                [a[j],a[j+1]] = [a[j+1],a[j]];
            }
        }
    }
    return a;
}

const arr = [64, 34, 25, 12, 22, 11, 90]; 

console.log(`Original: [${arr}]`); 
console.log(`Original: [${bubble(arr,"dessc")}]`); 