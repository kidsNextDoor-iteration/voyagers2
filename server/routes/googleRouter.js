const express = require('express');
const googleController = require('../controllers/googleController');
const userController = require('../controllers/userController');
const config = require('config');


const router = express.Router();

require('dotenv').config();

router.get('/sessions', googleController.getTokens, googleController.storeUser, userController.userCookie, (req, res) => {

    res.redirect('http://localhost:8080/trips');


})





module.exports = router;