const path = require('path');
const express = require('express');
const auth = require('../services/auth');
const adminServer = express();

adminServer.set('view engine', 'pug');
adminServer.set('views', path.join(__dirname, '../views'));
adminServer.use(
  '/static/bs',
  express.static(path.join(__dirname, '../node_modules/bootstrap/dist'))
);

adminServer.use('/admin-users', require('./controllers/admin-user-controller'));
adminServer.use('/booking', require('./controllers/booking-controller'));

adminServer.get('/', auth, (req, res) => {
  res.render('admin/index', {
    title: 'testing',
    message: 'this is just a message?'
  });
});

module.exports = adminServer;
