// "use strict";
let variable = 45;
variable = 34;
console.log(variable);

// myvariable = 34;
// console.log(myvariable);


let v = 20;
console.log(v);
delete globalThis.v;
console.log(v);

eval("var x = 10;");
console.log(x) ;

function getThis() {
  return this;
}
console.log(getThis());