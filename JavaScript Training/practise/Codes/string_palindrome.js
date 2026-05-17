function palind(str){
    const clean = str.toLowerCase().replace(/[^a-z0-9]/g,"");
    console.log(clean);
    return clean === clean.split("").reverse().join("");
}

console.log(palind("aka"));
console.log(palind("akfasda"));