const express = require('express');
const cors = require('cors');

const app = express();
const bodyparser = require('body-parser');
const apiRouter = require('./routes/apiRouter.js');

const { handle400, handle422, handle404 } = require('./errors/index');

app.use(bodyparser.json());
app.use(cors());
app.use('/api', apiRouter);

app.all('/*', (req, res, next) => {
  res.status(404).send({ msg: 'route not found' });
});
app.use(handle400);
app.use(handle422);
app.use(handle404);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: 'internal server error' });
});

module.exports = app;
