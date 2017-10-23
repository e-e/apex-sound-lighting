const basicAuth = require('basic-auth');
const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect(config.dbURI, { useMongoClient: true });
require('../models');

const AdminUser = require('../routes/admin/admin-users/admin-user');

function auth(req, res, next) {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.sendStatus(401);
  }
  var authUser = basicAuth(req);
  if (!authUser || !authUser.name || !authUser.pass) {
    return unauthorized(res);
  }
  if (
    config.super.un.trim().length &&
    config.super.pw.trim().length &&
    authUser.name === config.super.un &&
    authUser.pass === config.super.pw
  ) {
    return next();
  }
  AdminUser.findOne({ username: authUser.name }, function(err, user) {
    if (err) {
      return unauthorized(res);
    }

    // test a matching password
    user.comparePassword(authUser.pass, function(err, isMatch) {
      if (err || !isMatch) {
        return unauthorized(res);
      }
      return next();
    });
  });
}

module.exports = auth;
