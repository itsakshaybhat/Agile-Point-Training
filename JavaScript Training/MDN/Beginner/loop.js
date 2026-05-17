// for(initialization, condition, increament/decreament)
// for (let step = 1 ; step <= 5; step++){
//     console.log(step);
// }

function countSelected(selectObject) {
    let numberSelect = 0 ;
    for( let i =0 ; i<selectObject.options.length;i++){
        if(selectObject.options[i].selected){
            numberSelect++;
        }
    }
    return numberSelect;
}

const obj = {foo: 1, bar: 2 };
for (const [key,val] of Object.entries(obj)){
    console.log(key);
}

const arr = [20,3,56,7,5,3,5,6];
for (let i of arr) {
    process.stdout.write(i+" ");
}

function dumpProps(obj, objName) {
    let result = "";
    for ( const i in obj ) {
        result += `${objName}.${i} = ${obj[i]}\n`
    }
    result = result + "\n";
    return result;

}

const car = {make: "Ford", model:"Mustang"};
console.log(dumpProps(car,"car"));
console.log(dumpProps(car,"car"));



