const express = require('express');
const googleController = require('../controllers/googleController');
const userController = require('../controllers/userController');

const router = express.Router();

require('dotenv').config();

router.get('/sessions', googleController.getTokens, googleController.storeUser, userController.userCookie, (req, res) => {

    res.redirect('/trips');


})





module.exports = router;