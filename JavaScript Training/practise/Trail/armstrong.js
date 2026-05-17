function bubble(arr, order = "asc"){
    const a = [...arr];
    const n = a.length;
    for(let i=0; i<n; i++){
        for(let j=0; j<n-i-1; j++){
            const shouldswap = order === "asc" ? a[j] > a[j+1] : a[j] < a[j+1];
            if (shouldswap) {
                [a[j],a[j+1]]= [a[j+1],a[j]];
            }
        }
    }
    return a;
}


console.log(bubble([3,5,5,6,7,8,343,5,6,74,3,2,4,56,2],"dsc"));