const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

router.post('/signin', userController.verifyUser, userController.userCookie,
  // add middleware here,
  // (req, res) => {
  //   res.redirect('/trips')
  // }

  //sending back user id, but not using it yet on front
  (req, res) => res.status(200).json(res.locals.userid)
);

router.post('/signup', userController.addUser, userController.userCookie,
  // add middleware here,
  (req, res) => {
    // res.redirect('/signin');
    //sending back user id, but not using it yet on front
    return res.status(200).json(res.locals.userid);
  }
)

router.get('/signout', userController.signout, (req, res)=>{
  // res.status(200).redirect('/home');
  res.status(200).json('Signed out successfully!');
})

module.exports = router