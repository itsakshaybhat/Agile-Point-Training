import fs from "fs";
import { LineTransform } from "./transform.js";

const read = fs.createReadStream("./data/large.txt");
const write = fs.createWriteStream("./data/processed.txt");

read
  .pipe(new LineTransform())
  .pipe(write)
  .on("finish", () => {
    console.log("Processing done");
  });