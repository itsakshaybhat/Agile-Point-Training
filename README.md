<h1>Agile — Workspace Overview</h1>
<p>This document summarizes the main folders, notable files, and quick run/publish instructions for the <strong>Agile</strong> workspace.</p>

<h2>Ready-to-publish projects</h2>
<ul>
  <li><strong>REST-API</strong> (REST-API/) — Express + Mongoose app exposing CRUD endpoints at <code>/api/user</code>. See <a href="REST-API/README.md">REST-API/README.md</a>.</li>
  <li><strong>cpu-benchmark</strong> (cpu-benchmark/) — CPU blocking vs worker-thread examples: <code>no-worker.js</code>, <code>with-worker.js</code>, <code>task.js</code>. See <a href="cpu-benchmark/README.md">cpu-benchmark/README.md</a>.</li>
  <li><strong>WebPageApplication</strong> (WebPageApplication/) — Tiny Node HTTP server serving <code>public/index.html</code> on port 8080. See <a href="WebPageApplication/README.md">WebPageApplication/README.md</a>.</li>
  <li><strong>Express</strong> (Express/) — Simple Express example with basic routes.</li>
</ul>

<h2>Learning & demos</h2>
<ul>
  <li><strong>JavaScript Training/</strong> — Many MDN and tutorial examples (async, promises, DOM, workers, timers, closures). Files used for learning; some contained commented examples which were cleaned.</li>
  <li><strong>NODE/</strong> — Node examples: HTTP servers, file handling, small modules.</li>
</ul>

<h2>Project/</h2>
<p>Contains exercises and a generated Salesforce metadata folder. The generated <code>.sfdx</code> content under <code>Project/.sfdx</code> was removed from the workspace to avoid pushing generated files.</p>

<h2>Files cleaned</h2>
<p>I removed TODO/FIXME and dead commented code from the following learning files:</p>
<ul>
  <li><code>JavaScript Training/express_proj/sample.js</code></li>
  <li><code>JavaScript Training/MDN/async/app.js</code></li>
  <li><code>JavaScript Training/MDN/Asynchronous_JS/appp.js</code></li>
  <li><code>JavaScript Training/practise/map_filter.js</code></li>
</ul>

<h2>Quick run commands</h2>
<p>From each project folder, run:</p>
<pre>
cd REST-API
npm install
npm start

cd cpu-benchmark
# run blocking
node no-worker.js
# run worker-based
node with-worker.js

cd WebPageApplication
npm install
npm start
</pre>

<h2>Git publish commands</h2>
<p>Create an empty GitHub repo for each project and then run (replace <code>&lt;your-repo-url&gt;</code>):</p>
<pre>
cd REST-API
git init
git add .
git commit -m "Initial commit - REST-API"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main

cd ../cpu-benchmark
git init
git add .
git commit -m "Initial commit - cpu-benchmark"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main

cd ../WebPageApplication
git init
git add .
git commit -m "Initial commit - WebPageApplication"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
</pre>

<h2>Notes & next steps</h2>
<ul>
  <li>If you want me to remove more commented examples from other learning files, tell me which folders to target.</li>
  <li>If you want, I can run the git commands here (I will need the remote URLs and permission to push).</li>
</ul>

<hr>
<p>Generated on May 17, 2026.</p>
