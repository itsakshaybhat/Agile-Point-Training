async function foo() {
    return 1;
}

function foo() {
    return Promise.resolve(1);
}

const p = new Promise((res, rej) => {
    res(1);
});

async function asyncReturn() {
    return p;
}

function basicReturn() {
    return Promise.resolve(p);
}

console.log(p ===basicReturn());
console.log(p ===basicReturn());

async function foo() {
    return 1;
}

function foo() {
    return Promise.resolve(1).then(()=> undefined);
}

async function foo() {
  const result1 = await new Promise((resolve) =>
    setTimeout(() => resolve("1")),
  );
  const result2 = await new Promise((resolve) =>
    setTimeout(() => resolve("2")),
  );
}
foo();


async function foo() {
    const p1 = new Promise((resolve) => {
        setTimeout(()=> { resolve("1")},1000);
    })
    const p2 = new Promise((_,reject) => setTimeout(() => reject(new Error("failed")),500));
    const results = [await p1, await p2];
}
foo().catch(()=>{});

function resolveAfter2Seconds() {
    console.log("Starting slow promise");
    return new Promise((resolve) => {
        setTimeout(()=> {
            resolve("slow");
            console.log("slow promise is done");
        },2000);
    })
}

function resolveAfter1Second() {
    console.log("starting fast promise");
    return new Promise((resolve) => {
        setTimeout(()=> {
            resolve("fast");
            console.log("fast promise is done");
        },1000);
    })
}

async function sequentialStart() {
    console.log("Sequential started");
    const slow = resolveAfter2Seconds();
    console.log(await slow);
    const fast = resolveAfter1Second();
    console.log(await fast);
    console.log("done")
}


function getProcessedData(url) {
  return downloadData(url) // returns a promise
    .catch((e) => downloadFallbackData(url)) // returns a promise
    .then((v) => processDataInWorker(v)); // returns a promise
}


async function getProcessedData(url) {
    let v ;
    try{
        v = await downloadData(url);
    } catch(e) {
        v  = await downloadFallbackData(url);
    }
    return processDataInWorker(v);
}









function resolveAfter2Seconds(x) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
}

async function f1() {
  const x = await resolveAfter2Seconds(10);
  console.log(x); // 10
}

f1();




async function f2() {
    const thenable = {
        then(resolve) {
            resolve("resolved");
        }
    }
    console.log(await thenable);
}

f2();

async function foo(name) {
  console.log(name, "start");
  await console.log(name, "middle");
  console.log(name, "end");
}

foo("First");
foo("Second");