const express = require('express');

const app = express();
const bodyparser = require('body-parser');
const apiRouter = require('./routes/apiRouter.js');

const { handle400, handle422 } = require('./errors/index');

app.use(bodyparser.json());
app.use('/api', apiRouter);

app.all('/*', (req, res, next) => {
  res.status(404).send({ msg: 'route not found' });
});
app.use(handle400);
app.use(handle422);


app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: 'internal server error' });
});

module.exports = app;
