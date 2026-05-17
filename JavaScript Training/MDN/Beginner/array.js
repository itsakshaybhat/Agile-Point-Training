const roster = ["virat","Rohit","Dhoni"];
console.log(roster[2]);
console.log(roster["1"]);
roster["2"] = "Hardhik";
console.log(roster);
console.log(roster["02"] != roster["2"]);

const lineup = ["p1", "p2","akhsya"];
lineup.length = 5;
console.log(lineup);
lineup.length = 1 ;
console.log(lineup);

// keys , find, includes Genz methods
const team = ["Rahul",  , "bumrah"];
team.forEach((player,index) => console.log(index));
for( const key of team.keys()){
    console.log(key);
}


const scores = [50,10,200];
// const sortedScores = scores.toSorted((a,b) => a - b);
const sortedScores  = scores.toSorted();
const reverse  = scores.toReversed((a,b) =>a + b);
console.log(scores);
console.log(sortedScores);
console.log(reverse);

scores.splice(0,2,"Abhayy ");
console.log(scores);

let x = scores.concat(scores);
console.log(x);

scores.join(">");
console.log(scores);

// Map, filter, reduce, find, some,every, findindex,

const num = [1,2,3,4,5,6,7,8];
const triple = num.map((x)=>x**3);
console.log(triple);

const condition = num.filter((x)=> (num[0] + num[2])*2 === x);
console.log(condition);

const finding = num.find(x => x > 2);
console.log(finding);

const index = num.findIndex(x => x > 4);
console.log(index);

const numsy = [1,3,5,6];
const someOf = numsy.some(x=>x % 2 == 0 );
console.log(someOf);

console.log(numsy.every(n=> n < 10));

const collection = [2.3,5,2,5,6,8,52];
console.log(collection.reduce((acc,curr)=> acc + curr, 0));

const cmplexArray = [{name: "Player Akshay "}];
const deepCopy1 = JSON.parse(JSON.stringify(cmplexArray));
console.log(cmplexArray, deepCopy1);

///Another way is also there to make the deepcopy

const deepCopy2 = structuredClone(cmplexArray);
console.log(deepCopy2);

const values = [10,20,30,40,50];
values.forEach((num,idx)=>{
    console.log(num);
    values.splice(idx,1)
})

console.table(values);
console.log(values.includes(20));
console.log(structuredClone(values));