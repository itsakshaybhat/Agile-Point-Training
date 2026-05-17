// let str = "2Akshay";
// if (str.slice(0,1) === [String(/^\d/)]){
//     str.replace(str.slice(0,1), '$');
// }
// console.log(str);

let str = "2Akshay";

if (/^\d/.test(str)) {
    str = str.replace(/^\d/, '$');
}

console.log(str); // $Akshay

const replaceFirst = (str) => str.replace(/[0-9]/,'$');

const replacestr = (str) => str.replace(/\d/,'$');
console.log(replaceFirst("Aksha5y"));