const express = require('express');
const { googleLogin } = require('../controllers/auth'); // Import auth controller
const router = express.Router();

router.post('/googleLogin', googleLogin);

module.exports = router;