const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const path = require('path')
// Load User model
const User = require('../models/User');


const { forwardAuthenticated } = require('../config/auth');


//const app = express();

//app.use(express.static(__dirname + './views'));

// Login Page consumers
router.get('/consumerslogin', forwardAuthenticated, (req, res) => res.render('c-login'));


// Register Page for consumers
router.get('/consumersregister', forwardAuthenticated, (req, res) => res.render('c-register'));




// Register consumers
router.post('/consumersregister', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];
  

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('c-register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('c-register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/consumerslogin');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// consumers login

router.post('/consumerslogin', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/consumerslogin',
    failureFlash: true
  })(req, res, next);
});

// consumers Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/consumerslogin');
});


//////////////////////////////////////////////////////////////////////////////////
//for vendors

// Register Page for vendors
router.get('/vendorsregister', forwardAuthenticated, (req, res) => res.render('v-register'));

//login page for vendors
router.get('/vendorslogin', forwardAuthenticated, (req, res) => res.render('v-login'));


// Register consumers
router.post('/vendorsregister', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];
  

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('v-register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('v-register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/vendorslogin');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// vendors login

router.post('/vendorslogin', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/vendor-dash',
    failureRedirect: '/users/vendorslogin',
    failureFlash: true
  })(req, res, next);
});

// vendors Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/vendorslogin');
});


module.exports = router;
