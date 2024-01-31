const express = require('express');
const router = express.Router();
const passport = require('../controllers/facebookController.js');
const userController = require('../controllers/userController.js');

router.get('/login', passport.authenticate('facebook'));

// router.get('/oauth/redirect', passport.authenticate('facebook', {
//   // successRedirect: 'http://localhost:8080/trips',
//   // failureRedirect: 'http://localhost:8080/home'
//   // successRedirect: res.redirect('/trips'),
//   // failureRedirect: res.redirect('/home')
// }));

// router.get('/oauth/redirect', passport.authenticate('facebook', {
//   successRedirect: '/trips',
//   failureRedirect: '/home'
// }));

// router.get('/oauth/redirect', testMiddleware, passport.authenticate('facebook', {session: false, successRedirect: 'http://localhost:8080/trips'}),
//   (req, res) => {
//   console.log('am i hitting');
//   res.redirect('http://localhost:8080/trips')
//   }
// );

router.get('/oauth/redirect', testMiddleware, passport.authenticate('facebook', {session: false, failureRedirect: '/'}), userController.facebookAdapter, userController.userCookie,
  (req, res) => {
  console.log('am i hitting');
  res.redirect('http://localhost:8080/trips')
  }
);

module.exports = router


function testMiddleware(req, res, next) {
  console.log('we are here')
  return next();
}