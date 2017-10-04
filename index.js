const path = require('path');

const express = require('express');

const config = require('./config');

const app = express();

app.use('/static', express.static(path.join(__dirname, './static')));

app.use('/', (req, res) =>
  res.sendFile(path.join(__dirname, './views/index.html'))
);

app.listen(config.port, () =>
  console.log(`listening on http://localhost:${config.port}/`)
);
