const express = require('express');
const cors = require("cors");

const Passage = require("@passageidentity/passage-node");

const router = express();
const userController = require('../controllers/userController');
const passkeyController = require('../controllers/passkeyController');

router.get('/', passkeyController.auth, passkeyController.storeUser, userController.userCookie,
  (req, res) => {
    console.log('passkey auth success');
    res.redirect('/trips')
  });

module.exports = router;