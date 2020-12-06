const express = require('express');

// Import auth controllers
const { googleLogin } = require('../controllers/auth');

const router = express.Router();

router.post('/googleLogin', googleLogin);

module.exports = router;