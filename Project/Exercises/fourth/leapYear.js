const leapYear = (num) => {
    return num % 100 === 0 ? num%400 ===0 : num%4 ===0
}
console.log(leapYear(2000));
console.log(leapYear(2016));