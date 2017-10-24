const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;
var SALT_WORK_FACTOR = 10;

const AdminUserSchema = new Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String
});

AdminUserSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

AdminUserSchema.methods.comparePassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

mongoose.model('AdminUser', AdminUserSchema);
