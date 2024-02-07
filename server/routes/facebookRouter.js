const express = require('express');
const router = express.Router();
const passport = require('../controllers/facebookController.js');
const userController = require('../controllers/userController.js');

router.get('/login', passport.authenticate('facebook', {scope: ['email']}));

router.get('/oauth/redirect', passport.authenticate('facebook', {session: false, scope: ['email']}), userController.facebookAdapter, userController.userCookie,
  (req, res) => {
  console.log('am i hitting');
  res.redirect('http://localhost:8080/trips')
  }
);

module.exports = router
