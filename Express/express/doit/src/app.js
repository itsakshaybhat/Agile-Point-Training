const express = require('express');

const taskRoutes = require('./routes/taskRoutes');
const notFound = require('./middleware/notFoundMiddleware');
const logger = require('./middleware/logger');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

app.use(logger);
app.use(express.json());

app.use('/api/tasks',taskRoutes);
app.use(notFound);
app.use(errorMiddleware);
module.exports = app;