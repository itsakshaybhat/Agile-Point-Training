import fs from "fs";

const readStream = fs.createReadStream("./data/large.txt");
const writeStream = fs.createWriteStream("./data/copy.txt");

readStream.pipe(writeStream);

readStream.on("error", (err) => {
  console.error("Read error:", err);
});

writeStream.on("error", (err) => {
  console.error("Write error:", err);
});
