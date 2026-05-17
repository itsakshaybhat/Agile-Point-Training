import fs from "fs";
import { WorkerTransform } from "./workerTransform.js";

const read = fs.createReadStream("./data/large.txt");
const write = fs.createWriteStream("./data/processed.txt");

read
  .pipe(new WorkerTransform())
  .pipe(write)
  .on("finish", () => {
    console.log("Processing done");
  });