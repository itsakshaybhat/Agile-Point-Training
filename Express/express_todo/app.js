const express = require('express');

const logger = require('./middlewares/logger.js');
const notFound = require('./middlewares/notFoundMiddleware');
const errorMiddleware = require('./middlewares/errorMiddleware');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(logger);
app.use(express.json());

app.use('/api/tasks', taskRoutes);

app.use(notFound);
app.use(errorMiddleware);

module.exports = app;