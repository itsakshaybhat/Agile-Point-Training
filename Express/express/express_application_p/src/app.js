const express = require('express');
const app = express() ;
const taskRoutes = require('./routes/taskRoutes');
const logger = require('./middlewares/logger');
const errorMiddleware = require('./middlewares/errorMiddleware');
const notfound = require('./middlewares/notFoundMiddleware');


app.use(logger);
app.use(express.json());
app.use('/api/tasks', taskRoutes);

app.use(notfound);
app.use(errorMiddleware);
module.exports = app;
