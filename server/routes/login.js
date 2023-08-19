const express = require('express');
const router = express.Router();
const { handleLogin } = require('../controllers/loginController');

console.log(require('../controllers/loginController'));

router.post('/', handleLogin);

module.exports = router;