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

module.exports = app;
