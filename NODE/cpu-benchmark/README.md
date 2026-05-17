# CPU Benchmark

Small benchmark comparing synchronous heavy computation and worker-based approach.

What it is
- `no-worker.js` — runs heavy synchronous computations on the main thread.
- `with-worker.js` / `worker.js` — example using worker threads to offload work.
- `task.js` — exports the heavy computation function used by examples.

Prerequisites
- Node.js 12+ (worker_threads support)

Quick start

```bash
cd cpu-benchmark
# run the blocking version
node no-worker.js
# run the worker-based version
node with-worker.js
```

Git (publish)

```bash
cd cpu-benchmark
git init
git add .
git commit -m "Initial commit - cpu-benchmark"
git branch -M main
# git remote add origin <your-repo-url>
# git push -u origin main
```
