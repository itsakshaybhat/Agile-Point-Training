#!/usr/bin/env node

const [command] = process.argv.slice(2);

async function run() {
  try {
    if (command === "gen") {
      await import("./commands/generator.js");

    } else if (command === "read-lines") {
      await import("./commands/reader.js");

    } else if (command === "copy") {
      await import("./commands/copy.js");

    } else if (command === "manual-copy") {
      await import("./commands/manualCopy.js");

    } else if (command === "process") {
      await import("./performance/process-with-perf.js");

    } else if (command === "worker-test") {
      await import("./work-transforms/process.js");

    } else if (command === "perf-test") {
      await import("./transforms/process.js");

    } else if (command === "cluster") {
      await import("./cluster/cluster.js");

    } else if (command === "async-hooks") {
      await import("./async-hooks/async-hooks.js");

    } else if (command === "os") {
      const os = await import('node:os');
      console.log('Platform:', os.platform());

    } else {
      console.log(`
Usage: file-cli <command>

Commands:
  gen
  read-lines
  copy
  manual-copy
  process
  worker-test
  perf-test
  cluster
  os
`);
    }
  } catch (err) {
    console.error("Error:", err.message);
  }
}

run();