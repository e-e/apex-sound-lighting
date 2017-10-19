const path = require('path');

const express = require('express');

const config = require('./config');
const routes = require('./routes');

const app = express();

app.use('/static', express.static(path.join(__dirname, './static')));

app.use('/song-q', routes.songq);
app.use('/api', routes.api);

app.use('/', (req, res) =>
  res.sendFile(path.join(__dirname, './views/index.html'))
);

app.listen(config.port, () =>
  console.log(`listening on http://localhost:${config.port}/`)
);
