console.log(`string text line 1
string text line 2`);

console.log(`string text line 1 \
string text line 2`); // Outputs on one single line

const isLargeScreen = false;
const item = {isCollapsed : true};

const classes = `header ${
    isLargeScreen?"":`icon-${item.isCollapsed ? "expander" : "collapser"}`
}`;
const class1es = `header ${
  isLargeScreen ? "" : `icon-${item.isCollapsed ? "expander" : "collapser"}`
}`;
console.log(classes);


const person = "Mike";
const age = 28;

function myTag(strings, personExp, ageExp) {
    const ageStr = ageExp < 100 ? "young": "centernarian";
    return `${strings[0]}${personExp}${strings[1]}${ageStr}${strings[2]}`;
    // return `${strings[0]}${personExp}${strings[1]}${strings[2]}${ageStr}`;

}

const output = myTag`That ${person} is a ${age}`;
console.log(output);

const str = String.raw`Hi hello \n Myname is ${output}`;
console.log(str);


function log(string){
    console.log("cooked", string[0]);
    console.log("cooked", string.raw[0]);
}
log`\unicode`;