import {x} from "./closureCreator.js";
import { getX  } from "./closureCreator.js";
import { setX } from "./myModule.js";

console.log(getX());
setX(2);

console.log(getX());