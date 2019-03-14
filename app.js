const express = require('express');

const app = express();
const bodyparser = require('body-parser');
const apiRouter = require('./routes/apiRouter.js');

app.use(bodyparser.json());
app.use('/api', apiRouter);


// app.use((err, req, res, next) => {
//   console.log('>>>>>>>>>>', err.code);
// });

app.all('/*', (req, res, next) => {
  res.status(404).send({ msg: 'route not found' });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: 'internal server error' });
});

module.exports = app;
