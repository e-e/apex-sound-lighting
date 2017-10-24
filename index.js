const path = require('path');
const express = require('express');
const config = require('./config');
const adminServer = require('./admin/admin-server');
const songqueueServer = require('./songqueue/songqueue-server');
const app = express();

app.set('view engine', 'pug');

app.use('/static', express.static(path.join(__dirname, './static')));
app.use('/song-q', songqueueServer);
app.use('/admin', adminServer);
// app.use('/api', routes.api);

app.use('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './views/index.html'));
});

app.listen(config.port, () =>
  console.log(`listening on http://localhost:${config.port}/`)
);

// nodemon bullshit
if (process.env.NODE_ENV !== 'production') {
  process.on('uncaughtException', function(e) {
    process.exit();
  });
  process.on('SIGTERM', function(e) {
    process.exit();
  });
  process.on('SIGINT', function(e) {
    process.exit();
  });
}

module.exports = app;
