const express = require('express');

const app = express();
const bodyparser = require('body-parser');
const apiRouter = require('./routes/apiRouter.js');

app.use(bodyparser.json());
app.use('/api', apiRouter);


module.exports = app;
