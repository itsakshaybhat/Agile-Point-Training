//Add the New! string front of the string , if it is already present dont do anything


const newStrings = (str) => {
    return    str.indexOf(`New`) === 0 ? str: `New! ${str}`;
}
let str = "New hello";
console.log(newStrings(str));