const path = require('path');
const express = require('express');
const auth = require('../../services/auth');
const router = express.Router();

const mongoose = require('mongoose');
mongoose.Promise = Promise;
require('../../models');
const AdminUser = mongoose.model('AdminUser');

router.get('/edit/:id?', auth, async (req, res) => {
  let user = {};
  if (req.params.id) {
    user = await AdminUser.findOne({ _id: req.params.id });
  }
  res.render('admin/admin-user-edit', {
    title: 'Apex [Admin] - Admin Users',
    error: null,
    user: user
  });
});

router.post('/edit/:id?', auth, (req, res) => {
  res.render('admin/admin-user-edit', {
    title: 'Apex [Admin] - Admin Users',
    error: null,
    user: {}
  });
});

router.get('/', auth, (req, res) => {
  AdminUser.find({}, (err, users) => {
    res.render('admin/admin-users', {
      title: 'Apex [Admin] - Admin Users',
      error: err,
      users: users
    });
  });
});

module.exports = router;
