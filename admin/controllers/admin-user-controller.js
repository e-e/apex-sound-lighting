const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const auth = require('../../services/auth');

router.use(bodyParser.urlencoded({ extended: true }));
const AdminUser = require('../../models/admin-user');

const PAGE_TITLE = 'Apex [Admin] - Admin Users';

// CREATES A NEW USER
router.post('/', auth, function(req, res) {
  AdminUser.create(
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    },
    function(err, user) {
      if (err)
        return res
          .status(500)
          .send('There was a problem adding the information to the database.');
      res.status(200).send(user);
    }
  );
});

// GETS A SINGLE USER FROM THE DATABASE AND POPULATE EDIT FORM
router.get('/edit/:id', auth, function(req, res) {
  AdminUser.findById(req.params.id, function(err, user) {
    if (err)
      return res.status(500).send('There was a problem finding the user.');
    if (!user) return res.status(404).send('No user found.');
    res.render('admin/admin-user-edit', {
      title: `${PAGE_TITLE} - ${user.firstName} ${user.lastName}`,
      error: null,
      user: user
    });
  });
});

// SHOW FORM FOR CREATING NEW USER
router.get('/new', auth, function(req, res) {
  res.render('admin/admin-user-edit', {
    title: `${PAGE_TITLE}`,
    error: null,
    user: null
  });
});

// SHOW FORM FOR CREATING NEW USER
router.post('/new', auth, function(req, res) {
  AdminUser.create(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: req.body.password
    },
    function(err, user) {
      if (err)
        return res
          .status(500)
          .send('There was a problem adding the information to the database.');
      res.redirect('admin-users');
    }
  );
});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', auth, function(req, res) {
  AdminUser.find({}, function(err, users) {
    if (err) {
      return res.status(500).send('There was a problem finding the users.');
    }
    res.render('admin/admin-users', {
      title: `${PAGE_TITLE}`,
      error: err,
      users: users
    });
  });
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', auth, function(req, res) {
  AdminUser.findByIdAndRemove(req.params.id, function(err, user) {
    if (err)
      return res.status(500).send('There was a problem deleting the user.');
    res.status(200).send('User: ' + user.name + ' was deleted.');
  });
});

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id', auth, function(req, res) {
  AdminUser.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(
    err,
    user
  ) {
    if (err)
      return res.status(500).send('There was a problem updating the user.');
    res.status(200).send(user);
  });
});

module.exports = router;
