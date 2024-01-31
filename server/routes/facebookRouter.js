const express = require('express');
const router = express.Router();
const passport = require('../controllers/facebookController.js')

router.get('/login', passport.authenticate('facebook'));

router.get('/oauth/redirect', passport.authenticate('facebook', {
  successRedirect: 'http://localhost:8080/trips',
  failureRedirect: 'http://localhost:8080/home'
}));

module.exports = router