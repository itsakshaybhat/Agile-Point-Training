<h1>Agile — Workspace Overview</h1>
<p>This document summarizes the main folders, notable files, and quick run/publish instructions for the <strong>Agile</strong> workspace.</p>

<h2>What I changed</h2>
<ul>
  <li>Added a root <code>.gitignore</code> so generated files, dependencies, logs, and editor clutter stay out of GitHub.</li>
  <li>Kept this top-level README as the global map for the whole workspace.</li>
</ul>

<h2>Ready-to-publish projects</h2>
<ul>
  <li><strong>REST-API</strong> (REST-API/) — Express + Mongoose app exposing CRUD endpoints at <code>/api/user</code>. See <a href="REST-API/README.md">REST-API/README.md</a>.</li>
  <li><strong>cpu-benchmark</strong> (cpu-benchmark/) — CPU blocking vs worker-thread examples: <code>no-worker.js</code>, <code>with-worker.js</code>, <code>task.js</code>. See <a href="cpu-benchmark/README.md">cpu-benchmark/README.md</a>.</li>
  <li><strong>WebPageApplication</strong> (WebPageApplication/) — Tiny Node HTTP server serving <code>public/index.html</code> on port 8080. See <a href="WebPageApplication/README.md">WebPageApplication/README.md</a>.</li>
  <li><strong>Express</strong> (Express/) — Simple Express example with basic routes and several learning subfolders.</li>
</ul>

<h2>Learning & demos</h2>
<ul>
  <li><strong>JavaScript Training/</strong> — Many MDN and tutorial examples (async, promises, DOM, workers, timers, closures). Files used for learning; some contained commented examples which were cleaned.</li>
  <li><strong>NODE/</strong> — Node examples: HTTP servers, file handling, small modules.</li>
</ul>

<h2>Project/</h2>
<p>Contains exercises and a generated Salesforce metadata folder. The generated <code>.sfdx</code> content under <code>Project/.sfdx</code> was removed from the workspace to avoid pushing generated files.</p>

<h2>Ignore rules</h2>
<p>The root <code>.gitignore</code> now covers common generated content across the workspace, including:</p>
<ul>
  <li><code>node_modules/</code> in every nested project</li>
  <li>build outputs such as <code>dist/</code>, <code>build/</code>, <code>out/</code>, <code>coverage/</code>, and <code>.next/</code></li>
  <li>logs, temp files, environment files, and local editor folders</li>
</ul>
<p>If any generated dependency files are already tracked in Git, they will still need to be removed from the index separately before the ignore rule takes full effect.</p>

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
  <li>If you want, I can also help clean tracked generated files out of the Git index so the ignore rules apply fully.</li>
</ul>

<hr>
<p>Generated on May 17, 2026.</p>
