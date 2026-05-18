function leap_year(year){
    return (year % 100 === 0)? (year%400===0): (year%4===0); 
}


console.log(leap_year(2025));
console.log(leap_year(2024));
console.log(leap_year(2026));
console.log(leap_year(2027));
console.log(leap_year(2028));
console.log(leap_year(2029));
console.log(leap_year(2030));
console.log(leap_year(2031));
console.log(leap_year(2032));