const getUniqueChar = (str) => {
    return str.split('')
        .filter((item, index, arr) =>
        arr.filter(arrItem => arrItem === item).length === 1);
}
console.log(getUniqueChar("aabbccdcc"));