const getUnique = (str) => {
    return [... new Set(str.split(''))];
}
console.log(getUnique('akshaymanjunath baht'));

// str.split('').filter((item,idx,arr) => arr.slice(idx+1).indexOf(item) === -1);


