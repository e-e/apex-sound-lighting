const path = require('path');
const express = require('express');
const auth = require('../../services/auth');
const router = express.Router();

router.use(
  '/static/bs',
  express.static(path.join(__dirname, '../../node_modules/bootstrap/dist'))
);

router.use('/admin-users', require('./admin-users'));

router.get('/', auth, (req, res) => {
  res.render('admin/index', {
    title: 'testing',
    message: 'this is just a message?'
  });
});

module.exports = router;
