# REST-API

Simple Express + MongoDB REST API demo.

What it is
- Express app exposing user CRUD endpoints at `/api/user`.
- Uses Mongoose for MongoDB access. Handlers live in `controllers/user.js`.

Prerequisites
- Node.js (16+ recommended)
- MongoDB running locally or remotely

Quick start
1. Install dependencies

```bash
cd REST-API
npm install
```

2. Run the app (uses `nodemon`)

```bash
npm start
# or: node index.js
```

3. Default DB connection
- The app connects to `mongodb://127.0.0.1:27017/akshay-app-1` in `index.js`.
  Change that string or load from an env variable as needed.

Git (publish)

```bash
cd REST-API
git init
git add .
git commit -m "Initial commit - REST-API"
git branch -M main
# git remote add origin <your-repo-url>
# git push -u origin main
```

Files of interest
- `index.js` - app entry and DB connect
- `routes/user.js` - API routes
- `controllers/user.js` - request handlers
- `models/user.js` - Mongoose schema
- `middlewares/index.js` - logging middleware
