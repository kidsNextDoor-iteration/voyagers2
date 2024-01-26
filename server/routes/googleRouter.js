const express = require('express');
const googleController = require('../controllers/googleController')

const router = express.Router();

require('dotenv').config();

router.get('/sessions', googleController.getTokens, googleController.nextStep, (req, res) => {

    res.send({})


})





module.exports = router;