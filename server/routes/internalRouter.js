const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

router.post('/signin', userController.verifyUser, userController.userCookie,
  // add middleware here,
  (req, res) => {
    res.redirect('/trips')
  }
)
router.post('/signup', userController.addUser, userController.userCookie,
  // add middleware here,
  (req, res) => {
    res.redirect('/signin');
  }
)

router.get('/signout', userController.signout, (req, res)=>{
  res.status(200).redirect('/home');
})

module.exports = router