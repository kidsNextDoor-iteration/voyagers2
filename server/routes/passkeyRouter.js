const express = require('express');
const cors = require("cors");

const Passage = require("@passageidentity/passage-node");

const router = express();
const userController = require('../controllers/userController');
const passkeyController = require('../controllers/passkeyController');

router.get('/', passkeyController.auth, (req, res) => res.status(200).json('passkey auth success'))

module.exports = router;