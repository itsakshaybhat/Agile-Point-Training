import fs from 'node:fs';

const stream = fs.createReadStream('./data/large.txt', { encoding: 'utf8' });

let leftover = '';

stream.on('data', (chunk) => {
  const data = leftover + chunk.toString();
  const lines = data.split('\n');
  leftover = lines.pop();

  for (const line of lines) {
    console.log(line);
  }
});

stream.on('end', () => {
  if (leftover) console.log(leftover);
  console.log('Done');
});

stream.on('error', (err) => {
  console.error('Read error:', err);
});

// ---- Historical / alternate implementations (kept as comments) ----
// Manual ways of handling line boundaries and backpressure that were
// present in the original file. They're preserved here for reference.

//// Manual way of handling the backpresures
// stream.on('data',(c)=>{
//     console.log("Chunk size", c.length);
//     // console.log(typeof c);
//     // console.log(c instanceof Buffer);
// })
//
// stream.on('end',()=>{
//     console.log("Finished reading the file");
// })
//
// let total = 0;
//
// stream.on("data", (chunk) => {
//   total += chunk.length;
// });
//
// stream.on("end", () => {
//     console.log("+++++++++++++++++++++++++++++++++++++++++++++")
//     console.log("Total bytes:", total);
// });
//
//// Previous version hint:
// if (!write()) wait for drain

