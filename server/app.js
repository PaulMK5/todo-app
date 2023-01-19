const express = require('express');
const cors = require('cors');
const router = require('./routes');
const { errorHandler } = require('./errorHandler');
// const { STATIC_PATH } = require('./config/path.config');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000'
  })
);
app.use(express.json());
// app.use(express.static(STATIC_PATH));
app.use('/api', router);
app.use(errorHandler);

app.post('/example', async (req, res, next) => {
  res.status(200).send({ data: req.body.counter });
});

app.post('/example/clicker', async (req, res, next) => {
  console.log('request data: ', req.body.data);
  res.status(200).send({ data: 'hello' });
});

module.exports = app;
